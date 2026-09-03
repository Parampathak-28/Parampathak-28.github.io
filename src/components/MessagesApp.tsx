"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Info,
  Mic,
  Phone,
  Plus,
  Search,
  Send,
  Video,
} from "lucide-react";

import styles from "./MessagesApp.module.css";

/* =========================================================
   TYPES
========================================================= */

type ThreadId =
  | "nouhaila"
  | "zoo"
  | "redflags"
  | "errorterm"
  | "nash"
  | "elon"
  | "credit";

type Participant = {
  id: string;
  name: string;
  initials: string;
};

type Message = {
  id: number;
  sender: string;
  text: string;
  time?: string;
};

type Thread = {
  id: ThreadId;

  name: string;

  preview: string;

  sidebarTime: string;

  dateHeading: string;

  meta: string;

  members: string;

  avatarParticipants: Participant[];

  participants: Participant[];

  messages: Message[];
};

/* =========================================================
   PARTICIPANTS
========================================================= */

const PEOPLE: Record<
  string,
  Participant
> = {
  param: {
    id: "param",
    name: "Param",
    initials: "P",
  },

  nouhaila: {
    id: "nouhaila",
    name: "Nouhaila",
    initials: "NI",
  },

  vid: {
    id: "vid",
    name: "Vid",
    initials: "V",
  },

  adi: {
    id: "adi",
    name: "Adi",
    initials: "A",
  },

  patrick: {
    id: "patrick",
    name: "Patrick Jane",
    initials: "PJ",
  },

  joe: {
    id: "joe",
    name: "Joe Goldberg",
    initials: "JG",
  },

  gerko: {
    id: "gerko",
    name: "Alex Gerko",
    initials: "AG",
  },

  simons: {
    id: "simons",
    name: "Jim Simons",
    initials: "JS",
  },

  nash: {
    id: "nash",
    name: "John Nash",
    initials: "JN",
  },

  elon: {
    id: "elon",
    name: "Elon Musk",
    initials: "EM",
  },

  hinton: {
    id: "hinton",
    name: "Geoffrey Hinton",
    initials: "GH",
  },

  schmidhuber: {
    id: "schmidhuber",
    name: "Jürgen Schmidhuber",
    initials: "JSch",
  },
};

/* =========================================================
   THREADS
========================================================= */

const THREADS: Thread[] = [
  /* =======================================================
     NOUHAILA
  ======================================================= */

  {
    id: "nouhaila",

    name: "Nouhaila Innan",

    preview:
      "Ablation first. Claims later.",

    sidebarTime:
      "2:11 AM",

    dateHeading:
      "Today 2:11 AM",

    meta:
      "Portfolio recreation",

    members:
      "Nouhaila Innan",

    avatarParticipants: [
      PEOPLE.nouhaila,
    ],

    participants: [
      PEOPLE.param,
      PEOPLE.nouhaila,
    ],

    messages: [
      {
        id: 1,
        sender: "nouhaila",
        text:
          "The result is interesting, but the important question is whether we can explain why the architecture is improving the equilibrium quality.",
      },

      {
        id: 2,
        sender: "param",
        text:
          "Exactly. I don’t want the paper to become “our model beats the baseline” without understanding the mechanism.",
      },

      {
        id: 3,
        sender: "nouhaila",
        text:
          "Then ablation first. Claims later.",
      },

      {
        id: 4,
        sender: "param",
        text:
          "Painful advice 😂 but yes.",
      },

      {
        id: 5,
        sender: "nouhaila",
        text:
          "Also separate what the experiments establish from what we think might be happening. Those are not the same thing.",
      },

      {
        id: 6,
        sender: "param",
        text:
          "That distinction has probably saved half the paper at this point.",
      },

      {
        id: 7,
        sender: "param",
        text:
          "The 60-parameter setup is still giving substantially lower regret than MCCFR in our experiments. Up to around 6× in the strongest case.",
      },

      {
        id: 8,
        sender: "nouhaila",
        text:
          "Good result. But write exactly that: under the experiments and settings you evaluated. Strong numbers don’t need exaggerated language.",
      },

      {
        id: 9,
        sender: "param",
        text:
          "Agreed. I’m also checking whether the conclusion survives the extra baselines and sensitivity runs.",
      },

      {
        id: 10,
        sender: "nouhaila",
        text:
          "That’s what makes it research rather than a demo.",
      },

      {
        id: 11,
        sender: "param",
        text:
          "Noted. Reproducibility, ablations, restrained claims.",
      },

      {
        id: 12,
        sender: "nouhaila",
        text:
          "And sleep occasionally.",
      },

      {
        id: 13,
        sender: "param",
        text:
          "Let’s keep the requirements realistic.",
        time: "2:19 AM",
      },
    ],
  },

  /* =======================================================
     THE ZOO
  ======================================================= */

  {
    id: "zoo",

    name: "The Zoo",

    preview:
      "I leave for five minutes and you two have started a company.",

    sidebarTime:
      "1:48 AM",

    dateHeading:
      "Today 1:48 AM",

    meta:
      "Portfolio recreation",

    members:
      "Param, Vid & Adi",

    avatarParticipants: [
      PEOPLE.vid,
      PEOPLE.adi,
    ],

    participants: [
      PEOPLE.param,
      PEOPLE.vid,
      PEOPLE.adi,
    ],

    messages: [
      {
        id: 100,
        sender: "vid",
        text:
          "You’re still working? 😭",
      },

      {
        id: 101,
        sender: "param",
        text:
          "Just finishing one thing.",
      },

      {
        id: 102,
        sender: "vid",
        text:
          "You said that like two hours ago.",
      },

      {
        id: 103,
        sender: "vid",
        text:
          "How did the experiment go btw?",
      },

      {
        id: 104,
        sender: "param",
        text:
          "Better than expected actually. Still checking whether the result survives all the sanity checks.",
      },

      {
        id: 105,
        sender: "vid",
        text:
          "So you’re going to stare at it for another three hours.",
      },

      {
        id: 106,
        sender: "param",
        text:
          "Most likely.",
      },

      {
        id: 107,
        sender: "param",
        text:
          "Anyway, how’s investment banking going?",
      },

      {
        id: 108,
        sender: "vid",
        text:
          "Somewhere between interesting and questioning every life decision.",
      },

      {
        id: 109,
        sender: "param",
        text:
          "Sounds healthy.",
      },

      {
        id: 110,
        sender: "vid",
        text:
          "Coming from you? absolutely not 😭",
      },

      {
        id: 111,
        sender: "adi",
        text:
          "Speaking of questionable life decisions, when are we actually building something?",
      },

      {
        id: 112,
        sender: "param",
        text:
          "When we find something worth building instead of another AI wrapper.",
      },

      {
        id: 113,
        sender: "adi",
        text:
          "Fine. What’s the filter?",
      },

      {
        id: 114,
        sender: "param",
        text:
          "Real problem, difficult to replicate, someone is willing to pay for it.",
      },

      {
        id: 115,
        sender: "adi",
        text:
          "Revenue first or product first?",
      },

      {
        id: 116,
        sender: "param",
        text:
          "Customer first. If nobody has the problem, neither matters.",
      },

      {
        id: 117,
        sender: "adi",
        text:
          "Look at bro becoming a founder now.",
      },

      {
        id: 118,
        sender: "vid",
        text:
          "Please don’t encourage him.",
      },

      {
        id: 119,
        sender: "param",
        text:
          "Suppose the first few customers already make it profitable.",
      },

      {
        id: 120,
        sender: "adi",
        text:
          "Then I care more about margin than headline revenue.",
      },

      {
        id: 121,
        sender: "param",
        text:
          "Exactly. I’d rather have something small and profitable first than burn money just to say we’re growing.",
      },

      {
        id: 122,
        sender: "vid",
        text:
          "I leave for five minutes and you two have started a company.",
      },

      {
        id: 123,
        sender: "adi",
        text:
          "Pre-seed round closes tomorrow.",
      },

      {
        id: 124,
        sender: "param",
        text:
          "You get 0.5% for emotional support.",
      },

      {
        id: 125,
        sender: "vid",
        text:
          "Keep it.",
        time: "2:02 AM",
      },
    ],
  },

  /* =======================================================
     RED FLAGS & RED HERRINGS
  ======================================================= */

  {
    id: "redflags",

    name:
      "Red Flags & Red Herrings",

    preview:
      "I’m muting this group.",

    sidebarTime:
      "Mon",

    dateHeading:
      "Monday",

    meta:
      "Imagined conversation",

    members:
      "Param, Patrick Jane & Joe Goldberg",

    avatarParticipants: [
      PEOPLE.patrick,
      PEOPLE.joe,
    ],

    participants: [
      PEOPLE.param,
      PEOPLE.patrick,
      PEOPLE.joe,
    ],

    messages: [
      {
        id: 200,
        sender: "patrick",
        text:
          "People are much easier to understand when you stop listening only to what they say.",
      },

      {
        id: 201,
        sender: "joe",
        text:
          "That sounds invasive coming from someone who calls it a profession.",
      },

      {
        id: 202,
        sender: "patrick",
        text:
          "Observation isn’t invasive. What you do after observing someone can be.",
      },

      {
        id: 203,
        sender: "joe",
        text:
          "You’ve known me for thirty seconds.",
      },

      {
        id: 204,
        sender: "patrick",
        text:
          "Twenty-seven.",
      },

      {
        id: 205,
        sender: "param",
        text:
          "I already regret making this group.",
      },

      {
        id: 206,
        sender: "joe",
        text:
          "You study decision-making, right? People tell themselves stories before they make choices.",
      },

      {
        id: 207,
        sender: "param",
        text:
          "I’m more interested in whether those choices remain predictable when the environment itself is uncertain.",
      },

      {
        id: 208,
        sender: "patrick",
        text:
          "Of course they’re predictable. People are wonderfully repetitive.",
      },

      {
        id: 209,
        sender: "param",
        text:
          "That sounds like a terrible assumption for a research paper.",
      },

      {
        id: 210,
        sender: "patrick",
        text:
          "Excellent assumption for a con artist though.",
      },

      {
        id: 211,
        sender: "joe",
        text:
          "Prediction is easy when you know enough about someone.",
      },

      {
        id: 212,
        sender: "patrick",
        text:
          "No. Confidence is easy when you think you know enough about someone.",
      },

      {
        id: 213,
        sender: "param",
        text:
          "That distinction is basically half of machine learning.",
      },

      {
        id: 214,
        sender: "patrick",
        text:
          "Finally, something useful has come out of mathematics.",
      },

      {
        id: 215,
        sender: "joe",
        text:
          "You both reduce people to patterns.",
      },

      {
        id: 216,
        sender: "param",
        text:
          "Models reduce information, not people.",
      },

      {
        id: 217,
        sender: "patrick",
        text:
          "Very important distinction. You should write that down.",
      },

      {
        id: 218,
        sender: "joe",
        text:
          "And what happens when the model is wrong?",
      },

      {
        id: 219,
        sender: "param",
        text:
          "Ideally, you update it.",
      },

      {
        id: 220,
        sender: "patrick",
        text:
          "Exactly.",
      },

      {
        id: 221,
        sender: "joe",
        text:
          "People don’t always do that.",
      },

      {
        id: 222,
        sender: "patrick",
        text:
          "Yes, Joe. That appears to be one of your recurring problems.",
      },

      {
        id: 223,
        sender: "param",
        text:
          "Serious question. What’s the biggest mistake people make when trying to understand someone?",
      },

      {
        id: 224,
        sender: "patrick",
        text:
          "Deciding what they want the answer to be before looking at the evidence.",
      },

      {
        id: 225,
        sender: "joe",
        text:
          "Believing people are exactly what they show you.",
      },

      {
        id: 226,
        sender: "patrick",
        text:
          "Interesting answer from you.",
      },

      {
        id: 227,
        sender: "joe",
        text:
          "Don’t.",
      },

      {
        id: 228,
        sender: "param",
        text:
          "😭",
      },

      {
        id: 229,
        sender: "patrick",
        text:
          "Param, you overthink.",
      },

      {
        id: 230,
        sender: "param",
        text:
          "That’s an accusation coming from a man who notices which direction somebody’s shoes are pointing.",
      },

      {
        id: 231,
        sender: "patrick",
        text:
          "Observation.",
      },

      {
        id: 232,
        sender: "joe",
        text:
          "Obsession.",
      },

      {
        id: 233,
        sender: "patrick",
        text:
          "Again, Joe, you really shouldn’t be the one making that distinction.",
      },

      {
        id: 234,
        sender: "param",
        text:
          "I’m muting this group.",
        time: "11:47 PM",
      },
    ],
  },

  /* =======================================================
     THE ERROR TERM
  ======================================================= */

  {
    id: "errorterm",

    name: "The Error Term",

    preview:
      "I’m including you.",

    sidebarTime:
      "Aug 29",

    dateHeading:
      "August 29, 2026",

    meta:
      "Imagined conversation",

    members:
      "Param, Alex Gerko & Jim Simons",

    avatarParticipants: [
      PEOPLE.gerko,
      PEOPLE.simons,
    ],

    participants: [
      PEOPLE.param,
      PEOPLE.gerko,
      PEOPLE.simons,
    ],

    messages: [
      {
        id: 300,
        sender: "param",
        text:
          "I have a research idea around a specific problem in sequential decision-making. At what point do I stop thinking of it as a paper and start thinking of it as a company?",
      },

      {
        id: 301,
        sender: "simons",
        text:
          "When someone cares about the consequence of the problem more than you care about the elegance of the solution.",
      },

      {
        id: 302,
        sender: "gerko",
        text:
          "More importantly: who loses money because this problem is unsolved?",
      },

      {
        id: 303,
        sender: "param",
        text:
          "There are environments where decisions are being made while a large part of what happens next is driven by things outside the decision-maker’s control.",
      },

      {
        id: 304,
        sender: "gerko",
        text:
          "Good. Don’t tell customers that.",
      },

      {
        id: 305,
        sender: "param",
        text:
          "😭",
      },

      {
        id: 306,
        sender: "gerko",
        text:
          "Seriously. They don’t buy “decision-making under exogenous dynamics.” They buy fewer bad decisions.",
      },

      {
        id: 307,
        sender: "simons",
        text:
          "The mathematics can remain underneath.",
      },

      {
        id: 308,
        sender: "param",
        text:
          "So I shouldn’t build the company around the algorithm?",
      },

      {
        id: 309,
        sender: "simons",
        text:
          "An algorithm is evidence that you may have an advantage. It is not yet a business.",
      },

      {
        id: 310,
        sender: "gerko",
        text:
          "Start with one ugly, expensive decision that companies make repeatedly.",
      },

      {
        id: 311,
        sender: "param",
        text:
          "One vertical?",
      },

      {
        id: 312,
        sender: "gerko",
        text:
          "One decision.",
      },

      {
        id: 313,
        sender: "param",
        text:
          "That narrow?",
      },

      {
        id: 314,
        sender: "gerko",
        text:
          "Narrow is good if the pain is large.",
      },

      {
        id: 315,
        sender: "simons",
        text:
          "You can generalize after you understand why the first case works.",
      },

      {
        id: 316,
        sender: "param",
        text:
          "Suppose the method can distinguish between what the decision-maker actually influences and what is mostly coming from external conditions. Is that itself valuable?",
      },

      {
        id: 317,
        sender: "simons",
        text:
          "Potentially. But only if separating the two changes the decision.",
      },

      {
        id: 318,
        sender: "gerko",
        text:
          "Exactly. Nobody pays you for decomposition. They pay because the decomposition lets them act better.",
      },

      {
        id: 319,
        sender: "param",
        text:
          "So the product should expose the recommendation, not the machinery.",
      },

      {
        id: 320,
        sender: "gerko",
        text:
          "Now you’re thinking like a company.",
      },

      {
        id: 321,
        sender: "simons",
        text:
          "Keep the machinery difficult to reproduce.",
      },

      {
        id: 322,
        sender: "param",
        text:
          "What would you consider the moat if the original idea comes from research?",
      },

      {
        id: 323,
        sender: "gerko",
        text:
          "Not the paper.",
      },

      {
        id: 324,
        sender: "simons",
        text:
          "Certainly not the paper.",
      },

      {
        id: 325,
        sender: "param",
        text:
          "I knew you were both going to say that.",
      },

      {
        id: 326,
        sender: "gerko",
        text:
          "Data, integration, accumulated decision history, and whether your system gets better inside the customer’s workflow.",
      },

      {
        id: 327,
        sender: "simons",
        text:
          "And knowledge about when the model should not be trusted.",
      },

      {
        id: 328,
        sender: "param",
        text:
          "Interesting. Most people would call accuracy the moat.",
      },

      {
        id: 329,
        sender: "simons",
        text:
          "Knowing when you are wrong is often more valuable than being slightly more right.",
      },

      {
        id: 330,
        sender: "gerko",
        text:
          "Especially when the decision has money attached to it.",
      },

      {
        id: 331,
        sender: "param",
        text:
          "In research I can show a guarantee under assumptions. In a product, the assumptions will obviously be violated.",
      },

      {
        id: 332,
        sender: "simons",
        text:
          "Then the interesting question begins.",
      },

      {
        id: 333,
        sender: "gerko",
        text:
          "That’s probably the company.",
      },

      {
        id: 334,
        sender: "param",
        text:
          "The violation?",
      },

      {
        id: 335,
        sender: "gerko",
        text:
          "Handling the real world after the theorem stops being clean.",
      },

      {
        id: 336,
        sender: "simons",
        text:
          "Mathematics tells you where the structure is. Engineering tells you whether the structure survives contact with reality.",
      },

      {
        id: 337,
        sender: "param",
        text:
          "So before writing another hundred lines of research code...",
      },

      {
        id: 338,
        sender: "gerko",
        text:
          "Talk to ten people who make the same expensive decision every week.",
      },

      {
        id: 339,
        sender: "simons",
        text:
          "Find out what they currently believe causes their outcomes.",
      },

      {
        id: 340,
        sender: "param",
        text:
          "And if their explanation is wrong?",
      },

      {
        id: 341,
        sender: "simons",
        text:
          "Then perhaps you’ve found something.",
      },

      {
        id: 342,
        sender: "gerko",
        text:
          "Or you’ve found eleven people who are wrong.",
      },

      {
        id: 343,
        sender: "param",
        text:
          "Eleven?",
      },

      {
        id: 344,
        sender: "gerko",
        text:
          "I’m including you.",
        time: "10:12 PM",
      },
    ],
  },

  /* =======================================================
     JOHN NASH
  ======================================================= */

  {
    id: "nash",

    name: "John Nash",

    preview:
      "Does anyone still have a reason to change?",

    sidebarTime:
      "Mar 2025",

    dateHeading:
      "March 2025",

    meta:
      "Imagined conversation",

    members:
      "John Nash",

    avatarParticipants: [
      PEOPLE.nash,
    ],

    participants: [
      PEOPLE.param,
      PEOPLE.nash,
    ],

    messages: [
      {
        id: 400,
        sender: "param",
        text:
          "I understand the basic idea of a Nash equilibrium. Everyone is choosing a best response to everyone else. But why does game theory become so much harder once information is incomplete?",
      },

      {
        id: 401,
        sender: "nash",
        text:
          "Because now a player does not merely ask, “What will the others do?” He must also ask, “What do the others know?”",
      },

      {
        id: 402,
        sender: "param",
        text:
          "So that’s where Bayesian games enter.",
      },

      {
        id: 403,
        sender: "nash",
        text:
          "Precisely.",
      },

      {
        id: 404,
        sender: "param",
        text:
          "What exactly is a type in a Bayesian game?",
      },

      {
        id: 405,
        sender: "nash",
        text:
          "A type represents private information relevant to a player’s decision. It might describe preferences, costs, information, capabilities, or something else the other players do not directly observe.",
      },

      {
        id: 406,
        sender: "param",
        text:
          "So a strategy isn’t simply “choose action A.”",
      },

      {
        id: 407,
        sender: "nash",
        text:
          "Correct. It becomes a rule: if I am this type, what should I do?",
      },

      {
        id: 408,
        sender: "param",
        text:
          "A mapping from types to actions.",
      },

      {
        id: 409,
        sender: "nash",
        text:
          "Or distributions over actions, if the strategy is mixed.",
      },

      {
        id: 410,
        sender: "param",
        text:
          "But if I don’t know everybody else’s type, how can I choose a best response?",
      },

      {
        id: 411,
        sender: "nash",
        text:
          "You respond to what you believe their types are likely to be.",
      },

      {
        id: 412,
        sender: "param",
        text:
          "So expected utility replaces utility for one known state.",
      },

      {
        id: 413,
        sender: "nash",
        text:
          "Exactly. A Bayesian Nash equilibrium requires each player’s strategy to be optimal given their information, beliefs, and the strategies of everyone else.",
      },

      {
        id: 414,
        sender: "param",
        text:
          "So even equilibrium now depends on uncertainty about the players themselves.",
      },

      {
        id: 415,
        sender: "nash",
        text:
          "Yes. Uncertainty has become part of the game.",
      },

      {
        id: 416,
        sender: "param",
        text:
          "This is actually close to something I worked on later.",
      },

      {
        id: 417,
        sender: "nash",
        text:
          "Tell me.",
      },

      {
        id: 418,
        sender: "param",
        text:
          "We studied correlated decision-making in Bayesian games rather than restricting every player to choose independently.",
      },

      {
        id: 419,
        sender: "nash",
        text:
          "Then you allowed the recommendations themselves to carry correlation.",
      },

      {
        id: 420,
        sender: "param",
        text:
          "Exactly. The way I think about correlated equilibrium is this: imagine a trusted device privately recommending an action to each player.",
      },

      {
        id: 421,
        sender: "nash",
        text:
          "And what condition must those recommendations satisfy?",
      },

      {
        id: 422,
        sender: "param",
        text:
          "Once I receive my recommendation, knowing what I know, I shouldn’t gain by ignoring it and choosing something else.",
      },

      {
        id: 423,
        sender: "nash",
        text:
          "Good.",
      },

      {
        id: 424,
        sender: "param",
        text:
          "So correlation can coordinate players without requiring them to explicitly cooperate.",
      },

      {
        id: 425,
        sender: "nash",
        text:
          "An important distinction.",
      },

      {
        id: 426,
        sender: "param",
        text:
          "Suppose two drivers approach an intersection.",
      },

      {
        id: 427,
        sender: "nash",
        text:
          "Dangerous choice of example.",
      },

      {
        id: 428,
        sender: "param",
        text:
          "😭 If each independently randomizes between going and waiting, they can coordinate poorly.",
      },

      {
        id: 429,
        sender: "nash",
        text:
          "Yes.",
      },

      {
        id: 430,
        sender: "param",
        text:
          "But if a signal tells one “go” and the other “wait,” and neither wants to disobey their recommendation, that correlated signal can produce better coordination.",
      },

      {
        id: 431,
        sender: "nash",
        text:
          "Now you understand why allowing correlation enlarges the equilibrium set.",
      },

      {
        id: 432,
        sender: "nash",
        text:
          "And how did you approach this computationally?",
      },

      {
        id: 433,
        sender: "param",
        text:
          "We built a parameterized learning architecture with 60 trainable parameters for correlated decision-making in Bayesian games.",
      },

      {
        id: 434,
        sender: "nash",
        text:
          "What were you optimizing?",
      },

      {
        id: 435,
        sender: "param",
        text:
          "Ultimately whether the learned strategy approached equilibrium behaviour. We evaluated it through regret rather than simply asking whether some objective value became large.",
      },

      {
        id: 436,
        sender: "nash",
        text:
          "Why regret?",
      },

      {
        id: 437,
        sender: "param",
        text:
          "Because equilibrium is really about the temptation to deviate. If a player could have substantially improved their outcome by systematically choosing something else, the strategy isn’t behaving like an equilibrium.",
      },

      {
        id: 438,
        sender: "nash",
        text:
          "Very good.",
      },

      {
        id: 439,
        sender: "param",
        text:
          "That changed how I understood regret. I used to think of it mostly as a learning metric.",
      },

      {
        id: 440,
        sender: "nash",
        text:
          "It is also an equilibrium certificate.",
      },

      {
        id: 441,
        sender: "param",
        text:
          "Because low regret means there is little advantage left in unilateral deviation.",
      },

      {
        id: 442,
        sender: "nash",
        text:
          "Exactly. Optimization asks, “Did you improve the objective?” Game theory asks, “Does anyone still have a reason to change?”",
      },

      {
        id: 443,
        sender: "param",
        text:
          "That might be the cleanest distinction I’ve heard.",
      },

      {
        id: 444,
        sender: "nash",
        text:
          "And what did you compare against?",
      },

      {
        id: 445,
        sender: "param",
        text:
          "MCCFR was one of our baselines. In our experiments, the learned architecture achieved up to roughly six times lower regret.",
      },

      {
        id: 446,
        sender: "nash",
        text:
          "Then what should you conclude?",
      },

      {
        id: 447,
        sender: "param",
        text:
          "That it performed better under those experiments. Not that we solved game theory.",
      },

      {
        id: 448,
        sender: "nash",
        text:
          "Good. You may continue doing research.",
      },

      {
        id: 449,
        sender: "param",
        text:
          "There’s something I still find strange about equilibrium. People sometimes talk about it as if it means everybody is happy.",
      },

      {
        id: 450,
        sender: "nash",
        text:
          "It means nothing of the sort.",
      },

      {
        id: 451,
        sender: "param",
        text:
          "It only means nobody benefits from changing alone.",
      },

      {
        id: 452,
        sender: "nash",
        text:
          "Precisely.",
      },

      {
        id: 453,
        sender: "param",
        text:
          "So an equilibrium can be stable and still be terrible.",
      },

      {
        id: 454,
        sender: "nash",
        text:
          "Now you are asking the interesting questions.",
      },

      {
        id: 455,
        sender: "param",
        text:
          "The more game theory I learn, the less “rational behaviour” seems to mean “good behaviour.”",
      },

      {
        id: 456,
        sender: "nash",
        text:
          "Rationality describes incentives. It does not provide morality.",
      },

      {
        id: 457,
        sender: "param",
        text:
          "I’m writing that down.",
      },

      {
        id: 458,
        sender: "nash",
        text:
          "You seem to do that rather often.",
      },

      {
        id: 459,
        sender: "param",
        text:
          "Occupational hazard.",
        time: "11:26 PM",
      },
    ],
  },

  /* =======================================================
     ELON MUSK
  ======================================================= */

  {
    id: "elon",

    name: "Elon Musk",

    preview:
      "Don’t mistake the scoreboard for the game.",

    sidebarTime:
      "Jan 2024",

    dateHeading:
      "January 2024",

    meta:
      "Imagined conversation",

    members:
      "Elon Musk",

    avatarParticipants: [
      PEOPLE.elon,
    ],

    participants: [
      PEOPLE.param,
      PEOPLE.elon,
    ],

    messages: [
      {
        id: 500,
        sender: "param",
        text:
          "I’ve been thinking about something. Everyone says they want to make a lot of money, but actively chasing money somehow feels like the wrong strategy.",
      },

      {
        id: 501,
        sender: "elon",
        text:
          "Because money is an accounting system. It measures value exchanged. It isn’t the value itself.",
      },

      {
        id: 502,
        sender: "param",
        text:
          "So if I want more money, I should stop thinking about money?",
      },

      {
        id: 503,
        sender: "elon",
        text:
          "Not exactly. Understand money. Just don’t mistake the scoreboard for the game.",
      },

      {
        id: 504,
        sender: "param",
        text:
          "What is the game then?",
      },

      {
        id: 505,
        sender: "elon",
        text:
          "Create something people value.",
      },

      {
        id: 506,
        sender: "param",
        text:
          "That sounds almost too simple.",
      },

      {
        id: 507,
        sender: "elon",
        text:
          "The sentence is simple. Doing it isn’t.",
      },

      {
        id: 508,
        sender: "elon",
        text:
          "If a million people genuinely want something you created, monetization is usually easier than creating something nobody wants and trying to monetize it brilliantly.",
      },

      {
        id: 509,
        sender: "param",
        text:
          "So what separates earning well from actually becoming wealthy?",
      },

      {
        id: 510,
        sender: "elon",
        text:
          "Ownership.",
      },

      {
        id: 511,
        sender: "param",
        text:
          "Explain.",
      },

      {
        id: 512,
        sender: "elon",
        text:
          "If all your income depends directly on another hour of your time, there is a ceiling. Ownership lets your work continue producing value without requiring the same unit of effort every time.",
      },

      {
        id: 513,
        sender: "param",
        text:
          "Equity, intellectual property, software, businesses...",
      },

      {
        id: 514,
        sender: "elon",
        text:
          "Anything where the output can scale faster than your personal hours.",
      },

      {
        id: 515,
        sender: "param",
        text:
          "That’s interesting because research is almost the opposite initially. You can spend months creating something that earns nothing.",
      },

      {
        id: 516,
        sender: "elon",
        text:
          "Research creates knowledge. The business question is whether that knowledge lets you do something sufficiently useful that others cannot easily do.",
      },

      {
        id: 517,
        sender: "param",
        text:
          "So research itself isn’t the product.",
      },

      {
        id: 518,
        sender: "elon",
        text:
          "Usually not.",
      },

      {
        id: 519,
        sender: "param",
        text:
          "The capability created by the research might be.",
      },

      {
        id: 520,
        sender: "elon",
        text:
          "Better.",
      },

      {
        id: 521,
        sender: "param",
        text:
          "What about choosing a career purely because it pays extremely well?",
      },

      {
        id: 522,
        sender: "elon",
        text:
          "Nothing inherently wrong with it. But ask what you are accumulating.",
      },

      {
        id: 523,
        sender: "param",
        text:
          "Money?",
      },

      {
        id: 524,
        sender: "elon",
        text:
          "Skills. Knowledge. Reputation. Relationships. Ownership. Judgment. Money is only one column.",
      },

      {
        id: 525,
        sender: "param",
        text:
          "So a lower-paying opportunity could theoretically make me richer eventually?",
      },

      {
        id: 526,
        sender: "elon",
        text:
          "Of course. And the opposite is also true. A very high salary can become expensive if it makes you afraid to leave it.",
      },

      {
        id: 527,
        sender: "param",
        text:
          "Suppose I eventually build a company. What should I optimize for first?",
      },

      {
        id: 528,
        sender: "elon",
        text:
          "Making something useful.",
      },

      {
        id: 529,
        sender: "param",
        text:
          "Not revenue?",
      },

      {
        id: 530,
        sender: "elon",
        text:
          "Revenue is evidence.",
      },

      {
        id: 531,
        sender: "param",
        text:
          "Evidence of what?",
      },

      {
        id: 532,
        sender: "elon",
        text:
          "That somebody values what you made enough to surrender money for it.",
      },

      {
        id: 533,
        sender: "param",
        text:
          "That’s a very aggressive definition of product-market fit.",
      },

      {
        id: 534,
        sender: "elon",
        text:
          "Reality tends to be aggressive.",
      },

      {
        id: 535,
        sender: "param",
        text:
          "People glorify growth a lot. What about profit?",
      },

      {
        id: 536,
        sender: "elon",
        text:
          "A business eventually has to create more economic value than it consumes.",
      },

      {
        id: 537,
        sender: "param",
        text:
          "So growth without economics underneath it is fragile.",
      },

      {
        id: 538,
        sender: "elon",
        text:
          "Growth can hide many sins.",
      },

      {
        id: 539,
        sender: "param",
        text:
          "And profit exposes whether something fundamentally works?",
      },

      {
        id: 540,
        sender: "elon",
        text:
          "Cash has a remarkable ability to end philosophical arguments.",
      },

      {
        id: 541,
        sender: "param",
        text:
          "How do you decide what something should cost?",
      },

      {
        id: 542,
        sender: "elon",
        text:
          "Start with what the problem costs the customer.",
      },

      {
        id: 543,
        sender: "param",
        text:
          "Not what it costs me to build?",
      },

      {
        id: 544,
        sender: "elon",
        text:
          "Both matter, but customers care primarily about what changes for them.",
      },

      {
        id: 545,
        sender: "param",
        text:
          "So if software saves someone ₹1 crore, charging based only on server cost would be ridiculous.",
      },

      {
        id: 546,
        sender: "elon",
        text:
          "Now you understand value-based pricing.",
      },

      {
        id: 547,
        sender: "param",
        text:
          "MBA completed.",
      },

      {
        id: 548,
        sender: "elon",
        text:
          "Unfortunately there are several more slides.",
      },

      {
        id: 549,
        sender: "param",
        text:
          "Then what does “don’t chase money” actually mean?",
      },

      {
        id: 550,
        sender: "elon",
        text:
          "Don’t spend your life running toward whatever currently has the largest number attached to it.",
      },

      {
        id: 551,
        sender: "param",
        text:
          "What should I chase?",
      },

      {
        id: 552,
        sender: "elon",
        text:
          "Difficult problems you care enough about to become unusually good at solving.",
      },

      {
        id: 553,
        sender: "param",
        text:
          "And money follows?",
      },

      {
        id: 554,
        sender: "elon",
        text:
          "Sometimes.",
      },

      {
        id: 555,
        sender: "param",
        text:
          "That’s considerably less motivational.",
      },

      {
        id: 556,
        sender: "elon",
        text:
          "It’s considerably more useful.",
      },

      {
        id: 557,
        sender: "param",
        text:
          "If you were starting again at my age, what would you compound?",
      },

      {
        id: 558,
        sender: "elon",
        text:
          "Your ability to learn.",
      },

      {
        id: 559,
        sender: "param",
        text:
          "Not capital?",
      },

      {
        id: 560,
        sender: "elon",
        text:
          "Capital compounds after you have capital. Judgment can compound before that.",
      },

      {
        id: 561,
        sender: "param",
        text:
          "Judgment about what?",
      },

      {
        id: 562,
        sender: "elon",
        text:
          "People. Technology. Markets. What matters. What doesn’t. When everyone else is wrong. When you are wrong.",
      },

      {
        id: 563,
        sender: "param",
        text:
          "That last one seems expensive.",
      },

      {
        id: 564,
        sender: "elon",
        text:
          "Refusing to learn it is more expensive.",
      },

      {
        id: 565,
        sender: "param",
        text:
          "So the objective isn’t really “make as much money as possible.”",
      },

      {
        id: 566,
        sender: "elon",
        text:
          "That’s a poor objective function.",
      },

      {
        id: 567,
        sender: "param",
        text:
          "Too easy to optimize incorrectly?",
      },

      {
        id: 568,
        sender: "elon",
        text:
          "Exactly.",
      },

      {
        id: 569,
        sender: "param",
        text:
          "Maybe: become capable of creating increasingly valuable things, own part of what I create, and let the economics follow.",
      },

      {
        id: 570,
        sender: "elon",
        text:
          "Much better.",
      },

      {
        id: 571,
        sender: "param",
        text:
          "Still sounds difficult.",
      },

      {
        id: 572,
        sender: "elon",
        text:
          "You keep choosing difficult things.",
      },

      {
        id: 573,
        sender: "param",
        text:
          "Unfortunately.",
      },

      {
        id: 574,
        sender: "elon",
        text:
          "Then at least choose difficult things worth doing.",
        time: "12:42 AM",
      },
    ],
  },

  /* =======================================================
     CREDIT ASSIGNMENT DEPT.
  ======================================================= */

  {
    id: "credit",

    name:
      "Credit Assignment Dept.",

    preview:
      "Learn the fundamentals first.",

    sidebarTime:
      "Oct 2022",

    dateHeading:
      "October 2022",

    meta:
      "Imagined conversation · early ML days",

    members:
      "Param, Geoffrey Hinton & Jürgen Schmidhuber",

    avatarParticipants: [
      PEOPLE.hinton,
      PEOPLE.schmidhuber,
    ],

    participants: [
      PEOPLE.param,
      PEOPLE.hinton,
      PEOPLE.schmidhuber,
    ],

    messages: [
      {
        id: 600,
        sender: "param",
        text:
          "I think I understand neural networks now. You give inputs, calculate an error, backpropagate it, update the weights.",
      },

      {
        id: 601,
        sender: "hinton",
        text:
          "Then you understand the procedure. Not yet the interesting part.",
      },

      {
        id: 602,
        sender: "param",
        text:
          "Which is?",
      },

      {
        id: 603,
        sender: "hinton",
        text:
          "What representation the network learns internally.",
      },

      {
        id: 604,
        sender: "schmidhuber",
        text:
          "And how information and credit travel through many computational steps.",
      },

      {
        id: 605,
        sender: "param",
        text:
          "Isn’t minimizing the loss basically the goal?",
      },

      {
        id: 606,
        sender: "hinton",
        text:
          "The loss tells you whether the answer was wrong. It doesn’t tell you whether the model learned the right reason for being right.",
      },

      {
        id: 607,
        sender: "param",
        text:
          "So low training loss can still mean I learned something useless.",
      },

      {
        id: 608,
        sender: "hinton",
        text:
          "Very easily.",
      },

      {
        id: 609,
        sender: "param",
        text:
          "Why did deep networks used to be so difficult to train?",
      },

      {
        id: 610,
        sender: "schmidhuber",
        text:
          "Imagine receiving an error at the end of a very long chain and asking which event near the beginning caused it.",
      },

      {
        id: 611,
        sender: "param",
        text:
          "The signal gets weaker?",
      },

      {
        id: 612,
        sender: "schmidhuber",
        text:
          "Exactly. Gradients can vanish or explode as they propagate through many steps.",
      },

      {
        id: 613,
        sender: "param",
        text:
          "And that’s why recurrent networks struggled with long-term dependencies?",
      },

      {
        id: 614,
        sender: "schmidhuber",
        text:
          "One major reason.",
      },

      {
        id: 615,
        sender: "hinton",
        text:
          "Depth gives you expressive power, but optimization has to make that depth useful.",
      },

      {
        id: 616,
        sender: "param",
        text:
          "Is reinforcement learning basically the same problem but with actions instead of layers?",
      },

      {
        id: 617,
        sender: "schmidhuber",
        text:
          "That’s a surprisingly useful way to begin thinking about it.",
      },

      {
        id: 618,
        sender: "hinton",
        text:
          "Except now the world is part of the computation.",
      },

      {
        id: 619,
        sender: "param",
        text:
          "Meaning?",
      },

      {
        id: 620,
        sender: "hinton",
        text:
          "In supervised learning, somebody usually gives you the target. In reinforcement learning, you act, wait, observe consequences, and somehow decide which earlier actions deserve credit.",
      },

      {
        id: 621,
        sender: "param",
        text:
          "Temporal credit assignment.",
      },

      {
        id: 622,
        sender: "schmidhuber",
        text:
          "Exactly.",
      },

      {
        id: 623,
        sender: "param",
        text:
          "Why not always choose the action with the highest estimated reward?",
      },

      {
        id: 624,
        sender: "hinton",
        text:
          "Because your estimate might be wrong.",
      },

      {
        id: 625,
        sender: "schmidhuber",
        text:
          "And if you never try alternatives, you may never discover that it is wrong.",
      },

      {
        id: 626,
        sender: "param",
        text:
          "Exploration versus exploitation.",
      },

      {
        id: 627,
        sender: "hinton",
        text:
          "Yes. Exploit what you think you know while collecting enough evidence to discover what you don’t.",
      },

      {
        id: 628,
        sender: "param",
        text:
          "That sounds less like an ML problem and more like life.",
      },

      {
        id: 629,
        sender: "schmidhuber",
        text:
          "Many good learning problems do.",
      },

      {
        id: 630,
        sender: "param",
        text:
          "How do I know whether a model is actually good?",
      },

      {
        id: 631,
        sender: "hinton",
        text:
          "Stop asking how well it remembers the data you gave it.",
      },

      {
        id: 632,
        sender: "param",
        text:
          "Generalization.",
      },

      {
        id: 633,
        sender: "hinton",
        text:
          "Exactly.",
      },

      {
        id: 634,
        sender: "schmidhuber",
        text:
          "A system that performs beautifully only on its training experience has learned the wrong lesson.",
      },

      {
        id: 635,
        sender: "param",
        text:
          "So train performance is evidence that optimization worked. Test performance is evidence that learning worked.",
      },

      {
        id: 636,
        sender: "hinton",
        text:
          "Much better.",
      },

      {
        id: 637,
        sender: "param",
        text:
          "There are way too many things to learn.",
      },

      {
        id: 638,
        sender: "schmidhuber",
        text:
          "Good.",
      },

      {
        id: 639,
        sender: "param",
        text:
          "Good?",
      },

      {
        id: 640,
        sender: "schmidhuber",
        text:
          "Imagine how boring the field would be otherwise.",
      },

      {
        id: 641,
        sender: "hinton",
        text:
          "Learn the fundamentals first. Architectures will keep changing.",
      },

      {
        id: 642,
        sender: "param",
        text:
          "Which fundamentals?",
      },

      {
        id: 643,
        sender: "hinton",
        text:
          "Representation, optimization, generalization, uncertainty.",
      },

      {
        id: 644,
        sender: "schmidhuber",
        text:
          "And credit assignment.",
      },

      {
        id: 645,
        sender: "param",
        text:
          "Of course you were going to say that.",
      },

      {
        id: 646,
        sender: "schmidhuber",
        text:
          "Look at the group name.",
        time: "10:16 PM",
      },
    ],
  },
];

/* =========================================================
   MAIN APP
========================================================= */

export default function MessagesApp() {
  const [
    selectedThread,
    setSelectedThread,
  ] =
    useState<ThreadId>(
      "nouhaila"
    );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    input,
    setInput,
  ] = useState("");

  const [
    localMessages,
    setLocalMessages,
  ] = useState<
    Partial<
      Record<
        ThreadId,
        Message[]
      >
    >
  >({});

  const nextId =
    useRef(10000);

  const endRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const filteredThreads =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return THREADS;
      }

      return THREADS.filter(
        (thread) =>
          thread.name
            .toLowerCase()
            .includes(query) ||
          thread.preview
            .toLowerCase()
            .includes(query) ||
          thread.members
            .toLowerCase()
            .includes(query)
      );
    }, [search]);

  const currentThread =
    THREADS.find(
      (thread) =>
        thread.id ===
        selectedThread
    ) ?? THREADS[0];

  const displayedMessages = [
    ...currentThread.messages,
    ...(
      localMessages[
        selectedThread
      ] ?? []
    ),
  ];

  useEffect(() => {
    endRef.current
      ?.scrollIntoView({
        behavior: "instant",
      });
  }, [
    selectedThread,
  ]);

  useEffect(() => {
    if (
      (
        localMessages[
          selectedThread
        ] ?? []
      ).length > 0
    ) {
      endRef.current
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }
  }, [
    localMessages,
    selectedThread,
  ]);

  const sendMessage = () => {
    const text =
      input.trim();

    if (!text) {
      return;
    }

    const newMessage: Message =
      {
        id:
          nextId.current++,

        sender:
          "param",

        text,

        time:
          "Now",
      };

    setLocalMessages(
      (current) => ({
        ...current,

        [selectedThread]: [
          ...(
            current[
              selectedThread
            ] ?? []
          ),

          newMessage,
        ],
      })
    );

    setInput("");
  };

  return (
    <div className={styles.app}>

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <aside className={styles.sidebar}>

        <div className={styles.sidebarHeader}>

          <h1>
            Messages
          </h1>

          <button
            className={styles.composeButton}
            aria-label="New message"
          >
            <Plus
              size={18}
            />
          </button>

        </div>

        <div className={styles.searchBox}>

          <Search
            size={15}
          />

          <input
            type="text"
            value={search}
            onChange={(
              event
            ) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search"
          />

        </div>

        <div className={styles.threadList}>

          {filteredThreads.map(
            (thread) => (
              <button
                key={thread.id}
                className={
                  `${styles.thread} ${
                    selectedThread ===
                    thread.id
                      ? styles.threadActive
                      : ""
                  }`
                }
                onClick={() =>
                  setSelectedThread(
                    thread.id
                  )
                }
              >

                <AvatarStack
                  people={
                    thread.avatarParticipants
                  }
                  size="sidebar"
                />

                <div className={styles.threadBody}>

                  <div className={styles.threadTop}>

                    <strong>
                      {thread.name}
                    </strong>

                    <span>
                      {thread.sidebarTime}
                    </span>

                  </div>

                  <p>
                    {thread.preview}
                  </p>

                </div>

              </button>
            )
          )}

        </div>

      </aside>

      {/* ===================================================
          CONVERSATION
      =================================================== */}

      <section className={styles.conversation}>

        {/* HEADER */}

        <header className={styles.conversationHeader}>

          <AvatarStack
            people={
              currentThread
                .avatarParticipants
            }
            size="header"
          />

          <div className={styles.headerIdentity}>

            <strong>
              {currentThread.name}
            </strong>

            <span>
              {currentThread.meta}
            </span>

          </div>

          <div className={styles.headerActions}>

            <button
              aria-label="Audio call"
            >
              <Phone
                size={17}
              />
            </button>

            <button
              aria-label="Video call"
            >
              <Video
                size={18}
              />
            </button>

            <button
              aria-label="Conversation information"
            >
              <Info
                size={18}
              />
            </button>

          </div>

        </header>

        {/* MESSAGES */}

        <div className={styles.messageArea}>

          <div className={styles.contactIntro}>

            <AvatarStack
              people={
                currentThread
                  .avatarParticipants
              }
              size="large"
            />

            <strong>
              {currentThread.name}
            </strong>

            <span className={styles.members}>
              {currentThread.members}
            </span>

            <span className={styles.metaLabel}>
              {currentThread.meta}
            </span>

          </div>

          <div className={styles.dateHeading}>
            {currentThread.dateHeading}
          </div>

          <div className={styles.messageStream}>

            {displayedMessages.map(
              (message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  thread={
                    currentThread
                  }
                />
              )
            )}

            <div ref={endRef} />

          </div>

        </div>

        {/* =================================================
            COMPOSER
        ================================================= */}

        <div className={styles.composerArea}>

          <button
            className={styles.addButton}
            aria-label="Add attachment"
          >
            <Plus
              size={18}
            />
          </button>

          <div className={styles.composer}>

            <input
              type="text"
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
                  "Enter"
                ) {
                  sendMessage();
                }
              }}
              placeholder="iMessage"
            />

            {input.trim() ? (
              <button
                className={styles.sendButton}
                onClick={sendMessage}
                aria-label="Send"
              >
                <Send
                  size={15}
                />
              </button>
            ) : (
              <button
                className={styles.micButton}
                aria-label="Audio message"
              >
                <Mic
                  size={17}
                />
              </button>
            )}

          </div>

        </div>

      </section>

    </div>
  );
}

/* =========================================================
   MESSAGE BUBBLE
========================================================= */

function MessageBubble({
  message,
  thread,
}: {
  message: Message;
  thread: Thread;
}) {
  const isParam =
    message.sender ===
    "param";

  const sender =
    thread.participants.find(
      (person) =>
        person.id ===
        message.sender
    );

  return (
    <div
      className={
        `${styles.messageRow} ${
          isParam
            ? styles.paramRow
            : styles.otherRow
        }`
      }
    >

      {!isParam && (
        <div className={styles.incomingMessage}>

          <div className={styles.senderMiniAvatar}>
            {sender?.initials ?? "?"}
          </div>

          <div className={styles.incomingContent}>

            {thread.participants.length > 2 && (
              <div className={styles.senderName}>
                {sender?.name}
              </div>
            )}

            <div className={`${styles.bubble} ${styles.otherBubble}`}>
              {message.text}
            </div>

            {message.time && (
              <div className={styles.incomingTime}>
                {message.time}
              </div>
            )}

          </div>

        </div>
      )}

      {isParam && (
        <>
          <div className={`${styles.bubble} ${styles.paramBubble}`}>
            {message.text}
          </div>

          {message.time && (
            <div className={styles.paramTime}>
              {message.time}
            </div>
          )}
        </>
      )}

    </div>
  );
}

/* =========================================================
   AVATAR STACK
========================================================= */

function AvatarStack({
  people,
  size,
}: {
  people: Participant[];
  size:
    | "sidebar"
    | "header"
    | "large";
}) {
  const visible =
    people.slice(
      0,
      3
    );

  return (
    <div
      className={
        `${styles.avatarStack} ${
          size === "sidebar"
            ? styles.avatarSidebar
            : size === "header"
              ? styles.avatarHeader
              : styles.avatarLarge
        }`
      }
    >

      {visible.map(
        (
          person,
          index
        ) => (
          <div
            key={
              person.id
            }
            className={
              `${styles.avatarCircle} ${
                styles[
                  `avatarTone${
                    (
                      index % 4
                    ) + 1
                  }`
                ]
              }`
            }
          >
            {person.initials}
          </div>
        )
      )}

    </div>
  );
}