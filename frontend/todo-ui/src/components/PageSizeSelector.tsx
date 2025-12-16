type PageSizeSelectorProps = {
  value: number;
  onChange: (size: number) => void;
};

export function PageSizeSelector({ value, onChange }: PageSizeSelectorProps) {
  return (
    <label>
      Todos per page:&nbsp;
      <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </label>
  );
}
