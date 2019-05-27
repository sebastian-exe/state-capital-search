const search = document.getElementById('search');
const matchList = document.getElementById('match-list'); 
let states;


//get states
const getStates = async () => {
const res = await fetch('states.json');
states = await res.json();
};

//filer states
const searchStates = searchText =>{
//get matches to current text input 
let matches = states.filter(state =>{
const regex = new RegExp(`^${searchText}`, 'gi');
return state.name.match(regex) || state.abbr.match(regex);
});

//if the search box is empty, set the text equal to an empty array
if(searchText.length === 0){
  matches = [];
  matchList.innerHTML = '';
}

 outputHtml(matches);
};

//show results in the html
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `<div class="card card-body mb-1">
         <h4>${match.name} (${match.abbr}) 
         <span class="text-primary">${match.capital}</span></h4>
        <small>Lat: ${match.lat} /Long: ${match.long}</small>
        </div> `
        )
        .join('');
        matchList.innerHTML = html;
    }
};


window.addEventListener('DOMContentLoaded', getStates);
search.addEventListener('input', () => searchStates (search.value));




