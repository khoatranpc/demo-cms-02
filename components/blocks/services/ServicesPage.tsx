"use client";

import React from "react";
import HeroSectionService from "./components/HeroSectionService";
import DescribeSection from "./components/DescribeSection";
import ServicesSummarySection from "./components/ServicesSummarySection";
import ImportExportComponent from "./components/ImportExport/ImportExportComponent";
import Title from "./components/Title";
import Line from "./components/Line";
import ProfileServiceSection from "./components/ProfileServiceSection";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServicesPage = () => {
  const foodProducts = [
    {
      productName: "Gạo Jasmine cao cấp",
      imageSrc: "/uploads/services/products/rice.png", // Thay bằng ảnh thật
      certificateSrc: "/uploads/certifications/iso-certi-template.png", // Thay bằng ảnh chứng nhận
      description:
        "Gạo Jasmine được chọn lọc kỹ lưỡng, đảm bảo hương vị thơm ngon và chất lượng xuất khẩu hàng đầu. Đạt tiêu chuẩn an toàn thực phẩm quốc tế.",
    },
    {
      productName: "Hạt điều rang muối",
      imageSrc: "/uploads/services/products/hatdieu.png",
      certificateSrc: "/uploads/certifications/iso-certi-template.png",
      description:
        "Hạt điều loại A, rang muối tự nhiên, giòn rụm và giàu dinh dưỡng. Đóng gói tiện lợi, phù hợp cho thị trường khó tính.",
    },
    {
      productName: "Cà phê Robusta nguyên chất",
      imageSrc: "/uploads/services/products/coffe.png",
      certificateSrc: "/uploads/certifications/iso-certi-template.png",
      description:
        "Cà phê Robusta từ vùng cao nguyên Việt Nam, hương vị đậm đà, đặc trưng. Đảm bảo quy trình sản xuất bền vững và công bằng.",
    },
  ];
  return (
    <div className="min-h-screen space-y-10">
      {/* Hero Section */}
      <HeroSectionService />
      <DescribeSection />
      <Title />
      <ServicesSummarySection />
      <ImportExportComponent
        title="Thực phẩm chế biến & nông sản tinh chế"
        subTitle="Chúng tôi chuyên xuất nhập khẩu đa dạng các mặt hàng thực phẩm chế biến và nông sản chất lượng cao, đảm bảo nguồn gốc rõ ràng và an toàn vệ sinh thực phẩm. Hơn 10.000 sản phẩm được giao dịch mỗi năm."
        items={foodProducts}
      />
      <Line />
      <ImportExportComponent
        title="Thực phẩm chế biến & nông sản tinh chế"
        subTitle="Chúng tôi chuyên xuất nhập khẩu đa dạng các mặt hàng thực phẩm chế biến và nông sản chất lượng cao, đảm bảo nguồn gốc rõ ràng và an toàn vệ sinh thực phẩm. Hơn 10.000 sản phẩm được giao dịch mỗi năm."
        items={foodProducts}
      />
      <Line />
      <ImportExportComponent
        title="Thực phẩm chế biến & nông sản tinh chế"
        subTitle="Chúng tôi chuyên xuất nhập khẩu đa dạng các mặt hàng thực phẩm chế biến và nông sản chất lượng cao, đảm bảo nguồn gốc rõ ràng và an toàn vệ sinh thực phẩm. Hơn 10.000 sản phẩm được giao dịch mỗi năm."
        items={foodProducts}
      />
      <Line />
      <ProfileServiceSection />
      {/* Services Grid */}
      {/* <section className="py-20 container mx-auto px-4">
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
            Chúng tôi cung cấp các giải pháp xuất khẩu toàn diện, giúp doanh
            nghiệp Việt Nam tiếp cận thị trường quốc tế một cách hiệu quả
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="bg-primary py-20">
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
              Hãy để chúng tôi đồng hành cùng bạn trong hành trình chinh phục
              thị trường quốc tế
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
      </section> */}
    </div>
  );
};

export default ServicesPage;
