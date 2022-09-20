// 1 fetch in async/await
const getDataAsync = async () => {
  const response = await fetch("https://www.scorebat.com/video-api/v1/");
  const data = await response.json();
  // console.log('data', data)
  // createHtmlTable(data)
  // createDropDown(data)
  return data;
};

// 2 function for creating table and dropdown
const createHtmlTable = (footballList) => {
  let table = document.querySelector("#table");
  table.innerHTML = "";
  footballList.forEach((ele, i) => {
    let row = document.createElement("tr");
    row.id = `table-row-${i}`;
    table.appendChild(row);

    let column = document.createElement("td");
    column.innerHTML = ele.title;
    row.appendChild(column);

    let column2 = document.createElement("td");
    column2.innerHTML = ele.competition.name;
    row.appendChild(column2);

    let column3 = document.createElement("td");
    // reformat date
    const date = new Date(ele.date);
    const formatedDate = date.toLocaleString("de", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
    });
    // console.log('formatedDate', formatedDate)
    column3.innerHTML = formatedDate;
    row.appendChild(column3);
  });
};

const createDropDown = (list) => {
  const dropdown = document.getElementById("leagueDropdown");
  const competitions = list.map((e) => e.competition.name);
  console.log("competitions :>> ", competitions);
  const unique = [...new Set(competitions)];
  console.log("unique", unique);
  unique.forEach((game) => {
    let option = document.createElement("option");
    option.innerHTML = game;
    option.value = game;
    dropdown.appendChild(option);
  });
};

//3 make controller function
//main function async await
async function controller() {
  //get the data async
  const data = await getDataAsync();
  console.log("data", data);

  // build table with all data
  createHtmlTable(data);

  //generate DropDown filter options
  createDropDown(data);

  //create filter functions
  setEventListeners(data);
  // set event listeners
}
controller();

//4 add event listeners
const setEventListeners = (games) => {
  document.querySelector("#date").addEventListener("change", (event) => {
    // filterByDate(games)
    combineFilters(games);
  });
  document
    .querySelector("#leagueDropdown")
    .addEventListener("change", (event) => {
      // filterByDropDown(games)
      combineFilters(games);
    });
};

//5 fiter by date
const filterByDate = (games) => {
  const datePickerValue = document.querySelector("#date").value;
  console.log("datePickerValue", datePickerValue);
  console.log("games", games);

  const filteredGames = games.filter((game) => {
    const datePickerDate = new Date(datePickerValue).setHours(0, 0, 0, 0);
    const gameDate = new Date(game.date).setHours(0, 0, 0, 0);
    return gameDate === datePickerDate;
  });
  console.log("filteredGames", filteredGames);
  createHtmlTable(filteredGames);
};

//6 fiter by dropdown
const filterByDropDown = (games) => {
  // where does this games get defined/passed on ???? ask Lucas
  const dropDownValue = document.querySelector("#leagueDropdown").value;
  console.log("dropDownValue", dropDownValue);
  const filteredGames = games.filter(
    (game) => game.competition.name === dropDownValue
  );
  console.log("filteredGames", filteredGames);
  createHtmlTable(filteredGames);
};
//7 combine filters

const combineFilters = (games) => {
  const datePickerValue = document.querySelector("#date").value;
  const dropDownValue = document.querySelector("#leagueDropdown").value;

  console.log("datePickerValue", datePickerValue);
  const filteredGames = games.filter((game) => {
    const datePickerDate = new Date(datePickerValue).setHours(0, 0, 0, 0);
    const gameDate = new Date(game.date).setHours(0, 0, 0, 0);

    return (
      (game.competition.name === dropDownValue || dropDownValue === "all") &&
      (gameDate === datePickerDate || datePickerValue === "")
    );
  });
  console.log("filteredGames", filteredGames);
  createHtmlTable(filteredGames);
};

// 8 that really simple low time complexity solution that no-one thought about ^^

// 9  helper functions

const isInDropdown = (game) => {
  const dropDownValue = document.querySelector("#leagueDropdown").value;
};

const isDate = (game) => {
  const datePickerValue = document.querySelector("#date").value;
  console.log(`datePickerValue`, datePickerValue);
};
