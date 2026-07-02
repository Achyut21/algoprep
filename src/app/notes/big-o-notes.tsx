import { CodeBlock } from "@/components/code-block";
import { GrowthDemo, HalvingDemo } from "@/components/demos";
import { NoteCard, Term, Tldr } from "./note-ui";

export function BigONotes() {
  return (
    <div className="space-y-4">
      <Tldr>
        Big O answers ONE question: when the input gets bigger, how much MORE
        work does your code do? Count <strong>steps</strong>, not seconds.
      </Tldr>

      <NoteCard title="what is big o?">
        <p>
          A label for how the number of steps grows as the input (n) grows. It
          ignores what computer you have — it only cares about the{" "}
          <em>shape</em> of the growth.
        </p>
        <p className="text-muted-foreground">
          If your list doubles in size, does your code do the same work? Twice
          the work? Four times? That answer is its Big O.
        </p>
        <GrowthDemo />
      </NoteCard>

      <NoteCard title="big o vs omega vs theta">
        <Term name="Big O (O)">
          the WORST case — the pessimist. &quot;At most this slow.&quot;
        </Term>
        <Term name="Omega (Ω)">
          the BEST case — the optimist. &quot;At least this fast.&quot;
        </Term>
        <Term name="Theta (Θ)">
          the average / tight case — the realist, squeezed between the two.
        </Term>
        <p className="text-muted-foreground">
          Quiz trap: &quot;which one describes the BEST case?&quot; — that&apos;s
          Omega, not Big O.
        </p>
      </NoteCard>

      <NoteCard title="O(1) — constant time 🚀">
        <p>
          The step count never changes, whether the array has 5 items or 5
          million. Grabbing a box by its number is O(1):
        </p>
        <CodeBlock code={"array = [1, 2, 3, 4, 5]\nprint(array[0])  # 1 step, always"} filename="constant.py" />
      </NoteCard>

      <NoteCard title="O(n) — linear time">
        <p>
          Touch every item once. 10 items = 10 steps, 1000 items = 1000 steps.
          Any plain loop over the whole list:
        </p>
        <CodeBlock code={"for element in array:\n    print(element)  # runs n times"} filename="linear.py" />
      </NoteCard>

      <NoteCard title="O(log n) — logarithmic time">
        <p>
          You throw away HALF of the remaining work at every step. Huge inputs
          die fast: a million items takes only ~20 halvings.
        </p>
        <p className="text-muted-foreground">
          Like the number-guessing game: guess the middle of 1–100, get told
          &quot;higher/lower&quot;, half the numbers vanish per guess.
        </p>
        <HalvingDemo />
      </NoteCard>

      <NoteCard title="O(n²) — quadratic time">
        <p>
          A loop INSIDE a loop over the same list. For each of the n items you
          do n things: n × n = n².
        </p>
        <CodeBlock code={"for x in array:\n    for y in array:\n        print(x, y)  # n * n pairs"} filename="quadratic.py" />
        <p className="text-muted-foreground">
          10 items = 100 steps. 1000 items = 1,000,000 steps. It gets ugly
          quickly.
        </p>
      </NoteCard>

      <NoteCard title="O(2ⁿ) — exponential time 🐌">
        <p>
          Every call spawns TWO more calls: 1 → 2 → 4 → 8 → 16… The classic
          example is naive fibonacci:
        </p>
        <CodeBlock code={"def f(n):\n    if n <= 1:\n        return 1\n    return f(n-1) + f(n-1)  # two calls each!"} filename="exponential.py" />
        <p className="text-muted-foreground">
          Spot it in quiz code: a function that calls itself <em>twice</em> per
          call.
        </p>
      </NoteCard>

      <NoteCard title="rule 1: drop constants">
        <p>
          O(2n) = O(n). O(500) = O(1). Doing a loop twice is still linear
          growth — Big O only keeps the shape, not the multiplier.
        </p>
      </NoteCard>

      <NoteCard title="rule 2: drop non-dominant terms">
        <p>
          O(n² + n) = O(n²). When n is big, the biggest term eats everything
          else: at n = 1000, n² is a million and n is a measly thousand.
        </p>
        <p className="text-muted-foreground">Keep only the biggest term.</p>
      </NoteCard>

      <NoteCard title="add vs multiply (this one's sneaky)">
        <p>
          Two loops one AFTER the other, over different inputs a and b →{" "}
          <strong>ADD</strong>: O(a + b).
        </p>
        <p>
          A loop INSIDE another loop → <strong>MULTIPLY</strong>: O(a × b).
        </p>
        <CodeBlock
          code={
            "# ADD: O(a + b)\nfor x in arrayA: print(x)\nfor y in arrayB: print(y)\n\n# MULTIPLY: O(a * b)\nfor x in arrayA:\n    for y in arrayB:\n        print(x, y)"
          }
          filename="add_vs_multiply.py"
        />
      </NoteCard>

      <NoteCard title="space complexity (memory, not time)">
        <p>
          Same idea, but counting MEMORY instead of steps. A loop that just
          prints uses O(1) space. Creating a new list of n items uses O(n)
          space.
        </p>
        <p className="text-muted-foreground">
          Sneaky one: recursion uses memory too! Every unfinished call waits on
          a pile (the call stack). A function that recurses n levels deep uses
          O(n) space even if it creates nothing.
        </p>
      </NoteCard>

      <NoteCard title="the speed ladder (memorize this)">
        <p className="font-mono text-sm">
          O(1) <span className="text-muted-foreground">&lt;</span> O(log n){" "}
          <span className="text-muted-foreground">&lt;</span> O(n){" "}
          <span className="text-muted-foreground">&lt;</span> O(n²){" "}
          <span className="text-muted-foreground">&lt;</span> O(2ⁿ)
        </p>
        <p className="text-muted-foreground">
          Left = fastest 🚀, right = slowest 🐌. If a quiz asks you to compare
          two answers, this ladder settles it.
        </p>
      </NoteCard>
    </div>
  );
}
