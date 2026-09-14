import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface User {
  src: string;
  fallback: string;
}

interface Action {
  Icon: React.ElementType;
  bgColor: string;
}

interface WorkflowBuilderCardProps {
  imageUrl: string;
  status: "Active" | "Inactive";
  lastUpdated: string;
  title: string;
  description: string;
  tags: string[];
  users?: User[];
  actions?: Action[];
  className?: string;
  href?: string;
  ctaLabel?: string;
  asideLabel?: string;
}

export const WorkflowBuilderCard = ({
  imageUrl,
  status,
  lastUpdated,
  title,
  description,
  tags,
  className,
  href,
  ctaLabel = "Смотреть кейс полностью",
  asideLabel,
}: WorkflowBuilderCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const detailVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: "0.75rem",
      transition: { duration: 0.3, ease: "easeInOut" as const },
    },
  };

  const MotionRoot = href ? motion.a : motion.div;

  return (
    <MotionRoot
      href={href}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className={cn("block w-full max-w-sm cursor-pointer no-underline", className)}
    >
      <Card className="rounded-[32px] border-0 bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_14px_36px_rgba(0,0,0,0.12)]">
        <div className="overflow-hidden rounded-[22px]">
          <img
            src={imageUrl}
            alt={title}
            className="aspect-[16/11] h-auto w-full object-cover"
          />
        </div>

        <div className="px-0.5 pt-4">
          <h3 className="line-clamp-2 text-[13px] font-bold uppercase leading-tight tracking-tight text-black">
            {title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-neutral-800">
            {description}
          </p>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="details"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={detailVariants}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="rounded-none border-0 px-0 text-xs font-bold uppercase tracking-wide text-black"
                    >
                      {tag}
                    </Badge>
                  ))}
                  <span className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                    {lastUpdated}
                    {status ? ` · ${status}` : ""}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 flex items-start justify-between gap-3 border-t border-neutral-300 pt-3">
            <span className="text-[10px] font-bold uppercase leading-tight tracking-wide text-black">
              {ctaLabel}
            </span>
            <span className="text-right text-[10px] font-bold uppercase leading-tight tracking-wide text-black">
              {asideLabel ?? lastUpdated}
            </span>
          </div>
        </div>
      </Card>
    </MotionRoot>
  );
};
