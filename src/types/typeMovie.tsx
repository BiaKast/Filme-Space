export type Movie = {
  adult: false;
  backdrop_path: "/gavyCu1UaTaTNPsVaGXT6pe5u24.jpg";
  genre_ids: [35, 18];
  id: 637;
  original_language: "it";
  original_title: "La vita è bella";
  overview: "A touching story of an Italian book seller of Jewish ancestry who lives in his own little fairy tale. His creative and happy life would come to an abrupt halt when his entire family is deported to a concentration camp during World War II. While locked up he tries to convince his son that the whole thing is just a game.";
  popularity: 64.845;
  poster_path: "/74hLDKjD5aGYOotO6esUVaeISa2.jpg";
  release_date: "1997-12-20";
  title: "Life Is Beautiful";
  video: false;
  vote_average: 8.5;
  vote_count: 12737;
};

export type MovieDetails = {
  adult: false;
  backdrop_path: "/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg";
  belongs_to_collection: {
    id: 1241984;
    name: "Moana Collection";
    poster_path: "/hiGRhPYMKU8aXfxmSD7lqJNSzJG.jpg";
    backdrop_path: "/4OgaftFNqtE1UvfDDb2Eov7A5Rz.jpg";
  };
  budget: 150000000;
  genres: [
    {
      id: 16;
      name: "Animação";
    },
    {
      id: 12;
      name: "Aventura";
    },
    {
      id: 10751;
      name: "Família";
    },
    {
      id: 35;
      name: "Comédia";
    },
  ];
  homepage: "";
  id: 1241982;
  imdb_id: "tt13622970";
  origin_country: ["US"];
  original_language: "en";
  original_title: "Moana 2";
  overview: "";
  popularity: 6106.764;
  poster_path: "/3E9oViQjwbbrHJogG7NtfcKWRXw.jpg";
  production_companies: [
    {
      id: 2;
      logo_path: "/wdrCwmRnLFJhEoH8GSfymY85KHT.png";
      name: "Walt Disney Pictures";
      origin_country: "US";
    },
    {
      id: 6125;
      logo_path: "/tzsMJBJZINu7GHzrpYzpReWhh66.png";
      name: "Walt Disney Animation Studios";
      origin_country: "US";
    },
    {
      id: 158526;
      logo_path: "/tzsMJBJZINu7GHzrpYzpReWhh66.png";
      name: "Walt Disney Animation Studios";
      origin_country: "CA";
    },
  ];
  production_countries: [
    {
      iso_3166_1: "CA";
      name: "Canada";
    },
    {
      iso_3166_1: "US";
      name: "United States of America";
    },
  ];
  release_date: "2024-11-27";
  revenue: 386700000;
  runtime: 100;
  spoken_languages: [
    {
      english_name: "English";
      iso_639_1: "en";
      name: "English";
    },
  ];
  status: "Released";
  tagline: "";
  title: "Vaiana 2";
  video: false;
  vote_average: 7;
  vote_count: 291;
};

export type MovieCredits = {
  id: 1184918;
  cast: [
    {
      adult: false;
      gender: 1;
      id: 1267329;
      known_for_department: "Acting";
      name: "Lupita Nyong'o";
      original_name: "Lupita Nyong'o";
      popularity: 25.342;
      profile_path: "/y40Wu1T742kynOqtwXASc5Qgm49.jpg";
      cast_id: 9;
      character: "Roz / Rummage (voice)";
      credit_id: "65c03d8ffc65380163eaf41c";
      order: 0;
    },
  ];
};

export type MovieGenres = {
  genres: [
    {
      id: 28;
      name: "Action";
    },
  ];
};

export type Genre = {
  id: 28;
  name: "Action";
};

export interface MovieListType {
  popularity?: { name: string };
  vote_average?: { name: string };
  primary_release_date?: { name: string };
}
