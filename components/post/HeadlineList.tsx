import Link from "next/link";
import type { Post } from "@/lib/types";

interface HeadlineListProps {
  posts: Post[];
}

export default function HeadlineList({ posts }: HeadlineListProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Quick Headlines</h2>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/post/${post.slug}`}
              prefetch
                className="block text-base font-medium text-slate-800 transition hover:text-(--color-accent)"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
