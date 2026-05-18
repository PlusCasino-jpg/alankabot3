-- ============================================================
-- العنكبوت للمعلومات — Supabase Database Schema
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for full-text search

-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_username ON profiles(username);

-- ============================================================
-- POSTS (articles, game reviews, tutorials, news)
-- ============================================================
CREATE TYPE post_category AS ENUM ('games', 'tutorials', 'articles', 'news');

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category post_category NOT NULL,
  subcategory TEXT,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  thumbnail_url TEXT,
  tags TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_published ON posts(is_published, created_at DESC);
CREATE INDEX idx_posts_search ON posts USING gin(to_tsvector('arabic', title || ' ' || content));

-- ============================================================
-- FORUM TOPICS
-- ============================================================
CREATE TABLE IF NOT EXISTS forum_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_closed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_topics_category ON forum_topics(category);
CREATE INDEX idx_topics_author ON forum_topics(author_id);
CREATE INDEX idx_topics_pinned ON forum_topics(is_pinned DESC, created_at DESC);

-- ============================================================
-- DOWNLOADS
-- ============================================================
CREATE TABLE IF NOT EXISTS downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  version TEXT NOT NULL,
  platform TEXT[] NOT NULL,
  size_mb DECIMAL(10,2) NOT NULL,
  download_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT NOT NULL,
  download_count INTEGER DEFAULT 0,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_downloads_category ON downloads(category);

-- ============================================================
-- SOUQ (Marketplace)
-- ============================================================
CREATE TYPE souq_category AS ENUM ('electronics', 'games', 'services', 'software', 'other');
CREATE TYPE item_condition AS ENUM ('new', 'like_new', 'good', 'fair');

CREATE TABLE IF NOT EXISTS souq_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'SAR',
  category souq_category NOT NULL,
  condition item_condition NOT NULL,
  images TEXT[] DEFAULT '{}',
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_available BOOLEAN DEFAULT TRUE,
  location TEXT,
  views INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_souq_category ON souq_items(category);
CREATE INDEX idx_souq_seller ON souq_items(seller_id);
CREATE INDEX idx_souq_available ON souq_items(is_available, created_at DESC);
CREATE INDEX idx_souq_search ON souq_items USING gin(to_tsvector('arabic', title || ' ' || description));

-- ============================================================
-- COMMENTS (unified for posts, forum topics, souq items)
-- ============================================================
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES forum_topics(id) ON DELETE CASCADE,
  souq_item_id UUID REFERENCES souq_items(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT check_single_ref CHECK (
    (post_id IS NOT NULL)::int +
    (topic_id IS NOT NULL)::int +
    (souq_item_id IS NOT NULL)::int = 1
  )
);

CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_topic ON comments(topic_id);
CREATE INDEX idx_comments_souq ON comments(souq_item_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);

-- ============================================================
-- COMMENT LIKES function
-- ============================================================
CREATE OR REPLACE FUNCTION increment_comment_likes(comment_id_param UUID, increment_value INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE comments SET likes = GREATEST(0, likes + increment_value) WHERE id = comment_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- AUTO-UPDATED updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER topics_updated_at BEFORE UPDATE ON forum_topics FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER souq_updated_at BEFORE UPDATE ON souq_items FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- AUTO-CREATE profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE souq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, own write
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_own_update" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Posts: published = public, authors manage own
CREATE POLICY "posts_public_read" ON posts FOR SELECT USING (is_published = true);
CREATE POLICY "posts_author_all" ON posts FOR ALL USING (auth.uid() = author_id);

-- Forum: public read, auth write
CREATE POLICY "topics_public_read" ON forum_topics FOR SELECT USING (true);
CREATE POLICY "topics_auth_insert" ON forum_topics FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "topics_author_update" ON forum_topics FOR UPDATE USING (auth.uid() = author_id);

-- Downloads: public read, auth insert
CREATE POLICY "downloads_public_read" ON downloads FOR SELECT USING (true);
CREATE POLICY "downloads_auth_insert" ON downloads FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Souq: public read, auth write own
CREATE POLICY "souq_public_read" ON souq_items FOR SELECT USING (true);
CREATE POLICY "souq_auth_insert" ON souq_items FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "souq_seller_update" ON souq_items FOR UPDATE USING (auth.uid() = seller_id);

-- Comments: public read, auth write own
CREATE POLICY "comments_public_read" ON comments FOR SELECT USING (true);
CREATE POLICY "comments_auth_insert" ON comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "comments_author_update" ON comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "comments_author_delete" ON comments FOR DELETE USING (auth.uid() = author_id);
