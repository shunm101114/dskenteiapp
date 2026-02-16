import { useState, useCallback, useMemo } from "react";
import type { Category } from "../types";
import { CATEGORIES } from "../types";
import { allStudyTopics as studyTopics } from "../data/all-study-topics";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TopicCard } from "../components/TopicCard";

export function StudyPage() {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
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

      <div className="study-tabs">
        {CATEGORIES.map((cat) => {
          const c = categoryReadCounts[cat];
          return (
            <button
              key={cat}
              className={`study-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              type="button"
            >
              {cat} ({c.read}/{c.total})
            </button>
          );
        })}
      </div>

      <div>
        {filtered.map((topic) => (
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
