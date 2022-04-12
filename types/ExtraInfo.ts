import {InnerItems} from "./InnerItems";
import {ReactElement} from "react";

export interface ExtraInfo{
    id: string;
    iconId: ReactElement<any, any>;
    available: number;
    items: InnerItems[];
}