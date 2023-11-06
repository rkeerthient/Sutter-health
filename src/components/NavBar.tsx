import * as React from "react";
import { twMerge } from "tailwind-merge";

export interface NavBarProps {
  items: {
    id: string;
    label?: string;
  }[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export const initialProps: NavBarProps = {
  items: [{ id: "About" }, { id: "Insurances" }, { id: "Locations" }],
};

export default function NavBar({ items, onSelect, selectedId }: NavBarProps) {
  const handleSelect = (id: string) => {
    onSelect?.(id);
  };

  return (
    <div className="mx-auto ">
      <div className="h-16 justify-between border-b hidden sm:flex ">
        <div className="ml-6 flex justify-between flex-1">
          {items.map(({ label, id }) => (
            <button
              key={id}
              className={twMerge(
                `inline-flex items-center px-1 pt-1 border-transparent hover:border-primary-green border-b-2 text-sm font-medium`,
                selectedId === id && "border-primary-green"
              )}
              onClick={() => handleSelect(id)}
            >
              <div className="font-bold">{label ?? id}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
