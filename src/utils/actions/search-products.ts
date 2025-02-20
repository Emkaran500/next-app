import { ProductProps } from "@/components/helpers/interfaces/product"

export async function searchProducts(query: string): Promise<ProductProps[]>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/products?q=${encodeURIComponent(query)}`)

    if (!response.ok) {
        throw new Error("Failed to fecth search products")
    }

    return response.json()
}