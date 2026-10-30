// Callout geometry of src/assets/illustrations/hero-assembly.svg, in viewBox units.
// Source of truth: .impeccable/assets-preview/hero-meta.json, written by the illustration generator.
export const heroViewBox = { width: 637.3, height: 548.8 } as const;

export const heroCalloutRadius = 15;

export type CalloutSide = "above" | "below" | "right";

export const heroCallouts: Record<"A" | "B" | "C" | "D", { x: number; y: number; side: CalloutSide }> = {
  A: { x: 26.4, y: 443.2, side: "below" },
  B: { x: 93.6, y: 176.3, side: "above" },
  C: { x: 422.8, y: 26.4, side: "right" },
  D: { x: 425.9, y: 444.0, side: "right" },
};
