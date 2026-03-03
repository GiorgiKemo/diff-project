import { useState, useCallback, useEffect } from 'react';
import DiffMatchPatch from 'diff-match-patch';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import TextInput from './components/TextInput';
import ProgressBar from './components/ProgressBar';

const dmp = new DiffMatchPatch();

function App() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [diffs, setDiffs] = useState(null);
  const [isComparing, setIsComparing] = useState(false);

  const handleCompare = useCallback(() => {
    setIsComparing(true);
    setTimeout(() => {
      const result = dmp.diff_main(textA, textB);
      dmp.diff_cleanupSemantic(result);
      setDiffs(result);
      setIsComparing(false);
    }, 1500);
  }, [textA, textB]);

  const handleTextAChange = useCallback(
    (val) => {
      setTextA(val);
      if (diffs) setDiffs(null);
    },
    [diffs],
  );

  const handleTextBChange = useCallback(
    (val) => {
      setTextB(val);
      if (diffs) setDiffs(null);
    },
    [diffs],
  );

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

  const sourceDiffSegments = diffs
    ? diffs
        .filter(([op]) => op !== 1)
        .map(([op, text]) => ({ text, type: op === -1 ? 'deleted' : 'equal' }))
    : null;

  const targetDiffSegments = diffs
    ? diffs
        .filter(([op]) => op !== -1)
        .map(([op, text]) => ({ text, type: op === 1 ? 'inserted' : 'equal' }))
    : null;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <div className="h-22 lg:hidden shrink-0" />

        <div className="flex-1 flex flex-col gap-4 p-4 sm:p-6 lg:p-8">
          <Toolbar hasDiffs={diffs !== null} />

          <hr className="border-[#EDEDED]" />

          {isComparing ? (
            <ProgressBar />
          ) : (
            <div className="flex flex-col lg:flex-row items-stretch gap-2.5 flex-1 min-h-0">
              <div className="flex-1 min-h-55 lg:min-h-0">
                <TextInput
                  label="Source Text A"
                  value={textA}
                  onChange={handleTextAChange}
                  placeholder="დაიწყე წერა..."
                  diffSegments={sourceDiffSegments}
                />
              </div>

              <div className="flex items-center justify-center py-1 lg:py-0 lg:px-1 shrink-0">
                <svg className="w-6 h-6 text-[#323232] lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" />
                </svg>
                <svg className="w-8 h-8 text-[#323232] hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4" />
                </svg>
              </div>

              <div className="flex-1 min-h-55 lg:min-h-0">
                <TextInput
                  label="Target Text B"
                  value={textB}
                  onChange={handleTextBChange}
                  placeholder="დაიწყე წერა..."
                  diffSegments={targetDiffSegments}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-center py-3">
            <button
              onClick={handleCompare}
              disabled={!hasInput}
              className={`flex items-center justify-center gap-2 px-8 py-3 text-white text-sm rounded-md
                         transition-colors cursor-pointer
                         disabled:opacity-40 disabled:cursor-not-allowed
                         ${
                           hasInput
                             ? 'bg-[#4361EE] hover:bg-[#3B54D4] active:bg-[#3249BE]'
                             : 'bg-[rgba(56,58,72,0.6)]'
                         }`}
            >
              {diffs && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                  />
                </svg>
              )}
              შედარება
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
