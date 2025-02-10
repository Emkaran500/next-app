import { CategoryProps } from "@/components/helpers/interfaces/category";
import {
    CommandGroup,
    CommandItem,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command";

import { navbar } from "@/data/navbar";

interface SearchCategoryProps {
  onSelect: (product: CategoryProps) => void;
}

export default function SearchSuggestion({ onSelect }: SearchCategoryProps) {
    let categories: CategoryProps[];
    categories = [];

    
    
    while (categories.length < 3)
    {
        var index = Math.floor(Math.random()*(navbar.length))
        var category = navbar[index].items[Math.floor(Math.random()*navbar[index].items.length)];
        if (category.title != "All" && !categories.find((item) => item.id == category.id))
        {
            categories.push(category);
        }
    }

    return (
      <>
        <CommandGroup heading="Categories">
          {categories.map((category) => (
            <CommandItem key={category.id} value={category.title} onSelect={() => onSelect(category)}  style={{ cursor: 'pointer' }}>
                    <div className="flex flex-col">
                        <span className="font-semibold">{category.title}</span>
                        <span className="text-xs text-zinc-400">{category.description}</span>
                    </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </>
    );
  }