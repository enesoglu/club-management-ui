export interface Position {
  team: Team;
  startDate: Date;
  endDate: Date;
  crewComittee?: CrewCommittee;
  executiveTitle?: ExecutiveTitle;
  isActive: Boolean;
  term: any;
}

export enum Team {
  EXECUTIVE   = "Executive Board",
  SUPERVISORY = "Supervisory Board",
  CREW        = "Crew",
  MEMBER      = "Member",
  VETERAN     = "Veteran"
}

export enum ExecutiveTitle {
  PRESIDENT                   = "President",
  VICE_PRESIDENT              = "Vice President",
  BOARD_MEMBER                = "Board Member",
  DIRECTOR_OF_PR              = "Director of PR&Social Media",
  DIRECTOR_OF_SPONSORSHIP     = "Director of Sponsorships",
  DIRECTOR_OF_COMMUNICATIONS  = "Director of Communications",
  DIRECTOR_OF_YOUTUBE         = "Director of YouTube",
  DIRECTOR_OF_PROJECTS        = "Director of Projects",
  DIRECTOR_OF_PUBLICATIONS    = "Director of Publications",
  DIRECTOR_OF_DESIGN          = "Director of Design"
}

export enum CrewCommittee {
  ORGANIZATION  = "Organization Committee",
  MEDIUM        = "Medium-TechSheet Committee",
  SPONSORSHIP   = "Sponsorship Committee",
  DESIGN        = "Design Committee",
  PR            = "PR&Social Media Committee"
}
