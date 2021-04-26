import "./styles.css";
import { fetchData } from "./api_client/index";

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use the same configuration as Parcel to bundle this sandbox, you can find more
//   info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;

const dateEl = document.getElementById("datetime");
dateEl.appendChild(document.createTextNode(new Date().toLocaleString()));

console.log("--------------");
// const dt = new Date();
// console.log(dt.toString());
const hiddenClass = "hidden";
const toggleMenu = (e) => {
  e.stopPropagation();
  const liEl = e.target;

  // console.log("liEl", liEl.getElementsByTagName("ul")[0]);
  let child = liEl.getElementsByTagName("ul") || [];
  if (!child || !child.length) return;

  child = child[0];
  if ((child.className || "").includes(hiddenClass)) {
    //Method 2 to access class
    child.className = "";
  } else child.className = hiddenClass;
};

const createNestedList = (items, parent, isHidden) => {
  const ulEl = document.createElement("ul");

  //Method 1 to access class
  ulEl.setAttribute("class", isHidden ? hiddenClass : "");

  items.forEach(({ name, id, children = [] }) => {
    const liEl = document.createElement("li");
    liEl.appendChild(document.createTextNode(name));
    liEl.setAttribute("data-id", id);
    liEl.onmouseenter = toggleMenu;
    liEl.onmouseleave = toggleMenu;

    if (children.length > 0) {
      createNestedList(children, liEl, true);
    }
    ulEl.appendChild(liEl);
  });

  parent.appendChild(ulEl);
};

const renderList = async () => {
  const data = await fetchData();
  const appEl = document.getElementById("app");
  createNestedList(data, appEl, false);
};

renderList();
