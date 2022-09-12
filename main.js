// API dataList
// const dataList = rawData.results;

// let dataList; // becuase we initiate it here it gets reassigned a new value in line21 which is still accessible then from global scope? if would initiate it with let in line 21 then it would not be available in global scope

// GLOBAL VARIABLES
const searchButton = document.querySelector("#search-button");

//FETCHING THE RESULTS

// searchButton.addEventListener("click", searchByKeywordAfterClick); //  how does this work with and without parentheses after function call? also how to call searhcByKeyword function expression? ask Lucas
//() call the function wihtout waiting for click event, wihtout () will wait for event

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
  const dataList = await jsonResult.results;
  displayTable(dataList); //passing dataList here makes the display table to be connected to the await and so laod only when data is ready
};

searchButton.addEventListener("click", searchByKeyword);

//LOOP THROUGH THE ARRAY RESULTS

const tbody = document.getElementById("tbody");

function displayTable(data) {
  tbody.innerHTML = ""; // make sure it's not inside the loop so not repeat it for all items
  data.forEach((dataItem) => {
    const tr = document.createElement("tr");
    const image = document.createElement("img");
    const imageUrl = dataItem.cover_image;
    image.src = imageUrl;
    image.className = "rounded";
    image.style.height = "80px";
    image.style.width = "auto";
    image.style.objectFit = "cover";
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td2.className = "title";
    td2.innerHTML = dataItem.title;
    const td3 = document.createElement("td");
    td3.innerHTML = dataItem.type;
    td1.appendChild(image);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
  });
}

function displayTable(data) {
  tbody.innerHTML = ""; // make sure it's not inside the loop so not repeat it for all items
  data.forEach((dataItem) => {});
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

// filtersButton.addEventListener("click", closeFilters); //this method doesnt work because it uses 2 eventlisteners for the same object? ask Lucas

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
//     titleValue = titlesList.textContent || titlesList.innerText; // should only use innerText here ? ask Lucas
//     console.log(titlesList);
//     if (titlesList) {
//       // here we are saying if titles dataList is present? ask Lucas
//       if (titleValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
//         //gets the index input.value within titleValues
//         tableRow[i].style.display = ""; // this is needed to reset the list on keychange in the searchbar - don't understand this fully yet ask Lucas
//       } else {
//         tableRow[i].style.display = "none";
//       }
//     }
//   }
// }
