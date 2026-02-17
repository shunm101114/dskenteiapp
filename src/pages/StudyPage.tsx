import { useState, useCallback, useMemo } from "react";
import type { Category } from "../types";
import { CATEGORIES, DS_SUBCATEGORIES, DE_SUBCATEGORIES, BIZ_SUBCATEGORIES } from "../types";
import { allStudyTopics as studyTopics } from "../data/all-study-topics";
import { dsSubcategoryMap, deSubcategoryMap, bizSubcategoryMap } from "../data/ds-subcategory-map";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TopicCard } from "../components/TopicCard";

/** Map from category to its subcategory list */
const SUBCATEGORY_LIST: Record<Category, readonly string[]> = {
  "データサイエンス力": DS_SUBCATEGORIES,
  "データエンジニアリング力": DE_SUBCATEGORIES,
  "ビジネス力": BIZ_SUBCATEGORIES,
};

/** Combined subcategory map for all categories */
const subcategoryMap: Record<string, string> = {
  ...dsSubcategoryMap,
  ...deSubcategoryMap,
  ...bizSubcategoryMap,
};

/** Resolve subcategory: use topic.subcategory first, fall back to map */
function getSubcategory(topic: { id: string; subcategory?: string }): string | undefined {
  return topic.subcategory ?? subcategoryMap[topic.id];
}

export function StudyPage() {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [readTopics, setReadTopics] = useLocalStorage<string[]>("readTopics", []);

  const filtered = studyTopics.filter((t) => t.category === activeCategory);

  const readSet = useMemo(() => new Set(readTopics), [readTopics]);

  const handleToggleRead = useCallback(
    (id: string) => {
      setReadTopics((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [setReadTopics]
  );

  const categoryReadCounts = useMemo(() => {
    const counts: Record<string, { read: number; total: number }> = {};
    for (const cat of CATEGORIES) {
      const catTopics = studyTopics.filter((t) => t.category === cat);
      const readCount = catTopics.filter((t) => readSet.has(t.id)).length;
      counts[cat] = { read: readCount, total: catTopics.length };
    }
    return counts;
  }, [readSet]);

  const totalRead = readTopics.length;
  const totalTopics = studyTopics.length;
  const readPercent = totalTopics === 0 ? 0 : Math.round((totalRead / totalTopics) * 100);

  // Subcategory support for all categories
  const subcategories = SUBCATEGORY_LIST[activeCategory];

  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, { read: number; total: number }> = {};
    for (const sub of subcategories) {
      const subTopics = filtered.filter((t) => getSubcategory(t) === sub);
      const readCount = subTopics.filter((t) => readSet.has(t.id)).length;
      counts[sub] = { read: readCount, total: subTopics.length };
    }
    return counts;
  }, [subcategories, filtered, readSet]);

  const displayTopics = useMemo(() => {
    if (!activeSub) return filtered;
    return filtered.filter((t) => getSubcategory(t) === activeSub);
  }, [activeSub, filtered]);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setActiveSub(null);
  };

  return (
    <>
      <h2 className="section-title">学習</h2>

      {/* Overall progress bar */}
      <div className="card" style={{ paddingTop: 16, paddingBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            学習進捗
          </span>
          <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
            {totalRead}/{totalTopics}項目 既読 ({readPercent}%)
          </span>
        </div>
        <div className="category-rate-track">
          <div
            className="category-rate-fill"
            style={{ width: `${readPercent}%`, background: "var(--color-success)" }}
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="study-tabs">
        {CATEGORIES.map((cat) => {
          const c = categoryReadCounts[cat];
          return (
            <button
              key={cat}
              className={`study-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
              type="button"
            >
              {cat} ({c.read}/{c.total})
            </button>
          );
        })}
      </div>

      {/* Subcategory chips */}
      <div className="study-sub-chips">
        <button
          className={`study-sub-chip ${activeSub === null ? "active" : ""}`}
          onClick={() => setActiveSub(null)}
          type="button"
        >
          すべて ({filtered.length})
        </button>
        {subcategories.map((sub) => {
          const c = subcategoryCounts[sub];
          if (!c || c.total === 0) return null;
          return (
            <button
              key={sub}
              className={`study-sub-chip ${activeSub === sub ? "active" : ""}`}
              onClick={() => setActiveSub(sub)}
              type="button"
            >
              {sub}
              <span className="study-sub-chip-count">{c.read}/{c.total}</span>
            </button>
          );
        })}
      </div>

      <div>
        {displayTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            isRead={readSet.has(topic.id)}
            onToggleRead={handleToggleRead}
          />
        ))}
      </div>
    </>
  );
}
