// Physics content.
//
// Shape: const PHYSICS_SUBJECT = { id, name, color, chapters: [ { id, name, lessons: [...] } ] }
// Chapters are just a display grouping (shown as sections on the subject page) — they have
// NO effect on lesson order or unlocking. That's what `prerequisites` is for (see below).
//
// Each lesson:
//   id            string, must start with "phys-", globally unique across the whole site
//   title         string
//   section       string, freeform — sub-heading shown within its chapter on the subject page.
//                 Purely cosmetic grouping; no registry, just reuse an existing string in the
//                 same chapter if you want a lesson to appear under an existing sub-heading.
//   prerequisites array of other lessons' `id`s (any subject/chapter, not just this one) that
//                 must be marked complete before this lesson shows as "available" instead of
//                 locked. [] means it's an entry point. Get this wrong (typo an id, or create a
//                 cycle) and the site won't error — open devtools console after editing and look
//                 for "[DAG check]" warnings (app.js runs this automatically on every page load).
//   estMinutes    number, rough self-study time shown as a badge. Optional — omit to show no badge.
//   content       HTML string (template literal). Rendered as raw innerHTML, so any tag works.
//                 No literal backtick or `${` inside it (breaks the template literal) — use
//                 <code> for inline code instead of markdown backticks. Wrap long derivations/
//                 proofs in <details><summary>...</summary>...</details> (auto-styled, collapsed
//                 by default) so the default view stays intuition-first.
//   exercises     array of 1-2 plain strings (not HTML-escaped, but plain text is fine), each an
//                 original problem — shown with its own answer textarea on the lesson page.
//
// To add a lesson: append an object to the right chapter's `lessons` array (or a new chapter).
// To remove one: delete its object — but first check whether anything lists its id in
// `prerequisites` (grep this file and data-algorithmics.js for the id); the DAG check will warn
// about the resulting dangling reference on next reload, but you may want to re-point or drop
// that edge deliberately rather than leave it dangling.
// To reorder: there's nothing to reorder — position in the array doesn't matter, only
// `prerequisites` determines what unlocks what.

const PHYSICS_SUBJECT = {
  id: "physics",
  name: "Physics",
  color: "#3b6fd6",
  chapters: [
    {
      id: "lagrangian-mechanics",
      name: "Classical Mechanics I — Lagrangian Mechanics",
      lessons: [
        {
          id: "phys-action-functional",
          title: "The Action Functional and Its First Variation",
          section: "Variational Foundations",
          prerequisites: [],
          estMinutes: 25,
          content: `
            <p>Newtonian mechanics presents dynamics as a second-order ODE on a vector space. The variational reformulation replaces that with a <em>selection principle</em> on a space of paths: among all sufficiently smooth curves joining two fixed configurations in a fixed time interval, the physical motion is a critical point of a real-valued functional. Everything in this chapter is downstream of that single move.</p>
            <p>Fix a configuration space (for now an open set U ⊆ ℝ<sup>n</sup>), a time interval [t<sub>0</sub>, t<sub>1</sub>], and endpoints a, b ∈ U. Let Ω be the affine space of C<sup>2</sup> curves γ: [t<sub>0</sub>, t<sub>1</sub>] → U with γ(t<sub>0</sub>) = a, γ(t<sub>1</sub>) = b. Given a Lagrangian L: U × ℝ<sup>n</sup> × ℝ → ℝ, define the action</p>
            <pre><code>S[γ] = ∫ from t₀ to t₁ of L(γ(t), γ̇(t), t) dt</code></pre>
            <p>Ω is not a linear space, but it is a affine subspace of a Banach space: its tangent space at any γ is the linear space of variations V = {δq ∈ C<sup>2</sup>([t<sub>0</sub>,t<sub>1</sub>], ℝ<sup>n</sup>) : δq(t<sub>0</sub>) = δq(t<sub>1</sub>) = 0}. The <strong>first variation</strong> is the Gateaux derivative</p>
            <pre><code>δS[γ](δq) = (d/dε)|₍ε₌₀₎ S[γ + ε·δq]</code></pre>
            <p>which, for L of class C<sup>2</sup>, exists and is a bounded linear functional of δq in the C<sup>1</sup> norm. A curve γ is an <strong>extremal</strong> (or stationary path) if δS[γ] = 0 as a functional on V. Note carefully what is <em>not</em> being claimed: no minimum is asserted. "Least action" is a historical misnomer; extremals are minimizers only for sufficiently short time intervals (before the first conjugate point), and are saddle points otherwise.</p>
            <details><summary>Full derivation: differentiating under the integral</summary>
            <p>Why should a critical-point condition on paths reproduce Newton? Differentiating under the integral gives δS = ∫ (∂L/∂q · δq + ∂L/∂q̇ · δq̇) dt. The presence of δq̇ alongside δq is what forces an integration by parts in the next lesson, and the vanishing boundary term is exactly where the fixed-endpoint condition earns its keep.</p>
            </details>
            <p><strong>Further reading:</strong> Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2nd ed. (Springer GTM 60), §12 "Calculus of variations". Pages vary by edition; see §12. Arnold's treatment is the right one for this reader: he sets up the differential of a functional on a space of curves explicitly rather than hand-waving δ as a symbol.</p>
          `,
          exercises: [
            "Let L(q, q̇) = ½|q̇|² − U(q) on ℝⁿ with U ∈ C². Show directly from the definition that δS[γ] exists for every γ ∈ Ω and every δq ∈ V, and write δS[γ](δq) as an explicit integral. Then verify that δS is continuous in δq with respect to the C¹ norm, and exhibit a Lagrangian for which it fails to be continuous in the C⁰ norm.",
            "Give an explicit example of a Lagrangian, endpoints, and time interval for which the physical extremal is NOT a local minimum of S in the C¹ topology. (Hint: take the harmonic oscillator L = ½q̇² − ½ω²q² on ℝ with t₁ − t₀ > π/ω, and construct a variation that lowers the action.)"
          ]
        },
        {
          id: "phys-euler-lagrange",
          title: "The Euler-Lagrange Equations",
          section: "Variational Foundations",
          prerequisites: ["phys-action-functional"],
          estMinutes: 30,
          content: `
            <p>This lesson converts the stationarity condition of the previous lesson from a statement about an infinite-dimensional functional into a system of ODEs. The bridge is the fundamental lemma of the calculus of variations.</p>
            <details><summary>Full derivation: integrating by parts and the fundamental lemma</summary>
            <p>Start from δS[γ](δq) = ∫ (∂L/∂q · δq + ∂L/∂q̇ · δq̇) dt and integrate the second term by parts. The boundary term [∂L/∂q̇ · δq] evaluated at t<sub>0</sub>, t<sub>1</sub> vanishes because δq does at the endpoints. Hence</p>
            <pre><code>δS[γ](δq) = ∫ from t₀ to t₁ of ( ∂L/∂q − (d/dt)(∂L/∂q̇) ) · δq dt</code></pre>
            <p>Requiring this to vanish for <em>all</em> δq ∈ V and invoking the fundamental lemma (if a continuous f satisfies ∫ f·δq = 0 for all compactly supported smooth δq, then f ≡ 0) gives the <strong>Euler-Lagrange equations</strong>:</p>
            </details>
            <pre><code>(d/dt)( ∂L/∂q̇ⁱ ) − ∂L/∂qⁱ = 0,   i = 1, …, n</code></pre>
            <p>Expanding the total time derivative shows the system is, in general, implicit second order: (∂²L/∂q̇ⁱ∂q̇ʲ) q̈ʲ + (∂²L/∂q̇ⁱ∂qʲ) q̇ʲ + ∂²L/∂q̇ⁱ∂t − ∂L/∂qⁱ = 0. The matrix ∂²L/∂q̇ⁱ∂q̇ʲ is the <strong>Hessian in the velocities</strong>; when it is invertible (the <em>nondegenerate</em> or <em>regular</em> case) the implicit function theorem lets us solve for q̈ and apply Picard-Lindelöf, giving local existence and uniqueness given (q, q̇) at one time. Degenerate Lagrangians are not pathologies to be avoided — they are exactly the constrained systems of gauge theory — but the whole Hamiltonian machinery of the next chapter presumes regularity.</p>
            <p>The reconciliation with Newton: for L = T − U with T = ½ Σ m<sub>i</sub>|q̇<sub>i</sub>|² in Cartesian coordinates, ∂L/∂q̇<sub>i</sub> = m<sub>i</sub>q̇<sub>i</sub> and ∂L/∂q<sub>i</sub> = −∂U/∂q<sub>i</sub>, so the Euler-Lagrange equations read m<sub>i</sub>q̈<sub>i</sub> = −∇<sub>i</sub>U. The variational principle does not add physics here; it repackages it in a form that will turn out to be coordinate-free, which is the whole point of the next lesson.</p>
            <p><strong>Further reading:</strong> Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2nd ed., §12 (extremals, the Euler-Lagrange equation) and §13 ("Lagrange's equations", where Hamilton's principle is shown equivalent to Newton's equations for L = T − U). Pages vary by edition; see §12-13. Goldstein, Poole &amp; Safko, <em>Classical Mechanics</em>, 3rd ed., §2.1-2.3 gives the same derivation in standard physics phrasing.</p>
          `,
          exercises: [
            "Prove the fundamental lemma in the form needed above: if f: [t₀,t₁] → ℝⁿ is continuous and ∫ f(t)·h(t) dt = 0 for every h ∈ C^∞ with h(t₀)=h(t₁)=0, then f ≡ 0. Then state precisely where the proof would break if f were only assumed integrable, and what conclusion survives.",
            "Let L̃ = L + dF(q,t)/dt for some F ∈ C². Show that L and L̃ have exactly the same Euler-Lagrange equations, and that S̃[γ] − S[γ] is the same constant for every γ ∈ Ω. Conversely, show that if two regular Lagrangians on the same configuration space have identical Euler-Lagrange equations for all initial data, they differ by such a total derivative plus a constant."
          ]
        },
        {
          id: "phys-config-manifold",
          title: "Configuration Manifolds, Constraints, and Coordinate Invariance",
          section: "Variational Foundations",
          prerequisites: ["phys-euler-lagrange"],
          estMinutes: 30,
          content: `
            <p>The reason to prefer the variational formulation over F = ma is that it is manifestly geometric. A mechanical system with holonomic constraints has configuration space a smooth manifold M (the constraint set), velocities live in TM, and a Lagrangian is a function L: TM × ℝ → ℝ. Nothing in the previous lesson referred to the linear structure of ℝ<sup>n</sup> in an essential way, and this lesson makes that precise.</p>
            <details><summary>Full derivation: why the equations are coordinate invariant</summary>
            <p><strong>Coordinate invariance.</strong> Let q = q(Q) be a diffeomorphism between two charts, inducing q̇ⁱ = (∂qⁱ/∂Q<sup>a</sup>) Q̇<sup>a</sup> on velocities. Define L'(Q, Q̇, t) = L(q(Q), (∂q/∂Q)Q̇, t). Because the action S[γ] is defined by an integral over the curve itself and is therefore chart-independent, and because a curve is an extremal iff δS = 0, a curve satisfies the Euler-Lagrange equations in one chart iff it does in the other. This is a one-line argument in the variational picture, versus a page of chain rule in the Newtonian one. The pair (∂L/∂q̇<sub>i</sub>) transforms as a covector: the <strong>generalized momenta</strong> p<sub>i</sub> = ∂L/∂q̇ⁱ are the components of the fibre derivative of L, a map TM → T*M. That map is the seed of the Legendre transform in the next chapter.</p>
            </details>
            <p><strong>Holonomic constraints.</strong> Suppose N point masses in ℝ<sup>3N</sup> are subject to k independent constraints f<sub>α</sub>(x, t) = 0 defining a submanifold M of dimension 3N − k. The physically correct prescription is: restrict L = T − U to TM, choose any coordinates on M ("generalized coordinates" q<sup>1</sup>,…,q<sup>n</sup>), and write down the Euler-Lagrange equations there. Constraint forces disappear entirely, because they do no virtual work — they are normal to M. This is d'Alembert's principle, and Arnold proves that for constraints realized as a limit of stiff potentials, the constrained Newtonian dynamics converges to the dynamics of the restricted Lagrangian.</p>
            <pre><code>M ⊂ ℝ³ᴺ  a submanifold;   L|_TM : TM → ℝ
kinetic energy T = ½ ⟨v, v⟩_m  induces a Riemannian metric on M
free motion (U ≡ 0) on M  ⟺  geodesic flow of that metric</code></pre>
            <p>That last line is the payoff and the connection forward: a mechanical system with no potential is literally a geodesic problem, which is why the machinery of this chapter reappears verbatim in general relativity in Chapter 7.</p>
            <p><strong>Further reading:</strong> Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2nd ed., §17 "Holonomic constraints", §19 "Lagrangian dynamical systems" (Lagrangian systems on manifolds, the natural system T − U, and the geodesic characterization), and §21 "D'Alembert's principle". Pages vary by edition; see §17-21. §18 is a manifolds refresher this reader can skip.</p>
          `,
          exercises: [
            "A bead of mass m slides without friction on a rigid circular hoop of radius R that is forced to rotate about a vertical diameter with constant angular velocity Ω. Write the configuration manifold, obtain L in the single generalized coordinate θ, derive the equation of motion, and determine all equilibria and their stability as a function of Ω. Identify the critical Ω at which the number of equilibria changes and classify the bifurcation.",
            "Let (M, g) be a Riemannian manifold and L(v) = ½ g(v,v) for v ∈ TM. Show that the Euler-Lagrange equations of L in local coordinates are the geodesic equations q̈ᵏ + Γᵏ_ij q̇ⁱq̇ʲ = 0 with Γ the Christoffel symbols of g. Then show that the arc-length functional and the energy functional ∫ L dt have the same extremals up to reparametrization, and explain precisely why the energy functional is the better-behaved one to vary."
          ]
        },
        {
          id: "phys-noether",
          title: "Noether's Theorem",
          section: "Symmetry",
          prerequisites: ["phys-config-manifold"],
          estMinutes: 30,
          content: `
            <p>Conservation laws in the Newtonian picture look like lucky accidents. In the Lagrangian picture they are theorems about symmetry, and the correspondence is exact and constructive: every one-parameter group of symmetries of the Lagrangian yields a first integral, given by an explicit formula.</p>
            <p><strong>Statement.</strong> Let L: TM → ℝ and let h<sup>s</sup>: M → M, s ∈ ℝ, be a one-parameter group of diffeomorphisms with h<sup>0</sup> = id, such that L is invariant under the induced maps on TM: L(dh<sup>s</sup>(v)) = L(v) for all v ∈ TM and all s. Then the function I: TM → ℝ defined by</p>
            <pre><code>I(q, q̇) = Σᵢ (∂L/∂q̇ⁱ) · Xⁱ(q),    where  X(q) = (d/ds)|₍s₌₀₎ hˢ(q)</code></pre>
            <p>is constant along every solution of the Euler-Lagrange equations. In the notation of the previous lesson, I = ⟨p, X⟩ — the pairing of the momentum covector with the infinitesimal generator of the symmetry.</p>
            <details><summary>Full derivation (proof sketch)</summary>
            <p><strong>Proof sketch.</strong> Consider the two-parameter family Φ(s,t) = h<sup>s</sup>(γ(t)) where γ solves the Euler-Lagrange equations. Invariance says L(Φ, ∂Φ/∂t) is independent of s. Differentiate in s, use the Euler-Lagrange equation to replace ∂L/∂q by d/dt(∂L/∂q̇), and the result collapses to d/dt(⟨p, X⟩) = 0. The whole content is one application of the product rule after one use of the equation of motion.</p>
            </details>
            <p><strong>The standard dictionary.</strong> Translation invariance in the x direction gives conservation of the x-component of total momentum; rotational invariance about an axis gives the corresponding component of angular momentum; and if the symmetry group is the full Euclidean group, all six are conserved. Time translation is <em>not</em> covered by the statement above (h<sup>s</sup> acts on M, not on time), and the corresponding conserved quantity — the energy E = Σ p<sub>i</sub>q̇<sup>i</sup> − L — requires a small extension. That extension is worth doing carefully, because E is exactly the Hamiltonian, which is the subject of the next chapter.</p>
            <p>A caution worth internalizing: the theorem requires invariance of L itself, not of the equations of motion. Symmetries of the equations that change L by a nonzero total time derivative (Galilean boosts are the canonical example) still give conserved quantities, but via the "divergence" or quasi-symmetry refinement, with an extra term.</p>
            <p><strong>Further reading:</strong> Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2nd ed., §20 "E. Noether's theorem" — a compact, fully rigorous three-page treatment including the extension to systems on manifolds. Pages vary by edition; see §20. For the conservation-of-energy case and the physics-standard phrasing, Goldstein, Poole &amp; Safko, 3rd ed., §2.6-2.7.</p>
          `,
          exercises: [
            "Prove Noether's theorem in the form stated above, carefully justifying each interchange of differentiation and the use of the Euler-Lagrange equation. Then state and prove the quasi-symmetry refinement: if L(dhˢ(v), t) = L(v, t) + (d/dt)Fˢ(q, t) with F⁰ = 0, the conserved quantity is ⟨p, X⟩ − (∂Fˢ/∂s)|₍s₌₀₎.",
            "For a free particle in ℝ³ with L = ½m|q̇|², apply the quasi-symmetry refinement to the Galilean boost hˢ(q) = q + s·u·t for a fixed vector u, and identify the resulting conserved quantity. Interpret it physically, and explain what it says about the motion of the centre of mass of an N-particle system with translation-invariant interactions."
          ]
        },
        {
          id: "phys-small-oscillations",
          title: "Small Oscillations and Normal Modes",
          section: "Applications",
          prerequisites: ["phys-euler-lagrange"],
          estMinutes: 30,
          content: `
            <p>Having a general theory is only useful if it produces a general solved case. For Lagrangian mechanics, the solved case is motion near a nondegenerate stable equilibrium, and the answer is a beautiful piece of linear algebra: the simultaneous diagonalization of two quadratic forms.</p>
            <p>Let q<sub>0</sub> be a critical point of the potential U on an n-dimensional configuration manifold, and expand a natural Lagrangian L = T − U to second order in the displacement x = q − q<sub>0</sub> and in ẋ. The kinetic term is already quadratic in velocity; freezing its coefficients at q<sub>0</sub> gives</p>
            <pre><code>L₂ = ½ ẋᵀ T ẋ − ½ xᵀ V x,     T = (∂²T/∂q̇∂q̇)|_{q₀},  V = (∂²U/∂q∂q)|_{q₀}
Euler-Lagrange:   T ẍ + V x = 0</code></pre>
            <details><summary>Full derivation: simultaneous diagonalization of T and V</summary>
            <p>Here T is symmetric positive definite (kinetic energy is a Riemannian metric) and V is symmetric. Because T is positive definite it defines an inner product, and the spectral theorem applied to T<sup>−1</sup>V — self-adjoint with respect to that inner product — produces a basis of eigenvectors that is T-orthonormal and V-diagonal simultaneously. Concretely, one solves the <strong>generalized eigenvalue problem</strong></p>
            </details>
            <pre><code>det( V − ω² T ) = 0,     ( V − ω²ₖ T ) aₖ = 0,     aⱼᵀ T aₖ = δⱼₖ</code></pre>
            <p>The n roots ω²<sub>k</sub> are real. If q<sub>0</sub> is a strict local minimum of U then V is positive definite, all ω²<sub>k</sub> > 0, and the general solution is a superposition of n independent oscillations x(t) = Σ<sub>k</sub> c<sub>k</sub> a<sub>k</sub> cos(ω<sub>k</sub>t + φ<sub>k</sub>). In the <strong>normal coordinates</strong> ξ<sub>k</sub> = a<sub>k</sub><sup>T</sup>Tx the system decouples completely into n independent harmonic oscillators. If V has a negative eigenvalue the corresponding mode grows exponentially and the equilibrium is unstable; zero eigenvalues signal a symmetry direction (a zero mode) along which the quadratic approximation says nothing.</p>
            <p>Two structural points to carry forward. First, this is the classical prototype of every "diagonalize the quadratic Hamiltonian" computation you will meet again in quantum field theory and statistical mechanics — the same linear algebra produces phonon modes and the normal modes of a free field. Second, that ω<sup>2</sup><sub>k</sub> depends continuously on parameters, and the way eigenvalues collide and split as a system is deformed, is the first appearance of the eigenvalue-crossing phenomena that reappear in degenerate perturbation theory in Chapter 5.</p>
            <p><strong>Further reading:</strong> Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2nd ed., §22 "Linearization" and §23 "Small oscillations" (including the simultaneous reduction of two quadratic forms). Pages vary by edition; see §22-23. §24 on the behaviour of characteristic frequencies under constraint is a very worthwhile follow-on for a mathematician: it contains a min-max/interlacing theorem.</p>
          `,
          exercises: [
            "Three equal masses m are arranged on a circle and connected by three identical springs of stiffness k, constrained to move only tangentially along the circle. Set up T and V, find all normal frequencies and normal modes, identify the zero mode and explain it via Noether's theorem, and verify explicitly that your eigenvectors are T-orthonormal.",
            "Prove the simultaneous-diagonalization statement used above: if T is a symmetric positive definite n×n real matrix and V is symmetric, there exists an invertible A with AᵀTA = I and AᵀVA diagonal. Then prove the interlacing result: if a single holonomic constraint aᵀx = 0 is imposed, the n−1 constrained frequencies ω̃₁ ≤ … ≤ ω̃ₙ₋₁ interlace the unconstrained ones, ωₖ ≤ ω̃ₖ ≤ ωₖ₊₁."
          ]
        }
      ]
    },
    {
      id: "hamiltonian-mechanics",
      name: "Classical Mechanics II — Hamiltonian Mechanics & Symplectic Geometry",
      lessons: [
        {
          id: "phys-legendre-transform",
          title: "The Legendre Transform and Convex Duality",
          section: "Hamiltonian Foundations",
          prerequisites: ["phys-euler-lagrange"],
          estMinutes: 25,
          content: `
            <p>The Lagrangian lives on TM and its equations of motion are second order. The Hamiltonian will live on T*M and its equations will be first order. The change of venue is effected by the Legendre transform, which is a purely convex-analytic construction with no physics in it at all.</p>
            <p><strong>The construction.</strong> Let f: ℝ<sup>n</sup> → ℝ be C<sup>2</sup> and strictly convex (Hessian positive definite everywhere). Define</p>
            <pre><code>f*(p) = sup over x of ( ⟨p, x⟩ − f(x) )</code></pre>
            <details><summary>Full derivation: attainment, the inverse map, and involutivity</summary>
            <p>Strict convexity guarantees the supremum is attained at the unique x(p) solving p = ∇f(x), so f*(p) = ⟨p, x(p)⟩ − f(x(p)). The map ∇f is then a diffeomorphism onto its image with inverse ∇f*, and the involution property f** = f holds. Geometrically, f*(p) is the (negated) intercept of the supporting hyperplane of slope p: the transform trades "value as a function of position" for "intercept as a function of slope", i.e. it re-coordinatizes the graph of f by its tangent lines.</p>
            </details>
            <p><strong>Application to mechanics.</strong> Apply this fibrewise in the velocity variable to L(q, q̇, t), with q and t as spectators. The dual variable is exactly the generalized momentum p<sub>i</sub> = ∂L/∂q̇<sup>i</sup>, and the transform is the <strong>Hamiltonian</strong></p>
            <pre><code>H(q, p, t) = Σᵢ pᵢ q̇ⁱ − L(q, q̇, t),   with q̇ = q̇(q, p, t) solved from pᵢ = ∂L/∂q̇ⁱ</code></pre>
            <p>The hypothesis needed is precisely the regularity condition of the previous chapter: the velocity Hessian ∂²L/∂q̇∂q̇ must be nondegenerate (convexity is the clean sufficient case, and it holds for any natural system L = T − U since T is a positive definite quadratic form). Note that H is the same quantity that appeared as the conserved energy in the time-translation form of Noether's theorem — for L = T − U with time-independent constraints, H = T + U.</p>
            <p>An identity worth memorizing, and which we prove in the next lesson: ∂H/∂q = −∂L/∂q while ∂H/∂p = q̇. The first says that whatever was true of the q-derivative of L is true up to sign of the q-derivative of H; that sign flip is the entire asymmetry of Hamilton's equations.</p>
            <p><strong>Further reading:</strong> Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2nd ed., §14 "Legendre transformations" — includes the involutivity, the Young inequality, and the geometric picture. Pages vary by edition; see §14. Goldstein, Poole &amp; Safko, 3rd ed., §8.1 covers the same ground in physics notation.</p>
          `,
          exercises: [
            "Prove that for f strictly convex and C² with ∇f a bijection of ℝⁿ, f* is itself strictly convex and C², and f** = f. Then prove Young's inequality f(x) + f*(p) ≥ ⟨p, x⟩ with equality iff p = ∇f(x), and deduce the classical Hölder-conjugate pair by taking f(x) = |x|ᵃ/a.",
            "Compute the Hamiltonian of the relativistic free particle with L = −mc²√(1 − |q̇|²/c²) on the domain |q̇| < c. Verify that L is strictly convex there, identify the image of the Legendre map (i.e. which momenta are attained), and show H = √(m²c⁴ + |p|²c²). Explain what feature of L is responsible for the momentum map being onto all of ℝ³ despite the velocity domain being bounded."
          ]
        },
        {
          id: "phys-hamilton-equations",
          title: "Hamilton's Equations and Phase Space",
          section: "Hamiltonian Foundations",
          prerequisites: ["phys-legendre-transform"],
          estMinutes: 30,
          content: `
            <p>Hamilton's equations are what the Euler-Lagrange equations become after the Legendre transform. The gain is not computational — solving them is no easier — but structural: the state space becomes T*M, which carries a canonical geometry that TM does not, and the equations become a first-order system, i.e. a vector field whose flow we can study with all the machinery of dynamical systems.</p>
            <details><summary>Full derivation: from the total differential of H</summary>
            <p><strong>Derivation.</strong> Take the total differential of H = Σ p<sub>i</sub>q̇<sup>i</sup> − L, treating (q, q̇, p, t) formally: dH = Σ (q̇<sup>i</sup> dp<sub>i</sub> + p<sub>i</sub> dq̇<sup>i</sup>) − Σ (∂L/∂q<sup>i</sup>) dq<sup>i</sup> − Σ (∂L/∂q̇<sup>i</sup>) dq̇<sup>i</sup> − (∂L/∂t) dt. The dq̇ terms cancel identically by the definition p<sub>i</sub> = ∂L/∂q̇<sup>i</sup> — this cancellation is the point of the Legendre transform. Reading off coefficients and then using the Euler-Lagrange equation ∂L/∂q<sup>i</sup> = ṗ<sub>i</sub> gives</p>
            </details>
            <pre><code>q̇ⁱ =  ∂H/∂pᵢ
ṗᵢ = −∂H/∂qⁱ
∂H/∂t = −∂L/∂t</code></pre>
            <p><strong>Phase space.</strong> The 2n-dimensional space with coordinates (q, p) is T*M, called phase space. Solutions are integral curves of the vector field X<sub>H</sub> = (∂H/∂p, −∂H/∂q). Two immediate consequences: (i) if ∂H/∂t = 0 then dH/dt = ∂H/∂q · q̇ + ∂H/∂p · ṗ = 0 identically, so H is conserved and trajectories are confined to level sets {H = E}; (ii) trajectories in phase space never cross, since X<sub>H</sub> is a well-defined vector field with unique integral curves — in contrast to configuration-space trajectories, which cross all the time. For one degree of freedom this makes the level curves of H a complete qualitative solution of the dynamics, obtainable with no integration at all.</p>
            <p>A cyclic coordinate (one absent from H) yields an immediately conserved momentum, ṗ<sub>i</sub> = 0, which is Noether's theorem in its cheapest form and the mechanism behind every separation-of-variables argument later in the chapter.</p>
            <p>The final structural remark, which motivates the next lesson: the right-hand side of Hamilton's equations is the matrix J = [[0, I],[−I, 0]] applied to ∇H. That antisymmetric J is not an artefact of coordinates; it is the coordinate expression of a canonical 2-form on T*M.</p>
            <p><strong>Further reading:</strong> Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2nd ed., §15 "Hamilton's equations". Pages vary by edition; see §15. Goldstein, Poole &amp; Safko, 3rd ed., §8.1-8.2 and §8.5 (Hamilton's equations from a variational principle, i.e. the modified Hamilton principle).</p>
          `,
          exercises: [
            "For the plane pendulum H(θ, p) = p²/(2mℓ²) − mgℓ cos θ on the cylinder T*S¹, sketch the level sets of H, identify the fixed points and classify them, and compute exactly the value of E at which the topology of the level set changes. Show that the separatrix is reached only asymptotically, i.e. that the time to reach the unstable equilibrium along it diverges.",
            "Derive Hamilton's equations directly from a variational principle: show that stationarity of the functional ∫ (Σ pᵢ dqⁱ − H(q,p,t) dt) over curves in phase space with only the q-endpoints fixed is equivalent to the full first-order system. Explain why the p-endpoints must be left free and what would go wrong if they were fixed."
          ]
        },
        {
          id: "phys-symplectic-structure",
          title: "Symplectic Manifolds and Hamiltonian Vector Fields",
          section: "Symplectic Geometry",
          prerequisites: ["phys-hamilton-equations", "phys-config-manifold"],
          estMinutes: 40,
          content: `
            <p>This lesson replaces the coordinate matrix J of the previous lesson with an invariant object, and in doing so makes Hamiltonian mechanics a chapter of differential geometry.</p>
            <p><strong>The canonical form on T*M.</strong> On the cotangent bundle π: T*M → M there is a tautological 1-form θ defined at a point α ∈ T*M by θ<sub>α</sub>(v) = α(dπ(v)). In canonical coordinates θ = Σ p<sub>i</sub> dq<sup>i</sup>. Its exterior derivative ω = −dθ = Σ dq<sup>i</sup> ∧ dp<sub>i</sub> is a closed, nondegenerate 2-form: a <strong>symplectic form</strong>. Nondegeneracy means the bundle map ω<sup>♭</sup>: TP → T*P, v ↦ ω(v, ·) is an isomorphism, which forces dim P to be even.</p>
            <p><strong>Hamiltonian vector fields.</strong> Given H: P → ℝ on a symplectic manifold (P, ω), define X<sub>H</sub> as the unique vector field with</p>
            <pre><code>ι_{X_H} ω = dH      (equivalently  ω(X_H, ·) = dH )</code></pre>
            <details><summary>Full derivation: why the flow preserves the symplectic form</summary>
            <p>In canonical coordinates this unpacks to exactly Hamilton's equations. Two theorems make this the right definition. First, <strong>the flow preserves ω</strong>: by Cartan's magic formula, 𝓛<sub>X<sub>H</sub></sub>ω = d(ι<sub>X<sub>H</sub></sub>ω) + ι<sub>X<sub>H</sub></sub>(dω) = d(dH) + 0 = 0, using dω = 0. So the time-t flow map g<sup>t</sup> is a symplectomorphism. Second, since ω<sup>n</sup>/n! is a volume form, the flow is automatically volume preserving — this is Liouville's theorem, proved in two lines rather than by computing a Jacobian.</p>
            </details>
            <p><strong>Darboux's theorem.</strong> Every symplectic manifold is locally (ℝ<sup>2n</sup>, Σ dq ∧ dp): there are no local invariants of a symplectic structure, in sharp contrast to Riemannian geometry where curvature is a local invariant. Every "interesting" symplectic question is therefore global. For a reader with differential topology, this single statement reframes what canonical transformations are: they are exactly the maps preserving ω, and Darboux says such maps are locally plentiful.</p>
            <p>Beyond cotangent bundles, symplectic manifolds arise as coadjoint orbits (this is where spin will come from), and as level sets after reduction by symmetry — Noether's theorem in this language is the statement that a momentum map is constant along the flow.</p>
            <p><strong>Further reading:</strong> Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2nd ed., §37 "Symplectic structures on manifolds" and §38 "Hamiltonian phase flows and their integral invariants"; the differential-forms prerequisites are §32-36. Pages vary by edition; see §37-38. For Darboux and the modern geometric viewpoint, McDuff &amp; Salamon, <em>Introduction to Symplectic Topology</em>, 3rd ed., Ch. 3.</p>
          `,
          exercises: [
            "Verify that the tautological 1-form θ on T*M is well defined independently of coordinates, and compute it in canonical coordinates to confirm θ = Σ pᵢ dqⁱ. Then show that θ is characterized by the property that for any 1-form α on M, viewed as a section sₐ: M → T*M, one has sₐ*θ = α.",
            "Show that a diffeomorphism of ℝ² preserves the standard symplectic form ω = dq ∧ dp if and only if its Jacobian has determinant 1 everywhere, and that in ℝ⁴ area-preservation (in the sense of the volume form ω²/2) is strictly weaker than symplecticity by exhibiting a volume-preserving linear map of ℝ⁴ that is not symplectic."
          ]
        },
        {
          id: "phys-poisson-brackets",
          title: "Poisson Brackets and the Lie Algebra of Observables",
          section: "Symplectic Geometry",
          prerequisites: ["phys-symplectic-structure"],
          estMinutes: 35,
          content: `
            <p>The symplectic form lets us turn functions into vector fields. The Poisson bracket is the resulting algebraic structure on functions, and it is the single most important bridge to quantum mechanics: the canonical quantization prescription is literally "replace the Poisson bracket by (1/iħ) times the commutator".</p>
            <p><strong>Definition and coordinates.</strong> For F, G ∈ C<sup>∞</sup>(P) on a symplectic manifold, set {F, G} = ω(X<sub>F</sub>, X<sub>G</sub>) = X<sub>G</sub>(F). In canonical coordinates,</p>
            <pre><code>{F, G} = Σᵢ ( ∂F/∂qⁱ · ∂G/∂pᵢ − ∂F/∂pᵢ · ∂G/∂qⁱ )
{qⁱ, qʲ} = 0,   {pᵢ, pⱼ} = 0,   {qⁱ, pⱼ} = δⁱⱼ</code></pre>
            <details><summary>Full detail: the Poisson algebra structure</summary>
            <p><strong>Properties.</strong> The bracket is bilinear, antisymmetric, satisfies the Jacobi identity (this is equivalent to dω = 0), and is a derivation in each argument: {F, GH} = {F,G}H + G{F,H}. So (C<sup>∞</sup>(P), {·,·}) is an infinite-dimensional Lie algebra, and simultaneously a Poisson algebra. The map F ↦ X<sub>F</sub> is a Lie algebra antihomomorphism onto the Hamiltonian vector fields, with kernel the locally constant functions.</p>
            </details>
            <p><strong>Dynamics.</strong> Every observable evolves by</p>
            <pre><code>dF/dt = {F, H} + ∂F/∂t</code></pre>
            <p>Taking F = q<sup>i</sup> and F = p<sub>i</sub> recovers Hamilton's equations, so the bracket contains the dynamics. F is a first integral iff {F, H} = 0 — a purely algebraic characterization of conservation. <strong>Poisson's theorem</strong> follows from Jacobi: if F and G are both conserved then so is {F, G}. Applying this to the angular momentum components, whose brackets are {L<sub>i</sub>, L<sub>j</sub>} = ε<sub>ijk</sub>L<sub>k</sub>, shows the conserved quantities close into a copy of the Lie algebra so(3) — and this exact bracket relation, promoted to a commutator, is what generates the whole angular-momentum theory in Chapter 5.</p>
            <p>Finally, {F, ·} generates a flow: infinitesimally, F is the generator of the canonical transformation whose flow it is. Momentum generates translations, angular momentum generates rotations, the Hamiltonian generates time evolution. Symmetry and conservation are two readings of the same bracket.</p>
            <p><strong>Further reading:</strong> Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2nd ed., §39 "The Lie algebra of vector fields", §40 "The Lie algebra of Hamiltonian functions", and §41 "Poisson's theorem". Pages vary by edition; see §39-41. Goldstein, Poole &amp; Safko, 3rd ed., §9.5-9.7 for the physics phrasing, including the angular-momentum bracket relations.</p>
          `,
          exercises: [
            "Prove that the Jacobi identity for {·,·} on a manifold with a nondegenerate 2-form ω is equivalent to dω = 0. Then use Jacobi to prove Poisson's theorem, and give an example showing that the bracket of two independent first integrals can be functionally dependent on them (so the theorem does not automatically generate new integrals).",
            "For a particle in ℝ³ with L = r × p, verify {Lᵢ, Lⱼ} = εᵢⱼₖ Lₖ and {Lᵢ, |L|²} = 0. Then compute the brackets of the Laplace-Runge-Lenz vector A = p × L − mk r̂ with L and with itself for the Kepler Hamiltonian H = |p|²/2m − k/|r|, and identify the Lie algebra generated by (L, A) on a fixed negative-energy level set."
          ]
        },
        {
          id: "phys-canonical-transformations",
          title: "Canonical Transformations and Generating Functions",
          section: "Symplectic Geometry",
          prerequisites: ["phys-poisson-brackets"],
          estMinutes: 30,
          content: `
            <p>In Lagrangian mechanics, changes of coordinates on M were the natural symmetry of the formalism. In Hamiltonian mechanics the admissible transformations are far larger: any map of phase space preserving ω, including ones that mix positions and momenta. This flexibility is what makes it possible, in favourable cases, to transform a system into one where every coordinate is cyclic and the solution is trivial.</p>
            <p><strong>Definition.</strong> A diffeomorphism Φ: (q,p) ↦ (Q,P) is <strong>canonical</strong> (a symplectomorphism) if Φ*ω = ω, equivalently if its Jacobian matrix S satisfies S<sup>T</sup>JS = J, equivalently if the fundamental brackets are preserved: {Q<sup>i</sup>, P<sub>j</sub>} = δ<sup>i</sup><sub>j</sub>, {Q<sup>i</sup>,Q<sup>j</sup>} = {P<sub>i</sub>,P<sub>j</sub>} = 0. Under such a map, Hamilton's equations retain their form with the new Hamiltonian K = H ∘ Φ<sup>−1</sup> (plus a ∂F/∂t term if Φ depends on time).</p>
            <details><summary>Full derivation: from the closed 1-form to the four types</summary>
            <p><strong>Generating functions.</strong> Canonicity is equivalent to closedness of the 1-form Σ p dq − Σ P dQ, hence locally exact: Σ p<sub>i</sub>dq<sup>i</sup> − Σ P<sub>i</sub>dQ<sup>i</sup> = dF. Choosing which half of the old and new variables to use as independent gives the four classical types. The most used is F<sub>2</sub>(q, P, t), for which</p>
            </details>
            <pre><code>pᵢ = ∂F₂/∂qⁱ,    Qⁱ = ∂F₂/∂Pᵢ,    K = H + ∂F₂/∂t</code></pre>
            <p>Any F<sub>2</sub> with nondegenerate mixed Hessian ∂²F<sub>2</sub>/∂q∂P generates a canonical transformation implicitly. Note F<sub>2</sub> = Σ q<sup>i</sup>P<sub>i</sub> is the identity, so F<sub>2</sub> = Σ q<sup>i</sup>P<sub>i</sub> + εG(q,P) generates an infinitesimal canonical transformation with generator G — recovering the statement from the previous lesson that functions generate flows, and identifying H as the generator of the transformation "advance time by dt".</p>
            <p>The strategic point: if we could find a canonical transformation making the new Hamiltonian K identically zero, then Q and P would be constants and the problem would be solved. Whether such an F<sub>2</sub> exists is a PDE question — the Hamilton-Jacobi equation, two lessons ahead.</p>
            <p><strong>Further reading:</strong> Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2nd ed., §45 "Applications of the integral invariant of Poincaré-Cartan" and §48 "Generating functions". Pages vary by edition; see §44-48. Goldstein, Poole &amp; Safko, 3rd ed., §9.1-9.4 gives the four generating-function types explicitly and the symplectic-matrix condition — the most convenient reference for the bookkeeping.</p>
          `,
          exercises: [
            "Show that the map Q = ln((1/q) sin p), P = q cot p is canonical, by (a) computing the Jacobian and verifying SᵀJS = J and (b) exhibiting an explicit generating function. Then apply it to H = ½(p² + ω²q²)-type problems and comment on what it buys you.",
            "Prove that a linear map of ℝ²ⁿ is canonical iff its matrix S satisfies SᵀJS = J, that such matrices form a group Sp(2n, ℝ), and that every element has determinant +1. Then show that the eigenvalues of a symplectic matrix come in quadruples {λ, 1/λ, λ̄, 1/λ̄}, and explain the consequence for the linear stability of equilibria of Hamiltonian systems (in particular, why asymptotic stability is impossible)."
          ]
        },
        {
          id: "phys-liouville-theorem",
          title: "Liouville's Theorem, Recurrence, and Integrability",
          section: "Dynamics in Phase Space",
          prerequisites: ["phys-canonical-transformations"],
          estMinutes: 40,
          content: `
            <p>Two theorems named after Liouville sit at the heart of this chapter, and they should be kept apart. The first is a statement about volume; the second is a statement about when a system can be solved.</p>
            <details><summary>Full derivation: preservation of phase volume</summary>
            <p><strong>Liouville's theorem on phase volume.</strong> The Hamiltonian flow g<sup>t</sup> preserves the Liouville measure ω<sup>n</sup>/n! = dq<sup>1</sup>…dq<sup>n</sup>dp<sub>1</sub>…dp<sub>n</sub>. The proof in coordinates is that the phase-space velocity field has vanishing divergence: ∇·(q̇, ṗ) = Σ ∂/∂q<sup>i</sup>(∂H/∂p<sub>i</sub>) − ∂/∂p<sub>i</sub>(∂H/∂q<sup>i</sup>) = 0 by equality of mixed partials. The invariant proof is the one from two lessons back: the flow preserves ω, hence preserves ω<sup>n</sup>.</p>
            </details>
            <pre><code>d/dt ∫_{gᵗ(D)} dq dp = 0     for every measurable D ⊂ P</code></pre>
            <p>Consequences. Hamiltonian systems have no attractors, no asymptotically stable fixed points, and no dissipation — every phase-space "cloud" keeps its volume forever while being sheared into intricate filaments (which is why coarse-grained entropy can rise while fine-grained entropy cannot; this returns in Chapter 6). Combined with compactness of an energy level set, one gets <strong>Poincaré recurrence</strong>: for a measure-preserving map of a finite-measure space, almost every point of any positive-measure set returns to that set. This is exactly the invariant measure that underwrites the microcanonical ensemble in Chapter 6.</p>
            <p><strong>The Liouville-Arnold theorem on integrability.</strong> Suppose a 2n-dimensional system admits n first integrals F<sub>1</sub> = H, …, F<sub>n</sub> that are in involution ({F<sub>i</sub>, F<sub>j</sub>} = 0) and independent on a level set M<sub>f</sub> = {F = f}. Then M<sub>f</sub> is a Lagrangian submanifold, invariant under all n flows; if it is compact and connected it is diffeomorphic to the n-torus T<sup>n</sup>, and there exist <strong>action-angle coordinates</strong> (I, φ) in a neighbourhood in which</p>
            <pre><code>İ = 0,   φ̇ = ω(I) = ∂H/∂I     (linear flow on the torus)</code></pre>
            <p>The proof is genuinely topological — the involutivity gives n commuting complete vector fields, hence a free transitive ℝ<sup>n</sup>-action, hence a quotient by a lattice — and it is one of the most satisfying arguments in the subject for a reader with differential topology. Integrable systems are exceptional; generic perturbations destroy most tori, which is the subject of KAM theory.</p>
            <p><strong>Further reading:</strong> Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2nd ed., §16 "Liouville's theorem" (phase volume and recurrence) and §49 "Integrable systems" together with §50 "Action-angle variables" for the Liouville-Arnold theorem. Pages vary by edition; see §16 and §49-50.</p>
          `,
          exercises: [
            "State and prove the Poincaré recurrence theorem for a measure-preserving map T of a probability space, and then explain carefully why it does not contradict the second law of thermodynamics for a gas of 10²³ molecules. Estimate the recurrence time scale for a simple model to make the point quantitative.",
            "For the one-dimensional system H = p²/2m + U(q) with U a smooth potential well, compute the action variable I = (1/2π)∮ p dq as a function of energy E, show dE/dI equals the angular frequency of the periodic orbit, and verify both statements explicitly for the harmonic oscillator and for U(q) = A|q|."
          ]
        },
        {
          id: "phys-hamilton-jacobi",
          title: "Hamilton-Jacobi Theory",
          section: "Dynamics in Phase Space",
          prerequisites: ["phys-canonical-transformations"],
          estMinutes: 35,
          content: `
            <p>Hamilton-Jacobi theory is the endpoint of the canonical-transformation programme: rather than looking for clever transformations one at a time, we ask for the one that trivializes the dynamics completely, and discover that finding it is equivalent to solving a first-order nonlinear PDE.</p>
            <details><summary>Full derivation: how the Hamilton-Jacobi equation arises</summary>
            <p><strong>The equation.</strong> Seek a time-dependent generating function S(q, P, t) of type F<sub>2</sub> such that the new Hamiltonian K = H + ∂S/∂t vanishes identically. Substituting p<sub>i</sub> = ∂S/∂q<sup>i</sup> gives the <strong>Hamilton-Jacobi equation</strong> for Hamilton's principal function:</p>
            </details>
            <pre><code>H( q¹,…,qⁿ, ∂S/∂q¹,…,∂S/∂qⁿ, t ) + ∂S/∂t = 0</code></pre>
            <p>A <strong>complete integral</strong> — a solution depending on n nontrivial constants α<sub>1</sub>,…,α<sub>n</sub> with det(∂²S/∂q∂α) ≠ 0 — is exactly what is needed. Then P<sub>i</sub> = α<sub>i</sub> are constants, and the equations β<sup>i</sup> = ∂S/∂α<sub>i</sub> (also constants) can be inverted to give q(t) algebraically. One has traded a system of 2n ODEs for a single PDE; that is only a good trade when the PDE separates, but when it does, the payoff is complete.</p>
            <p>If H is time-independent, the ansatz S = W(q, α) − Et reduces this to the time-independent equation H(q, ∂W/∂q) = E for <strong>Hamilton's characteristic function</strong> W. Separability then means W = Σ W<sub>i</sub>(q<sup>i</sup>, α), reducing the PDE to n quadratures — the mechanism behind the exact solutions of the Kepler problem in parabolic coordinates and of the symmetric top.</p>
            <p><strong>Geometry and the road to quantum mechanics.</strong> S is a function on configuration space whose differential dS is a section of T*M; its graph is a Lagrangian submanifold, and the flow carries these submanifolds into each other. The level sets of S propagate as wavefronts, with trajectories orthogonal to them in the metric defined by the kinetic energy: this is Huygens' principle, and it makes mechanics the geometrical-optics limit of some wave theory. Writing ψ = exp(iS/ħ) and demanding the leading order in ħ reproduce the Hamilton-Jacobi equation is precisely how the Schrödinger equation is reverse-engineered, and it is the classical limit we will refer back to in Chapters 4 and 5.</p>
            <p><strong>Further reading:</strong> Arnold, <em>Mathematical Methods of Classical Mechanics</em>, 2nd ed., §46 "Huygens' principle" and §47 "The Hamilton-Jacobi method for integrating Hamilton's canonical equations". Pages vary by edition; see §46-47. Goldstein, Poole &amp; Safko, 3rd ed., §10.1-10.4 for worked separable examples and §10.7 for the optics/wave-mechanics analogy.</p>
          `,
          exercises: [
            "Solve the harmonic oscillator H = p²/2m + ½mω²q² by Hamilton-Jacobi: find a complete integral W(q, E), obtain t − t₀ = ∂W/∂E, invert to get q(t), and identify the action variable from your solution. Then repeat for the free particle and explain the qualitative difference in the resulting Lagrangian submanifolds.",
            "Show that if S(q, α, t) is a complete integral of the Hamilton-Jacobi equation, then the graph of dS(·, α, t) in T*M is a Lagrangian submanifold invariant under the Hamiltonian flow, and that the family of such submanifolds foliates a region of phase space. Then explain, with the harmonic oscillator as your example, why a global single-valued S generally fails to exist and where it breaks down (caustics)."
          ]
        }
      ]
    },
    {
      id: "relativity-electrodynamics",
      name: "Special Relativity & Electrodynamics",
      lessons: [
        {
          id: "phys-minkowski-lorentz",
          title: "Minkowski Space and the Lorentz Group",
          section: "Special Relativity",
          prerequisites: [],
          estMinutes: 30,
          content: `
            <p>Special relativity is best presented to a mathematician as a change of the invariance group of physics, from the Galilean group to the Poincaré group, together with the geometry that group preserves. Everything else — time dilation, length contraction, the twin paradox — is a corollary.</p>
            <p><strong>Minkowski space</strong> is ℝ<sup>4</sup> with coordinates x<sup>μ</sup> = (ct, x, y, z), μ = 0,1,2,3, equipped with the nondegenerate symmetric bilinear form of signature (+,−,−,−):</p>
            <pre><code>η = diag(1, −1, −1, −1),    ⟨x, y⟩ = η_{μν} xᵘ yᵛ
interval:  s² = c²t² − |x|²   (invariant)</code></pre>
            <p>This is a pseudo-Riemannian, not Riemannian, structure: the "norm" is indefinite, so vectors partition into timelike (s² &gt; 0), null (s² = 0) and spacelike (s² &lt; 0). The light cone is the null set, and it — not any notion of simultaneity — is the invariant causal structure.</p>
            <details><summary>Full detail: components and Lie structure of the Lorentz group</summary>
            <p><strong>The Lorentz group</strong> O(1,3) is the isometry group of η fixing the origin: Λ<sup>T</sup>ηΛ = η. It has four connected components, separated by det Λ = ±1 and by whether Λ<sup>0</sup><sub>0</sub> ≥ 1 or ≤ −1. The physically continuous piece is the proper orthochronous subgroup SO<sup>+</sup>(1,3), a six-dimensional Lie group generated by three rotations and three boosts. Adjoining translations gives the ten-dimensional Poincaré group. As a Lie algebra fact worth carrying to quantum mechanics: SO<sup>+</sup>(1,3) ≅ PSL(2,ℂ), and SL(2,ℂ) is its universal double cover — the source of spinors.</p>
            </details>
            <p>A boost along x with rapidity ζ (tanh ζ = v/c, γ = cosh ζ) is a hyperbolic rotation in the (t,x) plane:</p>
            <pre><code>ct' = γ(ct − βx),   x' = γ(x − βct),   y'=y,  z'=z
β = v/c,  γ = 1/√(1−β²) = cosh ζ</code></pre>
            <p>Rapidity is additive under collinear boosts, which is the clean way to see relativistic velocity addition: tanh(ζ<sub>1</sub>+ζ<sub>2</sub>) is the addition formula. Non-collinear boosts do <em>not</em> commute, and their composition is a boost times a rotation — Thomas precession — which is the group-theoretic content behind the factor of 2 in spin-orbit coupling.</p>
            <p><strong>Further reading:</strong> Jackson, <em>Classical Electrodynamics</em>, 3rd ed. (Wiley, 1999), §11.3 (Lorentz transformations), §11.6 (mathematical properties of the space-time of special relativity), §11.7 (matrix representation of Lorentz transformations, infinitesimal generators), and §11.8 (Thomas precession). Pages vary by edition; see §11.3-11.8. Note Jackson uses SI units in Chapters 1-10 and Gaussian units from Chapter 11 onward.</p>
          `,
          exercises: [
            "Show that any Λ ∈ SO⁺(1,3) can be written as R₁ B(ζ) R₂ with R₁, R₂ rotations and B(ζ) a boost along a fixed axis (the polar decomposition of the Lorentz group). Then compute explicitly the composition of two boosts of equal rapidity ζ along orthogonal axes and extract the rotation angle, verifying that it is O(ζ²) for small ζ.",
            "Prove that the set of events spacelike-separated from a given event is connected, while the set of timelike-separated events has two components, and deduce that no orthochronous Lorentz transformation can reverse the temporal order of timelike-separated events but that any spacelike-separated pair can be reordered. Conclude what this implies about causal signalling."
          ]
        },
        {
          id: "phys-four-momentum",
          title: "Four-Velocity, Four-Momentum, and Relativistic Kinematics",
          section: "Special Relativity",
          prerequisites: ["phys-minkowski-lorentz"],
          estMinutes: 25,
          content: `
            <p>Once the invariance group is fixed, the correct dynamical variables are the ones transforming in linear representations of it. This lesson constructs them and shows that the conservation laws of Chapter 1 survive intact, but with the mass-energy relation attached.</p>
            <p>Parametrize a timelike worldline by <strong>proper time</strong> τ, defined by c<sup>2</sup>dτ<sup>2</sup> = ds<sup>2</sup>, so that dτ = dt/γ. The <strong>four-velocity</strong> u<sup>μ</sup> = dx<sup>μ</sup>/dτ = γ(c, v) is then a genuine four-vector with the normalization</p>
            <pre><code>u·u = η_{μν} uᵘ uᵛ = c²      (identically)
p^μ = m u^μ = (E/c, p),   E = γmc²,   p = γmv
E² = |p|²c² + m²c⁴</code></pre>
            <details><summary>Full derivation: unpacking the mass-shell identity</summary>
            <p>The last identity is just p·p = m<sup>2</sup>c<sup>2</sup> rewritten, and it is the whole of relativistic kinematics in one line. Note that differentiating u·u = c<sup>2</sup> gives u·(du/dτ) = 0: four-acceleration is always orthogonal (in η) to four-velocity, which is the relativistic replacement for the statement that circular motion has centripetal acceleration.</p>
            </details>
            <p><strong>What "conservation" means now.</strong> In collisions, the total four-momentum Σp<sup>μ</sup> is conserved. Because p<sup>μ</sup> is a four-vector, this single statement is Lorentz covariant: if total four-momentum is conserved in one frame it is conserved in all. Its time component is energy conservation and its spatial part is momentum conservation, so the two separate Newtonian laws merge into one. Rest mass, by contrast, is <em>not</em> conserved (only the total four-momentum is), which is exactly why nuclear binding energy and particle creation are possible.</p>
            <p>Massless particles have p·p = 0, E = |p|c, and no rest frame; their worldlines are null and cannot be parametrized by proper time. The Doppler shift and aberration follow immediately by boosting the photon four-momentum, which is the cleanest derivation of both.</p>
            <p>Connecting back to Chapter 1: the free relativistic Lagrangian L = −mc<sup>2</sup>/γ from the Legendre-transform exercise has conjugate momentum γmv and Hamiltonian √(m²c⁴+|p|²c²) — the variational formalism goes through unchanged, and its Noether charges are exactly the components of p<sup>μ</sup> and of the relativistic angular momentum M<sup>μν</sup>.</p>
            <p><strong>Further reading:</strong> Jackson, <em>Classical Electrodynamics</em>, 3rd ed., §11.4 (addition of velocities; four-velocity) and §11.5 (relativistic momentum and energy of a particle); §11.12 has a useful note on notation in relativistic kinematics. Pages vary by edition; see §11.4-11.5.</p>
          `,
          exercises: [
            "A particle of mass m and energy E strikes a stationary particle of mass M. Compute the invariant s = (p₁+p₂)·(p₁+p₂) and use it to derive the threshold energy E for producing a final state of total rest mass Mf. Apply it to compute the threshold lab energy for p + p → p + p + p + p̄ and compare with the collider (centre-of-mass) case, explaining the discrepancy in terms of s.",
            "Derive the relativistic Doppler shift and stellar aberration by boosting the null four-vector kᵘ = (ω/c)(1, n̂). Then show that the aberration formula can be written as a Möbius transformation of the celestial sphere under the identification of the sphere of null directions with ℂP¹, and identify which subgroup of PSL(2,ℂ) corresponds to boosts."
          ]
        },
        {
          id: "phys-field-tensor",
          title: "Maxwell's Equations and the Field Strength Tensor",
          section: "Electrodynamics",
          prerequisites: ["phys-minkowski-lorentz"],
          estMinutes: 30,
          content: `
            <p>Maxwell's equations were Lorentz invariant a full forty years before anyone noticed. This lesson makes the invariance manifest by assembling E and B into a single rank-2 antisymmetric tensor, after which the four vector equations of Maxwell collapse into two.</p>
            <p>Define the four-potential A<sup>μ</sup> = (φ, A) and the <strong>field strength tensor</strong></p>
            <pre><code>F^{μν} = ∂^μ A^ν − ∂^ν A^μ     (antisymmetric, 6 independent components)
F^{0i} = −Eⁱ,     F^{ij} = −ε^{ijk} B_k        (Gaussian units)
J^μ = (cρ, J)</code></pre>
            <p>Then Maxwell's equations are exactly</p>
            <pre><code>∂_μ F^{μν} = (4π/c) J^ν            (Gauss + Ampère-Maxwell)
∂_λ F_{μν} + ∂_μ F_{νλ} + ∂_ν F_{λμ} = 0   (no monopoles + Faraday)</code></pre>
            <p>In the language of differential forms, F = dA is a 2-form, the second equation is the Bianchi identity dF = 0 (automatic once F = dA), and the first is d⋆F = ⋆J. That the homogeneous pair is an identity rather than a dynamical equation is the reason magnetic monopoles are absent: they would require F not to be exact.</p>
            <details><summary>Full derivation: charge conservation as an integrability condition</summary>
            <p><strong>Charge conservation is forced.</strong> Apply ∂<sub>ν</sub> to the inhomogeneous equation: the left side is ∂<sub>ν</sub>∂<sub>μ</sub>F<sup>μν</sup>, a contraction of a symmetric with an antisymmetric object, hence zero. So ∂<sub>μ</sub>J<sup>μ</sup> = 0, i.e. ∂ρ/∂t + ∇·J = 0. Conservation of charge is not an extra postulate; it is an integrability condition.</p>
            </details>
            <p><strong>Invariants.</strong> Two scalars can be built from F alone: F<sub>μν</sub>F<sup>μν</sup> = 2(|B|² − |E|²) and ε<sup>μνλσ</sup>F<sub>μν</sub>F<sub>λσ</sub> ∝ E·B (a pseudoscalar). Their invariance settles a family of questions at a stroke: if E ⟂ B in one frame it is so in all; if |E| &gt; |B| no frame has a purely magnetic field; and a pure plane wave (with both invariants zero) looks like a plane wave to every observer.</p>
            <p>Under a boost, E and B mix — the "same" field is electric in one frame and partly magnetic in another. Magnetism, in this sense, is a relativistic correction to electrostatics that happens to be observable at ordinary speeds only because charge neutrality cancels the leading electric term.</p>
            <p><strong>Further reading:</strong> Jackson, <em>Classical Electrodynamics</em>, 3rd ed., §11.9 (invariance of electric charge; covariance of electrodynamics — where F<sup>μν</sup> is constructed) and §11.10 (transformation of electromagnetic fields). Pages vary by edition; see §11.9-11.10. For a differential-forms presentation, Carroll, <em>Spacetime and Geometry</em>, §1.8 and §2.9.</p>
          `,
          exercises: [
            "Starting from the transformation law F'^{μν} = Λ^μ_α Λ^ν_β F^{αβ}, derive the transformation of E and B under a boost of velocity v, splitting into components parallel and perpendicular to v. Use the result to compute the fields of a charge in uniform motion from the Coulomb field in its rest frame, and show the electric field is compressed into the transverse plane by a factor γ.",
            "Prove that F_{μν}F^{μν} and F_{μν}F̃^{μν} (with F̃ the dual) are the only algebraically independent Lorentz scalars quadratic in F. Then classify the orbits of the Lorentz group on the space of field configurations at a point according to the signs of these two invariants, and identify which classes admit a frame with E = 0, with B = 0, or with E ∥ B."
          ]
        },
        {
          id: "phys-gauge-invariance",
          title: "Potentials, Gauge Freedom, and the Wave Equation",
          section: "Electrodynamics",
          prerequisites: ["phys-field-tensor"],
          estMinutes: 30,
          content: `
            <p>The potential A<sup>μ</sup> is not observable: only F<sup>μν</sup> = ∂<sup>μ</sup>A<sup>ν</sup> − ∂<sup>ν</sup>A<sup>μ</sup> is. The redundancy in the description is a feature, not a bug, and it is the first appearance in this curriculum of the idea that dominates modern physics.</p>
            <p><strong>Gauge transformations.</strong> For any smooth scalar χ, the substitution</p>
            <pre><code>A^μ → A^μ + ∂^μ χ      (i.e. φ → φ − (1/c)∂χ/∂t,  A → A + ∇χ)</code></pre>
            <p>leaves F unchanged, since ∂<sup>μ</sup>∂<sup>ν</sup>χ is symmetric. In forms language: A is defined only up to an exact 1-form, and F = dA is unchanged because d² = 0. The physical configuration space is therefore not the space of A's but a quotient by this infinite-dimensional abelian group. Where the space is not simply connected, the quotient retains global information — the Aharonov-Bohm phase, ∮A·dl, is gauge invariant even in a region where F = 0, and it is measurable. That is the sharpest statement that A is more than bookkeeping.</p>
            <details><summary>Full derivation: gauge fixing and the wave equation</summary>
            <p><strong>Gauge fixing.</strong> Substituting F = dA into ∂<sub>μ</sub>F<sup>μν</sup> = (4π/c)J<sup>ν</sup> gives □A<sup>ν</sup> − ∂<sup>ν</sup>(∂<sub>μ</sub>A<sup>μ</sup>) = (4π/c)J<sup>ν</sup>. Imposing the <strong>Lorenz condition</strong> ∂<sub>μ</sub>A<sup>μ</sup> = 0 (always achievable: solving for χ requires solving □χ = −∂·A, an inhomogeneous wave equation) decouples the components into four scalar wave equations:</p>
            </details>
            <pre><code>□ A^ν ≡ ( (1/c²)∂²/∂t² − ∇² ) A^ν = (4π/c) J^ν</code></pre>
            <p>This is Lorentz covariant and the residual gauge freedom is χ with □χ = 0. The alternative <strong>Coulomb gauge</strong> ∇·A = 0 makes φ satisfy an instantaneous Poisson equation — convenient for bound-state problems, but it breaks manifest covariance and makes the apparent action-at-a-distance in φ cancel against a compensating term in A. Neither gauge is more "true"; the physics is in the equivalence class.</p>
            <p>Solving □A = source with retarded boundary conditions gives the retarded Green function, G<sub>ret</sub>(x−x') ∝ δ(t − t' − |x−x'|/c)/|x−x'|, whose support on the past light cone is the statement that electromagnetic influence propagates at exactly c. That Green function is the input to the radiation lesson later in this chapter.</p>
            <p><strong>Further reading:</strong> Jackson, <em>Classical Electrodynamics</em>, 3rd ed., §6.2 (vector and scalar potentials), §6.3 (gauge transformations, Lorenz gauge, Coulomb gauge), §6.4 (Green functions for the wave equation), and §6.5 (retarded solutions for the fields). Pages vary by edition; see §6.2-6.5.</p>
          `,
          exercises: [
            "Show explicitly that the Lorenz gauge condition can always be reached, i.e. that given any Aᵘ there exists χ with ∂ᵤ(Aᵘ + ∂ᵘχ) = 0, and characterize the residual gauge freedom. Then show that in Coulomb gauge the scalar potential satisfies ∇²φ = −4πρ instantaneously, and explain in detail why this does not imply superluminal signalling by exhibiting the cancellation in E = −∇φ − (1/c)∂A/∂t.",
            "Construct the retarded and advanced Green functions of the d'Alembertian in 3+1 dimensions by contour integration of the Fourier representation, verify their supports, and then show that in 2+1 dimensions the Green function has support on the entire interior of the light cone rather than on its surface. Comment on what this says about the propagation of sharp signals in even spatial dimensions (Huygens' principle)."
          ]
        },
        {
          id: "phys-em-lagrangian",
          title: "Lagrangian Formulation of Electrodynamics",
          section: "Electrodynamics",
          prerequisites: ["phys-gauge-invariance", "phys-euler-lagrange"],
          estMinutes: 30,
          content: `
            <p>Chapters 1 and 2 built a variational formalism for finitely many degrees of freedom. Electrodynamics is the first field theory in this curriculum, and it shows that the same formalism carries over verbatim once "generalized coordinates indexed by i" becomes "field values indexed by a spacetime point".</p>
            <p><strong>A charge in an external field.</strong> The Lagrangian</p>
            <pre><code>L = −mc²/γ − qφ + (q/c) v·A</code></pre>
            <p>reproduces the Lorentz force. The conjugate momentum is <em>not</em> the kinetic momentum: p = γmv + (q/c)A, so the Hamiltonian is H = √(m²c⁴ + |cp − qA|²) + qφ. That "minimal substitution" p → p − (q/c)A is what will be quantized in Chapter 5, and gauge invariance of the dynamics corresponds to the wavefunction acquiring a position-dependent phase.</p>
            <p><strong>The field itself.</strong> For fields, the action is the spacetime integral of a Lagrangian density 𝓛(A<sub>μ</sub>, ∂<sub>ν</sub>A<sub>μ</sub>), and stationarity gives the field Euler-Lagrange equations</p>
            <pre><code>∂_ν ( ∂𝓛 / ∂(∂_ν A_μ) ) − ∂𝓛/∂A_μ = 0
𝓛 = −(1/16π) F_{μν}F^{μν} − (1/c) J^μ A_μ    ⟹    ∂_ν F^{νμ} = (4π/c) J^μ</code></pre>
            <p>Two remarks that carry a lot of weight. First, 𝓛 is essentially forced: it must be a Lorentz scalar, gauge invariant, and quadratic in derivatives, and F<sub>μν</sub>F<sup>μν</sup> is the only such candidate (the pseudoscalar F F̃ is a total derivative and contributes nothing classically). Second, adding a mass term m²A<sub>μ</sub>A<sup>μ</sup> — the Proca Lagrangian — is Lorentz invariant but destroys gauge invariance, and gives the photon a mass with a Yukawa-suppressed Coulomb law. Experimental bounds on that suppression are how the photon mass is constrained.</p>
            <details><summary>Full derivation: the stress-energy tensor from Noether's theorem</summary>
            <p>Applying Noether's theorem to spacetime translations gives the stress-energy tensor T<sup>μν</sup>, whose components are the energy density (|E|²+|B|²)/8π, the Poynting vector S = (c/4π)E×B, and the Maxwell stress tensor; ∂<sub>μ</sub>T<sup>μν</sup> = 0 in vacuum is local energy-momentum conservation, and with sources it becomes the statement that the field exchanges momentum with matter via the Lorentz force. Symmetry has produced conservation laws once again, exactly as in Chapter 1.</p>
            </details>
            <p><strong>Further reading:</strong> Jackson, <em>Classical Electrodynamics</em>, 3rd ed., §12.1 (Lagrangian and Hamiltonian for a relativistic charged particle in external fields), §12.7 (Lagrangian for the electromagnetic field), §12.8 (Proca Lagrangian, photon mass effects), and §12.10 (the stress-energy tensor). Poynting's theorem in the non-covariant form is §6.7. Pages vary by edition; see §12.1, §12.7-12.10.</p>
          `,
          exercises: [
            "Starting from L = −mc²/γ − qφ + (q/c)v·A, derive the Lorentz force law in three-vector form via the Euler-Lagrange equations, being careful to distinguish ∂A/∂t from dA/dt. Then show that the Lagrangian changes by a total time derivative under a gauge transformation, and deduce that the equations of motion are gauge invariant while the canonical momentum is not.",
            "Derive the canonical stress-energy tensor of the free electromagnetic field by applying Noether's theorem to spacetime translations of 𝓛 = −(1/16π)F_{μν}F^{μν}. Show it is neither symmetric nor gauge invariant, then construct an improvement term (a Belinfante-type correction of the form ∂_λ χ^{λμν} with χ antisymmetric in λ,μ) that makes it both, and verify that the improved tensor has the expected energy density and Poynting flux."
          ]
        },
        {
          id: "phys-larmor-radiation",
          title: "Liénard-Wiechert Fields and Larmor's Formula",
          section: "Radiation",
          prerequisites: ["phys-em-lagrangian", "phys-four-momentum"],
          estMinutes: 35,
          content: `
            <p>The retarded Green function of the gauge lesson, applied to a point charge in arbitrary motion, gives closed-form potentials; differentiating them separates the field into a piece that falls off as 1/R<sup>2</sup> and carries no energy to infinity, and a piece that falls off as 1/R and does. That second piece is radiation, and its existence is the reason accelerated charges lose energy.</p>
            <p><strong>Liénard-Wiechert potentials.</strong> For a charge q on a trajectory r(t) with velocity β = v/c, evaluated at the retarded time t<sub>ret</sub> defined implicitly by t<sub>ret</sub> = t − R(t<sub>ret</sub>)/c:</p>
            <pre><code>φ(x,t) = [ q / ( (1 − n̂·β) R ) ]_ret ,    A(x,t) = [ q β / ( (1 − n̂·β) R ) ]_ret</code></pre>
            <p>The factor (1 − n̂·β)<sup>−1</sup> comes from the Jacobian of the retarded-time condition, not from any physical "compression", and it is responsible for the extreme forward beaming of relativistic radiation. Differentiating gives a field with two terms:</p>
            <pre><code>E = q [ (n̂ − β)/(γ²(1−n̂·β)³R²) ]_ret  +  (q/c)[ n̂ × ((n̂ − β) × β̇) / ((1−n̂·β)³ R) ]_ret</code></pre>
            <details><summary>Full derivation: separating the velocity and acceleration fields</summary>
            <p>The first (velocity field) is the boosted Coulomb field; it is ∝ R<sup>−2</sup>, so the flux through a large sphere vanishes as R → ∞. The second (acceleration field) is ∝ R<sup>−1</sup> and linear in β̇, so its contribution to the Poynting flux survives at infinity: <em>only accelerated charges radiate</em>.</p>
            </details>
            <p><strong>Larmor's formula.</strong> In the instantaneous rest frame, integrating |S| over the sphere gives P = 2q²|a|²/3c³, with the characteristic sin²Θ angular pattern about the acceleration direction. Because P is the rate of energy loss and dU/dτ is a Lorentz scalar (the time component of a four-vector contracted appropriately), the relativistic generalization is fixed by covariance:</p>
            <pre><code>P = (2q²/3c³) γ⁶ ( |β̇|² − |β × β̇|² )     (Liénard)</code></pre>
            <p>The γ<sup>6</sup> is why synchrotron losses dominate in circular electron accelerators and why linear colliders are preferred at high energy: for a given applied force, the radiated power scales as γ<sup>4</sup> for transverse acceleration but only as γ<sup>0</sup> for longitudinal.</p>
            <p>This is the classical closing of the loop that motivates Chapter 4: an electron orbiting a nucleus is accelerating, and Larmor's formula predicts it spirals in within about 10<sup>−11</sup> seconds. Classical electrodynamics, taken seriously, forbids atoms.</p>
            <p><strong>Further reading:</strong> Jackson, <em>Classical Electrodynamics</em>, 3rd ed., §14.1 (Liénard-Wiechert potentials and fields for a point charge), §14.2 (total power radiated: Larmor's formula and its relativistic generalization), §14.3 (angular distribution of radiation emitted by an accelerated charge), and §14.4 for the extreme-relativistic case. Pages vary by edition; see §14.1-14.4. For the multipole expansion of a bounded oscillating source, §9.1-9.3.</p>
          `,
          exercises: [
            "Derive the Liénard-Wiechert potentials by evaluating the retarded integral for a point source ρ(x,t) = q δ³(x − r(t)), being explicit about the Jacobian factor arising from the delta function composed with the retarded-time condition. Then verify that in the limit β → 0 you recover the instantaneous Coulomb and Biot-Savart forms.",
            "Compute the angular distribution dP/dΩ of radiation for (a) acceleration parallel to velocity and (b) acceleration perpendicular to velocity, and find in each case the angle of maximum intensity as a function of γ. Show that for γ ≫ 1 the radiation is confined to a cone of half-angle ≈ 1/γ, and use this to estimate the fraction of a synchrotron's total power that a fixed detector in the orbital plane receives per turn."
          ]
        }
      ]
    },
    {
      id: "quantum-formalism",
      name: "Quantum Mechanics I — Formalism",
      lessons: [
        {
          id: "phys-quantum-postulates",
          title: "States, Observables, and the Measurement Postulates",
          section: "Foundations",
          prerequisites: ["phys-larmor-radiation"],
          estMinutes: 30,
          content: `
            <p>Quantum mechanics is not a modification of classical mechanics; it is a different mathematical framework in which classical mechanics appears as a limit. For a reader comfortable with functional analysis the axioms are short, and the strangeness is entirely in their interpretation, not in their statement.</p>
            <p><strong>The axioms.</strong> (1) The states of a system are the unit rays of a complex separable Hilbert space ℋ — vectors ψ with ‖ψ‖ = 1, identified when they differ by a phase. (2) Observables are self-adjoint operators A on ℋ (generally unbounded, with a specified domain). (3) The possible outcomes of measuring A are the points of its spectrum σ(A), and the expected value in state ψ is ⟨ψ, Aψ⟩. (4) Given a measurement yielding a value in a Borel set S, the post-measurement state is P<sup>A</sup>(S)ψ / ‖P<sup>A</sup>(S)ψ‖ where P<sup>A</sup> is A's projection-valued measure. (5) Time evolution is by a strongly continuous one-parameter unitary group.</p>
            <pre><code>state:        ψ ∈ ℋ,  ‖ψ‖ = 1,   ψ ~ e^{iθ}ψ
observable:   A = A†  (self-adjoint, domain D(A))
statistics:   ⟨A⟩_ψ = ⟨ψ, Aψ⟩,   Prob(A ∈ S) = ‖P^A(S) ψ‖²
composite:    ℋ_AB = ℋ_A ⊗ ℋ_B</code></pre>
            <details><summary>Full detail: self-adjoint versus merely symmetric</summary>
            <p><strong>Why self-adjoint and not merely symmetric.</strong> This is a distinction with real physical content, not pedantry. The spectral theorem — which is what licenses axioms (3) and (4) — holds for self-adjoint operators, not for symmetric ones. A symmetric operator with unequal deficiency indices has no self-adjoint extension and defines no observable; with equal indices it has a family of extensions, each a genuinely different physical system. The momentum operator −iħ d/dx on an interval is the standard example: the choice of self-adjoint extension is the choice of boundary condition, and different extensions have different spectra.</p>
            </details>
            <p><strong>The tensor product axiom</strong> is where quantum mechanics departs irrevocably from classical probability. Classically, the state space of a composite system is a product of sets, and a joint probability distribution that is not a product corresponds to correlation. Quantum mechanically the state space is a tensor product of Hilbert spaces, whose dimension is the product of dimensions rather than the sum; the states that are not simple tensors are <strong>entangled</strong>, and their correlations violate Bell inequalities that no classical joint distribution can violate.</p>
            <p>The dictionary to the previous chapters: Chapter 2 gave observables as functions on phase space with a Poisson bracket; here they are operators with a commutator. The quantization map {·,·} ↦ (iħ)<sup>−1</sup>[·,·] is the whole of the correspondence, and its obstructions (Groenewold-van Hove) are why quantization is an art rather than a functor.</p>
            <p><strong>Further reading:</strong> Sakurai &amp; Napolitano, <em>Modern Quantum Mechanics</em>, 2nd ed. (Addison-Wesley, 2011), §1.2 (kets, bras, and operators), §1.3 (base kets and matrix representations), and §1.4 (measurements, observables, and the uncertainty relations). Pages vary by edition; see §1.2-1.4. For the functional-analytic care that Sakurai deliberately omits, B. C. Hall, <em>Quantum Theory for Mathematicians</em> (Springer GTM 267, 2013), Ch. 3 and Ch. 9-10 (unbounded operators, self-adjointness, the spectral theorem).</p>
          `,
          exercises: [
            "Let A = −i d/dx on the interval [0,1] with domain the smooth functions vanishing at both endpoints. Show A is symmetric but not self-adjoint, compute its deficiency indices, and classify all self-adjoint extensions. Show that the extensions are parametrized by a phase e^{iα} (boundary condition ψ(1) = e^{iα}ψ(0)) and compute the spectrum of each, exhibiting explicitly how the physics depends on the choice.",
            "Prove that a state ψ ∈ ℋ_A ⊗ ℋ_B is a simple tensor if and only if its reduced density matrix ρ_A = Tr_B|ψ⟩⟨ψ| is a rank-one projection. Then compute the reduced density matrix and its von Neumann entropy for the family of states cos θ |0⟩⊗|0⟩ + sin θ |1⟩⊗|1⟩, and identify the value of θ maximizing entanglement."
          ]
        },
        {
          id: "phys-canonical-commutation",
          title: "Translations, the Canonical Commutator, and Wave Functions",
          section: "Foundations",
          prerequisites: ["phys-quantum-postulates"],
          estMinutes: 30,
          content: `
            <p>The abstract axioms of the previous lesson say nothing about position and momentum. This lesson derives the canonical commutation relation from the requirement that translations act as a unitary representation, which is both the cleanest logic and the one that generalizes to every other symmetry in Chapter 5.</p>
            <p><strong>Translations.</strong> Demand a strongly continuous unitary representation of the translation group, 𝒯(a) with 𝒯(a)𝒯(b) = 𝒯(a+b), acting on position eigenstates by 𝒯(a)|x⟩ = |x+a⟩. By Stone's theorem there is a unique self-adjoint generator; call it p/ħ:</p>
            <pre><code>𝒯(a) = exp( −i a·p / ħ )
[xⁱ, p_j] = iħ δⁱ_j ,   [xⁱ, xʲ] = [p_i, p_j] = 0</code></pre>
            <p>The commutator follows by expanding 𝒯(a)<sup>†</sup>x𝒯(a) = x + a to first order. Notice the structure: this is exactly the Poisson bracket {x<sup>i</sup>, p<sub>j</sub>} = δ<sup>i</sup><sub>j</sub> of Chapter 2 with {·,·} → [·,·]/iħ, and the statement "momentum generates translations" is the same in both theories. Momentum is <em>defined</em> as the generator of translations; that it also equals mv is a fact about a particular Hamiltonian, not a definition.</p>
            <details><summary>Full derivation: unboundedness and Stone-von Neumann</summary>
            <p><strong>Consequences.</strong> The relation [x,p] = iħ cannot be realized by bounded operators (take traces of both sides on a finite-dimensional space to get 0 = iħ·dim, a contradiction), so ℋ must be infinite dimensional and x, p unbounded. The <strong>Stone-von Neumann theorem</strong> says that up to unitary equivalence there is exactly one irreducible representation of the Weyl (exponentiated) form of these relations on a separable Hilbert space. This is why "the" Schrödinger representation is canonical and why the position and momentum pictures are guaranteed equivalent.</p>
            </details>
            <p><strong>Wave functions.</strong> In that representation ℋ = L²(ℝ<sup>3</sup>), ψ(x) = ⟨x|ψ⟩, x acts by multiplication and p acts as −iħ∇. The momentum-space wave function is the Fourier transform, which is exactly the unitary intertwining the two spectral representations. Both x and p have purely continuous spectrum and no eigenvectors in ℋ; |x⟩ and |p⟩ are distributions, elements of a rigged Hilbert space, and the sums over eigenstates in physics texts are integrals against a spectral measure.</p>
            <p><strong>Further reading:</strong> Sakurai &amp; Napolitano, <em>Modern Quantum Mechanics</em>, 2nd ed., §1.6 (position, momentum, and translation — the derivation of the commutator from translation invariance) and §1.7 (wave functions in position and momentum space). Pages vary by edition; see §1.6-1.7. For Stone-von Neumann and rigged Hilbert spaces, Hall, <em>Quantum Theory for Mathematicians</em>, Ch. 14.</p>
          `,
          exercises: [
            "Prove that no pair of bounded operators on a Hilbert space satisfies [x,p] = iħI. Then show that if x and p are self-adjoint and satisfy the relation on a common dense invariant domain, the Weyl relations e^{iax}e^{ibp} = e^{−iabħ}e^{ibp}e^{iax} need not follow, and describe (without full proof) Nelson's counterexample.",
            "Derive the momentum-space form of the Schrödinger equation for a particle in a linear potential V(x) = Fx, note that the equation becomes first order in p, solve it exactly, and transform back to obtain the position-space propagator. Verify the classical limit by computing ⟨x⟩(t) and comparing with the classical trajectory."
          ]
        },
        {
          id: "phys-uncertainty",
          title: "The Uncertainty Relation as a Theorem",
          section: "Foundations",
          prerequisites: ["phys-canonical-commutation"],
          estMinutes: 25,
          content: `
            <p>The uncertainty principle is often mis-taught as a statement about measurement disturbance. It is in fact a theorem about the statistics of two noncommuting observables in a single state — no measurement need occur at all — and its proof is Cauchy-Schwarz.</p>
            <p><strong>Statement and proof.</strong> Let A, B be self-adjoint, ψ a state in the domain of the relevant products, and write ΔA = A − ⟨A⟩. Then</p>
            <pre><code>(ΔA)²_ψ (ΔB)²_ψ  ≥  ¼ |⟨ [A,B] ⟩_ψ|² + ¼ |⟨ {ΔA, ΔB} ⟩_ψ|²
so in particular   σ_A σ_B ≥ ½ |⟨[A,B]⟩|
and for x, p:      σ_x σ_p ≥ ħ/2</code></pre>
            <details><summary>Full derivation (proof)</summary>
            <p>Proof: apply Cauchy-Schwarz to the vectors ΔAψ and ΔBψ, then split ⟨ΔA ΔB⟩ into its anti-Hermitian part (half the commutator, purely imaginary) and Hermitian part (half the anticommutator, real). Dropping the anticommutator term gives the familiar form; keeping it gives the sharper Schrödinger inequality.</p>
            </details>
            <p><strong>What it does and does not say.</strong> It bounds the product of the standard deviations of the outcome distributions of A and B, each measured on its own ensemble of identically prepared systems. It says nothing directly about the disturbance one measurement inflicts on another — that is a separate (and more delicate) family of results. Equality holds iff ΔAψ = λΔBψ with λ purely imaginary; for x and p this is a first-order ODE whose solutions are the Gaussian wave packets, which is why coherent states are called minimum-uncertainty states.</p>
            <p><strong>Structural significance.</strong> The bound depends on the state through ⟨[A,B]⟩, so it is vacuous when that expectation vanishes. For x and p the commutator is a nonzero constant, which is what makes the bound universal, and which in turn is the reason there is a ground state at all: confining a particle to width L forces momentum spread ≳ ħ/L and kinetic energy ≳ ħ²/2mL², so shrinking the wavefunction costs more energy than an attractive potential can recoup. That competition is the quantitative explanation for the stability of atoms that classical electrodynamics could not provide at the end of Chapter 3, and it will give the correct scale of the hydrogen ground-state energy by pure dimensional reasoning.</p>
            <p><strong>Further reading:</strong> Sakurai &amp; Napolitano, <em>Modern Quantum Mechanics</em>, 2nd ed., §1.4 (measurements, observables, and the uncertainty relations) — the derivation there is the Cauchy-Schwarz argument above. Pages vary by edition; see §1.4. Shankar, <em>Principles of Quantum Mechanics</em>, 2nd ed., Ch. 9 gives an extended discussion of the physical interpretation and common misreadings.</p>
          `,
          exercises: [
            "Prove the Schrödinger form of the uncertainty relation including the anticommutator term, and determine the full set of states saturating it for A = x, B = p. Show these are exactly the Gaussians with a possibly complex width parameter, and interpret the imaginary part of that parameter physically.",
            "Use the uncertainty relation to derive a rigorous lower bound on the ground state energy of the hydrogen Hamiltonian H = p²/2m − e²/r, by bounding ⟨1/r⟩ in terms of ⟨p²⟩ (you will need a Sobolev-type inequality or a careful use of ⟨1/r⟩ ≤ ⟨1/r²⟩^{1/2}). Compare your bound to the exact value −13.6 eV and comment on how much is lost at each step."
          ]
        },
        {
          id: "phys-schrodinger-evolution",
          title: "Unitary Dynamics and the Schrödinger Equation",
          section: "Dynamics",
          prerequisites: ["phys-quantum-postulates", "phys-hamilton-equations"],
          estMinutes: 30,
          content: `
            <p>The last axiom of the formalism concerns time. Requiring that time evolution preserve probabilities (Wigner) and compose as a group forces it to be a strongly continuous one-parameter unitary group, and Stone's theorem then produces the Hamiltonian and the Schrödinger equation with no further input.</p>
            <pre><code>U(t) = exp( −iHt/ħ )    (H time-independent, self-adjoint)
iħ ∂|ψ(t)⟩/∂t = H |ψ(t)⟩          (Schrödinger picture)
dA_H/dt = (1/iħ)[A_H, H] + ∂A_H/∂t  (Heisenberg picture)</code></pre>
            <details><summary>Full derivation: the Heisenberg picture and Ehrenfest's theorem</summary>
            <p><strong>Two pictures.</strong> Because only matrix elements ⟨φ|A|ψ⟩ are physical, one may put the time dependence in the states (Schrödinger) or, by moving U(t) onto the operators via A<sub>H</sub>(t) = U<sup>†</sup>AU, in the observables (Heisenberg). The Heisenberg equation of motion is visibly the Chapter 2 formula dF/dt = {F,H} + ∂F/∂t with the bracket replaced by the commutator over iħ — the deepest formal statement of the classical correspondence. <strong>Ehrenfest's theorem</strong> makes it quantitative: d⟨x⟩/dt = ⟨p⟩/m and d⟨p⟩/dt = −⟨∇V⟩. Note the expectation is of ∇V, not ∇V of the expectation; the two agree only when V is at most quadratic or the packet is narrow, and that discrepancy is exactly where quantum corrections live.</p>
            </details>
            <p><strong>Solving it.</strong> For time-independent H, expanding in a spectral basis reduces the problem to the eigenvalue equation H|n⟩ = E<sub>n</sub>|n⟩ (the "time-independent Schrödinger equation"). In the position representation for a single particle this is</p>
            <pre><code>−(ħ²/2m) ∇²ψ + V(x) ψ = E ψ</code></pre>
            <p>an elliptic eigenvalue problem. The spectral theory is genuinely delicate and rewarding for this reader: discrete spectrum below the essential spectrum corresponds to bound states, continuous spectrum to scattering states, and the essential spectrum is stable under relatively compact perturbations (Weyl's theorem). Self-adjointness of −Δ + V is not automatic and is the content of the Kato-Rellich theorem for a wide class of physical potentials, including the Coulomb singularity.</p>
            <p>Superposition plus unitarity means an initial state that is a sum of energy eigenstates develops relative phases e<sup>−iE<sub>n</sub>t/ħ</sup>, and interference between them is what produces all nontrivial time dependence. When the E<sub>n</sub> are incommensurate, the motion is quasi-periodic on a torus, which is the quantum echo of the Liouville-Arnold picture in Chapter 2.</p>
            <p><strong>Further reading:</strong> Sakurai &amp; Napolitano, <em>Modern Quantum Mechanics</em>, 2nd ed., §2.1 (time evolution and the Schrödinger equation), §2.2 (Schrödinger versus Heisenberg picture, including Ehrenfest's theorem), §2.4-2.5 (Schrödinger's wave equation and elementary solutions). Pages vary by edition; see §2.1-2.5. For Kato-Rellich and the spectral theory of Schrödinger operators, Reed &amp; Simon, <em>Methods of Modern Mathematical Physics II</em>, Ch. X.</p>
          `,
          exercises: [
            "Prove Stone's theorem in one direction: if U(t) is a strongly continuous one-parameter unitary group, then A ψ = lim_{t→0} (U(t)ψ − ψ)/(it) exists on a dense domain and defines a self-adjoint operator with U(t) = e^{iAt}. Then show how Wigner's theorem plus the group law together force the evolution to have this form.",
            "Solve the Heisenberg equations of motion exactly for the harmonic oscillator, obtaining x_H(t) and p_H(t) as explicit linear combinations of x(0) and p(0). Use them to compute the equal-time and unequal-time commutators [x_H(t), x_H(t')] and comment on why the result is a c-number. Then verify Ehrenfest's theorem holds exactly for this system and explain why."
          ]
        },
        {
          id: "phys-harmonic-oscillator",
          title: "The Harmonic Oscillator by Ladder Operators",
          section: "Dynamics",
          prerequisites: ["phys-schrodinger-evolution"],
          estMinutes: 30,
          content: `
            <p>The harmonic oscillator is the one nontrivial system solvable by pure algebra, and it deserves careful attention not because oscillators are common (though after Chapter 1's normal-mode lesson we know they are) but because the algebraic method is the template for angular momentum, for the quantized electromagnetic field, and for every free field theory.</p>
            <p>Start from H = p²/2m + ½mω²x² with [x,p] = iħ. Define</p>
            <pre><code>a = √(mω/2ħ) ( x + i p/(mω) ),    a† = √(mω/2ħ) ( x − i p/(mω) )
[a, a†] = 1,     H = ħω ( a†a + ½ ),     N = a†a</code></pre>
            <details><summary>Full derivation: the ladder argument</summary>
            <p><strong>The algebraic solution.</strong> From [N, a] = −a and [N, a<sup>†</sup>] = +a<sup>†</sup>, if |n⟩ is an eigenvector of N with eigenvalue n then a|n⟩ and a<sup>†</sup>|n⟩ are eigenvectors with n∓1. Since N = a<sup>†</sup>a is positive semidefinite, ⟨n|N|n⟩ = ‖a|n⟩‖² ≥ 0, the lowering chain must terminate: there is a |0⟩ with a|0⟩ = 0, and n ∈ {0,1,2,…}. Normalizing gives a<sup>†</sup>|n⟩ = √(n+1)|n+1⟩ and a|n⟩ = √n|n−1⟩, so</p>
            </details>
            <pre><code>E_n = ħω(n + ½),    |n⟩ = (a†)ⁿ|0⟩/√(n!)</code></pre>
            <p>No differential equation was solved. The spectrum is nondegenerate, equally spaced, and possesses an irreducible zero-point energy ħω/2 that is forced by the uncertainty relation of two lessons ago. Solving a|0⟩ = 0 in the position representation is a first-order ODE whose solution is the Gaussian ground state; the excited states are Hermite functions, which one gets by applying a<sup>†</sup> repeatedly rather than by consulting a table of special functions.</p>
            <p><strong>Why this matters downstream.</strong> Reinterpreting n as a <em>number of quanta</em> rather than a quantum number turns this single oscillator into the state space of a mode of a field: a<sup>†</sup> creates a photon, a destroys one, and the electromagnetic field is a direct sum over modes of exactly this structure. The normal-mode analysis of Chapter 1 says any system near a stable equilibrium decouples into independent oscillators; quantizing each one is therefore the universal first approximation to any interacting system, and the deviations are what perturbation theory in Chapter 5 computes.</p>
            <p>The coherent states — eigenvectors of the non-self-adjoint a — form an overcomplete family of minimum-uncertainty Gaussians whose centroids follow the classical trajectory exactly, providing the most explicit realization of the classical limit anywhere in the theory.</p>
            <p><strong>Further reading:</strong> Sakurai &amp; Napolitano, <em>Modern Quantum Mechanics</em>, 2nd ed., §2.3 (simple harmonic oscillator) — the ladder-operator treatment plus coherent states. Pages vary by edition; see §2.3. Shankar, <em>Principles of Quantum Mechanics</em>, 2nd ed., Ch. 7 works the same problem both algebraically and analytically, which is worth seeing side by side.</p>
          `,
          exercises: [
            "Prove that the number operator N = a†a has spectrum exactly {0,1,2,…} with each eigenvalue simple, being careful to justify (i) that the lowering chain terminates, (ii) that no non-integer eigenvalue can exist, and (iii) that the eigenvectors are complete in L²(ℝ). For (iii) you may use the fact that the Hermite functions form an orthonormal basis, but state where completeness is genuinely needed.",
            "Define the coherent state |α⟩ = e^{−|α|²/2} Σ_n (αⁿ/√n!)|n⟩ for α ∈ ℂ. Show a|α⟩ = α|α⟩, compute ⟨x⟩, ⟨p⟩, σ_x, σ_p in this state, and show it saturates the uncertainty bound. Then show that under time evolution |α⟩ remains coherent with α(t) = α e^{−iωt}, and that ⟨x⟩(t) follows the classical trajectory exactly."
          ]
        }
      ]
    },
    {
      id: "quantum-symmetry",
      name: "Quantum Mechanics II — Structure & Symmetry",
      lessons: [
        {
          id: "phys-angular-momentum",
          title: "The Angular Momentum Algebra and Its Representations",
          section: "Symmetry & Spin",
          prerequisites: ["phys-poisson-brackets", "phys-canonical-commutation"],
          estMinutes: 40,
          content: `
            <p>The oscillator was solved by exploiting a Lie algebra with one raising and one lowering operator. Angular momentum is the same story for su(2), and because rotations are a symmetry of every isotropic system, the resulting representation theory organizes the spectrum of essentially every atom, nucleus, and molecule.</p>
            <p><strong>The algebra from the group.</strong> Exactly as momentum was defined as the generator of translations, define J as the generator of rotations: 𝒟(R(n̂,φ)) = exp(−i φ n̂·J/ħ). Composing infinitesimal rotations about different axes and comparing with the SO(3) group law forces</p>
            <pre><code>[J_i, J_j] = iħ ε_{ijk} J_k ,      [J², J_i] = 0
J_± = J_x ± i J_y ,   [J_z, J_±] = ±ħ J_± ,  [J_+, J_-] = 2ħ J_z</code></pre>
            <details><summary>Full derivation: the ladder argument for su(2)</summary>
            <p><strong>Representations.</strong> Since J² is a Casimir it can be diagonalized simultaneously with J<sub>z</sub>. Write the joint eigenvalues as ħ²j(j+1) and ħm. The ladder argument runs as in the oscillator but terminates at <em>both</em> ends, because ⟨J²−J<sub>z</sub>²⟩ = ⟨J<sub>x</sub>²+J<sub>y</sub>²⟩ ≥ 0 bounds m. Termination at both ends forces j<sub>max</sub> − j<sub>min</sub> to be a nonnegative integer, giving</p>
            </details>
            <pre><code>j ∈ {0, ½, 1, 3/2, …},   m ∈ {−j, −j+1, …, j},   dim = 2j+1
J_± |j,m⟩ = ħ √( j(j+1) − m(m±1) ) |j, m±1⟩</code></pre>
            <p><strong>Half-integers and the double cover.</strong> The algebra permits half-integer j, but a rotation by 2π then acts as −1 rather than +1. This is not a contradiction: states are rays, so a sign is unobservable in isolation, and the resolution is that quantum mechanics carries a representation of SU(2), the simply connected double cover of SO(3), rather than of SO(3) itself. Orbital angular momentum L = x × p acts on L²(S²) and, by single-valuedness of wavefunctions on the sphere, admits only integer ℓ, with eigenfunctions the spherical harmonics. Half-integer j is therefore necessarily an internal degree of freedom with no wavefunction realization — this is <strong>spin</strong>, and its existence is a theorem about the topology of the rotation group rather than an empirical add-on.</p>
            <p>Everything here is the quantum image of the Chapter 2 result {L<sub>i</sub>,L<sub>j</sub>} = ε<sub>ijk</sub>L<sub>k</sub>. The classical bracket algebra so(3) and the quantum commutator algebra are the same Lie algebra; what is new is that quantum mechanics uses projective representations, which is what admits the double cover.</p>
            <p><strong>Further reading:</strong> Sakurai &amp; Napolitano, <em>Modern Quantum Mechanics</em>, 2nd ed., §3.1 (rotations and angular momentum commutation relations), §3.3 (SO(3), SU(2), and Euler rotations), §3.5 (eigenvalues and eigenstates of angular momentum), and §3.6 (orbital angular momentum). Pages vary by edition; see §3.1-3.6.</p>
          `,
          exercises: [
            "Carry out the ladder argument in full: assuming only [J_i,J_j] = iħε_{ijk}J_k and finite-dimensionality of an irreducible invariant subspace, prove that the eigenvalue of J² has the form ħ²j(j+1) with 2j a nonnegative integer, and derive the normalization coefficients of J_± acting on |j,m⟩. Identify exactly where finite-dimensionality is used.",
            "Show that orbital angular momentum admits only integer ℓ, by two independent routes: (a) demanding single-valuedness of e^{imφ} on the circle, and (b) showing that the raising operator applied to the candidate ℓ = ½ 'wavefunction' produces a non-normalizable state. Then explain why route (a) is often criticized as insufficient and what (b) adds."
          ]
        },
        {
          id: "phys-spin-half",
          title: "Spin-1/2, SU(2), and Two-Level Systems",
          section: "Symmetry & Spin",
          prerequisites: ["phys-angular-momentum"],
          estMinutes: 30,
          content: `
            <p>The j = 1/2 representation is two-dimensional and is the smallest nontrivial quantum system. Every qubit, every NMR experiment, and every discussion of measurement and entanglement lives here, so it is worth having completely explicit.</p>
            <p>On ℋ = ℂ², take S = (ħ/2)σ with the Pauli matrices</p>
            <pre><code>σ_x = [[0,1],[1,0]],  σ_y = [[0,−i],[i,0]],  σ_z = [[1,0],[0,−1]]
σ_i σ_j = δ_{ij} I + i ε_{ijk} σ_k    (the key identity)
exp(−i φ n̂·σ/2) = cos(φ/2) I − i sin(φ/2) (n̂·σ)</code></pre>
            <p>The last formula displays the double cover concretely: φ = 2π gives −I, and only φ = 4π returns the identity. A physical consequence is measurable: in a neutron interferometer, rotating one arm by 2π reverses the relative sign and shifts the interference fringes.</p>
            <details><summary>Full detail: the Bloch sphere and the Hopf fibration</summary>
            <p><strong>Geometry.</strong> A general pure state α|↑⟩ + β|↓⟩ with |α|²+|β|² = 1, modulo phase, is a point of ℂP<sup>1</sup> ≅ S², the <strong>Bloch sphere</strong>, with coordinates n̂ = ⟨σ⟩. Mixed states fill the interior ball, with ρ = ½(I + r·σ), |r| ≤ 1, and |r| = 1 exactly for pure states. The Hopf fibration S<sup>3</sup> → S<sup>2</sup> is literally the map from normalized state vectors to Bloch vectors, with the U(1) fibre being the unobservable phase — a nice place for a topologist to get purchase on quantum kinematics.</p>
            </details>
            <p><strong>Dynamics.</strong> In a uniform magnetic field, H = −γ B·S generates precession of ⟨S⟩ about B at the Larmor frequency ω = γ|B|, with the Heisenberg equations reproducing exactly the classical precession equation for the expectation values. Because the spin is 1/2, however, a measurement of any component yields only ±ħ/2 — the Stern-Gerlach result, and the historical entry point of Sakurai's whole development.</p>
            <p>Two-level systems also carry the geometric phase: adiabatically transporting a spin around a closed loop on the Bloch sphere produces a Berry phase equal to minus half the enclosed solid angle, the holonomy of a natural connection on the tautological bundle over S². That is a differential-geometric statement about quantum mechanics with a directly measurable consequence.</p>
            <p><strong>Further reading:</strong> Sakurai &amp; Napolitano, <em>Modern Quantum Mechanics</em>, 2nd ed., §1.1 (the Stern-Gerlach experiment as motivation), §3.2 (spin 1/2 systems and finite rotations), and §3.4 (density operators and pure versus mixed ensembles). For Berry's phase, §5.6 (Hamiltonians with extreme time dependence). Pages vary by edition; see §3.2-3.4.</p>
          `,
          exercises: [
            "Prove the identity exp(−iφ n̂·σ/2) = cos(φ/2)I − i sin(φ/2)(n̂·σ) directly from the Pauli algebra, and use it to show that the composition of a rotation by π about x̂ with a rotation by π about ŷ equals a rotation by π about ẑ up to a sign. Determine the sign and explain its topological meaning.",
            "A spin-1/2 in a magnetic field B = B₀ẑ + B₁(cos ωt x̂ + sin ωt ŷ) is the standard NMR problem. Transform to the rotating frame, obtain a time-independent effective Hamiltonian, and derive the Rabi formula for the probability of a spin flip as a function of time and detuning. Identify the resonance condition and the on-resonance Rabi frequency."
          ]
        },
        {
          id: "phys-addition-angular-momentum",
          title: "Addition of Angular Momenta and Tensor Operators",
          section: "Symmetry & Spin",
          prerequisites: ["phys-spin-half"],
          estMinutes: 35,
          content: `
            <p>Composite systems carry tensor products of representations, and tensor products of irreducibles are not irreducible. Decomposing them is the Clebsch-Gordan problem, and it is the computational core of atomic and nuclear structure.</p>
            <details><summary>Full derivation: setting up the coupled basis</summary>
            <p><strong>The decomposition.</strong> Two commuting angular momenta J<sub>1</sub>, J<sub>2</sub> give a total J = J<sub>1</sub> ⊗ I + I ⊗ J<sub>2</sub>, still satisfying the su(2) relations. The product basis |j<sub>1</sub>m<sub>1</sub>⟩|j<sub>2</sub>m<sub>2</sub>⟩ diagonalizes J<sub>1</sub><sup>2</sup>, J<sub>2</sub><sup>2</sup>, J<sub>1z</sub>, J<sub>2z</sub>; the coupled basis |j m; j<sub>1</sub>j<sub>2</sub>⟩ diagonalizes J<sub>1</sub><sup>2</sup>, J<sub>2</sub><sup>2</sup>, J<sup>2</sup>, J<sub>z</sub>. The change of basis coefficients are the Clebsch-Gordan coefficients, and the content of the decomposition is</p>
            </details>
            <pre><code>D^{(j₁)} ⊗ D^{(j₂)}  ≅  ⊕_{j = |j₁−j₂|}^{j₁+j₂}  D^{(j)}
dimension check:  (2j₁+1)(2j₂+1) = Σ_j (2j+1)</code></pre>
            <p>The proof is a counting argument on m-eigenvalue multiplicities plus the fact that each irreducible has a unique highest weight; it is the su(2) case of the general highest-weight theory. The canonical example ½ ⊗ ½ = 1 ⊕ 0 splits two spins into the symmetric triplet and the antisymmetric singlet — the same singlet whose correlations violate Bell's inequality.</p>
            <p><strong>Tensor operators and Wigner-Eckart.</strong> An operator set T<sup>(k)</sup><sub>q</sub>, q = −k..k, is a spherical tensor of rank k if it transforms under rotations in the spin-k representation, equivalently if [J<sub>z</sub>, T<sup>(k)</sup><sub>q</sub>] = ħq T<sup>(k)</sup><sub>q</sub> and [J<sub>±</sub>, T<sup>(k)</sup><sub>q</sub>] ∝ T<sup>(k)</sup><sub>q±1</sub>. The <strong>Wigner-Eckart theorem</strong> then states</p>
            <pre><code>⟨ j' m' | T^{(k)}_q | j m ⟩ = ⟨ j m; k q | j' m' ⟩ · ⟨ j' ‖ T^{(k)} ‖ j ⟩ / √(2j+1)</code></pre>
            <p>All the m-dependence is a Clebsch-Gordan coefficient fixed by group theory; the entire dynamical content is one <em>reduced</em> matrix element independent of m, m', q. This is what makes selection rules possible: a matrix element vanishes whenever the CG coefficient does, regardless of the Hamiltonian. For the electric dipole operator (k = 1) this immediately gives Δj = 0, ±1 with j = 0 → j' = 0 forbidden, plus parity constraints — the observed structure of atomic spectra derived from representation theory alone.</p>
            <p><strong>Further reading:</strong> Sakurai &amp; Napolitano, <em>Modern Quantum Mechanics</em>, 2nd ed., §3.8 (addition of angular momenta, Clebsch-Gordan coefficients) and §3.11 (tensor operators, including the Wigner-Eckart theorem and the projection theorem). §3.10 covers the singlet state and Bell's inequality. Pages vary by edition; see §3.8-3.11.</p>
          `,
          exercises: [
            "Construct explicitly the coupled basis for ½ ⊗ 1 by starting from the highest weight state and applying J₋ repeatedly, orthogonalizing at each step. Tabulate all Clebsch-Gordan coefficients you obtain and verify the orthogonality relations. Then verify the dimension count and identify the singlet-like state if one exists.",
            "Prove the Wigner-Eckart theorem for su(2). Then derive the projection theorem as a corollary: for any vector operator V, ⟨j m'|V|j m⟩ = ⟨j‖J·V‖j⟩⟨j m'|J|j m⟩/(ħ²j(j+1)). Apply it to compute the Landé g-factor for an atom with given L, S, J."
          ]
        },
        {
          id: "phys-perturbation-theory",
          title: "Time-Independent Perturbation Theory",
          section: "Approximation Methods",
          prerequisites: ["phys-harmonic-oscillator"],
          estMinutes: 35,
          content: `
            <p>Exactly solvable Hamiltonians are a measure-zero set. Perturbation theory is the systematic asymptotic expansion of eigenvalues and eigenvectors of H = H<sub>0</sub> + λV in powers of λ, and it is worth doing carefully because both its results and its failure modes are structurally important.</p>
            <details><summary>Full derivation: order-by-order matching</summary>
            <p><strong>Nondegenerate case.</strong> Suppose H<sub>0</sub>|n<sup>(0)</sup>⟩ = E<sub>n</sub><sup>(0)</sup>|n<sup>(0)</sup>⟩ with E<sub>n</sub><sup>(0)</sup> simple. Expanding both eigenvalue and eigenvector in powers of λ and matching order by order gives</p>
            </details>
            <pre><code>E_n = E_n⁽⁰⁾ + λ V_{nn} + λ² Σ_{k≠n} |V_{kn}|² / (E_n⁽⁰⁾ − E_k⁽⁰⁾) + O(λ³)
|n⟩ = |n⁽⁰⁾⟩ + λ Σ_{k≠n} |k⁽⁰⁾⟩ V_{kn}/(E_n⁽⁰⁾ − E_k⁽⁰⁾) + O(λ²)
where V_{kn} = ⟨k⁽⁰⁾|V|n⁽⁰⁾⟩</code></pre>
            <p>Two structural facts fall out of the second-order formula. The ground state's second-order shift is always negative (every denominator is negative), so a perturbation always pushes the ground state down. And levels "repel": the second-order interaction between two levels pushes the lower one down and the upper one up, with a magnitude inversely proportional to their separation. That divergence as E<sub>n</sub><sup>(0)</sup> → E<sub>k</sub><sup>(0)</sup> is the signal that the expansion is invalid for degenerate or near-degenerate levels.</p>
            <p><strong>Degenerate case.</strong> If E<sup>(0)</sup> has multiplicity g, the correct zeroth-order states are not arbitrary; they are the eigenvectors of P V P, the perturbation restricted to the degenerate eigenspace. First-order shifts are the eigenvalues of that g×g matrix. This is exactly the small-oscillations diagonalization of Chapter 1 reappearing, and it is the mechanism by which a symmetry-breaking perturbation splits a multiplet — the Zeeman and Stark effects are the canonical examples, and the Wigner-Eckart theorem of the previous lesson tells you the structure of PVP before you compute anything.</p>
            <p><strong>Convergence.</strong> The series is typically asymptotic rather than convergent: for the anharmonic oscillator H = p²/2m + ½mω²x² + λx<sup>4</sup>, the perturbation series has zero radius of convergence, because for λ &lt; 0 the Hamiltonian is unbounded below and has no discrete spectrum at all, so no analytic continuation can exist. Truncating optimally still gives excellent numerics; this is the first appearance of the "asymptotic but not convergent" pattern that dominates quantum field theory.</p>
            <p><strong>Further reading:</strong> Sakurai &amp; Napolitano, <em>Modern Quantum Mechanics</em>, 2nd ed., §5.1 (time-independent perturbation theory: nondegenerate case), §5.2 (degenerate case), §5.3 (hydrogen-like atoms: fine structure and the Zeeman effect), and §5.4 (variational methods). For the time-dependent theory and Fermi's golden rule, §5.5-5.7. Pages vary by edition; see §5.1-5.4. Kato, <em>Perturbation Theory for Linear Operators</em>, Ch. II and VII, is the rigorous reference for analytic perturbation of spectra.</p>
          `,
          exercises: [
            "Derive the second-order energy and first-order state corrections above by explicit order-matching, being careful about the normalization convention you choose (⟨n⁽⁰⁾|n⟩ = 1 versus ⟨n|n⟩ = 1) and showing how the results differ. Then prove that the second-order correction to the ground state energy is always ≤ 0, and give the variational interpretation of that fact.",
            "Compute the first-order Stark effect for the n = 2 level of hydrogen in a uniform field E ẑ. Set up the 4×4 degenerate perturbation matrix in the basis {2s, 2p₀, 2p₊₁, 2p₋₁}, use parity and the Wigner-Eckart selection rules to argue that most entries vanish, diagonalize, and show that the level splits into three with one remaining doubly degenerate. Explain why hydrogen uniquely exhibits a linear Stark effect while other atoms do not."
          ]
        },
        {
          id: "phys-identical-particles",
          title: "Identical Particles and the Symmetrization Postulate",
          section: "Many-Body",
          prerequisites: ["phys-addition-angular-momentum"],
          estMinutes: 30,
          content: `
            <p>Classically, identical particles are still distinguishable by their trajectories. Quantum mechanically they are not even in principle, and the consequences — the periodic table, the stability of matter, superconductivity, neutron stars — are enormous. The formalism handles this with one additional postulate.</p>
            <p><strong>Permutation symmetry.</strong> For N identical particles, the symmetric group S<sub>N</sub> acts unitarily on ℋ<sup>⊗N</sup>, and any physical observable must commute with the action (otherwise it could distinguish the particles). The <strong>symmetrization postulate</strong> asserts that physical states lie in one of the two one-dimensional representations:</p>
            <pre><code>bosons:    P_{ij} |ψ⟩ = +|ψ⟩     (totally symmetric, integer spin)
fermions:  P_{ij} |ψ⟩ = −|ψ⟩     (totally antisymmetric, half-integer spin)</code></pre>
            <p>The spin-statistics connection is stated here but proved only in relativistic quantum field theory, where it follows from locality plus positivity of energy. In 3+1 dimensions these are the only two options; in two spatial dimensions the relevant group is the braid group rather than S<sub>N</sub>, and anyons with arbitrary phases exist.</p>
            <p><strong>Consequences.</strong> For fermions the antisymmetrized product is a <strong>Slater determinant</strong>, det[φ<sub>i</sub>(x<sub>j</sub>)]/√(N!), which vanishes identically if two single-particle states coincide — the Pauli exclusion principle as a corollary of antisymmetry rather than a separate rule. The resulting shell filling generates the entire structure of the periodic table. For bosons, the opposite bias holds: the symmetrized amplitude enhances multiple occupancy, which produces stimulated emission, lasers, and Bose-Einstein condensation (which we quantify in Chapter 6).</p>
            <p>The "exchange interaction" is a striking non-classical effect: for two electrons, the spatial wavefunction must be symmetric when the spin state is the singlet and antisymmetric for the triplet, so the spin-independent Coulomb repulsion produces a spin-dependent energy splitting. Ferromagnetism arises from this mechanism, not from magnetic dipole interactions, which are orders of magnitude too weak.</p>
            <details><summary>Full detail: second quantization and Fock space</summary>
            <p><strong>Second quantization.</strong> Rather than antisymmetrizing by hand, introduce creation and annihilation operators for single-particle modes with a<sub>i</sub>a<sub>j</sub><sup>†</sup> ∓ a<sub>j</sub><sup>†</sup>a<sub>i</sub> = δ<sub>ij</sub> (commutators for bosons, anticommutators for fermions) acting on Fock space ⊕<sub>N</sub> ℋ<sub>sym/anti</sub><sup>⊗N</sup>. Statistics is then built into the algebra, and the bosonic case is literally a copy of the harmonic oscillator ladder from Chapter 4 for each mode.</p>
            </details>
            <p><strong>Further reading:</strong> Sakurai &amp; Napolitano, <em>Modern Quantum Mechanics</em>, 2nd ed., §7.1 (permutation symmetry), §7.2 (symmetrization postulate), §7.3 (two-electron system, including the exchange splitting), §7.4 (the helium atom), and §7.5 (multiparticle states / second quantization). Note that the 1st edition orders scattering and identical particles the other way round, so this material is Ch. 6 there. Pages vary by edition; see §7.1-7.5.</p>
          `,
          exercises: [
            "For two identical particles in single-particle states φ_a and φ_b, compute ⟨(x₁ − x₂)²⟩ for the symmetric, antisymmetric, and (hypothetical) distinguishable cases, and express the difference in terms of the overlap integral ∫ φ_a*(x) x φ_b(x) dx. Interpret the resulting effective attraction (bosons) and repulsion (fermions) and explain why it vanishes when the states have disjoint support.",
            "Set up the helium ground state and lowest excited configurations (1s2s) with proper antisymmetrization including spin. Compute, in terms of the direct integral J and exchange integral K, the energies of the para (singlet) and ortho (triplet) states, and show the triplet lies lower. Then argue from your result why Hund's first rule holds."
          ]
        },
        {
          id: "phys-path-integral",
          title: "A First Look at the Path Integral",
          section: "Alternative Formulations",
          prerequisites: ["phys-schrodinger-evolution", "phys-action-functional"],
          estMinutes: 40,
          content: `
            <p>Chapter 1 opened with the statement that classical trajectories are the extremals of the action. The path integral says something stronger and stranger: quantum amplitudes are obtained by summing e<sup>iS/ħ</sup> over <em>all</em> paths, and the classical trajectory dominates only because stationary phase suppresses everything else as ħ → 0. It is the formulation in which the classical limit is most transparent, and the one on which quantum field theory is built.</p>
            <details><summary>Full derivation: time-slicing and the Trotter formula</summary>
            <p><strong>The construction.</strong> The propagator K(x<sub>b</sub>,t<sub>b</sub>; x<sub>a</sub>,t<sub>a</sub>) = ⟨x<sub>b</sub>|e<sup>−iH(t<sub>b</sub>−t<sub>a</sub>)/ħ</sup>|x<sub>a</sub>⟩ is obtained by slicing the interval into N steps, inserting a complete set of position states at each slice, and evaluating each short-time factor. For H = p²/2m + V, using the Trotter product formula and doing the Gaussian momentum integrals gives</p>
            </details>
            <pre><code>K = lim_{N→∞} (m/2πiħε)^{N/2} ∫ ∏ dx_j  exp( (i/ħ) Σ_j ε [ (m/2)((x_{j+1}−x_j)/ε)² − V(x_j) ] )
   "=" ∫ 𝒟[x(t)] exp( i S[x] / ħ ),      S[x] = ∫ L dt</code></pre>
            <p>The quotation marks matter: there is no countably additive complex measure 𝒟[x] on path space (a theorem, not a technicality), so the right-hand side is defined by the limit on the left. The Euclidean (imaginary-time) version, obtained by t → −iτ, <em>does</em> correspond to a genuine measure — the Wiener measure — and the resulting Feynman-Kac formula is the mathematically respectable statement of the same idea. Note also that typical contributing paths are nowhere differentiable, with |Δx| ~ √(Δt); the "sum over trajectories" is a sum over Brownian-like objects, and this is exactly the origin of the canonical commutator.</p>
            <p><strong>Why it is worth the trouble.</strong> (i) The classical limit is stationary phase: as ħ → 0 the oscillatory integral localizes on δS = 0, recovering Chapter 1 exactly, and the leading correction is the semiclassical (WKB) approximation with the van Vleck determinant as its prefactor. (ii) Symmetries of the action are manifest, since S is a scalar functional, which makes Lorentz invariance obvious in field theory where the operator formalism obscures it. (iii) The double-slit experiment becomes a computation rather than a paradox: amplitudes for topologically distinct classes of paths add. (iv) The Aharonov-Bohm phase from Chapter 3 appears as the extra term (q/ħc)∮A·dx in the action, giving an immediate topological interpretation.</p>
            <p><strong>Further reading:</strong> Sakurai &amp; Napolitano, <em>Modern Quantum Mechanics</em>, 2nd ed., §2.6 (propagators and Feynman path integrals) — includes the free-particle propagator and the Aharonov-Bohm discussion. Pages vary by edition; see §2.6. Shankar, <em>Principles of Quantum Mechanics</em>, 2nd ed., Ch. 8 and Ch. 21 give a much fuller development with worked Gaussian examples. For the rigorous Euclidean version, Hall, <em>Quantum Theory for Mathematicians</em>, Ch. 20.</p>
          `,
          exercises: [
            "Evaluate the free-particle path integral exactly by doing the N-fold Gaussian integral and taking the limit, obtaining K = √(m/2πiħT) exp(im(x_b−x_a)²/2ħT). Verify it satisfies the Schrödinger equation and reduces to δ(x_b − x_a) as T → 0. Then repeat for the harmonic oscillator, showing that the answer is exp(iS_cl/ħ) times a purely time-dependent prefactor, and explain why that factorization holds for any quadratic action.",
            "Show that for a charged particle in a magnetic field the action acquires the term (q/c)∫A·dx, and hence that the amplitude for two homotopy classes of paths encircling a solenoid differ by the phase exp(iqΦ/ħc) with Φ the enclosed flux. Deduce the observable interference shift, verify it is gauge invariant, and explain why it is nonzero even though B = 0 everywhere along the paths."
          ]
        }
      ]
    },
    {
      id: "statistical-mechanics",
      name: "Statistical Mechanics",
      lessons: [
        {
          id: "phys-microcanonical",
          title: "The Microcanonical Ensemble and Boltzmann Entropy",
          section: "Ensembles",
          prerequisites: ["phys-liouville-theorem"],
          estMinutes: 30,
          content: `
            <p>Statistical mechanics is the derivation of thermodynamics from mechanics plus one probabilistic postulate. The postulate is that an isolated system in equilibrium is equally likely to occupy any accessible microstate; its justification rests on the Liouville measure of Chapter 2, which is the unique natural invariant measure on an energy shell.</p>
            <p><strong>Setup.</strong> Fix (N, V, E) and let Ω(N,V,E) be the number of microstates consistent with those macroscopic constraints (classically, the Liouville volume of the energy shell divided by h<sup>3N</sup>N!; quantum mechanically, the degeneracy of the energy level). The equal-a-priori-probability postulate assigns probability 1/Ω to each.</p>
            <details><summary>Full derivation: temperature from counting microstates</summary>
            <p><strong>Temperature from counting.</strong> Bring two systems into thermal contact with E<sub>1</sub> + E<sub>2</sub> fixed. The combined multiplicity is Ω<sub>1</sub>(E<sub>1</sub>)Ω<sub>2</sub>(E − E<sub>1</sub>); maximizing over E<sub>1</sub> gives ∂lnΩ<sub>1</sub>/∂E<sub>1</sub> = ∂lnΩ<sub>2</sub>/∂E<sub>2</sub>. Defining β ≡ ∂lnΩ/∂E and comparing with the thermodynamic relation ∂S/∂E = 1/T forces</p>
            </details>
            <pre><code>S = k_B ln Ω        (Boltzmann)
1/T = ∂S/∂E |_{N,V} ,   p/T = ∂S/∂V |_{N,E} ,   −μ/T = ∂S/∂N |_{V,E}</code></pre>
            <p>This is the whole bridge between micro and macro. Everything thermodynamic — equations of state, heat capacities, phase boundaries — is a derivative of ln Ω. Note that the constant of proportionality k<sub>B</sub> is the only new dimensional input, and that S is defined absolutely (no additive constant), which is the third law.</p>
            <p><strong>Why the maximum is overwhelming.</strong> Ω typically grows like e<sup>cN</sup>, so lnΩ is extensive and the distribution of E<sub>1</sub> about its maximum has relative width O(N<sup>−1/2</sup>). For N ~ 10<sup>23</sup> the "most probable" macrostate is, for all practical purposes, the only one. The second law is therefore a probabilistic statement whose exceptions are real but of measure e<sup>−O(N)</sup> — reconciling it with the Poincaré recurrence of Chapter 2 is a matter of time scales, not of principle.</p>
            <p><strong>The classical ideal gas and Gibbs' paradox.</strong> Computing Ω for N free particles in a box gives the Sackur-Tetrode entropy, but only after the correct enumeration: dividing by N! for indistinguishability (justified by the symmetrization postulate of Chapter 5) and by h<sup>3N</sup> to make phase-space volume dimensionless (justified by the uncertainty relation of Chapter 4). Without the N!, entropy fails to be extensive and mixing two samples of the same gas would increase entropy — Gibbs' paradox. Classical statistical mechanics is thus internally incomplete; it needs quantum input.</p>
            <p><strong>Further reading:</strong> Pathria &amp; Beale, <em>Statistical Mechanics</em>, 3rd ed. (Elsevier, 2011), §1.1-1.3 (macrostates and microstates; contact between statistics and thermodynamics; the physical significance of Ω), §1.4 (the classical ideal gas), §1.5-1.6 (entropy of mixing, Gibbs' paradox, and the correct enumeration of microstates), plus §2.3 (the microcanonical ensemble). Pages vary by edition; see §1.1-1.6 and §2.1-2.3.</p>
          `,
          exercises: [
            "Compute Ω(N,V,E) for N noninteracting classical particles in a box by evaluating the volume of the 3N-dimensional momentum sphere shell, obtain the Sackur-Tetrode formula for S, and verify that the resulting equation of state is pV = Nk_BT and that C_V = (3/2)Nk_B. Then show explicitly that omitting the 1/N! makes S non-extensive, and quantify the spurious entropy of mixing two identical gases.",
            "Consider N distinguishable two-level systems with energies 0 and ε. Compute Ω(N, E) exactly, obtain S(E) via Stirling, and derive T(E). Show that T is negative for E > Nε/2, explain precisely what a negative temperature means (and why it is hotter than any positive temperature), and identify the property of the energy spectrum that makes negative temperature possible here but impossible for an ideal gas."
          ]
        },
        {
          id: "phys-canonical-ensemble",
          title: "The Canonical Ensemble and the Partition Function",
          section: "Ensembles",
          prerequisites: ["phys-microcanonical"],
          estMinutes: 30,
          content: `
            <p>Fixing the energy exactly is analytically awkward and physically unrealistic — real systems exchange energy with their surroundings. Coupling the system to a large reservoir at temperature T and integrating out the reservoir yields the canonical ensemble, in which energy fluctuates and temperature is fixed. This is where statistical mechanics becomes computable.</p>
            <details><summary>Full derivation: the Boltzmann distribution from a reservoir</summary>
            <p><strong>Derivation.</strong> System plus reservoir is isolated. The probability of a system microstate r with energy E<sub>r</sub> is proportional to the reservoir's multiplicity Ω<sub>R</sub>(E<sub>tot</sub> − E<sub>r</sub>). Expanding ln Ω<sub>R</sub> to first order (valid because E<sub>r</sub> ≪ E<sub>tot</sub>) and using ∂lnΩ<sub>R</sub>/∂E = β gives the Boltzmann distribution:</p>
            </details>
            <pre><code>P_r = e^{−βE_r} / Z ,      Z(β, V, N) = Σ_r e^{−βE_r} ,   β = 1/k_BT
F = −k_B T ln Z            (Helmholtz free energy)
⟨E⟩ = −∂ln Z/∂β,    S = −∂F/∂T,    p = −∂F/∂V,   Var(E) = ∂²ln Z/∂β² = k_BT² C_V</code></pre>
            <p><strong>Z is a moment generating function.</strong> Every thermodynamic quantity is a derivative of ln Z, so the entire problem of equilibrium statistical mechanics reduces to evaluating a single sum or integral. The last identity above is the first <strong>fluctuation-dissipation relation</strong>: the equilibrium variance of the energy equals a response coefficient (the heat capacity). Since ⟨E⟩ ~ N and Var(E) ~ N, relative fluctuations are O(N<sup>−1/2</sup>) and the canonical and microcanonical ensembles agree in the thermodynamic limit — <strong>ensemble equivalence</strong>, which fails precisely at first-order phase transitions where C<sub>V</sub> diverges.</p>
            <p><strong>Factorization.</strong> For noninteracting subsystems the Hamiltonian is a sum and Z factorizes: Z = z<sup>N</sup> for distinguishable particles, z<sup>N</sup>/N! for indistinguishable ones in the dilute limit. Hence F is additive and the whole thermodynamics of an ideal system follows from a single-particle calculation. Combined with the normal-mode decomposition of Chapter 1, this makes any harmonic system exactly solvable: N oscillators give Z = ∏<sub>k</sub> [2 sinh(βħω<sub>k</sub>/2)]<sup>−1</sup>, from which the Einstein and Debye theories of specific heat follow.</p>
            <p><strong>Equipartition and its failure.</strong> Classically, each quadratic degree of freedom contributes ½k<sub>B</sub>T to ⟨E⟩ (a one-line Gaussian integral), which predicts a temperature-independent heat capacity and, applied to the electromagnetic field, an infinite one — the ultraviolet catastrophe. The quantum oscillator result shows that modes with ħω ≫ k<sub>B</sub>T are frozen out exponentially, which resolves it. Equipartition is a theorem about classical Hamiltonians, and its experimental failure was the first evidence for quantization.</p>
            <p><strong>Further reading:</strong> Pathria &amp; Beale, <em>Statistical Mechanics</em>, 3rd ed., §3.1-3.4 (equilibrium with a heat reservoir; the canonical ensemble; physical significance of the statistical quantities; alternative expressions for the partition function), §3.6 (energy fluctuations and correspondence with the microcanonical ensemble), §3.7 (the equipartition and virial theorems), and §3.8 (a system of harmonic oscillators). Pages vary by edition; see §3.1-3.8.</p>
          `,
          exercises: [
            "Derive Var(E) = k_BT²C_V from Z, and use it to estimate the relative energy fluctuation of one mole of ideal gas at room temperature. Then show that at a first-order phase transition in a finite system the energy distribution becomes bimodal, so that C_V computed from fluctuations develops a peak scaling with system size, and explain how this signals the breakdown of ensemble equivalence.",
            "Compute Z for a single quantum harmonic oscillator, obtain ⟨E⟩ and C(T), and show that C → k_B as T → ∞ (equipartition) while C ~ (ħω/k_BT)² e^{−ħω/k_BT} → 0 as T → 0. Then apply the result to a Debye solid with density of modes g(ω) ∝ ω² up to ω_D, and derive the T³ law for the low-temperature heat capacity, identifying precisely which feature of g(ω) at small ω produces the exponent 3."
          ]
        },
        {
          id: "phys-grand-canonical",
          title: "The Grand Canonical Ensemble and Chemical Potential",
          section: "Ensembles",
          prerequisites: ["phys-canonical-ensemble"],
          estMinutes: 30,
          content: `
            <p>Allowing the reservoir to exchange particles as well as energy gives the grand canonical ensemble. Beyond its physical realism, it is a computational device of great power: for quantum ideal gases, fixing N exactly is intractable while allowing it to fluctuate makes the problem factorize completely.</p>
            <p><strong>Construction.</strong> Repeating the reservoir expansion in both E and N gives the grand canonical distribution and its generating function:</p>
            <pre><code>P_r = e^{−β(E_r − μN_r)} / 𝒵 ,    𝒵(β, V, μ) = Σ_N z^N Z_N ,   z = e^{βμ} (fugacity)
Ω_grand = −k_BT ln 𝒵 = −pV
⟨N⟩ = z ∂ln𝒵/∂z ,   Var(N) = k_BT (∂⟨N⟩/∂μ)_{T,V} = k_BT ⟨N⟩² κ_T / V</code></pre>
            <details><summary>Full detail: chemical potential and number fluctuations</summary>
            <p>The chemical potential μ is the energetic cost of adding one particle at fixed S and V; equality of μ across a boundary is the condition for diffusive equilibrium, just as equality of T is the condition for thermal equilibrium and equality of p for mechanical equilibrium. The last identity above is another fluctuation-dissipation relation, tying particle-number fluctuations to the isothermal compressibility κ<sub>T</sub> — and it predicts that fluctuations diverge where κ<sub>T</sub> does, i.e. at a critical point, which is the microscopic origin of critical opalescence.</p>
            </details>
            <p><strong>The payoff: quantum ideal gases.</strong> For noninteracting particles labelled by single-particle states k with energies ε<sub>k</sub>, the grand partition function factorizes over modes because the occupation numbers n<sub>k</sub> become independent:</p>
            <pre><code>𝒵 = ∏_k Σ_{n_k} ( z e^{−βε_k} )^{n_k}
fermions (n_k ∈ {0,1}):  ⟨n_k⟩ = 1 / ( e^{β(ε_k−μ)} + 1 )     Fermi-Dirac
bosons   (n_k ∈ ℕ):      ⟨n_k⟩ = 1 / ( e^{β(ε_k−μ)} − 1 )     Bose-Einstein</code></pre>
            <p>Two lines of algebra, and the entire content of Chapter 5's symmetrization postulate has been converted into thermodynamics. Note the constraints: for bosons μ must be below the lowest single-particle energy or occupations go negative — the fact that μ can approach that bound but not cross it is exactly what produces Bose-Einstein condensation in the next lesson. In the dilute limit z ≪ 1 both distributions reduce to Maxwell-Boltzmann, ⟨n<sub>k</sub>⟩ ≈ z e<sup>−βε<sub>k</sub></sup>, recovering the classical ideal gas along with its correct 1/N! factor automatically.</p>
            <p><strong>Further reading:</strong> Pathria &amp; Beale, <em>Statistical Mechanics</em>, 3rd ed., §4.1-4.3 (equilibrium with a particle-energy reservoir; the grand canonical ensemble; physical significance of the statistical quantities), §4.5 (density and energy fluctuations in the grand canonical ensemble), and Ch. 6 §6.1-6.3 for the derivation of the quantum distribution functions. Pages vary by edition; see §4.1-4.5 and §6.1-6.3.</p>
          `,
          exercises: [
            "Derive Var(N) = k_BT(∂⟨N⟩/∂μ) from 𝒵 and then relate it to the isothermal compressibility κ_T using standard thermodynamic identities. Evaluate it for the classical ideal gas and confirm the Poissonian result Var(N) = ⟨N⟩, then compute it for an ideal Fermi gas at T = 0 and interpret the answer.",
            "Derive the Fermi-Dirac and Bose-Einstein occupation formulas from the mode-factorized grand partition function, and compute in each case Var(n_k) in terms of ⟨n_k⟩. Show that Var(n_k) = ⟨n_k⟩(1 ∓ ⟨n_k⟩) with the sign depending on statistics, and interpret the sub-Poissonian (fermionic) and super-Poissonian (bosonic) results in terms of the exchange effects of Chapter 5."
          ]
        },
        {
          id: "phys-bose-einstein-condensation",
          title: "Bose-Einstein Condensation as a Phase Transition",
          section: "Applications",
          prerequisites: ["phys-grand-canonical", "phys-identical-particles"],
          estMinutes: 35,
          content: `
            <p>Bose-Einstein condensation is the cleanest phase transition in physics: it occurs in a system with no interactions at all, driven purely by quantum statistics, and it can be analyzed exactly. It is therefore the ideal first example of a phase transition for a mathematically minded reader — the singularity comes from an interchange of limits, and one can see exactly where.</p>
            <p><strong>The setup.</strong> For an ideal Bose gas of nonrelativistic particles in three dimensions, converting the mode sum to an integral with density of states g(ε) ∝ ε<sup>1/2</sup> gives</p>
            <pre><code>N/V = (1/λ³) g_{3/2}(z) + N₀/V ,    λ = h/√(2πmk_BT)   (thermal wavelength)
g_ν(z) = Σ_{k≥1} z^k / k^ν  ,    g_{3/2}(1) = ζ(3/2) ≈ 2.612</code></pre>
            <details><summary>Full derivation: where the condensate comes from</summary>
            <p><strong>The mechanism.</strong> Because μ ≤ 0 for bosons, z = e<sup>βμ</sup> ∈ (0,1], and the excited-state population is capped at (V/λ³)ζ(3/2). Cooling shrinks λ<sup>−3</sup>; below the temperature where nλ³ = ζ(3/2) the excited states simply cannot hold all the particles, and the remainder must accumulate in the single lowest mode. That macroscopic occupation of one state is the condensate:</p>
            </details>
            <pre><code>k_B T_c = (2πħ²/m) ( n / ζ(3/2) )^{2/3}
N₀/N = 1 − (T/T_c)^{3/2}     for T &lt; T_c</code></pre>
            <p><strong>Why the integral approximation is subtle, and what it teaches.</strong> Replacing the sum by an integral silently gives the ground state zero weight, which is precisely wrong below T<sub>c</sub>. The correct statement is that the singularity in the thermodynamic functions appears only in the limit V → ∞ at fixed density; for finite V everything is analytic, and the "transition" is a smooth crossover of width O(N<sup>−2/3</sup>). This is the general lesson about phase transitions: <em>a genuine non-analyticity in a thermodynamic potential requires the thermodynamic limit</em>, since a finite sum of exponentials is entire. Here one can see the mechanism explicitly rather than taking it on faith.</p>
            <p>The transition is continuous: N<sub>0</sub> rises from zero with exponent 3/2 (an order parameter), the heat capacity has a cusp with a discontinuous derivative at T<sub>c</sub>, and the compressibility diverges below T<sub>c</sub> because μ is pinned at 0. Dimensionality is essential: the same computation in two dimensions gives a logarithmically divergent g<sub>1</sub>(z), so no condensation occurs at any T &gt; 0 for the homogeneous 2D gas — the first appearance of a lower critical dimension.</p>
            <p><strong>Further reading:</strong> Pathria &amp; Beale, <em>Statistical Mechanics</em>, 3rd ed., §7.1 (thermodynamic behavior of an ideal Bose gas, including the condensation), §7.2 (Bose-Einstein condensation in ultracold atomic gases), and §7.3 (thermodynamics of blackbody radiation, the μ = 0 case). Pages vary by edition; see §7.1-7.3. For the finite-size analysis, Appendix F of the 3rd edition.</p>
          `,
          exercises: [
            "Derive T_c and N₀(T)/N above, then compute the internal energy, pressure, and heat capacity of the ideal Bose gas for T < T_c and T > T_c. Show C_V is continuous at T_c but ∂C_V/∂T is not, and compute the discontinuity. Also verify the striking result that below T_c the pressure is independent of volume, and explain physically why.",
            "Redo the condensation analysis for a gas with single-particle dispersion ε ∝ |p|^s in d spatial dimensions. Determine for which (s, d) condensation occurs at nonzero T_c, and in particular show that the homogeneous nonrelativistic 2D gas does not condense while a 2D gas in a harmonic trap does. Explain the difference in terms of the low-energy density of states."
          ]
        },
        {
          id: "phys-ising-model",
          title: "The Ising Model: Transfer Matrices and Mean Field",
          section: "Applications",
          prerequisites: ["phys-canonical-ensemble", "phys-spin-half"],
          estMinutes: 40,
          content: `
            <p>Interactions are what make phase transitions interesting, and the Ising model is the minimal interacting system: spins σ<sub>i</sub> = ±1 on a lattice with nearest-neighbour coupling. It is exactly solvable in one and two dimensions and unsolved in three, and comparing the exact 1D answer with the mean-field prediction is the most economical way to learn what mean field gets right and wrong.</p>
            <pre><code>H = −J Σ_{⟨ij⟩} σ_i σ_j − h Σ_i σ_i ,     σ_i ∈ {−1, +1}</code></pre>
            <details><summary>Full derivation: the 1D transfer matrix</summary>
            <p><strong>One dimension, exactly, by transfer matrix.</strong> Write Z as a trace of a product of identical 2×2 matrices T with T<sub>σσ'</sub> = exp(βJσσ' + βh(σ+σ')/2). With periodic boundary conditions Z = Tr T<sup>N</sup> = λ<sub>+</sub><sup>N</sup> + λ<sub>−</sub><sup>N</sup>, so in the thermodynamic limit the free energy per site is −k<sub>B</sub>T ln λ<sub>+</sub>, where</p>
            </details>
            <pre><code>λ_± = e^{βJ} cosh(βh) ± √( e^{2βJ} sinh²(βh) + e^{−2βJ} )</code></pre>
            <p>λ<sub>+</sub> is a strictly positive, real-analytic function of T and h for all T &gt; 0 (Perron-Frobenius guarantees the top eigenvalue is simple and separated). Therefore <strong>there is no phase transition in one dimension at any positive temperature</strong>, and the spontaneous magnetization vanishes for all T &gt; 0. The physical reason is the Peierls energy-entropy argument: in 1D a domain wall costs a fixed energy 2J but gains entropy k<sub>B</sub>ln N, so at any T &gt; 0 the free energy favours creating walls and destroying order. In two dimensions a domain wall costs energy proportional to its length, and the argument reverses — Onsager's exact solution gives sinh(2J/k<sub>B</sub>T<sub>c</sub>) = 1, with a logarithmically divergent heat capacity and β = 1/8 for the magnetization exponent.</p>
            <p><strong>Mean field.</strong> Replace σ<sub>j</sub> in each interaction by ⟨σ⟩ = m plus fluctuation, and drop the product of fluctuations. Each spin then sees an effective field h + zJm, giving the self-consistency equation</p>
            <pre><code>m = tanh( β( h + zJm ) ) ,     k_B T_c^{MF} = zJ    (z = coordination number)</code></pre>
            <p>which predicts a transition with m ~ (T<sub>c</sub>−T)<sup>1/2</sup>, δ = 3, γ = 1 — <em>in every dimension, including one, where it is flatly wrong</em>. Mean field neglects fluctuations, and the Ginzburg criterion shows this is self-consistent only above the upper critical dimension d = 4. Below it the true exponents differ, and understanding why requires the renormalization group. The universality of those exponents — that they depend only on dimension and symmetry, not on lattice details — is the deepest structural fact in equilibrium statistical mechanics.</p>
            <p><strong>Further reading:</strong> Pathria &amp; Beale, <em>Statistical Mechanics</em>, 3rd ed., §12.1-12.5 (phase transitions: criticality, universality and scaling, including the mean-field/Landau treatment and critical exponents) and §13.2 (the Ising model in one dimension, transfer matrix) with §13.4 for the two-dimensional model and Onsager's solution. Chapter 14 covers the renormalization group. Pages vary by edition; see §12.1-12.5 and §13.2-13.4.</p>
          `,
          exercises: [
            "Solve the 1D Ising model with periodic boundary conditions by transfer matrix, obtaining λ_± explicitly. Compute the magnetization m(h,T) and the two-point correlation ⟨σ_0 σ_r⟩ at h = 0, show it decays as e^{−r/ξ} with ξ⁻¹ = −ln tanh(βJ), and verify that ξ diverges only as T → 0. Conclude that T_c = 0 in one dimension.",
            "Carry out the Peierls energy-entropy argument in both one and two dimensions: estimate the free-energy cost of a domain wall in each case and deduce the presence or absence of long-range order at low temperature. Then derive the mean-field self-consistency equation and its critical exponents β, γ, δ, and use the Ginzburg criterion to determine the upper critical dimension above which mean field is asymptotically exact."
          ]
        }
      ]
    },
    {
      id: "general-relativity",
      name: "General Relativity",
      lessons: [
        {
          id: "phys-equivalence-principle",
          title: "The Equivalence Principle and Physics in Curved Spacetime",
          section: "Foundations",
          prerequisites: ["phys-minkowski-lorentz", "phys-config-manifold"],
          estMinutes: 30,
          content: `
            <p>Special relativity fixed the invariance group of physics to be the Poincaré group acting on a flat Minkowski metric. General relativity makes the metric itself a dynamical field on a manifold, with no preferred coordinates at all. The physical input that licenses this move is the equivalence principle, and for a reader who already knows differential geometry it is the only genuinely new idea in the subject.</p>
            <p><strong>The principle.</strong> The <em>weak</em> form is the observed equality of inertial and gravitational mass, so that all test bodies fall identically regardless of composition. The <em>Einstein</em> form upgrades this: in a sufficiently small region of spacetime, the laws of physics in a freely falling frame are those of special relativity. Geometrically this is the statement that at any point p one can choose <strong>Riemann normal coordinates</strong> in which</p>
            <pre><code>g_{μν}(p) = η_{μν} ,    ∂_λ g_{μν}(p) = 0 ,    but ∂_λ∂_ρ g_{μν}(p) ≠ 0 in general</code></pre>
            <p>Gravity can be transformed away at a point (and to first order along a geodesic) but not in a neighbourhood, because the second derivatives — the curvature — are tensorial and cannot be set to zero by any coordinate change. <strong>Tidal forces are curvature</strong>; the "gravitational field" is not a tensor and is coordinate-dependent, which is why the Newtonian field strength has no invariant meaning here.</p>
            <details><summary>Full detail: the framework and minimal coupling</summary>
            <p><strong>The framework.</strong> Spacetime is a smooth 4-manifold M with a Lorentzian metric g of signature (−,+,+,+) (Carroll's convention; Jackson and much of the particle literature use the opposite). Physical fields are tensor fields; the laws of physics are tensor equations, hence automatically valid in all coordinate systems (general covariance). The recipe for importing special-relativistic physics is <strong>minimal coupling</strong>: replace η<sub>μν</sub> → g<sub>μν</sub> and ∂<sub>μ</sub> → ∇<sub>μ</sub>. The ordering ambiguity introduced by non-commuting covariant derivatives is exactly the freedom to add curvature couplings, which the equivalence principle alone does not fix.</p>
            </details>
            <p>Two things the reader should carry from earlier chapters. First, Chapter 1 showed that a free system on a Riemannian manifold moves along geodesics; here free fall <em>is</em> geodesic motion, so gravity has been reclassified from a force to a property of the connection. Second, the observer-dependence of "gravitational field" here is analogous to the frame-dependence of E and B in Chapter 3 — in both cases an invariant tensor (F<sub>μν</sub> there, R<sup>ρ</sup><sub>σμν</sub> here) carries the frame-independent content.</p>
            <p><strong>Further reading:</strong> Carroll, <em>Spacetime and Geometry: An Introduction to General Relativity</em> (Addison-Wesley 2004 / Cambridge 2019 reissue), §2.1 (gravity as geometry) and §4.1 (physics in curved spacetime), with §4.7 (the equivalence principle revisited) for the subtleties. Pages vary by edition; see §2.1 and §4.1. Wald, <em>General Relativity</em> (Chicago, 1984), Ch. 1 and §4.1 give a more careful logical account of what the principle does and does not assert.</p>
          `,
          exercises: [
            "Prove the existence of Riemann normal coordinates at a point p: construct them via the exponential map and show g_{μν}(p) = η_{μν}, Γ^λ_{μν}(p) = 0, and that the leading correction is g_{μν}(x) = η_{μν} − (1/3)R_{μανβ}(p)x^α x^β + O(x³). Then count: show that the number of second derivatives of g that cannot be removed by a coordinate change equals the number of independent components of the Riemann tensor, 20 in four dimensions.",
            "Derive the gravitational redshift from the equivalence principle alone, without using the field equations: consider a photon emitted upward in a uniformly accelerated frame, apply the special-relativistic Doppler formula, and obtain Δν/ν = −gh/c². Then show the same result follows from the static metric g_{00} = −(1 + 2Φ/c²) by comparing proper times, and identify what assumption about the metric is needed."
          ]
        },
        {
          id: "phys-curvature",
          title: "The Levi-Civita Connection and the Riemann Tensor",
          section: "Curvature",
          prerequisites: ["phys-equivalence-principle"],
          estMinutes: 40,
          content: `
            <p>This lesson is a physics-motivated recap of machinery the reader already has from differential geometry, with attention to the conventions and to which objects carry physical meaning.</p>
            <details><summary>Full derivation: the Levi-Civita connection</summary>
            <p><strong>Connection.</strong> A covariant derivative ∇ on tensor fields is fixed uniquely by demanding metric compatibility (∇<sub>ρ</sub>g<sub>μν</sub> = 0) and torsion-freeness (Γ<sup>λ</sup><sub>μν</sub> = Γ<sup>λ</sup><sub>νμ</sub>) — this is the fundamental theorem of Riemannian geometry, and the physical justification is the equivalence principle, which requires that lengths be preserved under parallel transport and that normal coordinates exist. In coordinates,</p>
            </details>
            <pre><code>Γ^λ_{μν} = ½ g^{λρ} ( ∂_μ g_{ρν} + ∂_ν g_{ρμ} − ∂_ρ g_{μν} )
∇_μ V^ν = ∂_μ V^ν + Γ^ν_{μλ} V^λ ,    ∇_μ ω_ν = ∂_μ ω_ν − Γ^λ_{μν} ω_λ</code></pre>
            <p>Γ is not a tensor: it vanishes at a point in normal coordinates but not in general, mirroring the fact that "gravitational force" is not invariant.</p>
            <p><strong>Curvature.</strong> The Riemann tensor measures the failure of covariant derivatives to commute, equivalently the holonomy of parallel transport around an infinitesimal loop:</p>
            <pre><code>[∇_μ, ∇_ν] V^ρ = R^ρ_{σμν} V^σ
R^ρ_{σμν} = ∂_μ Γ^ρ_{νσ} − ∂_ν Γ^ρ_{μσ} + Γ^ρ_{μλ}Γ^λ_{νσ} − Γ^ρ_{νλ}Γ^λ_{μσ}
symmetries: R_{ρσμν} = −R_{σρμν} = −R_{ρσνμ} = R_{μνρσ},  R_{ρ[σμν]} = 0
Bianchi:   ∇_{[λ} R_{ρσ]μν} = 0
Ricci: R_{μν} = R^λ_{μλν} ,   scalar: R = g^{μν}R_{μν}
Einstein tensor: G_{μν} = R_{μν} − ½ R g_{μν} ,   ∇^μ G_{μν} = 0 (contracted Bianchi)</code></pre>
            <p>The symmetries reduce the 256 components in four dimensions to 20 independent ones. The decomposition into Ricci part (10 components) and Weyl part (10 components) is physically meaningful: Einstein's equation will constrain only the Ricci part algebraically in terms of matter, leaving the Weyl tensor as the freely propagating piece — gravitational radiation and tidal effects in vacuum live in the Weyl tensor. In three dimensions the Weyl tensor vanishes identically, which is why 3D gravity has no local degrees of freedom.</p>
            <p>The contracted Bianchi identity ∇<sup>μ</sup>G<sub>μν</sub> = 0 is the single most important structural fact for the next lesson: it is an identity, holding for every metric, and it is what forces the source of the field equations to be a divergence-free tensor.</p>
            <p><strong>Further reading:</strong> Carroll, <em>Spacetime and Geometry</em>, §3.2 (covariant derivatives), §3.6 (the Riemann curvature tensor), and §3.7 (properties of the Riemann tensor, including the decomposition and the Bianchi identities); §3.4 for practical computation via Killing vectors and §3.8-3.9 for symmetries. Pages vary by edition; see §3.2 and §3.6-3.7. Wald, <em>General Relativity</em>, §3.1-3.2 gives the abstract-index treatment, and §3.4 covers efficient computation of curvature.</p>
          `,
          exercises: [
            "Prove that the Riemann tensor with all indices lowered has exactly 20 independent components in four dimensions, by systematically imposing the antisymmetries, the pair symmetry, and the first Bianchi identity. Generalize to n dimensions and obtain n²(n²−1)/12, then verify the count is 1 for n = 2 and 6 for n = 3, and explain the geometric significance of each.",
            "Compute the full Riemann tensor, Ricci tensor and Ricci scalar of the 2-sphere of radius a with metric ds² = a²(dθ² + sin²θ dφ²), and verify R = 2/a². Then compute the holonomy of parallel transport around a closed circle of constant θ and check that the rotation angle equals the integral of the Gaussian curvature over the enclosed cap, confirming Gauss-Bonnet in this case."
          ]
        },
        {
          id: "phys-geodesics",
          title: "Geodesics, Geodesic Deviation, and the Newtonian Limit",
          section: "Curvature",
          prerequisites: ["phys-curvature"],
          estMinutes: 30,
          content: `
            <p>Having declared free fall to be geodesic motion, we need to know (i) what geodesics are, (ii) how nearby geodesics separate — this is what an observer actually measures as gravity — and (iii) that the whole structure reduces to Newton when it should.</p>
            <p><strong>Geodesics.</strong> A geodesic is a curve that parallel-transports its own tangent, ∇<sub>u</sub>u = 0, equivalently an extremal of the proper-time functional τ = ∫√(−g<sub>μν</sub>ẋ<sup>μ</sup>ẋ<sup>ν</sup>)dλ:</p>
            <pre><code>d²x^μ/dτ² + Γ^μ_{ρσ} (dx^ρ/dτ)(dx^σ/dτ) = 0</code></pre>
            <p>This is exactly the Euler-Lagrange equation of Chapter 1's exercise on the kinetic-energy Lagrangian, and the practical way to compute Γ is often to write down L = ½g<sub>μν</sub>ẋ<sup>μ</sup>ẋ<sup>ν</sup> and read the connection coefficients off the equations of motion — far faster than the coordinate formula. A useful sign convention: timelike geodesics <em>maximize</em> proper time between events, because the metric is Lorentzian; the twin paradox is the statement that the inertial twin is the one who ages most.</p>
            <p><strong>Killing vectors and conserved quantities.</strong> If ξ is a Killing vector (𝓛<sub>ξ</sub>g = 0, i.e. ∇<sub>(μ</sub>ξ<sub>ν)</sub> = 0) then g<sub>μν</sub>ξ<sup>μ</sup>u<sup>ν</sup> is constant along any geodesic. This is Noether's theorem from Chapter 1, transplanted verbatim: a stationary metric (∂<sub>t</sub> Killing) gives conserved energy, an axisymmetric one gives conserved angular momentum, and these two integrals are what make Schwarzschild orbits solvable in the next lessons.</p>
            <p><strong>Geodesic deviation.</strong> A single geodesic tells you nothing about gravity — in normal coordinates it is a straight line. The observable is the relative acceleration of neighbouring geodesics with separation vector S:</p>
            <pre><code>D²S^μ/dτ² = R^μ_{νρσ} u^ν u^ρ S^σ</code></pre>
            <p>This is the exact, invariant statement that <em>tidal forces are curvature</em>. It is the general-relativistic replacement for the Newtonian tidal tensor ∂<sub>i</sub>∂<sub>j</sub>Φ, and comparing the two identifies R<sup>i</sup><sub>0j0</sub> ≈ ∂<sub>i</sub>∂<sub>j</sub>Φ/c².</p>
            <details><summary>Full derivation: the Newtonian limit</summary>
            <p><strong>Newtonian limit.</strong> Take weak fields g<sub>μν</sub> = η<sub>μν</sub> + h<sub>μν</sub> with |h| ≪ 1, slow motion (dx<sup>i</sup>/dτ ≪ dt/dτ), and a static metric. The geodesic equation reduces to d²x<sup>i</sup>/dt² = −½∂<sub>i</sub>h<sub>00</sub>c², so identifying h<sub>00</sub> = −2Φ/c² recovers Newton's second law with potential Φ. That single identification is the calibration that will fix the coupling constant in the Einstein equations.</p>
            </details>
            <p><strong>Further reading:</strong> Carroll, <em>Spacetime and Geometry</em>, §3.3 (parallel transport and geodesics), §3.4 (properties of geodesics, including the Newtonian limit and conserved quantities), §3.8 (symmetries and Killing vectors), and §3.10 (geodesic deviation). Pages vary by edition; see §3.3-3.4, §3.8, §3.10. Wald, <em>General Relativity</em>, §3.3 and §4.4 (geodesic deviation and the Newtonian limit).</p>
          `,
          exercises: [
            "Derive the geodesic deviation equation from scratch: take a one-parameter family of geodesics x^μ(τ, s), define S = ∂x/∂s and u = ∂x/∂τ, use [S, u] = 0 and the definition of the Riemann tensor to obtain D²S/dτ² = R(u,S)u. Then specialize to the weak static field and recover the Newtonian tidal tensor, identifying R^i_{0j0} explicitly.",
            "For the metric ds² = −(1+2Φ(x)/c²)c²dt² + (1−2Φ(x)/c²)δ_{ij}dx^i dx^j with |Φ| ≪ c², compute the Christoffel symbols to first order in Φ and derive both the trajectory of a slow massive particle and the deflection of a light ray passing a mass M at impact parameter b. Show the light deflection is 4GM/bc², i.e. exactly twice the naive Newtonian value, and identify precisely which term in the metric supplies the extra factor of two."
          ]
        },
        {
          id: "phys-einstein-equations",
          title: "The Einstein Field Equations",
          section: "Field Equations",
          prerequisites: ["phys-geodesics"],
          estMinutes: 40,
          content: `
            <p>We now need an equation determining the metric from the matter distribution. Two independent routes lead to the same answer, and seeing both is worthwhile: one is a guess constrained by consistency, the other is a variational principle in the spirit of Chapters 1 and 3.</p>
            <details><summary>Full derivation: Route 1, consistency and Lovelock theorem</summary>
            <p><strong>Route 1: consistency.</strong> The Newtonian field equation is ∇²Φ = 4πGρ: second derivatives of the potential on the left, mass density on the right. The relativistic source must be the full stress-energy tensor T<sub>μν</sub> (energy density is only its 00 component and cannot be covariantly isolated), and local conservation is ∇<sup>μ</sup>T<sub>μν</sub> = 0. So we need a tensor built from g and its first two derivatives, linear in second derivatives, and identically divergence-free. Lovelock's theorem says that in four dimensions the only such tensors are G<sub>μν</sub> + Λg<sub>μν</sub> up to scale. Fixing the constant by the Newtonian limit of the previous lesson:</p>
            </details>
            <pre><code>G_{μν} + Λ g_{μν} = (8πG/c⁴) T_{μν}
equivalently  R_{μν} − ½ R g_{μν} + Λ g_{μν} = (8πG/c⁴) T_{μν}
vacuum (Λ=0):  R_{μν} = 0</code></pre>
            <p><strong>Route 2: the Einstein-Hilbert action.</strong> Vary</p>
            <pre><code>S = (c⁴/16πG) ∫ (R − 2Λ) √(−g) d⁴x  +  S_matter ,   T_{μν} = −(2/√(−g)) δS_matter/δg^{μν}</code></pre>
            <p>with respect to g<sup>μν</sup>. The variation of R and of √(−g) are straightforward; the variation of the Ricci tensor produces a total derivative (the Gibbons-Hawking boundary term) that is discarded for compact variations. The result is exactly the field equations. Note the elegance: R is the unique scalar built from the metric with no more than two derivatives, so the action is essentially forced, just as F<sub>μν</sub>F<sup>μν</sup> was in Chapter 3.</p>
            <p><strong>Structure and difficulty.</strong> These are ten coupled nonlinear second-order PDEs for the ten components of g<sub>μν</sub>. Four of them (the ones with a time derivative missing) are constraints, and the Bianchi identity means only six are dynamically independent — the remaining four-fold freedom is diffeomorphism gauge invariance, precisely parallel to the gauge redundancy in electrodynamics. The nonlinearity is physically essential: gravitational field energy itself gravitates, so unlike electromagnetism the theory cannot be solved by superposition. Note also that ∇<sup>μ</sup>T<sub>μν</sub> = 0 is not an extra assumption but a consequence of the field equations via the contracted Bianchi identity — the field equations enforce the motion of matter, just as ∂<sub>μ</sub>J<sup>μ</sup> = 0 was forced in Chapter 3.</p>
            <p><strong>Further reading:</strong> Carroll, <em>Spacetime and Geometry</em>, §4.2 (Einstein's equation), §4.3 (Lagrangian formulation, the Einstein-Hilbert action), §4.4 (properties of Einstein's equation), and §4.5 (the cosmological constant); §4.6 for the energy conditions. Pages vary by edition; see §4.2-4.5. Wald, <em>General Relativity</em>, §4.3 and Appendix E for the variational derivation done carefully, including the boundary term.</p>
          `,
          exercises: [
            "Carry out the variation of the Einstein-Hilbert action in full: compute δ√(−g), δg^{μν}, and δR_{μν}, show that g^{μν}δR_{μν} is a total covariant divergence, and obtain G_{μν} = 8πG T_{μν}/c⁴. Then identify the boundary term that must be added for the variational problem to be well posed with fixed induced metric on the boundary.",
            "Take the trace of the field equations to obtain R = −8πG T/c⁴ (with Λ = 0), and rewrite them in the 'trace-reversed' form R_{μν} = (8πG/c⁴)(T_{μν} − ½T g_{μν}). Use this form to derive the Newtonian limit ∇²Φ = 4πGρ for a static perfect fluid with p ≪ ρc², and then determine what the equation predicts for a fluid with large pressure — showing that pressure itself gravitates, and computing the correction for a relativistic gas with p = ρc²/3."
          ]
        },
        {
          id: "phys-schwarzschild",
          title: "The Schwarzschild Solution and Birkhoff's Theorem",
          section: "Exact Solutions",
          prerequisites: ["phys-einstein-equations"],
          estMinutes: 35,
          content: `
            <p>The Einstein equations are formidable in general, but symmetry reduces them drastically. The spherically symmetric vacuum solution was found within months of the theory's publication and remains the most important exact solution in the subject.</p>
            <details><summary>Full derivation: reducing the field equations under spherical symmetry</summary>
            <p><strong>The solution.</strong> Assume spherical symmetry and solve R<sub>μν</sub> = 0. With a suitable radial coordinate the metric reduces to two unknown functions of (t,r), and the field equations force the metric to be static and to take the form</p>
            </details>
            <pre><code>ds² = −(1 − 2GM/rc²) c²dt² + (1 − 2GM/rc²)^{−1} dr² + r² (dθ² + sin²θ dφ²)
r_s = 2GM/c²   (Schwarzschild radius)</code></pre>
            <p>The single integration constant M is identified as the mass by matching to the Newtonian limit at large r, where g<sub>00</sub> → −(1 + 2Φ/c²) with Φ = −GM/r as in the Newtonian-limit lesson.</p>
            <p><strong>Birkhoff's theorem.</strong> Every spherically symmetric vacuum solution is isometric to a piece of Schwarzschild. Staticity was not assumed — it was derived. Two important consequences: the exterior field of a spherically pulsating star is exactly constant in time, so there is no monopole gravitational radiation (radiation begins at quadrupole order); and the interior of a spherical shell is exactly flat, the relativistic version of Newton's shell theorem.</p>
            <p><strong>Two very different "singularities".</strong> The metric components blow up at r = 0 and at r = r<sub>s</sub>, but these are not alike. Compute the curvature invariant</p>
            <pre><code>R_{μνρσ}R^{μνρσ} = 48 G²M² / (c⁴ r⁶)</code></pre>
            <p>which diverges at r = 0 and is perfectly finite at r = r<sub>s</sub>. So r = 0 is a genuine curvature singularity while r = r<sub>s</sub> is a <strong>coordinate singularity</strong>, an artefact of the (t,r) chart failing there — exactly the sort of chart-domain issue a reader with manifold experience will recognize immediately. Passing to Eddington-Finkelstein or Kruskal-Szekeres coordinates extends the manifold smoothly across r = r<sub>s</sub>, revealing it to be a null hypersurface: an <strong>event horizon</strong>, a one-way membrane. The maximal extension contains four regions including a white hole and a second asymptotically flat exterior joined by a non-traversable Einstein-Rosen bridge — a nice piece of global topology that is invisible in the original coordinates.</p>
            <p>For ordinary stars r<sub>s</sub> lies deep inside the matter (about 3 km for the Sun) where the vacuum solution does not apply, so horizons appear only for sufficiently compact objects.</p>
            <p><strong>Further reading:</strong> Carroll, <em>Spacetime and Geometry</em>, §5.1 (the Schwarzschild metric), §5.2 (Birkhoff's theorem), §5.3 (singularities), §5.6 (Schwarzschild black holes) and §5.7 (the maximally extended Schwarzschild solution, Kruskal coordinates). Pages vary by edition; see §5.1-5.3 and §5.6-5.7. Wald, <em>General Relativity</em>, §6.1 (derivation) and §6.4 (the Kruskal extension) is the more rigorous treatment.</p>
          `,
          exercises: [
            "Derive the Schwarzschild solution: write the general spherically symmetric metric as ds² = −e^{2α(t,r)}dt² + e^{2β(t,r)}dr² + r²dΩ², compute the Ricci tensor, impose R_{μν} = 0, and show that the equations force ∂_t β = 0 and α + β = f(t) which can be absorbed into a redefinition of t — thereby proving Birkhoff's theorem along the way.",
            "Introduce ingoing Eddington-Finkelstein coordinates v = t + r*, with r* = r + r_s ln|r/r_s − 1|, and rewrite the Schwarzschild metric. Show that the metric is smooth and nondegenerate at r = r_s, that the surface r = r_s is null, and that all future-directed causal curves crossing it have decreasing r. Then compute the proper time for a radially infalling observer to reach r = 0 from r = r_s and show it is finite, while the coordinate time t diverges."
          ]
        },
        {
          id: "phys-schwarzschild-orbits",
          title: "Orbits in Schwarzschild: Precession, Light Bending, and the ISCO",
          section: "Exact Solutions",
          prerequisites: ["phys-schwarzschild", "phys-hamilton-jacobi"],
          estMinutes: 35,
          content: `
            <p>The Schwarzschild metric becomes physics when we compute geodesics in it. Because the metric has two obvious Killing vectors, the problem reduces to a one-dimensional effective-potential problem of exactly the kind studied in Chapter 1 — and then the deviations from the Newtonian effective potential are precisely the classical tests of general relativity.</p>
            <details><summary>Full derivation: reducing to an effective potential</summary>
            <p><strong>Reduction.</strong> The Killing vectors ∂<sub>t</sub> and ∂<sub>φ</sub> give conserved E = (1 − r<sub>s</sub>/r)dt/dτ and L = r²dφ/dτ; spherical symmetry lets us set θ = π/2. Substituting into the normalization g<sub>μν</sub>u<sup>μ</sup>u<sup>ν</sup> = −ε (with ε = 1 for massive particles, 0 for light) gives a first integral:</p>
            </details>
            <pre><code>½ (dr/dτ)² + V_eff(r) = ½ E²
V_eff(r) = ½ ( 1 − r_s/r )( ε + L²/r² )
         = ½ε − εGM/r + L²/2r² − GM L²/(c²r³)</code></pre>
            <p>The first three terms are exactly the Newtonian effective potential of the Kepler problem. The entire content of relativistic orbital mechanics is the last term, a −1/r³ correction, which is negligible at large r and dominant at small r.</p>
            <p><strong>Three consequences.</strong> (1) <strong>Perihelion precession.</strong> The 1/r³ term breaks the accidental degeneracy that made Newtonian bound orbits closed (the Laplace-Runge-Lenz symmetry of the Chapter 2 exercise is destroyed), so ellipses precess by Δφ = 6πGM/(c²a(1−e²)) per orbit — 43 arcseconds per century for Mercury, matching the residual that had been unexplained for decades. (2) <strong>Light bending.</strong> For ε = 0 the effective potential has only the L²/2r² and −1/r³ terms; integrating the orbit for a ray with impact parameter b gives deflection 4GM/bc², twice the value from a naive Newtonian photon calculation, as verified in 1919. (3) <strong>Innermost stable circular orbit.</strong> Unlike the Newtonian case, V<sub>eff</sub> has a maximum as well as a minimum, and they merge when L² = 12(GM/c)²; below r = 3r<sub>s</sub> = 6GM/c² no stable circular orbit exists. The ISCO has no Newtonian analogue at all, and it sets the inner edge of accretion disks and hence the efficiency (about 6% of rest mass) of black-hole accretion as an energy source.</p>
            <p>Note the structure of the argument: Killing vectors gave conserved quantities (Noether, Chapter 1), reduction to one dimension gave an effective potential (Chapter 1 again), and the physics is entirely in one correction term. This is a fitting close to the sequence — the machinery built in the first chapter is still the machinery doing the work in the last.</p>
            <p><strong>Further reading:</strong> Carroll, <em>Spacetime and Geometry</em>, §5.4 (geodesics of Schwarzschild, including the effective potential, the ISCO, and the orbit equation) and §5.5 (experimental tests: precession of perihelia, deflection of light, radar echo delay, gravitational redshift). Pages vary by edition; see §5.4-5.5. Wald, <em>General Relativity</em>, §6.3 covers the same three tests with more attention to the approximations used.</p>
          `,
          exercises: [
            "Derive the orbit equation d²u/dφ² + u = GM/L² + 3GMu²/c², where u = 1/r, from the effective potential above. Treat the last term as a perturbation, solve to first order, and obtain the perihelion advance Δφ = 6πGM/(c²a(1−e²)) per orbit. Then evaluate it numerically for Mercury and check the 43 arcsec/century figure.",
            "Analyze V_eff for massive particles: find the radii of circular orbits as a function of L, determine which are stable, show that stable circular orbits cease to exist at r = 6GM/c², and compute the binding energy per unit rest mass of a particle at the ISCO. Then repeat the analysis for photons, show there is a single unstable circular photon orbit at r = 3GM/c², and explain its role in determining the apparent size of a black hole shadow."
          ]
        }
      ]
    }
  ]
};
