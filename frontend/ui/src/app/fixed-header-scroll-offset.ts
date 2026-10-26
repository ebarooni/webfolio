export function fixedHeaderScrollOffset(
  documentRef: Document,
): [number, number] {
  const header = documentRef.querySelector('header');

  if (!(header instanceof HTMLElement)) {
    return [0, 0];
  }

  return [0, header.offsetHeight];
}
