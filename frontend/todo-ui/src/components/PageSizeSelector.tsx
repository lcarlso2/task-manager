import { PAGE_SIZE_OPTIONS, type PageSize } from "../config/pagination";

type PageSizeSelectorProps = {
  value: PageSize;
  onChange: (size: PageSize) => void;
};

export function PageSizeSelector({ value, onChange }: PageSizeSelectorProps) {
  return (
    <label className="page-size-selector">
      <span>Items per page:</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as PageSize)}
      >
        {PAGE_SIZE_OPTIONS.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </label>
  );
}
