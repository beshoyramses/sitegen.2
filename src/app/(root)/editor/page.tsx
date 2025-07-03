"use client";

import { ComponentPalette } from '@/components/editor/ComponentPalette';
import { Toolbar } from '@/components/editor/Toolbar';
import { Canvas } from '@/components/editor/Canvas';
import { TemplatePalette } from '@/components/editor/TemplatePalette';
import { LayerList } from '@/components/editor/LayerList';
import { PropertiesPanel } from '@/components/editor/PropertiesPanel';
import { useEditorState } from '@/lib/hooks/useEditorState';
import { Layers } from 'lucide-react';
import React, { useRef } from 'react';
import { componentTypes } from '@/types';

const PageEditor = () => {
  const {
    components,
    setComponents,
    selectedComponent,
    setSelectedComponent,
    activeTab,
    setActiveTab,
    isPreviewMode,
    setIsPreviewMode,
    draggedIndex,
    setDraggedIndex,
    applyTemplate,
    deleteComponent,
    templates
  } = useEditorState();

  const canvasRef = useRef(null);

  // Handle drag start for components
  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
  };

  // Handle drag start for layers
  const handleLayerDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedIndex(index);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    
    if (componentType) {
      // Create new component with default properties
      const newComponent = {
        id: `comp-${Date.now()}`,
        type: componentType,
      };
      
      // Set default properties based on type
      switch(componentType) {
        case 'hero':
          newComponent.title = 'Hero Title';
          newComponent.subtitle = 'Hero subtitle text goes here';
          newComponent.buttonText = 'Learn More';
          break;
        case 'text':
          newComponent.content = 'This is a text block. Click to edit.';
          break;
        case 'button':
          newComponent.text = 'Button Text';
          break;
        case 'features':
          newComponent.title = 'Features Section';
          newComponent.subtitle = 'Highlight your key features';
          newComponent.features = [
            { title: 'Feature 1', description: 'Description of feature 1' },
            { title: 'Feature 2', description: 'Description of feature 2' },
            { title: 'Feature 3', description: 'Description of feature 3' }
          ];
          break;
        case 'testimonials':
          newComponent.title = 'Testimonials';
          newComponent.testimonials = [
            { name: 'John Doe', role: 'CEO', content: 'Great product!' },
            { name: 'Jane Smith', role: 'Designer', content: 'Love using this!' }
          ];
          break;
        default:
          break;
      }
      
      setComponents([...components, newComponent]);
    }
    setDraggedIndex(null);
  };

  // Handle layer reordering
  const handleLayerDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (fromIndex !== dropIndex) {
      const newComponents = [...components];
      const [movedItem] = newComponents.splice(fromIndex, 1);
      newComponents.splice(dropIndex, 0, movedItem);
      setComponents(newComponents);
    }
    setDraggedIndex(null);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle property change
  const handlePropertyChange = (property: string, value: any) => {
    const updatedComponents = components.map(comp => {
      if (comp.id === selectedComponent.id) {
        return { ...comp, [property]: value };
      }
      return comp;
    });
    setComponents(updatedComponents);
    setSelectedComponent({ ...selectedComponent, [property]: value });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Toolbar 
        isPreviewMode={isPreviewMode} 
        setIsPreviewMode={setIsPreviewMode} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h2 className="font-semibold text-lg mb-4">Design Tools</h2>
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'components' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('components')}
              >
                Components
              </button>
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'templates' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('templates')}
              >
                Templates
              </button>
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'layers' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                onClick={() => setActiveTab('layers')}
              >
                <Layers size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'components' ? (
              <ComponentPalette 
                componentTypes={componentTypes} 
                handleDragStart={handleDragStart} 
              />
            ) : activeTab === 'templates' ? (
              <TemplatePalette 
                templates={templates} 
                applyTemplate={applyTemplate} 
              />
            ) : (
              <LayerList 
                components={components}
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
                draggedIndex={draggedIndex}
                handleLayerDragStart={handleLayerDragStart}
                handleDragOver={handleDragOver}
                handleLayerDrop={handleLayerDrop}
              />
            )}
          </div>
        </div>

        {/* Main Canvas */}
        <Canvas
          isPreviewMode={isPreviewMode}
          components={components}
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          applyTemplate={applyTemplate}
          templates={templates}
        />

        {/* Right Sidebar - Properties Panel */}
        {!isPreviewMode && (
          <PropertiesPanel 
            selectedComponent={selectedComponent}
            deleteComponent={deleteComponent}
            components={components}
            setComponents={setComponents}
            handlePropertyChange={handlePropertyChange}
          />
        )}
      </div>
    </div>
  );
};

export default PageEditor;