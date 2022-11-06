function extractString(address) {
  // const address ="http://127.0.0.1:5500/#search/s=frozen&type=movie&y=&page=2&repeat=10";

  let sRegExp = new RegExp(/s=\w*/, "g");
  let typeRegExp = new RegExp(/type=\w*/, "g");
  let pageRegExp = new RegExp(/page=\w*/, "g");
  let yearRegExp = new RegExp(/y=\w*/, "g");
  let repeatRegExp = new RegExp(/repeat=\w*/, "g");

  let res = {
    s: address.match(sRegExp)[0].slice(2) || "jobs",
    type: address.match(typeRegExp)[0].slice(5) || "movie",
    page: Number(address.match(pageRegExp)[0].slice(5)) || 1,
    y: Number(address.match(yearRegExp)[0].slice(2)) || "",
    repeat: Number(address.match(repeatRegExp)[0].slice(7)) || 0,
  };
  console.log(res);

  return res;
}
const s = "http://127.0.0.1:5500/#search/s=&type=&y=&page=&repeat=";
let obj = extractString(s);
obj;
const obj2 = { movie: 3, page: 4, y: 5 };
function ddf({ s = "frozen", type = "epi", page = 10, repeat = 1 }) {
  console.log(s);
  console.log(type);
  console.log(page);
  // console.log(y)
  console.log(repeat);
}

let ss = "2022-";

console.log(ss.replace(/-$/, ""));
