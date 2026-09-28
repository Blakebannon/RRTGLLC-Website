export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "We learn how your business operates, where the friction is and which outcome actually matters before discussing any technology.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We determine the simplest technical solution capable of solving the problem, and agree on scope, cost and timeline before building.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We engineer, integrate and test the system, sharing working progress along the way instead of disappearing until launch.",
  },
  {
    number: "04",
    title: "Deploy",
    description:
      "We put it into production and make sure it works in your real operating environment, with your data and your people.",
  },
  {
    number: "05",
    title: "Support",
    description:
      "We maintain, improve and extend the system as your business evolves, so it keeps delivering value after launch.",
  },
];
