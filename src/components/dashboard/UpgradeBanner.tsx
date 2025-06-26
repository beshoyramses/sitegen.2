import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function UpgradeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="bg-gradient-to-r from-primary/5 to-secondary/5 border rounded-2xl p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Need more power?</h3>
          <p className="text-muted-foreground max-w-xl">
            Upgrade to Sitegen Pro for unlimited websites, custom domains, and premium templates.
          </p>
        </div>
        <Button variant="secondary" className="whitespace-nowrap">
          Upgrade to Pro
        </Button>
      </div>
    </motion.div>
  );
}