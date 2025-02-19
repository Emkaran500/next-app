import { prisma } from "../../../../prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";


export async function GET() {
    const products = await prisma.product.findMany()
    return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
    try {
        if (await prisma.product.count() > 0)
        {
            throw "Products already has values!"
        }

        const newProducts = await prisma.product.createMany({
            data: products
        })

        return NextResponse.json(newProducts, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}