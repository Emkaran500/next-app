import { CategoryProps } from "./category";

export interface NavBarProps {
    id: number;
    name: string;
    category: string;
    description: string;
    items: CategoryProps[];
}