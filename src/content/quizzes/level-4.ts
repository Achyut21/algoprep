import type { Quiz } from "./types";

export const level4: Quiz = {
  slug: "level-4",
  title: "Level 4: Everything So Far",
  description:
    "One exam across intro, Big O, arrays, lists, dictionaries & tuples",
  sections: [
    "Introduction",
    "Big O Notation",
    "Arrays",
    "Python Lists",
    "Dictionaries",
    "Tuples",
  ],
  questions: [
    {
      id: "l4-q01",
      topic: "Introduction",
      prompt:
        "Anything can connect to anything — friends in a social network, cities on a map. Which structure is this?",
      options: ["Tree", "Stack", "Graph", "Array"],
      correctIndex: 2,
      explanation:
        "That's a graph: nodes with connections in any direction, no single root. A tree is the stricter cousin — one root, branches, no loops.",
    },
    {
      id: "l4-q02",
      topic: "Big O",
      prompt: "arrayA has a items, arrayB has b items. Time complexity?",
      code: "for x in arrayA:\n    for y in arrayB:\n        print(x, y)",
      options: ["O(a + b)", "O(a × b)", "O(a²)", "O(n log n)"],
      correctIndex: 1,
      explanation:
        "One loop INSIDE the other over different inputs → MULTIPLY: every x meets every y, a × b pairs. Sequential loops would ADD instead.",
    },
    {
      id: "l4-q03",
      topic: "Big O",
      prompt: "Simplify O(n + log n) using the Big O rules.",
      options: ["O(log n)", "O(n log n)", "O(n)", "O(2n)"],
      correctIndex: 2,
      explanation:
        "Drop non-dominant terms: n grows faster than log n, so the log n vanishes. O(n). (Don't confuse n + log n with n × log n!)",
    },
    {
      id: "l4-q04",
      topic: "Big O",
      prompt: "Which of these operations are O(1)?",
      code: "myList[5]\nmyDict['name']\nmyTuple[2]",
      options: [
        "Only the list one",
        "Only the dictionary one",
        "The list and tuple, but not the dictionary",
        "All three",
      ],
      correctIndex: 3,
      explanation:
        "Cross-structure pattern: lists and tuples index by address math, dictionaries jump by key — all O(1). SEARCHING any of them by value is what costs O(n).",
    },
    {
      id: "l4-q05",
      topic: "Big O",
      prompt:
        "You remember WHY list append is called amortized O(1). Which explanation is right?",
      options: [
        "Every single append is exactly one step, no exceptions",
        "Rare expensive resizes are averaged out across many cheap appends",
        "Python secretly uses a dictionary underneath",
        "It's actually O(n) and everyone rounds down",
      ],
      correctIndex: 1,
      explanation:
        "Most appends drop into a spare slot; occasionally a full copy into a bigger home costs O(n) — but doubling makes that rare, so the average per append stays constant.",
    },
    {
      id: "l4-q06",
      topic: "Arrays",
      prompt: "In numpy, what does this remove from a 2D array?",
      code: "smaller = np.delete(grid, 1, axis=0)",
      options: [
        "The second COLUMN",
        "The second ROW",
        "The element at [1][1]",
        "The last row",
      ],
      correctIndex: 1,
      explanation:
        "axis=0 → rows: delete the row at index 1, the second row. (Milestone 1 asked the axis=1 twin of this question — columns.)",
    },
    {
      id: "l4-q07",
      topic: "Arrays",
      prompt: "Time complexity of accessing one cell, grid[i][j], in a 2D array?",
      options: ["O(1)", "O(m + n)", "O(mn)", "O(n)"],
      correctIndex: 0,
      explanation:
        "Rows and columns just extend the address math: start + row × width + column. One calculation, O(1) — no matter how big the grid.",
    },
    {
      id: "l4-q08",
      topic: "Lists",
      prompt: "What does this print?",
      code: "nums = [5, 3, 5, 7]\nnums.remove(5)\nprint(nums)",
      options: [
        "[3, 7]",
        "[5, 3, 7]",
        "[3, 5, 7]",
        "[5, 3, 5]",
      ],
      correctIndex: 2,
      explanation:
        "remove(5) deletes only the FIRST 5 it finds — the one at index 0. The second 5 survives: [3, 5, 7].",
    },
    {
      id: "l4-q09",
      topic: "Lists",
      prompt: "What does this comprehension produce?",
      code: "words = ['sun', 'moon']\nfirsts = [w[0] for w in words]\nprint(firsts)",
      options: [
        "['sun', 'moon']",
        "['s', 'm']",
        "'sm'",
        "[3, 4]",
      ],
      correctIndex: 1,
      explanation:
        "w[0] grabs the first CHARACTER of each word (strings index like lists!): ['s', 'm'].",
    },
    {
      id: "l4-q10",
      topic: "Lists",
      prompt: "What does this print?",
      code: "a = [1, 2]\nb = a\nc = a[:]\nb.append(3)\nc.append(4)\nprint(a)",
      options: [
        "[1, 2]",
        "[1, 2, 3, 4]",
        "[1, 2, 3]",
        "[1, 2, 4]",
      ],
      correctIndex: 2,
      explanation:
        "b = a SHARES the list, so b.append(3) shows up in a. c = a[:] is a separate copy, so c.append(4) doesn't. a ends as [1, 2, 3].",
    },
    {
      id: "l4-q11",
      topic: "Dictionaries",
      prompt: "This is the one-line counting trick. What does it do?",
      code: "counts[w] = counts.get(w, 0) + 1",
      options: [
        "Crashes if w isn't in counts yet",
        "First time it sees w it starts at 0 + 1; after that it adds 1 to the existing count",
        "Deletes w from counts",
        "Counts only the first occurrence",
      ],
      correctIndex: 1,
      explanation:
        "get(w, 0) returns the current count OR 0 if w is new — no KeyError possible. Add 1, store it back. The whole word-counter in one line.",
    },
    {
      id: "l4-q12",
      topic: "Dictionaries",
      prompt: "Which line gives you (key, value) pairs to loop over?",
      code: "ages = {'ana': 11, 'rohan': 13}",
      options: [
        "for pair in ages.items():",
        "for pair in ages.keys():",
        "for pair in ages.values():",
        "for pair in ages.pairs():",
      ],
      correctIndex: 0,
      explanation:
        "items() yields ('ana', 11), ('rohan', 13)… keys() gives only names, values() only numbers, and pairs() doesn't exist.",
    },
    {
      id: "l4-q13",
      topic: "Tuples",
      prompt: "From the course quiz — what does this print?",
      code: "init_tuple = [(0, 1), (1, 2), (2, 3)]\nresult = sum(n for _, n in init_tuple)\nprint(result)",
      options: ["3", "6", "9", "nothing gets printed"],
      correctIndex: 1,
      explanation:
        "Each pair unpacks as (_, n): the underscore throws away the first number, keeping 1, 2, 3. Their sum is 6. Unpacking tuples like this is everywhere in real Python.",
    },
    {
      id: "l4-q14",
      topic: "Tuples",
      prompt: "Which line raises an error?",
      code: "t = ('a', 'b', 'c')",
      options: [
        "print(t[1:3])",
        "print(t.count('a'))",
        "t[0] = 'z'",
        "print(len(t))",
      ],
      correctIndex: 2,
      explanation:
        "Slicing, counting and measuring only READ the tuple — all fine. Assigning to t[0] tries to CHANGE it: TypeError, tuples are immutable.",
    },
    {
      id: "l4-q15",
      topic: "Tuples",
      prompt: "Why does this dictionary work?",
      code: "distances = {('home', 'school'): 2.5,\n             ('home', 'park'): 1.2}",
      options: [
        "Because dictionaries accept anything as a key",
        "It doesn't — it raises a TypeError",
        "Because the tuples are immutable, they qualify as keys",
        "Because the values are numbers",
      ],
      correctIndex: 2,
      explanation:
        "Keys must never change, and tuples can't — perfect match. This is THE practical reason tuples exist: pairing things up as dictionary keys. A list key would crash.",
    },
  ],
};
