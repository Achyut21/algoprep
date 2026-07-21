import type { Quiz } from "./types";

export const milestone5: Quiz = {
  slug: "milestone-5",
  title: "Milestone 5: OOP Basics",
  description:
    "Classes, objects, attributes and methods — the blueprint way of coding",
  sections: ["OOP Concepts"],
  questions: [
    {
      id: "m5-q01",
      topic: "OOP",
      prompt: "What is Object-Oriented Programming (OOP)?",
      options: [
        "A way of organizing code around OBJECTS that bundle data (attributes) and actions (methods) together",
        "A style where all code lives in one giant file",
        "A way to make programs run in O(1)",
        "Programming with only dictionaries",
      ],
      correctIndex: 0,
      explanation:
        "Instead of loose variables and loose functions, OOP packs the data and the functions that work on it into one unit: an object. The recipe for building such objects is a class.",
    },
    {
      id: "m5-q02",
      topic: "OOP",
      prompt: "Why does THIS course need OOP right now?",
      options: [
        "Because Python refuses to run without classes",
        "Because the coming data structures — linked lists, stacks, queues — will be built as classes",
        "Because OOP makes programs faster",
        "It doesn't; it's just tradition",
      ],
      correctIndex: 1,
      explanation:
        "Everything from here on — linked lists, stacks, queues, trees — is a bundle of data plus its own operations. A class is exactly that bundle, so OOP is the toolbox for the rest of the course.",
    },
    {
      id: "m5-q03",
      topic: "OOP",
      prompt: "What is the difference between a class and an object?",
      options: [
        "They are two names for the same thing",
        "A class is a BLUEPRINT; an object is an actual thing BUILT from that blueprint",
        "An object is the blueprint; a class is built from it",
        "Classes hold data, objects hold functions",
      ],
      correctIndex: 1,
      explanation:
        "One house blueprint, many houses: the class describes what every Cousin has (name, age); each object — Cousin('Ana', 11) — is one real cousin with its own values.",
    },
    {
      id: "m5-q04",
      topic: "OOP",
      prompt: "Which line correctly STARTS a class definition?",
      options: [
        "def Dog:",
        "class Dog:",
        "object Dog:",
        "Dog = class()",
      ],
      correctIndex: 1,
      explanation:
        "The class keyword starts the blueprint, just like def starts a function. By convention class names are Capitalized: Dog, Cousin, LinkedList.",
    },
    {
      id: "m5-q05",
      topic: "OOP",
      prompt: "When does __init__ run?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name",
      options: [
        "Only when you call dog.__init__() yourself",
        "Once, when Python reads the class definition",
        "Automatically, every time a new object is created",
        "Never — it's just documentation",
      ],
      correctIndex: 2,
      explanation:
        "__init__ is the setup routine: the moment you write Dog('Rex'), Python builds a blank object and immediately runs __init__ on it to fill in its starting values.",
    },
    {
      id: "m5-q06",
      topic: "OOP",
      prompt: "What does `self` mean inside a class?",
      options: [
        "The class itself",
        "The particular OBJECT being created or worked on right now",
        "A required keyword that does nothing",
        "The first argument you must pass manually every time",
      ],
      correctIndex: 1,
      explanation:
        "self is 'this specific object'. When rex.bark() runs, self IS rex; when luna.bark() runs, self is luna. Python passes it in automatically — you never type it at the call site.",
    },
    {
      id: "m5-q07",
      topic: "OOP",
      prompt: "Which line actually CREATES an object?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name",
      options: [
        "class Dog:",
        "def __init__(self, name):",
        "d = Dog('Rex')",
        "self.name = name",
      ],
      correctIndex: 2,
      explanation:
        "Calling the class like a function — Dog('Rex') — is the construction moment: Python builds the object, runs __init__ with name='Rex', and hands the finished object to d.",
    },
    {
      id: "m5-q08",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog('Rex')\nprint(d.name)",
      options: ["name", "Rex", "self.name", "an error"],
      correctIndex: 1,
      explanation:
        "The dot reaches into the object: d.name asks 'hey d, what's your name attribute?' — 'Rex'. Same dot you've used all along with .append() and .keys().",
    },
    {
      id: "m5-q09",
      topic: "OOP",
      prompt: "What does the line `self.name = name` inside __init__ do?",
      options: [
        "Compares the object's name to the parameter",
        "Copies the parameter's value into the object's OWN storage, as an attribute",
        "Creates a global variable called name",
        "Renames the class",
      ],
      correctIndex: 1,
      explanation:
        "Left side: the object's attribute (self.name — permanent, lives with the object). Right side: the parameter that arrived in the call (temporary). The line moves the value from the visitor into the house.",
    },
    {
      id: "m5-q10",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Student:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\ns = Student('Ana', 11)\nprint(s.age)",
      options: ["'Ana'", "age", "11", "an error"],
      correctIndex: 2,
      explanation:
        "__init__ can take as many parameters as you like; they map in order: name='Ana', age=11. s.age fetches 11.",
    },
    {
      id: "m5-q11",
      topic: "OOP",
      prompt: "How do you define a METHOD (an action) inside a class?",
      options: [
        "def bark():  — same as a normal function",
        "def bark(self):  — with self as the first parameter",
        "method bark(self):",
        "bark = def(self):",
      ],
      correctIndex: 1,
      explanation:
        "A method is just a function that lives inside a class — but it must accept self first, so it knows WHICH object it's acting on.",
    },
    {
      id: "m5-q12",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return self.name + ' says woof!'\n\nd = Dog('Rex')\nprint(d.bark())",
      options: [
        "self.name says woof!",
        "woof!",
        "Rex says woof!",
        "an error — bark needs an argument",
      ],
      correctIndex: 2,
      explanation:
        "d.bark() calls the method ON d, so self is d and self.name is 'Rex'. You wrote self in the definition, but Python fills it in for you at the call.",
    },
    {
      id: "m5-q13",
      topic: "OOP",
      prompt: "The classic beginner crash — what happens here?",
      code: "class Dog:\n    def bark():\n        return 'woof'\n\nd = Dog()\nprint(d.bark())",
      options: [
        "Prints woof",
        "Prints None",
        "TypeError — bark() takes 0 arguments but 1 was given",
        "Nothing — bark is skipped",
      ],
      correctIndex: 2,
      explanation:
        "d.bark() secretly passes d as the first argument — but bark declared NO parameters, so Python complains it got 1 argument it can't accept. The fix: def bark(self).",
    },
    {
      id: "m5-q14",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog('Rex')\nprint(type(d))",
      options: [
        "<class 'Dog'> style output — the object's class",
        "<class 'str'>",
        "'Rex'",
        "<class 'object'>",
      ],
      correctIndex: 0,
      explanation:
        "type() tells you what blueprint built the thing: for d that's the Dog class (shown as <class '__main__.Dog'>). Your own classes become types, just like int and list.",
    },
    {
      id: "m5-q15",
      topic: "OOP",
      prompt:
        "The course names four big OOP concepts. Which is the right list?",
      options: [
        "Encapsulation, Inheritance, Polymorphism, Abstraction",
        "Iteration, Recursion, Indexing, Slicing",
        "Compilation, Execution, Debugging, Testing",
        "Keys, Values, Items, Pairs",
      ],
      correctIndex: 0,
      explanation:
        "The four pillars: encapsulation (bundle data + methods), inheritance (classes based on classes), polymorphism (same action, different behavior per class), abstraction (hide the messy details). You'll meet each properly later — for now, know the names.",
    },
    {
      id: "m5-q16",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\na = Dog('Rex')\nb = Dog('Luna')\na.name = 'Max'\nprint(b.name)",
      options: ["Max", "Rex", "Luna", "an error"],
      correctIndex: 2,
      explanation:
        "Each object carries its OWN attributes — changing a's name touches only a. b is a separate object and still says Luna. (No sneaky sharing here, unlike b = a with lists!)",
    },
    {
      id: "m5-q17",
      topic: "OOP",
      prompt: "Can you change an object's attribute after it's created?",
      code: "d = Dog('Rex')\nd.name = 'Max'",
      options: [
        "No — attributes are locked like tuples",
        "Yes — objects are mutable; assignment updates the attribute",
        "Only inside __init__",
        "Only with a special rename() method",
      ],
      correctIndex: 1,
      explanation:
        "Plain assignment through the dot updates the attribute — objects behave like lists and dicts here (mutable), not like tuples.",
    },
    {
      id: "m5-q18",
      topic: "OOP",
      prompt: "A CLASS attribute — what does this print?",
      code: "class Dog:\n    legs = 4          # defined on the CLASS\n\na = Dog()\nb = Dog()\nprint(a.legs, b.legs)",
      options: ["4 4", "4 0", "an error — no __init__", "None None"],
      correctIndex: 0,
      explanation:
        "legs lives on the class itself, so EVERY Dog shares it — both read 4. (And yes, a class without __init__ is legal; Python just builds an empty object.) That's the Class Attributes lecture in one snippet.",
    },
    {
      id: "m5-q19",
      topic: "OOP",
      prompt: "The shadowing surprise — what does this print?",
      code: "class Dog:\n    legs = 4\n\na = Dog()\nb = Dog()\na.legs = 3        # ??\nprint(a.legs, b.legs)",
      options: ["3 3", "4 4", "3 4", "an error"],
      correctIndex: 2,
      explanation:
        "a.legs = 3 doesn't touch the class — it creates a's own PERSONAL legs attribute that shadows the shared one. b has no personal copy, so it still reads the class's 4.",
    },
    {
      id: "m5-q20",
      topic: "OOP",
      prompt: "The instance-counter pattern — what does this print?",
      code: "class Dog:\n    count = 0\n    def __init__(self):\n        Dog.count += 1\n\na = Dog()\nb = Dog()\nc = Dog()\nprint(Dog.count)",
      options: ["0", "1", "3", "an error"],
      correctIndex: 2,
      explanation:
        "The shared class attribute is perfect for counting: every __init__ bumps Dog.count, and three objects were built. This is THE practical use of class attributes.",
    },
    {
      id: "m5-q21",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Rectangle:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\nr = Rectangle(3, 4)\nprint(r.area())",
      options: ["7", "12", "(3, 4)", "self.w * self.h"],
      correctIndex: 1,
      explanation:
        "area() reads the object's own attributes: 3 × 4 = 12. Methods exist exactly for this — computing things FROM the object's data.",
    },
    {
      id: "m5-q22",
      topic: "OOP",
      prompt: "A method that CHANGES the object — what does this print?",
      code: "class Cousin:\n    def __init__(self, age):\n        self.age = age\n    def birthday(self):\n        self.age += 1\n\nc = Cousin(11)\nc.birthday()\nc.birthday()\nprint(c.age)",
      options: ["11", "12", "13", "an error"],
      correctIndex: 2,
      explanation:
        "Each birthday() call adds 1 to the object's own age: 11 → 12 → 13. Methods can read AND update self's attributes — that's how objects remember change.",
    },
    {
      id: "m5-q23",
      topic: "OOP",
      prompt: "The missing parentheses — what does this print?",
      code: "class Dog:\n    def bark(self):\n        return 'woof'\n\nd = Dog()\nprint(d.bark)",
      options: [
        "woof",
        "Something like <bound method Dog.bark of …> — the method itself, not its result",
        "None",
        "a TypeError",
      ],
      correctIndex: 1,
      explanation:
        "Without () you're not CALLING bark, just pointing at it — so Python prints the method object. Parentheses are the 'run it' signal. (Same reason print(len) looks weird.)",
    },
    {
      id: "m5-q24",
      topic: "OOP",
      prompt: "Objects living in a LIST — what does this print?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\ndogs = [Dog('Rex'), Dog('Luna'), Dog('Bo')]\nprint(dogs[1].name)",
      options: ["Rex", "Luna", "Bo", "an error"],
      correctIndex: 1,
      explanation:
        "Objects are values like any other — lists hold them happily. dogs[1] grabs the second object, .name reads its attribute: Luna. Milestone 2 meets milestone 5.",
    },
    {
      id: "m5-q25",
      topic: "OOP",
      prompt: "Objects as dictionary VALUES — what does this print?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\npets = {'rex': Dog('Rex'), 'luna': Dog('Luna')}\nprint(pets['luna'].name)",
      options: ["'luna'", "Luna", "Rex", "a KeyError"],
      correctIndex: 1,
      explanation:
        "Chain the lookups: pets['luna'] returns the object (O(1), remember!), then .name reads its attribute. Dictionaries of objects are everywhere in real programs.",
    },
    {
      id: "m5-q26",
      topic: "OOP",
      prompt: "Two identical-looking objects — what does this print?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\na = Dog('Rex')\nb = Dog('Rex')\nprint(a == b)",
      options: [
        "True — same name means equal",
        "False — they are two DIFFERENT objects, and default == checks identity",
        "'Rex'",
        "an error",
      ],
      correctIndex: 1,
      explanation:
        "Two builds from the same blueprint are still two separate objects (different ids!), and for your own classes == defaults to 'same object?'. Same lesson id() taught with list copies.",
    },
    {
      id: "m5-q27",
      topic: "OOP",
      prompt: "What does printing a plain object show?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog('Rex')\nprint(d)",
      options: [
        "Rex",
        "{'name': 'Rex'}",
        "Something like <__main__.Dog object at 0x104f3b3d0>",
        "Dog('Rex')",
      ],
      correctIndex: 2,
      explanation:
        "Python doesn't know how you'd like a Dog displayed, so it prints the class name and the object's memory address. (Later you'll learn __str__ to make this pretty.)",
    },
    {
      id: "m5-q28",
      topic: "OOP",
      prompt: "Which statement about attributes vs methods is correct?",
      options: [
        "Attributes are what the object KNOWS; methods are what the object DOES",
        "Attributes run code; methods store data",
        "They're interchangeable words for the same thing",
        "Methods can't use attributes",
      ],
      correctIndex: 0,
      explanation:
        "d.name is knowledge (data), d.bark() is action (behavior). Methods usually work ON the attributes — that pairing is the entire point of a class.",
    },
    {
      id: "m5-q29",
      topic: "OOP",
      prompt:
        "You create 100 Cousin objects. How many separate `name` attributes exist?",
      code: "class Cousin:\n    def __init__(self, name):\n        self.name = name",
      options: [
        "1 — they all share it",
        "100 — one per object, because it's set on self",
        "0 until someone prints them",
        "Depends on the names",
      ],
      correctIndex: 1,
      explanation:
        "self.name = name runs once PER OBJECT, giving each its own slot. Compare with a class attribute (like legs = 4), where one shared value serves everyone.",
    },
    {
      id: "m5-q30",
      topic: "OOP",
      prompt:
        "Looking ahead: why will a LinkedList be a class instead of loose functions?",
      options: [
        "Because classes make the list sort itself",
        "So its data AND its operations (insert, search, delete) live bundled in one self-contained unit",
        "Because Python functions can't take lists",
        "Classes are required for anything over 10 lines",
      ],
      correctIndex: 1,
      explanation:
        "That bundling is encapsulation — pillar #1 in action. myList.insert(5) beats juggling insert(some_list_data, 5) everywhere, and it's exactly how the rest of the course will build every structure.",
    },
  ],
};
