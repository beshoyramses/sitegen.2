import { ComponentType } from "@/types";

interface ComponentPaletteProps {
  componentTypes: ComponentType[];
  handleDragStart: (e: React.DragEvent, componentType: string) => void;
}

export const ComponentPalette = ({ 
  componentTypes, 
  handleDragStart 
}: ComponentPaletteProps) => (
  <div className="space-y-3">
    {componentTypes.map((comp) => (
      <div 
        key={comp.id}
        className="p-3 bg-gray-800 rounded-lg flex items-center gap-3 cursor-move hover:bg-gray-700"
        draggable
        onDragStart={(e) => handleDragStart(e, comp.id)}
      >
        <div className="text-blue-400">{comp.icon}</div>
        <span>{comp.name}</span>
      </div>
    ))}
  </div>
);