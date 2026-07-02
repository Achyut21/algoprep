import type { Quiz } from "./types";

export const milestone1: Quiz = {
  slug: "milestone-1",
  title: "Milestone 1: Foundations",
  description: "Introduction, Big O Notation, and Arrays",
  sections: ["Introduction", "Big O Notation", "Arrays"],
  questions: [
    // ── Introduction ────────────────────────────────────────────────
    {
      id: "m1-q01",
      topic: "Introduction",
      prompt: "What is a data structure?",
      options: [
        "A way of organizing and storing data so it can be used efficiently",
        "A programming language feature for printing values",
        "A type of computer hardware that stores files",
        "A math formula for solving equations",
      ],
      correctIndex: 0,
      explanation:
        "A data structure is a way of arranging data in a computer so we can access and update it efficiently. Arrays, stacks, queues, and trees are all data structures.",
    },
    {
      id: "m1-q02",
      topic: "Introduction",
      prompt: "What is an algorithm?",
      options: [
        "A bug in a program",
        "A set of step-by-step instructions to solve a specific problem",
        "A place in memory where data lives",
        "A special kind of variable",
      ],
      correctIndex: 1,
      explanation:
        "An algorithm is a recipe: a finite sequence of steps that takes an input and produces the desired output. The same problem can often be solved by many different algorithms.",
    },
    {
      id: "m1-q03",
      topic: "Introduction",
      prompt: "Which of these is NOT a linear data structure?",
      options: ["Array", "Stack", "Tree", "Queue"],
      correctIndex: 2,
      explanation:
        "In linear structures (arrays, stacks, queues, linked lists) elements form a single sequence. A tree is non-linear: one element can connect to many others, forming branches.",
    },
    {
      id: "m1-q04",
      topic: "Introduction",
      prompt:
        "An algorithm that makes the locally best choice at each step, hoping to reach the overall best solution, is called a…",
      options: [
        "Divide and conquer algorithm",
        "Brute force algorithm",
        "Randomized algorithm",
        "Greedy algorithm",
      ],
      correctIndex: 3,
      explanation:
        "Greedy algorithms pick whatever looks best right now at each step. Divide and conquer splits the problem in parts, brute force tries everything, and randomized algorithms use random numbers.",
    },
    {
      id: "m1-q05",
      topic: "Introduction",
      prompt: "Why do we study data structures and algorithms together?",
      options: [
        "Because algorithms only work on trees",
        "Because choosing the right structure and steps makes programs use less time and memory",
        "Because Python requires it",
        "Because data structures replace the need for algorithms",
      ],
      correctIndex: 1,
      explanation:
        "The right data structure paired with the right algorithm is what makes software fast and memory-friendly. A great algorithm on the wrong structure can still be slow.",
    },

    // ── Big O ───────────────────────────────────────────────────────
    {
      id: "m1-q06",
      topic: "Big O",
      prompt: "What does Big O notation describe?",
      options: [
        "The exact number of seconds a program takes",
        "How the running time (or memory) grows as the input gets bigger, in the worst case",
        "How many lines of code a function has",
        "The amount of RAM installed in the computer",
      ],
      correctIndex: 1,
      explanation:
        "Big O ignores machines and seconds. It answers: if the input size n doubles or triples, how does the work grow? And it describes the worst case (upper bound).",
    },
    {
      id: "m1-q07",
      topic: "Big O",
      prompt: "Which notation describes the BEST case of an algorithm?",
      options: ["Big O", "Theta (Θ)", "Omega (Ω)", "Sigma (Σ)"],
      correctIndex: 2,
      explanation:
        "Omega (Ω) is the lower bound — the best case. Big O is the upper bound (worst case), and Theta (Θ) describes the average/tight bound between them.",
    },
    {
      id: "m1-q08",
      topic: "Big O",
      prompt: "What is the time complexity of this code?",
      code: "array = [1, 2, 3, 4, 5]\nprint(array[0])",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctIndex: 0,
      explanation:
        "Accessing an element by its index takes the same time no matter how big the array is — that is constant time, O(1).",
    },
    {
      id: "m1-q09",
      topic: "Big O",
      prompt: "What is the time complexity of this loop?",
      code: "for element in array:\n    print(element)",
      options: ["O(1)", "O(log n)", "O(n)", "O(2ⁿ)"],
      correctIndex: 2,
      explanation:
        "The loop visits every element exactly once. If the array has n elements, it does n steps — linear time, O(n).",
    },
    {
      id: "m1-q10",
      topic: "Big O",
      prompt: "Simplify O(2n) using Big O rules.",
      options: ["O(2n)", "O(n)", "O(n²)", "O(2)"],
      correctIndex: 1,
      explanation:
        "Rule: drop constants. Doing the loop twice is still linear growth, so O(2n) = O(n). Big O cares about the shape of growth, not the multiplier.",
    },
    {
      id: "m1-q11",
      topic: "Big O",
      prompt: "Simplify O(n² + n) using Big O rules.",
      options: ["O(n² + n)", "O(n)", "O(2n²)", "O(n²)"],
      correctIndex: 3,
      explanation:
        "Rule: drop non-dominant terms. When n is large, n² completely dwarfs n (for n = 1000: a million vs a thousand), so the n term is dropped.",
    },
    {
      id: "m1-q12",
      topic: "Big O",
      prompt: "What is the time complexity of this code?",
      code: "for x in array:\n    for y in array:\n        print(x, y)",
      options: ["O(n)", "O(n²)", "O(2n)", "O(log n)"],
      correctIndex: 1,
      explanation:
        "For each of the n values of x, the inner loop runs n times: n × n = n² steps. Nested loops over the same input are the classic O(n²) pattern.",
    },
    {
      id: "m1-q13",
      topic: "Big O",
      prompt:
        "An algorithm cuts the remaining work in HALF at every step (like guessing a number between 1 and 100 by always guessing the middle). Its time complexity is…",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      correctIndex: 2,
      explanation:
        "Halving each time means even a huge input dies fast: 100 → 50 → 25 → 12 → 6 → 3 → 1. That repeated halving is logarithmic time, O(log n).",
    },
    {
      id: "m1-q14",
      topic: "Big O",
      prompt: "What is the SPACE complexity of this recursive function?",
      code: "def findSum(n):\n    if n == 1:\n        return 1\n    return n + findSum(n-1)",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctIndex: 1,
      explanation:
        "Each recursive call waits on the call stack until the calls under it finish. findSum(n) stacks up n calls before unwinding, so it uses O(n) memory.",
    },
    {
      id: "m1-q15",
      topic: "Big O",
      prompt:
        "arrayA has a elements and arrayB has b elements. What is the total time complexity?",
      code: "for x in arrayA:\n    print(x)\n\nfor y in arrayB:\n    print(y)",
      options: ["O(a × b)", "O(a + b)", "O(a²)", "O(n²)"],
      correctIndex: 1,
      explanation:
        "Different inputs, loops one AFTER the other → ADD: O(a + b). If the loops were nested (one inside the other) you would MULTIPLY: O(a × b).",
    },
    {
      id: "m1-q16",
      topic: "Big O",
      prompt: "What is the time complexity of f1?",
      code: "def f1(n):\n    if n <= 0:\n        return 1\n    else:\n        return 1 + f1(n-1)",
      options: ["O(1)", "O(log n)", "O(n)", "O(2ⁿ)"],
      correctIndex: 2,
      explanation:
        "Each call reduces n by 1, so there are about n calls in total: f1(n) → f1(n-1) → … → f1(0). One call each, linear time O(n).",
    },
    {
      id: "m1-q17",
      topic: "Big O",
      prompt: "What is the time complexity of f?",
      code: "def f(n):\n    if n <= 1:\n        return 1\n    return f(n-1) + f(n-1)",
      options: ["O(n)", "O(n²)", "O(log n)", "O(2ⁿ)"],
      correctIndex: 3,
      explanation:
        "Every call spawns TWO more calls: 1 → 2 → 4 → 8… The call tree doubles at each level, giving about 2ⁿ calls — exponential time, O(2ⁿ).",
    },

    // ── Arrays ──────────────────────────────────────────────────────
    {
      id: "m1-q18",
      topic: "Arrays",
      prompt: "What is an array?",
      options: [
        "A collection of elements of the same type stored in contiguous (side-by-side) memory locations",
        "A function that sorts numbers",
        "A loop that repeats n times",
        "A file on the hard drive",
      ],
      correctIndex: 0,
      explanation:
        "An array stores same-type elements in one continuous block of memory. That side-by-side layout is exactly what makes index access instant.",
    },
    {
      id: "m1-q19",
      topic: "Arrays",
      prompt:
        "Why can a computer jump straight to array[500] without looking at the first 499 elements?",
      options: [
        "Because it secretly scans the array very fast",
        "Because arrays are always sorted",
        "Because elements sit in consecutive memory cells, so the address of any index can be calculated directly",
        "Because Python caches every element",
      ],
      correctIndex: 2,
      explanation:
        "Since elements are contiguous and equal-sized, the computer computes: start address + index × element size. One multiplication, one addition — no scanning.",
    },
    {
      id: "m1-q20",
      topic: "Arrays",
      prompt: "Time complexity of ACCESSING an element of a 1D array by its index?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
      correctIndex: 1,
      explanation:
        "Index access is a direct address calculation, so it is constant time O(1) — the array's superpower.",
    },
    {
      id: "m1-q21",
      topic: "Arrays",
      prompt:
        "Time complexity of SEARCHING for a value in an unsorted 1D array (linear search)?",
      options: ["O(1)", "O(log n)", "O(n²)", "O(n)"],
      correctIndex: 3,
      explanation:
        "With no ordering to exploit, you must check elements one by one; in the worst case the value is last (or missing), so it takes O(n).",
    },
    {
      id: "m1-q22",
      topic: "Arrays",
      prompt:
        "Why is INSERTING an element at the beginning of an array O(n) instead of O(1)?",
      options: [
        "Because the computer must ask the OS for permission",
        "Because every existing element has to shift one position to the right to make room",
        "Because arrays can only grow at the end",
        "Because the new element must be sorted first",
      ],
      correctIndex: 1,
      explanation:
        "The contiguous layout that makes access fast makes insertion slow: to open a slot at the front, all n existing elements must move over by one.",
    },
    {
      id: "m1-q23",
      topic: "Arrays",
      prompt: "What does this code print?",
      code: "from array import *\n\nmy_array = array('i', [1, 2, 3, 4, 5])\nmy_array.insert(3, 11)\nprint(my_array)",
      options: [
        "array('i', [1, 2, 3, 11, 4, 5])",
        "array('i', [1, 2, 11, 3, 4, 5])",
        "array('i', [1, 2, 3, 4, 5, 11])",
        "array('i', [11, 1, 2, 3, 4, 5])",
      ],
      correctIndex: 0,
      explanation:
        "insert(3, 11) places 11 AT index 3 and shifts the rest right. Indexes 0,1,2 keep 1,2,3; then comes 11; then 4 and 5.",
    },
    {
      id: "m1-q24",
      topic: "Arrays",
      prompt: "What is the difference between append() and extend() on a Python array?",
      options: [
        "append() adds many elements; extend() adds one",
        "They do exactly the same thing",
        "append() adds ONE element to the end; extend() adds ALL elements of another array/iterable",
        "extend() only works on empty arrays",
      ],
      correctIndex: 2,
      explanation:
        "append(6) adds the single value 6. extend(other_array) walks through other_array and adds each of its elements to the end.",
    },
    {
      id: "m1-q25",
      topic: "Arrays",
      prompt: "What does this code print?",
      code: "from array import *\n\nmy_array = array('i', [1, 2, 11, 3, 4])\nmy_array.remove(11)\nmy_array.pop()\nprint(my_array)",
      options: [
        "array('i', [2, 11, 3])",
        "array('i', [1, 2, 3])",
        "array('i', [1, 2, 11, 3])",
        "array('i', [2, 3, 4])",
      ],
      correctIndex: 1,
      explanation:
        "remove(11) deletes the first occurrence of the VALUE 11 → [1, 2, 3, 4]. pop() with no argument removes the LAST element → [1, 2, 3].",
    },
    {
      id: "m1-q26",
      topic: "Arrays",
      prompt: "What is the SPACE complexity of creating a 1D array with n elements?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctIndex: 2,
      explanation:
        "Each of the n elements needs its own memory cell, so the memory used grows linearly with n: O(n).",
    },
    {
      id: "m1-q27",
      topic: "Arrays",
      prompt:
        "Time complexity of accessing one cell of a 2D array, like array[2][3]?",
      options: ["O(1)", "O(n)", "O(mn)", "O(n²)"],
      correctIndex: 0,
      explanation:
        "Same trick as 1D: the address of row 2, column 3 is calculated directly from the row and column sizes. No searching needed — O(1).",
    },
    {
      id: "m1-q28",
      topic: "Arrays",
      prompt:
        "This traverses a 2D array with m rows and n columns. What is its time complexity?",
      code: "def traverseTDArray(array):\n    for i in range(len(array)):\n        for j in range(len(array[0])):\n            print(array[i][j])",
      options: ["O(m + n)", "O(mn)", "O(n)", "O(1)"],
      correctIndex: 1,
      explanation:
        "The inner loop runs n times for each of the m outer iterations — every cell is visited once, m × n cells total: O(mn).",
    },
    {
      id: "m1-q29",
      topic: "Arrays",
      prompt: "In numpy, what does this line delete from a 2D array?",
      code: "newTDArray = np.delete(twoDArray, 1, axis=1)",
      options: [
        "The second ROW of the array",
        "The element at position [1][1]",
        "The second COLUMN of the array",
        "The last row of the array",
      ],
      correctIndex: 2,
      explanation:
        "axis=0 means operate on rows, axis=1 means operate on columns. So delete(…, 1, axis=1) removes the column at index 1 — the second column.",
    },
    {
      id: "m1-q30",
      topic: "Arrays",
      prompt: "When is an array a POOR choice of data structure?",
      options: [
        "When you need instant access to elements by position",
        "When you frequently insert and delete elements in the middle",
        "When all your values have the same type",
        "When you know exactly how many elements you will store",
      ],
      correctIndex: 1,
      explanation:
        "Every middle insertion/deletion shifts elements — O(n) each time. Arrays shine at index access and fixed-size, same-type data; frequent reshuffling is their weakness.",
    },
  ],
};
