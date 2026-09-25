import { useRef } from "react";
import { Container } from "~/components/ui/Container";
import { Pill } from "~/components/ui/Pill";
import { Ribbon } from "~/components/ui/Ribbon";
import { WordmarkType } from "~/components/ui/Wordmark";
import { useDrift } from "~/lib/motion";

/**
 * After the Rappat exhibition-stand reference: a dark wall carrying the
 * wordmark, a ribbon of light sweeping up to the right, and a stepped
 * tagline with pill-set words.
 *
 * The reference's ribbon is a soft glowing gradient; here it is drawn in
 * flat cyan strokes, keeping the palette flat.
 *
 * The site header floats transparent over the top of this section, so the
 * section pads itself down by the header's height.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useDrift(ref);

  return (
    <section
      ref={ref}
      className="on-dark relative isolate overflow-hidden bg-navy-950 pt-(--header-h) text-white"
    >
      <Ribbon />

      <Container
        size="wide"
        className="relative grid min-h-[min(calc(100svh-var(--header-h)),62rem)] py-12 sm:py-16"
      >
        {/* The {' '} nodes are collapsed by flex layout but keep the
            accessible name reading "arepo Online database solutions". */}
        <h1 className="flex flex-col justify-between gap-16">
          <WordmarkType className="text-wordmark" />{" "}
          <span className="flex flex-col items-start gap-2 text-h1">
            <span className="flex flex-wrap items-center gap-x-[0.3em] gap-y-2">
              Online <Pill>database</Pill>
            </span>{" "}
            <Pill>solutions</Pill>
          </span>
        </h1>
      </Container>
    </section>
  );
}
