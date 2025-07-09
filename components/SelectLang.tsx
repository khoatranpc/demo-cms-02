"use client";

import getCountryFlag from "country-flag-icons/unicode";
import { Select } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export interface ILanguage {
  countryName: string;
  countryCode: string;
  countryFlag?: string;
}

interface SelectLangProps {
  languages: ILanguage[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectLang = ({
  languages,
  value = "vn",
  onChange,
  placeholder = "Select language",
}: SelectLangProps) => {
  const router = useRouter();

  const handleChange = (value: string) => {
    onChange?.(value);

    let newPathname = "";
    if (value.toLowerCase() === "vn") {
      newPathname = "/";
    } else {
      newPathname = `/${value.toLowerCase()}`;
    }

    router.push(newPathname);
  };
  return (
    <div className="relative w-full group">
      <div className="relative">
        <Select
          name="lang"
          value={value.toLowerCase()}
          onChange={(e) => {
            if (value.toLowerCase() !== String(e.target.value).toLowerCase()) {
              handleChange(e.target.value);
            }
          }}
          className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm text-gray-800 transition-all duration-200 hover:border-gray-300 focus:border-vina-primary focus:outline-none focus:ring-2 focus:ring-vina-primary/20 appearance-none pr-10"
        >
          <option disabled value="">
            {placeholder}
          </option>
          {languages.map((lang) => {
            return (
              <option
                key={lang.countryFlag}
                value={lang.countryFlag?.toLowerCase()}
                className="py-2"
              >
                {getCountryFlag(lang.countryFlag as string)} {lang.countryFlag}
              </option>
            );
          })}
        </Select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:text-gray-700" />
      </div>
    </div>
  );
};

export default SelectLang;
