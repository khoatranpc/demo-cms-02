import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Send } from "lucide-react";

interface Service {
  id: string;
  name: string;
}

interface ContactFormProps {
  formTitle?: string;
  services?: Service[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  selectedServices: string[];
}

const ContactForm: React.FC<ContactFormProps> = ({ formTitle, services }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      selectedServices: [],
    },
    mode: "onChange",
  });

  const selectedServices = watch("selectedServices");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", data);

      // Reset form after successful submission
      reset();

      // You can add success notification here
      alert("Tin nhắn đã được gửi thành công!");
    } catch (error) {
      console.error("Form submission error:", error);
      // You can add error notification here
      alert("Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    const currentServices = selectedServices || [];
    if (checked) {
      return [...currentServices, serviceId];
    } else {
      return currentServices.filter((id) => id !== serviceId);
    }
  };

  return (
    <div className="">
      {formTitle && (
        <h3 className="text-2xl sm:text-3xl font-bold text-vina-primary mb-6">
          {formTitle}
        </h3>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Họ và tên *
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Vui lòng nhập họ và tên",
              minLength: {
                value: 2,
                message: "Họ và tên phải có ít nhất 2 ký tự",
              },
              maxLength: {
                value: 50,
                message: "Họ và tên không được quá 50 ký tự",
              },
            })}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 text-gray-900 placeholder-gray-500 ${
              errors.name
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-vina-primary focus:border-vina-primary"
            }`}
            placeholder="Nhập họ và tên của bạn"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ",
              },
            })}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 text-gray-900 placeholder-gray-500 ${
              errors.email
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-vina-primary focus:border-vina-primary"
            }`}
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Số điện thoại *
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone", {
              required: "Vui lòng nhập số điện thoại",
              pattern: {
                value: /^[0-9+\-\s()]{10,15}$/,
                message: "Số điện thoại không hợp lệ",
              },
            })}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 text-gray-900 placeholder-gray-500 ${
              errors.phone
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-vina-primary focus:border-vina-primary"
            }`}
            placeholder="0123 456 789"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Services Checkbox */}
        {services && services.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Dịch vụ muốn tư vấn
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service) => (
                <Controller
                  key={service.id}
                  name="selectedServices"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(field.value || []).includes(service.id)}
                        onChange={(e) => {
                          const newValue = handleServiceChange(
                            service.id,
                            e.target.checked
                          );
                          field.onChange(newValue);
                        }}
                        className="w-4 h-4 text-vina-primary border-gray-300 rounded focus:ring-vina-primary"
                      />
                      <span className="text-sm text-gray-700">
                        {service.name}
                      </span>
                    </label>
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tin nhắn *
          </label>
          <textarea
            id="message"
            {...register("message", {
              required: "Vui lòng nhập tin nhắn",
              minLength: {
                value: 10,
                message: "Tin nhắn phải có ít nhất 10 ký tự",
              },
              maxLength: {
                value: 1000,
                message: "Tin nhắn không được quá 1000 ký tự",
              },
            })}
            rows={5}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 text-gray-900 placeholder-gray-500 resize-vertical ${
              errors.message
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-vina-primary focus:border-vina-primary"
            }`}
            placeholder="Nhập tin nhắn của bạn..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-vina-primary text-white font-medium py-3 px-6 rounded-md hover:bg-vina-accent focus:outline-none focus:ring-2 focus:ring-vina-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors duration-200"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Đang gửi...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Gửi tin nhắn</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
