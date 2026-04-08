import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container>
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold">Halaman tidak ditemukan</h1>
        <p className="mt-2 text-slate-500">Coba cek kembali URL yang kamu buka.</p>
      </div>
    </Container>
  );
}
