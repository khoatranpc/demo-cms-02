import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSectionService = () => {
  return (
    <section className="relative w-screen -translate-x-1/2 left-1/2 py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/uploads/services/services.png"
          alt="Export Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Tiêu đề chính của phần dịch vụ, nằm phía trên 2 cột */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-12 md:mb-20 leading-tight" // Tăng kích thước, độ đậm, và khoảng cách dưới
        >
          Dịch vụ Toàn diện của VINHAPAC
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-center md:text-left p-6 md:p-8 rounded-lg bg-white/10 backdrop-blur-sm shadow-xl h-full" // Thêm nền mờ và bóng đổ để nổi bật hơn
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-primary-light">
              Xuất Nhập Khẩu
            </h3>
            <p className="text-base md:text-lg mb-6 text-gray-100">
              Cung cấp giải pháp toàn diện cho hoạt động xuất nhập khẩu các mặt
              hàng như nguyên liệu thô, sản phẩm tiêu dùng, và hàng hóa công
              nghiệp. Đảm bảo quy trình vận chuyển và thủ tục hải quan nhanh
              chóng, hiệu quả.
            </p>
            <Button
              size="lg"
              className="bg-vina-primary hover:bg-vina-primary-90 cursor-pointer text-white px-8 py-3 rounded-full font-medium group transition-all duration-300 transform hover:scale-105" // Thêm hiệu ứng hover
            >
              Tìm hiểu về Xuất Nhập Khẩu
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          {/* Cột 2: Phân Phối */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-center md:text-left p-6 md:p-8 rounded-lg bg-white/10 backdrop-blur-sm shadow-xl h-full" // Thêm nền mờ và bóng đổ
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-secondary-light">
              Phân Phối Toàn diện
            </h3>
            <p className="text-base md:text-lg mb-6 text-gray-100">
              Sở hữu hệ thống phân phối linh hoạt và hiện đại, cùng các mối quan
              hệ chiến lược với nhiều nhà sản xuất lớn trong các lĩnh vực may
              mặc, thực phẩm, nội thất, hàng gia dụng và nhiều ngành hàng khác.
            </p>
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 cursor-pointer text-vina-primary px-8 py-3 rounded-full font-medium group transition-all duration-300 transform hover:scale-105" // Thêm hiệu ứng hover
            >
              Khám phá Dịch vụ Phân Phối
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionService;
