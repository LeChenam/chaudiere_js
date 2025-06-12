import Handlebars from "handlebars";
import {getCategories} from "./affichage_categories";
import { displayEvents } from './affichage_evenements.js';

export async function displayFiltreParCateg() {
    try {
        const categories = await getCategories();
        if (!Array.isArray(categories) || categories.length === 0) {
            document.querySelector('#body').innerHTML = '<p>Aucune catégorie disponible.</p>';
            return;
        }
        const filtreTemplate = document.querySelector('#filtreCategTemplate').innerHTML;
        const template = Handlebars.compile(filtreTemplate);
        document.querySelector('#body').innerHTML = template({ categories });
    } catch (error) {
        console.error('Erreur lors du chargement des catégories :', error);
        document.querySelector('#body').innerHTML = '<p>Impossible de charger les catégories.</p>';
    }
}

export function filtreParCateg(categId, events) {
    if (categId === null || categId === ""){
        return events;
    }else{
        console.log(categId);
        console.log("evenement 0 : " + events[0].categorie_id);
        return events.filter(event => event.categorie_id === Number(categId));
    }

}