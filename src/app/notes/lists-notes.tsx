import { CodeBlock } from "@/components/code-block";
import { AmortizedDemo, ReferenceCopyDemo } from "@/components/demos";
import { NoteCard, PythonHint, Term, Tldr } from "./note-ui";

export function ListsNotes() {
  return (
    <div className="space-y-4">
      <Tldr>
        A list is the array&apos;s flexible cousin: ordered, changeable, and
        happy to mix types. Indexes start at <strong>0</strong>, negative
        indexes count from the <strong>end</strong>, and{" "}
        <span className="font-mono">b = a</span> does NOT make a copy!
      </Tldr>

      <NoteCard title="creating & peeking">
        <CodeBlock
          code={
            "shoppingList = ['Milk', 'Cheese', 'Butter']\nmixed = [1, 'two', 3.0]     # lists can mix types!\n\nprint(shoppingList[0])   # Milk\nprint(shoppingList[-1])  # Butter  (-1 = last)\nprint(len(shoppingList)) # 3"
          }
          filename="create.py"
        />
        <PythonHint />
      </NoteCard>

      <NoteCard title="slices — grab a chunk">
        <p>
          <span className="font-mono">myList[start:stop]</span> takes from{" "}
          <span className="font-mono">start</span> up to but{" "}
          <strong>NOT including</strong> <span className="font-mono">stop</span>.
        </p>
        <CodeBlock
          code={
            "myList = [10, 20, 30, 40, 50]\n\nprint(myList[1:4])  # [20, 30, 40]  (stop is left out!)\nprint(myList[:2])   # [10, 20]      (from the start)\nprint(myList[2:])   # [30, 40, 50]  (to the end)\nprint(myList[:])    # the WHOLE list — as a new copy"
          }
          filename="slices.py"
        />
        <p className="text-muted-foreground">
          Quiz trap: the stop index never makes it into the slice.
        </p>
      </NoteCard>

      <NoteCard title="growing a list">
        <Term name="append(x)">add ONE item at the end — even a whole list counts as one item!</Term>
        <Term name="insert(i, x)">put x AT index i, everything after shifts right.</Term>
        <Term name="extend(other)">add EACH item of another list to the end.</Term>
        <CodeBlock
          code={
            "myList = [1, 2, 3, 4, 5, 6, 7]\nmyList.insert(4, 15)     # from the course file!\nprint(myList)            # [1, 2, 3, 4, 15, 5, 6, 7]\n\nmyList.append(55)        # one item at the end\nmyList.extend([11, 12])  # each of these, at the end\n\nnested = [1, 2]\nnested.append([3, 4])    # careful! adds the LIST as one item\nprint(nested)            # [1, 2, [3, 4]] — length 3, not 4"
          }
          filename="growing.py"
        />
      </NoteCard>

      <NoteCard title="shrinking a list">
        <Term name="pop(i)">remove by POSITION (no i = last item) and hand it back.</Term>
        <Term name="remove(x)">delete the first item whose VALUE is x.</Term>
        <Term name="del myList[i]">delete by index; del myList[1:3] deletes a slice.</Term>
        <CodeBlock
          code={
            "letters = ['a', 'b', 'c', 'd']\n\nletters.pop()        # removes 'd' (the last)\nletters.pop(0)       # removes 'a' (index 0)\nletters.remove('c')  # removes the VALUE 'c'\nprint(letters)       # ['b']"
          }
          filename="shrinking.py"
        />
      </NoteCard>

      <NoteCard title="THE pitfall — b = a is not a copy">
        <p>
          Two names, one list. This bug bites everyone once — watch it happen:
        </p>
        <ReferenceCopyDemo />
        <CodeBlock
          code={
            "a = [1, 2, 3]\nb = a        # same list, second name tag\nb.append(4)\nprint(a)     # [1, 2, 3, 4]  — a changed too!\n\nc = a[:]     # slice-copy: a REAL new list\nc.append(99)\nprint(a)     # [1, 2, 3, 4]  — safe this time"
          }
          filename="copy_trap.py"
        />
      </NoteCard>

      <NoteCard title="lists ↔ strings">
        <CodeBlock
          code={
            "sentence = 'data structures rock'\nwords = sentence.split()   # chop at spaces\nprint(words)               # ['data', 'structures', 'rock']\n\nletters = list('abc')      # string → list of characters\nprint(letters)             # ['a', 'b', 'c']"
          }
          filename="strings.py"
        />
      </NoteCard>

      <NoteCard title="lists vs arrays (the showdown)">
        <p>
          <span className="font-mono text-primary">list ✓</span> mixed types,
          grows freely, tons of built-in methods — the everyday choice.
        </p>
        <p>
          <span className="font-mono text-cyan">array ✓</span> one numeric
          type, packed tight in memory — faster and smaller for pure number
          crunching.
        </p>
      </NoteCard>

      <NoteCard title="how fast is a list?">
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-2 text-left font-medium">operation</th>
                <th className="py-2 text-left font-medium">cost</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b">
                <td className="py-2">myList[i]</td>
                <td className="py-2 text-primary">O(1)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">append at the end</td>
                <td className="py-2 text-primary">O(1)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">value in myList (search)</td>
                <td className="py-2 text-amber">O(n)</td>
              </tr>
              <tr>
                <td className="py-2">insert / delete in the middle</td>
                <td className="py-2 text-amber">O(n)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground">
          Same story as arrays: instant by position, linear when things must
          shift or be searched.
        </p>
      </NoteCard>

      <NoteCard title="bonus: WHY append is O(1) — the amortized trick">
        <p>
          Here&apos;s a secret: the list keeps some EMPTY slots in reserve.
          Most appends just drop into a waiting slot — instant. But when the
          slots run out, Python copies everything into a home twice the size:
        </p>
        <AmortizedDemo />
        <p className="text-muted-foreground">
          That copy is expensive — O(n) — but RARE, and doubling pushes the
          next one twice as far away. Spread the rare cost across all the
          cheap appends and each one averages out to O(1). That averaged cost
          has a name:{" "}
          <span className="font-mono text-primary">amortized O(1)</span> —
          like four friends splitting one pizza bill.
        </p>
        <p className="text-muted-foreground">
          The thinking trick matters more than the word: judge the WHOLE
          sequence of operations, not the scariest single step. You&apos;ll
          meet this idea again and again in computer science.
        </p>
      </NoteCard>

      <NoteCard title="list comprehensions — a loop in one line">
        <CodeBlock
          code={
            "doubled = [x * 2 for x in [1, 2, 3]]\nprint(doubled)   # [2, 4, 6]\n\n# with a condition: keep only what passes the if\nevens = [x for x in range(10) if x % 2 == 0]\nprint(evens)     # [0, 2, 4, 6, 8]"
          }
          filename="comprehensions.py"
        />
        <p className="text-muted-foreground">
          Read it like English: &quot;x times 2, for every x in the list&quot;.
          The if filters first, the front part transforms.
        </p>
      </NoteCard>

      <Tldr>
        Practice time — copy these into your editor, predict the output BEFORE
        running, then check yourself.
      </Tldr>

      <NoteCard title="try it 1 — the average machine">
        <p>Straight from your course, minus the typing:</p>
        <CodeBlock
          code={
            "numlist = [4.0, 8.0, 6.0, 2.0]\n\naverage = sum(numlist) / len(numlist)\nprint('Average:', average)   # Average: 5.0\n\n# challenge: use max() and min() to print the\n# biggest and smallest number too"
          }
          filename="try_1_average.py"
        />
      </NoteCard>

      <NoteCard title="try it 2 — search, but say it nicely">
        <p>The course&apos;s search function, cleaned up:</p>
        <CodeBlock
          code={
            "def search_in_list(myList, value):\n    for i in range(len(myList)):  # walk every index\n        if myList[i] == value:\n            return i              # found — say WHERE\n    return 'the value does not exist in the list'\n\nnums = [10, 20, 30, 40, 50]\nprint(search_in_list(nums, 30))   # 2\nprint(search_in_list(nums, 100))  # the value does not exist…"
          }
          filename="try_2_search.py"
        />
        <p className="text-muted-foreground">
          One loop over n items → O(n), exactly like array search.
        </p>
      </NoteCard>

      <NoteCard title="try it 3 — comprehension playground">
        <CodeBlock
          code={
            "names = ['ana', 'rohan', 'em']\n\nshouty = [n.upper() for n in names]\nprint(shouty)            # ['ANA', 'ROHAN', 'EM']\n\nlongish = [n for n in names if len(n) > 2]\nprint(longish)           # ['ana', 'rohan']\n\n# challenge: one comprehension that returns the\n# LENGTH of each name, but only for names longer than 2"
          }
          filename="try_3_comprehend.py"
        />
      </NoteCard>
    </div>
  );
}
