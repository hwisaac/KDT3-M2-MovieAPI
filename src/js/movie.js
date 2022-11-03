const posterEl = document.querySelector(".container .poster");

const titleEl = document.querySelector(".container .title");
const shortInfoEl = document.querySelector(".container .short-info");
const plotEl = document.querySelector(".container .plot");
const ratingsEl = document.querySelector(".container .ratings");
const actorsEl = document.querySelector(".container .actors");
const directorEl = document.querySelector(".container .director");
const productionEl = document.querySelector(".container .production");
const genreEl = document.querySelector(".container .genre");
const releasedEl = document.querySelector(".container .released");
const runtimeEl = document.querySelector(".container .runtime");
const countryEl = document.querySelector(".container .country");

const getOneMovie = async (id = "tt1285016") => {
  // const id = "tt1285016";
  const url = `https://omdbapi.com/?apikey=7035c60c&i=${id}`;

  // console.log(url);
  const res = await fetch(url);

  // movieData =  { Title, Actors, Country, Genre, Plot, Poster, Ratings, Released ,... }
  const movieData = await res.json();
  return movieData;
};

const renderOneMovie = async (movieData) => {
  let threeRates = "";
  const {
    Title,
    Actors,
    Country,
    Genre,
    Plot,
    Poster,
    Ratings,
    Released,
    Director,
    Production,
    Runtime,
  } = movieData;
  // console.log(movieData);
  console.log(Poster);
  // posterEl.style.backgroundImage = `url(${Poster})`;
  titleEl.textContent = Title;
  plotEl.textContent = Plot;

  //레이팅 출력
  for (let i = 0; i < 3; i++) {
    threeRates += `${Ratings[i].Source}: ${Ratings[i].Value} `;
  }
  ratingsEl.textContent = threeRates;

  actorsEl.textContent = Actors;
  directorEl.textContent = Director;
  actorsEl.textContent = Actors;
  productionEl.textContent = Production;
  genreEl.textContent = Genre;
  releasedEl.textContent = Released;
  runtimeEl.textContent = Runtime;
  countryEl.textContent = Country;
};

// (async () => {
//   const movieData = await getOneMovie();
//   renderOneMovie(movieData);
// })();
