import './css/styles.css';
import { fetchCountries } from './js/fetchcountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchCountriesInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchCountriesInput.addEventListener('input', debounce(onCountyNameInput, DEBOUNCE_DELAY));

function onCountyNameInput(e) {
    clearList();
    const countryName = e.target.value.trim();
    if (countryName !== ''){
    fetchCountries(countryName)
        .then((countries) => {
        if(countries.length>10){
            Notify.info('Too many matches found. Please enter a more specific name.');
        } else if(countries.length>=2 && countries.length<=10) {
            renderCountriesList(countries)
        }
        else {
            renderCountryCard(countries)
        }
    })
        .catch((error) => {console.log(error);
        Notify.failure('Oops, there is no country with that name')});}
}
function clearList(){
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}
function renderCountriesList(countries){
    countries.map(({ flags, name }) => 
    countryList.insertAdjacentHTML('beforeend', `<li class="country-item"><img class="country-flag" width="40"  src=${flags.svg}>
     <p class="country-name">${name.official}</p></li>`))
}
function renderCountryCard(countries){
    countries.map(({ flags, name, capital, population, languages}) =>{ 
   
    countryList.insertAdjacentHTML('beforeend', `<li class="country-item"><img class="country-flag" width="40"  src=${flags.svg}>
     <p class="country-name large">${name.official}</p></li>`)

    countryInfo.insertAdjacentHTML('beforeend', `
     <p class="info-text"><span>Capital: </span>${capital}</p>
     <p class="info-text"><span>Population: </span>${population}</p>
     <p class="info-text"><span>Languages: </span>${Object.values(languages)}</p>`)})
}


