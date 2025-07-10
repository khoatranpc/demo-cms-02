import React from "react";
import { motion } from "framer-motion";
import { uuidv4 } from "@/lib/utils";
import { Template } from "tinacms";

export interface IImportExportItem {
  imageSrc?: string;
  certificateSrc?: string;
  description?: string;
  productName?: string;
  id?: string;
}
const ImportExportItem = ({
  imageSrc,
  certificateSrc,
  description,
  productName,
}: IImportExportItem) => {
  return (
    <motion.div
      className="cursor-pointer relative bg-white shadow-md overflow-hidden group transition-shadow duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hình ảnh sản phẩm */}
      <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden">
        <img
          src={imageSrc}
          alt={productName || "Product image"}
          className="w-full h-full border-b border-vina-primary object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {certificateSrc && (
        <div className="absolute top-0 left-0 p-2 z-10">
          <img
            src={certificateSrc}
            alt="Certificate"
            className="w-12 h-12 md:w-16 md:h-16 border-2 border-white shadow-md"
          />
        </div>
      )}

      <div className="p-4 md:p-6">
        <h4 className="font-bold text-lg md:text-xl text-vina-primary mb-2 leading-tight">
          {productName}
        </h4>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export interface IImportExportComponent {
  title?: string;
  subTitle?: string;
  items?: IImportExportItem[];
}
interface Props {
  data?: IImportExportComponent;
}
const ImportExportComponent = ({ data }: Props) => {
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
    <div className="space-y-3 px-4">
      <motion.h3
        className="font-bold text-xl text-left"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        {data?.title}
      </motion.h3>
      <motion.p
        className="text-gray-600 text-left"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {data?.subTitle}
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {data?.items?.map((item) => (
          <ImportExportItem
            key={item?.id ?? uuidv4()}
            imageSrc={item?.imageSrc}
            certificateSrc={item?.certificateSrc}
            description={item?.description}
            productName={item?.productName}
          />
        ))}
      </motion.div>
    </div>
  );
};
export const importExportComponentSection: Template = {
  label: "Import Export Products Section",
  name: "importExportComponentSection",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Tiêu đề",
    },
    {
      type: "string",
      name: "subTitle",
      label: "Tiêu đề phụ",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      name: "items",
      label: "Danh sách sản phẩm",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.productName, id: item?.id };
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
          name: "productName",
          label: "Tên sản phẩm",
        },
        {
          type: "string",
          name: "description",
          label: "Mô tả sản phẩm",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "image",
          name: "imageSrc",
          label: "Hình ảnh sản phẩm",
        },
        {
          type: "image",
          name: "certificateSrc",
          label: "Hình ảnh chứng nhận",
        },
      ],
    },
  ],
};
export default ImportExportComponent;
