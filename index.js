let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

// use JSON.parse only for array to get the value from local storage of the browser
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage != null) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    //listItems += "<li> <a href='" +myLeads[i] +"'>" + myLeads[i] + "</a> </li>" ;
    listItems += `
    <li> 
        <a target='_blank' href='${leads[i]}'> 
            ${leads[i]} 
        </a> 
    </li> 
    `;
  }

  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function saveLead() {
  let inputVal = inputEl.value;
  myLeads.push(inputVal);
  inputEl.value = "";
  // use JSON.stringify(myLeads) only for array to store value in local storage in browser application
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});
