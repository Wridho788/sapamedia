import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PostGrid from "@/components/post/PostGrid";
import { getPostsByCategorySlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Kategori ${slug} - Sapamedia`,
    description: `Kumpulan artikel kategori ${slug} di Sapamedia.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const { category, posts } = await getPostsByCategorySlug(slug);

  if (!category) {
    return (
      <Container>
        <div className="py-16 text-center text-slate-500">Category not found.</div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="space-y-6 py-8 sm:py-10">
        <h1 className="text-2xl font-bold sm:text-3xl">{category.name}</h1>

        {posts.length === 0 ? (
          <div className="rounded-xl bg-slate-100 py-10 text-center text-slate-500">
            No posts found.
          </div>
        ) : (
          <PostGrid posts={posts} />
        )}

        <div className="text-center">
          <button
            type="button"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Load More
          </button>
        </div>
      </section>
    </Container>
  );
}
