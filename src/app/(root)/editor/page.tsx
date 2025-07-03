"use client";

import { ComponentPalette } from '@/components/editor/ComponentPalette';
import { Toolbar } from '@/components/editor/Toolbar';
import { useEditorState } from '@/lib/hooks/useEditorState';
import { Layers } from 'lucide-react';
import React, { useRef } from 'react';

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
        title: 'New Component',
        // ... other default properties
      };
      
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
            setComponents={setComponents}
            components={components}
            setSelectedComponent={setSelectedComponent}
          />
        )}
      </div>
    </div>
  );
};

export default PageEditor;