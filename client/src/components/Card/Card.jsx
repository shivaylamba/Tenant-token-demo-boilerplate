import React from "react";

function Card({ data }) {
  const { isDoctorAppointed, user: userName, roomNumber, description } = data;

  return (
    <div className="flex flex-col justify-between w-[250px] rounded bg-gray-200 border-2 border-slate-100 p-4 m-2">
      <div>
        <div className="font-bold">{userName}</div>
        {isDoctorAppointed ? (
          <div className="text-green-500 font-bold">Doctor is Appointed ✓</div>
        ) : (
          <div className="text-red-500 font-bold">
            Doctor is not appointed ×
          </div>
        )}
        <div className="text-slate-800 text-xs">{description}</div>
      </div>
      <div className="bg-slate-400 p-1 mt-2 rounded text-white text-center shadow-md font-bold">
        Room {roomNumber}
      </div>
    </div>
  );
}

export default Card;
