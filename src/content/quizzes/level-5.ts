import type { Quiz } from "./types";

export const level5: Quiz = {
  slug: "level-5",
  title: "Level 5: Boss Round",
  description:
    "30 harder questions across everything so far — no practice mode, come prepared",
  sections: [
    "Introduction",
    "Big O Notation",
    "Arrays",
    "Python Lists",
    "Dictionaries",
    "Tuples",
  ],
  noPractice: true,
  questions: [
    // ── Introduction ────────────────────────────────────────────────
    {
      id: "l5-q01",
      topic: "Introduction",
      prompt:
        "The UNDO button in an editor takes back the MOST RECENT action first. Which structure fits best?",
      options: ["Queue", "Stack", "Dictionary", "Graph"],
      correctIndex: 1,
      explanation:
        "Undo is last in, first out: the newest action is the first one undone — a stack. A queue would undo your OLDEST action first, which would be chaos.",
    },
    {
      id: "l5-q02",
      topic: "Introduction",
      prompt:
        "A printer prints jobs in the exact order people sent them. Which structure fits best?",
      options: ["Stack", "Tree", "Queue", "Tuple"],
      correctIndex: 2,
      explanation:
        "First in, first out — the definition of a queue. The job that arrived first prints first, newcomers join the back of the line.",
    },
    {
      id: "l5-q03",
      topic: "Introduction",
      prompt:
        "The number-guessing game — guess the middle, throw away half, repeat — is an example of which algorithm family?",
      options: [
        "Brute force",
        "Greedy",
        "Divide and conquer",
        "Randomized",
      ],
      correctIndex: 2,
      explanation:
        "Splitting the problem and discarding half each round is divide and conquer. Brute force would guess 1, 2, 3… and greedy has nothing 'locally best' to grab here.",
    },

    // ── Big O ───────────────────────────────────────────────────────
    {
      id: "l5-q04",
      topic: "Big O",
      prompt: "What is the time complexity of this code?",
      code: "for x in myList:          # n items\n    print(x)\n\nfor x in myList:\n    for y in myList:\n        print(x, y)",
      options: ["O(n)", "O(n² + n)", "O(n²)", "O(2n²)"],
      correctIndex: 2,
      explanation:
        "The pieces cost n and n². Sequential code ADDS: n² + n — then Big O drops the non-dominant n. Final answer O(n²): the biggest shape always wins.",
    },
    {
      id: "l5-q05",
      topic: "Big O",
      prompt: "What is the time complexity of this loop?",
      code: "while n > 1:\n    n = n // 2",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctIndex: 1,
      explanation:
        "n halves every round: 16 → 8 → 4 → 2 → 1. That's the halving pattern as real code — O(log n). (// is floor division: divide and chop the decimals.)",
    },
    {
      id: "l5-q06",
      topic: "Big O",
      prompt:
        "From the course quiz file — f4 calls itself TWICE per call. Its time complexity?",
      code: "def f4(n, m, o):\n    if n <= 0:\n        print(n, m, o)\n    else:\n        f4(n-1, m+1, o)\n        f4(n-1, m, o+1)",
      options: ["O(n)", "O(n²)", "O(log n)", "O(2ⁿ)"],
      correctIndex: 3,
      explanation:
        "Every call spawns TWO more: 1 → 2 → 4 → 8… The extra parameters are a distraction — two self-calls with n-1 is the exponential signature, O(2ⁿ).",
    },
    {
      id: "l5-q07",
      topic: "Big O",
      prompt:
        "Both of these count down from n. Which statement about SPACE is true?",
      code: "def rec(n):              # version A\n    if n <= 0: return\n    rec(n - 1)\n\ndef loop(n):             # version B\n    while n > 0:\n        n -= 1",
      options: [
        "Both use O(1) space",
        "Both use O(n) space",
        "A uses O(n) space (call stack), B uses O(1)",
        "A uses O(1), B uses O(n)",
      ],
      correctIndex: 2,
      explanation:
        "Recursion piles up n unfinished calls on the call stack before unwinding — O(n) memory. The loop reuses one variable — O(1). Same job, very different space bills.",
    },
    {
      id: "l5-q08",
      topic: "Big O",
      prompt: "The inner loop grows with i. What is the total time complexity?",
      code: "for i in range(n):\n    for j in range(i):\n        print(i, j)",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
      correctIndex: 2,
      explanation:
        "The inner loop runs 0 + 1 + 2 + … + (n-1) times — about n²/2 total. Drop the constant ½: O(n²). A shrinking inner loop does NOT escape quadratic.",
    },
    {
      id: "l5-q09",
      topic: "Big O",
      prompt:
        "An O(log n) algorithm processes 1,000,000 items. Roughly how many steps does it take?",
      options: ["About 20", "About 1,000", "About 500,000", "About 1,000,000"],
      correctIndex: 0,
      explanation:
        "Halving a million: 1,000,000 → 500,000 → … → 1 takes about 20 cuts (2²⁰ ≈ a million). That absurd shrinkage is why O(log n) sits next to O(1) on the ladder.",
    },
    {
      id: "l5-q10",
      topic: "Big O",
      prompt:
        "You append n items to an empty list, one by one. What is the TOTAL cost of all n appends?",
      options: [
        "O(n²) — each append might resize",
        "O(n) — amortized O(1) each, times n",
        "O(log n)",
        "O(1)",
      ],
      correctIndex: 1,
      explanation:
        "Each append is amortized O(1) — the rare resizes are already averaged in — so n of them cost O(n) total. If every append truly cost O(n), the total would be O(n²); the doubling trick is exactly what prevents that.",
    },

    // ── Arrays ──────────────────────────────────────────────────────
    {
      id: "l5-q11",
      topic: "Arrays",
      prompt:
        "A 2D array has rows of width w. How does the computer find grid[i][j] instantly?",
      options: [
        "start + (i × w + j) × box size — one calculation",
        "It scans row by row until it reaches cell (i, j)",
        "It keeps a dictionary of every cell's location",
        "It can't — 2D access is O(n)",
      ],
      correctIndex: 0,
      explanation:
        "Rows sit one after another in memory, so cell (i, j) is exactly i full rows plus j boxes from the start. Multiply and add — O(1), even for a huge grid.",
    },
    {
      id: "l5-q12",
      topic: "Arrays",
      prompt: "In numpy, what does this line do?",
      code: "bigger = np.insert(grid, 1, values, axis=1)",
      options: [
        "Inserts a new ROW at index 1",
        "Inserts a new COLUMN at index 1",
        "Replaces column 1 with values",
        "Appends values at the end",
      ],
      correctIndex: 1,
      explanation:
        "axis=1 → columns, and insert puts it AT index 1 (the rest shift right), unlike append which only glues to the end. Row version would be axis=0.",
    },
    {
      id: "l5-q13",
      topic: "Arrays",
      prompt:
        "Linear search in an unsorted array of n items. Which statement is true about the WORST case?",
      options: [
        "Finding the value takes at most n checks, but proving it's absent takes n² checks",
        "Both 'found at the very end' and 'not there at all' need all n checks",
        "If the value is absent, the search stops halfway",
        "The worst case is n/2 checks",
      ],
      correctIndex: 1,
      explanation:
        "Whether the value hides in the last box or doesn't exist, you only know after checking every box — n checks either way. Absence is just as expensive as a last-slot find.",
    },
    {
      id: "l5-q14",
      topic: "Arrays",
      prompt:
        "This guard is from your course's 2D code. What happens on accessElements(grid, 99, 0) for a 4×4 grid?",
      code: "def accessElements(array, rowIndex, colIndex):\n    if rowIndex >= len(array) and colIndex >= len(array[0]):\n        print('Incorrect Index')\n    else:\n        print(array[rowIndex][colIndex])",
      options: [
        "Prints 'Incorrect Index'",
        "Prints 0",
        "Crashes with an IndexError",
        "Prints None",
      ],
      correctIndex: 2,
      explanation:
        "Sneaky bug: `and` requires BOTH indexes to be bad. Row 99 is bad but column 0 is fine, so the guard fails, the else runs, and array[99][0] crashes. The fix is `or` — a real lesson in logic operators!",
    },
    {
      id: "l5-q15",
      topic: "Arrays",
      prompt: "What happens here?",
      code: "from array import *\nmy_array = array('i', [1, 2, 3])\nmy_array.append('x')",
      options: [
        "The array becomes [1, 2, 3, 'x']",
        "TypeError — 'i' arrays accept integers only",
        "'x' is converted to a number automatically",
        "The append is silently ignored",
      ],
      correctIndex: 1,
      explanation:
        "The 'i' typecode is a promise: integers only. Arrays enforce their single type at the door — that strictness is exactly what lists don't have.",
    },

    // ── Lists ───────────────────────────────────────────────────────
    {
      id: "l5-q16",
      topic: "Lists",
      prompt: "The aliasing trap in 2D — what does this print?",
      code: "row = [0, 0]\ngrid = [row, row]\ngrid[0][0] = 9\nprint(grid[1][0])",
      options: ["0", "9", "[9, 0]", "an IndexError"],
      correctIndex: 1,
      explanation:
        "grid holds the SAME row object twice — two seats, one person. Changing it through grid[0] changes what grid[1] sees too: 9. (b = a strikes again, in disguise.)",
    },
    {
      id: "l5-q17",
      topic: "Lists",
      prompt: "What does this print?",
      code: "myList = [1, 2, 3, 4, 5]\nprint(myList[:2] + myList[3:])",
      options: [
        "[1, 2, 3, 4, 5]",
        "[1, 2, 4, 5]",
        "[2, 4, 5]",
        "[1, 2, 3, 5]",
      ],
      correctIndex: 1,
      explanation:
        "[:2] takes indexes 0–1 → [1, 2]; [3:] takes index 3 to the end → [4, 5]. Gluing them skips index 2: [1, 2, 4, 5] — a classic way to 'remove' without remove().",
    },
    {
      id: "l5-q18",
      topic: "Lists",
      prompt: "What does this comprehension produce?",
      code: "result = [x for x in range(12) if x % 2 == 0 and x % 3 == 0]\nprint(result)",
      options: [
        "[0, 2, 3, 4, 6, 8, 9, 10]",
        "[6]",
        "[0, 6]",
        "[0, 6, 12]",
      ],
      correctIndex: 2,
      explanation:
        "Divisible by 2 AND by 3 means divisible by 6. In range(12) — which stops at 11 — that's 0 and 6. (Yes, 0 counts: 0 % anything is 0.)",
    },
    {
      id: "l5-q19",
      topic: "Lists",
      prompt: "What does this print?",
      code: "myList = [1, 2, 3]\nmyList.insert(99, 'x')\nprint(myList)",
      options: [
        "an IndexError — index 99 doesn't exist",
        "[1, 2, 3, 'x']",
        "['x', 1, 2, 3]",
        "[1, 2, 3, None, … , 'x']",
      ],
      correctIndex: 1,
      explanation:
        "Surprise: insert never crashes on a too-big index — it just quietly appends at the end. (And yes, a list happily mixes 'x' with numbers — that's lists for you.)",
    },
    {
      id: "l5-q20",
      topic: "Lists",
      prompt: "The subtle one — what does this print?",
      code: "a = [1, 2]\nb = a\na = a + [3]\nprint(b)",
      options: [
        "[1, 2, 3]",
        "[1, 2]",
        "[3]",
        "an error",
      ],
      correctIndex: 1,
      explanation:
        "a + [3] doesn't change the old list — it BUILDS A NEW one, and only a gets re-pointed at it. b still holds the original [1, 2]. Compare with a.append(3), which mutates the shared list and b would see it!",
    },
    {
      id: "l5-q21",
      topic: "Lists",
      prompt: "What does this print?",
      code: "words = ['a', 'bc']\nprint(sum(len(w) for w in words))",
      options: ["2", "['a', 'bc']", "3", "an error"],
      correctIndex: 2,
      explanation:
        "A generator expression feeds len of each word into sum: 1 + 2 = 3. Comprehension thinking without the square brackets.",
    },

    // ── Dictionaries ────────────────────────────────────────────────
    {
      id: "l5-q22",
      topic: "Dictionaries",
      prompt: "From the course quiz — what does this do?",
      code: "a = {'a': 1, 'b': 2, 'c': 3}\nprint(a['a', 'b'])",
      options: [
        "Prints [1, 2]",
        "Prints (1, 2)",
        "Raises a KeyError",
        "Prints {'a': 1, 'b': 2}",
      ],
      correctIndex: 2,
      explanation:
        "a['a', 'b'] means a[('a', 'b')] — it looks up the TUPLE ('a', 'b') as a single key. That key doesn't exist here, so KeyError. Tuple keys are legal; this one just isn't in the dict.",
    },
    {
      id: "l5-q23",
      topic: "Dictionaries",
      prompt: "From the course quiz — what happens on the last line?",
      code: "box = {'biscuit': 1, 'cake': 3}\ncrates = {}\ncrates[box] = 'full'",
      options: [
        "crates becomes {box: 'full'}",
        "TypeError — a dict can't be a KEY",
        "The box dictionary is emptied",
        "It works, but only for small dictionaries",
      ],
      correctIndex: 1,
      explanation:
        "Keys must be immutable — and a dictionary can change, so it's banned as a key (unhashable). Using box as a VALUE is fine; using it as a KEY is the crime.",
    },
    {
      id: "l5-q24",
      topic: "Dictionaries",
      prompt: "The counting one-liner runs twice. What does this print?",
      code: "d = {}\nd['x'] = d.get('x', 0) + 5\nd['x'] = d.get('x', 0) + 5\nprint(d['x'])",
      options: ["5", "0", "10", "a KeyError"],
      correctIndex: 2,
      explanation:
        "First line: get finds nothing, falls back to 0, stores 5. Second line: get finds 5, stores 10. The fallback only kicks in while the key is missing.",
    },
    {
      id: "l5-q25",
      topic: "Dictionaries",
      prompt: "Straight from the course file — what does this print?",
      code: "myDict = {'eooooa': 1, 'aas': 2, 'udd': 3, 'sseo': 4, 'werwi': 5}\nprint(sorted(myDict, key=len))",
      options: [
        "['aas', 'udd', 'sseo', 'werwi', 'eooooa']",
        "['eooooa', 'werwi', 'sseo', 'aas', 'udd']",
        "[1, 2, 3, 4, 5]",
        "an error — dictionaries can't be sorted",
      ],
      correctIndex: 0,
      explanation:
        "sorted(dict) works on the KEYS, and key=len ranks them by LENGTH: the 3-letter ones first (in their original order), then 4, 5, 6 letters. Values never enter the picture.",
    },
    {
      id: "l5-q26",
      topic: "Dictionaries",
      prompt: "What does this print?",
      code: "scores = {'ana': 3, 'rohan': 4, 'em': 2}\ntotal = 0\nfor k, v in scores.items():\n    total += v\nprint(total)",
      options: ["3", "9", "'anarohanem'", "6"],
      correctIndex: 1,
      explanation:
        "items() hands out (key, value) pairs; unpacking as k, v and summing the v's gives 3 + 4 + 2 = 9. This items-unpack-accumulate pattern is everywhere in real code.",
    },

    // ── Tuples ──────────────────────────────────────────────────────
    {
      id: "l5-q27",
      topic: "Tuples",
      prompt: "Adapted from the course quiz — what does this print?",
      code: "print(sum((1, 2) + (3, 4)))",
      options: ["(1, 2, 3, 4)", "(4, 6)", "10", "an error"],
      correctIndex: 2,
      explanation:
        "Inside out: (1, 2) + (3, 4) concatenates into (1, 2, 3, 4), then sum adds them up: 10. The + means 'glue' for tuples, 'add' for the numbers inside.",
    },
    {
      id: "l5-q28",
      topic: "Tuples",
      prompt: "Adapted from the course quiz — what does this print?",
      code: "nums = [1, 2, 3]\ninit_tuple = ('Python',) * (len(nums) - 3)\nprint(init_tuple)",
      options: [
        "('Python', 'Python', 'Python')",
        "()",
        "('Python',)",
        "an error",
      ],
      correctIndex: 1,
      explanation:
        "len(nums) - 3 is 0, and any tuple times 0 is the EMPTY tuple (). No error — multiplying by zero just gives you nothing.",
    },
    {
      id: "l5-q29",
      topic: "Tuples",
      prompt: "The immutability fine print — what does this print?",
      code: "t = ([1, 2], 'a')\nt[0].append(3)\nprint(t)",
      options: [
        "TypeError — tuples can't be changed",
        "([1, 2], 'a')",
        "([1, 2, 3], 'a')",
        "([3], 'a')",
      ],
      correctIndex: 2,
      explanation:
        "The tuple never changed — it still holds the SAME list and the same 'a'. But the list itself is mutable and happily grew. Immutability locks the tuple's slots, not the insides of what those slots point to.",
    },
    {
      id: "l5-q30",
      topic: "Tuples",
      prompt: "From the course quiz — what does this print?",
      code: "init_tuple = ((1, 2),) * 7\nprint(init_tuple.count((1, 2)))",
      options: ["1", "0", "an error", "7"],
      correctIndex: 3,
      explanation:
        "* 7 made seven copies of the (1, 2) pair, and count compares by VALUE — every one of the seven matches. count and index are the tuple's only two methods, remember.",
    },
  ],
};
