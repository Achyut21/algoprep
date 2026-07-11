import { CodeBlock } from "@/components/code-block";
import { ImmutabilityDemo } from "@/components/demos";
import { ComplexityTable, NoteCard, PythonHint, Tldr } from "./note-ui";

export function TuplesNotes() {
  return (
    <div className="space-y-4">
      <Tldr>
        A tuple is a list with the lock turned on: ordered, indexable,
        loop-able — but once built it can NEVER change. No append, no remove,
        no overwriting a slot. The lock is a feature, not a limitation.
      </Tldr>

      <NoteCard title="creating tuples (and the comma trap)">
        <CodeBlock
          code={
            "newTuple = ('a', 'b', 'c', 'd', 'e')\nnewTuple1 = tuple('abcde')   # ('a', 'b', 'c', 'd', 'e')\npacked = 1, 2                # parentheses optional!\n\nsingle = ('Python',)         # ONE item needs the comma\nnot_a_tuple = ('Python')     # no comma = just a string!\nprint(type(not_a_tuple))     # <class 'str'>"
          }
          filename="create.py"
        />
        <p className="text-muted-foreground">
          The comma makes the tuple, not the parentheses.{" "}
          <span className="font-mono">(&apos;Python&apos;) * 3</span> is the
          string{" "}
          <span className="font-mono">&apos;PythonPythonPython&apos;</span> —
          a favorite quiz trap.
        </p>
        <PythonHint />
      </NoteCard>

      <NoteCard title="immutable — the whole point">
        <p>Reading works like a list. Writing… does not:</p>
        <ImmutabilityDemo />
        <CodeBlock
          code={
            "t = (1, 2, 3)\nprint(t[0])     # 1      — reading is fine\nprint(t[-1])    # 3      — negative indexes too\nt[0] = 99       # TypeError!\nt.append(4)     # AttributeError — no such method"
          }
          filename="locked.py"
        />
        <p className="text-muted-foreground">
          Methods that would change it simply don&apos;t exist. The only two
          methods tuples have are count() and index().
        </p>
      </NoteCard>

      <NoteCard title="traversing & searching">
        <CodeBlock
          code={
            "newTuple = ('a', 'b', 'c', 'd', 'e')\n\nfor item in newTuple:        # exactly like a list\n    print(item)\n\nprint('a' in newTuple)       # True\nprint(newTuple.index('c'))   # 2  (where does 'c' live?)\nprint(newTuple.count('a'))   # 1  (how many 'a's?)"
          }
          filename="search.py"
        />
      </NoteCard>

      <NoteCard title="operations — they build NEW tuples">
        <p>
          Since a tuple can&apos;t change, + and * don&apos;t modify anything —
          they manufacture a brand-new tuple:
        </p>
        <CodeBlock
          code={
            "myTuple = (1, 4, 3, 2, 5)\nmyTuple1 = (1, 2, 6, 9, 8, 7)\n\nprint(myTuple + myTuple1)  # one new 11-item tuple\nprint((1, 2) * 3)          # (1, 2, 1, 2, 1, 2)\nprint(2 in myTuple1)       # True\nprint(len(myTuple))        # 5\nprint(max(myTuple))        # 5\nprint(sum(myTuple))        # 15"
          }
          filename="operations.py"
        />
      </NoteCard>

      <NoteCard title="unpacking — the tuple superpower">
        <p>
          A tuple can be split into named variables in one line. You&apos;ve
          been using this without knowing:
        </p>
        <CodeBlock
          code={
            "point = (3, 7)\nx, y = point           # x=3, y=7 — unpacked!\n\npairs = [(0, 1), (1, 2), (2, 3)]\nresult = sum(n for _, n in pairs)\nprint(result)          # 6 — the _ throws away the first half"
          }
          filename="unpacking.py"
        />
        <p className="text-muted-foreground">
          That second example is from your course&apos;s interview questions —
          and `for k, v in myDict.items()` from milestone 3 was tuple
          unpacking all along!
        </p>
      </NoteCard>

      <NoteCard title="tuple vs list (the showdown)">
        <p>
          <span className="font-mono text-primary">tuple ✓</span> data that
          must not change: coordinates, birthdays, (key, value) pairs. Faster
          and smaller than a list. Can be a dictionary key!
        </p>
        <p>
          <span className="font-mono text-cyan">list ✓</span> data that grows
          and shrinks — everything else.
        </p>
        <CodeBlock
          code={
            "distances = {('home', 'school'): 2.5}   # tuple key: works!\n# broken = {['home', 'school']: 2.5}    # list key: TypeError"
          }
          filename="dict_keys.py"
        />
      </NoteCard>

      <NoteCard title="every tuple operation, measured">
        <ComplexityTable
          rows={[
            { op: "create with n items", time: "O(n)", space: "O(n)" },
            { op: "access myTuple[i]", time: "O(1)", space: "O(1)" },
            { op: "traverse (visit every item)", time: "O(n)", space: "O(1)" },
            {
              op: "search: value in myTuple",
              time: "O(n)",
              space: "O(1)",
            },
            { op: "count() / index()", time: "O(n)", space: "O(1)" },
            {
              op: "concatenate with +",
              time: "O(n + k)",
              space: "O(n + k)",
              note: "builds a whole new tuple",
            },
            {
              op: "insert / delete / update",
              time: "—",
              space: "—",
              note: "impossible — immutable! 🔒",
            },
          ]}
        />
        <p className="text-muted-foreground">
          Reading costs match lists exactly. The changing operations
          don&apos;t have a cost because they don&apos;t exist.
        </p>
      </NoteCard>

      <Tldr>
        Practice time — predict each output BEFORE running, then check
        yourself.
      </Tldr>

      <NoteCard title="try it 1 — build, read, loop">
        <CodeBlock
          code={
            "days = ('mon', 'tue', 'wed', 'thu', 'fri')\n\nprint(days[0])       # mon\nprint(days[-1])      # fri\nprint(len(days))     # 5\nprint('sat' in days) # False\n\nfor d in days:\n    print(d.upper())  # MON, TUE, …\n\n# challenge: what happens if you try days[0] = 'sun'?\n# predict the exact error, then run it"
          }
          filename="try_1_basics.py"
        />
      </NoteCard>

      <NoteCard title="try it 2 — the comma experiment">
        <CodeBlock
          code={
            "a = ('hello')\nb = ('hello',)\nc = 'hello',\n\nprint(type(a))   # <class 'str'>   — no comma, no tuple\nprint(type(b))   # <class 'tuple'>\nprint(type(c))   # <class 'tuple'> — comma alone is enough\n\nprint(a * 2)     # hellohello\nprint(b * 2)     # ('hello', 'hello')"
          }
          filename="try_2_comma.py"
        />
      </NoteCard>

      <NoteCard title="try it 3 — search like the course">
        <p>The course&apos;s searchInTuple, cleaned up:</p>
        <CodeBlock
          code={
            "def search_in_tuple(p_tuple, element):\n    for item in p_tuple:          # walk every item\n        if item == element:\n            return p_tuple.index(item)\n    return 'the element does not exist'\n\nletters = ('a', 'b', 'c', 'd')\nprint(search_in_tuple(letters, 'c'))  # 2\nprint(search_in_tuple(letters, 'z'))  # the element does not exist\n\n# challenge: rewrite it WITHOUT .index() —\n# use range(len(p_tuple)) and return i instead"
          }
          filename="try_3_search.py"
        />
      </NoteCard>
    </div>
  );
}
