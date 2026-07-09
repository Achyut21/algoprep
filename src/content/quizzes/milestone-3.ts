import type { Quiz } from "./types";

export const milestone3: Quiz = {
  slug: "milestone-3",
  title: "Milestone 3: Dictionaries",
  description: "Key-value pairs: creating, updating, searching and measuring",
  sections: ["Dictionaries"],
  questions: [
    {
      id: "m3-q01",
      topic: "Dictionaries",
      prompt: "What is a Python dictionary?",
      options: [
        "A list that keeps its items sorted alphabetically",
        "A collection of key : value pairs, where you grab values by KEY instead of position",
        "An array that can only store strings",
        "A function that translates words",
      ],
      correctIndex: 1,
      explanation:
        "Lists find things by POSITION (index 0, 1, 2…). Dictionaries find things by NAME: you store 'age': 26 and ask for myDict['age']. Each key appears only once.",
    },
    {
      id: "m3-q02",
      topic: "Dictionaries",
      prompt: "Straight from the course file — what does this print?",
      code: "myDict = {'name': 'Edy', 'age': 26}\nprint(myDict['age'])",
      options: ["'age'", "1", "26", "a KeyError"],
      correctIndex: 2,
      explanation:
        "myDict['age'] looks up the KEY 'age' and hands back its value, 26. You'd only get a KeyError if the key didn't exist.",
    },
    {
      id: "m3-q03",
      topic: "Dictionaries",
      prompt: "What does the second line do here?",
      code: "myDict = {'name': 'Edy', 'age': 26}\nmyDict['address'] = 'London'",
      options: [
        "Crashes — you can't assign to a key that doesn't exist",
        "Adds a brand-new 'address': 'London' pair to the dictionary",
        "Replaces the whole dictionary with 'London'",
        "Creates a copy of the dictionary",
      ],
      correctIndex: 1,
      explanation:
        "Assigning to a key that doesn't exist ADDS the pair; assigning to an existing key UPDATES it. Same syntax for both — that's the insert/update lecture in one line.",
    },
    {
      id: "m3-q04",
      topic: "Dictionaries",
      prompt: "What does this loop print?",
      code: "myDict = {'name': 'Edy', 'age': 26}\nfor key in myDict:\n    print(key, myDict[key])",
      options: [
        "name Edy — then — age 26",
        "Edy — then — 26",
        "name — then — age",
        "('name', 'Edy') ('age', 26) on one line",
      ],
      correctIndex: 0,
      explanation:
        "Looping over a dictionary gives you its KEYS. myDict[key] fetches each value, so you get 'name Edy' then 'age 26' — exactly the traverseDict function from the course.",
    },
    {
      id: "m3-q05",
      topic: "Dictionaries",
      prompt: "What does this print?",
      code: "myDict = {'name': 'Edy', 'age': 26}\nprint('Edy' in myDict)",
      options: ["True", "False", "'Edy'", "a KeyError"],
      correctIndex: 1,
      explanation:
        "The `in` operator checks KEYS, not values! 'Edy' is a value, so the answer is False. 'name' in myDict would be True.",
    },
    {
      id: "m3-q06",
      topic: "Dictionaries",
      prompt:
        "myDict has a million entries. What is the time complexity of myDict['name']?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1) on average"],
      correctIndex: 3,
      explanation:
        "Looking up by key is the dictionary superpower: the key itself tells Python where the value lives, so it's O(1) on average — no scanning, regardless of size.",
    },
    {
      id: "m3-q07",
      topic: "Dictionaries",
      prompt: "After this runs, what is myDict?",
      code: "myDict = {'name': 'Edy', 'age': 26}\nmyDict.pop('name')\nprint(myDict)",
      options: [
        "{'name': 'Edy', 'age': 26}",
        "{'age': 26}",
        "{'name': 'Edy'}",
        "{}",
      ],
      correctIndex: 1,
      explanation:
        "pop('name') removes the whole 'name': 'Edy' pair (and hands back 'Edy'). Only 'age': 26 is left. For lists pop works by index; for dicts it works by key.",
    },
    {
      id: "m3-q08",
      topic: "Dictionaries",
      prompt:
        "Which method gives you the key AND value pairs together, ready to loop over?",
      options: ["keys()", "values()", "items()", "pairs()"],
      correctIndex: 2,
      explanation:
        "items() yields (key, value) tuples — perfect for `for k, v in myDict.items():`. keys() gives only keys, values() only values, and pairs() doesn't exist.",
    },
    {
      id: "m3-q09",
      topic: "Dictionaries",
      prompt:
        "Which is the SAFE way to read a key that might not exist, without crashing?",
      options: [
        "myDict['maybe']",
        "myDict.get('maybe')",
        "myDict.pop('maybe')",
        "myDict.find('maybe')",
      ],
      correctIndex: 1,
      explanation:
        "get() returns None (or a default you choose) when the key is missing, while square brackets raise a KeyError. pop also crashes on missing keys unless you give it a default.",
    },
    {
      id: "m3-q10",
      topic: "Dictionaries",
      prompt: "From the course interview questions — what does this print?",
      code: "a = {(1,2): 1, (2,3): 2}\nprint(a[1,2])",
      options: ["a KeyError", "1", "{(2,3): 2}", "a SyntaxError"],
      correctIndex: 1,
      explanation:
        "Tuples CAN be dictionary keys, and a[1,2] means a[(1,2)]. That key exists, so it prints 1. (A list could never be a key — more on that below.)",
    },
    {
      id: "m3-q11",
      topic: "Dictionaries",
      prompt: "From the course interview questions — what does this print?",
      code: "fruit = {}\n\ndef addone(index):\n    if index in fruit:\n        fruit[index] += 1\n    else:\n        fruit[index] = 1\n\naddone('Apple')\naddone('Banana')\naddone('apple')\nprint(len(fruit))",
      options: ["1", "2", "3", "4"],
      correctIndex: 2,
      explanation:
        "Keys are case-sensitive: 'Apple' and 'apple' are DIFFERENT keys. Three distinct keys go in, so len is 3.",
    },
    {
      id: "m3-q12",
      topic: "Dictionaries",
      prompt: "From the course interview questions — what does this print?",
      code: "arr = {}\narr[1] = 1\narr['1'] = 2\narr[1] += 1\n\nsum = 0\nfor k in arr:\n    sum += arr[k]\nprint(sum)",
      options: ["1", "2", "3", "4"],
      correctIndex: 3,
      explanation:
        "The number 1 and the string '1' are different keys. arr[1] starts at 1 and becomes 2 after +=; arr['1'] is 2. Total: 2 + 2 = 4.",
    },
    {
      id: "m3-q13",
      topic: "Dictionaries",
      prompt: "From the course interview questions — what does this print?",
      code: "rec = {'Name': 'Python', 'Age': '20'}\nr = rec.copy()\nprint(id(r) == id(rec))",
      options: ["True", "False", "0", "an error"],
      correctIndex: 1,
      explanation:
        "copy() builds a brand-new dictionary with the same pairs — a different object, so the ids differ: False. Same lesson as lists: r = rec would share, rec.copy() separates.",
    },
    {
      id: "m3-q14",
      topic: "Dictionaries",
      prompt: "Which of these CANNOT be used as a dictionary key?",
      options: [
        "'hello' (a string)",
        "(1, 2) (a tuple)",
        "[1, 2] (a list)",
        "42 (a number)",
      ],
      correctIndex: 2,
      explanation:
        "Keys must be unchangeable (immutable). Strings, numbers and tuples qualify; a LIST can change after the fact, so Python refuses it as a key.",
    },
    {
      id: "m3-q15",
      topic: "Dictionaries",
      prompt: "What does this dictionary comprehension produce?",
      code: "squares = {x: x * x for x in range(3)}\nprint(squares)",
      options: [
        "{0: 0, 1: 1, 2: 4}",
        "[0, 1, 4]",
        "{0, 1, 4}",
        "{1: 1, 2: 4, 3: 9}",
      ],
      correctIndex: 0,
      explanation:
        "Just like a list comprehension but building key: value pairs — each x becomes a key with x*x as its value. range(3) is 0, 1, 2, so {0: 0, 1: 1, 2: 4}.",
    },
  ],
};
