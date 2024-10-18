import React, { useState, useRef, useEffect } from 'react';

interface HighlightableTextProps {
  text: string;
  onHighlight: (highlightedText: string) => void;
}

const HighlightableText: React.FC<HighlightableTextProps> = ({ text, onHighlight }) => {
  const [selection, setSelection] = useState<string>('');
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const selectedText = window.getSelection()?.toString() || '';
      setSelection(selectedText);
      onHighlight(selectedText);
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onHighlight]);

  return (
    <div className="mb-4">
      <div
        ref={textRef}
        className="p-2 border border-gray-300 rounded"
        style={{ userSelect: 'text' }}
      >
        {text}
      </div>
      {selection && (
        <div className="mt-2 p-2 bg-yellow-100 rounded">
          <p className="font-semibold">Selected text:</p>
          <p>{selection}</p>
        </div>
      )}
    </div>
  );
};

export default HighlightableText;