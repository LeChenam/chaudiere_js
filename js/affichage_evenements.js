import Handlebars from 'handlebars';
export async function displayEvents() {
    try {
        const events = await getEvents();

        if (!Array.isArray(events) || events.length === 0) {
            document.querySelector('#listEvents').innerHTML = '<p>No events found.</p>';
            return;
        }

        const eventTemplate = document.querySelector('#eventsTemplate').innerHTML;
        const template = Handlebars.compile(eventTemplate);
        document.querySelector('#listEvents').innerHTML = template({ events });
    } catch (error) {
        console.error('Error displaying events:', error);
        document.querySelector('#listEvents').innerHTML = '<p>Unable to display events.</p>';
    }
}

export async function getEvents(){
    const api = await fetch('http://localhost:13000/api/evenements')
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).catch((error) => {
            console.error('Unable to fetch events : ', error);
            return [];
        });
    console.log(api.evenements);
    return api.evenements;
}