// Algorithmics content.
//
// Shape: const ALGORITHMICS_SUBJECT = { id, name, color, chapters: [ { id, name, lessons: [...] } ] }
// Chapters are just a display grouping — they have NO effect on lesson order or unlocking.
// That's what `prerequisites` is for. See the matching header in data-physics.js for the full
// field-by-field doc (id/title/section/prerequisites/estMinutes/content/exercises); same rules
// apply here, ids just use the "algo-" prefix instead of "phys-".
//
// STATUS (2026-09-01, batch 7): the file reached "every lesson has full content, no
// placeholders" — see the bucket list below, which is now historical background only.
// A NEW, DEEPER pass started 2026-09-02 (site owner reviewed batch-7 content and asked for
// concrete proof exercises, multi-case diagrams, and several new topics — see the scheduled
// task prompt for this pass's exact spec if you need the original wording). That pass is
// tracked below; treat THIS block, not the bucket list further down, as the live status.
//
// ===== DEEP PASS STATUS (updated 2026-09-02, run 1) =====
// PART A (structural/style fixes), by sub-item:
//   A1 DONE (run 1). Added 5 "Exercises: <cluster>" nodes to the data-structures chapter, each a
//      one-sentence intro + a numbered problem list (no new teaching prose), prerequisites set to
//      every lesson in that section cluster: algo-exercises-foundations (after algo-linked-lists),
//      algo-exercises-hashing-search-trees (after algo-persistent-data-structures, prereqs include
//      the new algo-bst from A2 below), algo-exercises-heaps (after algo-van-emde-boas),
//      algo-exercises-amortized-structures (after algo-union-find), algo-exercises-tries-range-queries
//      (after algo-suffix-trees-arrays, closing the chapter). Also rewrote
//      algo-what-is-a-data-structure's opening per the site owner's exact wording (names the List
//      ADT and its 4 operations in plain language before the dynamic-array/linked-list diagram,
//      diagram unchanged, "two consequences" paragraph kept verbatim as instructed), removed its
//      inline Try-it-yourself block and its 2 array exercises entirely (exercises: [] now), folding
//      all of that content (adapted) into algo-exercises-foundations instead, alongside new material.
//   A2 DONE (run 1). New lesson algo-bst ("Binary Search Trees") inserted between algo-bst-balance's
//      predecessor position and algo-bst-balance itself (section "Hashing & Search Trees",
//      prerequisites: ["algo-linked-lists"]) — full deep template (goal, BST-property diagram with
//      in-order traversal, search/insert/delete incl. two-children successor-splice case, complexity
//      table incl. expected-O(log n)-random vs Θ(n)-sorted, a rotation-primitive diagram + closing
//      forward-reference to algo-red-black-trees, try-it-yourself = O(1)-extra-space predecessor,
//      2 array exercises). algo-bst-balance's prerequisites updated to
//      ["algo-what-is-a-data-structure", "algo-bst"] as instructed.
//   A3 DONE (run 2). Rewrote algo-red-black-trees COMPLETELY to the deep template: opening goal
//      paragraph; formal definition as 3 numbered axioms (root black / no red-red / equal
//      black-height h_b) with the reused valid-tree SVG anchoring them; a combined try-it-yourself
//      proving both n ≥ 2^h_b − 1 (induction on black-height, CLRS-style) and h ≤ 2h_b (no two
//      consecutive reds on any path), folded solution, followed by the explicit O(log n) bound and
//      why a *worst-case* guarantee (not just expected) matters; a "repair pushes the same kind of
//      violation one level up" conceptual paragraph naming the general pattern (shared with splay
//      trees / B-tree split-merge); the CENTERPIECE — a single "Try it yourself" posing the 3-case
//      insert-fixup (uncle red / black-same-side / black-opposite-side), each case with its own
//      small inline SVG in the problem, and the folded solution walking all 3 cases with their own
//      after-diagrams (6 case diagrams total, plus the axiom-anchor diagram = 7 SVGs in the lesson);
//      a shorter insert/delete-as-primitives closing section (delete's 4-case fixup named/cited to
//      CLRS §13.4 rather than diagrammed, per the brief); closing remark cross-linking algo-bst,
//      algo-splay-trees, algo-b-trees, and algo-amortized-potential-method (noting the shared
//      "bound repeated local pushes" argument shape); further reading with specific CLRS 3rd ed.
//      Ch 13 section numbers; italic slogan. prerequisites changed to ["algo-bst"] (was
//      algo-bst-balance) as instructed. Title stayed bare "Red-Black Trees". NOTE: algo-avl-trees
//      does not exist yet (that's A4), so the closing remark does not link it — mentions AVL
//      comparison only via the existing algo-bst-balance cross-link already in that lesson's own
//      remark; add a direct algo-red-black-trees <-> algo-avl-trees cross-link when A4 lands.
//   A4 DONE (run 3). New lesson algo-avl-trees ("AVL Trees") inserted right after
//      algo-red-black-trees (section "Hashing & Search Trees", prerequisites: ["algo-bst",
//      "algo-amortized-potential-method"]) — full deep template: opening goal paragraph naming
//      Adelson-Velsky/Landis 1962; formal definition as the single balance-factor axiom
//      |bf(x)| ≤ 1 (bf(x) = height(left)−height(right), empty subtree height −1); a small valid
//      AVL tree SVG with per-node balance-factor annotations; a try-it-yourself proving the
//      Fibonacci-tree minimum-node-count recurrence N(h)=N(h−1)+N(h−2)+1 and deriving
//      h ≤ log_φ(n+1)−1 ≈ 1.44·log₂(n+1), explicitly contrasted with red-black's looser 2·log₂(n+1)
//      bound; a repair-strategy paragraph explaining insert needs at most one rotation event
//      (fixed subtree height is restored exactly) while delete can cascade up to O(log n) rotation
//      events (contrasted explicitly with red-black's O(1)-rotations-either-way); the CENTERPIECE
//      — LL/RR/LR/RL cased try-it-yourself, LL and LR each with their own problem-state SVG (RR/RL
//      described in prose as exact mirrors to keep the lesson's diagram count reasonable — 3
//      diagrams total: the axiom-anchor tree, the LL problem, the LR problem, plus one LR solution
//      diagram showing the double-rotation's single clean end state = 4 SVGs), folded solution
//      covering all four cases; a short insert/delete-as-primitives closing section; closing
//      remark cross-linking algo-bst and algo-red-black-trees with an explicit AVL-vs-RB tradeoff
//      statement; further reading (Knuth TAOCP Vol 3 §6.2.3, CLRS Problem 13-3, the 1962 Doklady
//      paper); italic slogan. Reciprocally updated algo-red-black-trees's closing Remark to add a
//      two-way cross-link to algo-avl-trees with the same tradeoff framing (was previously a NOTE
//      flagging this as pending), and added "algo-avl-trees" to
//      algo-exercises-hashing-search-trees's prerequisites array so that ex-lesson's gating covers
//      the full section cluster again.
//   A5 NOT STARTED (lower priority, only if budget allows after A1-A4 and all of Part B).
// PART B (new topics), by sub-item:
//   B1 DONE (run 4). Added 4 new lessons to the "algorithms" chapter, section "Dynamic Programming",
//      each prerequisites: ["algo-dynamic-programming"], inserted directly after algo-dynamic-
//      programming and before algo-greedy-matroids: algo-longest-increasing-subsequence (both the
//      Θ(n²) ending-at-i DP and the Θ(n log n) patience-sorting method with a worked tails-array
//      table over [3,1,4,1,5,9,2,6], try-it-yourself = reconstructing the actual subsequence via
//      parent pointers, 2 proof/adaptation exercises); algo-dp-on-trees (postorder tree DP framed
//      via maximum-weight independent set, dp[v][0]/dp[v][1] recurrence, a small annotated SVG tree
//      worked by hand, try-it-yourself connecting it to minimum vertex cover via the independent-
//      set/vertex-cover complement relation, 2 exercises incl. designing the tree-diameter DP);
//      algo-bitmask-dp-tsp (Held-Karp dp[S][j] over subsets, recurrence + complexity, a small
//      4-city worked instance with a stated optimal tour, try-it-yourself = tour reconstruction via
//      parent[S][j], 2 exercises incl. adapting to Hamiltonian path); algo-digit-dp (tight-flag +
//      pos + extra-state formulation, a hand-verified digit-sum-≤4-over-[0,23] worked example,
//      try-it-yourself = no-two-adjacent-equal-digits variant, 2 exercises incl. the [L,R] range
//      trick via f(R)-f(L)). Per the task brief these are lighter than the A3/A4 full deep template
//      (no formal-axiom section, no multi-case centerpiece) but each has a diagram-or-worked-table,
//      an inline try-it-yourself with folded solution, and 2 real exercises, matching the existing
//      algo-dynamic-programming lesson's own "state design" house style. algo-dynamic-programming
//      itself was left untouched as instructed.
//   B2 DONE (run 5). New lesson algo-fft ("The Fast Fourier Transform") added to the "algorithms"
//      chapter, new section "Numerical & Signal Algorithms" (inserted right after algo-greedy-matroids,
//      the chapter's last lesson before this section), prerequisites: ["algo-sorting-lower-bound-
//      mergesort"] — motivates via polynomial multiplication (naive Θ(n²) convolution vs the
//      evaluate/multiply/interpolate strategy), an inline SVG diagram of the even/odd coefficient
//      split (one level of the D&C recursion, 8-coefficient example), the T(n)=2T(n/2)+Θ(n) recurrence
//      argument mirroring merge sort, a brief mention of the iterative in-place bit-reversal/butterfly
//      version (named, not derived), the zero-padding-avoids-circular-convolution caveat, applications
//      to big-integer multiplication and signal-processing convolution, a try-it-yourself on why
//      pointwise multiplication of DFTs gives circular not linear convolution (folded solution), 2
//      exercises (roots-of-unity squaring argument; floating-point precision vs NTT). Further reading:
//      CLRS 3rd ed Ch 30.
//   B3 DONE (run 5). New lesson algo-sparse-linear-algebra ("Sparse Linear Algebra") added to the
//      same new section, prerequisites: ["algo-dynamic-arrays-amortization"] — COO/CSR/CSC formats
//      table with tradeoffs, an inline SVG sparsity-pattern grid (4x4, 6 nonzeros) plus the matching
//      worked CSR triple (val/col_idx/row_ptr arrays), the Θ(nnz) sparse matvec argument, a fill-in
//      explanation of why direct Gaussian elimination is unattractive at scale (with reordering
//      heuristics named), a one-sentence mention that conjugate gradient/Krylov methods exist for
//      sparse SPD systems without deriving them, in-prose (no hyperlink, per the brief's safe-fallback
//      instruction) mentions of the Data Science subject's "LU Factorization and the Role of Pivoting"
//      and "Conditioning and Backward Stability" lessons by title. CORRECTION to the brief's premise,
//      relevant to whichever run picks up B7's possible Lagrange-duality/KKT cross-link: js/app.js's
//      router is actually subject-agnostic — renderLesson(subjectId, chapterId, lessonId) resolves
//      findSubject(subjectId) straight from the URL hash, not from whichever file's content produced
//      the <a>, so a real cross-subject hyperlink like
//      #/subject/datascience/numerical-linear-algebra/algo-lu-pivoting written inside
//      data-algorithmics.js content WOULD resolve correctly (checked by reading app.js's route() /
//      renderLesson() / lessonLink(), not by live-testing in a browser — no lesson in the repo
//      currently uses a cross-subject link as precedent, so treat this as fairly confident but
//      unverified in practice). Left as prose here since it already reads fine either way; a future
//      run can use a real link instead once this premise correction is accounted for.
//      A try-it-yourself proving the star/arrowhead-matrix fill-in example (eliminate hub
//      first = total fill-in, eliminate leaves first = none, folded solution), 2 exercises (COO→CSR
//      via counting-sort-style bucketing in Θ(nnz+n), tying back to the counting-sort mention in
//      algo-sorting-lower-bound-mergesort; CSR↔CSC conversion cost). Further reading: Saad (2003),
//      Davis (2006).
//   B4 DONE (run 5). New lesson algo-matrix-multiplication ("Fast Matrix Multiplication") added to
//      the same new section, prerequisites: ["algo-divide-and-conquer"] — recaps Strassen's
//      Θ(n^log₂7)≈Θ(n^2.807) by cross-linking to algo-divide-and-conquer's existing derivation rather
//      than duplicating it, introduces BOOLEAN matrix multiplication (OR/AND semiring, same block
//      recursion since it only needs associativity+distributivity) explicitly so B5 can depend on this
//      lesson's id, a worked table of repeated squaring of A∨I over a 4-node path graph accumulating
//      1-step/2-step/4-step reachability, a try-it-yourself on why the chain must start from A∨I (not
//      A alone) and why ⌈log₂n⌉ squarings always suffice (folded solution), a closing "galactic
//      algorithms" paragraph name-dropping Coppersmith-Winograd/Alman-Vassilevska Williams without
//      derivation, 2 exercises (master-theorem verification + a hypothetical-6-products comparison;
//      semiring-axiom check for (OR,AND)). Further reading: CLRS 3rd ed §4.2, Alman & Vassilevska
//      Williams SODA 2021. NOTE for B5: this lesson's id is "algo-matrix-multiplication" — use that
//      exact id in algo-seidel-apsp's prerequisites array.
//   B5 DONE (run 6). New lesson algo-seidel-apsp ("Seidel's Algorithm for APSP") inserted into the
//      "graph-algorithms" chapter, section "Shortest Paths (general)", directly after
//      algo-all-pairs-shortest-paths (before algo-mst-cut-property), prerequisites: ["algo-all-pairs-
//      shortest-paths", "algo-matrix-multiplication"] — explains concretely why naive Boolean squaring
//      of A∨I (from algo-matrix-multiplication's own try-it-yourself, cross-linked) only ever recovers
//      reachability, never real distances, since OR-accumulation is monotonic and throws away exact hop
//      count; states the recursive relation T[i][j] = ⌈D[i][j]/2⌉ between G's true distances D and the
//      "squared graph" G⁽²⁾'s distances T; derives (at textbook-summary level, explicitly flagged as
//      such rather than a full re-derivation of the 1995 proof) the parity-recovery test X[i][j] ≥
//      T[i][j]·deg(j) using one extra ordinary (non-Boolean) matrix product X = T·A, with the
//      "handoff neighbor" intuition for why that test decides the even/odd branch; a 2-row worked
//      table on the path graph 1–2–3–4 computing both the even case (i,j)=(1,3) and setting up the odd
//      case (i,j)=(1,4) fully verified by hand; a small inline SVG comparing the path graph to its
//      squared graph (only the 1–4 pair stays non-adjacent after squaring); try-it-yourself = redo the
//      (1,4) odd-case computation from raw definitions (folded solution, all arithmetic verified); 2
//      exercises (prove the T[i][k] ≥ T[i][j]−1 neighbor inequality the test relies on; explain which
//      step breaks for directed or weighted graphs). Further reading: Seidel JCSS 1995, CLRS Problem
//      25-2. Ends with an explicit "honest scope" remark distinguishing mechanism-level understanding
//      from a full correctness-proof reproduction, per the brief's instruction to state the result
//      honestly when summarizing rather than fully re-deriving.
//   B6 DONE (run 6). Added a brand-new chapter, id "computational-geometry" / name "Computational
//      Geometry", inserted as the fourth and last chapter (after "graph-algorithms") in
//      ALGORITHMICS_SUBJECT.chapters — chosen over cramming into "algorithms" because convex hull and
//      segment intersection are a distinct discipline from the existing chapters' contents, matching
//      this file's own historical precedent of splitting by discipline (see the datascience-split note
//      below). Two lessons, both section "Computational Geometry": (1) algo-convex-hull ("Convex
//      Hull"), prerequisites: ["algo-sorting-lower-bound-mergesort"] — Graham scan via pivot-select +
//      angular sort + push/pop-on-right-turn scan, an inline SVG of a traced hull over a point scatter,
//      a second inline SVG anchoring the cross-product orientation test, the O(n log n) cost table
//      (sort dominates; scan is O(n) amortized via the push-once/pop-once argument), a numeric
//      try-it-yourself computing one orientation test by hand (folded solution), cross-links to
//      algo-divide-and-conquer's closest-pair coverage as a sibling geometry technique plus a one-line
//      mention that a divide-and-conquer hull variant also exists at the same O(n log n). (2)
//      algo-segment-intersection ("Line Segment Intersection"), prerequisites: ["algo-convex-hull",
//      "algo-binary-heaps"] — the Bentley-Ottmann sweep: event queue (priority queue, cross-linked to
//      algo-binary-heaps) ordered by x, status structure (balanced BST) ordered by each active
//      segment's y at the sweep line, the three event types (left endpoint / right endpoint /
//      intersection swap) and what each tests, an inline SVG of three segments at a sweep position
//      with the resulting status order labeled, the "only adjacent pairs can intersect" lemma stated
//      and justified in prose, the O((n+k) log n) output-sensitive complexity vs O(n²) brute force
//      table, a try-it-yourself walking through which pairs the diagram's own sweep tests first
//      (folded solution), 2 exercises (prove the adjacency lemma properly; handle the vertical-segment
//      and triple-intersection degenerate cases). Both lessons verified to exist with no dangling
//      prerequisite references (checked programmatically this run — 63 total lessons, 0 duplicate ids,
//      0 missing prerequisite ids across the whole file).
//   B7 NOT STARTED (Linear Programming: simplex overview + LP duality). CHAPTER-PLACEMENT DECISION for
//      the next run: do NOT put B7 into the new "computational-geometry" chapter — linear programming
//      is not a geometry topic (the feasible-polytope picture is an illustration, not the discipline),
//      and stretching that chapter's name to cover it would make the chapter name misleading. Instead
//      add a new section "Linear Programming" to the existing "algorithms" chapter (same chapter,
//      alongside "Dynamic Programming" / "Numerical & Signal Algorithms" / etc. — LP genuinely is an
//      algorithmic technique in the same sense those are), with at least two lessons as the brief
//      specifies: (a) LP formulation + geometric intuition + Simplex overview (vertices of the feasible
//      polytope, pivoting, exponential worst case vs. fast in practice), prerequisites:
//      ["algo-greedy-matroids"] (reasonable "advanced technique" gate, matching the brief's suggestion)
//      — consider a small inline SVG of a 2D feasible polytope with an optimal vertex highlighted; (b)
//      LP Duality (weak/strong duality, complementary slackness), prerequisites: the simplex lesson's
//      id once assigned — note in prose (no hyperlink needed, this is intra-file so a real link IS
//      possible per algo-sparse-linear-algebra's app.js-routing correction, but the Data Science
//      subject's Lagrange Duality/KKT lesson lives in a different file/subject, so still name it in
//      prose only unless a cross-subject link is deliberately added).
// NEXT UP OVERALL: B7 (Linear Programming — see the CHAPTER-PLACEMENT DECISION note directly above for
//   exactly where it goes and why). After B7, only A5 remains (upgrading algo-splay-trees /
//   algo-b-trees / algo-skip-lists to the deep template where their mechanism fits it — lowest
//   priority, do it last). Once A5 is either done or deliberately skipped as out of budget, the ENTIRE
//   v2 deep pass is complete — a future run should confirm both B7 and A5's status explicitly before
//   declaring completion, then stop inventing new scope per this pass's own rules.
// ===== END DEEP PASS STATUS =====
//
// ----- Historical: pre-deep-pass batch history (superseded by the DEEP PASS STATUS above) -----
// As of 2026-09-01 batch 7: THE ENTIRE FILE WAS complete under the pre-deep-pass standard. Every
// lesson in every chapter (Data Structures, Algorithms, Graph Algorithms) had full content — no
// placeholders remained anywhere in js/data-algorithmics.js under that standard.
// This file covers Data Structures / Algorithms / Graph Algorithms only (as of pre-deep-pass batch 7;
// the deep pass added a fourth chapter, Computational Geometry — see DEEP PASS STATUS above, B6).
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
//      "algorithms" + "graph-algorithms" except the placeholders listed below. This bucket also
//      includes algo-topological-sort-dag-dp, algo-dijkstra, algo-bellman-ford, and
//      algo-mst-cut-property, which are real, substantive content but predate the current style
//      template (no inline SVG / try-it-yourself block / slogan) — confirmed NOT placeholders when
//      checked in batch 5, and out of scope for now (not on the restyle list below).
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
//   2c. NEW full-style content written in Graph Algorithms as of 2026-09-01, batch 5 (same template as
//      bucket 2/2b): algo-dfs, algo-bfs, algo-scc-kosaraju (title trimmed to bare "Kosaraju's
//      Algorithm"; section changed to "SCC family" to disambiguate from Tarjan's lesson without a
//      colon-subtitle in the title itself).
//   2d. NEW full-style content written in the Algorithms chapter as of 2026-09-01, batch 6 (same
//      template as bucket 2/2b/2c): algo-heapsort, algo-linear-time-sorting (title trimmed from
//      "Sorting in Linear Time: Counting, Radix, and Bucket Sort" to bare "Linear-Time Sorting"),
//      algo-order-statistics-selection (title trimmed from "Order Statistics: Linear-Time Selection"
//      to bare "Order Statistics"). This completes ALL of the "Algorithms" chapter's former
//      placeholders (CLRS Part II, Sorting and Order Statistics) — every placeholder that chapter had
//      is now full-style content; the chapter's pre-existing non-placeholder lessons
//      (algo-amortized-potential-method, algo-sorting-lower-bound-mergesort, algo-randomized-quicksort,
//      algo-binary-search-invariants, algo-divide-and-conquer, algo-dynamic-programming,
//      algo-greedy-matroids) remain bucket-1 material, out of scope for this pass.
//   2e. NEW full-style content written in Graph Algorithms as of 2026-09-01, batch 7 (same template as
//      bucket 2/2b/2c/2d), finishing the last remaining placeholders in the whole file: algo-scc-tarjan
//      (title trimmed to bare "Tarjan's Algorithm"; section set to "SCC family" alongside Kosaraju's),
//      algo-bridges-articulation, algo-2sat-scc, algo-eulerian-path-hierholzer,
//      algo-max-flow-ford-fulkerson (title trimmed from "Maximum Flow: Ford-Fulkerson and
//      Edmonds-Karp" to bare "Maximum Flow"), algo-bipartite-matching, and
//      algo-all-pairs-shortest-paths (title trimmed from "All-Pairs Shortest Paths: Floyd-Warshall and
//      Johnson" to bare "All-Pairs Shortest Paths"). No placeholder nodes remain anywhere in this file
//      — see the STATUS line above.

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
            <p>Let us look at the simplest interesting ADT — the <strong>list</strong>. Its goal is to implement an ordered list of elements. The operations we'd like this ADT to support are: change the data in position i, get the data in position i, remove a position, add a position. That's the whole contract, stated with no commitment yet to how any of it is actually built.</p>
            <p>Every data structure in this course answers two separate questions, and most of the early confusion in this area comes from answering them at once. The first question is <em>what can you do with it</em> — the four operations just named are exactly that: a promise about behavior, with no mention of arrays, pointers, or memory layout. That promise, stated purely in terms of behavior, is the <strong>abstract data type</strong> (ADT). The second question is <em>how is it actually built</em> — arrays, pointers, hashing — and that is the <strong>data structure</strong> proper: one concrete realization of the contract, with its own time and space costs.</p>
            <p>The diagram below makes the split concrete. Two structures implement the exact same List interface with opposite performance profiles:</p>
            <svg viewBox="0 0 520 220" width="100%" height="220" style="max-width:520px;display:block;margin:0.8rem auto;" role="img" aria-label="A List ADT box at top, with arrows down to two implementation boxes: dynamic array (fast get, slow front-insert) and linked list (slow get, fast front-insert)">
              <rect x="160" y="10" width="200" height="60" rx="8" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="260" y="35" text-anchor="middle" fill="var(--text)" font-size="14" font-weight="600">List ADT</text>
              <text x="260" y="55" text-anchor="middle" fill="var(--text-muted)" font-size="11">get(i)   set(i,x)   insert(i,x)   remove(i)</text>
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
            <p>Both are covered in full in their own lessons — <a href="#/subject/algorithmics/data-structures/algo-dynamic-arrays-amortization">dynamic arrays</a> and <a href="#/subject/algorithmics/data-structures/algo-linked-lists">linked lists</a> — but the shape of the trade-off is already visible above: one buys O(1) random access, the other buys O(1) front-insertion, and no structure gets both for free.</p>
            <p>Two consequences follow immediately, and they recur in every later lesson. First, you can swap implementations without changing any code that only talks to the ADT — this is the entire justification for a database index switching from a B-tree to a hash index, or for choosing Python's <code>list</code> versus <code>collections.deque</code>. Second, "which structure is best" is not answerable without knowing the operation mix: a workload dominated by random access wants the array; one dominated by front-insertion wants the list.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Dynamic array</th><th>Linked list</th><th>Why</th></tr>
              <tr><td>get(i)</td><td>O(1)</td><td>O(i)</td><td>array indexes directly by address; a list must walk links from the head</td></tr>
              <tr><td>insert(0, x)</td><td>O(n)</td><td>O(1)</td><td>array shifts everything right one slot; a list just relinks the head pointer</td></tr>
            </table>
            <p>Every later lesson in this chapter is filling in a row of a much bigger version of the table above — the same handful of ADTs (list, set, map, priority queue), an increasing number of implementations, each buying a different point on the time/space trade-off curve.</p>
            <p><strong>Remark:</strong> a structure's <strong>invariant</strong> is the standing property its operations must preserve — sortedness for a sorted array, the heap property for a heap, no cycles for a tree — and it's worth naming up front because every lesson from here on leans on it without saying so again.</p>
            <p><strong>Remark:</strong> reading any new structure well means asking three questions in order: what is the invariant, why does maintaining it make some operation cheap, and what does maintaining it cost on the operations that don't benefit. That question triage is the actual skill this chapter is teaching; the specific structures — starting with <a href="#/subject/algorithmics/data-structures/algo-stacks">stacks</a> and <a href="#/subject/algorithmics/data-structures/algo-queues">queues</a> next — are the practice material.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 10 introduction (stacks/queues/lists as the first worked instances of implementing an ADT); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §1.2 ("Data Types") for the clearest short treatment of the ADT/implementation split specifically; Pat Morin, <em>Open Data Structures</em> (free, opendatastructures.org), Ch. 1, for the same ground with runnable code in several languages if you want to see interfaces expressed as code rather than prose.</p>
            <p><em>The whole idea in one line: the contract is what it promises, the structure is how it pays for that promise.</em></p>
          `,
          exercises: []
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
          id: "algo-exercises-foundations",
          title: "Exercises: Foundations",
          section: "Foundations",
          prerequisites: ["algo-what-is-a-data-structure", "algo-stacks", "algo-queues", "algo-linked-lists"],
          estMinutes: 35,
          content: `
            <p>Six problems drawing on the List ADT and its first three implementations — stacks, queues, and linked lists — from most concrete to most open-ended.</p>
            <ol>
              <li>Define an ADT for a <strong>multiset</strong> (a collection allowing duplicates, supporting insert, remove-one-instance, and count(x)). Give two different data structures implementing it, and describe a workload where each wins.</li>
              <li>The Python <code>list</code> and <code>collections.deque</code> both implement something close to the List ADT. Look up (or measure) the cost of <code>appendleft</code> on each. Explain the discrepancy in terms of the underlying data structure, not the interface.</li>
              <li>A stack (push/pop from one end) and a queue (enqueue at one end, dequeue from the other) are both, in ADT terms, restricted versions of the List ADT. Which one can be implemented with O(1) worst-case operations using <em>only</em> a plain dynamic array with no shifting ever — and which one genuinely needs either a circular-buffer index trick or a linked structure to avoid O(n) shifts? Justify the asymmetry from the ADT's access pattern, not from either implementation.</li>
              <li>A linked-list-backed stack never resizes and so has O(1) <em>worst-case</em> push/pop, while a dynamic-array-backed stack has O(1) only <em>amortized</em> — some individual push triggers a full O(n) resize. Describe a real-time system where amortized O(1) is not an acceptable guarantee, and argue whether switching to the linked-list stack actually solves the problem or merely relocates the same worst-case cost into the memory allocator's <code>malloc</code> call.</li>
              <li>Prove that a naive array-backed queue — which shifts every remaining element left by one on each dequeue — can cost Θ(n²) total over a sequence of n interleaved enqueues and dequeues. Then explain precisely how the circular-buffer fix (advancing head/tail indices modulo capacity instead of shifting) reduces this to O(1) per operation in the <em>worst case</em>, not merely on average.</li>
              <li>Design a data structure supporting <code>push</code>, <code>pop</code>, and <code>findMin</code>, all in O(1) worst-case time, built only out of stacks (no other structure, no per-element bound on values). Prove that your <code>findMin</code> is always correct, including immediately after a sequence of pops that removes the current minimum.</li>
            </ol>
          `,
          exercises: []
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
          id: "algo-bst",
          title: "Binary Search Trees",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-linked-lists"],
          estMinutes: 28,
          content: `
            <p>A binary search tree stores keys in a pointer structure — the same node-and-pointers idea as a linked list, now with two pointers per node instead of one — arranged so that search, insert, delete, and sorted iteration all fall out of a single ordering rule, with no shifting and no fixed capacity.</p>
            <p>The rule is the <strong>BST property</strong>: at every node x, every key in x's left subtree is less than x's key, and every key in x's right subtree is greater. Applied recursively, that one local rule at every node forces the whole tree into a single global order:</p>
            <svg viewBox="0 0 400 230" width="100%" height="230" style="max-width:420px;display:block;margin:0.8rem auto;" role="img" aria-label="A binary search tree with root 8, left child 3, right child 10, 3's children 1 and 6, 10's right child 14, and below it the sorted sequence 1 3 6 8 10 14 with an in-order traversal arrow">
              <g font-size="13" text-anchor="middle">
                <line x1="200" y1="30" x2="100" y2="90" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="200" y1="30" x2="300" y2="90" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="100" y1="90" x2="50" y2="150" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="100" y1="90" x2="150" y2="150" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="300" y1="90" x2="350" y2="150" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="200" cy="20" r="17" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="200" y="25" fill="var(--text)">8</text>
                <circle cx="100" cy="90" r="16" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="100" y="95" fill="var(--text)">3</text>
                <circle cx="300" cy="90" r="16" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="300" y="95" fill="var(--text)">10</text>
                <circle cx="50" cy="150" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="50" y="154" fill="var(--text)">1</text>
                <circle cx="150" cy="150" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="150" y="154" fill="var(--text)">6</text>
                <circle cx="350" cy="150" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="350" y="154" fill="var(--text)">14</text>
              </g>
              <g font-size="12" text-anchor="middle" fill="var(--text-muted)">
                <text x="50" y="200">1</text>
                <text x="120" y="200">3</text>
                <text x="190" y="200">6</text>
                <text x="260" y="200">8</text>
                <text x="330" y="200">10</text>
                <text x="380" y="200">14</text>
              </g>
              <defs><marker id="bstarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <line x1="40" y1="212" x2="385" y2="212" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#bstarrow)"/>
              <text x="215" y="228" text-anchor="middle" fill="var(--accent)" font-size="11">in-order traversal</text>
            </svg>
            <p>That last claim — in-order traversal (recursively: visit left subtree, visit this node, visit right subtree) always produces the keys in sorted order — is a direct induction on the BST property: everything visited before x is either in x's left subtree (all smaller) or an ancestor whose own left subtree x sits in (also smaller by the same rule applied one level up), and symmetrically for everything visited after.</p>
            <p>The operations are all a single downward walk, or a walk plus one splice:</p>
            <ul>
              <li><strong>Search(k)</strong> — start at the root; if k equals the current key, done; if k is smaller go left, if larger go right; repeat until found or a null pointer is reached (not present).</li>
              <li><strong>Insert(k)</strong> — search for k; when the walk falls off the tree (hits null), attach a new node with key k exactly there. The tree only ever grows at its fringe.</li>
              <li><strong>Delete(k)</strong> — three cases. A leaf is just unlinked from its parent. A node with one child is spliced out, its parent linking directly to that one child. A node with <em>two</em> children cannot simply be removed without breaking the ordering on both sides, so instead: find its in-order <strong>successor</strong> (the leftmost node of its right subtree — the next key up in sorted order), copy that successor's key into the node being "deleted", then delete the successor instead, which by construction has no left child and so falls into one of the first two cases.</li>
            </ul>
            <p><strong>Remark:</strong> the two-children delete case is the one place a beginner's implementation usually goes wrong — the fix is never to physically remove a node with two children, only ever a node with at most one.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Search / insert / delete</td><td>O(h)</td><td>each is one downward walk (delete: plus one O(h) successor search), h = tree height</td></tr>
              <tr><td>In-order traversal</td><td>O(n)</td><td>every node visited exactly once</td></tr>
              <tr><td>h, random insertion order</td><td>O(log n) expected</td><td>a randomly built BST has expected height O(log n) (CLRS §12.4)</td></tr>
              <tr><td>h, sorted insertion order</td><td>Θ(n) worst case</td><td>inserting 1,2,3,…,n in order degenerates into a linked list — no rebalancing happens on its own</td></tr>
            </table>
            <p>That last row is the entire motivation for the next few lessons: nothing in the BST property itself prevents the tree from turning into a linked list under an adversarial or merely unlucky insertion order, and O(n) search defeats the whole point of using a tree.</p>
            <p>The fix, when it comes, will not be a different tree shape bolted on from outside — it will be a single local primitive applied opportunistically during ordinary inserts and deletes. That primitive is <strong>rotation</strong>: a single rotation changes which of two adjacent nodes is on top, without touching anything outside that pair, and — this is the part worth staring at — <em>without changing the in-order sequence at all</em>:</p>
            <svg viewBox="0 0 480 220" width="100%" height="220" style="max-width:480px;display:block;margin:0.8rem auto;" role="img" aria-label="Before: node y on top with left child x and right child C, x has children A and B. After a right rotation: node x on top with left child A and right child y, y has children B and C.">
              <g font-size="13" text-anchor="middle">
                <text x="100" y="14" fill="var(--text-muted)" font-size="11">before</text>
                <line x1="110" y1="30" x2="60" y2="90" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="110" y1="30" x2="160" y2="90" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="60" y1="90" x2="30" y2="150" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="60" y1="90" x2="90" y2="150" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="110" cy="20" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="110" y="25" fill="var(--text)">y</text>
                <circle cx="60" cy="90" r="16" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="60" y="95" fill="var(--text)">x</text>
                <circle cx="160" cy="90" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="160" y="95" fill="var(--text)">C</text>
                <circle cx="30" cy="150" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="30" y="155" fill="var(--text)">A</text>
                <circle cx="90" cy="150" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="90" y="155" fill="var(--text)">B</text>
              </g>
              <defs><marker id="bstrotarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <line x1="205" y1="90" x2="255" y2="90" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#bstrotarrow)"/>
              <text x="230" y="80" text-anchor="middle" fill="var(--accent)" font-size="11">rotate right</text>
              <g font-size="13" text-anchor="middle">
                <text x="390" y="14" fill="var(--text-muted)" font-size="11">after</text>
                <line x1="390" y1="30" x2="340" y2="90" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="390" y1="30" x2="440" y2="90" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="440" y1="90" x2="410" y2="150" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="440" y1="90" x2="470" y2="150" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="390" cy="20" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="390" y="25" fill="var(--text)">x</text>
                <circle cx="340" cy="90" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="340" y="95" fill="var(--text)">A</text>
                <circle cx="440" cy="90" r="16" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="440" y="95" fill="var(--text)">y</text>
                <circle cx="410" cy="150" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="410" y="155" fill="var(--text)">B</text>
                <circle cx="470" cy="150" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="470" y="155" fill="var(--text)">C</text>
              </g>
            </svg>
            <p>Before and after, the in-order sequence is identical — A, x, B, y, C — because B (the one subtree that changes parents) still sits between x and y in sorted order either way; only the tree's <em>shape</em> changed, in O(1) pointer reassignments. A rotation is a primitive, not a complete balancing scheme by itself — it is the single move that <a href="#/subject/algorithmics/data-structures/algo-red-black-trees">red-black trees</a> and later balanced-tree lessons in this chapter apply, over and over, according to their own bookkeeping rules, to keep height provably logarithmic no matter the insertion order.</p>
            <p><strong>Try it yourself:</strong> given a pointer to a node x in a BST (nodes store only <code>left</code> and <code>right</code> pointers, no parent pointer, no extra per-node bookkeeping) and a pointer to the tree's root, find x's in-order <strong>predecessor</strong> — the node that would come immediately before x in sorted order — using only O(1) extra space beyond the walk itself.</p>
            <details><summary>Solution</summary>
              <p>Two cases, exactly mirroring the successor definition used above in delete. If x has a left subtree, the predecessor is the <em>rightmost</em> node of that subtree — walk <code>left</code> once, then <code>right</code> until a null right pointer, in O(h) time and O(1) space. If x has no left subtree, the predecessor is the nearest ancestor for which x lies in the right subtree — and without parent pointers, that means finding it via one walk down from the root: keep a variable <code>candidate = null</code>; starting at the root, at each step compare the current node's key to x's key — if x's key is smaller, go left; if larger, set <code>candidate</code> to the current node (it's a valid "x is in my right subtree" ancestor so far) and go right; if equal, stop. When the walk reaches x, <code>candidate</code> holds the answer (or null, if x is the overall minimum key and has no predecessor). Both branches are a single downward walk with one extra pointer-sized variable — O(h) time, O(1) extra space, no parent pointers and no recursion stack required.</p>
            </details>
            <p><strong>Remark:</strong> everything above holds for an arbitrary, unbalanced BST — nothing here assumed anything about height beyond "whatever it happens to be". <a href="#/subject/algorithmics/data-structures/algo-bst-balance">Balanced search trees</a> pick up exactly where the table above left off: which local invariant, repaired with rotations after every insert and delete, forces h = O(log n) regardless of input order.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 12 (§12.1–12.3 for the BST property, traversal, search, insert and delete; §12.4 for the expected-O(log n)-height theorem on a randomly built BST).</p>
            <p><em>The whole idea in one line: one ordering rule, applied at every node, turns "where does this key belong" into a single walk down, and "list everything in order" into a walk you were already doing.</em></p>
          `,
          exercises: [
            "Prove by induction on subtree size that in-order traversal of a BST visits keys in strictly increasing order, using only the BST property (every node's left subtree is entirely smaller, right subtree entirely larger).",
            "Trace the deletion of a node with two children from a concrete 7-node BST of your choosing, showing the tree before and after, and explicitly identify the in-order successor at each step. Then explain why using the in-order <em>predecessor</em> instead (leftmost of... rather rightmost of the left subtree) would work exactly as well, and why real implementations sometimes alternate between the two to avoid always skewing the tree in the same direction."
          ]
        },
        {
          id: "algo-bst-balance",
          title: "Balanced Search Trees: Why Rotations Suffice",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-what-is-a-data-structure", "algo-bst"],
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
          prerequisites: ["algo-bst"],
          estMinutes: 40,
          content: `
            <p>A red-black tree keeps a binary search tree balanced automatically, on every single insert and delete, so that search, insert, and delete all stay O(log n) even if the keys arrive in an order designed to make a plain BST degenerate into a linked list. It does this by imposing exactly one extra piece of structure on every node — a color — and repairing that structure with a bounded amount of local work whenever an update threatens it.</p>
            <p>Formally, a red-black tree is a binary search tree in which every node is colored red or black, subject to three axioms:</p>
            <ol>
              <li>the root is black;</li>
              <li>no red node has a red child;</li>
              <li>every root-to-leaf path contains the same number of black nodes — call this number the <strong>black-height</strong>, h<sub>b</sub>.</li>
            </ol>
            <p>("Leaf" here means a NIL pointer, not a node with real data — every real node's missing children count as black leaves for axiom 3 to be well-defined.) The tree below satisfies all three: the root is black, no accent-colored (red) node sits directly above another, and every one of its four root-to-leaf paths passes through exactly two black nodes:</p>
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
            <p><strong>Try it yourself:</strong> using only the three axioms above, prove two facts about a red-black tree with n <em>internal</em> (real) nodes and black-height h<sub>b</sub> at the root: (1) n ≥ 2<sup>h<sub>b</sub></sup> − 1, and (2) the tree's height h (the number of edges on the longest root-to-leaf path) satisfies h ≤ 2·h<sub>b</sub>.</p>
            <details><summary>Solution</summary>
              <p><strong>Part 1, by induction on black-height.</strong> Define bh(x), for any node x, as the number of black nodes on the path from x down to a leaf, not counting x itself — so a NIL leaf has bh = 0. <em>Base case:</em> bh(x) = 0 means x is itself a NIL leaf, contributing 0 internal nodes, and 2⁰ − 1 = 0 — the bound holds with equality. <em>Inductive step:</em> take an internal node x with bh(x) = b > 0, and consider either child. By axiom 3, both of x's children have the same black-height "budget" remaining below them: if a child is black, its own bh is b − 1 (one black node — the child itself — has been consumed); if a child is red, its bh is still b (red nodes don't count, and axiom 2 guarantees x itself, being the parent of a red node, imposes no further consumption at this step). Either way, each child's subtree has black-height at least b − 1, so by the inductive hypothesis each contains at least 2<sup>b−1</sup> − 1 internal nodes. Summing both children and adding 1 for x itself: x's subtree has at least 2(2<sup>b−1</sup> − 1) + 1 = 2<sup>b</sup> − 1 internal nodes. Applying this at the root, whose bh is h<sub>b</sub>, gives n ≥ 2<sup>h<sub>b</sub></sup> − 1.</p>
              <p><strong>Part 2.</strong> By axiom 2, no red node has a red child, so no two consecutive nodes on any root-to-leaf path can both be red — every red node is immediately followed (going down) by a black one. That means on any path, the black nodes are never outnumbered by the red ones: at least half of the path's nodes are black. Axiom 3 fixes the number of black nodes on <em>every</em> root-to-leaf path at exactly h<sub>b</sub>, so a path with h edges (h + 1 nodes, or h nodes if you count only internal nodes plus the final NIL — either convention gives the same asymptotic bound) has at most 2h<sub>b</sub> nodes total, hence h ≤ 2h<sub>b</sub>.</p>
            </details>
            <p>Combine the two facts and the O(log n) bound falls out immediately: n ≥ 2<sup>h<sub>b</sub></sup> − 1 rearranges to h<sub>b</sub> ≤ log₂(n + 1), and substituting into h ≤ 2h<sub>b</sub> gives <strong>h ≤ 2·log₂(n + 1)</strong>. Unlike a plain <a href="#/subject/algorithmics/data-structures/algo-bst">BST</a>'s height, which is only O(log n) <em>in expectation</em> over insertion orders, this bound holds unconditionally — for every red-black tree, on every input, in the worst case — because it follows from three structural axioms alone, with no appeal to randomness or "typical" behavior. That worst-case guarantee, not the constant in front of log n, is the entire reason production systems (Linux's rbtree, Java's TreeMap, C++'s std::map) use red-black trees rather than plain BSTs: an adversary who controls the insertion order still cannot force more than a 2× height penalty over the best possible balanced tree.</p>
            <p>Of course, insertions and deletions don't arrive pre-arranged to satisfy the axioms — each one can violate them, and the axioms have to be restored. The key idea that makes this cheap is: after an ordinary BST insert or delete, <em>exactly one</em> local violation appears near the changed node, and the fixup routine is a short sequence of O(1) local transformations that either resolve the violation completely or <strong>push the exact same kind of violation one level further up the tree</strong>. Since the tree has only O(log n) levels (by the bound just proved), and each level costs O(1) work whether it resolves the violation or merely relocates it, the whole repair costs O(log n) in the worst case. This "push the problem up, one level at a time, until it either dissolves or is fixed for good" pattern is not unique to red-black trees — it is the same shape of argument that bounds splay-tree amortized cost and B-tree split/merge cascades.</p>
            <p><strong>Try it yourself — the insertion fixup, case by case.</strong> Suppose you've just done an ordinary BST insert of a new node m, colored red. If m's parent f is black, nothing is violated and there's nothing to do. The interesting case is when f is <em>also</em> red — violating axiom 2. Because the axioms held before this insertion, f being red means f's own parent (m's grandparent, g) must be black. Let u be m's uncle: g's other child (u may be a NIL leaf, which counts as black). Work out the fix for each of these three cases:</p>
            <p><strong>Case 1 — u is red.</strong></p>
            <svg viewBox="0 0 200 170" width="100%" height="170" style="max-width:210px;display:inline-block;margin:0.5rem 1rem;" role="img" aria-label="Case 1 problem: black node g at top with two red children f and u; f has a red child m">
              <g font-size="12" text-anchor="middle">
                <line x1="85" y1="38" x2="65" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="115" y1="38" x2="135" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="45" y1="108" x2="35" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="100" cy="24" r="16" fill="none" stroke="var(--text-muted)" stroke-width="2"/>
                <text x="100" y="29" fill="var(--text)">g</text>
                <circle cx="55" cy="94" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="55" y="99" fill="var(--text)">f</text>
                <circle cx="145" cy="94" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="145" y="99" fill="var(--text)">u</text>
                <circle cx="30" cy="154" r="14" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="30" y="159" fill="var(--text)">m</text>
              </g>
            </svg>
            <p><strong>Case 2 — u is black, m on the same side of f as f is of g</strong> (a straight line — e.g. m is f's left child and f is g's left child, or the mirrored right-right case).</p>
            <svg viewBox="0 0 200 170" width="100%" height="170" style="max-width:210px;display:inline-block;margin:0.5rem 1rem;" role="img" aria-label="Case 2 problem: black node g at top with red left child f and black right child u; f has a red left child m, forming a straight line g-f-m">
              <g font-size="12" text-anchor="middle">
                <line x1="85" y1="38" x2="65" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="115" y1="38" x2="135" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="45" y1="108" x2="35" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="100" cy="24" r="16" fill="none" stroke="var(--text-muted)" stroke-width="2"/>
                <text x="100" y="29" fill="var(--text)">g</text>
                <circle cx="55" cy="94" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="55" y="99" fill="var(--text)">f</text>
                <circle cx="145" cy="94" r="16" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="145" y="99" fill="var(--text)">u</text>
                <circle cx="30" cy="154" r="14" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="30" y="159" fill="var(--text)">m</text>
              </g>
            </svg>
            <p><strong>Case 3 — u is black, m and f on opposite sides</strong> (the zigzag — e.g. m is f's right child but f is g's left child, or the mirror).</p>
            <svg viewBox="0 0 200 170" width="100%" height="170" style="max-width:210px;display:inline-block;margin:0.5rem 1rem;" role="img" aria-label="Case 3 problem: black node g at top with red left child f and black right child u; f has a red right child m, forming a zigzag g-f-m">
              <g font-size="12" text-anchor="middle">
                <line x1="85" y1="38" x2="65" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="115" y1="38" x2="135" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="65" y1="108" x2="75" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="100" cy="24" r="16" fill="none" stroke="var(--text-muted)" stroke-width="2"/>
                <text x="100" y="29" fill="var(--text)">g</text>
                <circle cx="55" cy="94" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="55" y="99" fill="var(--text)">f</text>
                <circle cx="145" cy="94" r="16" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="145" y="99" fill="var(--text)">u</text>
                <circle cx="80" cy="154" r="14" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="80" y="159" fill="var(--text)">m</text>
              </g>
            </svg>
            <details><summary>Solution</summary>
              <p><strong>Case 1 (u red).</strong> Recolor: f and u become black, g becomes red. Axiom 2 is now satisfied locally (m red, f now black), and axiom 3 still holds (f and u each gained one black node on their paths, exactly offsetting g losing one) — no rotation needed. But g is now red, and g's <em>own</em> parent might also be red, which is the exact same violation, one level higher. This is the "push it up" step: set m := g and repeat the whole case analysis from g's new position. The walk terminates within O(log n) steps, either by reaching a black parent or the root (which axiom 1 forces black regardless).</p>
              <svg viewBox="0 0 200 170" width="100%" height="170" style="max-width:210px;display:inline-block;margin:0.5rem 1rem;" role="img" aria-label="Case 1 solution: g recolored red, f and u recolored black, m unchanged red; shape unchanged, violation may now be between g and its own parent">
                <g font-size="12" text-anchor="middle">
                  <line x1="85" y1="38" x2="65" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                  <line x1="115" y1="38" x2="135" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                  <line x1="45" y1="108" x2="35" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                  <circle cx="100" cy="24" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                  <text x="100" y="29" fill="var(--text)">g</text>
                  <circle cx="55" cy="94" r="16" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                  <text x="55" y="99" fill="var(--text)">f</text>
                  <circle cx="145" cy="94" r="16" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                  <text x="145" y="99" fill="var(--text)">u</text>
                  <circle cx="30" cy="154" r="14" fill="none" stroke="var(--accent)" stroke-width="2"/>
                  <text x="30" y="159" fill="var(--text)">m</text>
                  <text x="100" y="10" fill="var(--accent)" font-size="10">continue upward from g</text>
                </g>
              </svg>
              <p><strong>Case 2 (u black, straight line).</strong> A single rotation finishes it: rotate right around g (in the mirrored right-right case, rotate left), then recolor f black and g red. f takes g's old position; g becomes f's right child; f's old right subtree (necessarily black, omitted from the diagram) becomes g's new left child; u, unaffected by a rotation around g's <em>other</em> side, stays g's right child. Axiom 2 holds (m and g are both red, but their parent f is now black), axiom 3 holds (the rotation preserves total black count on every affected path), and — critically — the subtree rooted at f now has the exact same black-height it had before the insertion, so no violation propagates upward. The walk terminates here, having done at most one rotation.</p>
              <svg viewBox="0 0 210 170" width="100%" height="170" style="max-width:220px;display:inline-block;margin:0.5rem 1rem;" role="img" aria-label="Case 2 solution: f rotated up to the top and recolored black, m stays its red left child, g demoted to f's red right child with u remaining as g's black right child">
                <g font-size="12" text-anchor="middle">
                  <line x1="85" y1="38" x2="65" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                  <line x1="115" y1="38" x2="135" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                  <line x1="155" y1="108" x2="165" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                  <circle cx="100" cy="24" r="16" fill="none" stroke="var(--text-muted)" stroke-width="2"/>
                  <text x="100" y="29" fill="var(--text)">f</text>
                  <circle cx="55" cy="94" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                  <text x="55" y="99" fill="var(--text)">m</text>
                  <circle cx="145" cy="94" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                  <text x="145" y="99" fill="var(--text)">g</text>
                  <circle cx="170" cy="154" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                  <text x="170" y="159" fill="var(--text)">u</text>
                </g>
              </svg>
              <p><strong>Case 3 (u black, zigzag).</strong> A zigzag can't be fixed by one rotation around g directly — rotating g would just turn it into a mirrored zigzag. Instead, first rotate around f itself (left-rotate f, in this m-is-right-child example): this pulls m up into f's old position, with f becoming m's <em>left</em> child — which is now a straight line g-m-f, i.e. exactly Case 2's shape, just with the roles of "f" and "m" swapped. Apply Case 2's fix to that shape (rotate around g, recolor the new top node black and g red) and you're done in a total of two rotations. The end state:</p>
              <svg viewBox="0 0 210 170" width="100%" height="170" style="max-width:220px;display:inline-block;margin:0.5rem 1rem;" role="img" aria-label="Case 3 solution: m rotated up to the top and recolored black, f as its red left child, g demoted to m's red right child with u remaining as g's black right child">
                <g font-size="12" text-anchor="middle">
                  <line x1="85" y1="38" x2="65" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                  <line x1="115" y1="38" x2="135" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                  <line x1="155" y1="108" x2="165" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                  <circle cx="100" cy="24" r="16" fill="none" stroke="var(--text-muted)" stroke-width="2"/>
                  <text x="100" y="29" fill="var(--text)">m</text>
                  <circle cx="55" cy="94" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                  <text x="55" y="99" fill="var(--text)">f</text>
                  <circle cx="145" cy="94" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                  <text x="145" y="99" fill="var(--text)">g</text>
                  <circle cx="170" cy="154" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                  <text x="170" y="159" fill="var(--text)">u</text>
                </g>
              </svg>
              <p>So: Case 1 is the only one that ever repeats (pure recoloring, no rotation, violation pushed up); Cases 2 and 3 are both terminal (one or two rotations, then done). Since a repeating Case 1 can chain all the way to the root but a terminal case only fires once at the very end of that chain, an insertion does at most <em>two</em> rotations in total, however many recolorings preceded them.</p>
            </details>
            <p><strong>Insert and delete as primitives built on the fixup.</strong> <strong>Insert</strong> is now just two steps: run the ordinary <a href="#/subject/algorithmics/data-structures/algo-bst">BST insert</a> to attach a new leaf, color it red (a red leaf can never violate axiom 3 — it adds nothing to any black-height — so the only possible new violation is axiom 2, exactly the case analysis above), then run the fixup from the new node upward. <strong>Delete</strong> starts the same way as plain BST delete — splice out a leaf or one-child node directly, or reduce a two-children delete to the successor-splice case exactly as in the plain-BST lesson — but removing a <em>black</em> node can leave some path short one black node, a "double-black" violation of axiom 3 rather than axiom 2. Restoring it needs an analogous but genuinely different four-case walk (keyed off the sibling's color and the colors of the sibling's children, rather than an uncle), which this lesson won't fully diagram for space — see CLRS §13.4 for the complete case analysis. The shape of the argument is identical, though: each case either terminates in O(1) rotations or pushes the same double-black violation one level up, bounding the total repair at O(log n) exactly as before.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Search</td><td>O(log n)</td><td>height is at most 2·log₂(n+1) by the black-height argument above</td></tr>
              <tr><td>Insert</td><td>O(log n)</td><td>O(log n) possible recolorings walking up, but at most 2 rotations total</td></tr>
              <tr><td>Delete</td><td>O(log n)</td><td>same walk-up structure, a different 4-case fixup, still O(1) rotations</td></tr>
            </table>
            <p><strong>Remark:</strong> the payoff for all this bookkeeping is a tree that's <em>always</em> balanced immediately after every update, unlike the <a href="#/subject/algorithmics/data-structures/algo-splay-trees">splay tree</a>, which allows a single access to cost Θ(n) and only bounds the average; when a wide branching factor matters more than exact height — because each "step down" is a disk read — the <a href="#/subject/algorithmics/data-structures/algo-b-trees">B-tree</a> restructures the same idea around nodes with many keys instead of one. Against the <a href="#/subject/algorithmics/data-structures/algo-avl-trees">AVL tree</a> — the other classic height-balanced BST, using a purely numeric balance-factor invariant instead of colors — the tradeoff is: AVL keeps a provably shorter tree (faster lookups) but can need O(log n) rotations on a single delete, where red-black caps rotations at O(1) for both insert and delete at the cost of a looser height bound. And the "bound the total work by bounding how many times a violation can be pushed up before it must terminate" argument used above for the O(log n) repair cost has the same flavor as the potential-function arguments in the <a href="#/subject/algorithmics/algorithms/algo-amortized-potential-method">amortized analysis</a> lesson, even though this bound is worst-case per operation rather than amortized over a sequence.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 13 — §13.1 for the axioms and the height bound proved above, §13.2 for rotations, §13.3 for the full insertion fixup (RB-INSERT-FIXUP), §13.4 for the deletion fixup this lesson only sketched; Guibas & Sedgewick, "A Dichromatic Framework for Balanced Trees," FOCS 1978 (the original paper introducing red-black trees as a reformulation of symmetric binary B-trees).</p>
            <p><em>The whole idea in one line: color the tree so no root-to-leaf path can be more than twice as long as another, then repair only the O(1)-sized neighborhood around whatever you just changed, one level up at a time.</em></p>
          `,
          exercises: [
            "Work out all three insertion-fixup cases (red uncle; black uncle, same side; black uncle, opposite sides) starting from a node inserted as the left child of a left child, drawing the tree before and after each case. Then state, for each case, whether the walk continues upward or terminates, and how many total rotations the whole insertion can possibly perform.",
            "A red-black tree is built by inserting 1, 2, 3, ..., n in increasing order. Trace or simulate this and determine the resulting height as a function of n. Compare it to the height a plain (unbalanced) BST would have on the same input, and explain in one or two sentences why the difference is the entire point of the structure."
          ]
        },
        {
          id: "algo-avl-trees",
          title: "AVL Trees",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-bst", "algo-amortized-potential-method"],
          estMinutes: 38,
          content: `
            <p>An AVL tree (Adelson-Velsky and Landis, 1962 — the first self-balancing BST ever published, predating red-black trees by over a decade) keeps a binary search tree balanced by imposing a tighter, purely height-based invariant than red-black's color scheme, and repairing it with rotations after every insert and delete. The tighter invariant buys a shorter tree — faster lookups — at the cost of doing more rebalancing work on updates.</p>
            <p>For a node x, define its <strong>balance factor</strong> <code>bf(x) = height(left(x)) − height(right(x))</code>, treating an empty subtree as having height −1. The AVL axiom is a single inequality, required at <em>every</em> node:</p>
            <ol>
              <li><code>|bf(x)| ≤ 1</code> for every node x in the tree.</li>
            </ol>
            <p>That's the entire invariant — no colors, no separate black-height bookkeeping, just: neither child's subtree may be more than one level taller than the other, anywhere in the tree. The tree below satisfies it at every node (balance factors annotated in muted text):</p>
            <svg viewBox="0 0 340 220" width="100%" height="220" style="max-width:360px;display:block;margin:0.8rem auto;" role="img" aria-label="A binary search tree with root 8 (balance factor 0), left child 3 (balance factor 0) with children 1 and 6, right child 10 (balance factor -1) with right child 14, all balance factors within plus or minus 1">
              <g font-size="13" text-anchor="middle">
                <line x1="170" y1="34" x2="90" y2="90" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="170" y1="34" x2="250" y2="90" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="90" y1="106" x2="50" y2="160" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="90" y1="106" x2="130" y2="160" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="250" y1="106" x2="290" y2="160" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="170" cy="20" r="17" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="170" y="25" fill="var(--text)">8</text>
                <text x="170" y="0" fill="var(--text-muted)" font-size="11">bf=0</text>
                <circle cx="90" cy="90" r="16" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="90" y="95" fill="var(--text)">3</text>
                <text x="45" y="80" fill="var(--text-muted)" font-size="11">bf=0</text>
                <circle cx="250" cy="90" r="16" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="250" y="95" fill="var(--text)">10</text>
                <text x="295" y="80" fill="var(--text-muted)" font-size="11">bf=-1</text>
                <circle cx="50" cy="160" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="50" y="164" fill="var(--text)">1</text>
                <circle cx="130" cy="160" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="130" y="164" fill="var(--text)">6</text>
                <circle cx="290" cy="160" r="14" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="290" y="164" fill="var(--text)">14</text>
              </g>
            </svg>
            <p><strong>Try it yourself:</strong> prove that an AVL tree of height h has at least a Fibonacci-like number of nodes, and use it to derive an explicit constant in the O(log n) height bound.</p>
            <details><summary>Solution</summary>
              <p>Let N(h) be the <em>minimum</em> number of internal nodes an AVL tree of height h can have (h = −1 for an empty tree, h = 0 for a single leaf). To make a tree of height h with as few nodes as possible, one child subtree should be as short as the invariant allows relative to the other: since |bf| ≤ 1, the two child subtrees of the root can have heights h−1 and h−2 (they can't both be shorter, or the root's height wouldn't reach h). Minimizing each child's node count recursively gives the recurrence</p>
              <pre><code>N(h) = N(h−1) + N(h−2) + 1,   N(−1) = 0,  N(0) = 1</code></pre>
              <p>which is exactly the Fibonacci recurrence shifted by a constant. Solving it (or simply noting N(h) + 1 satisfies the unshifted Fibonacci recurrence with the right base cases) gives <code>N(h) + 1 = F(h+3)</code>, where F is the standard Fibonacci sequence. Since <code>F(k) ≥ φ^(k−2)</code> for the golden ratio φ ≈ 1.618, a tree with n nodes and height h satisfies <code>n ≥ N(h) = F(h+3) − 1 ≥ φ^(h+1) − 1</code>, which rearranges to <strong>h ≤ log<sub>φ</sub>(n+1) − 1 ≈ 1.44·log₂(n+1) − 1</strong>. So AVL height is not just O(log n) — its worst-case constant (≈1.44) is explicitly smaller than red-black's proved bound of 2·log₂(n+1), which is exactly why AVL lookups are faster in practice: the tree is provably shorter.</p>
            </details>
            <p>That tighter bound is not free. After an ordinary BST insert, walking back up from the new leaf and recomputing heights, the <em>first</em> node found with <code>|bf| = 2</code> gets fixed by one rotation (or two — see the case analysis below) — and here is the key structural fact: <strong>after that single fix, the repaired subtree's height is exactly what it was before the insertion</strong>, so no ancestor further up can have become unbalanced, and the walk can stop immediately. Insert therefore does at most one rotation event (one single or one double rotation) no matter how tall the tree is. Delete is not so lucky: removing a node can <em>shrink</em> the height of the subtree it was fixed in, which can unbalance the next ancestor up, and the next, all the way to the root in the worst case — so a single AVL deletion can trigger O(log n) separate rotations, one per level, unlike insertion's single fix. (Contrast this with red-black trees, which cap rotations at O(1) for <em>both</em> insert and delete, at the cost of a less tight height bound and a walk-up that may still do O(log n) recolorings.)</p>
            <p><strong>Try it yourself — the four rebalancing shapes.</strong> Suppose the first ancestor found unbalanced while walking up is z, with <code>bf(z) = +2</code> (left-heavy; the mirror <code>bf(z) = −2</code> cases are symmetric). Let y = z's left child, the taller of z's two subtrees. Whether one rotation or two is needed depends only on which of y's own subtrees is the taller one — work out the fix for each of these four named shapes (T1…T4 denote subtrees, drawn as triangles, whose exact contents don't matter — only their heights do):</p>
            <p><strong>Left-Left (LL) — y is left-heavy or balanced (bf(y) ≥ 0), so y's own left subtree T1 is the tall one.</strong></p>
            <svg viewBox="0 0 220 190" width="100%" height="190" style="max-width:230px;display:inline-block;margin:0.5rem 1rem;" role="img" aria-label="LL problem: z on top marked balance factor plus 2, left child y, right subtree T3; y has left subtree T1 (tall) and right subtree T2">
              <g font-size="12" text-anchor="middle">
                <text x="110" y="10" fill="var(--accent)" font-size="10">bf(z)=+2</text>
                <line x1="90" y1="38" x2="55" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="130" y1="38" x2="165" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="40" y1="108" x2="20" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="70" y1="108" x2="90" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="110" cy="24" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="110" y="29" fill="var(--text)">z</text>
                <circle cx="55" cy="94" r="16" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="55" y="99" fill="var(--text)">y</text>
                <path d="M165,86 L145,116 L185,116 Z" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="165" y="108" fill="var(--text-muted)" font-size="11">T3</text>
                <path d="M20,148 L4,176 L36,176 Z" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="20" y="168" fill="var(--text-muted)" font-size="11">T1</text>
                <path d="M90,148 L74,176 L106,176 Z" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="90" y="168" fill="var(--text-muted)" font-size="11">T2</text>
              </g>
            </svg>
            <p><strong>Right-Right (RR) — mirror of LL: y = z's right child, y's own right subtree is the tall one.</strong></p>
            <p><strong>Left-Right (LR) — y is right-heavy (bf(y) &lt; 0), so the tall subtree is y's right subtree; call its root x.</strong></p>
            <svg viewBox="0 0 240 200" width="100%" height="200" style="max-width:250px;display:inline-block;margin:0.5rem 1rem;" role="img" aria-label="LR problem: z on top marked balance factor plus 2, left child y, right subtree T4; y has left subtree T1 and right child x; x has subtrees T2 and T3">
              <g font-size="12" text-anchor="middle">
                <text x="120" y="10" fill="var(--accent)" font-size="10">bf(z)=+2</text>
                <line x1="100" y1="38" x2="60" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="140" y1="38" x2="185" y2="80" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="45" y1="108" x2="25" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="75" y1="108" x2="95" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="80" y1="150" x2="60" y2="178" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="110" y1="150" x2="130" y2="178" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="120" cy="24" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="120" y="29" fill="var(--text)">z</text>
                <circle cx="60" cy="94" r="16" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="60" y="99" fill="var(--text)">y</text>
                <path d="M185,86 L165,116 L205,116 Z" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="185" y="108" fill="var(--text-muted)" font-size="11">T4</text>
                <path d="M25,148 L9,176 L41,176 Z" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="25" y="168" fill="var(--text-muted)" font-size="11">T1</text>
                <circle cx="95" cy="150" r="14" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="95" y="155" fill="var(--text)">x</text>
                <path d="M60,186 L44,196 L76,196 Z" fill="none" stroke="var(--border)" stroke-width="1"/>
                <text x="60" y="192" fill="var(--text-muted)" font-size="10">T2</text>
                <path d="M130,186 L114,196 L146,196 Z" fill="none" stroke="var(--border)" stroke-width="1"/>
                <text x="130" y="192" fill="var(--text-muted)" font-size="10">T3</text>
              </g>
            </svg>
            <p><strong>Right-Left (RL) — mirror of LR: y = z's right child, y's own left subtree (rooted at x) is the tall one.</strong></p>
            <details><summary>Solution</summary>
              <p><strong>LL.</strong> A single right rotation around z, exactly the rotation primitive from the <a href="#/subject/algorithmics/data-structures/algo-bst">BST lesson</a>: y comes up to the top, z becomes y's right child, and T2 (the subtree that was "in between" y and z) becomes z's new left child. T1 and T3 don't move. Before the insertion that caused the imbalance, T1, T2, T3 all had the same height; the insertion made T1 one taller. After the rotation, z's height is back to T2 and T3's common height plus one (unchanged from before the insertion), so the fix is complete and self-contained — no ancestor further up needs revisiting.</p>
              <p><strong>RR.</strong> The exact mirror: a single left rotation around z.</p>
              <p><strong>LR.</strong> One rotation around z can't fix a zigzag — it would just leave a mirrored zigzag. The standard fix is a <strong>double rotation</strong>: left-rotate around y first (bringing x up into y's old spot, with x's own left subtree T2 becoming y's new right child), which turns the shape into a plain LL case with x now playing the role "y" did; then right-rotate around z exactly as in the LL fix. The net effect lands x on top, with y = x's left child (subtrees T1, T2) and z = x's right child (subtrees T3, T4) — one clean rebalancing, done in two rotations total.</p>
            <svg viewBox="0 0 240 190" width="100%" height="190" style="max-width:250px;display:inline-block;margin:0.5rem 1rem;" role="img" aria-label="LR solution: x on top, left child y with subtrees T1 and T2, right child z with subtrees T3 and T4">
              <g font-size="12" text-anchor="middle">
                <line x1="120" y1="38" x2="65" y2="90" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="120" y1="38" x2="175" y2="90" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="50" y1="106" x2="35" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="80" y1="106" x2="95" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="160" y1="106" x2="145" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                <line x1="190" y1="106" x2="205" y2="140" stroke="var(--border)" stroke-width="1.5"/>
                <circle cx="120" cy="24" r="16" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="120" y="29" fill="var(--text)">x</text>
                <circle cx="65" cy="94" r="15" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="65" y="99" fill="var(--text)">y</text>
                <circle cx="175" cy="94" r="15" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="175" y="99" fill="var(--text)">z</text>
                <path d="M35,148 L19,174 L51,174 Z" fill="none" stroke="var(--border)" stroke-width="1"/>
                <text x="35" y="166" fill="var(--text-muted)" font-size="10">T1</text>
                <path d="M95,148 L79,174 L111,174 Z" fill="none" stroke="var(--border)" stroke-width="1"/>
                <text x="95" y="166" fill="var(--text-muted)" font-size="10">T2</text>
                <path d="M145,148 L129,174 L161,174 Z" fill="none" stroke="var(--border)" stroke-width="1"/>
                <text x="145" y="166" fill="var(--text-muted)" font-size="10">T3</text>
                <path d="M205,148 L189,174 L221,174 Z" fill="none" stroke="var(--border)" stroke-width="1"/>
                <text x="205" y="166" fill="var(--text-muted)" font-size="10">T4</text>
              </g>
            </svg>
              <p><strong>RL.</strong> The mirror double rotation: right-rotate around y, then left-rotate around z, landing the same x on top with z = x's left child and y = x's right child.</p>
            </details>
            <p><strong>Insert and delete as primitives.</strong> <strong>Insert</strong> is ordinary <a href="#/subject/algorithmics/data-structures/algo-bst">BST insert</a>, followed by walking back up from the new leaf recomputing each ancestor's height and balance factor; at the first node found with |bf| = 2, apply whichever of the four cases above matches (determined by the sign of bf(z) and the sign of bf(y)) and stop — one fix, as argued above. <strong>Delete</strong> also starts as ordinary BST delete (successor-splice for the two-children case, exactly as in the plain-BST lesson), then walks up recomputing heights and applying the same four-case fix at every unbalanced ancestor it finds — but unlike insert, it cannot stop at the first fix, since a rotation here can shrink the local subtree's height and propagate the imbalance upward, so the walk continues checking every level, up to O(log n) rotations in the worst case.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Search</td><td>O(log n)</td><td>height ≤ ~1.44·log₂(n+1) by the Fibonacci-tree bound above</td></tr>
              <tr><td>Insert</td><td>O(log n)</td><td>O(log n) height/balance-factor updates while walking up, but at most 1 rotation event total</td></tr>
              <tr><td>Delete</td><td>O(log n)</td><td>same walk-up, but rebalancing can cascade — up to O(log n) rotation events</td></tr>
            </table>
            <p><strong>Remark:</strong> AVL's height bound (≈1.44 log n) is provably tighter than a <a href="#/subject/algorithmics/data-structures/algo-red-black-trees">red-black tree</a>'s (≤2 log n), so AVL wins on pure lookup-heavy workloads; red-black wins when updates dominate, because its color-based invariant caps rotations at O(1) for both insert <em>and</em> delete, where AVL's delete can cascade. This is exactly the tradeoff the <a href="#/subject/algorithmics/data-structures/algo-bst-balance">balanced-search-trees overview</a> lesson's comparison table gestures at — this lesson and the red-black lesson are the two concrete structures behind that table's first two rows.</p>
            <p><strong>Further reading:</strong> Knuth, <em>The Art of Computer Programming</em>, Vol. 3, §6.2.3 (the original AVL analysis, including the Fibonacci-tree argument in full); CLRS, 3rd ed., Problem 13-3 (AVL trees posed as a structured exercise, phrased in terms directly comparable to the red-black material in Ch. 13); Adelson-Velsky & Landis, "An algorithm for the organization of information," Doklady Akademii Nauk SSSR, 1962 (the original paper).</p>
            <p><em>The whole idea in one line: keep every node's two subtrees within one level of height of each other, and a single rotation — or two, in a zigzag — after each update is always enough to restore it.</em></p>
          `,
          exercises: [
            "Insert the keys 1, 2, 3, 4, 5, 6, 7 into an initially empty AVL tree in that order, drawing the tree after every insertion and naming which of LL/RR/LR/RL fires (if any) at each step. Compare the final shape and height to what a plain unbalanced BST would look like on the same input.",
            "Construct the smallest possible AVL tree of height 4 (i.e. one realizing the minimum-node-count bound N(4) from the Fibonacci argument above) by explicit recursive construction, and state its exact node count."
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
          id: "algo-exercises-hashing-search-trees",
          title: "Exercises: Hashing & Search Trees",
          section: "Hashing & Search Trees",
          prerequisites: ["algo-hashing-universal-families", "algo-bst", "algo-bst-balance", "algo-red-black-trees", "algo-avl-trees", "algo-b-trees", "algo-splay-trees", "algo-skip-lists", "algo-bloom-filters", "algo-kd-trees", "algo-persistent-data-structures"],
          estMinutes: 45,
          content: `
            <p>Six problems that compare and combine structures across this whole section, rather than drilling any one of them in isolation.</p>
            <ol>
              <li>A "sorted dictionary with range queries" workload needs both fast point lookup and fast <code>rangeScan(lo, hi)</code>. Explain precisely why a hash table cannot serve this workload no matter how good its hash family is, then compare a plain BST, a red-black tree, and a B+-tree for it, and state which wins when the data is memory-resident versus disk-resident, and why.</li>
              <li>A skip list's expected O(log n) height is a high-probability guarantee, not a worst-case one; a red-black tree's O(log n) height is a hard worst-case guarantee. Describe one application where that difference is decisive (name the failure mode the probabilistic guarantee permits) and one where it genuinely does not matter.</li>
              <li>Design a two-level structure using a Bloom filter in front of a hash table to reduce expensive lookups (e.g. disk reads) for a key-value store where most queries are for keys that do not exist. Give the expected number of expensive lookups per query as a function of the Bloom filter's false-positive rate p, and explain why the filter must never produce a false <em>negative</em> for this design to be correct.</li>
              <li>A financial system needs a sorted index it can query as of any past point in time (an audit requirement) while still supporting fast range scans on the <em>current</em> version only. Propose a structure combining ideas from the persistent-data-structures and B+-tree lessons, and identify the one place path copying gets more expensive when applied to a wide node (branching factor t) instead of a binary one.</li>
              <li>Explain precisely why a plain BST cannot be generalized to 2-D range queries just by using (x, y) as a single compound sort key. Then describe what a k-d tree does differently at each level of recursion to make range and nearest-neighbor queries efficient in a way the compound-key BST cannot match.</li>
              <li>Splay trees have no invariant to check at all — only a "move the accessed node to the root" rule applied after every access — yet their amortized cost matches a balanced tree's. Give one concrete access sequence where a red-black tree clearly outperforms a splay tree, and one where a splay tree clearly outperforms a red-black tree, justifying each with the actual per-operation cost.</li>
            </ol>
          `,
          exercises: []
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
          id: "algo-exercises-heaps",
          title: "Exercises: Heaps",
          section: "Heaps",
          prerequisites: ["algo-binary-heaps", "algo-priority-queue-adt", "algo-fibonacci-heap", "algo-van-emde-boas"],
          estMinutes: 30,
          content: `
            <p>Five problems on the priority-queue family, from a single heap to the trade-offs between its more exotic variants.</p>
            <ol>
              <li>Dijkstra's algorithm with a binary heap costs O(E log V) overall; with a Fibonacci heap it drops to O(E + V log V). State exactly which single operation's amortized cost the Fibonacci heap improves to make this possible, and explain why that operation — not extract-min — is the one whose cost is multiplied by E rather than by V in the total.</li>
              <li>Implement a "meldable" priority queue (merge two priority queues into one) using a binary heap, a Fibonacci heap, and a plain sorted linked list. State the cost of meld for each, and explain why the binary heap's implicit array-indexing trick (children of i at 2i+1, 2i+2) makes O(1) meld structurally impossible without abandoning that representation.</li>
              <li>A job scheduler updates job priorities constantly (decrease-key-heavy) but calls extract-min rarely. Write the total-cost formula for n decrease-keys and m extract-mins under a binary heap and under a Fibonacci heap, then determine, as a function of n and m, the point at which the Fibonacci heap's better asymptotics actually overcome its larger constant factors in practice.</li>
              <li>Prove the amortized O(1) bound for Fibonacci-heap decrease-key using the potential function Φ = (number of trees) + 2·(number of marked nodes). In particular, explain why the marking scheme guarantees a cascading cut can never run for more than O(1) amortized steps, even though a single decrease-key can in principle trigger a long chain of cuts.</li>
              <li>A van Emde Boas tree gives O(log log u) operations but costs Θ(u) space in its direct-indexed form (or expected O(log log u) with Θ(n) space, hashed). Describe a concrete workload where this beats a Fibonacci heap outright, and one where the universe size u makes it strictly worse, even before accounting for constant factors.</li>
            </ol>
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
          id: "algo-exercises-amortized-structures",
          title: "Exercises: Amortized Structures",
          section: "Amortized Structures",
          prerequisites: ["algo-dynamic-arrays-amortization", "algo-union-find"],
          estMinutes: 25,
          content: `
            <p>Four problems contrasting the two amortized-analysis case studies in this section — a resizing array and a union-find forest — to sharpen what "amortized" is actually paying for in each.</p>
            <ol>
              <li>Give the aggregate-method proof (not a potential function) that n dynamic-array appends with doubling cost O(n) total. Explain why the aggregate method is easy here, then explain precisely why it stops being adequate once shrinking (deletion with capacity contraction) is added back into the mix, forcing a move to the potential method.</li>
              <li>Union-find with path compression alone (no union by rank) still gives O(log n) amortized cost per operation. Construct a concrete sequence of unions that forces some node's path to the root to reach Θ(log n) depth before any find is called on it, then trace what path compression does to that same path on the very next find.</li>
              <li>A dynamic array and a union-find forest both hide an expensive operation behind cheap ones via amortized analysis, but the expensive operation has a different physical cause in each: a copy-everything resize versus an unbroken long parent chain. State, in one sentence each, what triggers the expensive case in each structure, and explain concretely why path compression cannot be "ported" to fix the dynamic array's resize cost (what would the analogous operation even mean there?).</li>
              <li>Prove that a dynamic array which grows by a fixed additive amount c on overflow (capacity m → m + c), rather than a multiplicative factor γ &gt; 1, makes n appends cost Θ(n²) total, not O(n). Identify exactly where the geometric-series argument that works for multiplicative growth fails for additive growth.</li>
            </ol>
          `,
          exercises: []
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
        },
        {
          id: "algo-exercises-tries-range-queries",
          title: "Exercises: Tries & Range Queries",
          section: "Tries",
          prerequisites: ["algo-segment-fenwick-trees", "algo-tries", "algo-suffix-trees-arrays"],
          estMinutes: 35,
          content: `
            <p>Five problems spanning range-query structures and string-indexing structures, the two families that close out this chapter.</p>
            <ol>
              <li>A Fenwick tree supports point-update / prefix-sum in O(log n) with far less code and a smaller constant than a segment tree. Name a query type a plain Fenwick tree cannot support directly but a segment tree can (e.g. range minimum), and state precisely which structural property of sum — invertibility (a − b undoes adding b) — the Fenwick tree's trick relies on that range-min lacks.</li>
              <li>Build a trie over a large word list and compare its total memory to a hash set storing the same words, accounting for shared prefixes. Under what vocabulary characteristics (many short words with heavy prefix overlap, versus many long words with little overlap) does the trie win on space, and when does it lose?</li>
              <li>A segment tree supporting <em>range</em>-update as well as range-query needs "lazy propagation." State exactly what invariant lazy propagation maintains between a node's stored aggregate and the pending, not-yet-pushed-down updates sitting at that node, and explain why naively pushing every update all the way down immediately would destroy the O(log n) bound.</li>
              <li>Compare trie-based autocomplete (walk down to the prefix, then enumerate the subtree) against a sorted array of strings with binary search for the same task. Give the exact cost of retrieving all k completions of a prefix of length p out of n total strings for both representations, and identify the regime of (n, p, k) where each wins.</li>
              <li>Using a suffix array and LCP array built over T$reverse(T)# (T concatenated with its own reverse, separated by distinct sentinels), sketch how comparing suffixes from the two halves lets you find, for every candidate center, the longest palindromic substring of T centered there — and state the overall time bound this gives once the suffix array itself is built in O(n log n).</li>
            </ol>
          `,
          exercises: []
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
          title: "Heapsort",
          section: "Sorting",
          prerequisites: ["algo-binary-heaps"],
          estMinutes: 20,
          content: `
            <p>Heapsort turns the array itself into a max-heap and then repeatedly pulls out the largest remaining element, giving a guaranteed Θ(n log n) sort with zero extra memory and none of quicksort's risk of a quadratic worst case — the algorithm to reach for when a hard time bound matters more than average-case speed.</p>
            <svg viewBox="0 0 460 190" width="100%" height="190" style="max-width:460px;display:block;margin:0.8rem auto;" role="img" aria-label="An array mid-heapsort: the first five cells form the shrinking max-heap with 2 just swapped into the root and about to sift down, and the last cell holds 9, the value just extracted into the growing sorted suffix">
              <defs><marker id="hsarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <g font-size="12" text-anchor="middle">
                <rect x="15" y="80" width="55" height="40" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="42" y="105" fill="var(--text)">2</text>
                <rect x="87" y="80" width="55" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="114" y="105" fill="var(--text)">7</text>
                <rect x="159" y="80" width="55" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="186" y="105" fill="var(--text)">8</text>
                <rect x="231" y="80" width="55" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="258" y="105" fill="var(--text)">3</text>
                <rect x="303" y="80" width="55" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="330" y="105" fill="var(--text)">5</text>
                <line x1="375" y1="70" x2="375" y2="130" stroke="var(--text-muted)" stroke-width="1" stroke-dasharray="3,3"/>
                <rect x="380" y="80" width="55" height="40" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
                <text x="407" y="105" fill="var(--text-muted)">9</text>
                <text x="200" y="20" fill="var(--text)" font-size="11">heap (shrinks each extraction)</text>
                <text x="407" y="20" fill="var(--text-muted)" font-size="11">sorted</text>
                <path d="M 42,78 Q 224,15 407,78" fill="none" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#hsarrow)"/>
                <text x="224" y="35" fill="var(--accent)" font-size="11">1. swap root ↔ last heap element</text>
                <line x1="42" y1="122" x2="42" y2="145" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#hsarrow)"/>
                <text x="42" y="160" fill="var(--accent)" font-size="11">2. sift-down</text>
              </g>
            </svg>
            <p>The design is BUILD-MAX-HEAP once, in Θ(n) — the same linear-time build argument as the <a href="#/subject/algorithmics/data-structures/algo-binary-heaps">binary heap</a> lesson — followed by n rounds of: swap the root (the current maximum) with the last element still inside the heap region, shrink the heap region by one, and sift the new root down its one broken path. The swapped-out element now sits in its final sorted position and is never touched again, so the sorted suffix grows by exactly one element per round while the heap region shrinks by one — the whole algorithm runs inside the original array, no auxiliary storage at all.</p>
            <p>Variants worth knowing:</p>
            <ul>
              <li><strong>Bottom-up heapsort (Wegener)</strong> — during sift-down, follow the larger child all the way to a leaf first without comparing it to the moving element, then walk back up looking for the correct slot; this roughly halves the number of comparisons in practice, though the asymptotic Θ(n log n) bound is unchanged.</li>
              <li><strong>d-ary heapsort</strong> — sift using a d-ary heap instead of binary, trading a shallower tree for a wider per-level comparison; rarely worth it for heapsort specifically since it complicates the array indexing for a small constant-factor gain.</li>
              <li><strong>Introsort's safety net</strong> — <code>std::sort</code>-style introspective sorting runs <a href="#/subject/algorithmics/algorithms/algo-randomized-quicksort">randomized quicksort</a> but switches to heapsort once recursion depth passes about 2 log n, using heapsort purely to cap quicksort's adversarial tail rather than as the everyday algorithm.</li>
            </ul>
            <p><strong>Remark:</strong> heapsort is not stable — the swap-based extraction can and does reorder equal keys relative to each other, unlike merge sort's stable merge.</p>
            <table class="mini-table">
              <tr><th>Phase</th><th>Cost</th><th>Why</th></tr>
              <tr><td>BUILD-MAX-HEAP</td><td>Θ(n)</td><td>most nodes are near the leaves and sift down only a short distance — the same Σh/2ʰ argument as the binary heap lesson</td></tr>
              <tr><td>One extract + sift-down</td><td>O(log n)</td><td>only one root-to-leaf path is ever touched</td></tr>
              <tr><td>Full sort (n extractions)</td><td>Θ(n log n)</td><td>n rounds of O(log n) each, and this bound holds in the worst case, not just on average</td></tr>
              <tr><td>Extra space</td><td>O(1)</td><td>every swap happens in place within the original array</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> given a max-heap array of n elements (heap-ordered, not sorted), how would you extract just the k largest elements, in order, in O(k log n) time — without heapifying repeatedly or sorting the whole array?</p>
            <details><summary>Solution</summary>
              <p>Run exactly heapsort's outer loop, but stop after k rounds instead of n. Repeat k times: read the root (it is, by the heap property, the current maximum of whatever remains), swap it with the last element of the still-active heap region, shrink that region by one, and sift the new root down. Each round costs O(log n) — the heap's height doesn't shrink meaningfully for k ≪ n — so k rounds cost O(k log n) total, versus the O(n log n) a full sort would spend to produce the same first k outputs. This is not a different algorithm; it's heapsort's own extraction loop, simply halted early, which is exactly why a heap is the standard structure behind streaming top-k.</p>
            </details>
            <p><strong>Remark:</strong> heapsort's Θ(n log n) is a hard worst-case guarantee, unlike <a href="#/subject/algorithmics/algorithms/algo-randomized-quicksort">randomized quicksort</a>'s expected bound with an adversarial Θ(n²) tail — the reason introsort falls back to heapsort specifically to cap that tail. What it pays for the guarantee is memory access pattern: every sift-down jumps between array positions i, 2i+1, 2i+2, scattered rather than sequential, which is far less cache-friendly than quicksort's in-place partition scan or the sequential merge behind the <a href="#/subject/algorithmics/algorithms/algo-sorting-lower-bound-mergesort">comparison-sort lower bound</a> lesson's merge sort — the reason heapsort tends to lose on wall-clock time despite matching or beating both asymptotically.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 6 (heaps and heapsort, §6.4 for the sort itself); Williams, J.W.J., "Algorithm 232: Heapsort," <em>Communications of the ACM</em>, 7(6), 1964 (the original algorithm); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §2.4 (heapsort via a sink-based array implementation, with a worked comparison against quicksort's constants).</p>
            <p><em>The whole idea in one line: repeatedly hand back the biggest thing left, then patch the one path that broke.</em></p>
          `,
          exercises: [
            "Prove that heapsort performs at most n⌈log₂ n⌉ + O(n) comparisons in the worst case, combining the Θ(n) build cost with n extractions each costing at most 2⌈log₂ n⌉ comparisons. Compare this bound to the Ω(n log n) comparison-sorting lower bound and state how tight heapsort actually is.",
            "Describe Wegener's bottom-up variant of sift-down precisely (follow the larger child to a leaf first, then walk back up to find the correct insertion point for the moving element) and explain why it roughly halves the number of comparisons per sift-down in practice while leaving the Θ(n log n) worst-case bound unchanged."
          ]
        },
        {
          id: "algo-linear-time-sorting",
          title: "Linear-Time Sorting",
          section: "Sorting",
          prerequisites: ["algo-sorting-lower-bound-mergesort"],
          estMinutes: 25,
          content: `
            <p>Comparison sorts can't beat Ω(n log n) — but sorting doesn't have to compare keys at all. When a key's structure is known in advance (a small range of integers, a fixed number of digits, a roughly uniform spread) counting, radix, and bucket sort exploit that structure directly and sort in linear time instead.</p>
            <svg viewBox="0 0 460 200" width="100%" height="200" style="max-width:460px;display:block;margin:0.8rem auto;" role="img" aria-label="Counting sort in three rows: an input array of small keys 2, 0, 3, 1, 3, a count array indexed by key value showing how many times each value occurs, and a prefix-sum array turning those counts into output positions">
              <defs><marker id="ltsarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <g font-size="12" text-anchor="middle">
                <text x="20" y="12" text-anchor="start" fill="var(--text-muted)" font-size="11">input</text>
                <rect x="20" y="16" width="50" height="36" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="45" y="39" fill="var(--text)">2</text>
                <rect x="85" y="16" width="50" height="36" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="110" y="39" fill="var(--text)">0</text>
                <rect x="150" y="16" width="50" height="36" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="175" y="39" fill="var(--text)">3</text>
                <rect x="215" y="16" width="50" height="36" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="240" y="39" fill="var(--text)">1</text>
                <rect x="280" y="16" width="50" height="36" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="305" y="39" fill="var(--text)">3</text>
                <text x="20" y="92" text-anchor="start" fill="var(--text-muted)" font-size="11">count[value]</text>
                <rect x="20" y="96" width="50" height="36" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="45" y="119" fill="var(--text)">1</text>
                <text x="45" y="146" fill="var(--text-muted)" font-size="10">value 0</text>
                <rect x="85" y="96" width="50" height="36" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="110" y="119" fill="var(--text)">1</text>
                <text x="110" y="146" fill="var(--text-muted)" font-size="10">value 1</text>
                <rect x="150" y="96" width="50" height="36" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="175" y="119" fill="var(--text)">1</text>
                <text x="175" y="146" fill="var(--text-muted)" font-size="10">value 2</text>
                <rect x="215" y="96" width="50" height="36" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="240" y="119" fill="var(--text)">2</text>
                <text x="240" y="146" fill="var(--text-muted)" font-size="10">value 3</text>
                <path d="M 175,54 Q 208,75 240,94" fill="none" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#ltsarrow)"/>
                <text x="20" y="172" text-anchor="start" fill="var(--text-muted)" font-size="11">prefix sum ⇒ output slot</text>
                <rect x="215" y="176" width="50" height="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="240" y="191" fill="var(--text)" font-size="11">…,4,5</text>
                <path d="M 240,134 L 240,174" fill="none" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#ltsarrow)"/>
              </g>
            </svg>
            <p>Three algorithms, same underlying move: stop comparing whole keys and read their structure instead. <strong>Counting sort</strong> assumes keys are integers in a small range [0, k): count occurrences of each value, prefix-sum the counts into output positions, then place each key directly — Θ(n + k), with no comparisons at all. <strong>Radix sort</strong> extends this to keys with d digits (in any base) by running a stable counting sort once per digit, least-significant first — Θ(d(n + k)) for digits in range [0, k). <strong>Bucket sort</strong> assumes keys are roughly uniformly spread over a known range: scatter them into n buckets by value, insertion-sort each small bucket, concatenate — expected Θ(n), since each bucket holds O(1) elements on average.</p>
            <p>Variants and how they differ:</p>
            <ul>
              <li><strong>LSD radix sort</strong> — process digits right to left, one stable counting-sort pass per digit; the standard variant, and stability is load-bearing, not a nicety — it's what lets a later, more significant digit's pass preserve the order established by earlier, less significant digits.</li>
              <li><strong>MSD radix sort</strong> — process digits left to right, recursing into each bucket by the next digit; behaves like a <a href="#/subject/algorithmics/data-structures/algo-tries">trie</a> built breadth-first over the key's digits, and handles variable-length keys such as strings without padding them to a common length.</li>
              <li><strong>Bucket sort's distribution dependence</strong> — the expected Θ(n) bound needs the input to actually spread across buckets; an adversarial or merely clumped input (many keys landing in one bucket) degrades it toward Θ(n²), unlike counting or radix sort, whose bounds hold unconditionally once k or d is fixed.</li>
            </ul>
            <p><strong>Remark:</strong> all three still need Ω(n) time just to read the input, so "linear time" really means Θ(n) with the range k or digit count d hidden inside the constant — choose a k or d that's too large and the hidden constant swamps any ordinary n log n sort.</p>
            <table class="mini-table">
              <tr><th>Algorithm</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Counting sort</td><td>Θ(n + k)</td><td>one pass to count, one prefix-sum pass over k values, one placement pass over n keys</td></tr>
              <tr><td>Radix sort</td><td>Θ(d(n + k))</td><td>d passes of counting sort, one per digit, each Θ(n + k)</td></tr>
              <tr><td>Bucket sort</td><td>Θ(n) expected</td><td>n buckets each receive O(1) keys on average under uniformity, so each insertion sort is O(1) expected</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> given n integers all known to lie in the range [0, n²), how would you sort them in Θ(n) time — even though a direct counting sort over that whole range would cost Θ(n²), not Θ(n)?</p>
            <details><summary>Solution</summary>
              <p>Treat every number as a 2-digit number in base n: digit₀ = value mod n, digit₁ = value div n, both individually in [0, n). Run a 2-pass LSD radix sort — first pass a stable counting sort on digit₀ over range [0, n), second pass a stable counting sort on digit₁ over the same range — each pass costs Θ(n + n) = Θ(n), for Θ(2n) = Θ(n) total. This is exactly the general Θ(d(n + k)) bound with d = 2 and k = n, versus the Θ(n + k) = Θ(n + n²) a single counting sort over the full range would need: trading one more digit (d = 2 instead of d = 1) buys a dramatically smaller per-pass range k.</p>
            </details>
            <p><strong>Remark:</strong> this is the same move as escaping the search lower bound in the <a href="#/subject/algorithmics/data-structures/algo-tries">trie</a> lesson — stop treating a key as an opaque comparable object and read its structure directly. It only pays off when that structure is known and well-behaved (bounded k, small fixed d, or genuine uniformity); absent that, <a href="#/subject/algorithmics/algorithms/algo-randomized-quicksort">randomized quicksort</a>'s comparison-based Θ(n log n) is the robust default, and the <a href="#/subject/algorithmics/algorithms/algo-sorting-lower-bound-mergesort">comparison-sort lower bound</a> is exactly the boundary these three algorithms step outside of.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §8.2 (counting sort), §8.3 (radix sort, including the stability requirement and its proof), §8.4 (bucket sort and its expected-time analysis); Knuth, <em>The Art of Computer Programming</em>, Vol. 3, §5.2.5 (sorting by distribution — the classical treatment of radix and bucket sort, motivated by punched-card sorting machines).</p>
            <p><em>The whole idea in one line: don't compare the keys — read them.</em></p>
          `,
          exercises: [
            "Prove counting sort is stable, then construct a small example with two-digit numbers showing that LSD radix sort produces an incorrect final order if the per-digit counting sort used is not stable.",
            "Prove that bucket sort runs in expected Θ(n) time when the n input keys are drawn independently and uniformly from [0,1), by bounding the expected cost of insertion-sorting each bucket. Then construct a (non-adversarial, just non-uniform) input distribution for which bucket sort degrades to Θ(n²), and explain why counting sort and radix sort have no equivalent failure mode."
          ]
        },
        {
          id: "algo-order-statistics-selection",
          title: "Order Statistics",
          section: "Selection",
          prerequisites: ["algo-randomized-quicksort"],
          estMinutes: 30,
          content: `
            <p>Finding the k-th smallest element — the median, say — doesn't require sorting the whole array first. Selection algorithms answer that one positional question directly, in linear time, by reusing quicksort's own partition step and simply throwing away the half that provably can't contain the answer.</p>
            <svg viewBox="0 0 460 170" width="100%" height="170" style="max-width:460px;display:block;margin:0.8rem auto;" role="img" aria-label="An array partitioned around a pivot: three elements below the pivot are kept for recursion, the pivot itself sits at its final index, and four elements above the pivot are shown discarded, since the target rank falls inside the kept region">
              <defs><marker id="ossarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <g font-size="12" text-anchor="middle">
                <text x="66" y="14" fill="var(--text)" font-size="11">recurse here</text>
                <text x="201" y="14" fill="var(--accent)" font-size="11">pivot</text>
                <text x="341" y="14" fill="var(--text-muted)" font-size="11">discarded</text>
                <rect x="10" y="60" width="46" height="36" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="33" y="83" fill="var(--text)">2</text>
                <rect x="66" y="60" width="46" height="36" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="89" y="83" fill="var(--text)">5</text>
                <rect x="122" y="60" width="46" height="36" fill="none" stroke="var(--border)" stroke-width="1.5"/>
                <text x="145" y="83" fill="var(--text)">3</text>
                <rect x="178" y="60" width="46" height="36" fill="none" stroke="var(--accent)" stroke-width="2"/>
                <text x="201" y="83" fill="var(--text)">7</text>
                <rect x="234" y="60" width="46" height="36" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="4,3"/>
                <text x="257" y="83" fill="var(--text-muted)">9</text>
                <rect x="290" y="60" width="46" height="36" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="4,3"/>
                <text x="313" y="83" fill="var(--text-muted)">12</text>
                <rect x="346" y="60" width="46" height="36" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="4,3"/>
                <text x="369" y="83" fill="var(--text-muted)">8</text>
                <rect x="402" y="60" width="46" height="36" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="4,3"/>
                <text x="425" y="83" fill="var(--text-muted)">10</text>
                <line x1="89" y1="30" x2="89" y2="58" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#ossarrow)"/>
                <text x="119" y="44" fill="var(--accent)" font-size="11">rank k</text>
              </g>
            </svg>
            <p>The design reuses quicksort's own partition routine — pick a pivot, rearrange the array in place into elements ≤ pivot followed by elements &gt; pivot, in Θ(n) — but where quicksort must recurse into <em>both</em> halves to fully order everything, selection only ever needs the half containing the target rank; the pivot's final index, compared against k, tells you immediately whether the pivot itself is the answer or which single side to recurse into. The other half's internal order is simply never computed.</p>
            <p>Three variants of the same idea:</p>
            <ul>
              <li><strong>Randomized SELECT (quickselect)</strong> — pivot chosen uniformly at random, exactly as in <a href="#/subject/algorithmics/algorithms/algo-randomized-quicksort">randomized quicksort</a>; solves to expected Θ(n) because the array shrinks by a constant fraction on average each round, and now only one side is ever recursed into rather than both.</li>
              <li><strong>Median-of-medians (BFPRT)</strong> — a deterministic pivot rule that guarantees worst-case Θ(n): split the array into groups of 5, sort each tiny group, take the group medians, and recursively find <em>their</em> median as the pivot. This pivot is provably better than at least 30% and at most 70% of all elements, giving the recurrence T(n) ≤ T(n/5) + T(7n/10) + O(n), which solves to Θ(n) despite the two recursive calls.</li>
              <li><strong>Introselect</strong> — the pragmatic middle ground (C++'s <code>std::nth_element</code>): run randomized quickselect, but fall back to median-of-medians once recursion depth grows suspiciously large, capping the adversarial-input tail the same way introsort caps quicksort's.</li>
            </ul>
            <p><strong>Remark:</strong> the group size 5 in median-of-medians is load-bearing, not arbitrary — groups of 3 make the good-pivot fraction too weak for the recurrence to solve to Θ(n), and groups of 7 or more make sorting each group itself too expensive relative to the gain.</p>
            <table class="mini-table">
              <tr><th>Method</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Randomized quickselect</td><td>expected Θ(n)</td><td>the array shrinks by a constant fraction on average each round, same argument as randomized quicksort</td></tr>
              <tr><td>Median-of-medians</td><td>worst-case Θ(n)</td><td>T(n) ≤ T(n/5) + T(7n/10) + O(n) solves to Θ(n) despite the extra recursive call</td></tr>
              <tr><td>Sort, then index</td><td>Θ(n log n)</td><td>pays for a total order you never asked for, just to read off one position</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> you need the k smallest elements of a stream of n numbers arriving one at a time, using only O(k) memory — you can't hold the whole array to partition it. How would you do it, and why doesn't quickselect apply here?</p>
            <details><summary>Solution</summary>
              <p>Maintain a max-heap of size at most k. For each incoming number: if the heap holds fewer than k elements, push it; otherwise compare it to the heap's max — if the new number is smaller, pop the max and push the new number, otherwise discard it. After the stream ends, the heap holds exactly the k smallest elements seen. Each of the n elements does O(1) <a href="#/subject/algorithmics/data-structures/algo-priority-queue-adt">priority-queue</a> operations at O(log k) each, for Θ(n log k) total using only O(k) memory throughout. Quickselect can't be used directly because its partition step needs random access to rearrange the whole array in place — it assumes the data already sits in memory as one contiguous block, which a single forward pass over a stream never gives you; the heap trades quickselect's better Θ(n) time bound for the ability to work with O(k) memory and one pass.</p>
            </details>
            <p><strong>Remark:</strong> quickselect's expected Θ(n) shares its worst-case Θ(n²) vulnerability with <a href="#/subject/algorithmics/algorithms/algo-randomized-quicksort">randomized quicksort</a> — both degrade under an adversary who can force consistently bad pivots — which is exactly why a production <code>nth_element</code> uses introselect's median-of-medians fallback rather than pure quickselect. The streaming variant above is a reminder that "find the k-th smallest" and "sort everything" are genuinely different amounts of work: the <a href="#/subject/algorithmics/algorithms/algo-sorting-lower-bound-mergesort">Ω(n log n) comparison-sort lower bound</a> applies to producing a full order, not to answering one positional question, and selection is the algorithm that takes that distinction seriously.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 9 (order statistics — §9.1 for randomized SELECT's expected-time analysis, §9.3 for the deterministic median-of-medians algorithm and its recurrence); Blum, M., Floyd, R.W., Pratt, V., Rivest, R.L., & Tarjan, R.E., "Time Bounds for Selection," <em>Journal of Computer and System Sciences</em>, 7(4), 1973 (the original median-of-medians paper); Musser, D.R., "Introspective Sorting and Selection Algorithms," <em>Software—Practice & Experience</em>, 27(8), 1997 (introsort and introselect).</p>
            <p><em>The whole idea in one line: to find what's in the middle, you only ever need to look at the half that could still contain it.</em></p>
          `,
          exercises: [
            "Prove that the median-of-medians recurrence T(n) ≤ T(⌈n/5⌉) + T(7n/10 + 6) + O(n) solves to O(n) (the substitution method — guess and verify — is the standard route). Then explain precisely what breaks in the good-pivot fraction guarantee, and therefore in the recurrence, if the group size is changed to 3.",
            "Prove that randomized quickselect runs in expected Θ(n) time, using a decomposition similar to randomized quicksort's expected-comparisons argument: bound the expected work contributed at each level of recursion using the fact that a random pivot splits the remaining array into a 25%-75% (or better) range with probability at least 1/2."
          ]
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
          id: "algo-longest-increasing-subsequence",
          title: "Longest Increasing Subsequence",
          section: "Dynamic Programming",
          prerequisites: ["algo-dynamic-programming"],
          estMinutes: 25,
          content: `
            <p>Given a sequence a₁,…,a_n, find the length of the longest strictly increasing subsequence (elements need not be contiguous, just in increasing order and in their original relative order). The obvious DP is state design at its plainest: let dp[i] be the length of the longest increasing subsequence <em>ending exactly at</em> index i. Then dp[i] = 1 + max{dp[j] : j &lt; i, a[j] &lt; a[i]}, or 1 if no such j exists — Θ(n²) time to fill the table, Θ(n) space, answer = max over all dp[i].</p>
            <p>A second, less obvious state gets the same answer in Θ(n log n). Maintain an array <code>tails</code> where <code>tails[k]</code> is the <em>smallest possible tail value</em> of any increasing subsequence of length k+1 built from the prefix seen so far. Process elements left to right: for each a[i], binary-search <code>tails</code> for the leftmost position whose value is ≥ a[i] and overwrite it (or append, if a[i] is larger than every current tail). The final length of <code>tails</code> is the answer. The name "patience sorting" comes from a card-game analogy — dealing cards onto piles where each pile is kept increasing, always placing on the leftmost legal pile.</p>
            <table class="mini-table">
              <tr><th>Element</th><th>Action</th><th>tails after</th></tr>
              <tr><td>3</td><td>append (first pile)</td><td>[3]</td></tr>
              <tr><td>1</td><td>replace tails[0]</td><td>[1]</td></tr>
              <tr><td>4</td><td>append</td><td>[1, 4]</td></tr>
              <tr><td>1</td><td>replace tails[0] (no change)</td><td>[1, 4]</td></tr>
              <tr><td>5</td><td>append</td><td>[1, 4, 5]</td></tr>
              <tr><td>9</td><td>append</td><td>[1, 4, 5, 9]</td></tr>
              <tr><td>2</td><td>replace tails[1]</td><td>[1, 2, 5, 9]</td></tr>
              <tr><td>6</td><td>replace tails[3]</td><td>[1, 2, 5, 6]</td></tr>
            </table>
            <p>Sequence [3, 1, 4, 1, 5, 9, 2, 6] finishes with <code>tails</code> of length 4, matching the true LIS length (e.g. 1, 4, 5, 9 or 3, 4, 5, 9). Note that <code>tails</code> itself is <em>not</em> always an actual subsequence of the input — only its <em>length</em> is meaningful; the array is a bookkeeping device, not the answer.</p>
            <p><strong>Try it yourself:</strong> the table above only tracks the length. How would you also recover one actual longest increasing subsequence, not just its length?</p>
            <details><summary>Solution</summary>
              <p>Keep a second array <code>idx[k]</code> recording which input index currently occupies pile k in <code>tails</code>, and a <code>parent[i]</code> array set at the moment element i is placed at pile k: <code>parent[i] = idx[k-1]</code> (or "none" if k = 0). Once the pass finishes, the length is <code>len = tails.length</code>, the last element of the LIS is at index <code>idx[len-1]</code>, and walking <code>parent</code> pointers backward from there reconstructs the whole subsequence in reverse. This is the same "keep a parent pointer at the moment you commit" trick used to reconstruct actual shortest paths from BFS distances, not just their lengths.</p>
            </details>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §15.4 exercises (LIS as a special case of LCS, giving an easy but suboptimal Θ(n log n)-unaware Θ(n²) route); the patience-sorting formulation is originally due to Fredman and Aho–Hirschberg, and is the standard competitive-programming presentation.</p>
          `,
          exercises: [
            "Prove the invariant that makes patience sorting correct: at every point during the scan, tails is strictly increasing, and tails[k] equals the smallest possible last element among all increasing subsequences of length k+1 seen so far. Use it to justify that the binary search for a[i]'s replacement position is well-defined and that tails.length never decreases.",
            "The problem above asks for strictly increasing subsequences. Adapt the Θ(n log n) algorithm to find the longest non-decreasing subsequence instead (equal consecutive values allowed), explaining precisely which binary search changes from a lower-bound search to an upper-bound search, and why."
          ]
        },
        {
          id: "algo-dp-on-trees",
          title: "Dynamic Programming on Trees",
          section: "Dynamic Programming",
          prerequisites: ["algo-dynamic-programming"],
          estMinutes: 25,
          content: `
            <p>DP is not confined to sequences. When a problem's subproblems correspond to a tree's subtrees, the same "define the state, prove the recurrence, combine" discipline applies, with recursion replaced by a postorder traversal: compute every child's answer before combining them into the parent's, exactly the visiting order DFS's finish times already give you for free.</p>
            <p>The canonical instance is the <strong>maximum-weight independent set on a tree</strong>: given a tree with a weight on every vertex, choose a subset of vertices, no two adjacent, of maximum total weight. Define two states per vertex v: <code>dp[v][1]</code> = best achievable in v's subtree if v is <em>included</em>, and <code>dp[v][0]</code> = best if v is <em>excluded</em>. Since including v forbids including any child, while excluding v leaves each child free:</p>
            <table class="mini-table">
              <tr><th>State</th><th>Recurrence</th></tr>
              <tr><td>dp[v][1]</td><td>weight(v) + Σ over children c of dp[c][0]</td></tr>
              <tr><td>dp[v][0]</td><td>Σ over children c of max(dp[c][0], dp[c][1])</td></tr>
            </table>
            <svg viewBox="0 0 300 220" width="100%" height="220" style="max-width:340px;display:block;margin:0.8rem auto;" role="img" aria-label="Small weighted tree with root R (weight 3) having children A (weight 5) and B (weight 1), A having child C (weight 4); each node annotated with its dp0/dp1 pair">
              <line x1="150" y1="45" x2="90" y2="105" stroke="var(--accent)" stroke-width="2"/>
              <line x1="150" y1="45" x2="220" y2="105" stroke="var(--accent)" stroke-width="2"/>
              <line x1="90" y1="125" x2="90" y2="175" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="150" cy="30" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="90" cy="110" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="220" cy="110" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="90" cy="190" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="150" y="34" text-anchor="middle" fill="var(--text)" font-size="13">R:3</text>
              <text x="90" y="114" text-anchor="middle" fill="var(--text)" font-size="13">A:5</text>
              <text x="220" y="114" text-anchor="middle" fill="var(--text)" font-size="13">B:1</text>
              <text x="90" y="194" text-anchor="middle" fill="var(--text)" font-size="13">C:4</text>
              <text x="150" y="60" text-anchor="middle" fill="var(--text-muted)" font-size="11">dp0=6, dp1=7</text>
              <text x="60" y="140" text-anchor="middle" fill="var(--text-muted)" font-size="11">dp0=4, dp1=5</text>
              <text x="255" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">dp0=0, dp1=1</text>
              <text x="90" y="220" text-anchor="middle" fill="var(--text-muted)" font-size="11">dp0=0, dp1=4</text>
            </svg>
            <p>C is a leaf: dp[C][1] = 4, dp[C][0] = 0. A has only child C: dp[A][1] = 5 + dp[C][0] = 5, dp[A][0] = max(0, 4) = 4. B is a leaf: dp[B][1] = 1, dp[B][0] = 0. R has children A, B: dp[R][1] = 3 + dp[A][0] + dp[B][0] = 3 + 4 + 0 = 7, dp[R][0] = max(4, 5) + max(0, 1) = 5 + 1 = 6. The answer is max(dp[R][0], dp[R][1]) = 7, achieved by the set {R, C} — note this correctly rejects A even though A has the single largest weight, because A is adjacent to both R and C and can't coexist with either.</p>
            <p>Every vertex is visited once and does O(children) work combining its already-computed children, so the whole DP runs in Θ(n) time and space — postorder recursion turns what looks like it should be exponential (2ⁿ possible subsets) into linear work, the same overlapping-subproblems payoff as any other DP, just organized by tree structure instead of by array index.</p>
            <p><strong>Try it yourself:</strong> a closely related problem is the <strong>minimum vertex cover</strong> of a tree (smallest set of vertices touching every edge). How does its DP relate to the independent-set DP above?</p>
            <details><summary>Solution</summary>
              <p>On any graph, a set is a vertex cover exactly when its complement is an independent set (every edge must have at least one endpoint in the cover, i.e. not both endpoints can be outside it). So on an unweighted tree, minimum vertex cover size = n − (maximum independent set size), computed by the exact same dp[v][0]/dp[v][1] recurrence above with every weight(v) = 1. No new DP is needed — it's the same state, reinterpreted.</p>
            </details>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §15 general framing applies directly (the exercises there include tree-shaped variants); this pattern — postorder combine of independent-set-style states — is also the standard approach to tree diameter (track, per vertex, the two largest child-to-leaf depths) and to the "house robber III" family of problems in practice interview sets.</p>
          `,
          exercises: [
            "Prove the maximum-weight independent-set recurrence correct with a cut-and-paste argument: given an optimal independent set for the whole tree, show it must restrict to an optimal choice within each child's subtree, conditioned on whether the parent is included.",
            "Design a DP that computes the diameter of a tree (the longest path between any two vertices, measured in edge count). State the per-vertex quantity you compute in postorder, the recurrence that combines children, how the global answer is extracted (it is not simply the root's own value), and the overall complexity."
          ]
        },
        {
          id: "algo-bitmask-dp-tsp",
          title: "Bitmask DP: The Traveling Salesman Problem",
          section: "Dynamic Programming",
          prerequisites: ["algo-dynamic-programming"],
          estMinutes: 30,
          content: `
            <p>The Traveling Salesman Problem — visit every city exactly once and return to the start, minimizing total travel cost — has no known polynomial algorithm (it's NP-hard), but brute-force enumeration of all n! orderings is far from the best exact approach. The Held–Karp algorithm gets the exact answer in Θ(2ⁿ n²) time by using each city's <em>presence in a subset</em>, not its position in a permutation, as the piece of state that matters.</p>
            <p>Fix city 0 as the start. Let S range over subsets of {0,…,n−1} that contain 0, and define dp[S][j] = the minimum cost of a path that starts at 0, visits exactly the cities in S, and ends at city j ∈ S. The recurrence peels off the last step: dp[S][j] = min over k ∈ S∖{j} of dp[S∖{j}][k] + cost(k, j), with base case dp[{0}][0] = 0. The final answer is min over j of dp[full set][j] + cost(j, 0), closing the tour back to the start. There are 2ⁿ subsets and n choices of j, each transition scanning up to n predecessors — Θ(2ⁿ n²) time, Θ(2ⁿ n) space to store the table, representing each subset as an n-bit integer (the "bitmask").</p>
            <p>Concretely, on a 4-city instance with cost(0,1)=10, cost(0,2)=15, cost(0,3)=20, cost(1,2)=35, cost(1,3)=25, cost(2,3)=30 (symmetric), the base row is dp[{0,1}][1] = 10, dp[{0,2}][2] = 15, dp[{0,3}][3] = 20 — one hop from the start. The table has 2⁴×4 = 64 entries in total; working the rest out by hand is mechanical but tedious, so we won't reproduce it all here — the optimum this instance converges to is a tour of cost 80, achieved by 0 → 1 → 3 → 2 → 0 (10 + 25 + 30 + 15 = 80).</p>
            <p><strong>Try it yourself:</strong> the DP as stated above only computes the minimum <em>cost</em>. How would you recover the actual optimal tour, i.e. the sequence of cities?</p>
            <details><summary>Solution</summary>
              <p>Alongside dp[S][j], store parent[S][j] = the city k that achieved the minimum in dp[S][j]'s recurrence. To reconstruct, start at (S = full set, j = argmin_j dp[full][j] + cost(j,0)), then repeatedly set j ← parent[S][j] and S ← S∖{j_old}, prepending each visited city, until S = {0}. This is the same "remember who you came from, then walk it back" idea used to reconstruct BFS shortest paths and the LIS above — reconstructing an optimal object from a DP that only computed its value is always this same extra bookkeeping layer, never a new algorithm.</p>
            </details>
            <p><strong>Further reading:</strong> Held & Karp, "A Dynamic Programming Approach to Sequencing Problems," <em>J. SIAM</em>, 1962 (the original paper); CLRS does not cover TSP directly but §34.5 (Hamiltonian cycle, NP-completeness) explains why no polynomial algorithm is expected to exist, which is exactly why Θ(2ⁿ n²) — exponential, but far below n! — is the best known exact approach.</p>
          `,
          exercises: [
            "Prove the Held–Karp recurrence is correct: show that if a path visiting exactly S and ending at j is optimal, then removing its last step must leave an optimal path visiting S∖{j} and ending at whichever city preceded j — i.e. verify the optimal-substructure property for this state definition, and explain why the subset (rather than the visiting order) is exactly the information the recurrence needs to remain valid.",
            "Adapt the DP to the Minimum Hamiltonian Path problem: visit every city exactly once starting at city 0, but do NOT return to the start (the path may end anywhere). State precisely which one part of the recurrence and final-answer formula changes, and which stays identical."
          ]
        },
        {
          id: "algo-digit-dp",
          title: "Digit DP",
          section: "Dynamic Programming",
          prerequisites: ["algo-dynamic-programming"],
          estMinutes: 25,
          content: `
            <p>Digit DP counts (or sums over) all integers in a range that satisfy some digit-level constraint — no two adjacent equal digits, digit sum below a threshold, a specific digit appearing an even number of times — without ever enumerating the range directly. Direct enumeration over [0, N] costs Θ(N); digit DP costs Θ(D × extra-states), where D is the number of decimal digits of N, typically ~18 for 64-bit integers — a change from "linear in the value" to "linear in the number of digits of the value," an enormous difference for large N.</p>
            <p>Write N's digits as d₁ d₂ … d_D, most significant first, and process positions left to right. The key piece of state beyond "which position" is a boolean <strong>tight</strong> flag: tight = true means every digit chosen so far exactly matches N's corresponding digit, so the current digit is still bounded above by d_pos (choosing anything larger would exceed N); tight = false means some earlier digit was chosen strictly below N's digit, so the number built so far is already guaranteed less than N regardless of what comes next, and every remaining digit is free to range over 0–9. Any problem-specific bookkeeping (running digit sum, last digit used, parity of a count) becomes additional state alongside pos and tight: dp(pos, tight, extra) = number of ways to complete the number from here satisfying the target condition, and the top-level answer is dp(1, tight=true, extra=initial).</p>
            <p>Take counting integers in [0, 23] with digit sum ≤ 4, N = "23", extra = running digit sum so far. At position 1 (tens digit), tight = true bounds the first digit to 0, 1, or 2 (d₁ = 2): choosing 0 or 1 immediately makes tight = false for position 2 (free digits 0–9, subject to the sum-so-far budget); choosing 2 keeps tight = true, so position 2 is bounded by d₂ = 3. Enumerating by hand confirms the count is 12: {0,1,2,3,4} (five one-digit numbers), {10,11,12,13} (sum ≤ 4 with tens digit 1), {20,21,22} (sum ≤ 4 with tens digit 2, bounded further by ≤ 23) — 5 + 4 + 3 = 12.</p>
            <p><strong>Try it yourself:</strong> design the digit DP for counting integers in [0, N] that have <em>no two adjacent equal digits</em> (e.g. 121 is fine, 122 is not).</p>
            <details><summary>Solution</summary>
              <p>Extra state = the last digit placed so far (or a sentinel "none" before any digit is placed, since a number's own leading digit has nothing to its left to compare against). Transition dp(pos, tight, last) → dp(pos+1, tight', c) is only taken for a candidate digit c ≠ last (any c is fine when last = "none"), with tight' = tight AND (c == d_pos) exactly as before. The state space is Θ(D × 2 × 11) — 11 rather than 10 to account for the "none" sentinel — still Θ(D) overall, so the technique costs nothing extra over the plain digit-sum version above; only the transition's filter condition changed.</p>
            </details>
            <p><strong>Further reading:</strong> this technique doesn't have a single canonical textbook name or CLRS section — it's standard folklore in competitive programming (see, e.g., Halim & Halim, <em>Competitive Programming</em>, the "Digit DP" section) but the underlying idea — bound-tracking state plus memoised left-to-right construction — is the exact same "state design" discipline as every other DP in this section, just with a state that tracks distance-from-the-boundary instead of a prefix length.</p>
          `,
          exercises: [
            "Prove the claimed state-space bound: with D digits, a binary tight flag, and an 'extra' component ranging over at most k values (e.g. k = 37 for a digit-sum-so-far state bounded by 9×D), the total number of distinct (pos, tight, extra) states is O(D × k), and each is computed in O(10) time from already-computed states — hence the whole DP runs in O(10 · D · k). Explain concretely why tight only ever needs 2 values rather than growing with position.",
            "Given a digit DP function f(N) that counts integers in [0, N] satisfying some condition, describe how to count integers in [L, R] (inclusive) satisfying the same condition using two calls to f. Handle the edge case L = 0 explicitly, and explain why f(R) − f(L) alone would be wrong."
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
        },
        {
          id: "algo-fft",
          title: "The Fast Fourier Transform",
          section: "Numerical & Signal Algorithms",
          prerequisites: ["algo-sorting-lower-bound-mergesort"],
          estMinutes: 30,
          content: `
            <p>Given two degree-(n−1) polynomials A(x) and B(x), the product C(x) = A(x)·B(x) has degree 2n−2, and its coefficients are the <em>convolution</em> of A and B's coefficient vectors: c_k = Σ over i+j=k of a_i·b_j. Computed directly, that's Θ(n²) — one multiplication per pair (i, j). The Fast Fourier Transform gets the same answer in Θ(n log n), not by changing the arithmetic, but by changing representation.</p>
            <p>A degree-(n−1) polynomial is fully determined either by its n coefficients, or by its values at any n distinct points — that's just polynomial interpolation. This suggests a three-stage strategy: (1) <strong>evaluate</strong> A and B at enough points, (2) <strong>multiply pointwise</strong> — C(xᵢ) = A(xᵢ)·B(xᵢ), only Θ(n) work since it's n independent scalar multiplications, (3) <strong>interpolate</strong> C back from its values to its coefficients. Stage (2) is cheap no matter which points you pick; the whole question is whether stages (1) and (3) can be done in Θ(n log n) instead of the Θ(n²) that evaluating a degree-(n−1) polynomial at n arbitrary points costs by running Horner's rule n separate times.</p>
            <p>The FFT's answer is to choose the points with algebraic structure baked in: the n complex <strong>n-th roots of unity</strong>, ω⁰, ω¹, …, ω^(n−1), where ω = e^(2πi/n). Split A's coefficients by parity, A(x) = A_e(x²) + x·A_o(x²), where A_e collects the even-indexed coefficients and A_o the odd-indexed ones, each a polynomial of degree about n/2 − 1. Evaluating A at the n-th roots of unity reduces to evaluating A_e and A_o at the <em>squares</em> of those roots — and squaring an n-th root of unity always lands on one of only n/2 distinct (n/2)-th roots of unity, each hit by exactly two of the original n points. So evaluating A at n points costs two evaluations of half-size polynomials at n/2 points each, plus Θ(n) work to recombine:</p>
            <svg viewBox="0 0 620 200" width="100%" height="200" style="max-width:640px;display:block;margin:0.8rem auto;" role="img" aria-label="An 8-coefficient array a0 through a7 splitting into an even-indexed sub-array a0,a2,a4,a6 and an odd-indexed sub-array a1,a3,a5,a7, one level of the FFT recursion">
              <text x="310" y="14" text-anchor="middle" fill="var(--text-muted)" font-size="11">coefficients of a degree-7 polynomial, one level of the split</text>
              <rect x="8" y="20" width="56" height="30" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="72" y="20" width="56" height="30" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="136" y="20" width="56" height="30" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="200" y="20" width="56" height="30" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="264" y="20" width="56" height="30" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="328" y="20" width="56" height="30" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="392" y="20" width="56" height="30" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="456" y="20" width="56" height="30" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <text x="36" y="39" text-anchor="middle" fill="var(--text)" font-size="12">a0</text>
              <text x="100" y="39" text-anchor="middle" fill="var(--text)" font-size="12">a1</text>
              <text x="164" y="39" text-anchor="middle" fill="var(--text)" font-size="12">a2</text>
              <text x="228" y="39" text-anchor="middle" fill="var(--text)" font-size="12">a3</text>
              <text x="292" y="39" text-anchor="middle" fill="var(--text)" font-size="12">a4</text>
              <text x="356" y="39" text-anchor="middle" fill="var(--text)" font-size="12">a5</text>
              <text x="420" y="39" text-anchor="middle" fill="var(--text)" font-size="12">a6</text>
              <text x="484" y="39" text-anchor="middle" fill="var(--text)" font-size="12">a7</text>
              <line x1="36" y1="50" x2="68" y2="130" stroke="var(--accent)" stroke-width="1.5"/>
              <line x1="164" y1="50" x2="132" y2="130" stroke="var(--accent)" stroke-width="1.5"/>
              <line x1="292" y1="50" x2="196" y2="130" stroke="var(--accent)" stroke-width="1.5"/>
              <line x1="420" y1="50" x2="260" y2="130" stroke="var(--accent)" stroke-width="1.5"/>
              <line x1="100" y1="50" x2="328" y2="130" stroke="var(--text-muted)" stroke-width="1.5"/>
              <line x1="228" y1="50" x2="392" y2="130" stroke="var(--text-muted)" stroke-width="1.5"/>
              <line x1="356" y1="50" x2="456" y2="130" stroke="var(--text-muted)" stroke-width="1.5"/>
              <line x1="484" y1="50" x2="520" y2="130" stroke="var(--text-muted)" stroke-width="1.5"/>
              <rect x="40" y="130" width="56" height="30" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
              <rect x="104" y="130" width="56" height="30" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
              <rect x="168" y="130" width="56" height="30" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
              <rect x="232" y="130" width="56" height="30" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
              <text x="68" y="149" text-anchor="middle" fill="var(--text)" font-size="12">a0</text>
              <text x="132" y="149" text-anchor="middle" fill="var(--text)" font-size="12">a2</text>
              <text x="196" y="149" text-anchor="middle" fill="var(--text)" font-size="12">a4</text>
              <text x="260" y="149" text-anchor="middle" fill="var(--text)" font-size="12">a6</text>
              <rect x="300" y="130" width="56" height="30" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
              <rect x="364" y="130" width="56" height="30" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
              <rect x="428" y="130" width="56" height="30" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
              <rect x="492" y="130" width="56" height="30" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
              <text x="328" y="149" text-anchor="middle" fill="var(--text)" font-size="12">a1</text>
              <text x="392" y="149" text-anchor="middle" fill="var(--text)" font-size="12">a3</text>
              <text x="456" y="149" text-anchor="middle" fill="var(--text)" font-size="12">a5</text>
              <text x="520" y="149" text-anchor="middle" fill="var(--text)" font-size="12">a7</text>
              <text x="164" y="180" text-anchor="middle" fill="var(--text-muted)" font-size="11">P_e — n/2 coefficients</text>
              <text x="410" y="180" text-anchor="middle" fill="var(--text-muted)" font-size="11">P_o — n/2 coefficients</text>
            </svg>
            <p>Each half is split by parity again the same way, recursing down to single coefficients after log₂n levels — exactly the shape of merge sort's recursion, split by parity instead of by array half: T(n) = 2T(n/2) + Θ(n) = Θ(n log n). The recursion bottoms out at degree-0 "polynomials", trivially evaluated at ω⁰ = 1. Interpolation (stage 3) turns out to be the same computation run backwards — the inverse transform is a forward transform at the points ω^(−k), scaled by 1/n — so it costs the identical Θ(n log n) by the identical algorithm.</p>
            <p>In practice, the recursive version above is rewritten as an <strong>iterative, in-place</strong> algorithm: permute the input array into bit-reversed order (reverse the binary digits of each index — exactly where the recursive splits would eventually have sent that coefficient), then repeatedly combine adjacent pairs, Θ(n) work per level for log₂n levels. Each combine step is a <strong>butterfly</strong>: read two values, multiply one by a power of ω (a "twiddle factor"), write the sum and difference back in place. This is the version real FFT libraries implement; it's mentioned here only so the name is recognizable, not derived in full.</p>
            <p>One detail that matters in practice: evaluating at only n points and multiplying pointwise computes the <em>circular</em> convolution (indices wrap around mod n), not the ordinary polynomial product you want. Padding both inputs with zeros out to a length ≥ 2n−1 (rounded up to the next power of two, so the recursive splits stay clean) avoids the wraparound and recovers the true product.</p>
            <p><strong>Applications.</strong> Big-integer multiplication: treat a k-digit number's digits (or digit-groups) as polynomial coefficients in some base; multiplying two big integers is exactly the polynomial-multiplication problem above, followed by a carry-propagation pass — this is how arbitrary-precision arithmetic libraries multiply numbers with millions of digits in near-linear time instead of Θ(k²). Signal processing: convolving a signal with a filter kernel is the same convolution operation, so FFT-based ("fast") convolution is the standard way to apply a large filter to a long signal without paying Θ(nm) for the direct sliding-window sum.</p>
            <p><strong>Try it yourself:</strong> the DFT of a length-n coefficient vector is exactly its evaluation at the n-th roots of unity. Given that, explain precisely why multiplying two DFT vectors pointwise and inverse-transforming computes the circular convolution of the two original coefficient vectors, not their ordinary product — and why zero-padding fixes it.</p>
            <details><summary>Solution</summary>
              <p>Pointwise multiplication in the transformed domain corresponds exactly to <em>circular</em> convolution back in the coefficient domain, because the DFT is a transform over indices taken mod n (ω^n = 1, so ω^k = ω^(k mod n) for every k). An entry c_k of the circular convolution sums a_i·b_j over all i + j ≡ k (mod n) — so a term with i + j ≥ n doesn't get dropped, it aliases onto a smaller index k = i+j−n and corrupts that coefficient instead of contributing to a coefficient ≥ n, which the length-n vector has no room to store anyway. Padding both inputs with zeros out to length ≥ 2n−1 makes the true product's degree strictly less than the padded length, so no wraparound index ever collides with a genuinely nonzero coefficient — reading off the low-order entries after the inverse transform then gives exactly the ordinary (linear) convolution.</p>
            </details>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., Ch. 30 ("Polynomials and the FFT"), specifically §30.1–30.2 for the evaluate–multiply–interpolate framework and the recursive FFT, §30.3 for the iterative in-place butterfly version.</p>
          `,
          exercises: [
            "Prove that for n a power of two, the n-th roots of unity square onto the (n/2)-th roots of unity, with each (n/2)-th root hit by exactly two of the n original points. Use this fact to justify precisely why the FFT recurrence has exactly 2 subproblems of size n/2, rather than n subproblems of size n/2 as a naive 'evaluate at all n points independently' count might suggest.",
            "Big-integer multiplication via FFT needs exact integer output coefficients, yet FFT computed with floating-point complex arithmetic accumulates rounding error. Explain, at a high level, why the true integer coefficients can still be recovered exactly by rounding each computed output to the nearest integer, given a bound on how large those true coefficients can get — and why that same bound is exactly what limits how many digits a floating-point FFT multiplication can safely handle before you'd need to switch to exact modular ('number-theoretic transform') arithmetic instead."
          ]
        },
        {
          id: "algo-sparse-linear-algebra",
          title: "Sparse Linear Algebra",
          section: "Numerical & Signal Algorithms",
          prerequisites: ["algo-dynamic-arrays-amortization"],
          estMinutes: 25,
          content: `
            <p>Many matrices that show up in practice — graph adjacency and incidence matrices, finite-element and finite-difference discretizations, large recommendation or design matrices — have only O(n) or O(n log n) nonzero entries out of n² total. Storing and operating on them as ordinary dense n×n arrays wastes both memory (Θ(n²) no matter how few entries are actually nonzero) and time (a dense matrix-vector product is Θ(n²) even when 99.9% of the terms being summed are zero times something).</p>
            <p><strong>Sparse storage formats.</strong> A sparse matrix stores its nonzero pattern explicitly, in one of a few standard layouts, each making a different set of operations cheap:</p>
            <table class="mini-table">
              <tr><th>Format</th><th>Layout</th><th>Cheap at</th><th>Expensive at</th></tr>
              <tr><td>COO</td><td>parallel arrays row[], col[], val[], any order</td><td>appending a new entry, O(1)</td><td>row or column access, matvec — needs a full O(nnz) scan</td></tr>
              <tr><td>CSR</td><td>row_ptr[n+1] + col_idx[nnz] + val[nnz]</td><td>row access, matvec, both O(nnz in that row)</td><td>column access — still a full scan</td></tr>
              <tr><td>CSC</td><td>col_ptr[n+1] + row_idx[nnz] + val[nnz]</td><td>column access, matrix-transpose-vector products</td><td>row access — still a full scan</td></tr>
            </table>
            <p>COO is the natural format to <em>build</em> a sparse matrix in — just append (row, col, value) triples as you discover nonzeros, in any order, then sort once at the end. CSR compresses that by row: instead of repeating a row index once per nonzero in that row, it stores one pointer per row into shared <code>col_idx</code>/<code>val</code> arrays. A concrete 4×4 example, with nonzeros at (0,0)=5, (0,2)=1, (1,1)=3, (2,2)=4, (3,0)=2, (3,3)=6:</p>
            <svg viewBox="0 0 200 210" width="100%" height="210" style="max-width:220px;display:block;margin:0.8rem auto;" role="img" aria-label="4 by 4 grid showing a sparsity pattern with 6 filled cells out of 16">
              <rect x="20" y="30" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="60" y="30" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="100" y="30" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="140" y="30" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="20" y="70" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="60" y="70" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="100" y="70" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="140" y="70" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="20" y="110" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="60" y="110" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="100" y="110" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="140" y="110" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="20" y="150" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="60" y="150" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="100" y="150" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="140" y="150" width="40" height="40" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <rect x="20" y="30" width="40" height="40" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)" stroke-width="2"/>
              <text x="40" y="55" text-anchor="middle" fill="var(--text)" font-size="13">5</text>
              <rect x="100" y="30" width="40" height="40" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)" stroke-width="2"/>
              <text x="120" y="55" text-anchor="middle" fill="var(--text)" font-size="13">1</text>
              <rect x="60" y="70" width="40" height="40" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)" stroke-width="2"/>
              <text x="80" y="95" text-anchor="middle" fill="var(--text)" font-size="13">3</text>
              <rect x="100" y="110" width="40" height="40" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)" stroke-width="2"/>
              <text x="120" y="135" text-anchor="middle" fill="var(--text)" font-size="13">4</text>
              <rect x="20" y="150" width="40" height="40" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)" stroke-width="2"/>
              <text x="40" y="175" text-anchor="middle" fill="var(--text)" font-size="13">2</text>
              <rect x="140" y="150" width="40" height="40" fill="var(--accent)" fill-opacity="0.18" stroke="var(--accent)" stroke-width="2"/>
              <text x="160" y="175" text-anchor="middle" fill="var(--text)" font-size="13">6</text>
              <text x="100" y="15" text-anchor="middle" fill="var(--text-muted)" font-size="11">6 nonzeros out of 16 entries</text>
            </svg>
            <p>Its CSR triple is <code>val = [5, 1, 3, 4, 2, 6]</code>, <code>col_idx = [0, 2, 1, 2, 0, 3]</code>, <code>row_ptr = [0, 2, 3, 4, 6]</code> — row i's nonzeros live at positions <code>row_ptr[i] .. row_ptr[i+1]-1</code> in <code>val</code>/<code>col_idx</code> (row 0 owns positions 0–1: values 5, 1 at columns 0, 2; row 3 owns positions 4–5: values 2, 6 at columns 0, 3).</p>
            <p><strong>Sparse matrix-vector product.</strong> Given A in CSR and a dense vector v, y = Av needs, for each row i, only the <code>row_ptr[i+1] − row_ptr[i]</code> actual nonzeros in that row — total work Θ(nnz) across the whole matrix, not Θ(n²). This one fact is why CSR is the default format for iterative sparse solvers: they're built almost entirely out of repeated matrix-vector products.</p>
            <p><strong>Why direct elimination fails: fill-in.</strong> Gaussian elimination eliminates column k by subtracting a multiple of row k from every row i &gt; k with a nonzero in column k. If row k has a nonzero in column j, that subtraction can introduce a <em>new</em> nonzero at (i, j) even where A originally had a zero — "fill-in". A sparse matrix can turn nearly dense after enough elimination steps, in the worst case. Reordering the variables before elimination (minimum-degree ordering, nested dissection) reduces fill-in substantially but cannot eliminate it in general. For very large sparse systems this motivates avoiding direct factorization altogether: the conjugate gradient method solves sparse symmetric positive-definite systems using only a sequence of matrix-vector products — each Θ(nnz), with no fill-in ever, because no factorization is computed at all. Deriving conjugate gradient and the wider family of Krylov-subspace methods is real numerical-analysis content of its own (it sits alongside — and depends on — the "LU Factorization and the Role of Pivoting" and "Conditioning and Backward Stability" lessons over in the Data Science subject's numerical linear algebra material); the point to take from this lesson is narrower: fill-in is exactly <em>why</em> direct methods stop being attractive at scale, no matter how cleverly the sparse pattern is stored.</p>
            <p><strong>Try it yourself:</strong> consider an n×n "star" matrix — nonzero only at (0,0) (the hub), every (0, j) and (j, 0) for j &gt; 0 (the hub's row and column, i.e. edges to every leaf), and the diagonal. Show that eliminating the hub (variable 0) first fills in the entire remaining (n−1)×(n−1) submatrix, while eliminating every leaf first and the hub last produces no fill-in at all.</p>
            <details><summary>Solution</summary>
              <p>Eliminating column 0 means subtracting (A[i][0] / A[0][0])·row 0 from every row i &gt; 0. Row 0 is nonzero in every column j (the full hub row), so this subtraction introduces a nonzero at (i, j) for every column j &gt; 0, for every leaf row i — the entire (n−1)×(n−1) trailing block, previously all zero off the diagonal, fills in completely. Eliminate leaves first instead: leaf i's row and column touch only the hub and itself (no leaf touches another leaf), so eliminating leaf i only ever modifies the hub's row/column and leaf i's own diagonal entry — no cross term between two leaves is ever created. Once every leaf is gone, the hub is a 1×1 elimination with nothing left to fill in. This one example is the seed of every fill-in-reducing ordering heuristic used in practice: eliminate low-degree ("leaf-like") variables before high-degree ("hub-like") ones.</p>
            </details>
            <p><strong>Further reading:</strong> Saad, <em>Iterative Methods for Sparse Linear Systems</em>, 2nd ed. (2003), for conjugate gradient and Krylov-subspace methods; Davis, <em>Direct Methods for Sparse Linear Systems</em> (SIAM, 2006), for CSR/CSC mechanics and fill-in-reducing orderings in full depth.</p>
          `,
          exercises: [
            "Given a sparse matrix as unsorted COO triples (possibly with duplicate (row, col) pairs whose values should be summed), design an algorithm to build the equivalent CSR representation in Θ(nnz + n) time — not Θ(nnz log nnz) — by bucketing entries by row (a counting-sort-style pass, recalling the counting-sort idea from the comparison-sorting lower-bound lesson) rather than comparison-sorting the triples.",
            "Prove that converting a matrix from CSR to CSC (or back) can be done in Θ(nnz + n) time by the same counting/bucketing technique as the previous exercise, applied to columns instead of rows, and explain why this means neither format is asymptotically 'better to start from' — you can always cheaply produce one from the other."
          ]
        },
        {
          id: "algo-matrix-multiplication",
          title: "Fast Matrix Multiplication",
          section: "Numerical & Signal Algorithms",
          prerequisites: ["algo-divide-and-conquer"],
          estMinutes: 28,
          content: `
            <p>The classical algorithm for multiplying two n×n matrices — the triple nested loop, y[i][j] += A[i][k]·B[k][j] — does Θ(n³) scalar multiplications. Whether this is actually necessary turns out to be a decades-deep open question, and the divide-and-conquer tools already used elsewhere in this course (block recursion, the master theorem) are exactly the tools behind the improvements that are known.</p>
            <p><strong>Strassen's algorithm</strong> — already introduced as one of two canonical divide-and-conquer case studies in "Divide & Conquer Beyond Sorting: Strassen and Closest Pair" — reduces the 8 block products a naive 2×2-block split needs down to 7, giving T(n) = 7T(n/2) + Θ(n²) = Θ(n^log₂7) ≈ Θ(n^2.807) by the master theorem's case 1. See that lesson (and its exercise verifying the seven identities by hand) for the full derivation; what matters here is just the resulting exponent, since it's about to reappear.</p>
            <p><strong>Boolean matrix multiplication.</strong> Replace the usual (+, ×) with (OR, AND) over {0, 1}: (A ⊙ B)[i][j] = OR over k of (A[i][k] AND B[k][j]). This is ordinary matrix multiplication with addition saturating at 1 instead of accumulating — and it inherits <em>exactly</em> the same block-recursive structure Strassen's algorithm relies on, because that recursion only ever uses associativity and distributivity of its two operations, and (OR, AND) satisfies both (it forms a semiring, just not a ring — OR has no inverse). So Boolean matrix multiplication also runs in Θ(n^ω) time, where ω is whichever matrix-multiplication exponent you have available (ω ≈ 2.807 via Strassen, or better with the algorithms mentioned below) — a genuinely useful fact, because Boolean matrix multiplication is exactly the computation behind one-step graph reachability.</p>
            <p>Take a directed graph's adjacency matrix A, and let I be the identity (so A ∨ I marks every vertex as "reachable from itself in 0 steps" in addition to A's real edges). Repeated Boolean squaring accumulates reachability:</p>
            <table class="mini-table">
              <tr><th>Matrix</th><th>Represents reachability within</th><th>On a path graph 1→2→3→4</th></tr>
              <tr><td>M = A ∨ I</td><td>1 step</td><td>1→2, 2→3, 3→4 (+ every i→i)</td></tr>
              <tr><td>M² (= M ⊙ M)</td><td>2 steps</td><td>+ 1→3, 2→4</td></tr>
              <tr><td>M⁴ (= M² ⊙ M²)</td><td>4 steps</td><td>+ 1→4 — now every reachable pair is marked</td></tr>
            </table>
            <p>Since any simple path in an n-vertex graph has fewer than n edges, M^(2^⌈log₂n⌉) already captures full reachability — only ⌈log₂n⌉ repeated squarings, each one Θ(n^ω) Boolean matrix multiplication, for Θ(n^ω log n) total. This is exactly the technique the next lesson builds on for computing shortest paths, not just reachability, in unweighted graphs.</p>
            <p><strong>Try it yourself:</strong> using the table above, explain why the squaring chain starts from A ∨ I rather than from A alone, and why ⌈log₂n⌉ squarings always suffice regardless of the graph's actual diameter.</p>
            <details><summary>Solution</summary>
              <p>If you squared A alone, A²'s entries would mark paths of <em>exactly</em> 2 edges — a path of length 1 would never appear in any later power, since composing exact-length reachability only ever produces other exact lengths. You'd need to separately OR together A, A², A³, … to accumulate anything, defeating the point of repeated squaring. Adding the identity makes every diagonal entry "reachable in 0 steps", so once a pair is marked reachable within k steps it stays marked at every larger power too — (A∨I) raised to any exponent ≥ k still has that entry set, since squaring an already-1 diagonal only ever adds 1s, never removes any. Reachability accumulates monotonically rather than resetting at each level. Because any simple path has at most n−1 edges, (A∨I)^(n−1) already captures full reachability, and doubling the exponent at each squaring (1, 2, 4, 8, …) reaches ≥ n−1 after ⌈log₂n⌉ squarings regardless of the graph's actual (possibly much smaller) diameter — you always pay for the worst case, but that worst case is still only Θ(log n) matrix multiplications.</p>
            </details>
            <p>Strassen's ω ≈ 2.807 is not the end of the story, though the rest is mostly theoretical interest rather than engineering: Coppersmith and Winograd's 1990 algorithm reached ω ≈ 2.376, and a sequence of refinements since (Stothers, Vassilevska Williams, Le Gall, and most recently Alman & Vassilevska Williams) have pushed the exponent to roughly 2.37. These are "galactic algorithms" — asymptotically faster in a precise mathematical sense that only becomes real for matrix sizes vastly beyond anything ever actually multiplied on a computer, because of enormous hidden constants and impractical recursion overhead. Nobody runs Coppersmith–Winograd in production; Strassen is the practical ceiling. The smallest possible value of ω is still an open problem — many suspect the true answer is ω = 2, but nobody has proved it.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §4.2 for Strassen's derivation in full; Alman & Vassilevska Williams, "A Refined Laser Method and Faster Matrix Multiplication," SODA 2021, for the current record exponent (no need to read it in full — just that it exists and roughly where the frontier sits).</p>
          `,
          exercises: [
            "Verify the master-theorem computation showing T(n) = 7T(n/2) + Θ(n²) gives Θ(n^log₂7). Then redo it for a hypothetical block algorithm using only 6 block products instead of 7 (no such 2×2-block algorithm is actually known to exist — this is a pure exercise in the recurrence), and compare the resulting exponent to Strassen's.",
            "State the semiring axioms and verify that ({0,1}, OR, AND) satisfies them, identifying specifically which ring axiom it fails to satisfy (and why that particular failure doesn't matter for the block-multiplication recursion, which only ever invokes associativity and distributivity)."
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
          title: "Depth-First Search",
          section: "DFS family",
          prerequisites: ["algo-stacks"],
          estMinutes: 25,
          content: `
            <p>Depth-first search explores a graph by committing to one path as far as it can go, and only backtracking once it is truly stuck. It's the algorithm to reach for whenever the question is about a graph's shape — cycles, reachability, ordering — rather than about the shortest way to get somewhere.</p>
            <svg viewBox="0 0 300 230" width="100%" height="230" style="max-width:320px;display:block;margin:0.8rem auto;" role="img" aria-label="DFS tree rooted at A with tree edges to B and D, B to C, and a dashed back edge from C to A, with discover/finish times shown at each node">
              <defs><marker id="dfsarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <line x1="150" y1="45" x2="85" y2="90" stroke="var(--accent)" stroke-width="2" marker-end="url(#dfsarrow)"/>
              <line x1="150" y1="45" x2="215" y2="90" stroke="var(--accent)" stroke-width="2" marker-end="url(#dfsarrow)"/>
              <line x1="70" y1="118" x2="70" y2="160" stroke="var(--accent)" stroke-width="2" marker-end="url(#dfsarrow)"/>
              <path d="M56,178 Q0,90 134,34" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#dfsarrow)"/>
              <circle cx="150" cy="30" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="70" cy="100" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="230" cy="100" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="70" cy="180" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="150" y="34" text-anchor="middle" fill="var(--text)" font-size="13">A</text>
              <text x="70" y="104" text-anchor="middle" fill="var(--text)" font-size="13">B</text>
              <text x="230" y="104" text-anchor="middle" fill="var(--text)" font-size="13">D</text>
              <text x="70" y="184" text-anchor="middle" fill="var(--text)" font-size="13">C</text>
              <text x="150" y="60" text-anchor="middle" fill="var(--text-muted)" font-size="11">1 / 8</text>
              <text x="70" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">2 / 5</text>
              <text x="230" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">6 / 7</text>
              <text x="70" y="210" text-anchor="middle" fill="var(--text-muted)" font-size="11">3 / 4</text>
              <text x="10" y="80" fill="var(--text-muted)" font-size="10">back edge</text>
            </svg>
            <p>The design follows straight from that goal: from the current vertex, immediately recurse into an unvisited neighbor before considering any other neighbor of the current vertex — the neighbor list is only revisited after that whole sub-exploration is exhausted. Bookkeeping two timestamps per vertex, <code>discover[v]</code> when v is first reached and <code>finish[v]</code> when its subtree is fully explored, turns this into a precise tool: the <strong>parenthesis theorem</strong> says that for any two vertices, their discover/finish intervals are either nested or disjoint, never partially overlapping — exactly like well-formed parentheses. Every edge then falls into exactly one of four categories relative to the DFS forest, and the category is fully determined by comparing timestamps.</p>
            <ul>
              <li><strong>Recursive DFS</strong> — the implicit call stack does the bookkeeping. Simplest to write, but recursion depth equals path depth, so it can overflow the call stack on a long enough path (see <a href="#/subject/algorithmics/data-structures/algo-stacks">stacks</a>).</li>
              <li><strong>Iterative DFS</strong> — an explicit stack replacing the call stack, the "recursion in reverse" trick already teased in the stacks lesson; needed on very deep or generated-on-demand graphs.</li>
              <li><strong>Multi-source DFS forest</strong> — restart DFS from any still-unvisited vertex once one tree is exhausted, producing a forest instead of a single tree when the graph is disconnected.</li>
              <li><strong>Edge classification</strong> (tree / back / forward / cross) — the timestamps directly answer three of the most useful questions in the DFS family: is there a cycle (a back edge)? what's a topological order (decreasing finish time)? which vertices lie together (the SCC lessons)?</li>
            </ul>
            <p><strong>Remark:</strong> the four-way edge classification is stated for directed graphs — in an undirected graph every non-tree edge is a back edge, since there's no way to have discovered the far endpoint without already having discovered a common ancestor.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Full traversal</td><td>O(V+E)</td><td>each vertex is discovered once, each edge is examined once, from whichever endpoint reaches it first</td></tr>
              <tr><td>Cycle detection (directed)</td><td>O(V+E)</td><td>free byproduct — a back edge to a still-in-progress vertex is a witness</td></tr>
              <tr><td>Space</td><td>O(V)</td><td>recursion/explicit stack depth plus one discover/finish pair per vertex</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> using only a three-color scheme (white = unvisited, gray = on the current path, black = fully finished), how would you detect whether a directed graph contains a cycle at all, in a single DFS pass?</p>
            <details><summary>Solution</summary>
              <p>Color every vertex white initially. When DFS discovers a vertex, color it gray; when DFS finishes it, color it black. Whenever DFS examines an edge (u, v): if v is gray, that edge points back into the path currently being explored — a cycle, since v is an ancestor of u still under active recursion. If v is white, recurse into it. If v is black, it's a forward or cross edge and can't create a cycle back through u, because its whole subtree already finished with no path back to u. The graph is acyclic exactly when this never finds a gray target across the whole traversal — precisely the back-edge case of the edge classification above.</p>
            </details>
            <p><strong>Remark:</strong> this "explore one path fully, then backtrack" discipline is a stack in disguise — recursion <em>is</em> a stack (see <a href="#/subject/algorithmics/data-structures/algo-stacks">stacks</a>) — which is why swapping the stack for a <a href="#/subject/algorithmics/data-structures/algo-queues">queue</a> in the exact same skeleton produces <a href="#/subject/algorithmics/graph-algorithms/algo-bfs">breadth-first search</a> instead, with an entirely different guarantee. Everything downstream in this chapter's DFS family — <a href="#/subject/algorithmics/graph-algorithms/algo-topological-sort-dag-dp">topological sorting</a>, both strongly-connected-components algorithms, and bridges and articulation points — is this same traversal with one extra piece of bookkeeping layered on top.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §22.3 (depth-first search, the parenthesis theorem, edge classification, white/gray/black); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §4.2 (directed graphs, depth-first search); Skiena, <em>The Algorithm Design Manual</em>, 3rd ed., §5.2-5.3 (DFS and its use for cycle detection).</p>
            <p><em>The whole idea in one line: go as deep as you possibly can, and only turn back when there's truly nowhere left to go.</em></p>
          `,
          exercises: [
            "Prove the parenthesis theorem: for any two vertices u and v in a DFS forest, exactly one of the following holds — the intervals [discover[u], finish[u]] and [discover[v], finish[v]] are disjoint, or one is entirely nested inside the other. Use this to show that v is a descendant of u in the DFS forest if and only if discover[u] < discover[v] < finish[v] < finish[u].",
            "Given an undirected graph, describe an O(V+E) DFS-based algorithm that determines whether it is a tree (connected and acyclic), using only the discover/finish bookkeeping and the fact that every non-tree edge in an undirected DFS is a back edge. Then explain what changes if the graph may have several components and you're asked whether the whole graph is a forest."
          ]
        },
        {
          id: "algo-bfs",
          title: "Breadth-First Search",
          section: "BFS family",
          prerequisites: ["algo-queues"],
          estMinutes: 25,
          content: `
            <p>Breadth-first search explores a graph outward in layers, one hop at a time, and that ordering is exactly what makes it the tool for shortest paths when every edge costs the same: the first time BFS reaches a vertex, it has provably found a shortest path to it.</p>
            <svg viewBox="0 0 340 200" width="100%" height="200" style="max-width:360px;display:block;margin:0.8rem auto;" role="img" aria-label="BFS frontier expanding outward from source S: S at distance 0, A and B at distance 1, C at distance 2 reachable from both A and B">
              <defs><marker id="bfsarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <line x1="68" y1="90" x2="150" y2="58" stroke="var(--accent)" stroke-width="2" marker-end="url(#bfsarrow)"/>
              <line x1="68" y1="110" x2="150" y2="142" stroke="var(--accent)" stroke-width="2" marker-end="url(#bfsarrow)"/>
              <line x1="188" y1="58" x2="272" y2="92" stroke="var(--accent)" stroke-width="2" marker-end="url(#bfsarrow)"/>
              <line x1="188" y1="142" x2="272" y2="108" stroke="var(--accent)" stroke-width="2" marker-end="url(#bfsarrow)"/>
              <circle cx="50" cy="100" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="170" cy="50" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="170" cy="150" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="290" cy="100" r="20" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="50" y="104" text-anchor="middle" fill="var(--text)" font-size="13">S</text>
              <text x="170" y="54" text-anchor="middle" fill="var(--text)" font-size="13">A</text>
              <text x="170" y="154" text-anchor="middle" fill="var(--text)" font-size="13">B</text>
              <text x="290" y="104" text-anchor="middle" fill="var(--text)" font-size="13">C</text>
              <text x="50" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">dist 0</text>
              <text x="170" y="26" text-anchor="middle" fill="var(--text-muted)" font-size="11">dist 1</text>
              <text x="170" y="180" text-anchor="middle" fill="var(--text-muted)" font-size="11">dist 1</text>
              <text x="290" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">dist 2</text>
            </svg>
            <p>The design follows straight from that goal: process vertices in the exact order they were discovered, using a queue rather than a stack. Mark a vertex visited the moment it's <em>discovered</em> (enqueued), not when it's later dequeued — that single choice is what keeps every vertex processed exactly once and keeps the frontier growing one clean layer at a time instead of stalling. The queue's FIFO discipline (see <a href="#/subject/algorithmics/data-structures/algo-queues">queues</a>) then guarantees an invariant: at any moment, the queue holds vertices of at most two consecutive distances, all of the smaller distance before all of the larger — which is exactly why the first dequeue of any vertex fixes its shortest-path distance.</p>
            <ul>
              <li><strong>Single-source BFS</strong> — queue seeded with one source; parent pointers reconstruct the actual shortest path, not just its length.</li>
              <li><strong>Multi-source BFS</strong> — seed the queue with several sources at once, all at distance 0; the resulting distances are each vertex's distance to its <em>nearest</em> source.</li>
              <li><strong>0-1 BFS</strong> — replace the queue with a deque: push a 0-weight edge's endpoint to the front, a 1-weight edge's endpoint to the back. Handles exactly two edge weights without paying for a full priority queue.</li>
              <li><strong>Bidirectional BFS</strong> — grow two frontiers at once, from the source and from the target, stopping when they meet; roughly halves the number of vertices explored when there's one known target on a large graph.</li>
            </ul>
            <p><strong>Remark:</strong> BFS only gives shortest paths when every edge has the same cost — as soon as edges carry different positive weights, the layered argument breaks and you need <a href="#/subject/algorithmics/graph-algorithms/algo-dijkstra">Dijkstra's algorithm</a> instead.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Distances from one source</td><td>O(V+E)</td><td>each vertex enqueued once, each edge examined once from whichever endpoint reaches it first</td></tr>
              <tr><td>Shortest path reconstruction</td><td>O(path length)</td><td>walk parent pointers back from target to source</td></tr>
              <tr><td>Space</td><td>O(V)</td><td>the queue plus one distance/parent slot per vertex</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> you're given a standard 8x8 chessboard and a knight on one square. Using BFS, how would you find the minimum number of knight moves to reach any other given square?</p>
            <details><summary>Solution</summary>
              <p>Treat each of the 64 squares as a vertex, with an edge between two squares if a knight can move between them in one move (up to 8 possible moves per square, fewer near the edges). Run BFS from the starting square: the graph is unweighted (every move costs one turn), so BFS's layer-by-layer guarantee applies directly, and the distance recorded when the target square is first dequeued is the minimum number of moves. This is the general pattern for "minimum moves" puzzles — sliding tile puzzles, word ladders, Rubik's-cube-style state spaces — where the graph is never built explicitly; each state's neighbors are just generated on demand as BFS asks for them.</p>
            </details>
            <p><strong>Remark:</strong> BFS's layering is the base case that <a href="#/subject/algorithmics/graph-algorithms/algo-dijkstra">Dijkstra's algorithm</a> generalizes — swap the queue for a priority queue keyed on tentative distance, and the same "settle the closest unsettled vertex first" argument goes through for nonnegative weights instead of unit weights. Structurally, BFS is <a href="#/subject/algorithmics/graph-algorithms/algo-dfs">depth-first search</a> with a queue in place of a stack — the same traversal skeleton, one substitution, an entirely different guarantee.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §22.2 (breadth-first search, the shortest-path proof via the layering invariant); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §4.1 (breadth-first search in undirected graphs, with the maze/shortest-path framing).</p>
            <p><em>The whole idea in one line: finish everything at distance k before you start anything at distance k+1.</em></p>
          `,
          exercises: [
            "Prove the layering invariant precisely: at every point during BFS, the queue contains vertices whose distances take at most two consecutive values, with all vertices of the smaller value appearing before all vertices of the larger. Use it to prove that the first time BFS dequeues a vertex, its recorded distance equals the true shortest-path distance from the source.",
            "You're given an unweighted graph and a set of k 'special' vertices. Describe an O(V+E) algorithm, using a single multi-source BFS, that computes for every vertex its distance to the nearest special vertex. Then explain why running k separate single-source BFS passes and taking the minimum would give the same answer but cost O(k(V+E)) — the multi-source version isn't just the same work written more cleverly, it genuinely shares work across sources."
          ]
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
          title: "Kosaraju's Algorithm",
          section: "SCC family",
          prerequisites: ["algo-dfs"],
          estMinutes: 30,
          content: `
            <p>A directed graph's cycles can tangle vertices together in a way that makes the graph as a whole hard to reason about — but every directed graph decomposes uniquely into strongly connected components (maximal sets of vertices that can all reach each other), and collapsing each component to a single point always produces a DAG. Kosaraju's algorithm finds that decomposition in two clean DFS passes.</p>
            <svg viewBox="0 0 360 190" width="100%" height="190" style="max-width:380px;display:block;margin:0.8rem auto;" role="img" aria-label="Two strongly connected components, each a small cycle of vertices, with one directed edge from the left component to the right component in the condensation">
              <defs><marker id="sccarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <rect x="10" y="15" width="150" height="150" rx="10" fill="none" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="5,4"/>
              <rect x="210" y="45" width="140" height="100" rx="10" fill="none" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="5,4"/>
              <text x="85" y="175" text-anchor="middle" fill="var(--text-muted)" font-size="11">SCC 1</text>
              <text x="280" y="160" text-anchor="middle" fill="var(--text-muted)" font-size="11">SCC 2</text>
              <line x1="60" y1="55" x2="100" y2="55" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#sccarrow)"/>
              <line x1="100" y1="65" x2="70" y2="115" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#sccarrow)"/>
              <line x1="65" y1="110" x2="55" y2="65" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#sccarrow)"/>
              <circle cx="50" cy="55" r="14" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="110" cy="55" r="14" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="75" cy="120" r="14" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="50" y="59" text-anchor="middle" fill="var(--text)" font-size="12">X</text>
              <text x="110" y="59" text-anchor="middle" fill="var(--text)" font-size="12">Y</text>
              <text x="75" y="124" text-anchor="middle" fill="var(--text)" font-size="12">Z</text>
              <line x1="255" y1="85" x2="295" y2="105" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#sccarrow)"/>
              <line x1="292" y1="112" x2="258" y2="92" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#sccarrow)"/>
              <circle cx="250" cy="80" r="14" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="300" cy="115" r="14" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="250" y="84" text-anchor="middle" fill="var(--text)" font-size="12">P</text>
              <text x="300" y="119" text-anchor="middle" fill="var(--text)" font-size="12">Q</text>
              <line x1="160" y1="90" x2="208" y2="90" stroke="var(--text)" stroke-width="2" marker-end="url(#sccarrow)"/>
            </svg>
            <p>The design follows straight from one lemma: the <strong>component graph</strong> — one node per SCC, one edge between two SCCs if any edge crosses between their members — is always a DAG, because a cycle between two components would just mean they were one component all along. Kosaraju's algorithm exploits this in two passes: first, a DFS over G records each vertex's finish time (exactly as in <a href="#/subject/algorithmics/graph-algorithms/algo-dfs">plain DFS</a>); second, a DFS over the transpose graph G<sup>T</sup> (every edge reversed), processing vertices in <em>decreasing</em> order of the finish times just recorded. Each tree produced by that second DFS is exactly one SCC — the vertex with the globally latest finish time in G must belong to a "source" component of the condensation (one with no incoming inter-component edges), so starting the second DFS there can only wander into that one component before running out of forward edges in G<sup>T</sup>.</p>
            <ul>
              <li><strong>Kosaraju (Kosaraju-Sharir)</strong> — the two-pass DFS-plus-transpose approach above; conceptually simplest, at the cost of building the transpose graph explicitly.</li>
              <li><strong>Tarjan's algorithm</strong> — a single DFS pass with a low-link value per vertex, popping a completed SCC off an auxiliary stack as soon as one is found; no transpose needed (next lesson).</li>
              <li><strong>Gabow's path-based algorithm</strong> — another single-pass variant, using two stacks instead of low-link values, that some implementers find easier to get exactly right.</li>
            </ul>
            <p><strong>Remark:</strong> all three variants run in O(V+E) time; the practical differences are constant factors and code complexity, not asymptotic cost.</p>
            <table class="mini-table">
              <tr><th>Operation</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Full SCC decomposition</td><td>O(V+E)</td><td>two full DFS passes, one on G and one on G<sup>T</sup>, each linear</td></tr>
              <tr><td>Building the transpose G<sup>T</sup></td><td>O(V+E)</td><td>one pass over the edge list, reversing each edge</td></tr>
              <tr><td>Space</td><td>O(V+E)</td><td>the transpose graph itself, plus the usual DFS bookkeeping</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> given a directed graph, how would you determine whether it is strongly connected as a whole (exactly one SCC containing every vertex), without running the full two-pass algorithm?</p>
            <details><summary>Solution</summary>
              <p>Pick any vertex s and run a single DFS from s on G: if it doesn't reach every vertex, the graph isn't strongly connected (some vertex can't be reached from s, so certainly can't cycle back to it). If it does reach every vertex, build the transpose G<sup>T</sup> and run a single DFS from s on it: if that also reaches every vertex, then every vertex can reach s, and combined with the first pass, every vertex can reach every other vertex through s. Two linear-time DFS passes from one fixed vertex, because you only need to check for one component, not enumerate all of them.</p>
            </details>
            <p><strong>Remark:</strong> the condensation DAG that falls out of this decomposition is exactly the structure <a href="#/subject/algorithmics/graph-algorithms/algo-topological-sort-dag-dp">topological ordering</a> operates on — SCC decomposition is often the first step whenever a directed graph needs to be reasoned about as a DAG, including the surprising application in 2-SAT via strongly connected components, where the same two-pass machinery decides satisfiability outright.</p>
            <p><strong>Further reading:</strong> CLRS, 3rd ed., §22.5 (strongly connected components, the component-graph lemma, and the correctness proof for the two-pass algorithm); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §4.2 (under the name Kosaraju-Sharir, with the historical note); Sharir, M., "A strong-connectivity algorithm and its applications in data flow analysis," <em>Computers & Mathematics with Applications</em>, 7(1), 1981 (the first published version; the underlying two-pass idea is credited to S. Rao Kosaraju, unpublished, 1978).</p>
            <p><em>The whole idea in one line: finish late in G, then explore G<sup>T</sup> in that order — the transpose can't run away from where G already cornered it.</em></p>
          `,
          exercises: [
            "Prove the key lemma: the component graph of any directed graph is a DAG. Then prove that if u finishes after v in a DFS of G and u, v are in different SCCs, the SCC containing u appears no later than the SCC containing v in every topological order of the condensation — i.e., decreasing finish order in G never starts the second pass inside a 'downstream' component before an 'upstream' one.",
            "Implement Kosaraju's algorithm and trace it by hand on a small graph with two SCCs of sizes 3 and 2, connected by exactly one inter-component edge. Then describe how you would extend the algorithm to also output, for each pair of SCCs with an edge between them, the direction of that edge in the condensation DAG, using information already computed during the two passes."
          ]
        },
        {
          id: "algo-scc-tarjan",
          title: "Tarjan's Algorithm",
          section: "SCC family",
          prerequisites: ["algo-scc-kosaraju"],
          estMinutes: 30,
          content: `
            <p>Tarjan's algorithm finds a graph's strongly connected components in a single depth-first search, without ever building the transpose graph that <a href="#/subject/algorithmics/graph-algorithms/algo-scc-kosaraju">Kosaraju's algorithm</a> needs — useful whenever you want SCCs to fall out of a traversal you're already running, rather than as a separate two-pass step.</p>
            <svg viewBox="0 0 380 210" width="100%" height="210" style="max-width:400px;display:block;margin:0.8rem auto;" role="img" aria-label="Three vertices X, Y, Z forming a cycle with disc and low values shown, plus a stack holding X, Y, Z">
              <defs><marker id="tjarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <line x1="90" y1="55" x2="150" y2="55" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#tjarrow)"/>
              <line x1="150" y1="70" x2="100" y2="130" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#tjarrow)"/>
              <line x1="90" y1="120" x2="80" y2="70" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#tjarrow)"/>
              <circle cx="70" cy="55" r="18" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="170" cy="55" r="18" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="110" cy="140" r="18" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="70" y="59" text-anchor="middle" fill="var(--text)" font-size="13">X</text>
              <text x="170" y="59" text-anchor="middle" fill="var(--text)" font-size="13">Y</text>
              <text x="110" y="144" text-anchor="middle" fill="var(--text)" font-size="13">Z</text>
              <text x="70" y="30" text-anchor="middle" fill="var(--text-muted)" font-size="10">disc 1 / low 1</text>
              <text x="170" y="30" text-anchor="middle" fill="var(--text-muted)" font-size="10">disc 2 / low 1</text>
              <text x="110" y="180" text-anchor="middle" fill="var(--text-muted)" font-size="10">disc 3 / low 1</text>
              <rect x="250" y="20" width="110" height="150" fill="none" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4,3"/>
              <text x="305" y="12" text-anchor="middle" fill="var(--text-muted)" font-size="11">stack</text>
              <text x="305" y="45" text-anchor="middle" fill="var(--text)" font-size="12">Z</text>
              <text x="305" y="75" text-anchor="middle" fill="var(--text)" font-size="12">Y</text>
              <text x="305" y="105" text-anchor="middle" fill="var(--text)" font-size="12">X</text>
              <text x="305" y="145" text-anchor="middle" fill="var(--accent)" font-size="10">low[X]==disc[X]: pop all → one SCC</text>
            </svg>
            <p>The design follows straight from one extra piece of bookkeeping layered onto plain DFS: alongside the usual <code>disc[v]</code> discovery time, track a <strong>low-link</strong> value <code>low[v]</code> — the smallest discovery time reachable from v's DFS subtree using at most one edge back to an ancestor. Every vertex is also pushed onto an explicit stack the moment it's discovered. As the DFS returns from exploring v, low[v] is the minimum of disc[v] itself, low[child] for every tree child, and disc[w] for every back edge (v,w) to a vertex still on the stack. The moment low[v] == disc[v], v is the "root" of a completed SCC — pop the stack down through and including v, and everything popped is exactly that component. This works because low[v] == disc[v] means nothing in v's subtree can reach any vertex discovered earlier than v, so v's subtree can't be part of some larger, still-open component.</p>
            <ul>
              <li><strong>Tarjan's algorithm</strong> — the single-pass, disc/low, explicit-stack approach above; the standard choice in competitive programming, since it needs no transpose graph.</li>
              <li><strong>Gabow's path-based algorithm</strong> — a second single-pass variant using two stacks instead of numeric low-link values; some implementers find the bookkeeping easier to get exactly right, at the same asymptotic cost.</li>
              <li><strong><a href="#/subject/algorithmics/graph-algorithms/algo-scc-kosaraju">Kosaraju's algorithm</a></strong> — the two-pass alternative, conceptually simpler at the cost of an explicit transpose graph and a second full traversal.</li>
            </ul>
            <p><strong>Remark:</strong> the stack in Tarjan's algorithm is not the DFS recursion stack — it's a second, separate stack tracking which discovered vertices are still "unresolved" into a component, and a vertex must additionally be marked as on-stack so a back edge can be told apart from a cross edge to an already-finished, different component.</p>
            <table class="mini-table">
              <tr><th></th><th>Passes</th><th>Extra structure</th><th>Time</th></tr>
              <tr><td>Kosaraju</td><td>2 (G, then G<sup>T</sup>)</td><td>the transpose graph G<sup>T</sup></td><td>O(V+E)</td></tr>
              <tr><td>Tarjan</td><td>1</td><td>one auxiliary stack, one low-link per vertex</td><td>O(V+E)</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> trace Tarjan's algorithm by hand on the three-vertex cycle X → Y → Z → X from the diagram above, starting DFS at X. What are disc and low for each vertex by the time the algorithm finishes, and when does the stack get popped?</p>
            <details><summary>Solution</summary>
              <p>DFS discovers X (disc=1), then Y (disc=2), then Z (disc=3), pushing each onto the stack in that order: stack is [X, Y, Z] from bottom to top. From Z, the edge Z→X is a back edge to X, which is still on the stack, so low[Z] = min(disc[Z], disc[X]) = 1. Z has no more edges, so it finishes with low[Z] (1) ≠ disc[Z] (3) — not yet a component root. Back at Y, low[Y] = min(disc[Y], low[Z]) = 1, also not a root. Back at X, low[X] = min(disc[X], low[Y]) = 1 = disc[X] — X is a component root. Pop the stack down through X: Z, Y, X all come off together, forming one SCC — correctly, since the whole graph is one cycle.</p>
            </details>
            <p><strong>Remark:</strong> the disc/low machinery introduced here is reused almost unchanged in the very next lesson, <a href="#/subject/algorithmics/graph-algorithms/algo-bridges-articulation">bridges and articulation points</a>, just run on an undirected graph and read differently, and it's a common building block underneath <a href="#/subject/algorithmics/graph-algorithms/algo-2sat-scc">2-SAT</a> solvers where speed and a single pass genuinely matter.</p>
            <p><strong>Further reading:</strong> Tarjan, R.E., "Depth-first search and linear graph algorithms," <em>SIAM Journal on Computing</em>, 1(2), 1972 (the original paper — also introduces the low-link idea used again for bridges); CLRS, 3rd ed., Problem 22-4 (works through Tarjan's algorithm as an exercise); Sedgewick & Wayne, <em>Algorithms</em>, 4th ed., §4.2 (companion coverage alongside Kosaraju-Sharir).</p>
            <p><em>The whole idea in one line: a vertex closes off its own component exactly when nothing below it can reach any further back than itself.</em></p>
          `,
          exercises: [
            "Prove that low[v] == disc[v] correctly identifies exactly the vertices that are roots of a completed SCC in the DFS-stack sense — i.e. show that if low[v] == disc[v], no vertex in v's subtree that is still on the stack can belong to a different, not-yet-closed component higher up the DFS tree.",
            "Modify Tarjan's algorithm to run iteratively (explicit DFS stack) instead of recursively, and explain precisely why an iterative version is often preferred in practice even though the recursive version is easier to state — consider what happens on a graph with a path of length 10^6."
          ]
        },
        {
          id: "algo-bridges-articulation",
          title: "Bridges and Articulation Points",
          section: "DFS family",
          prerequisites: ["algo-scc-tarjan"],
          estMinutes: 30,
          content: `
            <p>Bridges and articulation points find the single points of failure in a graph — the one edge or one vertex whose removal disconnects it — which is exactly the question a network engineer or a power-grid planner actually cares about.</p>
            <svg viewBox="0 0 360 140" width="100%" height="140" style="max-width:380px;display:block;margin:0.8rem auto;" role="img" aria-label="Two triangles of vertices, ABC and DEF, joined by a single edge C-D; C and D are articulation points and the edge C-D is a bridge">
              <line x1="50" y1="40" x2="100" y2="40" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="50" y1="40" x2="75" y2="90" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="100" y1="40" x2="75" y2="90" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="91" y1="93" x2="269" y2="93" stroke="var(--accent)" stroke-width="2.5"/>
              <line x1="260" y1="40" x2="310" y2="40" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="260" y1="40" x2="285" y2="90" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="310" y1="40" x2="285" y2="90" stroke="var(--border)" stroke-width="1.5"/>
              <circle cx="50" cy="40" r="16" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
              <circle cx="100" cy="40" r="16" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
              <circle cx="75" cy="90" r="16" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
              <circle cx="285" cy="90" r="16" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
              <circle cx="260" cy="40" r="16" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
              <circle cx="310" cy="40" r="16" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
              <text x="50" y="44" text-anchor="middle" fill="var(--text)" font-size="12">A</text>
              <text x="100" y="44" text-anchor="middle" fill="var(--text)" font-size="12">B</text>
              <text x="75" y="94" text-anchor="middle" fill="var(--text)" font-size="12">C</text>
              <text x="285" y="94" text-anchor="middle" fill="var(--text)" font-size="12">D</text>
              <text x="260" y="44" text-anchor="middle" fill="var(--text)" font-size="12">E</text>
              <text x="310" y="44" text-anchor="middle" fill="var(--text)" font-size="12">F</text>
              <text x="180" y="82" text-anchor="middle" fill="var(--accent)" font-size="11">bridge</text>
            </svg>
            <p>The design follows straight from the same low-link idea used in <a href="#/subject/algorithmics/graph-algorithms/algo-scc-tarjan">Tarjan's algorithm</a>, just run on an undirected graph and read differently: DFS the graph, tracking disc[v] and low[v] exactly as before (low[v] = the earliest discovery time reachable from v's subtree via at most one non-parent edge). For a tree edge (u,v) with v a child of u: (u,v) is a <strong>bridge</strong> iff low[v] &gt; disc[u] — meaning nothing in v's subtree can reach u or anything discovered before u except through this one edge. A vertex u is an <strong>articulation point</strong> under two separate conditions: if u is the DFS root, it's an articulation point iff it has two or more children in the DFS tree (each subtree only connects to the rest of the graph through u); if u is not the root, it's an articulation point iff some child v has low[v] ≥ disc[u] — the same "can't escape without u" condition, just without the strict inequality bridges need, since a vertex can still be a cut point even if the edge to its child isn't itself a bridge.</p>
            <ul>
              <li><strong>Bridges</strong> — edges whose removal disconnects the graph; found where low[v] &gt; disc[u] on a tree edge.</li>
              <li><strong>Articulation points</strong> — vertices whose removal disconnects the graph; found via the root/non-root child conditions above.</li>
              <li><strong>Biconnected components</strong> — the natural next step: decompose the graph into maximal subgraphs with no articulation point of their own, using a second auxiliary stack of edges alongside the same DFS, producing the graph's block-cut tree.</li>
            </ul>
            <p><strong>Remark:</strong> on a graph with parallel edges (a multigraph), the bridge test must exclude the exact edge back to the parent, not just any edge to the parent vertex — otherwise a genuine second parallel edge back to the parent gets miscounted as a back edge that "rescues" the child, hiding a real bridge.</p>
            <table class="mini-table">
              <tr><th>Test</th><th>Condition</th></tr>
              <tr><td>Edge (u,v), v a DFS child of u, is a bridge</td><td>low[v] &gt; disc[u]</td></tr>
              <tr><td>Root u is an articulation point</td><td>u has ≥ 2 children in the DFS tree</td></tr>
              <tr><td>Non-root u is an articulation point</td><td>some child v has low[v] ≥ disc[u]</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> a company's server network has a set of always-on connections between machines. Given the network as an undirected graph, how would you find every "critical connection" — a link whose failure would split the network into two pieces that can no longer reach each other?</p>
            <details><summary>Solution</summary>
              <p>This is exactly bridge-finding: run one DFS, computing disc[v] and low[v] for every vertex, and report every tree edge (u,v) with low[v] &gt; disc[u]. Non-tree (back) edges are never bridges, since a back edge means there's already an alternate route around it. The whole scan is a single O(V+E) DFS — no need to test each edge individually by removing it and rechecking connectivity, which would cost O(E·(V+E)).</p>
            </details>
            <p><strong>Remark:</strong> the same low-link scan that finds bridges is also, structurally, a compressed offline substitute for asking <a href="#/subject/algorithmics/data-structures/algo-union-find">union-find</a> "are these two vertices still connected?" after deleting one edge at a time — union-find handles a stream of additions efficiently but not deletions, which is precisely why this DFS-based approach exists instead. The same disc/low bookkeeping is also the basis for <a href="#/subject/algorithmics/graph-algorithms/algo-scc-tarjan">Tarjan's SCC algorithm</a> one lesson back, adapted from undirected cut structure to directed strong connectivity.</p>
            <p><strong>Further reading:</strong> Tarjan, R.E., "Depth-first search and linear graph algorithms," <em>SIAM Journal on Computing</em>, 1(2), 1972 (introduces the low-link technique used for both bridges and SCCs); Hopcroft, J., Tarjan, R., "Algorithm 447: Efficient algorithms for graph manipulation," <em>Communications of the ACM</em>, 16(6), 1973 (biconnected components); CLRS, 3rd ed., Problem 22-2 (articulation points, bridges, and biconnected components as a worked exercise).</p>
            <p><em>The whole idea in one line: a vertex or edge is critical exactly when nothing behind it in the DFS tree can reach in front of it any other way.</em></p>
          `,
          exercises: [
            "Prove that a non-root vertex u is an articulation point if and only if it has some DFS child v with low[v] ≥ disc[u]. Explain carefully why the root needs a separate condition (≥2 children) instead of the same inequality.",
            "Describe how to extend the bridge-finding DFS to output the full biconnected-component decomposition of the graph (using an auxiliary stack of edges pushed as they're visited and popped off whenever a biconnected component closes), and explain what the resulting block-cut tree represents."
          ]
        },
        {
          id: "algo-2sat-scc",
          title: "2-SAT via Strongly Connected Components",
          section: "DFS family",
          prerequisites: ["algo-scc-tarjan"],
          estMinutes: 25,
          content: `
            <p>2-SAT decides, in linear time, whether a boolean formula built entirely from clauses of at most two literals is satisfiable — and if it is, actually produces a satisfying assignment, using nothing but the SCC machinery from the last two lessons.</p>
            <svg viewBox="0 0 320 160" width="100%" height="160" style="max-width:340px;display:block;margin:0.8rem auto;" role="img" aria-label="Implication graph for the clause a or b: nodes a, not a, b, not b, with an edge from not a to b and from not b to a">
              <defs><marker id="satarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <circle cx="60" cy="40" r="20" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <circle cx="60" cy="120" r="20" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <circle cx="260" cy="40" r="20" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <circle cx="260" cy="120" r="20" fill="none" stroke="var(--border)" stroke-width="1.5"/>
              <text x="60" y="44" text-anchor="middle" fill="var(--text)" font-size="12">a</text>
              <text x="60" y="124" text-anchor="middle" fill="var(--text)" font-size="12">¬a</text>
              <text x="260" y="44" text-anchor="middle" fill="var(--text)" font-size="12">b</text>
              <text x="260" y="124" text-anchor="middle" fill="var(--text)" font-size="12">¬b</text>
              <line x1="80" y1="120" x2="240" y2="44" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#satarrow)"/>
              <line x1="240" y1="116" x2="80" y2="44" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#satarrow)"/>
              <text x="160" y="70" text-anchor="middle" fill="var(--text-muted)" font-size="10">¬a → b</text>
              <text x="160" y="100" text-anchor="middle" fill="var(--text-muted)" font-size="10">¬b → a</text>
            </svg>
            <p>The design follows from a direct encoding: represent every boolean variable x as <em>two</em> nodes in an <strong>implication graph</strong>, one for x and one for ¬x. A clause (a ∨ b) says "if a is false, b must be true, and vice versa" — logically equivalent to two implications, ¬a→b and ¬b→a — so add exactly those two directed edges for every clause. The whole formula's implications now sit in one graph, and satisfiability reduces to a graph question: the formula is satisfiable iff no variable x has x and ¬x in the same <a href="#/subject/algorithmics/graph-algorithms/algo-scc-tarjan">strongly connected component</a>. If x and ¬x can reach each other, the implication chain forces x→¬x→x→…, i.e. x would have to equal its own negation — a contradiction — and conversely, if every variable's two literals sit in different SCCs, an assignment consistent with every implication provably exists.</p>
            <p>Reading off that assignment is the second half of the same SCC computation: order the components topologically (Tarjan and Kosaraju both naturally produce this order as a byproduct), and set x = true if x's SCC comes later in that order than ¬x's SCC, false otherwise. This respects every implication automatically, because implications only ever point "forward" in the condensation's topological order.</p>
            <ul>
              <li><strong>Implication graph encoding</strong> — the two-node-per-variable, two-edge-per-clause construction above; this is the entire algorithm once SCCs are in hand.</li>
              <li><strong>Horn-SAT</strong> — a different tractable special case of SAT (clauses with at most one positive literal), solved by unit propagation rather than SCCs; worth knowing 2-SAT and Horn-SAT are two different islands of tractability inside a generally NP-complete problem.</li>
            </ul>
            <p><strong>Remark:</strong> the moment a clause has three or more literals this reduction breaks — there's no way to encode "at least one of three literals is true" as a single implication — which is exactly why 3-SAT is NP-complete while 2-SAT is not, making the jump from 2 to 3 literals per clause one of the cleanest tractable/intractable boundaries in the field.</p>
            <p>The algorithm runs in O(n+m) time for n variables and m clauses: build the implication graph in O(n+m), run one linear-time SCC decomposition, and read off the assignment in one more linear pass.</p>
            <p><strong>Try it yourself:</strong> a small conference has n talks and needs to assign each to one of two rooms. Some pairs of talks conflict and can't share a room; some pairs are so closely related the organizers want them in the same room. How would you decide, in linear time, whether a valid room assignment exists?</p>
            <details><summary>Solution</summary>
              <p>Model each talk i as a boolean variable xᵢ (true = room A, false = room B). A conflict between i and j forbids both being in the same room: "not both A" becomes the clause (¬xᵢ ∨ ¬xⱼ), and "not both B" becomes (xᵢ ∨ xⱼ); together these force different rooms. A "same room" requirement becomes two clauses enforcing xᵢ ↔ xⱼ: (¬xᵢ ∨ xⱼ) and (xᵢ ∨ ¬xⱼ). Every constraint is a clause of exactly two literals, so the whole problem is an instance of 2-SAT — build the implication graph, run SCC decomposition, and a valid assignment exists iff no variable and its negation land in the same component.</p>
            </details>
            <p><strong>Remark:</strong> this lesson is the clearest example in the whole graph-algorithms chapter of a problem that looks like it needs backtracking search and instead turns out to be exactly linear-time reachability in disguise — the same SCC machinery from <a href="#/subject/algorithmics/graph-algorithms/algo-scc-kosaraju">Kosaraju's algorithm</a> and <a href="#/subject/algorithmics/graph-algorithms/algo-scc-tarjan">Tarjan's algorithm</a>, pointed at a differently-constructed graph.</p>
            <p><strong>Further reading:</strong> Aspvall, B., Plass, M.F., Tarjan, R.E., "A linear-time algorithm for testing the truth of certain quantified boolean formulas," <em>Information Processing Letters</em>, 8(3), 1979 (the original linear-time 2-SAT algorithm via strong components); Even, S., Itai, A., Shamir, A., "On the complexity of timetable and multicommodity flow problems," <em>SIAM Journal on Computing</em>, 5(4), 1976 (an earlier related result using the same implication-graph idea).</p>
            <p><em>The whole idea in one line: "if not this, then that" chains a formula into a graph, and satisfiability becomes "does anything point back at its own negation?"</em></p>
          `,
          exercises: [
            "Prove formally that a 2-CNF formula is unsatisfiable if and only if some variable x and its negation ¬x lie in the same SCC of the implication graph. (One direction: show that x and ¬x in the same SCC forces x = ¬x under every consistent implication chain. The other: show that if every variable's two literals are in different SCCs, assigning by topological order of the SCCs satisfies every clause.)",
            "Given a satisfiable 2-SAT instance, is the resulting satisfying assignment from the topological-order rule always unique? Either prove it is, or give a small formula with more than one satisfying assignment and explain what in the SCC structure allows the freedom."
          ]
        },
        {
          id: "algo-eulerian-path-hierholzer",
          title: "Eulerian Paths and Hierholzer's Algorithm",
          section: "DFS family",
          prerequisites: ["algo-dfs"],
          estMinutes: 22,
          content: `
            <p>An Eulerian circuit is a walk that uses every edge of a graph exactly once and returns to its start — the original question graph theory was invented to answer, and today the same idea underlies genome assembly and route-planning problems where every road or every DNA fragment must be traversed once.</p>
            <svg viewBox="0 0 320 150" width="100%" height="150" style="max-width:340px;display:block;margin:0.8rem auto;" role="img" aria-label="Two triangles ABC and CDE sharing vertex C, forming a figure-eight graph where C has degree four and every other vertex has degree two">
              <line x1="55" y1="35" x2="105" y2="35" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="55" y1="35" x2="82" y2="85" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="105" y1="35" x2="82" y2="85" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="98" y1="85" x2="230" y2="45" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="230" y1="45" x2="260" y2="95" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="260" y1="95" x2="94" y2="92" stroke="var(--border)" stroke-width="1.5"/>
              <circle cx="55" cy="35" r="15" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
              <circle cx="105" cy="35" r="15" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
              <circle cx="85" cy="88" r="18" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
              <circle cx="230" cy="45" r="15" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
              <circle cx="260" cy="95" r="15" fill="none" stroke="var(--text-muted)" stroke-width="1.5"/>
              <text x="55" y="39" text-anchor="middle" fill="var(--text)" font-size="12">A</text>
              <text x="105" y="39" text-anchor="middle" fill="var(--text)" font-size="12">B</text>
              <text x="85" y="92" text-anchor="middle" fill="var(--text)" font-size="12">C</text>
              <text x="230" y="49" text-anchor="middle" fill="var(--text)" font-size="12">D</text>
              <text x="260" y="99" text-anchor="middle" fill="var(--text)" font-size="12">E</text>
              <text x="160" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="10">deg(C) = 4, every other vertex deg 2 — an Eulerian circuit exists</text>
            </svg>
            <p>The design follows from a clean existence criterion, provable by a simple parity argument: an undirected graph has an Eulerian circuit iff it is connected (ignoring isolated vertices) and every vertex has even degree. Necessity is easy — every time the circuit passes through a vertex it uses up one incoming and one outgoing edge-slot at that vertex, so the degree used by any closed walk is always even. Sufficiency (that even degree everywhere is also enough) is what <strong>Hierholzer's algorithm</strong> proves constructively: start at any vertex and walk, never reusing an edge, until stuck — because every vertex has even degree, "stuck" can only happen back at the starting vertex, since every other vertex has an equal number of in/out edge-uses and can't run out mid-visit. That gives one closed walk, possibly not covering every edge. If edges remain, some vertex v on the walk already found still has unused edges — splice in a second closed walk starting and ending at v, inserted right at that point in the first walk, and repeat until no edges are left unused.</p>
            <ul>
              <li><strong>Eulerian circuit</strong> — a closed walk using every edge once; exists iff connected and every vertex has even degree (undirected), or in-degree equals out-degree at every vertex (directed).</li>
              <li><strong>Eulerian path</strong> (not necessarily closed) — exists iff exactly two vertices have odd degree (undirected — the path starts at one and ends at the other), or exactly one vertex has out-degree exceeding in-degree by 1 and one has in-degree exceeding out-degree by 1, with all others balanced (directed).</li>
              <li><strong>De Bruijn graphs</strong> — in genome assembly, each possible k-mer is an edge and each (k−1)-mer is a vertex; reconstructing a genome from overlapping short reads becomes exactly the problem of finding an Eulerian path through this graph.</li>
            </ul>
            <p><strong>Remark:</strong> splicing in Hierholzer's algorithm is usually implemented as a single DFS-like pass that only outputs a vertex once all of its edges are exhausted, which naturally produces the final circuit in reverse without needing to explicitly locate and splice sub-walks by hand.</p>
            <p>This is a pleasant contrast to the superficially similar Hamiltonian path problem (visit every vertex exactly once), which is NP-complete with no known polynomial algorithm — visiting every edge is easy, visiting every vertex is hard, and there is no simple parity trick that resolves the vertex version.</p>
            <table class="mini-table">
              <tr><th></th><th>Visits</th><th>Existence test</th><th>Finding one</th></tr>
              <tr><td>Eulerian circuit</td><td>every edge once</td><td>O(V+E), degree parity check</td><td>O(E), Hierholzer's algorithm</td></tr>
              <tr><td>Hamiltonian circuit</td><td>every vertex once</td><td>NP-complete</td><td>no known polynomial algorithm</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> the old city of Königsberg had four land areas connected by seven bridges; the classic 1736 puzzle asks whether a walk exists that crosses every bridge exactly once. Model it as a graph and decide.</p>
            <details><summary>Solution</summary>
              <p>Each land area is a vertex, each bridge an edge; the seven bridges give this graph vertex degrees of 3, 3, 3, 5. Even one odd-degree vertex is one too many for an Eulerian circuit, and there are four odd-degree vertices here — far more than the two an open Eulerian path would tolerate. So no walk crossing every bridge exactly once exists, closed or open. This is precisely the argument Euler used to found graph theory in 1736, before "graph theory" as a field existed: he showed the answer follows from parity alone, without needing to try any actual routes.</p>
            </details>
            <p><strong>Remark:</strong> Hierholzer's algorithm is built on the same "explore, get stuck, backtrack" discipline as plain <a href="#/subject/algorithmics/graph-algorithms/algo-dfs">depth-first search</a> — the difference is what triggers backtracking (running out of unused edges at a vertex, rather than running out of unvisited vertices) and what the walk is required to cover.</p>
            <p><strong>Further reading:</strong> Euler, L., "Solutio problematis ad geometriam situs pertinentis," <em>Commentarii academiae scientiarum Petropolitanae</em>, 8, 1736 (the original Königsberg bridges paper, and the founding document of graph theory); Hierholzer, C., "Über die Möglichkeit, einen Linienzug ohne Wiederholung und ohne Unterbrechung zu umfahren," <em>Mathematische Annalen</em>, 6, 1873 (the constructive algorithm); Skiena, <em>The Algorithm Design Manual</em>, 3rd ed., §7.13.3 (Eulerian cycles, with the de Bruijn graph application).</p>
            <p><em>The whole idea in one line: even degree everywhere means you can never get stuck anywhere except back where you started.</em></p>
          `,
          exercises: [
            "Prove the directed-graph existence criterion for an Eulerian circuit: a connected directed graph (ignoring isolated vertices, and connected in the underlying-undirected sense) has an Eulerian circuit iff in-degree equals out-degree at every vertex. Then state and prove the corresponding criterion for an open Eulerian path.",
            "Given a set of DNA reads each of length k, describe how to build the de Bruijn graph (vertices = (k−1)-mers, edges = k-mers) and explain precisely why a valid genome reconstruction corresponds to an Eulerian path through it. Then explain, in one paragraph, why repeated k-mers in the genome (which create multi-edges or repeated structure in the graph) make the reconstruction ambiguous even when an Eulerian path exists."
          ]
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
          title: "All-Pairs Shortest Paths",
          section: "Shortest Paths (general)",
          prerequisites: ["algo-dynamic-programming", "algo-bellman-ford", "algo-dijkstra"],
          estMinutes: 35,
          content: `
            <p>All-pairs shortest paths computes the shortest distance between every pair of vertices at once — useful whenever a system needs to answer "what's the shortest route from X to Y" for many different X, Y pairs, cheaper than running a single-source algorithm from every vertex separately when the graph is dense.</p>
            <svg viewBox="0 0 300 160" width="100%" height="160" style="max-width:320px;display:block;margin:0.8rem auto;" role="img" aria-label="Vertices i, k, j with a direct edge i to j and a path through k, illustrating the relaxation d of i j equals the minimum of d i j and d i k plus d k j">
              <defs><marker id="apsparrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <line x1="55" y1="120" x2="245" y2="120" stroke="var(--text-muted)" stroke-width="1.5" marker-end="url(#apsparrow)"/>
              <line x1="55" y1="105" x2="145" y2="40" stroke="var(--accent)" stroke-width="2" marker-end="url(#apsparrow)"/>
              <line x1="155" y1="40" x2="245" y2="105" stroke="var(--accent)" stroke-width="2" marker-end="url(#apsparrow)"/>
              <circle cx="40" cy="120" r="18" fill="none" stroke="var(--text)" stroke-width="2"/>
              <circle cx="150" cy="30" r="18" fill="none" stroke="var(--text)" stroke-width="2"/>
              <circle cx="260" cy="120" r="18" fill="none" stroke="var(--text)" stroke-width="2"/>
              <text x="40" y="124" text-anchor="middle" fill="var(--text)" font-size="13">i</text>
              <text x="150" y="34" text-anchor="middle" fill="var(--text)" font-size="13">k</text>
              <text x="260" y="124" text-anchor="middle" fill="var(--text)" font-size="13">j</text>
              <text x="150" y="145" text-anchor="middle" fill="var(--text-muted)" font-size="11">d[i][j]</text>
              <text x="80" y="65" text-anchor="middle" fill="var(--accent)" font-size="11">d[i][k]</text>
              <text x="225" y="65" text-anchor="middle" fill="var(--accent)" font-size="11">d[k][j]</text>
            </svg>
            <p>The design is a dynamic program over an unusual dimension: not "path length so far," but which vertices are allowed as intermediate stops. Define d<sub>k</sub>[i][j] as the shortest path from i to j using only vertices {1, …, k} as intermediates (endpoints i, j excepted). d<sub>0</sub>[i][j] is just the direct edge weight (∞ if none). The recurrence considers exactly one new choice at each step — does the shortest path using {1,…,k} actually route through k or not: d<sub>k</sub>[i][j] = min(d<sub>k−1</sub>[i][j], d<sub>k−1</sub>[i][k] + d<sub>k−1</sub>[k][j]). After k reaches V, every vertex has been allowed as an intermediate, so d<sub>V</sub> is the true all-pairs shortest-distance matrix. Because d<sub>k</sub> only ever needs d<sub>k−1</sub>, the whole DP can be computed in place on a single V×V matrix — this is <strong>Floyd-Warshall</strong>, three nested loops and no priority queue at all.</p>
            <ul>
              <li><strong>Floyd-Warshall</strong> — the DP above; Θ(V³) time, handles negative edge weights directly (as long as there's no negative cycle), and is often the simplest correct choice on a dense graph.</li>
              <li><strong>Johnson's algorithm</strong> — add a virtual source connected to every vertex with weight 0, run one <a href="#/subject/algorithmics/graph-algorithms/algo-bellman-ford">Bellman-Ford</a> pass from it to get a potential h(v) for every vertex, reweight every edge to w'(u,v) = w(u,v) + h(u) − h(v) (always nonnegative, by the triangle inequality Bellman-Ford already enforces), then run <a href="#/subject/algorithmics/graph-algorithms/algo-dijkstra">Dijkstra</a> once from every vertex on the reweighted graph. Total O(V² log V + VE) — better than Floyd-Warshall whenever E is small relative to V².</li>
              <li><strong>Seidel's algorithm</strong> — for unweighted, undirected graphs specifically, a matrix-multiplication-based approach achieving O(V<sup>ω</sup> log V), where ω is the exponent of fast matrix multiplication — asymptotically the fastest known approach in that special case.</li>
            </ul>
            <p><strong>Remark:</strong> Floyd-Warshall detects a negative cycle for free — if any diagonal entry d[i][i] goes negative during the DP, the graph has a negative cycle through i, since the shortest "path" from a vertex back to itself should never be worth going below 0.</p>
            <table class="mini-table">
              <tr><th>Algorithm</th><th>Complexity</th><th>Best when</th></tr>
              <tr><td>Floyd-Warshall</td><td>Θ(V³)</td><td>dense graphs, or simplicity matters more than the constant</td></tr>
              <tr><td>Johnson's algorithm</td><td>O(V² log V + VE)</td><td>sparse graphs (E ≪ V²), possibly with negative edges</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> given a directed graph of flight routes with (possibly negative, e.g. promotional-credit) costs and no negative cycles, how would you precompute, once, the cheapest cost between every pair of airports so that any itinerary query can be answered in O(1) afterward?</p>
            <details><summary>Solution</summary>
              <p>Run Floyd-Warshall once: initialize d[i][j] to the direct flight cost between i and j (∞ if none, 0 for i=j), then for k = 1 to V, for every i, j, update d[i][j] = min(d[i][j], d[i][k] + d[k][j]). After the full Θ(V³) run, d[i][j] holds the cheapest cost between every pair, and any later query is a single array lookup. If instead most airports only connect to a handful of others (a sparse route graph), Johnson's algorithm would do the same job faster, at the cost of more moving parts (one Bellman-Ford pass plus V Dijkstra runs) — the right choice depends on how dense the actual route graph is.</p>
            </details>
            <p><strong>Remark:</strong> this lesson is a genuine capstone of the shortest-paths material — Floyd-Warshall is <a href="#/subject/algorithmics/algorithms/algo-dynamic-programming">dynamic programming</a> applied directly to graphs, and Johnson's algorithm is nothing more than <a href="#/subject/algorithmics/graph-algorithms/algo-bellman-ford">Bellman-Ford</a> and <a href="#/subject/algorithmics/graph-algorithms/algo-dijkstra">Dijkstra</a> composed, with the reweighting step existing purely to hand Dijkstra a graph it's allowed to run on.</p>
            <p><strong>Further reading:</strong> Floyd, R.W., "Algorithm 97: Shortest path," <em>Communications of the ACM</em>, 5(6), 1962; Warshall, S., "A theorem on boolean matrices," <em>Journal of the ACM</em>, 9(1), 1962 (the underlying transitive-closure idea Floyd's algorithm generalizes to weights); Johnson, D.B., "Efficient algorithms for shortest paths in sparse networks," <em>Journal of the ACM</em>, 24(1), 1977; CLRS, 3rd ed., Ch. 25 (all-pairs shortest paths, covering both algorithms with full proofs).</p>
            <p><em>The whole idea in one line: ask, one vertex at a time, "does routing through here ever help?" — and after asking about everyone, you have every answer.</em></p>
          `,
          exercises: [
            "Prove the Floyd-Warshall recurrence correct by induction on k: show d_k[i][j] as computed equals the true shortest-path distance from i to j using only vertices from {1,...,k} as intermediates, handling the negative-cycle case (state precisely what the algorithm computes when a negative cycle exists among the allowed intermediates).",
            "Derive Johnson's reweighting formula from scratch: given potentials h(v) satisfying h(v) ≤ h(u) + w(u,v) for every edge (why does one Bellman-Ford pass from a virtual zero-weight source guarantee this?), prove w'(u,v) = w(u,v) + h(u) − h(v) is always nonnegative and that shortest paths under w' correspond exactly to shortest paths under w, differing only by the additive constant h(source) − h(target)."
          ]
        },
        {
          id: "algo-seidel-apsp",
          title: "Seidel's Algorithm for APSP",
          section: "Shortest Paths (general)",
          prerequisites: ["algo-all-pairs-shortest-paths", "algo-matrix-multiplication"],
          estMinutes: 32,
          content: `
            <p>For unweighted, <em>undirected</em> graphs specifically, Floyd-Warshall's Θ(n³) is not the end of the story. Seidel's algorithm computes the full all-pairs distance matrix in O(n<sup>ω</sup> log n) time, where ω &lt; 2.373 is the exponent of fast matrix multiplication from the previous lesson — asymptotically faster than Θ(n³) for every known value of ω, at the cost of being restricted to this one special case (unweighted, undirected, no edge weights to preserve).</p>
            <p>The previous lesson's try-it-yourself already showed the trap: repeatedly Boolean-squaring A ∨ I tells you <em>whether</em> i can reach j within 2<sup>k</sup> steps, but not the actual distance — once a pair is marked reachable it stays marked at every larger power, so the exact hop count is thrown away by the OR. Naive repeated squaring alone genuinely cannot recover real distances; getting them back is Seidel's actual contribution, not just an application of fast Boolean matrix multiplication.</p>
            <p><strong>The recursive idea.</strong> Given adjacency matrix A of graph G, form A<sup>(2)</sup> = the Boolean square of A ∨ I (one fast matrix multiplication, as in the previous lesson) and read it as the adjacency matrix of a new graph G<sup>(2)</sup> on the <em>same</em> n vertices, with an edge i–j exactly when i and j are within distance 2 in G. Recursively compute G<sup>(2)</sup>'s own distance matrix T. Because every distance-2 step in G becomes one step in G<sup>(2)</sup>, T is related to G's true distance matrix D by:</p>
            <p style="text-align:center"><code>T[i][j] = ⌈ D[i][j] / 2 ⌉</code></p>
            <p>so T already pins D down to one of two candidates, D[i][j] = 2·T[i][j] or D[i][j] = 2·T[i][j] − 1 — the recursion halves the problem, but leaves one bit of parity per entry undetermined. Recovering that bit without re-deriving D from scratch is the whole trick.</p>
            <svg viewBox="0 0 340 150" width="100%" height="150" style="max-width:360px;display:block;margin:0.8rem auto;" role="img" aria-label="Path graph 1-2-3-4 on the left with only consecutive edges, and the same four vertices on the right with edges 1-2, 1-3, 2-3, 2-4, 3-4 — every pair except 1 and 4 now directly connected, since squaring merges any two vertices within distance 2">
              <text x="80" y="16" text-anchor="middle" fill="var(--text-muted)" font-size="11">G (path)</text>
              <line x1="30" y1="70" x2="80" y2="70" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="80" y1="70" x2="130" y2="70" stroke="var(--border)" stroke-width="1.5"/>
              <line x1="130" y1="70" x2="180" y2="70" stroke="var(--border)" stroke-width="1.5"/>
              <circle cx="30" cy="70" r="14" fill="none" stroke="var(--text)" stroke-width="2"/>
              <circle cx="80" cy="70" r="14" fill="none" stroke="var(--text)" stroke-width="2"/>
              <circle cx="130" cy="70" r="14" fill="none" stroke="var(--text)" stroke-width="2"/>
              <circle cx="180" cy="70" r="14" fill="none" stroke="var(--text)" stroke-width="2"/>
              <text x="30" y="74" text-anchor="middle" fill="var(--text)" font-size="11">1</text>
              <text x="80" y="74" text-anchor="middle" fill="var(--text)" font-size="11">2</text>
              <text x="130" y="74" text-anchor="middle" fill="var(--text)" font-size="11">3</text>
              <text x="180" y="74" text-anchor="middle" fill="var(--text)" font-size="11">4</text>
              <text x="260" y="16" text-anchor="middle" fill="var(--text-muted)" font-size="11">G⁽²⁾ (squared)</text>
              <path d="M210,55 Q235,15 260,55" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
              <line x1="210" y1="70" x2="260" y2="70" stroke="var(--accent)" stroke-width="1.5"/>
              <line x1="260" y1="70" x2="310" y2="70" stroke="var(--accent)" stroke-width="1.5"/>
              <path d="M260,55 Q285,15 310,55" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
              <line x1="210" y1="80" x2="310" y2="130" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3"/>
              <circle cx="210" cy="70" r="14" fill="none" stroke="var(--text)" stroke-width="2"/>
              <circle cx="260" cy="70" r="14" fill="none" stroke="var(--text)" stroke-width="2"/>
              <circle cx="310" cy="70" r="14" fill="none" stroke="var(--text)" stroke-width="2"/>
              <circle cx="310" cy="130" r="14" fill="none" stroke="var(--text)" stroke-width="2"/>
              <text x="210" y="74" text-anchor="middle" fill="var(--text)" font-size="11">1</text>
              <text x="260" y="74" text-anchor="middle" fill="var(--text)" font-size="11">2</text>
              <text x="310" y="74" text-anchor="middle" fill="var(--text)" font-size="11">3</text>
              <text x="310" y="134" text-anchor="middle" fill="var(--text)" font-size="11">4</text>
              <text x="255" y="145" text-anchor="middle" fill="var(--text-muted)" font-size="10">only 1–4 stays non-adjacent</text>
            </svg>
            <p><strong>Recovering the parity.</strong> For a fixed source i, every neighbor k of j in G satisfies T[i][k] ≥ T[i][j] − 1 (removing the last hop into j can only shorten the G<sup>(2)</sup>-distance by at most 1). D[i][j] is even exactly when <em>some</em> neighbor k of j already achieves the better value T[i][k] = T[i][j] — a "handoff" vertex one real step closer that lets the path close evenly — and odd when every neighbor of j is stuck at T[i][j] − 1. Testing that with one more fast matrix multiplication: let X = T · A (ordinary integer matrix product, deg(j) = the j-th column sum of A). Since every neighbor k contributes T[i][k] ≥ T[i][j] − 1 to the sum X[i][j] = Σ<sub>k</sub> T[i][k]·A[k][j], the sum is at least deg(j)·(T[i][j] − 1) always, and strictly larger exactly when at least one neighbor achieves T[i][k] = T[i][j] instead of T[i][j] − 1. So:</p>
            <p style="text-align:center"><code>D[i][j] = 2·T[i][j]</code> if X[i][j] ≥ T[i][j]·deg(j), else <code>D[i][j] = 2·T[i][j] − 1</code></p>
            <p>Two fast matrix multiplications per recursion level (one Boolean square to build G<sup>(2)</sup>, one integer product to test parity), recursing on a graph whose diameter has roughly halved. The recursion bottoms out once the graph becomes complete (diameter 1), where the distance matrix is just A itself. Since a graph's diameter is at most n − 1, halving it repeatedly reaches 1 within O(log n) levels regardless of the actual starting diameter, so the total cost is O(M(n) log n) = O(n<sup>ω</sup> log n) — better than Floyd-Warshall's Θ(n³) for any known ω, and the whole reason Boolean matrix multiplication earned its own lesson.</p>
            <table class="mini-table">
              <tr><th>i, j</th><th>D[i][j] (true)</th><th>T[i][j] = ⌈D/2⌉</th><th>X[i][j] = ΣT[i][k]A[k][j]</th><th>T[i][j]·deg(j)</th><th>test result</th></tr>
              <tr><td>1, 3</td><td>2 (even)</td><td>1</td><td>T[1][2]·1 + T[1][4]·1 = 1+2 = 3</td><td>1·2 = 2</td><td>3 ≥ 2 → D = 2·1 = 2 ✓</td></tr>
              <tr><td>1, 4</td><td>3 (odd)</td><td>2</td><td>T[1][3]·1 = 1</td><td>2·1 = 2</td><td>1 &lt; 2 → D = 2·2−1 = 3 ✓</td></tr>
            </table>
            <p>(Using deg(3) = 2, deg(4) = 1 in the path graph 1–2–3–4, and T read off the G<sup>(2)</sup> distances shown in the diagram above: T[1][2] = T[1][3] = 1, T[1][4] = 2.)</p>
            <p><strong>Try it yourself:</strong> the table above works out the correction for (i,j) = (1,3) — the even case, where a handoff vertex exists. Redo the same computation for (i,j) = (1,4) by hand from the raw definitions (don't just read the second table row), confirming X[1][4] = 1 and that the test correctly falls into the odd branch.</p>
            <details><summary>Solution</summary>
              <p>T[1][4] = 2, the G<sup>(2)</sup>-distance from 1 to 4 (path 1–2–4 in G<sup>(2)</sup>, since 2–4 is an edge there). X[1][4] = Σ<sub>k</sub> T[1][k]·A[k][4], and A[k][4] = 1 only for k = 3 (the only real G-neighbor of vertex 4), so X[1][4] = T[1][3]·1 = 1·1 = 1. deg(4) = 1 (vertex 4's only real neighbor is 3), so the threshold T[1][4]·deg(4) = 2·1 = 2. Since 1 &lt; 2, the test falls into the odd branch: D[1][4] = 2·T[1][4] − 1 = 2·2 − 1 = 3 — which matches the true path distance 1→2→3→4.</p>
            </details>
            <p><strong>Remark:</strong> this lesson summarizes Seidel's algorithm at the level of "why the mechanism works," not a full re-derivation of the 1995 paper's proofs (in particular, the T[i][k] ≥ T[i][j] − 1 inequality used above deserves its own short triangle-inequality-style argument, left as an exercise). The honest scope here is understanding what problem naive squaring fails to solve and what specific extra computation Seidel's algorithm adds to solve it, not reproducing the original correctness proof line by line.</p>
            <p><strong>Further reading:</strong> Seidel, R., "On the All-Pairs-Shortest-Path Problem in Unweighted Undirected Graphs," <em>Journal of Computer and System Sciences</em>, 51(3), 1995 (the original algorithm and full correctness proof); CLRS, 3rd ed., Problem 25-2 (a guided version of the same construction); the previous lesson's <a href="#/subject/algorithmics/algorithms/algo-matrix-multiplication">Fast Matrix Multiplication</a> for the Boolean-squaring machinery this algorithm is built on.</p>
            <p><em>The whole idea in one line: squaring the graph halves every distance, and one extra matrix product recovers the bit that squaring alone threw away.</em></p>
          `,
          exercises: [
            "Prove T[i][k] ≥ T[i][j] − 1 for every G-neighbor k of j, where T is the G⁽²⁾-distance matrix: use the fact that a shortest i–j path in G⁽²⁾ composed with the single real edge (k,j) gives an i–k walk in G⁽²⁾ of length at most T[i][j] + 1 (justify why one real G-edge corresponds to at most one G⁽²⁾ step). Then use this to justify the threshold test X[i][j] ≥ T[i][j]·deg(j) precisely as stated in the lesson.",
            "Seidel's algorithm as presented requires the graph to be undirected and unweighted. Explain concretely which step breaks first if the graph is directed (consider what 'neighbor' and the parity handoff argument assume about edges being usable in both directions), and separately why assigning arbitrary positive integer weights defeats the recursion's halving structure entirely."
          ]
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
          title: "Maximum Flow",
          section: "Flow Networks",
          prerequisites: ["algo-bfs"],
          estMinutes: 35,
          content: `
            <p>Maximum flow finds the largest amount that can be pushed from a source to a sink through a network of capacity-limited pipes — and the same abstraction, once you see it, turns out to model bottleneck problems that have nothing to do with literal pipes at all, from scheduling to matching to image segmentation.</p>
            <svg viewBox="0 0 340 180" width="100%" height="180" style="max-width:360px;display:block;margin:0.8rem auto;" role="img" aria-label="Flow network with source s, sink t, and two intermediate vertices a and b, edges labeled with flow slash capacity">
              <defs><marker id="mfarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <line x1="55" y1="90" x2="150" y2="45" stroke="var(--accent)" stroke-width="2" marker-end="url(#mfarrow)"/>
              <line x1="55" y1="90" x2="150" y2="135" stroke="var(--accent)" stroke-width="2" marker-end="url(#mfarrow)"/>
              <line x1="190" y1="45" x2="285" y2="90" stroke="var(--accent)" stroke-width="2" marker-end="url(#mfarrow)"/>
              <line x1="190" y1="135" x2="285" y2="90" stroke="var(--accent)" stroke-width="2" marker-end="url(#mfarrow)"/>
              <circle cx="40" cy="90" r="18" fill="none" stroke="var(--text)" stroke-width="2"/>
              <circle cx="170" cy="45" r="18" fill="none" stroke="var(--text)" stroke-width="2"/>
              <circle cx="170" cy="135" r="18" fill="none" stroke="var(--text)" stroke-width="2"/>
              <circle cx="300" cy="90" r="18" fill="none" stroke="var(--text)" stroke-width="2"/>
              <text x="40" y="94" text-anchor="middle" fill="var(--text)" font-size="13">s</text>
              <text x="170" y="49" text-anchor="middle" fill="var(--text)" font-size="13">a</text>
              <text x="170" y="139" text-anchor="middle" fill="var(--text)" font-size="13">b</text>
              <text x="300" y="94" text-anchor="middle" fill="var(--text)" font-size="13">t</text>
              <text x="100" y="55" text-anchor="middle" fill="var(--text-muted)" font-size="11">3/3</text>
              <text x="100" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">2/4</text>
              <text x="240" y="55" text-anchor="middle" fill="var(--text-muted)" font-size="11">3/5</text>
              <text x="240" y="130" text-anchor="middle" fill="var(--text-muted)" font-size="11">2/2</text>
            </svg>
            <p>The design follows from a residual graph and a repeat-until-stuck loop. Every edge (u,v) with capacity c and current flow f leaves a <strong>residual capacity</strong> c−f forward and, critically, f backward — pushing flow along an edge always creates the option to later "undo" some of it. An <strong>augmenting path</strong> is any path from source to sink in this residual graph; pushing the bottleneck amount along it strictly increases the total flow. Ford-Fulkerson's generic method just repeats "find an augmenting path, push flow along it" until none remains. That it terminates with the true maximum is the content of the <strong>max-flow min-cut theorem</strong>: the maximum achievable flow value exactly equals the minimum capacity of any s-t cut (a partition of the vertices into a source side and a sink side) — when no augmenting path remains, the set of vertices still reachable from s in the residual graph <em>is</em> such a cut, every edge crossing it is fully saturated, and a flow can never exceed the capacity of any cut it must cross, so this saturated cut is both an upper bound and one that's been achieved.</p>
            <ul>
              <li><strong>Ford-Fulkerson (generic)</strong> — any rule for picking an augmenting path works for correctness, but a poor rule (e.g. DFS, picking small-capacity paths) can need as many augmentations as the capacity values themselves, which is only pseudo-polynomial.</li>
              <li><strong>Edmonds-Karp</strong> — always augment along a shortest augmenting path, found by <a href="#/subject/algorithmics/graph-algorithms/algo-bfs">BFS</a> on the residual graph. Bounds the number of augmentations at O(VE) regardless of capacities, for O(VE²) total — genuinely polynomial.</li>
              <li><strong>Dinic's algorithm</strong> — build "level graphs" via BFS and push a whole blocking flow through each level graph via DFS before rebuilding it; O(V²E) in general, O(E√V) on unit-capacity graphs, which is exactly the case bipartite matching reduces to.</li>
            </ul>
            <p><strong>Remark:</strong> with irrational edge capacities, the naive generic method isn't merely slow — it can fail to converge to the max flow at all, which is precisely why a concrete augmenting-path rule like Edmonds-Karp's, not just "any augmenting path," is needed for a real correctness-and-termination guarantee.</p>
            <table class="mini-table">
              <tr><th>Algorithm</th><th>Complexity</th><th>Note</th></tr>
              <tr><td>Ford-Fulkerson (generic)</td><td>O(E · f*)</td><td>f* = max flow value; pseudo-polynomial, capacity-dependent</td></tr>
              <tr><td>Edmonds-Karp</td><td>O(VE²)</td><td>shortest augmenting path via BFS; polynomial, capacity-independent</td></tr>
              <tr><td>Dinic's</td><td>O(V²E)</td><td>blocking flows on level graphs; O(E√V) on unit capacities</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> a company has several pipelines from a refinery to a distribution hub, each with a fixed maximum daily throughput, possibly passing through shared intermediate junctions with their own capacity limits. How would you find the maximum total daily throughput from refinery to hub?</p>
            <details><summary>Solution</summary>
              <p>Model junctions and endpoints as vertices and pipeline segments as directed edges labeled with their capacity; the refinery is the source, the hub is the sink. If a junction itself has a throughput limit (not just its pipes), split that vertex into an "in" copy and an "out" copy joined by one internal edge carrying the junction's capacity, with all incoming pipes routed to "in" and all outgoing pipes from "out" — a standard trick for putting a capacity on a vertex rather than an edge. Run Edmonds-Karp (or any correct max-flow algorithm) from source to sink; the resulting flow value is the maximum sustainable daily throughput, and the min cut identifies exactly which pipeline segments or junctions form the true bottleneck.</p>
            </details>
            <p><strong>Remark:</strong> the min-cut side of the theorem is not just a proof device — reading off which edges form the saturated cut is often the actually useful output, since it names the bottleneck precisely, and it's the same certificate-of-optimality style as the <a href="#/subject/algorithmics/graph-algorithms/algo-mst-cut-property">MST cut property</a>. The next lesson, <a href="#/subject/algorithmics/graph-algorithms/algo-bipartite-matching">bipartite matching</a>, is a direct reduction to this exact machinery.</p>
            <p><strong>Further reading:</strong> Ford, L.R., Fulkerson, D.R., "Maximal flow through a network," <em>Canadian Journal of Mathematics</em>, 8, 1956 (the original paper, including the max-flow min-cut theorem); Edmonds, J., Karp, R.M., "Theoretical improvements in algorithmic efficiency for network flow problems," <em>Journal of the ACM</em>, 19(2), 1972; Dinic, E.A., "Algorithm for solution of a problem of maximum flow in a network with power estimation," <em>Soviet Mathematics Doklady</em>, 11, 1970; CLRS, 3rd ed., Ch. 26 (flow networks, Ford-Fulkerson, Edmonds-Karp, and the max-flow min-cut theorem's proof).</p>
            <p><em>The whole idea in one line: keep finding a way to push more through, and when you truly can't, you've also found the exact bottleneck that stopped you.</em></p>
          `,
          exercises: [
            "Prove the max-flow min-cut theorem: show that (a) the value of any flow is at most the capacity of any s-t cut, and (b) when no augmenting path exists in the residual graph, the set of residually-reachable vertices from s forms a cut whose capacity exactly equals the current flow's value.",
            "Prove that Edmonds-Karp performs at most O(VE) augmentations, using the fact that the BFS distance from s to t in the residual graph never decreases across augmentations, and that each edge can be the 'bottleneck' edge of a shortest augmenting path at most O(V) times."
          ]
        },
        {
          id: "algo-bipartite-matching",
          title: "Bipartite Matching via Maximum Flow",
          section: "Flow Networks",
          prerequisites: ["algo-max-flow-ford-fulkerson"],
          estMinutes: 25,
          content: `
            <p>Bipartite matching finds the largest possible set of pairings between two groups — job applicants to jobs, students to project slots, kidneys to recipients — such that every element on each side is used at most once, and it turns out to be exactly a maximum flow problem wearing a different name.</p>
            <svg viewBox="0 0 360 190" width="100%" height="190" style="max-width:380px;display:block;margin:0.8rem auto;" role="img" aria-label="Source connected to three left vertices, each connected to compatible right vertices, all connected to a sink, all edges capacity one">
              <defs><marker id="bmarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <circle cx="30" cy="95" r="16" fill="none" stroke="var(--text)" stroke-width="2"/>
              <text x="30" y="99" text-anchor="middle" fill="var(--text)" font-size="12">s</text>
              <circle cx="130" cy="40" r="15" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="130" cy="95" r="15" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="130" cy="150" r="15" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="130" y="44" text-anchor="middle" fill="var(--text)" font-size="12">L1</text>
              <text x="130" y="99" text-anchor="middle" fill="var(--text)" font-size="12">L2</text>
              <text x="130" y="154" text-anchor="middle" fill="var(--text)" font-size="12">L3</text>
              <circle cx="230" cy="40" r="15" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="230" cy="95" r="15" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="230" cy="150" r="15" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <text x="230" y="44" text-anchor="middle" fill="var(--text)" font-size="12">R1</text>
              <text x="230" y="99" text-anchor="middle" fill="var(--text)" font-size="12">R2</text>
              <text x="230" y="154" text-anchor="middle" fill="var(--text)" font-size="12">R3</text>
              <circle cx="330" cy="95" r="16" fill="none" stroke="var(--text)" stroke-width="2"/>
              <text x="330" y="99" text-anchor="middle" fill="var(--text)" font-size="12">t</text>
              <line x1="45" y1="90" x2="116" y2="50" stroke="var(--border)" stroke-width="1.5" marker-end="url(#bmarrow)"/>
              <line x1="45" y1="95" x2="115" y2="95" stroke="var(--border)" stroke-width="1.5" marker-end="url(#bmarrow)"/>
              <line x1="45" y1="100" x2="116" y2="140" stroke="var(--border)" stroke-width="1.5" marker-end="url(#bmarrow)"/>
              <line x1="140" y1="45" x2="220" y2="90" stroke="var(--border)" stroke-width="1.5" marker-end="url(#bmarrow)"/>
              <line x1="145" y1="95" x2="215" y2="95" stroke="var(--border)" stroke-width="1.5" marker-end="url(#bmarrow)"/>
              <line x1="140" y1="150" x2="220" y2="100" stroke="var(--border)" stroke-width="1.5" marker-end="url(#bmarrow)"/>
              <line x1="245" y1="50" x2="315" y2="90" stroke="var(--border)" stroke-width="1.5" marker-end="url(#bmarrow)"/>
              <line x1="245" y1="95" x2="315" y2="95" stroke="var(--border)" stroke-width="1.5" marker-end="url(#bmarrow)"/>
              <line x1="245" y1="140" x2="315" y2="100" stroke="var(--border)" stroke-width="1.5" marker-end="url(#bmarrow)"/>
            </svg>
            <p>The design is a direct reduction to <a href="#/subject/algorithmics/graph-algorithms/algo-max-flow-ford-fulkerson">maximum flow</a>: given a bipartite graph with parts L and R, build a flow network by adding a new source s connected to every vertex in L, a new sink t connected from every vertex in R, and directing every original edge from L to R — every edge in the whole network, old and new, gets capacity 1. Because all capacities are integers, the <strong>integrality theorem</strong> guarantees a maximum flow exists that is itself integer-valued on every edge, and with capacity 1 everywhere that means every edge carries either 0 or 1 unit of flow. A unit of flow along s→u→v→t, for edge (u,v) with u∈L, v∈R, is exactly a matched pair; the capacity-1 constraints at s and t enforce that no vertex is used twice. The maximum flow's value is therefore exactly the size of a maximum matching.</p>
            <p>The same construction hands you <strong>König's theorem</strong> for free: in a bipartite graph, the size of a maximum matching equals the size of a minimum vertex cover (a smallest set of vertices touching every edge). This falls straight out of the max-flow min-cut theorem applied to this exact network — the minimum s-t cut in the flow network corresponds precisely to a minimum vertex cover in the original bipartite graph.</p>
            <ul>
              <li><strong>Generic max-flow reduction</strong> — the construction above, solved with any max-flow algorithm (Edmonds-Karp: O(VE) here, since every augmenting path has length exactly 3 in the unit-capacity network).</li>
              <li><strong>Hopcroft-Karp</strong> — a specialized algorithm that finds a whole batch of shortest, vertex-disjoint augmenting paths per phase instead of one at a time, achieving O(E√V) — faster than generic Edmonds-Karp on this specific unit-capacity structure.</li>
              <li><strong>Hungarian algorithm</strong> — solves the weighted version (the assignment problem: maximize total match quality, not just match count), using a different, dual-based approach rather than max flow directly.</li>
            </ul>
            <p><strong>Remark:</strong> because every capacity in this network is 1, the general O(VE²) bound for Edmonds-Karp is loose here — the augmenting-path-length argument alone already gives O(VE), and Hopcroft-Karp improves further by batching augmentations.</p>
            <table class="mini-table">
              <tr><th>Approach</th><th>Complexity</th><th>Note</th></tr>
              <tr><td>Max flow (Edmonds-Karp) on the reduction</td><td>O(VE)</td><td>every augmenting path has length 3, tightening the general bound</td></tr>
              <tr><td>Hopcroft-Karp</td><td>O(E√V)</td><td>specialized: batches vertex-disjoint shortest augmenting paths per phase</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> n job applicants each list which of m open positions they're qualified for. How would you find the maximum number of applicants who can be simultaneously placed into distinct positions they're qualified for?</p>
            <details><summary>Solution</summary>
              <p>Build a bipartite graph with applicants on one side, positions on the other, and an edge wherever an applicant is qualified for a position. Add a source connected to every applicant and a sink connected from every position, all capacities 1, and run any max-flow algorithm. The maximum flow value is the maximum number of applicants that can be placed; the specific edges carrying flow give the actual assignment. This is precisely the bipartite matching reduction — "who can be paired with whom, at most once each" is the defining shape of the problem.</p>
            </details>
            <p><strong>Remark:</strong> that this genuinely combinatorial assignment problem reduces exactly to a network-flow computation is the payoff for having built the max-flow machinery in the previous lesson — real assignment and scheduling software very often is, underneath, calling a max-flow or matching solver rather than anything resembling search or backtracking.</p>
            <p><strong>Further reading:</strong> Hopcroft, J.E., Karp, R.M., "An n^{5/2} algorithm for maximum matchings in bipartite graphs," <em>SIAM Journal on Computing</em>, 2(4), 1973 (the specialized algorithm); Kőnig, D., "Gráfok és mátrixok," <em>Matematikai és Fizikai Lapok</em>, 38, 1931 (the original theorem relating matching and vertex cover); CLRS, 3rd ed., §26.3 (maximum bipartite matching via the max-flow reduction, including the integrality argument).</p>
            <p><em>The whole idea in one line: pairing things up at most once each is just unit-capacity flow from a source through both sides to a sink.</em></p>
          `,
          exercises: [
            "Prove the integrality theorem for this specific construction: show that if all capacities are integers, some maximum flow assigns an integer value to every edge, and explain why this guarantees the max-flow value equals the maximum matching size exactly (not just an upper bound).",
            "State König's theorem precisely and prove it using the max-flow min-cut theorem applied to the source/sink construction above: show that a minimum s-t cut in the flow network corresponds to a minimum vertex cover in the original bipartite graph, and that their sizes are equal."
          ]
        }
      ]
    },
    {
      id: "computational-geometry",
      name: "Computational Geometry",
      lessons: [
        {
          id: "algo-convex-hull",
          title: "Convex Hull",
          section: "Computational Geometry",
          prerequisites: ["algo-sorting-lower-bound-mergesort"],
          estMinutes: 28,
          content: `
            <p>The convex hull of a set of points is the smallest convex polygon containing all of them — think of stretching a rubber band around a scatter of pins and letting it snap taut. It's the geometric primitive underneath collision detection, shape simplification, and (as this course's own <a href="#/subject/algorithmics/algorithms/algo-divide-and-conquer">closest-pair lesson</a> shows for a different problem) a recurring test case for divide-and-conquer geometric algorithms generally.</p>
            <svg viewBox="0 0 300 220" width="100%" height="220" style="max-width:320px;display:block;margin:0.8rem auto;" role="img" aria-label="A scatter of points with the convex hull traced as a polygon around the outermost points, and three interior points left unconnected inside it">
              <polygon points="50,190 140,205 230,180 260,90 190,40 100,55" fill="none" stroke="var(--accent)" stroke-width="2"/>
              <circle cx="50" cy="190" r="5" fill="var(--accent)"/>
              <circle cx="140" cy="205" r="5" fill="var(--accent)"/>
              <circle cx="230" cy="180" r="5" fill="var(--accent)"/>
              <circle cx="260" cy="90" r="5" fill="var(--accent)"/>
              <circle cx="190" cy="40" r="5" fill="var(--accent)"/>
              <circle cx="100" cy="55" r="5" fill="var(--accent)"/>
              <circle cx="150" cy="110" r="4" fill="var(--text-muted)"/>
              <circle cx="170" cy="140" r="4" fill="var(--text-muted)"/>
              <circle cx="130" cy="150" r="4" fill="var(--text-muted)"/>
              <text x="140" y="220" text-anchor="middle" fill="var(--text-muted)" font-size="10">p₀ (pivot: bottommost point)</text>
            </svg>
            <p><strong>Graham scan.</strong> Pick the pivot p₀ = the point with the smallest y-coordinate (breaking ties by smallest x) — it's guaranteed to be a hull vertex, since nothing can be "below" it. Sort every other point by polar angle around p₀ (this is the O(n log n) that dominates the algorithm's cost). Then walk the sorted points, maintaining a stack: before pushing the next point, check whether the last three points on the stack (the two on top, plus the candidate) make a left turn (counterclockwise) or a right turn (clockwise). A right turn means the point currently on top of the stack is not actually a hull vertex — it pokes inward relative to where the scan is heading next — so pop it and re-check, repeating until a left turn holds or only one point remains. Then push.</p>
            <svg viewBox="0 0 300 130" width="100%" height="130" style="max-width:320px;display:block;margin:0.8rem auto;" role="img" aria-label="Two vectors p to q and q to r making a counterclockwise left turn, with the cross product of the two vectors positive, labeled as the orientation test">
              <defs><marker id="chullarrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>
              <line x1="40" y1="110" x2="140" y2="110" stroke="var(--accent)" stroke-width="2" marker-end="url(#chullarrow)"/>
              <line x1="140" y1="110" x2="100" y2="30" stroke="var(--accent)" stroke-width="2" marker-end="url(#chullarrow)"/>
              <circle cx="40" cy="110" r="4" fill="var(--text)"/>
              <circle cx="140" cy="110" r="4" fill="var(--text)"/>
              <circle cx="100" cy="30" r="4" fill="var(--text)"/>
              <text x="40" y="125" text-anchor="middle" fill="var(--text)" font-size="11">p</text>
              <text x="140" y="125" text-anchor="middle" fill="var(--text)" font-size="11">q</text>
              <text x="100" y="20" text-anchor="middle" fill="var(--text)" font-size="11">r</text>
              <text x="220" y="70" text-anchor="middle" fill="var(--text-muted)" font-size="11">cross((q−p),(r−q)) &gt; 0 → left turn (CCW)</text>
            </svg>
            <p>The turn test itself is one 2D cross product: for vectors (q−p) and (r−q), the sign of (q.x−p.x)(r.y−q.y) − (q.y−p.y)(r.x−q.x) tells you the turn direction — positive is a left turn, negative a right turn, zero means the three points are collinear (handled by a tie-breaking convention, e.g. keep only the farthest of several collinear points). No trigonometry needed anywhere in the scan itself, only in the initial angle sort (and even that sort is usually done by comparing cross products directly, rather than computing actual angles).</p>
            <p><strong>Why it's correct.</strong> The stack invariant is: at every point during the scan, the stack holds exactly the hull vertices of the points processed <em>so far</em>, in counterclockwise order. Adding the next point (sorted by angle, so it's always "further around" than everything already processed) can only ever violate convexity at the most recent turn — never further back — because every earlier turn was already verified convex against the state at the time. So a single pop-while-right-turn loop, checking only the top of the stack, suffices; there's never a need to look deeper. Each point is pushed exactly once and popped at most once, so the scan itself (excluding the initial sort) is O(n) amortized.</p>
            <table class="mini-table">
              <tr><th>Step</th><th>Cost</th><th>Why</th></tr>
              <tr><td>Find pivot p₀</td><td>O(n)</td><td>one linear scan for smallest y (ties: smallest x)</td></tr>
              <tr><td>Sort by polar angle around p₀</td><td>O(n log n)</td><td>dominates total cost</td></tr>
              <tr><td>Scan with push/pop</td><td>O(n) amortized</td><td>each point pushed once, popped at most once</td></tr>
              <tr><td>Total</td><td>O(n log n)</td><td>the sort is the bottleneck</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> for p = (0,0), q = (4,0), r = (4,3), compute the orientation test by hand and state whether p→q→r is a left turn, a right turn, or collinear.</p>
            <details><summary>Solution</summary>
              <p>(q−p) = (4,0), (r−q) = (0,3). Cross product = (4)(3) − (0)(0) = 12 − 0 = 12 &gt; 0, so it's a left turn (counterclockwise) — matching the visual: from p, go right to q, then turn upward to r, which is indeed a leftward bend. If instead r had been (4,−3), the cross product would flip sign to −12, a right turn; if r had been (8,0) (collinear with p and q on the x-axis), the cross product would be exactly 0.</p>
            </details>
            <p><strong>Remark:</strong> Graham scan is a cousin, algorithmically, of <a href="#/subject/algorithmics/algorithms/algo-divide-and-conquer">closest pair</a>'s divide-and-conquer strip trick — both are geometric problems where the right preprocessing sort (by angle here, by x then y there) turns an apparently quadratic problem into an O(n log n) one, with the geometry doing the work of ruling out most candidate comparisons before they're ever made. A divide-and-conquer hull algorithm exists too (split by x-coordinate, recursively hull each half, then merge with upper/lower tangent lines), with the same O(n log n) total cost by the master theorem — Graham scan is simply the more common one to implement.</p>
            <p><strong>Further reading:</strong> Graham, R.L., "An efficient algorithm for determining the convex hull of a finite planar set," <em>Information Processing Letters</em>, 1(4), 1972; de Berg, van Kreveld, Overmars, Schwarzkopf, <em>Computational Geometry: Algorithms and Applications</em>, 3rd ed., Ch. 1 (convex hulls, including the divide-and-conquer variant); CLRS, 3rd ed., §33.3 (Graham's scan, with the stack-invariant proof).</p>
            <p><em>The whole idea in one line: sort by angle around a guaranteed hull vertex, then throw away any point that makes the walk bend the wrong way.</em></p>
          `,
          exercises: [
            "Prove the stack invariant precisely by induction on the number of points processed: after processing the first k points (in angular order), the stack contains exactly the convex hull vertices of {p₀, ..., p_k}, in counterclockwise order. Use this to conclude the final stack (after all n points) is the convex hull of the whole set.",
            "Describe exactly how to handle points collinear with the pivot during the angle sort (several points at the exact same polar angle from p₀): which of them can safely be discarded before the scan even starts, and why keeping the wrong one could make the scan produce an incorrect hull. Then describe the analogous collinear case that can arise mid-scan (three consecutive stack points with cross product exactly 0) and how your tie-breaking convention should treat it."
          ]
        },
        {
          id: "algo-segment-intersection",
          title: "Line Segment Intersection",
          section: "Computational Geometry",
          prerequisites: ["algo-convex-hull", "algo-binary-heaps"],
          estMinutes: 30,
          content: `
            <p>Given n line segments in the plane, report every pair that intersects. Checking all C(n,2) pairs directly costs O(n²) regardless of how few intersections actually exist; the sweep-line technique (the Bentley-Ottmann algorithm) gets this down to O((n+k) log n), where k is the actual number of intersection points found — genuinely output-sensitive, cheap when the segments barely cross and only as expensive as it has to be when they cross a lot.</p>
            <p><strong>The sweep.</strong> Imagine a vertical line sweeping left to right across the plane, stopping at a sequence of <strong>events</strong>. Two data structures drive it: an <strong>event queue</strong>, a priority queue (see <a href="#/subject/algorithmics/data-structures/algo-binary-heaps">binary heaps</a>) ordered by x-coordinate, holding upcoming segment endpoints and — discovered as the sweep proceeds — intersection points; and a <strong>status structure</strong>, a balanced BST ordered by each active segment's current y-coordinate at the sweep line's x-position, holding exactly the segments the sweep line currently crosses.</p>
            <svg viewBox="0 0 300 210" width="100%" height="210" style="max-width:320px;display:block;margin:0.8rem auto;" role="img" aria-label="Three segments crossed by a vertical sweep line: a rising diagonal, a falling diagonal, and a horizontal segment, with the status order at the sweep line labeled top to bottom as segment 1, segment 3, segment 2">
              <line x1="30" y1="60" x2="270" y2="190" stroke="var(--accent)" stroke-width="2"/>
              <line x1="30" y1="190" x2="270" y2="60" stroke="var(--accent)" stroke-width="2"/>
              <line x1="30" y1="120" x2="270" y2="120" stroke="var(--accent)" stroke-width="2"/>
              <line x1="110" y1="15" x2="110" y2="205" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="4,3"/>
              <text x="110" y="10" text-anchor="middle" fill="var(--text-muted)" font-size="10">sweep line</text>
              <circle cx="110" cy="105" r="4" fill="var(--text)"/>
              <circle cx="110" cy="120" r="4" fill="var(--text)"/>
              <circle cx="110" cy="135" r="4" fill="var(--text)"/>
              <text x="20" y="55" fill="var(--text-muted)" font-size="10">seg 1</text>
              <text x="20" y="200" fill="var(--text-muted)" font-size="10">seg 2</text>
              <text x="20" y="115" fill="var(--text-muted)" font-size="10">seg 3</text>
              <text x="130" y="103" fill="var(--text)" font-size="11">1</text>
              <text x="130" y="138" fill="var(--text)" font-size="11">3</text>
              <text x="130" y="150" fill="var(--text)" font-size="11">2</text>
              <text x="150" y="30" text-anchor="middle" fill="var(--text-muted)" font-size="10">status order top→bottom: seg 1, seg 3, seg 2</text>
            </svg>
            <p>Three kinds of events, each handled in O(log n):</p>
            <ul>
              <li><strong>Left endpoint</strong> of a segment — insert it into the status structure; test it against its new immediate neighbors above and below for intersection, and if found, schedule that intersection as a future event (if not already scheduled).</li>
              <li><strong>Right endpoint</strong> — remove the segment from the status structure; its former neighbors above and below become newly adjacent to each other, so test <em>that</em> pair for intersection.</li>
              <li><strong>Intersection point</strong> — the two crossing segments swap order in the status structure (the one that was above is now below, and vice versa); each swapped segment has a new neighbor on the far side, so test those two new adjacent pairs.</li>
            </ul>
            <p><strong>Why only adjacent pairs need checking.</strong> Two segments can only possibly intersect while they are adjacent in the status order at some x — if segment A is always separated from segment C by segment B (never directly next to it) between A and C's shared x-range, then A and C can't cross without B being caught in between, which the geometry of non-crossing separation rules out. So it is always safe to test only newly-adjacent pairs at each event, and every actual intersection is guaranteed to be discovered exactly at the moment its two segments first become neighbors.</p>
            <table class="mini-table">
              <tr><th>Approach</th><th>Complexity</th><th>Note</th></tr>
              <tr><td>Brute force, all pairs</td><td>O(n²)</td><td>ignores how many intersections actually exist</td></tr>
              <tr><td>Sweep line (Bentley-Ottmann)</td><td>O((n+k) log n)</td><td>output-sensitive; k = actual intersection count</td></tr>
            </table>
            <p><strong>Try it yourself:</strong> using the three segments in the diagram above (seg 1 rising left-to-right, seg 2 falling left-to-right, seg 3 horizontal through the middle, all spanning the same x-range), which pairs does the sweep test for intersection at the moment the sweep line first reaches their shared left endpoints (x = 30), before any intersection has yet been found?</p>
            <details><summary>Solution</summary>
              <p>At x = 30 all three segments start together, so all three left-endpoint events fire at (conceptually) the same x — processed in some fixed tie-breaking order, but the status order right after all three insertions is by their y-coordinate an instant later: seg 1 (rising, starts near the top) is adjacent to seg 3 (horizontal, middle), and seg 3 is adjacent to seg 2 (falling, starts near the bottom). So the sweep tests (seg 1, seg 3) and (seg 3, seg 2) — but not (seg 1, seg 2) directly, since they aren't yet adjacent (seg 3 separates them). Only once seg 3's crossings with seg 1 and seg 2 occur, and the order shuffles, do seg 1 and seg 2 ever become adjacent and get tested against each other.</p>
            </details>
            <p><strong>Remark:</strong> like <a href="#/subject/algorithmics/computational-geometry/algo-convex-hull">convex hull</a>, this is a problem where the obvious approach is quadratic and a smarter order of processing — sweeping through events by x rather than checking all pairs blindly — turns geometric structure directly into an asymptotic win; both lessons are entries in the same computational-geometry toolkit as the <a href="#/subject/algorithmics/algorithms/algo-divide-and-conquer">closest-pair</a> technique covered earlier in the course.</p>
            <p><strong>Further reading:</strong> Bentley, J.L., Ottmann, T.A., "Algorithms for reporting and counting geometric intersections," <em>IEEE Transactions on Computers</em>, C-28(9), 1979 (the original algorithm); de Berg, van Kreveld, Overmars, Schwarzkopf, <em>Computational Geometry: Algorithms and Applications</em>, 3rd ed., Ch. 2 (line segment intersection, with the full event-handling case analysis).</p>
            <p><em>The whole idea in one line: two segments can't cross without first becoming neighbors, so only ever test the neighbors.</em></p>
          `,
          exercises: [
            "Prove the adjacency lemma stated in the lesson: if two segments A and C intersect at some point, then immediately before that x-coordinate, A and C are adjacent in the status order (no third active segment's y-value lies strictly between theirs at that x). Argue by contradiction using the intermediate segment's own non-crossing behavior against A and C in the interval just before the crossing.",
            "Describe precisely how the algorithm must be adapted to correctly handle two degenerate cases: (a) a vertical segment (undefined slope, so its 'current y at the sweep line' isn't a single interpolated value in the usual sense), and (b) three or more segments that all cross at exactly the same point (so multiple 'new adjacent pairs' become the same single event). For each, state what breaks in the algorithm as described and how you'd fix it."
          ]
        }
      ]
    }
  ]
};
