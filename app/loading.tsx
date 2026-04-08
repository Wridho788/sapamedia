import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <Skeleton />
        <Skeleton />
      </div>
    </Container>
  );
}
