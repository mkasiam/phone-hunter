//this function load phones from the url 
const loadPhone = async (phoneName="13",isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phoneName}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones,isShowAll);
};
//display phones
const displayPhone = (phones,isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");

//   display show all button if phones length is greater than 12
const showAllContainer = document.getElementById("show-all-container");
if(phones.length > 12){
    showAllContainer.classList.remove("hidden");
}
else{
    showAllContainer.classList.add("hidden");
}
if(!isShowAll){
  phones = phones.slice(0,12);
}

  phoneContainer.textContent = "";
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
              <img
                src=${phone.image}
                alt="Shoes"
                class="rounded-xl"
              />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions">
                <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleSpinner(false);
}
const searchHandle = () => {
    toggleSpinner(true);
    const searchInputField = document.getElementById("search-input");
    const searchInput = searchInputField.value;
    searchInputField.value ="";
    loadPhone(searchInput);
}

const toggleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if(isLoading){
      loadingSpinner.classList.remove("hidden");
    }
    else{
      loadingSpinner.classList.add("hidden");
    }

}
const showDetailsHandler =async (id) =>{
  console.log("Show details button clicked",id);
  //load details data of phone
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phoneInfo = data.data;
  show_details.showModal();
  showPhoneDetails(phoneInfo)
}

const showPhoneDetails = (phoneInfo) => {
  console.log(phoneInfo);
  const phoneName = document.getElementById("show-phone-name");
  phoneName.innerText = phoneInfo.name;
}


const showAllHandler = () => {
  searchHandle(true);
}


loadPhone();
