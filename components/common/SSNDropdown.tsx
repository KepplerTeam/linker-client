import React from 'react';

interface UnitsDropdownProps {
  unit;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
}

const unitsList = [
  { _id: 0, name: 'V' },
  { _id: 1, name: 'E' },
  { _id: 2, name: 'J' },
];

export default function SSNDropdown({ unit, setUnit }: UnitsDropdownProps) {
  return (
    <div className="h-auto">
      <label htmlFor="category">
        <select
          id="category"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          onBlur={(e) => setUnit(e.target.value)}
          className="rounded-2xl shadow-lg text-sm h-full"
        >
          <option>-</option>
          {unitsList.map((c) => (
            <option value={c._id} key={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
