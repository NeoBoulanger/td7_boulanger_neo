import type { Photo, Category, CommentsResponse, Comment } from "./types";

/**
 * Affiche une photo via template Handlebars
 */
export function displayPicture(data: Photo): void {
    const templateElement = document.querySelector("#photoTemplate");

    if (!templateElement) {
        throw new Error("Template #photoTemplate introuvable");
    }

    const source = (templateElement as HTMLTemplateElement).innerHTML;

    const template = Handlebars.compile(source);

    const html = template(data);

    const container = document.getElementById("photo");

    if (container) {
        container.innerHTML = html;
    }
}

/**
 * Affiche la catégorie d'une photo
 */
export function displayCategory(category: Category): void {
    const el = document.getElementById("la_categorie");

    if (!el) {
        throw new Error("Element #la_categorie introuvable");
    }

    const name = category.categorie.nom;

    el.innerHTML = `<p>${name}</p>`;
}

/**
 * Affiche les commentaires d'une photo
 */
export function displayComments(data: CommentsResponse): void {
    const ul = document.getElementById("les_commentaires");

    if (!ul) {
        throw new Error("Element #les_commentaires introuvable");
    }

    ul.innerHTML = "";

    data.comments.forEach((comment: Comment) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <p>(${comment.pseudo}) ${comment.content}</p>
        `;

        ul.appendChild(li);
    });
}

export function displayGallery(items) {
    const container = document.getElementById("gallery");

    if (!container) {
        throw new Error("#gallery introuvable");
    }

    container.innerHTML = "";

    items.forEach(item => {

        const div = document.createElement("div");
        div.classList.add("thumbnail");

        div.innerHTML = `
            <img src="https://webetu.iutnc.univ-lorraine.fr${item.photo.thumbnail.href}" />
            <p>${item.photo.titre}</p>
        `;

        container.appendChild(div);
    });
}