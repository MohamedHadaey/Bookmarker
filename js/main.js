/* crud operation  */


/********    variables declaration ********** */

var siteName = document.getElementById("name");
var siteUrl = document.getElementById("url");
var submitBtn = document.getElementById("submitBtn");
var searchInput = document.getElementById("search");
var nameAlert = document.getElementById("nameAlert");
var urlAlert = document.getElementById("urlAlert");
var inputs = document.getElementsByClassName("form-control");
var sites = [];
var currentIndex = 0;

if (JSON.parse(localStorage.getItem("itemsList")) != null) {
    sites = JSON.parse(localStorage.getItem("itemsList"));
    displaySite();
}

/********    button function ********** */

submitBtn.onclick = function () {
    if (submitBtn.innerHTML == "add site") {
        addSites();

    } else {
        updateSite();
    }
    displaySite();
    clearData();
};

/********    add function ********** */

function addSites() {
    var site = {
        name: siteName.value,
        url: siteUrl.value,
    };
    sites.push(site);
    localStorage.setItem("itemsList", JSON.stringify(sites));
}

/********    display function ********** */

function displaySite() {
    var cartona = "";
    for (var i = 0; i < sites.length; i++) {
        cartona += `<div class="p-4 mb-3 test1">
                    <h2>${sites[i].name}</h2>
                    <div class="text-end">
                    <a href="${sites[i].url}" class="btn text-white" target="_blank">visit</a>
                    <button onclick="deleteSite(${i})" class="btn text-white"> Delete </button>
                    <button onclick="getSiteInfo(${i})" class="btn text-white"> update </button>
                    </div>
                  </div>`;
    }
    document.getElementById("listBody").innerHTML = cartona;
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
}

/********    reset function ********** */

function clearData() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

/********    delete function ********** */

function deleteSite(index) {
    sites.splice(index, 1);
    displaySite();
    localStorage.setItem("itemsList", JSON.stringify(sites));
}

/********    search function ********** */
searchInput.onkeyup=function(){
    var cartona = "";
    var val=searchInput.value
    for (var i = 0; i < sites.length; i++) {
        if (sites[i].name.toLowerCase().includes(val.toLowerCase())) {
            cartona += `<div class="p-4 mb-3 test1">
                        <h2>${sites[i].name}</h2>
                        <a href="${sites[i].url}" class="btn bg-primary text-white" target="_blank">visit</a>
                        <button onclick="deleteSite(${i})" class="btn bg-danger text-white"> Delete </button>
                        <button onclick="getSiteInfo(${i})" class="btn bg-warning text-white"> update </button>
                      </div>`;
        }
    }
    document.getElementById("listBody").innerHTML = cartona;
}

/********    update functions ********** */

function getSiteInfo(index) {
    siteName.value = sites[index].name;
    siteUrl.value = sites[index].url;
    submitBtn.innerHTML = "update site";
    currentIndex = index;
}
function updateSite() {
    var site = {
        name: siteName.value,
        url: siteUrl.value,
    };
    sites[currentIndex] = site;
    localStorage.setItem("itemsList", JSON.stringify(sites));
    submitBtn.innerHTML = "add site";
}

/********    validation function ********** */

siteName.onkeyup=function(){
    nameRejex=/^[A-Z][a-z]{2,10}$/
    ;
    if(!nameRejex.test(siteName.value)){
      submitBtn.disabled="true";
      siteName.classList.add("is-invalid");
      siteName.classList.remove("is-valid");
      nameAlert.classList.remove("d-none")
    }
    else{
      submitBtn.removeAttribute("disabled");
      siteName.classList.add("is-valid");
      siteName.classList.remove("is-invalid");
      nameAlert.classList.add("d-none")
    }
  }

  siteUrl.onkeyup=function(){
    urlRejex=/^(http|https).{3}www.{1}[a-z]{2,10}.{1}com$/
    ;
    if(!urlRejex.test(siteUrl.value)){
      submitBtn.disabled="true";
      siteUrl.classList.add("is-invalid");
      siteUrl.classList.remove("is-valid");
      urlAlert.classList.remove("d-none")
    }
    else{
      submitBtn.removeAttribute("disabled");
      siteUrl.classList.add("is-valid");
      siteUrl.classList.remove("is-invalid");
      urlAlert.classList.add("d-none")
    }
  }