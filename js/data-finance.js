// Finance content — general finance & economics (NOT trading-algorithm-specific; that's data-algotrading.js).
// See data-physics.js's header for the full field-by-field doc. Same rules, "fin-" id prefix.
//
// STATUS (2026-08-30): "market-microstructure" chapter moved here verbatim from data-algorithmics.js
// (unchanged content, ids kept as "algo-*" since renaming risked breaking cross-references — a cosmetic
// wart, not a bug). "economics" chapter is a brand-new placeholder skeleton (6 stub lessons covering
// basic micro/macro) — structure only, content pending a lesson-design pass.
// Cross-subject prerequisites (data-algotrading.js lessons requiring specific lessons here) are not
// wired yet — flagged as a follow-up.

const FINANCE_SUBJECT = {
  id: "finance",
  name: "Finance",
  color: "#c2673d",
  chapters: [
    {
      id: "economics",
      name: "Foundations of Economics",
      lessons: [
        {
          id: "fin-supply-demand",
          title: "Supply, Demand, and Market Equilibrium",
          section: "Microeconomics",
          prerequisites: [],
          estMinutes: 25,
          content: `
            <p><em>Placeholder — content not written yet. Covers: supply/demand curves, equilibrium price and quantity, comparative statics (shifts vs. movements along a curve), consumer/producer surplus. Will be built out after a lesson-design pass.</em></p>
          `,
          exercises: []
        },
        {
          id: "fin-elasticity",
          title: "Elasticity: Measuring Responsiveness",
          section: "Microeconomics",
          prerequisites: ["fin-supply-demand"],
          estMinutes: 20,
          content: `
            <p><em>Placeholder — content not written yet. Covers: price elasticity of supply/demand, cross-price and income elasticity, and what elasticity implies for tax incidence and revenue.</em></p>
          `,
          exercises: []
        },
        {
          id: "fin-market-structure",
          title: "Market Structure: Competition, Monopoly, and Oligopoly",
          section: "Microeconomics",
          prerequisites: ["fin-supply-demand"],
          estMinutes: 25,
          content: `
            <p><em>Placeholder — content not written yet. Covers: perfect competition as a baseline, monopoly pricing and deadweight loss, oligopoly and strategic interaction (a natural link to game theory).</em></p>
          `,
          exercises: []
        },
        {
          id: "fin-gdp-business-cycle",
          title: "GDP, Inflation, and the Business Cycle",
          section: "Macroeconomics",
          prerequisites: [],
          estMinutes: 25,
          content: `
            <p><em>Placeholder — content not written yet. Covers: what GDP measures (and doesn't), real vs. nominal, CPI/inflation measurement, the phases of a business cycle.</em></p>
          `,
          exercises: []
        },
        {
          id: "fin-money-banking",
          title: "Money, Banking, and Interest Rates",
          section: "Macroeconomics",
          prerequisites: ["fin-gdp-business-cycle"],
          estMinutes: 25,
          content: `
            <p><em>Placeholder — content not written yet. Covers: what money is, fractional-reserve banking and money creation, the yield curve, nominal vs. real interest rates.</em></p>
          `,
          exercises: []
        },
        {
          id: "fin-monetary-fiscal-policy",
          title: "Monetary & Fiscal Policy Basics",
          section: "Macroeconomics",
          prerequisites: ["fin-money-banking"],
          estMinutes: 25,
          content: `
            <p><em>Placeholder — content not written yet. Covers: central bank tools (rates, QE), transmission mechanisms, fiscal policy and deficits, and why this matters directly for reading macro data as a trading input.</em></p>
          `,
          exercises: []
        }
      ]
    },
    {
      id: "market-microstructure",
      name: "Market Microstructure & Financial Data",
      lessons: [
        {
          id: "algo-order-book-mechanics",
          title: "The Limit Order Book: Price-Time Priority and the Spread",
          content: `
            <p>A modern order-driven market is a continuous double auction. The limit order book holds resting buy orders (bids) and sell orders (asks) sorted by price, and within each price level by arrival time — <strong>price-time priority</strong>. A market order consumes the best available levels immediately; a limit order either crosses the spread and executes, or joins the book and waits. The best bid and best ask define the touch, and the difference between them is the quoted spread.</p>
            <p>The two order types are the two sides of a fundamental tradeoff. A market order pays the spread and guarantees execution — it is a <em>liquidity taker</em>. A limit order earns the spread but bears two risks: non-execution, and adverse selection (it executes precisely when the market moves against it, because informed traders pick off stale quotes). This is why the spread is not a fee but a compensation: market makers quote a spread wide enough to cover order-processing costs, inventory risk, and expected losses to informed order flow.</p>
            <p>Consequences to carry forward. Quoted spread overstates cost when there is price improvement and understates it when your order exceeds the size at the touch — the correct measure is the volume-weighted execution price against a benchmark, giving <em>effective</em> spread. Book depth, not just the touch, determines the cost of a given size, and walking the book is the direct source of slippage. Market impact is not linear in size: the square-root law <code>impact ≈ Y·σ·√(Q/V)</code> is the widely observed empirical regularity, which alone caps the capacity of any strategy.</p>
            <p><strong>Further reading:</strong> Harris, <em>Trading and Exchanges: Market Microstructure for Practitioners</em> (2003), Ch. 4 (orders and order properties), Ch. 5 (market structures) and Ch. 6 (order-driven market mechanisms); López de Prado, <em>AFML</em>, Ch. 19 (microstructural features) for the derived signals.</p>
          `,
          exercises: [
            "Given a snapshot of a limit order book with several price levels and sizes on each side, compute: the quoted spread, the midpoint, the microprice (size-weighted midpoint), and the effective cost of a market buy of size Q that walks three levels. Then derive the general expression for the walk-the-book cost as a function of Q.",
            "Model adverse selection simply: with probability p an informed trader arrives who knows the true value is worth ±δ away, otherwise an uninformed trader arrives at random. Derive the minimum spread a risk-neutral market maker must quote to break even, and show how it grows with p and δ."
          ]
        },
        {
          id: "algo-bars-and-sampling",
          title: "Bars, Tick Data, and Alternatives to Clock Time",
          content: `
            <p>Raw market data is a stream of ticks: trades with price, size, timestamp, and quote updates. Bars aggregate them, and the aggregation rule is a modelling decision, not a formatting one. Standard OHLCV time bars sample on a fixed clock — but market activity is emphatically not uniform in clock time. Volume follows a strong intraday U-shape, and news arrives in bursts, so time bars oversample quiet periods and undersample exactly the informative ones. The statistical consequence is that time-bar returns exhibit worse heteroskedasticity and heavier tails than necessary.</p>
            <table class="mini-table">
              <tr><th>Bar type</th><th>Sampled every…</th><th>Property</th></tr>
              <tr><td>Time</td><td>fixed clock interval</td><td>familiar; poor statistical properties</td></tr>
              <tr><td>Tick</td><td>N transactions</td><td>closer to iid returns; distorted by order fragmentation</td></tr>
              <tr><td>Volume</td><td>N shares/contracts</td><td>better still; ties sampling to activity</td></tr>
              <tr><td>Dollar</td><td>N units of traded value</td><td>robust to price level changes and splits</td></tr>
            </table>
            <p>Beyond bar construction, the data hygiene checklist is non-negotiable. Prices must be <strong>adjusted</strong> for splits and dividends, or every corporate action appears as a fake gap — but note that adjusted prices are revised backward, so a backtest using today's adjusted series is using information unavailable at the time. Consolidated versus single-venue feeds differ. Timestamps may be exchange-side or capture-side, and the difference is exactly the latency you must model. Quote and trade data need cleaning for crossed books, outliers, and reporting-lag trades.</p>
            <p><strong>Further reading:</strong> López de Prado, <em>AFML</em>, Ch. 2 (Financial Data Structures) — §2.3 on bars, including tick, volume and dollar bars, and §2.5 on multi-product series; Harris (2003), Ch. 4 for the underlying order types that generate the ticks.</p>
          `,
          exercises: [
            "Take a day of tick data (or simulate one with a U-shaped intraday intensity). Construct time bars, tick bars, volume bars, and dollar bars with matched average counts. For each, test the returns for normality and for serial correlation, and report which bar type produces returns closest to iid.",
            "Explain precisely how using a back-adjusted price series introduces a subtle look-ahead bias, and construct a concrete example where a strategy conditioned on a price threshold is affected. Then describe the data structure needed to avoid it."
          ]
        },
        {
          id: "algo-survivorship-bias",
          title: "Survivorship Bias and Point-in-Time Data",
          content: `
            <p>Survivorship bias is the systematic error introduced by studying only the entities that still exist. Backtest a strategy on today's S&amp;P 500 constituents over the last 20 years and you have selected companies that were successful enough to still be in the index — a selection made using future information. Published estimates of the resulting inflation in annualised equity returns are typically on the order of one to two percentage points, which is larger than most strategies' entire claimed edge.</p>
            <p>The bias family is broader than delisted stocks:</p>
            <ul>
              <li><strong>Index membership</strong> — you must use the historical constituent list as of each date, not the current one.</li>
              <li><strong>Fund/strategy databases</strong> — failed funds stop reporting, so surviving-fund averages overstate returns.</li>
              <li><strong>Restatement bias</strong> — fundamental data is revised; using the final revised value at a historical date is look-ahead. A point-in-time database stores both the as-of date and the publication date.</li>
              <li><strong>Symbol reuse and corporate actions</strong> — tickers are recycled, so a naive ticker-keyed join silently mixes two different companies. Key on a permanent security identifier.</li>
            </ul>
            <p>The correct data architecture stores, for every fact, both when it was <em>true</em> and when it became <em>known</em>, and every query filters on the second. This is bitemporal modelling, and it is the only structural defence — code review will not catch these errors, because the resulting backtest looks perfectly plausible. Where clean data is unavailable, quantify the bias: rerun on a universe you know contains failures, or apply a haircut and state it explicitly.</p>
            <p><strong>Further reading:</strong> López de Prado, <em>AFML</em>, Ch. 11 (The Dangers of Backtesting), §11.2-11.3 on the sources of backtest bias; Chan, <em>Quantitative Trading</em> (2009), Ch. 3 on data pitfalls in backtesting.</p>
          `,
          exercises: [
            "Design the schema for a bitemporal price and fundamentals store: specify the keys, the two time dimensions, and the exact query that returns 'what was known about security X on date D'. Then show how the same schema handles a restated earnings figure and a ticker change.",
            "Estimate the survivorship effect empirically: construct a universe of stocks in an index today and backtest a simple equal-weight buy-and-hold over 15 years; then repeat using historical constituents including delisted names with delisting returns. Report the difference in CAGR and Sharpe."
          ]
        },
        {
          id: "algo-adf-stationarity-tests",
          title: "Testing for Stationarity: the ADF Test",
          content: `
            <p>Mean-reversion strategies require a mean to revert to, so the first question about any candidate spread is whether it is stationary. The Dickey-Fuller test frames this as a hypothesis test on the AR coefficient. Rewrite the AR(1) in differences:</p>
            <pre><code>ΔX_t = (φ − 1)X_{t−1} + ε_t = δX_{t−1} + ε_t

H₀: δ = 0 (unit root, non-stationary)   vs   H₁: δ &lt; 0 (mean-reverting)</code></pre>
            <p>The <strong>augmented</strong> version adds lagged differences <code>Σ βᵢΔX_{t−i}</code> to soak up higher-order serial correlation, plus optional constant and trend terms, and the choice among the three specifications (none / constant / constant+trend) genuinely changes the answer — choose it from what the series should look like under H₁, not by trying all three.</p>
            <p>The critical values are not normal quantiles. The estimator's limiting distribution under a unit root is a functional of Brownian motion, so the test uses Dickey-Fuller tables and the statistic is more negative than a t-test would suggest. Two further cautions: the ADF test has notoriously low power — it fails to reject the unit root for slowly mean-reverting series over short samples, so "cannot reject" is not "is a random walk" — and it is a linear test, blind to threshold or nonlinear mean reversion. Complements worth running alongside: the KPSS test (which reverses the null), the Hurst exponent, and the half-life implied by <code>−log2/log(1+δ)</code>, which tells you the holding period a strategy would need and is often the more decision-relevant number.</p>
            <p><strong>Further reading:</strong> Chan, <em>Algorithmic Trading: Winning Strategies and Their Rationale</em> (2013), Ch. 2 (the basics of mean reversion: ADF test, Hurst exponent and variance ratio, half-life of mean reversion); Tsay, 3rd ed., §2.7 for the underlying unit-root theory.</p>
          `,
          exercises: [
            "Simulate an AR(1) with φ = 0.99 over 250, 1000, and 5000 observations and report the ADF rejection rate at the 5% level in each case. Quantify the test's power as a function of sample length and derive the relationship to the implied half-life.",
            "Derive the half-life of mean reversion from the OLS estimate of δ in the ADF regression, and explain what a half-life longer than the intended holding period implies for a strategy's Sharpe ratio and its exposure to regime change."
          ]
        },
        {
          id: "algo-cointegration",
          title: "Cointegration: Engle-Granger and Johansen",
          content: `
            <p>Two series can each be non-stationary I(1) while some linear combination of them is stationary I(0). Such series are <strong>cointegrated</strong>: they share a common stochastic trend and the deviation between them mean-reverts. This is the rigorous foundation of pairs trading — and note carefully that it is a stronger and quite different statement from correlation, which measures co-movement of returns and says nothing about whether the levels stay tethered.</p>
            <p>Two testing procedures, with different strengths:</p>
            <ul>
              <li><strong>Engle-Granger</strong> (two-step): regress y on x to estimate the hedge ratio, then run an ADF test on the residuals. Simple, but the residuals are estimated rather than observed, so it needs its own critical values; and it is asymmetric — regressing x on y can give a different verdict. It only finds one cointegrating relation.</li>
              <li><strong>Johansen</strong>: a maximum-likelihood test on a vector error correction model, testing the rank of the long-run impact matrix Π. It handles n series at once, finds up to n−1 independent cointegrating vectors, and is symmetric in the inputs. Use it for baskets, and prefer it generally.</li>
            </ul>
            <p>The VECM representation is the useful mental model: <code>ΔY_t = ΠY_{t−1} + Σ Γᵢ ΔY_{t−i} + ε_t</code>, where <code>rank(Π) = r</code> is the number of cointegrating relations and the rows of Π encode both the equilibrium relationship and the speed of adjustment toward it. Practical warning: cointegration is a statistical property of a sample, and cointegrating relationships break — hedge ratios drift, and pairs decouple permanently when the economic link that produced them (same sector, same input costs, a merger arbitrage) ends. Test on a rolling basis and require an economic rationale, not just a p-value.</p>
            <p><strong>Further reading:</strong> Chan, <em>Algorithmic Trading</em> (2013), Ch. 2 (cointegration, CADF and Johansen tests) and Ch. 3 (implementing mean-reversion strategies, including the linear and Bollinger-band variants); Tsay, 3rd ed., §8.5-8.6 (unit-root nonstationarity and cointegrated VAR models).</p>
          `,
          exercises: [
            "Simulate two cointegrated series by constructing a common random walk plus independent stationary noise. Recover the cointegrating vector by both Engle-Granger and Johansen, compare their accuracy across sample sizes, and demonstrate the asymmetry of the Engle-Granger procedure by swapping the regression's roles.",
            "Show that if X and Y are cointegrated with vector (1, −β), then a portfolio long 1 unit of X and short β units of Y is stationary. Then derive how the strategy's expected profit per unit time depends on the spread's half-life and its stationary standard deviation, and state the transaction-cost threshold below which the strategy is unprofitable."
          ]
        },
        {
          id: "algo-garch-volatility",
          title: "Volatility Modelling: ARCH and GARCH",
          content: `
            <p>Returns are nearly uncorrelated but squared returns are strongly autocorrelated — GARCH formalises this empirical fact. The conditional variance is modelled as a function of past shocks and past variances:</p>
            <pre><code>r_t = μ + a_t,   a_t = σ_t ε_t,   ε_t ~ iid (0,1)

GARCH(1,1):  σ²_t = ω + α a²_{t−1} + β σ²_{t−1},   ω &gt; 0, α,β ≥ 0, α + β &lt; 1
unconditional variance = ω/(1 − α − β);  persistence = α + β</code></pre>
            <p>The parameters have direct interpretations: α measures how sharply volatility reacts to a new shock, β how long it remembers, and α + β the persistence — empirically close to 0.95-0.99 on daily equity data, meaning volatility shocks decay slowly and are highly forecastable. That forecastability is the key asymmetry of financial time series: returns are nearly unforecastable while their variance is substantially forecastable, which is why volatility targeting is one of the few reliably value-adding techniques available.</p>
            <p>Standard extensions each address a stylised fact: EGARCH and GJR-GARCH capture the leverage effect (negative returns raise future volatility more than positive ones of the same size); a Student-t innovation distribution accommodates fat tails that a Gaussian ε cannot; IGARCH is the α + β = 1 boundary case, which is essentially exponentially-weighted moving-average variance. Realised volatility computed from intraday returns is the modern high-frequency alternative and is usually a better predictor when the data is available.</p>
            <p><strong>Further reading:</strong> Tsay, <em>Analysis of Financial Time Series</em>, 3rd ed., §3.4 (the ARCH model), §3.5 (the GARCH model), §3.6 (IGARCH), §3.8 (EGARCH) and §3.14 for the leverage-effect and threshold variants.</p>
          `,
          exercises: [
            "Derive the unconditional variance of a GARCH(1,1) process and the condition α + β less than 1 required for its existence. Then compute the kurtosis of the unconditional distribution under Gaussian innovations and show that it exceeds 3 whenever α is greater than zero — i.e. GARCH generates fat tails from thin-tailed shocks.",
            "Fit a GARCH(1,1) to a daily equity return series by maximum likelihood, then evaluate its one-step-ahead volatility forecasts against realised volatility computed from 5-minute returns. Compare its forecast error with a simple 20-day rolling standard deviation and with an EWMA, and state which you would use in a live volatility-targeting overlay and why."
          ]
        }
      ]
    }
  ]
};
