import type { ReactNode } from "react";

/* ================================================================
   EXISTING diagrams (moved from TopicDiagrams.tsx)
   ================================================================ */

function NormalDistribution() {
  const points: [number, number][] = [];
  for (let x = -3.5; x <= 3.5; x += 0.1) {
    const y = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    points.push([x, y]);
  }
  const cx = 200, cy = 130, sx = 50, sy = -280;
  const path = points.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${cx + x * sx},${cy + y * sy}`
  ).join(" ");

  return (
    <svg viewBox="0 0 400 180" className="topic-diagram">
      <path d={`${path} L${cx + 3.5 * sx},${cy} L${cx - 3.5 * sx},${cy} Z`} fill="#dbeafe" opacity="0.5" />
      <path d={`M${cx - sx},${cy} ${points.filter(([x]) => x >= -1 && x <= 1).map(([x, y]) => `L${cx + x * sx},${cy + y * sy}`).join(" ")} L${cx + sx},${cy} Z`} fill="#93c5fd" opacity="0.6" />
      <path d={path} fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <line x1="20" y1={cy} x2="380" y2={cy} stroke="#64748b" strokeWidth="1" />
      {[-3, -2, -1, 0, 1, 2, 3].map(s => (
        <g key={s}>
          <line x1={cx + s * sx} y1={cy - 4} x2={cx + s * sx} y2={cy + 4} stroke="#64748b" strokeWidth="1" />
          <text x={cx + s * sx} y={cy + 18} textAnchor="middle" fontSize="11" fill="#334155">
            {s === 0 ? "μ" : `${s > 0 ? "+" : ""}${s}σ`}
          </text>
        </g>
      ))}
      <text x={cx} y={cy - 105} textAnchor="middle" fontSize="12" fontWeight="600" fill="#2563eb">68.3%</text>
      <line x1={cx - sx} y1={cy - 95} x2={cx + sx} y2={cy - 95} stroke="#2563eb" strokeWidth="1.5" />
      <line x1={cx - sx} y1={cy - 100} x2={cx - sx} y2={cy - 90} stroke="#2563eb" strokeWidth="1.5" />
      <line x1={cx + sx} y1={cy - 100} x2={cx + sx} y2={cy - 90} stroke="#2563eb" strokeWidth="1.5" />
      <text x={cx} y={cy + 35} textAnchor="middle" fontSize="10" fill="#64748b">±2σ: 95.4% ／ ±3σ: 99.7%</text>
    </svg>
  );
}

function BayesTheorem() {
  return (
    <svg viewBox="0 0 400 170" className="topic-diagram">
      <circle cx="155" cy="80" r="60" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" opacity="0.7" />
      <circle cx="245" cy="80" r="60" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" opacity="0.7" />
      <clipPath id="clipA"><circle cx="155" cy="80" r="60" /></clipPath>
      <circle cx="245" cy="80" r="60" fill="#bbf7d0" opacity="0.7" clipPath="url(#clipA)" />
      <text x="120" y="78" textAnchor="middle" fontSize="16" fontWeight="700" fill="#2563eb">A</text>
      <text x="280" y="78" textAnchor="middle" fontSize="16" fontWeight="700" fill="#b45309">B</text>
      <text x="200" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="#15803d">A∩B</text>
      <text x="200" y="160" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">
        P(A|B) = P(A∩B) / P(B) = P(B|A) × P(A) / P(B)
      </text>
    </svg>
  );
}

function HypothesisTesting() {
  const cx = 200, cy = 115, sx = 45, sy = -200;
  const points: [number, number][] = [];
  for (let x = -3.5; x <= 3.5; x += 0.1) {
    const y = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    points.push([x, y]);
  }
  const path = points.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${cx + x * sx},${cy + y * sy}`
  ).join(" ");
  const rejPath = points.filter(([x]) => x >= 1.96).map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${cx + x * sx},${cy + y * sy}`
  ).join(" ");
  const rejLeft = points.filter(([x]) => x <= -1.96).map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${cx + x * sx},${cy + y * sy}`
  ).join(" ");

  return (
    <svg viewBox="0 0 400 185" className="topic-diagram">
      <text x={cx} y="14" textAnchor="middle" fontSize="12" fontWeight="600" fill="#2563eb">帰無仮説 H₀ の分布</text>
      <path d={`${path} L${cx + 3.5 * sx},${cy} L${cx - 3.5 * sx},${cy} Z`} fill="#dbeafe" opacity="0.4" />
      <path d={`${rejPath} L${cx + 3.5 * sx},${cy} L${cx + 1.96 * sx},${cy} Z`} fill="#fee2e2" />
      <path d={`${rejLeft} L${cx - 1.96 * sx},${cy} L${cx - 3.5 * sx},${cy} Z`} fill="#fee2e2" />
      <path d={path} fill="none" stroke="#2563eb" strokeWidth="2" />
      <line x1="30" y1={cy} x2="370" y2={cy} stroke="#64748b" strokeWidth="1" />
      <line x1={cx + 1.96 * sx} y1="30" x2={cx + 1.96 * sx} y2={cy} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1={cx - 1.96 * sx} y1="30" x2={cx - 1.96 * sx} y2={cy} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="11" fill="#334155">0</text>
      <text x={cx + 1.96 * sx} y={cy + 18} textAnchor="middle" fontSize="10" fill="#dc2626">+1.96</text>
      <text x={cx - 1.96 * sx} y={cy + 18} textAnchor="middle" fontSize="10" fill="#dc2626">-1.96</text>
      <text x={cx + 2.8 * sx} y="52" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">棄却域</text>
      <text x={cx - 2.8 * sx} y="52" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">棄却域</text>
      <text x={cx} y="52" textAnchor="middle" fontSize="10" fill="#64748b">採択域 (α=0.05)</text>
      <text x="50" y={cy + 40} fontSize="10" fill="#dc2626">第1種の過誤(α): 真なのに棄却</text>
      <text x="50" y={cy + 58} fontSize="10" fill="#f59e0b">第2種の過誤(β): 偽なのに棄却しない</text>
    </svg>
  );
}

function CorrelationScatter() {
  const pos = [[30,120],[45,105],[55,95],[65,80],[80,70],[90,55],[105,50],[115,40],[130,30]];
  const neg = [[30,30],[45,45],[55,55],[65,70],[80,80],[90,95],[105,100],[115,115],[130,120]];
  const none = [[30,70],[45,40],[55,100],[65,60],[80,30],[90,90],[105,50],[115,80],[130,65]];
  return (
    <svg viewBox="0 0 480 150" className="topic-diagram">
      <g transform="translate(0,0)">
        <text x="80" y="14" textAnchor="middle" fontSize="11" fontWeight="600" fill="#16a34a">正の相関 (r≒1)</text>
        <rect x="15" y="20" width="130" height="125" fill="#f0fdf4" rx="6" />
        {pos.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#16a34a" opacity="0.8" />)}
        <line x1="25" y1="125" x2="135" y2="25" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,3" />
      </g>
      <g transform="translate(165,0)">
        <text x="80" y="14" textAnchor="middle" fontSize="11" fontWeight="600" fill="#dc2626">負の相関 (r≒-1)</text>
        <rect x="15" y="20" width="130" height="125" fill="#fef2f2" rx="6" />
        {neg.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#dc2626" opacity="0.8" />)}
        <line x1="25" y1="25" x2="135" y2="125" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      </g>
      <g transform="translate(330,0)">
        <text x="80" y="14" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">無相関 (r≒0)</text>
        <rect x="15" y="20" width="130" height="125" fill="#f8fafc" rx="6" />
        {none.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#64748b" opacity="0.8" />)}
      </g>
    </svg>
  );
}

function MatrixBasics() {
  return (
    <svg viewBox="0 0 400 130" className="topic-diagram">
      <text x="45" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2563eb">A</text>
      <rect x="10" y="25" width="70" height="60" fill="#dbeafe" rx="4" stroke="#2563eb" strokeWidth="1.5" />
      <text x="30" y="50" textAnchor="middle" fontSize="13" fill="#334155">1</text>
      <text x="60" y="50" textAnchor="middle" fontSize="13" fill="#334155">2</text>
      <text x="30" y="75" textAnchor="middle" fontSize="13" fill="#334155">3</text>
      <text x="60" y="75" textAnchor="middle" fontSize="13" fill="#334155">4</text>
      <text x="100" y="62" textAnchor="middle" fontSize="16" fill="#64748b">×</text>
      <text x="140" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#16a34a">v</text>
      <rect x="120" y="25" width="40" height="60" fill="#dcfce7" rx="4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="140" y="50" textAnchor="middle" fontSize="13" fill="#334155">x</text>
      <text x="140" y="75" textAnchor="middle" fontSize="13" fill="#334155">y</text>
      <text x="180" y="62" textAnchor="middle" fontSize="16" fill="#64748b">=</text>
      <text x="218" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f59e0b">λv</text>
      <rect x="195" y="25" width="46" height="60" fill="#fef3c7" rx="4" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="218" y="50" textAnchor="middle" fontSize="13" fill="#334155">λx</text>
      <text x="218" y="75" textAnchor="middle" fontSize="13" fill="#334155">λy</text>
      <text x="300" y="40" textAnchor="middle" fontSize="11" fill="#334155">Av = λv</text>
      <text x="300" y="58" textAnchor="middle" fontSize="10" fill="#2563eb">v: 固有ベクトル</text>
      <text x="300" y="73" textAnchor="middle" fontSize="10" fill="#f59e0b">λ: 固有値</text>
      <text x="200" y="112" textAnchor="middle" fontSize="10" fill="#64748b">逆行列の存在条件: det(A) ≠ 0</text>
    </svg>
  );
}

function ProbDistributions() {
  const poisson = [0,1,2,3,4,5,6,7,8].map(k => {
    const lambda = 3;
    const p = Math.pow(lambda, k) * Math.exp(-lambda) / [1,1,2,6,24,120,720,5040,40320][k];
    return [k, p] as [number, number];
  });
  return (
    <svg viewBox="0 0 400 165" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">代表的な確率分布</text>
      <g transform="translate(20,25)">
        <text x="65" y="10" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">ポアソン分布 (λ=3)</text>
        {poisson.map(([k, p], i) => (
          <g key={i}>
            <rect x={k * 17 + 5} y={100 - p * 300} width="12" height={p * 300} fill="#7c3aed" opacity="0.7" rx="2" />
            <text x={k * 17 + 11} y="116" textAnchor="middle" fontSize="8" fill="#64748b">{k}</text>
          </g>
        ))}
      </g>
      <g transform="translate(200,25)">
        <text x="90" y="10" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">正規分布</text>
        <path d={
          Array.from({length: 60}, (_, i) => {
            const x = (i - 30) / 8;
            const y = Math.exp(-0.5 * x * x) * 90;
            return `${i === 0 ? "M" : "L"}${i * 3 + 2},${100 - y}`;
          }).join(" ")
        } fill="#dbeafe" stroke="#2563eb" strokeWidth="2" opacity="0.8" />
      </g>
      <text x="200" y="158" textAnchor="middle" fontSize="9" fill="#64748b">離散型: ベルヌーイ / 二項 / ポアソン ｜ 連続型: 正規 / 指数 / 一様</text>
    </svg>
  );
}

function DataScales() {
  const scales = [
    { name: "名義尺度", example: "血液型", color: "#64748b", bg: "#f1f5f9" },
    { name: "順序尺度", example: "満足度", color: "#f59e0b", bg: "#fef3c7" },
    { name: "間隔尺度", example: "気温℃", color: "#2563eb", bg: "#dbeafe" },
    { name: "比率尺度", example: "身長cm", color: "#16a34a", bg: "#dcfce7" },
  ];
  return (
    <svg viewBox="0 0 400 155" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">データの尺度（低 → 高）</text>
      {scales.map((s, i) => {
        const x = 20 + i * 95;
        return (
          <g key={i}>
            <rect x={x} y="28" width="85" height="55" fill={s.bg} stroke={s.color} strokeWidth="1.5" rx="8" />
            <text x={x + 42} y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill={s.color}>{s.name}</text>
            <text x={x + 42} y="68" textAnchor="middle" fontSize="9" fill="#64748b">例: {s.example}</text>
            {i < 3 && <text x={x + 90} y="58" textAnchor="middle" fontSize="16" fill="#94a3b8">→</text>}
          </g>
        );
      })}
      <text x="62" y="102" textAnchor="middle" fontSize="9" fill="#64748b">分類のみ</text>
      <text x="157" y="102" textAnchor="middle" fontSize="9" fill="#64748b">+ 順序比較</text>
      <text x="252" y="102" textAnchor="middle" fontSize="9" fill="#64748b">+ 差の計算</text>
      <text x="347" y="102" textAnchor="middle" fontSize="9" fill="#64748b">+ 比率・四則</text>
      <line x1="20" y1="115" x2="195" y2="115" stroke="#f59e0b" strokeWidth="1" />
      <text x="107" y="130" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">質的データ</text>
      <line x1="210" y1="115" x2="395" y2="115" stroke="#2563eb" strokeWidth="1" />
      <text x="302" y="130" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">量的データ</text>
    </svg>
  );
}

function TTestDiagram() {
  const cx1 = 140, cx2 = 260, cy = 100, sx = 35, sy = -180;
  const curve = (cx: number) => {
    const pts: string[] = [];
    for (let x = -3; x <= 3; x += 0.15) {
      const y = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
      pts.push(`${pts.length === 0 ? "M" : "L"}${cx + x * sx},${cy + y * sy}`);
    }
    return pts.join(" ");
  };
  return (
    <svg viewBox="0 0 400 150" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">t検定：2群の平均の比較</text>
      <path d={curve(cx1)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <path d={`${curve(cx1)} L${cx1 + 3 * sx},${cy} L${cx1 - 3 * sx},${cy} Z`} fill="#2563eb" opacity="0.15" />
      <path d={curve(cx2)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <path d={`${curve(cx2)} L${cx2 + 3 * sx},${cy} L${cx2 - 3 * sx},${cy} Z`} fill="#dc2626" opacity="0.15" />
      <line x1="30" y1={cy} x2="370" y2={cy} stroke="#64748b" strokeWidth="1" />
      <line x1={cx1} y1={cy - 5} x2={cx1} y2={cy + 5} stroke="#2563eb" strokeWidth="2" />
      <line x1={cx2} y1={cy - 5} x2={cx2} y2={cy + 5} stroke="#dc2626" strokeWidth="2" />
      <text x={cx1} y={cy + 18} textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">x̄₁</text>
      <text x={cx2} y={cy + 18} textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">x̄₂</text>
      <line x1={cx1} y1={cy + 28} x2={cx2} y2={cy + 28} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowTT)" markerStart="url(#arrowTTr)" />
      <text x="200" y={cy + 42} textAnchor="middle" fontSize="9" fill="#334155">差が有意か？→ p値で判定</text>
      <text x={cx1} y="28" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">群A</text>
      <text x={cx2} y="28" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">群B</text>
      <defs>
        <marker id="arrowTT" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <path d="M0,0 L6,2.5 L0,5" fill="#334155" />
        </marker>
        <marker id="arrowTTr" markerWidth="6" markerHeight="5" refX="0" refY="2.5" orient="auto">
          <path d="M6,0 L0,2.5 L6,5" fill="#334155" />
        </marker>
      </defs>
    </svg>
  );
}

/* ================================================================
   NEW diagrams
   ================================================================ */

function AnovaDiagram() {
  const groups = [
    { label: "群A", mean: 50, color: "#2563eb", bg: "#dbeafe", x: 80 },
    { label: "群B", mean: 80, color: "#16a34a", bg: "#dcfce7", x: 200 },
    { label: "群C", mean: 65, color: "#f59e0b", bg: "#fef3c7", x: 320 },
  ];
  const baseline = 130;
  const scale = 0.9;

  return (
    <svg viewBox="0 0 400 185" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">分散分析（ANOVA）</text>

      {/* Axis */}
      <line x1="40" y1={baseline} x2="380" y2={baseline} stroke="#64748b" strokeWidth="1" />

      {/* Group bars with individual data spread */}
      {groups.map((g, i) => {
        const barH = g.mean * scale;
        const barY = baseline - barH;
        return (
          <g key={i}>
            <rect x={g.x - 30} y={barY} width="60" height={barH} fill={g.bg} stroke={g.color} strokeWidth="1.5" rx="4" />
            {/* Individual data points within the bar */}
            {[-12, -4, 4, 12].map((dx, j) => (
              <circle key={j} cx={g.x + dx} cy={barY + 8 + j * 6} r="2.5" fill={g.color} opacity="0.5" />
            ))}
            {/* Mean line */}
            <line x1={g.x - 30} y1={barY} x2={g.x + 30} y2={barY} stroke={g.color} strokeWidth="2" />
            <text x={g.x} y={baseline + 15} textAnchor="middle" fontSize="10" fontWeight="600" fill={g.color}>{g.label}</text>
            <text x={g.x} y={barY - 6} textAnchor="middle" fontSize="9" fill={g.color}>x̄={g.mean}</text>
          </g>
        );
      })}

      {/* 群間分散 bracket (between group means) */}
      <line x1="80" y1={baseline - 80 * scale - 18} x2="320" y2={baseline - 80 * scale - 18} stroke="#dc2626" strokeWidth="1.5" />
      <line x1="80" y1={baseline - 80 * scale - 23} x2="80" y2={baseline - 80 * scale - 13} stroke="#dc2626" strokeWidth="1.5" />
      <line x1="320" y1={baseline - 80 * scale - 23} x2="320" y2={baseline - 80 * scale - 13} stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y={baseline - 80 * scale - 24} textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">群間分散</text>

      {/* 群内分散 bracket (within group A) */}
      <line x1="52" y1={baseline - 50 * scale + 8} x2="52" y2={baseline - 50 * scale + 32} stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="48" y1={baseline - 50 * scale + 8} x2="56" y2={baseline - 50 * scale + 8} stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="48" y1={baseline - 50 * scale + 32} x2="56" y2={baseline - 50 * scale + 32} stroke="#7c3aed" strokeWidth="1.5" />
      <text x="42" y={baseline - 50 * scale + 24} textAnchor="end" fontSize="8" fontWeight="600" fill="#7c3aed">群内</text>
      <text x="42" y={baseline - 50 * scale + 34} textAnchor="end" fontSize="8" fontWeight="600" fill="#7c3aed">分散</text>

      {/* Formula */}
      <text x="200" y="172" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">F = 群間分散 / 群内分散</text>
      <text x="200" y="183" textAnchor="middle" fontSize="9" fill="#64748b">F値が大きい → 群間に有意差あり</text>
    </svg>
  );
}

function PcaMathDiagram() {
  /* Scatter cloud centered around (200,90) */
  const pts = [
    [160,105],[175,95],[185,100],[190,85],[200,90],
    [205,80],[215,88],[220,75],[235,70],[245,65],
  ];

  return (
    <svg viewBox="0 0 400 170" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">主成分分析（PCA）の幾何学的意味</text>

      {/* Background area */}
      <rect x="60" y="28" width="280" height="105" fill="#f8fafc" rx="6" />

      {/* Scatter points */}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#2563eb" opacity="0.6" />
      ))}

      {/* PC1 arrow (long, red) - along the main spread direction */}
      <line x1="145" y1="108" x2="260" y2="62" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#pcaArrow1)" />
      <text x="268" y="58" fontSize="10" fontWeight="700" fill="#dc2626">PC1</text>

      {/* PC2 arrow (short, green) - perpendicular */}
      <line x1="200" y1="87" x2="220" y2="115" stroke="#16a34a" strokeWidth="2" markerEnd="url(#pcaArrow2)" />
      <text x="228" y="120" fontSize="10" fontWeight="700" fill="#16a34a">PC2</text>

      {/* Labels */}
      <text x="100" y="50" fontSize="9" fontWeight="600" fill="#dc2626">高分散 = 重要</text>
      <text x="280" y="105" fontSize="9" fill="#16a34a">低分散</text>

      {/* Bottom info */}
      <text x="200" y="150" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">固有値: λ₁ &gt; λ₂</text>
      <text x="200" y="164" textAnchor="middle" fontSize="9" fill="#64748b">寄与率 = λₖ / Σλ で各主成分の重要度を評価</text>

      <defs>
        <marker id="pcaArrow1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#dc2626" />
        </marker>
        <marker id="pcaArrow2" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="#16a34a" />
        </marker>
      </defs>
    </svg>
  );
}

function GradientDescentDiagram() {
  /* U-shaped loss curve */
  const curvePts = Array.from({ length: 61 }, (_, i) => {
    const t = (i - 30) / 10; // -3 to 3
    const y = t * t;         // parabola
    return [80 + i * 4, 30 + y * 18] as [number, number];
  });
  const curvePath = curvePts.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${x},${y}`
  ).join(" ");

  return (
    <svg viewBox="0 0 400 180" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">勾配降下法</text>

      {/* Loss curve */}
      <path d={curvePath} fill="none" stroke="#2563eb" strokeWidth="2.5" />

      {/* Y-axis label */}
      <text x="62" y="28" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">損失</text>
      <text x="62" y="39" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">L(θ)</text>
      <line x1="74" y1="25" x2="74" y2="140" stroke="#64748b" strokeWidth="1" />
      {/* X-axis */}
      <line x1="74" y1="140" x2="340" y2="140" stroke="#64748b" strokeWidth="1" />
      <text x="340" y="152" textAnchor="middle" fontSize="9" fill="#64748b">θ</text>

      {/* 学習率大 (overshooting zig-zag) - left side */}
      <circle cx="110" cy="53" r="4" fill="#dc2626" />
      <line x1="110" y1="53" x2="270" y2="105" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      <circle cx="270" cy="105" r="3.5" fill="#dc2626" opacity="0.7" />
      <line x1="270" y1="105" x2="130" y2="64" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      <circle cx="130" cy="64" r="3" fill="#dc2626" opacity="0.5" />
      <text x="108" y="45" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">学習率大</text>
      <text x="108" y="67" textAnchor="start" fontSize="8" fill="#dc2626">発散リスク</text>

      {/* 適切 (converging nicely) - right-center */}
      <circle cx="260" cy="100" r="4" fill="#16a34a" />
      <line x1="260" y1="100" x2="230" y2="68" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#gdArrowOk)" />
      <circle cx="230" cy="68" r="3.5" fill="#16a34a" opacity="0.8" />
      <line x1="230" y1="68" x2="215" y2="48" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#gdArrowOk)" />
      <circle cx="215" cy="48" r="3" fill="#16a34a" opacity="0.6" />
      <line x1="215" y1="48" x2="205" y2="35" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#gdArrowOk)" />
      <circle cx="205" cy="35" r="2.5" fill="#16a34a" opacity="0.5" />
      <text x="270" y="95" fontSize="9" fontWeight="600" fill="#16a34a">適切</text>

      {/* 学習率小 (slow steps) - near minimum */}
      <circle cx="196" cy="31.5" r="3" fill="#f59e0b" />
      <circle cx="199" cy="30.8" r="2.5" fill="#f59e0b" opacity="0.8" />
      <circle cx="201" cy="30.3" r="2" fill="#f59e0b" opacity="0.6" />
      <circle cx="202.5" cy="30.1" r="1.5" fill="#f59e0b" opacity="0.5" />
      <text x="200" y="155" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">学習率小 → 収束は遅い</text>

      {/* Minimum marker */}
      <circle cx="200" cy="30" r="5" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3,2" />
      <text x="200" y="170" textAnchor="middle" fontSize="9" fill="#64748b">θ* = argmin L(θ)</text>

      <defs>
        <marker id="gdArrowOk" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <path d="M0,0 L6,2.5 L0,5" fill="#16a34a" />
        </marker>
      </defs>
    </svg>
  );
}

function SetTheoryDiagram() {
  const r = 22; // circle radius
  const dx = 14; // offset between circle centers

  const VennPair = ({ cx, cy, label, fillA, fillB, fillIntersect, fillOuter }: {
    cx: number; cy: number; label: string;
    fillA?: string; fillB?: string; fillIntersect?: string; fillOuter?: string;
  }) => {
    const aCenter = cx - dx / 2;
    const bCenter = cx + dx / 2;
    const uid = label.replace(/[^a-zA-Z]/g, "");
    return (
      <g>
        {/* Outer rectangle (for complement) */}
        {fillOuter && (
          <>
            <clipPath id={`setClipOuter${uid}`}>
              <rect x={cx - 48} y={cy - 32} width="96" height="64" />
            </clipPath>
            <rect x={cx - 48} y={cy - 32} width="96" height="64" fill={fillOuter} rx="4" />
            {/* Cut out circle A for complement */}
            <circle cx={aCenter} cy={cy} r={r} fill="#ffffff" />
          </>
        )}
        {/* Border rect */}
        <rect x={cx - 48} y={cy - 32} width="96" height="64" fill="none" stroke="#94a3b8" strokeWidth="1" rx="4" />
        {/* Circle A fill */}
        {fillA && (
          <>
            <clipPath id={`setClipA${uid}`}><circle cx={aCenter} cy={cy} r={r} /></clipPath>
            <circle cx={aCenter} cy={cy} r={r} fill={fillA} />
            {/* Remove intersection if we only want A-B */}
            {!fillIntersect && fillB === undefined && (
              <circle cx={bCenter} cy={cy} r={r} fill="#ffffff" clipPath={`url(#setClipA${uid})`} />
            )}
          </>
        )}
        {/* Circle B fill */}
        {fillB && <circle cx={bCenter} cy={cy} r={r} fill={fillB} />}
        {/* Intersection fill */}
        {fillIntersect && (
          <>
            <clipPath id={`setClipI${uid}`}><circle cx={aCenter} cy={cy} r={r} /></clipPath>
            <circle cx={bCenter} cy={cy} r={r} fill={fillIntersect} clipPath={`url(#setClipI${uid})`} />
          </>
        )}
        {/* Circle outlines */}
        <circle cx={aCenter} cy={cy} r={r} fill="none" stroke="#2563eb" strokeWidth="1.5" />
        <circle cx={bCenter} cy={cy} r={r} fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        {/* Labels */}
        <text x={aCenter - 10} y={cy + 3} textAnchor="middle" fontSize="8" fontWeight="600" fill="#2563eb">A</text>
        <text x={bCenter + 10} y={cy + 3} textAnchor="middle" fontSize="8" fontWeight="600" fill="#b45309">B</text>
        <text x={cx} y={cy + 42} textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">{label}</text>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 400 175" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">集合演算</text>

      {/* Union A∪B */}
      <VennPair cx={100} cy={65} label="A∪B（和集合）" fillA="#dbeafe" fillB="#fef3c7" fillIntersect="#bbf7d0" />

      {/* Intersection A∩B */}
      <VennPair cx={300} cy={65} label="A∩B（積集合）" fillIntersect="#bbf7d0" />

      {/* Difference A−B */}
      <VennPair cx={100} cy={140} label="A−B（差集合）" fillA="#dbeafe" />

      {/* Complement Aᶜ */}
      <VennPair cx={300} cy={140} label="Aᶜ（補集合）" fillOuter="#e2e8f0" />
    </svg>
  );
}

function ConfidenceIntervalDiagram() {
  const trueValue = 200; // x-coordinate of the true parameter
  /* 5 simulated intervals: [left, right, captures true value?] */
  const intervals: [number, number, boolean][] = [
    [172, 218, true],
    [180, 225, true],
    [160, 195, false],
    [185, 230, true],
    [178, 215, true],
  ];

  return (
    <svg viewBox="0 0 400 175" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">信頼区間のイメージ</text>

      {/* True parameter dashed line */}
      <line x1={trueValue} y1="25" x2={trueValue} y2="145" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x={trueValue} y="158" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">真の母数 μ</text>

      {/* Simulated intervals */}
      {intervals.map(([left, right, captures], i) => {
        const y = 38 + i * 23;
        const mid = (left + right) / 2;
        const color = captures ? "#16a34a" : "#dc2626";
        const bg = captures ? "#dcfce7" : "#fee2e2";
        return (
          <g key={i}>
            {/* Interval line */}
            <line x1={left} y1={y} x2={right} y2={y} stroke={color} strokeWidth="2.5" />
            {/* Left bracket */}
            <line x1={left} y1={y - 5} x2={left} y2={y + 5} stroke={color} strokeWidth="2" />
            {/* Right bracket */}
            <line x1={right} y1={y - 5} x2={right} y2={y + 5} stroke={color} strokeWidth="2" />
            {/* Point estimate dot */}
            <circle cx={mid} cy={y} r="3.5" fill={bg} stroke={color} strokeWidth="1.5" />
            {/* Sample label */}
            <text x="365" y={y + 4} textAnchor="end" fontSize="8" fill={color}>
              {captures ? "✓ 含む" : "✗ 外れ"}
            </text>
            <text x="50" y={y + 4} textAnchor="end" fontSize="8" fill="#64748b">標本{i + 1}</text>
          </g>
        );
      })}

      {/* Bottom explanation */}
      <text x="200" y="172" textAnchor="middle" fontSize="9" fill="#64748b">95%信頼区間 → 100回中 約95回は真の値を含む</text>
    </svg>
  );
}

function LogisticRegressionDiagram() {
  /* Sigmoid curve points */
  const sigmoidPts = Array.from({ length: 61 }, (_, i) => {
    const x = (i - 30) / 5; // -6 to 6
    const y = 1 / (1 + Math.exp(-x));
    return [80 + i * 4, 140 - y * 110] as [number, number];
  });
  const sigmoidPath = sigmoidPts.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${x},${y}`
  ).join(" ");

  /* Scatter points: class 0 (bottom) and class 1 (top) */
  const class0 = [85, 100, 110, 125, 140, 150];
  const class1 = [220, 240, 255, 270, 285, 300];

  return (
    <svg viewBox="0 0 400 175" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">ロジスティック回帰</text>

      {/* Axes */}
      <line x1="70" y1="140" x2="340" y2="140" stroke="#64748b" strokeWidth="1" />
      <line x1="70" y1="28" x2="70" y2="140" stroke="#64748b" strokeWidth="1" />
      <text x="350" y="143" fontSize="9" fill="#64748b">x</text>
      <text x="56" y="35" textAnchor="middle" fontSize="9" fill="#334155">P(Y=1)</text>

      {/* Y-axis labels */}
      <text x="64" y="34" textAnchor="end" fontSize="8" fill="#64748b">1.0</text>
      <line x1="67" y1="30" x2="73" y2="30" stroke="#64748b" strokeWidth="0.8" />
      <text x="64" y="88" textAnchor="end" fontSize="8" fill="#64748b">0.5</text>
      <line x1="67" y1="85" x2="73" y2="85" stroke="#64748b" strokeWidth="0.8" />
      <text x="64" y="143" textAnchor="end" fontSize="8" fill="#64748b">0.0</text>

      {/* Sigmoid curve */}
      <path d={sigmoidPath} fill="none" stroke="#2563eb" strokeWidth="2.5" />

      {/* Threshold line at 0.5 */}
      <line x1="70" y1="85" x2="340" y2="85" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="345" y="88" fontSize="8" fontWeight="600" fill="#f59e0b">閾値=0.5</text>

      {/* Class 0 scatter (y=0) */}
      {class0.map((x, i) => (
        <circle key={`c0-${i}`} cx={x} cy="138" r="3.5" fill="#dc2626" opacity="0.7" />
      ))}
      <text x="115" y="155" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">Y=0</text>

      {/* Class 1 scatter (y=1) */}
      {class1.map((x, i) => (
        <circle key={`c1-${i}`} cx={x} cy="32" r="3.5" fill="#16a34a" opacity="0.7" />
      ))}
      <text x="270" y="27" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">Y=1</text>

      {/* Formula */}
      <text x="200" y="170" textAnchor="middle" fontSize="9" fill="#64748b">σ(z) = 1 / (1 + e⁻ᶻ)　z = β₀ + β₁x</text>
    </svg>
  );
}

function TimeSeriesDecomposition() {
  const n = 50;
  const w = 320; // chart width
  const x0 = 55; // left margin

  /* Generate data */
  const trend = Array.from({ length: n }, (_, i) => 20 + i * 0.4);
  const seasonal = Array.from({ length: n }, (_, i) => Math.sin(i * 2 * Math.PI / 10) * 10);
  const residual = [2,-3,1,4,-2,0,3,-1,2,-4, 1,-2,3,0,-3,2,-1,4,-2,1, -3,2,0,-1,3,-4,2,1,-2,0, 3,-1,-3,2,4,-2,1,0,-3,2, -1,3,-2,1,0,-4,2,-1,3,-2];

  const linePath = (data: number[], baseY: number, scaleY: number) => {
    return data.map((v, i) => {
      const px = x0 + (i / (n - 1)) * w;
      const py = baseY - v * scaleY;
      return `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
    }).join(" ");
  };

  return (
    <svg viewBox="0 0 400 185" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">時系列分解</text>

      {/* Trend */}
      <text x="12" y="48" fontSize="9" fontWeight="600" fill="#2563eb">トレンド</text>
      <rect x={x0 - 2} y="24" width={w + 4} height="40" fill="#dbeafe" opacity="0.3" rx="3" />
      <line x1={x0} y1="44" x2={x0 + w} y2="44" stroke="#e2e8f0" strokeWidth="0.5" />
      <path d={linePath(trend, 56, 0.7)} fill="none" stroke="#2563eb" strokeWidth="2" />

      {/* Seasonality */}
      <text x="12" y="92" fontSize="9" fontWeight="600" fill="#16a34a">季節性</text>
      <rect x={x0 - 2} y="70" width={w + 4} height="40" fill="#dcfce7" opacity="0.3" rx="3" />
      <line x1={x0} y1="90" x2={x0 + w} y2="90" stroke="#e2e8f0" strokeWidth="0.5" />
      <path d={linePath(seasonal, 90, 1.2)} fill="none" stroke="#16a34a" strokeWidth="2" />

      {/* Residual */}
      <text x="12" y="136" fontSize="9" fontWeight="600" fill="#f59e0b">残差</text>
      <rect x={x0 - 2} y="116" width={w + 4} height="40" fill="#fef3c7" opacity="0.3" rx="3" />
      <line x1={x0} y1="136" x2={x0 + w} y2="136" stroke="#e2e8f0" strokeWidth="0.5" />
      <path d={linePath(residual, 136, 1.0)} fill="none" stroke="#f59e0b" strokeWidth="1.5" />

      {/* Plus signs between sections */}
      <text x={x0 + w + 10} y="48" fontSize="12" fill="#64748b">+</text>
      <text x={x0 + w + 10} y="94" fontSize="12" fill="#64748b">+</text>

      {/* Bottom label */}
      <text x="200" y="173" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">原系列 = トレンド + 季節性 + 残差</text>
      <text x="200" y="184" textAnchor="middle" fontSize="9" fill="#64748b">加法モデル（STL分解など）</text>
    </svg>
  );
}

function DataVisualization() {
  const histBars = [15, 30, 50, 70, 55, 35, 20];
  const scatter = [[10,60],[18,50],[25,42],[32,35],[40,25],[48,20],[55,12]];
  return (
    <svg viewBox="0 0 480 145" className="topic-diagram">
      <g transform="translate(0,0)">
        <text x="75" y="14" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">ヒストグラム</text>
        <rect x="10" y="20" width="130" height="115" fill="#f8fafc" rx="4" />
        {histBars.map((h, i) => (
          <rect key={i} x={18 + i * 17} y={120 - h} width="14" height={h} fill="#93c5fd" stroke="#2563eb" strokeWidth="0.5" rx="1" />
        ))}
        <line x1="15" y1="120" x2="140" y2="120" stroke="#64748b" strokeWidth="1" />
      </g>
      <g transform="translate(165,0)">
        <text x="75" y="14" textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">散布図</text>
        <rect x="10" y="20" width="130" height="115" fill="#f0fdf4" rx="4" />
        {scatter.map(([x, y], i) => <circle key={i} cx={x + 15} cy={y + 30} r="4" fill="#16a34a" opacity="0.8" />)}
        <line x1="20" y1="100" x2="120" y2="30" stroke="#16a34a" strokeWidth="1" strokeDasharray="4,3" />
      </g>
      <g transform="translate(330,0)">
        <text x="75" y="14" textAnchor="middle" fontSize="10" fontWeight="600" fill="#9333ea">箱ひげ図</text>
        <rect x="10" y="20" width="130" height="115" fill="#faf5ff" rx="4" />
        <line x1="75" y1="35" x2="75" y2="55" stroke="#9333ea" strokeWidth="1.5" />
        <line x1="60" y1="35" x2="90" y2="35" stroke="#9333ea" strokeWidth="1.5" />
        <rect x="50" y="55" width="50" height="40" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" rx="2" />
        <line x1="50" y1="72" x2="100" y2="72" stroke="#9333ea" strokeWidth="2.5" />
        <line x1="75" y1="95" x2="75" y2="115" stroke="#9333ea" strokeWidth="1.5" />
        <line x1="60" y1="115" x2="90" y2="115" stroke="#9333ea" strokeWidth="1.5" />
        <text x="108" y="40" fontSize="8" fill="#9333ea">max</text>
        <text x="108" y="60" fontSize="8" fill="#9333ea">Q3</text>
        <text x="108" y="76" fontSize="8" fill="#9333ea">中央値</text>
        <text x="108" y="98" fontSize="8" fill="#9333ea">Q1</text>
        <text x="108" y="118" fontSize="8" fill="#9333ea">min</text>
      </g>
    </svg>
  );
}

function DescriptiveStatsDiagram() {
  /* Small bell curve points */
  const bellPts = Array.from({ length: 61 }, (_, i) => {
    const x = (i - 30) / 8;
    const y = Math.exp(-0.5 * x * x) * 50;
    return [60 + i * 4.5, 52 - y] as [number, number];
  });
  const bellPath = bellPts.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${x},${y}`
  ).join(" ");

  return (
    <svg viewBox="0 0 400 170" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">代表値と散布度</text>

      {/* Bell curve */}
      <path d={bellPath} fill="#dbeafe" opacity="0.4" stroke="#2563eb" strokeWidth="1.5" />

      {/* Number line */}
      <line x1="40" y1="70" x2="360" y2="70" stroke="#64748b" strokeWidth="1.5" />

      {/* Mode marker */}
      <line x1="170" y1="62" x2="170" y2="78" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="170" y="90" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">最頻値</text>
      <text x="170" y="100" textAnchor="middle" fontSize="8" fill="#f59e0b">Mo</text>

      {/* Median marker */}
      <line x1="195" y1="62" x2="195" y2="78" stroke="#16a34a" strokeWidth="2.5" />
      <text x="195" y="90" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">中央値</text>
      <text x="195" y="100" textAnchor="middle" fontSize="8" fill="#16a34a">Me</text>

      {/* Mean marker */}
      <line x1="210" y1="62" x2="210" y2="78" stroke="#2563eb" strokeWidth="2.5" />
      <text x="210" y="90" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">平均値</text>
      <text x="210" y="100" textAnchor="middle" fontSize="8" fill="#2563eb">μ</text>

      {/* Range bracket */}
      <line x1="60" y1="115" x2="340" y2="115" stroke="#dc2626" strokeWidth="1.5" />
      <line x1="60" y1="110" x2="60" y2="120" stroke="#dc2626" strokeWidth="1.5" />
      <line x1="340" y1="110" x2="340" y2="120" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="128" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">範囲 (Range)</text>

      {/* IQR bracket */}
      <line x1="140" y1="138" x2="260" y2="138" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="140" y1="133" x2="140" y2="143" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="260" y1="133" x2="260" y2="143" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="200" y="155" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">四分位範囲 (IQR = Q3 - Q1)</text>

      {/* Q1 and Q3 labels */}
      <text x="140" y="108" textAnchor="middle" fontSize="8" fill="#7c3aed">Q1</text>
      <text x="260" y="108" textAnchor="middle" fontSize="8" fill="#7c3aed">Q3</text>

      {/* Variance note */}
      <text x="200" y="167" textAnchor="middle" fontSize="9" fill="#64748b">分散 σ² = Σ(xᵢ - μ)² / n　標準偏差 σ = √σ²</text>
    </svg>
  );
}

function ChiSquareDiagram() {
  /* Chi-square distribution curve (df=4, right-skewed) */
  const chiPts = Array.from({ length: 61 }, (_, i) => {
    const x = i * 0.25; // 0 to 15
    const df = 4;
    const y = x > 0 ? Math.pow(x, df / 2 - 1) * Math.exp(-x / 2) * 1.8 : 0;
    return [60 + i * 4.5, 110 - y * 12] as [number, number];
  });
  const chiPath = chiPts.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${x},${y}`
  ).join(" ");
  /* Rejection region (right tail, x >= 9.49 for df=4, alpha=0.05) */
  const rejIdx = Math.floor(9.49 / 0.25);
  const rejPts = chiPts.filter((_, i) => i >= rejIdx);
  const rejPath = rejPts.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${x},${y}`
  ).join(" ");

  return (
    <svg viewBox="0 0 400 180" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">カイ二乗検定 (χ²検定)</text>

      {/* Distribution curve */}
      <path d={`${chiPath} L${60 + 60 * 4.5},110 L60,110 Z`} fill="#dbeafe" opacity="0.3" />
      <path d={chiPath} fill="none" stroke="#2563eb" strokeWidth="2" />

      {/* Rejection region shaded */}
      {rejPts.length > 0 && (
        <path d={`${rejPath} L${rejPts[rejPts.length - 1][0]},110 L${rejPts[0][0]},110 Z`} fill="#fee2e2" opacity="0.7" />
      )}

      {/* Axis */}
      <line x1="55" y1="110" x2="340" y2="110" stroke="#64748b" strokeWidth="1" />
      <text x="340" y="123" fontSize="9" fill="#64748b">χ²</text>

      {/* Critical value line */}
      <line x1={60 + rejIdx * 4.5} y1="28" x2={60 + rejIdx * 4.5} y2="110" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x={60 + rejIdx * 4.5} y="123" textAnchor="middle" fontSize="8" fill="#dc2626">χ²α</text>
      <text x={60 + rejIdx * 4.5 + 30} y="70" textAnchor="start" fontSize="9" fontWeight="600" fill="#dc2626">棄却域</text>
      <text x={60 + rejIdx * 4.5 + 30} y="82" textAnchor="start" fontSize="8" fill="#dc2626">α=0.05</text>

      {/* 2x2 contingency table */}
      <g transform="translate(20,128)">
        <rect x="0" y="0" width="175" height="48" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" rx="3" />
        <line x1="55" y1="0" x2="55" y2="48" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="115" y1="0" x2="115" y2="48" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="0" y1="16" x2="175" y2="16" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="0" y1="32" x2="175" y2="32" stroke="#94a3b8" strokeWidth="0.8" />
        <text x="27" y="12" textAnchor="middle" fontSize="7" fontWeight="600" fill="#334155">観測度数</text>
        <text x="85" y="12" textAnchor="middle" fontSize="7" fontWeight="600" fill="#334155">B=Yes</text>
        <text x="145" y="12" textAnchor="middle" fontSize="7" fontWeight="600" fill="#334155">B=No</text>
        <text x="27" y="27" textAnchor="middle" fontSize="7" fill="#334155">A=Yes</text>
        <text x="85" y="27" textAnchor="middle" fontSize="8" fill="#2563eb">O₁₁</text>
        <text x="145" y="27" textAnchor="middle" fontSize="8" fill="#2563eb">O₁₂</text>
        <text x="27" y="44" textAnchor="middle" fontSize="7" fill="#334155">A=No</text>
        <text x="85" y="44" textAnchor="middle" fontSize="8" fill="#2563eb">O₂₁</text>
        <text x="145" y="44" textAnchor="middle" fontSize="8" fill="#2563eb">O₂₂</text>
      </g>

      {/* Formula */}
      <text x="310" y="155" textAnchor="middle" fontSize="9" fill="#334155">χ² = Σ (O - E)² / E</text>
      <text x="310" y="170" textAnchor="middle" fontSize="8" fill="#64748b">O:観測度数  E:期待度数</text>
    </svg>
  );
}

function CentralLimitTheoremDiagram() {
  /* Skewed distribution (original) */
  const skewedPts = Array.from({ length: 41 }, (_, i) => {
    const x = i / 40;
    const y = x < 0.15 ? x * 6 : Math.exp(-3.5 * (x - 0.15)) * 0.9;
    return [50 + i * 7, 38 - y * 28] as [number, number];
  });
  const skewedPath = skewedPts.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${x},${y}`
  ).join(" ");

  /* n=5 means distribution (less skewed) */
  const n5Pts = Array.from({ length: 41 }, (_, i) => {
    const x = (i - 18) / 8;
    const y = Math.exp(-0.5 * x * x) * 0.7 + (x < 0 ? 0 : Math.exp(-2 * x) * 0.3);
    return [50 + i * 7, 90 - y * 30] as [number, number];
  });
  const n5Path = n5Pts.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${x},${y}`
  ).join(" ");

  /* n=30 means distribution (approximately normal) */
  const n30Pts = Array.from({ length: 41 }, (_, i) => {
    const x = (i - 20) / 7;
    const y = Math.exp(-0.5 * x * x);
    return [50 + i * 7, 142 - y * 30] as [number, number];
  });
  const n30Path = n30Pts.map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${x},${y}`
  ).join(" ");

  return (
    <svg viewBox="0 0 400 185" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">大数の法則と中心極限定理</text>

      {/* Row 1: Original skewed distribution */}
      <text x="15" y="32" fontSize="8" fontWeight="600" fill="#dc2626">母集団</text>
      <text x="15" y="42" fontSize="7" fill="#dc2626">(歪んだ分布)</text>
      <path d={`${skewedPath} L${50 + 40 * 7},38 L50,38 Z`} fill="#fee2e2" opacity="0.5" />
      <path d={skewedPath} fill="none" stroke="#dc2626" strokeWidth="2" />

      {/* Row 2: n=5 means */}
      <text x="15" y="80" fontSize="8" fontWeight="600" fill="#f59e0b">n=5の</text>
      <text x="15" y="90" fontSize="7" fill="#f59e0b">標本平均</text>
      <path d={`${n5Path} L${50 + 40 * 7},90 L50,90 Z`} fill="#fef3c7" opacity="0.5" />
      <path d={n5Path} fill="none" stroke="#f59e0b" strokeWidth="2" />

      {/* Row 3: n=30 means (normal) */}
      <text x="15" y="132" fontSize="8" fontWeight="600" fill="#2563eb">n=30の</text>
      <text x="15" y="142" fontSize="7" fill="#2563eb">標本平均</text>
      <path d={`${n30Path} L${50 + 40 * 7},142 L50,142 Z`} fill="#dbeafe" opacity="0.5" />
      <path d={n30Path} fill="none" stroke="#2563eb" strokeWidth="2" />

      {/* Arrow on the right showing convergence */}
      <line x1="360" y1="35" x2="360" y2="140" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#cltArrow)" />
      <text x="375" y="75" fontSize="7" fontWeight="600" fill="#7c3aed" textAnchor="start">n が</text>
      <text x="375" y="85" fontSize="7" fontWeight="600" fill="#7c3aed" textAnchor="start">大きく</text>
      <text x="375" y="95" fontSize="7" fontWeight="600" fill="#7c3aed" textAnchor="start">なると</text>
      <text x="375" y="105" fontSize="7" fontWeight="600" fill="#7c3aed" textAnchor="start">正規分布</text>
      <text x="375" y="115" fontSize="7" fontWeight="600" fill="#7c3aed" textAnchor="start">に近づく</text>

      {/* Bottom formula */}
      <text x="200" y="165" textAnchor="middle" fontSize="9" fill="#334155">X̄ ~ N(μ, σ²/n)　(n → ∞)</text>
      <text x="200" y="178" textAnchor="middle" fontSize="8" fill="#64748b">標本平均の分布は母集団の形に関わらず正規分布に収束</text>

      <defs>
        <marker id="cltArrow" markerWidth="7" markerHeight="6" refX="3.5" refY="6" orient="auto">
          <path d="M0,0 L3.5,6 L7,0" fill="#7c3aed" />
        </marker>
      </defs>
    </svg>
  );
}

function MultipleRegressionDiagram() {
  return (
    <svg viewBox="0 0 400 175" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">重回帰分析</text>

      {/* Formula */}
      <rect x="60" y="24" width="280" height="28" fill="#f8fafc" rx="6" stroke="#94a3b8" strokeWidth="1" />
      <text x="200" y="43" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">y = β₀ + β₁x₁ + β₂x₂ + ε</text>

      {/* Variable table */}
      <g transform="translate(30,62)">
        <rect x="0" y="0" width="340" height="42" fill="#dbeafe" rx="4" stroke="#2563eb" strokeWidth="1" />
        <text x="57" y="15" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">説明変数</text>
        <text x="57" y="28" textAnchor="middle" fontSize="10" fill="#334155">x₁: 広さ (m²)</text>
        <text x="170" y="15" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">説明変数</text>
        <text x="170" y="28" textAnchor="middle" fontSize="10" fill="#334155">x₂: 駅距離 (分)</text>
        <line x1="113" y1="2" x2="113" y2="40" stroke="#2563eb" strokeWidth="0.5" strokeDasharray="3,2" />
        <line x1="227" y1="0" x2="227" y2="42" stroke="#2563eb" strokeWidth="1" />
        <rect x="227" y="0" width="113" height="42" fill="#dcfce7" rx="0 4 4 0" stroke="#16a34a" strokeWidth="1" />
        <text x="283" y="15" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">目的変数</text>
        <text x="283" y="28" textAnchor="middle" fontSize="10" fill="#334155">y: 家賃 (万円)</text>
      </g>

      {/* Arrow diagram: multiple x → y */}
      <g transform="translate(0,112)">
        {/* x1 box */}
        <rect x="40" y="0" width="70" height="24" fill="#dbeafe" rx="4" stroke="#2563eb" strokeWidth="1.5" />
        <text x="75" y="16" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">x₁</text>

        {/* x2 box */}
        <rect x="40" y="32" width="70" height="24" fill="#dbeafe" rx="4" stroke="#2563eb" strokeWidth="1.5" />
        <text x="75" y="48" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">x₂</text>

        {/* y box */}
        <rect x="250" y="12" width="80" height="28" fill="#dcfce7" rx="4" stroke="#16a34a" strokeWidth="1.5" />
        <text x="290" y="31" textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">y</text>

        {/* Arrows */}
        <line x1="110" y1="12" x2="248" y2="24" stroke="#334155" strokeWidth="1.5" markerEnd="url(#mrArrow)" />
        <line x1="110" y1="44" x2="248" y2="30" stroke="#334155" strokeWidth="1.5" markerEnd="url(#mrArrow)" />

        {/* Coefficients on arrows */}
        <text x="175" y="10" textAnchor="middle" fontSize="9" fill="#dc2626">β₁</text>
        <text x="175" y="48" textAnchor="middle" fontSize="9" fill="#dc2626">β₂</text>

        {/* Label */}
        <text x="200" y="60" textAnchor="middle" fontSize="9" fill="#64748b">多数の説明変数 → 目的変数</text>
      </g>

      <defs>
        <marker id="mrArrow" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="#334155" />
        </marker>
      </defs>
    </svg>
  );
}

function FactorAnalysisDiagram() {
  return (
    <svg viewBox="0 0 400 180" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">因子分析</text>

      {/* Latent factors (circles) */}
      <circle cx="100" cy="90" r="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="100" y="87" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">F₁</text>
      <text x="100" y="100" textAnchor="middle" fontSize="8" fill="#2563eb">因子1</text>

      <circle cx="100" cy="160" r="0" /> {/* spacer */}

      <circle cx="200" cy="90" r="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="200" y="87" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b45309">F₂</text>
      <text x="200" y="100" textAnchor="middle" fontSize="8" fill="#b45309">因子2</text>

      {/* Label for latent factors */}
      <text x="150" y="42" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">潜在因子</text>
      <rect x="80" y="44" width="140" height="1" fill="#7c3aed" opacity="0.3" />

      {/* Observed variables (rectangles) */}
      {[
        { label: "x₁", x: 280, y: 28 },
        { label: "x₂", x: 280, y: 58 },
        { label: "x₃", x: 280, y: 88 },
        { label: "x₄", x: 280, y: 118 },
        { label: "x₅", x: 280, y: 148 },
      ].map((v, i) => (
        <g key={i}>
          <rect x={v.x} y={v.y} width="50" height="22" fill="#f0fdf4" rx="3" stroke="#16a34a" strokeWidth="1.5" />
          <text x={v.x + 25} y={v.y + 15} textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">{v.label}</text>
        </g>
      ))}

      {/* Label for observed variables */}
      <text x="305" y="22" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">観測変数</text>

      {/* Arrows from F1 to x1, x2, x3 */}
      <line x1="130" y1="80" x2="278" y2="39" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#faArrowB)" />
      <line x1="130" y1="86" x2="278" y2="69" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#faArrowB)" />
      <line x1="130" y1="92" x2="278" y2="99" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#faArrowB)" />

      {/* Factor loading labels for F1 */}
      <text x="200" y="52" textAnchor="middle" fontSize="7" fill="#2563eb">λ₁₁</text>
      <text x="210" y="72" textAnchor="middle" fontSize="7" fill="#2563eb">λ₁₂</text>
      <text x="210" y="100" textAnchor="middle" fontSize="7" fill="#2563eb">λ₁₃</text>

      {/* Arrows from F2 to x3, x4, x5 */}
      <line x1="228" y1="84" x2="278" y2="99" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#faArrowY)" />
      <line x1="228" y1="96" x2="278" y2="129" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#faArrowY)" />
      <line x1="228" y1="105" x2="278" y2="159" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#faArrowY)" />

      {/* Factor loading labels for F2 */}
      <text x="258" y="88" textAnchor="middle" fontSize="7" fill="#b45309">λ₂₃</text>
      <text x="260" y="118" textAnchor="middle" fontSize="7" fill="#b45309">λ₂₄</text>
      <text x="260" y="142" textAnchor="middle" fontSize="7" fill="#b45309">λ₂₅</text>

      {/* Bottom note */}
      <text x="200" y="178" textAnchor="middle" fontSize="9" fill="#64748b">少数の潜在因子で多数の観測変数の相関構造を説明</text>

      <defs>
        <marker id="faArrowB" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <path d="M0,0 L6,2.5 L0,5" fill="#2563eb" />
        </marker>
        <marker id="faArrowY" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <path d="M0,0 L6,2.5 L0,5" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  );
}

function MissingDataDiagram() {
  const Cell = ({ x, y, w, h, missing }: { x: number; y: number; w: number; h: number; missing?: boolean; color: string }) => (
    <rect x={x} y={y} width={w} height={h} fill={missing ? "#fee2e2" : "#f8fafc"} stroke={missing ? "#dc2626" : "#94a3b8"} strokeWidth={missing ? "1.5" : "0.8"} rx="1" />
  );

  /* Each mini table: 3 cols x 4 rows */
  const tw = 105; // table width
  const cw = 35; // cell width
  const rh = 11; // row height

  return (
    <svg viewBox="0 0 400 180" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">欠損値の処理</text>

      {/* MCAR table */}
      <g transform="translate(15,22)">
        <text x={tw / 2} y="10" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">MCAR</text>
        <text x={tw / 2} y="20" textAnchor="middle" fontSize="7" fill="#64748b">完全にランダム</text>
        {/* Header */}
        {[0,1,2].map(c => <Cell key={c} x={c * cw} y={24} w={cw} h={rh} color="#94a3b8" />)}
        {/* Data rows with random missing */}
        {[[false,false,false],[true,false,false],[false,false,true],[false,true,false]].map((row, r) =>
          row.map((m, c) => <Cell key={`${r}-${c}`} x={c * cw} y={35 + r * rh} w={cw} h={rh} missing={m} color="#94a3b8" />)
        )}
        {/* Missing indicators */}
        <text x={0 * cw + cw / 2} y={35 + 1 * rh + 8} textAnchor="middle" fontSize="6" fill="#dc2626">NA</text>
        <text x={2 * cw + cw / 2} y={35 + 2 * rh + 8} textAnchor="middle" fontSize="6" fill="#dc2626">NA</text>
        <text x={1 * cw + cw / 2} y={35 + 3 * rh + 8} textAnchor="middle" fontSize="6" fill="#dc2626">NA</text>
      </g>

      {/* MAR table */}
      <g transform="translate(145,22)">
        <text x={tw / 2} y="10" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">MAR</text>
        <text x={tw / 2} y="20" textAnchor="middle" fontSize="7" fill="#64748b">他の変数に依存</text>
        {[0,1,2].map(c => <Cell key={c} x={c * cw} y={24} w={cw} h={rh} color="#94a3b8" />)}
        {/* Missing pattern depends on column 0 */}
        {[[false,false,false],[false,true,false],[false,false,false],[false,true,false]].map((row, r) =>
          row.map((m, c) => <Cell key={`${r}-${c}`} x={c * cw} y={35 + r * rh} w={cw} h={rh} missing={m} color="#94a3b8" />)
        )}
        <text x={1 * cw + cw / 2} y={35 + 1 * rh + 8} textAnchor="middle" fontSize="6" fill="#dc2626">NA</text>
        <text x={1 * cw + cw / 2} y={35 + 3 * rh + 8} textAnchor="middle" fontSize="6" fill="#dc2626">NA</text>
        {/* Arrow showing dependency */}
        <line x1={0 * cw + cw / 2} y1={35 + 4 * rh + 4} x2={1 * cw + cw / 2} y2={35 + 4 * rh + 4} stroke="#f59e0b" strokeWidth="1" markerEnd="url(#mdArrow)" />
        <text x={tw / 2} y={35 + 4 * rh + 14} textAnchor="middle" fontSize="6" fill="#f59e0b">パターンあり</text>
      </g>

      {/* MNAR table */}
      <g transform="translate(275,22)">
        <text x={tw / 2} y="10" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">MNAR</text>
        <text x={tw / 2} y="20" textAnchor="middle" fontSize="7" fill="#64748b">欠損値自体に依存</text>
        {[0,1,2].map(c => <Cell key={c} x={c * cw} y={24} w={cw} h={rh} color="#94a3b8" />)}
        {/* Systematic missing in column 2 */}
        {[[false,false,true],[false,false,true],[false,false,true],[false,false,false]].map((row, r) =>
          row.map((m, c) => <Cell key={`${r}-${c}`} x={c * cw} y={35 + r * rh} w={cw} h={rh} missing={m} color="#94a3b8" />)
        )}
        <text x={2 * cw + cw / 2} y={35 + 0 * rh + 8} textAnchor="middle" fontSize="6" fill="#dc2626">NA</text>
        <text x={2 * cw + cw / 2} y={35 + 1 * rh + 8} textAnchor="middle" fontSize="6" fill="#dc2626">NA</text>
        <text x={2 * cw + cw / 2} y={35 + 2 * rh + 8} textAnchor="middle" fontSize="6" fill="#dc2626">NA</text>
      </g>

      {/* Strategy boxes */}
      <g transform="translate(0,120)">
        <text x="200" y="8" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">対処法</text>

        <rect x="20" y="14" width="105" height="35" fill="#f0fdf4" rx="5" stroke="#16a34a" strokeWidth="1.5" />
        <text x="72" y="29" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">リストワイズ削除</text>
        <text x="72" y="41" textAnchor="middle" fontSize="7" fill="#64748b">欠損行を除外</text>

        <rect x="145" y="14" width="105" height="35" fill="#dbeafe" rx="5" stroke="#2563eb" strokeWidth="1.5" />
        <text x="197" y="29" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">平均値代入</text>
        <text x="197" y="41" textAnchor="middle" fontSize="7" fill="#64748b">x̄ で補完</text>

        <rect x="270" y="14" width="112" height="35" fill="#faf5ff" rx="5" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="326" y="29" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">多重代入法</text>
        <text x="326" y="41" textAnchor="middle" fontSize="7" fill="#64748b">複数回の補完で推定</text>
      </g>

      <text x="200" y="176" textAnchor="middle" fontSize="8" fill="#64748b">MCAR: Missing Completely At Random / MAR: Missing At Random / MNAR: Missing Not At Random</text>

      <defs>
        <marker id="mdArrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <path d="M0,0 L6,2.5 L0,5" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  );
}

function RegularizationDiagram() {
  /* Contour ellipses (simplified as ellipses) */
  const contourRx = [25, 40, 55];
  const contourRy = [15, 24, 33];

  return (
    <svg viewBox="0 0 400 180" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">正則化: L1 (Lasso) vs L2 (Ridge)</text>

      {/* L1 Lasso - Left */}
      <g transform="translate(10,24)">
        <text x="90" y="12" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">L1 正則化 (Lasso)</text>
        <rect x="5" y="18" width="170" height="110" fill="#f8fafc" rx="4" />

        {/* Axes */}
        <line x1="90" y1="28" x2="90" y2="120" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="15" y1="73" x2="165" y2="73" stroke="#94a3b8" strokeWidth="0.8" />
        <text x="168" y="70" fontSize="7" fill="#64748b">β₁</text>
        <text x="93" y="27" fontSize="7" fill="#64748b">β₂</text>

        {/* Diamond constraint (L1 ball) */}
        <polygon points="90,43 120,73 90,103 60,73" fill="#dbeafe" opacity="0.5" stroke="#2563eb" strokeWidth="2" />

        {/* Contour ellipses (centered off-axis) */}
        {contourRx.map((rx, i) => (
          <ellipse key={i} cx="130" cy="50" rx={rx} ry={contourRy[i]} fill="none" stroke="#dc2626" strokeWidth="1" opacity={0.4 + i * 0.2} transform="rotate(30, 130, 50)" />
        ))}

        {/* Intersection point at axis (sparse solution) */}
        <circle cx="90" cy="53" r="4" fill="#dc2626" stroke="#dc2626" strokeWidth="1.5" />
        <text x="78" y="47" textAnchor="end" fontSize="7" fontWeight="600" fill="#dc2626">β₁=0</text>
        <text x="90" y="135" textAnchor="middle" fontSize="8" fontWeight="600" fill="#2563eb">特徴選択（スパース）</text>
        <text x="90" y="145" textAnchor="middle" fontSize="7" fill="#64748b">不要な係数 → 0 に</text>
      </g>

      {/* L2 Ridge - Right */}
      <g transform="translate(200,24)">
        <text x="95" y="12" textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">L2 正則化 (Ridge)</text>
        <rect x="5" y="18" width="170" height="110" fill="#f8fafc" rx="4" />

        {/* Axes */}
        <line x1="90" y1="28" x2="90" y2="120" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="15" y1="73" x2="165" y2="73" stroke="#94a3b8" strokeWidth="0.8" />
        <text x="168" y="70" fontSize="7" fill="#64748b">β₁</text>
        <text x="93" y="27" fontSize="7" fill="#64748b">β₂</text>

        {/* Circle constraint (L2 ball) */}
        <circle cx="90" cy="73" r="30" fill="#dcfce7" opacity="0.5" stroke="#16a34a" strokeWidth="2" />

        {/* Contour ellipses */}
        {contourRx.map((rx, i) => (
          <ellipse key={i} cx="130" cy="50" rx={rx} ry={contourRy[i]} fill="none" stroke="#dc2626" strokeWidth="1" opacity={0.4 + i * 0.2} transform="rotate(30, 130, 50)" />
        ))}

        {/* Intersection point off-axis */}
        <circle cx="108" cy="48" r="4" fill="#dc2626" stroke="#dc2626" strokeWidth="1.5" />
        <text x="108" y="42" textAnchor="middle" fontSize="7" fontWeight="600" fill="#dc2626">β₁≠0, β₂≠0</text>
        <text x="95" y="135" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">係数の縮小</text>
        <text x="95" y="145" textAnchor="middle" fontSize="7" fill="#64748b">全係数を小さく抑える</text>
      </g>

      {/* Bottom comparison */}
      <text x="200" y="178" textAnchor="middle" fontSize="9" fill="#64748b">損失関数 + λ|β| (L1) or λβ² (L2)　λ: 正則化パラメータ</text>
    </svg>
  );
}

/* ================================================================
   Export map
   ================================================================ */

export const mathStatsDiagrams: Record<string, () => ReactNode> = {
  "math-topic-01": NormalDistribution,
  "math-topic-02": BayesTheorem,
  "math-topic-03": HypothesisTesting,
  "math-topic-04": CorrelationScatter,
  "math-topic-05": MatrixBasics,
  "math-topic-06": ProbDistributions,
  "math-topic-07": DataVisualization,
  "math-topic-10": DataScales,
  "ds-topic-01": DescriptiveStatsDiagram,
  "ds-topic-03": ConfidenceIntervalDiagram,
  "ds-topic-04": ChiSquareDiagram,
  "ds-topic-05": TTestDiagram,
  "ds-topic-07": CentralLimitTheoremDiagram,
  "ds-topic-14": MultipleRegressionDiagram,
  "ds-topic-15": LogisticRegressionDiagram,
  "ds-topic-16": FactorAnalysisDiagram,
  "ds-topic-18": TimeSeriesDecomposition,
  "ds-topic-27": MissingDataDiagram,
  "ds-topic-36": RegularizationDiagram,
  "math-topic-12": AnovaDiagram,
  "math-topic-13": PcaMathDiagram,
  "math-topic-14": GradientDescentDiagram,
  "math-topic-16": SetTheoryDiagram,
};
