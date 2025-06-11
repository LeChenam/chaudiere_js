import Handlebars from "handlebars";
import {getCategories} from "./affichage_categories";
import { displayEvents } from './affichage_evenements.js';

export async function filtreParCateg() {
    try {
        const categories = await getCategories();
        if (!Array.isArray(categories) || categories.length === 0) {
            document.querySelector('#filtreCateg').innerHTML = '<p>Aucune catégorie disponible.</p>';
            return;
        }
        const filtreTemplate = document.querySelector('#filtreCategTemplate').innerHTML;
        const template = Handlebars.compile(filtreTemplate);
        document.querySelector('#filtreCateg').innerHTML = template({ categories });
    } catch (error) {
        console.error('Erreur lors du chargement des catégories :', error);
        document.querySelector('#filtreCateg').innerHTML = '<p>Impossible de charger les catégories.</p>';
    }
}

export function filterEventsByCategory() {
    const categorySelect = document.querySelector('#categorySelect');
    const selectedCategory = categorySelect.value;
    displayEvents(selectedCategory);
}