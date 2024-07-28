const hoursCounter = document.getElementById("hours_counter");

//Google Sheets update
const API_KEY = 'AIzaSyBO4X460r8emzoIR1cBsaap9c-grtSWp8Q';
const SHEET_ID = '1VqlpDEA1XmioQPW1eM-xFyWLsEYUkuRMDyilp2ehT8Y';
const numberOfMembers = 2
const RANGE = 'Sheet1!A1:F' + (numberOfMembers + 1);

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

  const PIN = sessionStorage.getItem("PIN");
  const password = sessionStorage.getItem("Password");

  console.log("PIN: " + PIN);
  console.log("password: " + password);
  console.log(table);

  for(var i = 0; i < table.length; i++)
    {
      console.log(i);
      if(table[i][0] == PIN && table[i][1] == password)
      {
        console.log("Account found!");
        updateProfile(table[i]);
      }
      else
      {
        //sessionStorage.setItem("PIN", "[NOPENOPE]");
        //sessionStorage.setItem("Password", "");
        //location.replace("member-log-in.html");
      }
    } 
}

function updateProfile(userInfo)
{
  console.log("User Info: " + userInfo);

  const firstName = userInfo[2];
  const lastName = userInfo[3];
  const hours = userInfo[4];
  const duesOwed = userInfo[5];
  
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

  document.getElementById("dues_display").textContent = duesOwed;
}
//fetch and display the data when the page loads
window.onload = fetchSheetData();


