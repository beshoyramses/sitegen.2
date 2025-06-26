    "use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  MagicWandIcon, 
  CodeIcon,
  LightningBoltIcon,
  CheckCircledIcon
} from "@radix-ui/react-icons";

const AIPreview = () => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  // Simulate generation progress
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isGenerating) {
      timer = setTimeout(() => {
        if (progress < 100) {
          setProgress(prev => Math.min(prev + 10, 100));
          
          // Move to next step at certain progress points
          if (progress >= 25 && step === 0) setStep(1);
          if (progress >= 50 && step === 1) setStep(2);
          if (progress >= 75 && step === 2) setStep(3);
        } else {
          setIsGenerating(false);
          setTimeout(() => setShowPreview(true), 500);
        }
      }, 200);
    }
    
    return () => clearTimeout(timer);
  }, [progress, isGenerating, step]);

  const resetPreview = () => {
    setProgress(0);
    setStep(0);
    setIsGenerating(true);
    setShowPreview(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-background border rounded-2xl shadow-xl overflow-hidden">
        {/* Browser Header */}
        <div className="flex items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-sm px-4 py-1.5 rounded-full">
            https://your-site.sitegen.com
          </div>
        </div>
        
        {/* Preview Content */}
        <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-8">
          <div className="bg-white dark:bg-gray-800 border rounded-xl w-full h-full shadow-lg overflow-hidden relative">
            <AnimatePresence>
              {isGenerating ? (
                <motion.div 
                  className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mb-8">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <MagicWandIcon className="h-16 w-16 text-primary mx-auto" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">Generating Your Site</h3>
                  
                  <div className="w-full max-w-md mx-auto mb-6">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{progress}% complete</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 w-full max-w-md">
                    {[1, 2, 3, 4].map((item) => (
                      <motion.div 
                        key={item}
                        className={`p-3 rounded-lg flex flex-col items-center ${
                          step >= item ? 'bg-primary/10' : 'bg-gray-100 dark:bg-gray-700'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: item * 0.1 }}
                      >
                        <div className="mb-2">
                          {item === 1 && <MagicWandIcon className={`h-5 w-5 ${step >= 1 ? 'text-primary' : 'text-gray-400'}`} />}
                          {item === 2 && <CodeIcon className={`h-5 w-5 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`} />}
                          {item === 3 && <LightningBoltIcon className={`h-5 w-5 ${step >= 3 ? 'text-primary' : 'text-gray-400'}`} />}
                          {item === 4 && <CheckCircledIcon className={`h-5 w-5 ${step >= 4 ? 'text-primary' : 'text-gray-400'}`} />}
                        </div>
                        <span className="text-xs font-medium">
                          {item === 1 && 'Analyzing'}
                          {item === 2 && 'Building'}
                          {item === 3 && 'Optimizing'}
                          {item === 4 && 'Finalizing'}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="w-full h-full flex flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Preview Navigation */}
                  <div className="flex items-center px-6 py-4 border-b">
                    <div className="font-bold text-lg">Your AI-Generated Site</div>
                    <div className="flex ml-auto space-x-2">
                      <button className="px-3 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Home
                      </button>
                      <button className="px-3 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        About
                      </button>
                      <button className="px-3 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Services
                      </button>
                      <button className="px-3 py-1 text-sm rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                  
                  {/* Preview Hero Section */}
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
                    <motion.h1 
                      className="text-4xl font-bold mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Welcome to Your New Website
                    </motion.h1>
                    
                    <motion.p 
                      className="text-xl text-muted-foreground max-w-2xl mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Professionally designed and built with AI in seconds
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <button className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                        Get Started
                      </button>
                    </motion.div>
                  </div>
                  
                  {/* Preview Footer */}
                  <div className="px-6 py-4 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Your Brand. All rights reserved.
                  </div>
                  
                  {/* Regenerate Button */}
                  <div className="absolute bottom-4 right-4">
                    <button 
                      onClick={resetPreview}
                      className="flex items-center px-4 py-2 bg-background border rounded-lg shadow-sm hover:bg-primary/10 transition-colors group"
                    >
                      <MagicWandIcon className="h-4 w-4 mr-2 text-primary group-hover:rotate-12 transition-transform" />
                      <span>Regenerate</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPreview;