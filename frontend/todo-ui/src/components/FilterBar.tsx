import { FILTERS, type Filter } from "../types/filter";

type FilterBarProps = {
  filter: Filter;
  onChange: (filter: Filter) => void;
};

export function FilterBar({ filter, onChange }: FilterBarProps) {
  return (
    <div className="filters">
      <FilterButton
        label="All"
        active={filter === FILTERS.ALL}
        onClick={() => onChange(FILTERS.ALL)}
      />
      <FilterButton
        label="Active"
        active={filter === FILTERS.ACTIVE}
        onClick={() => onChange(FILTERS.ACTIVE)}
      />
      <FilterButton
        label="Completed"
        active={filter === FILTERS.COMPLETED}
        onClick={() => onChange(FILTERS.COMPLETED)}
      />
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