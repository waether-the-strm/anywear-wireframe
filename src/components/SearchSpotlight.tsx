import React, { useState, useEffect, useRef } from "react";

type SearchSpotlightProps = {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
};

const SearchSpotlight = ({
  isOpen,
  onClose,
  onSearch,
}: SearchSpotlightProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Resetuj pole przy otwarciu
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen]);

  // Obsługa klawisza Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Obsługa submitu formularza
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-[20vh] z-50 overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all animate-fade-in"
        style={{
          animationDuration: "200ms",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center p-4 border-b">
            <svg
              className="w-5 h-5 text-gray-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-lg border-0 focus:ring-0 focus:outline-none placeholder-gray-500"
              placeholder="Wyszukaj produkty..."
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="p-4 bg-gray-50">
            <div className="flex justify-between">
              <div>
                <span className="text-sm text-gray-500">
                  Naciśnij Enter, aby wyszukać
                </span>
                <div className="mt-1 text-xs text-gray-400">
                  <span className="inline-block bg-gray-200 px-1.5 py-0.5 rounded mr-1">
                    /
                  </span>
                  <span className="inline-block bg-gray-200 px-1.5 py-0.5 rounded mr-1">
                    {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}+K
                  </span>
                  aby otworzyć wyszukiwarkę
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-gray-500 hover:text-black"
              >
                Anuluj (Esc)
              </button>
            </div>
            <button
              type="submit"
              className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Wyszukaj
            </button>
          </div>
        </form>

        {query && (
          <div className="p-4 border-t">
            <div className="text-sm text-gray-500 mb-2">
              Popularne wyszukiwania:
            </div>
            <div className="flex flex-wrap gap-2">
              {["tribal", "spodnie", "bluzy", "czapki", "kurtki"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setQuery(suggestion);
                      setTimeout(() => onSearch(suggestion), 100);
                    }}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSpotlight;
