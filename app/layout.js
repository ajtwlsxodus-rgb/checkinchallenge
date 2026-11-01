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
const cssVars = {
  "--primary": c.primary,
  "--primary-hover": c.primaryHover,
  "--primary-soft": c.primarySoft,
  "--primary-text": c.primaryText,
  "--bg": c.background,
  "--card": c.card,
  "--text": c.text,
  "--sub-text": c.subText,
  "--border": c.border,
  "--gray-badge-bg": c.grayBadgeBg,
  "--gray-badge-text": c.grayBadgeText,
  "--error-bg": c.errorBg,
  "--error-text": c.errorText,
  "--error-border": c.errorBorder,
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
