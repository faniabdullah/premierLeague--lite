import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import "regenerator-runtime";
import "./css/style.css";
import "./images/logo.png";
import "./images/default-teams.png";
import "./images/default-player.png";
import "./images/logo-dark-mode.png";
import { isFavoriteTeams , saveSquadFav} from "./js/view/favorite.js";
import { loadPages} from "./js/script.js";
import { getTeamsById , getMatchById} from "./js/data/api.js";
import { setDarkMode } from "./js/view/view.js";
import { loadMobileNav , loadTopNav } from "./js/view/nav.js";
import { registerServiceWorker , requestPermission } from "./js/sw.js";
document.addEventListener('DOMContentLoaded', () => {
      if (!('serviceWorker' in navigator)) {
        console.log("Service worker tidak didukung browser ini.");
      } else {
        registerServiceWorker();
        requestPermission();
      }
    let page = window.location.hash.substr(1);
    if (page === "") page = "home";
    let pagesTeam = window.location.pathname.search("team.html");
    let pagesMatch = window.location.pathname.search("match.html");
     if (pagesTeam > -1) {
        getTeamsById();
     } else if (pagesMatch > -1) {
       getMatchById();
     } else {
        loadPages(page);
        loadTopNav();
        loadMobileNav();
      window.setDarkMode = setDarkMode;
     }
     window.saveSquadFav = saveSquadFav;
     window.isFavoriteTeams = isFavoriteTeams;
      });
