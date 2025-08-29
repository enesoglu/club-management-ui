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
  positions: Array<Position>;
  registrationDate: Date;
  membershipStatus: MembershipStatus;
}

export enum MembershipStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum YearOfStudy {
  PREPRATION,
  FIRST_YEAR,
  SECOND_YEAR,
  THIRD_YEAR,
  FOURTH_YEAR,
  GRADUATED = -1
}
