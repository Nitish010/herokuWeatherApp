const submitBtn = document.getElementById("submitbtn");
const cityName = document.getElementById("cityname");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const day = document.getElementById("day");
const today_date = document.getElementById("today-date");

const getCurrentDay = () => {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let currentTime = new Date();
  let day = weekday[currentTime.getDay()];
  return day;
};

const getCurrentTime = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  var now = new Date();
  var month = months[now.getMonth()];
  var date = now.getDate();

  let hours = now.getHours();
  let mins = now.getMinutes();

  let periods = "AM";

  if (hours > 11) {
    periods = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }

  return `${month} ${date} | ${hours}:${mins}${periods}`;
};

day.innerText = getCurrentDay();
today_date.innerText = getCurrentTime();

const getInfo = async (event) => {
  event.preventDefault();
  try {
    let cityVal = cityName.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=439cb626b7995c02a39d6755be549803`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    const arrData = [data];

    city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
    temp.innerHTML = `<span>${arrData[0].main.temp}</span><sup>o</sup>C,`;
    temp_status.innerText = arrData[0].weather[0].main;
  } catch {
    city_name.innerText =
      "Sorry We can't able to fetch the information of this city";
    temp.innerHTML = ":), ";
    temp_status.innerText = ":)";
  }
};

submitBtn.addEventListener("click", getInfo);
