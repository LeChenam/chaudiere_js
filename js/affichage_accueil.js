import Handlebars from 'handlebars';
import {
    displayFiltreParCateg,
    displayFiltreParTemps,
    displaySimplifyFiltreParTemps,
    filtreParCateg,
    filtreParTemps
} from './filtre';
import {allCategories, allEvents, load} from './load';

export function displayEvents(simplify = false, categId = null) {
    try {
        let events = filtreParTemps(document.querySelector('#tempsSelect')?.value, allEvents);
        const selectedCategory = categId || document.querySelector('#categorySelect')?.value;
        events = filtreParCateg(selectedCategory, events);

        if (!Array.isArray(events) || events.length === 0) {
            document.querySelector('.listEvents').innerHTML = '<p>No events found.</p>';
            return;
        }

        const templateId = simplify ? '#simplifyEventsTemplate' : '#eventsTemplate';
        const templateElement = document.querySelector(templateId);
        if (!templateElement) {
            console.error(`Template ${templateId} not found`);
            return;
        }

        const template = Handlebars.compile(templateElement.innerHTML);
        document.querySelector('.listEvents').innerHTML = template({events, categories: allCategories});
    } catch (error) {
        console.error('Error displaying events:', error);
        document.querySelector('.listEvents').innerHTML = '<p>Unable to display events.</p>';
    }
}
