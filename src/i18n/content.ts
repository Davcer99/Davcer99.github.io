import type { Locale } from "./locales";

/** Part letters tie each drawing to the text; they are the same in both locales. */
export type PartLetter = "A" | "B" | "C" | "D";

export interface Part {
  letter: PartLetter;
  name: string;
  summary: string;
}

export interface ProcessStep {
  name: string;
  detail: string;
  result: string;
  /** The AI step is the only one drawn in process blue. */
  ai?: boolean;
}

export interface Content {
  meta: { title: string; description: string };
  header: {
    model: string;
    navLabel: string;
    nav: { capabilities: string; process: string; contact: string; switchTo: string };
  };
  hero: {
    headline: string;
    lede: string;
    partsHeading: string;
    quantity: string;
    primaryCta: string;
    secondaryCta: string;
    availability: string;
    figure: { mark: string; caption: string };
  };
  capabilities: {
    heading: string;
    intro: string;
    parts: Part[];
  };
  process: {
    heading: string;
    intro: string;
    stepLabel: string;
    resultLabel: string;
    steps: ProcessStep[];
  };
  contact: {
    heading: string;
    body: string;
    cta: string;
    secondaryCta: string;
    emailLabel: string;
  };
  footer: { note: string };
}

export const content: Record<Locale, Content> = {
  es: {
    meta: {
      title: "David Balaguer Cervera · Full-stack que integra IA en producto",
      description:
        "Desarrollador full-stack especializado en IA. Construyo sistemas completos e integro IA y automatización como piezas que funcionan cada día. Trabajo en remoto.",
    },
    header: {
      model: "Modelo DBC · Full-stack + IA",
      navLabel: "Secciones",
      nav: { capabilities: "Qué hago", process: "Cómo trabajo", contact: "Contacto", switchTo: "English" },
    },
    hero: {
      headline: "Full-stack que integra IA en producto",
      lede: "Construyo sistemas completos, de la interfaz a la base de datos, y encajo la IA y la automatización como una pieza más: funcionando cada día, no como demos.",
      partsHeading: "Piezas incluidas",
      quantity: "1×",
      primaryCta: "Escríbeme",
      secondaryCta: "LinkedIn",
      availability: "Disponible · 100 % remoto",
      figure: { mark: "3", caption: "Fig. 3 · El módulo de IA encaja en su hueco; sin piezas sobrantes." },
    },
    capabilities: {
      heading: "Qué hago",
      intro: "Cuatro piezas de un mismo sistema. La IA es una de ellas, no un truco aparte.",
      parts: [
        {
          letter: "A",
          name: "Backend",
          summary: "APIs, servicios y datos que sostienen el producto y su lógica de negocio, conectados con los servicios externos que haga falta.",
        },
        {
          letter: "B",
          name: "Frontend",
          summary: "Interfaces web claras y accesibles, conectadas a datos reales.",
        },
        {
          letter: "C",
          name: "Integración IA",
          summary: "Modelos de lenguaje integrados en flujos reales del producto, con sus límites y su control.",
        },
        {
          letter: "D",
          name: "Automatización",
          summary: "Procesos repetitivos convertidos en flujos que se ejecutan solos.",
        },
      ],
    },
    process: {
      heading: "Cómo trabajo",
      intro: "Cinco pasos, en este orden. Cada uno deja algo comprobable antes de pasar al siguiente.",
      stepLabel: "Paso",
      resultLabel: "Resultado",
      steps: [
        {
          name: "Entender",
          detail: "Qué problema hay, para quién y cómo se mide que está resuelto.",
          result: "Problema, usuario y criterio de éxito acordados.",
        },
        {
          name: "Construir",
          detail: "La base del sistema: interfaz, servicios y datos.",
          result: "Interfaz, servicios y datos funcionando juntos.",
        },
        {
          name: "Integrar IA",
          detail: "La IA entra donde aporta, como una pieza más, con pruebas.",
          result: "La IA encaja en el sistema y se puede probar.",
          ai: true,
        },
        {
          name: "Automatizar",
          detail: "Lo que se repite deja de depender de alguien que lo haga a mano.",
          result: "El proceso repetitivo se ejecuta solo.",
        },
        {
          name: "Entregar",
          detail: "En producción, observable y mantenible.",
          result: "Sistema en producción, con seguimiento.",
        },
      ],
    },
    contact: {
      heading: "¿Dudas?",
      body: "Escríbeme y te respondo con mi disponibilidad y lo que necesites saber. Trabajo 100 % en remoto.",
      cta: "Escríbeme",
      secondaryCta: "Ver LinkedIn",
      emailLabel: "Correo",
    },
    footer: {
      note: "Los dibujos son ilustrativos: no representan proyectos ni clientes reales.",
    },
  },
  en: {
    meta: {
      title: "David Balaguer Cervera · Full-stack developer who builds AI into products",
      description:
        "Full-stack developer specialised in AI. I build complete systems and integrate AI and automation as parts that work every day. Fully remote.",
    },
    header: {
      model: "Model DBC · Full-stack + AI",
      navLabel: "Sections",
      nav: { capabilities: "What I do", process: "How I work", contact: "Contact", switchTo: "Español" },
    },
    hero: {
      headline: "Full-stack developer who builds AI into products",
      lede: "I build complete systems, from the interface to the database, and fit AI and automation in as one more part: working every day, not as demos.",
      partsHeading: "Parts included",
      quantity: "1×",
      primaryCta: "Email me",
      secondaryCta: "LinkedIn",
      availability: "Available · fully remote",
      figure: { mark: "3", caption: "Fig. 3 · The AI module slots into its socket; no spare parts." },
    },
    capabilities: {
      heading: "What I do",
      intro: "Four parts of the same system. AI is one of them, not a separate trick.",
      parts: [
        {
          letter: "A",
          name: "Backend",
          summary: "APIs, services and data that carry the product and its business logic, wired to whichever external services are needed.",
        },
        {
          letter: "B",
          name: "Frontend",
          summary: "Clear, accessible web interfaces wired to real data.",
        },
        {
          letter: "C",
          name: "AI integration",
          summary: "Language models built into real product flows, with their limits and controls.",
        },
        {
          letter: "D",
          name: "Automation",
          summary: "Repetitive processes turned into flows that run on their own.",
        },
      ],
    },
    process: {
      heading: "How I work",
      intro: "Five steps, in this order. Each one leaves something verifiable before the next begins.",
      stepLabel: "Step",
      resultLabel: "Result",
      steps: [
        {
          name: "Understand",
          detail: "What the problem is, who it is for, and how we know it is solved.",
          result: "Problem, user and success criterion agreed.",
        },
        {
          name: "Build",
          detail: "The system's foundation: interface, services and data.",
          result: "Interface, services and data working together.",
        },
        {
          name: "Integrate AI",
          detail: "AI goes where it adds value, as one more part, with tests.",
          result: "The AI fits into the system and can be tested.",
          ai: true,
        },
        {
          name: "Automate",
          detail: "What repeats stops depending on someone doing it by hand.",
          result: "The repetitive process runs on its own.",
        },
        {
          name: "Ship",
          detail: "In production, observable and maintainable.",
          result: "System in production, with monitoring.",
        },
      ],
    },
    contact: {
      heading: "Questions?",
      body: "Email me and I will reply with my availability and anything else you need to know. I work fully remote.",
      cta: "Email me",
      secondaryCta: "View LinkedIn",
      emailLabel: "Email",
    },
    footer: {
      note: "The drawings are illustrative: they do not depict real projects or clients.",
    },
  },
};
