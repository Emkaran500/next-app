"use client";

import { ItemProps } from "@/components/helpers/interfaces/items";

import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import useSWR from "swr";
import { ProductCard } from "../product-card";

export default function ProductsContainer() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/items`,
    fetcher
  );
  const items = data as ItemProps[];

  if (error) {
    return <div>Error loading data</div>;
  }

  if (isLoading) {
    return <div>Loading data...</div>;
  }
  return (
    <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product: ItemProps) => (
        <Link key={product.id} href={product.path}>
            <ProductCard product={product} />
        </Link>
        ))}
    </div>
  );
}