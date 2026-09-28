import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Topography } from "@/components/graphics/Topography";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <Topography
        id="nf-topo"
        className="absolute inset-0 -z-10 h-full w-full opacity-70"
        terrain={{ cx: 1000, cy: 450, seed: 3.3 }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-transparent" />
      <Container className="py-32 sm:py-44">
        <p className="label text-rock-400">Error 404 · Off the map</p>
        <h1 className="mt-6 max-w-2xl text-headline font-medium">We couldn&apos;t find that page.</h1>
        <p className="mt-6 max-w-xl text-lede text-mist">
          The page may have moved, or the address may be mistyped. The links below will get you back on track.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/">Back to home</Button>
          <Button href="/services" variant="secondary">
            View services
          </Button>
        </div>
      </Container>
    </section>
  );
}
