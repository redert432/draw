import React from 'react';
import { ToolType, BrushStyle } from '../types';
import { 
  Palette, 
  Eraser, 
  Undo2, 
  Download, 
  Trash2, 
  Sparkles,
  Loader2,
  Pen,
  Highlighter,
  SprayCan,
  Zap,
  Droplets,
  Brush
} from 'lucide-react';

interface StudioToolbarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  brushStyle: BrushStyle;
  setBrushStyle: (style: BrushStyle) => void;
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  onUndo: () => void;
  onClear: () => void;
  onSave: () => void;
  onInspire: () => void;
  isGeneratingInspiration: boolean;
}

const COLORS = [
  '#000000', '#4B5563', '#EF4444', '#F97316', '#F59E0B', 
  '#84CC16', '#10B981', '#06B6D4', '#3B82F6', '#6366F1', 
  '#8B5CF6', '#EC4899', '#FFFFFF'
];

export const StudioToolbar: React.FC<StudioToolbarProps> = ({
  activeTool,
  setActiveTool,
  brushStyle,
  setBrushStyle,
  color,
  setColor,
  brushSize,
  setBrushSize,
  onUndo,
  onClear,
  onSave,
  onInspire,
  isGeneratingInspiration
}) => {

  const brushTypes = [
    { id: BrushStyle.PENCIL, icon: <Pen className="w-5 h-5" />, label: 'قلم' },
    { id: BrushStyle.MARKER, icon: <Highlighter className="w-5 h-5" />, label: 'تخطيط' },
    { id: BrushStyle.WATERCOLOR, icon: <Droplets className="w-5 h-5" />, label: 'مائي' },
    { id: BrushStyle.SPRAY, icon: <SprayCan className="w-5 h-5" />, label: 'بخاخ' },
    { id: BrushStyle.NEON, icon: <Zap className="w-5 h-5" />, label: 'نيون' },
  ];

  return (
    <div className="w-full lg:w-[22rem] glass-panel h-auto lg:h-[calc(100vh-100px)] lg:m-4 lg:rounded-3xl overflow-y-auto p-6 flex flex-col gap-6 shadow-xl z-10 transition-all custom-scrollbar">
      
      {/* Inspiration Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-white/50">
            <h3 className="text-indigo-900 font-black text-lg mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            مُلهم الأفكار
            </h3>
            <p className="text-xs font-bold text-slate-500 mb-4 leading-relaxed">دع الذكاء الاصطناعي يطلق عنان خيالك</p>
            <button 
            onClick={onInspire}
            disabled={isGeneratingInspiration}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/40 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
            {isGeneratingInspiration ? (
                <>
                <Loader2 className="w-4 h-4 animate-spin" />
                جاري التفكير...
                </>
            ) : (
                'اقترح فكرة جديدة'
            )}
            </button>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>

      {/* Main Tools (Brush vs Eraser) */}
      <div className="flex gap-3">
          <button
            onClick={() => setActiveTool(ToolType.BRUSH)}
            className={`flex-1 p-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 border-2 ${activeTool === ToolType.BRUSH ? 'bg-indigo-600 border-indigo-600 shadow-lg text-white' : 'bg-white/40 border-transparent hover:bg-white/60 text-slate-600'}`}
          >
            <Brush className="w-5 h-5" />
            <span className="font-bold text-sm">رسم</span>
          </button>
          <button
            onClick={() => setActiveTool(ToolType.ERASER)}
            className={`flex-1 p-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 border-2 ${activeTool === ToolType.ERASER ? 'bg-indigo-600 border-indigo-600 shadow-lg text-white' : 'bg-white/40 border-transparent hover:bg-white/60 text-slate-600'}`}
          >
            <Eraser className="w-5 h-5" />
            <span className="font-bold text-sm">ممحاة</span>
          </button>
      </div>

      {/* Brush Styles (Only visible if Brush is active) */}
      {activeTool === ToolType.BRUSH && (
        <div className="animate-fade-in">
            <h3 className="text-slate-800 font-extrabold mb-3 text-sm uppercase tracking-wider">نوع الفرشاة</h3>
            <div className="grid grid-cols-5 gap-2">
                {brushTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => setBrushStyle(type.id)}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 border ${brushStyle === type.id ? 'bg-white border-indigo-500 text-indigo-600 shadow-md transform scale-105' : 'bg-white/30 border-transparent text-slate-500 hover:bg-white/50'}`}
                        title={type.label}
                    >
                        {type.icon}
                        <span className="text-[0.6rem] font-bold">{type.label}</span>
                    </button>
                ))}
            </div>
        </div>
      )}

      {/* Color Section */}
      <div>
        <h3 className="text-slate-800 font-extrabold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
          الألوان
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                if(activeTool === ToolType.ERASER) setActiveTool(ToolType.BRUSH);
              }}
              className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-125 shadow-sm ${color === c && activeTool !== ToolType.ERASER ? 'border-white ring-2 ring-indigo-500 scale-110 shadow-md' : 'border-transparent ring-1 ring-black/5'}`}
              style={{ backgroundColor: c }}
              aria-label={`Select color ${c}`}
            />
          ))}
          <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-sm ring-1 ring-black/5 hover:scale-110 transition-transform">
             <input 
                type="color" 
                value={color}
                onChange={(e) => {
                setColor(e.target.value);
                if(activeTool === ToolType.ERASER) setActiveTool(ToolType.BRUSH);
                }}
                className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer p-0 m-0"
            />
             <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <Palette className="w-4 h-4 text-white drop-shadow-md" />
             </div>
          </div>
        </div>
      </div>

      {/* Size Section */}
      <div>
        <h3 className="text-slate-800 font-extrabold mb-3 text-sm uppercase tracking-wider flex justify-between">
          <span>الحجم</span>
          <span className="bg-white/50 px-2 rounded-md text-xs py-0.5">{brushSize}px</span>
        </h3>
        <div className="bg-white/40 p-4 rounded-2xl border border-white/40">
            <input
            type="range"
            min="1"
            max="80"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200/50 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-auto grid grid-cols-3 gap-2">
        <button
            onClick={onUndo}
            className="col-span-1 py-3 bg-white/50 hover:bg-white text-slate-700 rounded-xl hover:text-indigo-600 transition-all font-bold flex flex-col items-center justify-center gap-1 text-xs shadow-sm hover:shadow-md border border-white/50"
        >
            <Undo2 className="w-5 h-5" />
            تراجع
        </button>
        
        <button
            onClick={onClear}
            className="col-span-1 py-3 bg-red-50/50 hover:bg-red-50 text-red-600 rounded-xl transition-all font-bold flex flex-col items-center justify-center gap-1 text-xs shadow-sm hover:shadow-md border border-red-100/50"
        >
            <Trash2 className="w-5 h-5" />
            مسح
        </button>
        <button
            onClick={onSave}
            className="col-span-1 py-3 bg-green-50/50 hover:bg-green-50 text-green-600 rounded-xl transition-all font-bold flex flex-col items-center justify-center gap-1 text-xs shadow-sm hover:shadow-md border border-green-100/50"
        >
            <Download className="w-5 h-5" />
            حفظ
        </button>
      </div>
    </div>
  );
};