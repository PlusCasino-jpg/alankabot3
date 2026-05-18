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
  const condition = searchParams.get("condition");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const limit = parseInt(searchParams.get("limit") || "12");
  const page = parseInt(searchParams.get("page") || "1");
  const offset = (page - 1) * limit;

  const supabase = getSupabase();

  let query = supabase
    .from("souq_items")
    .select("*, profiles:seller_id(username, avatar_url)", { count: "exact" })
    .eq("is_available", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) query = query.eq("category", category);
  if (condition) query = query.eq("condition", condition);
  if (minPrice) query = query.gte("price", parseFloat(minPrice));
  if (maxPrice) query = query.lte("price", parseFloat(maxPrice));

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    items: data,
    total: count,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = getSupabase();

  const { title, description, price, currency, category, condition, images, seller_id, location } = body;

  if (!title || !description || !price || !category || !condition || !seller_id) {
    return NextResponse.json({ error: "حقول مطلوبة مفقودة" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("souq_items")
    .insert({
      title, description, price, currency: currency || "SAR",
      category, condition, images: images || [],
      seller_id, location,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: data }, { status: 201 });
}
