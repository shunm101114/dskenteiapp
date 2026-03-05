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

function DiffusionModelDiagram() {
  const frameW = 60;
  const frameH = 50;
  const gap = 16;
  const startX = 30;
  const forwardY = 32;
  const reverseY = 115;
  const noiseLabels = ["クリーン", "少しノイズ", "ノイズ多", "ほぼノイズ", "純粋ノイズ"];
  const noiseFills = ["#dbeafe", "#bfdbfe", "#a5b4c7", "#8a94a3", "#64748b"];

  return (
    <svg viewBox="0 0 420 195" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">拡散モデル（Diffusion Model）</text>
      <defs>
        <marker id="arrowDiff" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#64748b" />
        </marker>
        <marker id="arrowDiffR" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
          <path d="M8,0 L0,3 L8,6" fill="#16a34a" />
        </marker>
      </defs>

      {/* Forward process label */}
      <text x="210" y="28" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">前方過程（ノイズ追加）→</text>

      {/* Forward: clean → noisy */}
      {noiseLabels.map((label, i) => {
        const x = startX + i * (frameW + gap);
        return (
          <g key={`fwd-${i}`}>
            <rect x={x} y={forwardY} width={frameW} height={frameH} fill={noiseFills[i]} stroke="#94a3b8" strokeWidth="1.2" rx="4" />
            {/* Noise dots */}
            {Array.from({length: i * 6}, (_, d) => (
              <circle key={d}
                cx={x + 8 + (d * 17) % (frameW - 16)}
                cy={forwardY + 8 + (d * 13) % (frameH - 16)}
                r="2" fill="white" opacity={0.4 + i * 0.12} />
            ))}
            <text x={x + frameW / 2} y={forwardY + frameH + 12} textAnchor="middle" fontSize="7" fill="#64748b">{label}</text>
            {i < 4 && (
              <line x1={x + frameW + 2} y1={forwardY + frameH / 2} x2={x + frameW + gap - 2} y2={forwardY + frameH / 2}
                stroke="#64748b" strokeWidth="1.2" markerEnd="url(#arrowDiff)" />
            )}
          </g>
        );
      })}

      {/* Reverse process label */}
      <text x="210" y="112" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">← 逆過程（ノイズ除去）</text>

      {/* Reverse: noise → clean */}
      {[...noiseLabels].reverse().map((_label, i) => {
        const x = startX + i * (frameW + gap);
        const ri = 4 - i;
        const revLabels = ["純粋ノイズ", "ノイズ多", "少しノイズ", "ほぼクリーン", "生成画像"];
        return (
          <g key={`rev-${i}`}>
            <rect x={x} y={reverseY} width={frameW} height={frameH} fill={noiseFills[ri]} stroke="#16a34a" strokeWidth="1.2" rx="4" />
            {Array.from({length: ri * 6}, (_, d) => (
              <circle key={d}
                cx={x + 8 + (d * 17) % (frameW - 16)}
                cy={reverseY + 8 + (d * 13) % (frameH - 16)}
                r="2" fill="white" opacity={0.4 + ri * 0.12} />
            ))}
            <text x={x + frameW / 2} y={reverseY + frameH + 12} textAnchor="middle" fontSize="7" fill="#64748b">{revLabels[i]}</text>
            {i < 4 && (
              <line x1={x + frameW + 2} y1={reverseY + frameH / 2} x2={x + frameW + gap - 2} y2={reverseY + frameH / 2}
                stroke="#16a34a" strokeWidth="1.2" markerEnd="url(#arrowDiff)" />
            )}
          </g>
        );
      })}

      <text x="210" y="190" textAnchor="middle" fontSize="8" fill="#64748b">学習: ノイズ除去を繰り返し、データ分布からサンプリング</text>
    </svg>
  );
}

function NlpPipelineDiagram() {
  const steps = ["生テキスト", "トークン化", "ストップワード\n除去", "ステミング/\nレンマ化", "特徴量化\n(TF-IDF/BoW)"];
  const colors = ["#2563eb", "#7c3aed", "#f59e0b", "#16a34a", "#dc2626"];
  const bgColors = ["#dbeafe", "#f3e8ff", "#fef3c7", "#dcfce7", "#fecaca"];
  const boxW = 68;
  const boxH = 36;
  const gap = 10;
  const startX = 8;
  const cy = 60;

  return (
    <svg viewBox="0 0 420 120" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">テキスト前処理パイプライン</text>
      <defs>
        <marker id="arrowNLP" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#64748b" />
        </marker>
      </defs>

      {steps.map((step, i) => {
        const x = startX + i * (boxW + gap);
        const lines = step.split("\n");
        return (
          <g key={i}>
            <rect x={x} y={cy - boxH / 2} width={boxW} height={boxH} fill={bgColors[i]} stroke={colors[i]} strokeWidth="1.5" rx="6" />
            {lines.length === 1 ? (
              <text x={x + boxW / 2} y={cy + 4} textAnchor="middle" fontSize="8" fontWeight="600" fill={colors[i]}>{lines[0]}</text>
            ) : (
              <>
                <text x={x + boxW / 2} y={cy - 2} textAnchor="middle" fontSize="7.5" fontWeight="600" fill={colors[i]}>{lines[0]}</text>
                <text x={x + boxW / 2} y={cy + 9} textAnchor="middle" fontSize="7.5" fontWeight="600" fill={colors[i]}>{lines[1]}</text>
              </>
            )}
            {i < steps.length - 1 && (
              <line x1={x + boxW + 1} y1={cy} x2={x + boxW + gap - 1} y2={cy}
                stroke="#64748b" strokeWidth="1.3" markerEnd="url(#arrowNLP)" />
            )}
          </g>
        );
      })}

      <text x="210" y="100" textAnchor="middle" fontSize="8" fill="#64748b">例: "The cats are running" → ["cat", "run"] → TF-IDFベクトル</text>
      <text x="210" y="112" textAnchor="middle" fontSize="8" fill="#64748b">各段階で不要情報を除去し、モデルが扱いやすい形式に変換</text>
    </svg>
  );
}

function WordEmbeddingDiagram() {
  const words = [
    { label: "王(King)", x: 280, y: 45, color: "#2563eb" },
    { label: "女王(Queen)", x: 310, y: 100, color: "#dc2626" },
    { label: "男(Man)", x: 130, y: 55, color: "#2563eb" },
    { label: "女(Woman)", x: 160, y: 110, color: "#dc2626" },
  ];

  return (
    <svg viewBox="0 0 420 180" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">単語埋め込み（Word Embedding）</text>
      <defs>
        <marker id="arrowWE" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#64748b" />
        </marker>
        <marker id="arrowWEr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#f59e0b" />
        </marker>
      </defs>

      {/* Axes */}
      <line x1="40" y1="135" x2="360" y2="135" stroke="#e2e8f0" strokeWidth="1" />
      <line x1="40" y1="30" x2="40" y2="135" stroke="#e2e8f0" strokeWidth="1" />
      <text x="370" y="138" fontSize="7" fill="#94a3b8">次元1</text>
      <text x="42" y="28" fontSize="7" fill="#94a3b8">次元2</text>

      {/* Word points */}
      {words.map((w, i) => (
        <g key={i}>
          <circle cx={w.x} cy={w.y} r="5" fill={w.color} />
          <text x={w.x} y={w.y - 10} textAnchor="middle" fontSize="9" fontWeight="600" fill={w.color}>{w.label}</text>
        </g>
      ))}

      {/* Gender vectors (vertical dashed) */}
      <line x1="130" y1="60" x2="160" y2="105" stroke="#9333ea" strokeWidth="1.3" strokeDasharray="4,3" markerEnd="url(#arrowWE)" />
      <line x1="280" y1="50" x2="310" y2="95" stroke="#9333ea" strokeWidth="1.3" strokeDasharray="4,3" markerEnd="url(#arrowWE)" />

      {/* Royalty vectors (horizontal dashed) */}
      <line x1="135" y1="55" x2="275" y2="45" stroke="#f59e0b" strokeWidth="1.3" strokeDasharray="4,3" markerEnd="url(#arrowWEr)" />
      <line x1="165" y1="110" x2="305" y2="100" stroke="#f59e0b" strokeWidth="1.3" strokeDasharray="4,3" markerEnd="url(#arrowWEr)" />

      {/* Labels for relationships */}
      <text x="90" y="88" fontSize="7.5" fill="#9333ea" transform="rotate(-55, 90, 88)">性別方向</text>
      <text x="200" y="42" fontSize="7.5" fill="#f59e0b">王族方向</text>

      {/* Vector arithmetic */}
      <rect x="60" y="148" width="300" height="22" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="5" />
      <text x="210" y="163" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b45309">王 − 男 + 女 ≈ 女王</text>

      <text x="210" y="178" textAnchor="middle" fontSize="8" fill="#64748b">意味の近さ = ベクトルの近さ</text>
    </svg>
  );
}

function BertArchitectureDiagram() {
  const blockW = 260;
  const cx = 210;

  return (
    <svg viewBox="0 0 420 210" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">BERT アーキテクチャ</text>
      <defs>
        <marker id="arrowBERT" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#64748b" />
        </marker>
      </defs>

      {/* Input tokens */}
      <rect x={cx - blockW / 2} y="25" width={blockW} height="24" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.2" rx="5" />
      <text x={cx} y="41" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">[CLS] トークン1 トークン2 ... [MASK] ... [SEP]</text>

      {/* Arrow */}
      <line x1={cx} y1="49" x2={cx} y2="60" stroke="#64748b" strokeWidth="1.2" markerEnd="url(#arrowBERT)" />

      {/* Token + Position Embedding */}
      <rect x={cx - blockW / 2} y="62" width={blockW} height="24" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="5" />
      <text x={cx} y="78" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">Token + Segment + Position Embedding</text>

      {/* Arrow */}
      <line x1={cx} y1="86" x2={cx} y2="97" stroke="#64748b" strokeWidth="1.2" markerEnd="url(#arrowBERT)" />

      {/* Transformer Encoder x12 */}
      <rect x={cx - blockW / 2} y="99" width={blockW} height="34" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.8" rx="6" />
      <text x={cx} y="115" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">Transformer Encoder ×12</text>
      <text x={cx} y="128" textAnchor="middle" fontSize="8" fill="#b45309">双方向 Self-Attention</text>

      {/* Bidirectional arrows */}
      <text x={cx - blockW / 2 - 16} y="120" fontSize="14" fill="#f59e0b">←→</text>
      <text x={cx + blockW / 2 + 4} y="120" fontSize="14" fill="#f59e0b">←→</text>

      {/* Arrow */}
      <line x1={cx - 60} y1="133" x2={cx - 60} y2="146" stroke="#64748b" strokeWidth="1.2" markerEnd="url(#arrowBERT)" />
      <line x1={cx + 60} y1="133" x2={cx + 60} y2="146" stroke="#64748b" strokeWidth="1.2" markerEnd="url(#arrowBERT)" />

      {/* Outputs */}
      <rect x={cx - 130} y="148" width="100" height="24" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="5" />
      <text x={cx - 80} y="164" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">[CLS] → 分類</text>

      <rect x={cx + 30} y="148" width="100" height="24" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" rx="5" />
      <text x={cx + 80} y="164" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9333ea">[MASK] → 単語予測</text>

      {/* Pre-training / Fine-tuning labels */}
      <rect x="15" y="90" width="52" height="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="4" />
      <text x="41" y="104" textAnchor="middle" fontSize="8" fontWeight="600" fill="#b45309">事前学習</text>

      <rect x="15" y="148" width="52" height="20" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" rx="4" />
      <text x="41" y="162" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">Fine-tune</text>

      {/* Bottom note */}
      <text x="210" y="190" textAnchor="middle" fontSize="8" fill="#64748b">事前学習: MLM + NSP → ファインチューニング: 下流タスクに適応</text>
      <text x="210" y="202" textAnchor="middle" fontSize="8" fill="#64748b">双方向で文脈を理解（GPTは左→右のみ）</text>
    </svg>
  );
}

function RagPipelineDiagram() {
  return (
    <svg viewBox="0 0 420 190" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">RAG（Retrieval-Augmented Generation）</text>
      <defs>
        <marker id="arrowRAG" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#64748b" />
        </marker>
      </defs>

      {/* Question */}
      <rect x="15" y="50" width="65" height="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="6" />
      <text x="47" y="69" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">質問</text>

      {/* Arrow question -> search */}
      <line x1="80" y1="65" x2="108" y2="65" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#arrowRAG)" />

      {/* Search engine */}
      <rect x="110" y="45" width="80" height="40" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" rx="6" />
      <text x="150" y="63" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b45309">検索</text>
      <text x="150" y="76" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b45309">エンジン</text>

      {/* Document database (side) */}
      <rect x="115" y="110" width="70" height="45" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" rx="4" />
      <text x="150" y="128" textAnchor="middle" fontSize="8" fontWeight="600" fill="#64748b">文書DB</text>
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={122} y={132 + i * 7} width="56" height="5" fill="#e2e8f0" rx="1" />
        </g>
      ))}

      {/* Arrow DB -> search */}
      <line x1="150" y1="110" x2="150" y2="87" stroke="#94a3b8" strokeWidth="1.3" markerEnd="url(#arrowRAG)" />

      {/* Arrow search -> retrieved docs */}
      <line x1="190" y1="65" x2="213" y2="65" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#arrowRAG)" />

      {/* Retrieved documents */}
      <rect x="215" y="42" width="72" height="46" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="6" />
      <text x="251" y="59" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">関連文書</text>
      <text x="251" y="71" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">を取得</text>
      <text x="251" y="83" textAnchor="middle" fontSize="7" fill="#16a34a">Top-K件</text>

      {/* Arrow docs -> LLM */}
      <line x1="287" y1="65" x2="308" y2="65" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#arrowRAG)" />

      {/* Question also goes to LLM */}
      <path d="M47,80 L47,100 Q47,108 55,108 L310,108 Q318,108 318,100 L318,82" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrowRAG)" />
      <text x="180" y="105" textAnchor="middle" fontSize="7" fill="#2563eb">質問も入力</text>

      {/* LLM */}
      <rect x="310" y="42" width="70" height="46" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.8" rx="8" />
      <text x="345" y="62" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9333ea">LLM</text>
      <text x="345" y="78" textAnchor="middle" fontSize="7.5" fill="#9333ea">文書+質問で生成</text>

      {/* Arrow LLM -> answer */}
      <line x1="380" y1="65" x2="393" y2="65" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#arrowRAG)" />

      {/* Answer */}
      <rect x="395" y="50" width="20" height="30" fill="#fecaca" stroke="#dc2626" strokeWidth="1.5" rx="4" />
      <text x="405" y="69" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626" transform="rotate(-90, 405, 69)">回答</text>

      {/* Bottom label */}
      <rect x="110" y="163" width="200" height="18" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" rx="4" />
      <text x="210" y="176" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">Retrieval-Augmented Generation</text>

      <text x="210" y="188" textAnchor="middle" fontSize="7.5" fill="#64748b">外部知識を検索して回答精度を向上 → ハルシネーション軽減</text>
    </svg>
  );
}

function NlpBasicsDiagram() {
  const panelW = 120;
  const panelH = 95;
  const gap = 14;
  const startX = 18;
  const startY = 28;

  return (
    <svg viewBox="0 0 420 155" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">NLP基礎 — 主要タスク</text>

      {/* Panel 1: Sentiment Analysis */}
      <rect x={startX} y={startY} width={panelW} height={panelH} fill="#f8fafc" stroke="#2563eb" strokeWidth="1.5" rx="6" />
      <text x={startX + panelW / 2} y={startY + 16} textAnchor="middle" fontSize="9" fontWeight="700" fill="#2563eb">感情分析</text>
      <rect x={startX + 10} y={startY + 24} width={panelW - 20} height="18" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" rx="3" />
      <text x={startX + panelW / 2} y={startY + 37} textAnchor="middle" fontSize="7.5" fill="#334155">"この映画は最高！"</text>
      <text x={startX + panelW / 2} y={startY + 52} textAnchor="middle" fontSize="12" fill="#64748b">↓</text>
      <rect x={startX + 20} y={startY + 58} width={panelW - 40} height="18" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" rx="3" />
      <text x={startX + panelW / 2} y={startY + 71} textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">Positive ✓</text>
      <text x={startX + panelW / 2} y={startY + 88} textAnchor="middle" fontSize="7" fill="#64748b">テキスト→感情極性</text>

      {/* Panel 2: NER */}
      <rect x={startX + panelW + gap} y={startY} width={panelW} height={panelH} fill="#f8fafc" stroke="#f59e0b" strokeWidth="1.5" rx="6" />
      <text x={startX + panelW + gap + panelW / 2} y={startY + 16} textAnchor="middle" fontSize="9" fontWeight="700" fill="#b45309">固有表現認識</text>
      <rect x={startX + panelW + gap + 5} y={startY + 24} width={panelW - 10} height="36" fill="#fefce8" rx="3" />
      {/* Colored entities in text */}
      <text x={startX + panelW + gap + 10} y={startY + 38} fontSize="8" fill="#334155">
        <tspan fill="#2563eb" fontWeight="600">[東京]</tspan>
        <tspan>で</tspan>
        <tspan fill="#dc2626" fontWeight="600">[田中]</tspan>
        <tspan>が</tspan>
      </text>
      <text x={startX + panelW + gap + 10} y={startY + 51} fontSize="8" fill="#334155">
        <tspan fill="#16a34a" fontWeight="600">[3月]</tspan>
        <tspan>に発表した</tspan>
      </text>
      <rect x={startX + panelW + gap + 8} y={startY + 62} width="32" height="12" fill="#dbeafe" rx="2" />
      <text x={startX + panelW + gap + 24} y={startY + 71} textAnchor="middle" fontSize="6.5" fill="#2563eb">地名</text>
      <rect x={startX + panelW + gap + 44} y={startY + 62} width="32" height="12" fill="#fecaca" rx="2" />
      <text x={startX + panelW + gap + 60} y={startY + 71} textAnchor="middle" fontSize="6.5" fill="#dc2626">人名</text>
      <rect x={startX + panelW + gap + 80} y={startY + 62} width="32" height="12" fill="#dcfce7" rx="2" />
      <text x={startX + panelW + gap + 96} y={startY + 71} textAnchor="middle" fontSize="6.5" fill="#16a34a">日時</text>
      <text x={startX + panelW + gap + panelW / 2} y={startY + 88} textAnchor="middle" fontSize="7" fill="#64748b">テキスト→エンティティ抽出</text>

      {/* Panel 3: Machine Translation */}
      <rect x={startX + 2 * (panelW + gap)} y={startY} width={panelW} height={panelH} fill="#f8fafc" stroke="#9333ea" strokeWidth="1.5" rx="6" />
      <text x={startX + 2 * (panelW + gap) + panelW / 2} y={startY + 16} textAnchor="middle" fontSize="9" fontWeight="700" fill="#9333ea">機械翻訳</text>
      <rect x={startX + 2 * (panelW + gap) + 10} y={startY + 24} width={panelW - 20} height="18" fill="#f3e8ff" stroke="#c4b5fd" strokeWidth="1" rx="3" />
      <text x={startX + 2 * (panelW + gap) + panelW / 2} y={startY + 37} textAnchor="middle" fontSize="7.5" fill="#334155">"猫が好きです"</text>
      <text x={startX + 2 * (panelW + gap) + panelW / 2} y={startY + 52} textAnchor="middle" fontSize="12" fill="#64748b">↓</text>
      <rect x={startX + 2 * (panelW + gap) + 10} y={startY + 58} width={panelW - 20} height="18" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.2" rx="3" />
      <text x={startX + 2 * (panelW + gap) + panelW / 2} y={startY + 71} textAnchor="middle" fontSize="8" fontWeight="600" fill="#2563eb">"I like cats"</text>
      <text x={startX + 2 * (panelW + gap) + panelW / 2} y={startY + 88} textAnchor="middle" fontSize="7" fill="#64748b">日本語→English</text>

      <text x="210" y="145" textAnchor="middle" fontSize="8" fill="#64748b">自然言語処理: テキストデータから意味を抽出・変換するAI技術</text>
    </svg>
  );
}

function ImageRecognitionDiagram() {
  return (
    <svg viewBox="0 0 420 150" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">画像認識の基本フロー</text>
      <defs>
        <marker id="arrowIMG" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#64748b" />
        </marker>
      </defs>

      {/* Input image */}
      <rect x="10" y="35" width="60" height="55" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" rx="4" />
      {/* Grid to represent image */}
      {[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => (
        <rect key={`${r}-${c}`} x={15 + c * 13} y={40 + r * 11} width="11" height="9"
          fill={((r + c) % 3 === 0) ? "#93c5fd" : ((r + c) % 3 === 1) ? "#bfdbfe" : "#dbeafe"} rx="1" />
      )))}
      <text x="40" y="103" textAnchor="middle" fontSize="8" fill="#64748b">入力画像</text>

      {/* Arrow */}
      <line x1="72" y1="62" x2="88" y2="62" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#arrowIMG)" />

      {/* Feature extraction (Conv layers) */}
      <rect x="90" y="32" width="90" height="60" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" rx="6" />
      <text x="135" y="52" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b45309">特徴抽出</text>
      <text x="135" y="65" textAnchor="middle" fontSize="7.5" fill="#64748b">Conv + Pool</text>
      <text x="135" y="77" textAnchor="middle" fontSize="7.5" fill="#64748b">×複数層</text>
      <text x="135" y="103" textAnchor="middle" fontSize="8" fill="#f59e0b">畳み込み層</text>

      {/* Arrow */}
      <line x1="180" y1="62" x2="196" y2="62" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#arrowIMG)" />

      {/* Classification head */}
      <rect x="198" y="38" width="75" height="48" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="6" />
      <text x="235" y="57" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">分類ヘッド</text>
      <text x="235" y="72" textAnchor="middle" fontSize="7.5" fill="#64748b">全結合+Softmax</text>
      <text x="235" y="103" textAnchor="middle" fontSize="8" fill="#16a34a">FC層</text>

      {/* Arrow */}
      <line x1="273" y1="62" x2="289" y2="62" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#arrowIMG)" />

      {/* Prediction results with confidence bars */}
      <rect x="291" y="30" width="120" height="75" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.2" rx="6" />
      <text x="351" y="46" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">予測結果</text>

      {/* Cat bar - 95% */}
      <text x="300" y="62" fontSize="8" fontWeight="600" fill="#334155">猫</text>
      <rect x="318" y="54" width="85" height="10" fill="#e2e8f0" rx="2" />
      <rect x="318" y="54" width={85 * 0.95} height="10" fill="#2563eb" rx="2" />
      <text x="398" y="63" fontSize="7" fill="#2563eb">95%</text>

      {/* Dog bar - 3% */}
      <text x="300" y="78" fontSize="8" fontWeight="600" fill="#334155">犬</text>
      <rect x="318" y="70" width="85" height="10" fill="#e2e8f0" rx="2" />
      <rect x="318" y="70" width={85 * 0.03} height="10" fill="#f59e0b" rx="2" />
      <text x="326" y="79" fontSize="7" fill="#f59e0b">3%</text>

      {/* Bird bar - 2% */}
      <text x="300" y="94" fontSize="8" fontWeight="600" fill="#334155">鳥</text>
      <rect x="318" y="86" width="85" height="10" fill="#e2e8f0" rx="2" />
      <rect x="318" y="86" width={85 * 0.02} height="10" fill="#16a34a" rx="2" />
      <text x="324" y="95" fontSize="7" fill="#16a34a">2%</text>

      <text x="351" y="118" textAnchor="middle" fontSize="8" fill="#64748b">信頼度スコア</text>

      <text x="210" y="140" textAnchor="middle" fontSize="8" fill="#64748b">画像→特徴マップ→クラス確率: 最も高い確率のクラスを予測</text>
    </svg>
  );
}

function LlmArchitectureDiagram() {
  const steps = ["テキスト入力", "トークン化", "埋め込み", "Transformer\n層 ×N", "次の単語\n予測"];
  const colors = ["#2563eb", "#7c3aed", "#f59e0b", "#dc2626", "#16a34a"];
  const bgColors = ["#dbeafe", "#f3e8ff", "#fef3c7", "#fecaca", "#dcfce7"];
  const boxW = 66;
  const boxH = 40;
  const gap = 10;
  const startX = 10;
  const cy = 55;

  return (
    <svg viewBox="0 0 420 190" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">LLM（大規模言語モデル）の仕組み</text>
      <defs>
        <marker id="arrowLLM" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="#64748b" />
        </marker>
      </defs>

      {steps.map((step, i) => {
        const x = startX + i * (boxW + gap);
        const lines = step.split("\n");
        return (
          <g key={i}>
            <rect x={x} y={cy - boxH / 2} width={boxW} height={boxH} fill={bgColors[i]} stroke={colors[i]} strokeWidth="1.5" rx="6" />
            {lines.length === 1 ? (
              <text x={x + boxW / 2} y={cy + 4} textAnchor="middle" fontSize="8" fontWeight="600" fill={colors[i]}>{lines[0]}</text>
            ) : (
              <>
                <text x={x + boxW / 2} y={cy - 2} textAnchor="middle" fontSize="8" fontWeight="600" fill={colors[i]}>{lines[0]}</text>
                <text x={x + boxW / 2} y={cy + 10} textAnchor="middle" fontSize="8" fontWeight="600" fill={colors[i]}>{lines[1]}</text>
              </>
            )}
            {i < steps.length - 1 && (
              <line x1={x + boxW + 1} y1={cy} x2={x + boxW + gap - 1} y2={cy}
                stroke="#64748b" strokeWidth="1.3" markerEnd="url(#arrowLLM)" />
            )}
          </g>
        );
      })}

      {/* Scale label */}
      <rect x="130" y="82" width="160" height="18" fill="#fecaca" stroke="#dc2626" strokeWidth="1" rx="4" />
      <text x="210" y="94" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">数十億〜数兆パラメータ</text>

      {/* Example */}
      <rect x="40" y="115" width="340" height="40" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.2" rx="6" />
      <text x="210" y="130" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">例: 次の単語予測</text>

      <text x="70" y="147" fontSize="9" fill="#2563eb" fontWeight="600">"今日の天気は"</text>
      <text x="175" y="147" fontSize="14" fill="#64748b">→</text>
      <rect x="195" y="137" width="55" height="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" rx="3" />
      <text x="222" y="149" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a">"晴れ"</text>
      <text x="265" y="149" fontSize="8" fill="#64748b">(確率: 0.42)</text>

      {/* Key concepts */}
      <text x="50" y="172" fontSize="8" fill="#64748b">自己回帰: 1トークンずつ順に生成</text>
      <text x="230" y="172" fontSize="8" fill="#64748b">スケール則: パラメータ数↑ → 性能↑</text>

      <text x="210" y="186" textAnchor="middle" fontSize="8" fill="#64748b">GPT系 / LLaMA / Gemini など主要モデルはTransformerベース</text>
    </svg>
  );
}

/* ───────── Export map ───────── */

export const deepLearningDiagrams: Record<string, () => ReactNode> = {
  "ml-topic-02": NeuralNetwork,
  "ml-topic-07": NlpBasicsDiagram,
  "ml-topic-08": ImageRecognitionDiagram,
  "ml-topic-09": TransformerSimple,
  "ml-topic-24": LlmArchitectureDiagram,
  "ds-topic-30": TransferLearningDiagram,
  "ds-topic-31": ActivationFunctionsDiagram,
  "ds-topic-32": CnnFlow,
  "ds-topic-33": RnnLstmDiagram,
  "ds-topic-34": AttentionDiagram,
  "ds-topic-35": GanDiagram,
  "ds-topic-37": AutoencoderDiagram,
  "ds-topic-38": ObjectDetectionDiagram,
  "ds-topic-39": DiffusionModelDiagram,
  "ds-topic-40": NlpPipelineDiagram,
  "ds-topic-41": WordEmbeddingDiagram,
  "ds-topic-42": BertArchitectureDiagram,
  "ds-topic-48": RagPipelineDiagram,
  "ds-topic-50": ReinforcementLearningDiagram,
};
