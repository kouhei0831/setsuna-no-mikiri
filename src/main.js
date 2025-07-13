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
        this.add.text(512, 280, 'ロード中...', {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // 進行バー
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222);
        progressBox.fillRect(412, 320, 200, 20);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x6B46C1);
            progressBar.fillRect(412, 320, 200 * value, 20);
        });

        // SVGアセットをロード
        this.load.svg('signalNormal', 'assets/images/signal_danger.svg', { width: 120, height: 120 });
        this.load.svg('signalActive', 'assets/images/signal_active.svg', { width: 120, height: 120 });
        this.load.svg('signalSuccess', 'assets/images/signal_success.svg', { width: 120, height: 120 });
        this.load.svg('signalError', 'assets/images/signal_error.svg', { width: 120, height: 120 });
        
        this.load.svg('playerNormal', 'assets/images/player_character.svg', { width: 64, height: 64 });
        this.load.svg('playerDamaged', 'assets/images/player_character_damaged.svg', { width: 64, height: 64 });
        this.load.svg('playerVictory', 'assets/images/player_character_victory.svg', { width: 64, height: 64 });
        this.load.svg('playerKo', 'assets/images/player_character_ko.svg', { width: 64, height: 64 });
        
        this.load.svg('pcNormal', 'assets/images/protected_pc_normal.svg', { width: 64, height: 64 });
        this.load.svg('cloudNormal', 'assets/images/protected_cloud_normal.svg', { width: 64, height: 64 });
        this.load.svg('aiNormal', 'assets/images/protected_ai_normal.svg', { width: 64, height: 64 });
        
        this.load.svg('malwareNormal', 'assets/images/threat_malware_normal.svg', { width: 48, height: 48 });
        this.load.svg('systemErrorNormal', 'assets/images/threat_system_error_normal.svg', { width: 48, height: 48 });
        
        this.load.svg('startButton', 'assets/images/start_button.svg', { width: 200, height: 60 });
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
        this.add.image(640, 360, 'menuBackground').setScale(1.6);

        // バージョン表示（背景の後に配置して最前面に）
        this.add.text(20, 20, 'v1.1.0', {
            fontSize: '18px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: { x: 8, y: 4 },
            stroke: '#6B46C1',
            strokeThickness: 2
        }).setOrigin(0, 0).setDepth(1000);

        // タイトル
        this.add.text(640, 200, '刹那の見切り【テスト版】', {
            fontSize: '56px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#6B46C1',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(640, 270, 'DXCのIT(アイティー)をまもろう！', {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            stroke: '#1a1a2e',
            strokeThickness: 4
        }).setOrigin(0.5);

        // スタートボタン
        const startButton = this.add.image(640, 420, 'startButton')
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
        this.add.text(640, 600, 'DXC Technology Family Day 2025', {
            fontSize: '16px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            backgroundColor: '#2d1b69',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // 操作説明
        this.add.text(640, 520, 'タップして IT をまもろう！', {
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
            stage: 1,
            score: 0, // デフォルト値
            itAssetState: 'normal',
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
    }

    create() {
        // ゲーム背景画像（生成されたサイバー背景を適切なサイズで表示）
        this.add.image(640, 360, 'gameBackground').setScale(1.0);

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
            this.frameCounterText.setText(`FRAME: ${displayFrame}`);
        }
    }

    setupUI() {
        // ステージ表示
        this.stageText = this.add.text(640, 50, '', {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            backgroundColor: '#000000',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setVisible(false);

        // スコア表示
        this.scoreText = this.add.text(150, 50, `まもった: ${this.gameState.score}`, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            backgroundColor: '#2d1b69',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // 難易度表示（画面左下）
        this.difficultyText = this.add.text(20, 700, '', {
            fontSize: '18px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            backgroundColor: '#000000',
            padding: { x: 8, y: 4 }
        }).setOrigin(0, 1).setVisible(false);

        // メッセージ表示エリア
        this.messageText = this.add.text(640, 600, '', {
            fontSize: '24px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            backgroundColor: '#000000',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5).setVisible(false);

        // シグナル表示（画面上部）
        this.signalGraphics = this.add.graphics().setVisible(false);
        
        // 危険マーク用のテキスト（シンプルな警告マーク）
        this.signalText = this.add.text(640, 150, '⚠', {
            fontSize: '120px',
            fill: '#FF0000',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#FFFFFF',
            strokeThickness: 6
        }).setOrigin(0.5).setVisible(false);

        // フレーム数表示（デジタル時計風）
        this.frameCounter = 0;
        this.frameCounterText = this.add.text(1230, 660, '', {
            fontSize: '20px',
            fill: '#00FF00',
            fontFamily: 'Courier',
            backgroundColor: '#000000',
            padding: { x: 8, y: 4 },
            stroke: '#008800',
            strokeThickness: 1
        }).setOrigin(1, 1).setVisible(false);
    }

    setupCharacters() {
        // プレイヤーキャラクター
        this.player = this.add.image(250, 360, 'playerNormal').setOrigin(0.5);

        // IT資産と敵をステージに応じて設定
        this.updateStageAssets();
    }

    updateStageAssets() {
        // IT資産の種類をステージに応じて変更（1-4のサイクルで統一）
        const itAssets = ['pcNormal', 'pcNormal', 'cloudNormal', 'cloudNormal'];
        const threats = ['malwareNormal', 'malwareNormal', 'systemErrorNormal', 'systemErrorNormal'];
        
        // 全ステージで1-4のサイクルを使用
        const cycleIndex = (this.gameState.stage - 1) % 4;
        const currentItAsset = itAssets[cycleIndex] || 'pcNormal';
        const currentThreat = threats[cycleIndex] || 'malwareNormal';

        // 既存のスプライトを削除して新しいものを作成
        if (this.itAsset) this.itAsset.destroy();
        if (this.enemy) this.enemy.destroy();

        // IT資産（守るべき対象）
        this.itAsset = this.add.image(640, 360, currentItAsset).setOrigin(0.5);

        // 敵キャラクター
        this.enemy = this.add.image(1030, 360, currentThreat).setOrigin(0.5);
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
        
        // 難易度表示
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
        this.gameState.itAssetState = 'normal';
        this.gameState.playerState = 'normal';
        this.gameState.enemyState = 'normal';
        this.gameState.isWaiting = false;
        this.gameState.isGameActive = false;
        
        this.updateCharacterSprites();
    }

    startDefenseRound() {
        // 前回のシグナル表示をクリア
        this.signalText.setVisible(false);
        this.signalGraphics.setVisible(false);
        this.signalGraphics.clear();
        
        // すべてのTweenを停止
        this.tweens.killTweensOf([this.signalText, this.signalGraphics]);
        
        // 緊張感を演出するための段階的な警告
        this.showBuildupSequence();
    }

    showBuildupSequence() {
        // 背景を徐々に危険な色に変化させる
        const dangerOverlay = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0);
        
        // 第1段階: 静寂（1秒）- 背景が少し暗くなる
        this.time.delayedCall(1000, () => {
            this.tweens.add({
                targets: dangerOverlay,
                alpha: 0.2,
                duration: 400
            });
            
            // 第2段階: 赤い警告開始 - 背景が赤っぽくなり、お手付き判定開始
            this.time.delayedCall(800, () => {
                dangerOverlay.setFillStyle(0x550000); // 濃い赤
                
                // ランダムな待機時間（0.7～0.8秒 = 700～800ms）
                const randomWaitTime = 700 + Math.random() * 100;
                
                this.tweens.add({
                    targets: dangerOverlay,
                    alpha: 0.5,
                    duration: randomWaitTime,
                    onComplete: () => {
                        // 待機状態開始（お手付き検出開始）
                        this.gameState.isWaiting = true;
                        
                        // シグナル表示
                        dangerOverlay.destroy();
                        this.showWarningSignal();
                    }
                });
            });
        });
    }

    showWarningSignal() {
        // お手付き処理済みの場合は何もしない
        if (!this.gameState.isWaiting && !this.gameState.isGameActive) {
            return;
        }
        
        // 待機状態終了
        this.gameState.isWaiting = false;
        
        // 危険マーク表示
        this.signalText.setText('⚠')
            .setFill('#FF0000')
            .setVisible(true);
        
        // 背景に赤い円を追加
        this.signalGraphics.clear();
        this.signalGraphics.fillStyle(0xFF0000, 0.3);
        this.signalGraphics.fillCircle(512, 120, 80);
        this.signalGraphics.setVisible(true);
        
        // シグナルの点滅エフェクト
        this.tweens.add({
            targets: [this.signalText, this.signalGraphics],
            alpha: { from: 1, to: 0.3 },
            duration: 300,
            yoyo: true,
            repeat: -1
        });
        
        // フレームカウンター初期化・表示開始
        this.frameCounter = 0;
        this.frameCounterText.setVisible(true);
        this.frameCounterText.setText('FRAME: 0000');
        
        this.gameState.isGameActive = true;
        
        // ステージに応じた制限時間（指定されたフレーム数ベース）
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
        
        // フレーム数をミリ秒に変換（60fps = 16.67ms/frame）
        const timeLimit = Math.round(targetFrames * 16.67);
        
        this.defenseTimer = this.time.delayedCall(timeLimit, () => {
            if (this.gameState.isGameActive) {
                this.onDefenseFail();
            }
        });
    }

    onDefenseInput() {
        // お手付きチェック（シグナル表示前のクリック）
        if (this.gameState.isWaiting) {
            this.onEarlyClick();
            return;
        }
        
        if (!this.gameState.isGameActive) return;
        
        this.gameState.isGameActive = false;
        if (this.defenseTimer) {
            this.defenseTimer.remove();
        }
        
        // フレームカウンター停止・保存（表示は継続）
        const reactionFrames = this.frameCounter;
        
        this.onDefenseSuccess(reactionFrames);
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
        this.signalGraphics.fillCircle(512, 120, 80);
        this.signalGraphics.setVisible(true);
        
        // 点滅停止
        this.tweens.killTweensOf([this.signalText, this.signalGraphics]);
        this.signalText.setAlpha(1);
        this.signalGraphics.setAlpha(1);
        
        this.showMessage('まだだよ！おちついて！', 1500, () => {
            // シグナルを非表示にしてからミス処理
            this.signalText.setVisible(false);
            this.signalGraphics.setVisible(false);
            this.onDefenseFail();
        });
    }

    onDefenseSuccess(reactionFrames) {
        // クリック時の画面揺らしエフェクト
        this.cameras.main.shake(200, 0.01);
        
        // 成功時の処理
        this.signalText.setText('✓')
            .setFill('#00FF00');
        
        // 背景を緑に変更
        this.signalGraphics.clear();
        this.signalGraphics.fillStyle(0x00FF00, 0.3);
        this.signalGraphics.fillCircle(512, 120, 80);
        
        // 点滅停止
        this.tweens.killTweensOf([this.signalText, this.signalGraphics]);
        this.signalText.setAlpha(1);
        this.signalGraphics.setAlpha(1);
        
        // シールドエフェクト
        this.showShieldEffect();
        
        this.time.delayedCall(500, () => {
            // キャラクター状態更新
            this.gameState.enemyState = 'ko';
            this.gameState.itAssetState = 'victory';
            this.gameState.playerState = 'victory';
            this.updateCharacterSprites();
            
            this.time.delayedCall(500, () => {
                // リアクションタイム評価
                let reactionMessage = 'まもった！';
                if (reactionFrames <= 30) { // 0.5秒以内
                    reactionMessage = 'はやい！まもった！';
                } else if (reactionFrames <= 60) { // 1秒以内
                    reactionMessage = 'いいタイミング！まもった！';
                }
                
                this.showMessage(reactionMessage, 1000, () => {
                    // スコア加算処理
                    const oldScore = this.gameState.score;
                    this.gameState.score++;
                    console.log('Score updated:', oldScore, '->', this.gameState.score); // デバッグ用
                    this.scoreText.setText(`まもった: ${this.gameState.score}`);
                    
                    this.time.delayedCall(500, () => {
                        this.showMessage('ステージクリア！', 1000, () => {
                            this.nextStage();
                        });
                    });
                });
            });
        });
    }

    onDefenseFail() {
        this.gameState.isGameActive = false;
        
        // フレームカウンター非表示
        if (this.frameCounterText) {
            this.frameCounterText.setVisible(false);
        }
        
        // 失敗時のシグナル表示
        this.signalText.setText('✕')
            .setFill('#FF0000');
        
        // 背景を赤に変更
        this.signalGraphics.clear();
        this.signalGraphics.fillStyle(0xFF0000, 0.4);
        this.signalGraphics.fillCircle(512, 120, 80);
        
        // 点滅停止
        this.tweens.killTweensOf([this.signalText, this.signalGraphics]);
        this.signalText.setAlpha(1);
        this.signalGraphics.setAlpha(1);
        
        if (this.gameState.itAssetState === 'normal') {
            // 1回目の失敗
            this.gameState.itAssetState = 'damaged';
            this.gameState.playerState = 'damaged';
            this.gameState.enemyState = 'victory';
            
            this.updateCharacterSprites();
            
            this.showMessage('あぶない！つぎはきをつけて！', 1500, () => {
                // 2回目のチャンス
                this.gameState.playerState = 'normal';
                this.gameState.enemyState = 'normal';
                this.updateCharacterSprites();
                
                this.time.delayedCall(500, () => {
                    this.startDefenseRound();
                });
            });
        } else {
            // 2回目の失敗（ゲームオーバー）
            this.gameState.itAssetState = 'ko';
            this.gameState.playerState = 'ko';
            this.gameState.enemyState = 'victory';
            
            this.updateCharacterSprites();
            
            this.showMessage('やられた！', 1000, () => {
                this.showGameOverOptions();
            });
        }
    }

    showShieldEffect() {
        // シンプルなシールドエフェクト
        const shield = this.add.circle(512, 300, 100, 0x3B82F6, 0.5);
        
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

    updateCharacterSprites() {
        // プレイヤー状態に応じてスプライト更新
        if (this.gameState.playerState === 'damaged') {
            this.player.setTexture('playerDamaged');
        } else if (this.gameState.playerState === 'victory') {
            this.player.setTexture('playerVictory');
        } else if (this.gameState.playerState === 'ko') {
            this.player.setTexture('playerKo');
        } else {
            this.player.setTexture('playerNormal');
        }
    }

    nextStage() {
        this.gameState.stage++;
        
        // フレームカウンター非表示
        if (this.frameCounterText) {
            this.frameCounterText.setVisible(false);
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
        const buttonY = 540;
        
        const retryButton = this.add.image(520, buttonY, 'retryButton')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.restartCurrentStage();
            });
            
        const endButton = this.add.text(760, buttonY, 'おわり', {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            backgroundColor: '#EF4444',
            padding: { x: 20, y: 10 }
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.showEndMessage();
            });
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
        this.add.rectangle(640, 360, 1280, 720, 0x6B46C1);

        if (this.isGameOver) {
            this.showGameOverEnding();
        } else {
            this.showVictoryEnding();
        }

        // DXCブランディング
        this.time.delayedCall(5000, () => {
            this.showDXCBranding();
        });
    }

    showVictoryEnding() {
        this.add.text(640, 180, 'ぜんぶクリア！', {
            fontSize: '48px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        this.add.text(640, 260, 'DXCのみらいのIT(アイティー)まもりたいだね！', {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            backgroundColor: '#2d1b69',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5);

        this.add.text(640, 330, `${this.finalScore}個のIT(アイティー)をまもりました！`, {
            fontSize: '20px',
            fill: '#10B981',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: { x: 12, y: 6 }
        }).setOrigin(0.5);
    }

    showGameOverEnding() {
        this.add.text(640, 240, 'ゲームしゅうりょう', {
            fontSize: '36px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            backgroundColor: '#2d1b69',
            padding: { x: 18, y: 9 }
        }).setOrigin(0.5);

        this.add.text(640, 310, `${this.finalScore}個のIT(アイティー)をまもりました！`, {
            fontSize: '20px',
            fill: '#10B981',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: { x: 12, y: 6 }
        }).setOrigin(0.5);
    }

    showDXCBranding() {
        this.add.text(640, 420, 'DXC Technology', {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            backgroundColor: '#2d1b69',
            padding: { x: 16, y: 8 }
        }).setOrigin(0.5);

        this.add.text(640, 480, 'ファミリーデイにさんかしてくれて\nありがとうございます', {
            fontSize: '18px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            align: 'center',
            backgroundColor: '#000000',
            padding: { x: 12, y: 6 }
        }).setOrigin(0.5);

        this.add.text(640, 580, 'また来年のファミリーデイで\nおあいしましょう！', {
            fontSize: '16px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            align: 'center',
            backgroundColor: '#2d1b69',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);

        // 5秒後にタイトル画面に戻る
        this.time.delayedCall(5000, () => {
            this.scene.start('MenuScene');
        });
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
    width: 1280,
    height: 720,
    backgroundColor: '#1a1a2e',
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: { width: 640, height: 360 },
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
