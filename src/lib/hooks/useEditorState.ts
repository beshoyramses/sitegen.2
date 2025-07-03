// hooks/useEditorState.ts
import { useState } from 'react';
import { Component, Template } from '@/types';
import { templates } from '../constants';

export const useEditorState = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [activeTab, setActiveTab] = useState('components');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const applyTemplate = (template: Template) => {
    setComponents([...template.components]);
    setSelectedComponent(null);
  };

  const deleteComponent = (id: string) => {
    const updatedComponents = components.filter(comp => comp.id !== id);
    setComponents(updatedComponents);
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };

  return {
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
  };
};