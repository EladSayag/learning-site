// Data Science & Machine Learning content.
//
// Shape: const DATASCIENCE_SUBJECT = { id, name, color, chapters: [ { id, name, lessons: [...] } ] }
// Chapters are just a display grouping — they have NO effect on lesson order or unlocking.
// That's what `prerequisites` is for. See the matching header in data-physics.js for the full
// field-by-field doc (id/title/section/prerequisites/estMinutes/content/exercises).
//
// HISTORY: these five chapters ("numerical-linear-algebra", "optimization", "probability-statistics",
// "time-series", "classical-ml") originally lived inside data-algorithmics.js / ALGORITHMICS_SUBJECT.
// They were split out into this separate subject because their content — numerical linear algebra,
// convex optimization, statistical inference, time-series econometrics, and classical ML — is a
// distinct discipline from algorithms and data structures proper, even though the original build
// interleaved them (with a lot of forward/backward references between them, e.g. "Chapter 5",
// "Chapter 9" — those chapter-number references are stale artifacts of the old single-subject
// numbering and refer to lessons within *this* subject, not to Algorithmics).
//
// Lesson ids still carry the old "algo-" prefix from before the split. Left as-is on purpose:
// renaming would touch every id and content cross-reference for a purely cosmetic gain, and ids
// only need to be unique site-wide, not prefixed by their current subject.
//
// None of these lessons has a `prerequisites` field (all default to [], i.e. all are entry points)
// or a `section` field (all default to a single "General" grouping per chapter) — that's inherited
// unchanged from the original build, which never DAG-structured this material.

const DATASCIENCE_SUBJECT = {
  id: "datascience",
  name: "Data Science & Machine Learning",
  color: "#d1477a",
  chapters: [
    {
      id: "numerical-linear-algebra",
      name: "Numerical & Scientific Computing",
      lessons: [
        {
          id: "algo-numpy-memory-vectorization",
          title: "NumPy Internals: Strides, Broadcasting, and Why Loops Are Slow",
          content: `
            <p>A NumPy array is a contiguous block of typed memory plus metadata: <code>shape</code>, <code>dtype</code>, and <code>strides</code> (bytes to step per axis). Almost every "reshaping" operation — transpose, slicing, <code>reshape</code> when compatible, broadcasting — merely rewrites strides and returns a <em>view</em>, costing O(1) and copying nothing. Knowing this tells you exactly which operations are free and which silently materialise a new array.</p>
            <p>Broadcasting is a stride trick: to align shapes, missing leading axes are treated as length 1, and any axis of length 1 is stretched by setting its stride to 0, so the same memory is re-read. Hence <code>a[:, None] - b[None, :]</code> forms an n×m result without an explicit loop but <em>does</em> allocate n·m elements — the classic memory blow-up in pairwise-distance or pairwise-correlation code.</p>
            <p>Python loops are slow for structural reasons, not constant-factor ones: each iteration performs interpreter dispatch, boxing of a scalar into a Python object, and refcount traffic — roughly 50-200 ns per element, versus 0.5-2 ns for a vectorised kernel operating on unboxed, contiguous, SIMD-friendly memory. Two further consequences: C-order versus F-order matters because a row-major reduction along axis 0 strides across cache lines; and <code>float32</code> halves memory traffic, which on memory-bandwidth-bound operations halves the runtime — at the cost of precision that Chapter 5's conditioning discussion makes concrete.</p>
            <p><strong>Further reading:</strong> VanderPlas, <em>Python Data Science Handbook</em>, 2nd ed., Ch. 2 (§ on the basics of NumPy arrays, computation on arrays, and broadcasting); Harris et al., "Array programming with NumPy", <em>Nature</em> 585 (2020), §"The NumPy array" for the strides model.</p>
          `,
          exercises: [
            "Given a C-contiguous array of shape (n, m) with itemsize s, write down the strides. Then derive the strides of its transpose, of a[::2], and of a[:, None] broadcast against shape (n, k). For each, state whether it is a view or a copy and justify.",
            "Compute a rolling z-score over an array of 10^7 float64 prices three ways: a Python loop, a vectorised cumulative-sum approach, and a stride-tricks sliding-window view. Time all three, then explain the ranking in terms of memory traffic and numerical stability (the cumulative-sum version has a known catastrophic-cancellation failure mode — identify it)."
          ]
        },
        {
          id: "algo-conditioning-stability",
          title: "Conditioning and Backward Stability",
          content: `
            <p>Two independent things can go wrong in a numerical computation, and conflating them is the single most common source of confusion. <strong>Conditioning</strong> is a property of the <em>problem</em>: how much the exact answer moves when the input is perturbed. <strong>Stability</strong> is a property of the <em>algorithm</em>: how much extra error the finite-precision implementation adds.</p>
            <pre><code>relative condition number:  κ(f, x) = lim_{δ→0}  sup_{‖Δx‖≤δ}  (‖f(x+Δx) − f(x)‖/‖f(x)‖) / (‖Δx‖/‖x‖)
for a linear system Ax = b:  κ(A) = ‖A‖·‖A⁻¹‖ = σ_max/σ_min   (in the 2-norm)</code></pre>
            <p>An algorithm is <strong>backward stable</strong> if its computed output is the exact answer to a slightly perturbed input: <code>f̃(x) = f(x̃)</code> with <code>‖x̃ − x‖/‖x‖ = O(ε_machine)</code>. The fundamental estimate then combines both: <code>relative forward error ≲ κ(f,x) · O(ε_machine)</code>. So a backward stable algorithm on an ill-conditioned problem still returns garbage — and that is not the algorithm's fault. With IEEE double precision, ε ≈ 2.2·10⁻¹⁶, so κ ≈ 10¹⁶ means no correct digits remain.</p>
            <p>This matters directly downstream. Sample covariance matrices of many correlated assets are near-singular, so κ is enormous and any strategy that inverts one (mean-variance optimisation, OLS on collinear factors, Kalman updates) amplifies estimation noise into wild weights. The remedies are all conditioning remedies: use a QR or SVD solve rather than forming normal equations or an explicit inverse, shrink or regularise the matrix (Chapter 9's ridge is exactly this), or truncate small singular values.</p>
            <p><strong>Further reading:</strong> Trefethen & Bau, <em>Numerical Linear Algebra</em>, Lectures 12-15 (conditioning, floating-point arithmetic, stability, more on stability) and Lecture 18 (conditioning of least squares).</p>
          `,
          exercises: [
            "Prove that for a nonsingular A the relative condition number of the map b ↦ A⁻¹b, in the 2-norm, is bounded by κ(A) = σ_max/σ_min, and exhibit a b attaining it. Then construct a 2×2 example with κ ≈ 10^8 and demonstrate the loss of half the available digits numerically.",
            "Show that computing the sample variance by the 'sum of squares minus square of sum' formula is not backward stable, by constructing data where it returns a negative variance in float64. Then show Welford's online algorithm on the same data and explain the difference in terms of cancellation."
          ]
        },
        {
          id: "algo-lu-pivoting",
          title: "LU Factorization and the Role of Pivoting",
          content: `
            <p>Gaussian elimination on <em>Ax = b</em> is best understood as a factorization: it produces <code>A = LU</code> with L unit lower-triangular and U upper-triangular, in (2/3)n³ flops. Solving then costs O(n²) via two triangular solves — which is the whole reason to factor once and reuse: with <em>k</em> right-hand sides you pay (2/3)n³ + O(kn²), not k·(2/3)n³.</p>
            <p>Without pivoting the algorithm fails on <code>[[0,1],[1,1]]</code> — a perfectly well-conditioned matrix — because the pivot is zero. Worse, a <em>tiny</em> pivot does not fail outright; it produces multipliers of order 1/ε that swamp the remaining entries and destroy accuracy. Partial pivoting (swap in the largest-magnitude candidate pivot in the column) gives <code>PA = LU</code> and bounds all multipliers by 1 in magnitude.</p>
            <p>The subtle point Trefethen emphasises: LU with partial pivoting is <em>not</em> provably backward stable — the growth factor can reach 2^(n−1) on adversarial matrices — yet it is universally used because that growth essentially never occurs on real matrices. This is one of the few places in numerical analysis where practice rests on empirical rather than proved behaviour. For symmetric positive-definite A, use Cholesky <code>A = LLᵀ</code> instead: half the flops, no pivoting needed, and unconditionally stable — the right tool for covariance matrices, and its failure to complete is a useful test that a matrix is not positive definite.</p>
            <p><strong>Further reading:</strong> Trefethen & Bau, Lectures 20-23 (Gaussian elimination, pivoting, stability of Gaussian elimination, Cholesky).</p>
          `,
          exercises: [
            "Show that LU without pivoting applied to [[ε, 1], [1, 1]] yields a computed solution with O(1) relative error for small ε, and that partial pivoting fixes it. Quantify both using the multiplier magnitudes.",
            "Prove that a symmetric positive-definite matrix has a unique Cholesky factorization with positive diagonal, and that no pivoting is required for stability. Then explain what it means, statistically, when Cholesky fails on an empirical covariance matrix of T daily returns for N assets with N greater than T."
          ]
        },
        {
          id: "algo-qr-factorization",
          title: "QR Factorization: Gram-Schmidt vs Householder",
          content: `
            <p><code>A = QR</code> with Q orthonormal columns and R upper-triangular is the workhorse of numerical linear algebra. Geometrically, Q's columns are an orthonormal basis for the successive column spaces of A, and R records the change of basis — a constructive, numerically-aware version of the Gram-Schmidt process you already know.</p>
            <p>The theory-versus-practice gap here is instructive. Classical Gram-Schmidt is mathematically correct but numerically disastrous: rounding causes loss of orthogonality proportional to κ(A)², so for a mildly ill-conditioned A the computed Q is not orthogonal at all. Modified Gram-Schmidt reorders the same arithmetic (subtract each projection immediately rather than all at once) and reduces the loss to O(κ(A)·ε) — same operation count, same result in exact arithmetic, vastly different in floating point.</p>
            <p>Householder triangularization takes a different route: instead of orthogonalising columns, it applies a sequence of orthogonal reflections <code>Q = H₁H₂…Hₙ</code> that zero out subdiagonal entries. Because each reflector is exactly orthogonal to working precision, the result is unconditionally backward stable, and this is what LAPACK's <code>dgeqrf</code> (and hence <code>numpy.linalg.qr</code>) implements. Cost is 2mn² − (2/3)n³ for an m×n matrix. Givens rotations are the third option — more flops, but they zero one entry at a time, which makes them ideal for updating a factorization when one new row of data arrives, exactly the situation in a rolling regression over a moving window.</p>
            <p><strong>Further reading:</strong> Trefethen & Bau, Lectures 7-8 (QR and Gram-Schmidt), Lecture 9 (MGS), Lecture 10 (Householder triangularization), Lecture 16 (stability of Householder QR).</p>
          `,
          exercises: [
            "Construct a matrix with κ ≈ 10^8 and compute its QR by classical Gram-Schmidt, modified Gram-Schmidt, and Householder. Measure ‖QᵀQ − I‖ for each and confirm the κ², κ, and O(ε) scalings predicted by theory.",
            "Derive the Householder reflector H = I − 2vvᵀ/(vᵀv) that maps a given vector x to ±‖x‖e₁, and explain why the sign is chosen to be −sign(x₁) rather than +. Then count the flops for the full triangularization and compare with modified Gram-Schmidt."
          ]
        },
        {
          id: "algo-least-squares",
          title: "Least Squares: Three Algorithms, Three Condition Numbers",
          content: `
            <p>The problem min ‖Ax − b‖₂ for A of full column rank has a unique solution characterised by orthogonality of the residual to range(A): <code>Aᵀ(Ax − b) = 0</code>, the normal equations. That is the mathematics; the numerics offer three genuinely different algorithms.</p>
            <table class="mini-table">
              <tr><th>Method</th><th>Cost (m×n, m ≫ n)</th><th>Effective conditioning</th></tr>
              <tr><td>Normal equations, Cholesky on AᵀA</td><td>mn² + n³/3</td><td>κ(A)² — squares the problem</td></tr>
              <tr><td>Householder QR, solve Rx = Qᵀb</td><td>2mn² − 2n³/3</td><td>κ(A) — backward stable</td></tr>
              <tr><td>SVD, x = VΣ⁻¹Uᵀb</td><td>≈ 2mn² + 11n³</td><td>κ(A); handles rank deficiency</td></tr>
            </table>
            <p>The κ(A)² in row one is the single most important practical fact in this chapter. Forming AᵀA loses half your significant digits before any solving begins, so <code>np.linalg.inv(X.T @ X) @ X.T @ y</code> — the formula everyone writes first — is the wrong implementation of a right formula. Use <code>np.linalg.lstsq</code> (QR/SVD-based) instead. With nearly collinear regressors, which is the normal situation for factor models and technical indicators built from the same price series, the difference is not academic: it is the difference between stable coefficients and coefficients that flip sign when you add a day of data.</p>
            <p>When A is genuinely rank-deficient or nearly so, only the SVD route is meaningful: truncating small singular values gives the minimum-norm solution and is the numerical ancestor of ridge regression (Chapter 9), which shrinks rather than truncates.</p>
            <p><strong>Further reading:</strong> Trefethen & Bau, Lecture 11 (least squares problems), Lecture 18 (conditioning of least squares) and Lecture 19 (stability of least squares algorithms).</p>
          `,
          exercises: [
            "Prove that κ₂(AᵀA) = κ₂(A)² for full-rank A. Then build a design matrix from a price series and three near-duplicate technical indicators, solve by both the normal equations and lstsq in float64, and report the divergence in coefficients.",
            "Derive the minimum-norm least-squares solution via the SVD for rank-deficient A, and prove it is the unique minimiser of ‖x‖₂ among all minimisers of ‖Ax − b‖₂. Then show how truncating singular values below a threshold τ relates to ridge regression with penalty λ — give the exact filter factors of each."
          ]
        },
        {
          id: "algo-svd",
          title: "The Singular Value Decomposition",
          content: `
            <p>Every matrix A (m×n, any rank) factors as <code>A = UΣVᵀ</code> with U, V orthogonal and Σ diagonal with <code>σ₁ ≥ σ₂ ≥ … ≥ 0</code>. Geometrically: every linear map is a rotation/reflection, then an axis-aligned scaling, then another rotation/reflection — the image of the unit sphere is always a hyperellipse whose semi-axis lengths are the singular values. That statement alone unifies rank, norm, range, null space, and conditioning:</p>
            <pre><code>rank(A) = #{ σᵢ &gt; 0 }          ‖A‖₂ = σ₁          ‖A‖_F = √(Σ σᵢ²)
range(A) = span{u₁,…,u_r}       null(A) = span{v_{r+1},…,v_n}
κ₂(A) = σ₁/σ_r                  σᵢ(A) = √λᵢ(AᵀA)</code></pre>
            <p>The result that makes SVD indispensable is <strong>Eckart-Young-Mirsky</strong>: the best rank-k approximation of A in both the spectral and Frobenius norms is the truncation <code>A_k = Σ_{i≤k} σᵢuᵢvᵢᵀ</code>, with error exactly <code>σ_{k+1}</code> in the 2-norm. No other rank-k matrix does better — optimality, not a heuristic.</p>
            <p>Importantly, SVD is computed <em>without</em> forming AᵀA (which would square the conditioning); the standard algorithm bidiagonalises A by Householder reflections and then runs an implicit QR-type iteration on the bidiagonal form, at O(mn²) cost and with full backward stability.</p>
            <p><strong>Further reading:</strong> Trefethen & Bau, Lectures 4-5 (the SVD, more on the SVD — including the low-rank approximation theorem) and Lecture 31 (computing the SVD).</p>
          `,
          exercises: [
            "Prove the Eckart-Young theorem in the spectral norm: for any B of rank at most k, ‖A − B‖₂ ≥ σ_{k+1}, with equality for the truncated SVD. (Hint: dimension-count the intersection of null(B) with span{v₁,…,v_{k+1}}.)",
            "Show that the singular values of A are the square roots of the eigenvalues of AᵀA, then explain quantitatively why computing the SVD via the eigendecomposition of AᵀA is a bad idea in floating point. Give a concrete A where the smallest singular value is computed as exactly zero by that route but correctly by numpy.linalg.svd."
          ]
        },
        {
          id: "algo-svd-pca-denoising",
          title: "SVD in Practice: PCA, Whitening, and Noise Filtering",
          content: `
            <p>Centre a data matrix X (T observations × N variables) and its SVD <code>X = UΣVᵀ</code> immediately gives PCA: the columns of V are principal directions, <code>σᵢ²/(T−1)</code> are the explained variances, and <code>UΣ</code> holds the scores. There is no need to form the N×N covariance matrix at all — a direct benefit, since forming it squares the condition number (previous lessons).</p>
            <p>For asset returns this has a well-known structure: the first principal component of an equity cross-section is essentially the market factor, typically explaining 20-40% of variance, with subsequent components approximating sector or style factors. Random matrix theory sharpens this into a usable filter. If the true correlation matrix were identity, the eigenvalues of the sample correlation matrix of N series over T observations would follow the Marchenko-Pastur law, supported on <code>[(1 ± √(N/T))²]</code>. Eigenvalues inside that band are statistically indistinguishable from noise; only those above the upper edge carry signal. Replacing the in-band eigenvalues by their average and reconstructing yields a cleaned covariance matrix that is far better conditioned and produces far more stable portfolio weights.</p>
            <p>Two cautions. PCA is not scale-invariant, so decide deliberately between the covariance and correlation versions (i.e. whether to standardise). And principal components on <em>rolling</em> windows suffer sign and ordering instability — components can swap places between windows — which quietly corrupts any feature built from them unless you align signs explicitly.</p>
            <p><strong>Further reading:</strong> Hastie, Tibshirani & Friedman, <em>The Elements of Statistical Learning</em>, 2nd ed., §14.5 (principal components) and §3.4.1 for the PCA-ridge connection; Trefethen & Bau, Lecture 5 for the low-rank theory.</p>
          `,
          exercises: [
            "Show that the principal directions from the SVD of a centred X coincide with the eigenvectors of the sample covariance matrix, and that the k-dimensional projection they define minimises reconstruction error — i.e. derive PCA as a corollary of Eckart-Young.",
            "Simulate T = 500 days of returns for N = 200 independent Gaussian series, compute the eigenvalue spectrum of the sample correlation matrix, and compare it to the Marchenko-Pastur density with ratio q = N/T. Then repeat with one injected common factor and verify that exactly one eigenvalue escapes the upper edge."
          ]
        },
        {
          id: "algo-eigenvalue-algorithms",
          title: "Eigenvalue Algorithms: Why Iteration Is Unavoidable",
          content: `
            <p>Eigenvalues cannot be computed by a finite algorithm. Abel-Ruffini says the roots of a general degree-5 polynomial admit no radical formula, and any matrix is the companion matrix of some polynomial, so a finite rational eigenvalue algorithm would contradict it. Every eigensolver is therefore <em>iterative</em>, and convergence rates — not flop counts alone — determine cost.</p>
            <p>The progression is worth knowing as a whole:</p>
            <ul>
              <li><strong>Power iteration</strong>: repeatedly apply A and normalise; converges to the dominant eigenvector at rate <code>|λ₂/λ₁|</code> — slow when the top eigenvalues are close.</li>
              <li><strong>Inverse iteration with shift</strong>: apply <code>(A − μI)⁻¹</code> to target the eigenvalue nearest μ; the near-singularity is not a problem, it is the mechanism.</li>
              <li><strong>Rayleigh quotient iteration</strong>: update the shift to the Rayleigh quotient each step — cubic convergence for symmetric matrices.</li>
              <li><strong>The QR algorithm</strong> (what LAPACK actually runs): reduce to Hessenberg (or tridiagonal, if symmetric) form once, then iterate <code>A_k = Q_kR_k, A_{k+1} = R_kQ_k</code> with shifts and deflation. It is power iteration on all invariant subspaces at once.</li>
            </ul>
            <p>For symmetric matrices — the case that matters for covariance matrices — everything is better: eigenvalues are real, eigenvectors orthogonal, and the eigenvalue problem is <em>perfectly conditioned</em> in the sense that a perturbation E moves each eigenvalue by at most ‖E‖₂ (Weyl). Eigen<em>vectors</em>, by contrast, are ill-conditioned when eigenvalues cluster — which is exactly why rolling-window PCA components swap. Use <code>eigh</code>, never <code>eig</code>, on a symmetric matrix.</p>
            <p><strong>Further reading:</strong> Trefethen & Bau, Lectures 24-25 (eigenvalue problems, overview of algorithms), Lecture 27 (Rayleigh quotient, inverse iteration), Lectures 28-29 (QR algorithm with and without shifts).</p>
          `,
          exercises: [
            "Prove Weyl's inequality for symmetric matrices: |λᵢ(A+E) − λᵢ(A)| ≤ ‖E‖₂ for every i. Then derive a bound on the rotation of an eigenvector in terms of the gap to the nearest other eigenvalue, and use it to explain rolling-PCA instability quantitatively.",
            "Implement unshifted QR iteration on a symmetric tridiagonal matrix and observe the convergence rate; then add the Wilkinson shift and measure the improvement. Explain why the Hessenberg/tridiagonal reduction is performed once up front rather than per iteration."
          ]
        }
      ]
    },
    {
      id: "optimization",
      name: "Optimization",
      lessons: [
        {
          id: "algo-convexity-fundamentals",
          title: "Convexity: What It Buys and How to Recognise It",
          content: `
            <p>Convexity is the dividing line between optimisation problems that are reliably solvable and those that are not. A set C is convex if it contains the segment between any two of its points; <em>f</em> is convex if its epigraph is a convex set, equivalently <code>f(θx + (1−θ)y) ≤ θf(x) + (1−θ)f(y)</code>. The consequences are exactly what makes convex problems tractable:</p>
            <ul>
              <li>Every local minimum is global (so any descent method that stalls has actually solved the problem).</li>
              <li>∇f(x*) = 0 is sufficient, not just necessary, for optimality in the unconstrained differentiable case.</li>
              <li>The optimal set is convex; with strict convexity the minimiser is unique.</li>
              <li>Strong duality holds under mild constraint qualification (Slater), giving certificates of optimality.</li>
            </ul>
            <p>Recognising convexity in practice is a calculus of constructions rather than a check of the definition: nonnegative weighted sums, pointwise supremum, composition with an affine map, and composition rules (<em>h</em> convex nondecreasing ∘ <em>g</em> convex) all preserve convexity. For twice-differentiable <em>f</em> the test is <code>∇²f ⪰ 0</code>. Useful landmarks: all norms are convex; <code>−log det X</code> is convex on positive-definite X; the max-eigenvalue function is convex; the log-sum-exp is convex.</p>
            <p>Strong convexity — <code>∇²f ⪰ mI</code> for some m &gt; 0 — is the stronger property that actually drives convergence <em>rates</em>, as the next lesson makes precise. Notably, mean-variance portfolio optimisation with a positive-definite covariance and linear constraints is a convex QP, so it is globally solvable; its practical unreliability comes entirely from estimation error in its inputs, not from the optimisation.</p>
            <p><strong>Further reading:</strong> Boyd & Vandenberghe, <em>Convex Optimization</em>, Ch. 2 (convex sets) and Ch. 3 (convex functions, especially §3.2 operations preserving convexity); Ch. 4 for the problem taxonomy (LP, QP, SOCP, SDP).</p>
          `,
          exercises: [
            "Prove that the pointwise supremum of an arbitrary family of convex functions is convex, and use it to show that the maximum eigenvalue λ_max(X) of a symmetric matrix is a convex function of X. Then deduce that the spectral norm is convex.",
            "Show that the mean-variance problem min wᵀΣw subject to wᵀμ ≥ r and 1ᵀw = 1 is a convex QP when Σ ≻ 0, derive its solution via Lagrange multipliers, and then demonstrate numerically how the solution's sensitivity scales with κ(Σ)."
          ]
        },
        {
          id: "algo-gradient-descent-convergence",
          title: "Gradient Descent and Its Convergence Rates",
          content: `
            <p>Gradient descent is <code>x_{k+1} = x_k − η∇f(x_k)</code>. The theory is a small table, and knowing it tells you what to expect before you run anything.</p>
            <table class="mini-table">
              <tr><th>Assumptions</th><th>Step size</th><th>Rate</th></tr>
              <tr><td>Convex, L-smooth</td><td>η = 1/L</td><td>f(x_k) − f* = O(1/k)</td></tr>
              <tr><td>m-strongly convex, L-smooth</td><td>η = 2/(m+L)</td><td>linear: ((κ−1)/(κ+1))^{2k}, κ = L/m</td></tr>
              <tr><td>Nonconvex, L-smooth</td><td>η = 1/L</td><td>min ‖∇f‖² = O(1/k) (stationary point only)</td></tr>
            </table>
            <p>The strongly convex rate exposes the central fact: convergence is governed by the condition number κ = L/m of the Hessian, and on an ill-conditioned quadratic the iterates zig-zag across a narrow valley, making progress only along the small-curvature direction. This is the same κ from Chapter 5's linear algebra — the connection is exact, since gradient descent on <code>½xᵀAx − bᵀx</code> is an iterative solver for <code>Ax = b</code>.</p>
            <p>The fixes are all preconditioning in disguise: Newton's method (<code>x − (∇²f)⁻¹∇f</code>) is affine-invariant and thus immune to κ, at the cost of forming and factoring a Hessian; quasi-Newton (BFGS, L-BFGS) builds a low-rank Hessian approximation from gradient differences; heavy-ball and Nesterov momentum improve the dependence from κ to √κ, which is optimal for first-order methods on this class. In machine-learning practice, feature standardisation is preconditioning too — it is what keeps κ small enough for plain SGD to work.</p>
            <p><strong>Further reading:</strong> Boyd & Vandenberghe, §9.2-9.3 (descent methods, gradient descent and its convergence analysis) and §9.5 (Newton's method); Nesterov, <em>Lectures on Convex Optimization</em>, 2nd ed., §2.1 for the optimal first-order lower bound.</p>
          `,
          exercises: [
            "For f(x) = ½xᵀAx with A ≻ 0, derive the exact error recursion of gradient descent in the eigenbasis of A, and prove the optimal fixed step size is 2/(λ_min + λ_max) with contraction factor (κ−1)/(κ+1). Then show the O(1/k) rate for the merely convex L-smooth case.",
            "Implement gradient descent, heavy-ball momentum, and Nesterov acceleration on a quadratic with κ = 10^4. Plot error against iteration count on a log scale, verify the κ versus √κ scaling empirically, and explain why momentum can be non-monotone in f."
          ]
        },
        {
          id: "algo-sgd-adam",
          title: "Stochastic Gradient Methods: SGD, Momentum, and Adam",
          content: `
            <p>When <code>f(x) = (1/n)Σᵢ fᵢ(x)</code> with n large, a full gradient costs n times a single-sample gradient while providing only a variance reduction. SGD uses a minibatch estimate, so per-iteration cost drops by orders of magnitude, and the resulting noise is not purely harmful — it acts as implicit regularisation and helps escape saddle points, which dominate high-dimensional nonconvex landscapes far more than local minima do.</p>
            <p>The price is that the gradient estimate has variance that does not vanish at the optimum, so a constant step size converges only to a noise ball of radius O(η·σ²). Convergence requires a decaying schedule, classically the Robbins-Monro conditions <code>Σηₖ = ∞</code> and <code>Σηₖ² &lt; ∞</code>, giving O(1/√k) for convex and O(1/k) for strongly convex objectives — much slower per iteration than full-batch, but far cheaper per iteration.</p>
            <pre><code>Adam:   mₖ = β₁m_{k−1} + (1−β₁)gₖ           # first-moment estimate
        vₖ = β₂v_{k−1} + (1−β₂)gₖ²          # second-moment estimate
        m̂ = mₖ/(1−β₁^k),  v̂ = vₖ/(1−β₂^k)   # bias correction
        x ← x − η · m̂ / (√v̂ + ε)</code></pre>
            <p>Read Adam as a diagonal preconditioner estimated online: dividing by √v̂ equalises the per-coordinate scales, which is why it tolerates badly scaled features that would cripple plain SGD. The bias-correction terms matter only in the first few dozen steps but matter a lot there, since m and v are initialised at zero. Adam is not universally better — on convex problems it can converge to a worse point than well-tuned SGD with momentum, and its adaptivity can amplify noisy rare features, a real risk on financial data where the informative events are exactly the rare ones.</p>
            <p><strong>Further reading:</strong> Goodfellow, Bengio & Courville, <em>Deep Learning</em>, §8.3 (basic algorithms: SGD, momentum) and §8.5 (algorithms with adaptive learning rates: AdaGrad, RMSProp, Adam); Bottou, Curtis & Nocedal, "Optimization Methods for Large-Scale Machine Learning", <em>SIAM Review</em> 60(2), §4.</p>
          `,
          exercises: [
            "Prove that SGD with constant step size η on an m-strongly convex objective with gradient noise variance σ² converges linearly to a ball of radius O(ησ²/m) around the optimum, and derive the O(1/k) rate under the step schedule ηₖ = 1/(mk).",
            "Derive Adam's bias-correction factors by computing E[mₖ] and E[vₖ] under the assumption of stationary gradients, showing that without correction the early steps are biased toward zero by a factor (1 − β₁^k). Then construct a simple convex problem where Adam converges to a strictly worse point than SGD with momentum."
          ]
        },
        {
          id: "algo-duality-kkt",
          title: "Lagrange Duality and the KKT Conditions",
          content: `
            <p>For the problem min f₀(x) subject to fᵢ(x) ≤ 0 and hⱼ(x) = 0, form the Lagrangian <code>L(x,λ,ν) = f₀(x) + Σλᵢfᵢ(x) + Σνⱼhⱼ(x)</code> and the dual function <code>g(λ,ν) = inf_x L</code>. Because g is a pointwise infimum of affine functions of (λ,ν), it is <em>always concave</em>, even when the primal is not convex, and it always lower-bounds the optimum: <code>g(λ,ν) ≤ p*</code> for λ ⪰ 0. That is weak duality, and it makes any feasible dual point a certificate of a bound.</p>
            <p>Under convexity plus a constraint qualification (Slater: some strictly feasible point exists), <strong>strong duality</strong> holds, <code>d* = p*</code>, and the KKT conditions become necessary and sufficient:</p>
            <pre><code>1. primal feasibility:   fᵢ(x*) ≤ 0,   hⱼ(x*) = 0
2. dual feasibility:     λᵢ* ≥ 0
3. complementary slack:  λᵢ* · fᵢ(x*) = 0
4. stationarity:         ∇f₀(x*) + Σλᵢ*∇fᵢ(x*) + Σνⱼ*∇hⱼ(x*) = 0</code></pre>
            <p>Complementary slackness is the interpretively rich condition: a constraint is either inactive (fᵢ &lt; 0) or has a positive price (λᵢ &gt; 0), never both. The multiplier is a shadow price — <code>∂p*/∂(constraint level) = −λᵢ*</code> — which is why duality is the natural language for constrained portfolio problems: λ on a leverage cap tells you exactly how many basis points of expected return the cap is costing.</p>
            <p>Duality also explains structure elsewhere in this course. The SVM's dual (Chapter 9) is what exposes support vectors and enables the kernel trick; ridge and lasso are the Lagrangian forms of norm-constrained least squares, and the constrained-versus-penalised equivalence is exactly strong duality.</p>
            <p><strong>Further reading:</strong> Boyd & Vandenberghe, §5.1-5.2 (Lagrange dual, weak/strong duality), §5.3 (geometric interpretation), §5.5 (optimality conditions and KKT), §5.6 (perturbation and sensitivity analysis).</p>
          `,
          exercises: [
            "Derive the dual of the equality-constrained least-norm problem min ‖x‖₂² subject to Ax = b, solve it in closed form, and verify strong duality directly. Then interpret the multipliers.",
            "Show that the constrained problem min ‖y − Xβ‖² subject to ‖β‖₂² ≤ t and the penalised problem min ‖y − Xβ‖² + λ‖β‖₂² have the same solution path, and give the exact correspondence between t and λ. Then explain why the analogous statement for the ℓ₁ norm still holds despite non-differentiability, and what replaces the gradient in the KKT stationarity condition."
          ]
        }
      ]
    },
    {
      id: "probability-statistics",
      name: "Probability & Statistics for Inference",
      lessons: [
        {
          id: "algo-mle-asymptotics",
          title: "Maximum Likelihood: Fisher Information and Asymptotic Normality",
          content: `
            <p>The MLE maximises <code>ℓ(θ) = Σᵢ log p(xᵢ; θ)</code>. Its importance rests on a package of asymptotic guarantees rather than on any finite-sample optimality: under regularity conditions (identifiability, interior true parameter, smoothness, exchangeable differentiation and integration), the MLE is consistent, asymptotically normal, and asymptotically efficient:</p>
            <pre><code>√n (θ̂ₙ − θ₀)  →d  N(0, I(θ₀)⁻¹)

I(θ) = E[(∂/∂θ log p(X;θ))²] = −E[∂²/∂θ² log p(X;θ)]      (Fisher information)</code></pre>
            <p>Efficiency means the asymptotic variance attains the Cramér-Rao lower bound, so no other regular unbiased estimator does better asymptotically. Two practical corollaries: standard errors come from the inverse observed information (numerically, the inverse Hessian of the negative log-likelihood at the optimum — hence the conditioning concerns of Chapter 5 apply directly to your error bars), and the delta method transports these results through smooth reparametrisations.</p>
            <p>The regularity conditions are not pedantry; the cases that violate them appear constantly in finance. The uniform distribution's support endpoint gives a non-normal, faster-than-√n limit. Unit-root time series (Chapter 8) violate stationarity, and the corresponding estimator has a nonstandard Dickey-Fuller limiting distribution — which is precisely why the ADF test has its own critical value tables instead of using normal quantiles. Heavy-tailed return distributions can make the information integral fail to exist.</p>
            <p><strong>Further reading:</strong> Wasserman, <em>All of Statistics</em>, §9.3-9.4 (maximum likelihood, properties), §9.6-9.7 (equivariance, asymptotic normality, Fisher information), §9.9 (the delta method).</p>
          `,
          exercises: [
            "Derive the Fisher information for a scalar Gaussian with unknown mean and variance, verify the two equivalent forms of I(θ), and state the resulting asymptotic covariance of the MLE. Then show explicitly why the MLE of σ² is biased in finite samples yet consistent.",
            "Let X₁,…,Xₙ be iid Uniform(0, θ). Find the MLE, derive its exact distribution, and show that n(θ − θ̂) converges to an exponential rather than a normal limit. Identify which regularity condition fails and why."
          ]
        },
        {
          id: "algo-map-bayesian-inference",
          title: "Bayesian Inference, MAP, and Shrinkage",
          content: `
            <p>Bayesian inference treats θ as random: <code>p(θ | x) ∝ p(x | θ)·p(θ)</code>. The MAP estimator maximises the posterior, and reduces to the MLE under a flat prior. The connection worth internalising is that <strong>MAP with a prior is exactly penalised maximum likelihood</strong>: a Gaussian prior <code>N(0, τ²)</code> yields an ℓ₂ penalty (ridge), a Laplace prior yields an ℓ₁ penalty (lasso). Regularisation in Chapter 9 is not an ad-hoc trick — it is a prior, and asking "what prior am I implicitly asserting?" is a good discipline.</p>
            <p>The characteristic Bayesian behaviour is shrinkage. For a Gaussian likelihood with Gaussian prior, the posterior mean is a precision-weighted average of prior mean and sample mean, so weak data is pulled toward the prior and abundant data overwhelms it. That is the right structure for estimating expected returns, where the sample mean of returns is notoriously noisy — you need decades of data for the standard error of a mean return to shrink to a usable level, whereas volatility is estimable from months. Bayesian shrinkage (Black-Litterman is the standard finance instance) formalises "trust your prior about means, trust the data about covariances".</p>
            <p>Three practical points: the full posterior, not the MAP point, is where the value lies (MAP is not even parametrisation-invariant, unlike the posterior mean); conjugate priors give closed forms and cheap sequential updating; and when conjugacy fails, MCMC or variational inference is required, which changes the computational profile completely.</p>
            <p><strong>Further reading:</strong> Wasserman, <em>All of Statistics</em>, §11.1-11.3 (the Bayesian method, functions of parameters, simulation) and §11.6-11.9 (large-sample properties, flat priors, the frequentist-Bayes comparison); ESL §3.4.3 for the prior-penalty correspondence.</p>
          `,
          exercises: [
            "Derive the posterior for a Gaussian mean with known variance under a Gaussian prior, and express the posterior mean as a convex combination of prior mean and sample mean with weights given by precisions. Then take n → ∞ and τ → ∞ and interpret both limits.",
            "Prove that MAP estimation with a Laplace prior on the coefficients is equivalent to lasso regression, giving the exact correspondence between the prior scale and λ. Then explain why the MAP solution is sparse while the posterior mean under the same prior is not."
          ]
        },
        {
          id: "algo-hypothesis-testing",
          title: "Hypothesis Testing, p-values, and the Multiple-Testing Problem",
          content: `
            <p>A test partitions the sample space into acceptance and rejection regions for H₀, controlling the type I error rate at α. The p-value is the smallest α at which the observed data would reject — it is <em>not</em> the probability that H₀ is true, and under H₀ with a continuous test statistic it is exactly Uniform(0,1). That last fact is the whole basis of the multiple-testing problem: run 100 independent tests of true null hypotheses at α = 0.05 and you expect five rejections purely by construction.</p>
            <p>The Neyman-Pearson lemma identifies the likelihood ratio as the most powerful test for simple hypotheses, and its generalisation (Wilks) gives <code>2·log Λ →d χ²_k</code> for nested models — the standard machinery behind the ADF and Johansen tests of Chapter 10.</p>
            <table class="mini-table">
              <tr><th>Correction</th><th>Controls</th><th>Character</th></tr>
              <tr><td>Bonferroni: reject if p &lt; α/m</td><td>family-wise error rate</td><td>conservative, valid under any dependence</td></tr>
              <tr><td>Holm step-down</td><td>family-wise error rate</td><td>uniformly more powerful than Bonferroni</td></tr>
              <tr><td>Benjamini-Hochberg</td><td>false discovery rate</td><td>much more powerful; expects some false positives</td></tr>
            </table>
            <p>This is the statistical core of backtest overfitting. A researcher who tries 200 strategy variants and reports the one with t = 2.5 has reported a maximum of 200 draws, not a single draw, and the correct null distribution is that of the maximum. Chapter 11's deflated Sharpe ratio is exactly this correction applied to Sharpe ratios, and the honest practice is to record how many configurations were tried <em>before</em> looking at the results.</p>
            <p><strong>Further reading:</strong> Wasserman, <em>All of Statistics</em>, §10.1-10.4 (Wald test, p-values, χ² and likelihood ratio tests), §10.7 (multiple testing, Bonferroni and Benjamini-Hochberg).</p>
          `,
          exercises: [
            "Prove that under a continuous null distribution the p-value is Uniform(0,1), and use this to derive the exact probability of at least one false rejection among m independent tests at level α. Then derive the Bonferroni bound without assuming independence, using only the union bound.",
            "Simulate 500 random 'strategies' as iid Gaussian return series with true mean zero, compute each one's t-statistic over 1000 days, and record the maximum. Compare the distribution of that maximum with the standard normal, and derive the level at which a single reported t-statistic should be judged when 500 were tried."
          ]
        },
        {
          id: "algo-bootstrap",
          title: "The Bootstrap and Its Failure on Dependent Data",
          content: `
            <p>The bootstrap estimates the sampling distribution of a statistic by resampling the observed data with replacement, using the empirical distribution F̂ₙ as a plug-in for the unknown F. It works because F̂ₙ → F uniformly (Glivenko-Cantelli) and because most statistics of interest are smooth functionals of F, so their sampling distributions converge correspondingly. It buys you standard errors and confidence intervals for statistics with no tractable analytic distribution — median, correlation, Sharpe ratio, maximum drawdown.</p>
            <p>Its failure modes are the important part for this course. The naive iid bootstrap destroys temporal dependence, so applied to a return series it will underestimate the variance of any statistic that depends on autocorrelation or volatility clustering — it will make a mean-reversion strategy's Sharpe ratio look far more reliable than it is. The corrections are block methods that resample contiguous chunks, preserving dependence within blocks:</p>
            <ul>
              <li><strong>Moving block bootstrap</strong>: resample overlapping blocks of fixed length b; requires b → ∞ with b/n → 0.</li>
              <li><strong>Stationary bootstrap</strong> (Politis-Romano): geometric random block lengths, so the resampled series is stationary.</li>
              <li><strong>Circular block bootstrap</strong>: wraps the series to give all observations equal resampling weight.</li>
            </ul>
            <p>The bootstrap also fails outright for non-smooth functionals — extreme order statistics such as the sample maximum are the canonical counterexample, which matters because maximum drawdown is close to such a functional. Related and useful later: resampling returns to build synthetic price paths is the honest way to ask whether a backtest result could have arisen by chance, a theme developed in Chapter 11.</p>
            <p><strong>Further reading:</strong> Wasserman, <em>All of Statistics</em>, §8.1-8.3 (the bootstrap, bootstrap variance estimation, bootstrap confidence intervals); Politis & Romano (1994) for the stationary bootstrap.</p>
          `,
          exercises: [
            "Show by simulation that the iid bootstrap gives too-narrow confidence intervals for the mean of an AR(1) series with φ = 0.7, quantify the underestimation as a function of φ, and verify that a moving block bootstrap with a suitable block length corrects it. Derive the theoretically appropriate block length scaling in n.",
            "Prove that the bootstrap fails for the sample maximum of iid Uniform(0,θ): show that the bootstrap distribution of the maximum places an atom of probability approximately 1 − 1/e at the observed maximum, and therefore cannot converge to the correct limiting distribution."
          ]
        }
      ]
    },
    {
      id: "time-series",
      name: "Time Series Foundations",
      lessons: [
        {
          id: "algo-stationarity",
          title: "Stationarity, Ergodicity, and Why They Matter",
          content: `
            <p>Nearly every time-series estimator is justified by a law of large numbers along a single realisation — you have one price path, not an ensemble of them. Two conditions license that. <strong>Strict stationarity</strong>: the joint law of <code>(X_t, …, X_{t+k})</code> is invariant under time shifts. <strong>Weak (covariance) stationarity</strong>: the mean is constant and <code>Cov(X_t, X_{t+h}) = γ(h)</code> depends only on the lag. Weak stationarity is what the standard theory uses, and for Gaussian processes the two coincide.</p>
            <p><strong>Ergodicity</strong> is the separate condition that time averages converge to ensemble averages. Stationarity alone is not enough: a process that draws a random level once at t = 0 and then stays there forever is strictly stationary but has time averages that never converge to the ensemble mean. Ergodicity is what makes a single historical price path informative about the process at all, and it is precisely the assumption that regime changes violate.</p>
            <p>Price levels are almost never stationary; returns usually are, at least approximately, and this is why finance works in returns or log returns. But the transformation is lossy — differencing removes the memory that a mean-reversion strategy trades on. That tension motivates fractional differentiation (differencing by a real order d between 0 and 1 to reach stationarity while preserving as much memory as possible), the central idea of López de Prado's feature-engineering chapter. Even in returns, stationarity is only approximate: volatility clustering means the conditional variance is time-varying, which is exactly what GARCH models in Chapter 10.</p>
            <p><strong>Further reading:</strong> Tsay, <em>Analysis of Financial Time Series</em>, 3rd ed., §2.1 (stationarity) and §2.3 (white noise and linear time series); Hamilton, <em>Time Series Analysis</em>, §3.1 and §7.1-7.2 for ergodicity; López de Prado, <em>Advances in Financial Machine Learning</em>, Ch. 5 for fractional differentiation.</p>
          `,
          exercises: [
            "Give an example of a process that is weakly but not strictly stationary, and one that is strictly but not weakly stationary (hint: consider infinite variance). Then prove that for a Gaussian process the two notions coincide.",
            "Construct a stationary but non-ergodic process explicitly, and show that its sample mean converges almost surely to a random variable rather than to a constant. Then explain what the analogous failure looks like when backtesting across a structural regime change."
          ]
        },
        {
          id: "algo-acf-pacf",
          title: "Autocorrelation, Partial Autocorrelation, and Model Identification",
          content: `
            <p>For a weakly stationary series, the ACF <code>ρ(h) = γ(h)/γ(0)</code> summarises linear dependence at lag h, and the PACF <code>φ_{hh}</code> gives the correlation between <code>X_t</code> and <code>X_{t−h}</code> after removing the linear effect of the intervening lags — equivalently, the last coefficient in the best linear predictor of order h. The two functions together identify model order, because AR and MA processes leave complementary signatures:</p>
            <table class="mini-table">
              <tr><th>Process</th><th>ACF</th><th>PACF</th></tr>
              <tr><td>AR(p)</td><td>decays geometrically / sinusoidally</td><td>cuts off after lag p</td></tr>
              <tr><td>MA(q)</td><td>cuts off after lag q</td><td>decays</td></tr>
              <tr><td>ARMA(p,q)</td><td>decays after lag q</td><td>decays after lag p</td></tr>
            </table>
            <p>Under the null of white noise, sample autocorrelations are approximately <code>N(0, 1/T)</code>, giving the ±1.96/√T bands drawn on every correlogram, and the Ljung-Box statistic <code>Q(m) = T(T+2)Σ_{h=1..m} ρ̂(h)²/(T−h)</code> tests them jointly against χ²_m.</p>
            <p>Applied to financial returns the finding is consistent and important: the ACF of returns is close to zero at all lags beyond one or two (weak-form efficiency), while the ACF of <em>squared</em> or absolute returns is strongly positive and decays slowly — volatility clustering. So returns are approximately serially uncorrelated but very far from independent. Any strategy premised on linear autocorrelation of returns is fighting a small, unstable effect; strategies premised on volatility persistence are exploiting a robust one.</p>
            <p><strong>Further reading:</strong> Tsay, 3rd ed., §2.2 (correlation and the ACF, including the Ljung-Box test), §2.4.2 and §2.5.2 for the identification rules.</p>
          `,
          exercises: [
            "Derive the ACF of an AR(1) process X_t = φX_{t−1} + ε_t and show ρ(h) = φ^h. Then derive the PACF and prove it cuts off after lag 1. Explain what the AR(1) is doing when φ is negative.",
            "Download or simulate a daily equity return series. Plot the ACF of returns, of squared returns, and of absolute returns out to 100 lags, and apply the Ljung-Box test to each at m = 20. Interpret the three results together and state what they imply for the choice between a mean-reversion and a volatility-based strategy."
          ]
        },
        {
          id: "algo-random-walks-unit-roots",
          title: "Random Walks, Unit Roots, and Spurious Regression",
          content: `
            <p>The random walk <code>X_t = X_{t−1} + ε_t</code> is the AR(1) at the boundary φ = 1 and is the natural null model for prices. It is nonstationary in a specific way: the variance grows linearly, <code>Var(X_t) = tσ²</code>, so shocks are permanent rather than transient, and the best forecast of tomorrow's price is today's price. This is the unit-root case, named for the root of the autoregressive polynomial lying exactly on the unit circle.</p>
            <p>Two consequences drive everything in the next chapters. First, standard asymptotics break: the OLS estimate of φ under a unit root converges at rate T rather than √T and its limiting distribution is a functional of Brownian motion, not normal — which is why the Dickey-Fuller test uses its own critical value tables. Second, <strong>spurious regression</strong>: regressing one independent random walk on another produces a t-statistic that grows without bound with sample size, and R² values that look impressive. The residuals are themselves nonstationary; the regression is meaningless. Two unrelated stocks will look beautifully "related" over enough history.</p>
            <p>The distinction between a random walk with drift and a trend-stationary series matters too, because the correct de-trending differs (differencing vs. subtracting a fitted trend) and applying the wrong one induces artificial autocorrelation in the residuals. The escape from spurious regression is cointegration — the case where a linear combination of nonstationary series <em>is</em> stationary — which is the subject of Chapter 10 and the theoretical foundation of pairs trading.</p>
            <p><strong>Further reading:</strong> Tsay, 3rd ed., §2.7 (unit-root nonstationarity, random walk with drift, and the Dickey-Fuller test); Hamilton, <em>Time Series Analysis</em>, §17.1-17.4 and §18.1 for the limiting distributions.</p>
          `,
          exercises: [
            "Simulate 1000 independent pairs of random walks of length 1000 and regress one on the other in each pair. Report the distribution of the resulting t-statistics and R² values, and show that the rejection rate at the nominal 5% level is far above 5%. Then repeat on the differenced series and confirm correct size.",
            "Derive Var(X_t) and Cov(X_t, X_{t+h}) for a driftless random walk and show that the correlation between X_t and X_{t+h} tends to 1 as t grows for fixed h. Explain how this fact produces the spurious-regression phenomenon."
          ]
        },
        {
          id: "algo-arima-box-jenkins",
          title: "ARIMA and the Box-Jenkins Method",
          content: `
            <p>ARIMA(p,d,q) applies an ARMA(p,q) model to the series after differencing d times. In backshift-operator form, <code>φ(B)(1−B)^d X_t = θ(B)ε_t</code>, with stationarity requiring the roots of φ outside the unit circle and invertibility requiring the same of θ. The d is the unit-root count: d = 1 is the standard choice for prices, which is to say ARIMA on prices is ARMA on returns.</p>
            <p>Box-Jenkins is the accompanying workflow, and it is the discipline more than the model that transfers:</p>
            <ol>
              <li><strong>Identify</strong> — test for unit roots (ADF), difference to stationarity, read p and q from the ACF/PACF signatures.</li>
              <li><strong>Estimate</strong> — maximum likelihood (or conditional least squares) for the coefficients.</li>
              <li><strong>Diagnose</strong> — residuals must be white noise: check the residual ACF and Ljung-Box, check for remaining ARCH effects in squared residuals.</li>
              <li><strong>Select</strong> — compare candidate orders by AIC or BIC; BIC is consistent for model order, AIC is better for forecasting.</li>
            </ol>
            <p>Set expectations honestly. On daily equity returns, ARIMA models fit near-zero coefficients and forecast essentially the unconditional mean — this is not a failure of the method but a measurement of market efficiency, and it is a valuable baseline. Any strategy or ML model you build later must beat this null. ARIMA is genuinely useful on series with real linear structure: intraday volume profiles, spreads between cointegrated instruments, macro releases, and the mean-reverting spread series themselves.</p>
            <p><strong>Further reading:</strong> Tsay, 3rd ed., §2.6 (simple ARMA models), §2.7 (unit-root nonstationarity and ARIMA), §2.8 (seasonal models) and §2.4.4 for AIC/BIC-based order selection.</p>
          `,
          exercises: [
            "Show that an ARMA(1,1) with φ = θ reduces to white noise, and explain what this implies for the identifiability of ARMA orders and for automatic order-selection procedures. Then state the general condition for a common factor in φ(B) and θ(B).",
            "Fit ARIMA models to (a) a daily equity log-price series and (b) the spread of a cointegrated pair. Report the selected orders, the residual diagnostics, and the out-of-sample forecast error against a naive random-walk benchmark. Interpret the difference between the two cases."
          ]
        }
      ]
    },
    {
      id: "classical-ml",
      name: "Classical Machine Learning & Model Evaluation",
      lessons: [
        {
          id: "algo-pandas-time-indexed",
          title: "Time-Indexed Data Wrangling in pandas",
          content: `
            <p>pandas is NumPy plus labelled axes, and nearly every subtle bug in a research pipeline comes from misunderstanding what the label does. A <code>DatetimeIndex</code> is not decoration: it drives alignment, so binary operations between two Series match on timestamps rather than positions, silently producing NaN where labels do not coincide. That behaviour is a feature — it prevents off-by-one misalignment between two instruments with different trading calendars — but only if you check the result rather than assume it.</p>
            <p>Four operations do most of the work in a research codebase:</p>
            <ul>
              <li><code>resample</code> — regular calendar-based re-bucketing, with the closed/label arguments deciding which side of the interval a bar belongs to. Getting these wrong shifts every bar by one period, which is look-ahead bias in disguise.</li>
              <li><code>rolling</code> / <code>expanding</code> — windowed statistics; note that they are backward-looking by default, and that <code>center=True</code> is a look-ahead bug in any trading context.</li>
              <li><code>groupby</code> — split-apply-combine, the vectorised path for per-symbol or per-day computation.</li>
              <li><code>merge_asof</code> — the essential one: a nearest-key join with direction control, which is how you attach quotes to trades or a slow signal to a fast price series without accidentally joining on future data. Always use <code>direction='backward'</code>.</li>
            </ul>
            <p>Two performance points: avoid <code>iterrows</code> and <code>apply</code> over rows, which reintroduce the Python-loop overhead from Chapter 5; and prefer categorical dtypes for symbols to cut memory by an order of magnitude on large panels. Chained indexing (<code>df[a][b] = …</code>) may write to a temporary — use <code>.loc</code>.</p>
            <p><strong>Further reading:</strong> McKinney, <em>Python for Data Analysis</em>, 3rd ed., Ch. 11 (time series: date ranges, frequencies, shifting, resampling, moving-window functions), Ch. 8 (data wrangling: join, combine, reshape) and Ch. 10 (group-by mechanics).</p>
          `,
          exercises: [
            "Construct two Series with partially overlapping DatetimeIndexes and demonstrate three ways their sum can silently produce NaN. Then write a defensive helper that aligns two series and asserts a minimum overlap fraction.",
            "Given a trades table and a quotes table with microsecond timestamps, use merge_asof to attach the prevailing quote to each trade. Then deliberately use direction='forward' and quantify the resulting look-ahead advantage by computing the fake profitability of a strategy that buys when the trade price is below the attached quote midpoint."
          ]
        },
        {
          id: "algo-linear-regression-geometry",
          title: "Linear Regression as Orthogonal Projection",
          content: `
            <p>OLS is a projection theorem in disguise. Fitting <code>ŷ = Xβ̂</code> minimising <code>‖y − Xβ‖₂</code> means finding the point of the column space of X nearest y, which is the orthogonal projection <code>ŷ = Hy</code> with hat matrix <code>H = X(XᵀX)⁻¹Xᵀ</code>. H is symmetric and idempotent, its rank equals the number of parameters p, and its trace equals p — the "degrees of freedom" of the fit, a quantity that generalises to shrinkage methods in the next lesson.</p>
            <p>The geometry explains the standard results without algebra. The residual is orthogonal to every column of X, so any variable already in the model cannot explain the residual. The Gauss-Markov theorem — OLS is BLUE under uncorrelated, equal-variance errors — is the statement that the projection is optimal among linear unbiased maps. And multicollinearity is a statement about the <em>angles</em> between columns: as two predictors become nearly parallel, the coordinates of the projection in that basis become wildly unstable even though the projection itself is fine. This is exactly the κ(A)² conditioning issue of Chapter 5, and it is why <code>ŷ</code> can be stable while <code>β̂</code> is meaningless.</p>
            <p>Sequential orthogonalisation (regress each predictor on the previous ones, then regress y on the residual) makes the interpretation of a multiple-regression coefficient precise: it is the effect of that predictor <em>after removing the part explained by all others</em>, which is why coefficients change when you add a variable, and why "the coefficient on momentum" has no meaning independent of the rest of the model.</p>
            <p><strong>Further reading:</strong> Hastie, Tibshirani & Friedman, <em>ESL</em>, 2nd ed., §3.2 (linear regression models and least squares, including §3.2.3 on multiple regression from simple univariate regression).</p>
          `,
          exercises: [
            "Prove that H = X(XᵀX)⁻¹Xᵀ is symmetric, idempotent, and has trace equal to rank(X). Then show that the leverage h_ii is bounded in [1/n, 1] and interpret the extreme cases in terms of the influence of a single observation.",
            "Take a return series and build three predictors: a 10-day moving average, a 12-day moving average, and their difference. Fit OLS, report the coefficients and κ(XᵀX), then drop one predictor and report how much the remaining coefficients move. Explain the result geometrically."
          ]
        },
        {
          id: "algo-ridge-lasso-geometry",
          title: "Ridge and Lasso: The Geometry of Regularisation",
          content: `
            <p>Both methods add a norm penalty to the least-squares objective, and the difference in the shape of the constraint set — not the penalty's magnitude — determines everything.</p>
            <pre><code>Ridge:  min ‖y − Xβ‖² + λ‖β‖₂²      ⟺   min ‖y − Xβ‖²  s.t. ‖β‖₂² ≤ t
        β̂ = (XᵀX + λI)⁻¹Xᵀy         (closed form; always well-posed)

Lasso:  min ‖y − Xβ‖² + λ‖β‖₁       ⟺   min ‖y − Xβ‖²  s.t. ‖β‖₁ ≤ s
        no closed form; convex, solved by coordinate descent / LARS</code></pre>
            <p>The ℓ₁ ball has corners on the coordinate axes; the elliptical contours of the residual sum of squares typically first touch such a ball <em>at</em> a corner, where some coordinates are exactly zero. The ℓ₂ ball is smooth, so contact almost surely occurs at a point with all coordinates nonzero. That is the whole reason lasso selects variables and ridge does not — a geometric fact, provable via the KKT conditions of Chapter 6 (the subgradient of |β| at zero is an interval, so a coefficient stays at exactly zero whenever the correlation with the residual is below λ).</p>
            <p>In the SVD basis, ridge has an exact interpretation as a spectral filter: it shrinks the coefficient along the direction of singular value σ by the factor <code>σ²/(σ² + λ)</code>. Directions of high variance in X are left nearly untouched; low-variance directions — the ill-conditioned ones — are crushed. Ridge is thus regularisation of the conditioning problem from Chapter 5, and the same λ appears as a Gaussian prior variance from Chapter 7. Elastic net mixes both penalties and is the practical choice when predictors are highly correlated, since lasso alone picks one of a correlated group arbitrarily — a serious instability when your features are variations of the same price series.</p>
            <p><strong>Further reading:</strong> <em>ESL</em>, 2nd ed., §3.4.1 (ridge regression, with the SVD shrinkage-factor derivation), §3.4.2 (lasso), §3.4.3 (discussion and the constraint-region figure) and §3.8.1 for LARS.</p>
          `,
          exercises: [
            "Derive the ridge solution in the SVD basis and show the shrinkage factors σᵢ²/(σᵢ² + λ). Then show that the effective degrees of freedom is Σ σᵢ²/(σᵢ² + λ) and verify it decreases from p to 0 as λ goes from 0 to ∞.",
            "Using the KKT conditions for the lasso, prove that coefficient j is exactly zero whenever |xⱼᵀ(y − Xβ̂)| is less than λ/2, and derive the smallest λ that sets every coefficient to zero. Then demonstrate empirically that with two nearly identical predictors, lasso picks one arbitrarily while ridge splits the weight."
          ]
        },
        {
          id: "algo-bias-variance",
          title: "The Bias-Variance Decomposition and What It Does Not Say",
          content: `
            <p>For squared-error loss and a target <code>Y = f(X) + ε</code> with Var(ε) = σ², the expected test error at a point x₀ decomposes exactly:</p>
            <pre><code>E[(Y − f̂(x₀))²] = σ²  +  (E[f̂(x₀)] − f(x₀))²  +  E[(f̂(x₀) − E[f̂(x₀)])²]
                 = irreducible  +  bias²  +  variance</code></pre>
            <p>The decomposition is a theorem, not a heuristic, and it explains why regularisation helps: adding bias (shrinking coefficients toward zero) can reduce variance by more than the bias costs. It also explains why the training error is a biased-downward estimate of test error — the model has already used that data to fit itself, with the optimism proportional to the effective degrees of freedom.</p>
            <p>Three caveats worth carrying. First, the neat U-shaped complexity curve is a statement about a specific model family and does not always hold — heavily overparametrised models exhibit double descent, where test error falls again beyond the interpolation threshold. Second, the decomposition is specific to squared error; for 0-1 loss there is no such clean additive split, and bias and variance interact. Third and most important for this course, the whole derivation assumes iid draws from a fixed distribution. Financial data is neither iid nor distributionally stationary, so the practical dominant error term is often neither bias nor variance but <em>non-stationarity</em>: the function f itself changes. That failure looks like high variance in a backtest but cannot be fixed by more data or more regularisation.</p>
            <p><strong>Further reading:</strong> <em>ESL</em>, 2nd ed., §7.2-7.3 (bias, variance and model complexity; the bias-variance decomposition) and §7.4-7.6 (optimism of the training error rate, effective number of parameters).</p>
          `,
          exercises: [
            "Derive the bias-variance decomposition from scratch for squared error, stating clearly which expectations are over the training set and which over the test point. Then compute bias and variance analytically for ridge regression as functions of λ, and show that the optimal λ is strictly positive whenever σ² is greater than zero.",
            "Empirically produce a double-descent curve: fit polynomial regression of increasing degree to n = 40 noisy points, plotting train and test error for degrees 1 through 200 with a minimum-norm solution beyond the interpolation threshold. Explain what the classical U-shaped picture misses."
          ]
        },
        {
          id: "algo-cv-time-series",
          title: "Cross-Validation and Why k-Fold Fails on Time Series",
          content: `
            <p>k-fold CV estimates out-of-sample error by rotating which fold is held out. It is nearly unbiased for iid data, with the well-known variance-bias tradeoff in k (leave-one-out has low bias, high variance, and high cost; k = 5 or 10 is the usual compromise). None of this survives contact with time series, for three distinct reasons that are worth separating:</p>
            <ol>
              <li><strong>Temporal ordering.</strong> Random folds train on the future to predict the past. Any model that implicitly learns the level of a regime will look prescient.</li>
              <li><strong>Serial correlation.</strong> Adjacent observations are dependent, so train and test folds are not independent even when disjoint. The effective sample size is far below n, and the CV error underestimates true error.</li>
              <li><strong>Overlapping labels.</strong> If a label at time t depends on returns over the next h periods, then observations within h of each other share information. A test observation adjacent to a training observation is partly leaked.</li>
            </ol>
            <p>The corrections are structural. <strong>Walk-forward</strong> (expanding or rolling window, always training on data strictly before the test period) respects ordering but gives few test folds and tests recent data less often. <strong>Purged k-fold</strong> removes training observations whose label horizon overlaps the test fold; <strong>embargo</strong> additionally drops a small band of training observations immediately after the test fold to break residual serial correlation. Combinatorial purged CV (Chapter 11) extends this to generate many backtest paths rather than one.</p>
            <p>The diagnostic to internalise: if your model's CV score is far better than its walk-forward score, you have leakage, not a good model.</p>
            <p><strong>Further reading:</strong> <em>ESL</em>, 2nd ed., §7.10 (cross-validation, including §7.10.2 on the wrong and right way to do CV); López de Prado, <em>Advances in Financial Machine Learning</em>, Ch. 7 (Cross-Validation in Finance), §7.4 for purging and embargoing.</p>
          `,
          exercises: [
            "Construct a synthetic dataset where a feature is pure noise but labels are overlapping h-period forward returns. Show that standard 5-fold CV reports a significantly positive R² while purged-and-embargoed CV reports approximately zero. Quantify how the inflation scales with h.",
            "Implement purged k-fold CV with an embargo parameter. Prove that with label horizon h and embargo fraction e, no training observation shares information with any test observation, and state the number of training observations lost as a function of k, h, and e."
          ]
        },
        {
          id: "algo-feature-engineering-leakage",
          title: "Feature Engineering and Target Leakage",
          content: `
            <p>Feature engineering is where domain knowledge enters a model, and where most silent failures originate. The single organising rule for temporal data: <strong>every feature value at time t must be computable using only information available strictly before t</strong>. Violations are called leakage, and they do not announce themselves — they show up as an implausibly good backtest.</p>
            <p>The common leakage patterns, all of which are easy to commit accidentally:</p>
            <ul>
              <li><em>Scaling on the full sample</em> — computing a mean/std or a min/max over the whole dataset before splitting leaks test-period statistics into training. Fit scalers inside the training fold only.</li>
              <li><em>Centred windows or a forward-filled future value</em> — <code>center=True</code>, or resampling that labels a bar with its interval's left edge while aggregating the full interval.</li>
              <li><em>Restated or revised data</em> — fundamentals and macro series are revised after publication. Using the current value of a series at a historical date is leakage unless the database is point-in-time.</li>
              <li><em>Target-derived features</em> — any transformation of the label, however indirect (e.g. a feature normalised by realised future volatility).</li>
            </ul>
            <p>Beyond avoiding leakage, the useful transformations for price data are those that produce stationary, comparable quantities: log returns rather than prices, volatility-normalised returns, ratios and spreads rather than levels, and rank or quantile transforms across the cross-section rather than raw magnitudes. Note the tension flagged in Chapter 8 — differencing to obtain stationarity destroys memory, which is what fractional differentiation addresses.</p>
            <p><strong>Further reading:</strong> Géron, <em>Hands-On Machine Learning with Scikit-Learn, Keras &amp; TensorFlow</em>, 3rd ed., Ch. 2 (end-to-end project: the sections on preparing data, transformation pipelines, and why transformers must be fitted on training data only); López de Prado, <em>AFML</em>, Ch. 3 (labeling) and Ch. 5 (fractionally differentiated features).</p>
          `,
          exercises: [
            "Write a feature pipeline where a StandardScaler is fitted on the full dataset before splitting, and one where it is fitted inside each training fold. Measure the difference in reported test performance on a series with a trending mean, and derive an expression for the leakage magnitude in terms of the difference between train and test period means.",
            "Given a fundamentals dataset with both a report date and a publication date, write the join that produces a point-in-time feature. Then quantify the backtest inflation caused by joining on report date instead, on any strategy that trades around earnings."
          ]
        },
        {
          id: "algo-trees-cart",
          title: "Decision Trees: Greedy Recursive Partitioning",
          content: `
            <p>CART partitions the feature space into axis-aligned boxes by recursively choosing a split <code>(variable j, threshold s)</code> minimising an impurity criterion. Finding the globally optimal tree is NP-hard, so the algorithm is greedy — locally optimal at each node, with no guarantee about the whole tree. This is the greedy-without-a-matroid situation from Chapter 3, and it is why trees are unstable: a small change in the data can change the top split and hence the entire structure below it.</p>
            <table class="mini-table">
              <tr><th>Criterion</th><th>Formula</th><th>Note</th></tr>
              <tr><td>Regression</td><td>Σ (yᵢ − ȳ_R)² per region</td><td>split point found in O(n log n) per feature by sorting</td></tr>
              <tr><td>Gini</td><td>Σ_k p_k(1 − p_k)</td><td>differentiable, favours pure nodes</td></tr>
              <tr><td>Entropy</td><td>−Σ_k p_k log p_k</td><td>similar results in practice</td></tr>
            </table>
            <p>Growth must be controlled: an unpruned tree can isolate every training point, achieving zero training error and pure noise-fitting. Cost-complexity pruning grows a large tree and then minimises <code>R(T) + α|T|</code>, selecting α by cross-validation — the same penalised-complexity structure as ridge, with tree size playing the role of the norm.</p>
            <p>The properties that make trees attractive on financial data: invariance to monotone transformations of individual features (so no scaling needed), native handling of mixed types and missing values via surrogate splits, and the ability to capture interactions and thresholds — a rule like "momentum works only when volatility is low" is one split away, but a nightmare for a linear model. The cost is instability and no extrapolation beyond the training range, both fixed largely by the ensembles in the next two lessons.</p>
            <p><strong>Further reading:</strong> <em>ESL</em>, 2nd ed., §9.2 (tree-based methods: the regression and classification tree algorithms, impurity measures, cost-complexity pruning, and §9.2.4 on their limitations).</p>
          `,
          exercises: [
            "Show that for a fixed feature, the optimal split threshold for squared-error regression can be found in a single pass after sorting, by maintaining running sums. Give the O(n log n) algorithm and prove that only midpoints between consecutive distinct values need be considered.",
            "Prove that Gini impurity and entropy are both strictly concave functions of the class-probability vector, and deduce that any split with a non-degenerate partition weakly reduces impurity. Then explain why this means the training impurity criterion alone can never signal that a split is unhelpful."
          ]
        },
        {
          id: "algo-bagging-random-forests",
          title: "Bagging and Random Forests: Variance Reduction by Decorrelation",
          content: `
            <p>Averaging B iid estimators each with variance σ² gives variance σ²/B. Bootstrap aggregation applies this to trees: fit each on a bootstrap resample and average. But bootstrap resamples of the same data are <em>correlated</em>, and for identically distributed but ρ-correlated estimators,</p>
            <pre><code>Var(average of B) = ρσ² + (1 − ρ)σ²/B  →  ρσ²  as B → ∞</code></pre>
            <p>The residual ρσ² is a floor that more trees cannot lower. Random forests attack ρ directly: at each split, only a random subset of m features is considered. This deliberately weakens each tree (raising σ² slightly) in exchange for lowering ρ substantially, and the tradeoff is favourable — m is the forest's main hyperparameter, with √p a common default for classification and p/3 for regression.</p>
            <p>Out-of-bag error gives free validation, since each observation is omitted from roughly 1/e ≈ 37% of the bootstraps. Feature importance comes in two forms, and the distinction matters: mean decrease in impurity is fast but biased toward high-cardinality and continuous features, whereas permutation importance measures the actual predictive contribution but is misleading in the presence of correlated features (two collinear features can each show near-zero importance because the other substitutes). On financial data neither is trustworthy without the CV corrections of the previous lesson; López de Prado's MDA-with-purging and clustered-feature-importance methods exist precisely because of this.</p>
            <p><strong>Further reading:</strong> <em>ESL</em>, 2nd ed., §8.7 (bagging), §15.1-15.3 (random forests, the variance formula and out-of-bag samples) and §15.3.2 (variable importance); López de Prado, <em>AFML</em>, Ch. 8 (feature importance) and §6.3 for sequential-bootstrap sampling on overlapping labels.</p>
          `,
          exercises: [
            "Derive Var(average) = ρσ² + (1−ρ)σ²/B for B identically distributed, pairwise-ρ-correlated estimators, and use it to explain quantitatively why reducing m in a random forest can improve accuracy even though each individual tree gets worse. Find the m minimising total variance under a simple model of ρ(m) and σ²(m).",
            "Show that an observation is omitted from a bootstrap resample with probability tending to 1/e, and use this to derive how many trees are needed for a stable out-of-bag error estimate. Then build a dataset with two perfectly correlated informative features and demonstrate that permutation importance assigns both near-zero importance — and propose a fix."
          ]
        },
        {
          id: "algo-gradient-boosting",
          title: "Gradient Boosting: Functional Gradient Descent",
          content: `
            <p>Boosting builds an additive model <code>F_M(x) = Σ_m ν·h_m(x)</code> where each new weak learner is fitted to correct the current model's errors. The unifying view is that it is gradient descent in <em>function space</em>: at stage m, compute the negative gradient of the loss with respect to the current predictions,</p>
            <pre><code>rᵢ = −[ ∂L(yᵢ, F(xᵢ)) / ∂F(xᵢ) ]_{F = F_{m−1}}    (pseudo-residuals)
fit h_m to the rᵢ, then set  F_m = F_{m−1} + ν·γ_m·h_m</code></pre>
            <p>For squared loss the pseudo-residuals are ordinary residuals; for logistic loss they are (y − p); for the pinball loss they yield quantile regression. That generality — any differentiable loss — is boosting's chief advantage, and it means you can optimise an asymmetric loss that reflects the actual cost of being wrong in a trading context.</p>
            <p>XGBoost and LightGBM add a second-order (Newton) step using the loss's Hessian, explicit L1/L2 penalties on leaf weights, and engineering (histogram binning, sparsity-aware splits, leaf-wise growth) that make them the default on tabular data. The critical hyperparameter is the learning rate ν: small ν with many trees consistently beats large ν with few, the same shrinkage principle as ridge.</p>
            <p>Crucially, boosting — unlike bagging — reduces bias by sequentially fitting residuals, so it <em>does</em> overfit with more iterations, and early stopping on a properly constructed validation set is mandatory. On financial data with a low signal-to-noise ratio, this is exactly where the purged CV of the earlier lesson earns its keep: a boosted model will happily fit the noise in overlapping labels to a very high training accuracy.</p>
            <p><strong>Further reading:</strong> <em>ESL</em>, 2nd ed., §10.1-10.4 (boosting and additive models), §10.9-10.10 (boosting trees, the gradient-boosting algorithm and shrinkage); Chen &amp; Guestrin, "XGBoost: A Scalable Tree Boosting System" (KDD 2016), §2 for the regularised objective.</p>
          `,
          exercises: [
            "Derive the pseudo-residuals for squared error, logistic loss, and the pinball (quantile) loss, and state what each boosted model is estimating. Then show that gradient boosting with squared loss and stumps recovers a form of forward stagewise linear regression.",
            "Derive the second-order (Newton) leaf-weight formula used by XGBoost: with gradients gᵢ and Hessians hᵢ in a leaf and L2 penalty λ, show the optimal weight is −Σgᵢ/(Σhᵢ + λ) and the corresponding gain formula. Explain why this makes split selection more accurate than the first-order version."
          ]
        },
        {
          id: "algo-svm-kernels",
          title: "Support Vector Machines and the Kernel Trick",
          content: `
            <p>The hard-margin SVM maximises the distance from the separating hyperplane to the nearest points, which is <code>2/‖w‖</code>, giving <code>min ½‖w‖² s.t. yᵢ(wᵀxᵢ + b) ≥ 1</code>. Soft margin adds hinge-loss slack with penalty C. Applying the Lagrange duality of Chapter 6 gives the dual</p>
            <pre><code>max_α  Σαᵢ − ½ ΣᵢΣⱼ αᵢαⱼ yᵢyⱼ ⟨xᵢ, xⱼ⟩     s.t.  0 ≤ αᵢ ≤ C,  Σ αᵢyᵢ = 0</code></pre>
            <p>Two facts follow from the KKT conditions. Complementary slackness forces αᵢ = 0 for every point strictly outside the margin, so the solution depends only on the <em>support vectors</em> — typically a small subset, which is why the model is compact and robust to distant points. And the data enter <em>only</em> through inner products, so replacing <code>⟨xᵢ,xⱼ⟩</code> with any positive semidefinite kernel <code>K(xᵢ,xⱼ)</code> fits a linear model in an implicit (possibly infinite-dimensional) feature space at no extra cost — the kernel trick, licensed by Mercer's theorem. The RBF kernel corresponds to an infinite-dimensional space, and its bandwidth γ plus C control the bias-variance tradeoff.</p>
            <p>The practical constraints matter for this course: training is roughly O(n² to n³), so SVMs do not scale to the millions of rows a tick-level dataset produces, and they require careful feature scaling (unlike trees). SVMs remain a good choice for small, well-curated, high-dimensional problems — for example classifying a few thousand labelled regime days from many engineered features.</p>
            <p><strong>Further reading:</strong> <em>ESL</em>, 2nd ed., §12.1-12.3 (the support vector classifier, SVMs and kernels, including §12.3.2 on the SVM as a penalisation method with hinge loss).</p>
          `,
          exercises: [
            "Derive the SVM dual from the primal using Lagrange duality, and show from complementary slackness that only points on or inside the margin have nonzero α. Then show that the soft-margin SVM is equivalent to minimising a hinge loss plus an L2 penalty, and identify the correspondence between C and λ.",
            "Prove that if K₁ and K₂ are valid kernels then so are K₁ + K₂, cK₁ for c ≥ 0, and K₁·K₂. Use these rules to show that the RBF kernel is a valid kernel, and describe the feature map it induces."
          ]
        }
      ]
    }
  ]
};
