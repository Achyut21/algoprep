import { CodeBlock } from "@/components/code-block";
import { KeyLookupDemo } from "@/components/demos";
import { ComplexityTable, NoteCard, PythonHint, Term, Tldr } from "./note-ui";

export function DictionariesNotes() {
  return (
    <div className="space-y-4">
      <Tldr>
        A dictionary stores <strong>key : value</strong> pairs. You grab
        values by NAME, not by position — and that lookup is O(1). Keys are
        unique, case-sensitive, and must be unchangeable.
      </Tldr>

      <NoteCard title="creating & looking up">
        <p>
          Curly braces, pairs separated by commas. Ask for a key, get its
          value — instantly:
        </p>
        <KeyLookupDemo />
        <CodeBlock
          code={
            "myDict = {'name': 'Edy', 'age': 26}\n\nprint(myDict['name'])   # Edy\nprint(myDict['age'])    # 26\nprint(len(myDict))      # 2  (counts PAIRS)"
          }
          filename="create.py"
        />
        <PythonHint />
      </NoteCard>

      <NoteCard title="adding & updating — same move">
        <p>
          Assign to a key: if it&apos;s new, the pair is ADDED; if it exists,
          the value is UPDATED.
        </p>
        <CodeBlock
          code={
            "myDict = {'name': 'Edy', 'age': 26}\n\nmyDict['address'] = 'London'  # new key → pair added\nmyDict['age'] = 27            # existing key → updated\nprint(myDict)\n# {'name': 'Edy', 'age': 27, 'address': 'London'}"
          }
          filename="add_update.py"
        />
      </NoteCard>

      <NoteCard title="looping through a dictionary">
        <p>
          A plain for loop gives you the KEYS. Use the key to fetch each
          value, or unpack pairs with items():
        </p>
        <CodeBlock
          code={
            "myDict = {'name': 'Edy', 'age': 26}\n\nfor key in myDict:            # the course's traverseDict\n    print(key, myDict[key])   # name Edy / age 26\n\nfor k, v in myDict.items():   # pairs, unpacked\n    print(k, '→', v)"
          }
          filename="traverse.py"
        />
      </NoteCard>

      <NoteCard title="`in` checks KEYS (classic trap)">
        <CodeBlock
          code={
            "myDict = {'name': 'Edy', 'age': 26}\n\nprint('name' in myDict)  # True   (it's a key)\nprint('Edy' in myDict)   # False  (it's a VALUE!)"
          }
          filename="in_trap.py"
        />
        <p className="text-muted-foreground">
          To search by value you must walk every pair — that&apos;s the
          course&apos;s searchDict function, and it&apos;s O(n).
        </p>
      </NoteCard>

      <NoteCard title="removing pairs">
        <Term name="pop('key')">
          removes that pair and hands back its value.
        </Term>
        <Term name="del myDict['key']">removes the pair, returns nothing.</Term>
        <Term name="clear()">empties the whole dictionary.</Term>
        <CodeBlock
          code={
            "myDict = {'name': 'Edy', 'age': 26}\nmyDict.pop('name')\nprint(myDict)   # {'age': 26}"
          }
          filename="remove.py"
        />
      </NoteCard>

      <NoteCard title="method cheat sheet">
        <Term name="get('key')">
          SAFE lookup — returns None instead of crashing when the key is
          missing. get(&apos;key&apos;, 0) returns 0 as the fallback.
        </Term>
        <Term name="keys() / values()">just the keys / just the values.</Term>
        <Term name="items()">(key, value) pairs, ready to unpack.</Term>
        <Term name="update(other)">merge another dictionary in.</Term>
        <Term name="copy()">
          a real, independent copy — same lesson as list[:]!
        </Term>
        <p className="text-muted-foreground">
          Quiz trap: myDict[&apos;missing&apos;] crashes with KeyError;
          myDict.get(&apos;missing&apos;) calmly returns None.
        </p>
      </NoteCard>

      <NoteCard title="key rules (where the sneaky questions live)">
        <p>
          Keys must be <strong>unchangeable</strong>: strings, numbers and
          tuples work; lists do NOT.
        </p>
        <CodeBlock
          code={
            "d = {}\nd[(1, 2)] = 'tuple keys work!'\nd['Apple'] = 1\nd['apple'] = 2   # DIFFERENT key — case matters\nd[1] = 'one'\nd[1.0] = 'float' # SAME key as 1 — equal numbers collide!\nprint(d[1])      # float"
          }
          filename="key_rules.py"
        />
        <p className="text-muted-foreground">
          Both surprises come straight from the course quiz: &apos;Apple&apos;
          ≠ &apos;apple&apos;, but 1 == 1.0 so they share one slot.
        </p>
      </NoteCard>

      <NoteCard title="dictionary vs list (the showdown)">
        <p>
          <span className="font-mono text-primary">dict ✓</span> when you look
          things up by a NAME: a phone book, settings, counting words.
        </p>
        <p>
          <span className="font-mono text-cyan">list ✓</span> when ORDER and
          position matter: a queue of steps, a leaderboard, anything numbered.
        </p>
      </NoteCard>

      <NoteCard title="every dictionary operation, measured">
        <ComplexityTable
          rows={[
            { op: "create an empty dictionary", time: "O(1)", space: "O(1)" },
            {
              op: "create with n pairs",
              time: "O(n)",
              space: "O(n)",
            },
            {
              op: "lookup myDict[key] / get(key)",
              time: "O(1) avg",
              space: "O(1)",
              note: "the key IS the address",
            },
            { op: "add / update by key", time: "O(1) avg", space: "O(1)" },
            { op: "'key' in myDict", time: "O(1) avg", space: "O(1)" },
            {
              op: "delete by key (pop / del)",
              time: "O(1) avg",
              space: "O(1)",
            },
            {
              op: "search by VALUE",
              time: "O(n)",
              space: "O(1)",
              note: "no shortcut — walk every pair",
            },
            {
              op: "traverse (keys / values / items)",
              time: "O(n)",
              space: "O(1)",
            },
            {
              op: "copy()",
              time: "O(n)",
              space: "O(n)",
              note: "a full new dictionary",
            },
          ]}
        />
        <p className="text-muted-foreground">
          &quot;avg&quot; because in freak cases key lookups can degrade — but
          in practice, treat by-key operations as O(1). Storing n pairs costs
          O(n) memory overall.
        </p>
      </NoteCard>

      <NoteCard title="dictionary comprehensions">
        <CodeBlock
          code={
            "squares = {x: x * x for x in range(4)}\nprint(squares)   # {0: 0, 1: 1, 2: 4, 3: 9}\n\n# with a condition, just like lists:\neven_squares = {x: x * x for x in range(6) if x % 2 == 0}\nprint(even_squares)  # {0: 0, 2: 4, 4: 16}"
          }
          filename="comprehensions.py"
        />
      </NoteCard>

      <Tldr>
        Practice time — predict each output BEFORE running, then check
        yourself in your editor.
      </Tldr>

      <NoteCard title="try it 1 — build a profile">
        <CodeBlock
          code={
            "profile = {'name': 'Edy', 'age': 26}\n\nprofile['address'] = 'London'   # add\nprofile['age'] = 27             # update\nprofile.pop('name')             # remove\n\nprint(profile)          # {'age': 27, 'address': 'London'}\nprint(profile.get('name'))  # None — safe, no crash!\n\n# challenge: print every pair as  key → value"
          }
          filename="try_1_profile.py"
        />
      </NoteCard>

      <NoteCard title="try it 2 — the word counter">
        <p>
          The pattern from your course&apos;s interview question — count
          anything with a dictionary:
        </p>
        <CodeBlock
          code={
            "words = ['apple', 'banana', 'apple', 'cherry', 'apple']\n\ncounts = {}\nfor w in words:\n    if w in counts:\n        counts[w] += 1   # seen before → add one\n    else:\n        counts[w] = 1    # first time → start at 1\n\nprint(counts)  # {'apple': 3, 'banana': 1, 'cherry': 1}\n\n# challenge: rewrite the loop body in ONE line\n# using counts.get(w, 0)"
          }
          filename="try_2_counter.py"
        />
      </NoteCard>

      <NoteCard title="try it 3 — search by value">
        <p>The course&apos;s searchDict, cleaned up:</p>
        <CodeBlock
          code={
            "def search_dict(d, value):\n    for key in d:               # every key…\n        if d[key] == value:      # …check its value\n            return key\n    return 'the value does not exist'\n\nages = {'ana': 11, 'rohan': 13, 'em': 12}\nprint(search_dict(ages, 13))   # rohan\nprint(search_dict(ages, 99))   # the value does not exist"
          }
          filename="try_3_search.py"
        />
        <p className="text-muted-foreground">
          One pass over n pairs → O(n). Searching by KEY would be O(1) — that
          asymmetry is the whole point of dictionaries.
        </p>
      </NoteCard>
    </div>
  );
}
