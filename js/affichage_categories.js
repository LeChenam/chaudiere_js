import Handlebars from 'handlebars';
import {allCategories, load} from "./load";

export async function getCategories() {
    if (allCategories === null) {
        await load();
    }return allCategories;
}

export async function displayCategories() {

}