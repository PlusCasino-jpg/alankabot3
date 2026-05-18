import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// GET /api/comments?post_id=... or ?topic_id=... or ?souq_item_id=...
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const post_id = searchParams.get("post_id");
  const topic_id = searchParams.get("topic_id");
  const souq_item_id = searchParams.get("souq_item_id");
  const limit = parseInt(searchParams.get("limit") || "50");

  const supabase = getSupabase();

  let query = supabase
    .from("comments")
    .select("*, profiles:author_id(username, avatar_url), replies:comments!parent_id(*, profiles:author_id(username, avatar_url))")
    .is("parent_id", null)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (post_id) query = query.eq("post_id", post_id);
  else if (topic_id) query = query.eq("topic_id", topic_id);
  else if (souq_item_id) query = query.eq("souq_item_id", souq_item_id);
  else return NextResponse.json({ error: "يجب تحديد المرجع" }, { status: 400 });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comments: data });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = getSupabase();

  const { content, author_id, post_id, topic_id, souq_item_id, parent_id } = body;

  if (!content || !author_id) {
    return NextResponse.json({ error: "المحتوى والمؤلف مطلوبان" }, { status: 400 });
  }

  if (!post_id && !topic_id && !souq_item_id) {
    return NextResponse.json({ error: "يجب تحديد المرجع" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({ content, author_id, post_id, topic_id, souq_item_id, parent_id })
    .select("*, profiles:author_id(username, avatar_url)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comment: data }, { status: 201 });
}

// PATCH for likes
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const supabase = getSupabase();
  const { comment_id, action } = body; // action: "like" | "unlike"

  if (!comment_id) {
    return NextResponse.json({ error: "comment_id مطلوب" }, { status: 400 });
  }

  const increment = action === "like" ? 1 : -1;

  const { data, error } = await supabase.rpc("increment_comment_likes", {
    comment_id_param: comment_id,
    increment_value: increment,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
