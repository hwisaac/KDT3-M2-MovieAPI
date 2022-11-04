// import { getOneMovie } from "./src/js/movie.js";
// import renderAboutPage from "./src/js/삭제renderAboutPage.js";
import renderMovieDetail from "./src/js/renderMovieDetail.js";
import renderSearchPage from "./src/js/renderSearchPage.js";
import {
  searchBarEl,
  searchBtnEl,
  searchTextEl,
  searchText,
  genreSelectBtn,
  yearSelectBtn,
  handleSearchBtn,
} from "./src/js/searchBar.js";

//////////////////// 초기화 코드들~
let inputID = "tt4154756";
const bodyEl = document.querySelector("body");
const moviesEl = document.querySelector("#movies");
export const moreBtnEl = document.querySelector("#btnMore");
export const movieDetailEl = document.querySelector(".movie-detail");
const scrollSpyEl = document.querySelector(".scroll-spy");
const searchGenreEl = document.querySelector(".search__genre");
const searchNumberEl = document.querySelector(".search__number");
const searchYearEl = document.querySelector(".search__year");
let infiniteScroll = true; // 무한스크롤 작동 여부

export let page = 1;

// for (let i = 2022; i > 1990; i--) {
//   const optionEl = document.createElement("option");
//   optionEl.textContent = i;
//   optionEl.value = i;
//   searchYearEl.append(optionEl);
// }

//해쉬 바뀔 때 라우팅 효과 주기
window.addEventListener("hashchange", () => {
  let hashValue = location.hash;
  console.log("해쉬값 ", hashValue);
  // console.log("해쉬값 ", hashValue);
  hashValue = hashValue.slice(1);
  if (hashValue === "") {
    // 홈으로 간경우 서치페이지 랜더링해라
    renderSearchPage();
    searchBarEl.classList.remove("hidden");
    setTimeout(() => {
      infiniteScroll = true;
    }, 1000);
  } else if (hashValue === "search") {
    // 검색(=홈)으로 간경우 서치페이지 랜더링해라
    renderSearchPage();
    searchBarEl.classList.remove("hidden");
    setTimeout(() => {
      infiniteScroll = true;
    }, 1000);
  } else if (hashValue === "movie") {
    // 무비로 간경우 무비디테일 랜더링해라
    initMovies();
    initDetails();
    searchBarEl.classList.add("hidden");
    infiniteScroll = false;
    if (inputID) {
      console.log("inputID 로 랜더링");
      inputID = inputID.replaceAll("#", "");
      renderMovieDetail(inputID);
    }
  } else if (hashValue === "about") {
    // about로 가면 aboutpage를 랜더링해라
    renderAboutPage();
    searchBarEl.classList.add("hidden");
    infiniteScroll = false;
  } else {
    // ID 해쉬를 받은 경우

    renderMovieDetail();
    searchBarEl.classList.add("hidden");
    infiniteScroll = false;
    inputID = hashValue;
  }
});

export function renderMovies(movies) {
  if (!movies) {
    console.log("movies가 존재하지 않습니다!");
    return;
  }
  console.log(movies);
  for (const movie of movies) {
    const imdbID = movie.imdbID;
    const aTag = document.createElement("a");
    aTag.setAttribute("href", `/#${imdbID}`);
    const el = document.createElement("div");
    el.classList.add("movie");

    // Type 2
    const divEl = document.createElement("div");
    const h1El = document.createElement("h1");
    const spanEl = document.createElement("span");
    h1El.textContent = movie.Title;
    spanEl.textContent = `${movie.Year.replace(/-$/, "")} / ${movie.Type}`;
    let imgEl = document.createElement("img");
    if (movie.Poster !== "N/A") {
      imgEl.src = movie.Poster;
    } else {
      imgEl.src = "./src/img/no-pictures.png";
      imgEl.classList.add("no-poster");
    }
    divEl.classList.add("description");
    divEl.append(spanEl, h1El);
    el.append(divEl, imgEl);
    aTag.append(el);
    moviesEl.append(aTag);
  }
  moreBtnEl.classList.remove("hidden");
}

// 무비 리스트 초기화 함수
export function initMovies() {
  moviesEl.innerHTML = ""; // 영화 리스트 초기화
  page = 1; // page 초기화
  moreBtnEl.classList.add("hidden"); // more버튼 가리기
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
// 더보기 버튼 핸들러
export const handleMoreBtn = async () => {
  let type = genreSelectBtn.innerText;
  let y = yearSelectBtn.innerText === "All" ? "" : yearSelectBtn.innerText;

  page += 1;
  const movies = await getMovies(searchText, type, y, page);
  renderMovies(movies);
};

moreBtnEl.addEventListener("click", handleMoreBtn);

// 최초 영화 호출!
(async () => {
  console.log("최초영화호출");
  const movies = await getMovies();
  renderMovies(movies);
  page += 1;
})();

///////////////////// 무한스크롤
const detectBottom = () => {
  console.log("detectBottom 작동");
  let scrollTop = document.documentElement.scrollTop;
  let innerHeight = window.innerHeight;
  let bodyScrollHeight = document.body.scrollHeight;

  if (scrollTop + innerHeight >= bodyScrollHeight) {
    return true;
  } else {
    return false;
  }
};

window.addEventListener(
  "scroll",
  _.throttle(() => {
    if (detectBottom() && infiniteScroll) {
      // 최하단에 도착하면 more 버튼 작동!
      console.log("more 작동!");
      handleMoreBtn();
    }
  }, 1000)
);

// 새로운 무한스크롤
// (() => {
//   const io = new IntersectionObserver(
//     (entry, observer) => {
//       // 1. 현재 보이는 target 출력
//       const ioTarget = entry[0].target;
//       // 2. viewport에 target이 보이면 하는 일
//       if (entry[0].isIntersecting && infiniteScroll) {
//         console.log("현재 보이는 타켓", ioTarget);
//         // 3. 현재 보이는 target 감시
//         io.observe(scrollSpyEl);
//         // 4. 더보기버튼함수 실행
//         handleMoreBtn();
//       }
//     },
//     {
//       // 5. 타겟이 50% 이상 보이면 실행
//       threshold: 1,
//     }
//   );
//   io.observe(scrollSpyEl);
// })();

/////////////////// 쓰레기통
//검색버튼핸들러
// searchBtnEl.addEventListener("click", async (event) => {
//   event.preventDefault(); // 새로고침 방지

//   searchText = searchTextEl.value;
//   searchTextEl.value = "";
//   initMovies(); // 영화 리스트 초기화
//   initDetails();

//   let type = searchGenreEl.value;
//   let y = searchYearEl.value;
//   let searchNumber = searchNumberEl.value;

//   console.log("searchNumber :", searchNumber);
//   if (searchText) {
//     const movies = await getMovies(searchText, type, y, page);
//     renderMovies(movies);

//     for (let i = 0; i < searchNumber; i++) {
//       console.log("more작동!");
//       handleMoreBtn();
//     }
//   }
// });

// function enterkey() {
//   if (window.event.keyCode == 13) {
//     console.log("hello");
//     handleSearchBtn();
//   }
// }
