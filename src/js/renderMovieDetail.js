import { initMovies, movieDetailEl } from "../../main.js";

export const getOneMovie = async (id = "tt1285016") => {
  const url = `https://omdbapi.com/?apikey=7035c60c&i=${id}`;

  // console.log(url);
  const res = await fetch(url);

  // movieData =  { Title, Actors, Country, Genre, Plot, Poster, Ratings, Released ,... }
  const movieData = await res.json();
  return movieData;
};

// async 함수라서 return 하면 promise 객체가 된다.
export default async function renderMovieDetail(inputID) {
  let id;
  let movieData;

  initMovies(); // 무비 리스트 모두삭제

  if (!inputID) {
    id = location.hash.slice(1); //
  } else {
    id = inputID;
  }
  movieData = await getOneMovie(id);

  const {
    Title,
    Actors,
    Country,
    Genre,
    Plot,
    Poster,
    Ratings,
    Released,
    Director,
    Production,
    Runtime,
  } = movieData;
  movieDetailEl.innerHTML = `<div class="container">
    <img src="${Poster}" class="poster"></div>
    <div class="movie-info">
      <h1 class="title">${Title}</h1>
      <div class="short-info">
        <div class="released">${Released}</div>
        <div class="runtime">${Runtime}</div>
        <div class="country">${Country}</div>
      </div>
      <div class="plot">${Plot}</div>
      <div class="item-ratings">
        <h2>Ratings</h2>
        <div class="ratings">{Ratings[0].Source}: {Ratings[0].Value} </div>
      </div>
      <div class="item-actors">
        <h2>Actors</h2>
        <div class="actors">${Actors}</div>
      </div>
      <div class="item-director">
        <h2>Director</h2>
        <div class="director">${Director}</div>
      </div>
      <div class="item-production">
        <h2>Production</h2>
        <div class="production">${Production}</div>
      </div>
      <div class="item-genre">
        <h2>Genre</h2>
        <div class="genre">${Genre}</div>
      </div>
    </div>
  </div>`;
}
