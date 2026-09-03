"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowUp,
  ChevronDown,
  MessageSquarePlus,
  PanelLeft,
  Search,
  Sparkles,
} from "lucide-react";

type ChatRole =
  | "assistant"
  | "user";

type ChatMessage = {
  id: number;
  role: ChatRole;
  content: string;
};

const STARTER_MESSAGE: ChatMessage = {
  id: 1,
  role: "assistant",
  content:
    "Hi, I’m Ask Param. You can ask me about Param’s research, experience, publications, reinforcement learning work, quantitative finance, quantum machine learning, or how to contact him.",
};

const SUGGESTIONS = [
  "What does Param research?",
  "Tell me about his RL work",
  "What is KASPER?",
  "What has he published?",
];

const CONVERSATIONS = [
  "Param’s research",
  "Experience at Fractal",
  "Publications",
  "Quantum ML work",
];

export default function ClaudeApp() {
  const [
    messages,
    setMessages,
  ] = useState<ChatMessage[]>([
    STARTER_MESSAGE,
  ]);

  const [
    input,
    setInput,
  ] = useState("");

  const [
    isTyping,
    setIsTyping,
  ] = useState(false);

  const [
    sidebarVisible,
    setSidebarVisible,
  ] = useState(true);

  const [
    conversationTitle,
    setConversationTitle,
  ] = useState(
    "New conversation"
  );

  const nextId =
    useRef(2);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(
      null
    );

  useEffect(() => {
    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }, [
    messages,
    isTyping,
  ]);

  const startNewChat = () => {
    setMessages([
      {
        ...STARTER_MESSAGE,
        id: nextId.current++,
      },
    ]);

    setInput("");

    setIsTyping(false);

    setConversationTitle(
      "New conversation"
    );
  };

  const submitQuestion = (
    question?: string
  ) => {
    const finalQuestion =
      (
        question ??
        input
      ).trim();

    if (
      !finalQuestion ||
      isTyping
    ) {
      return;
    }

    const userMessage: ChatMessage = {
      id: nextId.current++,
      role: "user",
      content: finalQuestion,
    };

    setMessages(
      (current) => [
        ...current,
        userMessage,
      ]
    );

    if (
      conversationTitle ===
      "New conversation"
    ) {
      setConversationTitle(
        finalQuestion.length > 34
          ? `${finalQuestion.slice(
              0,
              34
            )}…`
          : finalQuestion
      );
    }

    setInput("");

    setIsTyping(true);

    window.setTimeout(() => {
      const response =
        getParamResponse(
          finalQuestion
        );

      const assistantMessage: ChatMessage =
        {
          id: nextId.current++,
          role: "assistant",
          content: response,
        };

      setMessages(
        (current) => [
          ...current,
          assistantMessage,
        ]
      );

      setIsTyping(false);
    }, 650);
  };

  return (
    <div className="claude-app">

      {/* =========================================
          SIDEBAR
      ========================================== */}

      {sidebarVisible && (
        <aside className="claude-sidebar">

          <div className="claude-sidebar-top">

            <button
              className="claude-sidebar-toggle"
              onClick={() =>
                setSidebarVisible(
                  false
                )
              }
              aria-label="Hide sidebar"
            >
              <PanelLeft
                size={18}
              />
            </button>

            <div className="claude-sidebar-logo">
              <img
                src="/icons/claude.png"
                alt="Claude"
                draggable={false}
              />
            </div>

            <button
              className="claude-new-chat-icon"
              onClick={
                startNewChat
              }
              aria-label="New chat"
            >
              <MessageSquarePlus
                size={18}
              />
            </button>

          </div>

          <button
            className="claude-new-chat"
            onClick={
              startNewChat
            }
          >
            <MessageSquarePlus
              size={16}
            />

            <span>
              New chat
            </span>
          </button>

          <div className="claude-sidebar-search">

            <Search
              size={15}
            />

            <span>
              Search chats
            </span>

          </div>

          <div className="claude-sidebar-section">
            Recents
          </div>

          <div className="claude-conversation-list">

            <button className="claude-conversation claude-conversation-active">
              <span>
                {conversationTitle}
              </span>
            </button>

            {CONVERSATIONS.map(
              (
                conversation
              ) => (
                <button
                  key={
                    conversation
                  }
                  className="claude-conversation"
                >
                  <span>
                    {conversation}
                  </span>
                </button>
              )
            )}

          </div>

          <div className="claude-sidebar-bottom">

            <div className="claude-profile-avatar">
              P
            </div>

            <div className="claude-profile-copy">

              <strong>
                Param Pathak
              </strong>

              <span>
                Portfolio
              </span>

            </div>

            <ChevronDown
              size={15}
            />

          </div>

        </aside>
      )}

      {/* =========================================
          MAIN
      ========================================== */}

      <section className="claude-main">

        <header className="claude-header">

          {!sidebarVisible && (
            <button
              className="claude-header-button"
              onClick={() =>
                setSidebarVisible(
                  true
                )
              }
              aria-label="Show sidebar"
            >
              <PanelLeft
                size={18}
              />
            </button>
          )}

          <div className="claude-header-title">
            Ask Param
          </div>

          <div className="claude-header-spacer" />

        </header>

        {/* =======================================
            MESSAGES
        ======================================== */}

        <div className="claude-chat-scroll">

          <div className="claude-chat-column">

            {messages.length ===
              1 && (
              <div className="claude-welcome">

                <div className="claude-welcome-mark">
                  <Sparkles
                    size={25}
                  />
                </div>

                <h1>
                  Ask me about Param
                </h1>

                <p>
                  Explore his research,
                  experience, publications
                  and technical work.
                </p>

                <div className="claude-suggestions">

                  {SUGGESTIONS.map(
                    (
                      suggestion
                    ) => (
                      <button
                        key={
                          suggestion
                        }
                        onClick={() =>
                          submitQuestion(
                            suggestion
                          )
                        }
                      >
                        {
                          suggestion
                        }
                      </button>
                    )
                  )}

                </div>

              </div>
            )}

            <div className="claude-message-stream">

              {messages.map(
                (
                  message
                ) => (
                  <ChatMessageView
                    key={
                      message.id
                    }
                    message={
                      message
                    }
                  />
                )
              )}

              {isTyping && (
                <div className="claude-message claude-assistant-message">

                  <div className="claude-assistant-avatar">
                    <img
                      src="/icons/claude.png"
                      alt=""
                      draggable={false}
                    />
                  </div>

                  <div className="claude-message-content">

                    <div className="claude-message-author">
                      Ask Param
                    </div>

                    <div className="claude-typing">
                      <span />
                      <span />
                      <span />
                    </div>

                  </div>

                </div>
              )}

              <div
                ref={
                  messagesEndRef
                }
              />

            </div>

          </div>

        </div>

        {/* =======================================
            INPUT
        ======================================== */}

        <div className="claude-composer-area">

          <div className="claude-composer">

            <textarea
              value={input}
              onChange={(
                event
              ) =>
                setInput(
                  event.target.value
                )
              }
              onKeyDown={(
                event
              ) => {
                if (
                  event.key ===
                    "Enter" &&
                  !event.shiftKey
                ) {
                  event.preventDefault();

                  submitQuestion();
                }
              }}
              placeholder="Ask about Param..."
              rows={1}
            />

            <div className="claude-composer-bottom">

              <button className="claude-model-button">
                Param
                <ChevronDown
                  size={13}
                />
              </button>

              <button
                className={
                  `claude-send-button ${
                    input.trim()
                      ? "claude-send-button-ready"
                      : ""
                  }`
                }
                onClick={() =>
                  submitQuestion()
                }
                disabled={
                  !input.trim() ||
                  isTyping
                }
                aria-label="Send message"
              >
                <ArrowUp
                  size={18}
                  strokeWidth={2.5}
                />
              </button>

            </div>

          </div>

          <div className="claude-disclaimer">
            Ask Param uses curated portfolio
            information and may not answer
            questions outside this profile.
          </div>

        </div>

      </section>

    </div>
  );
}

/* =========================================================
   MESSAGE
========================================================= */

function ChatMessageView({
  message,
}: {
  message: ChatMessage;
}) {
  if (
    message.role ===
    "user"
  ) {
    return (
      <div className="claude-message claude-user-message">

        <div className="claude-user-bubble">
          {message.content}
        </div>

      </div>
    );
  }

  return (
    <div className="claude-message claude-assistant-message">

      <div className="claude-assistant-avatar">

        <img
          src="/icons/claude.png"
          alt=""
          draggable={false}
        />

      </div>

      <div className="claude-message-content">

        <div className="claude-message-author">
          Ask Param
        </div>

        {message.content
          .split("\n")
          .map(
            (
              paragraph,
              index
            ) =>
              paragraph ? (
                <p key={index}>
                  {paragraph}
                </p>
              ) : (
                <div
                  key={index}
                  className="claude-paragraph-space"
                />
              )
          )}

      </div>

    </div>
  );
}

/* =========================================================
   CURATED RESPONSE ENGINE
========================================================= */

function getParamResponse(
  question: string
) {
  const q =
    question.toLowerCase();

  if (
    includesAny(
      q,
      [
        "what does param research",
        "research interest",
        "research interests",
        "research area",
        "research areas",
        "research",
      ]
    )
  ) {
    return (
      "Param’s research centers on reinforcement learning and sequential decision making under uncertainty, with additional work spanning quantitative finance, quantum machine learning and cognitive systems.\n\n" +
      "A major current interest is learning in environments whose dynamics are partly driven by exogenous factors. He is interested in approximate exogeneity, robustness to model deviations, regret guarantees and scalable reinforcement learning with function approximation.\n\n" +
      "His broader goal is to connect mathematically grounded learning methods with practical intelligent systems."
    );
  }

  if (
    includesAny(
      q,
      [
        "reinforcement learning",
        "rl work",
        "rl research",
        "exogenous",
        "mdp",
        "decision making",
        "uncertainty",
      ]
    )
  ) {
    return (
      "Param is interested in reinforcement learning for sequential decision making under uncertainty, particularly settings where part of the environment is driven by external or exogenous dynamics.\n\n" +
      "His interests include theoretically grounded RL algorithms, approximate exogeneity, robustness to bounded deviations from idealized models, regret analysis, function approximation and computational evaluation.\n\n" +
      "At Fractal Analytics, his experience includes designing and evaluating RL algorithms for uncertain and exogenous environments while combining theoretical guarantees with experimentation and performance analysis."
    );
  }

  if (
    includesAny(
      q,
      [
        "kasper",
        "stock",
        "finance",
        "quantitative finance",
        "financial",
        "kan",
        "kolmogorov",
      ]
    )
  ) {
    return (
      "KASPER is Param’s regime-adaptive machine learning work for financial time series developed through his collaboration with NYU Abu Dhabi.\n\n" +
      "The framework uses Kolmogorov Arnold Networks, sparse spline activations and Gumbel Softmax regime detection. In the reported experiments, it achieved an R² of 0.89 and a Sharpe Ratio of 12.02 while outperforming LSTM baselines.\n\n" +
      "The work also included Monte Carlo Shapley feature attribution and regime-level explainability analysis, with an 83% win rate and a -0.09% maximum drawdown. The work was published in Transactions on Machine Learning Research."
    );
  }

  if (
    includesAny(
      q,
      [
        "fractal",
        "experience",
        "work history",
        "worked",
        "job",
        "career",
      ]
    )
  ) {
    return (
      "Param is currently an AI Research Associate at Fractal Analytics. His work includes developing machine learning architectures for Frequency Comb Neural Networks in collaboration with BITS Pilani, Dubai Campus, and designing and evaluating reinforcement learning algorithms for sequential decision making under uncertain and exogenous environments.\n\n" +
      "Earlier, he worked with BITS Pilani Dubai on correlated decision making in Bayesian games, with NYU Abu Dhabi on regime-adaptive financial forecasting, and as a Research Intern in Fractal’s Quantum-AI Group on quantum-classical generative models for drug design.\n\n" +
      "His earlier research also includes spiking neural networks for vehicle detection and variational quantum regression for 5G resource allocation."
    );
  }

  if (
    includesAny(
      q,
      [
        "quantum",
        "qiskit",
        "pqc",
        "reservoir",
        "drug design",
        "bayesian games",
        "5g",
      ]
    )
  ) {
    return (
      "Param’s quantum-computing work spans several areas: parameterized quantum circuits for correlated decision making in Bayesian games, quantum-classical generative models for drug design, quantum reservoir computing, quantum-enhanced cognitive decision making, and variational quantum regression for 5G resource allocation.\n\n" +
      "He has also worked on a review of IBM’s Qiskit software ecosystem. His quantum-related work has appeared across venues including Quantum Machine Intelligence, IEEE conferences, Elsevier and arXiv, with additional work under review."
    );
  }

  if (
    includesAny(
      q,
      [
        "publication",
        "publications",
        "papers",
        "paper",
        "published",
        "journal",
      ]
    )
  ) {
    return (
      "Param’s selected research includes work on quantum reservoir computing for power-load forecasting, parameterized quantum circuits for Bayesian games, hardware-efficient quantum reservoir computing, quantum-classical generative models for drug design, KASPER for regime-adaptive stock prediction, quantum-enhanced decision making in ACT-R, DRiVE for spiking-neural-network vehicle detection, a Qiskit review, and quantum regression for 5G resource allocation.\n\n" +
      "His publication record includes TMLR, Quantum Machine Intelligence, IEEE venues, Elsevier, DAC and ongoing submissions to Scientific Reports and IEEE Transactions on Quantum Engineering.\n\n" +
      "Open the Notes app → Publications for the individual paper links."
    );
  }

  if (
    includesAny(
      q,
      [
        "drive",
        "vehicle",
        "spiking",
        "snn",
      ]
    )
  ) {
    return (
      "DRiVE is Param’s spiking-neural-network work for vehicle detection. The model used snnTorch, Leaky Integrate-and-Fire neurons and surrogate-gradient learning.\n\n" +
      "The reported results include 94.8% accuracy and 0.99 AUC while outperforming the SNN benchmarks used in the study. The work was published at IEEE ASSIC 2025."
    );
  }

  if (
    includesAny(
      q,
      [
        "education",
        "college",
        "degree",
        "university",
        "cgpa",
        "svpit",
      ]
    )
  ) {
    return (
      "Param completed a B.E. in Computer Engineering at Sardar Vallabhbhai Patel Institute of Technology in Gujarat, India, from 2021 to 2025, with a CGPA of 8.71/10."
    );
  }

  if (
    includesAny(
      q,
      [
        "skill",
        "skills",
        "python",
        "pytorch",
        "tensorflow",
        "programming",
        "technical",
      ]
    )
  ) {
    return (
      "Param works primarily with Python and machine-learning tooling including PyTorch, TensorFlow, PennyLane, Qiskit and snnTorch.\n\n" +
      "His technical experience includes reinforcement learning, deep learning, time-series forecasting, explainable AI, generative models, Kolmogorov Arnold Networks, spiking neural networks, Markov decision processes, Monte Carlo methods, experimental design, benchmarking and quantitative model evaluation."
    );
  }

  if (
    includesAny(
      q,
      [
        "contact",
        "email",
        "linkedin",
        "github",
        "reach",
      ]
    )
  ) {
    return (
      "You can reach Param at parampathak28@gmail.com.\n\n" +
      "His GitHub is Parampathak-28 and his LinkedIn profile is linked directly from the Dock. You can also open Notes → Contact for his Google Scholar and other profile links."
    );
  }

  if (
    includesAny(
      q,
      [
        "who is param",
        "about param",
        "tell me about param",
        "who are you",
        "about",
      ]
    )
  ) {
    return (
      "Param Pathak is a Computer Engineering graduate and AI Research Associate at Fractal Analytics whose work spans reinforcement learning, sequential decision making, quantitative finance, classical and quantum machine learning, and cognitive systems.\n\n" +
      "His research has involved collaborations with Fractal Analytics, BITS Pilani Dubai and NYU Abu Dhabi, with work published across machine learning, quantum computing and AI venues."
    );
  }

  return (
    "I’m currently designed to answer questions about Param’s portfolio rather than general topics.\n\n" +
    "Try asking about his research interests, reinforcement learning work, experience at Fractal, KASPER, quantum machine learning, publications, technical skills or contact information."
  );
}

function includesAny(
  text: string,
  terms: string[]
) {
  return terms.some(
    (term) =>
      text.includes(
        term
      )
  );
}