export interface Position {
  team: Team;
  crewComittee: CrewCommittee;
  executiveTitle: ExecutiveTitle;
}

export enum Team {
  EXECUTIVE,
  CREW,
  SUPERVISORY,
  MEMBER,
  VETERAN
}

export enum CrewCommittee {
  ORGANIZATION,
  MEDIUM,
  SPONSORSHIP,
  DESIGN,
  PR
}

export enum ExecutiveTitle {
  PRESIDENT,
  VICE_PRESIDENT,
  BOARD_MEMBER,

  DIRECTOR_OF_PR,
  DIRECTOR_OF_SPONSORSHIP,
  DIRECTOR_OF_COMMUNICATIONS,
  DIRECTOR_OF_YOUTUBE,
  DIRECTOR_OF_PROJECTS,
  DIRECTOR_OF_PUBLICATIONS,
  DIRECTOR_OF_DESIGN
}
