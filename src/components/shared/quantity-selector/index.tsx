"use client";

import { useProductStore } from "@/app/store";
import { ItemProps } from "@/components/helpers/interfaces/items";
import { ProductProps } from "@/components/helpers/interfaces/product";
import { Button } from "@/components/ui/button";
import { ProductContext } from "@/utils/contexts/ProductContext";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";

interface QuantitySelectorProps {
  product: ItemProps | ProductProps;
}

export default function QuantitySelector({
  product
}: QuantitySelectorProps) {
  const { products, setPossibleAddition } = useProductStore();
  const [count, setCount] = useState(product.quantity);
  const funcCanAdd = useContext(ProductContext).funcCanAdd;
  const howMany = useContext(ProductContext).howMany;
  const funcHowMany = useContext(ProductContext).funcHowMany;
  useEffect(() => {
    setCount(count);
  }, [count]);

  const increment = () => {
    if (count < product.stockCount)
    {
      const storeProduct = products.find((el) => el.id === product.id)
      setCount((c) => c + 1)
      setPossibleAddition(() => count + 1)
      if (storeProduct && storeProduct?.quantity < count + 1)
      {
        funcHowMany(howMany + 1)
        funcCanAdd(true)
      }
    }
  };

  const decrement = () => {
    if (count > 1) {
      const storeProduct = products.find((el) => el.id === product.id)
      setCount((c) => c - 1)
      setPossibleAddition(() => count - 1)
      if (storeProduct && storeProduct?.quantity >= count - 1)
      {
        funcCanAdd(false)
      }
      if (storeProduct && storeProduct?.quantity < count - 1)
      {
        funcHowMany(howMany - 1)
      }
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="rounded-r-none"
          onClick={decrement}
        >
          <MinusIcon className="w-4 h-4" />
        </Button>
        <span className="mx-3">{count}</span>
        <Button
          variant="outline"
          size="icon"
          className="rounded-l-none"
          onClick={increment}
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}