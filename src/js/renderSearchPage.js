// import { getMovies, renderMovies } from "./main.js";
import { initMovies, initDetails } from "./initialize.js";
import { getMovies } from "./getMovies.js";
import { renderMovies } from "./renderMovies.js";

export default async function renderSearchPage() {
  console.log("renderSearchPage 작동!");
  initMovies();
  initDetails();
  const movies = await getMovies();
  renderMovies(movies);
}
