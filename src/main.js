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
        this.add.text(400, 280, 'ロード中...', {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // 進行バー
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222);
        progressBox.fillRect(300, 320, 200, 20);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x6B46C1);
            progressBar.fillRect(300, 320, 200 * value, 20);
        });

        // SVGアセットをロード
        this.load.svg('signalNormal', 'assets/images/signal_button_normal.svg', { width: 120, height: 120 });
        this.load.svg('signalActive', 'assets/images/signal_button_active.svg', { width: 120, height: 120 });
        this.load.svg('signalSuccess', 'assets/images/signal_button_success.svg', { width: 120, height: 120 });
        this.load.svg('signalError', 'assets/images/signal_button_error.svg', { width: 120, height: 120 });
        
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
        this.load.svg('menuBackground', 'assets/images/background_menu.svg', { width: 800, height: 600 });
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
        // バージョン表示（デバッグ用）
        this.add.text(20, 20, 'v1.0.8', {
            fontSize: '14px',
            fill: '#888888',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: { x: 4, y: 2 }
        }).setOrigin(0, 0);

        // 背景
        this.add.image(400, 300, 'menuBackground');

        // タイトル
        this.add.text(400, 150, '刹那の見切り【テスト版】', {
            fontSize: '48px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#6B46C1',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(400, 200, 'DXCのIT(アイティー)をまもろう！', {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // スタートボタン
        const startButton = this.add.image(400, 350, 'startButton')
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
        this.add.text(400, 500, 'DXC Technology Family Day 2025', {
            fontSize: '16px',
            fill: '#FFFFFF',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // 操作説明
        this.add.text(400, 430, 'タップして IT をまもろう！', {
            fontSize: '18px',
            fill: '#F59E0B',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }
}

// ゲームシーン
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.gameState = {
            stage: 1,
            score: 0,
            itAssetState: 'normal',
            playerState: 'normal',
            enemyState: 'normal',
            isGameActive: false,
            isWaiting: false, // シグナル待機中フラグ
            maxStages: 5
        };
    }

    create() {
        // 背景（ゲーム用の薄い色）
        this.add.rectangle(400, 300, 800, 600, 0x16213e);

        this.setupUI();
        this.setupCharacters();
        this.setupInput();
        this.startStage();
    }

    init(data) {
        // リトライ時のスコア復元
        if (data && data.preserveScore !== undefined) {
            this.gameState.score = data.preserveScore;
        }
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
        // バージョン表示（デバッグ用）
        this.versionText = this.add.text(20, 20, 'v1.0.8', {
            fontSize: '14px',
            fill: '#888888',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: { x: 4, y: 2 }
        }).setOrigin(0, 0);

        // ステージ表示
        this.stageText = this.add.text(400, 50, '', {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // スコア表示
        this.scoreText = this.add.text(100, 50, `まもった: ${this.gameState.score}`, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // メッセージ表示エリア
        this.messageText = this.add.text(400, 500, '', {
            fontSize: '24px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // シグナルボタン
        this.signalButton = this.add.image(400, 400, 'signalNormal')
            .setOrigin(0.5)
            .setVisible(false);

        // フレーム数表示（デジタル時計風）
        this.frameCounter = 0;
        this.frameCounterText = this.add.text(750, 550, '', {
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
        this.player = this.add.image(200, 300, 'playerNormal').setOrigin(0.5);

        // IT資産と敵をステージに応じて設定
        this.updateStageAssets();
    }

    updateStageAssets() {
        // IT資産の種類をステージに応じて変更
        const itAssets = ['pcNormal', 'pcNormal', 'cloudNormal', 'aiNormal', 'aiNormal'];
        const threats = ['malwareNormal', 'malwareNormal', 'systemErrorNormal', 'systemErrorNormal', 'malwareNormal'];
        
        const currentItAsset = itAssets[this.gameState.stage - 1] || 'pcNormal';
        const currentThreat = threats[this.gameState.stage - 1] || 'malwareNormal';

        // 既存のスプライトを削除して新しいものを作成
        if (this.itAsset) this.itAsset.destroy();
        if (this.enemy) this.enemy.destroy();

        // IT資産（守るべき対象）
        this.itAsset = this.add.image(400, 300, currentItAsset).setOrigin(0.5);

        // 敵キャラクター
        this.enemy = this.add.image(600, 300, currentThreat).setOrigin(0.5);
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
        const stageNames = ['PC(ピーシー)', 'サーバー', 'クラウド', 'AI(エーアイ)', 'ネットワーク'];
        const stageName = stageNames[this.gameState.stage - 1] || 'IT';
        
        this.stageText.setText(`レベル ${this.gameState.stage}: ${stageName}をまもろう`);
        
        this.showMessage(`レベル ${this.gameState.stage}: ${stageName}をまもろう`, 2000, () => {
            this.startFadeTransition();
        });
    }

    startFadeTransition() {
        // 暗転
        const fadeRect = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.8);
        
        this.time.delayedCall(500, () => {
            fadeRect.destroy();
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
        // 緊張感を演出するための段階的な警告
        this.showBuildupSequence();
    }

    showBuildupSequence() {
        // 背景を徐々に危険な色に変化させる
        const dangerOverlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0);
        
        // 第1段階: 静寂（1秒）- 背景が少し暗くなる
        this.showMessage('...', 1000, () => {
            this.tweens.add({
                targets: dangerOverlay,
                alpha: 0.2,
                duration: 500
            });
            
            // 第2段階: 警告音と警告メッセージ（1.5秒）- 背景が赤っぽくなる
            this.showMessage('きけんが せっきん！', 1500, () => {
                dangerOverlay.setFillStyle(0x330000); // 暗い赤
                this.tweens.add({
                    targets: dangerOverlay,
                    alpha: 0.4,
                    duration: 750
                });
                
                // 第3段階: 最終警告（1秒）- 背景がさらに赤く、ここから待機状態開始
                this.showMessage('じゅんび...', 1000, () => {
                    // 待機状態開始（お手付き検出開始）
                    this.gameState.isWaiting = true;
                    
                    this.tweens.add({
                        targets: dangerOverlay,
                        alpha: 0.6,
                        duration: 500,
                        onComplete: () => {
                            // 第4段階: シグナル表示時に背景をリセット
                            dangerOverlay.destroy();
                            this.showWarningSignal();
                        }
                    });
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
        
        // 警告シグナル表示
        this.signalButton.setTexture('signalActive').setVisible(true);
        this.showMessage('あぶない！まもって！', 0);
        
        // フレームカウンター初期化・表示開始
        this.frameCounter = 0;
        this.frameCounterText.setVisible(true);
        this.frameCounterText.setText('FRAME: 0000');
        
        this.gameState.isGameActive = true;
        
        // ステージに応じた制限時間
        const timeLimit = Math.max(1000, 3000 - (this.gameState.stage * 300));
        
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
        // お手付き処理（待機状態を停止）
        this.gameState.isWaiting = false;
        this.gameState.isGameActive = false;
        
        // 進行中のタイマーとトゥイーンを全て停止
        this.time.removeAllEvents();
        this.tweens.killAll();
        
        // 背景オーバーレイがあれば削除
        this.children.getChildren().forEach(child => {
            if (child.type === 'Rectangle' && child.alpha > 0 && child.fillColor !== 0x16213e) {
                child.destroy();
            }
        });
        
        // シグナルを赤色（エラー）に変更
        this.signalButton.setTexture('signalError').setVisible(true);
        
        this.showMessage('まだだよ！おちついて！', 1500, () => {
            // シグナルを非表示にしてからミス処理
            this.signalButton.setVisible(false);
            this.onDefenseFail();
        });
    }

    onDefenseSuccess(reactionFrames) {
        // 成功時の処理
        this.signalButton.setTexture('signalSuccess');
        
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
                    this.gameState.score++;
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
        this.signalButton.setTexture('signalError');
        
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
        const shield = this.add.circle(400, 300, 100, 0x3B82F6, 0.5);
        
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
        
        if (this.gameState.stage > this.gameState.maxStages) {
            // 全ステージクリア
            this.scene.start('EndingScene', { score: this.gameState.score });
        } else {
            this.signalButton.setVisible(false);
            this.messageText.setText('');
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
        const buttonY = 450;
        
        const retryButton = this.add.image(300, buttonY, 'retryButton')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.restartCurrentStage();
            });
            
        const endButton = this.add.text(500, buttonY, 'おわり', {
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
        
        if (duration > 0) {
            this.time.delayedCall(duration, () => {
                this.messageText.setText('');
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
        // バージョン表示（デバッグ用）
        this.add.text(20, 20, 'v1.0.8', {
            fontSize: '14px',
            fill: '#888888',
            fontFamily: 'Arial',
            backgroundColor: '#000000',
            padding: { x: 4, y: 2 }
        }).setOrigin(0, 0);

        // 背景
        this.add.rectangle(400, 300, 800, 600, 0x6B46C1);

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
        this.add.text(400, 150, 'ぜんぶクリア！', {
            fontSize: '48px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 220, 'DXCのみらいのIT(アイティー)まもりたいだね！', {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(400, 280, `${this.finalScore}個のIT(アイティー)をまもりました！`, {
            fontSize: '20px',
            fill: '#10B981',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }

    showGameOverEnding() {
        this.add.text(400, 200, 'ゲームしゅうりょう', {
            fontSize: '36px',
            fill: '#FFFFFF',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(400, 260, `${this.finalScore}個のIT(アイティー)をまもりました！`, {
            fontSize: '20px',
            fill: '#10B981',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }

    showDXCBranding() {
        this.add.text(400, 350, 'DXC Technology', {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 400, 'ファミリーデイにさんかしてくれて\nありがとうございます', {
            fontSize: '18px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(400, 480, 'また来年のファミリーデイで\nおあいしましょう！', {
            fontSize: '16px',
            fill: '#F59E0B',
            fontFamily: 'Arial',
            align: 'center'
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
    width: 800,
    height: 600,
    backgroundColor: '#1a1a2e',
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: { width: 320, height: 240 },
        max: { width: 1200, height: 900 }
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
