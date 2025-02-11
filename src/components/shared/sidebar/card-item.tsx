import { ItemProps } from "@/components/helpers/interfaces/items";
import QuantitySelector from "../quantity-selector";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useProductStore } from "@/app/store";
import Image from "next/image";

interface ProductCardProps {
    product: ItemProps;
}

export default function CardItem({ product }: ProductCardProps) {
  const { setProducts } = useProductStore();

  const removeItem = (id: number) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  return (
    <div className="flex items-center justify-between py-3 w-full">
      <div className="flex gap-3 items-center">
        <Image alt={product.description} src={product.imageUrl} width={40} height={40} className="object-cover object-center" />
        <div className="flex flex-col">
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="text-sm text-gray-500">${product.price}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <QuantitySelector product={product} />

        <Button variant="outline" size="icon" onClick={() => removeItem(product.id)}>
          <Trash2 />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  );
}