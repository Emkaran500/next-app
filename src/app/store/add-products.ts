import { ItemProps } from '@/components/helpers/interfaces/items';
import { create } from 'zustand';

export const useProductStore = create<{
    products: ItemProps[];
    possibleAddition: number;
    setProducts: (update: (prev: ItemProps[]) => ItemProps[]) => void
    setPossibleAddition: (update: (prev: number) => number) => void
}>(set => (
    {
        products: [],
        possibleAddition: 1,
        setProducts: update => set(state => ({ products: update(state.products) })),
        setPossibleAddition: update => set(state => ({ possibleAddition: update(state.possibleAddition) }))
    }
))