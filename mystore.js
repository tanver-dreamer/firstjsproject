// Inpute text handle function
function handlesearch(isShowAll){
    // loading animation start
loadingAnimationToggale(true);

const searchItemElement = document.getElementById("search-input-field");
const searchInputValue = searchItemElement.value;
loadPhone(searchInputValue, isShowAll);
};

const handleShowAll = () => {
  handlesearch(true);
};


// For toggale Function
function loadingAnimationToggale(isLoading){
    const loadingAnimation = document.getElementById("loader-anim");

    if(isLoading){
        loadingAnimation.classList.remove("hidden");
    }else{
        loadingAnimation.classList.add("hidden");
    }

};


// Api handle
 const loadPhone = async(searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const serverData = await res.json();
    displayData(serverData.data, isShowAll);
};

 //Display data
 const displayData=(apiData, isShowAll)=>{
    
    console.log(apiData);
    const cardContainer = document.getElementById("card-section");
    cardContainer.innerHTML = "";
    const showAllContainer = document.getElementById("showAllBtn");
    
    if (apiData.length > 12 && !isShowAll) {
        showAllContainer.classList.remove("hidden");
    } else {
        showAllContainer.classList.add("hidden");
    };

    if (!isShowAll) {
        apiData = apiData.slice(0, 9);
    };


    apiData.forEach(phoneElement => {
    const phoneContcard = document.createElement("div");
    phoneContcard.classList.add("card");
    
    phoneContcard.innerHTML = `<div class = "card-image">
        <img src="${phoneElement.image}"/>
      </div>

      <h3 class ="card-title">${phoneElement.phone_name}</h3>
      <p class="card-desc">There are many variations of passages of available, but the majority have suffered </p>
      <div class="card-price">
        <span>$</span>
        <span id="card-item-price">999</span>
      </div>
      <div class="card-button">
        <button onClick="handleDetails('${phoneElement.slug}')" class="btn"> Show Details</button>

      </div>`;
 cardContainer.appendChild(phoneContcard);

    });

    
// loading animation false
loadingAnimationToggale(false);
};


// Api handle for Modal
const handleDetails =async(searchTextId)=>{

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${searchTextId}`);
    const proData = await res.json();
    const product = proData.data;
     showPdetails(product);

};


const showPdetails=(apiDatas)=>{
//console.log(apiDatas);

showDetailCointainer = document.getElementById("show-detail-container");

showDetailCointainer.innerHTML=`
<div id="modal-image-container">
        <img src="${apiDatas?.image}" alt="" />
      </div>
      <p id='modal-item-name'>${apiDatas?.name}</p>
      <p class="modal-item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque molestias recusandae vitae itaque quas vero?</p>
      <p class="modal-item-description"><span>Storage: </span>${
        apiDatas?.mainFeatures?.storage
      }</p>
      <p class="modal-item-description"><span>GPS: </span>${
        apiDatas?.others?.GPS || "No GPS available"
      }</p>
      <p class="modal-item-description"><span>GPS: </span>${
        apiDatas?.others?.GPS
          ? apiDatas.others.GPS
          : "No GPS available in this device"
      }</p>
      <p class="modal-item-description"><span>Sensors: </span>${apiDatas?.mainFeatures?.sensors?.join(
        ", "
      )}</p>
      <p class="modal-item-description"><span>Storage: </span>${
        apiDatas?.mainFeatures?.storage
      }</p>
      <p class="modal-item-description"><span>Storage: </span>${
        apiDatas?.mainFeatures?.storage
      }</p>
      <p class="modal-item-description"><span>Storage: </span>${
        apiDatas?.mainFeatures?.storage
      }</p>
      <p class="modal-item-description"><span>Storage: </span>${
        apiDatas?.mainFeatures?.storage
      }</p>
  `;

// show the modal

  const modal = document.getElementById("myModal");

  modal.style.display = "block";

  //close the modal
  document.getElementById("close").addEventListener("click", function () {
    modal.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

};