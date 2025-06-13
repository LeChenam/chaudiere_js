import {displayEvents, displayFiltreNEvents, displayEventDetails} from "./js/affichage_evenements";
import {displayAccueil} from "./js/affichage_accueil";
import {displayCategories, toggleCategoryEvents} from "./js/affichage_categories";
import Handlebars from 'handlebars';
window.displayEvents = displayEvents;
window.displayFiltreNEvents = displayFiltreNEvents;
window.displayAccueil = displayAccueil;
window.displayCategories = displayCategories;
window.toggleCategoryEvents = toggleCategoryEvents;
window.displayEventDetails = displayEventDetails;
Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
});
displayAccueil();