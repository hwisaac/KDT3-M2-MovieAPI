import { moreBtnEl } from "./main.js";
const moviesEl = document.querySelector("#movies");
export function renderMovies(movies) {
  if (!movies) {
    console.log("movies가 존재하지 않습니다!");
    return;
  }
  console.log(movies);
  for (const movie of movies) {
    const imdbID = movie.imdbID;
    const aTag = document.createElement("a");
    aTag.setAttribute("href", `/MovieAPI/#${imdbID}`);
    const el = document.createElement("div");
    el.classList.add("movie");

    // Type 2
    const divEl = document.createElement("div");
    const h1El = document.createElement("h1");
    const spanEl = document.createElement("span");
    h1El.textContent = movie.Title;
    spanEl.textContent = `${movie.Year.replace(/–$/, "")} / ${movie.Type}`;
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
