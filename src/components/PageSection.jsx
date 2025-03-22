
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const PageSection = ({ 
  children, 
  title, 
  description, 
  className,
  delay = 0
}) => {
  return (
    <motion.section 
      className={cn("mb-8 rounded-lg border bg-card p-6 shadow-sm", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + delay }}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className="text-xl font-semibold mb-1">{title}</h2>}
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
      )}
      {children}
    </motion.section>
  );
};

export default PageSection;
