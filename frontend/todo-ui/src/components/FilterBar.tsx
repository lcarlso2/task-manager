import { FILTERS, type Filter } from "../types/filter";

type FilterBarProps = {
  filter: Filter;
  onChange: (filter: Filter) => void;
};

export function FilterBar({ filter, onChange }: FilterBarProps) {
  return (
    <div className="filters">
      {Object.values(FILTERS).map(({ value, label }) => (
        <FilterButton
          key={value}
          label={label}
          active={filter === value}
          onClick={() => onChange(value)}
        />
      ))}
    </div>
  );
}

type FilterButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button onClick={onClick} disabled={active} aria-pressed={active}>
      {label}
    </button>
  );
}
