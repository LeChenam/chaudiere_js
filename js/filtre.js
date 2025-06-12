import Handlebars from "handlebars";
import { displayEvents } from './affichage_evenements.js';
import {allCategories} from "./load";

export function displayFiltreParCateg() {
    try {
        const categories = allCategories;
        if (!Array.isArray(categories) || categories.length === 0) {
            document.querySelector('#body').innerHTML += '<p>Aucune catégorie disponible.</p>';
            return;
        }
        const filtreTemplate = document.querySelector('#filtreCategTemplate').innerHTML;
        const template = Handlebars.compile(filtreTemplate);
        document.querySelector('#body').innerHTML += template({ categories });
    } catch (error) {
        console.error('Erreur lors du chargement des catégories :', error);
        document.querySelector('#body').innerHTML += '<p>Impossible de charger les catégories.</p>';
    }
}

export function displayFiltreParTemps() {
    const filtreTemplate = document.querySelector('#filtreTempsTemplate').innerHTML;
    const template = Handlebars.compile(filtreTemplate);
    document.querySelector('#body').innerHTML = template();
}

export function displaySimplifyFiltreParTemps(id) {
    const filtreTemplate = document.querySelector('#simplifyFiltreTempsTemplate').innerHTML;
    const template = Handlebars.compile(filtreTemplate);
    document.querySelector('#filtreTemps').innerHTML = template({id: id});
}

export function filtreParCateg(categId, events) {
    if (categId === null || categId === ""){
        return events;
    }else{
        return events.filter(event => event.categorie_id === Number(categId));
    }

}

export function filtreParTemps(temps, events) {
    if (temps === null || temps === "") {
        return events;
    } else {
        switch (temps) {
            case 'present':
                return getCurrentEvents(events);
            case 'future':
                return getFutureEvents(events);
            case 'past':
                return getPastEvents(events);
            default:
                console.error('Invalid time filter:', temps);
                return events;
        }
    }
}

export function getCurrentEvents(events) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    return events.filter(event => {
        const eventDate = new Date(event?.date_debut ?? null);
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });
}

export function getFutureEvents(events) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    return events.filter(event => {
        const eventDate = new Date(event?.date_debut ?? null);
        return eventDate.getMonth() > currentMonth || (eventDate.getMonth() === currentMonth && eventDate.getFullYear() > currentYear);
    });
}

export function getPastEvents(events) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    return events.filter(event => {
        const eventDate = new Date(event?.date_debut ?? null);
        return eventDate.getMonth() < currentMonth || (eventDate.getMonth() === currentMonth && eventDate.getFullYear() < currentYear);
    });
}