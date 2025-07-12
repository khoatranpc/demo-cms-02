"use client";
import React from "react";
import LucideIcon from "@/components/LucideIcon";
import { uuidv4 } from "@/lib/utils";
import { Template } from "tinacms";

export interface IService {
  id: string;
  name: string;
  description: string;
  icon: string;
}
export type TServices = {
  listServices?: Partial<IService>[];
};
interface Props {
  data?: TServices;
}
const ListServices = (props: Props) => {
  return (
    <div className="container mx-auto p-4 !mb-0 parentMargin0">
      <div className="flex items-center gap-1 flex-wrap">
        {props.data?.listServices?.map((item) => (
          <div
            key={item.id ?? uuidv4()}
            className="bg-vina-primary hover:bg-vina-secondary w-fit rounded-xs shadow-lg p-2"
          >
            <h3 className="cursor-pointer text-white w-fit flex items-center gap-2">
              <LucideIcon icon={item.icon as string} />
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
export const listServicesSectionFields: any = {
  name: "listServices",
  label: "Danh sách dịch vụ",
  type: "object",
  list: true,
  ui: {
    defaultItem() {
      if (typeof window === "undefined") return {};
      return {
        id: uuidv4(),
      };
    },
    itemProps(item: any) {
      return {
        label: item?.name,
        id: item?.id,
      };
    },
  },
  fields: [
    {
      name: "id",
      type: "string",
      ui: {
        component: "hidden",
      },
    },
    {
      name: "name",
      label: "Tên dịch vụ",
      type: "string",
    },
    {
      name: "description",
      label: "Mô tả",
      type: "string",
    },
    {
      name: "icon",
      label: "Icon",
      type: "string",
    },
  ],
};
export const listServicesSection: Template = {
  name: "listServicesSection",
  label: "Danh sách dịch vụ",
  fields: [listServicesSectionFields],
};
export default ListServices;
