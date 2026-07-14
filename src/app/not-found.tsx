import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink pt-20">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-px relative text-center">
        <div className="heading-display text-8xl text-gradient-gold sm:text-9xl">
          404
        </div>
        <h1 className="heading-display mt-4 text-3xl text-white sm:text-4xl">
          This route ran off the map
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on the road.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-gold">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link href="/contact" className="btn-outline">
            <ArrowLeft className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
