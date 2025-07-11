import Link from "next/link";
import React from "react";
import { Template } from "tinacms";

interface ISectionBannerDetailService {
  backgroundImage: string;
  bannerDetailServiceTitle: string;
  subTitle: string;
  button: {
    label: string;
    href: string;
  };
}
export type TSectionBannerDetailService = Partial<ISectionBannerDetailService>;
interface Props {
  data?: TSectionBannerDetailService;
}
const SectionBanner = (props: Props) => {
  return (
    <section className="relative h-[400px] w-screen -translate-x-1/2 left-1/2 py-36 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={props.data?.backgroundImage ?? "/uploads/services/logistic.png"}
          alt={props.data?.bannerDetailServiceTitle ?? "Vinhapac Service"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            {props.data?.bannerDetailServiceTitle}
          </h2>
          <p
            className="text-lg sm:text-xl"
            dangerouslySetInnerHTML={{ __html: props.data?.subTitle ?? "" }}
          ></p>
          {props.data?.button?.label && (
            <Link
              href={props.data?.button?.href ?? "#"}
              className="inline-block bg-white text-vina-primary font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition-all"
            >
              {props.data?.button?.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
export const sectionBannerDetailService: Template = {
  name: "sectionBannerDetailService",
  label: "Banner detail Service",
  fields: [
    {
      type: "string",
      name: "bannerDetailServiceTitle",
      label: "Tiêu đề",
    },
    {
      type: "string",
      name: "subTitle",
      label: "Sub Tiêu đề",
      description: "Mô tả ngắn gọn",
    },
    {
      type: "image",
      name: "backgroundImage",
      label: "Ảnh nền",
    },
    {
      type: "object",
      name: "button",
      label: "Button",
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
        },
        {
          type: "string",
          label: "Href",
          name: "href",
        },
      ],
    },
  ],
};
export default SectionBanner;
