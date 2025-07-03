import { Trash2, X } from 'lucide-react';

interface PropertiesPanelProps {
  selectedComponent: any;
  deleteComponent: (id: string) => void;
  components: any[];
  setComponents: (components: any[]) => void;
  handlePropertyChange: (property: string, value: any) => void;
}

export const PropertiesPanel = ({
  selectedComponent,
  deleteComponent,
  components,
  setComponents,
  handlePropertyChange
}: PropertiesPanelProps) => {
  if (!selectedComponent) {
    return (
      <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
        <div className="p-4 border-b border-gray-800">
          <h2 className="font-semibold text-lg">Page Settings</h2>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Page Title</label>
            <input
              type="text"
              defaultValue="My Awesome Page"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Page Description</label>
            <textarea
              defaultValue="A page created with our amazing editor"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Page URL</label>
            <div className="flex">
              <span className="bg-gray-800 border border-r-0 border-gray-700 rounded-l-lg px-4 py-2 text-gray-400">https://</span>
              <input
                type="text"
                defaultValue="my-awesome-page"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-r-lg px-4 py-2 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
      <div className="p-4 border-b border-gray-800">
        <h2 className="font-semibold text-lg">Component Settings</h2>
      </div>
      
      <div className="p-4">
        {selectedComponent.type === 'hero' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Title</label>
              <input
                type="text"
                value={selectedComponent.title}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Subtitle</label>
              <textarea
                value={selectedComponent.subtitle}
                onChange={(e) => handlePropertyChange('subtitle', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Button Text</label>
              <input
                type="text"
                value={selectedComponent.buttonText}
                onChange={(e) => handlePropertyChange('buttonText', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
            </div>
            <div className="pt-4 border-t border-gray-800">
              <button 
                className="flex items-center gap-2 text-red-500 hover:text-red-400"
                onClick={() => deleteComponent(selectedComponent.id)}
              >
                <Trash2 size={16} />
                <span>Delete Component</span>
              </button>
            </div>
          </div>
        )}
        
        {selectedComponent.type === 'text' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Content</label>
              <textarea
                value={selectedComponent.content}
                onChange={(e) => handlePropertyChange('content', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                rows={6}
              />
            </div>
            <div className="pt-4 border-t border-gray-800">
              <button 
                className="flex items-center gap-2 text-red-500 hover:text-red-400"
                onClick={() => deleteComponent(selectedComponent.id)}
              >
                <Trash2 size={16} />
                <span>Delete Component</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Add other component type editors here */}
      </div>
    </div>
  );
};