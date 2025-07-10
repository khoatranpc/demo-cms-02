import React from "react";
import { Template } from "tinacms";

export interface ITitle {
  title?: string;
}
interface Props {
  data?: ITitle;
}
const Title = ({ data }: Props) => {
  return (
    <div className="container mx-auto space-y-6 px-4">
      <p className="font-bold text-3xl">{data?.title}</p>
      <div className="h-[1px] border-b border-vina-primary" />
    </div>
  );
};
export const titleBlockSection: Template = {
  name: "titleSection",
  label: "Title section",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
  ],
};
export default Title;
