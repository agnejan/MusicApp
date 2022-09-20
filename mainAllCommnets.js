// API dataList
// const dataList = rawData.results;

// GLOBAL VARIABLES
let dataList;

//FETCHING THE RESULTS

// searchButton.addEventListener("click", searchByKeywordAfterClick); //  how does this work with and without parentheses after function call? also how to call searhcByKeyword function expression?

//with () calls the function wihtout waiting for click event, wihtout () will wait for event

// function searchByKeywordAfterClick(event) {
//   searchByKeyword(event);
// }

// GET URL FUNCTION FOR DYNAMIC FETCH WITH USER INPUT

// function getUrl() {
//   let url = `https://api.discogs.com/database/search?q=${input.value}&token=iWbmjEPsBgNOQwxoCRmygmXAMLBaDXeFRTrEstaz`;
//   console.log(url);
//   return url; //why doesnt work when use searchTerm.
// } // this is not needed as moving the URL to inside the function makes the URL dynamic based on user input

//FETCH.THEN EXPRESSION

// function searchByKeyword(event) {
//   const url = `https://api.discogs.com/database/search?q=${input.value}&token=iWbmjEPsBgNOQwxoCRmygmXAMLBaDXeFRTrEstaz`;
//   event.preventDefault(); //without this the show of results after "click" doesnt work -why ? becaus the HTML form refreshes by default after clisking submit type button
//   fetch(url)
//     // fetch(getUrl())
//     .then((response) => {
//       document.getElementById("loader").style.display = "block";
//       return response.json();
//     })
//     .then((data) => {
//       document.getElementById("loader").style.display = "none";
//       dataList = data.results;
//       displayTable();
//     });
// }

// ASYNC AWAIT EXPRESSION

const searchByKeyword = async (event) => {
  event.preventDefault();
  const input = document.getElementById("search-input");
  const url = `https://api.discogs.com/database/search?q=${input.value}&token=iWbmjEPsBgNOQwxoCRmygmXAMLBaDXeFRTrEstaz`; // having url as global variable doesnt work because input gets defined as "" on first load and never gets updated after that
  const response = await fetch(url);
  const jsonResult = await response.json();
  dataList = await jsonResult.results;
  console.log(dataList);
  displayGrid(dataList); //passing dataList here makes the display table to be connected to the await and so laod only when data is ready
  // filterByImage(dataList);
};

//CREATING THE GRID OF RESULTS
const resultsContainer = document.getElementById("results-container");

function displayGrid(data) {
  resultsContainer.innerHTML = ""; // make sure it's not inside the loop so not repeat it for all items
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
    // const yearOfResult = dataItem.year;
    // const correctedYear = function () {
    //   if (yearOfResult === "undefined") {
    //     yearOfResult = "";
    //   }
    //   return yearOfResult;
    // }; why this didnt work ? ask Lucas

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

// const tbody = document.getElementById("tbody");

// for (var i = 0; i < dataList.length; i++) {
//   var tr = document.createElement("tr");
//   var image = document.createElement("img");
//   var imageUrl = dataList[i].cover_image;
//   image.src = imageUrl;
//   image.className = "rounded";
//   image.style.height = "80px";
//   image.style.width = "auto";
//   image.style.objectFit = "cover";
//   var td1 = document.createElement("td");
//   var td2 = document.createElement("td");
//   td2.className = "title";
//   td2.innerHTML = dataList[i].title;
//   var td3 = document.createElement("td");
//   td3.innerHTML = dataList[i].type;

//   td1.appendChild(image);
//   tr.appendChild(td1);
//   tr.appendChild(td2);
//   tr.appendChild(td3);
//   tbody.appendChild(tr);
// }

// FILTER SHOW MORE/LESS

const filters = document.getElementById("filters-container");
const filtersButton = document.getElementById("filters-button");

function displayFilters() {
  if (filters.style.display === "none") {
    filters.style.display = "block";
    filtersButton.innerHTML = "-";
  } else {
    filters.style.display = "none";
    filtersButton.innerHTML = "+";
  }
}

filtersButton.addEventListener("click", displayFilters);

// function displayFilters() {
//   console.log(filters.style.display);
//   filters.style.display = "block";
//   filtersButton.innerHTML = "-";
//   console.log(filters.style.display);
// }

// filtersButton.addEventListener("click", displayFilters);

// function closeFilters() {
//   console.log(filters.style.display);
//   if (filters.style.display === "block") {
//     filters.style.display = "none";
//     filtersButton.innerHTML = "+";
//     console.log(filters.style.display);
//   }
// }

// filtersButton.addEventListener("click", closeFilters); //this method doesnt work because it uses 2 eventlisteners for the same object?

//SEARCH BAR TERM dataItem FILTERING BASED ON TITLE

// const list = document.querySelectorAll(".title");
// console.log(list);

// const searchBar = document.forms["search-box"].querySelector("input");
// searchBar.addEventListener("keyup", function (e) {
//   const term = e.target.value.toLowerCase();
//   const resultTitle = document.getElementsByTagName("tr");
//   Array.from(resultTitle).forEach(function (placeholder) {
//     const title = placeholder.secondElementChild.textContent;
//     if (title.toLowerCase().indexOf(term) != -1) {
//       placeholder.style.display = "block";
//     } else {
//       placeholder.style.display = "none";
//     }
//   });
// });

// function filterTable() {
//   let input, tableBody, tableRow, titlesList, i, titleValue;
//   input = document.getElementById("search-input");
//   // inputUpperCase = input.value.toUpperCase();
//   tableBody = document.getElementById("tbody");
//   tableRow = tableBody.getElementsByTagName("tr");

//   for (i = 0; i < tableRow.length; i++) {
//     titlesList = tableRow[i].getElementsByTagName("td")[1]; // here it's taking the 1st index position of out of 3 td elements
//     titleValue = titlesList.textContent || titlesList.innerText; // should only use innerText here ?
//     console.log(titlesList);
//     if (titlesList) {
//       // here we are saying if titles dataList is present?
//       if (titleValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
//         //gets the index input.value within titleValues
//         tableRow[i].style.display = ""; // this is needed to reset the list on keychange in the searchbar - don't understand this fully yet
//       } else {
//         tableRow[i].style.display = "none";
//       }
//     }
//   }
// }

//FILTERS

// const filteredByType = (data) => {
//   const checkedValues = getTypeCheckedValues();
//   const filteredDataByType = [];
//   data.forEach((item) => {
//     checkedValues.forEach((checkboxValue) => {
//       if (item.type === checkboxValue) {
//         filteredDataByType.push(item); //try to put into one filter function with replaceType (data);
//       }
//     });
//   });

//   displayGrid(filteredDataByType);

//   return filteredDataByType;
// };

// const filteredByImage = (data) => {
//   const imageCheckbox = document.getElementById("image-only-check");

//   const filteredDataWithImages = data.filter((item) => {
//     if (imageCheckbox.checked) {
//       return !item.cover_image.includes(".gif");
//     } else {
//       return true; //this returns everything, because the condition is true
//     }
//   });
//   console.log(filteredDataWithImages);
//   displayGrid(filteredDataWithImages);
//   return filteredDataWithImages;
// };

// const imageOnlyCheckbox = document.getElementById("image-only-check");
// imageOnlyCheckbox.addEventListener("change", function (e) {
//   const card = document.querySelector(".card");
//   if (imageOnlyCheckbox.checked) {
//     if (card.cover_image) {
//       card.style.display = "block";
//     } else {
//       card.style.display = "none";
//     }
//   }
// });

// EVENT LISTENERS

function setEventListeners(data) {
  const searchButton = document.querySelector("#search-button");
  searchButton.addEventListener("click", searchByKeyword);
  const checkboxes = document.querySelectorAll(".form-check-input");
  const checkBoxesArray = Array.from(checkboxes);
  checkBoxesArray.forEach((box) => {
    //eventListeners cannot be added to all array-like items at once, need to use for loop for this
    box.addEventListener("change", filterByType(data));
  });
}

setEventListeners(dataList);

//REPLACE "MASTER" & "RELEASE" TYPE VALUES INTO "ALBUM"

const replacedTypes = data.map((item) => {
  if (item.type === "master") {
    item.type = "album";
  } else if (item.type === "release") {
    item.type = "album";
  }
  return data;
});

console.log(replacedTypes);

//GET "TYPE" CHECKED VALUES

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

//FILTERS

function filterByType(data) {
  const checkedValues = getTypeCheckedValues();
  const filteredResults = [];
  data.forEach((item) => {
    checkedValues.forEach((checkboxValue) => {
      if (item.type === checkboxValue) {
        filteredResults.push(item);
      }
    });
  });
  displayGrid(filteredResults);
  return filteredResults;
}

function filterByImage(data) {
  const imageCheckbox = document.getElementById("image-only-check");
  const filteredDataWithImages = data.filter((item) => {
    console.log(imageCheckbox.checked);
    if (imageCheckbox.checked) {
      return !item.cover_image.includes(".gif");
    } else {
      return true; //check this later
    }
  });
  displayGrid(filteredDataWithImages);
  return filteredDataWithImages;
}

//COMBINING FILTERS

function combinedFilters(data) {
  const checkedValues = getTypeCheckedValues();
  const filteredResults = [];
  const imageCheckbox = document.getElementById("image-only-check");
  let replacedType = data.forEach((item) => {
    if (item.type === "master") {
      item.type = "album";
    } else if (item.type === "release") {
      item.type = "album";
    }
  });
  replacedType.forEach((item) => {
    console.log(item);
    checkedValues.forEach((checkboxValue) => {
      if (item.type === checkboxValue) {
        filteredResults.push(item);
      }
    });
  });

  data.filter((item) => {
    console.log(imageCheckbox.checked);
    if (imageCheckbox.checked) {
      return filteredResults.push(!item.cover_image.includes(".gif"));
    }
  });
  displayGrid(filteredResults);
  return filteredResults;
}

//QS - replacing type names, combining filters, where should loader be? in async await, tooltips,
