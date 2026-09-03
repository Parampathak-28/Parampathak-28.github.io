"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Highlighter,
  PanelLeft,
  Search,
  Share2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import styles from "./ResearchLens.module.css";

/* =========================================================
   TYPES
========================================================= */

type PaperId =
  | "qrc-energy"
  | "qrc-dac"
  | "bayesian-games"
  | "kasper"
  | "drug-design"
  | "actr"
  | "drive"
  | "qiskit"
  | "vqr-5g";

type Paper = {
  id: PaperId;
  number: string;
  title: string;
  shortTitle: string;
  venue: string;
  year: string;
  status?: string;
  category: string;
  tags: string[];
  href: string;

  problem: string;
  idea: string;
  interesting: string;
  evidence: string[];
  boundary: string;
  next: string;
  annotation: string;
};

/* =========================================================
   PAPERS
========================================================= */

const PAPERS: Paper[] = [
  {
    id: "qrc-energy",

    number: "01",

    title:
      "Quantum Reservoir Computing for Short-Term Power Load Forecasting in Resource-Constrained Energy Systems",

    shortTitle:
      "QRC for Resource-Constrained Energy Systems",

    venue:
      "IEEE Transactions on Quantum Engineering",

    year: "2026",

    status: "Under Review",

    category:
      "Quantum ML · Energy",

    tags: [
      "Quantum Reservoir Computing",
      "Time Series",
      "Quantization",
      "Energy",
      "Edge AI",
    ],

    href:
      "https://arxiv.org/abs/2606.12806",

    problem:
      "Short-term electricity demand forecasting has to remain accurate while operating under practical constraints such as limited memory, finite quantum measurement budgets and hardware noise. Those constraints become particularly important when forecasting moves from centralized infrastructure toward edge devices.",

    idea:
      "Use a fixed quantum reservoir as a nonlinear feature generator, train only a classical Elastic Net readout and then compress that readout using post-training fixed-point quantization. The framework processes 24-hour temporal windows and evaluates the resulting model under exact simulation, 512-shot sampling and realistic IBM backend-noise models.",

    interesting:
      "The unusual part is that the quantum circuit itself is not trained. The reservoir stays frozen. This moves most of the learning burden into a small classical readout and lets the study ask a very practical question: how much numerical precision does that readout actually need?",

    evidence: [
      "6-bit readout precision preserved full-precision forecasting performance while reducing readout memory by 81.2%.",
      "The framework was evaluated on both Tetouan and Spain energy-load datasets.",
      "Below 6-bit precision, degradation became dataset-dependent rather than following one universal pattern.",
      "The trained readout was also evaluated against noisy reservoir states without retraining.",
    ],

    boundary:
      "The hardware study uses realistic IBM backend-noise models rather than establishing performance through a large-scale live-hardware deployment. Memory reduction is therefore a meaningful deployment signal, but not yet a complete edge-device benchmark covering latency, power and end-to-end hardware cost.",

    next:
      "Run the same pipeline on physical quantum processors and measure the full deployment frontier: forecasting error, circuit execution cost, latency, energy consumption and memory together.",

    annotation:
      "I like this project because the interesting question is not simply whether QRC forecasts well. It asks what remains when the model is forced to live under an actual resource budget.",
  },

  {
    id: "qrc-dac",

    number: "02",

    title:
      "Late Breaking Results: Hardware-Efficient Quantum Reservoir Computing via Quantized Readout",

    shortTitle:
      "Hardware-Efficient QRC",

    venue:
      "Design Automation Conference",

    year: "2026",

    status: "DAC 2026",

    category:
      "Quantum ML · Hardware",

    tags: [
      "QRC",
      "Quantized Readout",
      "Finite Shots",
      "Genetic Search",
      "Edge Deployment",
    ],

    href:
      "https://arxiv.org/abs/2604.06075",

    problem:
      "Quantum reservoir computing can avoid expensive quantum backpropagation, but deployment still leaves a classical readout that consumes memory. At the same time, realistic quantum inference must operate with a finite number of measurements rather than ideal expectation values.",

    idea:
      "Build a fixed quantum reservoir using Chebyshev feature encoding and brickwork entanglement, select the reservoir architecture through genetic search, train an Elastic Net readout and then quantize only the readout to 8, 6, 4, 3 and 2-bit precision.",

    interesting:
      "Instead of asking whether lower precision is merely possible, the experiment exposes a compression threshold. Moderate quantization barely changes forecasting quality, but aggressive quantization begins to interact with finite-shot measurement noise.",

    evidence: [
      "The architecture search examined 18 candidate reservoir configurations.",
      "The selected reservoir used 7 qubits and 4 layers.",
      "Both 8-bit and 6-bit readouts stayed within approximately 1% of FP32 performance.",
      "At 6-bit precision, readout memory fell by 81.2%; the reported finite-shot RMSE was 3298.9 ± 0.3.",
    ],

    boundary:
      "The late-breaking study focuses on the Tetouan dataset and two random seeds. It demonstrates a useful compression-accuracy result, but does not by itself establish general QRC superiority or production-level quantum advantage.",

    next:
      "Test whether the apparent 6-bit sweet spot survives across different datasets, quantum devices, shot budgets and reservoir architectures.",

    annotation:
      "The result I find most useful here is the existence of a practical operating point rather than the smallest possible bit-width.",
  },

  {
    id: "bayesian-games",

    number: "03",

    title:
      "Game, Set, Quantum: Parameterized Quantum Circuit for Correlated Equilibrium in Bayesian Games",

    shortTitle:
      "Game, Set, Quantum",

    venue:
      "Scientific Reports · Nature Portfolio",

    year: "2026",

    status: "Under Review",

    category:
      "Game Theory · Quantum ML",

    tags: [
      "Bayesian Games",
      "Correlated Equilibrium",
      "Regret",
      "PQC",
      "Multi-Agent Systems",
    ],

    href:
      "https://arxiv.org/abs/2606.03109",

    problem:
      "In Bayesian games, agents act with incomplete information about one another. The computational problem is not merely to optimize an objective, but to learn behavior for which players have little incentive to deviate after accounting for private information and correlated recommendations.",

    idea:
      "Use a compact parameterized learning architecture for correlated decision-making in Bayesian games and evaluate the resulting policies through regret. The emphasis is on whether the learned behavior approaches an equilibrium rather than whether a single scalar objective becomes large.",

    interesting:
      "This project changed how I think about regret. In optimization, improvement is usually measured against an objective. In game theory, regret also tells us whether an agent still has a profitable reason to change its behavior.",

    evidence: [
      "The architecture uses 60 trainable parameters.",
      "The learned policies were benchmarked against MCCFR.",
      "In the strongest reported experimental setting, regret was up to roughly 6× lower than the MCCFR baseline.",
      "Evaluation focuses on equilibrium behavior and incentives to deviate.",
    ],

    boundary:
      "The result is an empirical comparison under the games and experimental configurations studied. It should not be interpreted as a general quantum advantage claim across arbitrary Bayesian games.",

    next:
      "Study how the equilibrium behavior scales with larger type spaces, more players, realistic noise and stronger classical equilibrium-solving baselines.",

    annotation:
      "The most satisfying connection here is simple: low regret is not just a learning score. It can act as evidence that very little incentive to deviate remains.",
  },

  {
    id: "kasper",

    number: "04",

    title:
      "KASPER: Kolmogorov Arnold Networks for Stock Predictions & Explainable Regimes",

    shortTitle:
      "KASPER",

    venue:
      "Transactions on Machine Learning Research",

    year: "2026",

    category:
      "Machine Learning · Quant Finance",

    tags: [
      "KAN",
      "Regime Detection",
      "Finance",
      "Explainability",
      "Time Series",
    ],

    href:
      "https://openreview.net/pdf/1b7e99c595c4d18a25b1a71699d709e45357ae1d.pdf",

    problem:
      "Financial relationships are non-stationary. A predictor that behaves well during one market regime can fail when the underlying structure changes, while conventional black-box models often provide little insight into why their predictions change.",

    idea:
      "Combine regime detection with Kolmogorov-Arnold Networks using sparse spline-based representations and Gumbel-Softmax regime assignments. The framework also uses feature-attribution analysis to examine how predictive structure changes across regimes.",

    interesting:
      "The question that interested me most was not only whether the model could forecast returns, but whether its explanation should itself change when the market regime changes.",

    evidence: [
      "Reported predictive R² reached 0.89.",
      "The evaluated strategy reported a Sharpe Ratio of 12.02.",
      "The reported win rate was 83%.",
      "Maximum drawdown in the reported experiments was approximately -0.09%.",
    ],

    boundary:
      "Strong historical or experimental financial metrics are not evidence that the same performance will persist in future markets. Regime definitions, transaction assumptions and distribution shift remain central concerns in any real deployment.",

    next:
      "Move from regime-aware prediction toward regime-aware sequential decision-making and test whether the model remains robust across markets, costs and genuinely unseen economic conditions.",

    annotation:
      "This was where explainability became more interesting to me than simply attaching one global importance score to a model.",
  },

  {
    id: "drug-design",

    number: "05",

    title:
      "Quantum-Classical Generative Models for Drug Design",

    shortTitle:
      "Quantum-Classical Drug Design",

    venue:
      "Quantum Machine Intelligence · Springer Nature",

    year: "2026",

    category:
      "Generative AI · Quantum ML",

    tags: [
      "Generative Models",
      "Quantum ML",
      "Molecules",
      "Wasserstein",
      "QM9",
    ],

    href:
      "https://link.springer.com/article/10.1007/s42484-026-00356-x",

    problem:
      "Generative molecular models need to produce chemically meaningful and diverse candidates while avoiding mode collapse and unstable training. The project investigates whether parameterized quantum components can be incorporated into classical generative pipelines in a measurable way.",

    idea:
      "Develop and benchmark three generative architectures combining classical neural networks with parameterized quantum models. Training uses a Wasserstein formulation with gradient penalty, followed by systematic comparison across multiple molecular-quality metrics.",

    interesting:
      "The useful part was not simply producing molecules. We evaluated many model variants across several metrics because a generative model can look impressive under one score while failing badly under another.",

    evidence: [
      "16 generative model variants were benchmarked.",
      "Experiments used approximately 134K molecules from QM9.",
      "The reported setup improved molecular generation quality by about 40% according to the study's Fréchet-distance comparison.",
      "Reported metrics included NP = 0.792, QED = 0.486 and 44% novelty.",
    ],

    boundary:
      "Molecular-generation metrics are only proxies for practical drug discovery. Producing statistically plausible molecules does not establish synthesizability, biological activity, safety or clinical usefulness.",

    next:
      "Connect generation to harder downstream constraints such as synthesizability, docking, target-specific properties and experimentally meaningful molecular objectives.",

    annotation:
      "This project taught me why one metric is almost never enough for evaluating a generative model.",
  },

  {
    id: "actr",

    number: "06",

    title:
      "Quantum-Enhanced Decision-Making in ACT-R",

    shortTitle:
      "Quantum-Enhanced ACT-R",

    venue:
      "Elsevier · Quantum Computational AI Algorithms, Systems and Applications",

    year: "2024",

    category:
      "Cognitive AI · Quantum Optimization",

    tags: [
      "ACT-R",
      "Cognitive Architecture",
      "QAOA",
      "Decision Making",
      "Cognitive Science",
    ],

    href:
      "https://www.sciencedirect.com/science/article/pii/B9780443302596000219",

    problem:
      "Cognitive architectures such as ACT-R and Soar provide structured models of human-like cognition, but decision-making can become difficult when many competing actions, uncertain utilities or complex problem spaces have to be considered.",

    idea:
      "Develop a theoretical architecture in which the Quantum Approximate Optimization Algorithm acts as a decision-making module inside ACT-R. The objective is to connect symbolic cognitive processes with a quantum optimization mechanism for difficult choice problems.",

    interesting:
      "The conceptual tension is what makes the work interesting: ACT-R represents cognition through structured symbolic mechanisms, while QAOA approaches the decision layer as a combinatorial optimization problem.",

    evidence: [
      "The chapter develops an explicit theoretical framework for integrating QAOA with ACT-R.",
      "It examines production conflict, utility-based decision-making and broader capabilities of cognitive architectures.",
      "The contribution is primarily architectural and conceptual rather than a claim of demonstrated quantum computational advantage.",
    ],

    boundary:
      "This is a theoretical framework. It does not establish through large experimental benchmarks that a QAOA-enabled ACT-R system outperforms classical cognitive architectures.",

    next:
      "Implement the proposed decision module on controlled cognitive tasks and compare it against classical rule-selection and optimization methods using both behavioral and computational metrics.",

    annotation:
      "This work sits at the intersection of two things I find fascinating: how intelligent systems choose and how human cognition itself is modeled.",
  },

  {
    id: "drive",

    number: "07",

    title:
      "DRiVE: Dynamic Recognition in VEhicles using snnTorch",

    shortTitle:
      "DRiVE",

    venue:
      "IEEE ASSIC",

    year: "2025",

    category:
      "Neuromorphic ML",

    tags: [
      "Spiking Neural Networks",
      "snnTorch",
      "Vehicle Detection",
      "LIF",
      "Surrogate Gradients",
    ],

    href:
      "https://arxiv.org/abs/2502.10421",

    problem:
      "Conventional neural networks can achieve strong perception performance but rely on dense continuous computation. Spiking neural networks offer an event-driven alternative that is attractive for efficient neuromorphic perception.",

    idea:
      "Build a vehicle-recognition system using spiking neural computation with Leaky Integrate-and-Fire neurons and surrogate-gradient training implemented through snnTorch.",

    interesting:
      "The project was one of my earliest exposures to the idea that the computational representation itself matters. A model does not have to communicate through conventional continuous activations to learn useful visual structure.",

    evidence: [
      "Reported vehicle-detection accuracy reached 94.8%.",
      "Reported AUC reached 0.99.",
      "The architecture used LIF spiking neurons and surrogate-gradient learning.",
      "The work was published at IEEE ASSIC 2025.",
    ],

    boundary:
      "A vehicle-detection benchmark is not equivalent to a complete autonomous-driving perception stack. Real deployment would also need latency, energy, robustness, sensor and neuromorphic-hardware evaluation.",

    next:
      "Measure whether the event-driven representation produces meaningful energy and latency advantages when deployed on actual neuromorphic hardware.",

    annotation:
      "This project made hardware-aware machine learning much more concrete for me.",
  },

  {
    id: "qiskit",

    number: "08",

    title:
      "The Evolution of IBM's Quantum Information Software Kit: A Review of its Applications",

    shortTitle:
      "The Evolution of Qiskit",

    venue:
      "Research Review",

    year: "2025",

    category:
      "Quantum Software · Review",

    tags: [
      "Qiskit",
      "Quantum Software",
      "Reproducibility",
      "Literature Review",
      "Quantum Computing",
    ],

    href:
      "https://arxiv.org/abs/2508.12245",

    problem:
      "Quantum-software research evolves unusually quickly. APIs, execution models and software abstractions can change substantially while published application papers continue to reference older versions of the ecosystem.",

    idea:
      "Review Qiskit-based application research while also examining how the software stack itself evolved, from earlier package structures toward modern primitives, runtime services and the contemporary Qiskit architecture.",

    interesting:
      "For me, the deeper question became reproducibility. A quantum experiment is difficult to reproduce when a paper says it used Qiskit but does not tell you which software environment actually produced the result.",

    evidence: [
      "The review spans applications using simulation, noisy execution and physical quantum hardware.",
      "It examines Qiskit across multiple application domains rather than treating the framework as a single algorithm.",
      "The work emphasizes the relationship between software evolution, experimental evidence and reproducibility.",
    ],

    boundary:
      "A software ecosystem can change faster than a review article can be published. Any review of Qiskit therefore has to be interpreted as a documented snapshot rather than a permanently current software manual.",

    next:
      "Make quantum-software reviews version-aware and attach reproducible environments so that reported experiments remain executable even after the surrounding SDK changes.",

    annotation:
      "The surprising lesson was that reproducibility in quantum computing is partly a software-engineering problem.",
  },

  {
    id: "vqr-5g",

    number: "09",

    title:
      "Resource Allocation Optimization in 5G Networks using Variational Quantum Regressor",

    shortTitle:
      "5G Resource Allocation with VQR",

    venue:
      "IEEE QCNC",

    year: "2024",

    category:
      "Quantum ML · Telecommunications",

    tags: [
      "VQR",
      "5G",
      "Resource Allocation",
      "Qiskit",
      "Regression",
    ],

    href:
      "https://ieeexplore.ieee.org/document/10628250",

    problem:
      "Resource allocation in 5G networks depends on multiple interacting conditions such as signal strength, bandwidth demand and latency. The project treats allocation as a continuous regression problem and explores a variational quantum model for learning that mapping.",

    idea:
      "Encode selected network features using a ZFeatureMap, process them through a RealAmplitudes variational ansatz and optimize the circuit parameters using COBYLA. The implementation uses a four-qubit VQR and searches over ansatz repetitions before evaluating prediction error.",

    interesting:
      "This was an early project for me, and the important lesson was that a quantum model still has to survive the same questions as any machine-learning model: what data was used, how was it split, what baseline matters and what exactly does the error metric establish?",

    evidence: [
      "The experiment used a 400-instance 5G resource-allocation dataset.",
      "Data was divided into 80% training and 20% testing.",
      "The VQR used 4 qubits and 56 randomly initialized parameters.",
      "The reported mean squared error reached approximately 0.0081.",
    ],

    boundary:
      "The experiment uses a relatively small dataset and Qiskit Aer simulation. It therefore demonstrates feasibility within the studied setup rather than deployment-ready quantum optimization for real 5G infrastructure.",

    next:
      "Test on larger real network traces, strengthen the classical baselines and evaluate the circuit under realistic quantum noise or physical hardware.",

    annotation:
      "Looking back, I value this project as much for the questions it taught me to ask as for the number it produced.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function ResearchLens() {
  const [
    selectedId,
    setSelectedId,
  ] =
    useState<PaperId>(
      "qrc-energy"
    );

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    sidebarVisible,
    setSidebarVisible,
  ] =
    useState(true);

  const [
    zoom,
    setZoom,
  ] =
    useState(1);

  const [
    markup,
    setMarkup,
  ] =
    useState(false);

  const [
    copied,
    setCopied,
  ] =
    useState(false);

  const filteredPapers =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return PAPERS;
      }

      return PAPERS.filter(
        (paper) =>
          paper.title
            .toLowerCase()
            .includes(
              query
            ) ||
          paper.venue
            .toLowerCase()
            .includes(
              query
            ) ||
          paper.category
            .toLowerCase()
            .includes(
              query
            ) ||
          paper.tags.some(
            (tag) =>
              tag
                .toLowerCase()
                .includes(
                  query
                )
          )
      );
    }, [
      search,
    ]);

  const paper =
    PAPERS.find(
      (item) =>
        item.id ===
        selectedId
    ) ?? PAPERS[0];

  const paperIndex =
    PAPERS.findIndex(
      (item) =>
        item.id ===
        paper.id
    );

  const previousPaper =
    () => {
      const index =
        paperIndex === 0
          ? PAPERS.length - 1
          : paperIndex - 1;

      setSelectedId(
        PAPERS[index].id
      );
    };

  const nextPaper =
    () => {
      const index =
        paperIndex ===
        PAPERS.length - 1
          ? 0
          : paperIndex + 1;

      setSelectedId(
        PAPERS[index].id
      );
    };

  const copyPaperLink =
    async () => {
      try {
        await navigator.clipboard.writeText(
          paper.href
        );

        setCopied(true);

        window.setTimeout(
          () =>
            setCopied(
              false
            ),
          1400
        );
      } catch {
        setCopied(false);
      }
    };

  return (
    <div className={styles.app}>

      {/* ===================================================
          TOOLBAR
      =================================================== */}

      <header className={styles.toolbar}>

        <div className={styles.toolbarLeft}>

          <button
            className={styles.toolbarButton}
            onClick={() =>
              setSidebarVisible(
                (current) =>
                  !current
              )
            }
            aria-label="Toggle sidebar"
          >
            <PanelLeft
              size={17}
            />
          </button>

          <div className={styles.toolbarDivider} />

          <button
            className={styles.toolbarButton}
            onClick={previousPaper}
            aria-label="Previous paper"
          >
            <ChevronLeft
              size={18}
            />
          </button>

          <button
            className={styles.toolbarButton}
            onClick={nextPaper}
            aria-label="Next paper"
          >
            <ChevronRight
              size={18}
            />
          </button>

        </div>

        <div className={styles.toolbarIdentity}>

          <BookOpen
            size={15}
          />

          <span>
            Research Lens
          </span>

        </div>

        <div className={styles.toolbarRight}>

          <button
            className={styles.toolbarButton}
            onClick={() =>
              setZoom(
                (current) =>
                  Math.max(
                    0.82,
                    Number(
                      (
                        current -
                        0.08
                      ).toFixed(
                        2
                      )
                    )
                  )
              )
            }
            aria-label="Zoom out"
          >
            <ZoomOut
              size={17}
            />
          </button>

          <span className={styles.zoomValue}>
            {Math.round(
              zoom *
                100
            )}
            %
          </span>

          <button
            className={styles.toolbarButton}
            onClick={() =>
              setZoom(
                (current) =>
                  Math.min(
                    1.18,
                    Number(
                      (
                        current +
                        0.08
                      ).toFixed(
                        2
                      )
                    )
                  )
              )
            }
            aria-label="Zoom in"
          >
            <ZoomIn
              size={17}
            />
          </button>

          <button
            className={
              `${styles.toolbarButton} ${
                markup
                  ? styles.toolbarButtonActive
                  : ""
              }`
            }
            onClick={() =>
              setMarkup(
                (current) =>
                  !current
              )
            }
            aria-label="Toggle annotations"
          >
            <Highlighter
              size={17}
            />
          </button>

          <button
            className={styles.toolbarButton}
            onClick={copyPaperLink}
            aria-label="Copy paper link"
          >
            <Share2
              size={17}
            />
          </button>

        </div>

      </header>

      {/* ===================================================
          BODY
      =================================================== */}

      <div className={styles.body}>

        {/* =================================================
            SIDEBAR
        ================================================= */}

        {sidebarVisible && (
          <aside className={styles.sidebar}>

            <div className={styles.sidebarTop}>

              <div className={styles.searchBox}>

                <Search
                  size={14}
                />

                <input
                  value={search}
                  onChange={(
                    event
                  ) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search research"
                />

              </div>

              <div className={styles.sidebarHeading}>
                PAPERS & PROJECTS
              </div>

            </div>

            <div className={styles.paperList}>

              {filteredPapers.map(
                (
                  item
                ) => (
                  <button
                    key={
                      item.id
                    }
                    className={
                      `${styles.paperItem} ${
                        item.id ===
                        paper.id
                          ? styles.paperItemActive
                          : ""
                      }`
                    }
                    onClick={() =>
                      setSelectedId(
                        item.id
                      )
                    }
                  >

                    <div className={styles.thumbnail}>

                      <div className={styles.thumbnailTop}>
                        {item.number}
                      </div>

                      <FileText
                        size={24}
                        strokeWidth={1.35}
                      />

                      <span>
                        PDF
                      </span>

                    </div>

                    <div className={styles.paperItemText}>

                      <strong>
                        {item.shortTitle}
                      </strong>

                      <span>
                        {item.venue}
                      </span>

                      <small>
                        {item.year}
                      </small>

                    </div>

                  </button>
                )
              )}

              {filteredPapers.length ===
                0 && (
                <div className={styles.noResults}>
                  No matching research.
                </div>
              )}

            </div>

            <div className={styles.sidebarFooter}>
              {PAPERS.length} research artifacts
            </div>

          </aside>
        )}

        {/* =================================================
            DOCUMENT AREA
        ================================================= */}

        <main className={styles.workspace}>

          <div className={styles.documentScroller}>

            <div
              className={styles.paperScale}
              style={{
                transform:
                  `scale(${zoom})`,
                transformOrigin:
                  "top center",
              }}
            >

              <article className={styles.document}>

                <div className={styles.documentTopline}>

                  <span>
                    RESEARCH LENS
                  </span>

                  <span>
                    {paper.number}
                    /
                    {String(
                      PAPERS.length
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                </div>

                <div className={styles.category}>
                  {paper.category}
                </div>

                <h1>
                  {paper.title}
                </h1>

                <div className={styles.paperMeta}>

                  <span>
                    {paper.venue}
                  </span>

                  <span>
                    {paper.year}
                  </span>

                  {paper.status && (
                    <span className={styles.status}>
                      {paper.status}
                    </span>
                  )}

                </div>

                <div className={styles.tags}>

                  {paper.tags.map(
                    (
                      tag
                    ) => (
                      <span
                        key={
                          tag
                        }
                      >
                        {tag}
                      </span>
                    )
                  )}

                </div>

                <div className={styles.rule} />

                <ResearchSection
                  number="01"
                  title="The Problem"
                >
                  {paper.problem}
                </ResearchSection>

                <ResearchSection
                  number="02"
                  title="The Idea"
                >
                  {paper.idea}
                </ResearchSection>

                <ResearchSection
                  number="03"
                  title="The Interesting Part"
                >
                  {paper.interesting}
                </ResearchSection>

                <section className={styles.section}>

                  <div className={styles.sectionHeading}>

                    <span>
                      04
                    </span>

                    <h2>
                      Evidence
                    </h2>

                  </div>

                  <div className={styles.evidenceGrid}>

                    {paper.evidence.map(
                      (
                        item,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                          className={styles.evidenceCard}
                        >

                          <div className={styles.evidenceNumber}>
                            0
                            {index + 1}
                          </div>

                          <p>
                            {item}
                          </p>

                        </div>
                      )
                    )}

                  </div>

                </section>

                <ResearchSection
                  number="05"
                  title="What This Does Not Establish"
                  warning
                >
                  {paper.boundary}
                </ResearchSection>

                <ResearchSection
                  number="06"
                  title="What I'd Try Next"
                >
                  {paper.next}
                </ResearchSection>

                {markup && (
                  <aside className={styles.annotation}>

                    <div className={styles.annotationLabel}>

                      <Highlighter
                        size={14}
                      />

                      PARAM&apos;S NOTE

                    </div>

                    <p>
                      {paper.annotation}
                    </p>

                  </aside>
                )}

                <div className={styles.documentFooter}>

                  <a
                    href={
                      paper.href
                    }
                    target="_blank"
                    rel="noreferrer"
                    className={styles.readPaper}
                  >

                    Read paper

                    <ArrowUpRight
                      size={15}
                    />

                  </a>

                  <span>
                    Selected research · Param Pathak
                  </span>

                </div>

              </article>

            </div>

          </div>

          {/* ===============================================
              BOTTOM BAR
          =============================================== */}

          <div className={styles.bottomBar}>

            <div className={styles.bottomTitle}>

              <FileText
                size={14}
              />

              <span>
                {paper.shortTitle}
              </span>

            </div>

            <div className={styles.bottomActions}>

              {copied && (
                <span className={styles.copied}>
                  Link copied
                </span>
              )}

              <a
                href={
                  paper.href
                }
                target="_blank"
                rel="noreferrer"
              >

                Open publication

                <ExternalLink
                  size={13}
                />

              </a>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

function ResearchSection({
  number,
  title,
  children,
  warning = false,
}: {
  number: string;
  title: string;
  children: string;
  warning?: boolean;
}) {
  return (
    <section
      className={
        `${styles.section} ${
          warning
            ? styles.warningSection
            : ""
        }`
      }
    >

      <div className={styles.sectionHeading}>

        <span>
          {number}
        </span>

        <h2>
          {title}
        </h2>

      </div>

      <p className={styles.sectionText}>
        {children}
      </p>

    </section>
  );
}