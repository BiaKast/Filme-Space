export interface MovieImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export type MovieImages = {
  backdrops: { file_path: string }[];
  posters: { file_path: string }[];
  logos: { file_path: string }[];
};

export interface MovieVideos {
  id: number;
  results: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
  }[];
}
