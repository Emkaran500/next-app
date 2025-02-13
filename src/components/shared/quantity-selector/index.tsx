"use client";

import { useProductStore } from "@/app/store";
import { ItemProps } from "@/components/helpers/interfaces/items";
import { ProductProps } from "@/components/helpers/interfaces/product";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface QuantitySelectorProps {
  product: ItemProps | ProductProps;
}

export default function QuantitySelector({
  product
}: QuantitySelectorProps) {
  const { setProducts, setPossibleAddition } = useProductStore();
  const [count, setCount] = useState(product.quantity);

  useEffect(() => {
    setCount(count);
  }, [count]);

  const increment = () => {
    setCount((c) => c + 1)
    setPossibleAddition(() => count + 1)
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, quantity: count + 1 } : p
      )
    );
  };

  const decrement = () => {
    if (count > 1) {
      setCount((c) => c - 1)
      setPossibleAddition(() => count - 1)
      setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, quantity: count - 1 } : p
      )
    );
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