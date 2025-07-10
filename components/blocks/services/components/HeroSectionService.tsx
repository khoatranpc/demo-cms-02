import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Template } from "tinacms";
import { uuidv4 } from "@/lib/utils";

interface IHeroSectionService {
  title: string;
  description: string;
  image: string;
  services: {
    title?: string;
    description?: string;
    id?: string;
    button?: {
      label?: string;
      link?: string;
    };
  }[];
}
export type THerosectionService = Partial<IHeroSectionService>;
interface Props {
  data?: THerosectionService;
}
const HeroSectionService = ({ data }: Props) => {
  return (
    <section className="relative w-screen -translate-x-1/2 left-1/2 py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={data?.image ?? ""}
          alt="Export Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-12 md:mb-20 leading-tight" // Tăng kích thước, độ đậm, và khoảng cách dưới
        >
          {data?.title ?? ""}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-center md:text-left p-6 md:p-8 rounded-lg bg-white/10 backdrop-blur-sm shadow-xl h-full" // Thêm nền mờ và bóng đổ để nổi bật hơn
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-primary-light">
              {data?.services?.[0]?.title}
            </h3>
            <p
              className="text-base md:text-lg mb-6 text-gray-100"
              dangerouslySetInnerHTML={{
                __html: data?.services?.[0]?.description ?? "",
              }}
            ></p>
            <Link
              href={data?.services?.[0]?.button?.link ?? "#"}
              className="flex items-center w-fit bg-vina-primary hover:bg-vina-primary-90 cursor-pointer text-white px-8 py-3 rounded-full font-medium group transition-all duration-300 transform hover:scale-105" // Thêm hiệu ứng hover
            >
              {data?.services?.[0]?.button?.label}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-center md:text-left p-6 md:p-8 rounded-lg bg-white/10 backdrop-blur-sm shadow-xl h-full" // Thêm nền mờ và bóng đổ
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-secondary-light">
              {data?.services?.[1]?.title}
            </h3>
            <p
              className="text-base md:text-lg mb-6 text-gray-100"
              dangerouslySetInnerHTML={{
                __html: data?.services?.[1]?.description ?? "",
              }}
            ></p>
            <Link
              href={data?.services?.[1]?.button?.link ?? "#"}
              className="flex items-center w-fit bg-secondary hover:bg-secondary/90 cursor-pointer text-vina-primary px-8 py-3 rounded-full font-medium group transition-all duration-300 transform hover:scale-105" // Thêm hiệu ứng hover
            >
              {data?.services?.[1]?.button?.label}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export const heroSectionServiceBlock: Template = {
  label: "Hero Section Service",
  name: "heroSectionServiceBlock",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Tiêu đề",
    },
    {
      type: "string",
      name: "description",
      label: "Mô tả",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "image",
      name: "image",
      label: "Hình nền",
    },
    {
      type: "object",
      name: "services",
      label: "Danh sách dịch vụ",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title, id: item?.id };
        },
        defaultItem() {
          if (typeof window === "undefined") return {};
          return {
            id: uuidv4(),
          };
        },
      },
      fields: [
        {
          type: "string",
          name: "id",
          ui: {
            component(props) {
              return null;
            },
          },
        },
        {
          type: "string",
          name: "title",
          label: "Tên dịch vụ",
        },
        {
          type: "string",
          name: "description",
          label: "Mô tả dịch vụ",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "object",
          name: "button",
          label: "Nút liên kết",
          fields: [
            {
              type: "string",
              name: "label",
              label: "Nhãn nút",
            },
            {
              type: "string",
              name: "link",
              label: "Đường dẫn",
            },
          ],
        },
      ],
    },
  ],
};
export default HeroSectionService;
