import { Component } from "@/types";
import { 
  LayoutDashboard, 
  Square, 
  Text as TextIcon,
  Image as ImageIcon,
  Server,
  Columns,
  List
} from 'lucide-react';

interface ComponentRendererProps {
  component: Component;
  selectedComponent: Component | null;
  setSelectedComponent: (component: Component) => void;
}

export const ComponentRenderer = ({
  component,
  selectedComponent,
  setSelectedComponent
}: ComponentRendererProps) => {
  const handleSelect = () => setSelectedComponent(component);
  
  const renderIcon = (type: string) => {
    switch(type) {
      case 'hero': return <LayoutDashboard size={24} className="text-blue-400" />;
      case 'text': return <TextIcon size={24} className="text-blue-400" />;
      case 'image': return <ImageIcon size={24} className="text-blue-400" />;
      case 'button': return <Server size={24} className="text-blue-400" />;
      case 'features': return <Columns size={24} className="text-blue-400" />;
      case 'testimonials': return <List size={24} className="text-blue-400" />;
      default: return <Square size={24} className="text-blue-400" />;
    }
  };

  switch(component.type) {
    case 'hero':
      return (
        <div 
          className={`p-12 rounded-xl bg-gray-900 border-2 ${selectedComponent?.id === component.id ? 'border-blue-500' : 'border-gray-800'} relative group`}
          onClick={handleSelect}
        >
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded hidden group-hover:block">
            Hero
          </div>
          <h2 className="text-4xl font-bold mb-4">{component.title}</h2>
          <p className="text-xl text-gray-400 mb-8">{component.subtitle}</p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium">
            {component.buttonText}
          </button>
        </div>
      );
    // ... other component renderers
    default:
      return (
        <div 
          className={`p-6 rounded-lg bg-gray-900 border-2 ${selectedComponent?.id === component.id ? 'border-blue-500' : 'border-gray-800'} relative group flex items-center gap-3`}
          onClick={handleSelect}
        >
          <div className="text-blue-400">{renderIcon(component.type)}</div>
          <div>
            <div className="font-medium">Unsupported Component</div>
            <div className="text-gray-500 text-sm">{component.type}</div>
          </div>
        </div>
      );
  }
};