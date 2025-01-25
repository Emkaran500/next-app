import { ItemProps } from "@/components/helpers/interfaces/items";
import QuantitySelector from "@/components/shared/quantity-selector";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/shared/product-card";

interface ProdProps {
  params: Promise<{
    path: string;
  }>;
}

export default async function ProductCategory({ params }: ProdProps) {
  const { path } = await params;

  const response = await fetch(`${process.env.API_HOST}/items`);
  if (!response.ok) {
    throw new Error("Failed to load items data");
  }

  const items: ItemProps[] = await response.json();

  const product = items
    .flatMap((item) => item)
    .find((item) => item.path === `/products/${path}`);

  return (
    <main className="flex-1">
      <section className="grid items-center gap-8 pt-6 lg:py-6 container pb-12 md:pb-14">
        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <div className="flex aspect-square relative size-full overflow-hidden flex-1 items-center justify-center bg-secondary">
            <Image
              src={
                product?.imageUrl ||
                "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
              }
              alt={product?.name || "No image"}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex w-full flex-col gap-4 md:w-1/2">
            <div className="space-y-2">
              <h2 className="line-clamp-1 text-2xl font-bold">
                {product?.name || "Product not found"}
              </h2>
              <p className="text-base text-muted-foreground">
                ${product?.price || "Price not found"}
              </p>
              <a className="line-clamp-1 inline-block text-base text-muted-foreground hover:underline" href="/">skateshop</a>
            </div>

            <div className="shrink-0 bg-border h-px w-full my-1.5" role="none"></div>

            <p className="text-base text-muted-foreground">
              {product?.stockCount || "Stock not found"} in stock
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < (product?.rating || 0)
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 size-8 shrink-0">
                <Heart className="w-4 h-4" />
              </Button>
            </div>


            <form className="flex max-w-[260px] gap-4 flex-col">
              <QuantitySelector />
              <div className="flex items-center space-x-2.5">
                <Button className="flex-1 bg-white hover:bg-zinc-200">
                  Buy now{" "}
                </Button>
                <Button variant={"outline"} className="flex-1 border-zinc-800">
                  Add to card
                </Button>
              </div>
            </form>

            <div className="shrink-0 bg-border h-px w-full mt-5" role="none"></div>

            <div className="w-full">
              <div className="border-b border-none">
                <h3 className="flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline">
                    Description
                </h3>
                <div className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pb-4 pt-0">
                    {product?.description || "Description not found"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 overflow-hidden">
          <h2 className="line-clamp-1 flex-1 text-2xl font-bold">More products from skateshop</h2>
          <div className="relative overflow-hidden pb-3.5">
            <div className="size-full rounded-[inherit]">
                <div className="min-width: 100%; display: table;">
                  <div className="flex gap-4">
                  {items.map((product: ItemProps) => (
                    <Link key={product.id} href={product.path} className="border bg-card text-card-foreground shadow size-full overflow-hidden rounded-lg min-w-[260px]">
                      <ProductCard product={product} />
                    </Link>
                  )).slice(0, 4)}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}