export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  created_at: string;
  status: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
