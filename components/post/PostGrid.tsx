import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/types";

interface PostGridProps {
  posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/post/${post.slug}`}
          prefetch
          className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {post.cover_image ? (
            <div className="relative h-44 w-full">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-44 items-center justify-center bg-slate-100 text-slate-500">
              No image
            </div>
          )}

          <div className="p-4">
            <h3 className="font-semibold leading-snug">{post.title}</h3>
          </div>
        </Link>
      ))}
    </section>
  );
}
