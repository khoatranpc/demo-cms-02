import LucideIcon from "@/components/LucideIcon";
import { uuidv4 } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

export interface IListServices {
  title: string;
  id: string;
  href: string;
  icon: string;
  items: Partial<IListServices>[];
  visible: boolean;
}
export type TListServices = Partial<IListServices>;
interface Props {
  data?: TListServices;
}
const SectionListServices = (props: Props) => {
  return (
    <div className="space-y-2">
      <Link
        href={props.data?.href ?? "#"}
        className="flex items-center rounded-md gap-3 p-4 bg-vina-primary text-white cursor-pointer hover:bg-vina-accent"
      >
        <LucideIcon icon={props.data?.icon as string} />
        <h3 className="text-xl font-semibold">{props.data?.title}</h3>
      </Link>
      {props.data?.items?.length && (
        <div className="rounded-md shadow-lg p-2 space-y-2">
          {props.data?.items?.map((item) => (
            <Link
              href={item.href ?? "#"}
              key={item.id ?? uuidv4()}
              className="cursor-pointer flex items-start gap-3 p-3 rounded-xs bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <LucideIcon icon={item?.icon as string} />
              <span className="text-gray-700 font-medium">{item.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
interface ContentDetailServices {
  titleService: string;
  content: string;
  hasSectionServices: boolean;
  listServices: TListServices[];
}
export type TContetnDetailService = Partial<ContentDetailServices>;

interface PropsContentDetailService {
  data?: TContetnDetailService;
}
const ContentDetailService = (props: PropsContentDetailService) => {
  console.log(props.data?.listServices);
  return (
    <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div
        className={`prose max-w-none ${
          props.data?.hasSectionServices ? "lg:col-span-2" : "lg:col-span-3"
        } space-y-6 text-gray-800`}
      >
        {props.data?.titleService && (
          <h2 className="text-3xl font-bold text-vina-primary">
            {props.data?.titleService}
          </h2>
        )}
        {props.data?.content && (
          <TinaMarkdown
            content={props.data?.content as unknown as TinaMarkdownContent}
          />
        )}
      </div>
      {props.data?.hasSectionServices && (
        <div className="flex flex-col gap-2">
          {props.data?.listServices?.map((item) => {
            return (
              <SectionListServices data={item} key={item.id ?? uuidv4()} />
            );
          })}
        </div>
      )}
    </section>
  );
};
export const contentDetailServiceSection: Template = {
  name: "contentDetailServiceSection",
  label: "Chi tiết bài viết dịch vụ",
  fields: [
    {
      name: "titleService",
      label: "Tiêu đề",
      type: "string",
    },
    {
      name: "content",
      label: "Nội dung",
      type: "rich-text",
    },
    {
      name: "hasSectionServices",
      label: "Hiển thị danh sách dịch vụ",
      type: "boolean",
    },
    {
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
        itemProps(item) {
          return {
            label: item?.title,
            id: item?.id,
          };
        },
      },
      fields: [
        {
          name: "id",
          label: "id",
          type: "string",
          ui: {
            component: "hidden",
          },
        },
        {
          name: "title",
          label: "Tiêu đề",
          type: "string",
        },
        {
          name: "href",
          label: "Đường dẫn",
          type: "string",
        },
        {
          name: "icon",
          label: "Icon",
          type: "string",
        },
        {
          name: "items",
          label: "Danh sách con",
          type: "object",
          list: true,
          ui: {
            defaultItem() {
              if (typeof window === "undefined") return {};
              return {
                id: uuidv4(),
              };
            },
            itemProps(item) {
              return {
                label: item?.title,
                id: item?.id,
              };
            },
          },
          fields: [
            {
              name: "id",
              label: "id",
              type: "string",
              ui: {
                component: "hidden",
              },
            },
            {
              name: "title",
              label: "Tiêu đề",
              type: "string",
            },
            {
              name: "href",
              label: "Đường dẫn",
              type: "string",
            },
            {
              name: "icon",
              label: "Icon",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
export default ContentDetailService;
