/**
 * DiffOutput component renders four panels showing the comparison results:
 *   1. Deleted Segments  - list of removed text chunks
 *   2. Inserted Segments - list of added text chunks
 *   3. Visual Diff A     - original text with deletions highlighted in red
 *   4. Visual Diff B     - target text with insertions highlighted in green
 *
 * @param {Array} diffs - Array of [operation, text] tuples from diff-match-patch
 *                        operation: -1 = DELETE, 0 = EQUAL, 1 = INSERT
 */
export default function DiffOutput({ diffs }) {
  if (!diffs || diffs.length === 0) return null;

  // Extract deleted and inserted segments
  const deletedSegments = diffs.filter(([op]) => op === -1).map(([, text]) => text);
  const insertedSegments = diffs.filter(([op]) => op === 1).map(([, text]) => text);

  // Handle case where both texts are identical
  const textsAreIdentical = deletedSegments.length === 0 && insertedSegments.length === 0;
  if (textsAreIdentical) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
        <svg className="w-12 h-12 mx-auto mb-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-medium text-slate-600">Both texts are identical — no differences found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Segment Lists — Deleted and Inserted side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Deleted Segments */}
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <div className="bg-red-50 border-b border-red-200 px-4 py-2.5 flex items-center gap-2">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
            <h3 className="text-sm font-semibold text-red-800">Deleted Segments</h3>
            <span className="ml-auto text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
              {deletedSegments.length}
            </span>
          </div>
          <div className="p-4 bg-white max-h-48 overflow-y-auto">
            {deletedSegments.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No deletions found</p>
            ) : (
              <ul className="space-y-2">
                {deletedSegments.map((text, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded bg-red-100 text-red-600 text-xs flex items-center justify-center font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm text-red-700 bg-red-50 px-2 py-1 rounded break-all font-mono">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Inserted Segments */}
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <div className="bg-green-50 border-b border-green-200 px-4 py-2.5 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <h3 className="text-sm font-semibold text-green-800">Inserted Segments</h3>
            <span className="ml-auto text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              {insertedSegments.length}
            </span>
          </div>
          <div className="p-4 bg-white max-h-48 overflow-y-auto">
            {insertedSegments.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No insertions found</p>
            ) : (
              <ul className="space-y-2">
                {insertedSegments.map((text, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded bg-green-100 text-green-600 text-xs flex items-center justify-center font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm text-green-700 bg-green-50 px-2 py-1 rounded break-all font-mono">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Visual Diffs — Full inline view of text A and text B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Visual Diff A (Source) — shows deletions in red */}
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <h3 className="text-sm font-semibold text-slate-700">
              Visual Diff A
            </h3>
            <span className="text-xs text-slate-500">(Red = Deleted)</span>
          </div>
          <div className="p-4 bg-white max-h-64 overflow-y-auto">
            <pre className="text-sm leading-relaxed whitespace-pre-wrap break-words font-mono">
              {diffs.map(([op, text], i) => {
                // Skip inserted text in Source view
                if (op === 1) return null;
                if (op === -1) {
                  return (
                    <span
                      key={i}
                      className="bg-red-100 text-red-800 rounded-sm px-0.5 decoration-red-400 line-through"
                    >
                      {text}
                    </span>
                  );
                }
                // Equal text
                return <span key={i}>{text}</span>;
              })}
            </pre>
          </div>
        </div>

        {/* Visual Diff B (Target) — shows insertions in green */}
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <h3 className="text-sm font-semibold text-slate-700">
              Visual Diff B
            </h3>
            <span className="text-xs text-slate-500">(Green = Inserted)</span>
          </div>
          <div className="p-4 bg-white max-h-64 overflow-y-auto">
            <pre className="text-sm leading-relaxed whitespace-pre-wrap break-words font-mono">
              {diffs.map(([op, text], i) => {
                // Skip deleted text in Target view
                if (op === -1) return null;
                if (op === 1) {
                  return (
                    <span
                      key={i}
                      className="bg-green-100 text-green-800 rounded-sm px-0.5 underline decoration-green-400"
                    >
                      {text}
                    </span>
                  );
                }
                // Equal text
                return <span key={i}>{text}</span>;
              })}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
