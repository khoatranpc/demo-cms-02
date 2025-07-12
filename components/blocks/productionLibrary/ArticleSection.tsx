import React from "react";
import { Template } from "tinacms";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import {
  SectionListServices,
  sectionListServicesFields,
  TListServices,
} from "../services/ContentDetailService";

interface IArticleSection {
  contentArticle: {
    body: any;
  };
  listArticle: {
    listServices?: TListServices[];
  }[];
}
export type TArticleSection = Partial<IArticleSection>;
interface Props {
  data?: TArticleSection;
}
const components = {
  youtubeEmbed: ({ url }: { url: string }) => {
    const videoId = extractYouTubeId(url);
    if (!videoId) return null;

    return (
      <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    );
  },
};

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}
const ArticleSection = (props: Props) => {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        {props.data?.listArticle?.length && (
          <div className="lg:col-span-1 order-2 lg:order-1">
            {/* Mobile: Collapsible section */}
            <div className="lg:hidden mb-6">
              <details className="group">
                <div className="mt-4 space-y-3 px-2">
                  {props.data?.listArticle?.map((item, index) => {
                    return item.listServices?.map((ser, serIndex) => {
                      return (
                        <SectionListServices 
                          key={`mobile-${index}-${serIndex}`} 
                          data={ser} 
                        />
                      );
                    });
                  })}
                </div>
              </details>
            </div>
            
            {/* Desktop: Sticky sidebar */}
            <div className="hidden lg:block lg:sticky lg:top-24 space-y-3">
              {props.data?.listArticle?.map((item, index) => {
                return item.listServices?.map((ser, serIndex) => {
                  return (
                    <SectionListServices 
                      key={`desktop-${index}-${serIndex}`} 
                      data={ser} 
                    />
                  );
                });
              })}
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div
          className={`order-1 lg:order-2 ${
            props.data?.listArticle?.length 
              ? "lg:col-span-3" 
              : "lg:col-span-4"
          }`}
        >
          <article className="prose max-w-none">
            <TinaMarkdown
              content={
                props.data?.contentArticle?.body as unknown as TinaMarkdownContent
              }
              components={components}
            />
          </article>
        </div>
      </div>
    </div>
  );
};
export const articleSectionTemplate: Template = {
  name: "articleSection",
  label: "Blog/Article",
  fields: [
    {
      name: "contentArticle",
      label: "Nội dung",
      type: "object",
      fields: [
        {
          name: "body",
          label: "Body",
          type: "rich-text",
          templates: [
            {
              name: "youtubeEmbed",
              label: "YouTube Video",
              fields: [
                {
                  name: "url",
                  label: "YouTube URL",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "listArticle",
      label: "Danh sách",
      type: "object",
      list: true,
      ui: {
        itemProps(item) {
          return {
            label: item?.title,
          };
        },
      },
      fields: [
        {
          type: "string",
          label: "Tên",
          name: "title",
        },
        sectionListServicesFields,
      ],
    },
  ],
};
export default ArticleSection;
