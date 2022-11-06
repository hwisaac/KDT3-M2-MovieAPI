// import { getOneMovie } from "./movie.js";
// import renderAboutPage from "./src/js/삭제renderAboutPage.js";
import renderMovieDetail from "./renderMovieDetail.js";
import renderSearchPage from "./renderSearchPage.js";
import {
  searchBarEl,
  searchBtnEl,
  searchTextEl,
  searchText,
  genreSelectBtn,
  yearSelectBtn,
  handleSearchBtn,
} from "./searchBar.js";
import { initMovies, initDetails } from "./initialize.js";
import { renderMovies } from "./renderMovies.js";
import { getMovies } from "./getMovies.js";

//////////////////// 초기화 코드들~
let inputID = "tt4154756";
const bodyEl = document.querySelector("body");
export const moviesEl = document.querySelector("#movies");
export const moreBtnEl = document.querySelector("#btnMore");
export const movieDetailEl = document.querySelector(".movie-detail");
let page = 1;
const scrollSpyEl = document.querySelector(".scroll-spy");
const searchGenreEl = document.querySelector(".search__genre");
const searchNumberEl = document.querySelector(".search__number");
const searchYearEl = document.querySelector(".search__year");
const moreLoadingEl = document.querySelector("#moreLoading");
let infiniteScroll = true; // 무한스크롤 작동 여부

bodyEl.addEventListener("click", () => console.log(page));
// // 해쉬 바뀔 때 라우팅 효과 주기
// window.addEventListener("hashchange", () => {
//   let hashValue = location.hash;
//   let hashData = (hashValue)
//   console.log("해쉬값 ", hashValue);
//   // console.log("해쉬값 ", hashValue);
//   hashValue = hashValue.slice(1);
//   if (hashValue === "") {
//     // 홈으로 간경우 서치페이지 랜더링해라
//     renderSearchPage();
//     searchBarEl.classList.remove("hidden");
//     infiniteScroll = true;
//   } else if (hashValue === "search") {
//     // 검색(=홈)으로 간경우 서치페이지 랜더링해라
//     renderSearchPage();
//     searchBarEl.classList.remove("hidden");
//     infiniteScroll = true;
//   } else if (hashValue === "movie") {
//     // 무비로 간경우 무비디테일 랜더링해라
//     infiniteScroll = false;
//     initMovies();
//     initDetails();
//     searchBarEl.classList.add("hidden");
//     if (inputID) {
//       console.log("inputID 로 랜더링");
//       inputID = inputID.replaceAll("#", "");
//       renderMovieDetail(inputID);
//     }
//   } else if (hashValue === "about") {
//     infiniteScroll = false;
//     // about로 가면 aboutpage를 랜더링해라
//     renderAboutPage();
//     searchBarEl.classList.add("hidden");
//   } else {
//     // ID 해쉬를 받은 경우
//     infiniteScroll = false;

//     renderMovieDetail();
//     searchBarEl.classList.add("hidden");
//     inputID = hashValue;
//   }
// });
// 해쉬 바뀔 때 라우팅 효과 주기
window.addEventListener("hashchange", async () => {
  let hashValue = location.hash.replace("#", "");
  console.log("해쉬값:", hashValue);

  if (hashValue === "") {
    // 아무것도 안하기
    console.log("hashValue === '' ");
    initMovies();
    initDetails();
    searchBarEl.classList.remove("hidden");
  } else if (hashValue.search("search/&s=") !== -1) {
    // 검색버튼 클릭
    console.log("검색버튼 클릭함");
    initMovies();
    initDetails();
    searchBarEl.classList.remove("hidden");
    let hashData = extractString(hashValue);
    const movies = await getMovies(hashData); // 데이터 불러오고 (시간걸림)
    renderMovies(movies);
    page = 2; // 페이지 초기화
    infiniteScroll = true; // 무한스크롤 켜기
    for (let i = 1; i < hashData.repeat; i++) {
      handleMoreBtn();
    }
  } else if (hashValue === "search") {
    // search 버튼 클릭
    // 검색(=홈)으로 간경우 서치페이지 랜더링해라
    initMovies();
    initDetails();
    searchBarEl.classList.remove("hidden");
    console.log("해쉬=search");
    infiniteScroll = true;
  } else if (hashValue === "movie") {
    //movie 버튼 클릭
    // 무비로 간경우 무비디테일 랜더링해라
    infiniteScroll = false;
    initMovies();
    initDetails();
    searchBarEl.classList.add("hidden");
    if (inputID) {
      console.log("inputID 로 랜더링");
      inputID = inputID.replaceAll("#", "");
      renderMovieDetail(inputID);
    }
    page = 1;
  } else if (hashValue === "about") {
    infiniteScroll = false;
    // about로 가면 aboutpage를 랜더링해라
    renderAboutPage();
    searchBarEl.classList.add("hidden");
  } else {
    // ID 해쉬를 받은 경우
    infiniteScroll = false;
    renderMovieDetail();
    searchBarEl.classList.add("hidden");
    inputID = hashValue;
  }
});

// export function renderMovies(movies) {
//   if (!movies) {
//     console.log("movies가 존재하지 않습니다!");
//     return;
//   }
//   console.log(movies);
//   for (const movie of movies) {
//     const imdbID = movie.imdbID;
//     const aTag = document.createElement("a");
//     aTag.setAttribute("href", `/#${imdbID}`);
//     const el = document.createElement("div");
//     el.classList.add("movie");

//     // Type 2
//     const divEl = document.createElement("div");
//     const h1El = document.createElement("h1");
//     const spanEl = document.createElement("span");
//     h1El.textContent = movie.Title;
//     spanEl.textContent = `${movie.Year.replace(/-$/, "")} / ${movie.Type}`;
//     let imgEl = document.createElement("img");
//     if (movie.Poster !== "N/A") {
//       imgEl.src = movie.Poster;
//     } else {
//       imgEl.src = "./src/img/no-pictures.png";
//       imgEl.classList.add("no-poster");
//     }
//     divEl.classList.add("description");
//     divEl.append(spanEl, h1El);
//     el.append(divEl, imgEl);
//     aTag.append(el);
//     moviesEl.append(aTag);
//   }
//   moreBtnEl.classList.remove("hidden");
// }

// 무비 리스트 초기화 함수 -삭제
// export function initMovies() {
//   moviesEl.innerHTML = ""; // 영화 리스트 초기화
//   page = 1; // page 초기화
//   moreBtnEl.classList.add("hidden"); // more버튼 가리기
// }
// export function initDetails() {
//   movieDetailEl.innerHTML = "";
// }

// export async function getMovies(
//   searchText = "avengers",
//   type = "movie",
//   y = "",
//   page = 1
// ) {
//   const url = `https://omdbapi.com/?apikey=7035c60c&s=${searchText}&page=${page}&type=${type}&y=${y}`;
//   console.log(url);
//   const res = await fetch(url);
//   const { Search: movies, totalResults } = await res.json();
//   return movies;
// }

////////////////////// 이벤트 리스너 등록
// 더보기 버튼 핸들러
export const handleMoreBtn = async () => {
  let type = genreSelectBtn.innerText;
  let y = yearSelectBtn.innerText === "All" ? "" : yearSelectBtn.innerText;
  moreLoadingEl.classList.remove("hidden"); // loading 애니메이션 시작
  console.log("handleMoreBtn 함수 작동 page증가", page);
  const movies = await getMovies({ searchText, type, y, page }); // 데이터 불러오고 (시간걸림)
  renderMovies(movies); // 데이터 표시
  moreLoadingEl.classList.add("hidden"); // loading 애니메이션 종료
  page += 1;
};

moreBtnEl.addEventListener("click", handleMoreBtn);

// 최초 영화 호출!
// (async () => {
//   console.log("최초영화호출");
//   const movies = await getMovies({});
//   renderMovies(movies);
//   page += 1;
//   console.log("최초영화호출 page증가", page);
// })();

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

function extractString(address) {
  // const address ="http://127.0.0.1:5500/#search/s=frozen&type=movie&y=&page=2&repeat=10";

  let sRegExp = new RegExp(/s=\w*/, "g");
  let typeRegExp = new RegExp(/type=\w*/, "g");
  let pageRegExp = new RegExp(/page=\w*/, "g");
  let yearRegExp = new RegExp(/y=\w*/, "g");
  let repeatRegExp = new RegExp(/repeat=\w*/, "g");

  let res = {
    searchText: address.match(sRegExp)[0].slice(2) || "jobs",
    type: address.match(typeRegExp)[0].slice(5) || "movie",
    page: Number(address.match(pageRegExp)[0].slice(5)) || 1,
    y: Number(address.match(yearRegExp)[0].slice(2)) || "",
    repeat: Number(address.match(repeatRegExp)[0].slice(7)) || 0,
  };
  return res;
}

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
