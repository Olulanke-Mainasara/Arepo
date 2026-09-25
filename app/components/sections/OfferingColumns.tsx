import { useRef } from "react";
import { Link } from "react-router";
import { Container } from "~/components/ui/Container";
import { Figure } from "~/components/ui/Figure";
import { Pill } from "~/components/ui/Pill";
import { SectionIntro } from "~/components/ui/SectionIntro";
import { useReveal } from "~/lib/motion";
import type { Offering } from "~/data/types";

export function OfferingColumns({ offerings }: { offerings: Offering[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <section className="on-dark bg-navy-950 py-20 text-white lg:py-28">
      <Container>
        <SectionIntro
          heading={
            <>
              Online database solutions to streamline your <Pill>business</Pill>
            </>
          }
        >
          Arepo Solutions is an experienced UK based software development
          company that specialises in providing affordable web-based solutions
          for the transport industry.
        </SectionIntro>

        <div ref={ref} className="mt-14 grid gap-15">
          {offerings.map((offering, i) => (
            // The chipped corner is the image's outer top corner, which on
            // mobile, image stacked first, is the same side.
            <article
              key={offering.id}
              data-reveal
              className={`grid overflow-hidden rounded-3xl border border-white/10 bg-navy-900 md:grid-cols-2 ${
                i % 2 === 1 ? "chip-tr" : "chip-tl"
              }`}
            >
              <div
                className={`relative aspect-square ${i % 2 === 1 ? "md:order-2" : ""}`}
              >
                <Figure slot={offering.image} fill />
              </div>

              <div className="flex flex-col justify-center p-7 md:p-10 lg:p-14">
                <h3 className="text-h2 text-white">{offering.title}</h3>
                <ul className="mt-5 border-t border-white/10">
                  {offering.items.map((item) => (
                    <li key={item.label} className="border-b border-white/10">
                      {item.to ? (
                        <Link
                          to={item.to}
                          className="group flex items-center justify-between gap-4 py-3 text-base text-white transition-colors duration-200 ease-out hover:text-cyan-400"
                        >
                          {item.label}
                          <span
                            aria-hidden="true"
                            className="text-cyan-500 transition-transform duration-200 ease-out group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </Link>
                      ) : (
                        <span className="block py-3 text-base text-white/75">
                          {item.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
