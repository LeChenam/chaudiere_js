import Handlebars from 'handlebars';
import { getCategories } from './affichage_categories.js';
export async function displayEvents() {
    try {
        const events = await getCurrentEvents(await getEvents());
        const categories = await getCategories();
        if (!Array.isArray(events) || events.length === 0) {
            document.querySelector('#listEvents').innerHTML = '<p>No events found.</p>';
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
        const response = await fetch('http://localhost:13000/api/evenements');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.evenement || [];
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
        const eventDate = new Date(event.date_debut);
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });
}