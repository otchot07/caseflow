/**
 * Fictional demonstration data for Caseflow.
 * All names, identifiers and events below are invented for demo purposes.
 */

export type CaseStatus = "Awaiting review" | "In review" | "Closed";

export type Person = {
  id: string;
  name: string;
  department: string;
  role: string;
  manager: string;
};

export type CasePerson = {
  personId: string;
  label: "Reporting employee" | "Person mentioned" | "Potential witness";
};

export type EvidenceItem = {
  name: string;
  type: "EMAIL" | "MESSAGE" | "IMAGE" | "DOCUMENT";
  date: string;
  incident: string;
};

export type CaseRecord = {
  id: string;
  subject: string;
  category: string;
  submitted: string;
  submittedRelative: string;
  submittedISO: string;
  peopleCount: number;
  assignedTo: string;
  status: CaseStatus;
  overview: string;
  clarifications: string[];
  reportedImpact: string;
  timeline: { date: string; description: string }[];
  people: CasePerson[];
  evidence: EvidenceItem[];
  review: {
    reviewer: string;
    status: CaseStatus;
    notes: { author: string; date: string; body: string }[];
    lastUpdated: string;
  };
};

export const people: Person[] = [
  {
    id: "EMP-1021",
    name: "Anna Weber",
    department: "Finance",
    role: "Financial Analyst",
    manager: "Petra Lang",
  },
  {
    id: "EMP-1042",
    name: "Daniel Müller",
    department: "Engineering",
    role: "Engineering Manager",
    manager: "Katrin Vogel",
  },
  {
    id: "EMP-1057",
    name: "Sarah Klein",
    department: "Operations",
    role: "Operations Specialist",
    manager: "Marek Novak",
  },
  {
    id: "EMP-1063",
    name: "Jonas Hartmann",
    department: "Engineering",
    role: "Software Engineer",
    manager: "Daniel Müller",
  },
  {
    id: "EMP-1078",
    name: "Lena Fischer",
    department: "Engineering",
    role: "Software Engineer",
    manager: "Daniel Müller",
  },
  {
    id: "EMP-1084",
    name: "Marek Novak",
    department: "Operations",
    role: "Operations Lead",
    manager: "Katrin Vogel",
  },
  {
    id: "EMP-1090",
    name: "Petra Lang",
    department: "Finance",
    role: "Finance Director",
    manager: "Katrin Vogel",
  },
  {
    id: "EMP-1102",
    name: "Tomas Berg",
    department: "Customer Support",
    role: "Support Specialist",
    manager: "Sofia Ruiz",
  },
  {
    id: "EMP-1115",
    name: "Sofia Ruiz",
    department: "Customer Support",
    role: "Support Team Lead",
    manager: "Marek Novak",
  },
  {
    id: "EMP-1121",
    name: "Elias Brandt",
    department: "Marketing",
    role: "Content Specialist",
    manager: "Nina Adler",
  },
  {
    id: "EMP-1133",
    name: "Nina Adler",
    department: "Marketing",
    role: "Marketing Manager",
    manager: "Katrin Vogel",
  },
  {
    id: "EMP-1147",
    name: "Miriam Falk",
    department: "Operations",
    role: "Shift Coordinator",
    manager: "Marek Novak",
  },
];

export const personById = (id: string) => people.find((p) => p.id === id);

const reviewers = [
  "K. Sandberg",
  "M. Petrova",
  "J. Lindqvist",
  "Unassigned",
] as const;

export const cases: CaseRecord[] = [
  {
    id: "HR-2026-0142",
    subject: "Workplace conduct",
    category: "Management conduct",
    submitted: "8 Sep 2026",
    submittedRelative: "Today",
    submittedISO: "2026-09-08",
    peopleCount: 4,
    assignedTo: "Unassigned",
    status: "Awaiting review",
    overview:
      "Employee A reports several disagreements with their manager regarding recent scheduling changes. The employee describes three incidents between June and September, including a reported verbal confrontation on 7 September. Two colleagues are mentioned as potential witnesses.",
    clarifications: [
      "Exact date of the first reported incident is unclear.",
      "Exact wording used during the reported confrontation was not provided.",
      "It is unclear whether the matter was previously reported.",
    ],
    reportedImpact:
      "Employee reports difficulty working and increased stress related to the situation.",
    timeline: [
      { date: "12 June 2026", description: "First reported scheduling disagreement." },
      { date: "18 July 2026", description: "Second reported incident." },
      { date: "24 August 2026", description: "Additional disagreement reported." },
      { date: "7 September 2026", description: "Reported verbal confrontation." },
      { date: "8 September 2026", description: "Report submitted." },
    ],
    people: [
      { personId: "EMP-1063", label: "Reporting employee" },
      { personId: "EMP-1042", label: "Person mentioned" },
      { personId: "EMP-1078", label: "Potential witness" },
      { personId: "EMP-1057", label: "Potential witness" },
    ],
    evidence: [
      { name: "Scheduling email", type: "EMAIL", date: "7 Sep 2026", incident: "Reported verbal confrontation" },
      { name: "Teams conversation", type: "MESSAGE", date: "7 Sep 2026", incident: "Reported verbal confrontation" },
      { name: "Screenshot", type: "IMAGE", date: "7 Sep 2026", incident: "Reported verbal confrontation" },
      { name: "Employee statement", type: "DOCUMENT", date: "8 Sep 2026", incident: "Submitted information" },
    ],
    review: {
      reviewer: "Unassigned",
      status: "Awaiting review",
      notes: [],
      lastUpdated: "8 Sep 2026, 09:14",
    },
  },
  {
    id: "HR-2026-0141",
    subject: "Scheduling concern",
    category: "Scheduling concern",
    submitted: "7 Sep 2026",
    submittedRelative: "Yesterday",
    submittedISO: "2026-09-07",
    peopleCount: 3,
    assignedTo: "K. Sandberg",
    status: "In review",
    overview:
      "Employee reports repeated short-notice changes to weekend shifts over a six-week period. The employee states the changes were communicated verbally and describes a resulting difficulty in planning care responsibilities.",
    clarifications: [
      "Number of affected shifts is approximate.",
      "It is unclear whether written shift plans were issued.",
    ],
    reportedImpact:
      "Employee reports difficulty planning personal obligations and reduced predictability of working hours.",
    timeline: [
      { date: "20 July 2026", description: "First reported short-notice shift change." },
      { date: "15 August 2026", description: "Further changes reported." },
      { date: "5 September 2026", description: "Employee raised the matter with the shift coordinator." },
      { date: "7 September 2026", description: "Report submitted." },
    ],
    people: [
      { personId: "EMP-1057", label: "Reporting employee" },
      { personId: "EMP-1147", label: "Person mentioned" },
      { personId: "EMP-1084", label: "Potential witness" },
    ],
    evidence: [
      { name: "Shift plan comparison", type: "DOCUMENT", date: "5 Sep 2026", incident: "Reported shift changes" },
      { name: "Coordinator message", type: "MESSAGE", date: "5 Sep 2026", incident: "Reported shift changes" },
    ],
    review: {
      reviewer: "K. Sandberg",
      status: "In review",
      notes: [
        {
          author: "K. Sandberg",
          date: "7 Sep 2026, 15:40",
          body: "Initial intake read. Requesting written shift plans from Operations before scheduling a conversation.",
        },
      ],
      lastUpdated: "7 Sep 2026, 15:40",
    },
  },
  {
    id: "HR-2026-0139",
    subject: "Workplace conflict",
    category: "Workplace conflict",
    submitted: "5 Sep 2026",
    submittedRelative: "5 Sep",
    submittedISO: "2026-09-05",
    peopleCount: 2,
    assignedTo: "M. Petrova",
    status: "In review",
    overview:
      "Employee describes an ongoing disagreement with a colleague about task ownership within a shared project. Two conversations are reported, one of which the employee describes as raised voices in an open office area.",
    clarifications: [
      "It is unclear whether a team lead was present during the second conversation.",
    ],
    reportedImpact: "Employee reports discomfort during shared project meetings.",
    timeline: [
      { date: "26 August 2026", description: "First reported disagreement about task ownership." },
      { date: "2 September 2026", description: "Second reported conversation in open office area." },
      { date: "5 September 2026", description: "Report submitted." },
    ],
    people: [
      { personId: "EMP-1078", label: "Reporting employee" },
      { personId: "EMP-1063", label: "Person mentioned" },
    ],
    evidence: [
      { name: "Project task list", type: "DOCUMENT", date: "2 Sep 2026", incident: "Task ownership disagreement" },
    ],
    review: {
      reviewer: "M. Petrova",
      status: "In review",
      notes: [
        {
          author: "M. Petrova",
          date: "6 Sep 2026, 10:05",
          body: "Both individuals invited to separate conversations next week.",
        },
      ],
      lastUpdated: "6 Sep 2026, 10:05",
    },
  },
  {
    id: "HR-2026-0138",
    subject: "Communication issue",
    category: "Communication issue",
    submitted: "4 Sep 2026",
    submittedRelative: "4 Sep",
    submittedISO: "2026-09-04",
    peopleCount: 2,
    assignedTo: "J. Lindqvist",
    status: "Closed",
    overview:
      "Employee reports that feedback in written channels was perceived as abrupt. The employee states no further incidents occurred after a team conversation in late August.",
    clarifications: ["No outstanding clarifications recorded."],
    reportedImpact: "Employee reports initial discomfort, later described as resolved.",
    timeline: [
      { date: "11 August 2026", description: "Reported written feedback exchange." },
      { date: "27 August 2026", description: "Team conversation held." },
      { date: "4 September 2026", description: "Report submitted." },
      { date: "9 September 2026", description: "Case closed after review conversation." },
    ],
    people: [
      { personId: "EMP-1121", label: "Reporting employee" },
      { personId: "EMP-1133", label: "Person mentioned" },
    ],
    evidence: [
      { name: "Message thread", type: "MESSAGE", date: "11 Aug 2026", incident: "Written feedback exchange" },
    ],
    review: {
      reviewer: "J. Lindqvist",
      status: "Closed",
      notes: [
        {
          author: "J. Lindqvist",
          date: "9 Sep 2026, 11:20",
          body: "Conversation held with both parties. No further action requested by the reporting employee.",
        },
      ],
      lastUpdated: "9 Sep 2026, 11:20",
    },
  },
  {
    id: "HR-2026-0137",
    subject: "Interpersonal conflict",
    category: "Interpersonal conflict",
    submitted: "1 Sep 2026",
    submittedRelative: "1 Sep",
    submittedISO: "2026-09-01",
    peopleCount: 3,
    assignedTo: "K. Sandberg",
    status: "In review",
    overview:
      "Employee reports recurring tension with a colleague during shift handovers, including disagreement about handover documentation.",
    clarifications: [
      "Frequency of the reported handover disagreements is not specified.",
    ],
    reportedImpact: "Employee reports reluctance to work overlapping shifts.",
    timeline: [
      { date: "14 August 2026", description: "First reported handover disagreement." },
      { date: "29 August 2026", description: "Further disagreement reported." },
      { date: "1 September 2026", description: "Report submitted." },
    ],
    people: [
      { personId: "EMP-1102", label: "Reporting employee" },
      { personId: "EMP-1147", label: "Person mentioned" },
      { personId: "EMP-1115", label: "Potential witness" },
    ],
    evidence: [
      { name: "Handover log", type: "DOCUMENT", date: "29 Aug 2026", incident: "Handover disagreement" },
    ],
    review: {
      reviewer: "K. Sandberg",
      status: "In review",
      notes: [],
      lastUpdated: "2 Sep 2026, 08:45",
    },
  },
  {
    id: "HR-2026-0136",
    subject: "Employee relations",
    category: "Employee relations",
    submitted: "28 Aug 2026",
    submittedRelative: "28 Aug",
    submittedISO: "2026-08-28",
    peopleCount: 2,
    assignedTo: "Unassigned",
    status: "Awaiting review",
    overview:
      "Employee reports uncertainty about how a recent role change was communicated within the team and asks for clarification of the process followed.",
    clarifications: [
      "Date of the internal announcement is not provided.",
      "It is unclear which documents the employee received.",
    ],
    reportedImpact: "Employee reports uncertainty about current responsibilities.",
    timeline: [
      { date: "19 August 2026", description: "Reported role change conversation." },
      { date: "28 August 2026", description: "Report submitted." },
    ],
    people: [
      { personId: "EMP-1021", label: "Reporting employee" },
      { personId: "EMP-1090", label: "Person mentioned" },
    ],
    evidence: [],
    review: {
      reviewer: "Unassigned",
      status: "Awaiting review",
      notes: [],
      lastUpdated: "28 Aug 2026, 16:02",
    },
  },
  {
    id: "HR-2026-0135",
    subject: "Scheduling concern",
    category: "Scheduling concern",
    submitted: "24 Aug 2026",
    submittedRelative: "24 Aug",
    submittedISO: "2026-08-24",
    peopleCount: 2,
    assignedTo: "M. Petrova",
    status: "Closed",
    overview:
      "Employee reports that holiday requests were approved later than the team norm and asks whether a consistent process is applied.",
    clarifications: ["No outstanding clarifications recorded."],
    reportedImpact: "Employee reports difficulty confirming travel arrangements.",
    timeline: [
      { date: "2 August 2026", description: "Holiday request submitted." },
      { date: "20 August 2026", description: "Approval received." },
      { date: "24 August 2026", description: "Report submitted." },
      { date: "30 August 2026", description: "Case closed after process clarification." },
    ],
    people: [
      { personId: "EMP-1147", label: "Reporting employee" },
      { personId: "EMP-1084", label: "Person mentioned" },
    ],
    evidence: [
      { name: "Request confirmation", type: "EMAIL", date: "20 Aug 2026", incident: "Holiday approval" },
    ],
    review: {
      reviewer: "M. Petrova",
      status: "Closed",
      notes: [
        {
          author: "M. Petrova",
          date: "30 Aug 2026, 13:15",
          body: "Process explained to the employee. Operations will document approval timelines going forward.",
        },
      ],
      lastUpdated: "30 Aug 2026, 13:15",
    },
  },
  {
    id: "HR-2026-0134",
    subject: "Management conduct",
    category: "Management conduct",
    submitted: "20 Aug 2026",
    submittedRelative: "20 Aug",
    submittedISO: "2026-08-20",
    peopleCount: 4,
    assignedTo: "J. Lindqvist",
    status: "In review",
    overview:
      "Employee reports that performance feedback was given in the presence of colleagues on two occasions and describes the tone as dismissive.",
    clarifications: [
      "Exact dates of the two occasions are approximate.",
      "It is unclear whether written feedback exists.",
    ],
    reportedImpact: "Employee reports reduced confidence during team meetings.",
    timeline: [
      { date: "7 July 2026", description: "First reported feedback conversation." },
      { date: "5 August 2026", description: "Second reported feedback conversation." },
      { date: "20 August 2026", description: "Report submitted." },
    ],
    people: [
      { personId: "EMP-1102", label: "Reporting employee" },
      { personId: "EMP-1115", label: "Person mentioned" },
      { personId: "EMP-1057", label: "Potential witness" },
      { personId: "EMP-1147", label: "Potential witness" },
    ],
    evidence: [
      { name: "Meeting invitation", type: "EMAIL", date: "5 Aug 2026", incident: "Second feedback conversation" },
    ],
    review: {
      reviewer: "J. Lindqvist",
      status: "In review",
      notes: [
        {
          author: "J. Lindqvist",
          date: "22 Aug 2026, 09:30",
          body: "Awaiting availability of the reporting employee for an initial conversation.",
        },
      ],
      lastUpdated: "22 Aug 2026, 09:30",
    },
  },
  {
    id: "HR-2026-0133",
    subject: "Workplace conflict",
    category: "Workplace conflict",
    submitted: "14 Aug 2026",
    submittedRelative: "14 Aug",
    submittedISO: "2026-08-14",
    peopleCount: 3,
    assignedTo: "K. Sandberg",
    status: "Closed",
    overview:
      "Employee reports a disagreement about shared workspace arrangements that escalated during a team meeting.",
    clarifications: ["No outstanding clarifications recorded."],
    reportedImpact: "Employee reports discomfort in the shared workspace.",
    timeline: [
      { date: "30 July 2026", description: "Reported disagreement about desk arrangements." },
      { date: "12 August 2026", description: "Reported escalation during team meeting." },
      { date: "14 August 2026", description: "Report submitted." },
      { date: "26 August 2026", description: "Case closed after mediated conversation." },
    ],
    people: [
      { personId: "EMP-1021", label: "Reporting employee" },
      { personId: "EMP-1090", label: "Person mentioned" },
      { personId: "EMP-1121", label: "Potential witness" },
    ],
    evidence: [
      { name: "Workspace plan", type: "IMAGE", date: "30 Jul 2026", incident: "Desk arrangement disagreement" },
    ],
    review: {
      reviewer: "K. Sandberg",
      status: "Closed",
      notes: [
        {
          author: "K. Sandberg",
          date: "26 Aug 2026, 14:10",
          body: "Mediated conversation held. Both parties agreed on a revised arrangement.",
        },
      ],
      lastUpdated: "26 Aug 2026, 14:10",
    },
  },
  {
    id: "HR-2026-0131",
    subject: "Communication issue",
    category: "Communication issue",
    submitted: "6 Aug 2026",
    submittedRelative: "6 Aug",
    submittedISO: "2026-08-06",
    peopleCount: 2,
    assignedTo: "Unassigned",
    status: "Awaiting review",
    overview:
      "Employee reports that project updates were shared selectively within the team and asks for clarification of the information flow.",
    clarifications: [
      "It is unclear which updates the employee did not receive.",
      "Names of other affected colleagues were not provided.",
    ],
    reportedImpact: "Employee reports difficulty preparing for client conversations.",
    timeline: [
      { date: "22 July 2026", description: "Reported missing project update." },
      { date: "6 August 2026", description: "Report submitted." },
    ],
    people: [
      { personId: "EMP-1121", label: "Reporting employee" },
      { personId: "EMP-1133", label: "Person mentioned" },
    ],
    evidence: [],
    review: {
      reviewer: "Unassigned",
      status: "Awaiting review",
      notes: [],
      lastUpdated: "6 Aug 2026, 17:25",
    },
  },
];

export const caseById = (id: string) => cases.find((c) => c.id === id);

export const casesForPerson = (personId: string) =>
  cases.filter((c) => c.people.some((p) => p.personId === personId));

export const overviewStats = [
  { label: "Open cases", value: 12 },
  { label: "Awaiting review", value: 4 },
  { label: "In review", value: 6 },
  { label: "Closed", value: 18 },
];

export const reviewerOptions = reviewers;

export const categories = [
  "Workplace conflict",
  "Scheduling concern",
  "Management conduct",
  "Communication issue",
  "Interpersonal conflict",
  "Employee relations",
];

export const casesByCategory = [
  { category: "Workplace conflict", count: 7 },
  { category: "Scheduling concern", count: 6 },
  { category: "Management conduct", count: 5 },
  { category: "Communication issue", count: 4 },
  { category: "Interpersonal conflict", count: 3 },
  { category: "Employee relations", count: 2 },
];

export const casesByStatus = [
  { status: "Awaiting review", count: 4 },
  { status: "In review", count: 6 },
  { status: "Closed", count: 18 },
];

export const casesOverTime = [
  { month: "Mar", submitted: 3, closed: 2 },
  { month: "Apr", submitted: 5, closed: 3 },
  { month: "May", submitted: 4, closed: 4 },
  { month: "Jun", submitted: 6, closed: 4 },
  { month: "Jul", submitted: 5, closed: 5 },
  { month: "Aug", submitted: 7, closed: 4 },
  { month: "Sep", submitted: 4, closed: 2 },
];

/** Employee intake script used by the guided reporting experience. */
export const intakeQuestions = [
  "Let's start with the situation. What happened?",
  "When did you first notice the issue?",
  "Who was involved?",
  "Did anyone else witness what happened?",
  "Do you have any emails, messages, documents or other material related to the situation?",
  "How has the situation affected your work?",
  "Has this matter been reported or discussed before?",
  "Is there anything else you would like the reviewer to know?",
];
