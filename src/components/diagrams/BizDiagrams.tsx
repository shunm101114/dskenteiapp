import type { ReactNode } from "react";

/* ================================================================
   EXISTING diagrams (moved from TopicDiagrams.tsx)
   ================================================================ */

function CrispDm() {
  const phases = [
    { label: "ビジネス\n理解", angle: -90, color: "#2563eb" },
    { label: "データ\n理解", angle: -30, color: "#16a34a" },
    { label: "データ\n準備", angle: 30, color: "#f59e0b" },
    { label: "モデ\nリング", angle: 90, color: "#dc2626" },
    { label: "評価", angle: 150, color: "#7c3aed" },
    { label: "展開", angle: 210, color: "#0891b2" },
  ];
  const cx = 200, cy = 105, r = 55;
  return (
    <svg viewBox="0 0 400 200" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">CRISP-DM プロセスモデル</text>
      <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="#e2e8f0" strokeWidth="2" />
      {phases.map((_, i) => {
        const a1 = (phases[i].angle * Math.PI) / 180;
        const a2 = (phases[(i + 1) % 6].angle * Math.PI) / 180;
        const x1 = cx + (r + 8) * Math.cos(a1 + 0.15);
        const y1 = cy + (r + 8) * Math.sin(a1 + 0.15);
        const x2 = cx + (r + 8) * Math.cos(a2 - 0.15);
        const y2 = cy + (r + 8) * Math.sin(a2 - 0.15);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowCrispBiz)" />
        );
      })}
      {phases.map((p, i) => {
        const a = (p.angle * Math.PI) / 180;
        const px = cx + r * Math.cos(a);
        const py = cy + r * Math.sin(a);
        const lines = p.label.split("\n");
        return (
          <g key={i}>
            <circle cx={px} cy={py} r="20" fill="white" stroke={p.color} strokeWidth="2" />
            {lines.map((line, li) => (
              <text key={li} x={px} y={py + (li - (lines.length - 1) / 2) * 10 + 4}
                textAnchor="middle" fontSize="8" fontWeight="600" fill={p.color}>{line}</text>
            ))}
          </g>
        );
      })}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="8" fill="#64748b">CRISP-DM</text>
      <text x="200" y="192" textAnchor="middle" fontSize="9" fill="#64748b">① ビジネス理解 → ② データ理解 → ③ 準備 → ④ モデリング → ⑤ 評価 → ⑥ 展開</text>
      <defs>
        <marker id="arrowCrispBiz" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

function KpiTree() {
  return (
    <svg viewBox="0 0 400 160" className="topic-diagram">
      <rect x="145" y="5" width="110" height="32" fill="#2563eb" rx="8" />
      <text x="200" y="26" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">KGI (売上)</text>
      <line x1="170" y1="37" x2="100" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="230" y1="37" x2="300" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="40" y="55" width="120" height="28" fill="#dbeafe" rx="6" stroke="#2563eb" strokeWidth="1.5" />
      <text x="100" y="74" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">KPI: 顧客数</text>
      <rect x="240" y="55" width="120" height="28" fill="#dbeafe" rx="6" stroke="#2563eb" strokeWidth="1.5" />
      <text x="300" y="74" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">KPI: 客単価</text>
      <line x1="70" y1="83" x2="45" y2="100" stroke="#94a3b8" strokeWidth="1" />
      <line x1="130" y1="83" x2="155" y2="100" stroke="#94a3b8" strokeWidth="1" />
      <line x1="270" y1="83" x2="245" y2="100" stroke="#94a3b8" strokeWidth="1" />
      <line x1="330" y1="83" x2="355" y2="100" stroke="#94a3b8" strokeWidth="1" />
      {["新規獲得数", "リピート率", "購入点数", "商品単価"].map((label, i) => (
        <g key={i}>
          <rect x={5 + i * 100} y="100" width="90" height="24" fill="#f1f5f9" rx="4" stroke="#e2e8f0" strokeWidth="1" />
          <text x={50 + i * 100} y="116" textAnchor="middle" fontSize="8" fontWeight="500" fill="#64748b">{label}</text>
        </g>
      ))}
      <text x="200" y="150" textAnchor="middle" fontSize="9" fill="#64748b">KGI（最終目標）→ KPI（中間指標）→ 施策</text>
    </svg>
  );
}

function DataEthics() {
  const pillars = [
    { label: "公平性", sub: "バイアスの排除", color: "#2563eb", bg: "#dbeafe" },
    { label: "透明性", sub: "説明可能なAI", color: "#16a34a", bg: "#dcfce7" },
    { label: "プライバシー", sub: "個人情報保護", color: "#f59e0b", bg: "#fef3c7" },
    { label: "安全性", sub: "リスク管理", color: "#dc2626", bg: "#fee2e2" },
  ];
  return (
    <svg viewBox="0 0 400 135" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">データ倫理の4つの柱</text>
      {pillars.map((p, i) => (
        <g key={i}>
          <rect x={15 + i * 98} y="24" width="85" height="75" fill={p.bg} rx="8" stroke={p.color} strokeWidth="2" />
          <text x={57 + i * 98} y="50" textAnchor="middle" fontSize="12" fontWeight="700" fill={p.color}>{p.label}</text>
          <text x={57 + i * 98} y="68" textAnchor="middle" fontSize="9" fill="#64748b">{p.sub}</text>
        </g>
      ))}
      <rect x="15" y="108" width="370" height="22" fill="#f1f5f9" rx="4" />
      <text x="200" y="123" textAnchor="middle" fontSize="9" fill="#334155">
        個人情報保護法（日本）｜ GDPR（EU）｜ 匿名化 vs 仮名化
      </text>
    </svg>
  );
}

function RfmAnalysis() {
  return (
    <svg viewBox="0 0 400 130" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">RFM分析の3軸</text>
      {[
        { letter: "R", label: "Recency", sub: "最終購買日", example: "最近購入 → 高", color: "#2563eb", bg: "#dbeafe" },
        { letter: "F", label: "Frequency", sub: "購買頻度", example: "頻繁に購入 → 高", color: "#16a34a", bg: "#dcfce7" },
        { letter: "M", label: "Monetary", sub: "購買金額", example: "高額購入 → 高", color: "#f59e0b", bg: "#fef3c7" },
      ].map((item, i) => (
        <g key={i}>
          <rect x={15 + i * 130} y="25" width="120" height="78" fill={item.bg} rx="10" stroke={item.color} strokeWidth="2" />
          <text x={75 + i * 130} y="50" textAnchor="middle" fontSize="22" fontWeight="800" fill={item.color}>{item.letter}</text>
          <text x={75 + i * 130} y="68" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">{item.label}</text>
          <text x={75 + i * 130} y="82" textAnchor="middle" fontSize="9" fill="#64748b">{item.sub}</text>
          <text x={75 + i * 130} y="96" textAnchor="middle" fontSize="8" fill={item.color}>{item.example}</text>
        </g>
      ))}
      <text x="200" y="122" textAnchor="middle" fontSize="9" fill="#64748b">3軸でスコアリング → 顧客セグメント化 → 施策の最適化</text>
    </svg>
  );
}

function DataGovernance() {
  return (
    <svg viewBox="0 0 400 180" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">DS人材の3つのスキル領域</text>
      <circle cx="170" cy="78" r="48" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" opacity="0.5" />
      <circle cx="230" cy="78" r="48" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" opacity="0.5" />
      <circle cx="200" cy="125" r="48" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" opacity="0.5" />
      <text x="130" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">データ</text>
      <text x="130" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">サイエンス力</text>
      <text x="270" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a">データエンジ</text>
      <text x="270" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a">ニアリング力</text>
      <text x="200" y="155" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">ビジネス力</text>
      <text x="200" y="97" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">DS</text>
      <text x="200" y="107" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">人材</text>
    </svg>
  );
}

function MeceLogicTree() {
  return (
    <svg viewBox="0 0 420 155" className="topic-diagram">
      <text x="100" y="14" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">MECE（漏れなくダブりなく）</text>
      <circle cx="70" cy="55" r="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <circle cx="130" cy="55" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="60" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563eb">A</text>
      <text x="140" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#16a34a">B</text>
      <text x="100" y="100" textAnchor="middle" fontSize="9" fill="#dc2626">重複なし・漏れなし</text>
      <g transform="translate(220,0)">
        <text x="90" y="14" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9333ea">ロジックツリー</text>
        <rect x="55" y="22" width="70" height="22" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" rx="4" />
        <text x="90" y="37" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">課題</text>
        <line x1="90" y1="44" x2="40" y2="60" stroke="#9333ea" strokeWidth="1" />
        <line x1="90" y1="44" x2="140" y2="60" stroke="#9333ea" strokeWidth="1" />
        <rect x="10" y="60" width="60" height="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="3" />
        <text x="40" y="74" textAnchor="middle" fontSize="8" fill="#b45309">原因A</text>
        <rect x="110" y="60" width="60" height="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="3" />
        <text x="140" y="74" textAnchor="middle" fontSize="8" fill="#b45309">原因B</text>
        <line x1="40" y1="80" x2="20" y2="96" stroke="#f59e0b" strokeWidth="0.8" />
        <line x1="40" y1="80" x2="60" y2="96" stroke="#f59e0b" strokeWidth="0.8" />
        <rect x="2" y="96" width="38" height="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" rx="2" />
        <text x="21" y="108" textAnchor="middle" fontSize="7" fill="#64748b">A-1</text>
        <rect x="42" y="96" width="38" height="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" rx="2" />
        <text x="61" y="108" textAnchor="middle" fontSize="7" fill="#64748b">A-2</text>
        <line x1="140" y1="80" x2="120" y2="96" stroke="#f59e0b" strokeWidth="0.8" />
        <line x1="140" y1="80" x2="160" y2="96" stroke="#f59e0b" strokeWidth="0.8" />
        <rect x="102" y="96" width="38" height="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" rx="2" />
        <text x="121" y="108" textAnchor="middle" fontSize="7" fill="#64748b">B-1</text>
        <rect x="142" y="96" width="38" height="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" rx="2" />
        <text x="161" y="108" textAnchor="middle" fontSize="7" fill="#64748b">B-2</text>
      </g>
    </svg>
  );
}

function PrepMethod() {
  const steps = [
    { label: "Point", desc: "結論", color: "#dc2626", bg: "#fee2e2" },
    { label: "Reason", desc: "理由", color: "#f59e0b", bg: "#fef3c7" },
    { label: "Example", desc: "具体例", color: "#2563eb", bg: "#dbeafe" },
    { label: "Point", desc: "結論(再)", color: "#dc2626", bg: "#fee2e2" },
  ];
  return (
    <svg viewBox="0 0 400 100" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">PREP法</text>
      {steps.map((s, i) => {
        const x = 15 + i * 98;
        return (
          <g key={i}>
            <rect x={x} y="25" width="85" height="50" fill={s.bg} stroke={s.color} strokeWidth="1.5" rx="8" />
            <text x={x + 42} y="46" textAnchor="middle" fontSize="12" fontWeight="700" fill={s.color}>{s.label[0]}</text>
            <text x={x + 42} y="62" textAnchor="middle" fontSize="9" fill="#334155">{s.label}</text>
            <text x={x + 42} y="86" textAnchor="middle" fontSize="9" fill="#64748b">{s.desc}</text>
            {i < 3 && <text x={x + 92} y="52" fontSize="14" fill="#94a3b8">{"\u2192"}</text>}
          </g>
        );
      })}
    </svg>
  );
}

function SpuriousCorrelation() {
  return (
    <svg viewBox="0 0 400 150" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">疑似相関と交絡因子</text>
      <rect x="145" y="30" width="110" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="8" />
      <text x="200" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">交絡因子（気温）</text>
      <rect x="25" y="95" width="130" height="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="8" />
      <text x="90" y="115" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">アイス売上</text>
      <rect x="245" y="95" width="130" height="30" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" rx="8" />
      <text x="310" y="115" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">水難事故</text>
      <line x1="170" y1="62" x2="100" y2="93" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowSCBiz)" />
      <line x1="230" y1="62" x2="300" y2="93" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowSCBiz)" />
      <text x="110" y="76" fontSize="8" fill="#f59e0b">因果</text>
      <text x="280" y="76" fontSize="8" fill="#f59e0b">因果</text>
      <line x1="155" y1="110" x2="245" y2="110" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="200" y="142" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">見かけの相関（疑似相関）</text>
      <defs>
        <marker id="arrowSCBiz" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  );
}

/* ================================================================
   NEW diagrams
   ================================================================ */

function AnalyticsFourStages() {
  const stages = [
    { label: "記述的分析", question: "何が起きた？", color: "#64748b", bg: "#f1f5f9" },
    { label: "診断的分析", question: "なぜ？", color: "#2563eb", bg: "#dbeafe" },
    { label: "予測的分析", question: "何が起きる？", color: "#f59e0b", bg: "#fef3c7" },
    { label: "処方的分析", question: "何をすべき？", color: "#16a34a", bg: "#dcfce7" },
  ];
  return (
    <svg viewBox="0 0 400 170" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">分析の4段階</text>
      {stages.map((s, i) => {
        const x = 20 + i * 80;
        const y = 130 - i * 28;
        const w = 75;
        const h = 130 - y + 10;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill={s.bg} stroke={s.color} strokeWidth="1.5" rx="4" />
            <text x={x + w / 2} y={y + 18} textAnchor="middle" fontSize="9" fontWeight="700" fill={s.color}>{s.label}</text>
            <text x={x + w / 2} y={y + 32} textAnchor="middle" fontSize="8" fill="#64748b">{s.question}</text>
          </g>
        );
      })}
      {/* Right-side arrow indicating value / difficulty */}
      <line x1="365" y1="135" x2="365" y2="35" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowStagesBiz)" />
      <text x="380" y="88" textAnchor="middle" fontSize="8" fontWeight="600" fill="#334155" transform="rotate(-90,380,88)">価値/難易度</text>
      <text x="200" y="160" textAnchor="middle" fontSize="9" fill="#64748b">段階が上がるほど価値が高く、実現の難易度も上がる</text>
      <defs>
        <marker id="arrowStagesBiz" markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
          <path d="M0,6 L4,0 L8,6" fill="#334155" />
        </marker>
      </defs>
    </svg>
  );
}

function AgileScrumDiagram() {
  const cx = 200, cy = 80, r = 52;
  const nodes = [
    { label: "バックログ", angle: 180, color: "#2563eb", bg: "#dbeafe" },
    { label: "計画", angle: 252, color: "#16a34a", bg: "#dcfce7" },
    { label: "スプリント\n(2-4週)", angle: 324, color: "#f59e0b", bg: "#fef3c7" },
    { label: "レビュー", angle: 36, color: "#dc2626", bg: "#fee2e2" },
    { label: "振り返り", angle: 108, color: "#7c3aed", bg: "#f3e8ff" },
  ];
  return (
    <svg viewBox="0 0 400 210" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">アジャイル vs ウォーターフォール</text>
      {/* Circular Agile flow */}
      <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
      {nodes.map((_, i) => {
        const a1 = (nodes[i].angle * Math.PI) / 180;
        const a2 = (nodes[(i + 1) % 5].angle * Math.PI) / 180;
        const x1 = cx + (r + 6) * Math.cos(a1 + 0.18);
        const y1 = cy + (r + 6) * Math.sin(a1 + 0.18);
        const x2 = cx + (r + 6) * Math.cos(a2 - 0.18);
        const y2 = cy + (r + 6) * Math.sin(a2 - 0.18);
        return (
          <line key={`a${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowAgileBiz)" />
        );
      })}
      {nodes.map((n, i) => {
        const a = (n.angle * Math.PI) / 180;
        const px = cx + r * Math.cos(a);
        const py = cy + r * Math.sin(a);
        const lines = n.label.split("\n");
        return (
          <g key={i}>
            <circle cx={px} cy={py} r="22" fill={n.bg} stroke={n.color} strokeWidth="1.5" />
            {lines.map((line, li) => (
              <text key={li} x={px} y={py + (li - (lines.length - 1) / 2) * 10 + 4}
                textAnchor="middle" fontSize="7" fontWeight="600" fill={n.color}>{line}</text>
            ))}
          </g>
        );
      })}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="8" fontWeight="600" fill="#334155">反復型</text>
      {/* Waterfall linear flow */}
      <text x="30" y="155" fontSize="9" fontWeight="600" fill="#64748b">ウォーターフォール（直列型）:</text>
      {["要件", "設計", "実装", "テスト", "運用"].map((label, i) => {
        const x = 30 + i * 72;
        return (
          <g key={i}>
            <rect x={x} y="162" width="60" height="22" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" rx="4" />
            <text x={x + 30} y="177" textAnchor="middle" fontSize="9" fontWeight="500" fill="#64748b">{label}</text>
            {i < 4 && (
              <line x1={x + 62} y1="173" x2={x + 70} y2="173"
                stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowAgileBiz)" />
            )}
          </g>
        );
      })}
      <text x="200" y="202" textAnchor="middle" fontSize="9" fill="#64748b">アジャイル: 反復型 ｜ ウォーターフォール: 直列型</text>
      <defs>
        <marker id="arrowAgileBiz" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

function AbTestDiagram() {
  const barMaxW = 140;
  const valA = 5.2, valB = 6.8, maxVal = 8;
  const barA = (valA / maxVal) * barMaxW;
  const barB = (valB / maxVal) * barMaxW;
  return (
    <svg viewBox="0 0 400 200" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">A/Bテストの流れ</text>
      {/* User pool */}
      <rect x="140" y="26" width="120" height="28" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" rx="6" />
      <text x="200" y="44" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">ユーザー群</text>
      {/* Split lines */}
      <line x1="175" y1="54" x2="90" y2="72" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowABBiz)" />
      <line x1="225" y1="54" x2="310" y2="72" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowABBiz)" />
      {/* Group A */}
      <rect x="20" y="72" width="140" height="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="6" />
      <text x="90" y="90" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">A: コントロール（現行）</text>
      {/* Group B */}
      <rect x="240" y="72" width="140" height="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="6" />
      <text x="310" y="90" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">B: テスト（新案）</text>
      {/* Result arrows */}
      <line x1="90" y1="100" x2="90" y2="118" stroke="#2563eb" strokeWidth="1" markerEnd="url(#arrowABBiz)" />
      <line x1="310" y1="100" x2="310" y2="118" stroke="#16a34a" strokeWidth="1" markerEnd="url(#arrowABBiz)" />
      {/* Comparison bar chart */}
      <text x="200" y="130" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">結果比較</text>
      {/* Bar A */}
      <text x="55" y="148" textAnchor="end" fontSize="9" fontWeight="600" fill="#2563eb">A</text>
      <rect x="60" y="138" width={barA} height="16" fill="#93c5fd" stroke="#2563eb" strokeWidth="1" rx="3" />
      <text x={64 + barA} y="150" fontSize="9" fontWeight="600" fill="#2563eb">{valA}%</text>
      {/* Bar B */}
      <text x="55" y="170" textAnchor="end" fontSize="9" fontWeight="600" fill="#16a34a">B</text>
      <rect x="60" y="160" width={barB} height="16" fill="#86efac" stroke="#16a34a" strokeWidth="1" rx="3" />
      <text x={64 + barB} y="172" fontSize="9" fontWeight="600" fill="#16a34a">{valB}%</text>
      {/* Statistical significance label */}
      <text x="320" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">差は統計的に有意か？</text>
      <text x="200" y="195" textAnchor="middle" fontSize="9" fill="#64748b">帰無仮説: A=B ｜ p値 &lt; 0.05 で有意差あり → 新案採用</text>
      <defs>
        <marker id="arrowABBiz" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

function BusinessFrameworksDiagram() {
  return (
    <svg viewBox="0 0 420 200" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">ビジネスフレームワーク</text>
      {/* SWOT - top left */}
      <g transform="translate(10,24)">
        <text x="95" y="12" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">SWOT分析</text>
        <rect x="20" y="18" width="70" height="30" fill="#dbeafe" rx="4" stroke="#2563eb" strokeWidth="1" />
        <text x="55" y="37" textAnchor="middle" fontSize="8" fontWeight="600" fill="#2563eb">S 強み</text>
        <rect x="92" y="18" width="70" height="30" fill="#fee2e2" rx="4" stroke="#dc2626" strokeWidth="1" />
        <text x="127" y="37" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">W 弱み</text>
        <rect x="20" y="50" width="70" height="30" fill="#dcfce7" rx="4" stroke="#16a34a" strokeWidth="1" />
        <text x="55" y="69" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">O 機会</text>
        <rect x="92" y="50" width="70" height="30" fill="#fef3c7" rx="4" stroke="#f59e0b" strokeWidth="1" />
        <text x="127" y="69" textAnchor="middle" fontSize="8" fontWeight="600" fill="#b45309">T 脅威</text>
      </g>
      {/* 3C - top right */}
      <g transform="translate(220,24)">
        <text x="90" y="12" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a">3C分析</text>
        <circle cx="60" cy="52" r="24" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" opacity="0.7" />
        <text x="60" y="48" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2563eb">Customer</text>
        <text x="60" y="58" textAnchor="middle" fontSize="7" fill="#2563eb">顧客</text>
        <circle cx="110" cy="52" r="24" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" opacity="0.7" />
        <text x="110" y="48" textAnchor="middle" fontSize="7" fontWeight="700" fill="#16a34a">Company</text>
        <text x="110" y="58" textAnchor="middle" fontSize="7" fill="#16a34a">自社</text>
        <circle cx="85" cy="28" r="24" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7" />
        <text x="85" y="24" textAnchor="middle" fontSize="7" fontWeight="700" fill="#b45309">Competitor</text>
        <text x="85" y="34" textAnchor="middle" fontSize="7" fill="#b45309">競合</text>
      </g>
      {/* 4P - bottom left */}
      <g transform="translate(10,115)">
        <text x="95" y="8" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9333ea">4P分析</text>
        {[
          { label: "Product", sub: "製品", color: "#2563eb", bg: "#dbeafe" },
          { label: "Price", sub: "価格", color: "#16a34a", bg: "#dcfce7" },
          { label: "Place", sub: "流通", color: "#f59e0b", bg: "#fef3c7" },
          { label: "Promotion", sub: "販促", color: "#dc2626", bg: "#fee2e2" },
        ].map((p, i) => (
          <g key={i}>
            <rect x={10 + i * 44} y="14" width="40" height="38" fill={p.bg} rx="4" stroke={p.color} strokeWidth="1" />
            <text x={30 + i * 44} y="30" textAnchor="middle" fontSize="7" fontWeight="700" fill={p.color}>{p.label}</text>
            <text x={30 + i * 44} y="42" textAnchor="middle" fontSize="8" fill="#64748b">{p.sub}</text>
          </g>
        ))}
      </g>
      {/* PEST - bottom right */}
      <g transform="translate(220,115)">
        <text x="90" y="8" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">PEST分析</text>
        {[
          { label: "Political", sub: "政治", color: "#2563eb", bg: "#dbeafe" },
          { label: "Economic", sub: "経済", color: "#16a34a", bg: "#dcfce7" },
          { label: "Social", sub: "社会", color: "#f59e0b", bg: "#fef3c7" },
          { label: "Tech", sub: "技術", color: "#9333ea", bg: "#f3e8ff" },
        ].map((p, i) => (
          <g key={i}>
            <rect x={10 + i * 44} y="14" width="40" height="38" fill={p.bg} rx="4" stroke={p.color} strokeWidth="1" />
            <text x={30 + i * 44} y="30" textAnchor="middle" fontSize="7" fontWeight="700" fill={p.color}>{p.label}</text>
            <text x={30 + i * 44} y="42" textAnchor="middle" fontSize="8" fill="#64748b">{p.sub}</text>
          </g>
        ))}
      </g>
      <text x="210" y="195" textAnchor="middle" fontSize="9" fill="#64748b">状況に応じて適切なフレームワークを選択</text>
    </svg>
  );
}

function HypothesisTestingFlowDiagram() {
  const steps = [
    { label: "仮説設定", color: "#2563eb", bg: "#dbeafe" },
    { label: "データ収集", color: "#16a34a", bg: "#dcfce7" },
    { label: "分析", color: "#f59e0b", bg: "#fef3c7" },
    { label: "検証", color: "#9333ea", bg: "#f3e8ff" },
    { label: "意思決定", color: "#dc2626", bg: "#fee2e2" },
  ];
  return (
    <svg viewBox="0 0 420 155" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">仮説検証プロセス</text>
      <defs>
        <marker id="arrowBizHyp" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
        <marker id="arrowBizHypRed" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#dc2626" />
        </marker>
      </defs>
      {/* Main flow */}
      {steps.map((s, i) => {
        const x = 10 + i * 82;
        return (
          <g key={i}>
            <rect x={x} y="30" width="72" height="40" fill={s.bg} rx="8" stroke={s.color} strokeWidth="2" />
            <text x={x + 36} y="54" textAnchor="middle" fontSize="9" fontWeight="700" fill={s.color}>{s.label}</text>
            {i < 4 && (
              <line x1={x + 72} y1="50" x2={x + 82} y2="50" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowBizHyp)" />
            )}
          </g>
        );
      })}
      {/* Feedback loop: 検証 → 仮説設定 */}
      <path d="M 298 70 L 298 100 Q 298 110 288 110 L 56 110 Q 46 110 46 100 L 46 72" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrowBizHypRed)" />
      <rect x="130" y="100" width="80" height="18" fill="#fee2e2" rx="4" />
      <text x="170" y="113" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">棄却時に再設定</text>
      {/* Labels */}
      <text x="370" y="82" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="600">採用</text>
      <text x="210" y="145" textAnchor="middle" fontSize="9" fill="#64748b">仮説が棄却された場合、新たな仮説を設定して再検証</text>
    </svg>
  );
}

function CohortAnalysisDiagram() {
  const months = ["1月", "2月", "3月"];
  const periods = ["0", "1", "2", "3"];
  const data = [
    [100, 60, 40, 25],
    [100, 55, 35, 22],
    [100, 50, 30, 18],
  ];
  const getColor = (val: number) => {
    if (val >= 80) return "#1e40af";
    if (val >= 50) return "#2563eb";
    if (val >= 30) return "#60a5fa";
    return "#bfdbfe";
  };
  const getTextColor = (val: number) => val >= 50 ? "white" : "#334155";
  return (
    <svg viewBox="0 0 420 180" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">コホート分析（リテンション）</text>
      {/* Column headers */}
      <text x="110" y="38" textAnchor="middle" fontSize="8" fontWeight="600" fill="#64748b">獲得月</text>
      {periods.map((p, i) => (
        <text key={i} x={180 + i * 60} y="38" textAnchor="middle" fontSize="8" fontWeight="600" fill="#64748b">{p}ヶ月後</text>
      ))}
      {/* Rows */}
      {months.map((m, ri) => (
        <g key={ri}>
          <text x="110" y={62 + ri * 34} textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">{m}コホート</text>
          {data[ri].map((val, ci) => (
            <g key={ci}>
              <rect x={150 + ci * 60} y={46 + ri * 34} width="56" height="26" fill={getColor(val)} rx="4" />
              <text x={178 + ci * 60} y={63 + ri * 34} textAnchor="middle" fontSize="10" fontWeight="700" fill={getTextColor(val)}>{val}%</text>
            </g>
          ))}
        </g>
      ))}
      {/* Legend */}
      <g transform="translate(60,155)">
        {[
          { label: "高", color: "#1e40af" },
          { label: "中", color: "#60a5fa" },
          { label: "低", color: "#bfdbfe" },
        ].map((l, i) => (
          <g key={i}>
            <rect x={i * 60} y="0" width="14" height="12" fill={l.color} rx="2" />
            <text x={18 + i * 60} y="10" fontSize="8" fill="#64748b">{l.label}リテンション</text>
          </g>
        ))}
      </g>
      <text x="320" y="166" textAnchor="middle" fontSize="9" fill="#64748b">時間経過による離脱率を可視化</text>
    </svg>
  );
}

function DxStagesDiagram() {
  const stages = [
    { label: "デジタイゼーション", sub: "アナログ → デジタル化", desc: "紙の帳票を電子化", color: "#2563eb", bg: "#dbeafe" },
    { label: "デジタライゼーション", sub: "業務プロセスのデジタル化", desc: "ワークフロー自動化", color: "#f59e0b", bg: "#fef3c7" },
    { label: "DX", sub: "ビジネスモデル変革", desc: "新たな価値創出", color: "#dc2626", bg: "#fee2e2" },
  ];
  return (
    <svg viewBox="0 0 420 185" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">DX推進の3段階</text>
      <defs>
        <marker id="arrowBizDX" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#334155" />
        </marker>
      </defs>
      {/* Ascending steps */}
      {stages.map((s, i) => {
        const x = 20 + i * 135;
        const y = 110 - i * 30;
        const h = 60 + i * 30;
        return (
          <g key={i}>
            <rect x={x} y={y} width="120" height={h} fill={s.bg} rx="8" stroke={s.color} strokeWidth="2" />
            <text x={x + 60} y={y + 20} textAnchor="middle" fontSize="9" fontWeight="800" fill={s.color}>Stage {i + 1}</text>
            <text x={x + 60} y={y + 36} textAnchor="middle" fontSize="9" fontWeight="700" fill={s.color}>{s.label}</text>
            <text x={x + 60} y={y + 52} textAnchor="middle" fontSize="8" fill="#64748b">{s.sub}</text>
            <text x={x + 60} y={y + 66} textAnchor="middle" fontSize="7" fill="#94a3b8">{s.desc}</text>
          </g>
        );
      })}
      {/* Progression arrow */}
      <line x1="50" y1="175" x2="370" y2="175" stroke="#334155" strokeWidth="2" markerEnd="url(#arrowBizDX)" />
      <text x="210" y="185" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">DX推進レベル →</text>
    </svg>
  );
}

/* ================================================================
   Export map
   ================================================================ */

export const bizDiagrams: Record<string, () => ReactNode> = {
  "biz-topic-01": CrispDm,
  "biz-topic-02": KpiTree,
  "biz-topic-03": DataEthics,
  "biz-topic-04": RfmAnalysis,
  "biz-topic-05": DataGovernance,
  "biz-topic-06": MeceLogicTree,
  "biz-topic-08": PrepMethod,
  "biz-topic-09": SpuriousCorrelation,
  "biz-topic-13": AnalyticsFourStages,
  "biz-topic-21": AgileScrumDiagram,
  "biz-topic-26": AbTestDiagram,
  "biz-topic-20": BusinessFrameworksDiagram,
  "biz-topic-32": HypothesisTestingFlowDiagram,
  "biz-topic-45": CohortAnalysisDiagram,
  "biz-topic-50": DxStagesDiagram,
};
