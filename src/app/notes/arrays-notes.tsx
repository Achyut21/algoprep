import { CodeBlock } from "@/components/code-block";
import {
  ArrayAccessDemo,
  InsertShiftDemo,
  LinearSearchDemo,
} from "@/components/demos";
import { NoteCard, PythonHint, Term, Tldr } from "./note-ui";

export function ArraysNotes() {
  return (
    <div className="space-y-4">
      <Tldr>
        An array is a row of numbered boxes sitting <strong>side by side</strong>{" "}
        in memory, all holding the same type of thing. Counting starts at{" "}
        <strong>0</strong>, not 1!
      </Tldr>

      <NoteCard title="what is an array (and why access is instant)">
        <p>
          Because the boxes sit right next to each other and are all the same
          size, the computer can <em>calculate</em> exactly where box 5 lives:
          start address + 5 × box size. No searching needed.
        </p>
        <ArrayAccessDemo />
      </NoteCard>

      <NoteCard title="index starts at 0 (classic trap)">
        <p>
          <span className="font-mono">array[0]</span> is the FIRST box.{" "}
          <span className="font-mono">array[3]</span> is the FOURTH box.
        </p>
        <p className="text-muted-foreground">
          So <span className="font-mono">insert(3, 11)</span> puts 11 at index
          3 — three boxes stay in front of it, everything else slides right.
        </p>
      </NoteCard>

      <NoteCard title="the big four operations (1D array)">
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-2 text-left font-medium">operation</th>
                <th className="py-2 text-left font-medium">cost</th>
                <th className="py-2 text-left font-medium">why</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b">
                <td className="py-2">access by index</td>
                <td className="py-2 text-primary">O(1)</td>
                <td className="py-2 text-xs text-muted-foreground">
                  address math, no looking
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2">search by value</td>
                <td className="py-2 text-amber">O(n)</td>
                <td className="py-2 text-xs text-muted-foreground">
                  check box by box
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2">insert</td>
                <td className="py-2 text-amber">O(n)</td>
                <td className="py-2 text-xs text-muted-foreground">
                  boxes shift right to make room
                </td>
              </tr>
              <tr>
                <td className="py-2">delete</td>
                <td className="py-2 text-amber">O(n)</td>
                <td className="py-2 text-xs text-muted-foreground">
                  boxes shift left to close the gap
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground">
          Creating an array with n items also takes O(n) <em>space</em> — every
          item needs its own box.
        </p>
      </NoteCard>

      <NoteCard title="searching = checking box by box">
        <p>
          No ordering, no shortcuts. Worst case the value is in the LAST box
          (or missing) and you checked all n boxes.
        </p>
        <LinearSearchDemo />
      </NoteCard>

      <NoteCard title="inserting = everyone shuffles over">
        <p>
          The side-by-side layout that makes access fast makes inserting slow:
          to open a slot, every box after it must move.
        </p>
        <InsertShiftDemo />
      </NoteCard>

      <Tldr>
        Time to actually CODE. Copy each example below into your editor and
        run it. Then change the numbers and run it again — predicting what
        prints before you hit run is the fastest way to learn.
      </Tldr>

      <NoteCard title="try it 1 — create, peek inside, loop">
        <CodeBlock
          code={
            "from array import *\n\nmy_array = array('i', [10, 20, 30, 40, 50])\n\nprint(my_array[0])    # 10  (index 0 = FIRST box)\nprint(my_array[3])    # 40  (index 3 = fourth box)\nprint(len(my_array))  # 5   (how many boxes)\n\nfor item in my_array:\n    print(item)       # prints all 5, one per line"
          }
          filename="try_1_basics.py"
        />
        <p className="text-muted-foreground">
          The <span className="font-mono">&apos;i&apos;</span> means &quot;this
          array holds integers&quot; — remember, arrays store ONE type only.
        </p>
        <PythonHint />
      </NoteCard>

      <NoteCard title="try it 2 — growing the array">
        <CodeBlock
          code={
            "from array import *\n\nmy_array = array('i', [1, 2, 3])\n\nmy_array.append(4)      # add ONE item at the end\nprint(my_array)         # array('i', [1, 2, 3, 4])\n\nmy_array.insert(0, 99)  # put 99 AT index 0\nprint(my_array)         # array('i', [99, 1, 2, 3, 4])\n\nextra = array('i', [7, 8])\nmy_array.extend(extra)  # add ALL of extra at the end\nprint(my_array)         # array('i', [99, 1, 2, 3, 4, 7, 8])"
          }
          filename="try_2_growing.py"
        />
        <p className="text-muted-foreground">
          Guess-then-run challenge: what would{" "}
          <span className="font-mono">insert(2, 55)</span> print here?
        </p>
      </NoteCard>

      <NoteCard title="try it 3 — shrinking the array">
        <CodeBlock
          code={
            "from array import *\n\nmy_array = array('i', [5, 11, 25, 11, 40])\n\nmy_array.remove(11)  # deletes the FIRST 11 (by VALUE)\nprint(my_array)      # array('i', [5, 25, 11, 40])\n\nmy_array.pop()       # removes the LAST item\nprint(my_array)      # array('i', [5, 25, 11])\n\nmy_array.pop(0)      # removes whatever is at index 0\nprint(my_array)      # array('i', [25, 11])\n\nprint(my_array.index(11))  # 1  (where does 11 live now?)"
          }
          filename="try_3_shrinking.py"
        />
      </NoteCard>

      <NoteCard title="try it 4 — write your own search">
        <p>
          This is the linear search from the table above, written by hand. Read
          it line by line — it&apos;s exactly the &quot;check box by box&quot;
          animation as code:
        </p>
        <CodeBlock
          code={
            "from array import *\n\ndef linear_search(arr, target):\n    for i in range(len(arr)):   # walk every index\n        if arr[i] == target:    # is this box the one?\n            return i            # yes — say WHERE\n    return -1                   # checked everything, not found\n\nnumbers = array('i', [7, 2, 9, 4, 8])\n\nprint(linear_search(numbers, 9))    # 2\nprint(linear_search(numbers, 100))  # -1"
          }
          filename="try_4_search.py"
        />
        <p className="text-muted-foreground">
          Why -1? It&apos;s an impossible index, so it&apos;s a safe way to say
          &quot;not found&quot;.
        </p>
      </NoteCard>

      <NoteCard title="try it 5 — find the biggest number">
        <p>
          A classic from your course. Assume the first item is the biggest,
          then challenge it against every other item:
        </p>
        <CodeBlock
          code={
            "def find_biggest(arr):\n    biggest = arr[0]              # champion so far\n    for i in range(1, len(arr)):  # challengers, one by one\n        if arr[i] > biggest:\n            biggest = arr[i]      # new champion!\n    return biggest\n\nprint(find_biggest([3, 51, 8, 42, 7]))  # 51"
          }
          filename="try_5_biggest.py"
        />
        <p className="text-muted-foreground">
          One loop over n items → O(n) time. Homework: change one symbol to
          make it find the SMALLEST instead.
        </p>
      </NoteCard>

      <NoteCard title="2D arrays (a grid of boxes)">
        <p>
          An array of arrays: rows and columns, like a spreadsheet. You grab a
          cell with <span className="font-mono">array[row][col]</span> — still
          O(1), same address math.
        </p>
        <p className="text-muted-foreground">
          But visiting EVERY cell (a loop in a loop) costs O(rows × cols) —
          usually written O(mn).
        </p>
      </NoteCard>

      <NoteCard title="numpy axis (rows or columns?)">
        <p>
          <span className="font-mono text-amber">axis=0</span> → operate on
          ROWS. <span className="font-mono text-cyan">axis=1</span> → operate
          on COLUMNS.
        </p>
        <CodeBlock
          code={
            "np.delete(twoDArray, 1, axis=0)  # deletes the 2nd ROW\nnp.delete(twoDArray, 1, axis=1)  # deletes the 2nd COLUMN"
          }
          filename="axis.py"
        />
        <p className="text-muted-foreground">
          Memory trick: axis-0 goes ↓ down the rows, axis-1 goes → across the
          columns.
        </p>
      </NoteCard>

      <NoteCard title="try it 6 — build and explore a 2D grid">
        <CodeBlock
          code={
            "import numpy as np\n\ngrid = np.array([[11, 15, 10],\n                 [10, 14, 11],\n                 [12, 17, 12]])\n\nprint(grid[1][2])   # 11  (row 1, column 2)\nprint(len(grid))    # 3   (number of rows)\nprint(len(grid[0])) # 3   (number of columns)\n\n# visit EVERY cell, row by row\nfor i in range(len(grid)):\n    for j in range(len(grid[0])):\n        print(grid[i][j])\n\nbigger  = np.append(grid, [[1, 2, 3]], axis=0)  # add a ROW\nsmaller = np.delete(grid, 0, axis=1)            # drop first COLUMN\nprint(bigger)\nprint(smaller)"
          }
          filename="try_6_grid.py"
        />
        <p className="text-muted-foreground">
          The nested loop visits 3 × 3 = 9 cells — that&apos;s the O(mn)
          traversal from the card above, as real code.
        </p>
      </NoteCard>

      <NoteCard title="try it 7 — search the whole grid">
        <CodeBlock
          code={
            "import numpy as np\n\ngrid = np.array([[11, 15, 10],\n                 [10, 14, 11],\n                 [12, 17, 12]])\n\ndef search_grid(arr, value):\n    for i in range(len(arr)):          # every row\n        for j in range(len(arr[0])):   # every column\n            if arr[i][j] == value:\n                return 'found at row ' + str(i) + ', column ' + str(j)\n    return 'not here'\n\nprint(search_grid(grid, 17))  # found at row 2, column 1\nprint(search_grid(grid, 99))  # not here"
          }
          filename="try_7_grid_search.py"
        />
        <p className="text-muted-foreground">
          Same box-by-box idea as try it 4, just in two directions. Worst case
          it checks all m × n cells.
        </p>
      </NoteCard>

      <NoteCard title="python array methods cheat sheet">
        <Term name="append(x)">add ONE item x to the end.</Term>
        <Term name="insert(i, x)">put x AT index i; the rest shift right.</Term>
        <Term name="extend(arr2)">
          add ALL the items of another array to the end.
        </Term>
        <Term name="remove(x)">
          delete the first box whose VALUE is x (not index!).
        </Term>
        <Term name="pop()">remove the LAST item. pop(i) removes index i.</Term>
        <Term name="index(x)">tells you WHERE the first x lives.</Term>
        <Term name="reverse()">flips the whole array around.</Term>
        <p className="text-muted-foreground">
          Quiz trap: append adds one, extend adds many. remove works by value,
          pop works by position.
        </p>
      </NoteCard>

      <NoteCard title="when to use / when to avoid arrays">
        <p>
          <span className="font-mono text-primary">use ✓</span> when you want
          instant access by position, and things are all the same type.
        </p>
        <p>
          <span className="font-mono text-destructive">avoid ✗</span> when you
          constantly insert/delete in the middle — every change is an O(n)
          shuffle.
        </p>
      </NoteCard>
    </div>
  );
}
