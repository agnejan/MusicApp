// API dataList
// const dataList = rawData.results;

let dataList;

const input = document.getElementById("search-input");
const searchTerm = input.value;

const url = `https://api.discogs.com/database/search?q=${searchTerm}&token=iWbmjEPsBgNOQwxoCRmygmXAMLBaDXeFRTrEstaz`;

function searchByKeyword() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dataList = data.results;
      console.log("dataList", dataList);
      displayTable();
    });
}

const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchByKeyword());
console.log(input.value);

//LOOP THROUGH THE ARRAY RESULTS

const tbody = document.getElementById("tbody");

function displayTable() {
  dataList.forEach((dataItem) => {
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

// filtersButton.addEventListener("click", closeFilters); //THIS METHOD DOESNT WORK BECAUSE THERE IS TWO EVENTLSITENERS FOR THE SAME BUTTON? ASK LUCAS

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
