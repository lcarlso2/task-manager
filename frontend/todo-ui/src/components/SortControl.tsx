import { SORTS, type Sort } from "../types/sort";

type SortControlProps = {
  value: Sort;
  onChange: (sort: Sort) => void;
};

export function SortControl({ value, onChange }: SortControlProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Sort)}
      className="sort-select"
      aria-label="Sort todos"
    >
      {Object.values(SORTS).map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
