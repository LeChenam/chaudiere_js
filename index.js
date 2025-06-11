import {displayEvents} from "./js/affichage_evenements";
import Handlebars from 'handlebars';
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});
displayEvents();