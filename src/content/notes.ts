export type NoteDoc = { slug: string; title: string; blurb: string };

/** Every study doc, in reading order. Adding one here wires it into the
 *  notes route, home links, admin study-docs matrix, and read tracking. */
export const noteDocs: NoteDoc[] = [
  {
    slug: "python",
    title: "Python Crash Course",
    blurb: "the syntax behind every snippet",
  },
  {
    slug: "introduction",
    title: "Introduction",
    blurb: "structures, algorithms & friends",
  },
  {
    slug: "big-o",
    title: "Big O Notation",
    blurb: "counting steps, not seconds",
  },
  {
    slug: "arrays",
    title: "Arrays",
    blurb: "numbered boxes, side by side",
  },
  {
    slug: "lists",
    title: "Python Lists",
    blurb: "the array's flexible cousin",
  },
  {
    slug: "dictionaries",
    title: "Dictionaries",
    blurb: "key : value pairs, instant lookup",
  },
];

export const noteSlugs = noteDocs.map((doc) => doc.slug);
