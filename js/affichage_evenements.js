import Handlebars from 'handlebars';
import { getCategories } from './affichage_categories.js';
import {displayFiltreParCateg, filtreParCateg} from "./filtre";
import {log} from "../out";
export async function displayEvents() {
    try {
        let events = getCurrentEvents(await getEvents());
        console.log(events);
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
    try {
        const response = await fetch('http://localhost:13000/api/evenements', { method: 'GET' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return Array.isArray(data.evenement) ? data.evenement : [];
    } catch (error) {
        console.error('Unable to fetch events:', error);
        return [];
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

export function displayFiltreNEvents(){
    displayFiltreParCateg();
    displayEvents();
}