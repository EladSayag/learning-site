// Algorithmics content.
//
// Shape: const ALGORITHMICS_SUBJECT = { id, name, color, chapters: [ { id, name, lessons: [...] } ] }
// Chapters are just a display grouping — they have NO effect on lesson order or unlocking.
// That's what `prerequisites` is for. See the matching header in data-physics.js for the full
// field-by-field doc (id/title/section/prerequisites/estMinutes/content/exercises); same rules
// apply here, ids just use the "algo-" prefix instead of "phys-".
//
// STATUS (2026-09-01, batch 4): this file now covers Data Structures / Algorithms / Graph Algorithms only.
// The five chapters that used to follow "graph-algorithms" here (numerical-linear-algebra,
// optimization, probability-statistics, time-series, classical-ml) were moved verbatim to
// js/data-datascience.js / DATASCIENCE_SUBJECT — that material is numerical linear algebra, convex
// optimization, statistical inference, and ML, a different discipline from algorithms/data
// structures proper, even though the original build interleaved them. See that file's header for
// details (including why their lesson ids still keep the "algo-" prefix).
//
// Within this file, lessons fall into three buckets:
//   1. Original, already-good content, kept verbatim (just with section/prerequisites/estMinutes
//      added when the DAG restructure happened): algo-hashing-universal-families, algo-bst-balance,
//      algo-binary-heaps, algo-dynamic-arrays-amortization, algo-union-find, algo-tries, and all of
//      "algorithms" + "graph-algorithms" except the placeholders listed below.
//   2. Lessons with FULL content in the CURRENT style template (goal + inline SVG diagram + design +
//      variants list + one-sentence Remark + mini-table + inline "Try it yourself" with folded
//      <details> solution + closing Remark with cross-links + Further reading + italic one-line
//      slogan; bare-topic-name titles; two meatier exercises in the array beyond the inline one):
//      algo-stacks, algo-linked-lists (the two style-template reference lessons),
//      algo-red-black-trees, algo-b-trees, algo-splay-trees, algo-skip-lists,
//      algo-bloom-filters, algo-priority-queue-adt, algo-fibonacci-heap, algo-van-emde-boas,
//      algo-segment-fenwick-trees. This completes Data Structures category A (all former
//      placeholder-only nodes now have full content) as of 2026-09-01, batch 3.
//   2b. RESTYLED as of 2026-09-01 batch 4 — now identical in structure to bucket 2 (goal + inline SVG
//      + design + variants list + one-sentence Remark + mini-table + inline "Try it yourself" with
//      folded <details> solution + closing Remark with cross-links + Further reading + italic
//      one-line slogan), underlying material unchanged: algo-queues, algo-what-is-a-data-structure,
//      algo-kd-trees, algo-suffix-trees-arrays, algo-persistent-data-structures. This completes ALL of
//      Data Structures (bucket 2 + 2b, categories A and B) — every lesson in the "data-structures"
//      chapter is now in the current style template.
//   3. PLACEHOLDER NODES ONLY — wired into the DAG with correct prerequisites, but content still to
//      be written in a follow-up pass:
//        Algorithms (CLRS Part II, "Sorting and Order Statistics" — the material this chapter was
//          missing): algo-heapsort, algo-linear-time-sorting, algo-order-statistics-selection.
//        Graph Algorithms (deliberately beyond a first course, per request): algo-dfs, algo-bfs
//          (pre-existing placeholders, split out of an old combined lesson), algo-scc-kosaraju,
//          algo-scc-tarjan, algo-bridges-articulation (pre-existing), plus new ones —
//          algo-max-flow-ford-fulkerson, algo-bipartite-matching, algo-all-pairs-shortest-paths,
//          algo-2sat-scc, algo-eulerian-path-hierholzer.
//      NEXT UP when resuming this pass: Data Structures (categories A and B, i.e. buckets 2 and 2b) is
//      now FULLY done — every lesson in that chapter is in current style. Move to Graph Algorithms
//      placeholders, in this DAG order: algo-dfs, algo-bfs, algo-topological-sort-dag-dp (check first
//      whether it already has real content — it may not be a placeholder), algo-scc-kosaraju,
//      algo-scc-tarjan, algo-bridges-articulation, algo-2sat-scc, algo-eulerian-path-hierholzer,
//      algo-max-flow-ford-fulkerson, algo-bipartite-matching, algo-all-pairs-shortest-paths. Start
//      with algo-dfs. (Note: bucket 3's "Algorithms" placeholders — algo-heapsort,
//      algo-linear-time-sorting, algo-order-statistics-selection — are lower priority per the current
//      pass's scope, which after Data Structures moves straight to Graph Algorithms; revisit them only
//      if explicitly asked to.)

const ALGORITHMICS_SUBJECT = {
  id: "algorithmics",
  name: "Algorithmics",
  color: "#2f9e6b",
  chapters: [
    {
      id: "data-structures",
      name: "Data Structures",
      lessons: [
        {
          id: "algo-what-is-a-data-structure",
          title: "What Is a Data Structure?",
          section: "Foundations",
          prerequisites: [],
          estMinutes: 15,
          content: `
            <p>Every data structure in this course answers two separate questions, and most of the early confusion in this area comes from answering them at once. The first question is <em>what can you do with it</em> — which operations exist, and what do they promise: insert a key, remove the minimum, find a value, iterate in order? That is the <strong>abstract data type</strong> (ADT): a contract stated purely in terms of behavior, with no commitment to memory layout. The second question is <em>how is it actually built</em> — arrays, pointers, hashing — and that is the <strong>data structure</strong> proper: one concrete realization of the contract, with its own time and space costs.</p>
            <p>The diagram below makes the split concrete for the simplest interesting ADT, the List (insert at a position, get by position, remove by position). Two structures implement the exact same interface with opposite performance profiles:</p>
            <svg viewBox="0 0 520 220" width="100%" height="220" style="max-width:520px;display:block;margin:0.8rem auto;" role="img" aria-label="A List ADT box at top, with arrows down to two implementation boxes: dynamic array (fast get, slow front-insert) and linked list (slow get, fast front-insert)">
              <rect x="160" y="10" width="200" height="60" rx="8" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="260" y="35" text-anchor="middle" fill="var(--text)" font-size="14" font-weight="600">List ADT</text>
              <text x="260" y="55" text-anchor="middle" fill="var(--text-muted)" font-size="11">insert(i,x)   get(i)   remove(i)</text>
              <line x1="220" y1="70" x2="100" y2="128" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="300" y1="70" x2="420" y2="128" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="10" y="130" width="180" height="72" rx="8" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <text x="100" y="153" text-anchor="middle" fill="var(--text)" font-size="13" font-weight="600">Dynamic array</text>
              <text x="100" y="172" text-anchor="middle" fill="var(--text-muted)" font-size="11">get(i): O(1)</text>
              <text x="100" y="189" text-anchor="middle" fill="var(--text-muted)" font-size="11">insert(0,x): O(n)</text>
              <rect x="330" y="130" width="180" height="72" rx="8" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <text x="420" y="153" text-anchor="middle" fill="var(--text)" font-size="13" font-weight="600">Linked list</text>
              <text x="420" y="172" text-anchor="middle" fill="var(--text-muted)" font-size="11">get(i): O(n)</text>
              <text x="420" y="189" text-anchor="middle" fill="var(--text-muted)" font-size="11">insert(0,x): O(1)</text>
            </svg>
            <p>Two consequences follow immediately, and they recur in every later lesson. First, you can swap implementations without changing any code that only talks to the ADT — this is the entire justification for a database index switching from a B-tree to a hash index, or for choosing Python's <code>list</code> versus <code>collections.deque</code>. Second, "which structure is best" is not answerable without knowing the operation mix: a workload dominated by random access wants the array; one dominated by front-insertion wants the list.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Dynamic array</th><th>Linked list</th><th>Why</th></tr>
              <tr><td>get(i)</td><td>O(1)</td><td>O(i)</td><td>array indexes directly by address; a list must walk links from the head</td></tr>
              <tr><td>insert(0, x)</td><td>O(n)</td><td>O(1)</td><td>array shifts everything right one slot; a list just relinks the head pointer</td></tr>
            </table>
            <p>Every later lesson in this chapter is filling in a row of a much bigger version of the table above — the same handful of ADTs (list, set, map, priority queue), an increasing number of implementations, each buying a different point on the time/space trade-off curve.</p>
            <p><strong>Remark:</strong> a structure's <strong>invariant</strong> is the standing property its operations must preserve — sortedness for a sorted array, the heap property for a heap, no cycles for a tree — and it's worth naming up front because every lesson from here on leans on it without saying so again.</p>
            <p><strong>Try it yourself:</strong> a stack (push/pop from one end) and a queue (enqueue at one end, dequeue from the other) are both, in ADT terms, restricted versions of the List above. Which one can be implemented with O(1) worst-case operations using <em>only</em> a dynamic array with no shifting ever — and which one genuinely needs either a second index trick or a linked structure to avoid O(n) shifts?</p>
            <details><summary>Solution</summary>
              <p>A stack is free: push and pop both happen at the same end (the array's tail), so a dynamic array with amortized-O(1) append already gives O(1) push/pop with no shifting, ever. A queue is the hard case, because enqueue and dequeue happen at <em>opposite</em> ends — dequeuing from index 0 of a plain array means shifting everything left, which is O(n). That's precisely why queues need either the circular-buffer trick (advance a head index instead of shifting) or a linked list, while stacks never do. The asymmetry is the ADT's fault, not the array's: it's baked into which end each operation touches.</p>
            </details>
            <p><strong>Remark:</strong> reading any new structure well means asking three questions in order: what is the invariant, why does maintaining it make some operation cheap, and what does maintaining it cost on the operations that don't benefit. That question triage is the actual skill this chapter is teaching; the specific structures — starting with <a href="#/subject/algorithmics/data-structures/algo-stacks">stacks</a> and <a href="#/subject/algorithmics/data-structures/algo-queues">queues</a> next — are the practice material.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 10 introduction (stacks/queues/lists as the first worked instances of implementing an ADT); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §1.2 ("Data Types") for the clearest short treatment of the ADT/implementation split specifically; Pat Morin, <em>Open Data Structures</em> (free, opendatastructures.org), Ch. 1, for the same ground with runnable code in several languages if you want to see interfaces expressed as code rather than prose.</p>
            <p><em>The whole idea in one line: the contract is what it promises, the structure is how it pays for that promise.</em></p>
          `,
          exercises: [
            "The Python list and collections.deque both implement something close to the List ADT. Look up (or measure) the cost of appendleft on each. Explain the discrepancy in terms of the underlying data structure, not the interface.",
            "Define an ADT for a 'multiset' (a collection allowing duplicates, supporting insert, remove-one-instance, and count(x)). Give two different data structures implementing it, and describe a workload where each wins."
          ]
        },
        {
          id: "algo-stacks",
          title: "Stacks",
          section: "Foundations",
          prerequisites: ["algo-what-is-a-data-structure"],
          estMinutes: 18,
          content: `
            <p>A stack is a data structure meant to represent access to a collection under one specific rule: the only element you may ever touch — look at, add, or remove — is the single most recently added one, the <strong>top</strong>. Adding is <code>push</code>, removing is <code>pop</code>, and the rule has a name: <strong>LIFO</strong>, last in, first out.</p>
            <svg viewBox="0 0 260 220" width="100%" height="220" style="max-width:260px;display:block;margin:0.8rem auto;" role="img" aria-label="Three stacked boxes labeled A, B, C bottom to top, with an arrow at the top labeled push slash pop">
              <rect x="60" y="150" width="120" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="60" y="110" width="120" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="60" y="70" width="120" height="40" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="120" y="95" text-anchor="middle" fill="var(--text)" font-size="12">top: C</text>
              <text x="120" y="135" text-anchor="middle" fill="var(--text-muted)" font-size="12">B</text>
              <text x="120" y="175" text-anchor="middle" fill="var(--text-muted)" font-size="12">A (bottom)</text>
              <defs><marker id="stkarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <line x1="120" y1="20" x2="120" y2="65" stroke="var(--accent)" stroke-width="2" marker-end="url(#stkarrow)"/>
              <text x="205" y="40" text-anchor="middle" fill="var(--accent)" font-size="12">push /<tspan x="205" dy="14">pop</tspan></text>
            </svg>
            <p>The design follows straight from that goal: expose exactly one access point and forbid everything else. There is no operation that reaches into the middle of a stack — which is exactly why every operation ends up cheap.</p>
            <p>Two implementations satisfy the rule, and either is standard:</p>
            <ul>
              <li><strong>Array-backed</strong> — a <a href="#/subject/algorithmics/data-structures/algo-dynamic-arrays-amortization">dynamic array</a> written at one end only. Contiguous, cache-friendly.</li>
              <li><strong>Linked-list-backed</strong> — push and pop at the head of a <a href="#/subject/algorithmics/data-structures/algo-linked-lists">linked list</a>. No resizing ever happens, at the usual per-node pointer cost.</li>
            </ul>
            <p>Both give the same bound: push, pop, and peek are all O(1) — for the same reason an insertion at a known node of a linked list is O(1). A fixed, small amount of work happens regardless of how many elements came before.</p>
            <p>The instance you already use every time you run any program is the <strong>call stack</strong>: calling a function pushes a frame (return address, arguments, locals); returning pops it. Recursion depth <em>is</em> stack depth, which is exactly why unbounded recursion crashes with a stack overflow rather than merely running slowly — a resource limit on the stack, not on the algorithm's time complexity. Running that idea in reverse — replacing recursion with a stack you manage explicitly — is how iterative depth-first search is written, as you'll see directly in the DFS lesson.</p>
            <p><strong>Try it yourself:</strong> given a string containing three kinds of brackets — <code>()</code>, <code>[]</code>, <code>{}</code> — how would you decide, using a stack, whether every bracket is properly opened and closed in the right order?</p>
            <details><summary>Solution</summary>
              <p>Scan left to right. On an opening bracket, push it. On a closing bracket, pop the stack: if the stack is empty, or the popped bracket isn't the matching opener for this closer, the string is invalid. If the string ends with the stack empty, it's valid. This works because the top of the stack always holds the innermost still-unclosed opener, and correct nesting requires that opener to be the very next thing closed — which is exactly LIFO order.</p>
            </details>
            <p><strong>Remark:</strong> because both implementations are equally valid, the choice between them is the same locality trade-off as the previous lesson: array-backed is contiguous and fast to walk; linked-list-backed pays a pointer-chasing cost in exchange for never needing to resize or copy. Most general-purpose stacks — including the runtime call stack — are array-backed for exactly this reason.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §10.1 (stacks and queues, array implementation); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §1.3 ("Stacks and Queues" — the resizing-array and linked-list implementations side by side, plus the classic arithmetic-expression-evaluation worked example with diagrams); Skiena, <em>The Algorithm Design Manual</em>, 3rd ed., §3.3, for further stack applications.</p>
            <p><em>The whole idea in one line: the only thing you're ever allowed to touch is whatever you touched most recently.</em></p>
          `,
          exercises: [
            "Show how to implement a queue using two stacks, so that every enqueue and dequeue runs in O(1) amortized time. State the invariant your two stacks maintain and prove the amortized bound with a potential-function argument.",
            "Given a sequence of tokens representing an arithmetic expression in postfix (Reverse Polish) notation — e.g. '3 4 + 2 *' — describe an O(n)-time algorithm using a single stack to evaluate it, and explain why postfix notation never requires parentheses."
          ]
        },
        {
          id: "algo-queues",
          title: "Queues",
          section: "Foundations",
          prerequisites: ["algo-what-is-a-data-structure"],
          estMinutes: 18,
          content: `
            <p>A queue is a stack's mirror image: <code>enqueue(x)</code> adds at one end, <code>dequeue()</code> removes from the other, and the contract is <strong>FIFO</strong>, first in, first out. The two ADTs are often taught together for exactly this contrast — same two operations in spirit, opposite discipline about which end does what.</p>
            <svg viewBox="0 0 260 110" width="100%" height="110" style="max-width:300px;display:block;margin:0.8rem auto;" role="img" aria-label="A row of cells with B, C, D occupied; head pointer under B labeled dequeue, tail pointer after D labeled enqueue">
              <g font-size="12">
                <rect x="10"  y="20" width="50" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <rect x="60"  y="20" width="50" height="40" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <rect x="110" y="20" width="50" height="40" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <rect x="160" y="20" width="50" height="40" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <rect x="210" y="20" width="50" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="85"  y="45" text-anchor="middle" fill="var(--text)">B</text>
                <text x="135" y="45" text-anchor="middle" fill="var(--text)">C</text>
                <text x="185" y="45" text-anchor="middle" fill="var(--text)">D</text>
                <line x1="85" y1="60" x2="85" y2="78" stroke="var(--accent)" stroke-width="1.5"/>
                <line x1="185" y1="60" x2="185" y2="78" stroke="var(--accent)" stroke-width="1.5"/>
                <text x="85" y="95" text-anchor="middle" fill="var(--accent)" font-size="11">head (dequeue)</text>
                <text x="185" y="95" text-anchor="middle" fill="var(--accent)" font-size="11">tail (enqueue)</text>
              </g>
            </svg>
            <p>The design follows straight from that goal: a naive array queue that just advances a "front" index and shifts everything left on dequeue costs O(n) per dequeue — unacceptable. The fix is the <strong>circular (ring) buffer</strong>: keep <code>head</code> and <code>tail</code> indices into a fixed-size array of capacity m, advance each modulo m, and never shift anything. Nothing ever moves once written; only the two indices walk in circles around the same block of memory.</p>
            <p>Two implementations satisfy the rule, and either is standard:</p>
            <ul>
              <li><strong>Circular (ring) array</strong> — fixed capacity, both indices advance mod m. Contiguous and cache-friendly, at the cost of a capacity limit.</li>
              <li><strong>Doubly linked list</strong> — enqueue at the tail, dequeue at the head. No capacity limit and no modular arithmetic, at the usual per-node pointer overhead; this is essentially what <code>collections.deque</code> is (a linked list of small fixed-size blocks, giving O(1) at both ends with better cache behavior than one node per element).</li>
            </ul>
            <p><strong>Remark:</strong> the one bookkeeping subtlety in the ring-array version is distinguishing "empty" from "full" when <code>head == tail</code> — solved by tracking a count alongside the two indices, or by deliberately never filling the last slot.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>enqueue</td><td>O(1)</td><td>write at tail, advance tail — no shifting, no scan</td></tr>
              <tr><td>dequeue</td><td>O(1)</td><td>read at head, advance head — same reasoning, opposite end</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> stacks can simulate a queue (two stacks, amortized O(1) — see the previous lesson's exercises). Can you go the other way: implement a stack's <code>push</code>/<code>pop</code> using only two plain queues?</p>
            <details><summary>Solution</summary>
              <p>Keep all elements in one queue, call it the "main" one, in stack order (top at the front). To <code>push(x)</code>: enqueue x into the empty second queue, then dequeue everything from main and re-enqueue it behind x, then swap the two queues' roles so main is the one holding everything with x at the front. <code>pop</code> and <code>peek</code> are then just dequeue/front on main. Push does O(n) work to re-route the existing elements behind the new one; pop is O(1). This is the mirror image of the two-stack queue, where the O(n) cost sits on the read side instead — the FIFO/LIFO mismatch has to be paid somewhere, and which operation absorbs it is a design choice.</p>
            </details>
            <p><strong>Remark:</strong> the queue's FIFO discipline is not a stylistic choice in <a href="#/subject/algorithmics/graph-algorithms/algo-bfs">breadth-first search</a> — it is the mechanism that makes BFS correct. Processing vertices in the order they were discovered means everything at graph-distance <em>k</em> from the source is dequeued before anything at distance <em>k+1</em>. Swap the queue for a <a href="#/subject/algorithmics/data-structures/algo-stacks">stack</a> and you get depth-first search's order instead — same two lines of pseudocode, different data structure, entirely different traversal. And when "first come, first served" stops being the right policy — service order should be by priority instead of arrival — the <a href="#/subject/algorithmics/data-structures/algo-priority-queue-adt">priority queue</a> is the structurally different ADT built for exactly that.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §10.1 (queues via a circular array, with the wraparound arithmetic spelled out); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §1.3 (queues, with diagrams of the resizing circular array); Skiena, <em>The Algorithm Design Manual</em>, 3rd ed., §3.3.</p>
            <p><em>The whole idea in one line: first come, first served — always.</em></p>
          `,
          exercises: [
            "Implement a fixed-capacity queue as a circular buffer over an array of size m. Give the exact index arithmetic for enqueue and dequeue, and an empty/full test that is correct when head == tail can mean either.",
            "Prove that breadth-first search dequeues vertices in nondecreasing order of distance from the source, using the invariant that at every point in time the queue holds vertices of at most two consecutive distance values, with all vertices of the smaller distance appearing before all of the larger."
          ]
        },
        {
          id: "algo-linked-lists",
          title: "Linked Lists",
          section: "Foundations",
          prerequisites: ["algo-what-is-a-data-structure"],
          estMinutes: 22,
          content: `
            <p>A linked list is a data structure whose job is to represent a list — an ordered sequence of elements. It does this in the most direct way possible: by linking each element to the one that comes right after it, so that following the links in order reproduces the sequence.</p>
            <svg viewBox="0 0 460 100" width="100%" height="100" style="max-width:460px;display:block;margin:0.8rem auto;" role="img" aria-label="Three nodes A, B, C connected by arrows, ending in null">
              <g font-size="12">
                <rect x="10" y="20" width="70" height="40" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <line x1="45" y1="20" x2="45" y2="60" stroke="var(--border)" stroke-width="1.5"/>
                <text x="27" y="45" text-anchor="middle" fill="var(--text)">A</text>
                <rect x="120" y="20" width="70" height="40" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <line x1="155" y1="20" x2="155" y2="60" stroke="var(--border)" stroke-width="1.5"/>
                <text x="137" y="45" text-anchor="middle" fill="var(--text)">B</text>
                <rect x="230" y="20" width="70" height="40" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <line x1="265" y1="20" x2="265" y2="60" stroke="var(--border)" stroke-width="1.5"/>
                <text x="247" y="45" text-anchor="middle" fill="var(--text)">C</text>
                <text x="390" y="45" text-anchor="middle" fill="var(--text-muted)">null</text>
                <defs><marker id="llarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
                <line x1="80" y1="40" x2="118" y2="40" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#llarrow)"/>
                <line x1="190" y1="40" x2="228" y2="40" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#llarrow)"/>
                <line x1="300" y1="40" x2="365" y2="40" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#llarrow)"/>
              </g>
            </svg>
            <p>The design follows straight from that goal: each element lives in its own <strong>node</strong>, and a node is just two things — a piece of data, and a pointer to the next node. That's the whole structure; everything else in this lesson is a consequence of it.</p>
            <p>Three variants cover essentially every use:</p>
            <ul>
              <li><strong>Singly linked</strong> — one forward pointer, as drawn above. You can only walk forward.</li>
              <li><strong>Doubly linked</strong> — adds a back pointer, so a node can be removed in O(1) given only a pointer to it, with no need to also hold its predecessor.</li>
              <li><strong>Circular</strong> — the tail points back to the head. Useful when there is no natural "end", such as a round-robin scheduler.</li>
            </ul>
            <p><strong>Remark:</strong> a common trick is a <strong>sentinel</strong> (dummy) head node that is never itself real data. It removes the "is this the first element?" special case from insert and delete, since every real node then has a predecessor — a convenience, not a new idea.</p>
            <p>The operations split sharply into two costs:</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Access element i</td><td>O(i)</td><td>no random access — you must walk from the head, one pointer at a time</td></tr>
              <tr><td>Insert or remove, given a pointer to the node</td><td>O(1)</td><td>only a constant number of pointers change, no matter how long the list is</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> given a linked list, how would you decide — using O(1) extra space — whether it contains a cycle (some node's pointer eventually leads back to an earlier node instead of to null)?</p>
            <details><summary>Solution: Floyd's cycle detection (the "tortoise and hare")</summary>
              <p>Walk two pointers from the head at once: <code>slow</code> moves one node per step, <code>fast</code> moves two. If the list is acyclic, <code>fast</code> simply reaches null first — no cycle. If there is a cycle, <code>fast</code> enters it first and then laps <code>slow</code> from behind, the way a faster runner on a circular track eventually catches up to a slower one, so the two pointers are guaranteed to land on the same node at some point. That already answers "is there a cycle?" in O(n) time and O(1) space. Finding <em>where</em> it starts takes one more step: once they meet, reset one pointer to the head and advance both one node at a time; they meet again exactly at the cycle's start (this follows from the arithmetic of how far each pointer had traveled at the first meeting — worth working out on paper once).</p>
            </details>
            <p><strong>Remark:</strong> this is the first genuinely pointer-based structure in the course, and it's worth naming what that costs, because it recurs constantly from here on. Nodes are scattered wherever the allocator happened to put them, so walking a linked list means chasing pointers through effectively random memory — each a potential cache miss — while an array of the same size is read in one sequential, cache-friendly sweep. Two structures with identical O(n) cost can differ by an order of magnitude in wall-clock time for exactly this reason. It's also why the idea keeps reappearing: a <a href="#/subject/algorithmics/data-structures/algo-hashing-universal-families">hash table</a>'s collision-chaining bucket is a linked list, and a <a href="#/subject/algorithmics/data-structures/algo-bst-balance">binary search tree</a> is the same node-plus-pointer idea with two pointers per node instead of one.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §10.2 (linked lists, including the sentinel trick); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §1.3, for the linked-list stack/queue implementations with diagrams; Knuth, <em>The Art of Computer Programming</em>, Vol. 1, §2.2.3-2.2.5, for the classical, exhaustive treatment (circular lists, doubly linked lists, lists of lists).</p>
            <p><em>The whole idea in one line: don't store where everything is — just remember what's next.</em></p>
          `,
          exercises: [
            "Reverse a singly linked list in O(n) time and O(1) extra space. Give the three-pointer loop invariant that makes the in-place reversal correct, and prove it by induction on the number of iterations.",
            "Merge two already-sorted singly linked lists into one sorted list in O(n+m) time and O(1) extra space, by re-linking existing nodes rather than allocating new ones. State precisely why this is possible for linked lists but would require allocating a new array if the input were two sorted arrays."
          ]
        },
        {
          id: "algo-hashing-universal-families",
          title: "Hash Tables and Universal Hash Families",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-what-is-a-data-structure"],
          estMinutes: 25,
          content: `
            <p>A hash table stores <em>n</em> keys in <em>m</em> slots via <code>h: U → {0,…,m−1}</code>. For any fixed <em>h</em> and |U| &gt; nm, the pigeonhole principle produces an input on which all <em>n</em> keys collide, giving Θ(n) lookups. So the O(1) guarantee cannot come from a clever fixed function; it must come from randomization over a family of functions, with the expectation taken over the algorithm's own coins rather than over the input distribution.</p>
            <p>A family H is <strong>universal</strong> if for all distinct <em>x, y</em> in U, <code>Pr[h(x) = h(y)] ≤ 1/m</code> when <em>h</em> is drawn uniformly from H. Under chaining with universal H, the expected length of the chain a search visits is at most <code>1 + α</code> where α = n/m is the load factor, giving expected O(1) operations at constant α. The standard construction over a prime <em>p</em> &gt; |U| is</p>
            <pre><code>h_{a,b}(x) = ((a·x + b) mod p) mod m,   a ∈ {1,…,p−1},  b ∈ {0,…,p−1}</code></pre>
            <p>Strengthening to <em>k</em>-independence (any <em>k</em> keys are mapped independently and uniformly) buys stronger concentration, not just expectation — needed for the sketching structures used on streaming market data. The lesson generalizes: when worst-case inputs are unavoidable, randomize the algorithm, not the input model. The same move appears in randomized quicksort.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §11.2 (chaining), §11.3.3 (universal hashing), §11.4 (open addressing) and §11.5 (perfect hashing).</p>
          `,
          exercises: [
            "Prove that the family h_{a,b}(x) = ((ax+b) mod p) mod m is universal. Where exactly is primality of p used, and what breaks if a = 0 is permitted?",
            "Under uniform hashing with chaining and load factor α, derive the expected number of probes for an unsuccessful and for a successful search. Then compute the expected maximum chain length for n keys in n slots and explain why it is Θ(log n / log log n) rather than O(1)."
          ]
        },
        {
          id: "algo-bst-balance",
          title: "Balanced Search Trees: Why Rotations Suffice",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-what-is-a-data-structure"],
          estMinutes: 25,
          content: `
            <p>A binary search tree keeps the in-order traversal sorted, so it supports predecessor/successor and range queries that a hash table cannot. Its cost is the tree height, and unbalanced insertion of a sorted sequence degenerates to a linked list. Every balanced-BST scheme is therefore an answer to one question: which local invariant, repairable in O(1) work per level, forces height O(log n)?</p>
            <p>Rotation is the only structural primitive needed. A rotation changes the shape of one parent-child pair while preserving in-order order — it is the "generator" of the space of BSTs on a fixed key set. Red-black trees maintain: every node is red or black; the root and leaves are black; no red node has a red child; and every root-to-leaf path contains the same number of black nodes (the black-height <em>bh</em>). Those imply a subtree of black-height <em>bh</em> contains at least <code>2^bh − 1</code> internal nodes, and the no-red-red rule gives <code>height ≤ 2·bh</code>, hence <code>h ≤ 2·log₂(n+1)</code>.</p>
            <table class="mini-table">
              <tr><th>Structure</th><th>Balance invariant</th><th>Guarantee</th></tr>
              <tr><td>AVL</td><td>|height(L) − height(R)| ≤ 1</td><td>h ≈ 1.44 log n; faster lookups</td></tr>
              <tr><td>Red-black</td><td>black-height equality</td><td>h ≤ 2 log n; fewer rotations per update</td></tr>
              <tr><td>Treap</td><td>random priorities, heap-ordered</td><td>expected O(log n), tiny code</td></tr>
              <tr><td>B-tree</td><td>branching factor B</td><td>O(log_B n) block reads; disk/cache</td></tr>
            </table>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 12 (BSTs, including the expected-height analysis of §12.4) and Ch. 13 (red-black trees, §13.1 for the height bound).</p>
          `,
          exercises: [
            "Prove that a red-black tree with n internal nodes has height at most 2·log₂(n+1). Then show the bound is essentially tight by constructing, for arbitrarily large n, a valid red-black tree whose height is at least 2·log₂(n+1) − O(1).",
            "Prove that any BST on n keys can be transformed into any other BST on the same keys using O(n) rotations. (Hint: show that O(n) rotations suffice to convert an arbitrary BST into a right spine.)"
          ]
        },
        {
          id: "algo-red-black-trees",
          title: "Red-Black Trees",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-bst-balance"],
          estMinutes: 30,
          content: `
            <p>A red-black tree keeps a binary search tree balanced on every single insert and delete, automatically, so that search, insert, and delete all stay O(log n) even if the keys arrive in an order designed to make a plain BST degenerate into a linked list.</p>
            <svg viewBox="0 0 300 220" width="100%" height="220" style="max-width:320px;display:block;margin:0.8rem auto;" role="img" aria-label="A small tree of circles, some outlined with the accent color for red nodes and some with a muted color for black nodes, with no red node directly above another red node">
              <g font-size="12" text-anchor="middle">
                <line x1="150" y1="34" x2="90" y2="86" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="150" y1="34" x2="220" y2="86" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="90" y1="102" x2="50" y2="156" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="90" y1="102" x2="130" y2="156" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="220" y1="102" x2="190" y2="156" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="220" y1="102" x2="260" y2="156" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="150" cy="20" r="16" fill="none" stroke="var(--text-muted)" stroke-width="2"/>
                <text x="150" y="24" fill="var(--text)">B</text>
                <circle cx="90" cy="90" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="90" y="94" fill="var(--text)">R</text>
                <circle cx="220" cy="90" r="16" fill="none" stroke="var(--text-muted)" stroke-width="2"/>
                <text x="220" y="94" fill="var(--text)">B</text>
                <circle cx="50" cy="160" r="14" fill="none" stroke="var(--text-muted)" stroke-width="2"/>
                <text x="50" y="164" fill="var(--text)">B</text>
                <circle cx="130" cy="160" r="14" fill="none" stroke="var(--text-muted)" stroke-width="2"/>
                <text x="130" y="164" fill="var(--text)">B</text>
                <circle cx="190" cy="160" r="14" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="190" y="164" fill="var(--text)">R</text>
                <circle cx="260" cy="160" r="14" fill="none" stroke="var(--text-muted)" stroke-width="2"/>
                <text x="260" y="164" fill="var(--text)">B</text>
                <text x="55" y="200" fill="var(--accent)" font-size="11" text-anchor="start">red</text>
                <text x="110" y="200" fill="var(--text-muted)" font-size="11" text-anchor="start">black</text>
              </g>
            </svg>
            <p>The design is a coloring rule enforced by O(1)-work-per-level repair. Every node is red or black, the root and every null leaf are black, no red node has a red child, and every root-to-leaf path has the same count of black nodes. That last rule alone would force perfect balance; relaxing it to allow red nodes as "free" extra height, capped by the no-red-red rule, is what makes the invariant repairable in constant work per level instead of requiring a global rebuild — the same height bound as before (h ≤ 2·log₂(n+1)) for a much cheaper maintenance cost.</p>
            <p>The two update paths, and one well-known simplification of them:</p>
            <ul>
              <li><strong>Insertion fixup</strong> — a new node is inserted red (it can't add to any black-height, only risk a red-red violation). Walking up from it, exactly one of three local cases applies at each step: the uncle is red (recolor and continue upward), the uncle is black and the node is a "zig-zag" from its grandparent (rotate once to make it a "zig-zig"), or the uncle is black and already a "zig-zig" (rotate once more and recolor — done). At most two rotations ever occur per insertion, however many recolorings happen above them.</li>
              <li><strong>Deletion fixup</strong> — deleting a black node can leave a path short one black node ("double-black"); fixing it walks up through four mirrored cases (red sibling, black sibling with black children, black sibling with a near red child, black sibling with a far red child), the last of which terminates the walk with a single rotation. Up to three rotations total.</li>
              <li><strong>Left-leaning red-black trees</strong> (Sedgewick) — restrict red links to always lean left, which collapses the insertion case analysis to two cases and makes the structure map directly onto a 2-3 tree; the simplification used in several teaching implementations, though the classic scheme above is what production libraries (Linux kernel's rbtree, Java's TreeMap, C++'s std::map) actually ship.</li>
            </ul>
            <p><strong>Remark:</strong> the case analysis looks intimidating on the page but every case is a local, O(1) pattern match on a node, its parent, and its sibling or uncle — nothing ever looks two levels further than that.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Search</td><td>O(log n)</td><td>height is at most 2·log₂(n+1) by the black-height argument</td></tr>
              <tr><td>Insert</td><td>O(log n)</td><td>O(log n) recolorings walking up, but at most 2 rotations</td></tr>
              <tr><td>Delete</td><td>O(log n)</td><td>same walk-up structure, at most 3 rotations</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> given the claim that insertion needs at most 2 rotations no matter how deep the tree is, why doesn't the O(log n) chain of recolorings above it also need O(log n) rotations?</p>
            <details><summary>Solution</summary>
              <p>The recoloring case ("uncle is red") never rotates — it just repaints the parent, uncle, and grandparent and moves the problem one level up, so it can repeat all the way to the root without ever touching tree shape. A rotation only happens in the other two cases, and each of those is a terminal case: after the rotation (and, in one of them, a recoloring), the red-red violation is gone and the black-heights are restored, so the walk stops immediately. At most one non-rotating case chains upward, and at most one rotating case ends it — hence at most 2 rotations total, however many recolorings preceded them.</p>
            </details>
            <p><strong>Remark:</strong> the payoff for all this bookkeeping is a tree that's <em>always</em> balanced immediately after every update, unlike the <a href="#/subject/algorithmics/data-structures/algo-splay-trees">splay tree</a>, which allows a single access to cost Θ(n) and only bounds the average; when a wide branching factor matters more than exact height — because each "step down" is a disk read — the <a href="#/subject/algorithmics/data-structures/algo-b-trees">B-tree</a> restructures the same idea around nodes with many keys instead of one.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 13 (the full insertion and deletion fixup case analysis, with diagrams for every case); Guibas & Sedgewick, "A Dichromatic Framework for Balanced Trees," FOCS 1978 (the original paper introducing red-black trees as a reformulation of symmetric binary B-trees); Sedgewick, "Left-Leaning Red-Black Trees," 2008 (the simplified variant, freely available from the author's Princeton page).</p>
            <p><em>The whole idea in one line: color the tree so no root-to-leaf path can be more than twice as long as another, then repair only the O(1)-sized neighborhood around whatever you just changed.</em></p>
          `,
          exercises: [
            "Work out all three insertion-fixup cases (red uncle; black uncle, zig-zag; black uncle, zig-zig) starting from a node inserted as the left child of a left child, drawing the tree before and after each case. Then state, for each case, whether the walk continues upward or terminates.",
            "A red-black tree is built by inserting 1, 2, 3, ..., n in increasing order. Trace or simulate this and determine the resulting height as a function of n. Compare it to the height a plain (unbalanced) BST would have on the same input, and explain in one or two sentences why the difference is the entire point of the structure."
          ]
        },
        {
          id: "algo-b-trees",
          title: "B-Trees",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-bst-balance"],
          estMinutes: 30,
          content: `
            <p>A B-tree keeps a sorted index shallow when each step down the tree is expensive — a disk seek, an SSD page read, a network round trip — by making every node hold hundreds of keys instead of one, so descending even a few levels covers a huge key range.</p>
            <svg viewBox="0 0 460 170" width="100%" height="170" style="max-width:480px;display:block;margin:0.8rem auto;" role="img" aria-label="A wide root node containing three keys splitting into four child nodes, each containing two keys">
              <g font-size="12" text-anchor="middle">
                <rect x="150" y="10" width="160" height="34" rx="4" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <line x1="190" y1="10" x2="190" y2="44" stroke="var(--accent)" stroke-width="1.5"/>
                <line x1="230" y1="10" x2="230" y2="44" stroke="var(--accent)" stroke-width="1.5"/>
                <line x1="270" y1="10" x2="270" y2="44" stroke="var(--accent)" stroke-width="1.5"/>
                <text x="170" y="32" fill="var(--text)">10</text>
                <text x="210" y="32" fill="var(--text)">25</text>
                <text x="250" y="32" fill="var(--text)">40</text>
                <line x1="170" y1="44" x2="60" y2="100" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="210" y1="44" x2="180" y2="100" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="250" y1="44" x2="300" y2="100" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="290" y1="44" x2="400" y2="100" stroke="var(--border)" stroke-width="1.5"/>
                <rect x="20" y="100" width="80" height="34" rx="4" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="60" y="122" fill="var(--text-muted)">3, 7</text>
                <rect x="140" y="100" width="80" height="34" rx="4" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="180" y="122" fill="var(--text-muted)">15, 20</text>
                <rect x="260" y="100" width="80" height="34" rx="4" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="300" y="122" fill="var(--text-muted)">30, 35</text>
                <rect x="360" y="100" width="80" height="34" rx="4" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="400" y="122" fill="var(--text-muted)">45, 60</text>
              </g>
            </svg>
            <p>The design is a single invariant on branching factor: with minimum degree t, every non-root node holds between t−1 and 2t−1 keys and has one more child than it has keys, and every leaf sits at the same depth. Because each node fans out to up to 2t children, the height of a tree holding n keys is only O(log_t n) — with t in the hundreds (chosen to fill one disk block or memory page), a tree holding a billion keys is only 3-4 levels deep. Insertion and deletion work exactly like the rotation-based trees before it, just one level of indirection wider: a node that overflows past 2t−1 keys is <strong>split</strong> in two around its median key, which is pushed up into the parent (the mirror-image operation, merging two undersized siblings, handles deletion), so the tree grows and shrinks only at the root, never needing a separate global rebalance.</p>
            <p>Two variants dominate real systems:</p>
            <ul>
              <li><strong>B+-tree</strong> — all keys and values live in the leaves; internal nodes hold only routing keys, and the leaves are additionally linked into a sorted list. This is what almost every production database index and filesystem (NTFS, ext4's HTree, essentially all relational DB indexes) actually implements, because the leaf linked-list makes range scans a cheap linear walk instead of repeated tree descents.</li>
              <li><strong>B*-tree</strong> — delays a split by first trying to redistribute keys with a neighboring sibling, keeping nodes closer to full (around 2/3 rather than 1/2 in the worst case) at the cost of touching an extra sibling node on every near-overflow.</li>
            </ul>
            <p><strong>Remark:</strong> the "why not just use a red-black tree" answer is entirely about the constant hidden inside O(log n) — a binary tree of a billion keys is about 30 levels deep, each potentially a separate disk seek, while a B-tree with t≈100 covers the same billion keys in 3-4 seeks.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Search</td><td>O(log_t n) node accesses</td><td>height shrinks as branching factor t grows</td></tr>
              <tr><td>Insert / delete</td><td>O(log_t n) node accesses</td><td>split/merge only propagates one node at a time, up to the root</td></tr>
              <tr><td>Range scan (B+-tree)</td><td>O(log_t n + k)</td><td>once you reach the first leaf, the leaf-level linked list gives the rest for free</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> a B-tree of minimum degree t=100 needs how many levels, at most, to hold one billion keys?</p>
            <details><summary>Solution</summary>
              <p>The tightest tree (every non-root node completely full) has, at height h, at most <code>2·(2t)^h</code> keys — each of the h levels branches by up to 2t. The <em>shortest possible</em> tree, on the other hand — the one that determines the worst-case height bound — has every non-root node at minimum occupancy: a root with at least 2 children, and every other internal node with at least t children, giving at least <code>2·t^(h−1)</code> leaves at depth h. Setting n = 10^9 and t = 100: <code>2·100^(h−1) ≤ 10^9</code> gives h−1 ≤ 3.5, so h ≤ 4 or 5 — a billion keys reachable in about four or five block reads, versus roughly 30 for a binary tree of the same size.</p>
            </details>
            <p><strong>Remark:</strong> this is the same branching-factor idea the <a href="#/subject/algorithmics/data-structures/algo-red-black-trees">red-black tree</a> lesson mentioned in passing — a red-black tree is isomorphic to a 2-3-4 B-tree (t=2) with color encoding the grouping — but here the branching factor is tuned for I/O cost rather than left as a binary default; the <a href="#/subject/algorithmics/data-structures/algo-bst-balance">balance overview</a> lesson's table lists it alongside AVL and red-black for exactly this comparison.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 18 (the full definition, and the insertion/deletion algorithms with the minimum-degree invariant); Bayer & McCreight, "Organization and Maintenance of Large Ordered Indices," Acta Informatica, 1972 (the original paper); Comer, "The Ubiquitous B-Tree," ACM Computing Surveys, 1979, for the B+-tree variant and its dominance in real database and filesystem design.</p>
            <p><em>The whole idea in one line: make each node hold hundreds of keys instead of one, so descending the tree means reading a handful of blocks, not thousands.</em></p>
          `,
          exercises: [
            "Give the precise minimum and maximum number of keys a B-tree node of minimum degree t can hold, and use it to derive a tight lower bound on the height of a B-tree with n keys and minimum degree t ≥ 2, matching the style of the worked example above.",
            "Describe the split and merge operations for insertion and deletion in full: what happens when a leaf overflows past 2t−1 keys, what happens when that propagates all the way to a full root, and what happens on deletion when a node drops below t−1 keys and neither neighboring sibling has a key to spare."
          ]
        },
        {
          id: "algo-splay-trees",
          title: "Splay Trees",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-bst-balance", "algo-amortized-potential-method"],
          estMinutes: 25,
          content: `
            <p>A splay tree is a binary search tree with no balance invariant at all — no colors, no heights, no rank. Instead, every single access (search, insert, or delete) ends by dragging the node you just touched all the way up to the root. It keeps no promise about any one access, only that a long sequence of them is cheap — which turns out to be exactly the right promise for workloads with locality, where whatever you accessed recently is likely to be accessed again soon.</p>
            <svg viewBox="0 0 420 190" width="100%" height="190" style="max-width:440px;display:block;margin:0.8rem auto;" role="img" aria-label="Before: a chain z above y above x. After splaying x: x is on top, with y and z rearranged below it, connected by an arrow labeled splay of x">
              <g font-size="12" text-anchor="middle">
                <circle cx="60" cy="20" r="15" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="60" y="24" fill="var(--text)">z</text>
                <line x1="60" y1="35" x2="60" y2="70" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="60" cy="85" r="15" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="60" y="89" fill="var(--text)">y</text>
                <line x1="60" y1="100" x2="60" y2="135" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="60" cy="150" r="15" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="60" y="154" fill="var(--text)">x</text>
                <defs><marker id="splayarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--text-muted)"/></marker></defs>
                <line x1="130" y1="95" x2="220" y2="95" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#splayarrow)"/>
                <text x="175" y="80" fill="var(--text-muted)" font-size="11">splay(x)</text>
                <circle cx="330" cy="30" r="15" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="330" y="34" fill="var(--text)">x</text>
                <line x1="317" y1="42" x2="290" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="343" y1="42" x2="370" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="280" cy="95" r="15" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="280" y="99" fill="var(--text)">y</text>
                <circle cx="380" cy="95" r="15" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="380" y="99" fill="var(--text)">z</text>
              </g>
            </svg>
            <p>The mechanism is a chain of rotations, chosen by pattern rather than by any balance measurement. Let x be the accessed node, y its parent, z its grandparent (if any). Repeat until x is the root: if x has no grandparent, do one ordinary rotation of x with y ("zig"); if x and y are both left children or both right children of their parents ("zig-zig"), rotate y with z, then x with y; if one is a left child and the other a right child ("zig-zag"), rotate x with y, then x with z. The zig-zig case is the crucial one — rotating the grandparent first, not the parent, is what gives the amortized bound; doing the two rotations in the naive order (x-with-y, then x-with-z) still moves x to the root but loses the guarantee entirely.</p>
            <p>The amortized analysis uses the same potential-function machinery as the <a href="#/subject/algorithmics/data-structures/algo-fibonacci-heap">Fibonacci heap</a>: define the potential as the sum, over all nodes, of the log of each node's subtree size, and show that each splay step's actual cost is paid for by a large enough drop in potential — the zig-zig case in particular either does O(1) real work while dropping potential a lot, or does a lot of work while dropping potential by at least as much. The result is that any sequence of m operations on a tree of n nodes costs O(m log n) total, matching a balanced tree in the aggregate despite guaranteeing nothing about any single operation.</p>
            <ul>
              <li><strong>Bottom-up splaying</strong> — the recursive formulation above; easiest to state and to prove the amortized bound for.</li>
              <li><strong>Top-down splaying</strong> — restructures the tree in a single downward pass while searching, avoiding both recursion and a second upward pass; the version most real implementations use.</li>
              <li>The same "move the accessed thing to the front" idea, one dimension flatter, is the <strong>move-to-front</strong> heuristic for a plain unsorted list — worse asymptotically, but the same locality bet.</li>
            </ul>
            <p><strong>Remark:</strong> a single unlucky access can still take Θ(n) time — walking a long chain to a leaf and splaying it back up costs Θ(n) rotations that particular time — it is only the amortized cost over any sequence of accesses that is guaranteed O(log n).</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Any single search/insert/delete</td><td>O(n) worst case</td><td>no balance invariant bounds any one access</td></tr>
              <tr><td>Any m operations, amortized</td><td>O(log n) each</td><td>potential-function argument on Σ log(subtree size)</td></tr>
              <tr><td>k repeated accesses to the same d items</td><td>O(log d) each, after the first</td><td>working-set property: recently splayed items stay near the root</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> if you repeatedly search for the same k elements out of n over and over, what does the "working-set" property say your amortized cost per search should converge to, and why does splaying — specifically, not just any self-adjusting scheme — achieve it?</p>
            <details><summary>Solution</summary>
              <p>Sleator and Tarjan proved the working-set bound: the cost of accessing an element is O(log t + 1), where t is the number of <em>distinct</em> elements accessed since that element was last accessed. If you cycle through the same k elements repeatedly, each one was last touched at most k accesses ago, so every access after the first full cycle costs only O(log k), independent of n — the tree behaves as if it only ever held those k hot elements. This falls directly out of splaying always moving the touched node to the root: an element you haven't touched in a while sinks down as other elements get splayed past it, but never further than the number of distinct elements accessed since, because splaying only ever moves nodes on the search path.</p>
            </details>
            <p><strong>Remark:</strong> that working-set guarantee is a real, practical advantage over a <a href="#/subject/algorithmics/data-structures/algo-red-black-trees">red-black tree</a>, which gives the same O(log n) to a hot key and a cold key alike — the cost is that a splay tree offers no worst-case latency bound at all, which rules it out for real-time systems and is exactly why red-black trees, not splay trees, back the C++ and Java standard library maps.</p>
            <p><strong>Further reading:</strong> Sleator & Tarjan, "Self-Adjusting Binary Search Trees," <em>JACM</em>, 1985 (the original paper — defines splaying, proves the O(log n) amortized bound and the working-set theorem); Tarjan, <em>Data Structures and Network Algorithms</em>, CBMS 44, SIAM, 1983, the chapter on amortized complexity and self-adjusting structures, for the potential-method proof technique in general; Weiss, <em>Data Structures and Algorithm Analysis</em>, the chapter on splay trees, for a more implementation-oriented walkthrough of top-down splaying.</p>
            <p><em>The whole idea in one line: don't try to stay balanced — just drag whatever you touched straight to the root, and let locality pay the bill.</em></p>
          `,
          exercises: [
            "Prove that the zig-zig case must rotate the grandparent (z) before the parent (y) — not x with y followed by x with z — by constructing a small example where doing the rotations in the naive order still moves x to the root but produces a tree with asymptotically worse amortized behavior over a repeated access pattern.",
            "Using the potential function Φ = Σ_v log(size(v)) (size(v) = number of nodes in v's subtree), prove that a single zig-zig step has amortized cost O(1 + log(size after) − log(size before)), and sum this over one full splay to a leaf to derive the O(log n) amortized bound for a single access."
          ]
        },
        {
          id: "algo-skip-lists",
          title: "Skip Lists",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-linked-lists"],
          estMinutes: 25,
          content: `
            <p>A skip list gets balanced-tree search speed out of a plain sorted linked list, without a single rotation — it uses randomness where a balanced tree uses careful invariant bookkeeping.</p>
            <svg viewBox="0 0 440 160" width="100%" height="160" style="max-width:460px;display:block;margin:0.8rem auto;" role="img" aria-label="Four horizontal rows of nodes, the bottom row holding every element and each row above holding an increasingly sparse subset, with vertical links connecting a node to its copy in the row above">
              <g font-size="12" text-anchor="middle">
                <text x="20" y="24" fill="var(--text-muted)" font-size="10" text-anchor="start">L3</text>
                <line x1="60" y1="20" x2="380" y2="20" stroke="var(--border)" stroke-width="1" stroke-dasharray="2,3"/>
                <circle cx="60" cy="20" r="10" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <circle cx="380" cy="20" r="10" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="20" y="59" fill="var(--text-muted)" font-size="10" text-anchor="start">L2</text>
                <line x1="60" y1="55" x2="380" y2="55" stroke="var(--border)" stroke-width="1" stroke-dasharray="2,3"/>
                <circle cx="60" cy="55" r="10" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <circle cx="220" cy="55" r="10" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <circle cx="380" cy="55" r="10" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="20" y="94" fill="var(--text-muted)" font-size="10" text-anchor="start">L1</text>
                <line x1="60" y1="90" x2="380" y2="90" stroke="var(--border)" stroke-width="1" stroke-dasharray="2,3"/>
                <circle cx="60" cy="90" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <circle cx="140" cy="90" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <circle cx="220" cy="90" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <circle cx="300" cy="90" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <circle cx="380" cy="90" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <text x="20" y="129" fill="var(--text-muted)" font-size="10" text-anchor="start">L0</text>
                <line x1="60" y1="125" x2="380" y2="125" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="60" cy="125" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <circle cx="100" cy="125" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <circle cx="140" cy="125" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <circle cx="180" cy="125" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <circle cx="220" cy="125" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <circle cx="260" cy="125" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <circle cx="300" cy="125" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <circle cx="340" cy="125" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <circle cx="380" cy="125" r="10" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <line x1="60" y1="30" x2="60" y2="115" stroke="var(--text-muted)" stroke-width="1"/>
                <line x1="220" y1="65" x2="220" y2="115" stroke="var(--text-muted)" stroke-width="1"/>
                <line x1="380" y1="30" x2="380" y2="115" stroke="var(--text-muted)" stroke-width="1"/>
              </g>
            </svg>
            <p>The design gives every node a random height, chosen the moment it's inserted: flip a coin, and keep growing the node's tower one level for as long as it comes up heads (probability 1/2 per extra level, so a node reaches level k with probability 1/2^k). The bottom level L0 is an ordinary sorted linked list holding every element; each level above is a sparser "express lane" containing only the nodes tall enough to reach it. Searching starts at the top-left corner and moves right along the top level until the next node would overshoot the target, then drops down one level and repeats — skipping over large stretches of the bottom list on the way, the same way an express train skips local stops.</p>
            <p>A handful of variants and real deployments:</p>
            <ul>
              <li><strong>Standard skip list</strong> (Pugh, 1990) — coin-flip probability p=1/2 per level, as drawn above; the choice that minimizes expected search cost for a given expected space overhead.</li>
              <li><strong>Indexable / ranked skip lists</strong> — augment each forward pointer with the number of bottom-level nodes it skips over, giving O(log n) expected "find the k-th smallest element" for free.</li>
              <li>Used directly in production: Redis implements its sorted-set (<code>ZSET</code>) type as a skip list rather than a balanced tree, and both LevelDB and RocksDB use a skip list as the in-memory <strong>memtable</strong> that buffers recent writes before they're flushed to disk.</li>
            </ul>
            <p><strong>Remark:</strong> every bound here is <em>expected</em>, not worst case — an adversary who knows your random bits, or just extremely bad luck, can still produce a tree of all-height-1 towers and force Θ(n) search, though with vanishingly small probability for any reasonable random source.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Search / insert / delete</td><td>O(log n) expected</td><td>expected O(log n) levels, expected O(1) nodes scanned per level</td></tr>
              <tr><td>Space</td><td>O(n) expected</td><td>expected total tower height across all nodes is 2n (geometric series)</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> both skip lists and red-black trees give O(log n) expected/worst-case operations, yet Redis and RocksDB chose skip lists for a structure that many other threads or requests touch concurrently. What does a skip list have that makes it easier to use safely under concurrent modification?</p>
            <details><summary>Solution</summary>
              <p>Inserting into or deleting from a skip list only ever rewires a local, bounded set of forward pointers — the ones at the levels the new/removed node participates in — and never triggers a cascading structural change elsewhere in the structure, unlike a red-black tree insertion or deletion, which can trigger rotations and recolorings that touch nodes arbitrarily far from the change. That locality makes fine-grained locking (lock just the predecessor nodes being rewired at each level) or even fully lock-free implementations via compare-and-swap on individual forward pointers straightforward to reason about, whereas safely rebalancing a tree concurrently — where a rotation can touch and briefly invalidate ancestors — is substantially harder to get right. This is precisely why the lock-free data structure literature (see the further reading) treats skip lists, not balanced trees, as the default ordered-map building block for concurrent code.</p>
            </details>
            <p><strong>Remark:</strong> a skip list is really the <a href="#/subject/algorithmics/data-structures/algo-linked-lists">linked list</a> lesson's central trade-off (cheap insertion, expensive access) fixed by borrowing the same randomization trick that makes <a href="#/subject/algorithmics/data-structures/algo-hashing-universal-families">universal hashing</a> work — accept a small, controlled chance of an unlucky structure in exchange for never needing the rotation machinery of a <a href="#/subject/algorithmics/data-structures/algo-red-black-trees">red-black tree</a>.</p>
            <p><strong>Further reading:</strong> Pugh, "Skip Lists: A Probabilistic Alternative to Balanced Trees," <em>Communications of the ACM</em>, 1990 (the original paper, including the expected-height analysis); Pat Morin, <em>Open Data Structures</em> (free, opendatastructures.org), Ch. 4, "Skiplists," for a fully worked implementation with the expected-cost proofs spelled out; Herlihy & Shavit, <em>The Art of Multiprocessor Programming</em>, revised 1st ed., Ch. 14, for lock-free and lock-based concurrent skip lists.</p>
            <p><em>The whole idea in one line: flip coins to build yourself some express lanes over a sorted list, and skip most of it on every search.</em></p>
          `,
          exercises: [
            "Derive the expected number of levels in a skip list of n elements built with per-level probability p=1/2, and the expected number of nodes examined while searching at any single level. Combine them into the expected O(log n) total search cost.",
            "Design and justify an indexable skip list that supports select(k) — return the k-th smallest element — in O(log n) expected time, by augmenting each forward pointer with a 'width' (the number of bottom-level elements it skips over). Give the update rule for width during insertion."
          ]
        },
        {
          id: "algo-bloom-filters",
          title: "Bloom Filters",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-hashing-universal-families"],
          estMinutes: 20,
          content: `
            <p>A Bloom filter answers "have I possibly seen this before?" in a fixed, tiny amount of memory that never grows with how many elements you've inserted — by giving up the ability to ever say "definitely yes." It only ever says "definitely no" or "probably yes."</p>
            <svg viewBox="0 0 460 160" width="100%" height="160" style="max-width:460px;display:block;margin:0.8rem auto;" role="img" aria-label="Element x hashed by three functions h1, h2, h3 to three positions in a ten-cell bit array, setting those three bits to 1 while the rest stay 0">
              <g font-size="12">
                <circle cx="230" cy="22" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="230" y="27" text-anchor="middle" fill="var(--text)" font-weight="600">x</text>
                <defs><marker id="bfarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
                <line x1="220" y1="36" x2="90" y2="82" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#bfarrow)"/>
                <line x1="230" y1="38" x2="210" y2="82" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#bfarrow)"/>
                <line x1="240" y1="36" x2="330" y2="82" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#bfarrow)"/>
                <text x="120" y="60" fill="var(--text-muted)" font-size="11">h1</text>
                <text x="235" y="65" fill="var(--text-muted)" font-size="11">h2</text>
                <text x="300" y="60" fill="var(--text-muted)" font-size="11">h3</text>
                <g font-size="13" text-anchor="middle">
                  <rect x="30" y="85" width="40" height="34" fill="none" stroke="var(--border)" stroke-width="1.5"/><text x="50" y="107" fill="var(--text-muted)">0</text>
                  <rect x="70" y="85" width="40" height="34" fill="none" stroke="var(--accent)" stroke-width="2"/><text x="90" y="107" fill="var(--text)" font-weight="600">1</text>
                  <rect x="110" y="85" width="40" height="34" fill="none" stroke="var(--border)" stroke-width="1.5"/><text x="130" y="107" fill="var(--text-muted)">0</text>
                  <rect x="150" y="85" width="40" height="34" fill="none" stroke="var(--border)" stroke-width="1.5"/><text x="170" y="107" fill="var(--text-muted)">0</text>
                  <rect x="190" y="85" width="40" height="34" fill="none" stroke="var(--accent)" stroke-width="2"/><text x="210" y="107" fill="var(--text)" font-weight="600">1</text>
                  <rect x="230" y="85" width="40" height="34" fill="none" stroke="var(--border)" stroke-width="1.5"/><text x="250" y="107" fill="var(--text-muted)">0</text>
                  <rect x="270" y="85" width="40" height="34" fill="none" stroke="var(--border)" stroke-width="1.5"/><text x="290" y="107" fill="var(--text-muted)">0</text>
                  <rect x="310" y="85" width="40" height="34" fill="none" stroke="var(--accent)" stroke-width="2"/><text x="330" y="107" fill="var(--text)" font-weight="600">1</text>
                  <rect x="350" y="85" width="40" height="34" fill="none" stroke="var(--border)" stroke-width="1.5"/><text x="370" y="107" fill="var(--text-muted)">0</text>
                  <rect x="390" y="85" width="40" height="34" fill="none" stroke="var(--border)" stroke-width="1.5"/><text x="410" y="107" fill="var(--text-muted)">0</text>
                </g>
                <text x="230" y="140" text-anchor="middle" fill="var(--text-muted)" font-size="11">m-bit array, all bits start at 0</text>
              </g>
            </svg>
            <p>The design is a bit array of size m plus k independent hash functions <code>h₁,…,h_k</code>, each mapping a key to a position in <code>{0,…,m−1}</code>. <code>insert(x)</code> sets all k bits <code>h₁(x),…,h_k(x)</code> to 1 — nothing is ever stored about which key set which bit, and bits are freely shared between keys. <code>query(x)</code> checks the same k positions: if any is 0, x was <em>definitely</em> never inserted (that bit could only be 0 if nothing ever hashed there). If all k are 1, x <em>probably</em> was inserted — but another combination of keys could have set all k of x's bits without x itself ever being added, a <strong>false positive</strong>. The error is entirely one-sided: a false negative is impossible.</p>
            <p>Variants that relax the base design's two hard limits — no deletion, and no way to enumerate members:</p>
            <ul>
              <li><strong>Counting Bloom filter</strong> — replace each bit with a small counter, incremented on insert and decremented on delete; a position is "set" whenever its counter is nonzero. Costs more space per slot and still risks counter overflow.</li>
              <li><strong>Scalable Bloom filter</strong> — chain a growing sequence of filters with tightening false-positive targets, for workloads where n isn't known in advance.</li>
              <li><strong>Cuckoo filter</strong> — a different structure entirely (fingerprints in a cuckoo hash table) that supports deletion natively and typically beats a Bloom filter's space/false-positive trade-off at the same target rate, at the cost of more intricate insertion logic.</li>
            </ul>
            <p><strong>Remark:</strong> the false-positive rate is fixed at construction time by the ratio m/n you sized for — insert far more elements than planned and the array fills with 1s, driving the false-positive rate toward 1 with no warning.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Insert</td><td>O(k)</td><td>set k fixed bit positions, independent of n</td></tr>
              <tr><td>Query</td><td>O(k)</td><td>check the same k positions, independent of n</td></tr>
              <tr><td>Space</td><td>O(m) bits</td><td>fixed at construction; no per-key storage at all, unlike a hash set</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> for m bits, n inserted elements, and k hash functions, roughly what's the false-positive probability — and what choice of k minimizes it for a given m/n?</p>
            <details><summary>Solution</summary>
              <p>After inserting n elements, treat each of the k·n hash evaluations as landing uniformly and independently on one of the m bits (the standard simplifying assumption). The probability a specific bit is still 0 is <code>(1 − 1/m)^{kn} ≈ e^{−kn/m}</code>, so the probability it's 1 is <code>≈ 1 − e^{−kn/m}</code>. A query on an absent element false-positives only if all k of its bits happen to be 1, which — treating those k bits as independent — gives false-positive probability <code>p ≈ (1 − e^{−kn/m})^k</code>. Minimizing p over k (take the derivative of ln p with respect to k and set it to zero) gives the optimum at <code>k = (m/n)·ln 2</code>, and plugging that back in gives the best achievable rate <code>p ≈ (1/2)^k = (0.6185)^{m/n}</code> — the two numbers, m/n and the resulting k, are exactly what you tune when sizing a filter for a target false-positive rate.</p>
            </details>
            <p><strong>Remark:</strong> a Bloom filter is <a href="#/subject/algorithmics/data-structures/algo-hashing-universal-families">hashing</a> pushed to its space-minimal extreme — it throws away the keys entirely and keeps only the union of bit positions they touched, which is exactly why it can't support deletion or enumeration without the extra machinery above. It earns that space back as a cheap pre-filter in front of something expensive: checking a Bloom filter before a disk-resident <a href="#/subject/algorithmics/data-structures/algo-b-trees">B-tree</a> lookup or a network round-trip turns most "definitely not present" queries into an O(k) in-memory check instead of the real, costly lookup.</p>
            <p><strong>Further reading:</strong> Bloom, "Space/Time Trade-offs in Hash Coding with Allowable Errors," <em>Communications of the ACM</em>, 1970 (the original paper); Mitzenmacher & Upfal, <em>Probability and Computing</em>, 2nd ed., Ch. 5, for the rigorous independence-free analysis; Broder & Mitzenmacher, "Network Applications of Bloom Filters: A Survey," <em>Internet Mathematics</em>, 2004, for the counting variant and real deployments (web caches, database engines such as Cassandra and RocksDB using them to skip disk reads).</p>
            <p><em>The whole idea in one line: throw away the keys, keep only the bits they touched, and accept an occasional false "maybe."</em></p>
          `,
          exercises: [
            "Design a counting Bloom filter supporting deletion. State the invariant each counter must maintain relative to the number of currently-inserted keys hashing there, explain precisely how counter overflow breaks the invariant (and hence correctness), and propose a concrete fix with its space cost.",
            "You need to check incoming identifiers against a blacklist of 10^9 entries with a target false-positive rate of 1%. Compute the required array size m and the optimal k using the formulas above, compare the total memory to storing the 10^9 entries in a hash set (assume 8 bytes/entry plus overhead), and state the ratio."
          ]
        },
        {
          id: "algo-kd-trees",
          title: "k-d Trees",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-bst-balance"],
          estMinutes: 28,
          content: `
            <p>A binary search tree orders keys along one axis. What do you do with points that have several coordinates and no single natural order — a set of (x, y) locations, or feature vectors in more dimensions? A <strong>k-d tree</strong> answers by cycling the splitting axis with depth: the root splits the point set on <em>x</em>, its children split on <em>y</em>, the next level back to <em>x</em>, and so on. Each node still partitions its region into two halves exactly like a BST partitions a line into two half-lines — it's the same idea, generalized one dimension at a time.</p>
            <svg viewBox="0 0 220 220" width="100%" height="220" style="max-width:260px;display:block;margin:0.8rem auto;" role="img" aria-label="A square recursively split by one vertical then two horizontal lines, with five points scattered inside">
              <rect x="10" y="10" width="200" height="200" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="90" y1="10" x2="90" y2="210" stroke="var(--accent)" stroke-width="2"/>
              <line x1="10" y1="120" x2="90" y2="120" stroke="var(--text-muted)" stroke-width="1.5"/>
              <line x1="90" y1="70" x2="210" y2="70" stroke="var(--text-muted)" stroke-width="1.5"/>
              <circle cx="50" cy="60" r="3.5" fill="var(--text)"/>
              <circle cx="55" cy="160" r="3.5" fill="var(--text)"/>
              <circle cx="150" cy="40" r="3.5" fill="var(--text)"/>
              <circle cx="160" cy="130" r="3.5" fill="var(--text)"/>
              <circle cx="120" cy="180" r="3.5" fill="var(--text)"/>
            </svg>
            <p>The design follows straight from that goal: at each node, find the median point along the current axis (median-of-medians, or randomized selection — see the <a href="#/subject/algorithmics/algorithms/algo-order-statistics-selection">Order Statistics</a> lesson — gives O(n) per level), partition the remaining points into "below" and "above", and recurse on each half with the axis advanced. This is the same recursive-median idea a balanced BST built from sorted data would use, just cycling which coordinate plays the role of "the key" as depth increases.</p>
            <p>Variants worth knowing:</p>
            <ul>
              <li><strong>Static (median-built)</strong> — as described above; guarantees O(log n) height but requires knowing all points up front.</li>
              <li><strong>Dynamic k-d tree</strong> — supports one-at-a-time insertion (descend and insert like a BST, cycling axis with depth), at the cost that height guarantees degrade without periodic rebalancing.</li>
              <li><strong>Region/range-tree variants</strong> — store bounding boxes at internal nodes instead of single split points, trading a larger structure for faster orthogonal range queries.</li>
            </ul>
            <p><strong>Remark:</strong> in high dimensions the whole approach stops paying off — the "curse of dimensionality" means almost every sibling subtree ends up within pruning distance, and search degrades toward O(n), which is why approximate methods (locality-sensitive hashing, approximate nearest-neighbor libraries) take over past roughly 10-20 dimensions.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Build (n points)</td><td>O(n log n)</td><td>O(n) work per level of the recursion via linear-time median selection, O(log n) levels</td></tr>
              <tr><td>Nearest-neighbor query</td><td>O(log n) average, O(n) worst case</td><td>descend to the query's region, then backtrack — pruning sibling subtrees works well only in low dimensions</td></tr>
              <tr><td>Insert (dynamic)</td><td>O(log n) expected</td><td>same descent as a BST insert, no rebalancing performed</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> nearest-neighbor search must decide whether to also explore the sibling subtree after finding the best point so far in the query's own region. What's the exact test — in terms of the splitting plane — that decides whether the sibling can be skipped?</p>
            <details><summary>Solution</summary>
              <p>Let <em>d</em> be the distance from the query point to the closest point found so far, and let the current node split on some axis at value <em>s</em> (e.g. x = s). The sibling subtree lies entirely on the other side of that plane, so the closest any point in it could possibly be to the query is the perpendicular distance from the query to the plane itself, |query[axis] − s|. If that distance already exceeds <em>d</em>, no point over there can beat what you already have, so the whole sibling subtree is skipped — one comparison prunes however many points it contains. If it's less than <em>d</em>, the sibling might hold something closer and must be searched. This single test is exactly what turns a tree that could be scanned in O(n) into one that (in low dimensions) is searched in O(log n).</p>
            </details>
            <p><strong>Remark:</strong> applications: nearest-neighbor classifiers, 2D/3D range queries in spatial databases and computer graphics (collision detection, ray tracing acceleration structures), and — in the spirit of this course — nearest-neighbor search over multi-factor feature vectors, e.g. finding historically similar market regimes by treating each day's feature vector as a point. The underlying recursive-median idea is the same one that builds a balanced <a href="#/subject/algorithmics/data-structures/algo-bst-balance">binary search tree</a>; a k-d tree is what you get by running that idea once per dimension instead of once, ever.</p>
            <p><strong>Further reading:</strong> Bentley, "Multidimensional Binary Search Trees Used for Associative Searching," <em>CACM</em>, 1975 (the original paper); de Berg, Cheong, van Kreveld & Overmars, <em>Computational Geometry: Algorithms and Applications</em>, 3rd ed., Ch. 5, for the clearest diagrams of the recursive partition and range-query pruning; a step-by-step interactive visualization is available at the University of San Francisco's data structure visualization site (cs.usfca.edu/~galles/visualization) if you want to watch construction and search happen incrementally.</p>
            <p><em>The whole idea in one line: a binary search tree that takes turns deciding which coordinate matters.</em></p>
          `,
          exercises: [
            "Give the O(n log n) algorithm to build a balanced k-d tree by recursively selecting the median along the cycling axis using linear-time selection, and prove the resulting height is O(log n).",
            "Prove that k-d tree nearest-neighbor search can be forced to visit Ω(n) nodes in the worst case, by constructing an adversarial point configuration and query point where pruning never eliminates a subtree."
          ]
        },
        {
          id: "algo-persistent-data-structures",
          title: "Persistent Data Structures",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-bst-balance"],
          estMinutes: 28,
          content: `
            <p>Every structure covered so far mutates in place: once you update it, the previous version is gone. A <strong>persistent</strong> structure keeps every past version accessible after an update — not by copying the whole thing (that would cost O(n) per update, no better than a snapshot), but by sharing everything unchanged and paying only for what's new.</p>
            <p>The technique is <strong>path copying</strong>, and it applies directly to trees. To "modify" a node, allocate a new copy of every node from the root down to that node; each new node's <em>other</em> child pointer — the one leading away from the change — points at the old, untouched subtree, which needs no copy at all since nothing in it changed. For a balanced tree of height O(log n), one logical "new version" costs only O(log n) new nodes, sharing the rest with every prior version, and every old root remains fully valid and independently queryable.</p>
            <svg viewBox="0 0 380 160" width="100%" height="160" style="max-width:420px;display:block;margin:0.8rem auto;" role="img" aria-label="Two tree roots v1 and v2. v1 points to an old node L and a shared node R. v2 points to a new node L prime and the same shared node R.">
              <g font-size="11">
                <circle cx="60" cy="20" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="3,2"/>
                <text x="60" y="24" text-anchor="middle" fill="var(--text-muted)">v1</text>
                <circle cx="300" cy="20" r="14" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="300" y="24" text-anchor="middle" fill="var(--accent)">v2</text>
                <rect x="15" y="100" width="60" height="34" rx="4" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="3,2"/>
                <text x="45" y="121" text-anchor="middle" fill="var(--text-muted)">L (old)</text>
                <rect x="150" y="100" width="60" height="34" rx="4" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="180" y="121" text-anchor="middle" fill="var(--text)">R (shared)</text>
                <rect x="290" y="100" width="60" height="34" rx="4" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="320" y="121" text-anchor="middle" fill="var(--text)">L' (new)</text>
                <line x1="55" y1="32" x2="45" y2="98" stroke="var(--text-muted)" stroke-width="1.5"/>
                <line x1="68" y1="30" x2="175" y2="98" stroke="var(--text-muted)" stroke-width="1.5"/>
                <line x1="300" y1="34" x2="320" y2="98" stroke="var(--accent)" stroke-width="2"/>
                <line x1="290" y1="30" x2="190" y2="98" stroke="var(--accent)" stroke-width="2"/>
              </g>
            </svg>
            <p>Three levels of persistence are worth telling apart, because each needs more machinery than the last:</p>
            <ul>
              <li><strong>Partial persistence</strong> — query any past version, but only update the latest one. Plain path copying, as described above, is already enough.</li>
              <li><strong>Full persistence</strong> — update any past version too, producing a branching tree of versions rather than a line. Needs the fat-node machinery below.</li>
              <li><strong>Confluent persistence</strong> — additionally allows merging two versions into one.</li>
            </ul>
            <p><strong>Remark:</strong> full persistence on structures with only forward pointers needs the fat-node alternative of Driscoll, Sarnak, Sleator, and Tarjan — instead of copying an entire new node, store a small append-only log of {version, value} pairs per modified field, at O(1) extra space per write but O(log #versions) per read to find the right entry.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Update (path copying, height h)</td><td>O(h) new nodes</td><td>only the root-to-node path is copied; every untouched subtree is shared, not duplicated</td></tr>
              <tr><td>Query any past version</td><td>same as the non-persistent structure</td><td>an old root is a fully valid, ordinary tree — nothing about querying it changed</td></tr>
              <tr><td>Space, n updates</td><td>O(n·h) total</td><td>each update adds O(h) new nodes on top of everything already shared</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> a persistent stack (push/pop that never destroys the previous version) is one of the simplest persistent structures to build. How would you implement one so that every past version stays queryable in O(1) extra space per push?</p>
            <details><summary>Solution</summary>
              <p>Represent the stack as a singly linked list where the "top of stack" is the head pointer, and treat each distinct head pointer as a separate version. <code>push(x)</code> on version v allocates one new node whose next-pointer is v's head, and returns the new node as the head of a brand-new version — v itself is untouched, since nothing about its nodes changed. <code>pop</code> on version v simply returns v's head's next-pointer as a new version, again allocating nothing. Every past version remains a valid, independently walkable list, because path copying on a list is trivial: the "path" from the point of change to anything shared is just one node, the new head. This is the linked-list special case of the general BST path-copying idea — the "path" collapses to length 1 because a stack has no branching to preserve.</p>
            </details>
            <p><strong>Remark:</strong> this is not a niche technique. Immutable data in functional programming languages <em>is</em> persistence — "no mutation, but still efficient updates" is precisely the problem path copying solves, which is why functional languages lean so heavily on trees (like the <a href="#/subject/algorithmics/data-structures/algo-bst-balance">balanced BSTs</a> this lesson builds on) rather than arrays. Practical instances: an editor's undo/redo history without storing a full snapshot per keystroke; and a persistent <a href="#/subject/algorithmics/data-structures/algo-segment-fenwick-trees">segment tree</a> answers "what did this range query return as of any past point in time" without rebuilding anything.</p>
            <p><strong>Further reading:</strong> Driscoll, Sarnak, Sleator & Tarjan, "Making Data Structures Persistent," <em>JCSS</em>, 1989 (the foundational paper — defines partial/full/confluent persistence and proves the space/time bounds for the fat-node and node-copying techniques); Okasaki, <em>Purely Functional Data Structures</em>, 1998, Ch. 1-3, for why immutability and persistence are the same idea in a functional setting, with a catalog of structures — leftist heaps, red-black trees, finger trees — built this way from scratch; a step-through visualization of path copying on a BST is available at the Open Data Structures companion site (opendatastructures.org).</p>
            <p><em>The whole idea in one line: never overwrite — share what didn't change, copy only what did.</em></p>
          `,
          exercises: [
            "Implement a partially persistent balanced BST via path copying: insert returns a new root while every earlier root remains valid. Prove the amortized extra space per insert is O(log n), and that querying any past version costs the same asymptotic time as the non-persistent structure.",
            "Explain why path copying alone breaks down for a structure where a node's PARENT pointer must also stay correct (e.g. a doubly linked list, or a tree with parent pointers for LCA queries) — show that a naive approach forces copying the entire structure on every update. Describe, at a high level, what the fat-node technique does differently to avoid this."
          ]
        },
        {
          id: "algo-binary-heaps",
          title: "Binary Heaps and the Linear-Time Build",
          section: "Heaps",
          prerequisites: ["algo-what-is-a-data-structure"],
          estMinutes: 25,
          content: `
            <p>A binary heap is a complete binary tree stored implicitly in an array, with children of index <em>i</em> at <code>2i+1</code>, <code>2i+2</code>. The heap property (parent ≤ both children, for a min-heap) is far weaker than sortedness — it only orders each root-to-leaf path — which is exactly why it is cheap to maintain: SIFT-DOWN and SIFT-UP each touch one path, costing O(log n).</p>
            <p>The instructive result is that BUILD-HEAP on an arbitrary array costs Θ(n), not Θ(n log n). Sifting down from the last internal node upward, a node at height <em>h</em> above the leaves costs O(h), and a heap of <em>n</em> nodes has at most <code>⌈n/2^(h+1)⌉</code> nodes at height <em>h</em>, so total cost is bounded by</p>
            <pre><code>Σ_{h=0}^{⌊log n⌋} ⌈n/2^(h+1)⌉ · O(h)  =  O(n · Σ_{h≥0} h/2^h)  =  O(2n)  =  O(n)</code></pre>
            <p>because Σ h·x^h = x/(1−x)² converges at x = 1/2. Most nodes are cheap leaves; only the few nodes near the root are expensive. Practically, a heap is the priority queue behind Dijkstra, heapsort's in-place guarantee, and streaming top-k over a live order feed; a <em>d</em>-ary heap trades O(log_d n) insert against O(d·log_d n) extract, which matters when decrease-key dominates.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §6.1-6.3 (heap property, sift-down, linear build) and §6.5 (priority queues); Fibonacci heaps in Ch. 19 for the theoretical decrease-key improvement.</p>
          `,
          exercises: [
            "Prove the Θ(n) bound for BUILD-MIN-HEAP rigorously, including the claim that a heap has at most ⌈n/2^(h+1)⌉ nodes at height h. Then prove a matching Ω(n) lower bound for any comparison-based heap construction.",
            "Analyse a d-ary heap: give the exact cost of INSERT and EXTRACT-MIN as functions of d and n, then choose d to minimise the total cost of Dijkstra's algorithm on a graph with V vertices and E edges, and state the resulting bound."
          ]
        },
        {
          id: "algo-priority-queue-adt",
          title: "Priority Queues",
          section: "Heaps",
          prerequisites: ["algo-binary-heaps"],
          estMinutes: 15,
          content: `
            <p>A priority queue is for the workload a plain queue can't serve: service isn't by arrival order, it's by priority. <code>insert(x, priority)</code> and <code>extract-min()</code> (or extract-max) are the whole contract — the binary heap is only the implementation you already met, not the definition.</p>
            <svg viewBox="0 0 480 190" width="100%" height="190" style="max-width:480px;display:block;margin:0.8rem auto;" role="img" aria-label="A Priority Queue ADT box with insert and extract-min, and arrows down to three implementation boxes: unsorted array, sorted array, and binary heap, each showing the cost of the two operations">
              <rect x="150" y="10" width="180" height="55" rx="8" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="240" y="33" text-anchor="middle" fill="var(--text)" font-size="13" font-weight="600">Priority Queue ADT</text>
              <text x="240" y="52" text-anchor="middle" fill="var(--text-muted)" font-size="11">insert(x)   extract-min()</text>
              <line x1="190" y1="65" x2="70" y2="118" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="240" y1="65" x2="240" y2="118" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="290" y1="65" x2="410" y2="118" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="5" y="120" width="150" height="62" rx="8" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <text x="80" y="142" text-anchor="middle" fill="var(--text)" font-size="12" font-weight="600">Unsorted array</text>
              <text x="80" y="160" text-anchor="middle" fill="var(--text-muted)" font-size="11">insert: O(1)</text>
              <text x="80" y="176" text-anchor="middle" fill="var(--text-muted)" font-size="11">extract-min: O(n)</text>
              <rect x="165" y="120" width="150" height="62" rx="8" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <text x="240" y="142" text-anchor="middle" fill="var(--text)" font-size="12" font-weight="600">Sorted array</text>
              <text x="240" y="160" text-anchor="middle" fill="var(--text-muted)" font-size="11">insert: O(n)</text>
              <text x="240" y="176" text-anchor="middle" fill="var(--text-muted)" font-size="11">extract-min: O(1)</text>
              <rect x="325" y="120" width="150" height="62" rx="8" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="400" y="142" text-anchor="middle" fill="var(--text)" font-size="12" font-weight="600">Binary heap</text>
              <text x="400" y="160" text-anchor="middle" fill="var(--text-muted)" font-size="11">insert: O(log n)</text>
              <text x="400" y="176" text-anchor="middle" fill="var(--text-muted)" font-size="11">extract-min: O(log n)</text>
            </svg>
            <p>The design question a priority queue implementation answers is exactly the one from the very first lesson of this chapter: where do you park the cost? An unsorted array defers all the work to extraction (scan everything to find the minimum); a sorted array pays it all up front, at insertion (shift elements to keep order); the heap is the implementation that refuses to fully commit either way, keeping just enough order (the heap property, not full sortedness) to make both operations O(log n).</p>
            <p>Real uses add a third operation the plain contract doesn't mention:</p>
            <ul>
              <li><strong>decrease-key(x, new priority)</strong> — lower an already-queued element's priority in place. This is what <a href="#/subject/algorithmics/graph-algorithms/algo-dijkstra">Dijkstra's algorithm</a> calls every time it finds a shorter path to a vertex already in the queue, and a binary heap only supports it in O(log n) if you separately track each element's array index as it moves during sifting.</li>
              <li><strong>merge(Q1, Q2)</strong> — combine two priority queues into one. A binary heap can't do this efficiently (O(n) to rebuild); this is precisely the gap the next lesson's Fibonacci heap is built to close.</li>
              <li><strong>Bounded / integer-priority variants</strong> — when priorities are small integers, a bucket queue (array of buckets, one per priority value) gives O(1) insert and decrease-key; van Emde Boas trees, two lessons ahead, push a bounded integer universe further, to O(log log u).</li>
            </ul>
            <p><strong>Remark:</strong> "priority queue" and "heap" are used interchangeably so often in casual conversation that it's worth deliberately keeping them apart in your head — exactly as the What Is a Data Structure lesson urged for every ADT/implementation pair.</p>
            <table class="mini-table">
              <tr><th>Implementation</th><th>Insert</th><th>Extract-min</th><th>Why</th></tr>
              <tr><td>Unsorted array</td><td>O(1)</td><td>O(n)</td><td>append is free; finding the min needs a full scan</td></tr>
              <tr><td>Sorted array</td><td>O(n)</td><td>O(1)</td><td>min is always at the front; inserting anywhere else shifts elements</td></tr>
              <tr><td>Binary heap</td><td>O(log n)</td><td>O(log n)</td><td>only one root-to-leaf path is touched per operation</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> you're given k already-sorted lists totaling n elements and asked to merge them into one sorted output. How does a priority queue give an O(n log k) algorithm, and why is that better than the obvious O(nk) approach of repeatedly scanning all k list-heads for the minimum?</p>
            <details><summary>Solution</summary>
              <p>Put the first element of each of the k lists into a priority queue, tagged with which list it came from. Repeatedly extract-min, output it, and insert the next element from that same list (if any) back into the queue. Each of the n elements is inserted once and extracted once, and the queue never holds more than k elements at a time, so the total cost is n extract-min/insert pairs at O(log k) each — O(n log k) overall. The naive approach re-scans all k heads on every single output element, paying O(k) every time regardless of how large k is relative to the current state; the priority queue instead keeps exactly enough order (the heap property over the k current candidates) to find the next minimum in O(log k) instead of O(k). This is precisely how external merge sort combines sorted runs, and how many databases execute a merge join across multiple sorted inputs.</p>
            </details>
            <p><strong>Remark:</strong> the ADT/implementation split pays off concretely here — code written against "priority queue" rather than "binary heap" can be handed a <a href="#/subject/algorithmics/data-structures/algo-fibonacci-heap">Fibonacci heap</a> later, dropping Dijkstra's total running time from O((V+E) log V) to O(E + V log V), without changing a single line outside the queue's own implementation.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §6.5 (priority queues built on binary heaps, including the decrease-key-via-index-tracking implementation); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §2.4, for the sorted/unsorted-array comparison table and the k-way-merge application worked in code.</p>
            <p><em>The whole idea in one line: "next by priority" is a different contract from "next in line," and it's worth naming separately from whatever happens to implement it.</em></p>
          `,
          exercises: [
            "A bucket queue stores elements whose priorities are integers in {0,…,C} as an array of C+1 buckets (each a simple list), plus a pointer to the lowest nonempty bucket. Give insert, extract-min, and decrease-key for this structure, state their costs, and explain why this beats a binary heap when C = O(n) but loses to it badly when C is exponential in n.",
            "Prove that any comparison-based priority queue implementation must take Ω(log n) time for extract-min in the worst case, by reduction from the Ω(n log n) comparison-sorting lower bound (repeated insert followed by repeated extract-min sorts n elements)."
          ]
        },
        {
          id: "algo-fibonacci-heap",
          title: "Fibonacci Heaps",
          section: "Heaps",
          prerequisites: ["algo-priority-queue-adt", "algo-amortized-potential-method"],
          estMinutes: 40,
          content: `
            <p>A Fibonacci heap exists for one reason: to make <code>decrease-key</code> cheap. A binary heap already does insert and extract-min in O(log n); the only operation left to improve is the one <a href="#/subject/algorithmics/graph-algorithms/algo-dijkstra">Dijkstra</a> and Prim call once per edge, and shaving it down changes those algorithms' total running time, not just a constant factor.</p>
            <svg viewBox="0 0 480 210" width="100%" height="210" style="max-width:480px;display:block;margin:0.8rem auto;" role="img" aria-label="A root list of three trees connected by a dashed line, a min pointer to the smallest root, and one root with a child node marked to indicate it has already lost one child">
              <g font-size="12">
                <text x="80" y="18" text-anchor="middle" fill="var(--accent)" font-size="11">min</text>
                <defs><marker id="fharrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
                <line x1="80" y1="22" x2="80" y2="38" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#fharrow)"/>
                <line x1="80" y1="52" x2="400" y2="52" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3"/>
                <circle cx="80" cy="52" r="18" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="80" y="57" text-anchor="middle" fill="var(--text)">5</text>
                <circle cx="240" cy="52" r="18" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <text x="240" y="57" text-anchor="middle" fill="var(--text)">9</text>
                <circle cx="400" cy="52" r="18" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <text x="400" y="57" text-anchor="middle" fill="var(--text)">12</text>
                <line x1="240" y1="70" x2="220" y2="112" stroke="var(--text-muted)" stroke-width="1.5"/>
                <line x1="240" y1="70" x2="270" y2="112" stroke="var(--text-muted)" stroke-width="1.5"/>
                <circle cx="220" cy="128" r="15" fill="none" stroke="var(--text)" stroke-width="1.5"/>
                <text x="220" y="133" text-anchor="middle" fill="var(--text)">14</text>
                <circle cx="270" cy="128" r="15" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="2,2"/>
                <text x="270" y="133" text-anchor="middle" fill="var(--text)">17</text>
                <text x="270" y="160" text-anchor="middle" fill="var(--text-muted)" font-size="10">marked</text>
                <text x="270" y="174" text-anchor="middle" fill="var(--text-muted)" font-size="10">(already lost a child)</text>
              </g>
            </svg>
            <p>The design is a heap-ordered <strong>forest</strong>, not a single tree: a circular doubly linked <strong>root list</strong> with a pointer kept to the current minimum root. The forest stays deliberately messy for as long as possible — every operation except extract-min does the least work it can get away with, and the mess is only cleaned up when extract-min is forced to look for the new minimum anyway:</p>
            <ul>
              <li><strong>insert(x)</strong> — splice a new singleton tree into the root list. O(1), no rebalancing.</li>
              <li><strong>merge(H1, H2)</strong> — splice one root list onto the other and keep whichever min pointer is smaller. O(1) — this is the operation a binary heap cannot do cheaply at all.</li>
              <li><strong>decrease-key(x, k)</strong> — lower x's key. If x now violates heap order under its parent, <strong>cut</strong> x free and add it to the root list as a new tree — O(1). If x's parent was already <strong>marked</strong> (meaning it has already lost one child since it was last made a root), cut the parent too, and recurse upward: this is the <strong>cascading cut</strong>. A node is marked the first time it loses a child, and unmarked when it becomes a root; the marking is exactly the bookkeeping needed to keep trees from becoming too shallow relative to their size.</li>
              <li><strong>extract-min()</strong> — remove the min root, splice its children into the root list, then <strong>consolidate</strong>: repeatedly union any two root trees of equal degree (linking the larger key under the smaller) until every remaining root has a distinct degree — exactly like the carrying step of binary-counter addition. This is the one operation that actually pays down the debt every lazy insert and cut left behind.</li>
            </ul>
            <p><strong>Remark:</strong> the structure is named for the Fibonacci numbers that appear in the proof bounding maximum node degree — cascading cuts keep any tree from becoming "too thin for its size," which forces every node of degree k to have at least F<sub>k+2</sub> descendants, and hence bounds the maximum degree (and so extract-min's consolidation cost) at O(log n).</p>
            <p>All of this is proved with the potential-method machinery from two lessons back, using <code>Φ(H) = t(H) + 2·m(H)</code>, where t is the number of trees in the root list and m is the number of marked nodes:</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Amortized cost</th><th>Why</th></tr>
              <tr><td>Insert, merge, find-min</td><td>O(1)</td><td>pure splicing; Φ rises by exactly 1 per new root, paying for the O(1) actual work</td></tr>
              <tr><td>Decrease-key</td><td>O(1)</td><td>each cut raises t by 1 but can lower m by 1 (unmarking on cut), so ĉ stays O(1) even under a long cascade</td></tr>
              <tr><td>Extract-min</td><td>O(log n)</td><td>consolidation touches O(t) trees, but the resulting drop in Φ (t falls to O(log n)) pays for all the deferred work</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> decrease-key can trigger a cascade of cuts all the way up a tree. Using Φ = t(H) + 2m(H), show that even a cascade of length c still costs only O(1) amortized, not O(c).</p>
            <details><summary>Solution</summary>
              <p>Say a decrease-key triggers c cuts before the cascade stops (the c-th cut hits either an unmarked node, which just gets marked and stops, or a root). Each cut is O(1) actual work and adds one tree to the root list, so the actual cost is O(c) and t(H) increases by c, but every cut except possibly the last also removes a mark from the node being cut (it was marked, that's why the cascade continued; cutting it makes it a root, and roots are unmarked), so m(H) decreases by at least c−1. The potential change is therefore roughly <code>Δt + 2·Δm ≈ c + 2·(−(c−1)) = 2 − c</code>. Amortized cost is actual cost plus potential change: <code>O(c) + (2 − c) = O(1)</code> — the c−1 units of dropped potential exactly absorb the c−1 extra cuts, leaving only a constant. The mark bit is doing all the work here: it's a receipt proving "this node already spent one free pass," so the second loss must be charged for immediately rather than deferred again.</p>
            </details>
            <p><strong>Remark:</strong> the constants hidden inside that O(1) and O(log n) are large enough — and cache behavior is bad enough, since a Fibonacci heap is even more pointer-chasing than an ordinary <a href="#/subject/algorithmics/data-structures/algo-linked-lists">linked list</a> — that a plain <a href="#/subject/algorithmics/data-structures/algo-binary-heaps">binary heap</a> usually wins in practice unless E is asymptotically much larger than V log V; the Fibonacci heap's real legacy is proving the O(E + V log V) bound for Dijkstra is achievable at all, and the potential-method technique it popularized.</p>
            <p><strong>Further reading:</strong> Fredman & Tarjan, "Fibonacci Heaps and Their Uses in Improved Network Optimization Algorithms," <em>Journal of the ACM</em>, 1987 (the original paper); CLRS, 3rd ed., Ch. 19, for the full potential-method proof of every bound in the table above; Fredman, Sedgewick, Sleator & Tarjan, "The Pairing Heap: A New Form of Self-Adjusting Heap," <em>Algorithmica</em>, 1986, for the simpler, empirically faster alternative with a messier theoretical history.</p>
            <p><em>The whole idea in one line: procrastinate on tidying the forest until extract-min is forced to look anyway, and let a potential function prove the procrastination was free.</em></p>
          `,
          exercises: [
            "Prove that a node of degree k in a Fibonacci heap has at least F_{k+2} descendants (including itself), where F is the Fibonacci sequence, using the fact that a node can have lost at most one child since becoming a child itself. Conclude that the maximum degree of any node is O(log n).",
            "Using the O(log n) max-degree bound from the previous exercise and the potential function Φ = t(H) + 2m(H), prove that extract-min runs in O(log n) amortized time, accounting separately for the cost of splicing in the removed root's children and the cost of the consolidation loop."
          ]
        },
        {
          id: "algo-van-emde-boas",
          title: "Van Emde Boas Trees",
          section: "Heaps",
          prerequisites: ["algo-priority-queue-adt", "algo-hashing-universal-families"],
          estMinutes: 35,
          content: `
            <p>A van Emde Boas tree is a priority queue for the one case a comparison-based heap can't exploit: keys that are small integers. Given that the universe is exactly {0, 1, …, u−1}, it gets insert, delete, and successor down to O(log log u) — provably impossible for any structure that only compares keys, since comparison sorting is Ω(n log n).</p>
            <svg viewBox="0 0 480 230" width="100%" height="230" style="max-width:480px;display:block;margin:0.8rem auto;" role="img" aria-label="A VEB(16) box holding min 2 and max 14, with an arrow down to a small summary structure marking clusters 0, 2, and 3 as nonempty, and arrows down to four cluster boxes VEB(4), of which cluster 1 is empty">
              <g font-size="12" text-anchor="middle">
                <rect x="150" y="10" width="180" height="40" rx="6" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="240" y="35" fill="var(--text)" font-weight="600">VEB(16): min=2, max=14</text>
                <line x1="200" y1="50" x2="130" y2="88" stroke="var(--border)" stroke-width="1.5"/>
                <rect x="40" y="90" width="180" height="34" rx="6" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="130" y="98" fill="var(--text-muted)" font-size="10">summary: VEB(4)</text>
                <circle cx="70" cy="112" r="7" fill="var(--accent)"/>
                <circle cx="105" cy="112" r="7" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="140" cy="112" r="7" fill="var(--accent)"/>
                <circle cx="175" cy="112" r="7" fill="var(--accent)"/>
                <line x1="280" y1="50" x2="280" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                <rect x="20" y="145" width="100" height="60" rx="6" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="70" y="163" fill="var(--text)" font-size="11">cluster 0</text>
                <text x="70" y="180" fill="var(--text-muted)" font-size="10">VEB(4)</text>
                <text x="70" y="196" fill="var(--text-muted)" font-size="10">{2, 3}</text>
                <rect x="130" y="145" width="100" height="60" rx="6" fill="none" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="3,3"/>
                <text x="180" y="163" fill="var(--text-muted)" font-size="11">cluster 1</text>
                <text x="180" y="180" fill="var(--text-muted)" font-size="10">VEB(4)</text>
                <text x="180" y="196" fill="var(--text-muted)" font-size="10">empty</text>
                <rect x="240" y="145" width="100" height="60" rx="6" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="290" y="163" fill="var(--text)" font-size="11">cluster 2</text>
                <text x="290" y="180" fill="var(--text-muted)" font-size="10">VEB(4)</text>
                <text x="290" y="196" fill="var(--text-muted)" font-size="10">{9}</text>
                <rect x="350" y="145" width="100" height="60" rx="6" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="400" y="163" fill="var(--text)" font-size="11">cluster 3</text>
                <text x="400" y="180" fill="var(--text-muted)" font-size="10">VEB(4)</text>
                <text x="400" y="196" fill="var(--text-muted)" font-size="10">{14}</text>
              </g>
            </svg>
            <p>The design is recursion on the universe size, not on the key set. Split each key x into a cluster index <code>high(x) = ⌊x / √u⌋</code> and a position within that cluster <code>low(x) = x mod √u</code>. A VEB structure of universe size u then holds three things: a <code>min</code> and <code>max</code> field storing actual values, a <code>summary</code> — itself a VEB structure of size √u, tracking which of the √u clusters are nonempty — and √u <code>cluster</code> structures, each a VEB of size √u holding the low bits of whatever fell into it. Recursing on √u instead of on the n keys is what buys the bound: the recursion depth is the number of times you can take a square root of u before reaching a base case, which is <code>log₂(log₂ u)</code>.</p>
            <p>One trick makes the recursion actually cheap rather than just shallow: <code>min</code> is never inserted into the substructures. When inserting into an empty VEB, just set <code>min = max = x</code> and stop — no recursive call at all. When inserting into a nonempty one, if x is smaller than the current min, swap x with min first, so it's the <em>old</em> min that gets pushed down into a cluster. Either way, the value that actually recurses ends up going into a single cluster (updating its low bits) and, only if that cluster was previously empty, into the summary (to mark it nonempty) — and inserting into an empty structure is the O(1) base case again. So the recursion never runs deeper than one real cluster-insert plus one possible summary-insert per level, both of which are the same VEB operation one level down, giving the recurrence <code>T(u) = T(√u) + O(1)</code>.</p>
            <p>Two things the picture doesn't show, worth naming as variants:</p>
            <ul>
              <li><strong>Deletion</strong> mirrors insertion's asymmetry: removing the current min means pulling up the new minimum from whatever cluster holds it (a successor query one level down), then deleting that value from the cluster and, if the cluster is now empty, from the summary — still O(log log u), just with more bookkeeping than insertion.</li>
              <li><strong>Hash-table-backed (van Emde Boas + hashing)</strong> — the scheme above allocates all √u cluster slots up front, so a structure over universe u costs Θ(u) space even holding a single element. Replacing the array of cluster pointers with a <a href="#/subject/algorithmics/data-structures/algo-hashing-universal-families">hash table</a> keyed by cluster index, storing only clusters that actually have something in them, brings space down to O(n) while keeping insert/delete/successor at expected O(log log u).</li>
            </ul>
            <p><strong>Remark:</strong> the universe u must be fixed and known in advance (and, for the clean recursion, a power of a power of two) — this is not a general-purpose replacement for a balanced BST, it's the right tool specifically when keys are, say, 32-bit integers or IDs from a bounded range.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Minimum / maximum</td><td>O(1)</td><td>cached directly in the top structure's min/max fields</td></tr>
              <tr><td>Insert / delete</td><td>O(log log u)</td><td>the min-elision trick limits real recursive work to one cluster and, sometimes, the summary, per level</td></tr>
              <tr><td>Successor / predecessor</td><td>O(log log u)</td><td>check the current cluster, else consult the summary for the next nonempty one — same one-level-down recursion</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> given x, how does successor(x) find the next key present in a VEB structure in O(log log u) time?</p>
            <details><summary>Solution</summary>
              <p>If x &lt; max, the answer lives in this structure. First check whether x's own cluster, <code>high(x)</code>, holds something bigger than <code>low(x)</code> — if so, the successor is that cluster's successor of <code>low(x)</code>, recombined as <code>high(x)·√u + (successor within cluster)</code>. If that cluster has nothing bigger, the answer must be the <em>minimum</em> of some later cluster — and finding which later cluster is nonempty is exactly a successor query on <code>summary</code>, one level down, applied to <code>high(x)</code>. Either branch makes exactly one recursive call into a structure of size √u, so the recursion is the same <code>T(u) = T(√u) + O(1)</code> as insertion, and it bottoms out at O(log log u).</p>
            </details>
            <p><strong>Remark:</strong> O(log log u) beats the <a href="#/subject/algorithmics/data-structures/algo-fibonacci-heap">Fibonacci heap</a>'s O(log n) decrease-key and any comparison-based structure outright, but only when u is small enough that log log u actually beats log n in practice (u in the billions still gives log log u ≈ 5) and the Θ(u)-or-hashed space cost is acceptable — for arbitrary comparable keys with no bound on their range, none of this applies.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 20 (the full recursive structure, including the deletion case analysis); van Emde Boas, P., "Preserving Order in a Forest in Less Than Logarithmic Time," FOCS 1975 (the original result); van Emde Boas, P., Kaas, R., & Zijlstra, E., "Design and Implementation of an Efficient Priority Queue," <em>Mathematical Systems Theory</em>, 10(1), 1977 (the full recursive construction as taught today); Mehlhorn, K. & Näher, S., "Bounded Ordered Dictionaries in O(log log N) Time and O(n) Space," <em>Information Processing Letters</em>, 35(4), 1990 (the hash-table-backed O(n)-space variant).</p>
            <p><em>The whole idea in one line: split the universe by square roots instead of comparing keys, and recursion depth becomes log log u instead of log n.</em></p>
          `,
          exercises: [
            "Solve the recurrence T(u) = T(√u) + O(1) exactly: substitute m = log₂ u to turn the square-root recursion into a halving recursion, and show the solution is Θ(log log u). Then explain in one sentence why a universe of u = 2^32 gives log log u ≈ 5 in practice.",
            "The naive recursive scheme allocates one cluster slot per possible cluster index up front. Prove this costs Θ(u) space regardless of how many keys n are actually stored, even for n = 1. Then describe precisely how replacing the cluster array with a hash table changes each of insert, delete, and successor, and argue why the O(log log u) time bound survives (in expectation) even though lookups are now hashed rather than direct-indexed."
          ]
        },
        {
          id: "algo-dynamic-arrays-amortization",
          title: "Dynamic Arrays: Growth Factors and Amortized Cost",
          section: "Amortized Structures",
          prerequisites: ["algo-amortized-potential-method", "algo-what-is-a-data-structure"],
          estMinutes: 25,
          content: `
            <p>A dynamic array (Python's <code>list</code>, C++ <code>vector</code>, NumPy's <code>resize</code> path) stores <em>n</em> elements in a buffer of capacity <em>m ≥ n</em>. When an append overflows, a new buffer of capacity <em>γm</em> is allocated and everything is copied. With Φ = 2n − m (valid whenever the table is at least half full), each append has amortized cost O(1): the doubling copy of <em>m</em> elements is exactly paid for by the potential accumulated since the last resize.</p>
            <p>The growth factor γ is the design knob. Any γ &gt; 1 gives O(1) amortized append, since total copy work across resizes is a geometric series <code>n(1 + 1/γ + 1/γ² + …) = n·γ/(γ−1)</code>. Shrinking is subtler: halving capacity as soon as the array falls below half full admits a fill/delete/fill/delete adversary forcing Θ(n) per operation. Shrinking only below the one-quarter threshold restores O(1) amortized cost, because it leaves slack that must be consumed before the next resize.</p>
            <table class="mini-table">
              <tr><th>γ</th><th>Total copies for n appends</th><th>Peak memory overhead</th></tr>
              <tr><td>2</td><td>≈ 2n</td><td>up to 100%</td></tr>
              <tr><td>1.5</td><td>≈ 3n</td><td>up to 50%</td></tr>
              <tr><td>1.125</td><td>≈ 9n</td><td>up to 12.5%</td></tr>
            </table>
            <p>The same time-versus-space tension governs hash-table load factors and, later, the choice of preallocating a NumPy result array versus growing a Python list inside a backtest loop.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §17.4 (dynamic tables, including table contraction).</p>
          `,
          exercises: [
            "Prove that a dynamic array which doubles on overflow and halves when the array becomes exactly half empty admits a sequence of n operations costing Θ(n²) in total. Then prove the quarter-threshold variant is O(1) amortized using an explicit potential function that is 0 immediately after any resize.",
            "For growth factor γ, derive the exact expected memory overhead ratio and the exact number of element copies per append, both as functions of γ. Then argue quantitatively which γ you would pick for an append-only array of float64 tick data holding 10^9 rows, and why."
          ]
        },
        {
          id: "algo-union-find",
          title: "Union-Find: Path Compression and the Inverse Ackermann Bound",
          section: "Amortized Structures",
          prerequisites: ["algo-amortized-potential-method", "algo-what-is-a-data-structure"],
          estMinutes: 30,
          content: `
            <p>Disjoint-set union maintains a partition under MAKE-SET, UNION, and FIND-SET. Represented as a forest with each tree a set and its root the representative, two independent heuristics make it nearly free:</p>
            <ul>
              <li><strong>Union by rank</strong> — attach the shorter tree under the taller. Alone this bounds height by O(log n), since a rank-<em>r</em> root has at least <code>2^r</code> descendants.</li>
              <li><strong>Path compression</strong> — on FIND, re-parent every node on the path directly to the root. Alone this gives O(log n) amortized.</li>
            </ul>
            <p>Together, <em>m</em> operations on <em>n</em> elements cost <code>O(m · α(n))</code> where α is the inverse Ackermann function — below 5 for any <em>n</em> that fits in the physical universe, but provably not constant (Fredman-Saks). The proof is a sophisticated potential/accounting argument that partitions nodes into rank blocks and charges path-compression work to the block structure.</p>
            <p>The structure is the engine behind Kruskal's MST, connected-component labelling, and — relevant later — grouping cointegrated instruments into clusters, or maintaining equivalence classes of tickers across corporate actions and symbol changes when cleaning historical data.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 21, with §21.3 for the heuristics and §21.4 for the full O(m α(n)) analysis.</p>
          `,
          exercises: [
            "Prove that union by rank alone gives worst-case O(log n) per operation, by showing that any root of rank r has at least 2^r descendants. Then construct a sequence of unions and finds showing this is tight.",
            "Prove that path compression alone (no union by rank) gives O(log n) amortized cost per operation using a potential function of your choice. Then implement both heuristics and empirically measure average path length for 10^6 random unions — does it match the α(n) prediction?"
          ]
        },
        {
          id: "algo-segment-fenwick-trees",
          title: "Segment Trees and Fenwick Trees",
          section: "Range Query Structures",
          prerequisites: ["algo-binary-heaps"],
          estMinutes: 30,
          content: `
            <p>These two structures answer the same question: given an array that changes over time, compute an aggregate — sum, minimum, maximum, gcd — over an arbitrary range [l, r) in less than the O(n) it takes to just walk the range every time. Both get updates and range queries down to O(log n).</p>
            <svg viewBox="0 0 460 190" width="100%" height="190" style="max-width:460px;display:block;margin:0.8rem auto;" role="img" aria-label="A segment tree over the array 1, 3, 5, 7: the root covers indices 0 to 3 with sum 16, splitting into a left child covering 0 to 1 with sum 4 and a right child covering 2 to 3 with sum 12, each splitting further into the four leaves holding 1, 3, 5, and 7">
              <g font-size="12" text-anchor="middle">
                <line x1="230" y1="40" x2="120" y2="90" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="230" y1="40" x2="340" y2="90" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="120" y1="106" x2="60" y2="150" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="120" y1="106" x2="180" y2="150" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="340" y1="106" x2="280" y2="150" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="340" y1="106" x2="400" y2="150" stroke="var(--border)" stroke-width="1.5"/>
                <rect x="160" y="10" width="140" height="34" rx="6" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="230" y="32" fill="var(--text)">[0,3]  sum=16</text>
                <rect x="55" y="76" width="130" height="34" rx="6" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="120" y="98" fill="var(--text)" font-size="11">[0,1]  sum=4</text>
                <rect x="275" y="76" width="130" height="34" rx="6" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="340" y="98" fill="var(--text)" font-size="11">[2,3]  sum=12</text>
                <rect x="30" y="152" width="60" height="32" rx="4" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="60" y="172" fill="var(--text-muted)" font-size="11">[0,0]=1</text>
                <rect x="150" y="152" width="60" height="32" rx="4" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="180" y="172" fill="var(--text-muted)" font-size="11">[1,1]=3</text>
                <rect x="250" y="152" width="60" height="32" rx="4" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="280" y="172" fill="var(--text-muted)" font-size="11">[2,2]=5</text>
                <rect x="370" y="152" width="60" height="32" rx="4" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="400" y="172" fill="var(--text-muted)" font-size="11">[3,3]=7</text>
              </g>
            </svg>
            <p>The design is divide-and-conquer, precomputed. Each node of a segment tree stores the aggregate of a fixed range, and every range that ever gets queried decomposes into O(log n) of these precomputed nodes — never more, because a node's range is always exactly the union of its two children's ranges, the same halving structure as merge sort's recursion tree. A range query walks down from the root, at each node either taking the whole precomputed aggregate (if the node's range sits entirely inside the query) or recursing into one or both children (if it straddles the boundary); a point update walks a single root-to-leaf path, recombining every ancestor's aggregate on the way back up. Both are O(log n) for the same reason a heap's sift is: only one path, or a small fixed number of paths, is ever touched.</p>
            <p>Same idea, three implementations with different trade-offs:</p>
            <ul>
              <li><strong>Array-backed segment tree</strong> — store the tree implicitly in an array with node i's children at 2i+1, 2i+2, exactly the <a href="#/subject/algorithmics/data-structures/algo-binary-heaps">binary heap</a>'s layout, sized about 4n to stay a power of two. Simple, cache-friendlier than pointers, the standard choice.</li>
              <li><strong>Lazy propagation</strong> — extends the same tree to handle <em>range</em> updates (add v to every element in [l, r)) in O(log n) too, instead of O(n): a pending update is parked at the highest node it fully covers and only pushed down to children the next time a query actually needs to look inside them.</li>
              <li><strong>Fenwick tree (binary indexed tree)</strong> — a completely different, much smaller structure for the special case of prefix-invertible aggregates like sum or xor. One array of size n, no explicit tree at all: index i is responsible for a range of size <code>lowbit(i) = i &amp; −i</code>, so a point update walks up by repeatedly adding the lowbit, and a prefix query walks down by repeatedly subtracting it — both O(log n), in a handful of lines and a much smaller constant factor than a segment tree.</li>
            </ul>
            <p><strong>Remark:</strong> a Fenwick tree's compactness comes from a narrower contract — it only works for aggregates with an inverse (sum and xor, not min or max), whereas a segment tree's combine function just needs to be associative, which is why min/max/gcd range queries always go through a segment tree, never a Fenwick tree.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Segment tree</th><th>Fenwick tree</th><th>Why</th></tr>
              <tr><td>Point update</td><td>O(log n)</td><td>O(log n)</td><td>one root-to-leaf path, or one lowbit-climbing chain, is recombined</td></tr>
              <tr><td>Range query</td><td>O(log n)</td><td>O(log n)</td><td>the range decomposes into O(log n) precomputed pieces either way</td></tr>
              <tr><td>Range update (add v to a range)</td><td>O(log n) with lazy propagation</td><td>O(log n) with a second Fenwick tree</td><td>both need one extra trick beyond the base structure to avoid touching every element</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> given an array of n distinct numbers, how would you count the number of inversions (pairs i &lt; j with a[i] &gt; a[j]) in O(n log n) time using a Fenwick tree?</p>
            <details><summary>Solution</summary>
              <p>Coordinate-compress the values to ranks 1..n. Build a Fenwick tree of size n, initially all zero, supporting point-update (add 1 at a rank) and prefix-sum-query (count of ranks ≤ k inserted so far). Sweep the array from right to left; for each element, first query the prefix sum up to <code>rank(a[i]) − 1</code> — that count is exactly the number of elements already seen (i.e. to the right of i) with a smaller value, which is precisely the number of inversions with this i as the left index — add it to the running total, then insert <code>rank(a[i])</code>. Each element does one O(log n) query and one O(log n) update, for O(n log n) total: the same bound as the merge-sort-based approach, but built from the "count how many smaller things I've seen so far" primitive instead of a modified merge step.</p>
            </details>
            <p><strong>Remark:</strong> both structures answer only <em>fixed-index-range</em> queries over an array laid out in advance — a <a href="#/subject/algorithmics/data-structures/algo-bst-balance">balanced BST</a> augmented with subtree aggregates (an order-statistics tree) answers a similar family of queries over a dynamic, arbitrarily-ordered key set, at the cost of pointer-chasing instead of array indexing; reach for a segment or Fenwick tree specifically when the index range is fixed and known ahead of time.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 14 (augmenting data structures — the general technique of attaching extra information to a balanced structure, of which range-aggregate trees are one instance); Fenwick, P.M., "A New Data Structure for Cumulative Frequency Tables," <em>Software: Practice and Experience</em>, 24(3), 1994 (the original binary indexed tree paper); de Berg, Cheong, van Kreveld & Overmars, <em>Computational Geometry: Algorithms and Applications</em>, 3rd ed., §10.3 (the segment tree in its original geometric range-query setting).</p>
            <p><em>The whole idea in one line: precompute every canonical range once, and any longer range is just a handful of them stitched together.</em></p>
          `,
          exercises: [
            "Implement lazy propagation for a range-add / range-sum-query segment tree: give the exact pending-update field, the push-down rule applied before recursing into children, and the push-up rule applied after. Prove that both range-update and range-query still cost O(log n) despite the deferred work.",
            "Prove that any range [l, r) over an array of size n decomposes into O(log n) canonical segment-tree nodes during a query, by induction on the recursion. Then derive the exact worst-case count of such nodes as a function of n (it is not simply ⌈log₂ n⌉ — work out why a query can touch roughly twice that many)."
          ]
        },
        {
          id: "algo-tries",
          title: "Tries: Complexity Measured in Key Length",
          section: "Tries",
          prerequisites: ["algo-what-is-a-data-structure"],
          estMinutes: 25,
          content: `
            <p>A trie indexes by the structure of the key rather than by comparisons between keys. The path from the root spells the key, so a lookup costs O(L) character inspections for a key of length L, <em>independent of n</em>. This escapes the Ω(log n) comparison bound not by magic but by changing the model: the algorithm inspects pieces of keys rather than performing whole-key comparisons.</p>
            <p>The tradeoffs are the point. A trie gives prefix enumeration, longest-prefix match, and lexicographic order for free — a hash table gives none of these — but a naive array-of-256-children node wastes enormous space on sparse data. Compressed variants fix this: a radix (Patricia) trie contracts non-branching chains into single edges, giving O(number of distinct keys) nodes; ternary search tries store three children per node and behave like a BST on characters.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Hash table</th><th>Balanced BST</th><th>Trie</th></tr>
              <tr><td>Lookup</td><td>O(L) expected</td><td>O(L log n)</td><td>O(L) worst case</td></tr>
              <tr><td>Prefix query</td><td>impossible</td><td>O(L log n + k)</td><td>O(L + k)</td></tr>
              <tr><td>Ordered iteration</td><td>no</td><td>yes</td><td>yes</td></tr>
            </table>
            <p>Concretely: symbol/ticker lookup tables, longest-matching-prefix routing, and the automaton underlying Aho-Corasick multi-pattern search over a news or filings feed.</p>
            <p><strong>Further reading:</strong> Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §5.2 (tries: R-way and ternary search tries); Skiena, <em>The Algorithm Design Manual</em>, 3rd ed., §12.3 on suffix trees and arrays for the string-indexing extension.</p>
          `,
          exercises: [
            "Implement a radix (path-compressed) trie supporting insert, exact lookup, and longest-prefix-match. Prove that for n keys the number of nodes is at most 2n−1 regardless of alphabet size, and state precisely where path compression is required for this bound.",
            "Compare the memory of an R-way trie against a ternary search trie for n uniformly random keys of length L over an alphabet of size R. Derive both as functions of n, L, R, and identify the regime where the R-way trie is preferable."
          ]
        },
        {
          id: "algo-suffix-trees-arrays",
          title: "Suffix Trees and Suffix Arrays",
          section: "Tries",
          prerequisites: ["algo-tries"],
          estMinutes: 32,
          content: `
            <p>Take every suffix of a text T (there are n of them, for |T| = n) and insert them all into a trie, then path-compress it exactly as in the previous lesson. The result, a <strong>suffix tree</strong>, has only O(n) nodes despite encoding all Θ(n²) substrings of T implicitly — every substring is a prefix of some suffix, hence a path (possibly ending mid-edge) from the root. Once built, checking whether a pattern P occurs anywhere in T costs O(|P|), completely independent of |T|: exactly the trie lesson's escape from comparison-based search, now applied to substrings instead of a fixed key set.</p>
            <p>The example below is the (correctly path-compressed) suffix tree for the tiny string <code>"aba$"</code> — the trailing <code>$</code> is a unique end-of-string sentinel that guarantees no suffix is a prefix of another, which is what makes every suffix end at a distinct leaf:</p>
            <svg viewBox="0 0 320 180" width="100%" height="180" style="max-width:360px;display:block;margin:0.8rem auto;" role="img" aria-label="A compressed suffix tree for the string aba dollar, with edges labeled a, ba dollar, and dollar, and leaves numbered by suffix start index">
              <g font-size="12">
                <circle cx="160" cy="20" r="4" fill="var(--text)"/>
                <text x="172" y="14" fill="var(--text-muted)" font-size="11">root</text>
                <line x1="160" y1="20" x2="70" y2="80" stroke="var(--accent)" stroke-width="1.5"/>
                <text x="105" y="45" fill="var(--accent)">a</text>
                <line x1="160" y1="20" x2="200" y2="80" stroke="var(--accent)" stroke-width="1.5"/>
                <text x="205" y="45" fill="var(--accent)">ba$</text>
                <line x1="160" y1="20" x2="290" y2="80" stroke="var(--accent)" stroke-width="1.5"/>
                <text x="275" y="45" fill="var(--accent)">$</text>
                <circle cx="70" cy="80" r="4" fill="var(--text)"/>
                <line x1="70" y1="80" x2="30" y2="140" stroke="var(--accent)" stroke-width="1.5"/>
                <text x="12" y="112" fill="var(--accent)">ba$</text>
                <line x1="70" y1="80" x2="110" y2="140" stroke="var(--accent)" stroke-width="1.5"/>
                <text x="100" y="112" fill="var(--accent)">$</text>
                <text x="30" y="155" text-anchor="middle" fill="var(--text-muted)" font-size="11">0: aba$</text>
                <text x="110" y="155" text-anchor="middle" fill="var(--text-muted)" font-size="11">2: a$</text>
                <text x="200" y="95" text-anchor="middle" fill="var(--text-muted)" font-size="11">1: ba$</text>
                <text x="290" y="95" text-anchor="middle" fill="var(--text-muted)" font-size="11">3: $</text>
              </g>
            </svg>
            <p>Two implementations of the same underlying idea are standard, and the choice between them is the usual pointers-vs-arrays trade-off from earlier in this chapter:</p>
            <ul>
              <li><strong>Suffix tree</strong> — the compressed trie itself. Pointer-heavy, but each internal (branching) node directly names a repeated substring, and pattern search costs only O(|P|), independent of |T|.</li>
              <li><strong>Suffix array + LCP array</strong> — just the tree's leaves read left to right: the list of suffix-start positions sorted lexicographically, a plain array of integers with no pointers at all, plus a companion array recovering the branching information the tree had for free.</li>
              <li><strong>Generalized suffix tree</strong> — build one tree over the suffixes of <em>two</em> texts, each leaf tagged with which text it came from, to compare texts rather than search within one.</li>
            </ul>
            <p>The <strong>longest repeated substring</strong> of T is the deepest internal node's path label, since branching is exactly where two or more suffixes stop agreeing; the <strong>longest common substring</strong> of two texts is the deepest node with leaves from both texts in their generalized suffix tree. Building a suffix tree in linear time is possible (Ukkonen's algorithm) but intricate enough that it's usually cited rather than derived in a first pass; the suffix array sidesteps that entirely — the Manber-Myers algorithm builds it in O(n log n) via repeated doubling (sort by 1 character, then by 2, then 4, …), and Kasai's algorithm then computes the LCP array in a further O(n).</p>
            <p><strong>Remark:</strong> in practice — genome alignment, full-text search indexes, plagiarism detection, and the Burrows-Wheeler transform behind bzip2 — the suffix array plus LCP array is the standard choice, since it uses far less memory per character than pointer-heavy tree nodes; the suffix tree is mainly the conceptual tool used to prove why a query is fast.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Build suffix tree</td><td>O(n)</td><td>Ukkonen's algorithm amortizes the work of extending all n suffixes to linear total</td></tr>
              <tr><td>Build suffix array + LCP</td><td>O(n log n) + O(n)</td><td>Manber-Myers doubling, then Kasai's algorithm walks suffixes in rank order</td></tr>
              <tr><td>Pattern search, suffix tree</td><td>O(|P|)</td><td>one walk down the compressed trie, independent of |T|</td></tr>
              <tr><td>Pattern search, suffix array</td><td>O(|P| log n)</td><td>binary search over the sorted array, each comparison up to |P| characters</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> given only a suffix array and its LCP array for a string T (no tree at all), how would you find the longest substring of T that occurs at least twice — in O(n) time?</p>
            <details><summary>Solution</summary>
              <p>The LCP array stores, for each adjacent pair of suffixes in sorted order, the length of their longest common prefix. Since suffixes are sorted lexicographically, any two suffixes sharing a long common prefix end up <em>adjacent</em> in the sorted order (if they weren't, something between them in sort order would have to share at least as much of that prefix too). So the longest common prefix between <em>any</em> two suffixes anywhere in T equals the maximum value in the LCP array — a single O(n) scan. This is exactly the array analogue of "the deepest branching node" in the tree formulation: maximum LCP corresponds to the deepest point at which two suffixes still agree, without ever building the tree.</p>
            </details>
            <p><strong>Remark:</strong> both structures are, underneath, exactly the compressed <a href="#/subject/algorithmics/data-structures/algo-tries">trie</a> from the previous lesson, applied to a specific and enormous key set — every suffix of one string — rather than an arbitrary one; everything that made trie search independent of the number of stored keys applies here too, just measured against |T| instead of the dictionary size.</p>
            <p><strong>Further reading:</strong> Gusfield, <em>Algorithms on Strings, Trees, and Sequences</em>, 1997 (the standard reference — Ch. 5-7 for suffix trees and generalized suffix trees, motivated throughout by DNA sequence analysis); Manber & Myers, "Suffix Arrays: A New Method for On-Line String Searches," <em>SIAM J. Computing</em>, 1993 (the original suffix array paper); Kasai, Lee, Arimura, Arikawa & Park, "Linear-Time Longest-Common-Prefix Computation in Suffix Arrays," 2001.</p>
            <p><em>The whole idea in one line: every substring is a prefix of some suffix, so index the suffixes and you've indexed everything.</em></p>
          `,
          exercises: [
            "Given the suffix tree for a string T of length n, describe an O(n) algorithm to find the longest substring of T that occurs at least twice, and justify the bound in terms of the tree's internal nodes.",
            "Given a suffix array SA and its LCP array for a string T, describe how to test whether a pattern P occurs in T in O(|P| log n) time via binary search over SA, using the LCP array to skip redundant character comparisons. Contrast this with the O(|P|) suffix-tree walk and explain the trade-off."
          ]
        }
      ]
    },
    {
      id: "algorithms",
      name: "Algorithms",
      lessons: [
        {
          id: "algo-amortized-potential-method",
          title: "Amortized Analysis: The Potential Method",
          section: "Analysis Techniques",
          prerequisites: [],
          estMinutes: 30,
          content: `
            <p>Amortized analysis bounds the total cost of a <em>sequence</em> of operations, which can be far better than (number of operations) × (worst-case single cost) when expensive operations must be "paid for" by cheap ones that preceded them. The potential method makes this rigorous by making the payment explicit: define Φ mapping data-structure states to reals, and define the amortized cost of the <em>i</em>-th operation as</p>
            <pre><code>ĉᵢ = cᵢ + Φ(Dᵢ) − Φ(Dᵢ₋₁)

⇒  Σᵢ cᵢ = Σᵢ ĉᵢ + Φ(D₀) − Φ(Dₙ)  ≤  Σᵢ ĉᵢ   whenever Φ(Dₙ) ≥ Φ(D₀).</code></pre>
            <p>The telescoping sum is the entire argument; the creative work is choosing Φ so that each ĉᵢ is small and Φ never drops below its starting value. Read Φ as stored credit: cheap operations deposit into it, the rare expensive operation withdraws. This is a strictly stronger and more mechanical tool than the aggregate method (just average the total) and the accounting method (assign per-operation charges), because Φ is a function of the state alone, so the bound holds for <em>any</em> adversarial operation sequence, not just the ones you imagined.</p>
            <p>Amortized is not the same as expected: there is no randomness here, and the bound is worst-case over sequences. Nor does it bound individual latency — relevant later when a single rehash or array-growth pause matters inside a live trading loop.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 17, especially §17.3 (potential method) and §17.4 (dynamic tables).</p>
          `,
          exercises: [
            "Using the potential function Φ = number of 1-bits in the register, prove that INCREMENT on a k-bit binary counter has O(1) amortized cost. Then modify the analysis for a counter supporting both INCREMENT and DECREMENT and show that no potential function gives O(1) amortized cost for the pair — exhibit the adversarial sequence.",
            "A stack supports PUSH, POP, and MULTIPOP(k) which pops min(k, size) elements at unit cost per element. Give a potential function proving O(1) amortized cost per operation. Then show that the constant in your bound is tight by exhibiting a matching sequence."
          ]
        },
        {
          id: "algo-sorting-lower-bound-mergesort",
          title: "Merge Sort and the Comparison-Sorting Lower Bound",
          section: "Divide & Conquer / Sorting",
          prerequisites: [],
          estMinutes: 25,
          content: `
            <p>Merge sort is the clean divide-and-conquer instance: split, recurse, merge in linear time, giving <code>T(n) = 2T(n/2) + Θ(n) = Θ(n log n)</code> by the master theorem's case 2. Its merge step is stable and sequential (cache- and disk-friendly), which is why external sorts and <code>numpy.sort(kind='stable')</code> use variants of it.</p>
            <p>The matching lower bound is the more important result. Model any deterministic comparison sort as a binary decision tree: internal nodes are comparisons, leaves are permutations. Correctness requires at least <em>n!</em> reachable leaves, and a binary tree with <em>n!</em> leaves has height at least</p>
            <pre><code>log₂(n!) = n log₂ n − n log₂ e + O(log n) = Ω(n log n)     [Stirling]</code></pre>
            <p>So Θ(n log n) is optimal <em>within the comparison model</em>. The qualifier is the lesson: counting sort, radix sort, and bucket sort beat it in O(n) or O(dn) precisely because they inspect key structure rather than comparing keys — the same model-shift that made tries fast. Randomization does not help either; the bound extends to expected comparisons by averaging over the decision tree's leaves.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §2.3 (merge sort and its analysis) and §8.1 (decision-tree lower bound), with §8.2-8.3 for counting and radix sort.</p>
          `,
          exercises: [
            "Prove that any randomized comparison sort requires Ω(n log n) expected comparisons on some input, by considering the uniform distribution over inputs and applying an averaging (Yao-style) argument over decision trees.",
            "Merge sort as usually written uses Θ(n) auxiliary space. Prove a lower bound or give an algorithm: is there a stable, in-place (O(1) extra space), O(n log n) comparison sort? Describe the key idea of the algorithm you find or design and state its practical constant-factor cost."
          ]
        },
        {
          id: "algo-randomized-quicksort",
          title: "Randomized Quicksort: Expected Comparisons",
          section: "Sorting",
          prerequisites: ["algo-sorting-lower-bound-mergesort"],
          estMinutes: 30,
          content: `
            <p>Quicksort partitions around a pivot and recurses on both sides; with no auxiliary array and excellent locality it typically beats merge sort in practice despite a Θ(n²) worst case. Randomizing the pivot makes the running time a random variable whose distribution does not depend on the input — the same defence as universal hashing.</p>
            <p>The elegant analysis avoids recurrences entirely. Let <code>z₁ &lt; z₂ &lt; … &lt; zₙ</code> be the sorted order and let <code>Xᵢⱼ</code> indicate that <em>zᵢ</em> and <em>zⱼ</em> are ever compared. They are compared iff the first pivot chosen from the set <code>{zᵢ,…,zⱼ}</code> is <em>zᵢ</em> or <em>zⱼ</em> (any interior pivot separates them forever), so</p>
            <pre><code>Pr[Xᵢⱼ = 1] = 2/(j − i + 1)

E[comparisons] = Σᵢ Σ_{j&gt;i} 2/(j−i+1) = 2n·H(n) + O(n) ≈ 1.39 n log₂ n</code></pre>
            <p>Two facts worth internalising: the constant 1.39 means randomized quicksort makes ~39% more comparisons than the information-theoretic minimum yet still wins on wall-clock time due to memory locality; and the distribution is sharply concentrated, so O(n log n) holds with high probability, not merely in expectation. Introsort (libstdc++, <code>numpy.sort</code> default) guards the tail by switching to heapsort once recursion depth exceeds ~2 log n.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §7.2-7.4 (worst case, randomized version, expected-comparison analysis).</p>
          `,
          exercises: [
            "Prove Pr[zᵢ and zⱼ are compared] = 2/(j−i+1) carefully, stating the independence assumptions you use, and derive the 2n·ln n asymptotic. Then compute E[comparisons] when the pivot is the median of three uniformly random elements.",
            "Show that randomized quicksort runs in O(n log n) time with probability at least 1 − 1/n^c for a constant c of your choosing. (Hint: bound the depth of recursion by counting 'good' pivots that split at least 1/4-to-3/4.)"
          ]
        },
        {
          id: "algo-heapsort",
          title: "Heapsort: Sorting via the Heap Property",
          section: "Sorting",
          prerequisites: ["algo-binary-heaps"],
          estMinutes: 20,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (CLRS Part II's own sorting algorithm: BUILD-MAX-HEAP in Θ(n), then repeatedly swap the root with the last element and sift down on the shrinking heap — O(n log n) worst case, in-place, but not stable and with poor cache locality compared to quicksort. Source: CLRS 3rd ed. Ch 6). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-linear-time-sorting",
          title: "Sorting in Linear Time: Counting, Radix, and Bucket Sort",
          section: "Sorting",
          prerequisites: ["algo-sorting-lower-bound-mergesort"],
          estMinutes: 25,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (the three algorithms that beat the Ω(n log n) comparison bound by not comparing keys: counting sort in Θ(n+k) for keys in a small range, radix sort in Θ(d(n+k)) by applying a stable counting sort digit-by-digit, and bucket sort in expected Θ(n) under a uniformity assumption on the input distribution. Source: CLRS 3rd ed. Ch 8). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-order-statistics-selection",
          title: "Order Statistics: Linear-Time Selection",
          section: "Selection",
          prerequisites: ["algo-randomized-quicksort"],
          estMinutes: 30,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (finding the k-th smallest element without fully sorting: randomized SELECT via quicksort-style partitioning gives expected O(n); the deterministic median-of-medians algorithm gets worst-case O(n) by choosing a pivot guaranteed to be a good split, at the cost of a more intricate recurrence T(n) ≤ T(n/5) + T(7n/10) + O(n). Source: CLRS 3rd ed. Ch 9). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-binary-search-invariants",
          title: "Binary Search as an Invariant on a Monotone Predicate",
          section: "Searching",
          prerequisites: [],
          estMinutes: 25,
          content: `
            <p>Binary search is not really about sorted arrays; it is about a monotone Boolean predicate. If <code>P(k)</code> is false for all <code>k &lt; t</code> and true for all <code>k ≥ t</code>, then <em>t</em> is found in <code>⌈log₂ n⌉</code> evaluations of P. Framing it this way turns a fiddly off-by-one exercise into a proof obligation with one invariant, and it immediately generalises to searching answer spaces rather than arrays.</p>
            <pre><code>invariant:  P(lo) is false (or lo = start−1),  P(hi) is true (or hi = end)
while hi − lo &gt; 1:
    mid = lo + (hi − lo)//2        # avoids overflow in fixed-width arithmetic
    if P(mid): hi = mid
    else:      lo = mid
return hi                          # the least k with P(k) true</code></pre>
            <p>The loop terminates because <code>hi − lo</code> strictly decreases; it is correct because the invariant is preserved by both branches; and it answers the right question because the invariant plus the exit condition <code>hi = lo + 1</code> pin <em>hi</em> to the threshold. Choosing P wisely is where the technique earns its keep: "binary search on the answer" solves optimisation problems whose feasibility check is easy — e.g. the smallest capacity that admits a feasible schedule, or the volatility that reprices an option to the market (though there Newton converges faster). Over the reals, iterate a fixed number of times rather than to equality, and mind the conditioning issues of Chapter 5.</p>
            <p><strong>Further reading:</strong> Bentley, <em>Programming Pearls</em>, 2nd ed., Ch. 4 (writing correct programs — the binary search verification); CLRS, 3rd ed., §2.3 exercises and §12.2 for the search-tree analogue.</p>
          `,
          exercises: [
            "State and prove a loop invariant for the code above, deriving both termination and correctness. Then adapt it to return the number of elements strictly less than a target x in a sorted array with duplicates, and prove your variant correct.",
            "Given a function f that is unimodal on [a,b] (strictly increasing then strictly decreasing) and evaluable but with no derivative available, design a search that locates the maximum to within ε. Prove your convergence rate and explain why plain binary search on f itself does not work."
          ]
        },
        {
          id: "algo-divide-and-conquer",
          title: "Divide & Conquer Beyond Sorting: Strassen and Closest Pair",
          section: "Divide & Conquer",
          prerequisites: ["algo-sorting-lower-bound-mergesort"],
          estMinutes: 30,
          content: `
            <p>Divide and conquer pays off when the merge step is cheaper than the naive combination, or when the number of subproblems can be reduced below the obvious count. Two canonical illustrations:</p>
            <p><strong>Strassen's matrix multiplication.</strong> Splitting two n×n matrices into 2×2 blocks needs eight block products, giving <code>T(n) = 8T(n/2) + Θ(n²) = Θ(n³)</code> — no gain. Strassen's identity computes the four output blocks from only <em>seven</em> block products plus extra additions, so <code>T(n) = 7T(n/2) + Θ(n²) = Θ(n^log₂7) = Θ(n^2.807)</code>. Case 1 of the master theorem: the leaves dominate, and shaving one leaf multiplication changes the exponent. In practice Strassen is used only for large n and is numerically less stable than the classical algorithm (Chapter 5), an early example of the speed-versus-stability tradeoff.</p>
            <p><strong>Closest pair in the plane.</strong> Sort by <em>x</em>, split, recurse, and let δ be the better of the two half-solutions. The merge only needs to consider points within a vertical strip of width 2δ, and — the key geometric lemma — each point in the strip need only be compared with a constant number of following points in <em>y</em>-order, because δ-separation packs at most a bounded number of points into any δ×2δ box. Hence <code>T(n) = 2T(n/2) + O(n) = O(n log n)</code>.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §4.2 (Strassen) and §33.4 (closest pair of points).</p>
          `,
          exercises: [
            "Verify Strassen's seven products by expanding the block identities symbolically, and count the exact number of additions. Determine the crossover n at which Strassen beats the classical algorithm under the (unrealistic) assumption that additions and multiplications cost equally, then discuss what changes on real hardware.",
            "Prove the packing lemma for the closest-pair strip: if all pairs within each half are at distance at least δ, then any δ×2δ rectangle contains at most a fixed constant number of points. Give the smallest constant you can prove, and show how it determines the inner loop bound."
          ]
        },
        {
          id: "algo-dynamic-programming",
          title: "Dynamic Programming: Optimal Substructure and State Design",
          section: "Dynamic Programming",
          prerequisites: [],
          estMinutes: 30,
          content: `
            <p>DP applies when a problem has (i) <strong>optimal substructure</strong> — an optimal solution is built from optimal solutions of subproblems — and (ii) <strong>overlapping subproblems</strong>, so memoisation converts exponential recursion into polynomial work. Property (i) is a theorem to prove, not an assumption: the standard cut-and-paste argument assumes a subsolution used by the optimum is suboptimal, substitutes a better one, and contradicts optimality. It genuinely fails for problems like longest simple path, where the substituted subpath may reuse vertices — the subproblems are not independent.</p>
            <p>The engineering content is state design. Define the state, prove the recurrence, then read off the complexity as (number of states) × (transition cost):</p>
            <table class="mini-table">
              <tr><th>Problem</th><th>State</th><th>Recurrence idea</th><th>Cost</th></tr>
              <tr><td>LCS of x, y</td><td>(i, j) prefixes</td><td>match ⇒ +1 diagonally; else max of two</td><td>Θ(mn)</td></tr>
              <tr><td>0/1 knapsack</td><td>(i, capacity)</td><td>take vs skip item i</td><td>Θ(nW), pseudo-poly</td></tr>
              <tr><td>Edit distance</td><td>(i, j)</td><td>min over insert/delete/substitute</td><td>Θ(mn)</td></tr>
              <tr><td>Matrix chain</td><td>(i, j) interval</td><td>min over split point k</td><td>Θ(n³)</td></tr>
            </table>
            <p>Note that knapsack's Θ(nW) is <em>pseudo-polynomial</em>: W is exponential in its bit-length, which is why knapsack is NP-hard yet routinely solved. DP recurs later in this course as the Viterbi algorithm for hidden-state models and as the dynamic program behind optimal trade execution schedules.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §15.3 (elements of dynamic programming — optimal substructure and overlapping subproblems), with §15.4 (LCS) and §15.1 (rod cutting) as worked instances.</p>
          `,
          exercises: [
            "Prove optimal substructure for the 0/1 knapsack problem with a cut-and-paste argument, then show explicitly where the same argument fails for the longest-simple-path problem in a directed graph.",
            "Design a DP for the following: given daily returns r₁,…,r_T and a maximum of k round-trip trades with a fixed cost c per trade, compute the maximum achievable total return. State your state space, prove the recurrence, give the complexity, and reduce the space to O(k)."
          ]
        },
        {
          id: "algo-greedy-matroids",
          title: "Greedy Algorithms and the Matroid Characterisation",
          section: "Greedy",
          prerequisites: [],
          estMinutes: 25,
          content: `
            <p>Greedy algorithms commit to a locally best choice and never reconsider. When they work, they beat DP; the difficulty is that they are usually wrong, and plausibility is no evidence. Two proof techniques cover most correct cases:</p>
            <ul>
              <li><strong>Greedy-choice property + exchange argument:</strong> show some optimal solution contains the greedy first choice (by exchanging elements of an arbitrary optimum without worsening it), then induct on the remaining subproblem.</li>
              <li><strong>Greedy stays ahead:</strong> show that after each step the greedy partial solution is at least as good, by some measured quantity, as any other partial solution.</li>
            </ul>
            <p>Matroid theory explains <em>why</em> greedy works when it does. A matroid is a pair (S, I) with I a nonempty family of "independent" subsets that is downward closed and satisfies the exchange property: if A, B ∈ I and |A| &lt; |B|, then some x ∈ B\\A has A ∪ {x} ∈ I. <strong>Theorem:</strong> for any weight function w &gt; 0, the greedy algorithm — sort by weight descending, add each element if independence is preserved — yields a maximum-weight independent set precisely on matroids. Kruskal's MST is exactly this on the graphic matroid; unit-time task scheduling with deadlines is this on a transversal matroid. Conversely, when your structure is not a matroid (0/1 knapsack, set cover), greedy is at best an approximation and you need DP or an approximation guarantee.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §16.2 (elements of the greedy strategy) and §16.4-16.5 (matroids and task scheduling); Skiena, <em>The Algorithm Design Manual</em>, 3rd ed., §1.4-1.5 for the "why greedy heuristics fail" discussion.</p>
          `,
          exercises: [
            "Prove that the graphic matroid — S the edge set of a graph, I the acyclic subsets — satisfies the exchange property, and deduce Kruskal's correctness from the matroid greedy theorem.",
            "Give a weighted problem where greedy is provably within a factor 1 − 1/e of optimal but not optimal, prove the bound, and identify the structural property (submodularity) that replaces the matroid condition."
          ]
        }
      ]
    },
    {
      id: "graph-algorithms",
      name: "Graph Algorithms",
      lessons: [
        {
          id: "algo-dfs",
          title: "Depth-First Search: The Structure Theorems",
          section: "DFS family",
          prerequisites: ["algo-stacks"],
          estMinutes: 25,
          content: `
            <p><em>Placeholder — split out of the old combined "DFS and BFS" lesson; needs to be expanded into a standalone lesson (discovery/finish times, the parenthesis theorem, edge classification, and the three corollaries: cycle detection, topological order, SCC). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-bfs",
          title: "Breadth-First Search: Shortest Paths in Unweighted Graphs",
          section: "BFS family",
          prerequisites: ["algo-queues"],
          estMinutes: 25,
          content: `
            <p><em>Placeholder — split out of the old combined "DFS and BFS" lesson; needs to be expanded into a standalone lesson (layered distances, the queue invariant, correctness proof). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-topological-sort-dag-dp",
          title: "Topological Order and DP on DAGs",
          section: "DFS family",
          prerequisites: ["algo-dfs"],
          estMinutes: 25,
          content: `
            <p>A topological order of a directed graph is a linear order of the vertices with every edge pointing forward. It exists iff the graph is acyclic, and two O(V+E) algorithms produce one: Kahn's algorithm repeatedly emits a vertex of in-degree zero (and detects a cycle if it stalls with vertices remaining), while DFS emits vertices in decreasing finish time (correctness follows immediately from the parenthesis theorem — for edge (u,v), <code>f[u] &gt; f[v]</code> unless (u,v) is a back edge, i.e. unless there is a cycle).</p>
            <p>The practical value is that a topological order linearises dependencies, so any DP over a DAG becomes a single left-to-right sweep with no recursion and no memo table lookups. Longest path — NP-hard in general graphs — is linear-time on a DAG for exactly this reason. Everyday instances: build systems and task schedulers, spreadsheet/feature-graph recomputation, and the forward and reverse passes of reverse-mode automatic differentiation, which is topological order on the computation DAG followed by its reverse.</p>
            <p>For research code that computes features from other features (a common structure in a signal pipeline), representing the pipeline as a DAG and evaluating in topological order also gives you cycle detection for free — a genuine safeguard against accidentally defining a feature in terms of itself, i.e. a subtle look-ahead bug.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §22.4 (topological sort, with the correctness proof) and §24.2 (single-source shortest paths in DAGs).</p>
          `,
          exercises: [
            "Prove that DFS finishing times in decreasing order give a valid topological order, and that Kahn's algorithm terminates with vertices remaining iff the graph contains a cycle. Then show a graph can have exponentially many distinct topological orders.",
            "Give an O(V+E) algorithm that computes, for a DAG with vertex weights, the maximum-weight path. Prove correctness via the topological order, and explain in one paragraph why the same approach fails on a general directed graph with positive weights."
          ]
        },
        {
          id: "algo-scc-kosaraju",
          title: "Strongly Connected Components I: Kosaraju's Algorithm",
          section: "DFS family",
          prerequisites: ["algo-dfs"],
          estMinutes: 30,
          content: `
            <p><em>Placeholder — new node in the DAG (DFS on G for finish-time order, DFS on the transpose Gᵀ in decreasing finish order, each tree of the second forest is an SCC — plus the component-graph-is-a-DAG lemma that makes it work). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-scc-tarjan",
          title: "Strongly Connected Components II: Tarjan's Algorithm",
          section: "DFS family",
          prerequisites: ["algo-scc-kosaraju"],
          estMinutes: 35,
          content: `
            <p><em>Placeholder — new node in the DAG (single-pass low-link algorithm: disc[v]/low[v], the stack-based mechanism for popping a completed SCC when low[v] == disc[v]). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-bridges-articulation",
          title: "Bridges and Articulation Points",
          section: "DFS family",
          prerequisites: ["algo-scc-tarjan"],
          estMinutes: 30,
          content: `
            <p><em>Placeholder — new node in the DAG (reuses Tarjan's low-link idea on undirected DFS trees: (u,v) is a bridge iff low[v] &gt; disc[u]; articulation-point conditions for root vs. non-root). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-2sat-scc",
          title: "2-SAT via Strongly Connected Components",
          section: "DFS family",
          prerequisites: ["algo-scc-tarjan"],
          estMinutes: 25,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (a genuinely surprising application, usually skipped in a first course: encode each boolean variable x as two nodes x and ¬x in an implication graph, where a clause (a ∨ b) becomes two edges ¬a→b and ¬b→a; the formula is satisfiable iff no variable and its negation lie in the same SCC, and a satisfying assignment falls straight out of the SCC condensation's topological order. Turns an NP-complete-looking problem into a linear-time one, precisely because 2-SAT — unlike general k-SAT — has no genuine choice once you propagate implications). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-eulerian-path-hierholzer",
          title: "Eulerian Paths and Hierholzer's Algorithm",
          section: "DFS family",
          prerequisites: ["algo-dfs"],
          estMinutes: 22,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (an Eulerian circuit — visiting every EDGE exactly once — exists iff the graph is connected and every vertex has even degree (undirected) or in-degree equals out-degree everywhere (directed); Hierholzer's algorithm constructs one in O(E) by splicing together closed walks, a pleasant contrast to the Hamiltonian-path problem's NP-hardness for visiting every VERTEX once. Classical motivation: the Seven Bridges of Königsberg). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-dijkstra",
          title: "Dijkstra's Algorithm and Why Nonnegativity Is Essential",
          section: "BFS family",
          prerequisites: ["algo-bfs", "algo-fibonacci-heap"],
          estMinutes: 35,
          content: `
            <p>Dijkstra maintains tentative distances <code>d[v]</code>, repeatedly extracts the unsettled vertex of minimum <code>d</code>, and relaxes its outgoing edges. The invariant is that when a vertex <em>u</em> is extracted, <code>d[u] = δ(s,u)</code> is final.</p>
            <p><strong>Proof sketch.</strong> Suppose <em>u</em> is the first vertex extracted with <code>d[u] &gt; δ(s,u)</code>. Take a shortest path <em>s ⇝ u</em> and let <em>(x,y)</em> be the first edge leaving the settled set. Then <code>d[y] = δ(s,y)</code> by the relaxation performed when <em>x</em> was settled, and <code>δ(s,y) ≤ δ(s,u)</code> because the subpath is a prefix — <em>this step needs nonnegative weights</em>. So <code>d[y] ≤ δ(s,u) &lt; d[u]</code>, contradicting the choice of <em>u</em> as the minimum. With one negative edge the prefix inequality fails and the algorithm can settle a vertex too early.</p>
            <table class="mini-table">
              <tr><th>Priority queue</th><th>Complexity</th><th>Best when</th></tr>
              <tr><td>Array scan</td><td>O(V²)</td><td>dense, E ≈ V²</td></tr>
              <tr><td>Binary heap</td><td>O((V+E) log V)</td><td>sparse; the default</td></tr>
              <tr><td>Fibonacci heap</td><td>O(E + V log V)</td><td>theory; high constants</td></tr>
            </table>
            <p>Two extensions worth knowing: A* is Dijkstra with edge weights reweighted by a consistent heuristic — correctness is exactly the nonnegativity argument applied to the reweighted graph; and Johnson's algorithm uses Bellman-Ford potentials to reweight a graph with negative edges into a nonnegative one so Dijkstra can run V times.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §24.3 (Dijkstra) with §24.1 for relaxation properties; §25.3 for Johnson's reweighting.</p>
          `,
          exercises: [
            "Give a graph with a single negative edge (and no negative cycle) on which Dijkstra returns a wrong distance, and identify precisely which step of the correctness proof fails. Then prove that Dijkstra is correct on graphs with negative edges provided no negative edge leaves a vertex reachable before its endpoint is settled — state the condition precisely.",
            "Prove that A* with a consistent (monotone) heuristic h expands vertices in nondecreasing order of f = g + h and never re-expands a settled vertex, by exhibiting the reweighting w'(u,v) = w(u,v) − h(u) + h(v) and showing w' ≥ 0."
          ]
        },
        {
          id: "algo-bellman-ford",
          title: "Bellman-Ford and Negative Cycle Detection",
          section: "Shortest Paths (general)",
          prerequisites: ["algo-dynamic-programming", "algo-bfs"],
          estMinutes: 30,
          content: `
            <p>Bellman-Ford relaxes <em>every</em> edge, <em>V−1</em> times. The correctness argument is a clean induction on path length: after <em>k</em> rounds, <code>d[v] ≤</code> the weight of the lightest <em>s ⇝ v</em> path using at most <em>k</em> edges. Since any shortest path in a graph with no negative cycle is simple and thus uses at most <em>V−1</em> edges, <em>V−1</em> rounds suffice. Running one more round and finding any edge still relaxable is a certificate of a negative-weight cycle reachable from <em>s</em> — the algorithm decides, rather than assumes, that the problem is well-posed.</p>
            <pre><code>for k in 1 … V−1:
    for (u,v,w) in E:
        if d[u] + w &lt; d[v]:  d[v] = d[u] + w;  parent[v] = u
for (u,v,w) in E:
    if d[u] + w &lt; d[v]:  report negative cycle (walk parent pointers V times)</code></pre>
            <p>Cost is O(VE), worse than Dijkstra, and the payment buys exactly the ability to handle negative weights. That matters in finance for a concrete reason: currency arbitrage. Take exchange rates <code>r(u,v)</code> and set <code>w(u,v) = −log r(u,v)</code>; then a cycle whose rate product exceeds 1 becomes a cycle of negative total weight, so triangular-arbitrage detection <em>is</em> negative-cycle detection. In practice, transaction costs and bid-ask spreads (Chapter 10) enter as additive penalties on each edge and usually destroy the opportunity — which is itself the useful finding.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §24.1 (Bellman-Ford with the negative-cycle proof) and §24.5 (proofs of shortest-path properties); Problem 24-3 discusses the arbitrage reduction.</p>
          `,
          exercises: [
            "Prove the path-length induction formally: after k rounds, d[v] is at most the weight of any s-to-v path with at most k edges. Then prove that the extra relaxation round detects a negative cycle iff one is reachable from s, and describe how to extract the cycle from the parent pointers.",
            "Implement the −log reduction for currency arbitrage on a matrix of exchange rates, extract any negative cycle, and then add a proportional cost c per conversion. Derive the exact threshold on the cycle's rate product above which the opportunity survives k conversions."
          ]
        },
        {
          id: "algo-all-pairs-shortest-paths",
          title: "All-Pairs Shortest Paths: Floyd-Warshall and Johnson",
          section: "Shortest Paths (general)",
          prerequisites: ["algo-dynamic-programming", "algo-bellman-ford", "algo-dijkstra"],
          estMinutes: 35,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (a natural capstone tying together DP, Bellman-Ford, and Dijkstra: Floyd-Warshall is a Θ(V³) DP over "allowed intermediate vertices" that handles negative edges (no negative cycles) with three nested loops and no priority queue at all; Johnson's algorithm instead adds a virtual source and one Bellman-Ford pass to compute vertex potentials that reweight every edge nonnegative, then runs Dijkstra from every vertex, giving O(V² log V + VE) — better than Floyd-Warshall on sparse graphs. Source: CLRS 3rd ed. Ch 25). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-mst-cut-property",
          title: "Minimum Spanning Trees and the Cut Property",
          section: "Spanning Trees",
          prerequisites: ["algo-greedy-matroids", "algo-union-find"],
          estMinutes: 30,
          content: `
            <p>Almost every MST algorithm is a corollary of one lemma. <strong>Cut property:</strong> for any cut (S, V\\S) of a connected weighted graph, if an edge <em>e</em> crossing the cut has strictly minimum weight among crossing edges, then <em>e</em> belongs to every MST. <strong>Cycle property:</strong> if an edge is the strict maximum on some cycle, it belongs to no MST. Both are proved by exchange: swap the edge in or out of a supposed MST and compare weights.</p>
            <ul>
              <li><strong>Kruskal</strong> — sort edges ascending, add if it joins two different components (union-find from Chapter 2). Each accepted edge is minimum across the cut separating its endpoints' components. O(E log E).</li>
              <li><strong>Prim</strong> — grow one tree, always adding the lightest edge leaving it (priority queue, structurally Dijkstra with key = edge weight instead of path length). O(E log V).</li>
              <li><strong>Borůvka</strong> — every component simultaneously picks its lightest outgoing edge; halves component count per round, O(E log V) and naturally parallel.</li>
            </ul>
            <p>The MST turns up in this course's later chapters in an unexpected place: applied to a correlation-derived distance <code>dᵢⱼ = √(2(1 − ρᵢⱼ))</code> between asset return series, the MST extracts a sparse "market skeleton", and the same hierarchical-clustering idea underlies hierarchical risk parity portfolio construction.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §23.1 (growing an MST — the cut property and its proof) and §23.2 (Kruskal and Prim).</p>
          `,
          exercises: [
            "Prove the cut property and the cycle property by exchange arguments. Then prove that if all edge weights are distinct, the MST is unique, and give a graph with repeated weights having exponentially many MSTs.",
            "Show that dᵢⱼ = √(2(1 − ρᵢⱼ)) is a metric on a set of return series whose correlation matrix is positive semidefinite. (Hint: realise it as a Euclidean distance between normalised vectors.) Then explain what the resulting MST's structure tells you that the raw correlation matrix does not."
          ]
        },
        {
          id: "algo-max-flow-ford-fulkerson",
          title: "Maximum Flow: Ford-Fulkerson and Edmonds-Karp",
          section: "Flow Networks",
          prerequisites: ["algo-bfs"],
          estMinutes: 35,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (a genuinely different kind of graph algorithm, usually not reached in a first course: repeatedly find an augmenting path in the residual graph and push flow along it until none remains; the max-flow min-cut theorem gives an exact certificate of optimality (the achieved flow value equals the capacity of the bottleneck cut), proved via the same exchange/certificate style as the MST cut property. Edmonds-Karp's refinement — always augment along a SHORTEST path, found by BFS on the residual graph — bounds the number of augmentations at O(VE), for O(VE²) total, independent of edge capacities. Source: CLRS 3rd ed. Ch 26). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-bipartite-matching",
          title: "Bipartite Matching via Maximum Flow",
          section: "Flow Networks",
          prerequisites: ["algo-max-flow-ford-fulkerson"],
          estMinutes: 25,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (reduces maximum bipartite matching to a single max-flow instance — add a source connected to every left vertex and a sink from every right vertex, all capacities 1 — and reads König's theorem (max matching = min vertex cover in a bipartite graph) straight off the max-flow min-cut theorem. A clean, concrete payoff for having built the flow machinery: an assignment/scheduling problem solved by an algorithm from a seemingly unrelated lesson). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        }
      ]
    }
  ]
};
