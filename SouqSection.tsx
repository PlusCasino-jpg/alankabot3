export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          avatar_url?: string | null;
          bio?: string | null;
        };
        Update: {
          username?: string;
          avatar_url?: string | null;
          bio?: string | null;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string | null;
          category: PostCategory;
          subcategory: string | null;
          author_id: string;
          thumbnail_url: string | null;
          tags: string[];
          views: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          content: string;
          excerpt?: string | null;
          category: PostCategory;
          subcategory?: string | null;
          author_id: string;
          thumbnail_url?: string | null;
          tags?: string[];
        };
        Update: {
          title?: string;
          content?: string;
          excerpt?: string | null;
          thumbnail_url?: string | null;
          tags?: string[];
          is_published?: boolean;
          updated_at?: string;
        };
      };
      forum_topics: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          category: string;
          author_id: string;
          views: number;
          is_pinned: boolean;
          is_closed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          content: string;
          category: string;
          author_id: string;
        };
        Update: {
          title?: string;
          content?: string;
          is_pinned?: boolean;
          is_closed?: boolean;
        };
      };
      comments: {
        Row: {
          id: string;
          content: string;
          author_id: string;
          post_id: string | null;
          topic_id: string | null;
          souq_item_id: string | null;
          parent_id: string | null;
          likes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          content: string;
          author_id: string;
          post_id?: string | null;
          topic_id?: string | null;
          souq_item_id?: string | null;
          parent_id?: string | null;
        };
        Update: {
          content?: string;
          likes?: number;
        };
      };
      souq_items: {
        Row: {
          id: string;
          title: string;
          description: string;
          price: number;
          currency: string;
          category: SouqCategory;
          condition: ItemCondition;
          images: string[];
          seller_id: string;
          is_available: boolean;
          location: string | null;
          views: number;
          rating: number;
          rating_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description: string;
          price: number;
          currency?: string;
          category: SouqCategory;
          condition: ItemCondition;
          images?: string[];
          seller_id: string;
          location?: string | null;
        };
        Update: {
          title?: string;
          description?: string;
          price?: number;
          is_available?: boolean;
          images?: string[];
        };
      };
      downloads: {
        Row: {
          id: string;
          name: string;
          description: string;
          version: string;
          platform: string[];
          size_mb: number;
          download_url: string;
          thumbnail_url: string | null;
          category: string;
          download_count: number;
          author_id: string;
          created_at: string;
        };
        Insert: {
          name: string;
          description: string;
          version: string;
          platform: string[];
          size_mb: number;
          download_url: string;
          thumbnail_url?: string | null;
          category: string;
          author_id: string;
        };
        Update: {
          description?: string;
          version?: string;
          download_url?: string;
          download_count?: number;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      post_category: PostCategory;
      souq_category: SouqCategory;
      item_condition: ItemCondition;
    };
  };
}

export type PostCategory = "games" | "tutorials" | "articles" | "news";
export type SouqCategory = "electronics" | "games" | "services" | "software" | "other";
export type ItemCondition = "new" | "like_new" | "good" | "fair";
