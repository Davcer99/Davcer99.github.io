// Landing motion: the hero AI module descends into its socket on load, and each process drawing assembles once as it scrolls in.
// Progressive enhancement: nothing is hidden by CSS. Elements are offset only by the tweens below, right before they play.
// Without JS or with reduced motion the drawings stay exactly as authored (the exploded manual figure); the only
// intended difference after the hero plays is that C is seated and the arrow is gone.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The one motion clock. Distances are fractions of the drawing's viewBox width so the hero and the smaller step
// drawings travel the same visual distance.
const clock = {
  duration: {
    settle: 0.45, // a part arriving in its drawing
    draw: 0.4, // the dashed arrow flowing toward the socket
    seat: 0.55, // the AI module arriving or seating
    pulse: 0.16, // half of the step-circle pulse
  },
  stagger: 0.08,
  distance: {
    settle: 0.02, // parts rise into place from slightly below
    drop: 0.06, // in a step drawing, the AI module arrives from above
    flow: 0.04, // dash pattern slide along the arrow
  },
  ease: {
    arrive: "expo.out", // confident deceleration, no overshoot
    seat: "power3.out", // small, firm landing
    pulse: "power2.out",
    fade: "power1.in", // the arrow disappears late, under the module
  },
  scrollStart: "top 85%",
  pulseScale: 1.12,
} as const;

const clearProps = "transform,opacity";

/** Converts a fraction of the drawing width into SVG user units, the coordinate space GSAP translates in. */
const units = (svg: SVGSVGElement, fraction: number) => svg.viewBox.baseVal.width * fraction;

function heroAssembly(): void {
  const svg = document.querySelector<SVGSVGElement>('[data-figure="hero-assembly"] svg');
  if (!svg) return;

  const partC = svg.querySelector<SVGGElement>("#part-c");
  const arrow = svg.querySelector<SVGPathElement>("#arrow-c");
  if (!partC || !arrow) return;

  // The hero is above the fold: nothing is hidden or offset before playing, so the first paint (the authored
  // exploded figure) never flashes. Only the arrow flows and C moves from where the manual draws it.

  // The arrowhead and its paper-coloured backing are the arrow's siblings inside its own group.
  const group = arrow.parentNode;
  const head = group && group !== svg ? [...group.children].filter((el) => el !== arrow) : [];

  // The module travels the vector of the dashed arrow (tail on C's footprint, tip on the socket), measured from the
  // drawing itself so a re-drawn illustration needs no change here.
  const tail = arrow.getPointAtLength(0);
  const tip = arrow.getPointAtLength(arrow.getTotalLength());

  const mark = document.querySelector<HTMLElement>(".intro__mark");

  const tl = gsap.timeline({ defaults: { ease: clock.ease.arrive } });

  // The dash pattern flows toward the socket, pointing the way before the module moves.
  tl.from(
    arrow,
    {
      strokeDashoffset: units(svg, clock.distance.flow),
      duration: clock.duration.draw,
      clearProps: "strokeDashoffset",
    },
    clock.duration.settle / 2,
  );

  // C seats and stays seated: this is the only tween whose end state differs from the authored drawing.
  tl.addLabel("seat");
  tl.to(
    partC,
    {
      x: tip.x - tail.x,
      y: tip.y - tail.y,
      duration: clock.duration.seat,
      ease: clock.ease.seat,
    },
    "seat",
  );
  // The arrow has done its job once the module covers it.
  tl.to([arrow, ...head], { opacity: 0, duration: clock.duration.seat, ease: clock.ease.fade }, "seat");

  if (mark) {
    tl.to(
      mark,
      {
        scale: clock.pulseScale,
        duration: clock.duration.pulse,
        ease: clock.ease.pulse,
        yoyo: true,
        repeat: 1,
        clearProps: "transform",
      },
      "seat+=" + (clock.duration.seat - clock.duration.pulse),
    );
  }
}

function stepAssemblies(): void {
  document.querySelectorAll<HTMLElement>('[data-figure^="step-"]').forEach((figure) => {
    const svg = figure.querySelector<SVGSVGElement>("svg");
    if (!svg) return;

    const parts = [...svg.querySelectorAll<SVGGElement>(".part")];
    const ai = parts.filter((part) => part.classList.contains("part-c"));
    const rest = parts.filter((part) => !part.classList.contains("part-c"));
    if (parts.length === 0) return;

    // ScrollTrigger lives on the timeline, not on its tweens; `once` keeps it a single play with no reverse.
    const tl = gsap.timeline({
      defaults: { ease: clock.ease.arrive },
      scrollTrigger: { trigger: figure, start: clock.scrollStart, once: true },
    });

    if (rest.length) {
      tl.from(
        rest,
        {
          y: units(svg, clock.distance.settle),
          opacity: 0,
          duration: clock.duration.settle,
          stagger: clock.stagger,
          clearProps,
        },
        0,
      );
    }

    // The AI module always arrives last, the same way it does in the hero.
    if (ai.length) {
      tl.from(
        ai,
        {
          y: -units(svg, clock.distance.drop),
          opacity: 0,
          duration: clock.duration.seat,
          ease: clock.ease.seat,
          clearProps,
        },
        rest.length ? ">-0.1" : 0,
      );
    }
  });
}

const mm = gsap.matchMedia();

// Reduced motion registers nothing: the drawings stay in the assembled state the HTML ships with.
mm.add("(prefers-reduced-motion: no-preference)", () => {
  heroAssembly();
  stepAssemblies();
});

// Web fonts change line wrapping, which moves the step figures; recompute trigger positions once they are in.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
