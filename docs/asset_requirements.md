# 刹那の見切り（IT防衛戦） - 必要アセット一覧

## ゲーム仕様変更履歴

### v2.0.0の変更点（メジャーアップデート）
- **UI統一化**: 全ボタンでテキストなしボタン（textless_button.svg）を使用
- **StaticAssetGenerator拡張**: テキストなしボタン生成機能を追加
- **ボタンデザイン統一**: メニュー、エンディング、ゲームオーバー画面で一貫したボタンデザイン
- **ES Module対応**: package.jsonで"type": "module"設定、Node.js実行環境を改善
- **アセット生成自動化**: 新しいSVGアセットの自動生成機能を実装

### v1.1.4の変更点
- **エンディング画面改善**: 勝利・ゲームオーバー画面のレイアウト最適化
- **ボタン配置調整**: 重複しないレイアウトとSVGボタンの統一使用
- **DXCブランディング強化**: エンディング画面での企業ブランディング向上

### v1.1.3の変更点
- **勝利ポーズアセット**: ステージクリア時の勝利ポーズ画像を追加
- **ステージクリア演出**: 成功時に勝利ポーズに切り替わる機能を実装
- **視覚的フィードバック**: 勝利時も防御時と同じく大きめ表示（0.35倍スケール）

### v1.1.2の変更点
- **プレイヤーアセット**: 攻撃を受け止めている絵を追加
- **ゲームプレイ**: より視覚的に防御アクションを表現
- **ガードポーズ強化**: 防御時のスケールを大きく（0.4倍）、表示時間も延長してステージクリアまで維持

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
  - デザイン: 狐っぽい生き物、DXC紫色、シールドを持っている
  - 表情: 信頼できる守護者の顔（目と口）

- **player_character_defending.png** (64x64px)
  - 用途: プレイヤーキャラクター - 攻撃を受け止めている状態
  - デザイン: シールドを前面に構えて攻撃を防いでいる、防御ポーズ
  - 表情: 集中して攻撃を受け止めている勇敢な表情

- **player_character_victory.png** (64x64px)
  - 用途: プレイヤーキャラクター - ステージクリア時の勝利ポーズ
  - デザイン: 勝利を喜ぶポーズ、シールドを掲げるなど達成感のある姿勢
  - 表情: 嬉しそうな勝利の表情

- **player_character_damaged.png** (64x64px)
  - 用途: プレイヤーキャラクター - 被ダメージ状態
  - デザイン: 少し困った表情、シールドが少し傷ついている
  
### バージョン履歴

- **v1.1.2**: プレイヤーキャラクター防御アセット追加（player_character_defending.png）
- **v1.1.1**: 防衛対象（IT資産）の表示を削除、プレイヤーキャラクターのサイズ・位置調整、ファイル名をplayer_character_normal.pngに統一
- **v1.1.0**: プレイヤーキャラクターを新しいPNG画像に置き換え、スケール・位置調整イヤーキャラクター - 被ダメージ状態
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
**注意: v1.1.1で防衛対象の表示を削除しました。以下のアセットは現在使用されていません。**

- ~~protected_pc_normal.png~~ (64x64px) - 削除済み
- ~~protected_iot_normal.png~~ (64x64px) - 削除済み  
- ~~protected_laptop_normal.png~~ (64x64px) - 削除済み
- ~~protected_cloud_normal.png~~ (64x64px) - 削除済み
- ~~protected_ai_normal.png~~ (64x64px) - 削除済み

各種状態（damaged、ko、victory）のアセットも同様に削除済み。

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
- **start_button.svg** (200x60px)
  - 用途: メインメニューの「スタート」ボタン
  - 色: DXC紫ベース、テキスト「スタート」埋め込み
  - 特記: メニュー画面でのみ使用

- **textless_button.svg** (200x60px) ★新規追加★
  - 用途: 汎用ボタン（テキストなし）- v2.0.0で追加
  - 色: DXC紫ベース、グラデーション効果
  - 使用場所: エンディング画面、ゲームオーバー選択画面
  - 特記: 上にテキストを重ねて表示する設計

- **retry_button.svg** (200x60px)
  - 用途: ゲーム終了画面の「もういちど」ボタン（レガシー）
  - 色: オレンジ (#F59E0B) ベース
  - 特記: v2.0.0以降はtextless_buttonに置き換え予定

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
1. **player_character_normal.png** - プレイヤーキャラクター通常時（使用中）
2. **player_character_defending.png** - プレイヤーキャラクター防御時（使用中）
3. **threat_malware_normal.svg** - マルウェア脅威（使用中）
4. **threat_system_error_normal.svg** - システム障害脅威（使用中）
5. **start_button.svg** - スタートボタン（使用中）
6. **textless_button.svg** - 汎用テキストなしボタン（v2.0.0で追加・使用中）
7. **background_menu.svg** - メニュー背景（使用中）
8. button_click.mp3

### 中優先度（あると良い）
1. player_character_damaged.png（プレイヤーダメージ状態）
2. player_character_victory.png（プレイヤー勝利状態）
3. threat_malware_damaged.png（マルウェア弱体化）
4. threat_malware_ko.png（マルウェア撃破）
5. threat_system_error_damaged.png（システム障害弱体化）
6. threat_system_error_ko.png（システム障害撃破）
7. background_game.png
8. shield_effect.png
9. star_particle.png
10. menu_bgm.mp3
11. game_bgm.mp3

### 低優先度（最後に追加）
1. player_character_ko.png（プレイヤー完全敗北）
2. player_character_cutin.png（プレイヤーカットイン）
3. threat_malware_cutin.png（マルウェアカットイン）
4. threat_system_error_cutin.png（システム障害カットイン）
5. threat_cyber_attack_normal.png（3番目の脅威）
6. threat_disaster_normal.png（4番目の脅威）
7. threat_ai_poison_normal.png（5番目の脅威、AI特化）
8. 全キャラクターの残りの状態別画像
9. 全脅威のカットイン画像
10. dxc_logo.png

## 4. ファイル命名規則

```
assets/
├── gen/
│   └── images/
│       ├── player_character_normal.png（使用中・主人公通常時）
│       ├── player_character_defending.png（新規追加・主人公防御時）
│       ├── player_character_damaged.png（未使用・主人公被ダメージ）
│       ├── player_character_victory.png（未使用・主人公勝利時）
│       ├── player_character_ko.png（未使用・主人公KO時）
│       └── game_background_cyber.png（使用中・ゲーム背景）
├── images/
│   ├── signals/
│   │   ├── signal_danger.svg（最重要・危険シグナル）
│   │   ├── signal_active.svg（アクティブ状態）
│   │   ├── signal_success.svg（成功表示）
│   │   └── signal_error.svg（失敗・エラー表示）
│   ├── buttons/
│   │   ├── start_button.svg（使用中）
│   │   └── retry_button.svg（使用中）
│   ├── characters/
│   │   └── （SVGキャラクターアセット・未使用）
│   ├── threats/
│   │   ├── threat_malware_normal.svg（使用中）
│   │   ├── threat_system_error_normal.svg（使用中）
│   │   ├── threat_malware_damaged.svg（未使用）
│   │   ├── threat_malware_ko.svg（未使用）
│   │   ├── threat_system_error_damaged.svg（未使用）
│   │   └── threat_system_error_ko.svg（未使用）
│   ├── backgrounds/
│   │   ├── background_menu.svg（使用中）
│   │   └── background_game.svg（未使用）
│   ├── protected_assets/
│   │   └── （削除済み・v1.1.1で防衛対象表示を廃止）
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

**重要な変更点（v1.1.2）:**
- **`assets/gen/images/`**: 最終的なPNG画像アセットの格納場所
- **`player_character_defending.png`**: 新規追加の防御ポーズアセット
- **実装状況**: 使用中/未使用の状態を明記
- **SVGアセット**: `assets/images/`に従来通り配置（ボタン、脅威、背景など）

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

## 10. v2.0.0 現在の技術仕様

### ゲームエンジン
- **Phaser.js 3.70.0** - HTML5ゲームフレームワーク
- **WebGL/Canvas2D** - レンダリングエンジン
- **ES Module対応** - package.json設定による標準化

### UI統一化システム (v2.0.0の主要変更点)
- **テキストなしボタン**: textless_button.svg を全画面で統一使用
- **テキスト重ね表示**: ボタン上にPhaserテキストオブジェクトで文字を表示
- **ホバーエフェクト**: 全ボタンに1.1倍スケール統一
- **実装技術**: `Phaser.Image` + `Phaser.Text` レイヤー構成

### アセット生成自動化 (v2.0.0新機能)
- **StaticAssetGenerator.js**: ES Module対応のSVG生成スクリプト
- **自動ボタン生成**: generateTextlessButtonSVG()メソッド追加
- **実行環境**: Node.js ES Module ("type": "module"設定)
- **出力先**: assets/images/textless_button.svg

### シンボルベースUI (v1.0.9から継続)
- **危険シグナル**: ⚠ マーク（120px、黄色背景円、固定表示）
- **成功表示**: ✓ マーク（120px、緑色背景円）
- **失敗表示**: ✕ マーク（120px、赤色背景円）
- **実装技術**: `Phaser.Text` + `Phaser.Graphics` API
- **位置統一**: 全シグナル (640, 180) 座標固定

### パフォーマンス仕様
- **Frame Rate**: 60fps 固定（reaction time測定用）
- **Frame Counter**: デジタル時計風表示、ステージ間で保持
- **Difficulty Progression**: Normal(1-4), Hard(5-8), Extreme(9+)
- **お手付き判定**: 早期クリック防止システム完備

### バージョン履歴

- **v2.0.0**: UI統一化、テキストなしボタン実装、ES Module対応
- **v1.1.4**: エンディング画面改善、DXCブランディング強化
- **v1.1.3**: 勝利ポーズアセット追加、ステージクリア演出強化
- **v1.1.2**: プレイヤー防御アセット追加、視覚的フィードバック改善
- **v1.1.1**: ファイル名統一、防衛対象表示削除
- **v1.0.11**: フレームカウンター表示問題修正
- **v1.0.10**: シグナル表示クリア問題修正
- **v1.0.9**: シンボルベースUI実装、背景円エフェクト追加

---

**このリストを使って、まずは「最高優先度」の6個のアセットから準備を始めることをお勧めします！**

#2a2e4b, #ad6db0, #f6e4ce, #2a2d4b, #292d4a, #ae6cb0, #f6e5ce

