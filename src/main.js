/**
 * 刹那の見切り - DXCのITをまもろう
 * ファミリーデイ2025向けミニゲーム
 */

// プリロードシーン
class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // 読み込み画面
        this.add.text(960, 420, 'ロード中...', {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // 進行バー
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222);
        progressBox.fillRect(860, 480, 200, 20);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x6B46C1);
            progressBar.fillRect(860, 480, 200 * value, 20);
        });

        // SVGアセットをロード
        this.load.svg('signalNormal', 'assets/images/signal_danger.svg', { width: 120, height: 120 });
        this.load.svg('signalActive', 'assets/images/signal_active.svg', { width: 120, height: 120 });
        this.load.svg('signalSuccess', 'assets/images/signal_success.svg', { width: 120, height: 120 });
        this.load.svg('signalError', 'assets/images/signal_error.svg', { width: 120, height: 120 });
        
        // プレイヤーキャラクター
        this.load.image('heroNormal', 'assets/gen/images/player_character_normal.png');
        this.load.image('heroDefending', 'assets/gen/images/player_character_defending.png');
        this.load.image('heroDamaged', 'assets/gen/images/player_character_normal.png');
        this.load.image('heroVictory', 'assets/gen/images/player_character_victory.png');
        this.load.image('heroKo', 'assets/gen/images/player_character_normal.png');
        
        this.load.svg('malwareNormal', 'assets/images/threat_malware_normal.svg', { width: 48, height: 48 });
        this.load.svg('systemErrorNormal', 'assets/images/threat_system_error_normal.svg', { width: 48, height: 48 });
        
        this.load.svg('startButton', 'assets/images/start_button.svg', { width: 200, height: 60 });
        this.load.svg('textlessButton', 'assets/images/textless_button.svg', { width: 200, height: 60 });
        this.load.svg('retryButton', 'assets/images/retry_button.svg', { width: 200, height: 60 });
        this.load.svg('menuBackground', 'assets/images/background_menu.svg', { width: 1024, height: 600 });
        
        // ゲーム背景画像
        this.load.image('gameBackground', 'assets/gen/images/game_background_cyber.png');
    }

    create() {
        // ローディング完了後、メニューシーンに移行
        this.scene.start('MenuScene');
    }
}

// メニューシーン
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // 背景
        this.add.image(960, 540, 'menuBackground').setScale(2.4);

        // バージョン表示（背景の後に配置して最前面に）
        this.add.text(20, 20, 'v2.0.0', {
            fontSize: '18px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: { x: 8, y: 4 },
            stroke: '#6B46C1',
            strokeThickness: 2
        }).setOrigin(0, 0).setDepth(1000);

        // タイトル
        this.add.text(960, 300, '刹那の見切り【テスト版】', {
            fontSize: '56px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#6B46C1',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(960, 405, 'DXCのIT(アイティー)をまもろう！', {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            stroke: '#1a1a2e',
            strokeThickness: 4
        }).setOrigin(0.5);

        // スタートボタン
        const startButton = this.add.image(960, 630, 'startButton')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            })
            .on('pointerover', () => {
                startButton.setScale(1.1);
            })
            .on('pointerout', () => {
                startButton.setScale(1.0);
            });

        // DXCブランディング
        this.add.text(960, 900, 'DXC Technology Family Day 2025', {
            fontSize: '16px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            backgroundColor: '#2d1b69',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // 操作説明
        this.add.text(960, 780, 'タップして IT をまもろう！', {
            fontSize: '18px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: { x: 12, y: 6 }
        }).setOrigin(0.5);

    }
}

// ゲームシーン
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        
        this.gameState = {
            stage: 1, // 常にステージ1から開始
            score: 0, // デフォルト値
            playerState: 'normal',
            enemyState: 'normal',
            isGameActive: false,
            isWaiting: false, // シグナル待機中フラグ
            maxStages: 4
        };
    }

    init(data) {
        // リトライ時のスコア復元（コンストラクタの後に実行される）
        if (data && data.preserveScore !== undefined) {
            this.gameState.score = data.preserveScore;
            console.log('Score restored:', this.gameState.score); // デバッグ用
        } else {
            // 新規ゲーム開始時はスコアを0にリセット
            this.gameState.score = 0;
        }
        
        // リトライ時はプレイヤー状態をnormalに戻す
        this.gameState.playerState = 'normal';
    }

    create() {
        // ゲーム背景画像（生成されたサイバー背景を適切なサイズで表示）
        this.add.image(960, 540, 'gameBackground').setScale(1.5).setDepth(-100); // 最背面に配置

        this.setupUI();
        this.setupCharacters();
        this.setupInput();
        this.startStage();
    }

    update() {
        // フレームカウンター更新
        if (this.gameState.isGameActive && this.frameCounterText && this.frameCounterText.visible) {
            this.frameCounter++;
            const displayFrame = this.frameCounter.toString().padStart(4, '0');
            this.frameCounterText.setText(`${displayFrame}`);
        }
    }

    setupUI() {
        // ステージ表示
        this.stageText = this.add.text(960, 75, '', {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            backgroundColor: '#000000',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setVisible(false).setDepth(1000);

        // スコア表示
        this.scoreText = this.add.text(225, 75, `まもった: ${this.gameState.score}`, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            backgroundColor: '#2d1b69',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5).setDepth(1000);

        // 難易度表示（画面左下）
        this.difficultyText = this.add.text(30, 1050, '', {
            fontSize: '18px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            backgroundColor: '#000000',
            padding: { x: 8, y: 4 }
        }).setOrigin(0, 1).setVisible(false).setDepth(1000);

        // メッセージ表示エリア
        this.messageText = this.add.text(960, 900, '', {
            fontSize: '24px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            backgroundColor: '#000000',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setVisible(false).setDepth(1000);

        // シグナル表示（画面上部）
        this.signalGraphics = this.add.graphics().setVisible(false).setDepth(999);
        
        // 危険マーク用のテキスト（シンプルな警告マーク）
        this.signalText = this.add.text(960, 270, '⚠', {
            fontSize: '120px',
            fill: '#FF0000',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#FFFFFF',
            strokeThickness: 6
        }).setOrigin(0.5).setVisible(false).setDepth(1000);

        // フレーム数表示（デジタル時計風）
        this.frameCounter = 0;
        this.frameCounterText = this.add.text(1845, 990, '', {
            fontSize: '20px',
            fill: '#00FF00',
            fontFamily: 'Courier',
            backgroundColor: '#000000',
            padding: { x: 8, y: 4 },
            stroke: '#008800',
            strokeThickness: 1
        }).setOrigin(1, 1).setVisible(false).setDepth(1000);
    }

    setupCharacters() {
        // プレイヤーキャラクター
        this.player = this.add.image(450, 750, 'heroNormal').setOrigin(0.5).setScale(0.45).setDepth(100);

        // 敵をステージに応じて設定
        this.updateStageAssets();
    }

    updateStageAssets() {
        // 敵の種類をステージに応じて変更（1-2のサイクルで統一）
        const threats = ['malwareNormal', 'systemErrorNormal'];
        
        // 全ステージで1-2のサイクルを使用
        const cycleIndex = (this.gameState.stage - 1) % 2;
        const currentThreat = threats[cycleIndex] || 'malwareNormal';

        // 既存のスプライトを削除して新しいものを作成
        if (this.enemy) this.enemy.destroy();

        // 敵キャラクター
        this.enemy = this.add.image(1545, 540, currentThreat).setOrigin(0.5).setDepth(100);
    }

    updateEnemyState() {
        // 敵の状態のみ更新（プレイヤーキャラクターは変更しない）
        if (this.gameState.enemyState === 'ko') {
            // 敵を非表示にするか、KO状態のテクスチャに変更
            if (this.enemy) {
                this.enemy.setVisible(false);
            }
        }
    }

    setupInput() {
        // 全画面タップエリア
        this.input.on('pointerdown', () => {
            this.onDefenseInput();
        });

        // キーボード入力
        this.input.keyboard.on('keydown-SPACE', () => {
            this.onDefenseInput();
        });
    }

    startStage() {
        if (this.gameState.stage === 1) {
            this.showMessage('DXCのIT(アイティー)をまもろう！\nタップでぼうぎょ！', 2000, () => {
                this.showStageInfo();
            });
        } else {
            this.showStageInfo();
        }
    }

    showStageInfo() {
        const baseStageNames = ['PC(ピーシー)', 'サーバー', 'ネットワーク', 'クラウド'];
        
        // ステージ名は1-4のサイクルで統一
        const cycleStage = ((this.gameState.stage - 1) % 4) + 1; // 1-4のサイクル
        const stageName = baseStageNames[cycleStage - 1] || 'IT';
        
        // 難易度表示（ステージベース - 元の細かい調整を維持）
        let difficultyLabel = '';
        let difficultyColor = '#F59E0B'; // デフォルト色
        
        if (this.gameState.stage <= 4) {
            // ステージ1-4: 通常（表示なし）
            difficultyLabel = '';
        } else if (this.gameState.stage <= 8) {
            // ステージ5-8: ハード
            difficultyLabel = 'ハードモード';
            difficultyColor = '#FF6B35';
        } else {
            // ステージ9以降: エクストリーム
            difficultyLabel = 'エクストリームモード';
            difficultyColor = '#FF0000';
        }
        
        // ステージ名表示（難易度なし）
        this.stageText.setText(`レベル ${this.gameState.stage}: ${stageName}をまもろう`);
        this.stageText.setVisible(true);
        
        // 難易度表示更新
        this.difficultyText.setText(difficultyLabel);
        this.difficultyText.setFill(difficultyColor);
        
        // 難易度がある場合のみ表示
        if (difficultyLabel !== '') {
            this.difficultyText.setVisible(true);
        } else {
            this.difficultyText.setVisible(false);
        }
        
        this.showMessage(`レベル ${this.gameState.stage}: ${stageName}をまもろう`, 2000, () => {
            // 暗転エフェクトを削除し、直接次の処理に進む
            this.resetCharacterStates();
            this.startDefenseRound();
        });
    }

    resetCharacterStates() {
        // プレイヤーの状態は保持（damagedの場合はそのまま維持）
        this.gameState.enemyState = 'normal';
        this.gameState.isWaiting = false;
        this.gameState.isGameActive = false;
        
        // 統一タイマーをクリーンアップ
        if (this.unifiedTimer) {
            this.unifiedTimer.remove();
            this.unifiedTimer = null;
        }
        
        this.updateCharacterSprites();
    }

    startDefenseRound() {
        console.log(`startDefenseRound called - Stage: ${this.gameState.stage}, playerState: ${this.gameState.playerState}, enemyState: ${this.gameState.enemyState}`);
        
        // 前回のシグナル表示をクリア
        this.signalText.setVisible(false);
        this.signalGraphics.setVisible(false);
        this.signalGraphics.clear();
        
        // すべてのTweenを停止
        this.tweens.killTweensOf([this.signalText, this.signalGraphics]);
        
        // 統一タイマーをクリーンアップ
        if (this.unifiedTimer) {
            console.log('Cleaning up unifiedTimer');
            this.unifiedTimer.remove();
            this.unifiedTimer = null;
        }
        
        // ゲーム状態を完全にリセット
        this.gameState.isGameActive = false;
        this.gameState.isWaiting = false;
        
        console.log('Game state reset complete, calling showBuildupSequence');
        
        // 緊張感を演出するための段階的な警告
        this.showBuildupSequence();
    }

    showBuildupSequence() {
        console.log(`showBuildupSequence called - Stage: ${this.gameState.stage}`);
        
        // ハードモード以降（ステージ5以降）では警告演出をスキップ
        if (this.gameState.stage >= 5) {
            console.log('Hard mode - skipping buildup animation');
            // ランダムな待機時間（2.5〜4秒）で緊張感を持たせる
            const randomWaitTime = 2500 + Math.random() * 1500;
            
            // お手付き判定を1秒前から開始
            this.time.delayedCall(Math.max(0, randomWaitTime - 1000), () => {
                console.log('Setting waiting state for hard mode');
                this.gameState.isWaiting = true;
            });
            
            this.time.delayedCall(randomWaitTime, () => {
                console.log('Calling showWarningSignal from hard mode');
                // 直接シグナル表示
                this.showWarningSignal();
            });
            return;
        }
        
        console.log('Normal mode - starting buildup animation');
        // 通常モード（ステージ1-4）の演出
        // 背景を徐々に危険な色に変化させる
        const dangerOverlay = this.add.rectangle(960, 540, 1920, 1080, 0x000000, 0);
        
        // 第1段階: 静寂（1秒）- 背景が少し暗くなる
        this.time.delayedCall(1000, () => {
            console.log('Buildup phase 1 - darkening background');
            this.tweens.add({
                targets: dangerOverlay,
                alpha: 0.2,
                duration: 400
            });
            
            // 第2段階: 赤い警告開始 - 背景が赤っぽくなり、お手付き判定開始
            this.time.delayedCall(800, () => {
                console.log('Buildup phase 2 - red warning starts');
                dangerOverlay.setFillStyle(0x550000); // 濃い赤
                
                // 赤いエフェクト開始と同時にお手付き判定開始
                this.gameState.isWaiting = true;
                console.log('Setting waiting state for normal mode');
                
                // ランダムな待機時間（0.7〜0.8秒 = 700〜800ms）
                const randomWaitTime = 700 + Math.random() * 100;
                console.log(`Random wait time: ${randomWaitTime}ms`);
                
                this.tweens.add({
                    targets: dangerOverlay,
                    alpha: 0.5,
                    duration: randomWaitTime,
                    onComplete: () => {
                        console.log('Buildup complete - calling showWarningSignal');
                        // シグナル表示
                        dangerOverlay.destroy();
                        this.showWarningSignal();
                    }
                });
            });
        });
    }

    showWarningSignal() {
        console.log(`showWarningSignal called - Stage: ${this.gameState.stage}, isWaiting: ${this.gameState.isWaiting}, isGameActive: ${this.gameState.isGameActive}`);
        
        // 待機状態を終了（お手付き判定終了）
        this.gameState.isWaiting = false;
        
        // 危険マーク表示
        this.signalText.setText('⚠')
            .setFill('#FF0000')
            .setVisible(true);
        
        // 背景に赤い円を追加
        this.signalGraphics.clear();
        this.signalGraphics.fillStyle(0xFF0000, 0.3);
        this.signalGraphics.fillCircle(960, 270, 120); // 30px下に移動
        this.signalGraphics.setVisible(true);
        
        // 点滅エフェクトを削除し、固定表示
        this.signalText.setAlpha(1);
        this.signalGraphics.setAlpha(1);
        
        // フレームカウンター初期化・表示開始
        this.frameCounter = 0;
        this.frameCounterText.setVisible(true);
        this.frameCounterText.setText('0000');
        
        this.gameState.isGameActive = true;
        
        console.log(`Game state set to active - Stage: ${this.gameState.stage}, isGameActive: ${this.gameState.isGameActive}`);
        
        // ステージに応じた制限時間（指定されたフレーム数ベース）- 元の細かい調整を維持
        let targetFrames;
        
        if (this.gameState.stage <= 4) {
            // ステージ1-4: 通常難易度
            const normalFrames = [120, 90, 60, 40];
            targetFrames = normalFrames[this.gameState.stage - 1];
        } else if (this.gameState.stage <= 8) {
            // ステージ5-8: ハード難易度
            const hardFrames = [20, 18, 16, 14];
            const hardIndex = (this.gameState.stage - 5) % 4;
            targetFrames = hardFrames[hardIndex];
        } else {
            // ステージ9-12: エクストリーム難易度
            const extremeFrames = [14, 13, 12, 11];
            const extremeIndex = Math.min((this.gameState.stage - 9) % 4, 3);
            targetFrames = extremeFrames[extremeIndex];
            
            // ステージ13以降はエクストリーム最終値（11フレーム）で固定
            if (this.gameState.stage > 12) {
                targetFrames = 11;
            }
        }
        
        // ターゲットフレーム数を保存（判定用）
        this.targetFrames = targetFrames;
        
        // 拡張制限時間 = 通常制限 + 引き分け1フレーム + 失敗後30フレーム
        const extendedFrames = targetFrames + 31;
        const extendedTimeLimit = Math.round(extendedFrames * 16.67);
        
        console.log(`Setting unified timer - Stage: ${this.gameState.stage}, targetFrames: ${targetFrames}, extendedFrames: ${extendedFrames}, timeLimit: ${extendedTimeLimit}ms`);
        
        // 統一タイマー - 入力がない場合の完全タイムアウト
        this.unifiedTimer = this.time.delayedCall(extendedTimeLimit, () => {
            console.log(`Unified timer expired - no input detected`);
            if (this.gameState.isGameActive) {
                this.gameState.isGameActive = false;
                this.onDefenseFail(); // フレーム数なし（完全に入力なし）
            }
        });
    }

    onDefenseInput() {
        console.log(`onDefenseInput called - Stage: ${this.gameState.stage}, isWaiting: ${this.gameState.isWaiting}, isGameActive: ${this.gameState.isGameActive}, frameCounter: ${this.frameCounter}`);
        
        // お手付きチェック（シグナル表示前のクリック）
        if (this.gameState.isWaiting) {
            console.log('Early click detected');
            this.onEarlyClick();
            return;
        }
        
        if (!this.gameState.isGameActive) {
            console.log('Input ignored - game not active');
            return;
        }
        
        console.log('Processing valid input');
        this.gameState.isGameActive = false;
        
        // 統一タイマーを停止
        if (this.unifiedTimer) {
            this.unifiedTimer.remove();
            this.unifiedTimer = null;
        }
        
        // フレームカウンター停止・保存（表示は継続）
        const reactionFrames = this.frameCounter;
        const targetFrames = this.targetFrames;
        
        console.log(`Input judgment - reactionFrames: ${reactionFrames}, targetFrames: ${targetFrames}`);
        
        // 統一判定ロジック
        if (reactionFrames <= targetFrames) {
            // 成功判定
            console.log('Success detected');
            this.onDefenseSuccess(reactionFrames);
        } else if (reactionFrames === targetFrames + 1) {
            // 引き分け判定（1フレームの猶予）
            console.log('Draw detected - 1 frame tolerance');
            this.onDefenseDraw();
        } else {
            // 失敗判定（でもフレーム数は表示）
            console.log('Failure detected - late input');
            this.onDefenseFail(reactionFrames);
        }
    }

    onEarlyClick() {
        // クリック時の画面揺らしエフェクト
        this.cameras.main.shake(300, 0.015);
        
        // お手付き処理（待機状態を停止）
        this.gameState.isWaiting = false;
        this.gameState.isGameActive = false;
        
        // フレームカウンター非表示
        if (this.frameCounterText) {
            this.frameCounterText.setVisible(false);
        }
        
        // 進行中のタイマーとトゥイーンを全て停止
        this.time.removeAllEvents();
        this.tweens.killAll();
        
        // 背景オーバーレイがあれば削除
        this.children.getChildren().forEach(child => {
            if (child.type === 'Rectangle' && child.alpha > 0 && child.fillColor !== 0x16213e) {
                child.destroy();
            }
        });
        
        // シグナルをエラー表示に変更
        this.signalText.setText('✕')
            .setFill('#FF4444')
            .setVisible(true);
        
        // 背景を赤に変更
        this.signalGraphics.clear();
        this.signalGraphics.fillStyle(0xFF4444, 0.4);
        this.signalGraphics.fillCircle(960, 270, 120); // 30px下に移動
        this.signalGraphics.setVisible(true);
        
        // 点滅停止
        this.tweens.killTweensOf([this.signalText, this.signalGraphics]);
        this.signalText.setAlpha(1);
        this.signalGraphics.setAlpha(1);
        
        this.showMessage('まだだよ！おちついて！', 1500, () => {
            // シグナルを非表示にしてから直接ライフ処理
            this.signalText.setVisible(false);
            this.signalGraphics.setVisible(false);
            this.handleEarlyClickLifeLoss();
        });
    }
    
    handleEarlyClickLifeLoss() {
        if (this.gameState.playerState === 'normal') {
            // 1回目のお手付き - ダメージ状態に
            this.gameState.playerState = 'damaged';
            this.updateCharacterSprites();
            
            this.showMessage('1かいめのしっぱい！きをつけて！', 1500, () => {
                // damagedの状態を維持して再スタート（normalに戻さない）
                
                this.time.delayedCall(500, () => {
                    this.startDefenseRound();
                });
            });
        } else {
            // 2回目のお手付き - ゲームオーバー
            this.gameState.playerState = 'ko';
            this.updateCharacterSprites();
            
            this.showMessage('2かいめのしっぱい！', 1000, () => {
                this.showGameOverOptions();
            });
        }
    }

    onDefenseDraw() {
        // 引き分け時の処理
        this.gameState.playerState = 'defending';
        this.updateCharacterSprites();
        
        // 軽い画面揺らしエフェクト
        this.cameras.main.shake(200, 0.01);
        
        // 引き分け時の処理
        this.signalText.setText('=')
            .setFill('#FFFF00');
        
        // 背景を黄色に変更
        this.signalGraphics.clear();
        this.signalGraphics.fillStyle(0xFFFF00, 0.3);
        this.signalGraphics.fillCircle(960, 270, 120);
        
        // 点滅停止
        this.tweens.killTweensOf([this.signalText, this.signalGraphics]);
        this.signalText.setAlpha(1);
        this.signalGraphics.setAlpha(1);
        
        this.time.delayedCall(800, () => {
            // 引き分けメッセージ
            this.showMessage('ひきわけ！もういちど！', 1200, () => {
                // プレイヤー状態を通常に戻してから再プレイ
                this.gameState.playerState = 'normal';
                this.updateCharacterSprites();
                
                // スコアは変更せず、同じステージを再プレイ
                this.time.delayedCall(600, () => {
                    this.startDefenseRound();
                });
            });
        });
    }

    onDefenseSuccess(reactionFrames) {
        // 即座にガードポーズに切り替え（画面揺れと同時）
        this.gameState.playerState = 'defending';
        this.updateCharacterSprites();
        
        // クリック時の画面揺らしエフェクト
        this.cameras.main.shake(400, 0.02);
        
        // 成功時の処理
        this.signalText.setText('✓')
            .setFill('#00FF00');
        
        // 背景を緑に変更
        this.signalGraphics.clear();
        this.signalGraphics.fillStyle(0x00FF00, 0.3);
        this.signalGraphics.fillCircle(960, 270, 120); // 30px下に移動
        
        // 点滅停止
        this.tweens.killTweensOf([this.signalText, this.signalGraphics]);
        this.signalText.setAlpha(1);
        this.signalGraphics.setAlpha(1);
        
        // シールドエフェクト
        this.showShieldEffect();
        
        this.time.delayedCall(800, () => {
            // 敵の状態のみ更新（プレイヤーはガードポーズを維持）
            this.gameState.enemyState = 'ko';
            this.updateEnemyState(); // 敵のみ更新
            
            this.time.delayedCall(700, () => {
                // リアクションタイム評価
                let reactionMessage = 'まもった！';
                if (reactionFrames <= 30) { // 0.5秒以内
                    reactionMessage = 'はやい！まもった！';
                } else if (reactionFrames <= 60) { // 1秒以内
                    reactionMessage = 'いいタイミング！まもった！';
                }
                
                this.showMessage(reactionMessage, 1200, () => {
                    // スコア加算処理
                    const oldScore = this.gameState.score;
                    this.gameState.score++;
                    console.log('Score updated:', oldScore, '->', this.gameState.score); // デバッグ用
                    this.scoreText.setText(`まもった: ${this.gameState.score}`);
                    
                    this.time.delayedCall(600, () => {
                        // ステージクリア時に勝利ポーズに変更
                        this.gameState.playerState = 'victory';
                        this.updateCharacterSprites();
                        
                        // 勝利エフェクトを追加（一時的に無効化）
                        // console.log('Calling showVictoryEffect'); // デバッグ用
                        // this.showVictoryEffect();
                        
                        this.showMessage('ステージクリア！', 1200, () => {
                            // メッセージ表示後に通常状態に戻してから次ステージへ
                            this.gameState.playerState = 'normal';
                            this.updateCharacterSprites();
                            this.nextStage();
                        });
                    });
                });
            });
        });
    }

    onDefenseFail(reactionFrames) {
        // 失敗時の画面揺らしエフェクト
        this.cameras.main.shake(400, 0.02);
        
        this.gameState.isGameActive = false;
        
        // 失敗時のシグナル表示
        this.signalText.setText('✕')
            .setFill('#FF0000');
        
        // 背景を赤に変更
        this.signalGraphics.clear();
        this.signalGraphics.fillStyle(0xFF0000, 0.4);
        this.signalGraphics.fillCircle(960, 270, 120); // 30px下に移動
        
        // 点滅停止
        this.tweens.killTweensOf([this.signalText, this.signalGraphics]);
        this.signalText.setAlpha(1);
        this.signalGraphics.setAlpha(1);
        
        // フレーム数が渡された場合（遅延入力）は表示を継続、そうでなければ非表示
        if (reactionFrames !== undefined) {
            // 遅延入力の場合：フレームカウンターを表示継続
            this.frameCounterText.setVisible(true);
            this.frameCounterText.setText(String(reactionFrames).padStart(4, '0'));
        } else {
            // 時間切れ失敗の場合：フレームカウンター非表示
            if (this.frameCounterText) {
                this.frameCounterText.setVisible(false);
            }
        }
        
        if (this.gameState.playerState === 'normal') {
            // 1回目の失敗
            this.gameState.playerState = 'damaged';
            this.gameState.enemyState = 'victory';
            
            this.updateCharacterSprites();
            
            // 反応時間に基づくメッセージ（フレーム数の詳細は表示しない）
            let failMessage = 'あぶない！つぎはきをつけて！';
            if (reactionFrames !== undefined) {
                // 遅延入力の場合、簡潔なメッセージ
                const delayFrames = reactionFrames - this.targetFrames;
                if (delayFrames <= 10) { // 10フレーム以内の遅れ
                    failMessage = 'おしい！もうすこしはやく！';
                } else if (delayFrames <= 30) { // 30フレーム以内の遅れ
                    failMessage = 'おそかった！もっとはやく！';
                } else {
                    failMessage = 'おそすぎる！もっとはやく！';
                }
            }
            
            this.showMessage(failMessage, 2000, () => {
                // 2回目のチャンス - damagedの状態を維持
                this.gameState.enemyState = 'normal';
                this.updateCharacterSprites();
                
                this.time.delayedCall(500, () => {
                    this.startDefenseRound();
                });
            });
        } else {
            // 2回目の失敗（ゲームオーバー）
            this.gameState.playerState = 'ko';
            this.gameState.enemyState = 'victory';
            
            this.updateCharacterSprites();
            
            let gameOverMessage = 'やられた！';
            if (reactionFrames !== undefined) {
                gameOverMessage = 'やられた！おそかった！';
            }
            
            this.showMessage(gameOverMessage, 1500, () => {
                this.showGameOverOptions();
            });
        }
    }

    showShieldEffect() {
        // シンプルなシールドエフェクト
        const shield = this.add.circle(768, 450, 150, 0x3B82F6, 0.5);
        
        this.tweens.add({
            targets: shield,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: 800,
            ease: 'Power2',
            onComplete: () => {
                shield.destroy();
            }
        });
    }

    showVictoryEffect() {
        // プレイヤーキャラクターの位置を取得
        const playerX = this.player.x;
        const playerY = this.player.y;
        
        console.log('Victory effect triggered at:', playerX, playerY); // デバッグ用
        
        // 星の粒子エフェクト（複数の星を作成）
        for (let i = 0; i < 8; i++) {
            const star = this.add.circle(
                playerX + (Math.random() - 0.5) * 100, // プレイヤー周辺にランダム配置
                playerY + (Math.random() - 0.5) * 100,
                8, // 星のサイズを少し大きく
                0xFFD700, // 金色
                1
            ).setDepth(1500); // 高い深度で前面に表示
            
            console.log('Star created at:', star.x, star.y); // デバッグ用
            
            // 星の動きとフェードアウト
            this.tweens.add({
                targets: star,
                x: star.x + (Math.random() - 0.5) * 200, // ランダムな方向に移動
                y: star.y - Math.random() * 100 - 50, // 上に向かって移動
                scaleX: 0.2,
                scaleY: 0.2,
                alpha: 0,
                duration: 1500 + Math.random() * 500, // 少し長めに
                ease: 'Power2',
                onComplete: () => {
                    star.destroy();
                }
            });
        }
        
        // 光の輪エフェクト
        const lightRing = this.add.circle(playerX, playerY, 30, 0xFFFFFF, 0.8).setDepth(1400);
        console.log('Light ring created at:', lightRing.x, lightRing.y); // デバッグ用
        
        this.tweens.add({
            targets: lightRing,
            scaleX: 4,
            scaleY: 4,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                lightRing.destroy();
            }
        });
        
        // 文字エフェクト「やったー！」
        const victoryText = this.add.text(playerX, playerY - 50, 'やったー！', {
            fontSize: '32px',
            fill: '#FFD700',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#FFFFFF',
            strokeThickness: 3
        }).setOrigin(0.5).setDepth(1600);
        
        this.tweens.add({
            targets: victoryText,
            y: victoryText.y - 80,
            alpha: 0,
            scaleX: 1.5,
            scaleY: 1.5,
            duration: 1200,
            ease: 'Power2',
            onComplete: () => {
                victoryText.destroy();
            }
        });
    }

    updateCharacterSprites() {
        // プレイヤー状態に応じてスプライト更新
        if (this.gameState.playerState === 'defending') {
            this.player.setTexture('heroDefending').setScale(0.525).setY(750);
            // 前進アニメーション（右に80px）
            this.tweens.add({
                targets: this.player,
                x: 570,
                duration: 150,
                ease: 'Power2',
            });
        } else if (this.gameState.playerState === 'damaged') {
            this.player.setTexture('heroDamaged').setScale(0.45).setY(750).setX(450);
        } else if (this.gameState.playerState === 'victory') {
            this.player.setTexture('heroVictory').setScale(0.525).setY(675).setX(450); // 勝利時は少し大きく、ジャンプして上に
            
            // 勝利時のジャンプエフェクト
            this.tweens.add({
                targets: this.player,
                y: 630, // さらに上に
                duration: 300,
                ease: 'Power2',
                yoyo: true,
                repeat: 1, // 2回ジャンプ
                onComplete: () => {
                    this.player.setY(750); // 最終位置に戻す
                }
            });
        } else if (this.gameState.playerState === 'ko') {
            this.player.setTexture('heroKo').setScale(0.45).setY(750).setX(450);
        } else {
            this.player.setTexture('heroNormal').setScale(0.45).setY(750).setX(450);
        }
    }

    nextStage() {
        this.gameState.stage++;
        
        // フレームカウンター非表示
        if (this.frameCounterText) {
            this.frameCounterText.setVisible(false);
        }
        
        // 統一タイマーをクリーンアップ
        if (this.unifiedTimer) {
            this.unifiedTimer.remove();
            this.unifiedTimer = null;
        }
        
        // 4ステージごとにエンディング画面に遷移
        if (this.gameState.stage > this.gameState.maxStages && (this.gameState.stage - 1) % 4 === 0) {
            // 4の倍数ステージクリア時のエンディング
            this.scene.start('EndingScene', { score: this.gameState.score });
        } else {
            this.signalText.setVisible(false);
            this.signalGraphics.setVisible(false);
            this.tweens.killTweensOf([this.signalText, this.signalGraphics]);
            this.messageText.setText('');
            this.messageText.setVisible(false);
            this.stageText.setVisible(false);
            this.difficultyText.setVisible(false);
            this.updateStageAssets(); // 新しいステージのアセットを設定
            this.startStage();
        }
    }

    showGameOverOptions() {
        // フレームカウンター非表示
        if (this.frameCounterText) {
            this.frameCounterText.setVisible(false);
        }
        
        // ゲームオーバー時の選択肢
        const buttonY = 810;
        
        // リトライボタン（テキストなしボタン使用）
        const retryButton = this.add.image(780, buttonY, 'textlessButton')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.restartCurrentStage();
            })
            .on('pointerover', () => {
                retryButton.setScale(1.1);
            })
            .on('pointerout', () => {
                retryButton.setScale(1.0);
            });

        // リトライボタンのテキスト
        this.add.text(780, buttonY, 'もう一度', {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
            
        // タイトルへボタン（テキストなしボタン使用）
        const endButton = this.add.image(1140, buttonY, 'textlessButton')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.start('MenuScene');
            })
            .on('pointerover', () => {
                endButton.setScale(1.1);
            })
            .on('pointerout', () => {
                endButton.setScale(1.0);
            });

        // タイトルへボタンのテキスト
        this.add.text(1140, buttonY, 'タイトルへ', {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
    }

    restartCurrentStage() {
        // 現在のスコアを保持してステージを再開
        const currentScore = this.gameState.score;
        this.scene.restart({ preserveScore: currentScore });
    }

    showEndMessage() {
        this.showMessage('あそんでくれてありがとう！', 2000, () => {
            this.scene.start('EndingScene', { score: this.gameState.score, isGameOver: true });
        });
    }

    showMessage(text, duration, callback) {
        this.messageText.setText(text);
        
        // テキストが空の場合は背景も非表示にする
        if (text === '') {
            this.messageText.setVisible(false);
        } else {
            this.messageText.setVisible(true);
            
            // 「...」メッセージの場合は背景色を無効にして黒い表示を防ぐ
            if (text === '...') {
                this.messageText.setStyle({ backgroundColor: null });
            } else {
                this.messageText.setStyle({ backgroundColor: '#000000' });
            }
        }
        
        if (duration > 0) {
            this.time.delayedCall(duration, () => {
                this.messageText.setText('');
                this.messageText.setVisible(false);
                // 背景色を元に戻す
                this.messageText.setStyle({ backgroundColor: '#000000' });
                if (callback) callback();
            });
        }
    }
}

// エンディングシーン
class EndingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndingScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.isGameOver = data.isGameOver || false;
    }

    create() {
        // 背景
        this.add.rectangle(960, 540, 1920, 1080, 0x6B46C1);

        if (this.isGameOver) {
            this.showGameOverEnding();
        } else {
            this.showVictoryEnding();
        }

        // DXCブランディングを最初から表示
        this.showDXCBranding();
    }

    showVictoryEnding() {
        this.add.text(960, 240, 'ぜんぶクリア！', {
            fontSize: '48px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        this.add.text(960, 360, 'DXCのIT（アイティー）をまもってくれて\nありがとう！', {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            align: 'center',
            backgroundColor: '#2d1b69',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5);

        // スタートボタンと同じ見た目のタイトルへボタン（SVG使用）
        const titleButton = this.add.image(960, 510, 'textlessButton')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.start('MenuScene');
            })
            .on('pointerover', () => {
                titleButton.setScale(1.1);
            })
            .on('pointerout', () => {
                titleButton.setScale(1.0);
            });

        // ボタンの上にテキストを重ねて表示
        this.add.text(960, 510, 'タイトルへ', {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
    }

    showGameOverEnding() {
        this.add.text(960, 300, 'ゲームしゅうりょう', {
            fontSize: '36px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            backgroundColor: '#2d1b69',
            padding: { x: 18, y: 9 }
        }).setOrigin(0.5);

        this.add.text(960, 420, 'つぎはがんばろう！', {
            fontSize: '20px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: { x: 12, y: 6 }
        }).setOrigin(0.5);

        // スタートボタンと同じ見た目のタイトルへボタン（SVG使用）
        const titleButton = this.add.image(960, 520, 'textlessButton')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.scene.start('MenuScene');
            })
            .on('pointerover', () => {
                titleButton.setScale(1.1);
            })
            .on('pointerout', () => {
                titleButton.setScale(1.0);
            });

        // ボタンの上にテキストを重ねて表示
        this.add.text(960, 520, 'タイトルへ', {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);
    }

    showDXCBranding() {
        this.add.text(960, 675, 'DXC Technology', {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            backgroundColor: '#2d1b69',
            padding: { x: 16, y: 8 }
        }).setOrigin(0.5);

        this.add.text(960, 765, 'ファミリーデイにさんかしてくれて\nありがとうございます', {
            fontSize: '18px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            align: 'center',
            backgroundColor: '#000000',
            padding: { x: 12, y: 6 }
        }).setOrigin(0.5);

        this.add.text(960, 915, 'また来年のファミリーデイで\nおあいしましょう！', {
            fontSize: '16px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            align: 'center',
            backgroundColor: '#2d1b69',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // 自動でタイトルに戻る機能を削除（ボタンでのみ戻る）
    }
}

// ゲーム起動
document.addEventListener('DOMContentLoaded', () => {
    // ローディング表示を削除
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
    
    // ゲーム開始
    const game = new Phaser.Game(gameConfig);
});

// エラーハンドリング
window.addEventListener('error', (event) => {
    console.error('ゲームエラー:', event.error);
});


// ゲーム設定
const gameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    backgroundColor: '#1a1a2e',
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: { width: 960, height: 540 },
        max: { width: 1920, height: 1080 }
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [PreloadScene, MenuScene, GameScene, EndingScene]
};
