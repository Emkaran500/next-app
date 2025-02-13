import { ItemProps } from '@/components/helpers/interfaces/items';
import { ProductProps } from '@/components/helpers/interfaces/product';
import { create } from 'zustand';

export const useProductStore = create<{
    products: (ItemProps | ProductProps)[];
    possibleAddition: number;
    setProducts: (update: (prev: (ItemProps | ProductProps)[]) => (ItemProps | ProductProps)[]) => void
    setPossibleAddition: (update: (prev: number) => number) => void
}>(set => (
    {
        products: [],
        possibleAddition: 1,
        setProducts: update => set(state => ({ products: update(state.products) })),
        setPossibleAddition: update => set(state => ({ possibleAddition: update(state.possibleAddition) }))
    }
))