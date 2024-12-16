"use client";
import { useState } from "react";

export const FilterGroup = ({
  title,
  options,
  type,
  setSelectedOption,
  selectedOption,
}: {
  title: string;
  options: string[];
  type: "checkbox" | "search";
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  selectedOption: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

  const filteredOptions =
    type === "search"
      ? options.filter((option) =>
          option.toLowerCase().includes(search.toLowerCase())
        )
      : options;

  const handleCheckboxChange = (option: string) => {
    setSelectedOption((prev) => (prev === option ? "" : option));
  };

  return (
    <div className="mb-4">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer p-2 bg-gray-100 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700 font-medium">{title}</span>
        <span className="text-gray-500 text-sm">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Options */}
      {isOpen && (
        <div className="mt-2">
          {type === "search" && (
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full mb-2 p-2 border rounded text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          <div className="pl-2">
            {filteredOptions.map((option, idx) => (
              <label
                key={idx}
                className="block text-gray-600 text-sm mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="mr-2 accent-blue-500 cursor-pointer"
                  checked={selectedOption === option}
                  onChange={() => handleCheckboxChange(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
