import { handleMoreBtn } from "./main.js";
import { initMovies, initDetails } from "./initialize.js";
import { getMovies } from "./getMovies.js";
import { renderMovies } from "./renderMovies.js";

export const searchBarEl = document.querySelector("#searchBar");
export const searchTextEl = document.querySelector("#searchText");
export const searchBtnEl = document.querySelector("#searchBtn");
export let searchText = searchTextEl.value || "avengers";

export const genreSelectBtn = document.querySelector("#genreSelectBtn");
export const numberSelectBtn = document.querySelector("#numberSelectBtn");
export const yearSelectBtn = document.querySelector("#yearSelectBtn");
const genreSelectEls = document.querySelectorAll(".genre-select");
const numberSelectEls = document.querySelectorAll(".number-select");
// const yearSelectEls = document.querySelectorAll(".year-select");
const yearSelectList = document.querySelector("#yearSelectList");
// console.dir(yearSelectEls);
function handleGenreSelectEl(event) {
  // 버튼의 innerText 를 바꾸기
  genreSelectBtn.innerText = this.innerText;
}

genreSelectEls.forEach((el) => {
  el.addEventListener("click", handleGenreSelectEl);
});

function handleNumberSelectEl(event) {
  // 버튼의 innerText 를 바꾸기
  numberSelectBtn.innerText = this.innerText;
}
// 10,20,30 바꾸기 이벤트
numberSelectEls.forEach((el) => {
  el.addEventListener("click", handleNumberSelectEl);
});
// 연도 바꾸기 핸들러
function handleYearSelectEl() {
  yearSelectBtn.innerText = this.innerText;
}
// 연도 1990 ~ 2022 까지 추가
for (let i = 2022; i > 1990; i--) {
  const liEl = document.createElement("li");
  liEl.innerHTML = `<span class="dropdown-item year-select" data-value='${i}'>${i}</span>`;
  yearSelectList.append(liEl);
}

const yearSelectEls = document.querySelectorAll(".year-select");
console.dir(yearSelectEls);
yearSelectEls.forEach((el) => {
  el.addEventListener("click", handleYearSelectEl);
});
// console.dir("yearselectels", yearSelectEls);

// export const handleSearchBtn = async (event) => {
//   // // event.preventDefault(); // 새로고침 방지

//   searchText = searchTextEl.value;
//   searchTextEl.value = ""; // 텍스트 초기화
//   // initMovies(); // 영화 리스트 초기화
//   // initDetails();

//   // let type = searchGenreEl.value;
//   // let y = searchYearEl.value;
//   let type = genreSelectBtn.innerText;
//   let y = yearSelectBtn.innerText === "All" ? "" : yearSelectBtn.innerText;
//   let searchNumber = Number(numberSelectBtn.innerText);

//   console.log("searchNumber/10 :", searchNumber / 10);
//   if (searchText) {
//     const movies = await getMovies(searchText, type, y, page);
//     renderMovies(movies);

//     for (let i = 0; i < searchNumber / 10 - 1; i++) {
//       console.log("more작동!");
//       handleMoreBtn();
//     }
//   }
// };
export const handleSearchBtn = async (event) => {
  // // event.preventDefault(); // 새로고침 방지

  searchText = searchTextEl.value;
  searchTextEl.value = ""; // 텍스트 초기화
  let type = genreSelectBtn.innerText;
  let y = yearSelectBtn.innerText === "All" ? "" : yearSelectBtn.innerText;
  let page = 1;
  let repeat = Number(numberSelectBtn.innerText) / 10;
  let date = new Date();

  let address = `#search/&s=${searchText}&type=${type}&y=${y}&page=${page}&repeat=${repeat}&time=${date.getTime()}`;
  // address로 해쉬 변경
  location.assign(address);
};

//엔터키로 검색하기
searchTextEl.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (window.event.keyCode == 13) {
    handleSearchBtn();
  }
});
//검색버튼 클릭 이벤트
searchBtnEl.addEventListener("click", handleSearchBtn);
