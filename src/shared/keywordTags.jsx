"use client";

export default function KeywordTags({ keywords }) {
  if (!keywords || keywords.length === 0) return null;

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Temas relacionados:
        </span>
        {keywords.map((kw) => (
          <span
            key={kw.id_keyword}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
          >
            {kw.keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
