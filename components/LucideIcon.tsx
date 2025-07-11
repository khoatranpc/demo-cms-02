import React from "react";
import * as Icons from "lucide-react";

interface FeatureItemProps {
  icon: string;
}

const LucideIcon = ({ icon }: FeatureItemProps) => {
  if (icon && (Icons as any)[icon]) {
    const LucideIconReact = (Icons as any)[icon];

    return <LucideIconReact />;
  }
  return <Icons.AppWindowMac />;
};

export default LucideIcon;
