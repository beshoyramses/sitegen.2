import { Template } from '@/types';

interface TemplatePaletteProps {
  templates: Template[];
  applyTemplate: (template: Template) => void;
}

export const TemplatePalette = ({ 
  templates, 
  applyTemplate 
}: TemplatePaletteProps) => (
  <div className="space-y-4">
    {templates.map(template => (
      <div 
        key={template.id}
        className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 cursor-pointer border border-gray-700"
        onClick={() => applyTemplate(template)}
      >
        <h3 className="font-semibold">{template.name}</h3>
        <p className="text-gray-400 text-sm mt-1">{template.description}</p>
      </div>
    ))}
  </div>
);