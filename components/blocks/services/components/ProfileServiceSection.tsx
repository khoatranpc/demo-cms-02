import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { uuidv4 } from "@/lib/utils";
import { Template } from "tinacms";

export interface IProfileServiceSection {
  title?: string;
  subTitle?: string;
  profileStats?: {
    value?: string;
    label?: string;
    id?: string;
  }[];
  backgroundImage?: string;
  button?: {
    label?: string;
    link?: string;
  };
}

interface Props {
  data?: IProfileServiceSection;
}
const ProfileServiceSection = ({ data }: Props) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative w-screen -translate-x-1/2 left-1/2 text-white py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${data?.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7))",
        }}
      />

      {/* Content */}

      <div className="container mx-auto px-4 text-center relative z-10 space-y-6">
        {/* Tiêu đề chính */}
        <motion.div
          className="space-y-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            dangerouslySetInnerHTML={{ __html: data?.title ?? "" }}
          />

          <motion.p
            className="text-sm md:text-md lg:text-lg font-bold leading-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            dangerouslySetInnerHTML={{ __html: data?.subTitle ?? "" }}
          />

          {/* Decorative line */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-vina-primary to-vina-secondary mx-auto rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>
        {data?.profileStats?.length && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {data?.profileStats?.map((stat, index) => (
              <motion.div
                key={stat.id ?? uuidv4()}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 md:p-6 rounded-lg"
                variants={itemVariants}
              >
                <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base text-gray-200">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
        {/* CTA */}
        {data?.button?.label && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={data?.button?.link ?? "#"}
              className="bg-vina-primary flex w-fit mx-auto text-white px-8 py-3 rounded-full shadow-lg hover:bg-vina-secondary transition duration-300"
            >
              {data?.button?.label} <ArrowRightIcon className="ml-2" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
export const profileServiceSection: Template = {
  label: "Profile Service Section",
  name: "profileServiceSection",
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
    },
    {
      type: "object",
      name: "profileStats",
      label: "Danh sách thống kê",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label, id: item?.id };
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
          name: "value",
          label: "Giá trị",
        },
        {
          type: "string",
          name: "label",
          label: "Nhãn",
        },
      ],
    },
    {
      type: "image",
      name: "backgroundImage",
      label: "Hình nền",
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
};
export default ProfileServiceSection;
