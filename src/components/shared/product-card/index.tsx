"use client";
import { ItemProps } from "@/components/helpers/interfaces/items";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CategoryProps } from "@/components/helpers/interfaces/category";
import { Eye } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useProductStore } from "@/app/store";

interface ProductCardProps {
  product: ItemProps | CategoryProps;
}

export function ProductCard({ product }: ProductCardProps) {
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/docs");

  const { products, setProducts } = useProductStore();

  const addProducts = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: ItemProps
  ) => {
    event.preventDefault();
    setProducts((prev) => {
      const current = prev.find((p) => p.id === product.id);
      if (!current) {
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
    <Card className="rounded-lg border bg-zinc-900">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
          <Image
            src={
              "imageUrl" in product
                ? product.imageUrl
                : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"
            }
            alt={"name" in product ? product.name : product.title}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg">
          {!isDocs && "name" in product
            ? `${product.name.charAt(0).toUpperCase()}${product.name
                .slice(1)
                .toLowerCase()}`
            : "title" in product
            ? product.title
            : ""}
        </h3>
        {!isDocs && "price" in product && (
          <p className="text-sm text-zinc-400">${product.price}</p>
        )}
        {isDocs && "description" in product && (
          <p className="text-sm text-zinc-400">{product.description}</p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        {products.find(p => product.id === p.id) ?
        <Button onClick={(event) => removeProducts(event, product.id as number)} className="flex-1 hover:bg-zinc-900 hover:text-white hover:border hover:border-white transition-all duration-200 bg-red-500">
          Remove from cart
        </Button> :
        <Button onClick={(event) => addProducts(event, product as ItemProps)} className="flex-1 hover:bg-zinc-900 hover:text-white hover:border hover:border-white transition-all duration-200 bg-green-500">
          Add to cart
        </Button>
        }
        <Button size={"icon"} variant={"outline"}>
          <Eye />
        </Button>
      </CardFooter>
    </Card>
  );
}