import Handlebars from 'handlebars';
import { getCategories } from './affichage_categories.js';
import {displayFiltreParCateg, filtreParCateg} from "./filtre";
import {log} from "../out";
import {allEvents, load} from "./load";
export async function displayEvents() {
    try {
        let events = getCurrentEvents(await getEvents());
        const categories = await getCategories();
        const selectedCategory = document.querySelector('#categorySelect')?.value;
        events = filtreParCateg(selectedCategory, events);
        console.log(events);
        if (!Array.isArray(events) || events.length === 0) {
            document.querySelector('#listEvents').innerHTML += '<p>No events found.</p>';
            return;
        }
        const eventTemplate = document.querySelector('#eventsTemplate').innerHTML;
        const template = Handlebars.compile(eventTemplate);
        document.querySelector('#listEvents').innerHTML = template({ events, categories });
    } catch (error) {
        console.error('Error displaying events:', error);
        document.querySelector('#listEvents').innerHTML = '<p>Unable to display events.</p>';
    }
}

export async function getEvents() {
    if (allEvents === null) {
        await load();
    }return allEvents;
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

export function displayFiltreNEvents(){
    displayFiltreParCateg();
    displayEvents();
}