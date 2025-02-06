import { NavBarProps } from "@/components/helpers/interfaces/nav-bar";
import { ItemProps } from "@/components/helpers/interfaces/items";
import { ProductCard } from "@/components/shared/product-card";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    href: string;
    category: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { category, href } = await params;

  const response = await fetch(`${process.env.API_HOST}/nav-bar`);
  const responseItems = await fetch(`${process.env.API_HOST}/items`);
  const items = await responseItems.json();
  

  if (!response.ok) {
    throw new Error("Failed to load navbar data");
  }

  const navbar: NavBarProps[] = await response.json();

  const product = navbar
    .flatMap((product) => product.items)
    .find((item) => item.href === `/docs/${category}/${href}`);

  

  if (!product)
    return (
      <div className="container">
        <h1>Category not found</h1>
      </div>
    );

  return (
    <div className="container mt-10 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">
          {href.charAt(0).toUpperCase() + href.slice(1).toLowerCase()}
        </h1>
        <p className="text-lg text-muted-foreground">
          {product.description}
        </p>
      </div>

      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((element: ItemProps) => (
          element.subcategory == product.title &&
          <Link key={element.id} href={element.path}>
            <ProductCard product={element} />
          </Link>
        ))}
      </div>
    </div>
  );
}