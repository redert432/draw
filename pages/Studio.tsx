import React, { useRef, useState, useEffect, useCallback } from 'react';
import { StudioToolbar } from '../components/StudioToolbar';
import { ToolType, BrushStyle } from '../types';
import { getDrawingInspiration } from '../services/geminiService';
import { Sparkles, X, Menu } from 'lucide-react';

export const Studio: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Tool State
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.BRUSH);
  const [brushStyle, setBrushStyle] = useState<BrushStyle>(BrushStyle.PENCIL);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  
  // Track last position for smooth drawing
  const lastPos = useRef<{x: number, y: number} | null>(null);

  // History State for Undo
  const [history, setHistory] = useState<ImageData[]>([]);
  
  // Inspiration State
  const [inspiration, setInspiration] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Mobile UI
  const [showToolbar, setShowToolbar] = useState(true);

  // Initialize Canvas
  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      
      if (context) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
        
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.lineCap = 'round';
        context.lineJoin = 'round';
        setCtx(context);
        
        setHistory([context.getImageData(0, 0, canvas.width, canvas.height)]);
      }
    }
    
    // Resize handler (basic implementation)
    const handleResize = () => {
       if (canvasRef.current && containerRef.current && ctx) {
         // Note: Real resizing wipes canvas, usually we'd save data, resize, restore.
         // For this demo, we keep it simple to avoid wiping user art unexpectedly.
       }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Configure Context based on Tool & Brush Style
  useEffect(() => {
    if (!ctx) return;
  }, [ctx, brushSize, color, activeTool, brushStyle]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!ctx) return;
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    lastPos.current = { x, y };

    ctx.beginPath();
    ctx.moveTo(x, y);

    // Initial setup for the stroke
    ctx.strokeStyle = activeTool === ToolType.ERASER ? '#FFFFFF' : color;
    ctx.fillStyle = activeTool === ToolType.ERASER ? '#FFFFFF' : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';

    if (activeTool === ToolType.BRUSH) {
        switch (brushStyle) {
            case BrushStyle.MARKER:
                ctx.globalAlpha = 0.5; // Transparent
                ctx.globalCompositeOperation = 'multiply'; // Blending if on white
                // Fallback for white background drawing
                if (color === '#FFFFFF') ctx.globalCompositeOperation = 'source-over';
                break;
            case BrushStyle.NEON:
                ctx.shadowBlur = 15;
                ctx.shadowColor = color;
                ctx.lineWidth = brushSize / 2; // Thinner core
                break;
            case BrushStyle.WATERCOLOR:
                ctx.globalAlpha = 0.1; // Very transparent
                ctx.shadowBlur = brushSize / 2;
                ctx.shadowColor = color;
                break;
            case BrushStyle.SPRAY:
                // Spray doesn't use lineTo, handled in draw
                break;
            case BrushStyle.PENCIL:
            default:
                // Standard settings
                break;
        }
    }

    // For single click dots (except spray which loops)
    if (activeTool !== ToolType.BRUSH || brushStyle !== BrushStyle.SPRAY) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !ctx || !lastPos.current) return;
    e.preventDefault(); 
    const { x, y } = getCoordinates(e);

    if (activeTool === ToolType.BRUSH && brushStyle === BrushStyle.SPRAY) {
        // Spray Logic: scatter points around mouse position
        const density = Math.max(10, brushSize * 2);
        for (let i = 0; i < density; i++) {
            const offsetX = (Math.random() - 0.5) * brushSize * 2;
            const offsetY = (Math.random() - 0.5) * brushSize * 2;
            
            // Circular spray pattern check
            if (offsetX * offsetX + offsetY * offsetY <= brushSize * brushSize) {
                ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
            }
        }
    } else {
        // Standard Line Drawing Logic
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
    lastPos.current = { x, y };
  };

  const stopDrawing = () => {
    if (!isDrawing || !ctx || !canvasRef.current) return;
    setIsDrawing(false);
    lastPos.current = null;
    ctx.closePath();
    
    // Reset Context for safety
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'source-over';

    const newState = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHistory(prev => [...prev.slice(-49), newState]);
  };

  const handleUndo = useCallback(() => {
    if (history.length <= 1 || !ctx) return;
    
    const newHistory = [...history];
    newHistory.pop(); 
    
    const previousState = newHistory[newHistory.length - 1];
    if (previousState) {
        ctx.putImageData(previousState, 0, 0);
        setHistory(newHistory);
    }
  }, [history, ctx]);

  const handleClear = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const newState = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHistory(prev => [...prev, newState]);
  };

  const handleSave = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `ibdaa-art-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const handleInspiration = async () => {
    setIsGenerating(true);
    const idea = await getDrawingInspiration();
    setInspiration(idea);
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] relative overflow-hidden p-4 gap-4">
        
        {/* Toggle Toolbar (Mobile) */}
        <button 
            className="lg:hidden absolute top-6 right-6 z-40 bg-white p-2 rounded-full shadow-lg"
            onClick={() => setShowToolbar(!showToolbar)}
        >
            <Menu className="w-6 h-6 text-indigo-600" />
        </button>

        {/* Canvas Area */}
        <div ref={containerRef} className="flex-1 relative order-2 lg:order-1 bg-white/20 backdrop-blur-sm shadow-2xl rounded-[2rem] overflow-hidden cursor-crosshair touch-none border-4 border-white/40">
            
            {/* Inspiration Overlay Toast */}
            {inspiration && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-2xl p-4 max-w-md z-30 animate-bounce flex items-start gap-3">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-full mt-1">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-900 text-sm mb-1">فكرة للرسم</h4>
                        <p className="text-slate-800 font-medium">{inspiration}</p>
                    </div>
                    <button onClick={() => setInspiration(null)} className="text-slate-400 hover:text-red-500 mr-2 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}

            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="block bg-white shadow-inner mx-auto my-auto"
                style={{ 
                    touchAction: 'none',
                }}
            />
        </div>

        {/* Sidebar Toolbar */}
        <div className={`
            order-1 lg:order-2 
            transition-all duration-300 ease-in-out
            ${showToolbar ? 'translate-x-0 opacity-100' : 'translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100 absolute lg:relative pointer-events-none lg:pointer-events-auto'}
            z-30
        `}>
            <StudioToolbar
                activeTool={activeTool}
                setActiveTool={setActiveTool}
                brushStyle={brushStyle}
                setBrushStyle={setBrushStyle}
                color={color}
                setColor={setColor}
                brushSize={brushSize}
                setBrushSize={setBrushSize}
                onUndo={handleUndo}
                onClear={handleClear}
                onSave={handleSave}
                onInspire={handleInspiration}
                isGeneratingInspiration={isGenerating}
            />
        </div>
    </div>
  );
};