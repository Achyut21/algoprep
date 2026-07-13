import { CodeBlock } from "@/components/code-block";
import { ForLoopDemo, FunctionMachineDemo } from "@/components/demos";
import { NoteCard, Term, Tldr } from "./note-ui";

export function PythonNotes() {
  return (
    <div className="space-y-4">
      <Tldr>
        Python reads almost like English, and the SPACES at the start of a
        line are part of the grammar. This page explains every keyword,
        operator and symbol you will meet in the code snippets — come back
        here whenever something looks confusing.
      </Tldr>

      <NoteCard title="the data types you'll meet">
        <Term name="int">whole numbers: 5, -3, 1000</Term>
        <Term name="float">decimal numbers: 3.5, 2.0 (the dot makes it a float)</Term>
        <Term name="str">
          text in quotes: &apos;hello&apos; or &quot;hello&quot; — both work
        </Term>
        <Term name="bool">exactly two values: True and False (capital letters!)</Term>
        <Term name="None">the &quot;nothing&quot; value — more on it below</Term>
        <CodeBlock
          code={
            "print(7 / 2)     # 3.5  — division always gives a float\nprint(type(7))   # <class 'int'>\nprint(type(7.0)) # <class 'float'>\nprint(1 == 1.0)  # True — equal VALUES, different types"
          }
          filename="types.py"
        />
        <p className="text-muted-foreground">
          That last line explains the dictionary quiz trap: 1 and 1.0 count as
          the same key because they&apos;re EQUAL, even though their types
          differ.
        </p>
      </NoteCard>

      <NoteCard title="variables — giving data a name">
        <p>
          A variable is a labeled box. <span className="font-mono">=</span>{" "}
          puts something in it. Use the name later to get it back.
        </p>
        <CodeBlock
          code={
            "score = 5          # a number\nname = 'Ana'       # a string\nscore = score + 1  # boxes can be refilled\nprint(score)       # 6\n\nx, y = 3, 7        # TWO boxes filled in one line!\nprint(x, y)        # 3 7"
          }
          filename="variables.py"
        />
        <p className="text-muted-foreground">
          One <span className="font-mono">=</span> STORES. Two{" "}
          <span className="font-mono">==</span> ASKS &quot;are these
          equal?&quot;. Mixing them up is the classic beginner bug.
        </p>
      </NoteCard>

      <NoteCard title="print() — making the computer talk">
        <CodeBlock
          code={
            "print('hello')     # hello\nprint(2 + 3)       # 5\nprint('x is', 42)  # x is 42  (commas print with spaces)"
          }
          filename="printing.py"
        />
      </NoteCard>

      <NoteCard title="# comments — notes the computer ignores">
        <p>
          Everything after a <span className="font-mono">#</span> is for
          humans only. Our snippets use comments to show the expected output —
          the computer skips them completely.
        </p>
      </NoteCard>

      <NoteCard title="math operators (yes, all of them)">
        <Term name="+  -  *">add, subtract, multiply — as expected</Term>
        <Term name="/">divide — ALWAYS gives a float: 6 / 2 is 3.0</Term>
        <Term name="//">floor division — divide and chop off the decimals: 7 // 2 is 3</Term>
        <Term name="%">
          modulo — the REMAINDER after dividing: 7 % 2 is 1. The famous trick:{" "}
          <span className="font-mono">x % 2 == 0</span> means &quot;x is
          even&quot; (dividing by 2 leaves no remainder).
        </Term>
        <Term name="**">power: 2 ** 3 is 8</Term>
        <Term name="+=">
          shorthand for &quot;add and store back&quot;: count += 1 is exactly
          count = count + 1. (-=, *= exist too.)
        </Term>
        <CodeBlock
          code={
            "print(10 % 3)   # 1   (10 ÷ 3 = 3, remainder 1)\nprint(8 % 2)    # 0   (8 is even — no remainder!)\nprint(9 % 2)    # 1   (9 is odd)\n\ntotal = 5\ntotal += 3      # same as total = total + 3\nprint(total)    # 8"
          }
          filename="operators.py"
        />
        <p className="text-muted-foreground">
          The quizzes love <span className="font-mono">% 2 == 0</span> — now
          you know it just asks &quot;is the remainder zero?&quot;.
        </p>
      </NoteCard>

      <NoteCard title="strings in 60 seconds">
        <p>
          Text behaves a LOT like a tuple of characters: index it, measure it,
          loop it — but never change it in place.
        </p>
        <CodeBlock
          code={
            "word = 'python'\n\nprint(word[0])        # p   (strings index like lists!)\nprint(len(word))      # 6\nprint(word.upper())   # PYTHON\nprint('py' + 'thon')  # python  (+ glues strings)\nprint('ha' * 3)       # hahaha  (* repeats them)\n\nsentence = 'data structures rock'\nprint(sentence.split())  # ['data', 'structures', 'rock']"
          }
          filename="strings.py"
        />
        <p className="text-muted-foreground">
          This is why <span className="font-mono">(&apos;Python&apos;) * 3</span>{" "}
          in the tuple quiz gives &apos;PythonPythonPython&apos; — without a
          comma it&apos;s just a string, and * repeats strings.
        </p>
      </NoteCard>

      <NoteCard title="lists — many values in one variable">
        <p>
          Square brackets make a list. Positions start at{" "}
          <span className="font-mono">0</span>.
        </p>
        <CodeBlock
          code={
            "numbers = [10, 20, 30]\n\nprint(numbers[0])    # 10  (first!)\nprint(numbers[2])    # 30  (third)\nprint(len(numbers))  # 3   (how many)"
          }
          filename="lists.py"
        />
        <p className="text-muted-foreground">
          The lists doc goes deep on these — this is just the syntax.
        </p>
      </NoteCard>

      <NoteCard title="for loops — repeat for each item">
        <p>
          &quot;For each item in this list, run the indented lines below.&quot;
          Watch it happen:
        </p>
        <ForLoopDemo />
        <p>
          The other loop shape uses <span className="font-mono">range()</span>,
          which makes a sequence of numbers to loop over:
        </p>
        <CodeBlock
          code={
            "for i in range(5):        # i = 0, 1, 2, 3, 4  (stops BEFORE 5)\n    print(i)\n\nfor i in range(1, 4):     # i = 1, 2, 3  (start, stop)\n    print(i)\n\nfor i in range(0, 10, 2): # i = 0, 2, 4, 6, 8  (start, stop, STEP)\n    print(i)"
          }
          filename="ranges.py"
        />
        <p className="text-muted-foreground">
          Snippet-spotting: <span className="font-mono">range(len(arr))</span>{" "}
          just means &quot;every index of the list&quot;.
        </p>
      </NoteCard>

      <NoteCard title="while loops & break — repeat until told to stop">
        <p>
          <span className="font-mono">for</span> repeats a known number of
          times; <span className="font-mono">while</span> repeats as long as a
          condition stays True. <span className="font-mono">break</span> jumps
          out immediately. Your course uses this exact pattern:
        </p>
        <CodeBlock
          code={
            "count = 0\nwhile count < 3:\n    print(count)   # 0, 1, 2\n    count += 1\n\n# the course's 'keep asking until done' pattern:\nwhile True:            # loops forever…\n    inp = input('Enter a number: ')\n    if inp == 'done':\n        break          # …until this escape hatch fires\n    print('you typed', inp)"
          }
          filename="while_break.py"
        />
        <p className="text-muted-foreground">
          <span className="font-mono">input()</span> pauses and waits for the
          user to type something — it always hands back a STRING.
        </p>
      </NoteCard>

      <NoteCard title="if / elif / else — making decisions">
        <CodeBlock
          code={
            "age = 12\n\nif age >= 13:\n    print('teenager')\nelif age >= 10:\n    print('almost!')   # this one runs\nelse:\n    print('kid')"
          }
          filename="decisions.py"
        />
        <Term name="==">equals? (asking, not assigning!)</Term>
        <Term name="!=">not equal?</Term>
        <Term name="> and <">bigger than / smaller than</Term>
        <Term name=">= and <=">bigger-or-equal / smaller-or-equal</Term>
        <Term name="in">
          is this inside that? — &apos;a&apos; in myList gives True/False
        </Term>
      </NoteCard>

      <NoteCard title="and / or / not — combining conditions">
        <Term name="and">True only if BOTH sides are True</Term>
        <Term name="or">True if AT LEAST ONE side is True</Term>
        <Term name="not">flips it: not True is False</Term>
        <CodeBlock
          code={
            "age = 12\nheight = 150\n\nif age >= 10 and height >= 140:\n    print('you may ride')      # both true → runs\n\nif age < 5 or age > 80:\n    print('free ticket')       # neither true → skipped\n\nprint(not (age == 12))         # False"
          }
          filename="logic.py"
        />
      </NoteCard>

      <NoteCard title="functions — machines you build once, use forever">
        <p>
          <span className="font-mono">def</span> builds the machine.
          Parameters go in, <span className="font-mono">return</span> hands the
          answer back:
        </p>
        <FunctionMachineDemo />
        <CodeBlock
          code={
            "def double(n):\n    return n * 2\n\nresult = double(5)   # result is now 10\nprint(double(100))   # 200\n\ndef greet(name, excited):   # multiple parameters\n    if excited:\n        return 'HI ' + name.upper() + '!'\n    return 'hi ' + name\n\nprint(greet('Ana', True))   # HI ANA!"
          }
          filename="functions.py"
        />
        <p className="text-muted-foreground">
          return vs print: <span className="font-mono">return</span> hands the
          value back so code can use it;{" "}
          <span className="font-mono">print</span> only shows it on screen.
        </p>
      </NoteCard>

      <NoteCard title="None — the nothing value">
        <p>
          <span className="font-mono">None</span> means &quot;no value
          here&quot;. You&apos;ll meet it in two places:
        </p>
        <CodeBlock
          code={
            "def shout(word):\n    print(word + '!')   # prints, but returns nothing\n\nresult = shout('hey')   # hey!\nprint(result)           # None — no return means None\n\nages = {'ana': 11}\nprint(ages.get('bob'))  # None — missing key, no crash"
          }
          filename="none.py"
        />
        <p className="text-muted-foreground">
          A function without a <span className="font-mono">return</span>{" "}
          quietly returns None, and dict.get() returns None for missing keys.
          None is not 0, not empty text, not False — it&apos;s its own thing.
        </p>
      </NoteCard>

      <NoteCard title="indentation — the invisible grammar">
        <p>
          The spaces at the start of a line tell Python what belongs to what.
          Everything indented under a{" "}
          <span className="font-mono">for</span>,{" "}
          <span className="font-mono">if</span>,{" "}
          <span className="font-mono">while</span> or{" "}
          <span className="font-mono">def</span> is INSIDE it.
        </p>
        <CodeBlock
          code={
            "for i in range(3):\n    print('inside the loop')   # runs 3 times\nprint('after the loop')        # runs once — not indented!"
          }
          filename="indentation.py"
        />
        <p className="text-muted-foreground">
          If Python complains about an &quot;IndentationError&quot;, your
          spaces don&apos;t line up. Use 4 spaces per level, consistently.
        </p>
      </NoteCard>

      <NoteCard title="the dot — doing something TO a thing">
        <p>
          <span className="font-mono">thing.action(...)</span> means &quot;hey
          thing, do this action&quot;. You&apos;ll see it constantly:
        </p>
        <CodeBlock
          code={
            "my_array.append(4)   # hey my_array, add a 4 to yourself\nmy_array.remove(2)   # hey my_array, delete the value 2\nnp.array([1, 2, 3])  # hey numpy, build me an array"
          }
          filename="dots.py"
        />
      </NoteCard>

      <NoteCard title="import — borrowing someone else's tools">
        <CodeBlock
          code={
            "from array import *   # open the array toolbox\nimport numpy as np    # open numpy, call it 'np' for short"
          }
          filename="imports.py"
        />
        <Term name="import x">open toolbox x; use it as x.tool()</Term>
        <Term name="import x as y">same, but nickname it y</Term>
        <Term name="from x import *">
          dump all of x&apos;s tools straight in — no prefix needed
        </Term>
      </NoteCard>

      <NoteCard title="type() and id() — asking Python about a thing">
        <Term name="type(x)">what KIND of thing is x?</Term>
        <Term name="id(x)">
          x&apos;s address in memory — two names for the SAME object share one
          id
        </Term>
        <CodeBlock
          code={
            "print(type('hi'))    # <class 'str'>\nprint(type([1, 2]))  # <class 'list'>\n\na = [1, 2]\nb = a          # same list, two names\nc = a[:]       # a real copy\nprint(id(a) == id(b))  # True  — same object!\nprint(id(a) == id(c))  # False — different object"
          }
          filename="type_id.py"
        />
        <p className="text-muted-foreground">
          This is exactly how the dictionary quiz checks whether copy() made a
          real copy — different id means a different object.
        </p>
      </NoteCard>

      <NoteCard title="the underscore _ and unpacking">
        <p>
          <span className="font-mono">x, y = (3, 7)</span> splits a pair into
          two names. When you don&apos;t care about one part, the convention
          is to name it <span className="font-mono">_</span> (&quot;throwaway&quot;):
        </p>
        <CodeBlock
          code={
            "point = (3, 7)\nx, y = point               # x=3, y=7\n\npairs = [(0, 1), (1, 2), (2, 3)]\nresult = sum(n for _, n in pairs)\nprint(result)              # 6 — keep n, toss the _"
          }
          filename="underscore.py"
        />
        <p className="text-muted-foreground">
          That <span className="font-mono">sum(n for _, n in pairs)</span> is
          a &quot;generator expression&quot; — a comprehension without the
          square brackets, fed straight into sum(). Same reading order:
          unpack each pair, keep n.
        </p>
      </NoteCard>

      <NoteCard title="recursion — a function calling itself">
        <p>
          A function is allowed to call itself with a smaller problem. It needs
          a STOP condition (the &quot;base case&quot;) or it would run forever.
        </p>
        <CodeBlock
          code={
            "def countdown(n):\n    if n <= 0:            # base case: STOP here\n        print('liftoff!')\n        return\n    print(n)\n    countdown(n - 1)      # calls itself, one smaller\n\ncountdown(3)   # 3, 2, 1, liftoff!"
          }
          filename="recursion.py"
        />
        <p className="text-muted-foreground">
          The Big O doc leans on this pattern a lot — every{" "}
          <span className="font-mono">f(n-1)</span> you see is exactly this.
        </p>
      </NoteCard>

      <NoteCard title="keyword glossary — every word Python reserves">
        <Term name="def / return">build a function / hand back its answer</Term>
        <Term name="if / elif / else">decide between paths</Term>
        <Term name="for / in">loop over each item of something</Term>
        <Term name="while / break">loop until a condition fails / escape now</Term>
        <Term name="and / or / not">combine or flip True/False questions</Term>
        <Term name="True / False">the two boolean values</Term>
        <Term name="None">the nothing value</Term>
        <Term name="import / from / as">borrow toolboxes (and nickname them)</Term>
        <Term name="del">delete a variable, list slot or dict pair</Term>
        <p className="text-muted-foreground">
          If a snippet uses a word not on this page, it&apos;s not a keyword —
          it&apos;s a variable someone named, a function like len(), or a
          method after a dot.
        </p>
      </NoteCard>
    </div>
  );
}
