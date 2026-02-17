/** SVG-based diagrams for study topics, keyed by topic ID */
import type { ReactNode } from "react";

function NormalDistribution() {
  // Bell curve path
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
      {/* Shaded regions */}
      <path d={`${path} L${cx + 3.5 * sx},${cy} L${cx - 3.5 * sx},${cy} Z`} fill="#dbeafe" opacity="0.5" />
      {/* ±1σ shading */}
      <path d={`M${cx - sx},${cy} ${points.filter(([x]) => x >= -1 && x <= 1).map(([x, y]) => `L${cx + x * sx},${cy + y * sy}`).join(" ")} L${cx + sx},${cy} Z`} fill="#93c5fd" opacity="0.6" />
      {/* Curve */}
      <path d={path} fill="none" stroke="#2563eb" strokeWidth="2.5" />
      {/* Axis */}
      <line x1="20" y1={cy} x2="380" y2={cy} stroke="#64748b" strokeWidth="1" />
      {/* σ markers */}
      {[-3, -2, -1, 0, 1, 2, 3].map(s => (
        <g key={s}>
          <line x1={cx + s * sx} y1={cy - 4} x2={cx + s * sx} y2={cy + 4} stroke="#64748b" strokeWidth="1" />
          <text x={cx + s * sx} y={cy + 18} textAnchor="middle" fontSize="11" fill="#334155">
            {s === 0 ? "μ" : `${s > 0 ? "+" : ""}${s}σ`}
          </text>
        </g>
      ))}
      {/* Labels */}
      <text x={cx} y={cy - 105} textAnchor="middle" fontSize="12" fontWeight="600" fill="#2563eb">68.3%</text>
      {/* Bracket for ±1σ */}
      <line x1={cx - sx} y1={cy - 95} x2={cx + sx} y2={cy - 95} stroke="#2563eb" strokeWidth="1.5" />
      <line x1={cx - sx} y1={cy - 100} x2={cx - sx} y2={cy - 90} stroke="#2563eb" strokeWidth="1.5" />
      <line x1={cx + sx} y1={cy - 100} x2={cx + sx} y2={cy - 90} stroke="#2563eb" strokeWidth="1.5" />
      {/* ±2σ label */}
      <text x={cx} y={cy + 35} textAnchor="middle" fontSize="10" fill="#64748b">±2σ: 95.4% ／ ±3σ: 99.7%</text>
    </svg>
  );
}

function BayesTheorem() {
  return (
    <svg viewBox="0 0 400 170" className="topic-diagram">
      {/* Two overlapping circles */}
      <circle cx="155" cy="80" r="60" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" opacity="0.7" />
      <circle cx="245" cy="80" r="60" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" opacity="0.7" />
      {/* Intersection */}
      <clipPath id="clipA"><circle cx="155" cy="80" r="60" /></clipPath>
      <circle cx="245" cy="80" r="60" fill="#bbf7d0" opacity="0.7" clipPath="url(#clipA)" />
      {/* Labels */}
      <text x="120" y="78" textAnchor="middle" fontSize="16" fontWeight="700" fill="#2563eb">A</text>
      <text x="280" y="78" textAnchor="middle" fontSize="16" fontWeight="700" fill="#b45309">B</text>
      <text x="200" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="#15803d">A∩B</text>
      {/* Formula */}
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

  // Rejection region (right tail, α = 0.05, z ≈ 1.96)
  const rejPath = points.filter(([x]) => x >= 1.96).map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${cx + x * sx},${cy + y * sy}`
  ).join(" ");
  const rejLeft = points.filter(([x]) => x <= -1.96).map(([x, y], i) =>
    `${i === 0 ? "M" : "L"}${cx + x * sx},${cy + y * sy}`
  ).join(" ");

  return (
    <svg viewBox="0 0 400 185" className="topic-diagram">
      <text x={cx} y="14" textAnchor="middle" fontSize="12" fontWeight="600" fill="#2563eb">帰無仮説 H₀ の分布</text>
      {/* Full curve background */}
      <path d={`${path} L${cx + 3.5 * sx},${cy} L${cx - 3.5 * sx},${cy} Z`} fill="#dbeafe" opacity="0.4" />
      {/* Rejection regions */}
      <path d={`${rejPath} L${cx + 3.5 * sx},${cy} L${cx + 1.96 * sx},${cy} Z`} fill="#fee2e2" />
      <path d={`${rejLeft} L${cx - 1.96 * sx},${cy} L${cx - 3.5 * sx},${cy} Z`} fill="#fee2e2" />
      {/* Curve */}
      <path d={path} fill="none" stroke="#2563eb" strokeWidth="2" />
      {/* Axis */}
      <line x1="30" y1={cy} x2="370" y2={cy} stroke="#64748b" strokeWidth="1" />
      {/* Critical value lines */}
      <line x1={cx + 1.96 * sx} y1="30" x2={cx + 1.96 * sx} y2={cy} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1={cx - 1.96 * sx} y1="30" x2={cx - 1.96 * sx} y2={cy} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      {/* Labels */}
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="11" fill="#334155">0</text>
      <text x={cx + 1.96 * sx} y={cy + 18} textAnchor="middle" fontSize="10" fill="#dc2626">+1.96</text>
      <text x={cx - 1.96 * sx} y={cy + 18} textAnchor="middle" fontSize="10" fill="#dc2626">-1.96</text>
      <text x={cx + 2.8 * sx} y="52" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">棄却域</text>
      <text x={cx - 2.8 * sx} y="52" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">棄却域</text>
      <text x={cx} y="52" textAnchor="middle" fontSize="10" fill="#64748b">採択域 (α=0.05)</text>
      {/* Error labels */}
      <text x="50" y={cy + 40} fontSize="10" fill="#dc2626">第1種の過誤(α): 真なのに棄却</text>
      <text x="50" y={cy + 58} fontSize="10" fill="#f59e0b">第2種の過誤(β): 偽なのに棄却しない</text>
    </svg>
  );
}

function CorrelationScatter() {
  // Three scatter patterns
  const pos = [[30,120],[45,105],[55,95],[65,80],[80,70],[90,55],[105,50],[115,40],[130,30]];
  const neg = [[30,30],[45,45],[55,55],[65,70],[80,80],[90,95],[105,100],[115,115],[130,120]];
  const none = [[30,70],[45,40],[55,100],[65,60],[80,30],[90,90],[105,50],[115,80],[130,65]];
  return (
    <svg viewBox="0 0 480 150" className="topic-diagram">
      {/* Positive */}
      <g transform="translate(0,0)">
        <text x="80" y="14" textAnchor="middle" fontSize="11" fontWeight="600" fill="#16a34a">正の相関 (r≒1)</text>
        <rect x="15" y="20" width="130" height="125" fill="#f0fdf4" rx="6" />
        {pos.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#16a34a" opacity="0.8" />)}
        <line x1="25" y1="125" x2="135" y2="25" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,3" />
      </g>
      {/* Negative */}
      <g transform="translate(165,0)">
        <text x="80" y="14" textAnchor="middle" fontSize="11" fontWeight="600" fill="#dc2626">負の相関 (r≒-1)</text>
        <rect x="15" y="20" width="130" height="125" fill="#fef2f2" rx="6" />
        {neg.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#dc2626" opacity="0.8" />)}
        <line x1="25" y1="25" x2="135" y2="125" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
      </g>
      {/* None */}
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
      {/* Matrix A */}
      <text x="45" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2563eb">A</text>
      <rect x="10" y="25" width="70" height="60" fill="#dbeafe" rx="4" stroke="#2563eb" strokeWidth="1.5" />
      <text x="30" y="50" textAnchor="middle" fontSize="13" fill="#334155">1</text>
      <text x="60" y="50" textAnchor="middle" fontSize="13" fill="#334155">2</text>
      <text x="30" y="75" textAnchor="middle" fontSize="13" fill="#334155">3</text>
      <text x="60" y="75" textAnchor="middle" fontSize="13" fill="#334155">4</text>
      {/* × */}
      <text x="100" y="62" textAnchor="middle" fontSize="16" fill="#64748b">×</text>
      {/* Vector v */}
      <text x="140" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#16a34a">v</text>
      <rect x="120" y="25" width="40" height="60" fill="#dcfce7" rx="4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="140" y="50" textAnchor="middle" fontSize="13" fill="#334155">x</text>
      <text x="140" y="75" textAnchor="middle" fontSize="13" fill="#334155">y</text>
      {/* = */}
      <text x="180" y="62" textAnchor="middle" fontSize="16" fill="#64748b">=</text>
      {/* λv */}
      <text x="218" y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f59e0b">λv</text>
      <rect x="195" y="25" width="46" height="60" fill="#fef3c7" rx="4" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="218" y="50" textAnchor="middle" fontSize="13" fill="#334155">λx</text>
      <text x="218" y="75" textAnchor="middle" fontSize="13" fill="#334155">λy</text>
      {/* Explanation */}
      <text x="300" y="40" textAnchor="middle" fontSize="11" fill="#334155">Av = λv</text>
      <text x="300" y="58" textAnchor="middle" fontSize="10" fill="#2563eb">v: 固有ベクトル</text>
      <text x="300" y="73" textAnchor="middle" fontSize="10" fill="#f59e0b">λ: 固有値</text>
      <text x="200" y="112" textAnchor="middle" fontSize="10" fill="#64748b">逆行列の存在条件: det(A) ≠ 0</text>
    </svg>
  );
}

function ProbDistributions() {
  // Poisson-like shape
  const poisson = [0,1,2,3,4,5,6,7,8].map(k => {
    const lambda = 3;
    const p = Math.pow(lambda, k) * Math.exp(-lambda) / [1,1,2,6,24,120,720,5040,40320][k];
    return [k, p] as [number, number];
  });
  return (
    <svg viewBox="0 0 400 165" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">代表的な確率分布</text>
      {/* Poisson bars */}
      <g transform="translate(20,25)">
        <text x="65" y="10" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">ポアソン分布 (λ=3)</text>
        {poisson.map(([k, p], i) => (
          <g key={i}>
            <rect x={k * 17 + 5} y={100 - p * 300} width="12" height={p * 300} fill="#7c3aed" opacity="0.7" rx="2" />
            <text x={k * 17 + 11} y="116" textAnchor="middle" fontSize="8" fill="#64748b">{k}</text>
          </g>
        ))}
      </g>
      {/* Normal curve */}
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
      {/* Legend */}
      <text x="200" y="158" textAnchor="middle" fontSize="9" fill="#64748b">離散型: ベルヌーイ / 二項 / ポアソン ｜ 連続型: 正規 / 指数 / 一様</text>
    </svg>
  );
}

function LearningTypes() {
  const boxW = 110, boxH = 55, gap = 15;
  return (
    <svg viewBox="0 0 400 175" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">機械学習の3分類</text>
      {/* 教師あり学習 */}
      <rect x={25} y={30} width={boxW} height={boxH} fill="#dbeafe" rx="8" stroke="#2563eb" strokeWidth="2" />
      <text x={25 + boxW / 2} y={52} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563eb">教師あり学習</text>
      <text x={25 + boxW / 2} y={68} textAnchor="middle" fontSize="9" fill="#64748b">入力 + 正解ラベル</text>
      {/* 教師なし学習 */}
      <rect x={25 + boxW + gap} y={30} width={boxW} height={boxH} fill="#dcfce7" rx="8" stroke="#16a34a" strokeWidth="2" />
      <text x={25 + boxW + gap + boxW / 2} y={52} textAnchor="middle" fontSize="11" fontWeight="700" fill="#16a34a">教師なし学習</text>
      <text x={25 + boxW + gap + boxW / 2} y={68} textAnchor="middle" fontSize="9" fill="#64748b">ラベルなしデータ</text>
      {/* 強化学習 */}
      <rect x={25 + 2 * (boxW + gap)} y={30} width={boxW} height={boxH} fill="#fef3c7" rx="8" stroke="#f59e0b" strokeWidth="2" />
      <text x={25 + 2 * (boxW + gap) + boxW / 2} y={52} textAnchor="middle" fontSize="11" fontWeight="700" fill="#b45309">強化学習</text>
      <text x={25 + 2 * (boxW + gap) + boxW / 2} y={68} textAnchor="middle" fontSize="9" fill="#64748b">行動 + 報酬</text>
      {/* Sub items */}
      <g transform="translate(0,100)">
        <text x={80} y={0} textAnchor="middle" fontSize="9" fill="#2563eb">分類 / 回帰</text>
        <text x={80} y={14} textAnchor="middle" fontSize="8" fill="#64748b">RF, SVM, NN</text>
        <text x={80} y={36} textAnchor="middle" fontSize="8" fill="#64748b">決定木, ロジスティック</text>
        <text x={200 + gap} y={0} textAnchor="middle" fontSize="9" fill="#16a34a">クラスタリング / 次元削減</text>
        <text x={200 + gap} y={14} textAnchor="middle" fontSize="8" fill="#64748b">k-means, PCA</text>
        <text x={200 + gap} y={36} textAnchor="middle" fontSize="8" fill="#64748b">オートエンコーダ</text>
        <text x={25 + 2 * (boxW + gap) + boxW / 2} y={0} textAnchor="middle" fontSize="9" fill="#b45309">方策学習</text>
        <text x={25 + 2 * (boxW + gap) + boxW / 2} y={14} textAnchor="middle" fontSize="8" fill="#64748b">Q学習, DQN</text>
      </g>
      {/* Arrows */}
      {[80, 200 + gap, 25 + 2 * (boxW + gap) + boxW / 2].map((x, i) => (
        <line key={i} x1={x} y1={85} x2={x} y2={95} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
      ))}
      <defs>
        <marker id="arrowGray" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

function NeuralNetwork() {
  const layers = [3, 4, 4, 2];
  const lx = [60, 155, 250, 345];
  const colors = ["#2563eb", "#7c3aed", "#7c3aed", "#dc2626"];
  const getY = (layer: number, node: number) => {
    const total = layers[layer];
    const spacing = 26;
    const startY = 70 - ((total - 1) * spacing) / 2;
    return startY + node * spacing;
  };
  return (
    <svg viewBox="0 0 400 170" className="topic-diagram">
      {/* Connections */}
      {layers.map((_, li) => {
        if (li === 0) return null;
        const elems = [];
        for (let a = 0; a < layers[li - 1]; a++) {
          for (let b = 0; b < layers[li]; b++) {
            elems.push(
              <line key={`${li}-${a}-${b}`}
                x1={lx[li - 1]} y1={getY(li - 1, a)}
                x2={lx[li]} y2={getY(li, b)}
                stroke="#cbd5e1" strokeWidth="0.7" />
            );
          }
        }
        return elems;
      })}
      {/* Nodes */}
      {layers.map((count, li) =>
        Array.from({length: count}, (_, ni) => (
          <circle key={`${li}-${ni}`}
            cx={lx[li]} cy={getY(li, ni)} r="10"
            fill="white" stroke={colors[li]} strokeWidth="2" />
        ))
      )}
      {/* Labels */}
      <text x={lx[0]} y="135" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">入力層</text>
      <text x={(lx[1] + lx[2]) / 2} y="135" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">隠れ層</text>
      <text x={lx[3]} y="135" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">出力層</text>
      <text x="200" y="158" textAnchor="middle" fontSize="9" fill="#64748b">CNN=画像 / RNN=系列 / Transformer=自己注意</text>
    </svg>
  );
}

function EnsembleLearning() {
  return (
    <svg viewBox="0 0 440 155" className="topic-diagram">
      {/* Bagging */}
      <g transform="translate(0,0)">
        <text x="105" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563eb">バギング (並列)</text>
        <rect x="55" y="22" width="100" height="24" fill="#dbeafe" rx="4" stroke="#2563eb" strokeWidth="1.5" />
        <text x="105" y="39" textAnchor="middle" fontSize="9" fill="#334155">訓練データ</text>
        {[30, 80, 130].map((x, i) => (
          <g key={i}>
            <line x1="105" y1="46" x2={x + 25} y2="60" stroke="#94a3b8" strokeWidth="1" />
            <rect x={x} y="60" width="50" height="22" fill="#e0f2fe" rx="3" />
            <text x={x + 25} y="75" textAnchor="middle" fontSize="8" fill="#334155">モデル{i + 1}</text>
          </g>
        ))}
        {[30, 80, 130].map((x, i) => (
          <line key={i} x1={x + 25} y1="82" x2="105" y2="102" stroke="#94a3b8" strokeWidth="1" />
        ))}
        <rect x="65" y="102" width="80" height="22" fill="#16a34a" rx="4" opacity="0.8" />
        <text x="105" y="117" textAnchor="middle" fontSize="9" fontWeight="600" fill="white">多数決/平均</text>
        <text x="105" y="142" textAnchor="middle" fontSize="8" fill="#64748b">例: ランダムフォレスト</text>
      </g>
      {/* Boosting */}
      <g transform="translate(225,0)">
        <text x="100" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">ブースティング (逐次)</text>
        {[0, 1, 2].map(i => (
          <g key={i}>
            <rect x={15 + i * 62} y="30" width="52" height="24" fill="#fef3c7" rx="3" stroke="#f59e0b" strokeWidth="1" />
            <text x={41 + i * 62} y="46" textAnchor="middle" fontSize="8" fill="#334155">モデル{i + 1}</text>
            {i < 2 && (
              <>
                <line x1={67 + i * 62} y1="42" x2={77 + i * 62} y2="42" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />
                <text x={72 + i * 62} y="27" textAnchor="middle" fontSize="7" fill="#dc2626">残差</text>
              </>
            )}
          </g>
        ))}
        {/* Arrow down to result */}
        <line x1="100" y1="54" x2="100" y2="72" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGrayE)" />
        <rect x="45" y="78" width="110" height="24" fill="#16a34a" rx="4" opacity="0.8" />
        <text x="100" y="94" textAnchor="middle" fontSize="9" fontWeight="600" fill="white">重み付き合計</text>
        <text x="100" y="120" textAnchor="middle" fontSize="8" fill="#64748b">例: XGBoost, LightGBM</text>
      </g>
      <defs>
        <marker id="arrowOrange" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
        </marker>
        <marker id="arrowGrayE" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

function ConfusionMatrix() {
  return (
    <svg viewBox="0 0 420 170" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">混同行列と評価指標</text>
      {/* Matrix grid */}
      <g transform="translate(15,28)">
        <text x="115" y="8" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">予測</text>
        <text x="80" y="22" textAnchor="middle" fontSize="9" fill="#64748b">陽性</text>
        <text x="145" y="22" textAnchor="middle" fontSize="9" fill="#64748b">陰性</text>
        {/* "実際" label - left side, not rotated */}
        <text x="12" y="52" textAnchor="middle" fontSize="9" fill="#64748b">実</text>
        <text x="12" y="64" textAnchor="middle" fontSize="9" fill="#64748b">際</text>
        <text x="32" y="48" textAnchor="middle" fontSize="9" fill="#64748b">陽性</text>
        <text x="32" y="90" textAnchor="middle" fontSize="9" fill="#64748b">陰性</text>
        {/* Cells */}
        <rect x="50" y="30" width="65" height="35" fill="#dcfce7" stroke="#e2e8f0" strokeWidth="1" rx="4" />
        <text x="82" y="52" textAnchor="middle" fontSize="12" fontWeight="700" fill="#16a34a">TP</text>
        <rect x="115" y="30" width="65" height="35" fill="#fee2e2" stroke="#e2e8f0" strokeWidth="1" rx="4" />
        <text x="147" y="52" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">FN</text>
        <rect x="50" y="65" width="65" height="35" fill="#fee2e2" stroke="#e2e8f0" strokeWidth="1" rx="4" />
        <text x="82" y="87" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">FP</text>
        <rect x="115" y="65" width="65" height="35" fill="#dcfce7" stroke="#e2e8f0" strokeWidth="1" rx="4" />
        <text x="147" y="87" textAnchor="middle" fontSize="12" fontWeight="700" fill="#16a34a">TN</text>
      </g>
      {/* Formulas */}
      <g transform="translate(230,30)">
        <rect x="0" y="0" width="175" height="26" fill="#dbeafe" rx="4" />
        <text x="87" y="18" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">Precision = TP/(TP+FP)</text>
        <rect x="0" y="32" width="175" height="26" fill="#fef3c7" rx="4" />
        <text x="87" y="50" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b45309">Recall = TP/(TP+FN)</text>
        <rect x="0" y="64" width="175" height="26" fill="#dcfce7" rx="4" />
        <text x="87" y="82" textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">F1 = 2PR/(P+R)</text>
        <rect x="0" y="96" width="175" height="26" fill="#f3e8ff" rx="4" />
        <text x="87" y="114" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">AUC: 0.5=ランダム, 1.0=完璧</text>
      </g>
    </svg>
  );
}

function BiasVariance() {
  // Two curves: bias decreasing, variance increasing
  const n = 50;
  return (
    <svg viewBox="0 0 400 190" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">バイアス-バリアンス トレードオフ</text>
      {/* Axes */}
      <line x1="60" y1="140" x2="370" y2="140" stroke="#64748b" strokeWidth="1" />
      <line x1="60" y1="140" x2="60" y2="38" stroke="#64748b" strokeWidth="1" />
      <text x="215" y="158" textAnchor="middle" fontSize="10" fill="#64748b">モデルの複雑さ →</text>
      <text x="30" y="90" textAnchor="middle" fontSize="10" fill="#64748b" transform="rotate(-90,30,90)">誤差</text>
      {/* Bias curve (decreasing) */}
      <path d={Array.from({length: n}, (_, i) => {
        const x = 60 + i * 6.2;
        const y = 130 - 80 * Math.exp(-i * 0.06);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      }).join(" ")} fill="none" stroke="#2563eb" strokeWidth="2.5" />
      {/* Variance curve (increasing) */}
      <path d={Array.from({length: n}, (_, i) => {
        const x = 60 + i * 6.2;
        const y = 135 - 5 * Math.exp(i * 0.05);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      }).join(" ")} fill="none" stroke="#dc2626" strokeWidth="2.5" />
      {/* Total error (U-shape) */}
      <path d={Array.from({length: n}, (_, i) => {
        const x = 60 + i * 6.2;
        const bias = 80 * Math.exp(-i * 0.06);
        const variance = 5 * Math.exp(i * 0.05);
        const y = 135 - bias - variance + 80;
        return `${i === 0 ? "M" : "L"}${x},${Math.max(38, y)}`;
      }).join(" ")} fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="6,3" />
      {/* Optimal point */}
      <line x1="180" y1="38" x2="180" y2="140" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
      <text x="180" y="34" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">最適点</text>
      {/* Legend */}
      <line x1="80" y1="178" x2="100" y2="178" stroke="#2563eb" strokeWidth="2.5" />
      <text x="104" y="182" fontSize="9" fill="#2563eb">バイアス²</text>
      <line x1="165" y1="178" x2="185" y2="178" stroke="#dc2626" strokeWidth="2.5" />
      <text x="189" y="182" fontSize="9" fill="#dc2626">バリアンス</text>
      <line x1="255" y1="178" x2="275" y2="178" stroke="#16a34a" strokeWidth="2" strokeDasharray="6,3" />
      <text x="279" y="182" fontSize="9" fill="#16a34a">総合誤差</text>
    </svg>
  );
}

function DimensionReduction() {
  // PCA-like projection
  const pts = [
    [50,85],[70,68],[85,55],[100,62],[115,42],[130,50],[145,38],[155,28],[90,75],[110,55]
  ];
  return (
    <svg viewBox="0 0 400 165" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">PCA（主成分分析）のイメージ</text>
      {/* 2D data */}
      <g transform="translate(10,20)">
        <rect x="15" y="5" width="160" height="105" fill="#f8fafc" rx="6" />
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#2563eb" opacity="0.7" />)}
        {/* PC1 axis */}
        <line x1="35" y1="95" x2="165" y2="18" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,3" />
        <text x="165" y="14" fontSize="9" fontWeight="600" fill="#dc2626">PC1</text>
        {/* PC2 axis */}
        <line x1="70" y1="18" x2="140" y2="90" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,3" />
        <text x="145" y="95" fontSize="9" fontWeight="600" fill="#16a34a">PC2</text>
        <text x="95" y="125" textAnchor="middle" fontSize="9" fill="#64748b">2次元データ</text>
      </g>
      {/* Arrow */}
      <text x="200" y="80" textAnchor="middle" fontSize="18" fill="#94a3b8">→</text>
      {/* 1D projection */}
      <g transform="translate(220,20)">
        <rect x="15" y="5" width="160" height="105" fill="#f8fafc" rx="6" />
        <line x1="30" y1="58" x2="165" y2="58" stroke="#dc2626" strokeWidth="2" />
        {pts.map(([x], i) => <circle key={i} cx={x + 15} cy={58} r="4" fill="#2563eb" opacity="0.7" />)}
        <text x="95" y="82" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">第1主成分 (PC1)</text>
        <text x="95" y="97" textAnchor="middle" fontSize="8" fill="#64748b">分散が最大の方向に射影</text>
        <text x="95" y="125" textAnchor="middle" fontSize="9" fill="#64748b">1次元に削減</text>
      </g>
    </svg>
  );
}

function SqlJoins() {
  const r = 26;
  return (
    <svg viewBox="0 0 420 120" className="topic-diagram">
      {/* INNER JOIN */}
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
      {/* LEFT JOIN */}
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
      {/* RIGHT JOIN */}
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
      {/* FULL OUTER */}
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
    <svg viewBox="0 0 400 145" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">正規化のステップ</text>
      {/* Step boxes */}
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
      {/* ACID */}
      <g transform="translate(10,95)">
        <text x="0" y="0" fontSize="10" fontWeight="600" fill="#334155">ACID特性:</text>
        {["Atomicity\n(原子性)", "Consistency\n(一貫性)", "Isolation\n(分離性)", "Durability\n(耐久性)"].map((label, i) => (
          <g key={i}>
            <rect x={70 + i * 80} y={-12} width="72" height="28" fill="#f1f5f9" rx="4" stroke="#e2e8f0" strokeWidth="1" />
            <text x={70 + i * 80 + 36} y={8} textAnchor="middle" fontSize="8" fill="#334155">{label.split("\n")[0]}</text>
            <text x={70 + i * 80 + 36} y="30" textAnchor="middle" fontSize="8" fill="#64748b">{label.split("\n")[1]}</text>
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
      {/* Triangle */}
      <polygon points="200,38 80,148 320,148" fill="none" stroke="#e2e8f0" strokeWidth="2" />
      {/* Vertices */}
      <circle cx="200" cy="38" r="20" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="200" y="42" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">C</text>
      <circle cx="80" cy="148" r="20" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="80" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#16a34a">A</text>
      <circle cx="320" cy="148" r="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="320" y="152" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b45309">P</text>
      {/* Labels */}
      <text x="235" y="34" fontSize="9" fill="#2563eb">Consistency (一貫性)</text>
      <text x="20" y="148" fontSize="9" fill="#16a34a">Availability</text>
      <text x="20" y="160" fontSize="9" fill="#16a34a">(可用性)</text>
      <text x="352" y="148" fontSize="9" fill="#b45309">Partition</text>
      <text x="352" y="160" fontSize="9" fill="#b45309">Tolerance</text>
      {/* Center text */}
      <text x="200" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">3つを同時に</text>
      <text x="200" y="119" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">完全には満たせない</text>
      {/* Edge labels */}
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
      {/* Sources */}
      <g transform="translate(0,22)">
        {["DB", "API", "CSV"].map((s, i) => (
          <g key={i}>
            <rect x="10" y={i * 28} width="45" height="22" fill="#f1f5f9" rx="4" stroke="#94a3b8" strokeWidth="1" />
            <text x="32" y={i * 28 + 15} textAnchor="middle" fontSize="9" fill="#64748b">{s}</text>
            <line x1="55" y1={i * 28 + 11} x2="75" y2={40} stroke="#94a3b8" strokeWidth="1" />
          </g>
        ))}
      </g>
      {/* ETL Stages */}
      {stages.map((s, i) => (
        <g key={i}>
          <rect x={80 + i * 100} y="38" width="82" height="44" fill={s.color} rx="10" stroke={s.border} strokeWidth="2" />
          <text x={121 + i * 100} y="56" textAnchor="middle" fontSize="16" fontWeight="800" fill={s.border}>{s.icon}</text>
          <text x={121 + i * 100} y="72" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">{s.label}</text>
          <text x={121 + i * 100} y="94" textAnchor="middle" fontSize="9" fill="#64748b">{s.sub}</text>
          {i < 2 && <text x={162 + i * 100} y="64" fontSize="16" fill="#94a3b8">→</text>}
        </g>
      ))}
      {/* Destination - positioned after Load box with clear gap */}
      <g>
        <line x1="365" y1="52" x2="390" y2="42" stroke="#94a3b8" strokeWidth="1" />
        <rect x="392" y="30" width="58" height="22" fill="#f1f5f9" rx="4" stroke="#94a3b8" strokeWidth="1" />
        <text x="421" y="45" textAnchor="middle" fontSize="8" fill="#64748b">DWH</text>
        <line x1="365" y1="68" x2="390" y2="78" stroke="#94a3b8" strokeWidth="1" />
        <rect x="392" y="68" width="58" height="22" fill="#f1f5f9" rx="4" stroke="#94a3b8" strokeWidth="1" />
        <text x="421" y="83" textAnchor="middle" fontSize="8" fill="#64748b">データレイク</text>
      </g>
      {/* Bottom note */}
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
      {/* Client */}
      <rect x="20" y="40" width="70" height="50" fill="#f1f5f9" rx="8" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="55" y="68" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">Client</text>
      {/* Server */}
      <rect x="310" y="40" width="70" height="50" fill="#f1f5f9" rx="8" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="345" y="68" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">Server</text>
      {/* Methods */}
      {methods.map((m, i) => (
        <g key={i}>
          <rect x={110 + i * 48} y="30" width="44" height="22" fill={m.bg} rx="4" stroke={m.color} strokeWidth="1.5" />
          <text x={132 + i * 48} y="45" textAnchor="middle" fontSize="9" fontWeight="700" fill={m.color}>{m.method}</text>
          <text x={132 + i * 48} y="68" textAnchor="middle" fontSize="9" fill="#64748b">{m.desc}</text>
        </g>
      ))}
      {/* Arrows */}
      <line x1="90" y1="55" x2="108" y2="42" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrowG2)" />
      <line x1="302" y1="42" x2="310" y2="55" stroke="#94a3b8" strokeWidth="1" />
      {/* Security note */}
      <rect x="60" y="100" width="280" height="26" fill="#fee2e2" rx="6" stroke="#dc2626" strokeWidth="1" />
      <text x="200" y="118" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">SQLインジェクション対策 → プリペアドステートメント</text>
      <defs>
        <marker id="arrowG2" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
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
      {/* Circle */}
      <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="#e2e8f0" strokeWidth="2" />
      {/* Arrows between phases */}
      {phases.map((_, i) => {
        const a1 = (phases[i].angle * Math.PI) / 180;
        const a2 = (phases[(i + 1) % 6].angle * Math.PI) / 180;
        const x1 = cx + (r + 8) * Math.cos(a1 + 0.15);
        const y1 = cy + (r + 8) * Math.sin(a1 + 0.15);
        const x2 = cx + (r + 8) * Math.cos(a2 - 0.15);
        const y2 = cy + (r + 8) * Math.sin(a2 - 0.15);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowCrisp)" />
        );
      })}
      {/* Phase nodes */}
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
      {/* Center label */}
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="8" fill="#64748b">CRISP-DM</text>
      {/* Phase number hints */}
      <text x="200" y="192" textAnchor="middle" fontSize="9" fill="#64748b">① ビジネス理解 → ② データ理解 → ③ 準備 → ④ モデリング → ⑤ 評価 → ⑥ 展開</text>
      <defs>
        <marker id="arrowCrisp" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

function KpiTree() {
  return (
    <svg viewBox="0 0 400 160" className="topic-diagram">
      {/* KGI */}
      <rect x="145" y="5" width="110" height="32" fill="#2563eb" rx="8" />
      <text x="200" y="26" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">KGI (売上)</text>
      {/* Lines */}
      <line x1="170" y1="37" x2="100" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="230" y1="37" x2="300" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
      {/* KPIs */}
      <rect x="40" y="55" width="120" height="28" fill="#dbeafe" rx="6" stroke="#2563eb" strokeWidth="1.5" />
      <text x="100" y="74" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">KPI: 顧客数</text>
      <rect x="240" y="55" width="120" height="28" fill="#dbeafe" rx="6" stroke="#2563eb" strokeWidth="1.5" />
      <text x="300" y="74" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">KPI: 客単価</text>
      {/* Sub KPIs */}
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
          {/* Pillar */}
          <rect x={15 + i * 98} y="24" width="85" height="75" fill={p.bg} rx="8" stroke={p.color} strokeWidth="2" />
          <text x={57 + i * 98} y="50" textAnchor="middle" fontSize="12" fontWeight="700" fill={p.color}>{p.label}</text>
          <text x={57 + i * 98} y="68" textAnchor="middle" fontSize="9" fill="#64748b">{p.sub}</text>
        </g>
      ))}
      {/* Bottom bar */}
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
      {/* Three axes as cards */}
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
      {/* Three overlapping circles (Venn) */}
      <circle cx="170" cy="78" r="48" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" opacity="0.5" />
      <circle cx="230" cy="78" r="48" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" opacity="0.5" />
      <circle cx="200" cy="125" r="48" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" opacity="0.5" />
      {/* Labels - positioned outside overlaps */}
      <text x="130" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">データ</text>
      <text x="130" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">サイエンス力</text>
      <text x="270" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a">データエンジ</text>
      <text x="270" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a">ニアリング力</text>
      <text x="200" y="155" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">ビジネス力</text>
      {/* Center */}
      <text x="200" y="97" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">DS</text>
      <text x="200" y="107" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">人材</text>
    </svg>
  );
}

// ==================== Additional diagrams ====================

function DataVisualization() {
  // Histogram bars
  const histBars = [15, 30, 50, 70, 55, 35, 20];
  // Scatter points
  const scatter = [[10,60],[18,50],[25,42],[32,35],[40,25],[48,20],[55,12]];
  return (
    <svg viewBox="0 0 480 145" className="topic-diagram">
      {/* Histogram */}
      <g transform="translate(0,0)">
        <text x="75" y="14" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">ヒストグラム</text>
        <rect x="10" y="20" width="130" height="115" fill="#f8fafc" rx="4" />
        {histBars.map((h, i) => (
          <rect key={i} x={18 + i * 17} y={120 - h} width="14" height={h} fill="#93c5fd" stroke="#2563eb" strokeWidth="0.5" rx="1" />
        ))}
        <line x1="15" y1="120" x2="140" y2="120" stroke="#64748b" strokeWidth="1" />
      </g>
      {/* Scatter */}
      <g transform="translate(165,0)">
        <text x="75" y="14" textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">散布図</text>
        <rect x="10" y="20" width="130" height="115" fill="#f0fdf4" rx="4" />
        {scatter.map(([x, y], i) => <circle key={i} cx={x + 15} cy={y + 30} r="4" fill="#16a34a" opacity="0.8" />)}
        <line x1="20" y1="100" x2="120" y2="30" stroke="#16a34a" strokeWidth="1" strokeDasharray="4,3" />
      </g>
      {/* Box plot */}
      <g transform="translate(330,0)">
        <text x="75" y="14" textAnchor="middle" fontSize="10" fontWeight="600" fill="#9333ea">箱ひげ図</text>
        <rect x="10" y="20" width="130" height="115" fill="#faf5ff" rx="4" />
        {/* Whiskers */}
        <line x1="75" y1="35" x2="75" y2="55" stroke="#9333ea" strokeWidth="1.5" />
        <line x1="60" y1="35" x2="90" y2="35" stroke="#9333ea" strokeWidth="1.5" />
        {/* Box */}
        <rect x="50" y="55" width="50" height="40" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" rx="2" />
        {/* Median */}
        <line x1="50" y1="72" x2="100" y2="72" stroke="#9333ea" strokeWidth="2.5" />
        {/* Lower whisker */}
        <line x1="75" y1="95" x2="75" y2="115" stroke="#9333ea" strokeWidth="1.5" />
        <line x1="60" y1="115" x2="90" y2="115" stroke="#9333ea" strokeWidth="1.5" />
        {/* Labels */}
        <text x="108" y="40" fontSize="8" fill="#9333ea">max</text>
        <text x="108" y="60" fontSize="8" fill="#9333ea">Q3</text>
        <text x="108" y="76" fontSize="8" fill="#9333ea">中央値</text>
        <text x="108" y="98" fontSize="8" fill="#9333ea">Q1</text>
        <text x="108" y="118" fontSize="8" fill="#9333ea">min</text>
      </g>
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
      {/* Operations row */}
      <text x="62" y="102" textAnchor="middle" fontSize="9" fill="#64748b">分類のみ</text>
      <text x="157" y="102" textAnchor="middle" fontSize="9" fill="#64748b">+ 順序比較</text>
      <text x="252" y="102" textAnchor="middle" fontSize="9" fill="#64748b">+ 差の計算</text>
      <text x="347" y="102" textAnchor="middle" fontSize="9" fill="#64748b">+ 比率・四則</text>
      {/* Bracket */}
      <line x1="20" y1="115" x2="195" y2="115" stroke="#f59e0b" strokeWidth="1" />
      <text x="107" y="130" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">質的データ</text>
      <line x1="210" y1="115" x2="395" y2="115" stroke="#2563eb" strokeWidth="1" />
      <text x="302" y="130" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">量的データ</text>
    </svg>
  );
}

function TransformerSimple() {
  return (
    <svg viewBox="0 0 400 180" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">Transformer 簡略構造</text>
      {/* Input */}
      <rect x="140" y="145" width="120" height="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="6" />
      <text x="200" y="164" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">入力埋め込み</text>
      {/* Attention */}
      <rect x="120" y="90" width="160" height="35" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" rx="6" />
      <text x="200" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b45309">Self-Attention</text>
      {/* FFN */}
      <rect x="140" y="38" width="120" height="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="6" />
      <text x="200" y="58" textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">Feed Forward</text>
      {/* Arrows */}
      <line x1="200" y1="145" x2="200" y2="127" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowT)" />
      <line x1="200" y1="90" x2="200" y2="70" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowT)" />
      {/* Attention lines */}
      <g opacity="0.4">
        <line x1="145" y1="145" x2="165" y2="127" stroke="#f59e0b" strokeWidth="1" />
        <line x1="200" y1="145" x2="200" y2="127" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="255" y1="145" x2="235" y2="127" stroke="#f59e0b" strokeWidth="1" />
      </g>
      {/* Labels */}
      <text x="310" y="107" fontSize="9" fill="#64748b">Q, K, V で</text>
      <text x="310" y="119" fontSize="9" fill="#64748b">重要度を計算</text>
      <text x="30" y="55" fontSize="9" fill="#64748b">×N層</text>
      <text x="30" y="68" fontSize="9" fill="#64748b">繰り返し</text>
      {/* Arrow marker */}
      <defs>
        <marker id="arrowT" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  );
}

function OneHotEncoding() {
  return (
    <svg viewBox="0 0 400 130" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">One-Hotエンコーディング</text>
      {/* Original table */}
      <g transform="translate(20,25)">
        <text x="35" y="12" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748b">元データ</text>
        <rect x="0" y="18" width="70" height="22" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" rx="3" />
        <text x="35" y="34" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">色</text>
        {["赤", "青", "緑"].map((v, i) => (
          <g key={i}>
            <rect x="0" y={40 + i * 20} width="70" height="20" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
            <text x="35" y={54 + i * 20} textAnchor="middle" fontSize="10" fill="#334155">{v}</text>
          </g>
        ))}
      </g>
      {/* Arrow */}
      <text x="135" y="72" fontSize="20" fill="#64748b">→</text>
      {/* Encoded table */}
      <g transform="translate(170,25)">
        <text x="100" y="12" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748b">One-Hot変換後</text>
        {["赤", "青", "緑"].map((v, i) => (
          <g key={i}>
            <rect x={i * 67} y="18" width="65" height="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" rx="3" />
            <text x={i * 67 + 32} y="34" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">色_{v}</text>
          </g>
        ))}
        {/* Data rows */}
        {[[1,0,0],[0,1,0],[0,0,1]].map((row, ri) => (
          <g key={ri}>
            {row.map((v, ci) => (
              <g key={ci}>
                <rect x={ci * 67} y={40 + ri * 20} width="65" height="20" fill={v ? "#fef3c7" : "#f8fafc"} stroke="#cbd5e1" strokeWidth="0.5" />
                <text x={ci * 67 + 32} y={54 + ri * 20} textAnchor="middle" fontSize="11" fontWeight={v ? "700" : "400"} fill={v ? "#b45309" : "#94a3b8"}>{v}</text>
              </g>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

function PythonBasics() {
  return (
    <svg viewBox="0 0 400 140" className="topic-diagram">
      {/* Variable */}
      <g>
        <rect x="15" y="10" width="105" height="55" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="8" />
        <text x="67" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">変数</text>
        <text x="67" y="48" textAnchor="middle" fontSize="9" fill="#334155" fontFamily="monospace">x = 10</text>
      </g>
      {/* Arrow */}
      <text x="135" y="42" fontSize="16" fill="#64748b">→</text>
      {/* List */}
      <g>
        <rect x="150" y="10" width="105" height="55" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="8" />
        <text x="202" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a">リスト</text>
        <text x="202" y="48" textAnchor="middle" fontSize="9" fill="#334155" fontFamily="monospace">[1, 2, 3]</text>
      </g>
      {/* Arrow */}
      <text x="270" y="42" fontSize="16" fill="#64748b">→</text>
      {/* Function */}
      <g>
        <rect x="285" y="10" width="105" height="55" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" rx="8" />
        <text x="337" y="30" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">関数</text>
        <text x="337" y="48" textAnchor="middle" fontSize="9" fill="#334155" fontFamily="monospace">def f(x):</text>
      </g>
      {/* Bottom: key libs */}
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
      {/* Column headers */}
      {layers.map((l, i) => (
        <g key={i}>
          <rect x={130 + i * 90} y="24" width="80" height="22" fill={l.bg} stroke={l.color} strokeWidth="1.5" rx="4" />
          <text x={170 + i * 90} y="39" textAnchor="middle" fontSize="10" fontWeight="700" fill={l.color}>{l.name}</text>
        </g>
      ))}
      {/* Row labels & cells */}
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
      {/* Legend */}
      <rect x="130" y="148" width="12" height="10" fill="#dcfce7" stroke="#e2e8f0" strokeWidth="0.5" />
      <text x="147" y="157" fontSize="8" fill="#64748b">提供者が管理</text>
      <rect x="230" y="148" width="12" height="10" fill="#fee2e2" stroke="#e2e8f0" strokeWidth="0.5" />
      <text x="247" y="157" fontSize="8" fill="#64748b">利用者が管理</text>
    </svg>
  );
}

function MeceLogicTree() {
  return (
    <svg viewBox="0 0 420 155" className="topic-diagram">
      {/* MECE side */}
      <text x="100" y="14" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">MECE（漏れなくダブりなく）</text>
      <circle cx="70" cy="55" r="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <circle cx="130" cy="55" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="60" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563eb">A</text>
      <text x="140" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#16a34a">B</text>
      <text x="100" y="100" textAnchor="middle" fontSize="9" fill="#dc2626">重複なし・漏れなし</text>
      {/* Logic tree side */}
      <g transform="translate(220,0)">
        <text x="90" y="14" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9333ea">ロジックツリー</text>
        {/* Root */}
        <rect x="55" y="22" width="70" height="22" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" rx="4" />
        <text x="90" y="37" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">課題</text>
        {/* Level 1 */}
        <line x1="90" y1="44" x2="40" y2="60" stroke="#9333ea" strokeWidth="1" />
        <line x1="90" y1="44" x2="140" y2="60" stroke="#9333ea" strokeWidth="1" />
        <rect x="10" y="60" width="60" height="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="3" />
        <text x="40" y="74" textAnchor="middle" fontSize="8" fill="#b45309">原因A</text>
        <rect x="110" y="60" width="60" height="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="3" />
        <text x="140" y="74" textAnchor="middle" fontSize="8" fill="#b45309">原因B</text>
        {/* Level 2 */}
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
            {i < 3 && <text x={x + 92} y="52" fontSize="14" fill="#94a3b8">→</text>}
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
      {/* Confounding variable */}
      <rect x="145" y="30" width="110" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="8" />
      <text x="200" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">交絡因子（気温）</text>
      {/* Variable A */}
      <rect x="25" y="95" width="130" height="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="8" />
      <text x="90" y="115" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">アイス売上</text>
      {/* Variable B */}
      <rect x="245" y="95" width="130" height="30" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" rx="8" />
      <text x="310" y="115" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">水難事故</text>
      {/* Causal arrows from confounder */}
      <line x1="170" y1="62" x2="100" y2="93" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowSC)" />
      <line x1="230" y1="62" x2="300" y2="93" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowSC)" />
      <text x="110" y="76" fontSize="8" fill="#f59e0b">因果</text>
      <text x="280" y="76" fontSize="8" fill="#f59e0b">因果</text>
      {/* Spurious correlation */}
      <line x1="155" y1="110" x2="245" y2="110" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3" />
      <text x="200" y="142" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">見かけの相関（疑似相関）</text>
      <defs>
        <marker id="arrowSC" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  );
}

function TTestDiagram() {
  // Two overlapping distributions
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
      {/* Group A */}
      <path d={curve(cx1)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <path d={`${curve(cx1)} L${cx1 + 3 * sx},${cy} L${cx1 - 3 * sx},${cy} Z`} fill="#2563eb" opacity="0.15" />
      {/* Group B */}
      <path d={curve(cx2)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <path d={`${curve(cx2)} L${cx2 + 3 * sx},${cy} L${cx2 - 3 * sx},${cy} Z`} fill="#dc2626" opacity="0.15" />
      {/* Axis */}
      <line x1="30" y1={cy} x2="370" y2={cy} stroke="#64748b" strokeWidth="1" />
      {/* Mean markers */}
      <line x1={cx1} y1={cy - 5} x2={cx1} y2={cy + 5} stroke="#2563eb" strokeWidth="2" />
      <line x1={cx2} y1={cy - 5} x2={cx2} y2={cy + 5} stroke="#dc2626" strokeWidth="2" />
      <text x={cx1} y={cy + 18} textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">x̄₁</text>
      <text x={cx2} y={cy + 18} textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">x̄₂</text>
      {/* Difference arrow */}
      <line x1={cx1} y1={cy + 28} x2={cx2} y2={cy + 28} stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowTT)" markerStart="url(#arrowTTr)" />
      <text x="200" y={cy + 42} textAnchor="middle" fontSize="9" fill="#334155">差が有意か？→ p値で判定</text>
      {/* Labels */}
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

function CnnFlow() {
  return (
    <svg viewBox="0 0 420 120" className="topic-diagram">
      {/* Input image */}
      <rect x="10" y="25" width="55" height="55" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="4" />
      <g>
        {[0,1,2,3,4].map(r => [0,1,2,3,4].map(c => (
          <rect key={`${r}-${c}`} x={14 + c * 10} y={29 + r * 10} width="8" height="8" fill={Math.random() > 0.5 ? "#93c5fd" : "#dbeafe"} rx="1" />
        )))}
      </g>
      <text x="37" y="95" textAnchor="middle" fontSize="8" fill="#2563eb">入力画像</text>
      {/* Arrow */}
      <text x="75" y="55" fontSize="12" fill="#64748b">→</text>
      {/* Conv */}
      <rect x="90" y="20" width="70" height="65" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" rx="6" />
      <text x="125" y="42" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b45309">畳み込み</text>
      <text x="125" y="55" textAnchor="middle" fontSize="8" fill="#64748b">特徴抽出</text>
      <rect x="100" y="60" width="15" height="15" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1" rx="2" />
      <text x="125" y="72" fontSize="7" fill="#b45309">フィルタ</text>
      <text x="125" y="95" textAnchor="middle" fontSize="8" fill="#f59e0b">Conv層</text>
      {/* Arrow */}
      <text x="170" y="55" fontSize="12" fill="#64748b">→</text>
      {/* Pooling */}
      <rect x="185" y="25" width="65" height="55" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="6" />
      <text x="217" y="47" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">プーリング</text>
      <text x="217" y="62" textAnchor="middle" fontSize="8" fill="#64748b">圧縮</text>
      <text x="217" y="95" textAnchor="middle" fontSize="8" fill="#16a34a">Pool層</text>
      {/* Arrow */}
      <text x="260" y="55" fontSize="12" fill="#64748b">→</text>
      {/* Repeat indicator */}
      <text x="280" y="50" fontSize="9" fill="#64748b">...×N</text>
      <text x="300" y="55" fontSize="12" fill="#64748b">→</text>
      {/* FC */}
      <rect x="315" y="25" width="60" height="55" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" rx="6" />
      <text x="345" y="47" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">全結合</text>
      <text x="345" y="62" textAnchor="middle" fontSize="8" fill="#64748b">分類</text>
      <text x="345" y="95" textAnchor="middle" fontSize="8" fill="#9333ea">FC層</text>
      {/* Output */}
      <text x="385" y="55" fontSize="12" fill="#64748b">→</text>
      <text x="412" y="45" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">犬</text>
      <text x="412" y="60" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">猫</text>
    </svg>
  );
}

function AttentionDiagram() {
  const words = ["I", "love", "cats"];
  // Attention weights (example)
  const weights = [
    [0.1, 0.2, 0.7],
    [0.1, 0.6, 0.3],
    [0.5, 0.1, 0.4],
  ];
  return (
    <svg viewBox="0 0 400 160" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">Self-Attention の概念</text>
      {/* Input words */}
      {words.map((w, i) => (
        <g key={i}>
          <rect x={60 + i * 100} y="28" width="70" height="24" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="6" />
          <text x={95 + i * 100} y="44" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563eb">{w}</text>
        </g>
      ))}
      {/* Attention weight matrix */}
      <text x="55" y="76" textAnchor="end" fontSize="9" fill="#64748b">注目度:</text>
      {weights.map((row, ri) => (
        <g key={ri}>
          {row.map((w, ci) => {
            const x = 60 + ci * 100;
            const y = 65 + ri * 25;
            return (
              <rect key={ci} x={x} y={y} width="70" height="22" fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.5" rx="3" opacity={0.3 + w * 0.7} />
            );
          })}
          {row.map((w, ci) => (
            <text key={ci} x={95 + ci * 100} y={80 + ri * 25} textAnchor="middle" fontSize="10" fill="#b45309">{w.toFixed(1)}</text>
          ))}
        </g>
      ))}
      {/* Labels */}
      <text x="200" y="152" textAnchor="middle" fontSize="9" fill="#64748b">各単語が他の単語にどれだけ注目するかを重みで表現</text>
    </svg>
  );
}

function StarSchema() {
  return (
    <svg viewBox="0 0 400 180" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">スタースキーマ</text>
      {/* Fact table (center) */}
      <rect x="145" y="65" width="110" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" rx="8" />
      <text x="200" y="85" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">ファクト表</text>
      <text x="200" y="100" textAnchor="middle" fontSize="8" fill="#64748b">売上データ</text>
      {/* Dimension tables */}
      {[
        { x: 15, y: 20, label: "商品", angle: "topLeft" },
        { x: 285, y: 20, label: "日付", angle: "topRight" },
        { x: 15, y: 120, label: "店舗", angle: "bottomLeft" },
        { x: 285, y: 120, label: "顧客", angle: "bottomRight" },
      ].map((dim, i) => (
        <g key={i}>
          <rect x={dim.x} y={dim.y} width="95" height="40" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="6" />
          <text x={dim.x + 47} y={dim.y + 25} textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">{dim.label}Dim</text>
          {/* Connect to center */}
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

// ==================== Main export ====================
const diagramMap: Record<string, () => ReactNode> = {
  "math-topic-01": NormalDistribution,
  "math-topic-02": BayesTheorem,
  "math-topic-03": HypothesisTesting,
  "math-topic-04": CorrelationScatter,
  "math-topic-05": MatrixBasics,
  "math-topic-06": ProbDistributions,
  "math-topic-07": DataVisualization,
  "math-topic-10": DataScales,
  "ml-topic-01": LearningTypes,
  "ml-topic-02": NeuralNetwork,
  "ml-topic-03": EnsembleLearning,
  "ml-topic-04": ConfusionMatrix,
  "ml-topic-05": DimensionReduction,
  "ml-topic-06": BiasVariance,
  "ml-topic-09": TransformerSimple,
  "ml-topic-10": OneHotEncoding,
  "de-topic-01": SqlJoins,
  "de-topic-02": Normalization,
  "de-topic-03": CapTheorem,
  "de-topic-04": EtlPipeline,
  "de-topic-05": RestApi,
  "de-topic-06": DataQuality,
  "de-topic-07": PythonBasics,
  "de-topic-10": CloudStack,
  "de-topic-27": StarSchema,
  "biz-topic-01": CrispDm,
  "biz-topic-02": KpiTree,
  "biz-topic-03": DataEthics,
  "biz-topic-04": RfmAnalysis,
  "biz-topic-05": DataGovernance,
  "biz-topic-06": MeceLogicTree,
  "biz-topic-08": PrepMethod,
  "biz-topic-09": SpuriousCorrelation,
  "ds-topic-05": TTestDiagram,
  "ds-topic-26": ConfusionMatrix,
  "ds-topic-32": CnnFlow,
  "ds-topic-34": AttentionDiagram,
};

export function TopicDiagram({ topicId }: { topicId: string }) {
  const DiagramComponent = diagramMap[topicId];
  if (!DiagramComponent) return null;
  return (
    <div className="topic-diagram-wrapper">
      <DiagramComponent />
    </div>
  );
}
