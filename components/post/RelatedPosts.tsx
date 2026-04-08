import Link from "next/link";
import { getRelatedPosts } from "@/lib/posts";

interface RelatedPostsProps {
  postId: string;
}

export default async function RelatedPosts({ postId }: RelatedPostsProps) {
  const posts = await getRelatedPosts(postId, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3 pt-6">
      <h3 className="text-lg font-semibold">Related Posts</h3>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/post/${post.slug}`}
              prefetch
              className="text-sm font-medium text-slate-700 transition hover:text-(--color-accent)"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
