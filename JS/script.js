//Create HTML element
document.body.innerHTML = `
    <div class="header">
        <h1>Anime</h1>
        <input id="search-box" type="search" name="search" placeholder="Search here">
    </div>
    <div id="mainContainer" class="main-container"></div>
`;

//declare a variable
let convertData;

//Create function for get the data from api
const getData = async () => {
  try {
    //Fetch the data from api
    const data = await fetch("https://api.jikan.moe/v3/search/anime?q=anime");

    //Convert data into json
    convertData = await data.json();

    mainContainer.innerHTML = "";
    //iterate a loop to print the all data
    convertData.results.forEach((datas) => {
      displayData(datas);
    });

    //Error handling portion
  } catch (err) {
    console.log(err);
  }
};

//Call the funtion
getData();

//create function for display the data
const displayData = (obj) => {
  mainContainer.innerHTML += `
        <div class="setdata">
              <img class="image" src="${obj.image_url}">
              <p><b>Name : <span>${obj.title}</span></b></p>
              <p><b>Start Date : </b><span>${obj.start_date}</span></p>
              <p><b>End Date : </b><span>${obj.end_date}</span></p>
              <p><b>Type : </b><span>${obj.type}</span></p>
              <p><b>IMDB : </b><span>${obj.rated}</span></p>
        </div>`;
};

//Search functionality

//declare valriable to store searchbox
let searchBox = document.querySelector("#search-box");

//add one event
searchBox.addEventListener("keyup", function () {
  //assign a searchbox value
  let textEntered = searchBox.value;

  //empty array
  let filteredName = [];

  //search box value in lowercase
  textEntered = textEntered.toLowerCase();
  //inside the search box not a any value then condition is false and print the all data
  //if condition is true than enter in if condition
  if (textEntered != "") {
    //filter the data
    filteredName = convertData.results.filter(function (names) {
      return names.title.toLowerCase().includes(textEntered);
    });
    if (filteredName && filteredName.length) {
      document.querySelector("#mainContainer").innerHTML = "";
      //iterate loop to print the filtered data
      filteredName.forEach((datas) => {
        displayData(datas);
      });
    } else {
      document.querySelector("#mainContainer").innerHTML = "";
    }
  } else {
    document.querySelector("#mainContainer").innerHTML = "";

    convertData.results.forEach((datas) => {
      displayData(datas);
    });
  }
});
