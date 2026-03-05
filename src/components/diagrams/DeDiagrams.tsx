import type { ReactNode } from "react";

/* ================================================================
   EXISTING diagrams (moved from TopicDiagrams.tsx)
   ================================================================ */

function SqlJoins() {
  const r = 26;
  return (
    <svg viewBox="0 0 420 120" className="topic-diagram">
      <g transform="translate(10,8)">
        <text x="48" y="10" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">INNER JOIN</text>
        <circle cx="36" cy="50" r={r} fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" opacity="0.6" />
        <circle cx="62" cy="50" r={r} fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" opacity="0.6" />
        <clipPath id="clipI1"><circle cx="36" cy="50" r={r} /></clipPath>
        <circle cx="62" cy="50" r={r} fill="#16a34a" opacity="0.5" clipPath="url(#clipI1)" />
        <text x="22" y="53" textAnchor="middle" fontSize="8" fill="#2563eb">A</text>
        <text x="76" y="53" textAnchor="middle" fontSize="8" fill="#b45309">B</text>
        <text x="48" y="90" textAnchor="middle" fontSize="8" fill="#64748b">一致のみ</text>
      </g>
      <g transform="translate(112,8)">
        <text x="48" y="10" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">LEFT JOIN</text>
        <circle cx="36" cy="50" r={r} fill="#2563eb" stroke="#2563eb" strokeWidth="1.5" opacity="0.5" />
        <circle cx="62" cy="50" r={r} fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" opacity="0.4" />
        <clipPath id="clipL1"><circle cx="36" cy="50" r={r} /></clipPath>
        <circle cx="62" cy="50" r={r} fill="#16a34a" opacity="0.5" clipPath="url(#clipL1)" />
        <text x="22" y="53" textAnchor="middle" fontSize="8" fill="white">A</text>
        <text x="76" y="53" textAnchor="middle" fontSize="8" fill="#b45309">B</text>
        <text x="48" y="90" textAnchor="middle" fontSize="8" fill="#64748b">左テーブル全行</text>
      </g>
      <g transform="translate(214,8)">
        <text x="48" y="10" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">RIGHT JOIN</text>
        <circle cx="36" cy="50" r={r} fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" opacity="0.4" />
        <circle cx="62" cy="50" r={r} fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" />
        <clipPath id="clipR1"><circle cx="36" cy="50" r={r} /></clipPath>
        <circle cx="62" cy="50" r={r} fill="#16a34a" opacity="0.5" clipPath="url(#clipR1)" />
        <text x="22" y="53" textAnchor="middle" fontSize="8" fill="#2563eb">A</text>
        <text x="76" y="53" textAnchor="middle" fontSize="8" fill="white">B</text>
        <text x="48" y="90" textAnchor="middle" fontSize="8" fill="#64748b">右テーブル全行</text>
      </g>
      <g transform="translate(316,8)">
        <text x="48" y="10" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">FULL OUTER</text>
        <circle cx="36" cy="50" r={r} fill="#2563eb" stroke="#2563eb" strokeWidth="1.5" opacity="0.5" />
        <circle cx="62" cy="50" r={r} fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" />
        <clipPath id="clipF1"><circle cx="36" cy="50" r={r} /></clipPath>
        <circle cx="62" cy="50" r={r} fill="#16a34a" opacity="0.5" clipPath="url(#clipF1)" />
        <text x="48" y="90" textAnchor="middle" fontSize="8" fill="#64748b">全行</text>
      </g>
    </svg>
  );
}

function Normalization() {
  return (
    <svg viewBox="0 0 400 150" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">正規化のステップ</text>
      {[
        { label: "第1正規形", sub: "繰り返し排除", color: "#dbeafe", border: "#2563eb", x: 20 },
        { label: "第2正規形", sub: "部分従属排除", color: "#dcfce7", border: "#16a34a", x: 145 },
        { label: "第3正規形", sub: "推移従属排除", color: "#fef3c7", border: "#f59e0b", x: 270 },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="28" width="110" height="50" fill={s.color} rx="8" stroke={s.border} strokeWidth="2" />
          <text x={s.x + 55} y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">{s.label}</text>
          <text x={s.x + 55} y="66" textAnchor="middle" fontSize="9" fill="#64748b">{s.sub}</text>
          {i < 2 && <text x={s.x + 122} y="58" fontSize="16" fill="#94a3b8">→</text>}
        </g>
      ))}
      <g transform="translate(10,95)">
        <text x="0" y="0" fontSize="10" fontWeight="600" fill="#334155">ACID特性:</text>
        {["Atomicity\n(原子性)", "Consistency\n(一貫性)", "Isolation\n(分離性)", "Durability\n(耐久性)"].map((label, i) => (
          <g key={i}>
            <rect x={70 + i * 80} y={-12} width="72" height="42" fill="#f1f5f9" rx="4" stroke="#e2e8f0" strokeWidth="1" />
            <text x={70 + i * 80 + 36} y={6} textAnchor="middle" fontSize="8" fill="#334155">{label.split("\n")[0]}</text>
            <text x={70 + i * 80 + 36} y="22" textAnchor="middle" fontSize="8" fill="#64748b">{label.split("\n")[1]}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function CapTheorem() {
  return (
    <svg viewBox="0 0 400 195" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">CAP定理</text>
      <polygon points="200,38 80,148 320,148" fill="none" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="200" cy="38" r="20" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="200" y="42" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">C</text>
      <circle cx="80" cy="148" r="20" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="80" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#16a34a">A</text>
      <circle cx="320" cy="148" r="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="320" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b45309">P</text>
      <text x="235" y="34" fontSize="9" fill="#2563eb">Consistency (一貫性)</text>
      <text x="20" y="148" fontSize="9" fill="#16a34a">Availability</text>
      <text x="20" y="160" fontSize="9" fill="#16a34a">(可用性)</text>
      <text x="352" y="148" fontSize="9" fill="#b45309">Partition</text>
      <text x="352" y="160" fontSize="9" fill="#b45309">Tolerance</text>
      <text x="200" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">3つを同時に</text>
      <text x="200" y="119" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">完全には満たせない</text>
      <text x="128" y="85" textAnchor="middle" fontSize="8" fill="#64748b">CA: RDBMS</text>
      <text x="272" y="85" textAnchor="middle" fontSize="8" fill="#64748b">CP: MongoDB</text>
      <text x="200" y="185" textAnchor="middle" fontSize="9" fill="#64748b">AP: Cassandra</text>
    </svg>
  );
}

function EtlPipeline() {
  const stages = [
    { label: "Extract", sub: "抽出", color: "#dbeafe", border: "#2563eb", icon: "E" },
    { label: "Transform", sub: "変換", color: "#fef3c7", border: "#f59e0b", icon: "T" },
    { label: "Load", sub: "格納", color: "#dcfce7", border: "#16a34a", icon: "L" },
  ];
  return (
    <svg viewBox="0 0 460 155" className="topic-diagram">
      <text x="230" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">ETL パイプライン</text>
      <g transform="translate(0,22)">
        {["DB", "API", "CSV"].map((s, i) => (
          <g key={i}>
            <rect x="10" y={i * 28} width="45" height="22" fill="#f1f5f9" rx="4" stroke="#94a3b8" strokeWidth="1" />
            <text x="32" y={i * 28 + 15} textAnchor="middle" fontSize="9" fill="#64748b">{s}</text>
            <line x1="55" y1={i * 28 + 11} x2="75" y2={40} stroke="#94a3b8" strokeWidth="1" />
          </g>
        ))}
      </g>
      {stages.map((s, i) => (
        <g key={i}>
          <rect x={80 + i * 100} y="34" width="82" height="56" fill={s.color} rx="10" stroke={s.border} strokeWidth="2" />
          <text x={121 + i * 100} y="55" textAnchor="middle" fontSize="16" fontWeight="800" fill={s.border}>{s.icon}</text>
          <text x={121 + i * 100} y="72" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">{s.label}</text>
          <text x={121 + i * 100} y="84" textAnchor="middle" fontSize="8" fill="#64748b">{s.sub}</text>
          {i < 2 && <text x={162 + i * 100} y="64" fontSize="16" fill="#94a3b8">→</text>}
        </g>
      ))}
      <g>
        <line x1="365" y1="52" x2="390" y2="42" stroke="#94a3b8" strokeWidth="1" />
        <rect x="392" y="30" width="58" height="22" fill="#f1f5f9" rx="4" stroke="#94a3b8" strokeWidth="1" />
        <text x="421" y="45" textAnchor="middle" fontSize="8" fill="#64748b">DWH</text>
        <line x1="365" y1="68" x2="390" y2="78" stroke="#94a3b8" strokeWidth="1" />
        <rect x="392" y="68" width="58" height="22" fill="#f1f5f9" rx="4" stroke="#94a3b8" strokeWidth="1" />
        <text x="421" y="83" textAnchor="middle" fontSize="8" fill="#64748b">データレイク</text>
      </g>
      <text x="230" y="145" textAnchor="middle" fontSize="9" fill="#64748b">ソースから抽出 → 変換・加工 → 格納先にロード</text>
    </svg>
  );
}

function RestApi() {
  const methods = [
    { method: "GET", desc: "取得", color: "#16a34a", bg: "#dcfce7" },
    { method: "POST", desc: "作成", color: "#2563eb", bg: "#dbeafe" },
    { method: "PUT", desc: "更新", color: "#f59e0b", bg: "#fef3c7" },
    { method: "DELETE", desc: "削除", color: "#dc2626", bg: "#fee2e2" },
  ];
  return (
    <svg viewBox="0 0 400 135" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">REST API HTTP メソッド</text>
      <rect x="20" y="40" width="70" height="50" fill="#f1f5f9" rx="8" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="55" y="68" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">Client</text>
      <rect x="310" y="40" width="70" height="50" fill="#f1f5f9" rx="8" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="345" y="68" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">Server</text>
      {methods.map((m, i) => (
        <g key={i}>
          <rect x={110 + i * 48} y="30" width="44" height="22" fill={m.bg} rx="4" stroke={m.color} strokeWidth="1.5" />
          <text x={132 + i * 48} y="45" textAnchor="middle" fontSize="9" fontWeight="700" fill={m.color}>{m.method}</text>
          <text x={132 + i * 48} y="68" textAnchor="middle" fontSize="9" fill="#64748b">{m.desc}</text>
        </g>
      ))}
      <line x1="90" y1="55" x2="108" y2="42" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrowDE2)" />
      <line x1="302" y1="42" x2="310" y2="55" stroke="#94a3b8" strokeWidth="1" />
      <rect x="60" y="100" width="280" height="26" fill="#fee2e2" rx="6" stroke="#dc2626" strokeWidth="1" />
      <text x="200" y="118" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">SQLインジェクション対策 → プリペアドステートメント</text>
      <defs>
        <marker id="arrowDE2" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

function DataQuality() {
  const items = [
    { label: "重複除去", icon: "×2→×1", color: "#2563eb" },
    { label: "欠損値補完", icon: "?→値", color: "#16a34a" },
    { label: "外れ値対処", icon: "○●○", color: "#f59e0b" },
    { label: "表記ゆれ統一", icon: "A≠a→A", color: "#7c3aed" },
  ];
  return (
    <svg viewBox="0 0 400 135" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">データクレンジングの4ステップ</text>
      {items.map((item, i) => (
        <g key={i}>
          <rect x={10 + i * 98} y="28" width="90" height="60" fill="white" rx="8" stroke={item.color} strokeWidth="2" />
          <text x={55 + i * 98} y="50" textAnchor="middle" fontSize="14" fontWeight="700" fill={item.color}>{item.icon}</text>
          <text x={55 + i * 98} y="72" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">{item.label}</text>
          {i < 3 && <text x={100 + i * 98} y="63" fontSize="14" fill="#94a3b8">→</text>}
        </g>
      ))}
      <rect x="50" y="102" width="300" height="22" fill="#fee2e2" rx="4" />
      <text x="200" y="117" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">GIGO: Garbage In, Garbage Out（品質が低い→結果も不正確）</text>
    </svg>
  );
}

function PythonBasics() {
  return (
    <svg viewBox="0 0 400 140" className="topic-diagram">
      <g>
        <rect x="15" y="10" width="105" height="55" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="8" />
        <text x="67" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">変数</text>
        <text x="67" y="48" textAnchor="middle" fontSize="9" fill="#334155" fontFamily="monospace">x = 10</text>
      </g>
      <text x="135" y="42" fontSize="16" fill="#64748b">→</text>
      <g>
        <rect x="150" y="10" width="105" height="55" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="8" />
        <text x="202" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a">リスト</text>
        <text x="202" y="48" textAnchor="middle" fontSize="9" fill="#334155" fontFamily="monospace">[1, 2, 3]</text>
      </g>
      <text x="270" y="42" fontSize="16" fill="#64748b">→</text>
      <g>
        <rect x="285" y="10" width="105" height="55" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" rx="8" />
        <text x="337" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">関数</text>
        <text x="337" y="48" textAnchor="middle" fontSize="9" fill="#334155" fontFamily="monospace">def f(x):</text>
      </g>
      <rect x="15" y="80" width="375" height="48" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="6" />
      <text x="200" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748b">主要ライブラリ</text>
      {["NumPy", "pandas", "scikit-learn", "matplotlib"].map((lib, i) => (
        <g key={i}>
          <rect x={30 + i * 90} y="105" width="75" height="18" fill="#dbeafe" rx="9" />
          <text x={67 + i * 90} y="118" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">{lib}</text>
        </g>
      ))}
    </svg>
  );
}

function CloudStack() {
  const layers = [
    { name: "SaaS", desc: "Gmail, Slack", color: "#16a34a", bg: "#dcfce7", managed: 5 },
    { name: "PaaS", desc: "App Engine", color: "#2563eb", bg: "#dbeafe", managed: 3 },
    { name: "IaaS", desc: "EC2, GCE", color: "#9333ea", bg: "#f3e8ff", managed: 1 },
  ];
  const items = ["アプリ", "データ", "ランタイム", "OS", "インフラ"];
  return (
    <svg viewBox="0 0 400 165" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">クラウドサービスの管理範囲</text>
      {layers.map((l, i) => (
        <g key={i}>
          <rect x={130 + i * 90} y="24" width="80" height="22" fill={l.bg} stroke={l.color} strokeWidth="1.5" rx="4" />
          <text x={170 + i * 90} y="39" textAnchor="middle" fontSize="10" fontWeight="700" fill={l.color}>{l.name}</text>
        </g>
      ))}
      {items.map((item, ri) => {
        const y = 54 + ri * 22;
        return (
          <g key={ri}>
            <text x="65" y={y + 15} textAnchor="middle" fontSize="9" fill="#334155">{item}</text>
            {layers.map((l, ci) => {
              const managed = ri < l.managed;
              return (
                <rect key={ci} x={130 + ci * 90} y={y} width="80" height="20"
                  fill={managed ? l.bg : "#fee2e2"} stroke="#e2e8f0" strokeWidth="0.5" />
              );
            })}
          </g>
        );
      })}
      <rect x="130" y="148" width="12" height="10" fill="#dcfce7" stroke="#e2e8f0" strokeWidth="0.5" />
      <text x="147" y="157" fontSize="8" fill="#64748b">提供者が管理</text>
      <rect x="230" y="148" width="12" height="10" fill="#fee2e2" stroke="#e2e8f0" strokeWidth="0.5" />
      <text x="247" y="157" fontSize="8" fill="#64748b">利用者が管理</text>
    </svg>
  );
}

function StarSchema() {
  return (
    <svg viewBox="0 0 400 180" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">スタースキーマ</text>
      <rect x="145" y="65" width="110" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" rx="8" />
      <text x="200" y="85" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">ファクト表</text>
      <text x="200" y="100" textAnchor="middle" fontSize="8" fill="#64748b">売上データ</text>
      {[
        { x: 15, y: 20, label: "商品" },
        { x: 285, y: 20, label: "日付" },
        { x: 15, y: 120, label: "店舗" },
        { x: 285, y: 120, label: "顧客" },
      ].map((dim, i) => (
        <g key={i}>
          <rect x={dim.x} y={dim.y} width="95" height="40" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="6" />
          <text x={dim.x + 47} y={dim.y + 25} textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">{dim.label}Dim</text>
          <line
            x1={dim.x + (dim.x < 200 ? 95 : 0)}
            y1={dim.y + 20}
            x2={dim.x < 200 ? 145 : 255}
            y2={dim.y < 90 ? 75 : 105}
            stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,2"
          />
        </g>
      ))}
      <text x="200" y="175" textAnchor="middle" fontSize="9" fill="#64748b">中心にファクト表、周囲にディメンション表を配置</text>
    </svg>
  );
}

/* ================================================================
   NEW diagrams
   ================================================================ */

function DockerContainerDiagram() {
  return (
    <svg viewBox="0 0 420 200" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">仮想マシン vs コンテナ</text>
      {/* --- Left: VM --- */}
      <g transform="translate(10,24)">
        <text x="95" y="10" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">仮想マシン（重い）</text>
        {/* Hardware */}
        <rect x="0" y="130" width="190" height="24" fill="#f1f5f9" rx="4" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="95" y="146" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">ハードウェア</text>
        {/* Host OS */}
        <rect x="0" y="104" width="190" height="24" fill="#e2e8f0" rx="4" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="95" y="120" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">Host OS</text>
        {/* Hypervisor */}
        <rect x="0" y="78" width="190" height="24" fill="#dbeafe" rx="4" stroke="#2563eb" strokeWidth="1.5" />
        <text x="95" y="94" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">ハイパーバイザー</text>
        {/* 3 VMs */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={4 + i * 63} y="18" width="58" height="58" fill="#fee2e2" rx="4" stroke="#dc2626" strokeWidth="1" />
            <text x={33 + i * 63} y="38" textAnchor="middle" fontSize="7" fontWeight="600" fill="#dc2626">Guest OS</text>
            <rect x={10 + i * 63} y="42" width="46" height="18" fill="#fef3c7" rx="3" stroke="#f59e0b" strokeWidth="1" />
            <text x={33 + i * 63} y="55" textAnchor="middle" fontSize="8" fontWeight="600" fill="#b45309">App</text>
          </g>
        ))}
      </g>
      {/* --- Right: Container --- */}
      <g transform="translate(220,24)">
        <text x="95" y="10" textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">コンテナ（軽い）</text>
        {/* Hardware */}
        <rect x="0" y="130" width="190" height="24" fill="#f1f5f9" rx="4" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="95" y="146" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">ハードウェア</text>
        {/* Host OS */}
        <rect x="0" y="104" width="190" height="24" fill="#e2e8f0" rx="4" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="95" y="120" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">Host OS</text>
        {/* Container Engine */}
        <rect x="0" y="78" width="190" height="24" fill="#dcfce7" rx="4" stroke="#16a34a" strokeWidth="1.5" />
        <text x="95" y="94" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">コンテナエンジン</text>
        {/* 3 Containers (no Guest OS) */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={4 + i * 63} y="42" width="58" height="34" fill="#dcfce7" rx="4" stroke="#16a34a" strokeWidth="1" />
            <text x={33 + i * 63} y="64" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">App</text>
          </g>
        ))}
      </g>
      <text x="210" y="192" textAnchor="middle" fontSize="9" fill="#64748b">コンテナはGuest OS不要で起動が速く軽量</text>
    </svg>
  );
}

function CiCdPipelineDiagram() {
  const stages = [
    { label: "コード", color: "#dbeafe", border: "#2563eb" },
    { label: "ビルド", color: "#e0e7ff", border: "#4f46e5" },
    { label: "テスト", color: "#dcfce7", border: "#16a34a" },
    { label: "ステージング", color: "#fef3c7", border: "#f59e0b" },
    { label: "本番デプロイ", color: "#fee2e2", border: "#dc2626" },
  ];
  return (
    <svg viewBox="0 0 420 150" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">CI/CD パイプライン</text>
      {/* Stage boxes */}
      {stages.map((s, i) => (
        <g key={i}>
          <rect x={10 + i * 82} y="50" width="72" height="40" fill={s.color} rx="8" stroke={s.border} strokeWidth="2" />
          <text x={46 + i * 82} y="74" textAnchor="middle" fontSize="9" fontWeight="700" fill={s.border}>{s.label}</text>
          {i < 4 && (
            <text x={82 + i * 82} y="74" fontSize="14" fill="#94a3b8">→</text>
          )}
        </g>
      ))}
      {/* CI bracket */}
      <line x1="10" y1="100" x2="256" y2="100" stroke="#2563eb" strokeWidth="1.5" />
      <line x1="10" y1="95" x2="10" y2="100" stroke="#2563eb" strokeWidth="1.5" />
      <line x1="256" y1="95" x2="256" y2="100" stroke="#2563eb" strokeWidth="1.5" />
      <text x="133" y="115" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2563eb">CI（継続的インテグレーション）</text>
      {/* CD bracket */}
      <line x1="174" y1="130" x2="410" y2="130" stroke="#dc2626" strokeWidth="1.5" />
      <line x1="174" y1="125" x2="174" y2="130" stroke="#dc2626" strokeWidth="1.5" />
      <line x1="410" y1="125" x2="410" y2="130" stroke="#dc2626" strokeWidth="1.5" />
      <text x="292" y="145" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">CD（継続的デリバリー）</text>
      {/* Top labels */}
      <text x="46" y="40" textAnchor="middle" fontSize="8" fill="#64748b">開発者</text>
      <text x="374" y="40" textAnchor="middle" fontSize="8" fill="#64748b">本番環境</text>
    </svg>
  );
}

function ErDiagramBasic() {
  return (
    <svg viewBox="0 0 420 180" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">ER図（Entity-Relationship Diagram）</text>
      {/* Customer entity */}
      <g>
        <rect x="10" y="40" width="110" height="70" fill="#dbeafe" rx="6" stroke="#2563eb" strokeWidth="2" />
        <rect x="10" y="40" width="110" height="22" fill="#2563eb" rx="6" />
        <rect x="10" y="52" width="110" height="10" fill="#2563eb" />
        <text x="65" y="56" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">顧客</text>
        <text x="20" y="78" fontSize="8" fill="#334155" fontWeight="600">PK 顧客ID</text>
        <text x="20" y="92" fontSize="8" fill="#64748b">名前</text>
        <line x1="10" y1="82" x2="120" y2="82" stroke="#e2e8f0" strokeWidth="0.5" />
      </g>
      {/* Order entity */}
      <g>
        <rect x="155" y="40" width="110" height="85" fill="#dcfce7" rx="6" stroke="#16a34a" strokeWidth="2" />
        <rect x="155" y="40" width="110" height="22" fill="#16a34a" rx="6" />
        <rect x="155" y="52" width="110" height="10" fill="#16a34a" />
        <text x="210" y="56" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">注文</text>
        <text x="165" y="78" fontSize="8" fill="#334155" fontWeight="600">PK 注文ID</text>
        <text x="165" y="92" fontSize="8" fill="#64748b">日付</text>
        <text x="165" y="106" fontSize="8" fill="#64748b">金額</text>
        <line x1="155" y1="82" x2="265" y2="82" stroke="#e2e8f0" strokeWidth="0.5" />
      </g>
      {/* Product entity */}
      <g>
        <rect x="300" y="40" width="110" height="70" fill="#fef3c7" rx="6" stroke="#f59e0b" strokeWidth="2" />
        <rect x="300" y="40" width="110" height="22" fill="#f59e0b" rx="6" />
        <rect x="300" y="52" width="110" height="10" fill="#f59e0b" />
        <text x="355" y="56" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">商品</text>
        <text x="310" y="78" fontSize="8" fill="#334155" fontWeight="600">PK 商品ID</text>
        <text x="310" y="92" fontSize="8" fill="#64748b">商品名</text>
        <line x1="300" y1="82" x2="410" y2="82" stroke="#e2e8f0" strokeWidth="0.5" />
      </g>
      {/* Relationship line: Customer 1:N Order */}
      <line x1="120" y1="75" x2="155" y2="75" stroke="#334155" strokeWidth="2" />
      <text x="123" y="70" fontSize="9" fontWeight="700" fill="#2563eb">1</text>
      <text x="146" y="70" fontSize="9" fontWeight="700" fill="#16a34a">N</text>
      {/* Relationship line: Order M:N Product */}
      <line x1="265" y1="75" x2="300" y2="75" stroke="#334155" strokeWidth="2" />
      <text x="268" y="70" fontSize="9" fontWeight="700" fill="#16a34a">M</text>
      <text x="291" y="70" fontSize="9" fontWeight="700" fill="#f59e0b">N</text>
      {/* Relationship labels */}
      <rect x="120" y="140" width="80" height="22" fill="#f1f5f9" rx="4" stroke="#e2e8f0" strokeWidth="1" />
      <text x="160" y="155" textAnchor="middle" fontSize="8" fontWeight="600" fill="#334155">1人→複数注文</text>
      <rect x="230" y="140" width="80" height="22" fill="#f1f5f9" rx="4" stroke="#e2e8f0" strokeWidth="1" />
      <text x="270" y="155" textAnchor="middle" fontSize="8" fontWeight="600" fill="#334155">注文⇔商品</text>
      <text x="210" y="175" textAnchor="middle" fontSize="9" fill="#64748b">PK = 主キー / 1:N = 一対多 / M:N = 多対多</text>
    </svg>
  );
}

function LakehouseArchitectureDiagram() {
  const cols = [
    {
      label: "DWH",
      sub: "構造化のみ",
      color: "#2563eb",
      bg: "#dbeafe",
      layers: ["構造化DB", "SQLエンジン", "BI分析"],
    },
    {
      label: "Data Lake",
      sub: "生データ",
      color: "#16a34a",
      bg: "#dcfce7",
      layers: ["オブジェクト\nストレージ", "Spark等", "ML/探索"],
    },
    {
      label: "Lakehouse",
      sub: "両方の利点",
      color: "#b45309",
      bg: "#fef3c7",
      layers: ["統合\nストレージ", "統合エンジン", "BI + ML"],
    },
  ];
  const layerLabels = ["Storage", "Processing", "Analytics"];
  return (
    <svg viewBox="0 0 420 210" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">データレイクハウス・アーキテクチャ</text>
      {/* Layer labels on left */}
      {layerLabels.map((ll, i) => (
        <text key={i} x="10" y={62 + i * 48} fontSize="8" fontWeight="600" fill="#64748b">{ll}</text>
      ))}
      {/* Columns */}
      {cols.map((col, ci) => {
        const x = 70 + ci * 120;
        return (
          <g key={ci}>
            {/* Header */}
            <rect x={x} y="24" width="105" height="24" fill={col.bg} rx="6" stroke={col.color} strokeWidth="2" />
            <text x={x + 52} y="40" textAnchor="middle" fontSize="10" fontWeight="700" fill={col.color}>{col.label}</text>
            {/* Layers */}
            {col.layers.map((layer, li) => (
              <g key={li}>
                <rect x={x} y={52 + li * 48} width="105" height="36" fill={col.bg} rx="4" stroke={col.color} strokeWidth="1" opacity="0.7" />
                <text x={x + 52} y={74 + li * 48} textAnchor="middle" fontSize="9" fontWeight="600" fill={col.color}>
                  {layer.split("\n")[0]}
                </text>
                {layer.includes("\n") && (
                  <text x={x + 52} y={84 + li * 48} textAnchor="middle" fontSize="8" fill={col.color}>
                    {layer.split("\n")[1]}
                  </text>
                )}
              </g>
            ))}
            {/* Sub label */}
            <text x={x + 52} y="200" textAnchor="middle" fontSize="8" fill={col.color}>{col.sub}</text>
          </g>
        );
      })}
      {/* Merge arrows to Lakehouse */}
      <text x="168" y="36" fontSize="12" fill="#94a3b8">+</text>
      <text x="288" y="36" fontSize="12" fill="#94a3b8">=</text>
      <text x="210" y="192" textAnchor="middle" fontSize="9" fill="#64748b">DWHの信頼性 + Data Lakeの柔軟性 = レイクハウス</text>
    </svg>
  );
}

function MessageQueueDiagram() {
  return (
    <svg viewBox="0 0 420 170" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">メッセージキュー</text>
      <defs>
        <marker id="arrowMQ" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
      {/* Producers */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="10" y={30 + i * 40} width="72" height="30" fill="#dbeafe" rx="6" stroke="#2563eb" strokeWidth="1.5" />
          <text x="46" y={49 + i * 40} textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">Producer {i + 1}</text>
          <line x1="82" y1={45 + i * 40} x2="130" y2="80" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowMQ)" />
        </g>
      ))}
      {/* Queue */}
      <rect x="135" y="55" width="150" height="50" fill="#fef3c7" rx="8" stroke="#f59e0b" strokeWidth="2" />
      <text x="210" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">Queue</text>
      {/* Queue items – individual labels centered in each rect */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={145 + i * 27} y="82" width="22" height="14" fill="#fde68a" rx="2" stroke="#f59e0b" strokeWidth="1" />
          <text x={156 + i * 27} y="93" textAnchor="middle" fontSize="7" fill="#b45309">msg</text>
        </g>
      ))}
      {/* Consumers */}
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x="338" y={42 + i * 46} width="72" height="30" fill="#dcfce7" rx="6" stroke="#16a34a" strokeWidth="1.5" />
          <text x="374" y={61 + i * 46} textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">Consumer {i + 1}</text>
          <line x1="285" y1="80" x2="335" y2={57 + i * 46} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowMQ)" />
        </g>
      ))}
      {/* Labels */}
      <rect x="80" y="130" width="90" height="20" fill="#e0e7ff" rx="4" />
      <text x="125" y="144" textAnchor="middle" fontSize="9" fontWeight="600" fill="#4f46e5">非同期処理</text>
      <rect x="250" y="130" width="90" height="20" fill="#fce7f3" rx="4" />
      <text x="295" y="144" textAnchor="middle" fontSize="9" fontWeight="600" fill="#be185d">疎結合</text>
      <text x="210" y="166" textAnchor="middle" fontSize="9" fill="#64748b">ProducerとConsumerが独立して動作（例: Kafka, RabbitMQ）</text>
    </svg>
  );
}

function GitBranchDiagram() {
  return (
    <svg viewBox="0 0 420 140" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">Git分岐とマージ</text>
      <defs>
        <marker id="arrowGit" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
      {/* Main branch line */}
      <line x1="30" y1="50" x2="390" y2="50" stroke="#2563eb" strokeWidth="2.5" />
      <text x="30" y="38" fontSize="10" fontWeight="700" fill="#2563eb">main</text>
      {/* Main branch commits */}
      {[60, 120, 300, 360].map((cx, i) => (
        <circle key={i} cx={cx} cy={50} r="7" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      ))}
      {/* Feature branch */}
      <line x1="120" y1="50" x2="160" y2="90" stroke="#16a34a" strokeWidth="2" />
      <line x1="160" y1="90" x2="260" y2="90" stroke="#16a34a" strokeWidth="2.5" />
      <line x1="260" y1="90" x2="300" y2="50" stroke="#16a34a" strokeWidth="2" />
      <text x="160" y="115" fontSize="10" fontWeight="700" fill="#16a34a">feature</text>
      {/* Feature branch commits */}
      {[190, 230].map((cx, i) => (
        <circle key={i} cx={cx} cy={90} r="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      ))}
      {/* Merge point */}
      <circle cx={300} cy={50} r="9" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="300" y="38" fontSize="9" fontWeight="700" fill="#b45309">merge</text>
      {/* Labels */}
      <text x="60" y="70" textAnchor="middle" fontSize="7" fill="#64748b">commit</text>
      <text x="120" y="70" textAnchor="middle" fontSize="7" fill="#64748b">分岐点</text>
      <text x="190" y="80" textAnchor="middle" fontSize="7" fill="#64748b">c1</text>
      <text x="230" y="80" textAnchor="middle" fontSize="7" fill="#64748b">c2</text>
      <text x="210" y="135" textAnchor="middle" fontSize="9" fill="#64748b">featureブランチで作業後、mainにマージ</text>
    </svg>
  );
}

function CiaTriangleDiagram() {
  const cx = 200, cy = 95;
  return (
    <svg viewBox="0 0 400 190" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">CIA三原則（情報セキュリティ）</text>
      {/* Triangle */}
      <polygon points="200,35 80,155 320,155" fill="none" stroke="#e2e8f0" strokeWidth="2" />
      {/* C vertex - top */}
      <circle cx="200" cy="35" r="22" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="200" y="33" textAnchor="middle" fontSize="16" fontWeight="800" fill="#2563eb">C</text>
      <text x="200" y="46" textAnchor="middle" fontSize="6" fontWeight="600" fill="#2563eb">機密性</text>
      <text x="248" y="30" fontSize="8" fill="#2563eb">Confidentiality</text>
      <text x="248" y="42" fontSize="8" fill="#64748b">許可された人のみアクセス</text>
      {/* I vertex - bottom left */}
      <circle cx="80" cy="155" r="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="80" y="153" textAnchor="middle" fontSize="16" fontWeight="800" fill="#16a34a">I</text>
      <text x="80" y="166" textAnchor="middle" fontSize="6" fontWeight="600" fill="#16a34a">完全性</text>
      <text x="18" y="148" fontSize="8" fill="#16a34a" textAnchor="end">Integrity</text>
      <text x="18" y="160" fontSize="8" fill="#64748b" textAnchor="end">改ざんされない</text>
      {/* A vertex - bottom right */}
      <circle cx="320" cy="155" r="22" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="320" y="153" textAnchor="middle" fontSize="16" fontWeight="800" fill="#b45309">A</text>
      <text x="320" y="166" textAnchor="middle" fontSize="6" fontWeight="600" fill="#b45309">可用性</text>
      <text x="360" y="148" fontSize="8" fill="#b45309">Availability</text>
      <text x="360" y="160" fontSize="8" fill="#64748b">必要時にアクセス可能</text>
      {/* Center text */}
      <text x={cx} y={cy} textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">情報</text>
      <text x={cx} y={cy + 13} textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">セキュリティ</text>
      <text x="200" y="185" textAnchor="middle" fontSize="9" fill="#64748b">3つをバランスよく確保することが重要</text>
    </svg>
  );
}

function NoSqlTypesDiagram() {
  const types = [
    { label: "キーバリュー型", example: "Redis", desc: "key → value", color: "#2563eb", bg: "#dbeafe", x: 10, y: 30 },
    { label: "ドキュメント型", example: "MongoDB", desc: "{ JSON }", color: "#16a34a", bg: "#dcfce7", x: 215, y: 30 },
    { label: "カラム型", example: "Cassandra", desc: "列グループ", color: "#f59e0b", bg: "#fef3c7", x: 10, y: 100 },
    { label: "グラフ型", example: "Neo4j", desc: "○─○─○", color: "#9333ea", bg: "#f3e8ff", x: 215, y: 100 },
  ];
  return (
    <svg viewBox="0 0 420 185" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">NoSQLの種類</text>
      {types.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={t.y} width="195" height="58" fill={t.bg} rx="8" stroke={t.color} strokeWidth="2" />
          <text x={t.x + 97} y={t.y + 20} textAnchor="middle" fontSize="10" fontWeight="700" fill={t.color}>{t.label}</text>
          <text x={t.x + 97} y={t.y + 35} textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">{t.desc}</text>
          <text x={t.x + 97} y={t.y + 50} textAnchor="middle" fontSize="9" fill="#64748b">例: {t.example}</text>
        </g>
      ))}
      <rect x="80" y="166" width="260" height="18" fill="#f1f5f9" rx="4" />
      <text x="210" y="179" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748b">CAP定理に基づく選択</text>
    </svg>
  );
}

function StructuredVsUnstructuredDiagram() {
  return (
    <svg viewBox="0 0 420 185" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">構造化 vs 非構造化データ</text>
      {/* Structured */}
      <g>
        <rect x="10" y="30" width="120" height="105" fill="#dbeafe" rx="8" stroke="#2563eb" strokeWidth="2" />
        <text x="70" y="48" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">構造化データ</text>
        {/* Mini table */}
        {[0, 1, 2].map((row) => (
          <g key={row}>
            {[0, 1, 2].map((col) => (
              <rect key={col} x={22 + col * 32} y={58 + row * 18} width="30" height="16" fill={row === 0 ? "#93c5fd" : "white"} stroke="#2563eb" strokeWidth="0.8" rx="1" />
            ))}
          </g>
        ))}
        <text x="70" y="69" textAnchor="middle" fontSize="6" fill="white" fontWeight="600">ID | 名前 | 値</text>
        <text x="70" y="120" textAnchor="middle" fontSize="8" fill="#64748b">RDB, CSV</text>
      </g>
      {/* Semi-structured */}
      <g>
        <rect x="150" y="30" width="120" height="105" fill="#fef3c7" rx="8" stroke="#f59e0b" strokeWidth="2" />
        <text x="210" y="48" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">半構造化</text>
        <text x="210" y="68" textAnchor="middle" fontSize="9" fill="#334155" fontFamily="monospace">{"{"}</text>
        <text x="210" y="80" textAnchor="middle" fontSize="8" fill="#334155" fontFamily="monospace">"name": "太郎"</text>
        <text x="210" y="92" textAnchor="middle" fontSize="8" fill="#334155" fontFamily="monospace">"age": 25</text>
        <text x="210" y="104" textAnchor="middle" fontSize="9" fill="#334155" fontFamily="monospace">{"}"}</text>
        <text x="210" y="120" textAnchor="middle" fontSize="8" fill="#64748b">JSON, XML</text>
      </g>
      {/* Unstructured */}
      <g>
        <rect x="290" y="30" width="120" height="105" fill="#fee2e2" rx="8" stroke="#dc2626" strokeWidth="2" />
        <text x="350" y="48" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">非構造化</text>
        {/* Icons for text, image, audio */}
        <rect x="302" y="58" width="28" height="20" fill="#f1f5f9" rx="3" stroke="#94a3b8" strokeWidth="0.8" />
        <text x="316" y="72" textAnchor="middle" fontSize="7" fill="#64748b">TEXT</text>
        <rect x="336" y="58" width="28" height="20" fill="#f1f5f9" rx="3" stroke="#94a3b8" strokeWidth="0.8" />
        <text x="350" y="72" textAnchor="middle" fontSize="7" fill="#64748b">IMG</text>
        <rect x="370" y="58" width="28" height="20" fill="#f1f5f9" rx="3" stroke="#94a3b8" strokeWidth="0.8" />
        <text x="384" y="72" textAnchor="middle" fontSize="7" fill="#64748b">音声</text>
        <rect x="302" y="84" width="28" height="20" fill="#f1f5f9" rx="3" stroke="#94a3b8" strokeWidth="0.8" />
        <text x="316" y="98" textAnchor="middle" fontSize="7" fill="#64748b">動画</text>
        <rect x="336" y="84" width="28" height="20" fill="#f1f5f9" rx="3" stroke="#94a3b8" strokeWidth="0.8" />
        <text x="350" y="98" textAnchor="middle" fontSize="7" fill="#64748b">SNS</text>
        <rect x="370" y="84" width="28" height="20" fill="#f1f5f9" rx="3" stroke="#94a3b8" strokeWidth="0.8" />
        <text x="384" y="98" textAnchor="middle" fontSize="7" fill="#64748b">IoT</text>
        <text x="350" y="120" textAnchor="middle" fontSize="8" fill="#64748b">テキスト, 画像, 音声</text>
      </g>
      {/* Bottom bar */}
      <rect x="30" y="148" width="360" height="24" fill="#fee2e2" rx="6" stroke="#dc2626" strokeWidth="1.5" />
      <text x="210" y="165" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">世界のデータの80%以上が非構造化データ</text>
    </svg>
  );
}

function FlowchartSymbolsDiagram() {
  return (
    <svg viewBox="0 0 420 220" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">フローチャート記号</text>
      {/* Symbols row */}
      {/* Oval - Start/End */}
      <g>
        <ellipse cx="55" cy="45" rx="40" ry="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="55" y="49" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">開始/終了</text>
        <text x="55" y="72" textAnchor="middle" fontSize="8" fill="#64748b">楕円</text>
      </g>
      {/* Rectangle - Process */}
      <g>
        <rect x="120" y="30" width="80" height="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="2" />
        <text x="160" y="49" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">処理</text>
        <text x="160" y="72" textAnchor="middle" fontSize="8" fill="#64748b">長方形</text>
      </g>
      {/* Diamond - Decision */}
      <g>
        <polygon points="265,30 305,45 265,60 225,45" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="265" y="49" textAnchor="middle" fontSize="8" fontWeight="600" fill="#b45309">条件分岐</text>
        <text x="265" y="72" textAnchor="middle" fontSize="8" fill="#64748b">ひし形</text>
      </g>
      {/* Parallelogram - I/O */}
      <g>
        <polygon points="345,30 405,30 395,60 335,60" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
        <text x="370" y="49" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">入出力</text>
        <text x="370" y="72" textAnchor="middle" fontSize="8" fill="#64748b">平行四辺形</text>
      </g>
      {/* Example flowchart */}
      <text x="210" y="95" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">例: 正負判定フロー</text>
      <defs>
        <marker id="arrowFC" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
      {/* Start */}
      <ellipse cx="55" cy="130" rx="32" ry="13" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="55" y="134" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">開始</text>
      <line x1="87" y1="130" x2="108" y2="130" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowFC)" />
      {/* Input */}
      <polygon points="125,118 185,118 178,142 118,142" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="152" y="134" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">数値入力</text>
      <line x1="185" y1="130" x2="206" y2="130" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowFC)" />
      {/* Decision */}
      <polygon points="250,112 290,130 250,148 210,130" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="250" y="134" textAnchor="middle" fontSize="8" fontWeight="600" fill="#b45309">&gt;0?</text>
      {/* Yes path */}
      <line x1="290" y1="130" x2="315" y2="130" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowFC)" />
      <text x="302" y="125" fontSize="8" fill="#16a34a" fontWeight="600">Yes</text>
      <rect x="318" y="118" width="42" height="24" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="2" />
      <text x="339" y="134" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">正</text>
      <line x1="360" y1="130" x2="375" y2="130" stroke="#94a3b8" strokeWidth="1" />
      {/* No path */}
      <line x1="250" y1="148" x2="250" y2="168" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowFC)" />
      <text x="260" y="162" fontSize="8" fill="#dc2626" fontWeight="600">No</text>
      <rect x="229" y="170" width="42" height="24" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="2" />
      <text x="250" y="186" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">負</text>
      <line x1="271" y1="182" x2="375" y2="182" stroke="#94a3b8" strokeWidth="1" />
      {/* Merge and End */}
      <line x1="375" y1="130" x2="375" y2="182" stroke="#94a3b8" strokeWidth="1" />
      <line x1="375" y1="156" x2="395" y2="156" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowFC)" />
      <ellipse cx="410" cy="156" rx="5" ry="5" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="210" y="212" textAnchor="middle" fontSize="9" fill="#64748b">JIS X 0121 に準拠した基本記号</text>
    </svg>
  );
}

function AlgorithmComplexityDiagram() {
  /* Approximate curves for visualization */
  const maxN = 50, maxY = 130, chartX = 60, chartY = 25, chartW = 300, chartH = 130;
  const scaleX = (n: number) => chartX + (n / maxN) * chartW;
  const scaleY = (v: number) => chartY + chartH - Math.min(v, maxY) / maxY * chartH;

  const curves: { label: string; color: string; points: string }[] = [
    {
      label: "O(1)",
      color: "#16a34a",
      points: Array.from({ length: 50 }, (_, i) => {
        const n = i + 1;
        return `${scaleX(n)},${scaleY(5)}`;
      }).join(" "),
    },
    {
      label: "O(log n)",
      color: "#2563eb",
      points: Array.from({ length: 50 }, (_, i) => {
        const n = i + 1;
        return `${scaleX(n)},${scaleY(Math.log2(n) * 5)}`;
      }).join(" "),
    },
    {
      label: "O(n)",
      color: "#f59e0b",
      points: Array.from({ length: 50 }, (_, i) => {
        const n = i + 1;
        return `${scaleX(n)},${scaleY(n * 2.2)}`;
      }).join(" "),
    },
    {
      label: "O(n log n)",
      color: "#9333ea",
      points: Array.from({ length: 50 }, (_, i) => {
        const n = i + 1;
        return `${scaleX(n)},${scaleY(n * Math.log2(n) * 0.5)}`;
      }).join(" "),
    },
    {
      label: "O(n²)",
      color: "#dc2626",
      points: Array.from({ length: 50 }, (_, i) => {
        const n = i + 1;
        return `${scaleX(n)},${scaleY((n * n) * 0.05)}`;
      }).join(" "),
    },
  ];

  return (
    <svg viewBox="0 0 420 220" className="topic-diagram">
      <text x="210" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">計算量（オーダー記法）</text>
      {/* Axes */}
      <line x1={chartX} y1={chartY} x2={chartX} y2={chartY + chartH} stroke="#334155" strokeWidth="1.5" />
      <line x1={chartX} y1={chartY + chartH} x2={chartX + chartW} y2={chartY + chartH} stroke="#334155" strokeWidth="1.5" />
      <text x={chartX + chartW / 2} y={chartY + chartH + 16} textAnchor="middle" fontSize="9" fill="#334155">データ数 (n)</text>
      <text x={chartX - 18} y={chartY + chartH / 2} textAnchor="middle" fontSize="8" fill="#334155" transform={`rotate(-90,${chartX - 18},${chartY + chartH / 2})`}>処理時間</text>
      {/* Curves */}
      {curves.map((c, i) => (
        <polyline key={i} points={c.points} fill="none" stroke={c.color} strokeWidth="2" />
      ))}
      {/* Legend – placed below chart in a horizontal row */}
      {curves.map((c, i) => (
        <g key={i}>
          <line x1={30 + i * 80} y1="178" x2={48 + i * 80} y2="178" stroke={c.color} strokeWidth="2" />
          <text x={52 + i * 80} y="182" fontSize="8" fontWeight="600" fill={c.color}>{c.label}</text>
        </g>
      ))}
      {/* Annotation */}
      <rect x="80" y="194" width="260" height="20" fill="#fee2e2" rx="4" />
      <text x="210" y="208" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">n=10,000: O(n)=1万回 / O(n²)=1億回</text>
    </svg>
  );
}

/* ================================================================
   Export map
   ================================================================ */

export const deDiagrams: Record<string, () => ReactNode> = {
  "de-topic-01": SqlJoins,
  "de-topic-02": Normalization,
  "de-topic-03": CapTheorem,
  "de-topic-04": EtlPipeline,
  "de-topic-05": RestApi,
  "de-topic-06": DataQuality,
  "de-topic-07": PythonBasics,
  "de-topic-10": CloudStack,
  "de-topic-27": StarSchema,
  "de-topic-13": DockerContainerDiagram,
  "de-topic-15": CiCdPipelineDiagram,
  "de-topic-21": ErDiagramBasic,
  "de-topic-29": LakehouseArchitectureDiagram,
  "de-topic-33": MessageQueueDiagram,
  "de-topic-11": GitBranchDiagram,
  "de-topic-20": CiaTriangleDiagram,
  "de-topic-26": NoSqlTypesDiagram,
  "de-topic-51": StructuredVsUnstructuredDiagram,
  "de-topic-53": FlowchartSymbolsDiagram,
  "de-topic-54": AlgorithmComplexityDiagram,
};
