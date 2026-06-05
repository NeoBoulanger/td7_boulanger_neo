import { loadRessource } from "./photoloader.ts";

let currentGallery: any = null;
let links: any = null;

export async function load(pageUrl?: string): Promise<any> {

    const url = pageUrl ?? "/www/canals5/phox/api/photos?size=10";

    const data = await loadRessource(url);

    currentGallery = data;
    links = data.links;

    return data;
}

export async function next(): Promise<any> {
    if (!links?.next?.href) return null;

    return await load(links.next.href);
}

export async function prev(): Promise<any> {
    if (!links?.prev?.href) return null;

    return await load(links.prev.href);
}

export async function first(): Promise<any> {
    if (!links?.first?.href) return null;

    return await load(links.first.href);
}

export async function last(): Promise<any> {
    if (!links?.last?.href) return null;

    return await load(links.last.href);
}

