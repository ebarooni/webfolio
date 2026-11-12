const SOURCE_URL = 'https://github.com/ebarooni/webfolio';

export function greetCuriousVisitors(): void {
  console.info(
    '%cHi, curious one.%c The source is on GitHub: %s',
    'font-size: 14px; font-weight: 700',
    'font-weight: 400',
    SOURCE_URL,
  );
}
