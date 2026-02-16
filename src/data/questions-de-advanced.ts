import type { Question } from "../types";

export const questionsDeAdvanced: Question[] = [
  // ===== SQL基礎追加 =====
  {
    id: "de-051",
    category: "データエンジニアリング力",
    question:
      "SQLで検索結果を特定のカラムの値で昇順に並べ替えたい場合に使用する句はどれか？",
    choices: [
      "GROUP BY",
      "ORDER BY",
      "SORT BY",
      "ARRANGE BY",
    ],
    correctIndex: 1,
    explanation:
      "ORDER BY句は検索結果を指定したカラムの値で並べ替えるために使用します。デフォルトは昇順（ASC）で、降順にしたい場合はDESCを指定します。例：SELECT * FROM employees ORDER BY salary DESC; とすると給与の高い順に並びます。",
  },
  {
    id: "de-052",
    category: "データエンジニアリング力",
    question:
      "SQLで重複する値を除いて一意な値のみを取得するために使用するキーワードはどれか？",
    choices: [
      "UNIQUE",
      "DISTINCT",
      "DIFFERENT",
      "SINGLE",
    ],
    correctIndex: 1,
    explanation:
      "DISTINCTキーワードをSELECT文で使用すると、指定したカラムの重複する値を除いて一意な値のみを返します。例：SELECT DISTINCT department FROM employees; とすると、重複を除いた部門名の一覧が取得できます。",
  },
  {
    id: "de-053",
    category: "データエンジニアリング力",
    question:
      "SQLで「名前がAから始まる」レコードを検索する場合、正しいWHERE句はどれか？",
    choices: [
      "WHERE name = 'A%'",
      "WHERE name LIKE 'A%'",
      "WHERE name START 'A'",
      "WHERE name MATCH 'A*'",
    ],
    correctIndex: 1,
    explanation:
      "LIKE演算子はパターンマッチングに使用します。%は0文字以上の任意の文字列、_は任意の1文字を表すワイルドカードです。'A%'は「Aで始まる任意の文字列」を意味します。'%a%'なら「aを含む文字列」、'___'なら「ちょうど3文字」を検索できます。",
  },
  {
    id: "de-054",
    category: "データエンジニアリング力",
    question:
      "SQLで「価格が1000以上3000以下」のレコードを検索する場合、最も簡潔な書き方はどれか？",
    choices: [
      "WHERE price >= 1000 OR price <= 3000",
      "WHERE price BETWEEN 1000 AND 3000",
      "WHERE price IN (1000, 3000)",
      "WHERE price RANGE 1000 TO 3000",
    ],
    correctIndex: 1,
    explanation:
      "BETWEEN演算子は指定した範囲内の値を検索するために使用します。BETWEEN 1000 AND 3000は1000以上3000以下（両端を含む）を意味し、price >= 1000 AND price <= 3000と同じ結果になります。数値だけでなく日付の範囲指定にもよく使われます。",
  },
  {
    id: "de-055",
    category: "データエンジニアリング力",
    question:
      "SQLで「部門がA、B、Cのいずれかに該当する」レコードを検索する場合に使用する演算子はどれか？",
    choices: [
      "WHERE dept = 'A' AND dept = 'B' AND dept = 'C'",
      "WHERE dept IN ('A', 'B', 'C')",
      "WHERE dept BETWEEN 'A' AND 'C'",
      "WHERE dept LIKE 'A,B,C'",
    ],
    correctIndex: 1,
    explanation:
      "IN演算子は、指定した値のリストのいずれかに一致するレコードを検索します。WHERE dept IN ('A', 'B', 'C')はWHERE dept = 'A' OR dept = 'B' OR dept = 'C'と同じ結果ですが、IN演算子を使った方が簡潔で読みやすくなります。",
  },
  {
    id: "de-056",
    category: "データエンジニアリング力",
    question:
      "SQLでNULL値を含むカラムの値を別の値に置き換えて表示したい場合に使用する関数はどれか？",
    choices: [
      "REPLACE()",
      "COALESCE()",
      "CONVERT()",
      "SUBSTITUTE()",
    ],
    correctIndex: 1,
    explanation:
      "COALESCE関数は引数のリストから最初のNULLでない値を返します。例：SELECT COALESCE(phone, 'なし') FROM users; とすると、phoneがNULLの場合は「なし」と表示されます。COALESCE(a, b, c)のように3つ以上の引数も指定でき、最初にNULLでない値が返されます。",
  },
  {
    id: "de-057",
    category: "データエンジニアリング力",
    question:
      "SQLでNULL値を持つレコードを検索するための正しい条件式はどれか？",
    choices: [
      "WHERE column = NULL",
      "WHERE column IS NULL",
      "WHERE column == NULL",
      "WHERE column EQUALS NULL",
    ],
    correctIndex: 1,
    explanation:
      "NULLは「値が存在しない」ことを意味する特殊な状態であり、= NULLでは正しく検索できません。NULL値の検索にはIS NULLを、NULL以外の値の検索にはIS NOT NULLを使用します。これはSQLの重要なルールで、NULLとの比較は常にIS NULL / IS NOT NULLで行います。",
  },
  {
    id: "de-058",
    category: "データエンジニアリング力",
    question:
      "SQLで「部門ごとの平均給与が50万円以上の部門」を取得する場合、WHERE句の代わりに使用する句はどれか？",
    choices: [
      "FILTER BY",
      "HAVING",
      "WHERE",
      "CONDITION",
    ],
    correctIndex: 1,
    explanation:
      "HAVING句はGROUP BYで集約した結果に対して条件を指定するために使用します。WHERE句は集約前の個々のレコードに対する条件指定に使い、集約関数（COUNT、SUM、AVGなど）の結果で絞り込む場合はHAVING句を使います。例：SELECT dept, AVG(salary) FROM employees GROUP BY dept HAVING AVG(salary) >= 500000;",
  },
  {
    id: "de-059",
    category: "データエンジニアリング力",
    question:
      "SQLのサブクエリ（副問合せ）の説明として最も適切なものはどれか？",
    choices: [
      "複数のテーブルを結合するための構文",
      "SELECT文の中に入れ子にしたSELECT文のこと",
      "テーブルを作成するための構文",
      "データを更新するための構文",
    ],
    correctIndex: 1,
    explanation:
      "サブクエリは、SQL文の中に入れ子にした別のSELECT文のことです。例：SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees); のように、平均給与より高い社員を取得できます。WHERE句、FROM句、SELECT句などで使用でき、複雑な条件指定を可能にします。",
  },
  // ===== Python基礎 =====
  {
    id: "de-060",
    category: "データエンジニアリング力",
    question:
      "Pythonで変数xに整数10を代入した後、type(x)の結果として正しいものはどれか？",
    choices: [
      "<class 'float'>",
      "<class 'int'>",
      "<class 'str'>",
      "<class 'number'>",
    ],
    correctIndex: 1,
    explanation:
      "Pythonでは変数に値を代入すると自動的に型が決まります（動的型付け）。x = 10とすると整数型（int）、x = 10.0とすると浮動小数点型（float）、x = '10'とすると文字列型（str）になります。type()関数で変数の型を確認できます。",
  },
  {
    id: "de-061",
    category: "データエンジニアリング力",
    question:
      "Pythonのリスト（list）に関する説明として正しいものはどれか？",
    choices: [
      "一度作成したら要素を変更できない",
      "異なるデータ型の要素を混在させることができる",
      "要素の順序は保証されない",
      "キーと値のペアでデータを格納する",
    ],
    correctIndex: 1,
    explanation:
      "Pythonのリスト（list）は、角括弧[]で定義し、要素の追加・変更・削除が可能な可変長のデータ構造です。[1, 'hello', 3.14, True]のように異なるデータ型を混在させることもできます。要素はインデックス（0から始まる整数）でアクセスし、順序が保証されます。",
  },
  {
    id: "de-062",
    category: "データエンジニアリング力",
    question:
      "Pythonの辞書（dict）からキー'name'の値を取得する方法として、キーが存在しない場合にエラーにならないのはどれか？",
    choices: [
      "d['name']",
      "d.get('name')",
      "d.find('name')",
      "d.search('name')",
    ],
    correctIndex: 1,
    explanation:
      "辞書のget()メソッドは、キーが存在すればその値を返し、存在しない場合はNone（またはデフォルト値）を返します。d['name']はキーが存在しない場合にKeyErrorが発生します。d.get('name', 'デフォルト値')のように第2引数でデフォルト値を指定することもできます。",
  },
  {
    id: "de-063",
    category: "データエンジニアリング力",
    question:
      "Pythonのfor文で0から4までの数値を順に出力するコードとして正しいものはどれか？",
    choices: [
      "for i in range(1, 5): print(i)",
      "for i in range(5): print(i)",
      "for i in range(0, 4): print(i)",
      "for i in (0, 1, 2, 3, 4): print(i)",
    ],
    correctIndex: 1,
    explanation:
      "range(5)は0から4までの整数を生成します（終了値の5は含まれない）。range(start, stop)はstartからstop-1まで、range(start, stop, step)はstep刻みの整数を生成します。なお選択肢4もfor i in (0,1,2,3,4)で同じ結果になりますが、range()を使うのがPythonの一般的な書き方です。",
  },
  {
    id: "de-064",
    category: "データエンジニアリング力",
    question:
      "Pythonで関数を定義するためのキーワードはどれか？",
    choices: [
      "function",
      "def",
      "func",
      "define",
    ],
    correctIndex: 1,
    explanation:
      "Pythonでは関数の定義にdefキーワードを使用します。例：def greet(name): return f'こんにちは、{name}さん' のように定義し、greet('太郎')のように呼び出します。Pythonではインデント（字下げ）でブロックを表現するため、関数の本体はdefの次の行からインデントして書きます。",
  },
  {
    id: "de-065",
    category: "データエンジニアリング力",
    question:
      "Pythonで文字列'Hello World'を全て小文字に変換するメソッドはどれか？",
    choices: [
      ".small()",
      ".lower()",
      ".downcase()",
      ".toLower()",
    ],
    correctIndex: 1,
    explanation:
      "Pythonの文字列メソッドlower()は全ての文字を小文字に変換します。逆にupper()は全て大文字に変換します。他にもtitle()（各単語の先頭を大文字）、strip()（前後の空白を除去）、replace()（文字列の置換）、split()（文字列の分割）など、便利な文字列メソッドが多数あります。",
  },
  // ===== pandas/NumPy基礎 =====
  {
    id: "de-066",
    category: "データエンジニアリング力",
    question:
      "pandasでCSVファイルを読み込んでDataFrameを作成する関数はどれか？",
    choices: [
      "pd.load_csv()",
      "pd.read_csv()",
      "pd.open_csv()",
      "pd.import_csv()",
    ],
    correctIndex: 1,
    explanation:
      "pandasのread_csv()関数はCSVファイルを読み込んでDataFrameオブジェクトを作成します。df = pd.read_csv('data.csv')のように使用します。encoding引数で文字コードの指定（例：encoding='utf-8'）、header引数でヘッダー行の指定なども可能です。同様にread_excel()やread_json()もあります。",
  },
  {
    id: "de-067",
    category: "データエンジニアリング力",
    question:
      "pandasのDataFrameで欠損値（NaN）を含む行を削除するメソッドはどれか？",
    choices: [
      "df.remove_na()",
      "df.dropna()",
      "df.delete_null()",
      "df.clean()",
    ],
    correctIndex: 1,
    explanation:
      "dropna()メソッドは欠損値（NaN）を含む行を削除します。df.dropna()で全カラムのいずれかにNaNがある行を削除し、df.dropna(subset=['column_name'])で特定カラムにNaNがある行のみ削除できます。欠損値を別の値で埋めたい場合はfillna()メソッドを使います。",
  },
  {
    id: "de-068",
    category: "データエンジニアリング力",
    question:
      "pandasのDataFrameで各カラムの平均値、標準偏差、最小値、最大値などの基本統計量を一括で確認するメソッドはどれか？",
    choices: [
      "df.info()",
      "df.describe()",
      "df.summary()",
      "df.statistics()",
    ],
    correctIndex: 1,
    explanation:
      "describe()メソッドは数値カラムの基本統計量（count、mean、std、min、25%、50%、75%、max）を一括で表示します。df.info()はカラム名、データ型、非null件数などのメタ情報を表示します。df.head()で先頭5行、df.shape で行数・列数を確認するのもよく使うテクニックです。",
  },
  {
    id: "de-069",
    category: "データエンジニアリング力",
    question:
      "pandasのDataFrameで「age列が30以上」の行だけを抽出する正しい書き方はどれか？",
    choices: [
      "df.filter(age >= 30)",
      "df[df['age'] >= 30]",
      "df.select(age >= 30)",
      "df.where('age >= 30')",
    ],
    correctIndex: 1,
    explanation:
      "pandasではブールインデックスを使ってデータをフィルタリングします。df['age'] >= 30はTrue/Falseのシリーズを返し、それをdf[]に渡すことで条件に合致する行のみが抽出されます。複数条件の場合はdf[(df['age'] >= 30) & (df['city'] == '東京')]のように&（AND）や|（OR）で組み合わせます。",
  },
  {
    id: "de-070",
    category: "データエンジニアリング力",
    question:
      "NumPyの主な特徴として最も適切なものはどれか？",
    choices: [
      "Webアプリケーション開発用のフレームワーク",
      "多次元配列（ndarray）を使った高速な数値計算を提供するライブラリ",
      "データベースに接続するためのライブラリ",
      "グラフ描画に特化した可視化ライブラリ",
    ],
    correctIndex: 1,
    explanation:
      "NumPy（Numerical Python）はPythonで数値計算を高速に行うためのライブラリで、多次元配列（ndarray）を中心に設計されています。Pythonの標準リストより高速に演算でき、行列演算、統計計算、線形代数などの機能を提供します。pandasやscikit-learnなど多くのデータサイエンスライブラリの基盤となっています。",
  },
  // ===== データ形式 =====
  {
    id: "de-071",
    category: "データエンジニアリング力",
    question:
      "CSV形式のデータの特徴として最も適切なものはどれか？",
    choices: [
      "データを階層構造で表現できる",
      "カンマなどの区切り文字でデータを区切るテキスト形式で、多くのツールで読み書きできる",
      "セルの書式や色、グラフなどの情報を保持できる",
      "バイナリ形式で保存されるため人間が直接読めない",
    ],
    correctIndex: 1,
    explanation:
      "CSV（Comma-Separated Values）はカンマで値を区切ったテキスト形式のデータフォーマットです。シンプルで汎用性が高く、Excel、データベース、プログラミング言語など多くのツールで読み書きできます。ただし、データ型の情報を持たない、階層構造を表現しにくいなどの制約もあります。",
  },
  {
    id: "de-072",
    category: "データエンジニアリング力",
    question:
      "JSON形式のデータの特徴として最も適切なものはどれか？",
    choices: [
      "表形式のデータしか表現できない",
      "キーと値のペアによる階層的なデータ構造を表現でき、Web APIのデータ交換でよく使用される",
      "Excelでしか開けないファイル形式である",
      "バイナリ形式なのでファイルサイズが小さい",
    ],
    correctIndex: 1,
    explanation:
      "JSON（JavaScript Object Notation）はキーと値のペアで構成されるテキスト形式のデータフォーマットで、オブジェクト（{}）や配列（[]）を使って階層的なデータ構造を表現できます。REST APIのリクエスト・レスポンスや設定ファイルなどで広く利用されており、多くのプログラミング言語でパースが容易です。",
  },
  {
    id: "de-073",
    category: "データエンジニアリング力",
    question:
      "Excel形式のファイルがCSVやJSONと比較して優れている点はどれか？",
    choices: [
      "ファイルサイズが常に最も小さい",
      "複数のシート、セルの書式設定、数式、グラフなどの情報を保持できる",
      "Web APIでのデータ交換に最も適している",
      "プログラムからの読み書きが最も簡単である",
    ],
    correctIndex: 1,
    explanation:
      "Excel形式（.xlsx）は複数のシート、セルの書式設定（色、フォント）、数式、グラフ、フィルターなどの豊富な機能を持ちます。ビジネスでのレポート作成やデータ共有に便利ですが、ファイルサイズが大きくなりやすく、プログラムからの処理にはopenpyxlなどのライブラリが必要になります。",
  },
  {
    id: "de-074",
    category: "データエンジニアリング力",
    question:
      "文字コードUTF-8の説明として最も適切なものはどれか？",
    choices: [
      "日本語専用の文字コードで、英語には対応していない",
      "世界中の文字を扱えるUnicodeの符号化方式で、Webやデータ交換の標準として最も普及している",
      "ASCIIコードの別名で、英数字のみを扱う",
      "Windowsでのみ使用可能な文字コードである",
    ],
    correctIndex: 1,
    explanation:
      "UTF-8はUnicodeの符号化方式の1つで、世界中のほぼすべての文字を扱えます。ASCII文字と互換性があり、英数字は1バイト、日本語は3バイトで表現されます。Webの標準文字コードとして最も広く使われており、CSVやJSONファイルのデータ交換でもUTF-8の使用が推奨されています。",
  },
  {
    id: "de-075",
    category: "データエンジニアリング力",
    question:
      "Pythonで文字列の'123'を整数に変換する正しい方法はどれか？",
    choices: [
      "str(123)",
      "int('123')",
      "number('123')",
      "cast('123', int)",
    ],
    correctIndex: 1,
    explanation:
      "Pythonではint()関数で文字列を整数に、float()関数で浮動小数点数に、str()関数で数値を文字列に変換できます。CSVファイルから読み込んだデータは文字列として扱われることが多いため、数値として計算する際にはint()やfloat()での型変換が必要になります。",
  },
  // ===== ITセキュリティ =====
  {
    id: "de-076",
    category: "データエンジニアリング力",
    question:
      "共通鍵暗号方式と公開鍵暗号方式の違いとして正しいものはどれか？",
    choices: [
      "共通鍵暗号は暗号化のみ、公開鍵暗号は復号のみに使用する",
      "共通鍵暗号は暗号化と復号に同じ鍵を使い、公開鍵暗号は暗号化と復号に異なる鍵（公開鍵と秘密鍵）を使う",
      "公開鍵暗号は共通鍵暗号より常に処理速度が速い",
      "共通鍵暗号はインターネット通信で使えない",
    ],
    correctIndex: 1,
    explanation:
      "共通鍵暗号方式（AESなど）は暗号化と復号に同じ鍵を使い、処理速度が速いのが特徴です。公開鍵暗号方式（RSAなど）は公開鍵で暗号化し秘密鍵で復号する方式で、鍵の配布が安全です。HTTPS通信では、まず公開鍵暗号で共通鍵を安全に交換し、その後は高速な共通鍵暗号でデータを暗号化するハイブリッド方式が使われます。",
  },
  {
    id: "de-077",
    category: "データエンジニアリング力",
    question:
      "ハッシュ関数の特徴として最も適切なものはどれか？",
    choices: [
      "ハッシュ値から元のデータを復元できる",
      "入力データから固定長の値を生成し、元のデータへの逆変換ができない一方向の関数である",
      "暗号化と同じ仕組みで、鍵を使ってデータを変換する",
      "同じ入力に対して毎回異なるハッシュ値を生成する",
    ],
    correctIndex: 1,
    explanation:
      "ハッシュ関数は任意の長さのデータから固定長のハッシュ値（ダイジェスト）を生成する一方向の関数です。同じ入力からは常に同じハッシュ値が得られますが、ハッシュ値から元のデータを復元することはできません。パスワードの保管、データの改ざん検知、デジタル署名などに利用されます。代表的な関数にSHA-256があります。",
  },
  {
    id: "de-078",
    category: "データエンジニアリング力",
    question:
      "HTTPS通信においてTLS/SSLが果たす役割として最も適切なものはどれか？",
    choices: [
      "Webページの表示速度を向上させる",
      "通信の暗号化、サーバーの認証、データの完全性の保証を行う",
      "Webサイトのデザインを統一する",
      "ドメイン名をIPアドレスに変換する",
    ],
    correctIndex: 1,
    explanation:
      "TLS（Transport Layer Security）はHTTPS通信の基盤技術で、3つの機能を提供します。(1)通信の暗号化：第三者による盗聴を防止、(2)サーバーの認証：SSL証明書により接続先が正当なサーバーであることを確認、(3)データの完全性：通信中のデータ改ざんを検知。SSLはTLSの前身で、現在はTLSが主流です。",
  },
  {
    id: "de-079",
    category: "データエンジニアリング力",
    question:
      "パスワード管理のベストプラクティスとして最も適切なものはどれか？",
    choices: [
      "覚えやすいように全てのサービスで同じパスワードを使用する",
      "十分な長さと複雑さを持つ一意のパスワードをサービスごとに設定し、パスワードマネージャーで管理する",
      "短くても英数字のみのパスワードを設定し、頻繁に変更する",
      "パスワードをテキストファイルに記録してデスクトップに保存する",
    ],
    correctIndex: 1,
    explanation:
      "パスワード管理のベストプラクティスは、サービスごとに異なるパスワードを使用し、十分な長さ（12文字以上推奨）と複雑さ（英大小文字・数字・記号の組み合わせ）を確保することです。パスワードマネージャーを使えば多数の複雑なパスワードを安全に管理でき、多要素認証（MFA）の併用も推奨されます。",
  },
  {
    id: "de-080",
    category: "データエンジニアリング力",
    question:
      "SQLインジェクション攻撃を防ぐための最も効果的な対策はどれか？",
    choices: [
      "入力値の長さを制限する",
      "プレースホルダ（パラメータ化クエリ）を使用してSQL文を組み立てる",
      "HTTPS通信を使用する",
      "データベースを暗号化する",
    ],
    correctIndex: 1,
    explanation:
      "SQLインジェクションは、ユーザー入力にSQL文を混入させてデータベースを不正操作する攻撃です。プレースホルダ（パラメータ化クエリ）を使用すると、入力値がSQL文の一部として解釈されず、データとして安全に処理されるため、最も効果的な防御策となります。例：cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))",
  },
  // ===== クラウド基礎 =====
  {
    id: "de-081",
    category: "データエンジニアリング力",
    question:
      "IaaS、PaaS、SaaSの違いとして正しいものはどれか？",
    choices: [
      "IaaSはソフトウェアを提供し、SaaSはインフラを提供する",
      "IaaSは仮想サーバーなどのインフラを提供し、PaaSはアプリ開発基盤を提供し、SaaSは完成したソフトウェアをサービスとして提供する",
      "3つとも同じサービス形態の別名である",
      "PaaSはオンプレミスでのみ利用可能なサービスである",
    ],
    correctIndex: 1,
    explanation:
      "IaaS（Infrastructure as a Service）はサーバー、ネットワーク等のインフラを提供（例：AWS EC2）、PaaS（Platform as a Service）はアプリケーション開発・実行基盤を提供（例：Heroku、Google App Engine）、SaaS（Software as a Service）は完成したアプリケーションをサービスとして提供（例：Gmail、Slack）します。上位サービスほど利用者の管理範囲が狭くなります。",
  },
  {
    id: "de-082",
    category: "データエンジニアリング力",
    question:
      "クラウドの3大プロバイダー（AWS、GCP、Azure）のオブジェクトストレージサービスの組み合わせとして正しいものはどれか？",
    choices: [
      "AWS: EBS、GCP: Persistent Disk、Azure: Managed Disk",
      "AWS: S3、GCP: Cloud Storage、Azure: Blob Storage",
      "AWS: RDS、GCP: Cloud SQL、Azure: SQL Database",
      "AWS: Lambda、GCP: Cloud Functions、Azure: Functions",
    ],
    correctIndex: 1,
    explanation:
      "オブジェクトストレージは、ファイルをオブジェクトとして格納する大容量・低コストのストレージです。AWSではS3（Simple Storage Service）、GCPではCloud Storage、AzureではBlob Storageが該当します。画像、動画、バックアップ、データレイクの基盤などに使われ、高い耐久性と拡張性を持ちます。",
  },
  {
    id: "de-083",
    category: "データエンジニアリング力",
    question:
      "クラウドサービスのスケーラビリティに関する「スケールアウト」の説明として正しいものはどれか？",
    choices: [
      "1台のサーバーのCPUやメモリを増強すること",
      "サーバーの台数を増やすことで処理能力を向上させること",
      "サーバーを停止してコストを削減すること",
      "データを圧縮してストレージ使用量を減らすこと",
    ],
    correctIndex: 1,
    explanation:
      "スケールアウトは、サーバーの台数を増やして全体の処理能力を向上させる水平拡張の方法です。一方、1台のサーバーの性能（CPU、メモリなど）を向上させる方法はスケールアップ（垂直拡張）と呼びます。クラウドではオートスケーリング機能により、負荷に応じて自動的にスケールアウト/インが可能です。",
  },
  // ===== DB基礎 =====
  {
    id: "de-084",
    category: "データエンジニアリング力",
    question:
      "リレーショナルデータベースにおける主キー（PRIMARY KEY）の役割として最も適切なものはどれか？",
    choices: [
      "テーブル内のデータを暗号化する",
      "テーブル内の各レコードを一意に識別するための列（または列の組み合わせ）",
      "テーブル間のデータを結合するための条件",
      "データの並び順を決定するための列",
    ],
    correctIndex: 1,
    explanation:
      "主キー（PRIMARY KEY）はテーブル内の各レコードを一意に識別するための列で、NULL値は許容されず、重複した値を持つことができません。ユーザーID、注文番号など、各レコードを確実に特定できる値を主キーに設定します。1つのテーブルに主キーは1つだけ設定できます。",
  },
  {
    id: "de-085",
    category: "データエンジニアリング力",
    question:
      "リレーショナルデータベースにおける外部キー（FOREIGN KEY）の役割として最も適切なものはどれか？",
    choices: [
      "テーブル内のレコードを一意に識別する",
      "他のテーブルの主キーを参照し、テーブル間の関連を定義する",
      "テーブルのカラムにインデックスを作成する",
      "テーブルのデータをバックアップする",
    ],
    correctIndex: 1,
    explanation:
      "外部キー（FOREIGN KEY）は、あるテーブルのカラムが別のテーブルの主キーを参照することで、テーブル間の関連（リレーションシップ）を定義します。例えば注文テーブルのcustomer_idが顧客テーブルのidを参照する場合、customer_idは外部キーです。参照整合性が保証され、存在しない顧客IDでの注文登録を防げます。",
  },
  {
    id: "de-086",
    category: "データエンジニアリング力",
    question:
      "データベースの正規化の目的として最も適切なものはどれか？",
    choices: [
      "クエリの実行速度を最大化する",
      "データの重複を排除し、更新時の不整合（更新異常・挿入異常・削除異常）を防ぐ",
      "テーブルの数を最小限にする",
      "データを暗号化してセキュリティを向上させる",
    ],
    correctIndex: 1,
    explanation:
      "正規化は、データベースのテーブル設計においてデータの重複を排除し、整合性を保つための手法です。第1正規形（繰り返し項目の排除）、第2正規形（部分関数従属の排除）、第3正規形（推移的関数従属の排除）と段階的に進めます。正規化により更新異常を防げますが、JOINが増えるためパフォーマンスとのバランスも重要です。",
  },
  {
    id: "de-087",
    category: "データエンジニアリング力",
    question:
      "データベースのインデックスの目的として最も適切なものはどれか？",
    choices: [
      "データの暗号化を行う",
      "特定のカラムに対する検索（SELECT）を高速化する",
      "テーブル間のリレーションを定義する",
      "データのバックアップを自動作成する",
    ],
    correctIndex: 1,
    explanation:
      "インデックスは、書籍の索引のように、特定のカラムの値からレコードの位置を素早く見つけるためのデータ構造です。WHERE句やJOIN句で頻繁に検索されるカラムにインデックスを作成すると検索速度が大幅に向上します。ただし、インデックスの作成・維持にはストレージと更新時のコストがかかるため、必要なカラムに絞って作成することが重要です。",
  },
  // ===== Web基礎 =====
  {
    id: "de-088",
    category: "データエンジニアリング力",
    question:
      "HTTPメソッドのGETとPOSTの違いとして最も適切なものはどれか？",
    choices: [
      "GETはデータを暗号化して送り、POSTは平文で送る",
      "GETは主にデータの取得に使い、POSTは主にデータの送信・作成に使う",
      "GETはサーバーからの応答が速く、POSTは遅い",
      "GETはHTTPSでのみ使用でき、POSTはHTTPでのみ使用できる",
    ],
    correctIndex: 1,
    explanation:
      "GETメソッドは主にサーバーからデータを取得するために使用し、パラメータはURLに付加されます。POSTメソッドは主にサーバーにデータを送信・作成するために使用し、データはリクエストボディに含まれます。他にPUT（更新）、DELETE（削除）、PATCH（部分更新）などのメソッドもあります。",
  },
  {
    id: "de-089",
    category: "データエンジニアリング力",
    question:
      "HTTPステータスコード404が示す意味はどれか？",
    choices: [
      "リクエストが成功した",
      "リクエストしたリソースが見つからない",
      "サーバー内部でエラーが発生した",
      "リクエストに認証が必要",
    ],
    correctIndex: 1,
    explanation:
      "HTTPステータスコードはサーバーの応答状態を3桁の数字で示します。200番台は成功（200: OK）、300番台はリダイレクト（301: 恒久的な移転）、400番台はクライアントエラー（400: 不正なリクエスト、401: 認証が必要、403: 禁止、404: 見つからない）、500番台はサーバーエラー（500: 内部エラー、503: サービス利用不可）を示します。",
  },
  {
    id: "de-090",
    category: "データエンジニアリング力",
    question:
      "REST APIの基本原則として最も適切なものはどれか？",
    choices: [
      "必ずXML形式でデータをやり取りする",
      "HTTPメソッド（GET/POST/PUT/DELETE）でリソースに対するCRUD操作を表現し、URLでリソースを識別する",
      "常にWebSocket通信を使用する",
      "サーバー側でクライアントの状態を管理する",
    ],
    correctIndex: 1,
    explanation:
      "REST（Representational State Transfer）APIはHTTPプロトコルを活用したAPI設計スタイルです。URLでリソースを識別し（例：/api/users/123）、HTTPメソッドで操作を表現します（GET: 取得、POST: 作成、PUT: 更新、DELETE: 削除）。ステートレス（サーバーがクライアントの状態を保持しない）であることも重要な特徴です。",
  },
  {
    id: "de-091",
    category: "データエンジニアリング力",
    question:
      "Web APIでJSONを使ってデータをやり取りする利点として最も適切なものはどれか？",
    choices: [
      "バイナリ形式なのでファイルサイズが小さい",
      "人間にも読みやすいテキスト形式で、多くのプログラミング言語で簡単にパースできる",
      "XMLよりもセキュリティが高い",
      "画像や動画のデータ送受信に最も適している",
    ],
    correctIndex: 1,
    explanation:
      "JSONはテキスト形式のため人間が目で見て内容を理解しやすく、JavaScript、Python、Java、Goなど主要なプログラミング言語で標準的にパース（解析）する機能が提供されています。XMLと比較して記述が簡潔で、データ量も少なくなるため、現在のWeb APIでは最も一般的なデータ交換形式として利用されています。",
  },
  // ===== Git基礎 =====
  {
    id: "de-092",
    category: "データエンジニアリング力",
    question:
      "Gitでローカルリポジトリを新規作成するコマンドはどれか？",
    choices: [
      "git create",
      "git init",
      "git new",
      "git start",
    ],
    correctIndex: 1,
    explanation:
      "git initコマンドは、現在のディレクトリにGitリポジトリを新規作成します。実行すると.gitディレクトリが作成され、バージョン管理が開始されます。既存のリモートリポジトリを取得する場合はgit cloneコマンドを使用します。git initは空のリポジトリを作成するため、既存のファイルは自動的にはバージョン管理の対象になりません。",
  },
  {
    id: "de-093",
    category: "データエンジニアリング力",
    question:
      "Gitで変更したファイルをステージングエリアに追加し、コミットする正しい手順はどれか？",
    choices: [
      "git commit → git add",
      "git add → git commit",
      "git push → git add",
      "git commit → git push",
    ],
    correctIndex: 1,
    explanation:
      "Gitのワークフローは、(1) git addでワーキングディレクトリの変更をステージングエリアに追加し、(2) git commitでステージングエリアの内容をリポジトリに記録します。git add .で全変更を追加、git add ファイル名で特定ファイルのみ追加できます。コミット後にgit pushでリモートリポジトリに反映します。",
  },
  {
    id: "de-094",
    category: "データエンジニアリング力",
    question:
      "Gitのブランチの説明として最も適切なものはどれか？",
    choices: [
      "ファイルのバックアップコピーを作成する機能",
      "開発の履歴を分岐させて、独立した作業を並行して行える仕組み",
      "リモートリポジトリとの通信経路のこと",
      "コミットの取り消しを行う機能",
    ],
    correctIndex: 1,
    explanation:
      "ブランチはGitの最も重要な機能の1つで、開発履歴を分岐させて複数の作業を並行して進められます。例えば、mainブランチは本番コードを維持しつつ、feature/loginブランチで新機能を開発し、完成後にmainにマージ（統合）するといった運用ができます。git branchでブランチ作成、git checkoutまたはgit switchで切り替えます。",
  },
  {
    id: "de-095",
    category: "データエンジニアリング力",
    question:
      "Gitでマージ時にコンフリクト（競合）が発生するのはどのような場合か？",
    choices: [
      "異なるファイルを別々のブランチで編集した場合",
      "同じファイルの同じ箇所を異なるブランチで別々に変更した場合",
      "ブランチ名が長すぎる場合",
      "コミットメッセージが空の場合",
    ],
    correctIndex: 1,
    explanation:
      "コンフリクト（競合）は、異なるブランチで同じファイルの同じ箇所を別々に変更した場合にマージしようとすると発生します。Gitが自動的にどちらの変更を採用すべきか判断できないため、開発者が手動で解決する必要があります。コンフリクト箇所には<<<<<<< や >>>>>>> のマーカーが表示され、正しい内容に修正してコミットします。",
  },
  {
    id: "de-096",
    category: "データエンジニアリング力",
    question:
      ".gitignoreファイルの役割として最も適切なものはどれか？",
    choices: [
      "Gitリポジトリのアクセス権限を設定する",
      "Gitのバージョン管理から除外するファイルやディレクトリのパターンを指定する",
      "Gitのコミットメッセージのテンプレートを定義する",
      "Gitのブランチ名の命名規則を定義する",
    ],
    correctIndex: 1,
    explanation:
      ".gitignoreファイルには、Gitのバージョン管理対象から除外したいファイルやディレクトリのパターンを記述します。例えばnode_modules/（依存ライブラリ）、.env（環境変数・機密情報）、__pycache__/（Pythonのキャッシュ）、*.log（ログファイル）などを指定し、不要なファイルがリポジトリに含まれることを防ぎます。",
  },
  // ===== AutoML/MLOps/プロンプト =====
  {
    id: "de-097",
    category: "データエンジニアリング力",
    question:
      "AutoML（Automated Machine Learning）の説明として最も適切なものはどれか？",
    choices: [
      "機械学習モデルを人間が一切介入せずに完全自動で運用するシステム",
      "特徴量選択、モデル選択、ハイパーパラメータ調整などの機械学習パイプラインを自動化する技術",
      "自動的にデータを収集してくるWebスクレイピングツール",
      "機械学習モデルの推論を自動でスケーリングする技術",
    ],
    correctIndex: 1,
    explanation:
      "AutoMLは、機械学習の構築プロセスにおける特徴量エンジニアリング、モデルの選択、ハイパーパラメータの最適化などを自動化する技術です。Google Cloud AutoML、AWS SageMaker Autopilot、AutoSklearnなどのサービス・ツールがあり、機械学習の専門知識が少なくても高品質なモデルを構築できることを目指しています。",
  },
  {
    id: "de-098",
    category: "データエンジニアリング力",
    question:
      "MLOpsにおけるCI/CD（継続的インテグレーション/継続的デリバリー）の目的として最も適切なものはどれか？",
    choices: [
      "機械学習モデルの精度を向上させること",
      "モデルの学習・テスト・デプロイのプロセスを自動化し、迅速かつ安全にモデルを本番環境に届けること",
      "大量のデータを高速に処理すること",
      "データの前処理を手動で行うこと",
    ],
    correctIndex: 1,
    explanation:
      "MLOpsにおけるCI/CDは、モデルのコード変更やデータ更新をトリガーとして、自動的に学習の実行、モデルのテスト・検証、本番環境へのデプロイを行うパイプラインを構築することです。手動作業を減らし、品質を保ちながら迅速にモデルを更新できるようにすることがMLOpsの重要な目的の1つです。",
  },
  {
    id: "de-099",
    category: "データエンジニアリング力",
    question:
      "プロンプトエンジニアリングにおけるFew-shotプロンプティングの説明として最も適切なものはどれか？",
    choices: [
      "プロンプトに具体的な例を一切含めずにタスクの指示のみを与える手法",
      "プロンプトに少数の入出力例を含めることで、AIモデルにタスクのパターンを示す手法",
      "複数のAIモデルを同時に使用する手法",
      "AIモデルのパラメータを少なくする手法",
    ],
    correctIndex: 1,
    explanation:
      "Few-shotプロンプティングは、プロンプトに少数（2〜5個程度）の入力と期待する出力の例を含めることで、AIモデルにタスクのパターンを理解させる手法です。例を一切含めない方法はZero-shotと呼ばれます。例：「ポジティブ→肯定的、ネガティブ→否定的、アグレッシブ→」のように例を示すと、モデルは「攻撃的」と回答できます。",
  },
  {
    id: "de-100",
    category: "データエンジニアリング力",
    question:
      "プロンプトエンジニアリングで効果的なプロンプトを書くための基本的なテクニックとして最も適切なものはどれか？",
    choices: [
      "できるだけ曖昧で短い指示を出す方がAIの創造性を引き出せる",
      "役割・タスク・出力形式を明確に指定し、必要に応じて具体例や制約条件を含める",
      "専門用語を多用して複雑なプロンプトを作成する",
      "常に英語でプロンプトを書く必要がある",
    ],
    correctIndex: 1,
    explanation:
      "効果的なプロンプトには、(1)役割の指定（「あなたはデータアナリストです」）、(2)タスクの明確な説明、(3)出力形式の指定（「箇条書きで」「JSON形式で」）、(4)具体例の提示（Few-shot）、(5)制約条件の記述が重要です。明確で具体的なプロンプトほど、期待通りの結果を得やすくなります。",
  },
];
