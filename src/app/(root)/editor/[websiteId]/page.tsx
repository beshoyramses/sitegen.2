// src/app/editor/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  LayoutDashboard, Box, Type, Image, Sliders, Code, Copy, Trash2, 
  ArrowLeft, Save, Plus, Grid, Settings, Eye, Download, Axis3D, 
  Palette, Text, MousePointer, Component, Columns, Rows, PanelLeftClose,
  PanelLeftOpen, PanelRightClose, PanelRightOpen, Minus, Maximize, 
  ChevronDown, ChevronUp, Search, Menu, X, Undo, Redo
} from 'lucide-react';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger 
} from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  ResizablePanel, ResizablePanelGroup, ResizableHandle 
} from '@/components/ui/resizable';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useHotkeys } from 'react-hotkeys-hook';
import { ChromePicker } from 'react-color';

// Define component types
type ComponentType = 
  | 'container'
  | 'text'
  | 'image'
  | 'button'
  | 'card'
  | 'form'
  | 'video'
  | 'grid'
  | 'section'
  | 'divider'
  | 'input'
  | 'textarea'
  | 'select';

interface Component {
  id: string;
  type: ComponentType;
  content: string;
  props: Record<string, any>;
  children?: Component[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  components: Component[];
}

// Initial templates
const templates: Template[] = [
  // ... (existing templates remain the same)
];

// Enhanced component library
const componentLibrary: Component[] = [
  {
    id: 'container',
    type: 'container',
    content: 'Container',
    props: { className: 'p-4 bg-gray-50 border rounded' }
  },
  {
    id: 'text',
    type: 'text',
    content: 'Text Block',
    props: { className: 'text-base text-gray-800' }
  },
  {
    id: 'button',
    type: 'button',
    content: 'Button',
    props: { className: 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700' }
  },
  {
    id: 'image',
    type: 'image',
    content: 'Image',
    props: { 
      className: 'w-full h-48 object-cover rounded',
      src: 'https://via.placeholder.com/300'
    }
  },
  {
    id: 'card',
    type: 'card',
    content: 'Card',
    props: { className: 'bg-white rounded-lg shadow-md overflow-hidden' }
  },
  {
    id: 'form',
    type: 'form',
    content: 'Form',
    props: { className: 'bg-white p-4 rounded-lg shadow' }
  },
  {
    id: 'video',
    type: 'video',
    content: 'Video',
    props: { className: 'w-full', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
  },
  {
    id: 'grid',
    type: 'grid',
    content: 'Grid Layout',
    props: { className: 'grid grid-cols-2 gap-4' }
  },
  {
    id: 'section',
    type: 'section',
    content: 'Section',
    props: { className: 'py-12' }
  },
  {
    id: 'divider',
    type: 'divider',
    content: 'Divider',
    props: { className: 'border-t my-6' }
  },
  {
    id: 'input',
    type: 'input',
    content: 'Input Field',
    props: { 
      className: 'w-full p-2 border rounded',
      placeholder: 'Enter text...'
    }
  },
  {
    id: 'textarea',
    type: 'textarea',
    content: 'Text Area',
    props: { 
      className: 'w-full p-2 border rounded',
      placeholder: 'Enter description...',
      rows: 3
    }
  },
  {
    id: 'select',
    type: 'select',
    content: 'Select Dropdown',
    props: { 
      className: 'w-full p-2 border rounded',
      options: ['Option 1', 'Option 2', 'Option 3']
    }
  }
];

// Draggable component item
const DraggableComponent: React.FC<{ 
  component: Component, 
  onAdd: (component: Component) => void 
}> = ({ component, onAdd }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { ...component, id: `${component.type}-${Date.now()}` },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getIcon = () => {
    switch (component.type) {
      case 'container': return <Box className="h-4 w-4 text-blue-600" />;
      case 'text': return <Text className="h-4 w-4 text-blue-600" />;
      case 'button': return <Component className="h-4 w-4 text-blue-600" />;
      case 'image': return <Image className="h-4 w-4 text-blue-600" />;
      case 'card': return <LayoutDashboard className="h-4 w-4 text-blue-600" />;
      case 'form': return <Sliders className="h-4 w-4 text-blue-600" />;
      case 'video': return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="10 8 16 12 10 16 10 8"></polygon>
        </svg>
      );
      case 'grid': return <Grid className="h-4 w-4 text-blue-600" />;
      case 'section': return <Rows className="h-4 w-4 text-blue-600" />;
      case 'divider': return <Minus className="h-4 w-4 text-blue-600" />;
      case 'input': return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      );
      case 'textarea': return <Text className="h-4 w-4 text-blue-600" />;
      case 'select': return <ChevronDown className="h-4 w-4 text-blue-600" />;
      default: return <Box className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div
      ref={drag}
      className={cn(
        "p-3 bg-white rounded-lg border cursor-move flex items-center gap-3 transition-all",
        isDragging ? 'opacity-50 shadow-lg scale-95' : 'opacity-100 hover:shadow-md'
      )}
      onClick={() => onAdd({ ...component, id: `${component.type}-${Date.now()}` })}
    >
      <div className="bg-blue-100 p-2 rounded-md">
        {getIcon()}
      </div>
      <div>
        <p className="font-medium">{component.content}</p>
        <p className="text-xs text-gray-500 capitalize">{component.type}</p>
      </div>
    </div>
  );
};

// Canvas component props
interface CanvasComponentProps {
  component: Component;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Component>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (component: Component) => void;
  isSelected: boolean;
  depth: number;
  selectedComponentId: string | null;
  onMove: (fromId: string, toId: string) => void;
}

// Component on canvas
const CanvasComponent: React.FC<CanvasComponentProps> = ({ 
  component, 
  onSelect, 
  onUpdate, 
  onDelete,
  onDuplicate,
  isSelected,
  depth,
  selectedComponentId,
  onMove
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'canvas-component',
    item: { id: component.id, type: component.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ['component', 'canvas-component'],
    drop: (item: any, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      
      if (item.type && item.type.startsWith('canvas-')) {
        // Moving existing component
        onMove(item.id, component.id);
      } else {
        // Adding new component
        if (component.type === 'container' || component.type === 'grid' || component.type === 'section') {
          onUpdate(component.id, {
            children: [...(component.children || []), { ...item, id: `${item.type}-${Date.now()}` }]
          });
          return { id: component.id };
        }
      }
    },
    canDrop: (item: Component) => {
      return component.type === 'container' || component.type === 'grid' || component.type === 'section';
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      canDrop: !!monitor.canDrop(),
    }),
    hover: (item, monitor) => {
      if (monitor.isOver({ shallow: true })) {
        // Visual feedback when hovering
      }
    }
  }));

  const renderComponent = () => {
    switch (component.type) {
      case 'container':
        return (
          <div 
            className={cn(
              "p-6 border rounded-lg min-h-[100px] bg-white relative",
              component.props.className,
              isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200',
              isOver && canDrop ? 'bg-blue-50 ring-1 ring-blue-300' : ''
            )}
          >
            {component.content && <p className="mb-2">{component.content}</p>}
            {component.children?.map((child) => (
              <CanvasComponent
                key={child.id}
                component={child}
                onSelect={onSelect}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
                isSelected={child.id === selectedComponentId}
                depth={depth + 1}
                selectedComponentId={selectedComponentId}
                onMove={onMove}
              />
            ))}
            {component.children?.length === 0 && (
              <div className="text-gray-400 text-center py-8 flex flex-col items-center">
                <Box className="h-8 w-8 mb-2" />
                <p>Drop components here</p>
              </div>
            )}
          </div>
        );
      case 'text':
        return (
          <div 
            className={cn(
              "p-3 bg-transparent",
              component.props.className,
              isSelected ? 'ring-2 ring-blue-500 rounded' : ''
            )}
            style={component.props.style || {}}
          >
            {component.content}
          </div>
        );
      case 'button':
        return (
          <button 
            className={cn(
              "px-4 py-2 rounded transition-colors",
              component.props.className,
              isSelected ? 'ring-2 ring-blue-500' : ''
            )}
          >
            {component.content}
          </button>
        );
      case 'image':
        return (
          <img 
            src={component.props.src || 'https://via.placeholder.com/300'} 
            alt="Component" 
            className={cn(
              component.props.className,
              isSelected ? 'ring-2 ring-blue-500 rounded' : ''
            )}
          />
        );
      case 'card':
        return (
          <div 
            className={cn(
              "rounded-lg overflow-hidden bg-white shadow-sm border",
              component.props.className,
              isSelected ? 'ring-2 ring-blue-500' : ''
            )}
          >
            <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{component.content}</h3>
              <p className="text-2xl font-bold mt-2">{component.props.value}</p>
              <p className="text-sm text-gray-600">{component.props.trend}</p>
            </div>
          </div>
        );
      case 'form':
        return (
          <div 
            className={cn(
              "p-4 rounded-lg bg-white border",
              component.props.className,
              isSelected ? 'ring-2 ring-blue-500' : ''
            )}
          >
            <div className="mb-4">
              <Label>Name</Label>
              <Input placeholder="Enter your name" />
            </div>
            <div className="mb-4">
              <Label>Email</Label>
              <Input placeholder="Enter your email" type="email" />
            </div>
            <Button className="w-full">Submit</Button>
          </div>
        );
      case 'video':
        return (
          <div 
            className={cn(
              "bg-gray-100 rounded-lg overflow-hidden",
              component.props.className,
              isSelected ? 'ring-2 ring-blue-500' : ''
            )}
          >
            <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center">
              <div className="bg-red-500 rounded-full p-4">
                <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        );
      case 'grid':
        return (
          <div 
            className={cn(
              "p-4 rounded-lg min-h-[100px] bg-gray-50 border border-dashed",
              component.props.className,
              isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200',
              isOver && canDrop ? 'bg-blue-50 ring-1 ring-blue-300' : ''
            )}
          >
            <div className={`grid ${component.props.grid || 'grid-cols-2'} gap-4`}>
              {component.children?.map((child) => (
                <CanvasComponent
                  key={child.id}
                  component={child}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                  isSelected={child.id === selectedComponentId}
                  depth={depth + 1}
                  selectedComponentId={selectedComponentId}
                  onMove={onMove}
                />
              ))}
            </div>
            {component.children?.length === 0 && (
              <div className="text-gray-400 text-center py-8 flex flex-col items-center">
                <Grid className="h-8 w-8 mb-2" />
                <p>Drop grid items here</p>
              </div>
            )}
          </div>
        );
      case 'section':
        return (
          <section 
            className={cn(
              "py-12 px-4 relative",
              component.props.className,
              isSelected ? 'ring-2 ring-blue-500' : '',
              isOver && canDrop ? 'bg-blue-50 ring-1 ring-blue-300' : ''
            )}
          >
            <div className="max-w-6xl mx-auto">
              {component.children?.map((child) => (
                <CanvasComponent
                  key={child.id}
                  component={child}
                  onSelect={onSelect}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                  isSelected={child.id === selectedComponentId}
                  depth={depth + 1}
                  selectedComponentId={selectedComponentId}
                  onMove={onMove}
                />
              ))}
              {component.children?.length === 0 && (
                <div className="text-gray-400 text-center py-8 flex flex-col items-center">
                  <Rows className="h-8 w-8 mb-2" />
                  <p>Drop section content here</p>
                </div>
              )}
            </div>
          </section>
        );
      case 'divider':
        return (
          <div 
            className={cn(
              "w-full h-px bg-gray-200 my-6 relative",
              component.props.className,
              isSelected ? 'ring-2 ring-blue-500 h-2' : ''
            )}
          />
        );
      case 'input':
        return (
          <div className={cn("w-full", isSelected ? 'ring-2 ring-blue-500 rounded p-1' : '')}>
            <Input
              placeholder={component.props.placeholder || 'Enter text...'}
              className={component.props.className}
            />
          </div>
        );
      case 'textarea':
        return (
          <div className={cn("w-full", isSelected ? 'ring-2 ring-blue-500 rounded p-1' : '')}>
            <Textarea
              placeholder={component.props.placeholder || 'Enter text...'}
              className={component.props.className}
              rows={component.props.rows || 3}
            />
          </div>
        );
      case 'select':
        return (
          <div className={cn("w-full", isSelected ? 'ring-2 ring-blue-500 rounded p-1' : '')}>
            <Select>
              <SelectTrigger className={component.props.className}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {(component.props.options || ['Option 1', 'Option 2', 'Option 3']).map((opt: string, i: number) => (
                  <SelectItem key={i} value={opt.toLowerCase().replace(' ', '-')}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return <div>Unsupported component</div>;
    }
  };

  return (
    <div 
      ref={node => drag(drop(node))}
      className={cn(
        "relative group transition-all mb-2",
        isDragging ? 'opacity-30' : 'opacity-100',
        `ml-${depth * 4}`
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(component.id);
      }}
    >
      {renderComponent()}
      
      {isSelected && (
        <div className="absolute top-2 right-2 flex gap-1 bg-white rounded shadow-lg border z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(component);
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Duplicate</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(component.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>

            {depth > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMove(component.id, 'root');
                    }}
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move to root</TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

const UIEditor = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [pageTitle, setPageTitle] = useState('My Awesome Page');
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [componentSearch, setComponentSearch] = useState('');
  const [history, setHistory] = useState<{components: Component[], template: Template | null}[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const selectedComponent = components.find(c => c.id === selectedComponentId) || 
    currentTemplate?.components.find(c => c.id === selectedComponentId);

  // Initialize history
  useEffect(() => {
    saveToHistory();
  }, []);

  const saveToHistory = useCallback(() => {
    const newHistory = [...history];
    if (historyIndex < newHistory.length - 1) {
      newHistory.splice(historyIndex + 1);
    }
    newHistory.push({
      components: JSON.parse(JSON.stringify(components)),
      template: currentTemplate ? JSON.parse(JSON.stringify(currentTemplate)) : null
    });
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [components, currentTemplate, history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    const prevState = history[historyIndex - 1];
    setComponents(prevState.components);
    setCurrentTemplate(prevState.template);
    setHistoryIndex(historyIndex - 1);
    toast.info('Undo last action');
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    const nextState = history[historyIndex + 1];
    setComponents(nextState.components);
    setCurrentTemplate(nextState.template);
    setHistoryIndex(historyIndex + 1);
    toast.info('Redo last action');
  }, [history, historyIndex]);

  // Keyboard shortcuts
  useHotkeys('ctrl+z', undo);
  useHotkeys('ctrl+y', redo);
  useHotkeys('delete', () => {
    if (selectedComponentId) {
      deleteComponent(selectedComponentId);
    }
  });

  const addComponent = useCallback((component: Component) => {
    const newComponents = [...components, component];
    setComponents(newComponents);
    setSelectedComponentId(component.id);
    saveToHistory();
  }, [components, saveToHistory]);

  const updateComponent = useCallback((id: string, updates: Partial<Component>) => {
    const updateRecursive = (comps: Component[]): Component[] => {
      return comps.map(comp => {
        if (comp.id === id) {
          return { ...comp, ...updates };
        }
        if (comp.children) {
          return { ...comp, children: updateRecursive(comp.children) };
        }
        return comp;
      });
    };

    let updated = false;

    if (currentTemplate) {
      const updatedTemplateComponents = updateRecursive(currentTemplate.components);
      if (JSON.stringify(updatedTemplateComponents) !== JSON.stringify(currentTemplate.components)) {
        setCurrentTemplate({ ...currentTemplate, components: updatedTemplateComponents });
        updated = true;
      }
    }

    const updatedComponents = updateRecursive(components);
    if (JSON.stringify(updatedComponents) !== JSON.stringify(components)) {
      setComponents(updatedComponents);
      updated = true;
    }

    if (updated) {
      saveToHistory();
    }
  }, [currentTemplate, components, saveToHistory]);

  const deleteComponent = useCallback((id: string) => {
    const deleteRecursive = (comps: Component[]): Component[] => {
      return comps.filter(comp => comp.id !== id)
        .map(comp => {
          if (comp.children) {
            return { ...comp, children: deleteRecursive(comp.children) };
          }
          return comp;
        });
    };

    if (currentTemplate) {
      const updatedTemplateComponents = deleteRecursive(currentTemplate.components);
      setCurrentTemplate({ ...currentTemplate, components: updatedTemplateComponents });
    }

    const updatedComponents = deleteRecursive(components);
    setComponents(updatedComponents);
    
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }

    saveToHistory();
  }, [currentTemplate, components, selectedComponentId, saveToHistory]);

  const duplicateComponent = useCallback((component: Component) => {
    const newComponent = { 
      ...component, 
      id: `${component.type}-${Date.now()}`,
      children: component.children?.map(child => ({
        ...child,
        id: `${child.type}-${Date.now()}`
      }))
    };
    setComponents([...components, newComponent]);
    setSelectedComponentId(newComponent.id);
    saveToHistory();
  }, [components, saveToHistory]);

  const moveComponent = useCallback((fromId: string, toId: string) => {
    if (fromId === toId) return;

    // Find component to move
    const findComponent = (comps: Component[], id: string): Component | null => {
      for (const comp of comps) {
        if (comp.id === id) return comp;
        if (comp.children) {
          const found = findComponent(comp.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const componentToMove = findComponent(components, fromId) || 
      (currentTemplate ? findComponent(currentTemplate.components, fromId) : null);

    if (!componentToMove) return;

    // Remove from current location
    const removeComponent = (comps: Component[], id: string): Component[] => {
      return comps.filter(comp => comp.id !== id)
        .map(comp => {
          if (comp.children) {
            return { ...comp, children: removeComponent(comp.children, id) };
          }
          return comp;
        });
    };

    // Add to new location
    const addComponentToTarget = (comps: Component[], targetId: string): Component[] => {
      return comps.map(comp => {
        if (comp.id === targetId) {
          return {
            ...comp,
            children: [...(comp.children || []), componentToMove]
          };
        }
        if (comp.children) {
          return { ...comp, children: addComponentToTarget(comp.children, targetId) };
        }
        return comp;
      });
    };

    if (toId === 'root') {
      // Move to root level
      const cleanedComponents = removeComponent(components, fromId);
      if (currentTemplate) {
        const cleanedTemplateComponents = removeComponent(currentTemplate.components, fromId);
        setCurrentTemplate({ ...currentTemplate, components: cleanedTemplateComponents });
      }
      setComponents([...cleanedComponents, { ...componentToMove, children: undefined }]);
    } else {
      // Move to another component
      if (currentTemplate) {
        const updatedTemplateComponents = addComponentToTarget(
          removeComponent(currentTemplate.components, fromId),
          toId
        );
        setCurrentTemplate({ ...currentTemplate, components: updatedTemplateComponents });
      }
      
      const updatedComponents = addComponentToTarget(
        removeComponent(components, fromId),
        toId
      );
      setComponents(updatedComponents);
    }

    setSelectedComponentId(componentToMove.id);
    saveToHistory();
  }, [components, currentTemplate, saveToHistory]);

  const applyTemplate = useCallback((template: Template) => {
    setCurrentTemplate(template);
    setComponents([]);
    setSelectedComponentId(template.components[0]?.id || null);
    toast.success(`Applied "${template.name}" template`);
    saveToHistory();
  }, [saveToHistory]);

  const clearCanvas = useCallback(() => {
    setComponents([]);
    setCurrentTemplate(null);
    setSelectedComponentId(null);
    toast.info('Canvas cleared');
    saveToHistory();
  }, [saveToHistory]);

  const exportHTML = useCallback(() => {
    toast.success('Exported as HTML');
    // In a real app, this would generate HTML code
  }, []);

  const saveProject = useCallback(() => {
    toast.success('Project saved successfully');
    saveToHistory();
  }, [saveToHistory]);

  const togglePreview = useCallback(() => {
    setPreviewMode(!previewMode);
    toast.info(previewMode ? 'Exited preview mode' : 'Entered preview mode');
  }, [previewMode]);

  // Filter components based on search
  const filteredComponentLibrary = componentLibrary.filter(comp => 
    comp.content.toLowerCase().includes(componentSearch.toLowerCase()) ||
    comp.type.toLowerCase().includes(componentSearch.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Top Navigation */}
        <header className="bg-white border-b">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold hidden sm:block">Advanced UI Editor</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden md:flex gap-2">
                <Button 
                  variant={previewMode ? "secondary" : "outline"} 
                  onClick={togglePreview}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {previewMode ? 'Edit Mode' : 'Preview'}
                </Button>
                <Button variant="outline" onClick={exportHTML} className="gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden lg:inline">Export</span>
                </Button>
                <Button onClick={saveProject} className="gap-2">
                  <Save className="h-4 w-4" />
                  <span className="hidden lg:inline">Save</span>
                </Button>
              </div>
              
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white w-64 h-full p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg">Menu</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <Button 
                  variant={previewMode ? "secondary" : "outline"} 
                  onClick={() => {
                    togglePreview();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {previewMode ? 'Edit Mode' : 'Preview'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    exportHTML();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                
                <Button 
                  onClick={() => {
                    saveProject();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                
                <Button 
                  variant="destructive"
                  onClick={() => {
                    clearCanvas();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Canvas
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Components Library */}
          {leftPanelOpen && (
            <div className="w-64 bg-white border-r flex flex-col hidden md:flex">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <Box className="h-5 w-5 text-blue-600" />
                    Components
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setLeftPanelOpen(false)}
                  >
                    <PanelLeftClose className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-3 relative">
                  <Input 
                    placeholder="Search components..."
                    value={componentSearch}
                    onChange={(e) => setComponentSearch(e.target.value)}
                    className="pl-8"
                  />
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <Tabs defaultValue="basic" className="mb-4">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="layouts">Layouts</TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic">
                    <div className="space-y-3">
                      {filteredComponentLibrary.filter(c => 
                        !['grid', 'section', 'divider'].includes(c.type)
                      ).map((comp) => (
                        <DraggableComponent 
                          key={comp.id} 
                          component={comp} 
                          onAdd={addComponent} 
                        />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="layouts">
                    <div className="space-y-3">
                      {filteredComponentLibrary.filter(c => 
                        ['grid', 'section', 'divider'].includes(c.type)
                      ).map((comp) => (
                        <DraggableComponent 
                          key={comp.id} 
                          component={comp} 
                          onAdd={addComponent} 
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="p-4 border-t">
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={clearCanvas}
                >
                  Clear Canvas
                </Button>
              </div>
            </div>
          )}

          {!leftPanelOpen && (
            <div className="border-r hidden md:block">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-none h-full"
                onClick={() => setLeftPanelOpen(true)}
              >
                <PanelLeftOpen className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b bg-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Input 
                  value={pageTitle} 
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="text-xl font-bold border-none px-0 w-auto max-w-xs bg-transparent"
                />
                <Badge variant="secondary" className="px-2 py-1">
                  {previewMode ? 'Preview Mode' : 'Editing'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="hidden md:flex">
                      <Axis3D className="h-4 w-4 mr-2" />
                      Templates
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64">
                    <DropdownMenuItem onClick={clearCanvas}>
                      Blank Canvas
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Popular Templates</DropdownMenuLabel>
                    {templates.map(template => (
                      <DropdownMenuItem 
                        key={template.id} 
                        onClick={() => applyTemplate(template)}
                        className="flex gap-3"
                      >
                        <img 
                          src={template.thumbnail} 
                          alt={template.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-gray-500">{template.description}</div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  onClick={() => setLeftPanelOpen(!leftPanelOpen)}
                >
                  <Box className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  onClick={() => setRightPanelOpen(!rightPanelOpen)}
                >
                  <Sliders className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div 
              className="flex-1 overflow-auto p-4 bg-gradient-to-br from-gray-50 to-gray-100 relative"
              onClick={() => setSelectedComponentId(null)}
            >
              <div className={cn(
                "max-w-6xl mx-auto bg-white rounded-xl shadow-sm min-h-[80vh] transition-all",
                previewMode ? 'p-0 shadow-none' : 'p-4 md:p-8'
              )}>
                {/* Template components */}
                {currentTemplate?.components.map((comp) => (
                  <CanvasComponent
                    key={comp.id}
                    component={comp}
                    onSelect={setSelectedComponentId}
                    onUpdate={updateComponent}
                    onDelete={deleteComponent}
                    onDuplicate={duplicateComponent}
                    isSelected={comp.id === selectedComponentId}
                    depth={0}
                    selectedComponentId={selectedComponentId}
                    onMove={moveComponent}
                  />
                ))}
                
                {/* Added components */}
                {components.map((comp) => (
                  <CanvasComponent
                    key={comp.id}
                    component={comp}
                    onSelect={setSelectedComponentId}
                    onUpdate={updateComponent}
                    onDelete={deleteComponent}
                    onDuplicate={duplicateComponent}
                    isSelected={comp.id === selectedComponentId}
                    depth={0}
                    selectedComponentId={selectedComponentId}
                    onMove={moveComponent}
                  />
                ))}
                
                {!previewMode && !currentTemplate && components.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
                    <LayoutDashboard className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500">Your canvas is empty</h3>
                    <p className="text-gray-400 mt-2 max-w-md">
                      Drag components from the left panel or choose a template to get started
                    </p>
                    <Button className="mt-6 gap-2" onClick={() => setLeftPanelOpen(true)}>
                      <Plus className="h-4 w-4" />
                      Add Components
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Properties */}
          {rightPanelOpen ? (
            <div className="w-80 bg-white border-l flex flex-col hidden md:flex">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-blue-600" />
                  Properties
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setRightPanelOpen(false)}
                >
                  <PanelRightClose className="h-4 w-4" />
                </Button>
              </div>
              
              <Tabs defaultValue="properties" className="flex-1 flex flex-col">
                <TabsList className="grid grid-cols-2 rounded-none">
                  <TabsTrigger value="properties">Properties</TabsTrigger>
                  <TabsTrigger value="settings">Page Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="properties" className="flex-1 overflow-y-auto">
                  {selectedComponent ? (
                    <div className="p-4 space-y-6">
                      <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          {selectedComponent.type === 'container' && <Box className="h-4 w-4" />}
                          {selectedComponent.type === 'text' && <Text className="h-4 w-4" />}
                          {selectedComponent.type === 'button' && <Component className="h-4 w-4" />}
                          {selectedComponent.type === 'image' && <Image className="h-4 w-4" />}
                          {selectedComponent.type === 'grid' && <Grid className="h-4 w-4" />}
                          {selectedComponent.type === 'section' && <Rows className="h-4 w-4" />}
                          {selectedComponent.type === 'divider' && <Minus className="h-4 w-4" />}
                          {selectedComponent.type === 'input' && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                          )}
                          {selectedComponent.type === 'textarea' && <Text className="h-4 w-4" />}
                          {selectedComponent.type === 'select' && <ChevronDown className="h-4 w-4" />}
                          {selectedComponent.type.toUpperCase()} Properties
                        </h3>
                        
                        <div className="space-y-4">
                          {['text', 'button', 'card'].includes(selectedComponent.type) && (
                            <div>
                              <Label>Content</Label>
                              <Textarea
                                value={selectedComponent.content}
                                onChange={(e) => updateComponent(selectedComponent.id, { content: e.target.value })}
                                rows={3}
                              />
                            </div>
                          )}
                          
                          <div>
                            <Label>CSS Classes</Label>
                            <Input
                              value={selectedComponent.props.className || ''}
                              onChange={(e) => updateComponent(selectedComponent.id, { 
                                props: { ...selectedComponent.props, className: e.target.value } 
                              })}
                              placeholder="e.g., p-4 bg-blue-100"
                            />
                          </div>
                          
                          {selectedComponent.type === 'grid' && (
                            <div>
                              <Label>Grid Layout</Label>
                              <Select
                                value={selectedComponent.props.grid || 'grid-cols-2'}
                                onValueChange={(value) => updateComponent(selectedComponent.id, { 
                                  props: { ...selectedComponent.props, grid: value } 
                                })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select grid layout" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="grid-cols-1">1 Column</SelectItem>
                                  <SelectItem value="grid-cols-2">2 Columns</SelectItem>
                                  <SelectItem value="grid-cols-3">3 Columns</SelectItem>
                                  <SelectItem value="grid-cols-4">4 Columns</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          
                          {selectedComponent.type === 'image' && (
                            <div>
                              <Label>Image URL</Label>
                              <Input
                                value={selectedComponent.props.src || ''}
                                onChange={(e) => updateComponent(selectedComponent.id, { 
                                  props: { ...selectedComponent.props, src: e.target.value } 
                              })}
                                placeholder="https://example.com/image.jpg"
                              />
                            </div>
                          )}
                          
                          {['input', 'textarea'].includes(selectedComponent.type) && (
                            <div>
                              <Label>Placeholder</Label>
                              <Input
                                value={selectedComponent.props.placeholder || ''}
                                onChange={(e) => updateComponent(selectedComponent.id, { 
                                  props: { ...selectedComponent.props, placeholder: e.target.value } 
                              })}
                                placeholder="Enter placeholder text"
                              />
                            </div>
                          )}
                          
                          {selectedComponent.type === 'textarea' && (
                            <div>
                              <Label>Rows</Label>
                              <Input
                                type="number"
                                min="1"
                                max="10"
                                value={selectedComponent.props.rows || 3}
                                onChange={(e) => updateComponent(selectedComponent.id, { 
                                  props: { ...selectedComponent.props, rows: parseInt(e.target.value) || 3 } 
                              })}
                              />
                            </div>
                          )}
                          
                          {selectedComponent.type === 'select' && (
                            <div>
                              <Label>Options</Label>
                              <Textarea
                                value={(selectedComponent.props.options || []).join('\n')}
                                onChange={(e) => updateComponent(selectedComponent.id, { 
                                  props: { 
                                    ...selectedComponent.props, 
                                    options: e.target.value.split('\n').filter(opt => opt.trim()) 
                                  } 
                                })}
                                placeholder="Enter each option on a new line"
                                rows={3}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Accordion type="single" collapsible>
                        <AccordionItem value="advanced">
                          <AccordionTrigger>Advanced Settings</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <Label>Background Color</Label>
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-6 h-6 rounded border cursor-pointer"
                                    style={{ backgroundColor: selectedComponent.props.backgroundColor || '#ffffff' }}
                                    onClick={() => document.getElementById(`bg-color-${selectedComponent.id}`)?.click()}
                                  />
                                  <ChromePicker
                                    id={`bg-color-${selectedComponent.id}`}
                                    color={selectedComponent.props.backgroundColor || '#ffffff'}
                                    onChange={(color) => updateComponent(selectedComponent.id, { 
                                      props: { ...selectedComponent.props, backgroundColor: color.hex } 
                                    })}
                                    className="hidden"
                                  />
                                  <Input
                                    className="w-24"
                                    value={selectedComponent.props.backgroundColor || ''}
                                    onChange={(e) => updateComponent(selectedComponent.id, { 
                                      props: { ...selectedComponent.props, backgroundColor: e.target.value } 
                                    })}
                                    placeholder="#ffffff"
                                  />
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <Label>Text Color</Label>
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-6 h-6 rounded border cursor-pointer"
                                    style={{ backgroundColor: selectedComponent.props.color || '#000000' }}
                                    onClick={() => document.getElementById(`text-color-${selectedComponent.id}`)?.click()}
                                  />
                                  <ChromePicker
                                    id={`text-color-${selectedComponent.id}`}
                                    color={selectedComponent.props.color || '#000000'}
                                    onChange={(color) => updateComponent(selectedComponent.id, { 
                                      props: { ...selectedComponent.props, color: color.hex } 
                                    })}
                                    className="hidden"
                                  />
                                  <Input
                                    className="w-24"
                                    value={selectedComponent.props.color || ''}
                                    onChange={(e) => updateComponent(selectedComponent.id, { 
                                      props: { ...selectedComponent.props, color: e.target.value } 
                                    })}
                                    placeholder="#000000"
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <Label>Padding</Label>
                                <div className="grid grid-cols-4 gap-2">
                                  <Input
                                    placeholder="Top"
                                    value={selectedComponent.props.paddingTop || ''}
                                    onChange={(e) => updateComponent(selectedComponent.id, { 
                                      props: { ...selectedComponent.props, paddingTop: e.target.value } 
                                    })}
                                  />
                                  <Input
                                    placeholder="Right"
                                    value={selectedComponent.props.paddingRight || ''}
                                    onChange={(e) => updateComponent(selectedComponent.id, { 
                                      props: { ...selectedComponent.props, paddingRight: e.target.value } 
                                    })}
                                  />
                                  <Input
                                    placeholder="Bottom"
                                    value={selectedComponent.props.paddingBottom || ''}
                                    onChange={(e) => updateComponent(selectedComponent.id, { 
                                      props: { ...selectedComponent.props, paddingBottom: e.target.value } 
                                    })}
                                  />
                                  <Input
                                    placeholder="Left"
                                    value={selectedComponent.props.paddingLeft || ''}
                                    onChange={(e) => updateComponent(selectedComponent.id, { 
                                      props: { ...selectedComponent.props, paddingLeft: e.target.value } 
                                    })}
                                  />
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                      <MousePointer className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="font-medium text-gray-500">No component selected</h3>
                      <p className="text-gray-400 mt-2">
                        Select a component on the canvas to edit its properties
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="settings" className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Page Settings</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <Label>Page Title</Label>
                          <Input
                            value={pageTitle}
                            onChange={(e) => setPageTitle(e.target.value)}
                            placeholder="Enter page title"
                          />
                        </div>
                        
                        <div>
                          <Label>Page Width</Label>
                          <Select defaultValue="6xl">
                            <SelectTrigger>
                              <SelectValue placeholder="Select page width" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full">Full Width</SelectItem>
                              <SelectItem value="7xl">Extra Large (7xl)</SelectItem>
                              <SelectItem value="6xl">Large (6xl)</SelectItem>
                              <SelectItem value="5xl">Medium (5xl)</SelectItem>
                              <SelectItem value="4xl">Small (4xl)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label>Dark Mode</Label>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">SEO Settings</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <Label>Meta Title</Label>
                          <Input
                            placeholder="Enter meta title"
                          />
                        </div>
                        
                        <div>
                          <Label>Meta Description</Label>
                          <Textarea
                            placeholder="Enter meta description"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="border-l hidden md:block">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-none h-full"
                onClick={() => setRightPanelOpen(true)}
              >
                <PanelRightOpen className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default function EditorPage() {
  return (
    <div className="h-screen flex flex-col">
      <UIEditor />
    </div>
  );
}