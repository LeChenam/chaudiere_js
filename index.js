import {displayEvents} from "./js/affichage_evenements";
import Handlebars from 'handlebars';
import { filtreParCateg, filterEventsByCategory } from './js/filtre';
window.filterEventsByCategory = filterEventsByCategory;
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});
filtreParCateg();
displayEvents();