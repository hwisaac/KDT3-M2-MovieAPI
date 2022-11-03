import {
  initMovies,
  initDetails,
  getMovies,
  renderMovies,
} from "../../main.js";

export default async function renderSearchPage() {
  console.log("renderSearchPage 작동!");
  initMovies();
  initDetails();
  const movies = await getMovies();
  renderMovies(movies);
}
