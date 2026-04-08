import Container from "@/components/ui/Container";
import FeaturedPost from "@/components/post/FeaturedPost";
import HeadlineList from "@/components/post/HeadlineList";
import PostGrid from "@/components/post/PostGrid";
import { getHomepagePosts } from "@/lib/posts";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getHomepagePosts();

  if (!posts || posts.length === 0) {
    return (
      <Container>
        <div className="py-16 text-center text-slate-500">Belum ada artikel tersedia.</div>
      </Container>
    );
  }

  const featured = posts[0];
  const headlines = posts.slice(1, 6);
  const grid = posts.slice(6);

  return (
    <Container>
      <section className="space-y-8 py-8 sm:py-10">
        <FeaturedPost post={featured} />

        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-100 py-10 text-center text-sm font-medium text-slate-500">
          Ad Slot
        </div>

        <HeadlineList posts={headlines} />
        <PostGrid posts={grid} />
      </section>
    </Container>
  );
}
