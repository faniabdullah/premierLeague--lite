
import { dbTeamsMatch , dbForFavorite } from "./db.js";
import { viewHtmlStandings , viewHtmlMatch , viewHtmlTeams , viewHtmlDetailTeam ,parseHttpToHttps , viewHtmlErorApi  } from "../view/view.js";
import { checkFavoriteTeams } from "../view/favorite.js";
const base_url = "https://api.football-data.org/v2/";
const IdCompetition = 2021; //id premier league
const fetchApi = (url) => {  
    return fetch(url, { 
        headers: { 
            'X-Auth-Token': '4168affc13234f3e82329da7541abb75' 
        } 
    }); 
}
const status = (response) => {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
      } else {
        return Promise.resolve(response);
      }
}
const json = (response) => {
    return response.json();
}

const getStanding = () => {
  fetchApi(base_url + "competitions/" + IdCompetition + "/standings")
    .then(status)
    .then(json)
    .then(viewHtmlStandings)
    .catch(errors =>{
      viewHtmlErorApi(errors);
    });
}

const getTeams = () => {
  fetchApi(base_url + "teams")
    .then(status)
    .then(json)
    .then(viewHtmlTeams)
    .catch(errors =>{
      viewHtmlErorApi(errors);
    });
}

const getMatchById = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  if (!idParam) {
    window.open("index.html","_parents")
  } else{
    //used prefre of save favorite because data api not complete item for favorite
  fetchApi(base_url + "teams/" + idParam)
  .then(status)
  .then(json)
  .then(saveTeamForFavorite)
  .catch(errors =>{
    viewHtmlErorApi(errors);
  });
  }
  
  await dbTeamsMatch.get(parseInt(idParam)).then((item) => {
    let elm = document.querySelector('.match-team-id');
    elm.innerHTML = ` <a href="#" class=" black-text" style="font-size:13px;">${item.name}</a>
    <ul id="nav-mobile" class="left ">
      <li><a href="./index.html"> <i class="black-text material-icons">arrow_back</i></a></li>
    </ul>
    <ul id="nav-mobile" class="right ">
      <li><a href="#" onclick ='isFavoriteTeams(${parseInt(item.id)})' ><i id="favorite-teams${parseInt(item.id)}" class="black-text material-icons">favorite_border</i></a></li>
    </ul>`;
  }); 
  
  fetchApi(base_url + "teams/" + idParam + "/matches")
  .then(status)
  .then(json)
  .then(viewHtmlMatch)
  .catch(errors =>{
    viewHtmlErorApi(errors);
  });
  checkFavoriteTeams(parseInt(idParam));
}


const getTeamsById = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  if (!idParam) {
    window.open("index.html","_parents")
  }else{
  fetchApi(base_url + "teams/" + idParam)
  .then(status)
  .then(json)
  .then(saveTeamForFavorite)
  .then(viewHtmlDetailTeam)
  .catch(errors =>{
    viewHtmlErorApi(errors);
  });
  }
}

const saveTeamForFavorite = (data) => {
  return new Promise((resolve,reject)=>{
  dbForFavorite.get(data.id).then((item) => {
    if (!item) {
      dbForFavorite.insert({
            id: data.id,
            name: data.name,
            imgTeam: (data.crestUrl)?parseHttpToHttps(data.crestUrl) : 'images/default-teams.png',
            address: data.address,
            phone:data.email,
            website:data.website,
            favorite:false,
            created: new Date().getTime()
        });
    }
   });
   resolve(data);
});
}

export { getStanding , getMatchById , getTeams , getTeamsById };