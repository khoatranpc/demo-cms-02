"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Template } from "tinacms";
import { useForm, Controller } from "react-hook-form";
import { uuidv4 } from "@/lib/utils";
import { Send } from "lucide-react";

interface FormField {
    id?: string;
    label?: string;
    type?: "text" | "email" | "tel" | "textarea" | "select";
    placeholder?: string;
    required?: boolean;
    options?: string[];
    validation?: {
        pattern?: string;
        message?: string;
        minLength?: number;
        maxLength?: number;
    };
}

export interface IFormSection {
    title?: string;
    description?: string;
    fields?: FormField[];
    submitButton?: {
        label?: string;
        action?: string;
    };
}

interface Props {
    data?: IFormSection;
}

type FormData = Record<string, any>;

const FormSection = ({ data }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Create default values based on form fields
    const defaultValues = React.useMemo(() => {
        const values: FormData = {};
        data?.fields?.forEach(field => {
            if (field.id) {
                values[field.id] = field.type === 'select' ? '' : '';
            }
        });
        return values;
    }, [data?.fields]);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues,
        mode: "onChange",
    });

    // Create validation rules based on field configuration
    const getValidationRules = (field: FormField) => {
        const rules: any = {};
        
        if (field.required) {
            rules.required = `${field.label} là bắt buộc`;
        }
        
        if (field.validation?.pattern) {
            rules.pattern = {
                value: new RegExp(field.validation.pattern),
                message: field.validation.message || `${field.label} không hợp lệ`,
            };
        }
        
        if (field.validation?.minLength) {
            rules.minLength = {
                value: field.validation.minLength,
                message: `${field.label} phải có ít nhất ${field.validation.minLength} ký tự`,
            };
        }
        
        if (field.validation?.maxLength) {
            rules.maxLength = {
                value: field.validation.maxLength,
                message: `${field.label} không được quá ${field.validation.maxLength} ký tự`,
            };
        }
        
        // Default validation for specific field types
        if (field.type === 'email' && !field.validation?.pattern) {
            rules.pattern = {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email không hợp lệ',
            };
        }
        
        if (field.type === 'tel' && !field.validation?.pattern) {
            rules.pattern = {
                value: /^[0-9+\-\s()]{10,15}$/,
                message: 'Số điện thoại không hợp lệ',
            };
        }
        
        return rules;
    };

    const onSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // If action URL is provided, submit to that endpoint
            if (data?.submitButton?.action) {
                const response = await fetch(data.submitButton.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                
                if (!response.ok) {
                    throw new Error('Form submission failed');
                }
            } else {
                // Simulate form submission
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }

            console.log('Form submitted:', formData);
            setSubmitStatus('success');
            reset();
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderField = (field: FormField, index: number) => {
        if (!field.id) return null;
        
        const validationRules = getValidationRules(field);
        const hasError = errors[field.id];
        const errorMessage = hasError?.message as string;

        return (
            <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative"
            >
                <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    {field.label}
                    {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                    )}
                </label>

                {field.type === "textarea" ? (
                    <textarea
                        id={field.id}
                        {...register(field.id, validationRules)}
                        placeholder={field.placeholder}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 text-gray-900 placeholder-gray-500 resize-vertical ${
                            hasError
                                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 focus:ring-vina-primary focus:border-vina-primary"
                        }`}
                        rows={4}
                    />
                ) : field.type === "select" ? (
                    <Controller
                        name={field.id}
                        control={control}
                        rules={validationRules}
                        render={({ field: controllerField }) => (
                            <select
                                {...controllerField}
                                id={field.id}
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 text-gray-900 ${
                                    hasError
                                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                        : "border-gray-300 focus:ring-vina-primary focus:border-vina-primary"
                                }`}
                            >
                                <option value="">{field.placeholder || `Chọn ${field.label}`}</option>
                                {field.options?.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                ) : (
                    <input
                        type={field.type}
                        id={field.id}
                        {...register(field.id, validationRules)}
                        placeholder={field.placeholder}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 text-gray-900 placeholder-gray-500 ${
                            hasError
                                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 focus:ring-vina-primary focus:border-vina-primary"
                        }`}
                    />
                )}

                {errorMessage && (
                    <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
                )}
                
                {!hasError && field.validation?.message && (
                    <p className="mt-1 text-sm text-gray-500">
                        {field.validation.message}
                    </p>
                )}
            </motion.div>
        );
    };

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    {data?.title && (
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h2>
                    )}
                    {data?.description && (
                        <p className="text-lg text-gray-600">{data.description}</p>
                    )}
                </motion.div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                        <p className="text-green-800 text-center">Form đã được gửi thành công!</p>
                    </motion.div>
                )}
                
                {submitStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                        <p className="text-red-800 text-center">Có lỗi xảy ra khi gửi form. Vui lòng thử lại!</p>
                    </motion.div>
                )}

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {data?.fields?.map((field, index) => renderField(field, index))}

                    {/* Submit Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center"
                    >
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-vina-primary text-white rounded-lg hover:bg-vina-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Đang gửi...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    <span>{data?.submitButton?.label ?? "Gửi"}</span>
                                </>
                            )}
                        </button>
                    </motion.div>
                </motion.form>
            </div>
        </section>
    );
};

export default FormSection;

export const formSectionBlockSchema: Template = {
    name: "formSection",
    label: "Form Section",
    fields: [
        {
            type: "string",
            name: "title",
            label: "Title",
        },
        {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
                component: "textarea",
            },
        },
        {
            type: "object",
            name: "fields",
            label: "Form Fields",
            list: true,
            ui: {
                itemProps: (item) => ({
                    label: item?.label,
                    id: item?.id,
                }),
                defaultItem: () => {
                    if (typeof window === "undefined") return {}
                    return {
                        id: uuidv4(),
                    }
                },
            },
            fields: [
                {
                    type: "string",
                    name: "label",
                    label: "Field Label",
                },
                {
                    type: "string",
                    name: "id",
                    label: "Field ID",
                    ui: {
                        component: () => null
                    }
                },
                {
                    type: "string",
                    name: "type",
                    label: "Field Type",
                    options: ["text", "email", "tel", "textarea", "select"],
                },
                {
                    type: "string",
                    name: "placeholder",
                    label: "Placeholder",
                },
                {
                    type: "boolean",
                    name: "required",
                    label: "Required",
                },
                {
                    type: "string",
                    name: "options",
                    label: "Options (for select field)",
                    list: true,
                    ui: {
                        component: "list",
                    },
                },
                {
                    type: "object",
                    name: "validation",
                    label: "Validation",
                    fields: [
                        {
                            type: "string",
                            name: "pattern",
                            label: "Pattern (regex)",
                        },
                        {
                            type: "string",
                            name: "message",
                            label: "Validation Message",
                        },
                        {
                            type: "number",
                            name: "minLength",
                            label: "Minimum Length",
                        },
                        {
                            type: "number",
                            name: "maxLength",
                            label: "Maximum Length",
                        },
                    ],
                },
            ],
        },
        {
            type: "object",
            name: "submitButton",
            label: "Submit Button",
            fields: [
                {
                    type: "string",
                    name: "label",
                    label: "Button Label",
                },
                {
                    type: "string",
                    name: "action",
                    label: "Form Action URL",
                },
            ],
        },
    ],
};