import React from "react";
import { Template } from "tinacms";

const Line = () => {
  return (
    <div className="container px-4">
      <div className="border-b border-vina-primary"></div>
    </div>
  );
};
export const lineBlockSection: Template = {
  name: "lineBlockSection",
  label: "Line",
  fields: [
    {
      name: "line",
      type: "string",
      ui: {
        component(props) {
          return null;
        },
      },
    },
  ],
};
export default Line;
