import "./globals.css";
import { design, text } from "@/config";

export const metadata = {
  title: text.pageTitle,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// Pass design values from config.js to the stylesheet
const c = design.colors;
const s = design.sizes;
// Every color in config.js becomes a CSS variable: primaryHover -> --primary-hover
const toVar = (name) => "--" + name.replace(/[A-Z0-9]+/g, (m) => "-" + m.toLowerCase());
const cssVars = {
  ...Object.fromEntries(Object.entries(c).map(([k, v]) => [toVar(k), v])),
  "--bg": c.background,
  "--font": `"${design.font.family}", system-ui, -apple-system, "Segoe UI", sans-serif`,
  "--size-title": s.title,
  "--size-body": s.body,
  "--size-input": s.input,
  "--size-button": s.button,
  "--size-label": s.label,
  "--size-value": s.value,
  "--size-reward": s.reward,
  "--size-badge": s.badge,
  "--control-height": s.controlHeight,
  "--card-radius": s.cardRadius,
  "--control-radius": s.controlRadius,
  "--card-max-width": s.cardMaxWidth,
  "--shadow": design.shadow,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={cssVars}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={design.font.url} />
      </head>
      <body>{children}</body>
    </html>
  );
}
