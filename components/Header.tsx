import React from "react";
import StatusDropdown from "./StatusDropdown";

export default function Header({
  filterStatus,
  searchQuery,
  setSearchQuery,
  setFilterStatus,
}: {
  filterStatus: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="bg-white shadow-sm p-5 flex justify-between items-center">
      <h1 className="text-3xl font-bold">Leads</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <StatusDropdown
          status={filterStatus}
          onStatusChange={setFilterStatus}
        />
      </div>
    </div>
  );
}
