/**
 * Single source of truth for all copy + brand data.
 * Pulled from the live LivLive site so the landing page stays truthful.
 */

export const site = {
  name: "LIVLIVE",
  est: "EST. 2026",
  hashtag: "#itoocanhost",
  tagline: "host IRL events in 10 mins",
  hook: "the largest partnership network for people who throw real-world events",
  cta: {
    primary: { label: "join the waitlist", href: "#join" },
    secondary: { label: "gain early access", href: "#join" },
  },
  contact: {
    instagram: { label: "@we_liv.live", href: "https://instagram.com/we_liv.live" },
    phone: { label: "+91 983 323 0099", href: "tel:+919833230099" },
    email: { label: "vansh@welivlive.com", href: "mailto:vansh@welivlive.com" },
  },
} as const;

export const nav = [
  { label: "the network", href: "#network" },
  { label: "superpowers", href: "#superpowers" },
  { label: "how it works", href: "#how" },
] as const;

export const posters = [
  {
    src: "/posters/IMG_4806.PNG",
    alt: "LivLive event poster",
    color: "var(--color-sun)",
    rotate: -7,
  },
  {
    src: "/posters/IMG_4303.PNG",
    alt: "LivLive community poster",
    color: "var(--color-cyan)",
    rotate: 4,
  },
  {
    src: "/posters/IMG_6107.PNG",
    alt: "LivLive event flyer",
    color: "var(--color-magenta)",
    rotate: 8,
  },
  {
    src: "/posters/IMG_6108.PNG",
    alt: "LivLive night event poster",
    color: "var(--color-blue)",
    rotate: -5,
  },
  {
    src: "/posters/IMG_6109.PNG",
    alt: "LivLive social event poster",
    color: "var(--color-ink)",
    rotate: 5,
  },
] as const;

/** The "multiverse of partners" — LivLive's core network. */
export type Universe = {
  key: string;
  title: string;
  blurb: string;
  color: string; // css var token
  glyph: string; // emoji placeholder, redrawn as comic sticker
  sound: string; // comic onomatopoeia
};

export const universes: Universe[] = [
  {
    key: "venues",
    title: "venues",
    blurb: "cafés, bars & offices with standardised packages & real-time availability.",
    color: "var(--color-blue)",
    glyph: "🏙️",
    sound: "BOOM!",
  },
  {
    key: "talent",
    title: "talent",
    blurb: "DJs, photographers, musicians, speakers & connoisseurs — booked in taps.",
    color: "var(--color-magenta)",
    glyph: "🎧",
    sound: "ZAP!",
  },
  {
    key: "vendors",
    title: "vendors",
    blurb: "catering, merch, décor, equipment rentals & full event ops on demand.",
    color: "var(--color-green)",
    glyph: "📦",
    sound: "POP!",
  },
  {
    key: "sponsors",
    title: "sponsors",
    blurb: "brands that actually align with the interests of your community.",
    color: "var(--color-violet)",
    glyph: "💸",
    sound: "KA-CHING!",
  },
];

/** Host "superpowers" — the AI toolkit built for hosts. */
export type Power = {
  key: string;
  title: string;
  blurb: string;
  color: string;
  sound: string;
};

export const powers: Power[] = [
  {
    key: "ticketing",
    title: "ticketing & RSVP",
    blurb: "sell tickets, approve guests and run the door without the spreadsheet chaos.",
    color: "var(--color-punch)",
    sound: "THWIP!",
  },
  {
    key: "marketing",
    title: "event marketing",
    blurb: "spin up promo, invites and reminders that actually fill the room.",
    color: "var(--color-blue)",
    sound: "WHAM!",
  },
  {
    key: "community",
    title: "community engagement",
    blurb: "community chats, roles and loyalty so the hype never logs off.",
    color: "var(--color-magenta)",
    sound: "BUZZ!",
  },
  {
    key: "analytics",
    title: "online + offline analytics",
    blurb: "measure loyalty, personalise targeting and design data-driven workflows.",
    color: "var(--color-green)",
    sound: "PING!",
  },
];

/** The "text → booking" demo script. */
export const bookingDemo = {
  prompt: "throw a rooftop techno night for 200 in Bandra this Saturday",
  results: [
    { tag: "venue", label: "Aer Rooftop · 9pm", color: "var(--color-blue)" },
    { tag: "talent", label: "DJ KOHRA + opener", color: "var(--color-magenta)" },
    { tag: "vendor", label: "bar + sound rig", color: "var(--color-green)" },
    { tag: "sponsor", label: "an energy-drink brand", color: "var(--color-violet)" },
  ],
} as const;
