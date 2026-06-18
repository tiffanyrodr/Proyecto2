export interface Partido {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  group: string;
}

export interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}