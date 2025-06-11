import Handlebars from 'handlebars';

export async function getCategories() {
    try {
        const response = await fetch('http://localhost:13000/api/categories');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Unable to fetch categories:', error);
        return [];
    }
}