import type { Quiz } from "./types";

export const milestone4: Quiz = {
  slug: "milestone-4",
  title: "Milestone 4: Tuples",
  description: "The locked list: creating, searching and why immutability matters",
  sections: ["Tuples"],
  questions: [
    {
      id: "m4-q01",
      topic: "Tuples",
      prompt: "What is a tuple?",
      options: [
        "An ordered collection like a list — but IMMUTABLE: it can never change after creation",
        "A list that keeps itself sorted",
        "A dictionary with numbers as keys",
        "A special kind of loop",
      ],
      correctIndex: 0,
      explanation:
        "A tuple is a locked list: same indexing, same looping, but no append, no remove, no changing a slot. The lock is the point — it protects data that shouldn't change.",
    },
    {
      id: "m4-q02",
      topic: "Tuples",
      prompt: "From the course file — what does this print?",
      code: "newTuple1 = tuple('abcde')\nprint(newTuple1)",
      options: [
        "('abcde',)",
        "('a', 'b', 'c', 'd', 'e')",
        "['a', 'b', 'c', 'd', 'e']",
        "an error",
      ],
      correctIndex: 1,
      explanation:
        "tuple() on a string splits it into characters — exactly like list('abcde'), just locked. Round parentheses in the output tell you it's a tuple, not a list.",
    },
    {
      id: "m4-q03",
      topic: "Tuples",
      prompt: "From the course quiz — what does this code do?",
      code: "init_tuple = (1,) * 3\ninit_tuple[0] = 2\nprint(init_tuple)",
      options: [
        "Prints (2, 1, 1)",
        "Prints (2, 2, 2)",
        "Raises TypeError: 'tuple' object does not support item assignment",
        "Prints (1, 1, 1)",
      ],
      correctIndex: 2,
      explanation:
        "(1,) * 3 builds (1, 1, 1) just fine — but the second line tries to CHANGE a tuple, and tuples refuse: TypeError. Immutable means immutable.",
    },
    {
      id: "m4-q04",
      topic: "Tuples",
      prompt: "What does this print?",
      code: "newTuple = ('a', 'b', 'c', 'd', 'e')\nprint(newTuple[0])\nprint(newTuple[-1])",
      options: [
        "a — then — e",
        "e — then — a",
        "('a',) — then — ('e',)",
        "an error — tuples can't be indexed",
      ],
      correctIndex: 0,
      explanation:
        "Reading works exactly like lists: index 0 is the first item, -1 the last. It's only WRITING that tuples forbid.",
    },
    {
      id: "m4-q05",
      topic: "Tuples",
      prompt: "From the course quiz — what does this print?",
      code: "init_tuple = ()\nprint(len(init_tuple))",
      options: ["None", "1", "0", "an exception"],
      correctIndex: 2,
      explanation:
        "() is a perfectly valid EMPTY tuple, and its length is 0 — same as an empty list [] or empty dict {}.",
    },
    {
      id: "m4-q06",
      topic: "Tuples",
      prompt: "From the course quiz — what does this print?",
      code: "init_tuple_a = 'a', 'b'\ninit_tuple_b = ('a', 'b')\nprint(init_tuple_a == init_tuple_b)",
      options: ["0", "1", "False", "True"],
      correctIndex: 3,
      explanation:
        "Surprise: the parentheses are optional! 'a', 'b' packs into a tuple all by itself, so both variables hold ('a', 'b') — equal, True.",
    },
    {
      id: "m4-q07",
      topic: "Tuples",
      prompt: "From the course quiz — what type is init_tuple here?",
      code: "init_tuple = ('Python') * 3\nprint(type(init_tuple))",
      options: [
        "<class 'tuple'>",
        "<class 'str'>",
        "<class 'list'>",
        "<class 'int'>",
      ],
      correctIndex: 1,
      explanation:
        "The classic trap: ('Python') is just a STRING in parentheses — no comma, no tuple! ('Python') * 3 is 'PythonPythonPython'. A one-item tuple needs the comma: ('Python',).",
    },
    {
      id: "m4-q08",
      topic: "Tuples",
      prompt: "From the course quiz — what does this print?",
      code: "init_tuple_a = '1', '2'\ninit_tuple_b = ('3', '4')\nprint(init_tuple_a + init_tuple_b)",
      options: [
        "(1, 2, 3, 4)",
        "('1', '2', '3', '4')",
        "['1', '2', '3', '4']",
        "an error — tuples can't be added",
      ],
      correctIndex: 1,
      explanation:
        "+ glues two tuples into a NEW tuple (the originals are untouched — they can't change!). The items are strings, so they stay quoted: ('1', '2', '3', '4').",
    },
    {
      id: "m4-q09",
      topic: "Tuples",
      prompt: "From the course quiz — what does this print?",
      code: "init_tuple = ((1, 2),) * 7\nprint(len(init_tuple[3:8]))",
      options: ["an exception", "5", "4", "7"],
      correctIndex: 2,
      explanation:
        "((1, 2),) * 7 is a 7-item tuple. The slice [3:8] wants indexes 3–7, but only 3, 4, 5, 6 exist — slices politely stop at the end instead of crashing. Four items.",
    },
    {
      id: "m4-q10",
      topic: "Tuples",
      prompt: "What does this print?",
      code: "newTuple = ('a', 'b', 'c', 'd', 'e')\nprint('a' in newTuple)",
      options: ["True", "False", "0", "'a'"],
      correctIndex: 0,
      explanation:
        "The `in` operator works on tuples exactly like on lists: it scans item by item and finds 'a'. (Straight from the course's search lecture.)",
    },
    {
      id: "m4-q11",
      topic: "Tuples",
      prompt: "What do count() and index() do on a tuple?",
      code: "myTuple1 = (1, 2, 6, 9, 8, 7)\nmyTuple1.count(2)\nmyTuple1.index(2)",
      options: [
        "count says HOW MANY times 2 appears; index says WHERE the first 2 lives",
        "count removes the 2s; index inserts a 2",
        "both return True or False",
        "they only work on lists",
      ],
      correctIndex: 0,
      explanation:
        "These are the only two methods tuples have! count(2) → 1 occurrence, index(2) → position 1. Everything that would CHANGE the tuple simply doesn't exist.",
    },
    {
      id: "m4-q12",
      topic: "Tuples",
      prompt: "Which of these lines raises an error?",
      code: "t = (1, 2, 3)",
      options: [
        "print(t[1])",
        "for x in t: print(x)",
        "t.append(4)",
        "print(len(t))",
      ],
      correctIndex: 2,
      explanation:
        "Tuples have no append (or insert, remove, pop) — those methods would change it, so they don't exist: AttributeError. Reading, looping and measuring are all fine.",
    },
    {
      id: "m4-q13",
      topic: "Tuples",
      prompt: "When should you pick a tuple over a list?",
      options: [
        "When you'll be adding and removing items constantly",
        "When the data should never change — like coordinates, or a date of birth",
        "When you need to sort the items in place",
        "Never — lists are always better",
      ],
      correctIndex: 1,
      explanation:
        "The lock is a feature: fixed data can't be corrupted by accident, tuples are a bit faster and smaller than lists — and they can do one trick lists can't (next question!).",
    },
    {
      id: "m4-q14",
      topic: "Tuples",
      prompt:
        "Why can a tuple be used as a dictionary KEY when a list cannot?",
      options: [
        "Tuples are shorter than lists",
        "Dictionaries only accept round brackets",
        "Because tuples are immutable — a key must never be able to change",
        "Lists can be keys too",
      ],
      correctIndex: 2,
      explanation:
        "Dictionary keys must be unchangeable, and immutability is the tuple's whole identity. That's why {(1,2): 'value'} works but {[1,2]: 'value'} crashes — remember from milestone 3!",
    },
    {
      id: "m4-q15",
      topic: "Tuples",
      prompt:
        "myTuple has a million items. What are the costs of myTuple[500] and `500 in myTuple`?",
      options: [
        "Both O(1)",
        "O(1) for indexing, O(n) for the `in` search",
        "O(n) for both",
        "O(log n) for both",
      ],
      correctIndex: 1,
      explanation:
        "Same as lists and arrays: indexing is address math (O(1)), while `in` must scan item by item (O(n)). Immutability changes what you CAN do, not how fast reading is.",
    },
  ],
};
