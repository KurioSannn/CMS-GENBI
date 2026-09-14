import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Code,
  Undo,
  Redo,
} from 'lucide-react';

interface RichEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichEditor({
  value,
  onChange,
  placeholder = 'Mulai ketik isi berita atau pengumuman di sini...',
}: RichEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const editorRef = useRef<HTMLDivElement>(null);

  // Exec command wrapper for contentEditable
  const format = (cmd: string, val: string = '') => {
    document.execCommand(cmd, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Masukkan URL Link:');
    if (url) format('createLink', url);
  };

  const insertImage = () => {
    const url = prompt('Masukkan URL Gambar:');
    if (url) format('insertImage', url);
  };

  return (
    <div className="border border-slate-300 rounded-xl overflow-hidden bg-white shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2 gap-2">
        <div className="flex flex-wrap items-center gap-1 text-slate-600">
          <button
            type="button"
            onClick={() => format('formatBlock', '<h2>')}
            className="p-1.5 hover:bg-slate-200 rounded text-xs font-bold flex items-center gap-0.5"
            title="Heading 2"
          >
            <Heading2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => format('formatBlock', '<h3>')}
            className="p-1.5 hover:bg-slate-200 rounded text-xs font-bold flex items-center gap-0.5"
            title="Heading 3"
          >
            <Heading3 size={16} />
          </button>
          <div className="h-4 w-[1px] bg-slate-300 mx-1" />
          <button
            type="button"
            onClick={() => format('bold')}
            className="p-1.5 hover:bg-slate-200 rounded"
            title="Tebal (Bold)"
          >
            <Bold size={15} />
          </button>
          <button
            type="button"
            onClick={() => format('italic')}
            className="p-1.5 hover:bg-slate-200 rounded"
            title="Miring (Italic)"
          >
            <Italic size={15} />
          </button>
          <div className="h-4 w-[1px] bg-slate-300 mx-1" />
          <button
            type="button"
            onClick={() => format('insertUnorderedList')}
            className="p-1.5 hover:bg-slate-200 rounded"
            title="Daftar Poin (Bullet List)"
          >
            <List size={15} />
          </button>
          <button
            type="button"
            onClick={() => format('insertOrderedList')}
            className="p-1.5 hover:bg-slate-200 rounded"
            title="Daftar Angka (Numbered List)"
          >
            <ListOrdered size={15} />
          </button>
          <button
            type="button"
            onClick={() => format('formatBlock', '<blockquote>')}
            className="p-1.5 hover:bg-slate-200 rounded"
            title="Kutipan (Blockquote)"
          >
            <Quote size={15} />
          </button>
          <div className="h-4 w-[1px] bg-slate-300 mx-1" />
          <button
            type="button"
            onClick={insertLink}
            className="p-1.5 hover:bg-slate-200 rounded"
            title="Sisipkan Link"
          >
            <LinkIcon size={15} />
          </button>
          <button
            type="button"
            onClick={insertImage}
            className="p-1.5 hover:bg-slate-200 rounded"
            title="Sisipkan Gambar dari URL"
          >
            <ImageIcon size={15} />
          </button>
        </div>

        {/* Tab Switcher (Tulis / Preview) */}
        <div className="flex bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'write' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded-md flex items-center gap-1 transition-all ${
              activeTab === 'preview' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye size={12} />
            Preview
          </button>
        </div>
      </div>

      {/* Write Area */}
      {activeTab === 'write' ? (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: value }}
          className="min-h-[300px] max-h-[500px] overflow-y-auto p-4 text-slate-800 text-sm focus:outline-none prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed"
          data-placeholder={placeholder}
        />
      ) : (
        <div className="min-h-[300px] max-h-[500px] overflow-y-auto p-4 bg-slate-50/50">
          <div
            dangerouslySetInnerHTML={{ __html: value || '<p class="text-slate-400 italic">Belum ada konten...</p>' }}
            className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed"
          />
        </div>
      )}
    </div>
  );
}
