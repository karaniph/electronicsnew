import Fuse from "fuse.js";

export function fuzzySearch(list, query, keys) {
  const fuse = new Fuse(list, {
    keys,
    threshold: 0.4, // balance between strict and fuzzy
    includeScore: true,
  });
  return fuse.search(query).map(result => result.item);
}
