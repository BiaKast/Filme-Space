export interface UserAccount {
  id: number;
  username: string;
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string;
    };
  };
  name: string;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
}
// export interface User {
//   id: number;
//   account: UserAccount;
//   name: string;
//   include_adult: boolean;
//   iso_639_1: string;
//   iso_3166_1: string;
// }