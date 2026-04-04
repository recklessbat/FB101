// Current user
export const currentUser = {
  id: 'u1',
  name: 'Alex Morgan',
  title: 'Senior Manager, Strategy & Operations',
  grade: 'M3',
  managerId: 'u10',
  managerName: 'Sarah Chen',
  altManagerId: 'u8',
  altManagerName: 'Drew Nakamura',
};

// All employees
export const employees = [
  { id: 'u1', name: 'Alex Morgan', title: 'Senior Manager, Strategy & Operations', grade: 'M3', lob: 'Strategy & Operations', managerId: 'u10', location: 'New York', tenure: '4.5 years', startDate: '2021-09-15', directReports: ['u2', 'u3', 'u4', 'u5', 'u13', 'u14', 'u15'], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u2', name: 'Jordan Lee', title: 'Analyst, Strategy', grade: 'A2', lob: 'Strategy & Operations', managerId: 'u1', location: 'New York', tenure: '2.1 years', startDate: '2024-01-08', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u3', name: 'Taylor Kim', title: 'Associate Manager, Operations', grade: 'M1', lob: 'Operations', managerId: 'u1', location: 'Chicago', tenure: '3.8 years', startDate: '2022-05-20', directReports: ['u6', 'u7', 'u16'], mobility: true, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u4', name: 'Casey Rivera', title: 'Senior Analyst, Strategy', grade: 'SA1', lob: 'Strategy & Operations', managerId: 'u1', location: 'San Francisco', tenure: '1.5 years', startDate: '2024-10-01', directReports: [], mobility: false, internationalRelocation: true, leaveOfAbsence: false },
  { id: 'u5', name: 'Riley Patel', title: 'Associate, Strategy', grade: 'A3', lob: 'Strategy & Operations', managerId: 'u1', location: 'New York', tenure: '5.2 years', startDate: '2020-11-15', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: true },
  { id: 'u6', name: 'Morgan Chen', title: 'Analyst, Operations', grade: 'A1', lob: 'Operations', managerId: 'u3', location: 'Chicago', tenure: '0.8 years', startDate: '2025-07-10', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u7', name: 'Avery Brooks', title: 'Analyst, Operations', grade: 'A2', lob: 'Operations', managerId: 'u3', location: 'Chicago', tenure: '1.2 years', startDate: '2025-03-01', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u8', name: 'Drew Nakamura', title: 'VP, Product', grade: 'VP1', lob: 'Product', managerId: 'u10', location: 'San Francisco', tenure: '6.1 years', startDate: '2019-12-02', directReports: ['u17', 'u18'], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u9', name: 'Quinn Okafor', title: 'Director, Engineering', grade: 'D1', lob: 'Engineering', managerId: 'u10', location: 'Austin', tenure: '3.3 years', startDate: '2022-12-05', directReports: ['u19', 'u20'], mobility: true, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u10', name: 'Sarah Chen', title: 'SVP, Strategy & Operations', grade: 'SVP', lob: 'Strategy & Operations', managerId: null, location: 'New York', tenure: '8.4 years', startDate: '2017-09-01', directReports: ['u1', 'u8', 'u9', 'u11'], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u11', name: 'Jamie Foster', title: 'Manager, Finance', grade: 'M2', lob: 'Finance', managerId: 'u10', location: 'London', tenure: '2.7 years', startDate: '2023-08-15', directReports: ['u21'], mobility: false, internationalRelocation: true, leaveOfAbsence: false },
  { id: 'u12', name: 'Skyler Dubois', title: 'Associate, Data Science', grade: 'A3', lob: 'Engineering', managerId: 'u9', location: 'Austin', tenure: '1.9 years', startDate: '2024-06-01', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u13', name: 'Priya Sharma', title: 'Senior Analyst, Operations', grade: 'SA1', lob: 'Strategy & Operations', managerId: 'u1', location: 'New York', tenure: '2.9 years', startDate: '2023-04-10', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u14', name: 'Marcus Williams', title: 'Analyst, Strategy', grade: 'A2', lob: 'Strategy & Operations', managerId: 'u1', location: 'Chicago', tenure: '1.3 years', startDate: '2024-11-20', directReports: [], mobility: true, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u15', name: 'Elena Vasquez', title: 'Associate, Operations', grade: 'A3', lob: 'Strategy & Operations', managerId: 'u1', location: 'San Francisco', tenure: '3.1 years', startDate: '2023-02-01', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u16', name: 'Sam Okonkwo', title: 'Analyst, Operations', grade: 'A1', lob: 'Operations', managerId: 'u3', location: 'Chicago', tenure: '0.5 years', startDate: '2025-10-15', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u17', name: 'Lena Park', title: 'Senior Product Manager', grade: 'M2', lob: 'Product', managerId: 'u8', location: 'San Francisco', tenure: '4.0 years', startDate: '2022-03-14', directReports: ['u22'], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u18', name: 'Raj Mehta', title: 'Product Manager', grade: 'M1', lob: 'Product', managerId: 'u8', location: 'San Francisco', tenure: '2.2 years', startDate: '2024-01-22', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u19', name: 'Natasha Volkov', title: 'Senior Software Engineer', grade: 'SA2', lob: 'Engineering', managerId: 'u9', location: 'Austin', tenure: '3.0 years', startDate: '2023-03-15', directReports: [], mobility: false, internationalRelocation: true, leaveOfAbsence: false },
  { id: 'u20', name: 'Diego Santos', title: 'Software Engineer', grade: 'A3', lob: 'Engineering', managerId: 'u9', location: 'Austin', tenure: '1.6 years', startDate: '2024-09-01', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u21', name: 'Hannah O\'Brien', title: 'Financial Analyst', grade: 'A2', lob: 'Finance', managerId: 'u11', location: 'London', tenure: '1.1 years', startDate: '2025-02-10', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
  { id: 'u22', name: 'Chris Tanaka', title: 'Associate Product Manager', grade: 'A3', lob: 'Product', managerId: 'u17', location: 'San Francisco', tenure: '0.9 years', startDate: '2025-06-20', directReports: [], mobility: false, internationalRelocation: false, leaveOfAbsence: false },
];

// Helper: count total org size under a manager (recursive)
export function getTotalReports(employeeId) {
  const emp = employees.find((e) => e.id === employeeId);
  if (!emp || emp.directReports.length === 0) return 0;
  let total = emp.directReports.length;
  emp.directReports.forEach((drId) => {
    total += getTotalReports(drId);
  });
  return total;
}

// Career timeline events per employee
export const careerTimelines = {
  u2: [
    { date: '2024-01-08', type: 'joined', description: 'Joined as Analyst, Strategy (A1)' },
    { date: '2024-07-01', type: 'promotion', description: 'Promoted to A2' },
    { date: '2025-03-15', type: 'manager_change', description: 'Manager changed from Jamie Foster to Alex Morgan' },
  ],
  u3: [
    { date: '2022-05-20', type: 'joined', description: 'Joined as Analyst, Operations (A1)' },
    { date: '2023-01-10', type: 'promotion', description: 'Promoted to A2' },
    { date: '2023-09-01', type: 'role_change', description: 'Moved to Associate, Operations (A3)' },
    { date: '2024-03-15', type: 'relocation', description: 'Relocated from New York to Chicago' },
    { date: '2024-11-01', type: 'promotion', description: 'Promoted to Associate Manager, Operations (M1)' },
    { date: '2025-06-01', type: 'mobility', description: 'Completed rotation in Supply Chain division' },
  ],
  u4: [
    { date: '2024-10-01', type: 'joined', description: 'Joined as Senior Analyst, Strategy (SA1)' },
    { date: '2025-02-15', type: 'relocation', description: 'International relocation from London to San Francisco' },
  ],
  u5: [
    { date: '2020-11-15', type: 'joined', description: 'Joined as Analyst, Strategy (A1)' },
    { date: '2021-06-01', type: 'promotion', description: 'Promoted to A2' },
    { date: '2022-04-01', type: 'role_change', description: 'Moved to Associate, Strategy (A3)' },
    { date: '2023-01-15', type: 'manager_change', description: 'Manager changed from Drew Nakamura to Alex Morgan' },
    { date: '2025-01-10', type: 'leave', description: 'Started parental leave of absence' },
    { date: '2025-07-10', type: 'return', description: 'Returned from leave of absence' },
  ],
  u13: [
    { date: '2023-04-10', type: 'joined', description: 'Joined as Analyst, Operations (A2)' },
    { date: '2024-04-01', type: 'promotion', description: 'Promoted to Senior Analyst (SA1)' },
    { date: '2024-09-01', type: 'role_change', description: 'Transitioned from Operations Analytics to Strategy Operations' },
  ],
  u14: [
    { date: '2024-11-20', type: 'joined', description: 'Joined as Analyst, Strategy (A2)' },
    { date: '2025-06-01', type: 'mobility', description: 'Completed short-term assignment in Chicago office' },
  ],
  u15: [
    { date: '2023-02-01', type: 'joined', description: 'Joined as Analyst, Operations (A1)' },
    { date: '2023-08-01', type: 'promotion', description: 'Promoted to A2' },
    { date: '2024-06-15', type: 'role_change', description: 'Moved to Associate, Operations (A3)' },
    { date: '2025-01-01', type: 'relocation', description: 'Relocated from New York to San Francisco' },
  ],
};

// Historic talent ratings (3 years) with compensation
export const historicRatings = {
  u2: {
    what: ['Meets expectations', 'Meets expectations', 'Exceeds expectations'],
    how: ['Meets expectations', 'Exceeds expectations', 'Meets expectations'],
    years: ['2023', '2024', '2025'],
    salary: [72000, 78000, 85000],
    bonus: [5400, 7800, 10200],
  },
  u3: {
    what: ['Exceeds expectations', 'Exceeds expectations', 'Meets expectations'],
    how: ['Meets expectations', 'Meets expectations', 'Exceeds expectations'],
    years: ['2023', '2024', '2025'],
    salary: [88000, 96000, 105000],
    bonus: [13200, 16800, 15750],
  },
  u4: {
    what: ['Meets expectations', null, null],
    how: ['Meets expectations', null, null],
    years: ['2023', '2024', '2025'],
    salary: [95000, null, null],
    bonus: [9500, null, null],
  },
  u5: {
    what: ['Meets expectations', 'Does not meet expectations', 'Meets expectations'],
    how: ['Exceeds expectations', 'Meets expectations', 'Meets expectations'],
    years: ['2023', '2024', '2025'],
    salary: [82000, 83000, 90000],
    bonus: [8200, 4150, 9000],
  },
  u13: {
    what: ['Meets expectations', 'Exceeds expectations', null],
    how: ['Meets expectations', 'Meets expectations', null],
    years: ['2023', '2024', '2025'],
    salary: [76000, 88000, null],
    bonus: [5700, 11000, null],
  },
  u14: {
    what: [null, null, null],
    how: [null, null, null],
    years: ['2023', '2024', '2025'],
    salary: [null, null, null],
    bonus: [null, null, null],
  },
  u15: {
    what: ['Meets expectations', 'Meets expectations', 'Meets expectations'],
    how: ['Meets expectations', 'Does not meet expectations', 'Meets expectations'],
    years: ['2023', '2024', '2025'],
    salary: [68000, 70000, 78000],
    bonus: [5100, 3500, 7800],
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
  {
    id: 'cf8',
    fromId: 'u9',
    fromName: 'Quinn Okafor',
    toId: 'u13',
    toName: 'Priya Sharma',
    feedback: 'Priya is a strong analytical thinker who consistently delivers thorough and well-reasoned work. She takes initiative on complex projects and is reliable under pressure. Priya could benefit from developing more confidence in presenting her ideas to senior leaders.',
    visibleTo: 'both',
    date: '2026-02-28',
    themes: { strengths: ['Analytical thinking', 'Initiative'], development: ['Presentation confidence'] },
  },
  {
    id: 'cf9',
    fromId: 'u13',
    fromName: 'Priya Sharma',
    toId: 'u14',
    toName: 'Marcus Williams',
    feedback: 'Marcus has quickly ramped up since joining the team and shows great curiosity. He asks thoughtful questions and contributes meaningfully to strategy discussions. Marcus would benefit from developing a deeper understanding of our operational processes.',
    visibleTo: 'both',
    date: '2026-03-10',
    themes: { strengths: ['Quick ramp-up', 'Curiosity'], development: ['Operational understanding'] },
  },
  {
    id: 'cf10',
    fromId: 'u4',
    fromName: 'Casey Rivera',
    toId: 'u15',
    toName: 'Elena Vasquez',
    feedback: 'Elena is highly organized and brings structure to every project she touches. Her process improvements in Q4 saved the team significant time. Elena could work on being more vocal in team meetings and sharing her ideas earlier in the brainstorming process.',
    visibleTo: 'manager',
    date: '2026-03-02',
    themes: { strengths: ['Organization', 'Process improvement'], development: ['Speaking up in meetings'] },
  },
  {
    id: 'cf11',
    fromId: 'u15',
    fromName: 'Elena Vasquez',
    toId: 'u4',
    toName: 'Casey Rivera',
    feedback: 'Casey brings a fresh international perspective that enriches our team discussions. Their analytical rigor is exceptional, and they are not afraid to challenge assumptions constructively. Casey could focus on building stronger relationships with partner teams outside Strategy.',
    visibleTo: 'both',
    date: '2026-03-08',
    themes: { strengths: ['International perspective', 'Analytical rigor'], development: ['Relationship building'] },
  },
  {
    id: 'cf12',
    fromId: 'u2',
    fromName: 'Jordan Lee',
    toId: 'u13',
    toName: 'Priya Sharma',
    feedback: 'Priya is an outstanding mentor and collaborator. She proactively shares knowledge and helps onboard new team members. Priya should consider taking on more visible leadership roles in cross-team initiatives.',
    visibleTo: 'both',
    date: '2026-02-22',
    themes: { strengths: ['Mentorship', 'Knowledge sharing'], development: ['Leadership visibility'] },
  },
];

// Manager upward feedback (from workflow 2)
export const existingManagerFeedback = {
  u1: {
    respondents: 6,
    totalStaff: 7,
    questions: [
      { text: 'Provides me actionable feedback on my performance', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 1, 'Agree': 3, 'Strongly Agree': 2 } },
      { text: 'Provides clear, strategic vision for our team', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 2, 'Strongly Agree': 4 } },
      { text: 'Delegates work appropriately', responses: { 'Strongly Disagree': 0, 'Disagree': 1, 'Neither Disagree, Nor Agree': 1, 'Agree': 3, 'Strongly Agree': 1 } },
      { text: 'Fosters an inclusive team culture', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 5 } },
      { text: 'Supports my professional development', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 1, 'Agree': 2, 'Strongly Agree': 3 } },
      { text: 'Communicates expectations clearly', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 1, 'Agree': 3, 'Strongly Agree': 2 } },
    ],
    nps: { promoters: 4, passives: 1, detractors: 1 },
  },
  u3: {
    respondents: 3,
    totalStaff: 3,
    questions: [
      { text: 'Provides me actionable feedback on my performance', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 2, 'Strongly Agree': 1 } },
      { text: 'Provides clear, strategic vision for our team', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 1, 'Agree': 1, 'Strongly Agree': 1 } },
      { text: 'Delegates work appropriately', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 2 } },
      { text: 'Fosters an inclusive team culture', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 2 } },
      { text: 'Supports my professional development', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 1, 'Agree': 1, 'Strongly Agree': 1 } },
      { text: 'Communicates expectations clearly', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 2, 'Strongly Agree': 1 } },
    ],
    nps: { promoters: 2, passives: 1, detractors: 0 },
  },
  u8: {
    respondents: 2,
    totalStaff: 2,
    questions: [
      { text: 'Provides me actionable feedback on my performance', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 1 } },
      { text: 'Provides clear, strategic vision for our team', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 0, 'Strongly Agree': 2 } },
      { text: 'Delegates work appropriately', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 1, 'Agree': 1, 'Strongly Agree': 0 } },
      { text: 'Fosters an inclusive team culture', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 1 } },
      { text: 'Supports my professional development', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 2, 'Strongly Agree': 0 } },
      { text: 'Communicates expectations clearly', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 1 } },
    ],
    nps: { promoters: 2, passives: 0, detractors: 0 },
  },
  u9: {
    respondents: 2,
    totalStaff: 2,
    questions: [
      { text: 'Provides me actionable feedback on my performance', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 1, 'Agree': 1, 'Strongly Agree': 0 } },
      { text: 'Provides clear, strategic vision for our team', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 1 } },
      { text: 'Delegates work appropriately', responses: { 'Strongly Disagree': 0, 'Disagree': 1, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 0 } },
      { text: 'Fosters an inclusive team culture', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 0, 'Strongly Agree': 2 } },
      { text: 'Supports my professional development', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 2, 'Strongly Agree': 0 } },
      { text: 'Communicates expectations clearly', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 1, 'Agree': 0, 'Strongly Agree': 1 } },
    ],
    nps: { promoters: 1, passives: 1, detractors: 0 },
  },
  u10: {
    respondents: 4,
    totalStaff: 4,
    questions: [
      { text: 'Provides me actionable feedback on my performance', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 1, 'Agree': 1, 'Strongly Agree': 2 } },
      { text: 'Provides clear, strategic vision for our team', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 3 } },
      { text: 'Delegates work appropriately', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 2, 'Strongly Agree': 2 } },
      { text: 'Fosters an inclusive team culture', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 1, 'Agree': 1, 'Strongly Agree': 2 } },
      { text: 'Supports my professional development', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 2, 'Strongly Agree': 2 } },
      { text: 'Communicates expectations clearly', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 3 } },
    ],
    nps: { promoters: 3, passives: 1, detractors: 0 },
  },
  u11: {
    respondents: 1,
    totalStaff: 1,
    questions: [
      { text: 'Provides me actionable feedback on my performance', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 0 } },
      { text: 'Provides clear, strategic vision for our team', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 0, 'Strongly Agree': 1 } },
      { text: 'Delegates work appropriately', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 0 } },
      { text: 'Fosters an inclusive team culture', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 0, 'Strongly Agree': 1 } },
      { text: 'Supports my professional development', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 1, 'Agree': 0, 'Strongly Agree': 0 } },
      { text: 'Communicates expectations clearly', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 0 } },
    ],
    nps: { promoters: 0, passives: 1, detractors: 0 },
  },
  u17: {
    respondents: 1,
    totalStaff: 1,
    questions: [
      { text: 'Provides me actionable feedback on my performance', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 0, 'Strongly Agree': 1 } },
      { text: 'Provides clear, strategic vision for our team', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 0 } },
      { text: 'Delegates work appropriately', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 0, 'Strongly Agree': 1 } },
      { text: 'Fosters an inclusive team culture', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 0 } },
      { text: 'Supports my professional development', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 1, 'Strongly Agree': 0 } },
      { text: 'Communicates expectations clearly', responses: { 'Strongly Disagree': 0, 'Disagree': 0, 'Neither Disagree, Nor Agree': 0, 'Agree': 0, 'Strongly Agree': 1 } },
    ],
    nps: { promoters: 1, passives: 0, detractors: 0 },
  },
};

// Talent ratings already submitted
export const existingTalentRatings = {
  u2: { what: null, how: null, whatContext: '', howContext: '', submitted: false },
  u3: { what: 'Exceeds expectations', how: 'Exceeds expectations', whatContext: 'Taylor consistently exceeded targets across all operational KPIs, delivering 115% of quarterly objectives.', howContext: 'Taylor exemplified collaborative leadership, fostering strong cross-functional relationships and mentoring junior staff.', submitted: true },
  u4: { what: null, how: null, whatContext: '', howContext: '', submitted: false },
  u5: { what: 'Meets expectations', how: 'Meets expectations', whatContext: 'Riley delivered on core objectives despite leave of absence, demonstrating strong prioritization upon return.', howContext: 'Riley maintained professional standards and contributed positively to team culture throughout the year.', submitted: true },
  u13: { what: null, how: null, whatContext: '', howContext: '', submitted: false },
  u14: { what: null, how: null, whatContext: '', howContext: '', submitted: false },
  u15: { what: 'Meets expectations', how: 'Does not meet expectations', whatContext: 'Elena delivered against her core objectives and improved operational processes in Q4.', howContext: 'Elena needs to be more proactive in team settings and improve communication with stakeholders on project timelines.', submitted: true },
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
  "Consider the full picture — results, behaviors, and collaboration with others.",
  "Ask yourself: would this feedback help me grow if I received it?",
  "Separate intent from impact. Focus on what happened, not what was meant.",
  "Acknowledge the difficulty of their role or circumstances when relevant.",
  "Great feedback is forward-looking: it helps someone get better, not just reflect.",
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
  'Neither Disagree, Nor Agree',
  'Agree',
  'Strongly Agree',
  'Unable to Evaluate',
];

export const npsScale = Array.from({ length: 11 }, (_, i) => i);

// Expected curve distributions
export const curveGuidance = {
  what: {
    'Exceeds expectations': 15,
    'Meets expectations': 80,
    'Does not meet expectations': 5,
  },
  how: null, // No anticipated distribution for "how"
};

// Employee flags for Key Considerations
export const employeeFlags = {
  u2: { promotionRadar: false, materialRiskTaker: false, designatedEmployee: false },
  u3: { promotionRadar: true, materialRiskTaker: false, designatedEmployee: false },
  u4: { promotionRadar: false, materialRiskTaker: true, designatedEmployee: false },
  u5: { promotionRadar: false, materialRiskTaker: false, designatedEmployee: true },
  u13: { promotionRadar: true, materialRiskTaker: false, designatedEmployee: false },
  u14: { promotionRadar: false, materialRiskTaker: false, designatedEmployee: false },
  u15: { promotionRadar: false, materialRiskTaker: true, designatedEmployee: true },
};

// Peer benchmarks by "grade|lob"
export const peerBenchmarks = {
  'M3|Strategy & Operations': { questions: [{ avgScore: 4.1 }, { avgScore: 4.3 }, { avgScore: 3.8 }, { avgScore: 4.5 }, { avgScore: 4.0 }, { avgScore: 4.2 }], overallScore: 4.2, npsScore: 52 },
  'M1|Operations': { questions: [{ avgScore: 3.9 }, { avgScore: 3.7 }, { avgScore: 4.1 }, { avgScore: 4.2 }, { avgScore: 3.6 }, { avgScore: 3.9 }], overallScore: 3.9, npsScore: 38 },
  'VP1|Product': { questions: [{ avgScore: 4.3 }, { avgScore: 4.5 }, { avgScore: 3.9 }, { avgScore: 4.1 }, { avgScore: 4.0 }, { avgScore: 4.2 }], overallScore: 4.2, npsScore: 60 },
  'D1|Engineering': { questions: [{ avgScore: 3.7 }, { avgScore: 4.0 }, { avgScore: 3.5 }, { avgScore: 4.3 }, { avgScore: 3.8 }, { avgScore: 3.6 }], overallScore: 3.8, npsScore: 35 },
  'SVP|Strategy & Operations': { questions: [{ avgScore: 4.2 }, { avgScore: 4.6 }, { avgScore: 4.0 }, { avgScore: 4.3 }, { avgScore: 4.1 }, { avgScore: 4.4 }], overallScore: 4.3, npsScore: 65 },
  'M2|Finance': { questions: [{ avgScore: 3.8 }, { avgScore: 3.9 }, { avgScore: 3.7 }, { avgScore: 4.0 }, { avgScore: 3.5 }, { avgScore: 3.8 }], overallScore: 3.8, npsScore: 30 },
  'M2|Product': { questions: [{ avgScore: 4.0 }, { avgScore: 3.8 }, { avgScore: 4.2 }, { avgScore: 4.1 }, { avgScore: 3.9 }, { avgScore: 4.0 }], overallScore: 4.0, npsScore: 45 },
};

// Employee objectives
export const employeeObjectives = {
  u2: { objectives: [
    { id: 'obj-u2-1', title: 'Deliver Q2 strategy deck for board presentation', description: 'Lead the creation and delivery of the quarterly strategy update for the board of directors.', midYearFeedback: 'Jordan made solid progress on the Q2 deck. The analytical framework was strong, but the narrative could be tighter for a board audience. Recommend focusing on executive storytelling.', alignedFeedback: [{ fromName: 'Alex Morgan', excerpt: 'Jordan\'s analytical capabilities are strong and they consistently deliver quality work.' }] },
    { id: 'obj-u2-2', title: 'Build competitive intelligence dashboard', description: 'Design and implement an automated competitive intelligence tracking system.', midYearFeedback: 'Dashboard MVP launched on time. Good data sourcing, but the visualization layer needs iteration. Jordan should seek feedback from end users.', alignedFeedback: [] },
    { id: 'obj-u2-3', title: 'Complete advanced analytics certification', description: 'Earn professional certification in advanced data analytics by Q3.', midYearFeedback: 'On track — coursework 60% complete as of mid-year. Encourage Jordan to apply learnings to active projects.', alignedFeedback: [] },
  ] },
  u3: { objectives: [
    { id: 'obj-u3-1', title: 'Reduce operational cycle time by 15%', description: 'Identify and implement process improvements to reduce end-to-end cycle time.', midYearFeedback: 'Taylor achieved 10% reduction by mid-year through process mapping and automation. Strong progress — continue momentum in H2.', alignedFeedback: [{ fromName: 'Drew Nakamura', excerpt: 'Taylor brings energy and positivity to every collaboration. They are quick to learn new concepts.' }] },
    { id: 'obj-u3-2', title: 'Develop and mentor operations team', description: 'Build capabilities of 3 direct reports through structured mentoring and stretch assignments.', midYearFeedback: 'Taylor has been an effective mentor. All three reports show measurable growth. Continue to push delegation of complex tasks.', alignedFeedback: [{ fromName: 'Skyler Dubois', excerpt: 'Taylor is a fantastic team player who goes above and beyond.' }] },
    { id: 'obj-u3-3', title: 'Launch vendor consolidation initiative', description: 'Lead cross-functional effort to consolidate vendor relationships and reduce costs by 10%.', midYearFeedback: 'Initiative is in planning phase. Vendor assessment complete but execution has been slower than expected. Need to accelerate in H2.', alignedFeedback: [] },
  ] },
  u4: { objectives: [
    { id: 'obj-u4-1', title: 'Establish EMEA market entry framework', description: 'Develop a reusable framework for evaluating and entering new EMEA markets.', midYearFeedback: 'Casey has built a solid draft framework drawing on international experience. The methodology is rigorous. Needs wider stakeholder input before finalizing.', alignedFeedback: [{ fromName: 'Elena Vasquez', excerpt: 'Casey brings a fresh international perspective that enriches our team discussions.' }] },
    { id: 'obj-u4-2', title: 'Support Q3 strategic planning process', description: 'Co-lead the annual strategic planning cycle with focus on growth opportunities.', midYearFeedback: 'Strong analytical contributions to the planning process. Casey challenges assumptions constructively which adds value.', alignedFeedback: [] },
  ] },
  u5: { objectives: [
    { id: 'obj-u5-1', title: 'Transition key workstreams pre/post leave', description: 'Document and transition critical workstreams before leave and resume ownership upon return.', midYearFeedback: 'Riley handled the transition exceptionally well. All workstreams were documented thoroughly and handed off smoothly. Strong institutional knowledge evident.', alignedFeedback: [{ fromName: 'Jamie Foster', excerpt: 'Riley has deep institutional knowledge and is always willing to help.' }] },
    { id: 'obj-u5-2', title: 'Deliver annual strategy refresh', description: 'Lead the annual strategy refresh document for the S&O division.', midYearFeedback: 'Completed initial draft before leave. Quality was strong given the compressed timeline. Post-leave, Riley will need to finalize with updated market data.', alignedFeedback: [] },
  ] },
  u13: { objectives: [
    { id: 'obj-u13-1', title: 'Build cross-functional reporting suite', description: 'Create automated weekly and monthly reporting across Strategy and Operations.', midYearFeedback: 'Priya delivered an excellent reporting suite that is now used by 4 teams. She proactively added features based on user feedback. Outstanding work.', alignedFeedback: [{ fromName: 'Quinn Okafor', excerpt: 'Priya is a strong analytical thinker who consistently delivers thorough work.' }, { fromName: 'Jordan Lee', excerpt: 'Priya is an outstanding mentor and collaborator.' }] },
    { id: 'obj-u13-2', title: 'Lead new analyst onboarding program', description: 'Design and run the onboarding program for new analysts joining the team.', midYearFeedback: 'Program launched successfully with positive feedback from all participants. Priya showed natural leadership in designing the curriculum.', alignedFeedback: [] },
    { id: 'obj-u13-3', title: 'Complete leadership development program', description: 'Participate in and complete the firm\'s emerging leaders program.', midYearFeedback: 'Actively participating and applying learnings. Faculty noted strong engagement and peer mentoring within the cohort.', alignedFeedback: [] },
  ] },
  u14: { objectives: [
    { id: 'obj-u14-1', title: 'Ramp up on core strategy frameworks', description: 'Develop proficiency in the team\'s core analytical and strategic frameworks within first 6 months.', midYearFeedback: 'Marcus has shown impressive ramp-up speed. He asks thoughtful questions and has already contributed meaningfully to two major deliverables.', alignedFeedback: [{ fromName: 'Priya Sharma', excerpt: 'Marcus has quickly ramped up since joining and shows great curiosity.' }] },
    { id: 'obj-u14-2', title: 'Support market sizing analysis for new verticals', description: 'Conduct market sizing and opportunity assessment for 3 potential new verticals.', midYearFeedback: 'Completed 2 of 3 market sizing analyses. Quality is good but could benefit from more primary research validation.', alignedFeedback: [] },
  ] },
  u15: { objectives: [
    { id: 'obj-u15-1', title: 'Redesign intake process for operations requests', description: 'Streamline the request intake process to reduce turnaround time and improve tracking.', midYearFeedback: 'Elena redesigned the intake form and implemented a new tracking system. Turnaround time improved by 20%. Process improvements were well received.', alignedFeedback: [{ fromName: 'Casey Rivera', excerpt: 'Elena is highly organized and brings structure to every project she touches.' }] },
    { id: 'obj-u15-2', title: 'Develop self-service operations playbook', description: 'Create a comprehensive playbook enabling teams to self-serve common operational tasks.', midYearFeedback: 'Playbook is 70% complete. Content quality is excellent but Elena needs to be more proactive about communicating progress to stakeholders.', alignedFeedback: [] },
    { id: 'obj-u15-3', title: 'Improve cross-team collaboration effectiveness', description: 'Lead initiative to improve collaboration between Strategy and Operations sub-teams.', midYearFeedback: 'Some progress made through shared meetings and a new Slack channel, but more structured approach needed. Elena should be more vocal in driving this forward.', alignedFeedback: [] },
  ] },
};
