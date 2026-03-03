/**
 * TextInput component for entering source or target text.
 * Renders a labeled textarea with consistent styling.
 *
 * @param {string}   label       - The label displayed above the textarea
 * @param {string}   value       - Current text value
 * @param {function} onChange    - Callback fired when text changes
 * @param {string}   placeholder - Placeholder text
 * @param {string}   accentColor - Tailwind color class for the label accent bar
 */
export default function TextInput({ label, value, onChange, placeholder, accentColor = 'bg-indigo-500' }) {
  return (
    <div className="flex flex-col h-full">
      {/* Label with accent bar */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-1 h-5 rounded-full ${accentColor}`} />
        <label className="text-sm font-semibold text-slate-700">{label}</label>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-h-[180px] w-full p-4 border border-slate-300 rounded-lg
                   bg-white text-slate-800 text-sm leading-relaxed
                   resize-none
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                   placeholder:text-slate-400
                   transition-shadow"
        spellCheck={false}
      />
    </div>
  );
}
