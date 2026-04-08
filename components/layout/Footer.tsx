import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200">
      <Container>
        <div className="py-8 text-sm text-slate-500">
          Copyright {new Date().getFullYear()} Sapamedia. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
