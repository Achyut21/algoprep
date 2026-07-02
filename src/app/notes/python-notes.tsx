import { CodeBlock } from "@/components/code-block";
import { ForLoopDemo, FunctionMachineDemo } from "@/components/demos";
import { NoteCard, Term, Tldr } from "./note-ui";

export function PythonNotes() {
  return (
    <div className="space-y-4">
      <Tldr>
        Python reads almost like English, and the SPACES at the start of a
        line are part of the grammar. This page explains every keyword you
        will meet in the code snippets — come back here whenever a snippet
        looks confusing.
      </Tldr>

      <NoteCard title="variables — giving data a name">
        <p>
          A variable is a labeled box. <span className="font-mono">=</span>{" "}
          puts something in it. Use the name later to get it back.
        </p>
        <CodeBlock
          code={
            "score = 5          # a number\nname = 'Ana'       # text (called a string, in quotes)\nscore = score + 1  # boxes can be refilled\nprint(score)       # 6"
          }
          filename="variables.py"
        />
      </NoteCard>

      <NoteCard title="print() — making the computer talk">
        <p>
          <span className="font-mono">print(...)</span> shows whatever is
          inside the parentheses. It&apos;s how every snippet proves what
          happened.
        </p>
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
          The arrays doc goes deep on these — this is just the syntax.
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
        <p className="text-muted-foreground">
          Classic trap: one <span className="font-mono">=</span> puts a value
          in a box, two <span className="font-mono">==</span> asks a question.
        </p>
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
            "def double(n):\n    return n * 2\n\nresult = double(5)   # result is now 10\nprint(double(100))   # 200"
          }
          filename="functions.py"
        />
        <p className="text-muted-foreground">
          return vs print: <span className="font-mono">return</span> hands the
          value back so code can use it;{" "}
          <span className="font-mono">print</span> only shows it on screen.
        </p>
      </NoteCard>

      <NoteCard title="indentation — the invisible grammar">
        <p>
          The spaces at the start of a line tell Python what belongs to what.
          Everything indented under a{" "}
          <span className="font-mono">for</span>,{" "}
          <span className="font-mono">if</span> or{" "}
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
        <p>
          Python comes with extra toolboxes. <span className="font-mono">
            import
          </span>{" "}
          opens one so you can use its tools.
        </p>
        <CodeBlock
          code={
            "from array import *   # open the array toolbox\nimport numpy as np    # open numpy, call it 'np' for short"
          }
          filename="imports.py"
        />
        <p className="text-muted-foreground">
          That&apos;s why 2D-array snippets say{" "}
          <span className="font-mono">np.delete(...)</span> — the tool lives
          in the numpy toolbox.
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
    </div>
  );
}
