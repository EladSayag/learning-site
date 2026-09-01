// Algorithmics content.
//
// Shape: const ALGORITHMICS_SUBJECT = { id, name, color, chapters: [ { id, name, lessons: [...] } ] }
// Chapters are just a display grouping — they have NO effect on lesson order or unlocking.
// That's what `prerequisites` is for. See the matching header in data-physics.js for the full
// field-by-field doc (id/title/section/prerequisites/estMinutes/content/exercises); same rules
// apply here, ids just use the "algo-" prefix instead of "phys-".
//
// STATUS (2026-09-01): this file now covers Data Structures / Algorithms / Graph Algorithms only.
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
//      algo-stacks, algo-linked-lists (the two style-template reference lessons), algo-kd-trees,
//      algo-red-black-trees, algo-b-trees, algo-splay-trees, algo-skip-lists.
//   2b. Lessons with full content but written BEFORE the style template above was settled (denser
//      academic tone, no try-it-yourself/remark/slogan structure yet) — need a restyling pass, NOT a
//      rewrite of the underlying material: algo-queues, algo-what-is-a-data-structure,
//      algo-suffix-trees-arrays, algo-persistent-data-structures.
//   3. PLACEHOLDER NODES ONLY — wired into the DAG with correct prerequisites, but content still to
//      be written in a follow-up pass:
//        Data Structures: algo-bloom-filters, algo-priority-queue-adt, algo-fibonacci-heap,
//          algo-van-emde-boas, algo-segment-fenwick-trees.
//        Algorithms (CLRS Part II, "Sorting and Order Statistics" — the material this chapter was
//          missing): algo-heapsort, algo-linear-time-sorting, algo-order-statistics-selection.
//        Graph Algorithms (deliberately beyond a first course, per request): algo-dfs, algo-bfs
//          (pre-existing placeholders, split out of an old combined lesson), algo-scc-kosaraju,
//          algo-scc-tarjan, algo-bridges-articulation (pre-existing), plus new ones —
//          algo-max-flow-ford-fulkerson, algo-bipartite-matching, algo-all-pairs-shortest-paths,
//          algo-2sat-scc, algo-eulerian-path-hierholzer.
//      NEXT UP when resuming this pass: finish Data Structures category A (still-placeholder
//      lessons) in DAG order — algo-bloom-filters, then the Heaps group (algo-priority-queue-adt,
//      algo-fibonacci-heap, algo-van-emde-boas), then algo-segment-fenwick-trees. Only after ALL of
//      Data Structures (both bucket 2 and 2b above) is done should the pass move to Graph Algorithms
//      placeholders (algo-dfs first, in the DAG order listed above). Note algo-kd-trees was already
//      in the new style before this run and did NOT need touching.

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
            <p>Two consequences follow immediately, and they recur in every later lesson. First, you can swap implementations without changing any code that only talks to the ADT — this is the entire justification for a database index switching from a B-tree to a hash index, or for choosing Python's <code>list</code> versus <code>collections.deque</code>. Second, "which structure is best" is not answerable without knowing the operation mix: a workload dominated by random access wants the array; one dominated by front-insertion wants the list. Every later lesson in this chapter is filling in a row of a much bigger version of the table above — the same handful of ADTs (list, set, map, priority queue), an increasing number of implementations, each buying a different point on the time/space trade-off curve.</p>
            <p>A structure's <strong>invariant</strong> is the standing property its operations must preserve — sortedness for a sorted array, the heap property for a heap, no cycles for a tree. Reading any new structure well means asking three questions in order: what is the invariant, why does maintaining it make some operation cheap, and what does maintaining it cost on the operations that don't benefit. That question triage is the actual skill this chapter is teaching; the specific structures are the practice material.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 10 introduction (stacks/queues/lists as the first worked instances of implementing an ADT); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §1.2 ("Data Types") for the clearest short treatment of the ADT/implementation split specifically; Pat Morin, <em>Open Data Structures</em> (free, opendatastructures.org), Ch. 1, for the same ground with runnable code in several languages if you want to see interfaces expressed as code rather than prose.</p>
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
            <p>A naive array queue that just advances a "front" index and shifts everything left on dequeue costs O(n) per dequeue — unacceptable. The fix is the <strong>circular (ring) buffer</strong>: keep <code>head</code> and <code>tail</code> indices into a fixed-size array of capacity m, advance each modulo m, and never shift anything. Both enqueue and dequeue become O(1), and the only bookkeeping subtlety is distinguishing "empty" from "full" when <code>head == tail</code> — solved by tracking a count alongside the two indices, or by deliberately never filling the last slot. A doubly linked list gives the same O(1) bounds with no capacity limit and no modular arithmetic, at the usual per-node pointer overhead; this is essentially what <code>collections.deque</code> is (a linked list of small fixed-size blocks, giving O(1) at both ends with better cache behavior than one node per element).</p>
            <p>The queue's FIFO discipline is not a stylistic choice in breadth-first search — it is the mechanism that makes BFS correct. Processing vertices in the order they were discovered means everything at graph-distance <em>k</em> from the source is dequeued (and its neighbors enqueued) before anything at distance <em>k+1</em>, which is exactly the layer-by-layer guarantee the BFS lesson proves. Swap the queue for a stack and you get depth-first search's order instead — same two lines of pseudocode, different data structure, entirely different traversal.</p>
            <p>Beyond graph traversal, queues are the standard shape for anything modeling arrival order under real constraints: task schedulers, print spoolers, and producer-consumer buffering between a fast producer and a slower consumer (a "message queue" is this ADT plus durability and network delivery guarantees layered on top). Contrast this with the priority queue two lessons ahead, where service order is by priority rather than arrival — the same real-world scheduling problem, solved by a structurally different ADT once "first come, first served" stops being the right policy.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §10.1 (queues via a circular array, with the wraparound arithmetic spelled out); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §1.3 (queues, with diagrams of the resizing circular array); Skiena, <em>The Algorithm Design Manual</em>, 3rd ed., §3.3.</p>
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
          title: "Bloom Filters: Probabilistic Set Membership",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-hashing-universal-families"],
          estMinutes: 20,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (a bit array plus k independent hash functions; one-sided error — false positives only, never a false negative — and the derivation of the optimal k and the resulting false-positive rate; ties back to the "sketching structures" aside in the hashing lesson. Sources: Bloom, "Space/Time Trade-offs in Hash Coding with Allowable Errors," CACM 1970; Mitzenmacher & Upfal, "Probability and Computing," 2nd ed., Ch 5, for the rigorous analysis). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
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
            <p><strong>Construction</strong> mirrors building a balanced BST from sorted data: at each node, find the median point along the current axis (median-of-medians, or randomized selection — see the Order Statistics lesson — gives O(n) per level), partition the remaining points into "below" and "above", and recurse on each half with the axis advanced. Total build cost is O(n log n), and the resulting tree has height O(log n) by the same argument as a balanced BST built from a sorted array.</p>
            <p><strong>Nearest-neighbor search</strong> descends to the region containing the query point, just like a BST search, then backtracks up the recursion — but unlike a BST, it must also check whether the <em>sibling</em> subtree could possibly contain something closer: it does, only if the splitting plane itself is closer to the query than the best distance found so far. This pruning is what makes k-d trees useful at all; without it, nearest-neighbor search would degrade to scanning every point. In low dimensions this pruning is effective and search runs in roughly O(log n) on average. In high dimensions it stops working — the "curse of dimensionality" means almost every sibling subtree ends up within pruning distance, and search degrades toward O(n). Past roughly 10-20 dimensions, approximate methods (locality-sensitive hashing, or approximate nearest-neighbor libraries) replace exact k-d tree search entirely.</p>
            <p>Applications: nearest-neighbor classifiers, 2D/3D range queries in spatial databases and computer graphics (collision detection, ray tracing acceleration structures), and — in the spirit of this course — nearest-neighbor search over multi-factor feature vectors, e.g. finding historically similar market regimes by treating each day's feature vector as a point.</p>
            <p><strong>Further reading:</strong> Bentley, "Multidimensional Binary Search Trees Used for Associative Searching," <em>CACM</em>, 1975 (the original paper); de Berg, Cheong, van Kreveld & Overmars, <em>Computational Geometry: Algorithms and Applications</em>, 3rd ed., Ch. 5, for the clearest diagrams of the recursive partition and range-query pruning; a step-by-step interactive visualization is available at the University of San Francisco's data structure visualization site (cs.usfca.edu/~galles/visualization) if you want to watch construction and search happen incrementally.</p>
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
            <p>There is a taxonomy worth knowing, because each level requires more machinery: <strong>partial persistence</strong> lets you query any past version but only update the latest one (path copying as described is already enough); <strong>full persistence</strong> lets you update any past version too, producing a branching tree of versions rather than a line; <strong>confluent persistence</strong> additionally allows merging two versions. Full persistence on structures with only forward pointers needs the fat-node / node-splitting machinery of Driscoll, Sarnak, Sleator, and Tarjan; their "fat node" alternative avoids copying an entire new node by instead storing a small append-only log of {version, value} pairs per modified field — O(1) extra space per write, at the cost of O(log #versions) per read to find the right entry.</p>
            <p>This is not a niche technique. Immutable data in functional programming languages <em>is</em> persistence — "no mutation, but still efficient updates" is precisely the problem path copying solves, which is why functional languages lean so heavily on trees rather than arrays. Practical instances: an editor's undo/redo history without storing a full snapshot per keystroke; and, tying back to this course's Range Query Structures, a persistent segment tree answers "what did this range query return as of any past point in time" without rebuilding anything.</p>
            <p><strong>Further reading:</strong> Driscoll, Sarnak, Sleator & Tarjan, "Making Data Structures Persistent," <em>JCSS</em>, 1989 (the foundational paper — defines partial/full/confluent persistence and proves the space/time bounds for the fat-node and node-copying techniques); Okasaki, <em>Purely Functional Data Structures</em>, 1998, Ch. 1-3, for why immutability and persistence are the same idea in a functional setting, with a catalog of structures — leftist heaps, red-black trees, finger trees — built this way from scratch; a step-through visualization of path copying on a BST is available at the Open Data Structures companion site (opendatastructures.org).</p>
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
          title: "Priority Queues: The ADT Behind the Heap",
          section: "Heaps",
          prerequisites: ["algo-binary-heaps"],
          estMinutes: 15,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (separates the priority-queue ADT — insert, extract-min/max, sometimes decrease-key — from the binary heap as just one implementation of it; sets up sorted array / unsorted array / binary heap as a cost-tradeoff table before Fibonacci and van Emde Boas heaps push the same ADT further). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-fibonacci-heap",
          title: "Fibonacci Heaps: Lazy Merging and Amortized Decrease-Key",
          section: "Heaps",
          prerequisites: ["algo-priority-queue-adt", "algo-amortized-potential-method"],
          estMinutes: 40,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (new node in the DAG: a heap-ordered forest with lazy consolidation, amortized O(1) insert/decrease-key via Φ = #trees + 2·#marked-nodes, and the cascading-cut mechanism). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
        },
        {
          id: "algo-van-emde-boas",
          title: "Van Emde Boas Trees: O(log log u) Integer Priority Queues",
          section: "Heaps",
          prerequisites: ["algo-priority-queue-adt", "algo-hashing-universal-families"],
          estMinutes: 35,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (recursive √u-splitting of a bounded universe {0,…,u−1} into clusters plus a summary structure; why it needs an integer universe rather than comparison-based keys; the hash-table-backed sparse variant that brings space down from O(u) to O(n). Source: CLRS 3rd ed. Ch 20). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
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
          title: "Segment Trees and Fenwick Trees: Range Queries",
          section: "Range Query Structures",
          prerequisites: ["algo-binary-heaps"],
          estMinutes: 30,
          content: `
            <p><em>Placeholder — content for this lesson hasn't been written yet (a segment tree is an implicit array-indexed complete binary tree — the same 2i+1/2i+2 layout as the heap lesson — answering range-aggregate queries in O(log n) via divide-and-conquer; a Fenwick/binary-indexed tree gets prefix sums in O(log n) with far less code via the lowbit trick. Sources: CLRS 3rd ed. Ch 14 for the general augmenting-structure technique; Fenwick, "A New Data Structure for Cumulative Frequency Tables," Software: Practice and Experience, 1994; de Berg, Cheong, van Kreveld & Overmars, "Computational Geometry: Algorithms and Applications," 3rd ed., §10.3, for the geometric range-query form). Will be built out after we settle on lesson design.</em></p>
          `,
          exercises: []
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
            <p>Beyond substring search, several classically hard-looking string problems become linear once the tree is built: the <strong>longest repeated substring</strong> of T is the deepest internal (branching) node's path label, since branching is exactly where two or more suffixes stop agreeing; the <strong>longest common substring</strong> of two texts is found by building one <em>generalized</em> suffix tree over both (each leaf tagged with which text it came from) and finding the deepest node with leaves from both texts. Building a suffix tree in linear time is possible (Ukkonen's algorithm) but intricate enough that it's usually cited rather than derived in a first pass.</p>
            <p>A <strong>suffix array</strong> sidesteps that complexity: it is just the suffix tree's leaves read left to right, i.e. the list of suffix-start positions sorted lexicographically — a plain array of integers, no pointers, far more cache-friendly. The Manber-Myers algorithm builds it in O(n log n) via repeated doubling (sort by 1 character, then by 2, then 4, …), and Kasai's algorithm then computes the accompanying LCP (longest-common-prefix) array in a further O(n), recovering the branching information the tree had for free. In practice — genome alignment, full-text search indexes, plagiarism detection, and the Burrows-Wheeler transform behind bzip2 (built directly from the suffix array) — the suffix array plus LCP array is the standard choice; the suffix tree is the conceptual tool you reach for to prove why a query is fast.</p>
            <p><strong>Further reading:</strong> Gusfield, <em>Algorithms on Strings, Trees, and Sequences</em>, 1997 (the standard reference — Ch. 5-7 for suffix trees and generalized suffix trees, motivated throughout by DNA sequence analysis); Manber & Myers, "Suffix Arrays: A New Method for On-Line String Searches," <em>SIAM J. Computing</em>, 1993 (the original suffix array paper); Kasai, Lee, Arimura, Arikawa & Park, "Linear-Time Longest-Common-Prefix Computation in Suffix Arrays," 2001.</p>
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
