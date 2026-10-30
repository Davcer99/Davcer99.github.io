import type { Locale } from "./locales";

export type CapabilityId = "frontend" | "backend" | "ai" | "automation" | "integrations";

export interface Content {
  meta: { title: string; description: string };
  nav: { capabilities: string; process: string; contact: string; switchTo: string };
  hero: {
    headline: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    availability: string;
  };
  capabilities: {
    heading: string;
    intro: string;
    items: Record<CapabilityId, { name: string; summary: string }>;
  };
  process: {
    heading: string;
    steps: { name: string; detail: string }[];
  };
  contact: { heading: string; body: string; cta: string; secondaryCta: string };
}

export const content: Record<Locale, Content> = {
  es: {
    meta: {
      title: "David Balaguer Cervera · Full-stack que integra IA en producto",
      description:
        "Desarrollador full-stack especializado en IA. Construyo sistemas completos e integro IA y automatización como piezas que funcionan cada día. Trabajo en remoto.",
    },
    nav: { capabilities: "Qué hago", process: "Cómo trabajo", contact: "Contacto", switchTo: "English" },
    hero: {
      headline: "Full-stack que integra IA en producto",
      lede: "Construyo sistemas completos, de la interfaz a la base de datos, y les integro IA y automatización como piezas que funcionan cada día, no como demos.",
      primaryCta: "Escríbeme",
      secondaryCta: "LinkedIn",
      availability: "Disponible · 100 % remoto",
    },
    capabilities: {
      heading: "Qué hago",
      intro: "Cinco piezas de un mismo tablero. La IA es una de ellas, no un truco aparte.",
      items: {
        frontend: { name: "Frontend", summary: "Interfaces web claras y accesibles, conectadas a datos reales." },
        backend: { name: "Backend", summary: "APIs y servicios que sostienen el producto y su lógica de negocio." },
        ai: { name: "IA", summary: "Modelos de lenguaje integrados en flujos reales del producto, con sus límites y su control." },
        automation: { name: "Automatización", summary: "Procesos repetitivos convertidos en flujos que se ejecutan solos." },
        integrations: { name: "Integraciones", summary: "Servicios externos, datos y herramientas unidos en un mismo sistema." },
      },
    },
    process: {
      heading: "Cómo trabajo",
      steps: [
        { name: "Entender", detail: "Qué problema hay, para quién y cómo se mide que está resuelto." },
        { name: "Construir", detail: "La base del sistema: interfaz, servicios y datos." },
        { name: "Integrar IA", detail: "La IA entra donde aporta, como una pieza más, con pruebas." },
        { name: "Automatizar", detail: "Lo que se repite deja de depender de alguien que lo haga a mano." },
        { name: "Entregar", detail: "En producción, observable y mantenible." },
      ],
    },
    contact: {
      heading: "¿Buscas a alguien así?",
      body: "Escríbeme y te respondo con disponibilidad y lo que necesites saber. Trabajo 100 % en remoto.",
      cta: "Escríbeme",
      secondaryCta: "Ver LinkedIn",
    },
  },
  en: {
    meta: {
      title: "David Balaguer Cervera · Full-stack developer who builds AI into products",
      description:
        "Full-stack developer specialised in AI. I build complete systems and integrate AI and automation as parts that work every day. Fully remote.",
    },
    nav: { capabilities: "What I do", process: "How I work", contact: "Contact", switchTo: "Español" },
    hero: {
      headline: "Full-stack developer who builds AI into products",
      lede: "I build complete systems, from the interface to the database, and integrate AI and automation as parts that work every day, not as demos.",
      primaryCta: "Email me",
      secondaryCta: "LinkedIn",
      availability: "Available · fully remote",
    },
    capabilities: {
      heading: "What I do",
      intro: "Five parts of the same board. AI is one of them, not a separate trick.",
      items: {
        frontend: { name: "Frontend", summary: "Clear, accessible web interfaces wired to real data." },
        backend: { name: "Backend", summary: "APIs and services that carry the product and its business logic." },
        ai: { name: "AI", summary: "Language models built into real product flows, with their limits and controls." },
        automation: { name: "Automation", summary: "Repetitive processes turned into flows that run on their own." },
        integrations: { name: "Integrations", summary: "External services, data and tools joined into one system." },
      },
    },
    process: {
      heading: "How I work",
      steps: [
        { name: "Understand", detail: "What the problem is, who it is for, and how we know it is solved." },
        { name: "Build", detail: "The system's foundation: interface, services and data." },
        { name: "Integrate AI", detail: "AI goes where it adds value, as one more part, with tests." },
        { name: "Automate", detail: "What repeats stops depending on someone doing it by hand." },
        { name: "Ship", detail: "In production, observable and maintainable." },
      ],
    },
    contact: {
      heading: "Looking for someone like this?",
      body: "Email me and I will reply with my availability and anything else you need to know. I work fully remote.",
      cta: "Email me",
      secondaryCta: "View LinkedIn",
    },
  },
};
