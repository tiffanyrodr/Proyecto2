export interface Gol {
  name: string;
  minute: string;
}

export interface Partido {
  round: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  score: { ft: number[]; ht: number[] };
  goals1: Gol[];
  goals2: Gol[];
  group: string;
  ground: string;
}

export interface WorldCupResponse {
  name: string;
  matches: Partido[];
}

export interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}