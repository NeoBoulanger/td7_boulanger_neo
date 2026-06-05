import {URL_API, URL_PHOTOS} from "../api_ressources";

export async function loadPicture(id: number): Promise<Photo> {
    const response: Response = await fetch(URL_PHOTOS + id, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return (await response.json());
}

export async function loadRessource(uri: string): Promise<T> {

    const url = URL_API + uri;

    const response = await fetch(url, { credentials: "include" });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}