import { moviesEl, moreBtnEl, movieDetailEl } from "./main.js";

export function initMovies() {
  moviesEl.innerHTML = ""; // 영화 리스트 초기화
  moreBtnEl.classList.add("hidden"); // more버튼 가리기
}
export function initDetails() {
  movieDetailEl.innerHTML = "";
}
