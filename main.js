// import { getOneMovie } from "./src/js/movie.js";
import renderMovieDetail from "./src/js/renderMovieDetail.js";
import renderSearchPage from "./src/js/renderSearchPage.js";
import renderAboutPage from "./src/js/renderAboutPage.js";
// renderMovieDetail();
//////////////////// 초기화 코드들~
let inputID = "#tt4154756";
const moviesEl = document.querySelector(".movies");
export const moreBtnEl = document.querySelector(".btn--more");
const searchBtnEl = document.querySelector(".search__btn");
const searchTextEl = document.querySelector(".search__text");
const searchGenreEl = document.querySelector(".search__genre");
const searchNumberEl = document.querySelector(".search__number");
const searchYearEl = document.querySelector(".search__year");
export const movieDetailEl = document.querySelector(".movie-detail");

let searchText = searchTextEl.value || "avengers";
export let page = 1;

for (let i = 2022; i > 1990; i--) {
  const optionEl = document.createElement("option");
  optionEl.textContent = i;
  optionEl.value = i;
  searchYearEl.append(optionEl);
}

//해쉬 바뀔 때 라우팅 효과 주기
window.addEventListener("hashchange", () => {
  const hashValue = location.hash.slice(1);
  if (hashValue === "search") {
    renderSearchPage();
  } else if (hashValue === "movie") {
    console.log("movie 로 이동!");
    initMovies();
    initDetails();
    if (inputID) {
      renderMovieDetail(inputID);
    }
    console.log("inputID: ", inputID);
    // if (movieDeta) {
    //   renderOneMovie(inputID);
    // }
  } else if (hashValue === "about") {
    console.log("about 입니다.");
    renderAboutPage();
  } else {
    // ID 해쉬를 받은 경우
    console.log("id해쉬로 디테일 랜더링");
    inputID = location.hash.slice(1);
    renderMovieDetail();
  }
});

export function renderMovies(movies) {
  if (!movies) {
    console.log("movies가 존재하지 않습니다!");
    return;
  }
  for (const movie of movies) {
    const imdbID = movie.imdbID;

    const aTag = document.createElement("a");
    aTag.setAttribute("href", `/#${imdbID}`);
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
  moreBtnEl.classList.remove("hidden");
}
// 영화 클릭했을 때 싱글 영화 상세페이지 랜더링

// 무비 리스트 초기화 함수
export function initMovies() {
  moviesEl.innerHTML = ""; // 영화 리스트 초기화
  page = 1; // page 초기화
  moreBtnEl.classList.add("hidden");
}
export function initDetails() {
  movieDetailEl.innerHTML = "";
}

export async function getMovies(
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
