import {displayEvents, displayFiltreNEvents} from "./js/affichage_evenements";
import Handlebars from 'handlebars';
window.displayEvents = displayEvents;
window.displayFiltreNEvents = displayFiltreNEvents;
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});