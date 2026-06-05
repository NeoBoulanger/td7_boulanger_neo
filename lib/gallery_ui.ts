import {loadPicture} from "./photoloader";
import {displayPicture} from "./ui";
import {getPicture} from "../index.ts";

export function display_galerie(gallery: any): void {

    const container = document.getElementById("gallery");

    if (!container) return;

    container.innerHTML = "";

    gallery.photos.forEach((item: any) => {

        const div = document.createElement("div");

        div.classList.add("thumbnail");

        div.setAttribute("data-photoId", item.photo.id.toString());

        div.innerHTML = `
            <img src="https://webetu.iutnc.univ-lorraine.fr${item.photo.thumbnail.href}">
            <p>${item.photo.titre}</p>
        `;

        //click sur une vignette
        div.addEventListener("click", async () => {

            const id = item.photo.id;

            await getPicture(id);

        });

        container.appendChild(div);
    });
}