import { CodeBlock } from "@/components/code-block";
import {
  ArrayAccessDemo,
  InsertShiftDemo,
  LinearSearchDemo,
} from "@/components/demos";
import { NoteCard, Term, Tldr } from "./note-ui";

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
