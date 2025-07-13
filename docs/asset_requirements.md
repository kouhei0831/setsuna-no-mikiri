# 刹那の見切り（IT防衛戦） - 必要アセット一覧

## ゲーム仕様変更履歴

### v1.0.9の変更点（一時的実装）
- **シグナル表示**: ボタン画像からテキストベースのシンボル表示に変更（**暫定措置**）
  - 危険時: 大きな赤い ⚠ マーク（点滅あり）
  - 成功時: 緑の ✓ チェックマーク  
  - 失敗時: 赤い ✕ バツマーク
  - 早期クリック: 赤い ✕ マーク
- **背景円**: 色付きの円でマークを強調
- **視覚効果**: 点滅エフェクトで注意を引く仕様

**重要**: 危険時の表示シンボルは本ゲームの**最重要要素**です。現在のテキストシンボルは開発効率化のための一時的な実装であり、将来的には専用デザインのアセット画像に置き換える予定です。

## 1. 必須画像アセット

### 1.1 ゲームプレイ用画像

#### プレイヤーキャラクター
- **player_character_normal.png** (64x64px)
  - 用途: プレイヤー側のキャラクター（守護者ポジション）- 通常状態
  - デザイン: カービィ風の勇敢な守護者、DXC紫色、シールドを持っている
  - 表情: 信頼できる守護者の顔（目と口）

- **player_character_damaged.png** (64x64px)
  - 用途: プレイヤーキャラクター - 被ダメージ状態
  - デザイン: 少し困った表情、シールドが少し傷ついている
  - 表情: 「やられた！」という感じ

- **player_character_ko.png** (64x64px)
  - 用途: プレイヤーキャラクター - ばたんきゅー状態
  - デザイン: ひっくり返って気絶、星やバツ印が回っている
  - 表情: 完全にノックアウト

- **player_character_victory.png** (64x64px)
  - 用途: プレイヤーキャラクター - 勝利状態
  - デザイン: 喜んでいる、シールドを高く掲げている
  - 表情: 誇らしげで嬉しそう

#### 守るべきIT資産（防御目標）
- **protected_pc_normal.png** (64x64px)
  - 用途: 守るべき対象1 - パソコン - 通常状態
  - デザイン: 可愛いデスクトップPC、安全時は青い光
  - 色: グレー/青ベース、DXCアクセント

- **protected_pc_damaged.png** (64x64px)
  - 用途: パソコン - 被ダメージ状態
  - デザイン: 画面にエラー表示、少し煙が出ている
  - 色: 警告の赤いライト

- **protected_pc_ko.png** (64x64px)
  - 用途: パソコン - ばたんきゅー状態
  - デザイン: ブルースクリーン、完全停止状態
  - 色: 青いエラー画面

- **protected_pc_victory.png** (64x64px)
  - 用途: パソコン - 勝利状態
  - デザイン: 画面に「✓」マーク、安全を示す緑の光
  - 色: 安全な緑色の輝き

- **protected_iot_normal.png** (64x64px)
  - 用途: 守るべき対象2 - IoT - 通常状態
  - デザイン: 複数の小さなスマートデバイスが繋がっている感じ
  - 色: 青/緑ベース、接続を示すライトや波線エフェクト

- **protected_iot_damaged.png** (64x64px)
  - 用途: IoT - 被ダメージ状態
  - デザイン: 一部のデバイスの接続が切れている、点滅する警告
  - 色: 黄色の警告ライト

- **protected_iot_ko.png** (64x64px)
  - 用途: IoT - ばたんきゅー状態
  - デザイン: 全デバイスが接続切れ、バラバラになっている
  - 色: 赤い切断状態

- **protected_iot_victory.png** (64x64px)
  - 用途: IoT - 勝利状態
  - デザイン: すべてのデバイスが完璧に接続、安全な通信
  - 色: 安定した青/緑の接続線

- **protected_laptop_normal.png** (64x64px)
  - 用途: 守るべき対象3 - ノートPC - 通常状態
  - デザイン: 開いたノートPC、画面に正常動作表示
  - 色: シルバー/グレー、DXCロゴ風装飾

- **protected_laptop_damaged.png** (64x64px)
  - 用途: ノートPC - 被ダメージ状態
  - デザイン: 画面が一部乱れている、バッテリー警告
  - 色: 黄色の警告表示

- **protected_laptop_ko.png** (64x64px)
  - 用途: ノートPC - ばたんきゅー状態
  - デザイン: 画面真っ黒、蓋が半分閉じている
  - 色: 完全に暗い状態

- **protected_laptop_victory.png** (64x64px)
  - 用途: ノートPC - 勝利状態
  - デザイン: 明るい画面、完璧な動作状態
  - 色: 清潔な白/青の画面

- **protected_cloud_normal.png** (64x64px)
  - 用途: 守るべき対象4 - クラウド - 通常状態
  - デザイン: 雲の形、データが安全に浮遊している感じ
  - 色: 白/青グラデーション、安全なキラキラエフェクト

- **protected_cloud_damaged.png** (64x64px)
  - 用途: クラウド - 被ダメージ状態
  - デザイン: 雲が少し暗くなり、データが不安定
  - 色: グレー/黄色、不安定な状態

- **protected_cloud_ko.png** (64x64px)
  - 用途: クラウド - ばたんきゅー状態
  - デザイン: 黒い雲、雷が落ちている状態
  - 色: 黒/赤、危険な嵐状態

- **protected_cloud_victory.png** (64x64px)
  - 用途: クラウド - 勝利状態
  - デザイン: 輝く白い雲、完璧なデータ同期
  - 色: 純白/金色、神々しい輝き

- **protected_ai_normal.png** (64x64px)
  - 用途: 守るべき対象5 - AI - 通常状態
  - デザイン: 脳のような形またはロボットの頭、ニューラルネットワーク模様
  - 色: 青/紫グラデーション、知的な光を放つエフェクト

- **protected_ai_damaged.png** (64x64px)
  - 用途: AI - 被ダメージ状態
  - デザイン: ニューラルネットワークの一部が切断、処理速度低下
  - 色: 黄/赤、警告状態

- **protected_ai_ko.png** (64x64px)
  - 用途: AI - ばたんきゅー状態
  - デザイン: 完全に思考停止、回路がショート
  - 色: 黒/赤、完全停止

- **protected_ai_victory.png** (64x64px)
  - 用途: AI - 勝利状態
  - デザイン: 完璧なニューラルネットワーク、最適化された思考
  - 色: 明るい青/白、最高の知能状態

#### 脅威・敵キャラクター
- **threat_malware_normal.png** (48x48px)
  - 用途: 基本的な脅威 - マルウェア - 通常状態
  - デザイン: 赤い虫のような形、不気味だが子供向けに抑制
  - 色: 赤/黒ベース、危険感のある動き

- **threat_malware_damaged.png** (48x48px)
  - 用途: マルウェア - 被ダメージ状態
  - デザイン: 一部が欠けている、弱っている感じ
  - 色: 薄い赤、力が弱まった状態

- **threat_malware_ko.png** (48x48px)
  - 用途: マルウェア - ばたんきゅー状態
  - デザイン: バラバラになって消滅中
  - 色: 灰色、消去される状態

- **threat_malware_victory.png** (48x48px)
  - 用途: マルウェア - 勝利状態（IT資産を攻撃成功時）
  - デザイン: 大きくなって凶悪な感じ
  - 色: 濃い赤/黒、危険度最大

- **threat_malware_cutin.png** (96x96px)
  - 用途: マルウェア - カットイン演出
  - デザイン: 大きく迫力のある脅威ポーズ、攻撃の瞬間
  - サイズ: 通常の2倍サイズで迫力を演出

- **threat_system_error_normal.png** (48x48px)
  - 用途: システム障害 - 通常状態
  - デザイン: 稲妻や雷のような形、システムクラッシュを表現
  - 色: 黄/赤ベース、電気的なエフェクト

- **threat_system_error_damaged.png** (48x48px)
  - 用途: システム障害 - 被ダメージ状態
  - デザイン: 電気が弱くなり、火花が小さい
  - 色: 薄い黄色、弱い電気

- **threat_system_error_ko.png** (48x48px)
  - 用途: システム障害 - ばたんきゅー状態
  - デザイン: 電気が完全に消失
  - 色: 灰色、電力切れ

- **threat_system_error_victory.png** (48x48px)
  - 用途: システム障害 - 勝利状態
  - デザイン: 巨大な雷、システム全体をクラッシュ
  - 色: 強烈な黄/白の電撃

- **threat_system_error_cutin.png** (96x96px)
  - 用途: システム障害 - カットイン演出
  - デザイン: 巨大な稲妻が画面を貫く迫力
  - サイズ: 通常の2倍サイズ

- **threat_cyber_attack_normal.png** (48x48px)
  - 用途: サイバー攻撃 - 通常状態
  - デザイン: 暗い影や手の形、ハッキングを表現
  - 色: 黒/紫ベース、不審な感じ

- **threat_cyber_attack_damaged.png** (48x48px)
  - 用途: サイバー攻撃 - 被ダメージ状態
  - デザイン: 影が薄くなり、攻撃力が低下
  - 色: 薄い紫、弱体化

- **threat_cyber_attack_ko.png** (48x48px)
  - 用途: サイバー攻撃 - ばたんきゅー状態
  - デザイン: 影が完全に消散
  - 色: 透明/灰色、存在感消失

- **threat_cyber_attack_victory.png** (48x48px)
  - 用途: サイバー攻撃 - 勝利状態
  - デザイン: 巨大な影、完全にハッキング成功
  - 色: 深い黒/紫、支配完了

- **threat_cyber_attack_cutin.png** (96x96px)
  - 用途: サイバー攻撃 - カットイン演出
  - デザイン: 不気味な手がIT資産に迫る瞬間
  - サイズ: 通常の2倍サイズ

- **threat_disaster_normal.png** (48x48px)
  - 用途: 自然災害・物理的脅威 - 通常状態
  - デザイン: 雲と雷、火災のような自然災害
  - 色: 灰色/赤ベース、災害の危険感

- **threat_disaster_damaged.png** (48x48px)
  - 用途: 自然災害 - 被ダメージ状態
  - デザイン: 雲が小さくなり、雷が弱い
  - 色: 薄い灰色、勢力低下

- **threat_disaster_ko.png** (48x48px)
  - 用途: 自然災害 - ばたんきゅー状態
  - デザイン: 雲が晴れて平穏な状態
  - 色: 白/青、平和な空

- **threat_disaster_victory.png** (48x48px)
  - 用途: 自然災害 - 勝利状態
  - デザイン: 巨大な嵐、全てを破壊
  - 色: 黒/赤の嵐雲

- **threat_disaster_cutin.png** (96x96px)
  - 用途: 自然災害 - カットイン演出
  - デザイン: 巨大な竜巻や雷が迫る迫力
  - サイズ: 通常の2倍サイズ

- **threat_ai_poison_normal.png** (48x48px)
  - 用途: AI特有の脅威 - データ汚染 - 通常状態
  - デザイン: 毒々しい色のデータや歪んだ回路、バグのような形
  - 色: 紫/緑ベース、不正なデータの危険感

- **threat_ai_poison_damaged.png** (48x48px)
  - 用途: AI汚染 - 被ダメージ状態
  - デザイン: 毒が薄くなり、データが正常化し始める
  - 色: 薄い紫、浄化途中

- **threat_ai_poison_ko.png** (48x48px)
  - 用途: AI汚染 - ばたんきゅー状態
  - デザイン: 完全にクリーンなデータに戻る
  - 色: 透明/白、純粋なデータ

- **threat_ai_poison_victory.png** (48x48px)
  - 用途: AI汚染 - 勝利状態
  - デザイン: AIを完全に汚染、バイアスまみれ
  - 色: 濃い毒の紫/緑

- **threat_ai_poison_cutin.png** (96x96px)
  - 用途: AI汚染 - カットイン演出
  - デザイン: 毒々しいデータがAIに侵入する瞬間
  - サイズ: 通常の2倍サイズ

#### エフェクト
- **shield_effect.png** (64x64px)
  - 用途: 防御成功時のシールドエフェクト
  - 色: 青色/白色、透明感のあるシールド
  - 形状: 円形または六角形のシールド

- **star_particle.png** (24x24px)
  - 用途: 防御成功時のキラキラエフェクト
  - 色: 黄色/白色
  - 形状: 5角星

### 1.2 UI（ユーザーインターフェース）用画像

#### シグナル表示（最重要要素）
- **signal_danger.png** (120x120px)
  - 用途: 危険シグナル表示 - **ゲーム最重要アセット**
  - デザイン: 警告を表す強いビジュアル、瞬時に認識可能
  - 色: 警告の赤/黄色系、DXCアクセントと調和
  - エフェクト: 点滅に適した高コントラスト設計
  - 特記: プレイヤーの反射的反応を誘発する最適化されたデザイン

- **signal_success.png** (120x120px)
  - 用途: 成功時シグナル表示
  - デザイン: 成功・安全を表すポジティブなビジュアル
  - 色: 成功の緑色系、安心感を与える配色
  - 特記: 危険シグナルと明確に区別できるデザイン

- **signal_failure.png** (120x120px)
  - 用途: 失敗時・早期クリック時シグナル表示
  - デザイン: 失敗・エラーを表すネガティブなビジュアル
  - 色: エラーの赤色系、反省を促す配色
  - 特記: 失敗の種類（遅延/早期）を直感的に理解できるデザイン

#### ボタン類
- **start_button.png** (200x60px)
  - 用途: メインメニューの「スタート」ボタン
  - 色: DXC紫ベース
  - テキスト: 「スタート」（日本語）

- **retry_button.png** (200x60px)
  - 用途: ゲーム終了画面の「もういちど」ボタン
  - 色: オレンジ (#F59E0B) ベース
  - テキスト: 「もういちど」（日本語）

#### 背景
- **background_menu.png** (800x600px)
  - 用途: メインメニューの背景
  - デザイン: DXC紫のグラデーション、装飾的なパターン

- **background_game.png** (800x600px)
  - 用途: ゲーム画面の背景
  - デザイン: メニューより薄い色、ゲームプレイの邪魔にならない

#### ロゴ・ブランディング
- **dxc_logo.png** (適当なサイズ)
  - 用途: 結果画面でのブランディング
  - 内容: DXC Technologyのロゴ

## 2. 必須音声アセット

### 2.1 効果音
- **success_sound.mp3** (1-2秒)
  - 用途: シグナル成功時の「キュイン！」音
  - 種類: 高音、明るい、達成感のある音

- **fail_sound.mp3** (1-2秒)
  - 用途: シグナル失敗時の「ブー」音
  - 種類: 低音、残念感のある音

- **button_click.mp3** (0.5秒)
  - 用途: ボタンを押した時の音
  - 種類: 軽やかなクリック音

### 2.2 BGM（バックグラウンドミュージック）
- **menu_bgm.mp3** (ループ対応)
  - 用途: メインメニュー画面
  - 特徴: 軽快、親しみやすい、短めのループ

- **game_bgm.mp3** (ループ対応)
  - 用途: ゲームプレイ中
  - 特徴: リズム感があり、集中しやすい、120-140 BPM

## 3. 優先度別整理

### 最高優先度（ゲームが動くのに必須）
1. **signal_danger.svg** - 危険シグナル表示（**最重要アセット**）
2. **signal_active.svg** - アクティブ状態シグナル
3. **signal_success.svg** - 成功表示シグナル
4. **signal_error.svg** - 失敗・エラー表示シグナル
5. 音声ファイル（現在未実装）

**注意**: v1.0.9では一時的にテキストシンボル（⚠、✓、✕）を使用していますが、コードでは上記のSVGファイルを参照しています。シグナル表示は本ゲームの**コア機能**です。

### 高優先度（見栄えに重要）
1. player_character_normal.png
2. protected_pc_normal.png（最も基本的な守るべき対象）
3. threat_malware_normal.png（最も基本的な脅威）
4. start_button.png
5. retry_button.png
6. background_menu.png
7. button_click.mp3

### 中優先度（あると良い）
1. player_character_damaged.png（プレイヤーダメージ状態）
2. player_character_victory.png（プレイヤー勝利状態）
3. protected_pc_damaged.png（PC被ダメージ）
4. protected_pc_victory.png（PC防御成功）
5. threat_malware_damaged.png（マルウェア弱体化）
6. threat_malware_ko.png（マルウェア撃破）
7. protected_iot_normal.png（2番目のIT資産）
8. threat_system_error_normal.png（2番目の脅威）
9. background_game.png
10. shield_effect.png
11. star_particle.png
12. menu_bgm.mp3
13. game_bgm.mp3

### 低優先度（最後に追加）
1. player_character_ko.png（プレイヤー完全敗北）
2. player_character_cutin.png（プレイヤーカットイン）
3. threat_malware_cutin.png（マルウェアカットイン）
4. protected_iot_damaged.png, protected_iot_victory.png（IoT状態別）
5. protected_cloud_normal.png（4番目のIT資産）
6. protected_ai_normal.png（5番目のIT資産、最新技術として）
7. threat_disaster_normal.png（4番目の脅威）
8. threat_ai_poison_normal.png（5番目の脅威、AI特化）
9. 全キャラクターの残りの状態別画像
10. 全脅威のカットイン画像
11. dxc_logo.png

## 4. ファイル命名規則

```
assets/
├── images/
│   ├── signals/
│   │   ├── signal_danger.svg（最重要・危険シグナル）
│   │   ├── signal_active.svg（アクティブ状態）
│   │   ├── signal_success.svg（成功表示）
│   │   └── signal_error.svg（失敗・エラー表示）
│   ├── buttons/
│   │   ├── start_button.svg
│   │   └── retry_button.svg
│   ├── characters/
│   │   ├── player_character.svg
│   │   ├── player_character_damaged.svg
│   │   ├── player_character_victory.svg
│   │   └── player_character_ko.svg
│   ├── protected_assets/
│   │   ├── protected_pc_normal.svg
│   │   ├── protected_cloud_normal.svg
│   │   └── protected_ai_normal.svg
│   ├── threats/
│   │   ├── threat_malware_normal.svg
│   │   └── threat_system_error_normal.svg
│   ├── backgrounds/
│   │   └── background_menu.svg
│   └── unused_assets/
│       ├── character_large.svg
│       ├── character_medium.svg
│       ├── character_small.svg
│       ├── enemy_cloud.svg
│       ├── enemy_laptop.svg
│       ├── enemy_pc.svg
│       ├── enemy_server.svg
│       ├── star_particle_large.svg
│       ├── star_particle_medium.svg
│       └── star_particle_small.svg
└── sounds/
    └── (現在は空フォルダ)
```

**注意**: 現在の実装は**SVG形式**を使用しており、v1.0.9では`signal_*.svg`ファイルがコードで参照されていますが、実際にはテキストシンボル（⚠、✓、✕）でレンダリングされています。

## 5. 画像仕様

### ファイル形式
- **SVG**: 現在使用中（スケーラブル、ベクター形式）
- **PNG**: 将来的な代替案（透明背景が必要なもの）
- **JPG**: 背景画像（ファイルサイズ削減）

### 解像度
- **SVG**: スケーラブルなので解像度の概念なし
- **PNG変換時**: 基本サイズで作成
- **最小サイズ**: 仕様書記載のサイズ

### カラーパレット
- **DXC紫**: #6B46C1 (メイン)
- **DXC薄紫**: #8B5CF6 (サブ)
- **白**: #FFFFFF (アクセント)
- **成功緑**: #10B981
- **エラー赤**: #EF4444
- **警告黄**: #F59E0B

## 6. 音声仕様

### ファイル形式
- **MP3**: 汎用性重視
- **OGG**: 高品質（代替）

### 音質
- **効果音**: 22kHz, 16bit, モノラル
- **BGM**: 44kHz, 16bit, ステレオ

## 7. 調達方法案

### 自作（推奨）
1. **画像**: Canva、GIMP、Aseprite
2. **音声**: Audacity、FL Studio、GarageBand

### フリー素材
1. **画像**: Pixabay、Unsplash、OpenGameArt
2. **音声**: Freesound、OpenGameArt、YouTube Audio Library

### 外注
1. **ココナラ**: 低予算で依頼可能
2. **Fiverr**: 海外の安価なデザイナー

## 8. 制作スケジュール（参考）

### Week 1
- **最高優先度アセット**: シグナル表示4種（danger/active/success/error）※現在のコードで参照
- **重要**: `signal_danger.svg`はゲーム最重要アセットとして最優先で制作
- **注意**: v1.0.9では実際にはテキストシンボル（⚠、✓、✕）で表示

### Week 2  
- 高優先度アセット（プレイヤーキャラ + 最初の守るべきIT資産 + 最初の脅威 + UIボタン + 背景）

### Week 3
- 中優先度アセット（追加のIT資産：IoT・ノートPC + 追加の脅威2つ + 防御エフェクト + BGM）

### Week 4
- 低優先度アセット（クラウド + AI資産 + 災害とAI汚染の脅威 + ロゴ等）+ 最終調整

## 9. ピクセルアート生成用プロンプト（共通条件）

以下の条件で各アセット画像を生成してください。

### 共通技術仕様
- **キャンバスサイズ**: 32×32 px
- **カラーパレット**: DawnBringer-16（16色制限）
- **画像スタイル**: 8bitファミコン風、アイソメトリック、黒アウトライン、フラットシェーディング
- **構図**: シンメトリー構図
- **演出**: CRTスキャンライン
- **その他**: 背景透過PNG、中央寄せ、余白4 px

### キャラクター向き指定
- **主人公・味方**: 左向き（→方向を見る）
- **敵キャラクター**: 右向き（←方向を見る）

### 参考デザイン
参考画像として提供されたキャラクターデザイン（丸く可愛いフォルム、シンプルな表情、カービィ風の親しみやすさ）を基に、各アセットのテーマに応じてアレンジしてください。

### 各アセット別プロンプト詳細

#### プレイヤーキャラクター（左向き）
```
Create a pixel art character based on Kirby-style design:
- 32x32px canvas with 4px margin
- DawnBringer-16 color palette
- 8-bit Famicom style, isometric view
- Round, cute guardian character facing left
- DXC purple (#6B46C1) coloring
- Black outline, flat shading
- Shield accessory, brave expression
- CRT scanline effect
- Transparent PNG background
```

#### 敵キャラクター（右向き）
```
Create a pixel art enemy character:
- 32x32px canvas with 4px margin  
- DawnBringer-16 color palette
- 8-bit Famicom style, isometric view
- Small, mischievous character facing right
- Red/dark colors, not scary but troublesome
- Black outline, flat shading
- Simple virus/bug-like design
- CRT scanline effect
- Transparent PNG background
```

#### IT資産（中央寄せ）
```
Create a pixel art IT device:
- 32x32px canvas with 4px margin
- DawnBringer-16 color palette  
- 8-bit Famicom style, isometric view
- Cute computer/device with simple face
- DXC purple accents, friendly design
- Black outline, flat shading
- Technology theme, family-friendly
- CRT scanline effect
- Transparent PNG background
```

#### UIボタン（中央寄せ）
```
Create a pixel art UI button:
- 32x32px canvas with 4px margin
- DawnBringer-16 color palette
- 8-bit Famicom style
- Clean, simple button design
- DXC purple gradient (#6B46C1)
- Black outline, flat shading
- Corporate but friendly appearance
- CRT scanline effect
- Transparent PNG background
```

---

## 10. v1.0.9 現在の技術仕様

### ゲームエンジン
- **Phaser.js 3.70.0** - HTML5ゲームフレームワーク
- **WebGL/Canvas2D** - レンダリングエンジン
- **Node.js サーバー** - 外部デバイスアクセス対応

### シンボルベースUI (v1.0.9の主要変更点)
- **危険シグナル**: ⚠ マーク（120px、黄色背景円、点滅効果）
- **成功表示**: ✓ マーク（120px、緑色背景円）
- **失敗表示**: ✕ マーク（120px、赤色背景円）
- **実装技術**: `Phaser.Text` + `Phaser.Graphics` API
- **メリット**: シグナルボタン画像ファイル不要、軽量化、レスポンシブ対応

### パフォーマンス仕様
- **Frame Rate**: 60fps 固定（reaction time測定用）
- **Frame Counter**: デジタル時計風表示、ステージ間で保持
- **Early Click Penalty**: "まだだよ！おちついて！" メッセージ
- **対応解像度**: 800x600 基準（スケーラブル対応）

### ネットワーク仕様
- **外部アクセス**: 同一Wi-Fi内デバイス対応
- **サーバーポート**: 8001 (Node.js HTTP server)
- **CORS対応**: クロスオリジンアクセス許可

### バージョン履歴

- **v1.0.11**: 時間切れ時・早期クリック時のフレームカウンター表示問題修正
- **v1.0.10**: シグナル表示クリア問題修正、ファイル名変更（signal_button_\* → signal_\*）
- **v1.0.9**: シンボルベースUI実装、背景円エフェクト追加

- **v1.0.8**: お手付きメッセージ改善
- **v1.0.7**: 早クリック禁止システム実装
- **v1.0.6**: フレームカウンター表示継続改善
- **v1.0.5**: フレームカウンター実装

---

**このリストを使って、まずは「最高優先度」の6個のアセットから準備を始めることをお勧めします！**
