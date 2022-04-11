import {InnerData} from "./InnerData";


interface Thumbnail{
    extension: string;
    path: string;
}

interface Url{
    type: string;
    url: string;
}

export interface Hero{
    comics: InnerData;
    description: string;
    events: InnerData;
    id: number;
    modified: string;
    name: string;
    resourceURI: string;
    series: InnerData;
    stories: InnerData;
    thumbnail: Thumbnail;
    urls: Url[];
    searchableString: string;
}