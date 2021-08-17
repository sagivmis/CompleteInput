
const api = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';


const GetData = async () =>{
  let data = await fetch(api).then(res=>res.json());
  // console.log(data);

  return data;
}


const placesData=[];
GetData().then(res=>placesData.push(...res));


const GetMatchingPlaces = input=>{
  matchingPlaces = [];
  const regexp = new RegExp(input, 'gi');
  // console.log(placesData);
  placesData.map(place=>{
    if(place.city.match(regexp) || place.state.match(regexp)){
      matchingPlaces.push(`${place.city}, ${place.state}`);
    }
  })
  return matchingPlaces;
}


const UpdateListUI = (placesSuggestionsBasedOnInput)=>{
  suggestions.innerHTML = placesSuggestionsBasedOnInput.map(place =>{
    const regexp = new RegExp(inputText, 'gi');
    const highlightText = place.replace(regexp, `<span class="highlight">${inputText}</span>`);
    return `<li>${highlightText}</li>`;
  }).join('');
}


const UpdateList = (inputText)=>{
  suggestions.innerHTML = '';
  const placesSuggestionsBasedOnInput = GetMatchingPlaces(inputText);
  UpdateListUI(placesSuggestionsBasedOnInput);

}


const ResetList = ()=>{
  suggestions.innerHTML = `<li>Filter for a city</li><li>Or a state</li>`;
}


const GetSuggestions = () => {
  // console.log(searchBox.value);
  if(searchBox.value){
    UpdateList(searchBox.value);
  }
  else{
    ResetList();
  }
}


const searchBox = document.getElementById("search");
const suggestions = document.getElementById("suggestions");
// console.log(searchBox);
// console.log(suggestions);


searchBox.addEventListener('input', GetSuggestions);
