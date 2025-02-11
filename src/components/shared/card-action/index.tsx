"use client";

import { ItemProps } from "@/components/helpers/interfaces/items";
import QuantitySelector from "../quantity-selector";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useProductStore } from "@/app/store";

export default function CardAction({ product }: { product: ItemProps }) {
  const { products, possibleAddition, setProducts } = useProductStore();

  const addProducts = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: ItemProps
    ) => {
    event.preventDefault();
    setProducts((prev) => {
      const current = prev.find((p) => p.id === product.id);
      if (!current) {
        product.quantity = possibleAddition;
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeProducts = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
    ) => {
    event.preventDefault();
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  return (
    <div className="flex max-w-[260px] gap-4 flex-col">
      <QuantitySelector product={product}/>

      <div className="flex items-center space-x-2.5">
        <Button className="flex-1 bg-white hover:bg-zinc-200">Buy now </Button>
        {products.find(p => product.id === p.id) ? 
        <Button
          variant={"outline"}
          className="flex-1 border-zinc-800 bg-red-500"
          onClick={(event) => removeProducts(event, product.id)}
        >
          Remove from cart
        </Button> :
        <Button
          variant={"outline"}
          className="flex-1 border-zinc-800 bg-green-500"
          onClick={(event) => addProducts(event, product)}
        >
          Add to card
        </Button>
        }
        
        <Button variant={"outline"} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 size-8 shrink-0">
          <Heart className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}