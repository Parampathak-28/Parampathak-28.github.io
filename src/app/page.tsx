"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";

import MacWindow from "@/components/MacWindow";
import ClaudeApp from "@/components/ClaudeApp";
import MessagesApp from "@/components/MessagesApp";
import PhotosApp from "@/components/PhotosApp";
import ResearchLens from "@/components/ResearchLens";
import MusicApp from "@/components/MusicApp";
import TerminalApp from "@/components/TerminalApp";
import SettingsApp from "@/components/SettingsApp";
import SettingsEffects from "@/components/SettingsEffects";

import {
  useOSStore,
} from "@/store/useOSStore";

import {
  useSettingsStore,
} from "@/store/useSettingsStore";

import type {
  AppId,
} from "@/store/useOSStore";

import {
  Wifi,
  BatteryMedium,
  Search,
  FileText,
  CircleDot,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Columns3,
  Image as ImageIcon,
  Share2,
  Tag,
  MoreHorizontal,
  Clock3,
  Users,
  Monitor,
  Download,
  Cloud,
  Home as HomeIcon,
  AppWindow,
  Folder,
  PanelLeft,
  SquarePen,
  FolderOpen,
  ChevronDown,
  ExternalLink,
  Mail,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

/* =========================================================
   TYPES
========================================================= */

type DockAppProps = {
  label: string;
  icon?: string;
  children?: ReactNode;
  badge?: string;
  open?: boolean;
  onClick?: () => void;
};

type FinderSection =
  | "Applications"
  | "Desktop"
  | "Documents"
  | "Downloads"
  | "Pictures";

type NoteId =
  | "about"
  | "experience"
  | "research"
  | "publications"
  | "contact";

type NoteItem = {
  id: NoteId;
  title: string;
  preview: string;
  date: string;
};

type ExperienceBlockProps = {
  company: string;
  arrangement: string;
  period: string;
  role: string;
  location: string;
  bullets: string[];
};

/* =========================================================
   APP LABELS
========================================================= */

const APP_LABELS: Record<AppId, string> = {
  finder: "Finder",
  notes: "Notes",
  claude: "Claude",
  messages: "Messages",
  photos: "Photos",
  preview: "Research Lens",
  music: "Music",
  terminal: "Terminal",
  settings: "System Settings",
};

/* =========================================================
   NOTES DATA
========================================================= */

const NOTES: NoteItem[] = [
  {
    id: "about",
    title: "About Me",
    preview:
      "AI Research Associate working across reinforcement learning, quantitative finance, machine learning and intelligent systems...",
    date: "Today",
  },

  {
    id: "experience",
    title: "Experience",
    preview:
      "Fractal Analytics, BITS Pilani, NYU Abu Dhabi, SVPIT and Université Hassan II...",
    date: "Today",
  },

  {
    id: "research",
    title: "Research",
    preview:
      "Reinforcement learning, exogenous uncertainty, quantitative finance, quantum machine learning and cognitive systems...",
    date: "Yesterday",
  },

  {
    id: "publications",
    title: "Publications",
    preview:
      "Scientific Reports, DAC, TMLR, Quantum Machine Intelligence, IEEE, Elsevier and arXiv...",
    date: "Aug 30",
  },

  {
    id: "contact",
    title: "Contact",
    preview:
      "Email, Google Scholar, GitHub and LinkedIn...",
    date: "Aug 26",
  },
];

/* =========================================================
   MAIN
========================================================= */

export default function Home() {
  const [
    time,
    setTime,
  ] = useState("");

  const [
    finderSection,
    setFinderSection,
  ] = useState<FinderSection>(
    "Applications"
  );

  const windows =
    useOSStore(
      (state) =>
        state.windows
    );

  const activeApp =
    useOSStore(
      (state) =>
        state.activeApp
    );

  const openApp =
    useOSStore(
      (state) =>
        state.openApp
    );

  const menuBarSeconds =
    useSettingsStore(
      (state) =>
        state.menuBarSeconds
    );

  useEffect(() => {
    const updateClock =
      () => {
        const now =
          new Date();

        setTime(
          now.toLocaleString(
            "en-US",
            {
              weekday:
                "short",

              month:
                "short",

              day:
                "numeric",

              hour:
                "numeric",

              minute:
                "2-digit",

              ...(menuBarSeconds
                ? {
                    second:
                      "2-digit" as const,
                  }
                : {}),

              hour12:
                true,
            }
          )
        );
      };

    updateClock();

    const timer =
      setInterval(
        updateClock,
        menuBarSeconds
          ? 1000
          : 30000
      );

    return () =>
      clearInterval(
        timer
      );
  }, [
    menuBarSeconds,
  ]);

  const activeAppName =
    activeApp
      ? APP_LABELS[
          activeApp
        ]
      : "Finder";

  return (
    <main className="desktop">

      {/* ===================================================
          GLOBAL SETTINGS EFFECTS
      =================================================== */}

      <SettingsEffects />

      {/* ===================================================
          MENU BAR
      =================================================== */}

      <header className="menu-bar">

        <div className="menu-left">

          <span className="apple-logo">
            
          </span>

          <span className="active-app">
            {activeAppName}
          </span>

          <span>
            File
          </span>

          <span>
            Edit
          </span>

          <span>
            View
          </span>

          <span>
            Go
          </span>

          <span>
            Window
          </span>

          <span>
            Help
          </span>

        </div>

        <div className="menu-right">

          <CircleDot
            size={13}
            strokeWidth={2.2}
          />

          <Wifi
            size={16}
            strokeWidth={2.2}
          />

          <BatteryMedium
            size={18}
            strokeWidth={2}
          />

          <Search
            size={15}
            strokeWidth={2.2}
          />

          <span className="control-center">

            <span />

            <span />

          </span>

          <span className="clock">
            {time}
          </span>

        </div>

      </header>

      {/* ===================================================
          DESKTOP FILE
      =================================================== */}

      <button
        className="desktop-file"
        onDoubleClick={() =>
          openApp(
            "notes"
          )
        }
      >

        <div className="file-icon">

          <FileText
            size={45}
            strokeWidth={1.45}
          />

          <span className="txt-label">
            TXT
          </span>

        </div>

        <span className="desktop-file-name">
          read-me.txt
        </span>

      </button>

      {/* ===================================================
          FINDER
      =================================================== */}

      <MacWindow
        appId="finder"
        title="Finder"
        minWidth={760}
        minHeight={470}
      >

        <FinderContent
          finderSection={
            finderSection
          }
          setFinderSection={
            setFinderSection
          }
        />

      </MacWindow>

      {/* ===================================================
          NOTES
      =================================================== */}

      <MacWindow
        appId="notes"
        title="Notes"
        minWidth={800}
        minHeight={520}
      >

        <NotesApp />

      </MacWindow>

      {/* ===================================================
          CLAUDE
      =================================================== */}

      <MacWindow
        appId="claude"
        title="Claude"
        minWidth={760}
        minHeight={520}
      >

        <ClaudeApp />

      </MacWindow>

      {/* ===================================================
          MESSAGES
      =================================================== */}

      <MacWindow
        appId="messages"
        title="Messages"
        minWidth={820}
        minHeight={540}
      >

        <MessagesApp />

      </MacWindow>

      {/* ===================================================
          PHOTOS
      =================================================== */}

      <MacWindow
        appId="photos"
        title="Photos"
        minWidth={760}
        minHeight={500}
      >

        <PhotosApp />

      </MacWindow>

      {/* ===================================================
          RESEARCH LENS
      =================================================== */}

      <MacWindow
        appId="preview"
        title="Research Lens"
        minWidth={820}
        minHeight={560}
      >

        <ResearchLens />

      </MacWindow>

      {/* ===================================================
          MUSIC
      =================================================== */}

      <MacWindow
        appId="music"
        title="Music"
        minWidth={900}
        minHeight={580}
      >

        <MusicApp />

      </MacWindow>

      {/* ===================================================
          TERMINAL
      =================================================== */}

      <MacWindow
        appId="terminal"
        title="Terminal"
        minWidth={650}
        minHeight={400}
      >

        <TerminalApp />

      </MacWindow>

      {/* ===================================================
          SETTINGS
      =================================================== */}

      <MacWindow
        appId="settings"
        title="System Settings"
        minWidth={820}
        minHeight={560}
      >

        <SettingsApp />

      </MacWindow>

      {/* ===================================================
          DOCK
      =================================================== */}

      <div className="dock-wrapper">

        <div className="dock">

          <DockApp
            label="Finder"
            icon="/icons/finder.png"
            open={
              windows.finder.open
            }
            onClick={() =>
              openApp(
                "finder"
              )
            }
          />

          <DockApp
            label="Notes"
            icon="/icons/notes.png"
            open={
              windows.notes.open
            }
            onClick={() =>
              openApp(
                "notes"
              )
            }
          />

          <DockApp
            label="Claude"
            icon="/icons/claude.png"
            open={
              windows.claude.open
            }
            onClick={() =>
              openApp(
                "claude"
              )
            }
          />

          <DockApp
            label="GitHub"
            onClick={() =>
              window.open(
                "https://github.com/Parampathak-28",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >

            <div className="brand-icon github-brand">
              <FaGithub />
            </div>

          </DockApp>

          <DockApp
            label="LinkedIn"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/param2812/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >

            <div className="brand-icon linkedin-brand">
              <FaLinkedinIn />
            </div>

          </DockApp>

          <DockApp
            label="Messages"
            icon="/icons/messages.png"
            open={
              windows.messages.open
            }
            onClick={() =>
              openApp(
                "messages"
              )
            }
          />

          <DockApp
            label="Photos"
            icon="/icons/photos.png"
            open={
              windows.photos.open
            }
            onClick={() =>
              openApp(
                "photos"
              )
            }
          />

          <DockApp
            label="Research Lens"
            icon="/icons/preview.png"
            open={
              windows.preview.open
            }
            onClick={() =>
              openApp(
                "preview"
              )
            }
          />

          <DockApp
            label="Music"
            icon="/icons/music.png"
            open={
              windows.music.open
            }
            onClick={() =>
              openApp(
                "music"
              )
            }
          />

          <DockApp
            label="Terminal"
            icon="/icons/terminal.png"
            open={
              windows.terminal.open
            }
            onClick={() =>
              openApp(
                "terminal"
              )
            }
          />

          <DockApp
            label="System Settings"
            icon="/icons/settings.png"
            open={
              windows.settings.open
            }
            onClick={() =>
              openApp(
                "settings"
              )
            }
          />

          <div className="dock-divider" />

          <DockApp label="Trash">

            <div className="trash-icon">
              🗑️
            </div>

          </DockApp>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   NOTES APP
========================================================= */

function NotesApp() {
  const [
    selectedNote,
    setSelectedNote,
  ] =
    useState<NoteId>(
      "about"
    );

  const [
    searchTerm,
    setSearchTerm,
  ] =
    useState("");

  const filteredNotes =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      if (
        !query
      ) {
        return NOTES;
      }

      return NOTES.filter(
        (
          note
        ) =>
          note.title
            .toLowerCase()
            .includes(
              query
            ) ||
          note.preview
            .toLowerCase()
            .includes(
              query
            )
      );
    }, [
      searchTerm,
    ]);

  return (
    <div className="notes-app">

      <div className="notes-toolbar">

        <div className="notes-toolbar-left">

          <button className="notes-toolbar-button">

            <PanelLeft
              size={18}
            />

          </button>

          <button className="notes-toolbar-button">

            <FolderOpen
              size={18}
            />

          </button>

        </div>

        <div className="notes-toolbar-center">
          Notes
        </div>

        <div className="notes-toolbar-right">

          <button className="notes-toolbar-button">

            <SquarePen
              size={18}
            />

          </button>

        </div>

      </div>

      <div className="notes-main">

        <aside className="notes-folder-sidebar">

          <div className="notes-account">

            <ChevronDown
              size={14}
            />

            <span>
              iCloud
            </span>

          </div>

          <button className="notes-folder-row notes-folder-row-active">

            <FolderOpen
              size={16}
            />

            <span>
              Notes
            </span>

            <span className="notes-folder-count">
              5
            </span>

          </button>

          <button className="notes-folder-row">

            <FolderOpen
              size={16}
            />

            <span>
              Research
            </span>

            <span className="notes-folder-count">
              2
            </span>

          </button>

          <button className="notes-folder-row">

            <FolderOpen
              size={16}
            />

            <span>
              Career
            </span>

            <span className="notes-folder-count">
              1
            </span>

          </button>

          <button className="notes-folder-row">

            <FolderOpen
              size={16}
            />

            <span>
              Archive
            </span>

          </button>

          <div className="notes-folder-spacer" />

          <div className="notes-sidebar-footer">
            5 Notes
          </div>

        </aside>

        <section className="notes-list-panel">

          <div className="notes-search-wrap">

            <Search
              size={15}
            />

            <input
              type="text"
              value={
                searchTerm
              }
              onChange={(
                event
              ) =>
                setSearchTerm(
                  event
                    .target
                    .value
                )
              }
              placeholder="Search"
              className="notes-search"
            />

          </div>

          <div className="notes-list-heading">
            Notes
          </div>

          <div className="notes-list">

            {filteredNotes.map(
              (
                note
              ) => (
                <button
                  key={
                    note.id
                  }
                  className={
                    `notes-list-item ${
                      selectedNote ===
                      note.id
                        ? "notes-list-item-active"
                        : ""
                    }`
                  }
                  onClick={() =>
                    setSelectedNote(
                      note.id
                    )
                  }
                >

                  <div className="notes-list-title">
                    {note.title}
                  </div>

                  <div className="notes-list-meta">
                    {note.date}
                  </div>

                  <div className="notes-list-preview">
                    {note.preview}
                  </div>

                </button>
              )
            )}

          </div>

        </section>

        <article className="notes-editor">

          <NoteContent
            noteId={
              selectedNote
            }
          />

        </article>

      </div>

    </div>
  );
}

/* =========================================================
   NOTES CONTENT
========================================================= */

function NoteContent({
  noteId,
}: {
  noteId: NoteId;
}) {
  if (
    noteId ===
    "about"
  ) {
    return (
      <NoteShell
        date="September 3, 2026 at 1:32 AM"
        title="About Me"
      >

        <p>
          I&apos;m Param Pathak, a Computer Engineering graduate currently working as an AI Research Associate at Fractal Analytics.
        </p>

        <p>
          My research interests span reinforcement learning, sequential decision making under uncertainty, quantitative finance, classical and quantum machine learning, and cognitive neuroscience.
        </p>

        <p>
          I am particularly interested in building mathematically grounded and interpretable intelligent systems that can make reliable decisions in uncertain environments.
        </p>

        <h3>
          Research themes
        </h3>

        <ul>

          <li>
            Reinforcement learning and sequential decision making
          </li>

          <li>
            Learning under exogenous and uncertain dynamics
          </li>

          <li>
            Machine learning for quantitative finance
          </li>

          <li>
            Classical and quantum machine learning
          </li>

          <li>
            Interpretable and reliable AI
          </li>

          <li>
            Cognitive architectures and biologically inspired computation
          </li>

        </ul>

      </NoteShell>
    );
  }

  if (
    noteId ===
    "experience"
  ) {
    return (
      <NoteShell
        date="September 3, 2026"
        title="Experience"
      >

        <ExperienceBlock
          company="Fractal Analytics"
          arrangement="Hybrid"
          period="06.2025 –"
          role="AI Research Associate"
          location="Mumbai, India"
          bullets={[
            "Developing ML architectures for Frequency Comb NNs in collaboration with BITS Pilani, Dubai Campus, with emphasis on model design, experimentation, evaluation, and reproducible analysis.",
            "Designing and evaluating RL algorithms for sequential decision making under uncertain and exogenous environments, combining theoretical guarantees with computational experimentation and performance analysis.",
          ]}
        />

        <ExperienceBlock
          company="Birla Institute of Technology and Science (BITS) Pilani"
          arrangement="Remote"
          period="03.2025 – 06.2025"
          role="Research Collaborator (Dept. of Electrical Engineering)"
          location="Dubai, UAE"
          bullets={[
            "Developed and evaluated a 60 parameter ML architecture for correlated decision making in Bayesian games, achieving up to 6x lower regret than the MCCFR baseline through systematic experimentation and quantitative benchmarking; under review at Scientific Reports.",
          ]}
        />

        <ExperienceBlock
          company="New York University Abu Dhabi"
          arrangement="Hybrid"
          period="08.2024 – 05.2025"
          role="Research Collaborator (eBRAIN Lab, and Center for Quantum and Topological Systems)"
          location="Abu Dhabi, UAE"
          bullets={[
            "Developed a regime adaptive ML framework for financial time series using KANs, sparse spline activations, and Gumbel Softmax regime detection, outperforming LSTM baselines with an R² of 0.89 and a Sharpe Ratio of 12.02.",
            "Built model evaluation and explainability workflows using Monte Carlo Shapley feature attribution and regime level analysis, achieving an 83% win rate and a -0.09% maximum drawdown; work published in Transactions on Machine Learning Research.",
            "Co-authored the book chapter “Quantum-Enhanced Decision-Making in ACT-R,” published by Elsevier.",
          ]}
        />

        <ExperienceBlock
          company="Fractal Analytics"
          arrangement="Hybrid"
          period="09.2024 – 03.2025"
          role="Research Intern (Quantum-AI Group)"
          location="Mumbai, India"
          bullets={[
            "Developed three generative AI architectures combining classical NNs with parameterized quantum models, improving molecular generation quality by 40% based on Fréchet distance through Wasserstein training and gradient penalty.",
            "Designed and executed a model benchmarking pipeline covering 16 generative model variants and 134K QM9 molecules across nine evaluation metrics, achieving NP of 0.792, QED of 0.486, and 44% novelty.",
            "Co-authored “Quantum-Classical Generative Models for Drug Design,” published in Springer Nature’s Quantum Machine Intelligence.",
          ]}
        />

        <ExperienceBlock
          company="Sardar Vallabhbhai Patel Institute of Technology"
          arrangement="On-Site"
          period="09.2024 – 12.2024"
          role="Undergraduate Research Assistant"
          location="Anand, India"
          bullets={[
            "Developed and evaluated DRiVE, a SNN for vehicle detection, achieving 94.8% accuracy and 0.99 AUC while outperforming existing SNN benchmarks using snnTorch, Leaky Integrate and Fire neurons, and surrogate gradient learning; published at IEEE ASSIC 2025.",
          ]}
        />

        <ExperienceBlock
          company="Université Hassan II de Casablanca"
          arrangement="Remote"
          period="09.2023 – 12.2023"
          role="Project Intern"
          location="Casablanca, Morocco"
          bullets={[
            "Developed and benchmarked a Variational Quantum Regressor for 5G network resource allocation, achieving an MSE of 0.008 and outperforming classical models by 83%; presented at IEEE QCNC 2024, Kanazawa, Japan.",
          ]}
        />

      </NoteShell>
    );
  }

  if (
    noteId ===
    "research"
  ) {
    return (
      <NoteShell
        date="September 2, 2026"
        title="Research"
      >

        <h3>
          Reinforcement Learning
        </h3>

        <p>
          My current interests include sequential decision making, reinforcement learning under uncertainty, theoretically grounded learning algorithms and reliable policy evaluation.
        </p>

        <h3>
          Learning under Exogenous Uncertainty
        </h3>

        <p>
          I am interested in reinforcement learning for environments whose dynamics are partly driven by external factors, with emphasis on approximate exogeneity, robustness to bounded model deviations, regret guarantees and scalable learning with function approximation.
        </p>

        <h3>
          Quantitative Finance
        </h3>

        <p>
          I have worked on machine learning models for financial time series, regime detection and interpretable stock forecasting. KASPER combines regime detection with sparse spline based Kolmogorov Arnold Networks and achieved an R² of 0.89 with a Sharpe Ratio of 12.02 in our reported experiments.
        </p>

        <h3>
          Quantum Machine Learning
        </h3>

        <p>
          My quantum machine learning work spans multi agent decision making, generative models, quantum reservoir computing and resource allocation.
        </p>

        <h3>
          Cognitive Systems
        </h3>

        <p>
          I am interested in computational models inspired by human learning, memory, attention and decision making, including the interaction between cognitive architectures and optimization methods.
        </p>

      </NoteShell>
    );
  }

  if (
    noteId ===
    "publications"
  ) {
    return (
      <NoteShell
        date="August 30, 2026"
        title="Selected Publications"
      >

        <PublicationItem
          title="Quantum Reservoir Computing for Short Term Power Load Forecasting in Resource Constrained Energy Systems"
          venue="IEEE Transactions on Quantum Engineering"
          year="2026"
          status="Under Review"
          href="https://arxiv.org/abs/2606.12806"
        />

        <PublicationItem
          title="Game, Set, Quantum: Parameterized Quantum Circuit for Correlated Equilibrium in Bayesian Games"
          venue="Scientific Reports, Nature Portfolio"
          year="2026"
          status="Under Review"
          href="https://arxiv.org/abs/2606.03109"
        />

        <PublicationItem
          title="Late Breaking Results: Hardware-Efficient Quantum Reservoir Computing via Quantized Readout"
          venue="Design Automation Conference"
          year="2026"
          status="DAC 2026"
          href="https://arxiv.org/abs/2604.06075"
        />

        <PublicationItem
          title="Quantum-Classical Generative Models for Drug Design"
          venue="Quantum Machine Intelligence, Springer Nature"
          year="2026"
          href="https://link.springer.com/article/10.1007/s42484-026-00356-x"
        />

        <PublicationItem
          title="KASPER: Kolmogorov Arnold Networks for Stock Predictions & Explainable Regimes"
          venue="Transactions on Machine Learning Research"
          year="2026"
          href="https://openreview.net/pdf/1b7e99c595c4d18a25b1a71699d709e45357ae1d.pdf"
        />

        <PublicationItem
          title="Quantum-Enhanced Decision-Making in ACT-R"
          venue="Elsevier Book – Quantum Computational AI Algorithms, Systems and Applications"
          year="2024"
          href="https://www.sciencedirect.com/science/article/pii/B9780443302596000219"
        />

        <PublicationItem
          title="DRiVE: Dynamic Recognition in VEhicles using snnTorch"
          venue="IEEE ASSIC"
          year="2025"
          href="https://arxiv.org/abs/2502.10421"
        />

        <PublicationItem
          title="The Evolution of IBM's Quantum Information Software Kit: A Review of its Applications"
          venue="arXiv"
          year="2025"
          href="https://arxiv.org/abs/2508.12245"
        />

        <PublicationItem
          title="Resource Allocation Optimization in 5G Networks using Variational Quantum Regressor"
          venue="IEEE QCNC"
          year="2024"
          href="https://ieeexplore.ieee.org/document/10628250"
        />

      </NoteShell>
    );
  }

  return (
    <NoteShell
      date="August 26, 2026"
      title="Contact"
    >

      <p>
        I&apos;m always interested in thoughtful conversations around reinforcement learning, quantitative finance, machine learning and research collaborations.
      </p>

      <div className="contact-links">

        <a href="mailto:parampathak28@gmail.com">

          <Mail
            size={18}
          />

          parampathak28@gmail.com

        </a>

        <a
          href="https://github.com/Parampathak-28"
          target="_blank"
          rel="noreferrer"
        >

          <FaGithub />

          GitHub

          <ExternalLink
            size={14}
          />

        </a>

        <a
          href="https://www.linkedin.com/in/param2812/"
          target="_blank"
          rel="noreferrer"
        >

          <FaLinkedinIn />

          LinkedIn

          <ExternalLink
            size={14}
          />

        </a>

        <a
          href="https://scholar.google.com/citations?user=oBHMJhUAAAAJ&hl=en&authuser=1"
          target="_blank"
          rel="noreferrer"
        >

          <FileText
            size={18}
          />

          Google Scholar

          <ExternalLink
            size={14}
          />

        </a>

      </div>

    </NoteShell>
  );
}

/* =========================================================
   NOTE SHELL
========================================================= */

function NoteShell({
  date,
  title,
  children,
}: {
  date: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="note-document">

      <div className="note-date">
        {date}
      </div>

      <h1>
        {title}
      </h1>

      <div className="note-document-body">
        {children}
      </div>

    </div>
  );
}

/* =========================================================
   EXPERIENCE BLOCK
========================================================= */

function ExperienceBlock({
  company,
  arrangement,
  period,
  role,
  location,
  bullets,
}: ExperienceBlockProps) {
  return (
    <section className="experience-block">

      <div className="experience-company-row">

        <h3>
          {company}
        </h3>

        <span className="experience-period">
          {period}
        </span>

      </div>

      <div className="experience-role-row">

        <div className="experience-role">
          {role}
        </div>

        <div className="experience-location">
          {location}
        </div>

      </div>

      <div className="experience-arrangement">
        {arrangement}
      </div>

      <ul className="experience-bullets">

        {bullets.map(
          (
            bullet,
            index
          ) => (
            <li key={index}>
              {bullet}
            </li>
          )
        )}

      </ul>

    </section>
  );
}

/* =========================================================
   PUBLICATIONS
========================================================= */

function PublicationItem({
  title,
  venue,
  year,
  status,
  href,
}: {
  title: string;
  venue: string;
  year: string;
  status?: string;
  href?: string;
}) {
  return (
    <a
      className="publication-item"
      href={href}
      target="_blank"
      rel="noreferrer"
    >

      <div className="publication-title">
        {title}
      </div>

      <div className="publication-meta">

        {venue}
        {" · "}
        {year}

        {status
          ? ` · ${status}`
          : ""}

      </div>

      <ExternalLink
        className="publication-link-icon"
        size={15}
      />

    </a>
  );
}

/* =========================================================
   FINDER
========================================================= */

function FinderContent({
  finderSection,
  setFinderSection,
}: {
  finderSection: FinderSection;

  setFinderSection:
    Dispatch<
      SetStateAction<FinderSection>
    >;
}) {
  return (
    <div className="finder-shell">

      <div className="finder-app-toolbar">

        <div className="finder-nav-buttons">

          <button>

            <ChevronLeft
              size={20}
            />

          </button>

          <button>

            <ChevronRight
              size={20}
            />

          </button>

        </div>

        <h1 className="finder-title">
          {finderSection}
        </h1>

        <div className="finder-toolbar-actions">

          <button className="finder-toolbar-active">

            <Grid3X3
              size={18}
            />

          </button>

          <button>

            <List
              size={18}
            />

          </button>

          <button>

            <Columns3
              size={18}
            />

          </button>

          <button>

            <ImageIcon
              size={18}
            />

          </button>

          <span className="finder-toolbar-separator" />

          <button>

            <Share2
              size={18}
            />

          </button>

          <button>

            <Tag
              size={18}
            />

          </button>

          <button>

            <MoreHorizontal
              size={19}
            />

          </button>

          <button>

            <Search
              size={18}
            />

          </button>

        </div>

      </div>

      <div className="finder-body">

        <aside className="finder-sidebar">

          <FinderSidebarItem
            icon={
              <Clock3
                size={18}
              />
            }
            label="Recents"
          />

          <FinderSidebarItem
            icon={
              <Users
                size={18}
              />
            }
            label="Shared"
          />

          <FinderSidebarHeading>
            FAVOURITES
          </FinderSidebarHeading>

          <FinderSidebarItem
            icon={
              <AppWindow
                size={18}
              />
            }
            label="Applications"
            active={
              finderSection ===
              "Applications"
            }
            onClick={() =>
              setFinderSection(
                "Applications"
              )
            }
          />

          <FinderSidebarItem
            icon={
              <Monitor
                size={18}
              />
            }
            label="Desktop"
            active={
              finderSection ===
              "Desktop"
            }
            onClick={() =>
              setFinderSection(
                "Desktop"
              )
            }
          />

          <FinderSidebarItem
            icon={
              <FileText
                size={18}
              />
            }
            label="Documents"
            active={
              finderSection ===
              "Documents"
            }
            onClick={() =>
              setFinderSection(
                "Documents"
              )
            }
          />

          <FinderSidebarItem
            icon={
              <Download
                size={18}
              />
            }
            label="Downloads"
            active={
              finderSection ===
              "Downloads"
            }
            onClick={() =>
              setFinderSection(
                "Downloads"
              )
            }
          />

          <FinderSidebarItem
            icon={
              <ImageIcon
                size={18}
              />
            }
            label="Pictures"
            active={
              finderSection ===
              "Pictures"
            }
            onClick={() =>
              setFinderSection(
                "Pictures"
              )
            }
          />

          <FinderSidebarHeading>
            TAGS
          </FinderSidebarHeading>

          <FinderTag
            color="#0a84ff"
            label="Research"
          />

          <FinderTag
            color="#ff453a"
            label="Important"
          />

          <FinderTag
            color="#ff9f0a"
            label="Ideas"
          />

          <FinderSidebarHeading>
            LOCATIONS
          </FinderSidebarHeading>

          <FinderSidebarItem
            icon={
              <Cloud
                size={18}
              />
            }
            label="iCloud Drive"
          />

          <FinderSidebarItem
            icon={
              <HomeIcon
                size={18}
              />
            }
            label="parampathak"
          />

        </aside>

        <section className="finder-content">

          {finderSection ===
            "Applications" && (
            <ApplicationsGrid />
          )}

          {finderSection ===
            "Desktop" && (
            <DesktopFolder />
          )}

          {finderSection ===
            "Documents" && (
            <DocumentsFolder />
          )}

          {finderSection ===
            "Downloads" && (
            <EmptyFolder
              title="Downloads"
              text="No downloaded files yet."
            />
          )}

          {finderSection ===
            "Pictures" && (
            <PicturesFolder />
          )}

        </section>

      </div>

      <div className="finder-statusbar">

        {finderSection ===
          "Applications"
          ? "10 items"
          : finderSection ===
              "Desktop"
            ? "1 item"
            : finderSection ===
                "Documents"
              ? "4 items"
              : finderSection ===
                  "Pictures"
                ? "3 items"
                : "0 items"}

      </div>

    </div>
  );
}

/* =========================================================
   FINDER APPLICATIONS
========================================================= */

function ApplicationsGrid() {
  const openApp =
    useOSStore(
      (state) =>
        state.openApp
    );

  return (
    <div className="finder-app-grid">

      <FinderApplication
        name="Notes"
        icon="/icons/notes.png"
        onClick={() =>
          openApp(
            "notes"
          )
        }
      />

      <FinderApplication
        name="Claude"
        icon="/icons/claude.png"
        onClick={() =>
          openApp(
            "claude"
          )
        }
      />

      <FinderBrandApplication
        name="GitHub"
        type="github"
        onClick={() =>
          window.open(
            "https://github.com/Parampathak-28",
            "_blank",
            "noopener,noreferrer"
          )
        }
      />

      <FinderBrandApplication
        name="LinkedIn"
        type="linkedin"
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/param2812/",
            "_blank",
            "noopener,noreferrer"
          )
        }
      />

      <FinderApplication
        name="Messages"
        icon="/icons/messages.png"
        onClick={() =>
          openApp(
            "messages"
          )
        }
      />

      <FinderApplication
        name="Photos"
        icon="/icons/photos.png"
        onClick={() =>
          openApp(
            "photos"
          )
        }
      />

      <FinderApplication
        name="Research Lens"
        icon="/icons/preview.png"
        onClick={() =>
          openApp(
            "preview"
          )
        }
      />

      <FinderApplication
        name="Music"
        icon="/icons/music.png"
        onClick={() =>
          openApp(
            "music"
          )
        }
      />

      <FinderApplication
        name="Terminal"
        icon="/icons/terminal.png"
        onClick={() =>
          openApp(
            "terminal"
          )
        }
      />

      <FinderApplication
        name="System Settings"
        icon="/icons/settings.png"
        onClick={() =>
          openApp(
            "settings"
          )
        }
      />

    </div>
  );
}

function FinderApplication({
  name,
  icon,
  onClick,
}: {
  name: string;
  icon: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="finder-application"
      onDoubleClick={
        onClick
      }
    >

      <img
        src={icon}
        alt={name}
        draggable={false}
      />

      <span>
        {name}
      </span>

    </button>
  );
}

function FinderBrandApplication({
  name,
  type,
  onClick,
}: {
  name: string;
  type:
    | "github"
    | "linkedin";
  onClick?: () => void;
}) {
  return (
    <button
      className="finder-application"
      onDoubleClick={
        onClick
      }
    >

      <div
        className={
          `finder-brand-app ${
            type ===
            "github"
              ? "finder-github"
              : "finder-linkedin"
          }`
        }
      >

        {type ===
        "github"
          ? (
            <FaGithub />
          )
          : (
            <FaLinkedinIn />
          )}

      </div>

      <span>
        {name}
      </span>

    </button>
  );
}

/* =========================================================
   FINDER FOLDERS
========================================================= */

function DesktopFolder() {
  return (
    <div className="finder-folder-grid">

      <button className="finder-file-item">

        <div className="finder-document-icon">

          <FileText
            size={45}
          />

          <span>
            TXT
          </span>

        </div>

        <p>
          read-me.txt
        </p>

      </button>

    </div>
  );
}

function DocumentsFolder() {
  return (
    <div className="finder-folder-grid">

      <FinderFolder
        name="Research"
      />

      <FinderFolder
        name="Publications"
      />

      <FinderFolder
        name="Projects"
      />

      <FinderFolder
        name="CV"
      />

    </div>
  );
}

function PicturesFolder() {
  return (
    <div className="finder-folder-grid">

      <FinderFolder
        name="Research Photos"
      />

      <FinderFolder
        name="Conferences"
      />

      <FinderFolder
        name="Personal"
      />

    </div>
  );
}

function FinderFolder({
  name,
}: {
  name: string;
}) {
  return (
    <button className="finder-folder-item">

      <Folder
        size={72}
        fill="#4fb4ed"
        color="#4fb4ed"
      />

      <p>
        {name}
      </p>

    </button>
  );
}

function EmptyFolder({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="finder-empty">

      <Folder
        size={64}
        strokeWidth={1.3}
      />

      <h2>
        {title}
      </h2>

      <p>
        {text}
      </p>

    </div>
  );
}

/* =========================================================
   FINDER SIDEBAR
========================================================= */

function FinderSidebarHeading({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="finder-sidebar-heading">
      {children}
    </div>
  );
}

function FinderSidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={
        `finder-sidebar-item ${
          active
            ? "finder-sidebar-item-active"
            : ""
        }`
      }
      onClick={
        onClick
      }
    >

      <span className="finder-sidebar-icon">
        {icon}
      </span>

      <span>
        {label}
      </span>

    </button>
  );
}

function FinderTag({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <button className="finder-sidebar-item">

      <span
        className="finder-tag-dot"
        style={{
          backgroundColor:
            color,
        }}
      />

      <span>
        {label}
      </span>

    </button>
  );
}

/* =========================================================
   DOCK
========================================================= */

function DockApp({
  label,
  icon,
  children,
  badge,
  open = false,
  onClick,
}: DockAppProps) {
  return (
    <button
      className="dock-item"
      aria-label={
        label
      }
      onClick={
        onClick
      }
    >

      <span className="dock-tooltip">
        {label}
      </span>

      {badge && (
        <span className="notification-badge">
          {badge}
        </span>
      )}

      <div className="dock-icon-wrap">

        {icon ? (
          <img
            src={icon}
            alt={label}
            className="dock-app-image"
            draggable={false}
          />
        ) : (
          children
        )}

      </div>

      {open && (
        <span className="open-dot" />
      )}

    </button>
  );
}