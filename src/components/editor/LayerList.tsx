import { GripVertical } from 'lucide-react';

interface LayerListProps {
  components: any[];
  selectedComponent: any;
  setSelectedComponent: (component: any) => void;
  draggedIndex: number | null;
  handleLayerDragStart: (e: React.DragEvent, index: number) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleLayerDrop: (e: React.DragEvent, dropIndex: number) => void;
}

export const LayerList = ({
  components,
  selectedComponent,
  setSelectedComponent,
  draggedIndex,
  handleLayerDragStart,
  handleDragOver,
  handleLayerDrop
}: LayerListProps) => (
  <div className="space-y-2">
    <div className="text-gray-400 text-sm mb-2">Drag to reorder layers</div>
    {components.map((component, index) => (
      <div 
        key={component.id}
        draggable
        onDragStart={(e) => handleLayerDragStart(e, index)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleLayerDrop(e, index)}
        className={`p-3 bg-gray-800 rounded-lg flex items-center justify-between cursor-move ${
          selectedComponent?.id === component.id ? 'ring-2 ring-blue-500' : ''
        } ${draggedIndex === index ? 'opacity-50' : ''}`}
        onClick={() => setSelectedComponent(component)}
      >
        <div className="flex items-center gap-2">
          <GripVertical className="text-gray-500" size={16} />
          <div>
            <div className="text-sm font-medium">
              {component.type}
            </div>
            <div className="text-xs text-gray-500">
              {component.title || component.text || component.content?.substring(0, 20) + '...' || 'Element'}
            </div>
          </div>
        </div>
        <div className="text-gray-500 text-xs">
          {index + 1}
        </div>
      </div>
    ))}
  </div>
);