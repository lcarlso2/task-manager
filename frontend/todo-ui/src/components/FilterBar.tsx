export type Filter = "all" | "active" | "completed";

type FilterBarProps = {
  filter: Filter;
  onChange: (filter: Filter) => void;
};

export function FilterBar({ filter, onChange }: FilterBarProps) {
  return (
    <div className="filters">
      <FilterButton
        label="All"
        active={filter === "all"}
        onClick={() => onChange("all")}
      />
      <FilterButton
        label="Active"
        active={filter === "active"}
        onClick={() => onChange("active")}
      />
      <FilterButton
        label="Completed"
        active={filter === "completed"}
        onClick={() => onChange("completed")}
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