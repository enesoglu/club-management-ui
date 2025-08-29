import {Position} from './position.model';

export interface ClubMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  schoolNo: number;
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
  PREPRATION  = "Prepration",
  FIRST_YEAR  = "First Year",
  SECOND_YEAR = "Second Year",
  THIRD_YEAR  = "Third Year",
  FOURTH_YEAR = "Fourth Year",
  GRADUATED   = "Graduated",
}
