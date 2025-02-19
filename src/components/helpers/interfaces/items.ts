export interface SubProduct {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    stockCount: number;
}

export interface ItemProps {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
    path: string;
    description: string;
    stockCount: number;
    category: string;
    subcategory: string;
    rating: number;
    quantity: number;
}