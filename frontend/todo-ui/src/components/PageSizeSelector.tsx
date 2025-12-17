type PageSizeSelectorProps = {
  value: number;
  onChange: (size: number) => void;
};

export function PageSizeSelector({ value, onChange }: PageSizeSelectorProps) {
  return (
    <label className="page-size-selector">
      <span>Items per page:</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </label>
  );
}
