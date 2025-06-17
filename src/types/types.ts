export type Movie = {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  posterUrl?: string;
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
  price?: number;
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

export type Ticket = {
  id: number;
  seatNumbers: string[];
  status: "VALID" | "REDEEMED" | "EXPIRED";
  user: { name: string };
  showTime: Showtime;
};

export type MovieRevenue = { movie: string; revenue: number };
export type MovieTicketSales = { movie: string; tickets: number };
export type PeakBookingHour = { hour: string; bookings: number };
export type CustomerTypeCount = { type: string; count: number };
