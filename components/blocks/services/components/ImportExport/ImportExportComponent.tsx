import React from "react";
import { motion } from "framer-motion";

// Component cho từng sản phẩm/item trong danh sách
const ImportExportItem = ({
  imageSrc,
  certificateSrc,
  description,
  productName,
}: any) => {
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

      {/* Chứng nhận - Đặt ở góc trên bên trái, đè lên ảnh */}
      {certificateSrc && (
        <div className="absolute top-0 left-0 p-2 z-10">
          {/* Padding nhỏ để tạo khoảng trống */}
          <img
            src={certificateSrc}
            alt="Certificate"
            className="w-12 h-12 md:w-16 md:h-16 border-2 border-white shadow-md" // Kích thước và viền tròn
          />
        </div>
      )}

      {/* Mô tả sản phẩm */}
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

// Component bao bọc hiển thị danh sách các sản phẩm/item
const ImportExportComponent = ({ title, subTitle, items }: any) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Hiệu ứng xuất hiện lần lượt cho các item con
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
        {title}
      </motion.h3>
      <motion.p
        className="text-gray-600 text-left"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {subTitle}
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {items.map((item: any, index: number) => (
          <ImportExportItem
            key={index}
            imageSrc={item.imageSrc}
            certificateSrc={item.certificateSrc}
            description={item.description}
            productName={item.productName}
          />
        ))}
      </motion.div>
    </div>
  );
};
export default ImportExportComponent;
