'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const searchBtn  = document.querySelector('.search-btn');
const countriesArray=[];
const renderCountry = function (data) {
  const html = `
  <article class="country" data-country='${data.name.toLowerCase()}' data-country-alpha='${data.alpha2Code.toLowerCase()}'>
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <div class="country__info"> 
        <h3 class="country__name">${data.name} (${data.alpha2Code})</h3>
        <h4 class="country__region">${data.region}</h4>
      </div>
      <p class="country__row"><span> 🛕</span>${data.capital }</p>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1) > 0 ? (+data.population / 1000000).toFixed(1)+ " M" : +data.population} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name }</p>
      <p class="country__row"><span>💰</span>${data.currencies ? data.currencies[0].name + ` (${data.currencies[0].symbol})` : "No Currencie" }  </p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function () {
  fetch(`https://restcountries.com/v2/all`)
     .then(function (response) {
       console.log(response);
       return response.json();
    })
    .then(function (data) {
      console.log(data);
      data.forEach(el => {
        renderCountry(el);
      }); 
      
    });
};

getCountryData();



const search = function(){
  let  y  = ''; 
  const input = document.querySelector('.search-input');
  let country0 = document.querySelector(`[data-country="${input.value.toLowerCase()}"]`);
  let country1 = document.querySelector(`[data-country-alpha="${input.value.toLowerCase()}"]`);
  if(country0){
    y = country0.getClientRects()[0].top.toFixed(0);
    window.scrollTo(0 , y - 50);
    input.value="";
    return ;
  }
  if(country1){
    y = country1.getClientRects()[0].top.toFixed(0);
    window.scrollTo(0 , y - 100);
    input.value="";
    return ;
  }
  alert("Invalid country name");
}


searchBtn.addEventListener("click" , search);
// search when click enter 
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    search();
  }
});
