"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  FormEvent,
  KeyboardEvent,
} from "react";

import {
  useOSStore,
} from "@/store/useOSStore";

import type {
  AppId,
} from "@/store/useOSStore";

import styles from "./TerminalApp.module.css";

/* =========================================================
   TYPES
========================================================= */

type Entry =
  | {
      id: number;
      type: "command";
      prompt: string;
      command: string;
    }
  | {
      id: number;
      type: "output";
      lines: string[];
    };

type VirtualFile = {
  type: "file";
  content: string[];
};

type VirtualDirectory = {
  type: "directory";
  children: Record<
    string,
    VirtualNode
  >;
};

type VirtualNode =
  | VirtualFile
  | VirtualDirectory;

/* =========================================================
   VIRTUAL FILE SYSTEM
========================================================= */

const FILE_SYSTEM: VirtualDirectory = {
  type: "directory",

  children: {
    "about.txt": {
      type: "file",

      content: [
        "Param Pathak",
        "",
        "AI Research Associate at Fractal Analytics.",
        "",
        "Computer Engineering graduate working across",
        "reinforcement learning, quantitative finance,",
        "classical and quantum machine learning, and",
        "cognitive systems.",
        "",
        "Current research interests include sequential",
        "decision-making under uncertainty, exogenous",
        "dynamics, robust learning, and interpretable AI.",
      ],
    },

    "research.txt": {
      type: "file",

      content: [
        "Research Interests",
        "------------------",
        "",
        "• Reinforcement Learning",
        "• Sequential Decision Making",
        "• Learning under Exogenous Uncertainty",
        "• Quantitative Finance",
        "• Quantum Machine Learning",
        "• Cognitive Systems",
        "• Interpretable and Reliable AI",
        "",
        "Try:",
        "  cd research",
        "  ls",
      ],
    },

    "contact.txt": {
      type: "file",

      content: [
        "Contact",
        "-------",
        "",
        "Email:    parampathak28@gmail.com",
        "GitHub:   github.com/Parampathak-28",
        "LinkedIn: linkedin.com/in/param2812/",
        "",
        "Try:",
        "  open github",
        "  open linkedin",
      ],
    },

    "README.txt": {
      type: "file",

      content: [
        "Welcome to ParamOS.",
        "",
        "This terminal is a small virtual shell built",
        "inside my portfolio.",
        "",
        "Type 'help' to see available commands.",
        "",
        "Tip:",
        "  cat about.txt",
        "  cd research",
        "  neofetch",
      ],
    },

    research: {
      type: "directory",

      children: {
        "reinforcement-learning.txt": {
          type: "file",

          content: [
            "Reinforcement Learning",
            "----------------------",
            "",
            "I am interested in sequential decision-making",
            "under uncertainty, theoretically grounded",
            "learning algorithms, policy evaluation, and",
            "robustness when assumptions are only approximately",
            "satisfied.",
          ],
        },

        "exogenous-uncertainty.txt": {
          type: "file",

          content: [
            "Learning under Exogenous Uncertainty",
            "------------------------------------",
            "",
            "My current interests include environments whose",
            "dynamics are partly driven by external processes,",
            "with emphasis on approximate exogeneity, bounded",
            "model deviations, regret guarantees, and scalable",
            "function approximation.",
          ],
        },

        "quant-finance.txt": {
          type: "file",

          content: [
            "Quantitative Finance",
            "--------------------",
            "",
            "My work includes regime-aware financial time-series",
            "modelling, interpretable prediction, and research",
            "on sequential decision-making for financial systems.",
            "",
            "Related work:",
            "  KASPER",
          ],
        },

        "quantum-ml.txt": {
          type: "file",

          content: [
            "Quantum Machine Learning",
            "------------------------",
            "",
            "My work spans quantum reservoir computing,",
            "variational quantum regression, quantum-classical",
            "generative models, and quantum approaches to",
            "multi-agent decision-making.",
          ],
        },

        "cognitive-systems.txt": {
          type: "file",

          content: [
            "Cognitive Systems",
            "-----------------",
            "",
            "I am interested in computational models of",
            "decision-making, learning, memory, and cognition,",
            "including cognitive architectures such as ACT-R.",
          ],
        },
      },
    },

    publications: {
      type: "directory",

      children: {
        "qrc-energy.txt": {
          type: "file",

          content: [
            "Quantum Reservoir Computing for Short-Term",
            "Power Load Forecasting in Resource-Constrained",
            "Energy Systems",
            "",
            "2026 · Under Review",
            "",
            "Use 'open research' for the full Research Lens.",
          ],
        },

        "game-set-quantum.txt": {
          type: "file",

          content: [
            "Game, Set, Quantum",
            "",
            "Parameterized quantum learning for correlated",
            "decision-making in Bayesian games.",
            "",
            "2026 · Under Review",
          ],
        },

        "kasper.txt": {
          type: "file",

          content: [
            "KASPER",
            "",
            "Kolmogorov-Arnold Networks for Stock Predictions",
            "& Explainable Regimes.",
            "",
            "Transactions on Machine Learning Research · 2026",
          ],
        },

        "drug-design.txt": {
          type: "file",

          content: [
            "Quantum-Classical Generative Models for Drug Design",
            "",
            "Quantum Machine Intelligence · Springer Nature",
            "2026",
          ],
        },

        "drive.txt": {
          type: "file",

          content: [
            "DRiVE",
            "",
            "Dynamic Recognition in VEhicles using snnTorch.",
            "",
            "IEEE ASSIC · 2025",
          ],
        },

        "actr.txt": {
          type: "file",

          content: [
            "Quantum-Enhanced Decision-Making in ACT-R",
            "",
            "Elsevier book chapter.",
            "",
            "Quantum optimization + cognitive architectures.",
          ],
        },

        "qiskit-review.txt": {
          type: "file",

          content: [
            "The Evolution of IBM's Quantum Information",
            "Software Kit: A Review of its Applications",
            "",
            "Quantum software evolution and reproducibility.",
          ],
        },

        "5g-vqr.txt": {
          type: "file",

          content: [
            "Resource Allocation Optimization in 5G Networks",
            "using Variational Quantum Regressor",
            "",
            "IEEE QCNC · 2024",
          ],
        },
      },
    },

    projects: {
      type: "directory",

      children: {
        "portfolio-os.txt": {
          type: "file",

          content: [
            "ParamOS",
            "-------",
            "",
            "An interactive macOS-inspired portfolio built",
            "with Next.js, TypeScript, React and Zustand.",
            "",
            "Apps communicate through a shared virtual",
            "desktop and window-management layer.",
          ],
        },

        "research-lens.txt": {
          type: "file",

          content: [
            "Research Lens",
            "-------------",
            "",
            "A paper viewer that turns publications into",
            "research artifacts: problem, idea, evidence,",
            "limitations, and future directions.",
            "",
            "Try:",
            "  open research",
          ],
        },
      },
    },
  },
};

/* =========================================================
   HELP
========================================================= */

const HELP_LINES = [
  "available commands:",
  "",
  "  help                 show this help",
  "  clear                clear the terminal",
  "  pwd                  print working directory",
  "  cd <dir>             change directory",
  "  ls [dir]             list directory contents",
  "  cat <file>           print a file",
  "  open <target>        open an app or link",
  "  echo <text>          print text",
  "  whoami               print current user",
  "  hostname             print machine hostname",
  "  date                 current date and time",
  "  uptime               how long ParamOS has been running",
  "  history              command history",
  "  neofetch             system information",
  "",
  "portfolio shortcuts:",
  "",
  "  open research        open Research Lens",
  "  open notes           open Notes",
  "  open photos          open Photos",
  "  open music           open Music",
  "  open messages        open Messages",
  "  open claude          open Claude",
  "  open github          open GitHub",
  "  open linkedin        open LinkedIn",
  "",
  "tip: there's an about.txt in ~ . cat it.",
];

/* =========================================================
   HELPERS
========================================================= */

function pathToDisplay(
  path: string[]
) {
  if (
    path.length === 0
  ) {
    return "~";
  }

  return `~/${path.join(
    "/"
  )}`;
}

function pathToAbsolute(
  path: string[]
) {
  if (
    path.length === 0
  ) {
    return "/Users/param";
  }

  return `/Users/param/${path.join(
    "/"
  )}`;
}

function getNodeAtPath(
  path: string[]
): VirtualNode | null {
  let current: VirtualNode =
    FILE_SYSTEM;

  for (
    const part of path
  ) {
    if (
      current.type !==
      "directory"
    ) {
      return null;
    }

    const nextNode:
      | VirtualNode
      | undefined =
      current.children[
        part
      ];

    if (
      !nextNode
    ) {
      return null;
    }

    current =
      nextNode;
  }

  return current;
}

function resolvePath(
  currentPath: string[],
  rawPath: string
) {
  const input =
    rawPath.trim();

  if (
    input === "" ||
    input === "~"
  ) {
    return [];
  }

  const parts =
    input.split(
      "/"
    );

  const result =
    input.startsWith("/")
      ? []
      : [
          ...currentPath,
        ];

  for (
    const part of parts
  ) {
    if (
      part === "" ||
      part === "."
    ) {
      continue;
    }

    if (
      part === "~"
    ) {
      result.length =
        0;

      continue;
    }

    if (
      part === ".."
    ) {
      result.pop();

      continue;
    }

    result.push(
      part
    );
  }

  return result;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function TerminalApp() {
  const openApp =
    useOSStore(
      (state) =>
        state.openApp
    );

  const startupTimeRef =
    useRef(
      Date.now()
    );

  const nextIdRef =
    useRef(10);

  const inputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const scrollRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const [
    currentPath,
    setCurrentPath,
  ] =
    useState<string[]>(
      []
    );

  const [
    input,
    setInput,
  ] =
    useState("");

  const [
    commandHistory,
    setCommandHistory,
  ] =
    useState<string[]>(
      []
    );

  const [
    historyIndex,
    setHistoryIndex,
  ] =
    useState<
      number | null
    >(
      null
    );

  const [
    entries,
    setEntries,
  ] =
    useState<Entry[]>([
      {
        id: 1,
        type: "output",
        lines: [
          "Last login: Thu Sep 3 on ttys001",
          "",
          "Type 'help' for available commands",
        ],
      },
    ]);

  const prompt =
    useMemo(
      () =>
        `param@Params-MacBook-Pro ${pathToDisplay(
          currentPath
        )} %`,
      [
        currentPath,
      ]
    );

  /* =======================================================
     AUTO FOCUS
  ======================================================= */

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* =======================================================
     AUTO SCROLL
  ======================================================= */

  useEffect(() => {
    const element =
      scrollRef.current;

    if (
      !element
    ) {
      return;
    }

    element.scrollTop =
      element.scrollHeight;
  }, [
    entries,
  ]);

  /* =======================================================
     OUTPUT
  ======================================================= */

  const appendOutput =
    (
      lines: string[]
    ) => {
      setEntries(
        (
          current
        ) => [
          ...current,
          {
            id:
              nextIdRef.current++,
            type:
              "output",
            lines,
          },
        ]
      );
    };

  /* =======================================================
     OPEN TARGET
  ======================================================= */

  const openTarget =
    (
      targetRaw: string
    ) => {
      const target =
        targetRaw
          .trim()
          .toLowerCase();

      const appMap: Record<
        string,
        AppId
      > = {
        finder:
          "finder",

        notes:
          "notes",

        claude:
          "claude",

        messages:
          "messages",

        photos:
          "photos",

        music:
          "music",

        terminal:
          "terminal",

        settings:
          "settings",

        research:
          "preview",

        publications:
          "preview",

        papers:
          "preview",

        "research-lens":
          "preview",

        preview:
          "preview",
      };

      const app =
        appMap[
          target
        ];

      if (
        app
      ) {
        openApp(
          app
        );

        return [
          `Opening ${target}...`,
        ];
      }

      if (
        target ===
        "github"
      ) {
        window.open(
          "https://github.com/Parampathak-28",
          "_blank",
          "noopener,noreferrer"
        );

        return [
          "Opening GitHub...",
        ];
      }

      if (
        target ===
        "linkedin"
      ) {
        window.open(
          "https://www.linkedin.com/in/param2812/",
          "_blank",
          "noopener,noreferrer"
        );

        return [
          "Opening LinkedIn...",
        ];
      }

      if (
        target ===
          "scholar" ||
        target ===
          "google-scholar"
      ) {
        window.open(
          "https://scholar.google.com/citations?user=oBHMJhUAAAAJ&hl=en&authuser=1",
          "_blank",
          "noopener,noreferrer"
        );

        return [
          "Opening Google Scholar...",
        ];
      }

      return [
        `open: ${targetRaw}: no such app or target`,
      ];
    };

  /* =======================================================
     COMMAND ENGINE
  ======================================================= */

  const executeCommand =
    (
      rawCommand: string
    ) => {
      const trimmed =
        rawCommand.trim();

      if (
        !trimmed
      ) {
        return;
      }

      const [
        commandRaw,
        ...args
      ] =
        trimmed.split(
          /\s+/
        );

      const command =
        commandRaw.toLowerCase();

      const argument =
        args.join(
          " "
        );

      /* -------------------------
         CLEAR
      ------------------------- */

      if (
        command ===
        "clear"
      ) {
        setEntries(
          []
        );

        return;
      }

      /* -------------------------
         HELP
      ------------------------- */

      if (
        command ===
        "help"
      ) {
        appendOutput(
          HELP_LINES
        );

        return;
      }

      /* -------------------------
         PWD
      ------------------------- */

      if (
        command ===
        "pwd"
      ) {
        appendOutput([
          pathToAbsolute(
            currentPath
          ),
        ]);

        return;
      }

      /* -------------------------
         LS
      ------------------------- */

      if (
        command ===
        "ls"
      ) {
        const targetPath =
          argument
            ? resolvePath(
                currentPath,
                argument
              )
            : currentPath;

        const node =
          getNodeAtPath(
            targetPath
          );

        if (
          !node
        ) {
          appendOutput([
            `ls: ${argument}: No such file or directory`,
          ]);

          return;
        }

        if (
          node.type ===
          "file"
        ) {
          appendOutput([
            targetPath[
              targetPath.length -
                1
            ] ??
              "",
          ]);

          return;
        }

        const names =
          Object.keys(
            node.children
          );

        if (
          names.length ===
          0
        ) {
          appendOutput([
            "",
          ]);

          return;
        }

        appendOutput(
          names.map(
            (
              name
            ) =>
              node.children[
                name
              ].type ===
              "directory"
                ? `${name}/`
                : name
          )
        );

        return;
      }

      /* -------------------------
         CD
      ------------------------- */

      if (
        command ===
        "cd"
      ) {
        const targetPath =
          resolvePath(
            currentPath,
            argument ||
              "~"
          );

        const node =
          getNodeAtPath(
            targetPath
          );

        if (
          !node
        ) {
          appendOutput([
            `cd: no such file or directory: ${
              argument ||
              "~"
            }`,
          ]);

          return;
        }

        if (
          node.type !==
          "directory"
        ) {
          appendOutput([
            `cd: not a directory: ${argument}`,
          ]);

          return;
        }

        setCurrentPath(
          targetPath
        );

        return;
      }

      /* -------------------------
         CAT
      ------------------------- */

      if (
        command ===
        "cat"
      ) {
        if (
          !argument
        ) {
          appendOutput([
            "cat: missing file operand",
          ]);

          return;
        }

        const targetPath =
          resolvePath(
            currentPath,
            argument
          );

        const node =
          getNodeAtPath(
            targetPath
          );

        if (
          !node
        ) {
          appendOutput([
            `cat: ${argument}: No such file or directory`,
          ]);

          return;
        }

        if (
          node.type !==
          "file"
        ) {
          appendOutput([
            `cat: ${argument}: Is a directory`,
          ]);

          return;
        }

        appendOutput(
          node.content
        );

        return;
      }

      /* -------------------------
         OPEN
      ------------------------- */

      if (
        command ===
        "open"
      ) {
        if (
          !argument
        ) {
          appendOutput([
            "open: missing target",
          ]);

          return;
        }

        appendOutput(
          openTarget(
            argument
          )
        );

        return;
      }

      /* -------------------------
         ECHO
      ------------------------- */

      if (
        command ===
        "echo"
      ) {
        appendOutput([
          argument,
        ]);

        return;
      }

      /* -------------------------
         WHOAMI
      ------------------------- */

      if (
        command ===
        "whoami"
      ) {
        appendOutput([
          "param",
        ]);

        return;
      }

      /* -------------------------
         HOSTNAME
      ------------------------- */

      if (
        command ===
        "hostname"
      ) {
        appendOutput([
          "Params-MacBook-Pro",
        ]);

        return;
      }

      /* -------------------------
         DATE
      ------------------------- */

      if (
        command ===
        "date"
      ) {
        appendOutput([
          new Date().toString(),
        ]);

        return;
      }

      /* -------------------------
         UPTIME
      ------------------------- */

      if (
        command ===
        "uptime"
      ) {
        const elapsed =
          Math.floor(
            (
              Date.now() -
              startupTimeRef.current
            ) /
              1000
          );

        const hours =
          Math.floor(
            elapsed /
              3600
          );

        const minutes =
          Math.floor(
            (
              elapsed %
              3600
            ) /
              60
          );

        const seconds =
          elapsed %
          60;

        appendOutput([
          `up ${hours}h ${minutes}m ${seconds}s`,
        ]);

        return;
      }

      /* -------------------------
         HISTORY
      ------------------------- */

      if (
        command ===
        "history"
      ) {
        if (
          commandHistory.length ===
          0
        ) {
          appendOutput([
            "No command history.",
          ]);

          return;
        }

        appendOutput(
          commandHistory.map(
            (
              item,
              index
            ) =>
              `${String(
                index + 1
              ).padStart(
                3,
                " "
              )}  ${item}`
          )
        );

        return;
      }

      /* -------------------------
         NEOFETCH
      ------------------------- */

      if (
        command ===
        "neofetch"
      ) {
        appendOutput([
          "",
          "                 .:'",
          "              __ :'__",
          "           .'`  `-'  ``.",
          "          :             :",
          "          :             :",
          "           :           :",
          "            `.__.-.__.'",
          "",
          "param@Params-MacBook-Pro",
          "------------------------",
          "OS:       ParamOS 1.0",
          "Host:     Interactive Research Portfolio",
          "Role:     AI Research Associate",
          "Focus:    Reinforcement Learning",
          "Research: RL · Quant Finance · Quantum ML",
          "Papers:   9 selected research works",
          "Shell:    portfolio-zsh",
          "Stack:    Next.js · React · TypeScript",
          "Theme:    macOS",
          "",
        ]);

        return;
      }

      /* =====================================================
         PORTFOLIO SHORTCUTS
      ===================================================== */

      if (
        command ===
        "about"
      ) {
        const node =
          FILE_SYSTEM.children[
            "about.txt"
          ];

        if (
          node.type ===
          "file"
        ) {
          appendOutput(
            node.content
          );
        }

        return;
      }

      if (
        command ===
        "research"
      ) {
        appendOutput(
          openTarget(
            "research"
          )
        );

        return;
      }

      if (
        command ===
          "papers" ||
        command ===
          "publications"
      ) {
        appendOutput(
          openTarget(
            "research"
          )
        );

        return;
      }

      if (
        command ===
        "contact"
      ) {
        const node =
          FILE_SYSTEM.children[
            "contact.txt"
          ];

        if (
          node.type ===
          "file"
        ) {
          appendOutput(
            node.content
          );
        }

        return;
      }

      /* =====================================================
         EASTER EGGS
      ===================================================== */

      if (
        command ===
        "sudo"
      ) {
        appendOutput([
          "param is not in the sudoers file.",
          "This incident has been reported to absolutely nobody.",
        ]);

        return;
      }

      if (
        command ===
        "coffee"
      ) {
        appendOutput([
          "Brewing...",
          "",
          "☕  Research productivity restored.",
        ]);

        return;
      }

      if (
        command ===
        "42"
      ) {
        appendOutput([
          "The Answer to the Ultimate Question of Life,",
          "the Universe, and Everything.",
        ]);

        return;
      }

      if (
        command ===
        "startup"
      ) {
        appendOutput([
          "startup.sh",
          "",
          "1. Find an expensive repeated decision.",
          "2. Solve it better than the status quo.",
          "3. Make it difficult to replicate.",
          "4. Find someone willing to pay.",
          "",
          "Exit status: still thinking.",
        ]);

        return;
      }

      /* -------------------------
         UNKNOWN
      ------------------------- */

      appendOutput([
        `zsh: command not found: ${commandRaw}`,
        "Type 'help' for available commands.",
      ]);
    };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit =
    (
      event:
        FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      const command =
        input.trim();

      if (
        !command
      ) {
        return;
      }

      const promptAtSubmission =
        prompt;

      setEntries(
        (
          current
        ) => [
          ...current,
          {
            id:
              nextIdRef.current++,
            type:
              "command",
            prompt:
              promptAtSubmission,
            command,
          },
        ]
      );

      setCommandHistory(
        (
          current
        ) => [
          ...current,
          command,
        ]
      );

      setHistoryIndex(
        null
      );

      setInput(
        ""
      );

      window.setTimeout(
        () => {
          executeCommand(
            command
          );
        },
        0
      );
    };

  /* =======================================================
     KEYBOARD
  ======================================================= */

  const handleKeyDown =
    (
      event:
        KeyboardEvent<HTMLInputElement>
    ) => {
      /* -------------------------
         UP HISTORY
      ------------------------- */

      if (
        event.key ===
        "ArrowUp"
      ) {
        event.preventDefault();

        if (
          commandHistory.length ===
          0
        ) {
          return;
        }

        const nextIndex =
          historyIndex ===
          null
            ? commandHistory.length -
              1
            : Math.max(
                historyIndex -
                  1,
                0
              );

        setHistoryIndex(
          nextIndex
        );

        setInput(
          commandHistory[
            nextIndex
          ]
        );

        return;
      }

      /* -------------------------
         DOWN HISTORY
      ------------------------- */

      if (
        event.key ===
        "ArrowDown"
      ) {
        event.preventDefault();

        if (
          historyIndex ===
          null
        ) {
          return;
        }

        const nextIndex =
          historyIndex +
          1;

        if (
          nextIndex >=
          commandHistory.length
        ) {
          setHistoryIndex(
            null
          );

          setInput(
            ""
          );

          return;
        }

        setHistoryIndex(
          nextIndex
        );

        setInput(
          commandHistory[
            nextIndex
          ]
        );

        return;
      }

      /* -------------------------
         TAB COMPLETION
      ------------------------- */

      if (
        event.key ===
        "Tab"
      ) {
        event.preventDefault();

        const trimmed =
          input.trim();

        if (
          !trimmed
        ) {
          return;
        }

        const parts =
          trimmed.split(
            /\s+/
          );

        const first =
          parts[0]
            .toLowerCase();

        const knownCommands =
          [
            "help",
            "clear",
            "pwd",
            "cd",
            "ls",
            "cat",
            "open",
            "echo",
            "whoami",
            "hostname",
            "date",
            "uptime",
            "history",
            "neofetch",
            "about",
            "research",
            "papers",
            "publications",
            "contact",
          ];

        if (
          parts.length ===
          1
        ) {
          const matches =
            knownCommands.filter(
              (
                item
              ) =>
                item.startsWith(
                  first
                )
            );

          if (
            matches.length ===
            1
          ) {
            setInput(
              matches[0]
            );
          }

          return;
        }

        if (
          first === "cd" ||
          first === "cat" ||
          first === "ls"
        ) {
          const node =
            getNodeAtPath(
              currentPath
            );

          if (
            !node ||
            node.type !==
              "directory"
          ) {
            return;
          }

          const fragment =
            parts[
              parts.length -
                1
            ] ?? "";

          const matches =
            Object.keys(
              node.children
            ).filter(
              (
                item
              ) =>
                item.startsWith(
                  fragment
                )
            );

          if (
            matches.length ===
            1
          ) {
            parts[
              parts.length -
                1
            ] =
              matches[0];

            setInput(
              parts.join(
                " "
              )
            );
          }
        }
      }
    };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className={
        styles.terminal
      }
      onClick={() =>
        inputRef.current?.focus()
      }
    >

      <div
        ref={
          scrollRef
        }
        className={
          styles.scrollArea
        }
      >

        {entries.map(
          (
            entry
          ) => {
            if (
              entry.type ===
              "command"
            ) {
              return (
                <div
                  key={
                    entry.id
                  }
                  className={
                    styles.commandLine
                  }
                >

                  <span
                    className={
                      styles.prompt
                    }
                  >
                    {
                      entry.prompt
                    }
                  </span>

                  <span
                    className={
                      styles.commandText
                    }
                  >
                    {
                      entry.command
                    }
                  </span>

                </div>
              );
            }

            return (
              <div
                key={
                  entry.id
                }
                className={
                  styles.outputBlock
                }
              >

                {entry.lines.map(
                  (
                    line,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      className={
                        styles.outputLine
                      }
                    >
                      {line ||
                        "\u00A0"}
                    </div>
                  )
                )}

              </div>
            );
          }
        )}

        <form
          className={
            styles.inputLine
          }
          onSubmit={
            handleSubmit
          }
        >

          <span
            className={
              styles.prompt
            }
          >
            {prompt}
          </span>

          <input
            ref={
              inputRef
            }
            value={
              input
            }
            onChange={(
              event
            ) =>
              setInput(
                event.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            className={
              styles.input
            }
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal command"
          />

          <span
            className={
              styles.cursor
            }
          />

        </form>

      </div>

    </div>
  );
}