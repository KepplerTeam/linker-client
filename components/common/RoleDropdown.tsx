import React from 'react';

interface RoleDropdownProps {
  role;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}

const unitsList = [
  { _id: 1, name: 'Emprendedor' },
  { _id: 2, name: 'Proveedor' },
];

export default function RoleDropdown({ role, setRole }: RoleDropdownProps) {
  return (
    <div className="pt-4">
      <label htmlFor="category">
        <select
          id="category"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          onBlur={(e) => setRole(e.target.value)}
          className="rounded-lg sm:w-1/2 w-full px-3 flex shadow-lg text-sm"
        >
          <option>Rol</option>
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
