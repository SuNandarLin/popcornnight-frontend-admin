export type Movie = {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  imageUrl?: string;
};

export type Showtime = {
  id?: number;
  timeslot: string;
  timestamp: number;
  isPublished: boolean;
  seatStatusGrid: number[][];
  movie?: Movie;
  hall?: Hall;
  movieId?: number;
  hallId?: number;
};

export type Hall = {
  id: number;
  hallNumber: string;
  showTimes: Showtime[];
  seatNoGrid: String[][];
};

export type Theatre = {
  id: number;
  name: string;
  halls: Hall[];
};
