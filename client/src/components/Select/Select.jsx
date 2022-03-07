import React from "react";

function Select({ value, onChange, options }) {
  return (
    <div>
      <select
        name="tenant"
        id="tenant"
        className="
          form-select 
          appearance-none
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding bg-no-repeat
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        value={typeof value == "string" ? value : JSON.stringify(value)}
        onChange={onChange}
      >
        {options.map((opt, index) => (
          <option key={`userList-${opt.value}-${index}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
