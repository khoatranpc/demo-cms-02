import LucideIcon from "@/components/LucideIcon";
import { uuidv4 } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { Disclosure } from "@headlessui/react";

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
export const SectionListServices = (props: Props) => {
  const hasItems = props.data?.items?.length && props.data.items.length > 0;

  if (!hasItems) {
    // Nếu không có items, hiển thị như link đơn giản
    return (
      <div className="space-y-2">
        <Link
          href={props.data?.href ?? "#"}
          className="flex items-center rounded-md gap-2 sm:gap-3 p-2 sm:p-3 bg-vina-primary text-white cursor-pointer hover:bg-vina-accent transition-all duration-200"
        >
          <LucideIcon icon={props.data?.icon as string} />
          <h3 className="text-xs sm:text-sm md:text-base font-semibold leading-tight">
            {props.data?.title}
          </h3>
        </Link>
      </div>
    );
  }

  // Nếu có items, sử dụng Disclosure
  return (
    <div className="space-y-2">
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full flex items-center justify-between rounded-md gap-2 sm:gap-3 p-2 sm:p-3 bg-vina-primary text-white cursor-pointer hover:bg-vina-accent transition-all duration-200 focus:outline-none">
              <div className="flex items-center gap-2 sm:gap-3">
                <LucideIcon icon={props.data?.icon as string} />
                <h3 className="text-xs sm:text-sm md:text-base font-semibold leading-tight text-left">
                  {props.data?.title}
                </h3>
              </div>
              <ChevronDown
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 flex-shrink-0 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </Disclosure.Button>

            <Disclosure.Panel className="transition-all duration-200 ease-in-out">
              <div className="rounded-md shadow-lg p-2 sm:p-3 space-y-1 sm:space-y-2 bg-white border border-gray-100">
                {props.data?.items?.map((item) => (
                  <Link
                    href={item.href ?? "#"}
                    key={item.id ?? uuidv4()}
                    className="cursor-pointer flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-md bg-gray-50 hover:bg-gray-100 hover:shadow-sm transition-all duration-200 group"
                  >
                    <LucideIcon icon={item?.icon as string} />
                    <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium leading-tight group-hover:text-gray-900 transition-colors duration-200">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export const sectionListServicesFields: any = {
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
        itemProps(item: any) {
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
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Main Content */}
        <div
          className={`order-1 lg:order-1 ${
            props.data?.hasSectionServices ? "lg:col-span-3" : "lg:col-span-4"
          }`}
        >
          <article className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none space-y-4 sm:space-y-6 text-gray-800">
            {props.data?.titleService && (
              <header className="mb-6 sm:mb-8 lg:mb-10">
                <h1 className="text-xl font-bold text-vina-primary leading-tight">
                  {props.data?.titleService}
                </h1>
              </header>
            )}
            {props.data?.content && (
              <div className="prose max-w-none">
                <TinaMarkdown
                  content={
                    props.data?.content as unknown as TinaMarkdownContent
                  }
                />
              </div>
            )}
          </article>
        </div>

        {/* Sidebar */}
        {props.data?.hasSectionServices && (
          <div className="order-2 lg:order-2 lg:col-span-1">
            {/* Mobile: Collapsible Services */}
            <div className="lg:hidden mb-6">
              <div className="">
                <div className="flex flex-col gap-3">
                  {props.data?.listServices?.map((item) => {
                    return (
                      <SectionListServices
                        data={item}
                        key={`mobile-${item.id ?? uuidv4()}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:sticky lg:top-24">
              <div className="rounded-lg overflow-hidden">
                <div className="flex flex-col gap-4">
                  {props.data?.listServices?.map((item) => {
                    return (
                      <SectionListServices
                        data={item}
                        key={`desktop-${item.id ?? uuidv4()}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
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
      ...sectionListServicesFields,
    },
  ],
};
export default ContentDetailService;
