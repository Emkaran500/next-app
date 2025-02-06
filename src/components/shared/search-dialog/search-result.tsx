import { ItemProps } from "@/components/helpers/interfaces/items";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import Image from "next/image";

interface SearchProductProps {
  result: ItemProps[];
  onSelect: (product: ItemProps) => void;
}

export default function SearchResult({ result, onSelect }: SearchProductProps) {
  return (
    <CommandGroup heading="Products">
      {result.map((product) => (
        <CommandItem key={product.id} value={product.name} onSelect={() => onSelect(product)} style={{ cursor: 'pointer' }}>
          <div className="aspect-auto relative w-12 h-12 overflow-hidden rounded-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>{product.name}</span>
            <span className="text-xs text-zinc-400">{product.description}</span>
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}