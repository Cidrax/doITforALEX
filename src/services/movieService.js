import http from "../helpers/http";

const URL = 'http://www.omdbapi.com/?apikey=490a54f8';

const API = {
  SEARCH_BY_NAME: (name) => `${ URL }&s=${ name }`,
  SEARCH_BY_ID: (id) => `${ URL }&i=${ id }`,
};
export const searchByNameResult = {
  searchedArray: [],
  totalResults: 0,
  errorText: '',
  responseIsValid: false,
};

export const searchByIdResult = {
  production: '',
  plot: '',
  title: '',
  ageRating: '',
  releaseDate: '',
  writer: '',
  director: '',
  actors: '',
  awards: '',
  rating: '',
  votes: '-/-',
  poster: '',
  responseIsValid: false,
};

const movieService = {
  searchByName: async (name) => {
    const result = { ...searchByNameResult };
    try {
      const rawResult = await http.get(API.SEARCH_BY_NAME(name));
      if (rawResult && rawResult.Response === 'True') {
        result.responseIsValid = true;
        result.searchedArray = rawResult.Search.map(movie => ({
          title: movie.Title,
          year: movie.Year,
          id: movie.imdbID,
          poster: movie.Poster,
        }));
        result.totalResults = rawResult.totalResults;
      } else {
        result.errorText = rawResult.Error;
      }
      return result;
    } catch (e) {
      throw e;
    }
  },
  searchById: async (id) => {
    try {
      const rawResult = await http.get(API.SEARCH_BY_ID(id));
      let result = { ...searchByIdResult };
      if (rawResult && rawResult.Response === 'True') {
        console.log(rawResult);
        result = {
          production: rawResult.Production,
          plot: rawResult.Plot,
          title: rawResult.Title,
          ageRating: rawResult.Rated,
          releaseDate: rawResult.Released,
          writer: rawResult.Writer,
          director: rawResult.Director,
          actors: rawResult.Actors,
          awards: rawResult.Awards,
          rating: rawResult.imdbRating,
          votes: rawResult.imdbVotes,
          responseIsValid: true,
          poster: rawResult.Poster,
        };
      }
      return result;
    } catch (e) {
      throw e;
    }
  },
};

export default movieService;
