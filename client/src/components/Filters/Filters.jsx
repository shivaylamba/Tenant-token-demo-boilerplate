import React from "react";
import { useSearch } from "../../context/MeiliSearchContext";
import Select from "../Select/Select";

function Filters() {
  const { isAppointed, setIsAppointed } = useSearch();

  return (
    <div>
      <span className="font-bold">Filters</span>
      <div>
        <label>Appointment Status:</label>
        <Select
          value={isAppointed}
          options={[
            { label: "Both" },
            { label: "Appointed", value: true },
            { label: "Not Appointed", value: false },
          ]}
          onChange={(e) => {
            const val = e.target.value;
            setIsAppointed(val === "Both" ? null : val);
          }}
        />
      </div>
    </div>
  );
}

export default Filters;
