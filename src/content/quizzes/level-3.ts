import type { Quiz } from "./types";

export const level3: Quiz = {
  slug: "level-3",
  title: "Level 3: Everything So Far",
  description:
    "One exam across intro, Big O, arrays, lists and dictionaries",
  sections: [
    "Introduction",
    "Big O Notation",
    "Arrays",
    "Python Lists",
    "Dictionaries",
  ],
  questions: [
    {
      id: "l3-q01",
      topic: "Introduction",
      prompt:
        "Each item holds a pointer to where the NEXT item lives, like clues in a treasure hunt. Which structure is this?",
      options: ["Array", "Linked list", "Dictionary", "Graph"],
      correctIndex: 1,
      explanation:
        "That's a linked list — items connected by pointers instead of sitting side by side in memory like an array.",
    },
    {
      id: "l3-q02",
      topic: "Big O",
      prompt: "What is the time complexity of this loop?",
      code: "for i in range(0, n, 2):\n    print(i)",
      options: ["O(n/2)", "O(log n)", "O(n)", "O(1)"],
      correctIndex: 2,
      explanation:
        "Stepping by 2 does n/2 iterations — but Big O drops constants, and n/2 grows exactly like n. Skipping every other item is still linear.",
    },
    {
      id: "l3-q03",
      topic: "Big O",
      prompt: "From the course quiz file — what is the time complexity of f3?",
      code: "def f3(n):\n    if n <= 0:\n        return 1\n    else:\n        return 1 + f3(n / 5)",
      options: ["O(n)", "O(n/5)", "O(2ⁿ)", "O(log n)"],
      correctIndex: 3,
      explanation:
        "Each call DIVIDES n by 5 — the problem shrinks multiplicatively, like repeated halving. Dividing each step is O(log n); only subtracting (n-5) would be O(n).",
    },
    {
      id: "l3-q04",
      topic: "Big O",
      prompt:
        "Four algorithms solve the same problem on a HUGE input. Which finishes first?",
      options: [
        "The O(n²) one",
        "The O(2ⁿ) one",
        "The O(log n) one",
        "The O(n) one",
      ],
      correctIndex: 2,
      explanation:
        "The speed ladder: O(1) < O(log n) < O(n) < O(n²) < O(2ⁿ). Of these four, O(log n) is leftmost — a million items takes it only ~20 steps.",
    },
    {
      id: "l3-q05",
      topic: "Big O",
      prompt: "What is the time complexity of this code?",
      code: "for x in myList:        # n items\n    for i in range(10): # always 10\n        print(x, i)",
      options: ["O(n²)", "O(10n)", "O(n)", "O(log n)"],
      correctIndex: 2,
      explanation:
        "The inner loop is a FIXED 10 rounds — a constant, not another n. So it's 10n steps, and dropping the constant leaves O(n). Nested loops are only n² when BOTH depend on n.",
    },
    {
      id: "l3-q06",
      topic: "Arrays",
      prompt: "Which array operation is O(1)?",
      options: [
        "Appending at the very end",
        "Inserting at the front",
        "Searching for a value",
        "Deleting from the middle",
      ],
      correctIndex: 0,
      explanation:
        "The end is the only place nothing needs to shift — append is O(1). Front-inserts, middle-deletes and searches all touch up to n items.",
    },
    {
      id: "l3-q07",
      topic: "Arrays",
      prompt:
        "You linear-search an array of n items for a value that ISN'T there. How many checks happen?",
      options: ["1", "n/2", "all n", "zero — it knows instantly"],
      correctIndex: 2,
      explanation:
        "With no ordering to exploit, the only way to be SURE something is absent is to check every single box — the true worst case of O(n) search.",
    },
    {
      id: "l3-q08",
      topic: "Arrays",
      prompt: "In numpy, what does this line do to a 2D array?",
      code: "bigger = np.append(grid, [[7, 8, 9]], axis=0)",
      options: [
        "Adds a new COLUMN on the right",
        "Adds a new ROW at the bottom",
        "Replaces the first row",
        "Raises an error — you can't grow a 2D array",
      ],
      correctIndex: 1,
      explanation:
        "axis=0 means operate on rows: append glues [7, 8, 9] on as a new row at the bottom. axis=1 would attach along columns instead.",
    },
    {
      id: "l3-q09",
      topic: "Lists",
      prompt: "What does this print?",
      code: "a = [1, 2, 3]\nc = a[:]\nc.append(4)\nprint(a)",
      options: ["[1, 2, 3, 4]", "[1, 2, 3]", "[4]", "an error"],
      correctIndex: 1,
      explanation:
        "a[:] is a real copy — c is a separate list, so appending to c leaves a untouched: [1, 2, 3]. (Plain c = a would have shared the list!)",
    },
    {
      id: "l3-q10",
      topic: "Lists",
      prompt: "What does this comprehension produce?",
      code: "result = [x for x in range(6) if x % 3 == 0]\nprint(result)",
      options: ["[0, 3]", "[3, 6]", "[0, 3, 6]", "[3]"],
      correctIndex: 0,
      explanation:
        "range(6) is 0–5, and the if keeps multiples of 3: just 0 and 3. (6 isn't included — range stops BEFORE its limit.)",
    },
    {
      id: "l3-q11",
      topic: "Lists",
      prompt: "What does this print?",
      code: "letters = list('hi')\nprint(letters)",
      options: [
        "['hi']",
        "'h', 'i'",
        "['h', 'i']",
        "an error",
      ],
      correctIndex: 2,
      explanation:
        "list() on a string splits it into individual CHARACTERS: ['h', 'i']. Compare with 'hi there'.split(), which chops at spaces into words.",
    },
    {
      id: "l3-q12",
      topic: "Dictionaries",
      prompt: "From the course interview questions — what does this print?",
      code: "my_dict = {}\nmy_dict[1] = 1\nmy_dict['1'] = 2\nmy_dict[1.0] = 4\n\nsum = 0\nfor k in my_dict:\n    sum += my_dict[k]\nprint(sum)",
      options: ["7", "a SyntaxError", "3", "6"],
      correctIndex: 3,
      explanation:
        "Sneaky: 1 and 1.0 count as the SAME key (they're equal numbers), so 4 overwrites 1. The string '1' stays separate. Final pairs: {1: 4, '1': 2} → 6.",
    },
    {
      id: "l3-q13",
      topic: "Dictionaries",
      prompt: "Dictionaries inside dictionaries — what does this print?",
      code: "box = {'biscuit': 1, 'cake': 3}\ncrates = {}\ncrates['box'] = box\nprint(len(crates['box']))",
      options: ["1", "2", "3", "a TypeError"],
      correctIndex: 1,
      explanation:
        "crates['box'] hands back the inner dictionary, which has 2 pairs (biscuit and cake) — len counts pairs, not values. From the course's crates question!",
    },
    {
      id: "l3-q14",
      topic: "Dictionaries",
      prompt: "From the course interview questions — what does this print?",
      code: "d = {'c': 97, 'a': 96, 'b': 98}\nfor k in sorted(d):\n    print(d[k])",
      options: [
        "96 98 97",
        "96 97 98",
        "98 97 96",
        "97 96 98",
      ],
      correctIndex: 0,
      explanation:
        "sorted(d) sorts the KEYS alphabetically: a, b, c. Printing their values in that order gives 96 (a), 98 (b), 97 (c).",
    },
    {
      id: "l3-q15",
      topic: "Dictionaries",
      prompt:
        "Looking up myDict['name'] is O(1). What about searching for a VALUE, like the course's searchDict function?",
      options: [
        "Also O(1) — dictionaries are always instant",
        "O(log n) — it halves the search",
        "O(n) — it must walk through every pair",
        "O(n²)",
      ],
      correctIndex: 2,
      explanation:
        "The key-shortcut only works for KEYS. To find which key holds a given VALUE, you check pair by pair — plain linear search, O(n).",
    },
    {
      id: "l3-q16",
      topic: "Lists",
      prompt:
        "The animation shows how a list handles append: usually a free slot is waiting, but once in a while EVERYTHING must be copied into a bigger home. What is the right name for append's overall cost?",
      demo: "amortized",
      options: [
        "O(n) — always assume the worst single step",
        "Amortized O(1) — the rare expensive copy averages out across many cheap appends",
        "O(log n) — because the size doubles",
        "O(0) — appends are free",
      ],
      correctIndex: 1,
      explanation:
        "Most appends are instant; occasionally a resize costs O(n), but doubling makes resizes rarer and rarer, so the average cost per append stays constant. That's what 'amortized' means: judge the whole sequence, not the scariest single step — like friends splitting one big pizza bill.",
    },
  ],
};
