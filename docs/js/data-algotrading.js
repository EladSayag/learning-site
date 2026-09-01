// Algorithmic Trading content — sits at the intersection of Algorithmics (CS/DS toolkit) and
// Finance (market mechanics/economics). See data-physics.js's header for the full field-by-field
// doc. Same rules, "algo-" id prefix kept (these lessons moved from data-algorithmics.js verbatim,
// renaming risked breaking cross-references — cosmetic wart, not a bug).
//
// STATUS (2026-08-30): "backtesting-strategies" and "execution-infrastructure" chapters moved here
// verbatim from data-algorithmics.js (content unchanged). Cross-subject `prerequisites` — e.g.
// making "Pairs Trading" require specific Algorithmics time-series/stats lessons AND specific
// Finance market-microstructure/cointegration lessons — are NOT wired yet. That's the whole point
// of this subject (per user: "certain stuff from algorithm and certain from finance, but probably
// not all") — flagged as a follow-up once we design which edges actually make sense.

const ALGOTRADING_SUBJECT = {
  id: "algotrading",
  name: "Algorithmic Trading",
  color: "#8659c9",
  chapters: [
    {
      id: "backtesting-strategies",
      name: "Backtesting Methodology & Strategy Families",
      lessons: [
        {
          id: "algo-backtest-pitfalls",
          title: "The Backtest as a Research Instrument, Not a Simulation",
          content: `
            <p>A backtest is not evidence that a strategy works; it is a measurement subject to systematic biases, all of which inflate performance. The discipline is to enumerate and control them, and to treat a good backtest as weak evidence by default.</p>
            <ul>
              <li><strong>Look-ahead bias</strong> — using data unavailable at decision time. Sources: bar close prices used for a decision made during the bar, restated fundamentals, back-adjusted prices, a scaler fitted on the whole sample, and the classic off-by-one in a signal shift.</li>
              <li><strong>Survivorship bias</strong> — universes must be point-in-time (see Finance &gt; Market Microstructure &amp; Financial Data).</li>
              <li><strong>Unmodelled costs</strong> — commissions, spread, slippage, borrow fees for shorts, and market impact. A high-turnover strategy that is profitable gross and unprofitable net is the single most common outcome.</li>
              <li><strong>Backtest overfitting</strong> — the dominant one, and the subject of the next two lessons. Every parameter tuned on the same history is a degree of freedom spent, and the reported performance is a maximum over trials rather than a sample of one.</li>
              <li><strong>Regime and selection effects</strong> — the historical period itself was selected (implicitly) by having available data, and a strategy fit to a decade-long bull market has learned that decade.</li>
            </ul>
            <p>Two habits change outcomes more than any technique: decide the strategy's economic rationale <em>before</em> looking at the results (why should this inefficiency exist, and who is on the other side?), and record the number of configurations tested. A backtest's honest role is to reject bad ideas, not to confirm good ones.</p>
            <p><strong>Further reading:</strong> López de Prado, <em>AFML</em>, Ch. 11 (The Dangers of Backtesting) — especially §11.2-11.4 on the general and specific causes of backtest failure and the "seven sins of quantitative investing".</p>
          `,
          exercises: [
            "Write a backtest of a simple moving-average crossover on daily bars in two versions: one that executes at the same bar's close, and one that executes at the next bar's open. Report the difference in Sharpe ratio and turnover, and explain exactly which information the first version is using illegitimately.",
            "For a strategy with average holding period h days and per-trade round-trip cost c (in basis points), derive the annualised return drag as a function of h and c. Then compute the minimum gross Sharpe ratio required to achieve a net Sharpe of 1.0 for h = 1, 5, and 20 days at c = 10 bps."
          ]
        },
        {
          id: "algo-walk-forward-purged-cv",
          title: "Walk-Forward, Purged CV, and Combinatorial Paths",
          content: `
            <p>Given that k-fold CV leaks on time series, the question is what to use instead. Three answers, in increasing sophistication:</p>
            <p><strong>Walk-forward</strong> trains on <code>[0, t]</code> and tests on <code>(t, t+Δ]</code>, then rolls forward. It is the most intuitive and directly mimics live deployment. Its weaknesses are real though: it yields a <em>single</em> historical path, so the reported Sharpe has enormous sampling error; early test periods are evaluated with little training data; and the choice between an expanding and a rolling window silently encodes an assumption about how fast the market changes.</p>
            <p><strong>Purged k-fold with embargo</strong> restores multiple folds while preventing leakage: any training observation whose label horizon overlaps the test fold is <em>purged</em>, and a further band immediately after the test fold is <em>embargoed</em> to break serial correlation. This uses the data far more efficiently than walk-forward, at the cost of training on data after the test period — acceptable for estimating generalisation error, not for simulating deployment.</p>
            <p><strong>Combinatorial purged CV (CPCV)</strong> is the generalisation: split the series into N groups, test on every combination of k groups (purging and embargoing as before), and stitch results into many distinct backtest paths — <code>C(N,k)·k/N</code> of them. Instead of one Sharpe ratio you obtain its <em>distribution</em>, which is the correct object: a strategy whose Sharpe is 1.5 on one path and ranges from −0.4 to 2.8 across paths has told you something a single number never would.</p>
            <p><strong>Further reading:</strong> López de Prado, <em>AFML</em>, Ch. 7 (Cross-Validation in Finance, §7.4 purging and embargoing) and Ch. 12 (Backtesting through Cross-Validation, §12.4-12.5 on the combinatorial purged CV method).</p>
          `,
          exercises: [
            "Derive the number of distinct backtest paths produced by CPCV with N groups tested k at a time, and verify the formula for N = 6, k = 2. Then explain why walk-forward is the special case that produces exactly one path.",
            "Implement walk-forward and CPCV for one simple strategy on the same data. Report the walk-forward Sharpe and the full distribution of CPCV Sharpes, and compute the probability that a randomly chosen path would have exceeded the walk-forward value. Discuss which number you would show an investor."
          ]
        },
        {
          id: "algo-deflated-sharpe",
          title: "Quantifying Backtest Overfitting: the Deflated Sharpe Ratio",
          content: `
            <p>If you test N strategy configurations on the same data, the best observed Sharpe ratio is a <em>maximum</em> of N draws, and even with no true skill its expectation grows roughly like <code>E[max] ≈ σ_SR·√(2 log N)</code>. With N = 1000 trials and a per-trial standard error of 0.3, a Sharpe of about 1.1 is the <em>expected</em> best result under a null of zero skill. Reporting it as a discovery is the multiple-testing error in its most expensive form.</p>
            <p>Two corrections make this operational. The <strong>Probabilistic Sharpe Ratio</strong> adjusts the standard error of an observed Sharpe for non-normality (skewness γ₃ and kurtosis γ₄) and sample length, giving the probability that the true Sharpe exceeds a benchmark:</p>
            <pre><code>SE(SR) ≈ √( (1 − γ₃·SR + ((γ₄ − 1)/4)·SR²) / (T − 1) )
PSR(SR*) = Φ( (SR − SR*)·√(T−1) / (1 − γ₃SR + ((γ₄−1)/4)SR²)^½ )</code></pre>
            <p>The <strong>Deflated Sharpe Ratio</strong> then sets the benchmark SR* to the expected maximum under the null given N trials and the variance across trials — turning "how good is this Sharpe?" into "how good is this Sharpe given how hard I looked?". The related idea of the <em>probability of backtest overfitting</em> (PBO) estimates, by combinatorially splitting the history into in-sample and out-of-sample halves, how often the in-sample-best configuration underperforms the median out of sample.</p>
            <p>The behavioural implication is stronger than the arithmetic: negative results must be counted. A researcher who discards failed variants without recording them has destroyed the information needed to evaluate the surviving one.</p>
            <p><strong>Further reading:</strong> López de Prado, <em>AFML</em>, Ch. 14 (Backtest Statistics, §14.4-14.5 on performance and the probabilistic/deflated Sharpe ratio) and Ch. 11 §11.6-11.7; Bailey &amp; López de Prado, "The Deflated Sharpe Ratio", <em>Journal of Portfolio Management</em> 40(5), 2014.</p>
          `,
          exercises: [
            "Derive E[max of N iid standard normals] ≈ √(2 log N) asymptotically, and use it to compute the expected best Sharpe from 50, 500, and 5000 zero-skill trials on 5 years of daily data. Then state the Sharpe you would need to observe for each N to claim significance at the 5% level.",
            "Implement the Probabilistic Sharpe Ratio and apply it to a return series with strong negative skew and excess kurtosis (e.g. a short-volatility strategy). Compare the PSR with a naive t-test on the mean return and explain, in terms of the higher moments, why the naive test is over-optimistic."
          ]
        },
        {
          id: "algo-mean-reversion-strategies",
          title: "Mean Reversion: From Stationarity to a Tradeable Rule",
          content: `
            <p>A mean-reversion strategy bets that a stationary series will return toward its mean, so the entire edge rests on the stationarity tests covered in Finance (ADF, cointegration). The canonical implementations, in increasing sophistication:</p>
            <ul>
              <li><strong>Linear (Ornstein-Uhlenbeck) sizing</strong> — hold a position proportional to the negative z-score of the spread. Always in the market, no thresholds to tune, and provably optimal under an OU model with linear costs.</li>
              <li><strong>Band strategies</strong> — enter when the z-score exceeds ±k, exit at zero or at the opposite band. Fewer trades, hence lower costs, but k is a tuned parameter and thus an overfitting surface.</li>
              <li><strong>Bollinger/rolling-window variants</strong> — re-estimate the mean and standard deviation over a lookback, which adapts to slow drift but introduces a second parameter and a subtle circularity (the mean chases the price).</li>
            </ul>
            <p>Three quantities determine viability, and all three should be computed before writing any strategy code: the <em>half-life</em> (from the ADF regression) sets the natural holding period; the spread's stationary standard deviation sets the gross profit per round trip; and the round-trip cost sets the threshold. If costs exceed roughly the standard deviation of the spread over one half-life, no parameter choice can rescue the strategy.</p>
            <p>The characteristic risk profile is the important warning: mean reversion produces many small wins and rare large losses — a short-volatility payoff. Equity curves look magnificent until the relationship breaks, at which point positions grow as the spread widens. A hard stop on spread divergence or on time-in-trade is not a refinement; it is what converts an unbounded loss into a bounded one.</p>
            <p><strong>Further reading:</strong> Chan, <em>Algorithmic Trading: Winning Strategies and Their Rationale</em> (2013), Ch. 3 (implementing mean-reversion strategies: linear, Bollinger band, Kalman-filter-based) and Ch. 4 (mean reversion of stocks and ETFs).</p>
          `,
          exercises: [
            "Assume the spread follows an OU process dX = −θ(X − μ)dt + σdW. Derive the half-life log2/θ and the stationary variance σ²/(2θ). Then derive the expected profit per unit time of a band strategy entering at ±k standard deviations, and find the k maximising it net of a fixed cost c per round trip.",
            "Implement both the linear and band versions of a mean-reversion strategy on a cointegrated pair. Compare Sharpe, turnover, and maximum drawdown at several cost levels, and identify the cost at which the ranking of the two approaches flips."
          ]
        },
        {
          id: "algo-momentum-strategies",
          title: "Momentum and Trend Following",
          content: `
            <p>Momentum is the empirical tendency for recent relative winners to keep outperforming over horizons of roughly 3-12 months, and for trends in futures markets to persist. It is the most robust cross-sectional anomaly on record — documented across equities, currencies, commodities, bonds, and across a century of data — which is itself a reason to be suspicious of any complicated variant of it.</p>
            <p>Two distinct families, often conflated:</p>
            <ul>
              <li><strong>Cross-sectional momentum</strong> — rank assets by trailing return (conventionally skipping the most recent month to avoid short-term reversal), go long the top decile and short the bottom. Market-neutral by construction; the classic academic formulation.</li>
              <li><strong>Time-series momentum / trend following</strong> — position in each asset by the sign of its own trailing return, independent of other assets. This is what managed-futures funds run, and it has a long net-long or net-short exposure.</li>
            </ul>
            <p>The payoff profile is the mirror image of mean reversion: many small losses (whipsaws in range-bound markets) and rare large gains from sustained trends — a long-volatility, positively skewed profile that behaves like a long straddle and tends to perform well precisely in prolonged crises. That complementarity is why the two families are combined in practice, and it is a more defensible source of diversification than adding another correlated signal.</p>
            <p>Two mechanisms are usually offered: underreaction to news and slow information diffusion (a behavioural story), and risk compensation for crash exposure — momentum's documented crashes occur in sharp market reversals following drawdowns, when the short leg (beaten-down high-beta names) rallies violently. Volatility scaling of the momentum signal substantially mitigates this and is standard practice.</p>
            <p><strong>Further reading:</strong> Chan, <em>Algorithmic Trading</em> (2013), Ch. 6 (interday momentum strategies: time series and cross-sectional momentum, and the four causes of momentum) and Ch. 7 (intraday momentum); Moskowitz, Ooi &amp; Pedersen, "Time Series Momentum", <em>Journal of Financial Economics</em> 104(2), 2012.</p>
          `,
          exercises: [
            "Implement 12-month-minus-1-month cross-sectional momentum on a universe of liquid ETFs with monthly rebalancing, and separately implement time-series momentum on the same universe. Compare their return distributions (mean, volatility, skewness) and their correlation with each other and with the market.",
            "Demonstrate the 'momentum crash' phenomenon: identify the periods of worst momentum performance in your backtest, characterise the market conditions in each, and show quantitatively how volatility-scaling each asset's signal changes the tail of the return distribution."
          ]
        },
        {
          id: "algo-pairs-trading",
          title: "Pairs Trading and Statistical Arbitrage",
          content: `
            <p>Pairs trading is mean reversion applied to a constructed spread between two related instruments, and statistical arbitrage is its generalisation to a large portfolio of such bets. The construction pipeline has four decisions, each of which is a place to overfit:</p>
            <ol>
              <li><strong>Candidate selection</strong> — economic relatedness first (same sector, same underlying, dual listings, ETF-vs-constituents), then a statistical test. Searching all pairs in a universe of n names is n(n−1)/2 tests, so a p-value below 0.05 among 100,000 pairs is meaningless without a multiple-testing correction.</li>
              <li><strong>Hedge ratio</strong> — OLS is asymmetric and static; total least squares (via the SVD — see Algorithmics &gt; Numerical &amp; Scientific Computing) treats both series symmetrically; a Kalman filter allows the ratio to evolve, which handles slow drift but adds parameters.</li>
              <li><strong>Signal and sizing</strong> — as in the mean-reversion lesson, from the spread's z-score.</li>
              <li><strong>Risk controls</strong> — a divergence stop, a maximum holding period, and a rule for handling corporate actions that permanently break the relationship.</li>
            </ol>
            <p>Scaling up to statistical arbitrage means many spreads rather than one, and the gain is diversification: if the spreads' idiosyncratic components are weakly correlated, portfolio Sharpe grows roughly as √(number of independent bets) — the fundamental law of active management. The practical obstacle is that the bets are less independent than they appear, since they typically share sector and factor exposures, so residualising against a factor model before forming spreads matters. Capacity is limited by the square-root impact law (see Finance &gt; Market Microstructure).</p>
            <p><strong>Further reading:</strong> Chan, <em>Algorithmic Trading</em> (2013), Ch. 3 (implementing mean-reversion strategies, including the Kalman-filter hedge ratio) and Ch. 4 (mean reversion of stocks and ETFs, including the cross-sectional stat-arb formulation); López de Prado, <em>AFML</em>, Ch. 16 for the portfolio-construction side.</p>
          `,
          exercises: [
            "Screen a universe of 100 liquid stocks for cointegrated pairs using the Johansen test. Report how many pairs pass at the 5% level, compare that with the number expected under the null given the number of tests performed, and apply a Benjamini-Hochberg correction. Comment on what survives.",
            "Implement a Kalman filter that estimates a time-varying hedge ratio for one pair, treating the ratio as a random walk. Compare the resulting spread's stationarity and the strategy's out-of-sample Sharpe against a static OLS hedge ratio re-estimated annually, and state the conditions under which the added complexity pays."
          ]
        },
        {
          id: "algo-kelly-position-sizing",
          title: "Position Sizing: Kelly, Volatility Targeting, and Drawdown Control",
          content: `
            <p>Given an edge, the size of the bet determines the outcome as much as the edge does. The Kelly criterion maximises the expected logarithm of wealth, which is equivalent to maximising the long-run geometric growth rate. For a continuous return with mean μ (in excess of the risk-free rate) and variance σ², the optimal leverage is</p>
            <pre><code>f* = μ/σ²   (single asset);   f* = Σ⁻¹μ   (multi-asset)
growth rate at f*:  g = r + SR²/2;   growth at leverage f:  g(f) = r + fμ − f²σ²/2</code></pre>
            <p>Two features of g(f) are decisive. It is a downward parabola, so overbetting past 2f* gives <em>negative</em> growth despite a positive edge — being too aggressive is qualitatively worse than being too timid. And Kelly is optimal only asymptotically and only if μ and σ are known; both are estimated, and μ especially is estimated terribly. Since f* is linear in μ and μ's standard error is large, most practitioners use half-Kelly or less, which sacrifices only 25% of the growth rate while roughly halving the volatility and drawdowns.</p>
            <p><strong>Volatility targeting</strong> is the practical workhorse: scale positions inversely to a forecast of volatility so that ex-ante portfolio volatility is constant. It exploits the one thing that <em>is</em> forecastable (see Finance's GARCH lesson), reduces drawdowns, and typically raises Sharpe. <strong>Drawdown control</strong> adds a second layer — reduce exposure after losses — which caps the tail but mechanically locks in losses and can badly hurt strategies with a fast recovery profile. Note also that <code>f* = Σ⁻¹μ</code> requires inverting a covariance matrix, so all of Algorithmics' conditioning warnings apply directly to leverage decisions.</p>
            <p><strong>Further reading:</strong> Chan, <em>Algorithmic Trading</em> (2013), Ch. 8 (risk management: the Kelly formula, its derivation, and the practical case for fractional Kelly); López de Prado, <em>AFML</em>, Ch. 10 (bet sizing) and Ch. 15 (understanding strategy risk).</p>
          `,
          exercises: [
            "Derive f* = μ/σ² by maximising the expected log growth rate of a continuously-rebalanced portfolio, and show that leverage 2f* yields the same growth rate as zero leverage. Then compute the growth rate at half-Kelly as a fraction of the maximum and confirm the 3/4 figure.",
            "Take a strategy's daily returns and apply (a) constant sizing, (b) volatility targeting to a 10% annualised target using a 20-day EWMA volatility forecast, and (c) half-Kelly sizing using rolling estimates of μ and σ. Compare Sharpe, maximum drawdown, and the distribution of realised annual volatility, and explain which differences come from the sizing rule and which from estimation error in μ."
          ]
        },
        {
          id: "algo-performance-metrics",
          title: "Performance Statistics: Sharpe, Sortino, Calmar, and Their Failure Modes",
          content: `
            <p>The Sharpe ratio <code>SR = (E[r] − r_f)/σ(r)</code> is the default because it is the return per unit of risk under a mean-variance view, and it annualises as <code>SR_annual = SR_period·√(periods per year)</code> — but only under iid returns. That caveat is the source of most abuse: with positive autocorrelation φ, the correct scaling factor is smaller, and monthly-reported illiquid strategies exploit this to report inflated Sharpes.</p>
            <table class="mini-table">
              <tr><th>Metric</th><th>Definition</th><th>Blind spot</th></tr>
              <tr><td>Sharpe</td><td>excess return / total volatility</td><td>penalises upside; ignores skew and kurtosis</td></tr>
              <tr><td>Sortino</td><td>excess return / downside deviation</td><td>fewer effective observations, so noisier</td></tr>
              <tr><td>Calmar</td><td>annual return / max drawdown</td><td>max drawdown is one observation — extremely noisy</td></tr>
              <tr><td>Profit factor</td><td>gross wins / gross losses</td><td>ignores the size distribution entirely</td></tr>
            </table>
            <p>Sharpe's essential blind spot is that it rewards selling insurance. A strategy that collects small premiums and occasionally loses catastrophically — short volatility, short deep-out-of-the-money options, most carry trades, and unstopped mean reversion — will show a superb Sharpe right up until it does not. Always report skewness, excess kurtosis, and the worst single-day loss alongside it, and remember that maximum drawdown is a single order statistic whose sampling variability is enormous.</p>
            <p>Finally, no ratio is meaningful without its standard error. Over T periods, <code>SE(SR) ≈ √((1 + SR²/2)/T)</code> under normality, so a 2-year backtest gives a standard error near 0.5 — a reported Sharpe of 1.0 is not statistically distinguishable from zero. Combine this with the deflated Sharpe correction for the number of trials.</p>
            <p><strong>Further reading:</strong> López de Prado, <em>AFML</em>, Ch. 14 (Backtest Statistics: §14.4 on performance metrics, §14.5 on runs and drawdown statistics, §14.6 on implementation shortfall and efficiency ratios); Chan, <em>Quantitative Trading</em> (2009), Ch. 6 on Sharpe and drawdown in practice.</p>
          `,
          exercises: [
            "Derive the correct annualisation factor for the Sharpe ratio when returns follow an AR(1) with coefficient φ, and compute the inflation factor of the naive √252 scaling for φ = 0.1, 0.3, and 0.5. Then explain why illiquid assets exhibit exactly this bias.",
            "Construct two synthetic strategies with identical Sharpe ratios: one with symmetric returns and one with a short-volatility profile (small frequent gains, rare large losses). Report Sortino, Calmar, skew, kurtosis, and worst-day loss for each, and write the paragraph you would use to explain to a non-quant why the identical Sharpe is misleading."
          ]
        }
      ]
    },
    {
      id: "execution-infrastructure",
      name: "Execution & Infrastructure",
      lessons: [
        {
          id: "algo-backtesting-engine-design",
          title: "Backtesting Engines: Vectorised versus Event-Driven",
          content: `
            <p>The two architectures answer different questions, and choosing the wrong one either wastes weeks or produces a silently wrong result.</p>
            <p>A <strong>vectorised</strong> backtest computes signals for the whole history as array operations and multiplies by shifted returns. It is fast (seconds for decades of daily data), easy to write, and ideal for screening ideas and sweeping parameters. Its structural limitation is that it cannot represent state or path dependence: no order queue, no partial fills, no position-dependent logic, no stop that depends on the entry price of the current position. The near-universal bug is the shift — signal at t must multiply the return from t to t+1, and getting this wrong is look-ahead bias with a Sharpe bonus.</p>
            <p>An <strong>event-driven</strong> backtest processes a chronological event queue (market data → signal → order → fill → portfolio update), with each component seeing only what would have existed at that moment. It is slower, but it models order types, latency, partial fills, and margin, and — the decisive advantage — the <em>same</em> strategy object can be driven by a historical feed or a live feed, which eliminates the entire class of bugs arising from having two implementations of one strategy.</p>
            <p>Existing engines are worth using before writing your own: <em>vectorbt</em> for fast vectorised parameter sweeps, <em>backtrader</em> and <em>bt</em> for event-driven work, <em>zipline-reloaded</em> for the pipeline-style universe research. Writing a minimal event-driven engine once is nevertheless the single most instructive exercise in this chapter — it forces every implicit assumption about fills and timing into the open.</p>
            <p><strong>Further reading:</strong> López de Prado, <em>AFML</em>, Ch. 11 (§11.5-11.7 on how backtests should be used) and Ch. 13 (backtesting on synthetic data); Chan, <em>Quantitative Trading</em> (2009), Ch. 3 for a practical backtesting workflow and its common errors.</p>
          `,
          exercises: [
            "Write a minimal event-driven backtester with four components: a data handler emitting bar events, a strategy emitting signal events, a portfolio emitting order events with position sizing, and an execution handler emitting fill events with a configurable slippage model. Run the same strategy through it and through a vectorised implementation and reconcile the equity curves to the cent — then explain every discrepancy you find.",
            "Take a strategy with a stop-loss and show that it cannot be expressed as a pure vectorised computation. Then derive a vectorised approximation, quantify its error against the event-driven result across a range of stop distances, and state when the approximation is acceptable."
          ]
        },
        {
          id: "algo-execution-algos",
          title: "Execution Algorithms: TWAP, VWAP, and Implementation Shortfall",
          content: `
            <p>Once an order is larger than the liquidity at the touch, <em>how</em> you execute matters as much as what you decided to buy. Execution algorithms slice a parent order into children over time, trading off market impact (worse if you trade fast) against timing risk (worse if you trade slowly) — the fundamental tension formalised by Almgren-Chriss as a mean-variance problem in execution.</p>
            <table class="mini-table">
              <tr><th>Algorithm</th><th>Schedule</th><th>Best for</th></tr>
              <tr><td>TWAP</td><td>equal slices per unit clock time</td><td>simple, predictable; vulnerable to being detected</td></tr>
              <tr><td>VWAP</td><td>slices proportional to forecast volume profile</td><td>benchmarked against the day's VWAP</td></tr>
              <tr><td>POV</td><td>fixed % of realised volume</td><td>adapts to actual liquidity; uncertain completion time</td></tr>
              <tr><td>Implementation shortfall</td><td>front-loaded, urgency-optimised</td><td>minimising cost vs. the arrival price</td></tr>
            </table>
            <p>The benchmark choice is a strategic decision, not a reporting detail. Beating VWAP is easy and can be achieved while losing money relative to your decision price; implementation shortfall — the difference between the realised portfolio and a paper portfolio executed instantly at the decision price — is the honest measure, decomposing into delay cost, impact cost, and opportunity cost on the unfilled remainder.</p>
            <p>At retail and small-institutional scale this matters less than it might seem, because typical order sizes sit well inside the touch. The point at which it starts to matter is computable: compare your order size to the average size at the touch and to average daily volume, and apply the square-root impact law (see Finance &gt; Market Microstructure). That comparison also gives you your strategy's capacity — the AUM at which its expected impact eats its expected edge.</p>
            <p><strong>Further reading:</strong> Johnson, <em>Algorithmic Trading and DMA</em> (2010), Ch. 5 (the main algorithm families: TWAP, VWAP, percentage-of-volume, implementation shortfall) and Ch. 6 (choosing between them); Almgren &amp; Chriss, "Optimal Execution of Portfolio Transactions", <em>Journal of Risk</em> 3(2), 2000.</p>
          `,
          exercises: [
            "Set up the Almgren-Chriss problem for a single asset: linear temporary impact, linear permanent impact, and Gaussian price innovations. Derive the optimal execution trajectory for a risk-neutral trader and show that it is TWAP; then show how the trajectory front-loads as risk aversion increases.",
            "Using the square-root impact law and an estimate of average daily volume for a liquid instrument, compute your strategy's capacity: the AUM at which expected impact cost equals expected gross return per trade. State every assumption and give a sensitivity analysis over the impact coefficient."
          ]
        },
        {
          id: "algo-paper-trading-apis",
          title: "Paper Trading and Broker APIs",
          content: `
            <p>Paper trading is the stage between backtest and capital, and its purpose is not to re-validate the edge — a few months of paper results carry almost no statistical information about a Sharpe ratio. Its purpose is to find the failure modes a backtest structurally cannot: data feed gaps and bad ticks arriving live, orders rejected for insufficient buying power or short-locate failure, halted or suspended symbols, timezone and session-boundary errors, reconnection after a dropped websocket, and the accumulation of small discrepancies between assumed and actual fills.</p>
            <p>The operational core is a reconciliation loop. Every cycle, compare the position and cash the system believes it holds against what the broker reports, and halt on mismatch. Silent divergence between intended and actual state is the most common way automated trading loses money without any strategy failing.</p>
            <p>The practical landscape: <em>Alpaca</em> offers a simple REST/websocket API with a paper endpoint identical to the live one — the lowest-friction starting point for US equities. <em>Interactive Brokers</em> has broader market access with a considerably more awkward API and a required gateway process; its paper account is the standard institutional-lite choice. Whichever you use, isolate the broker behind your own interface so that the strategy code never depends on it, make every order submission idempotent with a client-generated order id (so a retry after a timeout cannot double-send), and treat the risk limits as a separate layer that can veto any order — maximum position, maximum daily loss, maximum order size — enforced independently of strategy logic.</p>
            <p><strong>Further reading:</strong> Chan, <em>Quantitative Trading</em> (2009), Ch. 5 (execution systems: paper trading, order management and the differences between backtest and live results) and Ch. 7 on operational considerations; the Alpaca and IBKR API references for the concrete endpoints.</p>
          `,
          exercises: [
            "Build a paper-trading harness against a broker's paper API that runs one strategy, logs every intended order and every fill, and performs an end-of-cycle reconciliation of positions and cash against the broker's reported state. Then deliberately inject three failure modes — a dropped connection mid-order, a rejected order, and a duplicated submission — and verify your system recovers correctly from each.",
            "Estimate how long a paper-trading period would need to run to detect a 50% degradation in a strategy whose backtest Sharpe is 1.5, at 80% power and the 5% level. Use the standard error of the Sharpe ratio, and discuss what this implies about the right role of paper trading."
          ]
        },
        {
          id: "algo-research-infrastructure",
          title: "Research Infrastructure: Reproducibility and the Feedback Loop",
          content: `
            <p>The final failure mode is organisational rather than mathematical: a research process that cannot reproduce its own results, and that leaks information across experiments. Everything about backtest overfitting assumes you can count how many hypotheses you tested; that is only true if the infrastructure records them.</p>
            <p>The minimum viable setup has five pieces:</p>
            <ul>
              <li><strong>Immutable, versioned data</strong> — raw data written once and never edited in place; every derived dataset reproducible from raw by a recorded pipeline. Point-in-time semantics as described in Finance's data-hygiene lesson.</li>
              <li><strong>An experiment log</strong> — every backtest run records the code version, data version, full parameter set, and results, automatically. This is what makes the deflated Sharpe computable rather than a guess.</li>
              <li><strong>Determinism</strong> — fixed random seeds, pinned dependency versions, and awareness that floating-point reductions are not associative, so parallel sums differ run to run.</li>
              <li><strong>A held-out period never touched during research</strong> — the only genuinely out-of-sample evidence you will ever have, and it is single-use. Once you look, it is in-sample.</li>
              <li><strong>Monitoring in production</strong> — track live performance against backtest expectation, and define the decommissioning rule in advance (e.g. halt at a drawdown exceeding some multiple of the backtest's worst) rather than in the middle of a losing streak.</li>
            </ul>
            <p>The discipline that ties this subject together: the mathematics tells you what a number means, and the infrastructure here is what makes the number trustworthy. Both are necessary; neither substitutes for the other.</p>
            <p><strong>Further reading:</strong> López de Prado, <em>AFML</em>, Ch. 21-22 (structuring a research process and the multiprocessing/computational infrastructure) and §11.7 on research protocol; Chan, <em>Quantitative Trading</em> (2009), Ch. 7 on running a trading business.</p>
          `,
          exercises: [
            "Design and implement an experiment-logging decorator that wraps a backtest function and records, for every invocation, the git commit hash, a hash of the input data, the full parameter dictionary, and the resulting performance statistics into an append-only store. Then write the query that computes the deflated Sharpe ratio for a given strategy family from that store.",
            "Demonstrate non-determinism from floating-point non-associativity: sum a large array of returns sequentially and with a parallel reduction, and show the results differ in the last bits. Then construct a case where that difference changes a strategy's discrete signal, and propose a mitigation."
          ]
        }
      ]
    }
  ]
};
