export interface ClubMember {
  id: number;
  memberNo: number;
  firstName: string;
  lastName: string;
  memberId: string;
  role: MemberRole;
  email: string;
  phoneNumber: string;
  yearOfStudy: number;
  faculty: string;
  department: string;
  registrationDate: Date;
  membershipStatus: MembershipStatus;
}

export enum MemberRole {
  PRESIDENT = "PRESIDENT",
  VICE_PRESIDENT = "VICE PRESIDENT",
  BOARD_MEMBER = "BOARD MEMBER",
  CREW = "CREW",
  MEMBER = "MEMBER"
}

export enum MembershipStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  GRADUATED = "GRADUATED",
  VETERAN = "VETERAN"
}
