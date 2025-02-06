import Link from "next/link";
import { RxRocket } from "react-icons/rx";
import classes from "./category-page.module.css";
import minion from "@/assets/minion/minik.png";
import Image from "next/image";
import ProductsContainer from "@/components/shared/products-container";
import { ProductCard } from "@/components/shared/product-card";
import { CategoryProps } from "@/components/helpers/interfaces/category";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/docs/${category}`
  );
  
  console.log(`${process.env.NEXT_PUBLIC_API_HOST}/docs/${category}`);
  
  const items = await response.json();

  console.log(items);

  return (
    <div className="container mt-10 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">
          {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
        </h1>
        <p className="text-lg text-muted-foreground">
          Buy {category} from the best stores
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {items.map((product: CategoryProps) => (
          product.title != "All" &&
          <Link key={product.id} href={product.href}>
            <Card className="border-zinc-800 max-h-[186px] h-full transition-all duration-200 hover:bg-zinc-900">
              <CardHeader className="h-full flex flex-col justify-between">
                <div className="flex flex-col py-3 gap-2">
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription className="text-zinc-400">
                    {product.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <ProductsContainer />
    </div>
  );
}