import { prisma } from "../../../../../prisma/prisma-client";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { category: string } }) {
    const { category } = await params;

    const items = await prisma.product.findMany({
        where: {
            category: {
                equals: category.toLowerCase()
            }
        }
    })

    if (items.length == 0) {
        return NextResponse.json({ error: "Products not found" }, { status: 404 })
    }

    return NextResponse.json(items)
}
