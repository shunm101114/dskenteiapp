import type { Category } from "../types";
import { CATEGORIES } from "../types";

interface Props {
  selected: Category[];
  onChange: (categories: Category[]) => void;
}

export function CategorySelector({ selected, onChange }: Props) {
  const toggle = (cat: Category) => {
    if (selected.includes(cat)) {
      onChange(selected.filter((c) => c !== cat));
    } else {
      onChange([...selected, cat]);
    }
  };

  return (
    <div className="category-chips">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`category-chip ${selected.includes(cat) ? "selected" : ""}`}
          onClick={() => toggle(cat)}
          type="button"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
