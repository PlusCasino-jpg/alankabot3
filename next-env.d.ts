import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "10");
  const page = parseInt(searchParams.get("page") || "1");
  const offset = (page - 1) * limit;

  const supabase = getSupabase();

  let query = supabase
    .from("posts")
    .select("*, profiles:author_id(username, avatar_url)", { count: "exact" })
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) query = query.eq("category", category);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    posts: data,
    total: count,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = getSupabase();

  const { title, content, excerpt, category, subcategory, author_id, thumbnail_url, tags } = body;

  if (!title || !content || !category || !author_id) {
    return NextResponse.json({ error: "حقول مطلوبة مفقودة" }, { status: 400 });
  }

  const slug = title
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "")
    .toLowerCase();

  const { data, error } = await supabase
    .from("posts")
    .insert({ title, slug, content, excerpt, category, subcategory, author_id, thumbnail_url, tags: tags || [] })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post: data }, { status: 201 });
}
