import type { Quiz } from "./types";

export const milestone2: Quiz = {
  slug: "milestone-2",
  title: "Milestone 2: Python Lists",
  description: "Creating, slicing, growing, copying and measuring lists",
  sections: ["Python Lists"],
  questions: [
    {
      id: "m2-q01",
      topic: "Lists",
      prompt: "What is a Python list?",
      options: [
        "An ordered, changeable collection that can mix different types",
        "A collection that can only hold numbers of the same type",
        "A fixed-size block of memory you cannot change",
        "A special kind of function",
      ],
      correctIndex: 0,
      explanation:
        "Lists keep items in order, let you change them any time, and happily mix types: [1, 'Milk', 3.5] is a valid list. That flexibility is the big difference from arrays.",
    },
    {
      id: "m2-q02",
      topic: "Lists",
      prompt: "What does this print?",
      code: "myList = [10, 20, 30, 40]\nprint(myList[-1])",
      options: ["10", "40", "an error", "-1"],
      correctIndex: 1,
      explanation:
        "Negative indexes count from the END: -1 is the last item, -2 the second-to-last. myList[-1] is 40.",
    },
    {
      id: "m2-q03",
      topic: "Lists",
      prompt: "After this loop from the course code runs, what is the list?",
      code: "shoppingList = ['Milk', 'Cheese', 'Butter']\nfor i in range(len(shoppingList)):\n    shoppingList[i] = shoppingList[i] + '+'",
      options: [
        "['Milk', 'Cheese', 'Butter'] — loops can't change lists",
        "['+Milk', '+Cheese', '+Butter']",
        "['Milk+', 'Cheese+', 'Butter+']",
        "['+', '+', '+']",
      ],
      correctIndex: 2,
      explanation:
        "Looping by index lets you UPDATE each slot: shoppingList[i] = shoppingList[i] + '+' glues a '+' onto the end of each item, in place.",
    },
    {
      id: "m2-q04",
      topic: "Lists",
      prompt: "Straight from the course file — what does this print?",
      code: "myList = [1, 2, 3, 4, 5, 6, 7]\nmyList.insert(4, 15)\nprint(myList)",
      options: [
        "[1, 2, 3, 4, 15, 5, 6, 7]",
        "[1, 2, 3, 15, 4, 5, 6, 7]",
        "[1, 2, 3, 4, 5, 6, 7, 15]",
        "[15, 1, 2, 3, 4, 5, 6, 7]",
      ],
      correctIndex: 0,
      explanation:
        "insert(4, 15) puts 15 AT index 4. Indexes 0–3 keep 1,2,3,4; then comes 15; the rest shift right.",
    },
    {
      id: "m2-q05",
      topic: "Lists",
      prompt: "What does this print?",
      code: "myList = [1, 2]\nmyList.append([3, 4])\nprint(len(myList))",
      options: ["4", "2", "3", "an error"],
      correctIndex: 2,
      explanation:
        "append adds ONE item — even if that item is a whole list! myList becomes [1, 2, [3, 4]]: three items. To add each element separately you'd use extend.",
    },
    {
      id: "m2-q06",
      topic: "Lists",
      prompt: "What does this slice give you?",
      code: "myList = [10, 20, 30, 40, 50, 60]\nprint(myList[2:5])",
      options: [
        "[30, 40, 50, 60]",
        "[20, 30, 40, 50]",
        "[30, 40, 50]",
        "[20, 30, 40]",
      ],
      correctIndex: 2,
      explanation:
        "Slices go from the start index UP TO but NOT INCLUDING the stop index: indexes 2, 3, 4 → [30, 40, 50]. The stop index is always left out.",
    },
    {
      id: "m2-q07",
      topic: "Lists",
      prompt: "What does this print?",
      code: "letters = ['a', 'b', 'c']\nletters.pop(1)\nprint(letters)",
      options: [
        "['a', 'c']",
        "['b', 'c']",
        "['a', 'b']",
        "['a', 'b', 'c']",
      ],
      correctIndex: 0,
      explanation:
        "pop(1) removes whatever sits at INDEX 1 — that's 'b'. Remember: pop works by position, remove works by value.",
    },
    {
      id: "m2-q08",
      topic: "Lists",
      prompt:
        "What is the time complexity of checking `value in myList` on an unsorted list?",
      options: ["O(1)", "O(log n)", "O(n²)", "O(n)"],
      correctIndex: 3,
      explanation:
        "The `in` operator checks items one by one until it finds a match (or reaches the end) — linear search, O(n). Same idea as the searchinList function in the course code.",
    },
    {
      id: "m2-q09",
      topic: "Lists",
      prompt: "This is the course's average pattern. What does it print?",
      code: "numlist = [2.0, 4.0, 6.0]\naverage = sum(numlist) / len(numlist)\nprint(average)",
      options: ["12.0", "4.0", "3.0", "6.0"],
      correctIndex: 1,
      explanation:
        "sum adds everything (12.0), len counts the items (3), and 12.0 / 3 = 4.0. Two built-in functions doing all the work.",
    },
    {
      id: "m2-q10",
      topic: "Lists",
      prompt: "What does this print?",
      code: "sentence = 'data structures rock'\nwords = sentence.split()\nprint(words)",
      options: [
        "'data structures rock'",
        "['d', 'a', 't', 'a', …]",
        "['data', 'structures', 'rock']",
        "3",
      ],
      correctIndex: 2,
      explanation:
        "split() chops a string at the spaces and gives you a LIST of the words. (list('abc') is the other direction trick — it splits into single characters.)",
    },
    {
      id: "m2-q11",
      topic: "Lists",
      prompt: "The classic pitfall — what does this print?",
      code: "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)",
      options: [
        "[1, 2, 3]",
        "[1, 2, 3, 4]",
        "[4]",
        "an error",
      ],
      correctIndex: 1,
      explanation:
        "b = a does NOT copy the list — both names point at the SAME boxes. Changing it through b changes what a sees too. This is the number one list bug!",
    },
    {
      id: "m2-q12",
      topic: "Lists",
      prompt:
        "Which line makes b an INDEPENDENT copy of a, so changing b never touches a?",
      options: ["b = a", "b = a[:]", "b = a.append()", "b == a"],
      correctIndex: 1,
      explanation:
        "a[:] slices the whole list, which builds a brand-new list with the same values. (list(a) works too.) Plain b = a only copies the pointer.",
    },
    {
      id: "m2-q13",
      topic: "Lists",
      prompt: "When is an ARRAY the better pick over a list?",
      options: [
        "When you want to mix numbers and text in one collection",
        "When you don't know how many items you'll have",
        "When everything is the same numeric type and you want speed and less memory",
        "Arrays are always better than lists",
      ],
      correctIndex: 2,
      explanation:
        "Arrays trade flexibility for efficiency: same-type items packed tight. Lists trade efficiency for flexibility: any types, grow however you like.",
    },
    {
      id: "m2-q14",
      topic: "Lists",
      prompt:
        "myList has a million items. Which operation is SLOW, and why?",
      options: [
        "myList.append(x) — everything must shift",
        "myList[500] — it has to search",
        "myList.insert(0, x) — a million items shift one spot right",
        "len(myList) — it counts every item",
      ],
      correctIndex: 2,
      explanation:
        "insert at the front is O(n): every existing item moves right. append at the END is O(1), indexing is O(1), and len is O(1) — Python keeps the count stored.",
    },
    {
      id: "m2-q15",
      topic: "Lists",
      prompt: "What does this list comprehension produce?",
      code: "result = [x * x for x in range(5) if x % 2 == 0]\nprint(result)",
      options: [
        "[0, 4, 16]",
        "[0, 1, 4, 9, 16]",
        "[1, 9]",
        "[2, 4]",
      ],
      correctIndex: 0,
      explanation:
        "range(5) gives 0–4; the if keeps only evens (0, 2, 4); then each is squared: [0, 4, 16]. Read comprehensions right-to-left: filter, then transform.",
    },
  ],
};
