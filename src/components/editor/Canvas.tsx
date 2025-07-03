import { LayoutDashboard } from 'lucide-react';
import { ComponentRenderer } from './ComponentRenderer';

interface CanvasProps {
  isPreviewMode: boolean;
  components: any[];
  selectedComponent: any;
  setSelectedComponent: (component: any) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  applyTemplate: (template: any) => void;
  templates: any[];
}

export const Canvas = ({
  isPreviewMode,
  components,
  selectedComponent,
  setSelectedComponent,
  handleDrop,
  handleDragOver,
  applyTemplate,
  templates
}: CanvasProps) => (
  <div 
    className="flex-1 overflow-auto bg-gray-950 p-8"
    onDrop={isPreviewMode ? undefined : handleDrop}
    onDragOver={isPreviewMode ? undefined : handleDragOver}
  >
    {isPreviewMode ? (
      <div className="max-w-4xl mx-auto bg-black rounded-xl border border-gray-800">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">Page Preview</h2>
          <button 
            className="text-gray-400 hover:text-white"
            onClick={() => setIsPreviewMode(false)}
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {components.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">👋</div>
              <h3 className="text-2xl font-bold mb-2">Start Building Your Page</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Drag components from the left sidebar to start creating your page.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {components.map((comp, index) => (
                <ComponentRenderer 
                  key={comp.id}
                  component={comp}
                  selectedComponent={selectedComponent}
                  setSelectedComponent={setSelectedComponent}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="max-w-4xl mx-auto min-h-full">
        {components.length === 0 ? (
          <div 
            className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-800 rounded-xl p-12 text-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="bg-gray-900 rounded-full p-6 mb-6">
              <LayoutDashboard size={48} className="text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Drag Your First Component</h3>
            <p className="text-gray-400 max-w-md mb-6">
              Get started by dragging components from the left sidebar onto this canvas.
            </p>
            <button 
              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg flex items-center gap-2"
              onClick={() => applyTemplate(templates[0])}
            >
              <LayoutDashboard size={18} />
              Use Default Landing Page
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {components.map((comp, index) => (
              <ComponentRenderer 
                key={comp.id}
                component={comp}
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
              />
            ))}
          </div>
        )}
      </div>
    )}
  </div>
);