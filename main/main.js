let searchBtn = document.getElementById("searchbtn");
let startLocation = document.getElementById("start-location");
let endLocation = document.getElementById("end-location");
let datePicker = document.getElementById("date-picker");
// Set select options
let SelectOptionList = {
  OptionA: "Petroșani",
  OptionB: "Lupeni",
  OptionC: "Vulcan",
  OptionD: "Uricani",
};

// Get Start Town,End Town and Date when Search Btn is pressed
searchBtn.addEventListener("click", () => {
  let startTown = startLocation.options[startLocation.selectedIndex].text;
  let endTown = endLocation.options[endLocation.selectedIndex].text;
  let date = datePicker.value;
  getTowns(startTown, endTown, date);
});

// Get startTown location and end location
let getTowns = (startTown, endTown, date) => {
  if (startTown === endTown) {
    alert("Nu poți folosi același oraș ca început și destinație! ");
  } else {
    fetch("rutes.json")
      .then((response) => response.json())
      .then((jsonResponse) => {
        let mainTowns = jsonResponse[0];
        Object.keys(mainTowns).forEach(function (key) {
          let rutesTable = document.getElementById("rutesTable");
          let rutesListDiv = document.getElementById("rutes__list");

          if (startTown === key) {
            if (Object.keys(mainTowns[key]).includes(endTown)) {
              rutesListDiv.innerHTML = ""; //Asta sterge tabelul
              let hours = mainTowns[key][endTown];
              createTableContents(startTown, endTown, hours);
            }
          }
        });
      });
  }
};

// Creates new table row and cell
// let createTableContents = (startTown, endTown, hours) => {
//   let arrLength = hours.length;
//   let rutesTable = document.getElementById("rutesTable");

//   for (let i = 0; i < arrLength; i++) {
//     var row = rutesTable.insertRow(i);
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);
//     var cell3 = row.insertCell(2);
//     cell1.innerHTML = startTown;
//     cell2.innerHTML = endTown;
//     cell3.innerHTML = hours[i];
//   }
// };
let createTableContents = (startTown, endTown, hours) => {
  let arrLength = hours.length;
  // let rutesTable = document.getElementById("rutesTable");
  let rutesListDiv = document.getElementById("rutes__list");
  document.getElementById("secondbody").style.height = "auto";

  for (let i = 0; i < arrLength; i++) {
    let newUL = document.createElement("ul");
    newUL.setAttribute(
      "class",
      "list-group-flush  d-flex flex-row justify-content-center align-items-center p-3 "
    );
    let liTown = document.createElement("li");
    let liEnd = document.createElement("li");
    let liHour = document.createElement("li");
    let bookingBtn = document.createElement("a");

    liTown.innerHTML = startTown;
    liEnd.innerHTML = endTown;
    liHour.innerHTML = hours[i];
    bookingBtn.innerHTML = "Rezervă!";

    liTown.setAttribute("class", "list-group-item ");
    liEnd.setAttribute("class", "list-group-item ");
    liHour.setAttribute("class", "list-group-item ");
    bookingBtn.setAttribute("class", "btn btn-info ");
    bookingBtn.setAttribute("href", "#");

    rutesListDiv.appendChild(newUL);
    newUL.appendChild(liTown);
    newUL.appendChild(liEnd);
    newUL.appendChild(liHour);
    newUL.appendChild(bookingBtn);
  }
};

// Get select options from list and put them in options
for (index in SelectOptionList) {
  let startLocationList = (startLocation.options[startLocation.options.length] =
    new Option(SelectOptionList[index], index));
  let endLocationList = (endLocation.options[endLocation.options.length] =
    new Option(SelectOptionList[index], index));
}

// // Create new li and set clas to them
let createLists = () => {};
