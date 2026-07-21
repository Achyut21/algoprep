import type { Quiz } from "./types";

export const milestone5: Quiz = {
  slug: "milestone-5",
  title: "Milestone 5: OOP Basics",
  description:
    "Classes, objects, attributes and methods — the blueprint way of coding",
  sections: ["OOP Concepts"],
  // The original 30 are now the PRACTICE bank; the exam set (below) stays private.
  practiceQuestions: [
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
      prompt: "Fill in the blank: which KEYWORD starts this blueprint?",
      code: "____ Dog:\n    def __init__(self, name):\n        self.name = name",
      options: [],
      correctIndex: 0,
      blankAnswers: ["class"],
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
      prompt:
        "Fill in the blank to BUILD one dog object from the blueprint:",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = ____('Rex')",
      options: [],
      correctIndex: 0,
      blankAnswers: ["Dog"],
      explanation:
        "Calling the class like a function — Dog('Rex') — is the construction moment: Python builds the object, runs __init__ with name='Rex', and hands the finished object to d.",
    },
    {
      id: "m5-q08",
      topic: "OOP",
      prompt: "Fill in the blank so this prints Rex:",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog('Rex')\nprint(d.____)",
      options: [],
      correctIndex: 0,
      blankAnswers: ["name"],
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
      prompt:
        "Every method's FIRST parameter — fill in the blank:",
      code: "class Dog:\n    def bark(____):\n        return 'woof'",
      options: [],
      correctIndex: 0,
      blankAnswers: ["self"],
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
      prompt:
        "Fill in the built-in function that reveals which class built an object:",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog('Rex')\nprint(____(d))   # <class '__main__.Dog'>",
      options: [],
      correctIndex: 0,
      blankAnswers: ["type"],
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
      prompt:
        "True or false: after an object is created, d.name = 'Max' successfully UPDATES its attribute.",
      code: "d = Dog('Rex')\nd.name = 'Max'",
      options: ["True", "False"],
      correctIndex: 0,
      explanation:
        "True — plain assignment through the dot updates the attribute. Objects behave like lists and dicts here (mutable), not like tuples.",
    },
    {
      id: "m5-q18",
      topic: "OOP",
      prompt:
        "True or false: legs is a CLASS attribute here, so every Dog object shares one value — this prints 4 4.",
      code: "class Dog:\n    legs = 4          # defined on the CLASS\n\na = Dog()\nb = Dog()\nprint(a.legs, b.legs)",
      options: ["True", "False"],
      correctIndex: 0,
      explanation:
        "True — legs lives on the class itself, so EVERY Dog reads the same 4. (And yes, a class without __init__ is legal; Python just builds an empty object.)",
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
      prompt:
        "True or false: this prints True, because both dogs have the name 'Rex'.",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\na = Dog('Rex')\nb = Dog('Rex')\nprint(a == b)",
      options: ["True", "False"],
      correctIndex: 1,
      explanation:
        "False — two builds from the same blueprint are still two separate objects (different ids!), and for your own classes == defaults to 'same object?'. Same lesson id() taught with list copies.",
    },
    {
      id: "m5-q27",
      topic: "OOP",
      prompt:
        "True or false: printing a plain object shows a neat summary of its attributes, like {'name': 'Rex'}.",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nd = Dog('Rex')\nprint(d)",
      options: ["True", "False"],
      correctIndex: 1,
      explanation:
        "False — Python doesn't know how you'd like a Dog displayed, so it prints the class name and a memory address: <__main__.Dog object at 0x…>. (Later you'll learn __str__ to make this pretty.)",
    },
    {
      id: "m5-q28",
      topic: "OOP",
      prompt:
        "True or false: attributes are what an object KNOWS, and methods are what it DOES.",
      options: ["True", "False"],
      correctIndex: 0,
      explanation:
        "True — d.name is knowledge (data), d.bark() is action (behavior). Methods usually work ON the attributes; that pairing is the entire point of a class.",
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
  questions: [
    {
      id: "m5-e01",
      topic: "OOP",
      prompt: "An object bundles exactly two kinds of things. Which two?",
      options: [
        "Attributes (what it knows) and methods (what it does)",
        "Loops and conditions",
        "Keys and values",
        "Inputs and outputs",
      ],
      correctIndex: 0,
      explanation:
        "That's the whole idea of OOP: data and the actions that work on that data, packed into one unit. d.name is an attribute, d.bark() is a method.",
    },
    {
      id: "m5-e02",
      topic: "OOP",
      prompt: "In this line, which part is the BLUEPRINT?",
      code: "c = Cousin('Ana', 11)",
      options: [
        "c — it holds the blueprint",
        "Cousin — the class being called",
        "'Ana' — the first value",
        "The parentheses",
      ],
      correctIndex: 1,
      explanation:
        "Cousin is the class (blueprint). Calling it builds one object, which lands in c. 'Ana' and 11 are just the starting values handed to __init__.",
    },
    {
      id: "m5-e03",
      topic: "OOP",
      prompt: "The moment Python runs Robot('R2'), what happens?",
      options: [
        "Nothing until you call robot.start()",
        "The class definition is re-read from the top",
        "A new object is built and its __init__ runs automatically with 'R2'",
        "A SyntaxError — classes can't be called",
      ],
      correctIndex: 2,
      explanation:
        "Calling a class is the construction moment: blank object first, then __init__ immediately fills in its starting values. No extra step needed.",
    },
    {
      id: "m5-e04",
      topic: "OOP",
      prompt: "What is `color` in this __init__?",
      code: "class Car:\n    def __init__(self, color):\n        self.color = color",
      options: [
        "A class attribute shared by all cars",
        "The parameter that carries the value passed in when creating a Car",
        "A built-in Python keyword",
        "The name of the class",
      ],
      correctIndex: 1,
      explanation:
        "color is a plain parameter — Car('red') delivers 'red' into it, and self.color = color stores that value on the new object permanently.",
    },
    {
      id: "m5-e05",
      topic: "OOP",
      prompt: "What happens on the last line?",
      code: "class Cat:\n    def __init__(self, name):\n        self.name = name\n\nc = Cat('Milo')\nprint(c.sound)",
      options: [
        "Prints None",
        "Prints 'Milo'",
        "AttributeError — c has no attribute called sound",
        "Prints an empty string",
      ],
      correctIndex: 2,
      explanation:
        "Objects only have the attributes someone actually set. __init__ created name, nobody created sound — asking for it raises AttributeError.",
    },
    {
      id: "m5-e06",
      topic: "OOP",
      prompt: "Given this __init__, which is the CORRECT way to build a Student?",
      code: "class Student:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age",
      options: [
        "Student(self, 'Ana', 11)",
        "Student('Ana', 11)",
        "Student.__init__('Ana', 11)",
        "new Student('Ana', 11)",
      ],
      correctIndex: 1,
      explanation:
        "You never pass self — Python supplies it. And Python has no `new` keyword; calling the class is enough. 'Ana' → name, 11 → age.",
    },
    {
      id: "m5-e07",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Robot:\n    def __init__(self, name):\n        self.name = name\n\nr1 = Robot('R2')\nr2 = Robot('C3')\nprint(r1.name, r2.name)",
      options: ["R2 C3", "C3 C3", "R2 R2", "an error"],
      correctIndex: 0,
      explanation:
        "Two separate builds, two separate objects, each with its own name attribute: R2 and C3. The second build doesn't overwrite the first.",
    },
    {
      id: "m5-e08",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Person:\n    def __init__(self, first, last):\n        self.first = first\n        self.last = last\n    def full_name(self):\n        return self.first + ' ' + self.last\n\np = Person('Ana', 'Smith')\nprint(p.full_name())",
      options: [
        "first last",
        "Ana Smith",
        "AnaSmith",
        "self.first + ' ' + self.last",
      ],
      correctIndex: 1,
      explanation:
        "full_name() reads the object's own two attributes and glues them with a space: 'Ana Smith'. Methods computing things from attributes is everyday OOP.",
    },
    {
      id: "m5-e09",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Cousin:\n    def __init__(self, age):\n        self.age = age\n    def birthday(self):\n        self.age += 1\n\nc = Cousin(11)\nx = c.birthday()\nprint(x)",
      options: ["12", "11", "None", "an error"],
      correctIndex: 2,
      explanation:
        "birthday() changes the object but has no return — and a function without return hands back None. The age DID become 12; it just wasn't returned.",
    },
    {
      id: "m5-e10",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Player:\n    def __init__(self):\n        self.score = 0\n    def add_points(self, points):\n        self.score += points\n\np = Player()\np.add_points(5)\np.add_points(2)\nprint(p.score)",
      options: ["0", "5", "2", "7"],
      correctIndex: 3,
      explanation:
        "The object remembers between calls: 0 + 5 + 2 = 7. That persistence — state living inside the object — is what plain variables in loose functions don't give you.",
    },
    {
      id: "m5-e11",
      topic: "OOP",
      prompt:
        "legs is a class attribute. Which line reads it WITHOUT creating any object?",
      code: "class Dog:\n    legs = 4",
      options: [
        "print(Dog.legs)",
        "print(legs)",
        "print(self.legs)",
        "You can't — an object is required",
      ],
      correctIndex: 0,
      explanation:
        "Class attributes live on the class itself, so Dog.legs works with zero objects built. That's also why Dog.count += 1 works inside __init__.",
    },
    {
      id: "m5-e12",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Ticket:\n    sold = 0\n    def __init__(self):\n        Ticket.sold += 1\n\nt1 = Ticket()\nt2 = Ticket()\nprint(Ticket.sold)",
      options: ["0", "1", "2", "an error"],
      correctIndex: 2,
      explanation:
        "Every construction bumps the shared counter: two tickets sold. One shared class attribute, updated from __init__ — the counting pattern.",
    },
    {
      id: "m5-e13",
      topic: "OOP",
      prompt: "What kind of attribute does `self.name = name` create?",
      options: [
        "A class attribute shared by every object",
        "An instance attribute — each object gets its own",
        "A global variable",
        "A temporary one that vanishes after __init__",
      ],
      correctIndex: 1,
      explanation:
        "Setting through self stores it on THAT object — personal and permanent for the object's lifetime. Shared values go on the class instead (like legs = 4).",
    },
    {
      id: "m5-e14",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Student:\n    def __init__(self, grade):\n        self.grade = grade\n\nroster = [Student(90), Student(80)]\ntotal = 0\nfor s in roster:\n    total += s.grade\nprint(total)",
      options: ["90", "80", "170", "[90, 80]"],
      correctIndex: 2,
      explanation:
        "Loop over the objects, read each one's attribute, add them up: 90 + 80 = 170. Lists of objects work exactly like lists of numbers — the dot is the only new move.",
    },
    {
      id: "m5-e15",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Car:\n    def __init__(self, speed):\n        self.speed = speed\n\ncars = {'zippy': Car(120)}\nprint(cars['zippy'].speed)",
      options: ["'zippy'", "120", "Car(120)", "a KeyError"],
      correctIndex: 1,
      explanation:
        "Chain it: the dict lookup returns the Car object, the dot reads its speed. Objects as dictionary values — milestone 3 meets milestone 5.",
    },
    {
      id: "m5-e16",
      topic: "OOP",
      prompt: "When r2.area() runs, what does self refer to inside area()?",
      code: "r1 = Rectangle(2, 3)\nr2 = Rectangle(4, 5)\nr2.area()",
      options: [
        "The Rectangle class",
        "r1 — the first object created",
        "r2 — the object the method was called on",
        "Both rectangles at once",
      ],
      correctIndex: 2,
      explanation:
        "self is always the object left of the dot: for r2.area(), self IS r2 (so self.w is 4). Call it on r1 and self would be r1. Same code, different object each time.",
    },
    {
      id: "m5-e17",
      topic: "OOP",
      prompt: "Careful — what does this print?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\na = Dog('Rex')\nb = a\nb.name = 'Max'\nprint(a.name)",
      options: ["Rex", "Max", "an error", "None"],
      correctIndex: 1,
      explanation:
        "b = a does NOT build a second dog — both names point at the SAME object, just like lists. Changing it through b shows through a: Max. (Compare with a = Dog('Rex'); b = Dog('Rex') — those are two objects.)",
    },
    {
      id: "m5-e18",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\na = Dog('Rex')\nb = Dog('Luna')\nprint(type(a) == type(b))",
      options: [
        "False — different names, different types",
        "True — both were built by the same class",
        "'Dog'",
        "an error",
      ],
      correctIndex: 1,
      explanation:
        "type() returns the class that built the object — Dog for both, regardless of their attribute values. Same blueprint, same type.",
    },
    {
      id: "m5-e19",
      topic: "OOP",
      prompt: "What does this print?",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def rename(self, new_name):\n        self.name = new_name\n\nd = Dog('Rex')\nd.rename('Bo')\nprint(d.name)",
      options: ["Rex", "new_name", "Bo", "an error"],
      correctIndex: 2,
      explanation:
        "Methods can take extra arguments after self: 'Bo' arrives as new_name and gets stored over the old value. self.name is now Bo.",
    },
    {
      id: "m5-e20",
      topic: "OOP",
      prompt:
        "Bundling data and the methods that work on it inside one class — which pillar of OOP is that?",
      options: [
        "Inheritance",
        "Polymorphism",
        "Encapsulation",
        "Abstraction",
      ],
      correctIndex: 2,
      explanation:
        "Encapsulation is the bundle-and-protect pillar — and it's the one you're already living: every class you write encapsulates. The other three arrive later in the course.",
    },
    {
      id: "m5-e21",
      topic: "OOP",
      prompt:
        "Fill in the blank: the method that runs automatically when an object is created.",
      code: "class Dog:\n    def ____(self, name):\n        self.name = name",
      options: [],
      correctIndex: 0,
      blankAnswers: ["__init__", "init"],
      explanation:
        "__init__ (say: 'dunder init') is the setup routine — Python calls it for you the instant Dog('Rex') builds a new object.",
    },
    {
      id: "m5-e22",
      topic: "OOP",
      prompt:
        "Fill in the blank so the age is stored on THIS object:",
      code: "class Cousin:\n    def __init__(self, age):\n        ____.age = age",
      options: [],
      correctIndex: 0,
      blankAnswers: ["self"],
      explanation:
        "self is the object under construction — self.age = age moves the visiting parameter into the object's own permanent storage.",
    },
    {
      id: "m5-e23",
      topic: "OOP",
      prompt: "Fill in the KEYWORD that defines a method inside a class:",
      code: "class Dog:\n    ____ bark(self):\n        return 'woof'",
      options: [],
      correctIndex: 0,
      blankAnswers: ["def"],
      explanation:
        "Methods are defined with plain def, exactly like normal functions — living inside a class (and carrying self) is what makes them methods.",
    },
    {
      id: "m5-e24",
      topic: "OOP",
      prompt: "Fill in the blank so this prints 0:",
      code: "class Player:\n    def __init__(self, name):\n        self.name = name\n        self.score = 0\n\np = Player('ana')\nprint(p.____)",
      options: [],
      correctIndex: 0,
      blankAnswers: ["score"],
      explanation:
        "__init__ gave every new Player a score of 0 — p.score reads it. (p.name would print 'ana'.)",
    },
    {
      id: "m5-e25",
      topic: "OOP",
      prompt: "Fill in the blank to make the dog bark:",
      code: "class Dog:\n    def bark(self):\n        return 'woof'\n\nd = Dog()\nprint(d.____())",
      options: [],
      correctIndex: 0,
      blankAnswers: ["bark"],
      explanation:
        "d.bark() — the dot picks the method, the parentheses run it. Without them you'd print the method object instead of 'woof'.",
    },
    {
      id: "m5-e26",
      topic: "OOP",
      prompt:
        "True or false: when CALLING a method you must pass self yourself, like d.bark(d).",
      options: ["True", "False"],
      correctIndex: 1,
      explanation:
        "False — Python fills self in automatically: d.bark() is enough, and d becomes self behind the scenes. You only write self in the DEFINITION.",
    },
    {
      id: "m5-e27",
      topic: "OOP",
      prompt:
        "True or false: one class can be used to create as many objects as you want.",
      options: ["True", "False"],
      correctIndex: 0,
      explanation:
        "True — a blueprint doesn't run out. Every call to the class stamps out a fresh, independent object.",
    },
    {
      id: "m5-e28",
      topic: "OOP",
      prompt:
        "True or false: a class attribute is a good home for a value ALL objects share — like a counter of how many were created.",
      options: ["True", "False"],
      correctIndex: 0,
      explanation:
        "True — that's exactly its job: one shared value on the class (Ticket.sold), updated from __init__, visible to everyone.",
    },
    {
      id: "m5-e29",
      topic: "OOP",
      prompt:
        "True or false: if a class has no __init__ at all, creating an object from it crashes.",
      options: ["True", "False"],
      correctIndex: 1,
      explanation:
        "False — __init__ is optional. Python happily builds an empty object; you just don't get any starting attributes set up for you.",
    },
    {
      id: "m5-e30",
      topic: "OOP",
      prompt:
        "True or false: a method can both READ the object's attributes and CHANGE them.",
      options: ["True", "False"],
      correctIndex: 0,
      explanation:
        "True — area() reads self.w and self.h; birthday() changes self.age. Reading and writing the object's own data is what methods are for.",
    },
  ],
};
