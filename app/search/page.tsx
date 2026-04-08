"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/lib/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      setErrorMessage(null);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setErrorMessage(null);

      const { data, error } = await supabase
        .from("posts")
        .select("id, slug, title, excerpt, content, cover_image, created_at, status")
        .eq("status", "published")
        .ilike("title", `%${query.trim()}%`)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        setErrorMessage("Terjadi kesalahan saat mengambil data.");
        setResults([]);
      } else {
        setResults((data as Post[]) ?? []);
      }

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Container>
      <section className="space-y-6 py-8 sm:py-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Search</h1>

        <input
          type="text"
          placeholder="Cari berita..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none ring-(--color-accent) transition focus:ring-2"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {loading ? <p className="text-sm text-slate-500">Loading...</p> : null}

        {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

        {!loading && !errorMessage && results.length > 0 ? (
          <ul className="space-y-3">
            {results.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/post/${post.slug}`}
                  className="font-medium text-slate-800 transition hover:text-(--color-accent)"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {!loading && query.trim() && !errorMessage && results.length === 0 ? (
          <p className="rounded-xl bg-slate-100 px-4 py-6 text-center text-slate-500">
            Tidak ada hasil ditemukan.
          </p>
        ) : null}
      </section>
    </Container>
  );
}
