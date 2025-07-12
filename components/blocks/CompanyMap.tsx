import React from "react";
import { Template } from "tinacms";

export interface ICompanyMap {
  googleMapSrc?: string;
}
interface CompanyMapProps {
  data: {
    googleMapSrc?: string;
    class?: string;
  };
}

const CompanyMap: React.FC<CompanyMapProps> = ({ data }) => {
  const { googleMapSrc, class: className } = data;
  return (
    <section
      className={`relative w-screen left-1/2 -translate-x-1/2 ${
        className ?? ""
      }`}
      dangerouslySetInnerHTML={{ __html: googleMapSrc || "" }}
    ></section>
  );
};
export const companyMapSection: Template = {
  name: "companyMapSection",
  label: "Bản đồ/Map",
  fields: [
    {
      type: "string",
      name: "googleMapSrc",
      label: "Embed link",
      description: "Link embed Google Map/Đường dẫn nhúng từ Google map",
    },
    {
      type: "string",
      name: "class",
      label: "Styling class with tailwind for section (not for map)",
      description: "Class styling",
    },
  ],
};
export default CompanyMap;
