import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/types";

interface FeaturedPostProps {
  post: Post | undefined;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  if (!post) return null;

  return (
    <Link href={`/post/${post.slug}`} prefetch>
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
        {post.cover_image ? (
          <div className="relative h-64 w-full sm:h-80">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center bg-slate-100 text-slate-500 sm:h-80">
            No cover image
          </div>
        )}

        <div className="space-y-3 p-5 sm:p-6">
          <h1 className="text-2xl font-bold leading-snug sm:text-3xl">{post.title}</h1>
          {post.excerpt ? <p className="text-slate-600">{post.excerpt}</p> : null}
        </div>
      </article>
    </Link>
  );
}
