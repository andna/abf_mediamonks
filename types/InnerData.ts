interface InnerItems {
    name: string;
    resourceURI: string;
}

export interface InnerData {
    available: number;
    collectionURI: string;
    items: InnerItems[];
    returned: number;
}