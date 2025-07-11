import Handlebars from 'handlebars';
import { marked } from 'marked';
import {
    displayFiltreParCateg,
    displayFiltreParTemps,
    displaySimplifyFiltreTemps,
    filtreParCateg,
    filtreParTemps
} from "./filtre";
import {allCategories, allEvents, load} from "./load";
import {displayTrie, trie} from "./trie";

export async function displayEventDetails(eventId) {
    let eventLink = allEvents.find(e => e.id === Number(eventId));
    if (!eventLink) {
        console.error(`Event with ID ${eventId} not found.`);
        return;
    }
    eventLink = eventLink.links.self.href;
    eventLink = `http://docketu.iutnc.univ-lorraine.fr:13000${eventLink}`;
    const response = await fetch(eventLink);
    if (!response.ok) {
        console.error(`Failed to fetch event details: ${response.status} ${response.statusText}`);
        return;
    }
    const data = await response.json();
    const event = data.evenement;
    const description = marked.parse(event.description_md || '');
    let imageLinks = null;
    if (event.image !== null) {
        imageLinks = `http://docketu.iutnc.univ-lorraine.fr:13000${event.image.href}`;
    }
    const detailsTemplate = document.querySelector('#eventTemplate').innerHTML;
    const template = Handlebars.compile(detailsTemplate);
    document.querySelector('#body').innerHTML = template({ event, categories: allCategories, description: new Handlebars.SafeString(description), image: imageLinks  });
}
export function displayEvents(simplify = false, categId = null) {
    let templateEvent = null;
    let section = null;
    let temps = null;
    let typeTrie = null;

    if(simplify){
        templateEvent = document.querySelector('#simplifyEventsTemplate').innerHTML;
        section= document.querySelector(`#listEvents-${categId}`);
        temps= document.querySelector(`#tempsSelect-${categId}`)?.value;
        typeTrie= document.querySelector(`#trieSelect-${categId}`)?.value;
    }else{
        templateEvent = document.querySelector('#eventsTemplate').innerHTML;
        section = document.querySelector('#listEvents');
        temps= document.querySelector('#tempsSelect')?.value;
        typeTrie= document.querySelector('#trieSelect')?.value;
    }

    if (!templateEvent || !section) {
        console.error('Template or section not found:', { templateEvent, section });
        return;
    }

    try {
        let events = filtreParTemps(temps, allEvents);
        const selectedCategory = categId || document.querySelector('#categorySelect')?.value;
        events = filtreParCateg(selectedCategory, events);
        events = trie(typeTrie, events);

        if (!Array.isArray(events) || events.length === 0) {
            section.innerHTML = '<p>No events found.</p>';
            return;
        }
        const template = Handlebars.compile(templateEvent);
        section.innerHTML = template({events, categories: allCategories});
    } catch (error) {
        console.error('Error displaying events:', error);
        section.innerHTML = '<p>Unable to display events.</p>';
    }
}

export function displayFiltreNEvents(){
    displayFiltreParTemps();
    displayTrie();
    displayFiltreParCateg();
    displayEvents();
}

export function displaySimplifyFiltreNEvents(categId){
    displayTrie(categId);
    displaySimplifyFiltreTemps(categId);
    displayEvents(true, categId);
}