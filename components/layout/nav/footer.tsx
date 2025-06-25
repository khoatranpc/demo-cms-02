// components/layout/Footer.tsx
"use client"
import Link from "next/link";
import Image from "next/image";

// Một component nhỏ để render icon mạng xã hội
const SocialIcon = ({ platform }: { platform: string }) => {
  // Trong thực tế, bạn sẽ dùng thư viện icon như react-icons
  // Đây là ví dụ đơn giản
  if (platform.toLowerCase() === 'linkedin') {
    return <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>;
  }
  if (platform.toLowerCase() === 'facebook') {
    return <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>;
  }
  return null;
};

export default function Footer({ data }: { data: any }) {
  if (!data) return null;

  const { description, contactInfo, linkColumns, socialLinks, copyright } = data;

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Cột thông tin công ty */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-white text-lg font-semibold mb-4">VINHAPAC</h3>
            <p className="max-w-md">{description}</p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social: any) => (
                <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
                  <span className="sr-only">{social.platform}</span>
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </div>

          {/* Các cột liên kết */}
          {linkColumns.map((column: any) => (
            <div key={column.title}>
              <h4 className="text-white font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link: any) => (
                  <li key={link.label}>
                    <Link href={link.url} className="hover:text-orange-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Cột liên hệ */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <address className="not-italic space-y-2">
              <p>{contactInfo.address}</p>
              <p>Phone: {contactInfo.phone}</p>
              <p>Email: <a href={`mailto:${contactInfo.email}`} className="hover:text-orange-400">{contactInfo.email}</a></p>
            </address>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}