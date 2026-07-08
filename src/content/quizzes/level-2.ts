import type { Quiz } from "./types";

export const level2: Quiz = {
  slug: "level-2",
  title: "Level 2: Everything So Far",
  description: "One exam across Sections 1–4: intro, Big O, arrays & lists",
  sections: ["Introduction", "Big O Notation", "Arrays", "Python Lists"],
  questions: [
    {
      id: "l2-q01",
      topic: "Introduction",
      prompt:
        "You can only add or remove from the TOP, and the last thing you put in is the first thing you take out. Which structure is this?",
      options: ["Queue", "Array", "Stack", "Tree"],
      correctIndex: 2,
      explanation:
        "Last in, first out (LIFO) is a stack — like a pile of plates. A queue is the opposite: first in, first out, like a canteen line.",
    },
    {
      id: "l2-q02",
      topic: "Introduction",
      prompt:
        "Which kind of algorithm REMEMBERS answers it already worked out so it never solves the same subproblem twice?",
      options: [
        "Brute force",
        "Dynamic programming",
        "Greedy",
        "Randomized",
      ],
      correctIndex: 1,
      explanation:
        "That's dynamic programming's whole trick: store solved pieces and reuse them. Greedy grabs the best-looking option now; brute force tries everything without remembering.",
    },
    {
      id: "l2-q03",
      topic: "Big O",
      prompt: "What is the time complexity of this code?",
      code: "for x in myList:\n    print(x)\n\nfor y in myList:\n    print(y)",
      options: ["O(n²)", "O(2ⁿ)", "O(n)", "O(log n)"],
      correctIndex: 2,
      explanation:
        "Two loops one AFTER the other over the same list is n + n = 2n steps — and Big O drops constants, so it's O(n). It would only be O(n²) if one loop were INSIDE the other.",
    },
    {
      id: "l2-q04",
      topic: "Big O",
      prompt: "Simplify O(3n² + 10n + 500) using the Big O rules.",
      options: ["O(n²)", "O(3n²)", "O(n² + n)", "O(500)"],
      correctIndex: 0,
      explanation:
        "Two rules at once: drop non-dominant terms (10n and 500 vanish next to n²), then drop constants (3n² → n²). Only the biggest shape survives.",
    },
    {
      id: "l2-q05",
      topic: "Big O",
      prompt:
        "The animation shows how much work an algorithm has left after each step. What is its time complexity?",
      demo: "halving",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctIndex: 1,
      explanation:
        "The remaining work HALVES every step: 16 → 8 → 4 → 2 → 1. Repeated halving is the signature of O(log n) — huge inputs collapse in just a few steps.",
    },
    {
      id: "l2-q06",
      topic: "Big O",
      prompt: "From the course quiz file — what is the time complexity of f2?",
      code: "def f2(n):\n    if n <= 0:\n        return 1\n    else:\n        return 1 + f2(n - 5)",
      options: ["O(log n)", "O(2ⁿ)", "O(n)", "O(5n)"],
      correctIndex: 2,
      explanation:
        "Each call shrinks n by 5, so there are about n/5 calls. Drop the constant: O(n). Subtracting a fixed amount each call is linear — only DIVIDING n gives you O(log n).",
    },
    {
      id: "l2-q07",
      topic: "Big O",
      prompt: "What is the SPACE complexity of this function?",
      code: "def make_zeros(n):\n    return [0] * n",
      options: ["O(1)", "O(log n)", "O(n²)", "O(n)"],
      correctIndex: 3,
      explanation:
        "It builds a list with n zeros — n boxes of memory. Time and space are separate questions; this one is O(n) in both.",
    },
    {
      id: "l2-q08",
      topic: "Arrays",
      prompt:
        "How does the computer find array[7] instantly, without checking boxes 0–6?",
      options: [
        "It calculates the address: start + 7 × box size",
        "It keeps a secret map of every index",
        "It scans very quickly from the front",
        "It can't — indexing is O(n)",
      ],
      correctIndex: 0,
      explanation:
        "Because array boxes are equal-sized and side by side in memory, one multiplication and one addition give the exact address. That arithmetic is why access is O(1).",
    },
    {
      id: "l2-q09",
      topic: "Arrays",
      prompt:
        "The animation shows insert(0, 99). Why does this operation cost O(n)?",
      demo: "insert-shift",
      options: [
        "The computer must ask permission for index 0",
        "Every existing element shifts one position to make room",
        "The new value must be compared with every other value",
        "It doesn't — inserting is always O(1)",
      ],
      correctIndex: 1,
      explanation:
        "The side-by-side memory layout means opening a slot at the front pushes ALL n existing items one spot right — n moves, O(n).",
    },
    {
      id: "l2-q10",
      topic: "Arrays",
      prompt: "In numpy, what does this remove from a 2D array?",
      code: "smaller = np.delete(grid, 0, axis=0)",
      options: [
        "The first COLUMN",
        "The element at [0][0]",
        "The last row",
        "The first ROW",
      ],
      correctIndex: 3,
      explanation:
        "axis=0 → rows, axis=1 → columns. delete(…, 0, axis=0) removes the row at index 0 — the first row. (The milestone 1 version of this asked about axis=1!)",
    },
    {
      id: "l2-q11",
      topic: "Arrays",
      prompt:
        "A grid has m rows and n columns. Visiting every cell with a nested loop costs…",
      options: ["O(m + n)", "O(m × n)", "O(n²) always", "O(1)"],
      correctIndex: 1,
      explanation:
        "Nested loops over DIFFERENT ranges multiply: m rows × n columns = m×n cells visited. It's only n² in the special case where m equals n.",
    },
    {
      id: "l2-q12",
      topic: "Lists",
      prompt: "What does this print?",
      code: "x = [1, 2]\ny = x\ny[0] = 99\nprint(x)",
      options: ["[1, 2]", "[99, 2]", "[99]", "an error"],
      correctIndex: 1,
      explanation:
        "y = x makes both names point at the SAME list. Changing y[0] changes the one shared list, so x sees [99, 2]. Use x[:] when you want a real copy.",
    },
    {
      id: "l2-q13",
      topic: "Lists",
      prompt: "What does this comprehension produce?",
      code: "words = ['hi', 'hey', 'hello']\nlengths = [len(w) for w in words]\nprint(lengths)",
      options: [
        "['hi', 'hey', 'hello']",
        "[2, 3, 5]",
        "10",
        "[3, 3, 3]",
      ],
      correctIndex: 1,
      explanation:
        "The comprehension runs len() on each word and collects the results: len('hi')=2, len('hey')=3, len('hello')=5 → [2, 3, 5].",
    },
    {
      id: "l2-q14",
      topic: "Lists",
      prompt: "What does this slice print?",
      code: "letters = ['a', 'b', 'c', 'd']\nprint(letters[1:3])",
      options: [
        "['b', 'c', 'd']",
        "['a', 'b', 'c']",
        "['b', 'c']",
        "['c', 'd']",
      ],
      correctIndex: 2,
      explanation:
        "Indexes 1 up to but NOT including 3 → positions 1 and 2 → ['b', 'c']. The stop index never makes it in.",
    },
    {
      id: "l2-q15",
      topic: "Lists",
      prompt:
        "myList has a million items. Which of these finishes instantly, no matter the size?",
      options: [
        "500 in myList",
        "myList.insert(0, 500)",
        "myList[500]",
        "myList.remove(500)",
      ],
      correctIndex: 2,
      explanation:
        "Indexing is address math — O(1) no matter how big the list is. `in` and remove must search item by item (O(n)), and insert(0, …) shifts everything (O(n)).",
    },
  ],
};
