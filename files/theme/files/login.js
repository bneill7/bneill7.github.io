const hoursCounter = document.getElementById("hours_counter");

//Google Sheets update
const API_KEY = 'AIzaSyBPWyQbAwL5AUWZVhAATQv7cA284rFTsw0';
const SHEET_ID = '1ZWKIf6ResLpZHFr5PpgTdoWWog2dga7DkzogH4wyX10';
const numberOfMembers = 2
const RANGE = 'Sheet1!A1:C112';

async function fetchSheetData()
{
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  try{

    const response = await fetch(url);
    const data = await response.json();
    const table = data.values;
    console.log("Yay!")
    login(table);
  } catch(error)
  {
    console.error('Error fetching data:', error);
  }
}

function login(table)
{
  console.log("Logging in...");

  const PIN = toTitleCase(sessionStorage.getItem("PIN").replaceAll(" ", ''));
  const password = toTitleCase(sessionStorage.getItem("Password").replaceAll(" ", ""));

  console.log("PIN: " + PIN);
  console.log("password: " + password);
  console.log(table);

  for(var i = 0; i < table.length; i++)
    {
      console.log(i);
      if(toTitleCase(table[i][0].replaceAll(" ", "")) == PIN && toTitleCase(table[i][1].replaceAll(" ", "")) == password)
      {
        console.log("Account found!");
        updateProfile(table[i]);
        return;
      }
    } 
    sessionStorage.setItem("PIN", "[NOPENOPE]");
    sessionStorage.setItem("Password", "");
    location.replace("member-log-in.html");
}

function updateProfile(userInfo)
{
  console.log("User Info: " + userInfo);

  const firstName = userInfo[0];
  const lastName = userInfo[1];
  const hours = userInfo[2];
  //const duesOwed = userInfo[5];
  
  const semesterCountdown_text = document.getElementById("semester_countdown");
  hoursCounter.textContent = hours;
  hoursLeft_firstSemester = 15 - hours;
  if(hoursLeft_firstSemester > 0)
  {
    semesterCountdown_text.textContent = hoursLeft_firstSemester;
  } else{
    semesterCountdown_text.textContent = "no";
  }
  document.getElementById("member_name_text").textContent = firstName + "!";

  hoursLeft_year = 30 - hours;
  if(hoursLeft_year > 0)
  {
    document.getElementById("year_countdown").textContent = hoursLeft_year;
  } else{
    document.getElementById("year_countdown").textContent = "no";
  }

  //document.getElementById("dues_display").textContent = duesOwed;
}

function toTitleCase(str) {
  if(!str) {
    return "";
  }
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}
//fetch and display the data when the page loads
window.onload = fetchSheetData();


