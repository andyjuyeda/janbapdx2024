type Gender = "M" | "F";

export type Bowler = {
  id: number;
  name: string;
  gender: Gender;
  average: number;
  is_senior: boolean;
  is_vet: boolean;
  is_in_all_events: boolean;
  is_in_senior_all_events: boolean;
};

export type BowlerInEvent = {
  name: string;
  average: number;
  lane: number;
  division: string;
};
