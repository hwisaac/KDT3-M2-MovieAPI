import { movieDetailEl } from "./main.js";
import { initMovies, initDetails } from "./initialize.js";

const skeletonsEl = document.querySelector(".skeletons");

export const getOneMovie = async (id = "tt1285016") => {
  const url = `https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`;

  console.log(url);
  const res = await fetch(url);

  const movieData = await res.json();
  return movieData;
};

// async 함수라서 return 하면 promise 객체가 된다.
export default async function renderMovieDetail(inputID) {
  skeletonsEl.classList.remove("hidden");
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
  let editedPoster;
  if (Poster === "N/A") {
    editedPoster = `<img class="no-poster" src='./src/img/no-photo.png' alt="" />`;
  } else {
    editedPoster = `<img src="${Poster.replace("SX300", "SX700")}" alt="" />`;
  }

  let rateLists = "";

  for (let i = 0; i < Ratings.length; i++) {
    rateLists += `<div><img class="rating-img" src="./src/img/${Ratings[i].Source}.png"> ${Ratings[i].Value} </div>`;
  }
  let detailString = `<div class="movie-details d-lg-flex d-block">
<div class="poster">
  ${editedPoster}
</div>
<div class="specs">
  <div class="title">${Title}</div>
  <div class="labels">
    <span>${Released}</span>
    <span>${Runtime}</span>
    <span>${Country}</span>
  </div>
  <div class="plot">${Plot}</div>
  <div class="ratings">
    <h3>Ratings</h3>
    <div class="rate-lists">
    ${rateLists}
    </div>
  </div>
  <div>
    <h3>Actors</h3>
    ${Actors}
  </div>
  <div>
    <h3>Director</h3>
    ${Director}
  </div>
  <div>
    <h3>Production</h3>
    ${Production}
  </div>
  <div>
    <h3>Genre</h3>
    ${Genre}
  </div>
</div>
</div>
`;

  movieDetailEl.innerHTML = detailString;
  skeletonsEl.classList.add("hidden");
}
