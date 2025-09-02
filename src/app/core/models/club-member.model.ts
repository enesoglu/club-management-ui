import {Position} from './position.model';

export interface ClubMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  schoolNo: string;
  nationalId: string;
  yearOfStudy: YearOfStudy;
  faculty: string;
  department: string;
  password: string;
  positions?: Position[];
  registrationDate: Date;
  membershipStatus: MembershipStatus;
}

export enum MembershipStatus {
  ACTIVE    = "ACTIVE",
  INACTIVE  = "INACTIVE",
}

export enum YearOfStudy {
  PREPARATION  = "PREPARATION",
  FIRST_YEAR  = "FIRST_YEAR",
  SECOND_YEAR = "SECOND_YEAR",
  THIRD_YEAR  = "THIRD_YEAR",
  FOURTH_YEAR = "FOURTH_YEAR",
  GRADUATED   = "GRADUATED",
}

export const MembershipStatusDisplayNames: Record<MembershipStatus, string> = {
  [MembershipStatus.ACTIVE]: "Active",
  [MembershipStatus.INACTIVE]: "Inactive",
};

export const YearOfStudyDisplayNames: Record<YearOfStudy, string> = {
  [YearOfStudy.PREPARATION]: "Preparation",
  [YearOfStudy.FIRST_YEAR]: "First Year",
  [YearOfStudy.SECOND_YEAR]: "Second Year",
  [YearOfStudy.THIRD_YEAR]: "Third Year",
  [YearOfStudy.FOURTH_YEAR]: "Fourth Year",
  [YearOfStudy.GRADUATED]: "Graduated",
};

