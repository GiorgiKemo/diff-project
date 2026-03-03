import { useState, useRef, useEffect } from 'react';

const languages = ['ქართული', 'English', 'Русский'];

export default function Toolbar() {
  const [selectedLang, setSelectedLang] = useState('ქართული');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formatChecked, setFormatChecked] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between gap-2 px-3.5 py-2 bg-white border border-[#E0E0E0] rounded-lg cursor-pointer select-none w-full sm:w-auto min-w-35"
          >
            <span className="text-sm text-[#383A48]">{selectedLang}</span>
            <svg className={`w-5 h-5 text-[#51555B] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24">
              <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {dropdownOpen && (
            <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-20 py-1">
              {languages.map((lang) => (
                <li key={lang}>
                  <button
                    onClick={() => {
                      setSelectedLang(lang);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-sm cursor-pointer transition-colors
                      ${lang === selectedLang ? 'text-[#4361EE] bg-[#F0F7FF] font-medium' : 'text-[#383A48] hover:bg-[#F5F5F5]'}`}
                  >
                    {lang}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => setFormatChecked(!formatChecked)}>
          <div
            role="checkbox"
            aria-checked={formatChecked}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setFormatChecked(!formatChecked);
              }
            }}
            className={`w-5 h-5 rounded border shrink-0 flex items-center justify-center transition-colors
              ${formatChecked ? 'bg-[#4361EE] border-[#4361EE]' : 'bg-white border-[#E0E0E0]'}`}
          >
            {formatChecked && (
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm text-[#383A48] tracking-[0.01em]">ფორმატის შენარჩუნება</span>
        </div>
      </div>

      <button
        onClick={(e) => e.preventDefault()}
        className="flex items-center justify-center gap-1.5 px-4 py-2.5
                   bg-[#4361EE] hover:bg-[#3B54D4] text-white text-sm rounded-md
                   cursor-pointer select-none sm:w-auto"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v8m-4-4h8" />
        </svg>
        <span>ახლის გახსნა</span>
      </button>
    </div>
  );
}
