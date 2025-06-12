import Handlebars from 'handlebars';
import {allCategories, allEvents, load} from "./load";
import {filtreParCateg} from "./filtre";

export async function getCategories() {
    if (allCategories === null) {
        await load();
    }return allCategories;
}

export async function displayCategories() {
    try {
        const categories = await getCategories();
        if (!Array.isArray(categories) || categories.length === 0) {
            document.querySelector('#body').innerHTML += '<p>No categories found.</p>';
            return;
        }
        const categoryTemplate = document.querySelector('#categoriesTemplate').innerHTML;
        const template = Handlebars.compile(categoryTemplate);
        document.querySelector('#body').innerHTML = template({ categories });
    } catch (error) {
        console.error('Error displaying categories:', error);
        document.querySelector('#body').innerHTML = '<p>Unable to display categories.</p>';
    }
}

export function toggleCategoryEvents(categoryId) {
    const eventsContainer = document.querySelector(`#eventsForCategory-${categoryId}`);
    if (eventsContainer.style.display === 'none') {
        const events = filtreParCateg(categoryId, allEvents);
        if (events.length > 0) {
            const eventTemplate = document.querySelector('#simplifyEventsTemplate').innerHTML;
            const template = Handlebars.compile(eventTemplate);
            eventsContainer.innerHTML = template({ events });
        } else {
            eventsContainer.innerHTML = '<p>Aucun événement trouvé pour cette catégorie.</p>';
        }
        eventsContainer.style.display = 'block';
    } else {
        eventsContainer.style.display = 'none';
    }
}