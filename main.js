// 초기화 코드들~
const moviesEl = document.querySelector(".movies");
const moreBtnEl = document.querySelector(".btn--more");
const searchBtnEl = document.querySelector(".btn--search");
const searchTextEl = document.querySelector(".text--search");
let searchText = searchTextEl.value;

let page = 1;

function renderMovies(movies) {
  for (const movie of movies) {
    const el = document.createElement("div");
    el.classList.add("movie");
    // <div class="movie"></div>

    // Type 1
    // el.innerHTML = /* html */ `
    //   <h1>${movie.Title}</h1>
    //   <img src="${movie.Poster}" />
    // `
    // const h1El = el.querySelector('h1')
    // h1El.addEventListener('click', () => {
    //   console.log(movie.Title)
    // })

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
function initMovies() {
  moviesEl.innerHTML = ""; // 영화 리스트 초기화
  page = 1; // page 초기화
}
(async () => {
  // 최초 호출!
  const movies = await getMovies();
  page += 1;
  renderMovies(movies);
})();

async function getMovies(searchText = "avengers", page = 1) {
  const res = await fetch(
    `https://omdbapi.com/?apikey=7035c60c&s=${searchText}&page=${page}`
  );
  const { Search: movies, totalResults } = await res.json();
  return movies;
}

// 더보기 버튼 클릭!
moreBtnEl.addEventListener("click", async () => {
  page += 1;
  const movies = await getMovies(searchText, page);
  renderMovies(movies);
});

searchBtnEl.addEventListener("click", async (event) => {
  event.preventDefault(); // 새로고침 방지
  searchText = searchTextEl.value;
  searchTextEl.value = "";
  initMovies(); // 영화 리스트 초기화

  if (searchText) {
    const movies = await getMovies(searchText, page);
    renderMovies(movies);
  }
});
