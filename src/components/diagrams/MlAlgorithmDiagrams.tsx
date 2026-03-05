import type { ReactNode } from "react";

/* ===== Existing diagrams (moved from TopicDiagrams.tsx) ===== */

function LearningTypes() {
  const boxW = 110, boxH = 55, gap = 15;
  return (
    <svg viewBox="0 0 400 175" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">機械学習の3分類</text>
      <rect x={25} y={30} width={boxW} height={boxH} fill="#dbeafe" rx="8" stroke="#2563eb" strokeWidth="2" />
      <text x={25 + boxW / 2} y={52} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563eb">教師あり学習</text>
      <text x={25 + boxW / 2} y={68} textAnchor="middle" fontSize="9" fill="#64748b">入力 + 正解ラベル</text>
      <rect x={25 + boxW + gap} y={30} width={boxW} height={boxH} fill="#dcfce7" rx="8" stroke="#16a34a" strokeWidth="2" />
      <text x={25 + boxW + gap + boxW / 2} y={52} textAnchor="middle" fontSize="11" fontWeight="700" fill="#16a34a">教師なし学習</text>
      <text x={25 + boxW + gap + boxW / 2} y={68} textAnchor="middle" fontSize="9" fill="#64748b">ラベルなしデータ</text>
      <rect x={25 + 2 * (boxW + gap)} y={30} width={boxW} height={boxH} fill="#fef3c7" rx="8" stroke="#f59e0b" strokeWidth="2" />
      <text x={25 + 2 * (boxW + gap) + boxW / 2} y={52} textAnchor="middle" fontSize="11" fontWeight="700" fill="#b45309">強化学習</text>
      <text x={25 + 2 * (boxW + gap) + boxW / 2} y={68} textAnchor="middle" fontSize="9" fill="#64748b">行動 + 報酬</text>
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
      {[80, 200 + gap, 25 + 2 * (boxW + gap) + boxW / 2].map((x, i) => (
        <line key={i} x1={x} y1={85} x2={x} y2={95} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGrayML)" />
      ))}
      <defs>
        <marker id="arrowGrayML" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

function EnsembleLearning() {
  return (
    <svg viewBox="0 0 440 155" className="topic-diagram">
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
      <g transform="translate(225,0)">
        <text x="100" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">ブースティング (逐次)</text>
        {[0, 1, 2].map(i => (
          <g key={i}>
            <rect x={15 + i * 62} y="30" width="52" height="24" fill="#fef3c7" rx="3" stroke="#f59e0b" strokeWidth="1" />
            <text x={41 + i * 62} y="46" textAnchor="middle" fontSize="8" fill="#334155">モデル{i + 1}</text>
            {i < 2 && (
              <>
                <line x1={67 + i * 62} y1="42" x2={77 + i * 62} y2="42" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowOrangeML)" />
                <text x={72 + i * 62} y="27" textAnchor="middle" fontSize="7" fill="#dc2626">残差</text>
              </>
            )}
          </g>
        ))}
        <line x1="100" y1="54" x2="100" y2="72" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowGrayEML)" />
        <rect x="45" y="78" width="110" height="24" fill="#16a34a" rx="4" opacity="0.8" />
        <text x="100" y="94" textAnchor="middle" fontSize="9" fontWeight="600" fill="white">重み付き合計</text>
        <text x="100" y="120" textAnchor="middle" fontSize="8" fill="#64748b">例: XGBoost, LightGBM</text>
      </g>
      <defs>
        <marker id="arrowOrangeML" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
        </marker>
        <marker id="arrowGrayEML" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto">
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
      <g transform="translate(15,28)">
        <text x="115" y="8" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">予測</text>
        <text x="80" y="22" textAnchor="middle" fontSize="9" fill="#64748b">陽性</text>
        <text x="145" y="22" textAnchor="middle" fontSize="9" fill="#64748b">陰性</text>
        <text x="12" y="52" textAnchor="middle" fontSize="9" fill="#64748b">実</text>
        <text x="12" y="64" textAnchor="middle" fontSize="9" fill="#64748b">際</text>
        <text x="32" y="48" textAnchor="middle" fontSize="9" fill="#64748b">陽性</text>
        <text x="32" y="90" textAnchor="middle" fontSize="9" fill="#64748b">陰性</text>
        <rect x="50" y="30" width="65" height="35" fill="#dcfce7" stroke="#e2e8f0" strokeWidth="1" rx="4" />
        <text x="82" y="52" textAnchor="middle" fontSize="12" fontWeight="700" fill="#16a34a">TP</text>
        <rect x="115" y="30" width="65" height="35" fill="#fee2e2" stroke="#e2e8f0" strokeWidth="1" rx="4" />
        <text x="147" y="52" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">FN</text>
        <rect x="50" y="65" width="65" height="35" fill="#fee2e2" stroke="#e2e8f0" strokeWidth="1" rx="4" />
        <text x="82" y="87" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">FP</text>
        <rect x="115" y="65" width="65" height="35" fill="#dcfce7" stroke="#e2e8f0" strokeWidth="1" rx="4" />
        <text x="147" y="87" textAnchor="middle" fontSize="12" fontWeight="700" fill="#16a34a">TN</text>
      </g>
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
  const n = 50;
  return (
    <svg viewBox="0 0 400 190" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">バイアス-バリアンス トレードオフ</text>
      <line x1="60" y1="140" x2="370" y2="140" stroke="#64748b" strokeWidth="1" />
      <line x1="60" y1="140" x2="60" y2="38" stroke="#64748b" strokeWidth="1" />
      <text x="215" y="158" textAnchor="middle" fontSize="10" fill="#64748b">モデルの複雑さ →</text>
      <text x="30" y="90" textAnchor="middle" fontSize="10" fill="#64748b" transform="rotate(-90,30,90)">誤差</text>
      <path d={Array.from({length: n}, (_, i) => {
        const x = 60 + i * 6.2;
        const y = 130 - 80 * Math.exp(-i * 0.06);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      }).join(" ")} fill="none" stroke="#2563eb" strokeWidth="2.5" />
      <path d={Array.from({length: n}, (_, i) => {
        const x = 60 + i * 6.2;
        const y = 135 - 5 * Math.exp(i * 0.05);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      }).join(" ")} fill="none" stroke="#dc2626" strokeWidth="2.5" />
      <path d={Array.from({length: n}, (_, i) => {
        const x = 60 + i * 6.2;
        const bias = 80 * Math.exp(-i * 0.06);
        const variance = 5 * Math.exp(i * 0.05);
        const y = 135 - bias - variance + 80;
        return `${i === 0 ? "M" : "L"}${x},${Math.max(38, y)}`;
      }).join(" ")} fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="6,3" />
      <line x1="180" y1="38" x2="180" y2="140" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
      <text x="180" y="34" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">最適点</text>
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
  const pts = [
    [50,85],[70,68],[85,55],[100,62],[115,42],[130,50],[145,38],[155,28],[90,75],[110,55]
  ];
  return (
    <svg viewBox="0 0 400 165" className="topic-diagram">
      <text x="200" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">PCA（主成分分析）のイメージ</text>
      <g transform="translate(10,20)">
        <rect x="15" y="5" width="160" height="105" fill="#f8fafc" rx="6" />
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#2563eb" opacity="0.7" />)}
        <line x1="35" y1="95" x2="165" y2="18" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,3" />
        <text x="165" y="14" fontSize="9" fontWeight="600" fill="#dc2626">PC1</text>
        <line x1="70" y1="18" x2="140" y2="90" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,3" />
        <text x="145" y="95" fontSize="9" fontWeight="600" fill="#16a34a">PC2</text>
        <text x="95" y="125" textAnchor="middle" fontSize="9" fill="#64748b">2次元データ</text>
      </g>
      <text x="200" y="80" textAnchor="middle" fontSize="18" fill="#94a3b8">→</text>
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

function OneHotEncoding() {
  return (
    <svg viewBox="0 0 400 130" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">One-Hotエンコーディング</text>
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
      <text x="135" y="72" fontSize="20" fill="#64748b">→</text>
      <g transform="translate(170,25)">
        <text x="100" y="12" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748b">One-Hot変換後</text>
        {["赤", "青", "緑"].map((v, i) => (
          <g key={i}>
            <rect x={i * 67} y="18" width="65" height="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" rx="3" />
            <text x={i * 67 + 32} y="34" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">色_{v}</text>
          </g>
        ))}
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

/* ===== NEW diagrams ===== */

function DecisionTreeDiagram() {
  return (
    <svg viewBox="0 0 400 200" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">決定木（Decision Tree）</text>
      {/* Root node */}
      <rect x="130" y="28" width="140" height="32" fill="#dbeafe" rx="8" stroke="#2563eb" strokeWidth="2" />
      <text x="200" y="49" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">年齢 &gt; 30?</text>
      {/* Yes branch */}
      <line x1="170" y1="60" x2="100" y2="88" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrowDT)" />
      <text x="125" y="72" fontSize="9" fontWeight="600" fill="#16a34a">Yes</text>
      {/* No branch */}
      <line x1="230" y1="60" x2="320" y2="88" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arrowDT)" />
      <text x="285" y="72" fontSize="9" fontWeight="600" fill="#dc2626">No</text>
      {/* Second decision node */}
      <rect x="20" y="90" width="160" height="32" fill="#e0f2fe" rx="8" stroke="#2563eb" strokeWidth="1.5" />
      <text x="100" y="111" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">収入 &gt; 500万?</text>
      {/* Right leaf: reject */}
      <rect x="275" y="90" width="90" height="32" fill="#fee2e2" rx="8" stroke="#dc2626" strokeWidth="2" />
      <text x="320" y="111" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">拒否</text>
      {/* Yes branch from second node */}
      <line x1="60" y1="122" x2="45" y2="148" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrowDT)" />
      <text x="42" y="138" fontSize="9" fontWeight="600" fill="#16a34a">Yes</text>
      {/* No branch from second node */}
      <line x1="140" y1="122" x2="165" y2="148" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arrowDT)" />
      <text x="162" y="138" fontSize="9" fontWeight="600" fill="#dc2626">No</text>
      {/* Leaf: approve */}
      <rect x="5" y="152" width="85" height="32" fill="#dcfce7" rx="8" stroke="#16a34a" strokeWidth="2" />
      <text x="47" y="173" textAnchor="middle" fontSize="11" fontWeight="700" fill="#16a34a">承認</text>
      {/* Leaf: reject */}
      <rect x="125" y="152" width="85" height="32" fill="#fee2e2" rx="8" stroke="#dc2626" strokeWidth="2" />
      <text x="167" y="173" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">拒否</text>
      {/* Legend */}
      <text x="340" y="160" textAnchor="middle" fontSize="8" fill="#64748b">条件分岐で</text>
      <text x="340" y="172" textAnchor="middle" fontSize="8" fill="#64748b">予測を生成</text>
      <defs>
        <marker id="arrowDT" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

function SvmDiagram() {
  const classA: [number, number][] = [
    [55,35],[70,28],[85,45],[60,55],[75,50],[90,30],[65,42],[50,48],[80,38],[72,58]
  ];
  const classB: [number, number][] = [
    [200,120],[215,130],[230,115],[245,135],[210,140],[225,125],[240,110],[250,128],[218,108],[235,140]
  ];
  const supportA: [number, number][] = [[90,55],[85,45]];
  const supportB: [number, number][] = [[200,120]];
  return (
    <svg viewBox="0 0 400 185" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">SVM（サポートベクターマシン）</text>
      <g transform="translate(45,22)">
        <rect x="0" y="0" width="310" height="140" fill="#f8fafc" rx="6" stroke="#e2e8f0" strokeWidth="1" />
        {/* Class A dots */}
        {classA.map(([x, y], i) => (
          <circle key={`a${i}`} cx={x} cy={y} r="5" fill="#2563eb" opacity="0.8" />
        ))}
        {/* Class B dots */}
        {classB.map(([x, y], i) => (
          <circle key={`b${i}`} cx={x} cy={y} r="5" fill="#dc2626" opacity="0.8" />
        ))}
        {/* Hyperplane */}
        <line x1="115" y1="5" x2="185" y2="135" stroke="#334155" strokeWidth="2.5" />
        {/* Margin lines */}
        <line x1="95" y1="5" x2="165" y2="135" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,3" />
        <line x1="135" y1="5" x2="205" y2="135" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,3" />
        {/* Margin label */}
        <text x="150" y="80" textAnchor="middle" fontSize="8" fill="#64748b" transform="rotate(62,150,80)">マージン</text>
        {/* Support vectors highlighted */}
        {supportA.map(([x, y], i) => (
          <circle key={`sa${i}`} cx={x} cy={y} r="9" fill="none" stroke="#f59e0b" strokeWidth="2" />
        ))}
        {supportB.map(([x, y], i) => (
          <circle key={`sb${i}`} cx={x} cy={y} r="9" fill="none" stroke="#f59e0b" strokeWidth="2" />
        ))}
      </g>
      {/* Legend */}
      <circle cx="70" cy="178" r="5" fill="#2563eb" />
      <text x="80" y="182" fontSize="9" fill="#2563eb">クラスA</text>
      <circle cx="135" cy="178" r="5" fill="#dc2626" />
      <text x="145" y="182" fontSize="9" fill="#dc2626">クラスB</text>
      <circle cx="200" cy="178" r="7" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <text x="212" y="182" fontSize="9" fill="#b45309">サポートベクター</text>
      <text x="345" y="182" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">マージン最大化</text>
    </svg>
  );
}

function KnnDiagram() {
  const classA: [number, number][] = [
    [60,40],[80,55],[55,70],[90,35],[70,85],[50,55],[85,70],[65,30]
  ];
  const classB: [number, number][] = [
    [160,100],[180,85],[200,110],[170,120],[190,95],[210,80],[175,70],[195,125]
  ];
  const query: [number, number] = [120, 75];
  const kRadius = 48;
  return (
    <svg viewBox="0 0 400 185" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">k-NN（k近傍法）</text>
      <g transform="translate(55,22)">
        <rect x="0" y="0" width="260" height="140" fill="#f8fafc" rx="6" stroke="#e2e8f0" strokeWidth="1" />
        {/* Class A dots */}
        {classA.map(([x, y], i) => (
          <circle key={`a${i}`} cx={x} cy={y} r="5" fill="#2563eb" opacity="0.8" />
        ))}
        {/* Class B dots */}
        {classB.map(([x, y], i) => (
          <circle key={`b${i}`} cx={x} cy={y} r="5" fill="#dc2626" opacity="0.8" />
        ))}
        {/* k=3 neighborhood circle */}
        <circle cx={query[0]} cy={query[1]} r={kRadius} fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" />
        {/* Query point (green diamond) */}
        <polygon points={`${query[0]},${query[1]-8} ${query[0]+8},${query[1]} ${query[0]},${query[1]+8} ${query[0]-8},${query[1]}`} fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />
        {/* Neighbors inside circle: 2 blue (80,55) (85,70) and 1 red (160,100 is outside, so use closer ones) */}
        {/* Dashed lines to nearest neighbors */}
        <line x1={query[0]} y1={query[1]} x2={80} y2={55} stroke="#2563eb" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
        <line x1={query[0]} y1={query[1]} x2={85} y2={70} stroke="#2563eb" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
        <line x1={query[0]} y1={query[1]} x2={90} y2={35} stroke="#2563eb" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
        {/* k=3 label */}
        <text x={query[0] + kRadius - 5} y={query[1] - kRadius + 12} fontSize="9" fontWeight="600" fill="#b45309">k=3</text>
      </g>
      {/* Legend */}
      <circle cx="60" cy="178" r="5" fill="#2563eb" />
      <text x="70" y="182" fontSize="9" fill="#2563eb">クラスA</text>
      <circle cx="125" cy="178" r="5" fill="#dc2626" />
      <text x="135" y="182" fontSize="9" fill="#dc2626">クラスB</text>
      <polygon points="195,170 203,178 195,186 187,178" fill="#16a34a" />
      <text x="210" y="182" fontSize="9" fill="#16a34a">クエリ点</text>
      <text x="330" y="178" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">多数決</text>
      <text x="330" y="190" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">→ 青クラス</text>
    </svg>
  );
}

function GradientBoostingDiagram() {
  return (
    <svg viewBox="0 0 420 160" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">勾配ブースティング</text>
      {/* Tree 1 */}
      <g transform="translate(30,30)">
        <polygon points="40,0 75,40 5,40" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <rect x="15" y="40" width="50" height="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" rx="2" />
        <text x="40" y="52" textAnchor="middle" fontSize="8" fontWeight="600" fill="#2563eb">Tree₁</text>
        <text x="40" y="72" textAnchor="middle" fontSize="8" fill="#64748b">初期予測</text>
      </g>
      {/* Arrow 1 */}
      <line x1="110" y1="60" x2="140" y2="60" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowGB)" />
      <text x="125" y="52" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">+残差</text>
      {/* Tree 2 */}
      <g transform="translate(145,30)">
        <polygon points="40,0 75,40 5,40" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <rect x="15" y="40" width="50" height="16" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="2" />
        <text x="40" y="52" textAnchor="middle" fontSize="8" fontWeight="600" fill="#b45309">Tree₂</text>
        <text x="40" y="72" textAnchor="middle" fontSize="8" fill="#64748b">残差を学習</text>
      </g>
      {/* Arrow 2 */}
      <line x1="225" y1="60" x2="255" y2="60" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowGB)" />
      <text x="240" y="52" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">+残差</text>
      {/* Tree 3 */}
      <g transform="translate(260,30)">
        <polygon points="40,0 75,40 5,40" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <rect x="15" y="40" width="50" height="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" rx="2" />
        <text x="40" y="52" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">Tree₃</text>
        <text x="40" y="72" textAnchor="middle" fontSize="8" fill="#64748b">さらに改善</text>
      </g>
      {/* Arrow to result */}
      <line x1="340" y1="60" x2="370" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowGBgray)" />
      {/* Result box */}
      <rect x="370" y="40" width="45" height="40" fill="#f3e8ff" rx="6" stroke="#7c3aed" strokeWidth="2" />
      <text x="392" y="58" textAnchor="middle" fontSize="8" fontWeight="700" fill="#7c3aed">最終</text>
      <text x="392" y="72" textAnchor="middle" fontSize="8" fontWeight="700" fill="#7c3aed">予測</text>
      {/* Formula */}
      <rect x="75" y="112" width="270" height="24" fill="#f8fafc" rx="4" stroke="#e2e8f0" strokeWidth="1" />
      <text x="210" y="129" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">F(x) = Tree₁ + Tree₂ + Tree₃</text>
      {/* Bottom label */}
      <text x="210" y="152" textAnchor="middle" fontSize="9" fill="#64748b">弱い学習器を順に改善 → 強い予測モデル</text>
      <defs>
        <marker id="arrowGB" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
        </marker>
        <marker id="arrowGBgray" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

function CrossValidationDiagram() {
  const folds = 5;
  const blockW = 52, blockH = 20, gap = 4;
  const colors = { train: "#dbeafe", test: "#fed7aa", trainStroke: "#2563eb", testStroke: "#f59e0b" };
  return (
    <svg viewBox="0 0 400 170" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">K-fold 交差検証 (K=5)</text>
      {Array.from({ length: folds }, (_, row) => (
        <g key={row} transform={`translate(95,${28 + row * (blockH + gap)})`}>
          <text x="-50" y={blockH / 2 + 4} textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748b">Fold {row + 1}</text>
          {Array.from({ length: folds }, (_, col) => {
            const isTest = col === row;
            return (
              <g key={col}>
                <rect
                  x={col * (blockW + gap)}
                  y={0}
                  width={blockW}
                  height={blockH}
                  fill={isTest ? colors.test : colors.train}
                  stroke={isTest ? colors.testStroke : colors.trainStroke}
                  strokeWidth="1.5"
                  rx="3"
                />
                <text
                  x={col * (blockW + gap) + blockW / 2}
                  y={blockH / 2 + 4}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="600"
                  fill={isTest ? "#b45309" : "#2563eb"}
                >
                  {isTest ? "テスト" : "訓練"}
                </text>
              </g>
            );
          })}
        </g>
      ))}
      {/* Legend */}
      <rect x="110" y="148" width="14" height="12" fill={colors.train} stroke={colors.trainStroke} strokeWidth="1" rx="2" />
      <text x="130" y="158" fontSize="9" fill="#2563eb">訓練データ</text>
      <rect x="200" y="148" width="14" height="12" fill={colors.test} stroke={colors.testStroke} strokeWidth="1" rx="2" />
      <text x="220" y="158" fontSize="9" fill="#b45309">テストデータ</text>
    </svg>
  );
}

function ClusteringDiagram() {
  const cluster1: [number, number][] = [
    [55,45],[65,35],[50,55],[70,50],[60,60],[45,40],[72,42],[58,30]
  ];
  const cluster2: [number, number][] = [
    [160,100],[170,90],[155,110],[175,105],[165,115],[180,95],[150,95],[168,108]
  ];
  const cluster3: [number, number][] = [
    [230,40],[240,50],[250,35],[225,50],[245,45],[235,30],[255,42],[228,38]
  ];
  const centroids: [number, number, string][] = [
    [60, 45, "#2563eb"], [165, 102, "#16a34a"], [238, 41, "#f59e0b"]
  ];
  return (
    <svg viewBox="0 0 400 175" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">k-means クラスタリング</text>
      <g transform="translate(55,22)">
        <rect x="0" y="0" width="290" height="130" fill="#f8fafc" rx="6" stroke="#e2e8f0" strokeWidth="1" />
        {/* Cluster 1 (blue) */}
        <ellipse cx="60" cy="47" rx="38" ry="28" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />
        {cluster1.map(([x, y], i) => (
          <circle key={`c1${i}`} cx={x} cy={y} r="4" fill="#2563eb" opacity="0.7" />
        ))}
        {/* Cluster 2 (green) */}
        <ellipse cx="165" cy="102" rx="35" ry="25" fill="none" stroke="#16a34a" strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />
        {cluster2.map(([x, y], i) => (
          <circle key={`c2${i}`} cx={x} cy={y} r="4" fill="#16a34a" opacity="0.7" />
        ))}
        {/* Cluster 3 (amber) */}
        <ellipse cx="238" cy="41" rx="32" ry="22" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />
        {cluster3.map(([x, y], i) => (
          <circle key={`c3${i}`} cx={x} cy={y} r="4" fill="#f59e0b" opacity="0.7" />
        ))}
        {/* Centroids (X marks) */}
        {centroids.map(([cx, cy, color], i) => (
          <g key={`ctr${i}`}>
            <line x1={cx - 5} y1={cy - 5} x2={cx + 5} y2={cy + 5} stroke={color} strokeWidth="3" />
            <line x1={cx + 5} y1={cy - 5} x2={cx - 5} y2={cy + 5} stroke={color} strokeWidth="3" />
          </g>
        ))}
      </g>
      {/* Labels */}
      <text x="85" y="168" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">k=3</text>
      <text x="240" y="168" textAnchor="middle" fontSize="9" fill="#64748b">重心を反復更新してクラスタを形成</text>
      {/* Legend */}
      <g transform="translate(335,50)">
        <line x1="-5" y1="-5" x2="5" y2="5" stroke="#334155" strokeWidth="2.5" />
        <line x1="5" y1="-5" x2="-5" y2="5" stroke="#334155" strokeWidth="2.5" />
        <text x="12" y="4" fontSize="8" fill="#64748b">重心</text>
      </g>
    </svg>
  );
}

function MlTaxonomyDiagram() {
  return (
    <svg viewBox="0 0 440 200" className="topic-diagram">
      <text x="220" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">ML手法分類木</text>
      {/* Root */}
      <rect x="165" y="24" width="110" height="28" fill="#f3e8ff" rx="6" stroke="#7c3aed" strokeWidth="2" />
      <text x="220" y="43" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7c3aed">機械学習</text>
      {/* Branch lines from root */}
      <line x1="190" y1="52" x2="80" y2="72" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="220" y1="52" x2="220" y2="72" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="250" y1="52" x2="370" y2="72" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Level 1: Supervised */}
      <rect x="25" y="72" width="110" height="26" fill="#dbeafe" rx="5" stroke="#2563eb" strokeWidth="1.5" />
      <text x="80" y="90" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">教師あり</text>
      {/* Level 1: Unsupervised */}
      <rect x="165" y="72" width="110" height="26" fill="#dcfce7" rx="5" stroke="#16a34a" strokeWidth="1.5" />
      <text x="220" y="90" textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">教師なし</text>
      {/* Level 1: Reinforcement */}
      <rect x="315" y="72" width="110" height="26" fill="#fef3c7" rx="5" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="370" y="90" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b45309">強化学習</text>
      {/* Supervised branches */}
      <line x1="55" y1="98" x2="40" y2="114" stroke="#94a3b8" strokeWidth="1" />
      <line x1="105" y1="98" x2="120" y2="114" stroke="#94a3b8" strokeWidth="1" />
      <rect x="5" y="114" width="70" height="22" fill="#e0f2fe" rx="4" />
      <text x="40" y="129" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">分類</text>
      <rect x="85" y="114" width="70" height="22" fill="#e0f2fe" rx="4" />
      <text x="120" y="129" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">回帰</text>
      {/* Classification examples */}
      <text x="40" y="148" textAnchor="middle" fontSize="8" fill="#64748b">SVM</text>
      <text x="40" y="160" textAnchor="middle" fontSize="8" fill="#64748b">決定木</text>
      {/* Regression examples */}
      <text x="120" y="148" textAnchor="middle" fontSize="8" fill="#64748b">線形回帰</text>
      <text x="120" y="160" textAnchor="middle" fontSize="8" fill="#64748b">GBDT</text>
      {/* Unsupervised branches */}
      <line x1="195" y1="98" x2="185" y2="114" stroke="#94a3b8" strokeWidth="1" />
      <line x1="245" y1="98" x2="258" y2="114" stroke="#94a3b8" strokeWidth="1" />
      <rect x="148" y="114" width="78" height="22" fill="#ecfdf5" rx="4" />
      <text x="187" y="129" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">クラスタリング</text>
      <rect x="233" y="114" width="70" height="22" fill="#ecfdf5" rx="4" />
      <text x="268" y="129" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">次元削減</text>
      {/* Clustering examples */}
      <text x="187" y="148" textAnchor="middle" fontSize="8" fill="#64748b">k-means</text>
      <text x="187" y="160" textAnchor="middle" fontSize="8" fill="#64748b">DBSCAN</text>
      {/* Dim reduction examples */}
      <text x="268" y="148" textAnchor="middle" fontSize="8" fill="#64748b">PCA</text>
      <text x="268" y="160" textAnchor="middle" fontSize="8" fill="#64748b">t-SNE</text>
      {/* Reinforcement branches */}
      <line x1="345" y1="98" x2="335" y2="114" stroke="#94a3b8" strokeWidth="1" />
      <line x1="395" y1="98" x2="405" y2="114" stroke="#94a3b8" strokeWidth="1" />
      <rect x="300" y="114" width="70" height="22" fill="#fef9c3" rx="4" />
      <text x="335" y="129" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b45309">Q学習</text>
      <rect x="375" y="114" width="60" height="22" fill="#fef9c3" rx="4" />
      <text x="405" y="129" textAnchor="middle" fontSize="8" fontWeight="600" fill="#b45309">方策勾配</text>
      {/* RL examples */}
      <text x="335" y="148" textAnchor="middle" fontSize="8" fill="#64748b">DQN</text>
      <text x="405" y="148" textAnchor="middle" fontSize="8" fill="#64748b">PPO, A3C</text>
    </svg>
  );
}

function RegressionVsClassification() {
  // Regression scatter points
  const regPts: [number, number][] = [
    [20,95],[35,82],[50,70],[60,65],[75,52],[85,48],[100,38],[115,30],[125,25],[140,18]
  ];
  // Classification scatter points
  const classAPts: [number, number][] = [
    [20,30],[30,45],[40,25],[25,55],[50,40],[35,60],[45,50],[55,35]
  ];
  const classBPts: [number, number][] = [
    [110,80],[120,95],[130,75],[140,90],[125,105],[135,70],[145,85],[115,100]
  ];
  return (
    <svg viewBox="0 0 420 175" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">回帰 vs 分類</text>
      {/* Left panel: Regression */}
      <g transform="translate(10,28)">
        <rect x="0" y="0" width="185" height="115" fill="#f8fafc" rx="6" stroke="#e2e8f0" strokeWidth="1" />
        <text x="92" y="14" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">回帰: 連続値予測</text>
        {/* Axes */}
        <line x1="15" y1="100" x2="175" y2="100" stroke="#64748b" strokeWidth="0.8" />
        <line x1="15" y1="100" x2="15" y2="18" stroke="#64748b" strokeWidth="0.8" />
        {/* Scatter points */}
        {regPts.map(([x, y], i) => (
          <circle key={i} cx={x + 15} cy={y} r="3.5" fill="#2563eb" opacity="0.7" />
        ))}
        {/* Regression line */}
        <line x1="20" y1="98" x2="165" y2="18" stroke="#dc2626" strokeWidth="2" />
        <text x="170" y="30" fontSize="8" fill="#dc2626">y = ax + b</text>
        <text x="92" y="112" textAnchor="middle" fontSize="8" fill="#64748b">出力: 価格, 温度 etc.</text>
      </g>
      {/* Right panel: Classification */}
      <g transform="translate(215,28)">
        <rect x="0" y="0" width="195" height="115" fill="#f8fafc" rx="6" stroke="#e2e8f0" strokeWidth="1" />
        <text x="97" y="14" textAnchor="middle" fontSize="10" fontWeight="600" fill="#16a34a">分類: カテゴリ予測</text>
        {/* Axes */}
        <line x1="15" y1="100" x2="180" y2="100" stroke="#64748b" strokeWidth="0.8" />
        <line x1="15" y1="100" x2="15" y2="18" stroke="#64748b" strokeWidth="0.8" />
        {/* Class A points */}
        {classAPts.map(([x, y], i) => (
          <circle key={`a${i}`} cx={x + 10} cy={y} r="3.5" fill="#2563eb" opacity="0.8" />
        ))}
        {/* Class B points */}
        {classBPts.map(([x, y], i) => (
          <circle key={`b${i}`} cx={x + 10} cy={y} r="3.5" fill="#dc2626" opacity="0.8" />
        ))}
        {/* Decision boundary */}
        <line x1="85" y1="18" x2="85" y2="100" stroke="#16a34a" strokeWidth="2" strokeDasharray="5,3" />
        <text x="42" y="95" textAnchor="middle" fontSize="8" fill="#2563eb">クラスA</text>
        <text x="135" y="95" textAnchor="middle" fontSize="8" fill="#dc2626">クラスB</text>
        <text x="97" y="112" textAnchor="middle" fontSize="8" fill="#64748b">出力: ラベル (0/1, A/B)</text>
      </g>
      {/* Bottom labels */}
      <text x="105" y="168" textAnchor="middle" fontSize="8" fill="#64748b">線形回帰, GBDT, NN</text>
      <text x="312" y="168" textAnchor="middle" fontSize="8" fill="#64748b">ロジスティック回帰, SVM, RF</text>
    </svg>
  );
}

function XaiDiagram() {
  const features: { name: string; value: number; color: string }[] = [
    { name: "年収", value: 0.85, color: "#2563eb" },
    { name: "年齢", value: 0.52, color: "#2563eb" },
    { name: "勤続年数", value: 0.38, color: "#16a34a" },
    { name: "借入額", value: -0.30, color: "#dc2626" },
    { name: "居住年数", value: 0.22, color: "#16a34a" },
  ];
  const maxAbs = 0.85;
  const barAreaW = 220;
  const barH = 18;
  const gap = 6;
  const originX = 200;
  return (
    <svg viewBox="0 0 420 175" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">特徴量の重要度（SHAP値）</text>
      {/* Axis line at origin */}
      <line x1={originX} y1="28" x2={originX} y2={28 + features.length * (barH + gap)} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />
      {features.map((f, i) => {
        const barW = Math.abs(f.value) / maxAbs * (barAreaW / 2);
        const bx = f.value >= 0 ? originX : originX - barW;
        const ty = 40 + i * (barH + gap);
        return (
          <g key={i}>
            <text x={85} y={ty + barH / 2 + 1} textAnchor="end" fontSize="10" fontWeight="600" fill="#334155">{f.name}</text>
            <rect x={bx} y={ty} width={barW} height={barH} fill={f.color} opacity="0.75" rx="3" />
            <text
              x={f.value >= 0 ? bx + barW + 5 : bx - 5}
              y={ty + barH / 2 + 4}
              textAnchor={f.value >= 0 ? "start" : "end"}
              fontSize="9"
              fill={f.color}
              fontWeight="600"
            >
              {f.value > 0 ? "+" : ""}{f.value.toFixed(2)}
            </text>
          </g>
        );
      })}
      {/* Axis labels */}
      <text x={originX - barAreaW / 4} y={28 + features.length * (barH + gap) + 16} textAnchor="middle" fontSize="8" fill="#dc2626">← 負の寄与</text>
      <text x={originX + barAreaW / 4} y={28 + features.length * (barH + gap) + 16} textAnchor="middle" fontSize="8" fill="#2563eb">正の寄与 →</text>
      <text x="210" y="170" textAnchor="middle" fontSize="9" fill="#64748b">モデルの予測根拠を可視化</text>
    </svg>
  );
}

function AnomalyDetectionDiagram() {
  const normals: [number, number][] = [
    [120,70],[135,65],[125,80],[140,75],[130,60],[115,75],[145,70],[128,85],
    [138,58],[122,68],[132,78],[118,62],[142,82],[126,72],[136,66],[130,74],
  ];
  const outliers: [number, number][] = [
    [40, 30], [250, 120], [220, 25], [60, 130],
  ];
  return (
    <svg viewBox="0 0 400 185" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">異常検知（Anomaly Detection）</text>
      <g transform="translate(55,22)">
        <rect x="0" y="0" width="290" height="140" fill="#f8fafc" rx="6" stroke="#e2e8f0" strokeWidth="1" />
        {/* Decision boundary */}
        <ellipse cx="130" cy="72" rx="50" ry="35" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="6,3" />
        {/* Normal points */}
        {normals.map(([x, y], i) => (
          <circle key={`n${i}`} cx={x} cy={y} r="4" fill="#2563eb" opacity="0.7" />
        ))}
        {/* Outlier points */}
        {outliers.map(([x, y], i) => (
          <circle key={`o${i}`} cx={x} cy={y} r="5" fill="#dc2626" opacity="0.9" />
        ))}
      </g>
      {/* Legend */}
      <circle cx="80" cy="178" r="5" fill="#2563eb" />
      <text x="90" y="182" fontSize="9" fill="#2563eb">正常</text>
      <circle cx="145" cy="178" r="5" fill="#dc2626" />
      <text x="155" y="182" fontSize="9" fill="#dc2626">異常（外れ値）</text>
      <text x="310" y="182" textAnchor="middle" fontSize="9" fill="#64748b">決定境界で識別</text>
    </svg>
  );
}

function TimeSeriesForecastDiagram() {
  const history: [number, number][] = [
    [30,85],[55,70],[80,78],[105,55],[130,62],[155,48],[180,52],[205,40],
  ];
  const forecast: [number, number][] = [
    [205,40],[230,35],[255,30],[280,28],[305,25],
  ];
  const upper: [number, number][] = [
    [205,40],[230,28],[255,18],[280,12],[305,8],
  ];
  const lower: [number, number][] = [
    [205,40],[230,42],[255,42],[280,44],[305,42],
  ];
  const toPath = (pts: [number, number][], cmd = "M") =>
    pts.map(([x, y], i) => `${i === 0 ? cmd : "L"}${x},${y}`).join(" ");
  return (
    <svg viewBox="0 0 400 175" className="topic-diagram">
      <text x="200" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">時系列予測（Time Series Forecast）</text>
      <g transform="translate(30,25)">
        {/* Axes */}
        <line x1="15" y1="110" x2="330" y2="110" stroke="#64748b" strokeWidth="0.8" />
        <line x1="15" y1="110" x2="15" y2="0" stroke="#64748b" strokeWidth="0.8" />
        {/* Confidence band */}
        <path
          d={`${toPath(upper)} ${toPath([...lower].reverse(), "L")} Z`}
          fill="#2563eb" opacity="0.1"
        />
        {/* Historical line (solid) */}
        <path d={toPath(history)} fill="none" stroke="#2563eb" strokeWidth="2.5" />
        {/* Forecast line (dashed) */}
        <path d={toPath(forecast)} fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="6,3" />
        {/* "Now" vertical line */}
        <line x1="205" y1="0" x2="205" y2="110" stroke="#64748b" strokeWidth="1" strokeDasharray="4,3" />
        <text x="205" y="122" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748b">現在</text>
      </g>
      {/* Legend */}
      <line x1="60" y1="165" x2="90" y2="165" stroke="#2563eb" strokeWidth="2.5" />
      <text x="95" y="169" fontSize="9" fill="#2563eb">実績データ</text>
      <line x1="175" y1="165" x2="205" y2="165" stroke="#2563eb" strokeWidth="2" strokeDasharray="6,3" />
      <text x="210" y="169" fontSize="9" fill="#2563eb">予測</text>
      <rect x="270" y="159" width="20" height="12" fill="#2563eb" opacity="0.1" stroke="#2563eb" strokeWidth="0.5" rx="2" />
      <text x="295" y="169" fontSize="9" fill="#64748b">信頼区間</text>
    </svg>
  );
}

function ImbalancedDataDiagram() {
  const leftBarMax = 120;
  const scale = (v: number) => (v / 950) * leftBarMax;
  return (
    <svg viewBox="0 0 440 175" className="topic-diagram">
      <text x="220" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">不均衡データの対処</text>
      {/* Left: Before */}
      <g transform="translate(30,30)">
        <text x="55" y="12" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">元データ</text>
        {/* Normal bar */}
        <rect x="15" y={22 + leftBarMax - scale(950)} width="35" height={scale(950)} fill="#2563eb" opacity="0.8" rx="3" />
        <text x="32" y={18 + leftBarMax - scale(950)} textAnchor="middle" fontSize="8" fontWeight="600" fill="#2563eb">950件</text>
        <text x="32" y={leftBarMax + 38} textAnchor="middle" fontSize="9" fill="#334155">正常</text>
        {/* Anomaly bar */}
        <rect x="60" y={22 + leftBarMax - scale(50)} width="35" height={scale(50)} fill="#dc2626" opacity="0.8" rx="3" />
        <text x="77" y={18 + leftBarMax - scale(50)} textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">50件</text>
        <text x="77" y={leftBarMax + 38} textAnchor="middle" fontSize="9" fill="#334155">異常</text>
      </g>
      {/* Arrow */}
      <g transform="translate(160,80)">
        <line x1="0" y1="0" x2="60" y2="0" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowImb)" />
        <text x="30" y="-8" textAnchor="middle" fontSize="8" fontWeight="600" fill="#f59e0b">オーバーサンプリング</text>
        <text x="30" y="14" textAnchor="middle" fontSize="8" fill="#64748b">(SMOTE)</text>
      </g>
      {/* Right: After */}
      <g transform="translate(250,30)">
        <text x="70" y="12" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">リサンプリング後</text>
        {/* Normal bar (reduced or same) */}
        <rect x="25" y={22 + leftBarMax - scale(600)} width="35" height={scale(600)} fill="#2563eb" opacity="0.8" rx="3" />
        <text x="42" y={18 + leftBarMax - scale(600)} textAnchor="middle" fontSize="8" fontWeight="600" fill="#2563eb">600件</text>
        <text x="42" y={leftBarMax + 38} textAnchor="middle" fontSize="9" fill="#334155">正常</text>
        {/* Anomaly bar (increased) */}
        <rect x="75" y={22 + leftBarMax - scale(500)} width="35" height={scale(500)} fill="#dc2626" opacity="0.8" rx="3" />
        <text x="92" y={18 + leftBarMax - scale(500)} textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">500件</text>
        <text x="92" y={leftBarMax + 38} textAnchor="middle" fontSize="9" fill="#334155">異常</text>
      </g>
      <defs>
        <marker id="arrowImb" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  );
}

function MlWorkflowDiagram() {
  const steps = [
    { label: "課題定義", color: "#7c3aed", bg: "#f3e8ff" },
    { label: "データ収集", color: "#2563eb", bg: "#dbeafe" },
    { label: "前処理", color: "#16a34a", bg: "#dcfce7" },
    { label: "モデル構築", color: "#f59e0b", bg: "#fef3c7" },
    { label: "評価", color: "#dc2626", bg: "#fee2e2" },
    { label: "運用", color: "#64748b", bg: "#f1f5f9" },
  ];
  const boxW = 58, boxH = 32, gap = 8;
  const totalW = steps.length * boxW + (steps.length - 1) * gap;
  const offsetX = (440 - totalW) / 2;
  return (
    <svg viewBox="0 0 440 130" className="topic-diagram">
      <text x="220" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">MLプロジェクトワークフロー</text>
      {steps.map((s, i) => {
        const x = offsetX + i * (boxW + gap);
        const y = 35;
        return (
          <g key={i}>
            <rect x={x} y={y} width={boxW} height={boxH} fill={s.bg} rx="6" stroke={s.color} strokeWidth="2" />
            <text x={x + boxW / 2} y={y + boxH / 2 + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill={s.color}>{s.label}</text>
            {i < steps.length - 1 && (
              <line x1={x + boxW} y1={y + boxH / 2} x2={x + boxW + gap} y2={y + boxH / 2} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowWF)" />
            )}
          </g>
        );
      })}
      {/* Feedback arrow from 評価 back to 前処理 */}
      {(() => {
        const evalX = offsetX + 4 * (boxW + gap) + boxW / 2;
        const preX = offsetX + 2 * (boxW + gap) + boxW / 2;
        const arcY = 35 + boxH + 20;
        return (
          <g>
            <path
              d={`M${evalX},${35 + boxH} L${evalX},${arcY} L${preX},${arcY} L${preX},${35 + boxH}`}
              fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrowFB)"
            />
            <text x={(evalX + preX) / 2} y={arcY + 14} textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">反復的プロセス</text>
          </g>
        );
      })()}
      <defs>
        <marker id="arrowWF" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
        </marker>
        <marker id="arrowFB" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,10 L5,0 L10,10 Z" fill="#dc2626" />
        </marker>
      </defs>
    </svg>
  );
}

function AssociationAnalysisDiagram() {
  const items: { label: string; cx: number; cy: number; color: string; bg: string }[] = [
    { label: "パン", cx: 80, cy: 65, color: "#2563eb", bg: "#dbeafe" },
    { label: "牛乳", cx: 250, cy: 65, color: "#16a34a", bg: "#dcfce7" },
    { label: "卵", cx: 165, cy: 140, color: "#f59e0b", bg: "#fef3c7" },
  ];
  const r = 30;
  return (
    <svg viewBox="0 0 420 185" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">アソシエーション分析</text>
      {/* Arrows between items */}
      {/* パン → 牛乳 */}
      <line x1={80 + r} y1="65" x2={250 - r} y2="65" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowAssoc)" />
      <rect x="120" y="38" width="90" height="16" fill="white" rx="3" stroke="#e2e8f0" strokeWidth="0.5" />
      <text x="165" y="50" textAnchor="middle" fontSize="8" fontWeight="600" fill="#2563eb">信頼度: 75%</text>
      {/* パン → 卵 */}
      <line x1={80 + 18} y1={65 + 24} x2={165 - 18} y2={140 - 24} stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrowAssocG)" />
      <text x="105" y="112" fontSize="8" fill="#16a34a" fontWeight="600">支持度: 30%</text>
      {/* 牛乳 → 卵 */}
      <line x1={250 - 18} y1={65 + 24} x2={165 + 18} y2={140 - 24} stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowAssocY)" />
      <text x="225" y="112" fontSize="8" fill="#b45309" fontWeight="600">リフト値: 1.5</text>
      {/* Item circles */}
      {items.map((item, i) => (
        <g key={i}>
          <circle cx={item.cx} cy={item.cy} r={r} fill={item.bg} stroke={item.color} strokeWidth="2" />
          <text x={item.cx} y={item.cy + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={item.color}>{item.label}</text>
        </g>
      ))}
      {/* Example rule */}
      <rect x="300" y="115" width="110" height="40" fill="#f8fafc" rx="6" stroke="#e2e8f0" strokeWidth="1" />
      <text x="355" y="132" textAnchor="middle" fontSize="9" fontWeight="600" fill="#334155">ルール例:</text>
      <text x="355" y="148" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">パン → 牛乳</text>
      <defs>
        <marker id="arrowAssoc" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#2563eb" />
        </marker>
        <marker id="arrowAssocG" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#16a34a" />
        </marker>
        <marker id="arrowAssocY" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  );
}

function GraphTheoryDiagram() {
  const nodes: { id: number; cx: number; cy: number; color: string; bg: string }[] = [
    { id: 1, cx: 80, cy: 45, color: "#2563eb", bg: "#dbeafe" },
    { id: 2, cx: 180, cy: 30, color: "#2563eb", bg: "#dbeafe" },
    { id: 3, cx: 260, cy: 55, color: "#16a34a", bg: "#dcfce7" },
    { id: 4, cx: 80, cy: 110, color: "#2563eb", bg: "#dbeafe" },
    { id: 5, cx: 180, cy: 115, color: "#16a34a", bg: "#dcfce7" },
    { id: 6, cx: 260, cy: 110, color: "#16a34a", bg: "#dcfce7" },
  ];
  const edges: [number, number][] = [
    [0,1],[0,3],[0,4],[1,2],[1,4],[2,5],[3,4],[4,5],
  ];
  const r = 18;
  return (
    <svg viewBox="0 0 420 175" className="topic-diagram">
      <text x="210" y="16" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">グラフ理論（Graph Theory）</text>
      <g transform="translate(45,22)">
        {/* Edges */}
        {edges.map(([a, b], i) => (
          <line key={`e${i}`} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy} stroke="#94a3b8" strokeWidth="1.5" />
        ))}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={`n${i}`}>
            <circle cx={n.cx} cy={n.cy} r={r} fill={n.bg} stroke={n.color} strokeWidth="2" />
            <text x={n.cx} y={n.cy + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={n.color}>{n.id}</text>
          </g>
        ))}
        {/* Highlight node 5 (index 4) degree annotation */}
        <circle cx={180} cy={115} r={r + 5} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" />
        <text x="215" y="130" fontSize="9" fontWeight="600" fill="#f59e0b">次数=4</text>
      </g>
      {/* Labels */}
      <g transform="translate(340,40)">
        <circle cx="10" cy="0" r="7" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="24" y="4" fontSize="9" fill="#2563eb">コミュニティA</text>
        <circle cx="10" cy="22" r="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="24" y="26" fontSize="9" fill="#16a34a">コミュニティB</text>
        <line x1="0" y1="44" x2="20" y2="44" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="24" y="48" fontSize="9" fill="#64748b">エッジ(辺)</text>
      </g>
      <text x="100" y="168" fontSize="9" fill="#64748b">ノード(頂点): 6</text>
      <text x="220" y="168" fontSize="9" fill="#64748b">エッジ(辺): 8</text>
    </svg>
  );
}

/* ===== Export map ===== */

export const mlAlgorithmDiagrams: Record<string, () => ReactNode> = {
  "ml-topic-01": LearningTypes,
  "ml-topic-03": EnsembleLearning,
  "ml-topic-04": ConfusionMatrix,
  "ml-topic-05": DimensionReduction,
  "ml-topic-06": BiasVariance,
  "ml-topic-10": OneHotEncoding,
  "ml-topic-12": XaiDiagram,
  "ml-topic-13": AnomalyDetectionDiagram,
  "ml-topic-14": TimeSeriesForecastDiagram,
  "ml-topic-15": MlTaxonomyDiagram,
  "ml-topic-17": RegressionVsClassification,
  "ml-topic-22": ImbalancedDataDiagram,
  "ml-topic-25": MlWorkflowDiagram,
  "ds-topic-21": DecisionTreeDiagram,
  "ds-topic-22": SvmDiagram,
  "ds-topic-23": KnnDiagram,
  "ds-topic-24": GradientBoostingDiagram,
  "ds-topic-25": CrossValidationDiagram,
  "ds-topic-26": ConfusionMatrix,
  "ds-topic-51": ClusteringDiagram,
  "ds-topic-52": AssociationAnalysisDiagram,
  "ds-topic-53": GraphTheoryDiagram,
};
