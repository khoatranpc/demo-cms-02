"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Globe2, Package2, Search, Truck } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const ServicesPage = () => {
  const services: ServiceCardProps[] = [
    {
      icon: <Globe2 className="w-6 h-6" />,
      title: "Đại diện xuất khẩu",
      description: "Thay mặt nhà cung cấp làm việc với khách quốc tế, đảm bảo giao dịch suôn sẻ và hiệu quả",
      features: [
        "Đàm phán và ký kết hợp đồng",
        "Quản lý quan hệ khách hàng",
        "Xử lý các vấn đề phát sinh",
        "Báo cáo tiến độ thường xuyên"
      ]
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Sourcing & kiểm soát",
      description: "Giúp buyer chọn đúng nhà cung cấp, kiểm định sản phẩm đảm bảo chất lượng theo yêu cầu",
      features: [
        "Đánh giá và lựa chọn nhà cung cấp",
        "Kiểm tra chất lượng sản phẩm",
        "Giám sát quy trình sản xuất",
        "Đảm bảo tiêu chuẩn xuất khẩu"
      ]
    },
    {
      icon: <Package2 className="w-6 h-6" />,
      title: "Xuất khẩu nhãn riêng",
      description: "Gia công – đóng gói theo thương hiệu của buyer, đảm bảo chất lượng và tiêu chuẩn quốc tế",
      features: [
        "Thiết kế theo yêu cầu",
        "Sản xuất theo tiêu chuẩn",
        "Đóng gói nhãn riêng",
        "Kiểm soát chất lượng"
      ]
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Logistics & chứng từ",
      description: "Xử lý trọn gói từ kho đến cảng đến cửa hàng, đảm bảo hàng hóa đến đúng hẹn",
      features: [
        "Vận chuyển đa phương thức",
        "Thủ tục hải quan",
        "Quản lý chứng từ",
        "Theo dõi lô hàng"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/export-services-hero.jpg" 
            alt="Export Services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Dịch vụ Xuất khẩu Chuyên nghiệp
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Giải pháp xuất khẩu toàn diện cho doanh nghiệp Việt Nam, từ tìm nguồn hàng đến vận chuyển quốc tế
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium"
            >
              Tư vấn dịch vụ xuất khẩu
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dịch vụ của chúng tôi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cung cấp các giải pháp xuất khẩu toàn diện, giúp doanh nghiệp Việt Nam tiếp cận thị trường quốc tế một cách hiệu quả
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sẵn sàng để xuất khẩu?
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Hãy để chúng tôi đồng hành cùng bạn trong hành trình chinh phục thị trường quốc tế
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-full font-medium"
            >
              Liên hệ tư vấn ngay
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
