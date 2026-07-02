import { NoteCard, Term, Tldr } from "./note-ui";

export function IntroductionNotes() {
  return (
    <div className="space-y-4">
      <Tldr>
        A <strong>data structure</strong> is how you STORE stuff. An{" "}
        <strong>algorithm</strong> is the STEPS to DO stuff with it. That&apos;s
        the whole course in one line.
      </Tldr>

      <NoteCard title="what is a data structure?">
        <p>
          A way of organizing data inside the computer so you can find it and
          change it <em>fast</em>.
        </p>
        <p className="text-muted-foreground">
          Think of your school bag: if you dump everything in loose, finding a
          pencil takes forever. If you use a pencil case, it takes one second.
          Same stuff, different <em>structure</em>. Arrays, stacks, queues and
          trees are just different &quot;pencil cases&quot; for data.
        </p>
      </NoteCard>

      <NoteCard title="what is an algorithm?">
        <p>
          A list of steps that solves a problem. Something goes in (input), the
          steps run, an answer comes out (output).
        </p>
        <p className="text-muted-foreground">
          Exactly like a recipe: ingredients in → follow the steps → cake out.
          The same problem can have many recipes — some fast, some painfully
          slow. This course is about picking the fast ones.
        </p>
      </NoteCard>

      <NoteCard title="linear data structures (things in a line)">
        <p className="text-muted-foreground">
          One item after another, single file. You&apos;ll meet these four:
        </p>
        <Term name="array">
          a row of numbered boxes sitting side by side. You grab any box
          instantly by its number.
        </Term>
        <Term name="stack">
          a pile of plates — you can only add or remove from the TOP. Last in,
          first out.
        </Term>
        <Term name="queue">
          a canteen line — join at the back, leave from the front. First in,
          first out.
        </Term>
        <Term name="linked list">
          a treasure hunt — each item holds a clue (pointer) to where the next
          one lives.
        </Term>
      </NoteCard>

      <NoteCard title="non-linear data structures (things that branch)">
        <p className="text-muted-foreground">
          One item can connect to many others — no single line.
        </p>
        <Term name="tree">
          like a family tree or the folders on your computer — one root, many
          branches.
        </Term>
        <Term name="graph">
          like a friendship network or a city map — anything can connect to
          anything.
        </Term>
        <p className="text-muted-foreground">
          Quiz trap: array, stack and queue are linear. A <strong>tree</strong>{" "}
          is NOT.
        </p>
      </NoteCard>

      <NoteCard title="kinds of algorithms (the family photo)">
        <Term name="simple recursive">
          a function that calls itself with a smaller problem until it hits a
          stopping point.
        </Term>
        <Term name="divide & conquer">
          chop the problem in half, solve each half, glue the answers together.
        </Term>
        <Term name="dynamic programming">
          remember answers you already worked out so you never solve the same
          thing twice.
        </Term>
        <Term name="greedy">
          at every step, grab whatever looks best RIGHT NOW and hope it works
          out overall.
        </Term>
        <Term name="brute force">
          try literally every possibility. Always works, usually slow.
        </Term>
        <Term name="randomized">
          uses a random number somewhere in its steps.
        </Term>
      </NoteCard>

      <NoteCard title="why bother learning this?">
        <p>
          The same task can take a program 1 second or 1 hour — the only
          difference is which data structure + algorithm you picked.
        </p>
        <p className="text-muted-foreground">
          Games, YouTube, Google Maps — all of them feel fast because someone
          chose the right structures. Also: pretty much every coding interview
          on Earth asks this stuff.
        </p>
      </NoteCard>
    </div>
  );
}
