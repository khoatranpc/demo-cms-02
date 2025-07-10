import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { uuidv4 } from "@/lib/utils";
import { Template } from "tinacms";
import LucideIcon from "@/components/LucideIcon";
import Link from "next/link";

export interface IServiceItem {
  title?: string;
  description?: string;
  image?: string;
  button?: {
    label?: string;
    link?: string;
  };
  id?: string;
}
const ServiceItem = ({ title, description, image, button }: IServiceItem) => {
  return (
    <motion.div
      className="relative h-[400px] overflow-hidden group group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div
        className="absolute bottom-0 w-full h-[30%] transition-all ease-out duration-500 group-hover:h-full 
        flex flex-col justify-between p-6 z-10 bg-white border border-vina-primary"
      >
        <h4 className="font-bold text-lg text-vina-primary group-hover:mt-6">
          {title}
        </h4>

        <div
          className="opacity-0 transform translate-y-4 transition-all duration-300 delay-100 ease-out
          group-hover:opacity-100 group-hover:translate-y-0"
        >
          <p className="text-vina-primary text-base mb-4 line-clamp-3">
            {description}
          </p>
          <a
            href={button?.link}
            className="inline-flex items-center bg-vina-primary text-white 
            font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {button?.label}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export interface IServicesComponent {
  title?: string;
  mainDescription?: string;
  services?: IServiceItem[];
  buttons?: {
    label?: string;
    link?: string;
    icon?: string;
    id?: string;
  }[];
}
interface Props {
  data?: IServicesComponent;
}
const ServicesComponent = ({ data }: Props) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-4 px-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl">{data?.title}</h3>
        <i className="fa-regular fa-book"></i>
        <motion.div
          className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {data?.buttons?.map((item, index) => (
            <Link
              href={item.link ?? "#"}
              key={item.id ?? uuidv4()}
              className="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white bg-vina-primary shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:bg-vina-primary-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-vina-primary focus:ring-offset-2"
            >
              {item?.icon && <LucideIcon icon={item?.icon} />}
              <span>{item?.label}</span>
            </Link>
          ))}
        </motion.div>
      </div>
      <p className="text-gray-700 leading-relaxed">{data?.mainDescription}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.services?.map((service) => (
          <ServiceItem
            key={service.id ?? uuidv4()}
            title={service.title}
            description={service.description}
            image={service.image}
            button={service.button}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const serviceComponentSection: Template = {
  label: "Service Component Section",
  name: "serviceComponentSection",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Tiêu đề",
    },
    {
      type: "string",
      name: "mainDescription",
      label: "Mô tả chính",
      ui: {
        component: "textarea",
      },
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
          label: "Tiêu đề dịch vụ",
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
          type: "image",
          name: "image",
          label: "Hình ảnh dịch vụ",
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
    {
      type: "object",
      name: "buttons",
      label: "Danh sách nút liên kết",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
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
          name: "label",
          label: "Nhãn nút",
        },
        {
          type: "string",
          name: "link",
          label: "Đường dẫn",
        },
        {
          type: "string",
          name: "icon",
          label: "Icon",
        },
      ],
    },
  ],
};
export default ServicesComponent;
