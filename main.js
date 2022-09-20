// ASYNC AWAIT EXPRESSION

const getDataAsync = async () => {
  const input = document.getElementById("search-input");
  const url = `https://api.discogs.com/database/search?q=${input.value}&token=iWbmjEPsBgNOQwxoCRmygmXAMLBaDXeFRTrEstaz`; // having url as global variable doesnt work because input gets defined as "" on first load and never gets updated after that
  const response = await fetch(url);
  const jsonResult = await response.json();
  const data = replaceType(jsonResult.results);
  return data;
  //passing dataList here makes the display table to be connected to the await and so laod only when data is ready
  // filterByImage(dataList);
};

//CONTROLLER

async function controller(event) {
  event.preventDefault();
  const dataList = await getDataAsync();
  console.log(dataList);
  setEventListeners(dataList);
  combinedFilters(dataList);
  genreFilter(dataList);
  // displayGrid(dataList);
}

// controller () - calling this controller was the problem why the filters did not work om first load

//REPLACE "MASTER" & "RELEASE" TYPE VALUES INTO "ALBUM"
function replaceType(data) {
  const replacedTypes = data.map((item) => {
    if (item.type === "master") {
      item.type = "album";
    } else if (item.type === "release") {
      item.type = "album";
    }
    return item;
  });
  return replacedTypes;
}

//CREATING THE GRID OF RESULTS

function displayGrid(data) {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "";
  data.forEach((dataItem) => {
    //can use if statement for every i dividible by 3 and append everything until that point to to that div

    const div1 = document.createElement("div");
    div1.className = "col-sm d-flex justify-content-center";

    const div2 = document.createElement("div");
    div2.className = "card d-flex flex-row p-2 mb-3 ";
    div2.style = "width: 18rem";

    const div3 = document.createElement("div");
    div3.className =
      "d-flex flex-column justify-content-center card-left-container";

    const image = document.createElement("img");
    const imageUrl = dataItem.cover_image;
    image.src = imageUrl;
    image.className = "rounded";
    image.alt = "Card image cap";

    const div4 = document.createElement("div");
    div4.className = "card-body";

    const h5 = document.createElement("h5");
    h5.className = "card-title text-nowrap text-truncate";
    h5.innerHTML = dataItem.title;
    h5.setAttribute("data-bs-toggle", "tooltip"); // Lucas
    h5.setAttribute("title", dataItem.title);

    const h6_1 = document.createElement("h6");
    h6_1.className = "text-muted card-type tt";
    h6_1.innerHTML = dataItem.type.toUpperCase();

    const h6_2 = document.createElement("h6");
    h6_2.className = "text-muted card-year";
    h6_2.innerHTML = dataItem.year ?? " ";

    const h6_3 = document.createElement("h6");
    h6_3.className = "text-muted card-genre text-nowrap text-truncate";
    h6_3.innerHTML = dataItem.genre ?? " ";

    const a = document.createElement("a");
    a.className = "btn btn-outline-primary add-to-library-btn";
    a.innerHTML = "Add to library";

    resultsContainer.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(div3);
    div3.appendChild(image);
    div2.appendChild(div4);
    div4.appendChild(h5);
    div4.appendChild(h6_1);
    div4.appendChild(h6_2);
    div4.appendChild(h6_3);
    div4.appendChild(a);
  });
}

// FILTER SHOW MORE/LESS
const filtersButton = document.getElementById("filters-button");

function displayFilters() {
  const filters = document.getElementById("filters-container");

  if (filters.style.display === "none") {
    filters.style.display = "block";
    filtersButton.innerHTML = "-";
  } else {
    filters.style.display = "none";
    filtersButton.innerHTML = "+";
  }
}

// EVENT LISTENERS

filtersButton.addEventListener("click", displayFilters);
const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", controller);

function setEventListeners(data) {
  document
    .querySelector("#genre-select")
    .addEventListener("change", () => genreFilter(data));

  const checkboxes = document.querySelectorAll(".form-check-input");
  const checkBoxesArray = Array.from(checkboxes);
  checkBoxesArray.forEach((box) => {
    box.addEventListener("change", () => combinedFilters(data)); //here needs to be written as a call back function otherwise JS calls it immediately
  });
}

//GET "TYPE" CHECKBOX VALUES

function getTypeCheckedValues() {
  const checkboxes = document.querySelectorAll(".check-type");
  const checkBoxesArray = Array.from(checkboxes);
  const checkedValueArray = [];

  checkBoxesArray.forEach((item) => {
    if (item.checked) {
      checkedValueArray.push(item.value);
    }
  });
  return checkedValueArray;
}

//COMBINED FILTERS

function combinedFilters(data) {
  const imageCheckbox = document.getElementById("image-only-check");
  const checkedTypeValues = getTypeCheckedValues();
  const genreSelectValue = document.querySelector("#genre-select").value;
  console.log(checkedTypeValues);
  const filteredData = data.filter((item) => {
    if (checkedTypeValues.length === 0 && imageCheckbox.checked) {
      return !item.cover_image.includes(".gif");
    } else if (checkedTypeValues.length === 0) {
      return true;
    } else if (imageCheckbox.checked) {
      return (
        !item.cover_image.includes(".gif") &&
        checkedTypeValues.includes(item.type)
      );
    } else {
      return checkedTypeValues.includes(item.type);
    }
  });

  console.log(filteredData);
  displayGrid(filteredData);
}

// GENRE FILTER

function genreFilter(data) {
  const genreSelectValue = document.querySelector("#genre-select").value;
  const filteredByGenre = data.filter((item) => {
    if (item.genre) {
      return (
        item.genre.includes(genreSelectValue) || genreSelectValue === "All"
      );
    }
    console.log(item.genre);
  });
  displayGrid(filteredByGenre);
}

//ISSUES
//where should loader be in async await, tooltips not generating in DisplayGrid function
