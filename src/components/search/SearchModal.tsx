"use client";

import { useEffect, useState } from "react";
import { useSearch } from "@/context/SearchContext";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

const DEBOUNCE_MS = 200;

export default function SearchModal() {
  const { isOpen, closeSearch, setQuery: setContextQuery } = useSearch();
  const [inputValue, setInputValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setInputValue("");
      setDebouncedQuery("");
      setContextQuery("");
      return;
    }
    const t = window.setTimeout(() => {
      setDebouncedQuery(inputValue);
      setContextQuery(inputValue);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [inputValue, isOpen, setContextQuery]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeSearch]);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4">
      <button
        type="button"
        aria-label="Закрыть поиск"
        className="absolute inset-0 bg-black/70 transition-opacity duration-200"
        onClick={closeSearch}
      />
      <div
        className="relative w-full max-w-2xl rounded-xl border border-[#1e1e1e] bg-[#111] shadow-2xl p-5 md:p-6 transition-all duration-200 opacity-100 scale-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        <h2 id="search-modal-title" className="sr-only">
          Поиск по каталогу
        </h2>
        <SearchInput
          value={inputValue}
          onChange={setInputValue}
          autoFocus
        />
        <div className="max-h-96 overflow-y-auto mt-2 pr-1 -mr-1">
          <SearchResults debouncedQuery={debouncedQuery} onSelectResult={closeSearch} />
        </div>
      </div>
    </div>
  );
}
