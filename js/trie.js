import Handlebars from 'handlebars';
export function displayTrie(categId = null) {
    if(categId === null) {
        const template = document.querySelector('#trieTemplate').innerHTML;
        const compiledTemplate = Handlebars.compile(template);
        document.querySelector('#body').innerHTML += compiledTemplate();
    }else{
        const template = document.querySelector('#trieTemplateCateg').innerHTML;
        const compiledTemplate = Handlebars.compile(template);
        const section = document.querySelector(`#trie-${categId}`);
        if (section) {
            section.innerHTML = compiledTemplate({id: categId});
        } else {
            console.error(`Section with id trie-${categId} not found`);
        }
    }
}

export function trieDateAcendante(events){
    if (!Array.isArray(events) || events.length === 0) {
        return [];
    }
    return events.sort((a, b) => {
        const dateA = new Date(a?.date_debut ?? null);
        const dateB = new Date(b?.date_debut ?? null);
        return dateA - dateB;
    });
}

export function trieDateDecendante(events){
    if (!Array.isArray(events) || events.length === 0) {
        return [];
    }
    return events.sort((a, b) => {
        const dateA = new Date(a?.date_debut ?? null);
        const dateB = new Date(b?.date_debut ?? null);
        return dateB - dateA;
    });
}

export function trieParTitre(events) {
    if (!Array.isArray(events) || events.length === 0) {
        return [];
    }
    return events.sort((a, b) => {
        const titleA = a?.titre?.toLowerCase() ?? '';
        const titleB = b?.titre?.toLowerCase() ?? '';
        return titleA.localeCompare(titleB);
    });
}

export function trie(type, events) {
    switch (type) {
        case 'dateAsc':
            return trieDateAcendante(events);
        case 'dateDesc':
            return trieDateDecendante(events);
        case 'titre':
            return trieParTitre(events);
        default:
            console.error('Invalid sort type:', type);
            return null;
    }
}