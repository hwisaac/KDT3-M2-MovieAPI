//////////////////// 초기화 코드들~
const moviesEl = document.querySelector(".movies");
const moreBtnEl = document.querySelector(".btn--more");
const searchBtnEl = document.querySelector(".search__btn");
const searchTextEl = document.querySelector(".search__text");
const searchGenreEl = document.querySelector(".search__genre");
const searchNumberEl = document.querySelector(".search__number");
const searchYearEl = document.querySelector(".search__year");

let searchText = searchTextEl.value;
let page = 1;

for (let i = 2022; i > 1990; i--) {
  const optionEl = document.createElement("option");
  optionEl.textContent = i;
  optionEl.value = i;
  searchYearEl.append(optionEl);
}

/////////////// 함수 선언

function renderMovies(movies) {
  console.log(movies);
  if (!movies) {
    console.log("movies가 존재하지 않습니다!");
    return;
  }
  for (const movie of movies) {
    // console.dir(movie);
    // const aTag = document.createElement("a");
    // aTag.setAttribute("href", "");  라우트 배우고 imdb 로 보내야 될듯
    const el = document.createElement("div");
    el.classList.add("movie");

    // Type 2
    const h1El = document.createElement("h1");
    h1El.textContent = movie.Title;
    h1El.addEventListener("click", () => {
      console.log(movie.Title);
    });
    const imgEl = document.createElement("img");
    imgEl.src = movie.Poster;
    el.append(h1El, imgEl);

    moviesEl.append(el);
  }
}
// 무비 리스트 초기화 함수
function initMovies() {
  moviesEl.innerHTML = ""; // 영화 리스트 초기화
  page = 1; // page 초기화
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

searchBtnEl.addEventListener("click", async (event) => {
  event.preventDefault(); // 새로고침 방지

  searchText = searchTextEl.value;
  searchTextEl.value = "";
  initMovies(); // 영화 리스트 초기화

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

console.dir(searchGenreEl[0]);
/// body clcik
const bodyEl = document.querySelector("body");
bodyEl.addEventListener("click", () => {});
