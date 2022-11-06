import renderMovieDetail from "./renderMovieDetail.js";
import {
  searchBarEl,
  searchText,
  genreSelectBtn,
  yearSelectBtn,
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
const moreLoadingEl = document.querySelector("#moreLoading");
let infiniteScroll = true; // 무한스크롤 작동 여부

bodyEl.addEventListener("click", () => console.log(page));

// 해쉬 바뀔 때 라우팅 효과 주기
window.addEventListener("hashchange", async () => {
  let hashValue = location.hash.replace("#", "");
  console.log("해쉬값:", hashValue);
  initMovies();
  initDetails();
  moviesEl.classList.add("border-dotted");
  if (hashValue === "") {
    // 아무것도 안하기
    console.log("hashValue === '' ");
    searchBarEl.classList.remove("hidden");
  } else if (hashValue.search("search/&s=") !== -1) {
    // 검색버튼 클릭시
    console.log("검색버튼 클릭함");
    // initMovies();
    // initDetails();
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
    // initMovies();
    // initDetails();
    searchBarEl.classList.remove("hidden");
    console.log("해쉬=search");
    infiniteScroll = true;
  } else if (hashValue === "movie") {
    //movie 버튼 클릭
    // 무비로 간경우 무비디테일 랜더링해라
    infiniteScroll = false;
    // initMovies();
    // initDetails();
    moviesEl.classList.remove("border-dotted");
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
    moviesEl.classList.remove("border-dotted");
    inputID = hashValue;
  }
});

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
