import React from 'react';

interface UnitsDropdownProps {
  units;
  setUnits: React.Dispatch<React.SetStateAction<string>>;
}

const unitsList = [
  { _id: 0, name: 'Unidades' },
  { _id: 1, name: 'Kilogramos' },
  { _id: 2, name: 'Litros' },
];

export default function UnitsDropdown({ units, setUnits }: UnitsDropdownProps) {
  return (
    <div className="pt-4">
      <label htmlFor="category">
        <select
          id="category"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          onBlur={(e) => setUnits(e.target.value)}
          className="rounded-lg sm:w-1/2 w-full px-3 flex mt-2 shadow-lg text-sm"
        >
          <option>SELECCIONE</option>
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
