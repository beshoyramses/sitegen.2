import { ArrowLeft, Save, Download, Eye} from 'lucide-react';

interface ToolbarProps {
  isPreviewMode: boolean;
  setIsPreviewMode: (mode: boolean) => void;
}

export const Toolbar = ({ isPreviewMode, setIsPreviewMode }: ToolbarProps) => (
  <div className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <button className="p-2 rounded-lg hover:bg-gray-800">
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-xl font-bold">Professional Page Editor</h1>
    </div>
    
    <div className="flex gap-3">
      <button 
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
        onClick={() => setIsPreviewMode(!isPreviewMode)}
      >
        <Eye size={18} />
        {isPreviewMode ? 'Exit Preview' : 'Preview'}
      </button>
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
        <Save size={18} />
        Save Page
      </button>
      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg">
        <Download size={18} />
        Publish
      </button>
    </div>
  </div>
);