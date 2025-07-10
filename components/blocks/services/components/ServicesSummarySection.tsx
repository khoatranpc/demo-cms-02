import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, FileText } from "lucide-react"; // Import icon ArrowRight

// Component cho từng dịch vụ con (Xuất khẩu/Phân phối)
const ServiceItem = ({ title, description, link, image }: any) => {
  return (
    <motion.div
      className="relative h-[400px] overflow-hidden group group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Content Container */}
      <div
        className="absolute bottom-0 w-full h-[30%] transition-all ease-out duration-500 group-hover:h-full 
        flex flex-col justify-between p-6 z-10 bg-white border border-vina-primary"
      >
        {/* Title */}
        <h4 className="font-bold text-lg text-vina-primary group-hover:mt-6">
          {title}
        </h4>

        {/* Description and Button - Hidden by default, shown on hover */}
        <div
          className="opacity-0 transform translate-y-4 transition-all duration-300 delay-100 ease-out
          group-hover:opacity-100 group-hover:translate-y-0"
        >
          <p className="text-vina-primary text-base mb-4 line-clamp-3">
            {description}
          </p>
          <a
            href={link}
            className="inline-flex items-center bg-vina-primary text-white 
            font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Xem thêm
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Component chính hiển thị danh sách dịch vụ
const ServicesComponent = ({ title, mainDescription, services }: any) => {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-4 px-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl">{title}</h3>
        <motion.div
          className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            className="w-full sm:w-auto inline-flex items-center justify-center
                     bg-vina-primary text-white font-semibold
                     px-4 sm:px-5 py-2.5 rounded-full shadow-md
                     transition-all duration-300 ease-in-out transform
                     hover:-translate-y-1 hover:bg-vina-primary-dark hover:shadow-lg
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vina-primary"
          >
            <FileText className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">Báo giá</span>
          </button>
          <button
            className="w-full sm:w-auto inline-flex items-center justify-center
                     bg-transparent border-2 border-vina-secondary text-vina-secondary font-semibold
                     px-4 sm:px-5 py-2.5 rounded-full shadow-md
                     transition-all duration-300 ease-in-out transform
                     hover:-translate-y-1 hover:bg-vina-secondary hover:text-white hover:shadow-lg
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vina-secondary"
          >
            <Download className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">Tải catalog</span>
          </button>
        </motion.div>
      </div>
      <p className="text-gray-700 leading-relaxed">{mainDescription}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service: any, index: number) => (
          <ServiceItem
            key={index}
            title={service.title}
            description={service.description}
            link={service.link}
            image={service.image}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Component tổng thể cho phần tóm tắt dịch vụ
const ServicesSummarySection = () => {
  // Dữ liệu mock cho dịch vụ Xuất nhập khẩu
  const exportImportServices = [
    {
      title: "Thực phẩm chế biến & nông sản tinh chế",
      description:
        "Chúng tôi chuyên xuất nhập khẩu đa dạng các mặt hàng thực phẩm chế biến và nông sản chất lượng cao, đảm bảo nguồn gốc rõ ràng và an toàn vệ sinh thực phẩm.",
      link: "/services/food-agriculture",
      image: "/uploads/services/foods.png",
    },
    {
      title: "Thời trang và phụ kiện",
      description:
        "Cung cấp các giải pháp xuất nhập khẩu cho ngành thời trang, từ nguyên liệu đến sản phẩm hoàn chỉnh, đáp ứng xu hướng thị trường và tiêu chuẩn quốc tế.",
      link: "/services/fashion-accessories",
      image: "/uploads/services/outfit.png",
    },
    {
      title: "Đồ gỗ & trang trí nhà cửa",
      description:
        "Vận chuyển và phân phối đồ gỗ nội thất, vật liệu trang trí nhà cửa với quy trình chuyên nghiệp, đảm bảo hàng hóa nguyên vẹn và đúng tiến độ.",
      link: "/services/furniture-home-decor",
      image: "/uploads/services/furniture.png",
    },
  ];

  // Dữ liệu mock cho dịch vụ Phân phối (ví dụ thêm)
  const distributionServices = [
    {
      title: "Hệ thống phân phối rộng khắp",
      description:
        "Với mạng lưới đối tác và kho bãi hiện đại, chúng tôi đảm bảo đưa sản phẩm của bạn đến tay người tiêu dùng nhanh chóng và hiệu quả trên toàn quốc.",
      link: "/uploads/services/distribution.png",
      image: "/uploads/services/distribution.png",
    },
    {
      title: "Logistics và Vận chuyển",
      description:
        "Dịch vụ logistics toàn diện từ quản lý kho bãi, vận chuyển đa phương thức đến tối ưu hóa chuỗi cung ứng, giúp doanh nghiệp tiết kiệm chi phí và thời gian.",
      link: "/uploads/services/logistics",
      image: "/uploads/services/logistic.png",
    },
    {
      title: "Tư vấn thị trường & đối tác",
      description:
        "Hỗ trợ doanh nghiệp thâm nhập thị trường mới, tìm kiếm đối tác tiềm năng và xây dựng chiến lược phân phối tối ưu cho sản phẩm của bạn.",
      link: "/uploads/services/market-consulting",
      image: "/uploads/services/market-consulting.png",
    },
  ];

  return (
    <>
      <ServicesComponent
        title="Nhóm hàng xuất khẩu"
        mainDescription="Chuyên cung cấp dịch vụ xuất, nhập khẩu với đa dạng các mặt hàng, bao gồm các lĩnh vực trọng tâm và nhiều ngành hàng khác nhau, đảm bảo hiệu quả và uy tín."
        services={exportImportServices}
      />
      {/* Dịch vụ Phân phối (ví dụ, bạn có thể thay đổi dữ liệu hoặc chỉ hiển thị 1 phần nếu phù hợp) */}
      <ServicesComponent
        title="Dịch vụ Xuất khẩu"
        mainDescription="Sở hữu hệ thống phân phối linh hoạt và hiện đại, cùng mối quan hệ chiến lược với các nhà sản xuất và đối tác lớn, chúng tôi đảm bảo sản phẩm của bạn tiếp cận thị trường nhanh chóng."
        services={distributionServices}
      />
    </>
  );
};

export default ServicesSummarySection;
