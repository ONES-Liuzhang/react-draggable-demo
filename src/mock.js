export function createList(size) {
  return Array.from({ length: size }).map((_, index) => ({
    id: index,
    name: index,
  }));
}
