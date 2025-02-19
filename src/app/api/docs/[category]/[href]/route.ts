import { products } from "@/data/products";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { href: string } }) {
    const { href } = await params;

    const product = products.filter(product => product.subcategory === href)
    
    return NextResponse.json(product)
}