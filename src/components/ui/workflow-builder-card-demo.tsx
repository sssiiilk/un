import { Code, Share2, Zap } from "lucide-react";
import { WorkflowBuilderCard } from "@/components/ui/workflow-builder-card";

export default function WorkflowBuilderCardDemo() {
  const cardData = {
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    status: "Active" as const,
    lastUpdated: "5 days ago",
    title: "Personal Email Assistant",
    description:
      "Your AI helper for reading, organizing, and responding to emails.",
    tags: ["Personal", "Marketing"],
    users: [
      {
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        fallback: "U1",
      },
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        fallback: "U2",
      },
      {
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
        fallback: "U3",
      },
      {
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        fallback: "+3",
      },
    ],
    actions: [
      { Icon: Zap, bgColor: "bg-blue-500" },
      { Icon: Code, bgColor: "bg-gray-700" },
      { Icon: Share2, bgColor: "bg-red-500" },
    ],
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4">
      <WorkflowBuilderCard {...cardData} />
    </div>
  );
}
