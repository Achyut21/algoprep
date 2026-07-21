import { CodeBlock } from "@/components/code-block";
import { ClassBlueprintDemo } from "@/components/demos";
import { NoteCard, PythonHint, Term, Tldr } from "./note-ui";

export function OopNotes() {
  return (
    <div className="space-y-4">
      <Tldr>
        A <strong>class</strong> is a blueprint. An <strong>object</strong> is
        a real thing built from it. Attributes are what the object KNOWS,
        methods are what it DOES, and <span className="font-mono">self</span>{" "}
        means &quot;this particular object&quot;.
      </Tldr>

      <NoteCard title="why OOP, why now?">
        <p>
          Everything coming next in the course — linked lists, stacks, queues,
          trees — is a chunk of data plus the operations that belong to it.
          A class bundles exactly that into one self-contained unit, so from
          here on, every data structure you build will BE a class.
        </p>
        <p className="text-muted-foreground">
          You&apos;ve already been USING objects all along:{" "}
          <span className="font-mono">my_list.append(4)</span> is calling the
          append METHOD on a list OBJECT. Now you learn to build your own.
        </p>
      </NoteCard>

      <NoteCard title="class = blueprint, object = the real thing">
        <ClassBlueprintDemo />
        <p className="text-muted-foreground">
          One blueprint, as many objects as you like — each with its own
          values. The class stores no data itself; it only describes what
          every object will have.
        </p>
      </NoteCard>

      <NoteCard title="defining a class — the anatomy">
        <CodeBlock
          code={
            "class Cousin:                     # the blueprint (Capitalized name)\n    def __init__(self, name, age):  # runs on EVERY new object\n        self.name = name            # store name on THIS object\n        self.age = age              # store age on THIS object"
          }
          filename="anatomy.py"
        />
        <Term name="class Cousin:">starts the blueprint, like def starts a function.</Term>
        <Term name="__init__">
          the setup routine — runs automatically the moment an object is
          created. (Two underscores each side: &quot;dunder init&quot;.)
        </Term>
        <Term name="self">
          the object being worked on right now. Python passes it in for you —
          you never type it when calling.
        </Term>
        <Term name="self.name = name">
          copy the visiting parameter into the object&apos;s own permanent
          storage.
        </Term>
        <PythonHint />
      </NoteCard>

      <NoteCard title="creating objects & the dot">
        <CodeBlock
          code={
            "class Cousin:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\nrohan = Cousin('Rohan', 13)   # build one — __init__ runs\nana = Cousin('Ana', 11)       # build another\n\nprint(rohan.name)   # Rohan\nprint(ana.age)      # 11\nana.age = 12        # attributes can be updated\nprint(type(ana))    # <class '__main__.Cousin'>"
          }
          filename="objects.py"
        />
        <p className="text-muted-foreground">
          Calling the class like a function is the construction moment. The
          dot then reaches into a specific object — same dot as{" "}
          <span className="font-mono">.append()</span> and{" "}
          <span className="font-mono">.keys()</span>.
        </p>
      </NoteCard>

      <NoteCard title="methods — what the object can DO">
        <CodeBlock
          code={
            "class Cousin:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def greet(self):              # a method: self comes first\n        return 'hi, i am ' + self.name\n\n    def birthday(self):           # methods can CHANGE the object\n        self.age += 1\n\nana = Cousin('Ana', 11)\nprint(ana.greet())    # hi, i am Ana\nana.birthday()\nprint(ana.age)        # 12"
          }
          filename="methods.py"
        />
        <p className="text-muted-foreground">
          Forgetting <span className="font-mono">self</span> in the definition
          is THE classic crash: &quot;takes 0 positional arguments but 1 was
          given&quot; — Python passed the object in and found no seat for it.
          And <span className="font-mono">ana.greet</span> without parentheses
          points at the method instead of running it.
        </p>
      </NoteCard>

      <NoteCard title="every object gets its OWN attributes">
        <CodeBlock
          code={
            "a = Cousin('Rohan', 13)\nb = Cousin('Ana', 11)\n\na.name = 'Ro'\nprint(b.name)   # Ana — b is untouched!"
          }
          filename="independent.py"
        />
        <p className="text-muted-foreground">
          Anything set through <span className="font-mono">self</span> in
          __init__ is per-object. 100 cousins = 100 separate name slots. No{" "}
          <span className="font-mono">b = a</span> sharing surprise here —
          these are two genuinely different objects.
        </p>
      </NoteCard>

      <NoteCard title="class attributes — the SHARED kind">
        <p>
          Defined directly on the class (outside __init__), one value serves
          every object:
        </p>
        <CodeBlock
          code={
            "class Dog:\n    legs = 4              # CLASS attribute — shared\n    count = 0             # great for counting instances\n\n    def __init__(self, name):\n        self.name = name   # INSTANCE attribute — personal\n        Dog.count += 1\n\na = Dog('Rex')\nb = Dog('Luna')\nprint(a.legs, b.legs)   # 4 4  — one shared value\nprint(Dog.count)        # 2  — counted every build!\n\na.legs = 3              # careful: creates a's PERSONAL legs\nprint(a.legs, b.legs)   # 3 4 — b still reads the class's 4"
          }
          filename="class_attrs.py"
        />
        <p className="text-muted-foreground">
          That last surprise is called shadowing: assigning through an object
          never changes the class — it gives that one object a personal copy
          that hides the shared one.
        </p>
      </NoteCard>

      <NoteCard title="objects play nice with your other structures">
        <CodeBlock
          code={
            "dogs = [Dog('Rex'), Dog('Luna'), Dog('Bo')]\nprint(dogs[1].name)          # Luna — list index, then dot\n\npets = {'rex': Dog('Rex')}\nprint(pets['rex'].name)      # Rex — dict lookup, then dot\n\nfor d in dogs:               # loop over objects like anything\n    print(d.name)"
          }
          filename="collections.py"
        />
        <p className="text-muted-foreground">
          Objects are values like numbers or strings — store them in lists,
          use them as dictionary values, loop over them. (As dictionary KEYS?
          Only if you know what you&apos;re doing — stick to strings and
          tuples for now.)
        </p>
      </NoteCard>

      <NoteCard title="two gotchas before the quiz">
        <CodeBlock
          code={
            "a = Dog('Rex')\nb = Dog('Rex')\nprint(a == b)   # False! two different objects\nprint(a)        # <__main__.Dog object at 0x104f3b3d0>"
          }
          filename="gotchas.py"
        />
        <p className="text-muted-foreground">
          Same-looking builds are still separate objects (different id()s),
          and by default <span className="font-mono">==</span> asks &quot;same
          object?&quot; — not &quot;same values?&quot;. And printing a plain
          object shows its class + memory address, because Python doesn&apos;t
          know how you&apos;d like it displayed (later:{" "}
          <span className="font-mono">__str__</span> fixes that).
        </p>
      </NoteCard>

      <NoteCard title="the four pillars (names to know)">
        <Term name="encapsulation">
          bundle data + methods in one unit, hide the internals — you&apos;re
          doing it already.
        </Term>
        <Term name="inheritance">build a new class on top of an existing one.</Term>
        <Term name="polymorphism">
          the same action behaving differently per class.
        </Term>
        <Term name="abstraction">
          use a thing through a simple interface without knowing its guts.
        </Term>
        <p className="text-muted-foreground">
          The course goes deeper on these later — for now the quiz only asks
          you to recognize the names.
        </p>
      </NoteCard>

      <Tldr>
        Practice time — predict each output BEFORE running, then check
        yourself.
      </Tldr>

      <NoteCard title="try it 1 — build your own Cousin">
        <CodeBlock
          code={
            "class Cousin:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\n    def greet(self):\n        return 'hi, i am ' + self.name\n\nme = Cousin('You', 12)\nprint(me.greet())        # hi, i am You\nprint(me.age)            # 12\n\n# challenge: add an is_teenager method that\n# returns True when age >= 13"
          }
          filename="try_1_cousin.py"
        />
      </NoteCard>

      <NoteCard title="try it 2 — the counting class">
        <CodeBlock
          code={
            "class Player:\n    count = 0\n    def __init__(self, name):\n        self.name = name\n        self.score = 0\n        Player.count += 1\n\n    def add_points(self, points):\n        self.score += points\n\np1 = Player('ana')\np2 = Player('rohan')\np1.add_points(5)\np1.add_points(3)\n\nprint(p1.score)       # 8\nprint(p2.score)       # 0  — separate objects!\nprint(Player.count)   # 2\n\n# challenge: predict what p2.count prints, then run it"
          }
          filename="try_2_counter.py"
        />
      </NoteCard>

      <NoteCard title="try it 3 — a roster of objects">
        <CodeBlock
          code={
            "class Student:\n    def __init__(self, name, grade):\n        self.name = name\n        self.grade = grade\n\nroster = [Student('ana', 92), Student('rohan', 85),\n          Student('em', 78)]\n\nfor s in roster:\n    print(s.name, s.grade)\n\nbest = roster[0]\nfor s in roster:\n    if s.grade > best.grade:\n        best = s\nprint('top:', best.name)   # top: ana\n\n# challenge: compute the average grade using sum()\n# and a generator expression over the roster"
          }
          filename="try_3_roster.py"
        />
        <p className="text-muted-foreground">
          Find-the-biggest from the arrays doc, reborn with objects — the
          patterns you learned keep working, the data just got smarter.
        </p>
      </NoteCard>
    </div>
  );
}
