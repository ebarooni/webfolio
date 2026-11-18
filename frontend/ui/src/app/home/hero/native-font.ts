type PlatformFont = Readonly<{ pattern: RegExp; fontFamily: string }>;

const PLATFORM_FONTS: readonly PlatformFont[] = [
  {
    pattern: /iPhone|iPad|Macintosh/,
    fontFamily:
      "ui-rounded, 'SF Pro Rounded', -apple-system, system-ui, sans-serif",
  },
  {
    pattern: /Android/,
    fontFamily: "'Google Sans', Roboto, system-ui, sans-serif",
  },
  {
    pattern: /Windows/,
    fontFamily:
      "'Segoe UI Variable Display', 'Segoe UI', system-ui, sans-serif",
  },
];

const FALLBACK_FONT_FAMILY = 'Ubuntu, Cantarell, system-ui, sans-serif';

// The words "feel native" use a font that is typical for the platform.
export function nativeFontFamily(userAgent: string): string {
  const platformFont = PLATFORM_FONTS.find(({ pattern }) =>
    pattern.test(userAgent),
  );

  return platformFont?.fontFamily ?? FALLBACK_FONT_FAMILY;
}
