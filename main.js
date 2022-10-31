import { getOneMovie } from "./src/js/movie.js";

//////////////////// 초기화 코드들~
const moviesEl = document.querySelector(".movies");
const moreBtnEl = document.querySelector(".btn--more");
const searchBtnEl = document.querySelector(".search__btn");
const searchTextEl = document.querySelector(".search__text");
const searchGenreEl = document.querySelector(".search__genre");
const searchNumberEl = document.querySelector(".search__number");
const searchYearEl = document.querySelector(".search__year");
const movieDetailEl = document.querySelector(".movie-detail");

let searchText = searchTextEl.value || "avengers";
let page = 1;

for (let i = 2022; i > 1990; i--) {
  const optionEl = document.createElement("option");
  optionEl.textContent = i;
  optionEl.value = i;
  searchYearEl.append(optionEl);
}

/////////////// 함수 선언
// const rederOneMovieSPA = async (movieData) => {
//   let threeRates = "";
//   const {
//     Title,
//     Actors,
//     Country,
//     Genre,
//     Plot,
//     Poster,
//     Ratings,
//     Released,
//     Director,
//     Production,
//     Runtime,
//   } = movieData;

// };

function renderMovies(movies) {
  if (!movies) {
    console.log("movies가 존재하지 않습니다!");
    return;
  }
  for (const movie of movies) {
    const imdbID = movie.imdbID;

    const aTag = document.createElement("a");
    aTag.setAttribute("href", `/#${imdbID}`); // 라우트 배우고 imdb 로 보내야 될듯
    const el = document.createElement("div");
    el.classList.add("movie");

    // Type 2
    const h1El = document.createElement("h1");
    h1El.textContent = movie.Title;
    const imgEl = document.createElement("img");
    imgEl.src = movie.Poster;
    el.append(h1El, imgEl);
    aTag.append(el);
    moviesEl.append(aTag);
  }
}
// 영화 클릭했을 때 싱글 영화 상세페이지 랜더링
window.addEventListener("hashchange", async () => {
  const id = location.hash.slice(1); // 아이디받아오기
  initMovies(); // 무비 리스트 모두삭제

  // 1. header 랜더
  // 2. 무비 상세 페이지 렌더
  const movieData = await getOneMovie(id);
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
      <div class="ratings">${Ratings[0].Source}: ${Ratings[0].Value} </div>
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
});
// 무비 리스트 초기화 함수
function initMovies() {
  moviesEl.innerHTML = ""; // 영화 리스트 초기화
  page = 1; // page 초기화
}
function initDetails() {
  movieDetailEl.innerHTML = ""; // 영화 상세정보 초기화
}

async function getMovies(
  searchText = "avengers",
  type = "movie",
  y = "",
  page = 1
) {
  const url = `https://omdbapi.com/?apikey=7035c60c&s=${searchText}&page=${page}&type=${type}&y=${y}`;
  console.log(url);
  const res = await fetch(url);
  const { Search: movies, totalResults } = await res.json();
  return movies;
}
////////////////////// 이벤트 리스너 등록
// 더보기 버튼 클릭!
const handleMoreBtn = async () => {
  let type = searchGenreEl.value;
  let y = searchYearEl.value;
  page += 1;
  const movies = await getMovies(searchText, type, y, page);
  renderMovies(movies);
};

moreBtnEl.addEventListener("click", handleMoreBtn);

//검색버튼 클릭
searchBtnEl.addEventListener("click", async (event) => {
  event.preventDefault(); // 새로고침 방지

  searchText = searchTextEl.value;
  searchTextEl.value = "";
  initMovies(); // 영화 리스트 초기화
  initDetails();

  let type = searchGenreEl.value;
  let y = searchYearEl.value;
  let searchNumber = searchNumberEl.value;

  console.log("searchNumber :", searchNumber);
  if (searchText) {
    const movies = await getMovies(searchText, type, y, page);
    renderMovies(movies);

    for (let i = 0; i < searchNumber; i++) {
      console.log("more작동!");
      handleMoreBtn();
    }
  }
});

(async () => {
  // 최초 영화 호출!
  const movies = await getMovies();
  page += 1;
  renderMovies(movies);
})();
/// body clcik
const bodyEl = document.querySelector("body");
bodyEl.addEventListener("click", () => {});
