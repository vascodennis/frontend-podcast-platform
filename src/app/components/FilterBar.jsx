"use client";

export const FilterBar = () => {
  return (
    <div className="w-full h-8 flex justify-end">
      <div className="bg-titleBlue rounded p-2 flex justify-center items-center">
        100
      </div>

      <input
        className="ml-6 w-80 border-2 rounded border-grayLight pl-2"
        type="text"
        placeholder="Filter podcast"
      />
    </div>
  );
};
