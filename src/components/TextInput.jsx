import { useRef, useEffect } from 'react';

export default function TextInput({ label, value, onChange, placeholder, diffSegments }) {
  const isDiffMode = diffSegments != null;
  const textareaRef = useRef(null);
  const justExitedDiff = useRef(false);

  useEffect(() => {
    if (!isDiffMode && justExitedDiff.current) {
      justExitedDiff.current = false;
      textareaRef.current?.focus();
    }
  }, [isDiffMode]);

  const handleExitDiff = () => {
    justExitedDiff.current = true;
    onChange(value);
  };

  return (
    <div className="flex flex-col h-full bg-[#F0F7FF] rounded-lg p-3">
      <label className="sr-only">{label}</label>

      {isDiffMode ? (
        <div
          className="flex-1 text-[#383A48] text-lg leading-relaxed whitespace-pre-wrap break-words overflow-y-auto cursor-text"
          aria-label={label}
          role="button"
          tabIndex={0}
          onClick={handleExitDiff}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleExitDiff();
          }}
        >
          {diffSegments.map((seg, i) => {
            if (seg.type === 'deleted') {
              return (
                <span key={i} className="bg-[#FCA5A5] text-[#991B1B] rounded px-0.5">
                  {seg.text}
                </span>
              );
            }
            if (seg.type === 'inserted') {
              return (
                <span key={i} className="bg-[#86EFAC] text-[#166534] rounded px-0.5">
                  {seg.text}
                </span>
              );
            }
            return <span key={i}>{seg.text}</span>;
          })}
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={label}
          className="flex-1 w-full bg-transparent text-[#383A48] text-lg leading-relaxed
                     resize-none border-none focus:outline-none
                     placeholder:text-[rgba(56,58,72,0.6)]"
          spellCheck={false}
        />
      )}
    </div>
  );
}
