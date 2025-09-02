export interface Position {
  team: Team;
  startDate: Date;
  endDate: Date;
  crewCommittee?: CrewCommittee;
  executiveTitle?: ExecutiveTitle;
  active: Boolean;
  term: any;
}

export enum Team {
  EXECUTIVE   = "EXECUTIVE",
  SUPERVISORY = "SUPERVISORY",
  CREW        = "CREW",
  MEMBER      = "MEMBER",
  VETERAN     = "VETERAN",
}

export enum ExecutiveTitle {
  PRESIDENT                   = "PRESIDENT",
  VICE_PRESIDENT              = "VICE_PRESIDENT",
  BOARD_MEMBER                = "BOARD_MEMBER",
  DIRECTOR_OF_PR              = "DIRECTOR_OF_PR",
  DIRECTOR_OF_SPONSORSHIP     = "DIRECTOR_OF_SPONSORSHIP",
  DIRECTOR_OF_COMMUNICATIONS  = "DIRECTOR_OF_COMMUNICATIONS",
  DIRECTOR_OF_YOUTUBE         = "DIRECTOR_OF_YOUTUBE",
  DIRECTOR_OF_PROJECTS        = "DIRECTOR_OF_PROJECTS",
  DIRECTOR_OF_PUBLICATIONS    = "DIRECTOR_OF_PUBLICATIONS",
  DIRECTOR_OF_DESIGN          = "DIRECTOR_OF_DESIGN"
}

export enum CrewCommittee {
  ORGANIZATION  = "ORGANIZATION",
  MEDIUM        = "MEDIUM",
  SPONSORSHIP   = "SPONSORSHIP",
  DESIGN        = "DESIGN",
  PR            = "PR"
}

export const TeamDisplayNames: Record<Team, string> = {
  [Team.EXECUTIVE]: "Executive Board",
  [Team.SUPERVISORY]: "Supervisory Board",
  [Team.CREW]: "Crew",
  [Team.MEMBER]: "Member",
  [Team.VETERAN]: "Veteran"
};

export const ExecutiveTitleDisplayNames: Record<ExecutiveTitle, string> = {
  [ExecutiveTitle.PRESIDENT]: "President",
  [ExecutiveTitle.VICE_PRESIDENT]: "Vice President",
  [ExecutiveTitle.BOARD_MEMBER]: "Board Member",
  [ExecutiveTitle.DIRECTOR_OF_PR]: "Director of PR&Social Media",
  [ExecutiveTitle.DIRECTOR_OF_SPONSORSHIP]: "Director of Sponsorships",
  [ExecutiveTitle.DIRECTOR_OF_COMMUNICATIONS]: "Director of Communications",
  [ExecutiveTitle.DIRECTOR_OF_YOUTUBE]: "Director of YouTube",
  [ExecutiveTitle.DIRECTOR_OF_PROJECTS]: "Director of Projects",
  [ExecutiveTitle.DIRECTOR_OF_PUBLICATIONS]: "Director of Publications",
  [ExecutiveTitle.DIRECTOR_OF_DESIGN]: "Director of Design"
};

export const CrewCommitteeDisplayNames: Record<CrewCommittee, string> = {
  [CrewCommittee.ORGANIZATION]: "Organization Committee",
  [CrewCommittee.MEDIUM]: "Medium-TechSheet Committee",
  [CrewCommittee.SPONSORSHIP]: "Sponsorship Committee",
  [CrewCommittee.DESIGN]: "Design Committee",
  [CrewCommittee.PR]: "PR&Social Media Committee"
};
