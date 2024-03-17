export interface Organization {
  features: Features;
  firstGoal: FirstGoal;
  availableTimeline: string[];
  pointsPerDollar: number;
  widgets: any[];
  analytics: boolean;
  managerPointsAllocation: boolean;
  _id: string;
  name: string;
  address: string;
  status: string;
  mode: string;
  logo: string;
  userId: UserId;
  theme: Theme;
  perMonthBonus: number;
  createdAt: string;
  updatedAt: string;
}

export interface Features {
  allowTemplateGoals: boolean;
  textMessages: boolean;
  contestFeature: boolean;
  shiftFeature: boolean;
  goalFeature: boolean;
  lotteryFeature: boolean;
  questionnaireFeature: boolean;
  managerCanAddChecklist: boolean;
  managerShiftApproval: boolean;
  allowCustomGoals: boolean;
}

export interface FirstGoal {
  type: string;
  timeline: string;
  rewardAmount: number;
}

export interface UserId {
  isNewUser: boolean;
  activation: boolean;
  otpVerified: boolean;
  badgeCount: number;
  onboardingSms: string;
  _id: string;
  email: string;
  type: string;
  anonymousIdentity: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fcmToken: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}
