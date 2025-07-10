import React from "react";
import { Template } from "tinacms";

export type IDescribeSection = {
  description?: string;
};
interface Props {
  data?: IDescribeSection;
}
const DescribeSection = ({ data }: Props) => {
  return <div className="px-4">{data?.description ?? ""}</div>;
};

export const descriptionBlockSection: Template = {
  name: "descriptionBlockSection",
  label: "Mô tả",
  fields: [
    {
      type: "string",
      name: "description",
      label: "Mô tả",
      ui: {
        component: "textarea",
      },
    },
  ],
};

export default DescribeSection;
