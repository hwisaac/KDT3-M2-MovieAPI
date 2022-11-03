import { initMovies, movieDetailEl } from "../../main.js";

export const getOneMovie = async (id = "tt1285016") => {
  const url = `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`;

  console.log(url);
  const res = await fetch(url);

  const movieData = await res.json();
  return movieData;
};

// async 함수라서 return 하면 promise 객체가 된다.
export default async function renderMovieDetail(inputID) {
  let id;
  let movieData;

  initMovies(); // 무비 리스트 모두삭제

  if (!inputID) {
    id = location.hash.replace("#", "");
  } else {
    id = inputID.replace("#", "");
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
  const editedPoster = Poster.replace("SX300", "SX700");

  console.log(movieData);

  let rateLists = "";
  console.log(Ratings);

  for (let i = 0; i < Ratings.length; i++) {
    rateLists += `<img class="rating-img" src="./src/img/${Ratings[i].Source}.png"> ${Ratings[i].Value} `;
  }
  movieDetailEl.innerHTML = `<div class="container">
    <img src="${editedPoster}" class="poster"></div>
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
        <div class="ratings">${rateLists}</div>
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
  if (Poster === "N/A") {
    const noPostEl = document.querySelector(".movie-detail .container .poster");
    noPostEl.src = "";
  }
}
