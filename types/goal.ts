export interface Goal {
  _id: string;
  obtainedAmt: number;
  organization: Organization;
  user: User;
  goal: string;
  timeline: string;
  goalAmount: number;
  status: string;
  category: Category;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

interface Organization {
  _id: string;
  features: Features;
  firstGoal: FirstGoal;
  availableTimeline: string[];
  pointsPerDollar: number;
  widgets: any[];
  analytics: boolean;
  managerPointsAllocation: boolean;
  name: string;
  address: string;
  status: string;
  mode: string;
  logo: string;
  userId: string;
  theme: Theme;
  perMonthBonus: number;
  createdAt: string;
  updatedAt: string;
  maxActiveGoals: string;
  signonBonus: number;
  tremendous: Tremendous;
  importantContacts: ImportantContacts;
}

interface Features {
  contestFeature: boolean;
  shiftFeature: boolean;
  goalFeature: boolean;
  lotteryFeature: boolean;
  questionnaireFeature: boolean;
  managerCanAddChecklist: boolean;
  managerShiftApproval: boolean;
  allowCustomGoals: boolean;
  allowTemplateGoals: boolean;
  textMessages: boolean;
}

interface FirstGoal {
  type: string;
  timeline: string;
  rewardAmount: number;
}

interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface Tremendous {
  enabled: boolean;
  token: string;
  campaign: string;
  fundingSource: string;
}

interface ImportantContacts {
  champion: string;
  tax: string;
}

interface User {
  _id: string;
  isNewUser: boolean;
  activation: boolean;
  otpVerified: boolean;
  badgeCount: number;
  email: string;
  mobile: string;
  type: string;
  anonymousIdentity: string;
  createdAt: string;
  updatedAt: string;
  user: User2;
  userRef: string;
  onboardingToken: string;
  onboardingDate: string;
  fcmToken: any;
}

interface User2 {
  name: string;
}

interface Category {
  _id: string;
  subCategories: any[];
  organization: string;
  categoryName: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
