import { loadPicture, loadRessource } from "./lib/photoloader.ts";
import {displayPicture, displayCategory, displayComments, displayGallery} from "./lib/ui";
import { load, next, prev, first, last } from "./lib/gallery.ts";
import { display_galerie } from "./lib/gallery_ui.ts";

export async function getPicture(id: number) {
    const photo = await loadPicture(id);

    if (photo) {
        displayPicture(photo);

        const category =
            await getCategory(photo);

        displayCategory(category);

        const commentsData =
            await getComments(photo);

        displayComments(commentsData);
    }
}

async function loadGallery() {

    const data = await loadRessource(
        "/www/canals5/phox/api/photos?size=10"
    );

    displayGallery(data.photos);
}

async function getCategory(photo): Promise<T> {
    return await loadRessource<T>(photo.links.categorie.href);
}

async function getComments(photo):Promise<T> {
    return await loadRessource<T>(photo.links.comments.href);
}


//gestion des boutons
document.getElementById("loadGalleryBtn")
    ?.addEventListener("click", async () => {

        const data = await load();

        display_galerie(data);
    });

document.getElementById("nextBtn")
    ?.addEventListener("click", async () => {
        const data = await next();
        if (data) display_galerie(data);
    });

document.getElementById("prevBtn")
    ?.addEventListener("click", async () => {
        const data = await prev();
        if (data) display_galerie(data);
    });

document.getElementById("firstBtn")
    ?.addEventListener("click", async () => {
        const data = await first();
        if (data) display_galerie(data);
    });

document.getElementById("lastBtn")
    ?.addEventListener("click", async () => {
        const data = await last();
        if (data) display_galerie(data);
    });

// hash
const id: number = window.location.hash ? Number(window.location.hash.slice(1)) : 105;

loadGallery();