import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import MarkdownRenderer from "@/components/post/MarkdownRenderer";
import RelatedPosts from "@/components/post/RelatedPosts";
import { getPostBySlug } from "@/lib/posts";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post?.title ?? "Post Not Found",
    description: post?.excerpt ?? "Baca artikel terbaru di Sapamedia.",
    openGraph: {
      title: post?.title ?? "Sapamedia",
      description: post?.excerpt ?? "Portal berita dan insight terbaru.",
      images: post?.cover_image ? [post.cover_image] : [],
    },
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container>
      <article className="mx-auto max-w-3xl space-y-6 py-8 sm:py-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
          <p className="text-sm text-slate-500">
            {new Date(post.created_at).toLocaleDateString("id-ID", {
              dateStyle: "long",
            })}
          </p>
        </header>

        {post.cover_image ? (
          <div className="relative h-64 w-full overflow-hidden rounded-xl sm:h-105">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <MarkdownRenderer content={post.content || "Konten belum tersedia."} />
        </div>

        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-100 py-10 text-center text-sm font-medium text-slate-500">
          Ad Slot
        </div>

        <RelatedPosts postId={post.id} />
      </article>
    </Container>
  );
}
