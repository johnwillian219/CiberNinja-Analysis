// src/components/library/Actions/SelectionProvider.jsx
import { createContext, useContext, useState } from "react";

const SelectionContext = createContext();

export function SelectionProvider({ children }) {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const toggleSelection = (id) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAll = (ids) => {
    setSelectedIds(new Set(ids));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const isSelected = (id) => selectedIds.has(id);

  return (
    <SelectionContext.Provider
      value={{
        selectedIds,
        toggleSelection,
        selectAll,
        clearSelection,
        isSelected,
        count: selectedIds.size,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export const useSelection = () => useContext(SelectionContext);
