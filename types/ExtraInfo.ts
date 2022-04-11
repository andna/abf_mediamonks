import {InnerItems} from "./InnerItems";

export interface ExtraInfo{
    id: string;
    iconId: string;
    available: number;
    items: InnerItems[];
}