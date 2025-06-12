import {displayEvents, displayFiltreNEvents} from "./js/affichage_evenements";
import {displayAccueil} from "./js/affichage_accueil";
import {load} from "./js/load";
import Handlebars from 'handlebars';
window.displayEvents = displayEvents;
window.displayFiltreNEvents = displayFiltreNEvents;
window.displayAccueil = displayAccueil;
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});
displayAccueil();