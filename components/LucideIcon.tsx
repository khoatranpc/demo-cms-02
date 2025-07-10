import React from "react";
import * as Icons from "lucide-react";

interface FeatureItemProps {
  icon: string;
}

const LucideIcon = ({ icon }: FeatureItemProps) => {
  const LucideIcon = (Icons as any)[icon];

  return <LucideIcon />;
};

export default LucideIcon;
