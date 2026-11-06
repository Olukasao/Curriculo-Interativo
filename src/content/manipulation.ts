import type { L } from "./types";

/**
 * Image manipulation, from the Behance projects. Files live in /public/media/manipulation/.
 * Comparisons pair the source collage ("before") with the final composite ("after").
 */
export type Comparison = {
  id: string;
  title: string;
  client?: string;
  /** width / height of the frame */
  ratio: number;
  note: L;
  beforeLabel: L;
  behance: string;
};

export type Series = {
  id: string;
  title: L;
  client: string;
  count: number;
  note: L;
  behance: string;
};

const src = (id: string) => ({
  before: `/media/manipulation/${id}-before.webp`,
  after: `/media/manipulation/${id}-after.webp`,
  thumb: `/media/manipulation/${id}-thumb.webp`,
});
export const comparisonSrc = src;

export const seriesSrc = (id: string, i: number) => ({
  full: `/media/manipulation/${id}-${String(i).padStart(2, "0")}.webp`,
  small: `/media/manipulation/${id}-${String(i).padStart(2, "0")}-sm.webp`,
});

const sources: L = { pt: "Fontes", en: "Sources" };

export const comparisons: Comparison[] = [
  {
    id: "bmw",
    title: "BMW",
    ratio: 3 / 2,
    note: { pt: "Manipulação de carro: deserto, poeira e luz de fim de tarde.", en: "Car manipulation: desert, dust and late-afternoon light." },
    beforeLabel: sources,
    behance: "https://www.behance.net/gallery/195602557/Car-Manipulation-BMW",
  },
  {
    id: "subaru",
    title: "Subaru",
    ratio: 4 / 5,
    note: { pt: "Manipulação e retoque: cenário noturno à beira do lago.", en: "Manipulation and retouch: a night scene by the lake." },
    beforeLabel: sources,
    behance: "https://www.behance.net/gallery/195537643/Subaru-Manipulation-Retouch",
  },
  {
    id: "videogame",
    title: "Video Game Style",
    ratio: 1,
    note: { pt: "Manipulação de carro com estética de videogame.", en: "Car manipulation with a video-game look." },
    beforeLabel: sources,
    behance: "https://www.behance.net/gallery/194921865/Video-Game-Style-Car-Manipulation",
  },
  {
    id: "honda",
    title: "Honda CR-V",
    ratio: 1,
    note: { pt: "Manipulação de imagem: o carro levado para a neve.", en: "Image manipulation: the car taken into the snow." },
    beforeLabel: sources,
    behance: "https://www.behance.net/gallery/195096271/Honda-CR-V-2015-Image-Manipulation",
  },
  {
    id: "coca",
    title: "Frozen Coca-Cola",
    ratio: 3 / 2,
    note: { pt: "A lata modelada em 3D no Blender e integrada à cena de neve.", en: "The can modelled in 3D in Blender and integrated into the snow scene." },
    beforeLabel: { pt: "Render 3D", en: "3D render" },
    behance: "https://www.behance.net/gallery/195208993/Frozen-Coca-Cola",
  },
  {
    id: "elfbar",
    title: "Elfbar",
    client: "Pod Point",
    ratio: 960 / 920,
    note: { pt: "Produto inserido num cenário de praia.", en: "Product placed in a beach scene." },
    beforeLabel: sources,
    behance: "https://www.behance.net/gallery/194636151/Elfbar-Pod-Disposable-Manipulation",
  },
  {
    id: "ignite",
    title: "Ignite v50 — Páscoa",
    client: "Pod Point",
    ratio: 1,
    note: { pt: "Peça de Páscoa: produto, cenário e personagens compostos numa só imagem.", en: "Easter piece: product, setting and characters composed into one image." },
    beforeLabel: sources,
    behance: "https://www.behance.net/gallery/194296879/Ignite-v50-Pod-Disposable-Manipulation-Pascoa",
  },
];

export const series: Series[] = [
  {
    id: "ds-figuras",
    title: { pt: "Demon Slayer — figuras", en: "Demon Slayer — figures" },
    client: "Kollect",
    count: 12,
    note: {
      pt: "Cada figura colecionável ganha um cenário do próprio universo, com a assinatura Kollect your world.",
      en: "Each collectible figure gets a setting from its own universe, signed Kollect your world.",
    },
    behance: "https://www.behance.net/gallery/247846297/Manipulacao-de-Imagem-Demon-Slayer-Kollect",
  },
  {
    id: "ds-chibi",
    title: { pt: "Demon Slayer — chibi", en: "Demon Slayer — chibi" },
    client: "Kollect",
    count: 9,
    note: {
      pt: "As figuras chibi com a caixa original, em cenas de luz e atmosfera próprias.",
      en: "The chibi figures with their original box, each in its own light and atmosphere.",
    },
    behance: "https://www.behance.net/gallery/247846559/Manipulacao-de-Imagem-Demon-Slayer-Kollect",
  },
  {
    id: "pokemon",
    title: { pt: "Pokémon", en: "Pokémon" },
    client: "Kollect",
    count: 9,
    note: {
      pt: "Figuras Pokémon compostas em ambientes que combinam com cada personagem.",
      en: "Pokémon figures composed into environments that suit each character.",
    },
    behance: "https://www.behance.net/gallery/247846655/Manipulacao-de-imagem-Pokemon-Kollect",
  },
];
