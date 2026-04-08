import { supabase } from "@/lib/supabase";
import type { Category, Post } from "@/lib/types";

export async function getHomepagePosts(limit = 12): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, content, cover_image, created_at, status")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return (data as Post[]) ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, content, cover_image, created_at, status")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    return null;
  }

  return data as Post;
}

export async function getRelatedPosts(
  currentPostId: string,
  limit = 3
): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, content, cover_image, created_at, status")
    .eq("status", "published")
    .neq("id", currentPostId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return [];
  }

  return (data as Post[]) ?? [];
}

export async function getPostsByCategorySlug(
  slug: string,
  limit = 10,
  page = 1
): Promise<{ category: Category | null; posts: Post[] }> {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const { data: categoryData } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("slug", slug)
    .single();

  if (!categoryData) {
    return { category: null, posts: [] };
  }

  const { data, error } = await supabase
    .from("post_categories")
    .select(
      "posts!inner(id, slug, title, excerpt, content, cover_image, created_at, status)"
    )
    .eq("category_id", categoryData.id)
    .eq("posts.status", "published")
    .order("created_at", { foreignTable: "posts", ascending: false })
    .range(start, end);

  if (error) {
    return { category: categoryData as Category, posts: [] };
  }

  const posts =
    data
      ?.flatMap((item) => {
        const related = item.posts as Post | Post[] | null;
        if (!related) return [];
        return Array.isArray(related) ? related : [related];
      })
      .filter((item): item is Post => Boolean(item)) ?? [];

  return {
    category: categoryData as Category,
    posts,
  };
}
