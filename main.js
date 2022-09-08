// API DATA
// const data = rawData.results;

let data;

const url =
  "https://api.discogs.com/database/search?q=rihana&key=ndqiGGFVIuiLYHmjQExU&secret=ADOGBtMyjsEJjQkyVcoNQTASKAuLfdCW";

fetch(url)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    data = data.results;
    console.log(data);
  });

//LOOP THROUGH THE ARRAY RESULTS

var tbody = document.getElementById("tbody");

// for (var i = 0; i < data.length; i++) {
//   var tr = document.createElement("tr");
//   var image = document.createElement("img");
//   var imageUrl = data[i].cover_image;
//   image.src = imageUrl;
//   image.className = "rounded";
//   image.style.height = "80px";
//   image.style.width = "auto";
//   image.style.objectFit = "cover";
//   var td1 = document.createElement("td");
//   var td2 = document.createElement("td");
//   td2.className = "title";
//   td2.innerHTML = data[i].title;
//   var td3 = document.createElement("td");
//   td3.innerHTML = data[i].type;

//   td1.appendChild(image);
//   tr.appendChild(td1);
//   tr.appendChild(td2);
//   tr.appendChild(td3);
//   tbody.appendChild(tr);
// }

// FILTER SHOW MORE/LESS

var filters = document.getElementById("filters-container");
var filtersButton = document.getElementById("filters-button");

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

//OPENING CLOSING THE FILTER FIRST ATTEMPT

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

//SEARCH BAR TERM RESULT FILTERING BASED ON TITLE

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

function filterTable() {
  var input, inputUpperCase, tableBody, tableRow, titlesList, i, titleValue;
  input = document.getElementById("search-input");
  // inputUpperCase = input.value.toUpperCase();
  tableBody = document.getElementById("tbody");
  tableRow = tableBody.getElementsByTagName("tr");

  for (i = 0; i < tableRow.length; i++) {
    titlesList = tableRow[i].getElementsByTagName("td")[1]; // here it's taking the 1st index position of out of 3 td elements
    titleValue = titlesList.textContent || titlesList.innerText; // should only use innerText here ? ask Lucas
    console.log(titlesList);
    if (titlesList) {
      // here we are saying if titles data is present? ask Lucas
      if (titleValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
        //gets the index input.value within titleValues
        tableRow[i].style.display = ""; // this is needed to reset the list on keychange in the searchbar - don't understand this fully yet ask Lucas
      } else {
        tableRow[i].style.display = "none";
      }
    }
  }
}
