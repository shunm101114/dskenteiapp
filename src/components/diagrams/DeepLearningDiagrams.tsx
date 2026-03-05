/** SVG-based diagrams for deep learning study topics, keyed by topic ID */
import type { ReactNode } from "react";

/* ───────── Existing diagrams (moved from TopicDiagrams.tsx) ───────── */

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
      {layers.map((count, li) =>
        Array.from({length: count}, (_, ni) => (
          <circle key={`${li}-${ni}`}
            cx={lx[li]} cy={getY(li, ni)} r="10"
            fill="white" stroke={colors[li]} strokeWidth="2" />
        ))
      )}
      <text x={lx[0]} y="135" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">入力層</text>
      <text x={(lx[1] + lx[2]) / 2} y="135" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">隠れ層</text>
      <text x={lx[3]} y="135" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">出力層</text>
      <text x="200" y="158" textAnchor="middle" fontSize="9" fill="#64748b">CNN=画像 / RNN=系列 / Transformer=自己注意</text>
    </svg>
  );
}

function TransformerSimple() {
  return (
    <svg viewBox="0 0 400 180" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">Transformer 簡略構造</text>
      <rect x="140" y="145" width="120" height="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="6" />
      <text x="200" y="164" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">入力埋め込み</text>
      <rect x="120" y="90" width="160" height="35" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" rx="6" />
      <text x="200" y="112" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b45309">Self-Attention</text>
      <rect x="140" y="38" width="120" height="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="6" />
      <text x="200" y="58" textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">Feed Forward</text>
      <line x1="200" y1="145" x2="200" y2="127" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowDLT)" />
      <line x1="200" y1="90" x2="200" y2="70" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowDLT)" />
      <g opacity="0.4">
        <line x1="145" y1="145" x2="165" y2="127" stroke="#f59e0b" strokeWidth="1" />
        <line x1="200" y1="145" x2="200" y2="127" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="255" y1="145" x2="235" y2="127" stroke="#f59e0b" strokeWidth="1" />
      </g>
      <text x="310" y="107" fontSize="9" fill="#64748b">Q, K, V で</text>
      <text x="310" y="119" fontSize="9" fill="#64748b">重要度を計算</text>
      <text x="30" y="55" fontSize="9" fill="#64748b">×N層</text>
      <text x="30" y="68" fontSize="9" fill="#64748b">繰り返し</text>
      <defs>
        <marker id="arrowDLT" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  );
}

function CnnFlow() {
  return (
    <svg viewBox="0 0 420 120" className="topic-diagram">
      <rect x="10" y="25" width="55" height="55" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="4" />
      <g>
        {[0,1,2,3,4].map(r => [0,1,2,3,4].map(c => (
          <rect key={`${r}-${c}`} x={14 + c * 10} y={29 + r * 10} width="8" height="8" fill={Math.random() > 0.5 ? "#93c5fd" : "#dbeafe"} rx="1" />
        )))}
      </g>
      <text x="37" y="95" textAnchor="middle" fontSize="8" fill="#2563eb">入力画像</text>
      <text x="75" y="55" fontSize="12" fill="#64748b">{"\u2192"}</text>
      <rect x="90" y="20" width="70" height="65" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" rx="6" />
      <text x="125" y="42" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b45309">畳み込み</text>
      <text x="125" y="55" textAnchor="middle" fontSize="8" fill="#64748b">特徴抽出</text>
      <rect x="100" y="60" width="15" height="15" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1" rx="2" />
      <text x="125" y="72" fontSize="7" fill="#b45309">フィルタ</text>
      <text x="125" y="95" textAnchor="middle" fontSize="8" fill="#f59e0b">Conv層</text>
      <text x="170" y="55" fontSize="12" fill="#64748b">{"\u2192"}</text>
      <rect x="185" y="25" width="65" height="55" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="6" />
      <text x="217" y="47" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">プーリング</text>
      <text x="217" y="62" textAnchor="middle" fontSize="8" fill="#64748b">圧縮</text>
      <text x="217" y="95" textAnchor="middle" fontSize="8" fill="#16a34a">Pool層</text>
      <text x="260" y="55" fontSize="12" fill="#64748b">{"\u2192"}</text>
      <text x="280" y="50" fontSize="9" fill="#64748b">...×N</text>
      <text x="300" y="55" fontSize="12" fill="#64748b">{"\u2192"}</text>
      <rect x="315" y="25" width="60" height="55" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" rx="6" />
      <text x="345" y="47" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">全結合</text>
      <text x="345" y="62" textAnchor="middle" fontSize="8" fill="#64748b">分類</text>
      <text x="345" y="95" textAnchor="middle" fontSize="8" fill="#9333ea">FC層</text>
      <text x="385" y="55" fontSize="12" fill="#64748b">{"\u2192"}</text>
      <text x="412" y="45" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">犬</text>
      <text x="412" y="60" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">猫</text>
    </svg>
  );
}

function AttentionDiagram() {
  const words = ["I", "love", "cats"];
  const weights = [
    [0.1, 0.2, 0.7],
    [0.1, 0.6, 0.3],
    [0.5, 0.1, 0.4],
  ];
  return (
    <svg viewBox="0 0 400 160" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">Self-Attention の概念</text>
      {words.map((w, i) => (
        <g key={i}>
          <rect x={60 + i * 100} y="28" width="70" height="24" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="6" />
          <text x={95 + i * 100} y="44" textAnchor="middle" fontSize="11" fontWeight="600" fill="#2563eb">{w}</text>
        </g>
      ))}
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
      <text x="200" y="152" textAnchor="middle" fontSize="9" fill="#64748b">各単語が他の単語にどれだけ注目するかを重みで表現</text>
    </svg>
  );
}

/* ───────── New diagrams ───────── */

function TransferLearningDiagram() {
  const layerLabels = ["層1", "層2", "層3", "層4", "層5"];
  const leftX = 30;
  const rightX = 230;
  const layerW = 120;
  const layerH = 22;
  const gap = 4;
  const startY = 22;

  return (
    <svg viewBox="0 0 420 180" className="topic-diagram">
      <text x="210" y="15" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">転移学習（Transfer Learning）</text>
      <defs>
        <marker id="arrowTL" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#64748b" />
        </marker>
      </defs>

      {/* Left: Pre-trained model */}
      {layerLabels.map((label, i) => {
        const y = startY + (4 - i) * (layerH + gap);
        const shade = 0.4 + i * 0.15;
        return (
          <g key={`left-${i}`}>
            <rect x={leftX} y={y} width={layerW} height={layerH} fill={`rgba(37,99,235,${shade})`} stroke="#2563eb" strokeWidth="1.2" rx="4" />
            <text x={leftX + layerW / 2} y={y + layerH / 2 + 4} textAnchor="middle" fontSize="9" fontWeight="500" fill="white">{label}</text>
          </g>
        );
      })}
      <text x={leftX + layerW / 2} y={startY + 5 * (layerH + gap) + 10} textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">既学習モデル</text>

      {/* Arrow */}
      <line x1={leftX + layerW + 15} y1="85" x2={rightX - 15} y2="85" stroke="#64748b" strokeWidth="1.8" markerEnd="url(#arrowTL)" />
      <text x={(leftX + layerW + rightX) / 2} y="78" textAnchor="middle" fontSize="8" fill="#64748b">ファインチューニング</text>

      {/* Right: Fine-tuned model */}
      {layerLabels.map((label, i) => {
        const y = startY + (4 - i) * (layerH + gap);
        const frozen = i < 3;
        const shade = 0.4 + i * 0.15;
        return (
          <g key={`right-${i}`}>
            <rect x={rightX} y={y} width={layerW} height={layerH}
              fill={frozen ? `rgba(37,99,235,${shade})` : "#dcfce7"}
              stroke={frozen ? "#2563eb" : "#16a34a"} strokeWidth="1.2" rx="4" />
            <text x={rightX + layerW / 2} y={y + layerH / 2 + 4} textAnchor="middle" fontSize="9" fontWeight="500"
              fill={frozen ? "white" : "#16a34a"}>{frozen ? label : "新タスク用"}</text>
            {frozen && (
              <text x={rightX + layerW + 8} y={y + layerH / 2 + 4} fontSize="10" fill="#94a3b8">{"\uD83D\uDD12"}</text>
            )}
          </g>
        );
      })}
      <text x={rightX + layerW / 2} y={startY + 5 * (layerH + gap) + 10} textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">新タスクモデル</text>

      {/* Legend */}
      <rect x="280" y="155" width="12" height="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" rx="2" />
      <text x="296" y="165" fontSize="8" fill="#64748b">凍結（再利用）</text>
      <rect x="350" y="155" width="12" height="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" rx="2" />
      <text x="366" y="165" fontSize="8" fill="#64748b">再学習</text>
    </svg>
  );
}

function ActivationFunctionsDiagram() {
  const plotW = 110;
  const plotH = 70;
  const padX = 18;
  const gap = 20;
  const baseY = 30;

  const makePath = (fn: (x: number) => number, xMin: number, xMax: number, yMin: number, yMax: number, offsetX: number) => {
    const points = Array.from({length: 60}, (_, i) => {
      const x = xMin + (xMax - xMin) * (i / 59);
      const y = fn(x);
      const px = offsetX + ((x - xMin) / (xMax - xMin)) * plotW;
      const py = baseY + plotH - ((y - yMin) / (yMax - yMin)) * plotH;
      return `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
    });
    return points.join(" ");
  };

  const plots = [
    {
      name: "Sigmoid",
      fn: (x: number) => 1 / (1 + Math.exp(-x)),
      xMin: -5, xMax: 5, yMin: -0.1, yMax: 1.1,
      range: "[0, 1]",
      color: "#2563eb",
    },
    {
      name: "ReLU",
      fn: (x: number) => Math.max(0, x),
      xMin: -3, xMax: 3, yMin: -0.5, yMax: 3.5,
      range: "[0, +\u221E)",
      color: "#16a34a",
    },
    {
      name: "Tanh",
      fn: (x: number) => Math.tanh(x),
      xMin: -4, xMax: 4, yMin: -1.2, yMax: 1.2,
      range: "[-1, 1]",
      color: "#9333ea",
    },
  ];

  return (
    <svg viewBox="0 0 420 140" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">活性化関数</text>
      {plots.map((p, i) => {
        const ox = padX + i * (plotW + gap);
        const zeroY = baseY + plotH - ((0 - p.yMin) / (p.yMax - p.yMin)) * plotH;
        const zeroX = ox + ((0 - p.xMin) / (p.xMax - p.xMin)) * plotW;
        return (
          <g key={p.name}>
            {/* Axes */}
            <line x1={ox} y1={zeroY} x2={ox + plotW} y2={zeroY} stroke="#cbd5e1" strokeWidth="0.8" />
            <line x1={zeroX} y1={baseY} x2={zeroX} y2={baseY + plotH} stroke="#cbd5e1" strokeWidth="0.8" />
            {/* Curve */}
            <path d={makePath(p.fn, p.xMin, p.xMax, p.yMin, p.yMax, ox)} fill="none" stroke={p.color} strokeWidth="2" />
            {/* Labels */}
            <text x={ox + plotW / 2} y={baseY + plotH + 14} textAnchor="middle" fontSize="10" fontWeight="600" fill={p.color}>{p.name}</text>
            <text x={ox + plotW / 2} y={baseY + plotH + 26} textAnchor="middle" fontSize="8" fill="#64748b">範囲: {p.range}</text>
          </g>
        );
      })}
    </svg>
  );
}

function RnnLstmDiagram() {
  const steps = [
    { x: "x\u2081", h: "h\u2081", y: "y\u2081" },
    { x: "x\u2082", h: "h\u2082", y: "y\u2082" },
    { x: "x\u2083", h: "h\u2083", y: "y\u2083" },
  ];
  const sx = 55;
  const startX = 80;

  return (
    <svg viewBox="0 0 420 210" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">RNN / LSTM</text>
      <defs>
        <marker id="arrowRNN" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="#64748b" />
        </marker>
      </defs>

      {/* Unrolled RNN */}
      <text x="30" y="62" fontSize="9" fontWeight="600" fill="#64748b">RNN展開:</text>
      {steps.map((s, i) => {
        const cx = startX + i * (sx + 50);
        return (
          <g key={i}>
            {/* Input */}
            <text x={cx} y="95" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">{s.x}</text>
            <line x1={cx} y1="87" x2={cx} y2="72" stroke="#64748b" strokeWidth="1.2" markerEnd="url(#arrowRNN)" />
            {/* Hidden */}
            <rect x={cx - 20} y="50" width="40" height="22" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" rx="5" />
            <text x={cx} y="65" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b45309">{s.h}</text>
            {/* Output */}
            <line x1={cx} y1="50" x2={cx} y2="37" stroke="#64748b" strokeWidth="1.2" markerEnd="url(#arrowRNN)" />
            <text x={cx} y="32" textAnchor="middle" fontSize="10" fontWeight="600" fill="#dc2626">{s.y}</text>
            {/* Recurrent arrow to next */}
            {i < 2 && (
              <path d={`M${cx + 22},61 Q${cx + 50},45 ${cx + sx + 50 - 22},61`} fill="none" stroke="#f59e0b" strokeWidth="1.3" strokeDasharray="3,2" markerEnd="url(#arrowRNN)" />
            )}
          </g>
        );
      })}

      {/* LSTM Cell */}
      <line x1="20" y1="115" x2="400" y2="115" stroke="#e2e8f0" strokeWidth="1" />
      <text x="210" y="130" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">LSTMセル構造</text>

      <rect x="30" y="140" width="100" height="28" fill="#fecaca" stroke="#dc2626" strokeWidth="1.3" rx="6" />
      <text x="80" y="158" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">忘却ゲート</text>
      <text x="80" y="180" textAnchor="middle" fontSize="7.5" fill="#64748b">何を忘れるか</text>

      <rect x="155" y="140" width="100" height="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.3" rx="6" />
      <text x="205" y="158" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">入力ゲート</text>
      <text x="205" y="180" textAnchor="middle" fontSize="7.5" fill="#64748b">何を記憶するか</text>

      <rect x="280" y="140" width="100" height="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.3" rx="6" />
      <text x="330" y="158" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">出力ゲート</text>
      <text x="330" y="180" textAnchor="middle" fontSize="7.5" fill="#64748b">何を出力するか</text>

      {/* Arrows between gates */}
      <line x1="130" y1="154" x2="153" y2="154" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrowRNN)" />
      <line x1="255" y1="154" x2="278" y2="154" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrowRNN)" />

      <text x="210" y="200" textAnchor="middle" fontSize="8" fill="#64748b">ゲート機構により長期依存関係を学習（勾配消失を緩和）</text>
    </svg>
  );
}

function GanDiagram() {
  return (
    <svg viewBox="0 0 420 190" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">GAN（敵対的生成ネットワーク）</text>
      <defs>
        <marker id="arrowGAN" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#64748b" />
        </marker>
        <marker id="arrowGANg" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#16a34a" />
        </marker>
        <marker id="arrowGANb" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#2563eb" />
        </marker>
      </defs>

      {/* Noise */}
      <rect x="10" y="60" width="60" height="30" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" rx="6" />
      <text x="40" y="79" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">ノイズ z</text>

      {/* Arrow noise -> Generator */}
      <line x1="70" y1="75" x2="98" y2="75" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#arrowGAN)" />

      {/* Generator */}
      <rect x="100" y="55" width="90" height="40" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.8" rx="8" />
      <text x="145" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a">Generator</text>
      <text x="145" y="84" textAnchor="middle" fontSize="8" fill="#16a34a">生成器</text>

      {/* Arrow Generator -> Generated image */}
      <line x1="190" y1="75" x2="218" y2="75" stroke="#16a34a" strokeWidth="1.3" markerEnd="url(#arrowGANg)" />

      {/* Generated image */}
      <rect x="220" y="60" width="55" height="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" rx="4" />
      <text x="247" y="79" textAnchor="middle" fontSize="8" fontWeight="500" fill="#16a34a">生成画像</text>

      {/* Arrow Generated -> Discriminator */}
      <line x1="275" y1="75" x2="308" y2="95" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#arrowGAN)" />

      {/* Real data */}
      <rect x="220" y="120" width="55" height="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" rx="4" />
      <text x="247" y="139" textAnchor="middle" fontSize="8" fontWeight="500" fill="#2563eb">実データ</text>

      {/* Arrow Real -> Discriminator */}
      <line x1="275" y1="135" x2="308" y2="115" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#arrowGAN)" />

      {/* Discriminator */}
      <rect x="310" y="85" width="90" height="40" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.8" rx="8" />
      <text x="355" y="102" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">Discriminator</text>
      <text x="355" y="114" textAnchor="middle" fontSize="8" fill="#2563eb">識別器</text>

      {/* Output */}
      <text x="355" y="140" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">本物 / 偽物</text>

      {/* Adversarial feedback loop */}
      <path d="M355,125 L355,165 L145,165 L145,97" fill="none" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="4,3" markerEnd="url(#arrowGAN)" />
      <text x="250" y="162" textAnchor="middle" fontSize="8" fontWeight="500" fill="#dc2626">フィードバック（敵対的学習）</text>

      <text x="210" y="184" textAnchor="middle" fontSize="8" fill="#64748b">Gは本物に近い画像を生成、Dは本物と偽物を見分けるよう競合</text>
    </svg>
  );
}

function AutoencoderDiagram() {
  const layers = [5, 4, 2, 4, 5];
  const lx = [50, 120, 200, 280, 350];
  const colors = ["#2563eb", "#2563eb", "#dc2626", "#16a34a", "#16a34a"];
  const getY = (li: number, ni: number) => {
    const total = layers[li];
    const spacing = 22;
    const startY = 80 - ((total - 1) * spacing) / 2;
    return startY + ni * spacing;
  };

  return (
    <svg viewBox="0 0 400 180" className="topic-diagram">
      <text x="200" y="15" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">オートエンコーダ</text>

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
                stroke="#cbd5e1" strokeWidth="0.6" />
            );
          }
        }
        return <g key={`conn-${li}`}>{elems}</g>;
      })}

      {/* Nodes */}
      {layers.map((count, li) =>
        Array.from({length: count}, (_, ni) => (
          <circle key={`${li}-${ni}`}
            cx={lx[li]} cy={getY(li, ni)} r="9"
            fill="white" stroke={colors[li]} strokeWidth="2" />
        ))
      )}

      {/* Section labels */}
      <text x={85} y="135" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">エンコーダ</text>
      <text x={200} y="135" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">潜在空間</text>
      <text x={315} y="135" textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">デコーダ</text>

      {/* Flow labels */}
      <text x={50} y="155" textAnchor="middle" fontSize="9" fill="#64748b">入力</text>
      <text x={125} y="155" textAnchor="middle" fontSize="8" fill="#64748b">{"\u2192"} 圧縮</text>
      <text x={200} y="155" textAnchor="middle" fontSize="8" fill="#64748b">{"\u2192"} z</text>
      <text x={275} y="155" textAnchor="middle" fontSize="8" fill="#64748b">{"\u2192"} 復元</text>
      <text x={350} y="155" textAnchor="middle" fontSize="9" fill="#64748b">出力</text>

      <text x="200" y="172" textAnchor="middle" fontSize="8" fill="#64748b">入力を低次元に圧縮し、復元することで特徴を学習</text>

      {/* Bracket for encoder/decoder */}
      <line x1="50" y1="125" x2="160" y2="125" stroke="#2563eb" strokeWidth="1" />
      <line x1="240" y1="125" x2="350" y2="125" stroke="#16a34a" strokeWidth="1" />
    </svg>
  );
}

function ObjectDetectionDiagram() {
  const frameW = 110;
  const frameH = 85;
  const padX = 20;
  const gap = 18;
  const baseY = 30;

  return (
    <svg viewBox="0 0 420 155" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">画像認識タスクの比較</text>

      {/* Classification */}
      <g>
        <rect x={padX} y={baseY} width={frameW} height={frameH} fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" rx="4" />
        {/* Simple image placeholder */}
        <rect x={padX + 20} y={baseY + 20} width="70" height="50" fill="#e2e8f0" rx="3" />
        <text x={padX + 55} y={baseY + 50} textAnchor="middle" fontSize="18" fill="#94a3b8">{"\uD83D\uDC31"}</text>
        {/* Label */}
        <rect x={padX + 25} y={baseY + 4} width="60" height="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" rx="3" />
        <text x={padX + 55} y={baseY + 15} textAnchor="middle" fontSize="8" fontWeight="600" fill="#2563eb">猫</text>
        <text x={padX + frameW / 2} y={baseY + frameH + 16} textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">分類</text>
        <text x={padX + frameW / 2} y={baseY + frameH + 28} textAnchor="middle" fontSize="7.5" fill="#64748b">画像全体に1ラベル</text>
      </g>

      {/* Object Detection */}
      <g>
        <rect x={padX + frameW + gap} y={baseY} width={frameW} height={frameH} fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" rx="4" />
        {/* Bounding boxes */}
        <rect x={padX + frameW + gap + 8} y={baseY + 15} width="42" height="55" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="3,2" rx="2" />
        <text x={padX + frameW + gap + 29} y={baseY + 47} textAnchor="middle" fontSize="14" fill="#94a3b8">{"\uD83D\uDC31"}</text>
        <text x={padX + frameW + gap + 29} y={baseY + 13} textAnchor="middle" fontSize="7" fontWeight="600" fill="#f59e0b">猫</text>

        <rect x={padX + frameW + gap + 58} y={baseY + 30} width="42" height="40" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeDasharray="3,2" rx="2" />
        <text x={padX + frameW + gap + 79} y={baseY + 55} textAnchor="middle" fontSize="14" fill="#94a3b8">{"\uD83D\uDC36"}</text>
        <text x={padX + frameW + gap + 79} y={baseY + 28} textAnchor="middle" fontSize="7" fontWeight="600" fill="#16a34a">犬</text>

        <text x={padX + frameW + gap + frameW / 2} y={baseY + frameH + 16} textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">物体検出</text>
        <text x={padX + frameW + gap + frameW / 2} y={baseY + frameH + 28} textAnchor="middle" fontSize="7.5" fill="#64748b">矩形で位置+ラベル</text>
      </g>

      {/* Segmentation */}
      <g>
        <rect x={padX + 2 * (frameW + gap)} y={baseY} width={frameW} height={frameH} fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" rx="4" />
        {/* Pixel regions */}
        <rect x={padX + 2 * (frameW + gap) + 8} y={baseY + 12} width="45" height="58" fill="#bfdbfe" opacity="0.6" rx="8" />
        <rect x={padX + 2 * (frameW + gap) + 55} y={baseY + 25} width="45" height="45" fill="#bbf7d0" opacity="0.6" rx="8" />
        <rect x={padX + 2 * (frameW + gap) + 20} y={baseY + 55} width="60" height="18" fill="#fef08a" opacity="0.5" rx="4" />
        <text x={padX + 2 * (frameW + gap) + 30} y={baseY + 45} textAnchor="middle" fontSize="7" fontWeight="600" fill="#2563eb">猫</text>
        <text x={padX + 2 * (frameW + gap) + 77} y={baseY + 50} textAnchor="middle" fontSize="7" fontWeight="600" fill="#16a34a">犬</text>
        <text x={padX + 2 * (frameW + gap) + 50} y={baseY + 67} textAnchor="middle" fontSize="7" fontWeight="600" fill="#a16207">背景</text>

        <text x={padX + 2 * (frameW + gap) + frameW / 2} y={baseY + frameH + 16} textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">セグメンテーション</text>
        <text x={padX + 2 * (frameW + gap) + frameW / 2} y={baseY + frameH + 28} textAnchor="middle" fontSize="7.5" fill="#64748b">ピクセル単位で分類</text>
      </g>
    </svg>
  );
}

function ReinforcementLearningDiagram() {
  const cx = 210;
  const cy = 95;
  const rx = 120;
  const ry = 50;

  return (
    <svg viewBox="0 0 420 195" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">強化学習（Reinforcement Learning）</text>
      <defs>
        <marker id="arrowRL" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#64748b" />
        </marker>
      </defs>

      {/* Agent (top) */}
      <rect x={cx - 45} y={cy - ry - 18} width="90" height="32" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.8" rx="8" />
      <text x={cx} y={cy - ry - 2} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563eb">Agent</text>
      <text x={cx} y={cy - ry + 10} textAnchor="middle" fontSize="8" fill="#2563eb">（方策 \u03C0）</text>

      {/* Action (right) */}
      <rect x={cx + rx - 35} y={cy - 14} width="70" height="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="6" />
      <text x={cx + rx} y={cy + 5} textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">行動</text>

      {/* Environment (bottom) */}
      <rect x={cx - 50} y={cy + ry - 10} width="100" height="32" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.8" rx="8" />
      <text x={cx} y={cy + ry + 11} textAnchor="middle" fontSize="11" fontWeight="700" fill="#b45309">Environment</text>

      {/* State + Reward (left) */}
      <rect x={cx - rx - 40} y={cy - 18} width="80" height="36" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" rx="6" />
      <text x={cx - rx} y={cy - 2} textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">状態 s</text>
      <text x={cx - rx} y={cy + 12} textAnchor="middle" fontSize="9" fontWeight="600" fill="#9333ea">報酬 r</text>

      {/* Arrows: Agent -> Action (top-right) */}
      <line x1={cx + 45} y1={cy - ry + 2} x2={cx + rx - 37} y2={cy - 14} stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowRL)" />

      {/* Arrows: Action -> Environment (right-bottom) */}
      <line x1={cx + rx + 10} y1={cy + 14} x2={cx + 52} y2={cy + ry - 10} stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowRL)" />

      {/* Arrows: Environment -> State+Reward (bottom-left) */}
      <line x1={cx - 50} y1={cy + ry + 5} x2={cx - rx + 42} y2={cy + 18} stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowRL)" />

      {/* Arrows: State+Reward -> Agent (left-top) */}
      <line x1={cx - rx - 2} y1={cy - 18} x2={cx - 47} y2={cy - ry + 2} stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowRL)" />

      {/* Edge labels */}
      <text x={cx + rx - 10} y={cy - ry + 15} fontSize="8" fill="#64748b">a を選択</text>
      <text x={cx + rx - 15} y={cy + ry - 10} fontSize="8" fill="#64748b">a を実行</text>
      <text x={cx - rx + 10} y={cy + ry - 5} fontSize="8" textAnchor="end" fill="#64748b">s', r を返す</text>
      <text x={cx - rx + 15} y={cy - ry + 18} fontSize="8" textAnchor="end" fill="#64748b">s, r を観測</text>

      {/* Bottom explanation */}
      <text x="210" y="180" textAnchor="middle" fontSize="8" fill="#64748b">エージェントが試行錯誤で報酬を最大化する方策を学習</text>
    </svg>
  );
}

/* ───────── Export map ───────── */

export const deepLearningDiagrams: Record<string, () => ReactNode> = {
  "ml-topic-02": NeuralNetwork,
  "ml-topic-09": TransformerSimple,
  "ds-topic-32": CnnFlow,
  "ds-topic-34": AttentionDiagram,
  "ds-topic-30": TransferLearningDiagram,
  "ds-topic-31": ActivationFunctionsDiagram,
  "ds-topic-33": RnnLstmDiagram,
  "ds-topic-35": GanDiagram,
  "ds-topic-37": AutoencoderDiagram,
  "ds-topic-38": ObjectDetectionDiagram,
  "ds-topic-50": ReinforcementLearningDiagram,
};
