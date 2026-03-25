// Current user
export const currentUser = {
  id: 'u1',
  name: 'Alex Morgan',
  title: 'Senior Manager, Strategy & Operations',
  grade: 'M3',
  managerId: 'u10',
  managerName: 'Sarah Chen',
};

// All employees
export const employees = [
  { id: 'u1', name: 'Alex Morgan', title: 'Senior Manager, Strategy & Operations', grade: 'M3', managerId: 'u10', location: 'New York', tenure: '4.5 years', startDate: '2021-09-15', directReports: ['u2', 'u3', 'u4', 'u5'], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u2', name: 'Jordan Lee', title: 'Analyst, Strategy', grade: 'A2', managerId: 'u1', location: 'New York', tenure: '2.1 years', startDate: '2024-01-08', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u3', name: 'Taylor Kim', title: 'Associate, Operations', grade: 'A3', managerId: 'u1', location: 'Chicago', tenure: '3.8 years', startDate: '2022-05-20', directReports: ['u6', 'u7'], mobility: true, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u4', name: 'Casey Rivera', title: 'Senior Analyst, Strategy', grade: 'SA1', managerId: 'u1', location: 'San Francisco', tenure: '1.5 years', startDate: '2024-10-01', directReports: [], mobility: false, internationalRelocation: true, leaveOfAbsence: false },
  { id: 'u5', name: 'Riley Patel', title: 'Associate, Strategy', grade: 'A3', managerId: 'u1', location: 'New York', tenure: '5.2 years', startDate: '2020-11-15', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: true },
  { id: 'u6', name: 'Morgan Chen', title: 'Analyst, Operations', grade: 'A1', managerId: 'u3', location: 'Chicago', tenure: '0.8 years', startDate: '2025-07-10', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u7', name: 'Avery Brooks', title: 'Analyst, Operations', grade: 'A2', managerId: 'u3', location: 'Chicago', tenure: '1.2 years', startDate: '2025-03-01', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u8', name: 'Drew Nakamura', title: 'VP, Product', grade: 'VP1', managerId: 'u10', location: 'San Francisco', tenure: '6.1 years', startDate: '2019-12-02', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u9', name: 'Quinn Okafor', title: 'Director, Engineering', grade: 'D1', managerId: 'u10', location: 'Austin', tenure: '3.3 years', startDate: '2022-12-05', directReports: [], mobility: true, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u10', name: 'Sarah Chen', title: 'SVP, Strategy & Operations', grade: 'SVP', managerId: null, location: 'New York', tenure: '8.4 years', startDate: '2017-09-01', directReports: ['u1', 'u8', 'u9'], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u11', name: 'Jamie Foster', title: 'Manager, Finance', grade: 'M2', managerId: 'u10', location: 'London', tenure: '2.7 years', startDate: '2023-08-15', directReports: [], mobility: false, internationalRelocation: true, leaveOfAbsence: false },
  { id: 'u12', name: 'Skyler Dubois', title: 'Associate, Data Science', grade: 'A3', managerId: 'u9', location: 'Austin', tenure: '1.9 years', startDate: '2024-06-01', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
];

// Historic talent ratings (3 years)
export const historicRatings = {
  u2: {
    what: ['Meets expectations', 'Meets expectations', 'Exceeds expectations'],
    how: ['Meets expectations', 'Exceeds expectations', 'Meets expectations'],
    years: ['2023', '2024', '2025'],
    salary: [72000, 78000, 85000],
  },
  u3: {
    what: ['Exceeds expectations', 'Exceeds expectations', 'Meets expectations'],
    how: ['Meets expectations', 'Meets expectations', 'Exceeds expectations'],
    years: ['2023', '2024', '2025'],
    salary: [88000, 96000, 105000],
  },
  u4: {
    what: ['Meets expectations', null, null],
    how: ['Meets expectations', null, null],
    years: ['2023', '2024', '2025'],
    salary: [95000, null, null],
  },
  u5: {
    what: ['Meets expectations', 'Does not meet expectations', 'Meets expectations'],
    how: ['Exceeds expectations', 'Meets expectations', 'Meets expectations'],
    years: ['2023', '2024', '2025'],
    salary: [82000, 83000, 90000],
  },
};

// Colleague feedback already submitted (for review pages)
export const existingColleagueFeedback = [
  {
    id: 'cf1',
    fromId: 'u8',
    fromName: 'Drew Nakamura',
    toId: 'u1',
    toName: 'Alex Morgan',
    feedback: 'Alex consistently demonstrates exceptional strategic thinking. Their ability to break down complex problems into actionable steps is remarkable. One area for growth would be delegating more effectively to the team rather than taking on too much individually.',
    visibleTo: 'both',
    date: '2026-02-15',
    themes: { strengths: ['Strategic thinking', 'Problem solving'], development: ['Delegation'] },
  },
  {
    id: 'cf2',
    fromId: 'u9',
    fromName: 'Quinn Okafor',
    toId: 'u1',
    toName: 'Alex Morgan',
    feedback: 'Alex is a highly collaborative partner who brings clarity to cross-functional work. They are always prepared and professional. I would encourage Alex to speak up more in senior leadership forums — their perspective is valued.',
    visibleTo: 'both',
    date: '2026-02-20',
    themes: { strengths: ['Collaboration', 'Professionalism'], development: ['Executive presence'] },
  },
  {
    id: 'cf3',
    fromId: 'u11',
    fromName: 'Jamie Foster',
    toId: 'u1',
    toName: 'Alex Morgan',
    feedback: 'Working with Alex on the budget planning process was excellent. They bring strong analytical skills and always meet deadlines. Alex could benefit from providing more regular updates to stakeholders during long-running projects.',
    visibleTo: 'colleague',
    date: '2026-03-01',
    themes: { strengths: ['Analytical skills', 'Reliability'], development: ['Stakeholder communication'] },
  },
  {
    id: 'cf4',
    fromId: 'u1',
    fromName: 'Alex Morgan',
    toId: 'u2',
    toName: 'Jordan Lee',
    feedback: 'Jordan has shown tremendous growth this year. Their analytical capabilities are strong and they consistently deliver quality work. Jordan should focus on building more cross-functional relationships and taking on stretch assignments.',
    visibleTo: 'both',
    date: '2026-01-30',
    themes: { strengths: ['Analytical capabilities', 'Work quality'], development: ['Cross-functional networking'] },
  },
  {
    id: 'cf5',
    fromId: 'u12',
    fromName: 'Skyler Dubois',
    toId: 'u3',
    toName: 'Taylor Kim',
    feedback: 'Taylor is a fantastic team player who goes above and beyond. They have strong operational instincts. Taylor could further develop their data storytelling skills to make presentations even more impactful.',
    visibleTo: 'manager',
    date: '2026-02-25',
    themes: { strengths: ['Teamwork', 'Operational instincts'], development: ['Data storytelling'] },
  },
  {
    id: 'cf6',
    fromId: 'u8',
    fromName: 'Drew Nakamura',
    toId: 'u3',
    toName: 'Taylor Kim',
    feedback: 'Taylor brings energy and positivity to every collaboration. They are quick to learn new concepts and apply them. I would suggest Taylor focus on developing their project management skills for more complex initiatives.',
    visibleTo: 'both',
    date: '2026-03-05',
    themes: { strengths: ['Positive energy', 'Quick learner'], development: ['Project management'] },
  },
  {
    id: 'cf7',
    fromId: 'u11',
    fromName: 'Jamie Foster',
    toId: 'u5',
    toName: 'Riley Patel',
    feedback: 'Riley has deep institutional knowledge and is always willing to help. Their strategic mindset is an asset. Riley could benefit from being more concise in written communications and prioritizing competing deadlines.',
    visibleTo: 'both',
    date: '2026-02-18',
    themes: { strengths: ['Institutional knowledge', 'Strategic mindset'], development: ['Written communication', 'Prioritization'] },
  },
];

// Manager upward feedback (from workflow 2)
export const existingManagerFeedback = {
  u1: {
    respondents: 4,
    totalStaff: 4,
    questions: [
      { text: 'Provides me actionable feedback on my performance', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neutral': 1, 'Agree': 2, 'Strongly Agree': 1 } },
      { text: 'Provides clear, strategic vision for our team', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neutral': 0, 'Agree': 1, 'Strongly Agree': 3 } },
      { text: 'Delegates work appropriately', responses: { 'Strongly Disagree': 0, 'Disagree': 1, 'Neutral': 1, 'Agree': 2, 'Strongly Agree': 0 } },
      { text: 'Fosters an inclusive team culture', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neutral': 0, 'Agree': 1, 'Strongly Agree': 3 } },
      { text: 'Supports my professional development', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neutral': 1, 'Agree': 1, 'Strongly Agree': 2 } },
      { text: 'Communicates expectations clearly', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neutral': 0, 'Agree': 3, 'Strongly Agree': 1 } },
    ],
    nps: { promoters: 3, passives: 1, detractors: 0 },
  },
  u3: {
    respondents: 2,
    totalStaff: 2,
    questions: [
      { text: 'Provides me actionable feedback on my performance', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neutral': 0, 'Agree': 1, 'Strongly Agree': 1 } },
      { text: 'Provides clear, strategic vision for our team', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neutral': 1, 'Agree': 1, 'Strongly Agree': 0 } },
      { text: 'Delegates work appropriately', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neutral': 0, 'Agree': 0, 'Strongly Agree': 2 } },
      { text: 'Fosters an inclusive team culture', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neutral': 0, 'Agree': 1, 'Strongly Agree': 1 } },
      { text: 'Supports my professional development', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neutral': 1, 'Agree': 0, 'Strongly Agree': 1 } },
      { text: 'Communicates expectations clearly', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neutral': 0, 'Agree': 2, 'Strongly Agree': 0 } },
    ],
    nps: { promoters: 1, passives: 1, detractors: 0 },
  },
};

// Talent ratings already submitted
export const existingTalentRatings = {
  u2: { what: null, how: null, submitted: false },
  u3: { what: 'Exceeds expectations', how: 'Exceeds expectations', submitted: true },
  u4: { what: null, how: null, submitted: false },
  u5: { what: 'Meets expectations', how: 'Meets expectations', submitted: true },
};

// Tips for feedback
export const feedbackTips = [
  "Focus on specific behaviors and examples rather than general character traits.",
  "Use the SBI model: describe the Situation, Behavior, and Impact of what you observed.",
  "Balance your feedback — acknowledge strengths while being candid about growth areas.",
  "Write feedback you'd be comfortable receiving. Be honest but respectful.",
  "Timely feedback is most effective. Reference recent examples when possible.",
  "Focus on actions and outcomes, not intentions or personality.",
  "Be specific about what 'good' looks like when suggesting development areas.",
  "Consider the context — what challenges did this person face during the period?",
  "Feedback is a gift. The most helpful feedback is both honest and actionable.",
  "Avoid recency bias — think about the full review period, not just recent events.",
  "Frame development areas as opportunities for growth, not as weaknesses.",
  "Use concrete examples to make your feedback credible and memorable.",
  "Think about how your feedback will help this person in their next role.",
  "Strong feedback answers: What should they keep doing? What should they start doing?",
  "Feedback should reflect patterns, not one-off events. Look for consistent behaviors.",
];

// Best practices for landing page
export const bestPractices = [
  { title: 'Be Specific', description: 'Reference concrete examples and situations when providing feedback to make it actionable.' },
  { title: 'Be Timely', description: 'Provide feedback while events are fresh. Don\'t wait until year-end to share observations.' },
  { title: 'Be Balanced', description: 'Acknowledge both strengths and development areas to give a complete picture.' },
  { title: 'Be Forward-Looking', description: 'Frame feedback in terms of future growth and development opportunities.' },
  { title: 'Be Respectful', description: 'Deliver feedback with empathy and professionalism, focusing on behaviors not personality.' },
  { title: 'Be Consistent', description: 'Apply the same standards across all team members to ensure fairness.' },
];

// Alternative manager reasons
export const altManagerReasons = [
  'Newly assigned to current manager',
  'Functional manager different from direct manager',
  'Manager on extended leave during review period',
  'Organizational restructuring during review period',
  'Dotted-line reporting relationship',
  'Other',
];

// Manager competency questions
export const managerCompetencyQuestions = [
  'Provides me actionable feedback on my performance',
  'Provides clear, strategic vision for our team',
  'Delegates work appropriately',
  'Fosters an inclusive team culture',
  'Supports my professional development',
  'Communicates expectations clearly',
  'Recognizes and celebrates team achievements',
  'Handles conflict fairly and constructively',
];

export const ratingScale = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
  'Unable to Evaluate',
];

export const npsScale = Array.from({ length: 11 }, (_, i) => i);
