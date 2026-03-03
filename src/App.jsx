import { useState, useCallback, useEffect, useRef } from 'react';
import DiffMatchPatch from 'diff-match-patch';
import Header from './components/Header';
import TextInput from './components/TextInput';
import DiffOutput from './components/DiffOutput';

// Instantiate the diff engine once (it's stateless and reusable)
const dmp = new DiffMatchPatch();

function App() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [diffs, setDiffs] = useState(null);
  const resultsRef = useRef(null);

  /**
   * Compute the diff between Source A and Target B.
   * Uses diff-match-patch's semantic cleanup for human-readable results.
   */
  const handleCompare = useCallback(() => {
    const result = dmp.diff_main(textA, textB);
    dmp.diff_cleanupSemantic(result);
    setDiffs(result);
    // Scroll to results after a brief render delay
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, [textA, textB]);

  /** Reset all inputs and clear diff results */
  const handleClear = useCallback(() => {
    setTextA('');
    setTextB('');
    setDiffs(null);
  }, []);

  // Keyboard shortcut: Ctrl+Enter or Cmd+Enter to compare
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (textA.trim() || textB.trim()) handleCompare();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleCompare, textA, textB]);

  const hasInput = textA.trim().length > 0 || textB.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Text Comparison
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Paste two texts below and compare to see their differences highlighted.
          </p>
        </div>

        {/* Text Input Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <TextInput
              label="Source Text A"
              value={textA}
              onChange={setTextA}
              placeholder="Paste or type the original text here..."
              accentColor="bg-red-400"
            />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <TextInput
              label="Target Text B"
              value={textB}
              onChange={setTextB}
              placeholder="Paste or type the modified text here..."
              accentColor="bg-green-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={handleCompare}
            disabled={!hasInput}
            className="px-8 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg
                       shadow-sm hover:bg-indigo-700 active:bg-indigo-800
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors cursor-pointer"
          >
            Compare Diff
          </button>
          <button
            onClick={handleClear}
            disabled={!hasInput && !diffs}
            className="px-6 py-2.5 bg-white text-slate-600 text-sm font-semibold rounded-lg
                       border border-slate-300 shadow-sm
                       hover:bg-slate-50 active:bg-slate-100
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>

        {/* Diff Output Panels */}
        <div ref={resultsRef} />
        {diffs ? (
          <DiffOutput diffs={diffs} />
        ) : (
          <div className="text-center py-16 text-slate-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <p className="text-sm">
              Enter text in both fields and click <strong>Compare Diff</strong> to see results.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-center py-4 text-xs">
        Diff Demo &mdash; Built with React, Tailwind CSS &amp; diff-match-patch
      </footer>
    </div>
  );
}

export default App;
