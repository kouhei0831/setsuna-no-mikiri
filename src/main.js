/**
 * まもれ！ディーフォクシー - DXCのITをまもろう
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
        
        // BGMの読み込み
        this.load.audio('titleBgm', 'assets/sounds/maou_bgm_cyber31.mp3');
        this.load.audio('gameBgm', 'assets/sounds/maou_bgm_cyber22.mp3');
        
        // 効果音の読み込み
        this.load.audio('gameStartSE', 'assets/sounds/game_start.mp3');
        this.load.audio('successSE', 'assets/sounds/success.mp3');
        this.load.audio('drawSE', 'assets/sounds/drow.mp3');
        this.load.audio('failSE', 'assets/sounds/fail.mp3');
        
        // プレイヤーキャラクター
        this.load.image('heroNormal', 'assets/gen/images/player_character_normal.png');
        this.load.image('heroDefending', 'assets/gen/images/player_character_defending.png');
        this.load.image('heroDamaged', 'assets/gen/images/player_character_normal.png');
        this.load.image('heroVictory', 'assets/gen/images/player_character_victory.png');
        this.load.image('heroKo', 'assets/gen/images/player_character_normal.png');
        
        // 敵キャラクター画像
        this.load.image('pcEnemy', 'assets/gen/images/PC_enemy.png');
        this.load.image('serverEnemy', 'assets/gen/images/server_enemy.png');
        this.load.image('netEnemy', 'assets/gen/images/net_enemy.png');
        this.load.image('cloudEnemy', 'assets/gen/images/cloud_enemy.png');
        
        this.load.svg('startButton', 'assets/images/start_button.svg', { width: 200, height: 60 });
        this.load.svg('textlessButton', 'assets/images/textless_button.svg', { width: 200, height: 60 });
        this.load.svg('retryButton', 'assets/images/retry_button.svg', { width: 200, height: 60 });
        this.load.svg('menuBackground', 'assets/images/background_menu.svg', { width: 1024, height: 600 });
        
        // ゲーム背景画像
        this.load.image('gameBackground', 'assets/gen/images/game_background_cyber.png');
        
        // タイトルロゴ
        this.load.image('titleLogo', 'assets/gen/images/title_logo.png');
        
        // エンディングカード
        this.load.image('endingCard', 'assets/images/Ending_card.png');
        
        // スタンプ
        this.load.image('stamp', 'assets/images/stamp.png');
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
        // ミュート状態をlocalStorageから読み込み
        let isMuted = localStorage.getItem('gameAudioMuted') === 'true';
        
        // BGM再生（控えめ音量でループ）- 確実に音量設定と再生
        const existingTitleBgm = this.sound.get('titleBgm');
        if (existingTitleBgm) {
            // 既存のBGMがある場合は音量を設定し直して再生確認
            existingTitleBgm.setVolume(isMuted ? 0 : 0.05);
            if (!existingTitleBgm.isPlaying) {
                existingTitleBgm.play();
            }
        } else {
            // 新規作成
            this.sound.add('titleBgm', { loop: true, volume: isMuted ? 0 : 0.05 }).play();
        }
        
        // ゲーム背景
        this.add.image(960, 540, 'gameBackground').setScale(1.5).setDepth(-100);

        // 背景オーバーレイ
        const overlay = this.add.graphics();
        overlay.fillGradientStyle(0x000000, 0x000000, 0x1a1a2e, 0x1a1a2e, 0.4);
        overlay.fillRect(0, 0, 1920, 1080);
        overlay.setDepth(-50);

        // タイトルロゴ（中央やや下に表示）
        const titleLogo = this.add.image(960, 450, 'titleLogo').setOrigin(0.5, 0.5).setScale(0.8).setDepth(-40);
        
        // タイトルロゴの同期アニメーション（上で0度、下で±1度交互）
        let isPositive = true;
        const logoAnimation = () => {
            this.tweens.add({
                targets: titleLogo,
                y: 470,
                angle: isPositive ? 1 : -1,
                duration: 1000,
                ease: 'Sine.easeInOut',
                yoyo: true,
                onComplete: () => {
                    isPositive = !isPositive;
                    logoAnimation();
                }
            });
        };
        logoAnimation();

        // 制作者クレジット（右下）
        this.add.text(1850, 1030, 'Created by Kohei Hayakawa', {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            alpha: 0.7
        }).setOrigin(1, 1).setDepth(100);
        
        // ===== ミュートボタン（右上） =====
        const muteButtonBg = this.add.graphics();
        muteButtonBg.fillStyle(0x000000, 0.7);
        muteButtonBg.fillRoundedRect(1830, 10, 80, 40, 5);
        muteButtonBg.setDepth(999);
        
        const muteButtonText = this.add.text(1870, 30, isMuted ? '🔇' : '🔊', {
            fontSize: '20px',
            fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(1000);
        
        const muteLabel = this.add.text(1870, 50, isMuted ? 'OFF' : 'ON', {
            fontSize: '10px',
            fill: isMuted ? '#FF6B6B' : '#4ECDC4',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5).setDepth(1000);
        
        // ミュートボタンの操作
        this.add.rectangle(1870, 30, 80, 40, 0x000000, 0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                const newMuteState = !isMuted;
                localStorage.setItem('gameAudioMuted', newMuteState.toString());
                
                // UI更新
                muteButtonText.setText(newMuteState ? '🔇' : '🔊');
                muteLabel.setText(newMuteState ? 'OFF' : 'ON');
                muteLabel.setFill(newMuteState ? '#FF6B6B' : '#4ECDC4');
                
                // BGM音量更新
                const titleBgm = this.sound.get('titleBgm');
                if (titleBgm) {
                    titleBgm.setVolume(newMuteState ? 0 : 0.05);
                }
                
                // 更新後の状態を保存
                isMuted = newMuteState;
            })
            .on('pointerover', () => {
                muteButtonBg.clear();
                muteButtonBg.fillStyle(0x333333, 0.9);
                muteButtonBg.fillRoundedRect(1830, 10, 80, 40, 5);
            })
            .on('pointerout', () => {
                muteButtonBg.clear();
                muteButtonBg.fillStyle(0x000000, 0.7);
                muteButtonBg.fillRoundedRect(1830, 10, 80, 40, 5);
            })
            .setDepth(1001);
        
        // ===== デモエリア =====
        
        // プレイヤー
        const demoPlayer = this.add.image(350, 750, 'heroNormal').setOrigin(0.5).setScale(0.45).setDepth(100);
        
        // 警告シグナル
        const demoSignal = this.add.text(1650, 600, '⚠', {
            fontSize: '120px',
            fill: '#FF0000',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#FFFFFF',
            strokeThickness: 6
        }).setOrigin(0.5).setVisible(false).setDepth(1000);
        
        // シグナル背景
        const demoSignalBg = this.add.graphics().setDepth(999);
        
        // クリック指示
        const clickPrompt = this.add.text(1650, 780, 'マウスでクリック！', {
            fontSize: '40px',
            fill: '#FFFF00',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(1000).setAlpha(0).setScale(2.0);
        
        // デモアニメーション
        const playDemo = () => {
            // リセット
            demoPlayer.setTexture('heroNormal');
            demoSignal.setVisible(false);
            demoSignalBg.clear();
            clickPrompt.setAlpha(0);
            
            // シグナル表示
            this.time.delayedCall(1000, () => {
                demoSignal.setText('⚠').setFill('#FF0000').setVisible(true);
                demoSignalBg.clear();
                demoSignalBg.fillStyle(0xFF0000, 0.3);
                demoSignalBg.fillCircle(1650, 600, 120);
                
                // クリック指示表示
                clickPrompt.setAlpha(0).setScale(1.8);
                this.tweens.add({
                    targets: clickPrompt,
                    alpha: 1,
                    scale: 1.0,
                    duration: 250,
                    ease: 'Back.out'
                });
                
                // 防御実行
                this.time.delayedCall(1500, () => {
                    demoPlayer.setTexture('heroDefending');
                    
                    // クリック指示非表示
                    this.tweens.add({
                        targets: clickPrompt,
                        alpha: 0,
                        scale: 0.7,
                        duration: 200,
                        ease: 'Power2.in'
                    });
                    
                    // 成功シグナル
                    demoSignal.setText('✓').setFill('#00FF00');
                    demoSignalBg.clear();
                    demoSignalBg.fillStyle(0x00FF00, 0.3);
                    demoSignalBg.fillCircle(1650, 600, 120);
                    
                    // 成功メッセージ
                    const successMessage = this.add.text(1650, 780, 'すばやくおそう！！', {
                        fontSize: '48px',
                        fill: '#00FF00',
                        fontFamily: 'Arial',
                        fontWeight: 'bold',
                        stroke: '#FFFFFF',
                        strokeThickness: 5
                    }).setOrigin(0.5).setDepth(1000).setAlpha(0).setScale(2.0);
                    
                    this.tweens.add({
                        targets: successMessage,
                        alpha: 1,
                        scale: 1.0,
                        duration: 300,
                        ease: 'Back.out',
                        onComplete: () => {
                            this.time.delayedCall(800, () => {
                                this.tweens.add({
                                    targets: successMessage,
                                    alpha: 0,
                                    scale: 0.8,
                                    duration: 400,
                                    ease: 'Power2.in',
                                    onComplete: () => successMessage.destroy()
                                });
                            });
                        }
                    });
                    
                    // リセット
                    this.time.delayedCall(1500, () => {
                        demoPlayer.setTexture('heroNormal');
                        demoSignal.setVisible(false);
                        demoSignalBg.clear();
                        this.time.delayedCall(2000, playDemo);
                    });
                });
            });
        };
        
        this.time.delayedCall(500, playDemo);

        // ===== ゲームスタートボタン =====

        // 大きな紫色のメインボタン
        const mainStartBg = this.add.graphics();
        mainStartBg.fillGradientStyle(0x6B46C1, 0x8B5CF6, 0x6B46C1, 0x8B5CF6, 0.95);
        mainStartBg.fillRoundedRect(560, 780, 800, 80, 15);
        mainStartBg.lineStyle(4, 0xFFFFFF, 0.5);
        mainStartBg.strokeRoundedRect(560, 780, 800, 80, 15);
        mainStartBg.setDepth(999);
        
        // ボタン背景の点滅アニメーション（ロゴと同じ周期）
        this.tweens.add({
            targets: mainStartBg,
            alpha: 0.4,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        const startButtonText = this.add.text(960, 820, 'ゲームスタート！', {
            fontSize: '36px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5).setDepth(1000).setShadow(3, 3, '#000000', 6);
        
        // テキストの点滅アニメーション（ロゴと同じ周期）
        this.tweens.add({
            targets: startButtonText,
            alpha: 0.6,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        

        // メインボタン操作
        this.add.rectangle(960, 820, 800, 80, 0x000000, 0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                // ゲームスタート効果音（ミュート状態を考慮）
                if (!isMuted) {
                    this.sound.play('gameStartSE', { volume: 0.3 });
                }
                
                // BGM停止
                const titleBgm = this.sound.get('titleBgm');
                if (titleBgm) {
                    titleBgm.stop();
                }
                
                // 暗転エフェクト
                const fadeOut = this.add.graphics();
                fadeOut.setDepth(10000);
                
                let fadeAlpha = 0;
                const fadeStep = () => {
                    fadeAlpha += 0.05;
                    fadeOut.clear();
                    fadeOut.fillStyle(0x000000, fadeAlpha);
                    fadeOut.fillRect(0, 0, 1920, 1080);
                    
                    if (fadeAlpha >= 1) {
                        this.scene.start('GameScene', { difficulty: 'normal' });
                    } else {
                        this.time.delayedCall(16, fadeStep);
                    }
                };
                fadeStep();
            })
            .on('pointerover', () => {
                mainStartBg.clear();
                mainStartBg.fillGradientStyle(0x6B46C1, 0x8B5CF6, 0x6B46C1, 0x8B5CF6, 1.0);
                mainStartBg.fillRoundedRect(560, 780, 800, 80, 15);
                mainStartBg.lineStyle(6, 0xFFFFFF, 0.9);
                mainStartBg.strokeRoundedRect(560, 780, 800, 80, 15);
            })
            .on('pointerout', () => {
                mainStartBg.clear();
                mainStartBg.fillGradientStyle(0x6B46C1, 0x8B5CF6, 0x6B46C1, 0x8B5CF6, 0.95);
                mainStartBg.fillRoundedRect(560, 780, 800, 80, 15);
                mainStartBg.lineStyle(4, 0xFFFFFF, 0.5);
                mainStartBg.strokeRoundedRect(560, 780, 800, 80, 15);
            })
            .setDepth(1001);

        // ===== 難易度ボタン =====
        
        const buttonY = 940;
        const buttonSpacing = 200;
        const buttonWidth = 180;
        const buttonHeight = 45;
        const buttonColors = [
            { primary: 0x4ADE80, secondary: 0x22C55E },
            { primary: 0xF59E0B, secondary: 0xD97706 },
            { primary: 0xEF4444, secondary: 0xDC2626 }
        ];
        
        const difficulties = [
            { text: 'かんたん', difficulty: 'normal' },
            { text: 'むずかしい', difficulty: 'hard' },
            { text: 'ちょうむずかしい', difficulty: 'extreme' }
        ];

        difficulties.forEach((diff, index) => {
            const x = 960 + (index - 1) * buttonSpacing;
            const colors = buttonColors[index];
            
            // ボタン背景
            const buttonBg = this.add.graphics();
            buttonBg.fillGradientStyle(colors.primary, colors.secondary, colors.primary, colors.secondary, 0.9);
            buttonBg.fillRoundedRect(x - buttonWidth/2, buttonY - buttonHeight/2, buttonWidth, buttonHeight, 8);
            buttonBg.lineStyle(2, 0xFFFFFF, 0.4);
            buttonBg.strokeRoundedRect(x - buttonWidth/2, buttonY - buttonHeight/2, buttonWidth, buttonHeight, 8);
            buttonBg.setDepth(999);
            
            // ボタンテキスト
            this.add.text(x, buttonY, diff.text, {
                fontSize: '18px',
                fill: '#FFFFFF',
                fontFamily: 'Arial',
                fontWeight: 'bold'
            }).setOrigin(0.5).setDepth(1000).setShadow(2, 2, '#000000', 3);
            
            // ボタン操作
            this.add.rectangle(x, buttonY, buttonWidth, buttonHeight, 0x000000, 0)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => {
                    // ゲームスタート効果音（ミュート状態を考慮）
                    if (!isMuted) {
                        this.sound.play('gameStartSE', { volume: 0.3 });
                    }
                    
                    // BGM停止
                    const titleBgm = this.sound.get('titleBgm');
                    if (titleBgm) {
                        titleBgm.stop();
                    }
                    
                    // 暗転エフェクト
                    const fadeOut = this.add.graphics();
                    fadeOut.setDepth(10000);
                    
                    let fadeAlpha = 0;
                    const fadeStep = () => {
                        fadeAlpha += 0.05;
                        fadeOut.clear();
                        fadeOut.fillStyle(0x000000, fadeAlpha);
                        fadeOut.fillRect(0, 0, 1920, 1080);
                        
                        if (fadeAlpha >= 1) {
                            this.scene.start('GameScene', { difficulty: diff.difficulty });
                        } else {
                            this.time.delayedCall(16, fadeStep);
                        }
                    };
                    fadeStep();
                })
                .on('pointerover', () => {
                    buttonBg.clear();
                    buttonBg.fillGradientStyle(colors.primary, colors.secondary, colors.primary, colors.secondary, 1.0);
                    buttonBg.fillRoundedRect(x - buttonWidth/2, buttonY - buttonHeight/2, buttonWidth, buttonHeight, 8);
                    buttonBg.lineStyle(4, 0xFFFFFF, 0.8);
                    buttonBg.strokeRoundedRect(x - buttonWidth/2, buttonY - buttonHeight/2, buttonWidth, buttonHeight, 8);
                })
                .on('pointerout', () => {
                    buttonBg.clear();
                    buttonBg.fillGradientStyle(colors.primary, colors.secondary, colors.primary, colors.secondary, 0.9);
                    buttonBg.fillRoundedRect(x - buttonWidth/2, buttonY - buttonHeight/2, buttonWidth, buttonHeight, 8);
                    buttonBg.lineStyle(2, 0xFFFFFF, 0.4);
                    buttonBg.strokeRoundedRect(x - buttonWidth/2, buttonY - buttonHeight/2, buttonWidth, buttonHeight, 8);
                })
                .setDepth(1001);
        });

        // ===== フッター =====
        
        const footerBg = this.add.graphics();
        footerBg.fillGradientStyle(0x2d1b69, 0x6B46C1, 0x2d1b69, 0x6B46C1, 0.8);
        footerBg.fillRect(0, 1080 - 40, 1920, 40);
        footerBg.setDepth(999);

        this.add.text(960, 1060, '◆ DXC TECHNOLOGY FAMILY DAY 2025 ◆', {
            fontSize: '14px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            letterSpacing: 2
        }).setOrigin(0.5).setDepth(1000);

        // バージョン表示
        const versionBg = this.add.graphics();
        versionBg.fillStyle(0x000000, 0.7);
        versionBg.fillRoundedRect(10, 10, 80, 30, 5);
        versionBg.setDepth(999);
        
        this.add.text(50, 25, 'v2.1.0', {
            fontSize: '14px',
            fill: '#00FF00',
            fontFamily: 'Courier',
            fontWeight: 'bold'
        }).setOrigin(0.5).setDepth(1000);
        
        // ===== デバッグボタン =====
        
        // Victory Endingデバッグボタン
        const debugVictoryBg = this.add.graphics();
        debugVictoryBg.fillStyle(0x00AA00, 0.8);
        debugVictoryBg.fillRoundedRect(10, 60, 120, 30, 5);
        debugVictoryBg.setDepth(999);
        
        const debugVictoryText = this.add.text(70, 75, 'DEBUG: Victory', {
            fontSize: '12px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold'
        }).setOrigin(0.5).setDepth(1000);
        
        this.add.rectangle(70, 75, 120, 30, 0x000000, 0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                const titleBgm = this.sound.get('titleBgm');
                if (titleBgm) {
                    titleBgm.stop();
                }
                this.scene.start('EndingScene', { 
                    score: 4,
                    difficulty: 'extreme'
                });
            })
            .on('pointerover', () => {
                debugVictoryBg.clear();
                debugVictoryBg.fillStyle(0x00CC00, 1.0);
                debugVictoryBg.fillRoundedRect(10, 60, 120, 30, 5);
            })
            .on('pointerout', () => {
                debugVictoryBg.clear();
                debugVictoryBg.fillStyle(0x00AA00, 0.8);
                debugVictoryBg.fillRoundedRect(10, 60, 120, 30, 5);
            })
            .setDepth(1001);
        
    }

    showDifficultyHint(text) {
        if (this.difficultyHint) {
            this.difficultyHint.setText(text);
            this.tweens.add({
                targets: this.difficultyHint,
                alpha: 1,
                duration: 200
            });
        }
    }

    hideDifficultyHint() {
        if (this.difficultyHint) {
            this.tweens.add({
                targets: this.difficultyHint,
                alpha: 0,
                duration: 200
            });
        }
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
            maxStages: 4,
            difficulty: 'normal' // 選択された難易度
        };
    }

    init(data) {
        // 難易度設定（メニューからのパラメータまたはリトライ時の保持）
        if (data && data.difficulty) {
            this.gameState.difficulty = data.difficulty;
            console.log('Difficulty set:', this.gameState.difficulty); // デバッグ用
        }
        
        // リトライ時のスコアと難易度復元（コンストラクタの後に実行される）
        if (data && data.preserveScore !== undefined) {
            this.gameState.score = data.preserveScore;
            // リトライ時は難易度も保持
            if (data.preserveDifficulty) {
                this.gameState.difficulty = data.preserveDifficulty;
            }
            console.log('Score restored:', this.gameState.score, 'Difficulty:', this.gameState.difficulty); // デバッグ用
        } else {
            // 新規ゲーム開始時はスコアとステージを初期化
            this.gameState.score = 0;
            this.gameState.stage = 1;
        }
        
        // リトライ時はプレイヤー状態をnormalに戻す
        this.gameState.playerState = 'normal';
    }

    create() {
        // ミュート状態をlocalStorageから読み込み
        this.isMuted = localStorage.getItem('gameAudioMuted') === 'true';
        
        // ゲーム背景画像（生成されたサイバー背景を適切なサイズで表示）
        this.add.image(960, 540, 'gameBackground').setScale(1.5).setDepth(-100); // 最背面に配置
        
        // 明転エフェクト（画面開始時）
        const fadeIn = this.add.graphics();
        fadeIn.setDepth(10000);
        
        let fadeAlpha = 1;
        const fadeInStep = () => {
            fadeAlpha -= 0.05;
            fadeIn.clear();
            fadeIn.fillStyle(0x000000, Math.max(0, fadeAlpha));
            fadeIn.fillRect(0, 0, 1920, 1080);
            
            if (fadeAlpha <= 0) {
                fadeIn.destroy();
            } else {
                this.time.delayedCall(16, fadeInStep);
            }
        };
        fadeInStep();
        
        // ゲームBGM再生（控えめ音量でループ）- ミュート状態を考慮
        const existingGameBgm = this.sound.get('gameBgm');
        if (existingGameBgm) {
            // 既存のBGMがある場合は音量を設定し直して再生確認
            existingGameBgm.setVolume(this.isMuted ? 0 : 0.08);
            if (!existingGameBgm.isPlaying) {
                existingGameBgm.play();
            }
        } else {
            // 新規作成
            this.sound.add('gameBgm', { loop: true, volume: this.isMuted ? 0 : 0.08 }).play();
        }

        this.setupUI();
        this.setupCharacters();
        this.setupInput();
        this.startStage();
    }

    update() {
        // フレームカウンター更新
        if (this.gameState.isGameActive && this.frameCounterText && this.frameCounterText.visible) {
            this.frameCounter++;
            const displayFrame = this.frameCounter.toString().padStart(3, '0');
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

        // 敵名表示（敵の上に表示）
        this.enemyNameText = this.add.text(1545, 580, '', {
            fontSize: '40px',
            fill: '#FFFFFF',
            fontFamily: 'Courier New, monospace',
            fontWeight: 'bold',
            stroke: '#FF0000',
            strokeThickness: 4,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 3,
                fill: true
            }
        }).setOrigin(0.5).setVisible(false).setDepth(1000);

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

        // フレーム数表示（デジタル時計風、より大きなサイズ）
        this.frameCounter = 0;
        this.frameCounterText = this.add.text(1845, 990, '', {
            fontSize: '48px',
            fill: '#00FF00',
            fontFamily: 'Courier',
            backgroundColor: '#000000',
            padding: { x: 16, y: 12 },
            stroke: '#008800',
            strokeThickness: 3
        }).setOrigin(1, 1).setVisible(false).setDepth(1000);
    }

    setupCharacters() {
        // プレイヤーキャラクター
        this.player = this.add.image(450, 750, 'heroNormal').setOrigin(0.5).setScale(0.45).setDepth(100);

        // 敵をステージに応じて設定
        this.updateStageAssets();
    }

    updateStageAssets() {
        // 敵の種類をステージに応じて変更（1-4のサイクルで統一）
        const threats = ['pcEnemy', 'serverEnemy', 'netEnemy', 'cloudEnemy'];
        const enemyNames = ['フロッピーディスク', 'ヒューマンエラー', 'マルウェア', 'しぜんさいがい'];
        
        // 全ステージで1-4のサイクルを使用
        const cycleIndex = (this.gameState.stage - 1) % 4;
        const currentThreat = threats[cycleIndex] || 'pcEnemy';
        const currentEnemyName = enemyNames[cycleIndex] || 'フロッピーディスク';

        // 既存のスプライトを削除して新しいものを作成
        if (this.enemy) this.enemy.destroy();

        // 敵キャラクター（主人公と同じ高さに配置）
        this.enemy = this.add.image(1545, 750, currentThreat).setOrigin(0.5).setDepth(100);
        
        // 敵の初期状態をリセット（アニメーション後の状態をクリア）
        this.enemy.setRotation(0);
        this.enemy.setAlpha(1);
        
        // 敵のサイズ調整
        if (currentThreat === 'pcEnemy') {
            this.enemy.setScale(0.3);
        } else if (currentThreat === 'serverEnemy') {
            this.enemy.setScale(0.3); // サーバー敵も同じサイズ
        } else if (currentThreat === 'netEnemy') {
            this.enemy.setScale(0.3); // ネット敵も同じサイズ
        } else if (currentThreat === 'cloudEnemy') {
            this.enemy.setScale(0.3); // クラウド敵も同じサイズ
        } else {
            this.enemy.setScale(1.0); // 他の敵は通常サイズ
        }
        
        // 敵名を設定してテキストを更新
        this.currentEnemyName = currentEnemyName;
        this.enemyNameText.setText(this.currentEnemyName);
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
        
        // 選択された難易度に基づく表示
        let difficultyLabel = '';
        let difficultyColor = '#F59E0B'; // デフォルト色
        
        if (this.gameState.difficulty === 'normal') {
            // 通常難易度（表示なし）
            difficultyLabel = '';
        } else if (this.gameState.difficulty === 'hard') {
            // ハード難易度
            difficultyLabel = 'ハードモード';
            difficultyColor = '#FF6B35';
        } else if (this.gameState.difficulty === 'extreme') {
            // エクストリーム難易度
            difficultyLabel = 'エクストリームモード';
            difficultyColor = '#FF0000';
        }
        
        // ステージ名表示
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
        
        // 敵名を表示開始
        this.enemyNameText.setVisible(true);
        
        this.showMessage(`レベル ${this.gameState.stage}: ${stageName}をまもろう`, 3000, () => {
            // 敵名を非表示にする
            this.enemyNameText.setVisible(false);
            // BGM音量を下げて緊張感を演出（ミュート時は何もしない）
            const gameBgm = this.sound.get('gameBgm');
            if (gameBgm && !this.isMuted) {
                this.tweens.add({
                    targets: gameBgm,
                    volume: 0.02,
                    duration: 500,
                    ease: 'Power1.easeOut'
                });
            }
            
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
        console.log(`showBuildupSequence called - Stage: ${this.gameState.stage}, Difficulty: ${this.gameState.difficulty}`);
        
        // ハード・エクストリーム難易度では警告演出をスキップ
        if (this.gameState.difficulty === 'hard' || this.gameState.difficulty === 'extreme') {
            console.log('Hard/Extreme mode - skipping buildup animation');
            // ランダムな待機時間（2.5〜4秒）で緊張感を持たせる
            const randomWaitTime = 2500 + Math.random() * 1500;
            
            // お手付き判定を1秒前から開始
            this.time.delayedCall(Math.max(0, randomWaitTime - 1000), () => {
                console.log('Setting waiting state for hard/extreme mode');
                this.gameState.isWaiting = true;
            });
            
            this.time.delayedCall(randomWaitTime, () => {
                console.log('Calling showWarningSignal from hard/extreme mode');
                // 直接シグナル表示
                this.showWarningSignal();
            });
            return;
        }
        
        console.log('Normal mode - starting buildup animation');
        // 通常難易度の演出
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
        console.log(`showWarningSignal called - Stage: ${this.gameState.stage}, Difficulty: ${this.gameState.difficulty}, isWaiting: ${this.gameState.isWaiting}, isGameActive: ${this.gameState.isGameActive}`);
        
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
        this.frameCounterText.setText('000');
        
        this.gameState.isGameActive = true;
        
        console.log(`Game state set to active - Stage: ${this.gameState.stage}, isGameActive: ${this.gameState.isGameActive}`);
        
        // 選択された難易度に応じた制限時間（ステージに応じてフレーム数調整）
        let targetFrames;
        
        if (this.gameState.difficulty === 'normal') {
            // 通常難易度: ステージ1-4の進行パターン
            const normalFrames = [120, 90, 60, 40];
            const stageIndex = ((this.gameState.stage - 1) % 4);
            targetFrames = normalFrames[stageIndex];
        } else if (this.gameState.difficulty === 'hard') {
            // ハード難易度: ステージ5-8の進行パターン
            const hardFrames = [20, 18, 16, 14];
            const stageIndex = ((this.gameState.stage - 1) % 4);
            targetFrames = hardFrames[stageIndex];
        } else if (this.gameState.difficulty === 'extreme') {
            // エクストリーム難易度: ステージ9-12の進行パターン
            const extremeFrames = [14, 13, 12, 11];
            const stageIndex = ((this.gameState.stage - 1) % 4);
            targetFrames = extremeFrames[stageIndex];
        } else {
            // デフォルトは通常難易度
            const normalFrames = [120, 90, 60, 40];
            const stageIndex = ((this.gameState.stage - 1) % 4);
            targetFrames = normalFrames[stageIndex];
        }
        
        // ターゲットフレーム数を保存（判定用）
        this.targetFrames = targetFrames;
        
        // 拡張制限時間 = 通常制限 + 引き分け1フレーム + 失敗後30フレーム
        const extendedFrames = targetFrames + 31;
        const extendedTimeLimit = Math.round(extendedFrames * 16.67);
        
        console.log(`Setting unified timer - Stage: ${this.gameState.stage}, Difficulty: ${this.gameState.difficulty}, targetFrames: ${targetFrames}, extendedFrames: ${extendedFrames}, timeLimit: ${extendedTimeLimit}ms`);
        
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
        // 失敗効果音を再生（ミュート状態を考慮）
        if (!this.isMuted) {
            this.sound.play('failSE', { volume: 0.5 });
        }
        
        // BGM音量を即座に元に戻す（tweenをkillしてから設定）
        const gameBgm = this.sound.get('gameBgm');
        if (gameBgm && !this.isMuted) {
            this.tweens.killTweensOf(gameBgm);
            gameBgm.setVolume(0.08);
        }
        
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
        
        this.showMessage('まだだよ！きをつけて！', 1500, () => {
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
                // メッセージが消えるときにBGM音量を下げる（ミュート時は何もしない）
                const gameBgm = this.sound.get('gameBgm');
                if (gameBgm && !this.isMuted) {
                    this.tweens.add({
                        targets: gameBgm,
                        volume: 0.02,
                        duration: 300,
                        ease: 'Power1.easeOut'
                    });
                }
                
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
                // メッセージが消えるときにBGM音量を下げる（ミュート時は何もしない）
                const gameBgm = this.sound.get('gameBgm');
                if (gameBgm && !this.isMuted) {
                    this.tweens.add({
                        targets: gameBgm,
                        volume: 0.02,
                        duration: 300,
                        ease: 'Power1.easeOut'
                    });
                }
                
                this.showGameOverOptions();
            });
        }
    }

    onDefenseDraw() {
        // 引き分け効果音を再生（ミュート状態を考慮）
        if (!this.isMuted) {
            this.sound.play('drawSE', { volume: 0.4 });
        }
        
        // BGM音量を即座に戻す（ミュート時は何もしない）
        const gameBgm = this.sound.get('gameBgm');
        if (gameBgm && !this.isMuted) {
            this.tweens.add({
                targets: gameBgm,
                volume: 0.08,
                duration: 200,
                ease: 'Power2.easeIn'
            });
        }
        
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
            // 引き分けメッセージをシグナルクリア直前まで表示（2300ms）
            this.showMessage('ひきわけ！もういちど！', 2300, () => {
                // メッセージが消えるときにBGM音量を下げる（ミュート時は何もしない）
                const gameBgm = this.sound.get('gameBgm');
                if (gameBgm && !this.isMuted) {
                    this.tweens.add({
                        targets: gameBgm,
                        volume: 0.02,
                        duration: 300,
                        ease: 'Power1.easeOut'
                    });
                }
                
                // プレイヤー状態を通常に戻してから再プレイ
                this.gameState.playerState = 'normal';
                this.updateCharacterSprites();
                
                // スコアは変更せず、同じステージを再プレイ
                // 100ms後にstartDefenseRound()でシグナルと同時にクリア
                this.time.delayedCall(100, () => {
                    this.startDefenseRound();
                });
            });
        });
    }

    onDefenseSuccess(reactionFrames) {
        // 成功効果音を再生（ミュート状態を考慮）
        if (!this.isMuted) {
            this.sound.play('successSE', { volume: 0.3 });
        }
        
        // BGM音量を即座に戻す（ミュート時は何もしない）
        const gameBgm = this.sound.get('gameBgm');
        if (gameBgm && !this.isMuted) {
            this.tweens.add({
                targets: gameBgm,
                volume: 0.08,
                duration: 200,
                ease: 'Power2.easeIn'
            });
        }
        
        // 即座にガードポーズに切り替え（画面揺れと同時）
        this.gameState.playerState = 'defending';
        this.updateCharacterSprites();
        
        // クリック時の画面揺らしエフェクト
        this.cameras.main.shake(400, 0.02);
        
        console.log(`Defense successful - Stage: ${this.gameState.stage}, Reaction: ${reactionFrames}, Target: ${this.targetFrames}`);
        
        // 成功時の処理
        this.gameState.isGameActive = false;
        
        // 成功時のシグナル表示
        this.signalText.setText('✓')
            .setFill('#00FF00');
        
        // 背景を緑に変更
        this.signalGraphics.clear();
        this.signalGraphics.fillStyle(0x00FF00, 0.3);
        this.signalGraphics.fillCircle(960, 270, 120);
        
        // 点滅停止
        this.tweens.killTweensOf([this.signalText, this.signalGraphics]);
        this.signalText.setAlpha(1);
        this.signalGraphics.setAlpha(1);
        
        // シールドエフェクト
        this.showShieldEffect();
        
        // 敵の状態のみ更新（プレイヤーはガードポーズを維持）
        this.gameState.enemyState = 'ko';
        
        // 敵の吹っ飛ばしアニメーション（ぐるぐる回りながら右上に消える）- 成功した瞬間に開始
        if (this.enemy) {
            // 回転アニメーション（高速）
            this.tweens.add({
                targets: this.enemy,
                rotation: Math.PI * 8, // 4回転に増加
                duration: 600, // 半分の時間
                ease: 'Power3.easeOut'
            });
            
            // 移動アニメーション（右上に飛ぶ、より遠くへ）
            this.tweens.add({
                targets: this.enemy,
                x: this.enemy.x + 600, // より遠くに飛ぶ
                y: this.enemy.y - 400, // より高く飛ぶ
                duration: 600, // 半分の時間
                ease: 'Power3.easeOut'
            });
            
            // サイズと透明度アニメーション（小さくなりながら消える）
            this.tweens.add({
                targets: this.enemy,
                scaleX: 0.05,
                scaleY: 0.05,
                alpha: 0,
                duration: 600, // 半分の時間
                ease: 'Power3.easeOut'
            });
        }
        
        this.time.delayedCall(800, () => {
            
            this.time.delayedCall(700, () => {
                // リアクションタイム評価
                let reactionMessage = 'まもった！';
                if (reactionFrames <= 30) { // 0.5秒以内
                    reactionMessage = 'はやい！まもった！';
                } else if (reactionFrames <= 60) { // 1秒以内
                    reactionMessage = 'いいタイミング！まもった！';
                }
                
                this.showMessage(reactionMessage, 1800, () => {
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
        // 失敗効果音を再生（ミュート状態を考慮）
        if (!this.isMuted) {
            this.sound.play('failSE', { volume: 0.5 });
        }
        
        // BGM音量を即座に戻す（ミュート時は何もしない）
        const gameBgm = this.sound.get('gameBgm');
        if (gameBgm && !this.isMuted) {
            this.tweens.add({
                targets: gameBgm,
                volume: 0.08,
                duration: 200,
                ease: 'Power2.easeIn'
            });
        }
        
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
            this.frameCounterText.setText(String(reactionFrames).padStart(3, '0'));
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
            
            // メッセージをシグナルクリア直前まで表示（2900ms）
            this.showMessage(failMessage, 2900, () => {
                // メッセージが消えるときにBGM音量を下げる（ミュート時は何もしない）
                const gameBgm = this.sound.get('gameBgm');
                if (gameBgm && !this.isMuted) {
                    this.tweens.add({
                        targets: gameBgm,
                        volume: 0.02,
                        duration: 300,
                        ease: 'Power1.easeOut'
                    });
                }
                
                // 2回目のチャンス - damagedの状態を維持
                this.gameState.enemyState = 'normal';
                this.updateCharacterSprites();
                
                // 100ms後にstartDefenseRound()でシグナルと同時にクリア
                this.time.delayedCall(100, () => {
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
            
            // メッセージをゲームオーバー画面表示直前まで表示（1900ms）
            this.showMessage(gameOverMessage, 1900, () => {
                // メッセージが消えるときにBGM音量を下げる（ミュート時は何もしない）
                const gameBgm = this.sound.get('gameBgm');
                if (gameBgm && !this.isMuted) {
                    this.tweens.add({
                        targets: gameBgm,
                        volume: 0.02,
                        duration: 300,
                        ease: 'Power1.easeOut'
                    });
                }
                
                // 100ms後にゲームオーバー画面表示でシグナルクリア
                this.time.delayedCall(100, () => {
                    // シグナルクリア
                    this.signalText.setVisible(false);
                    this.signalGraphics.setVisible(false);
                    this.signalGraphics.clear();
                    this.showGameOverOptions();
                });
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
        
        // 4ステージクリアでエンディングへ
        if (this.gameState.stage > 4) {
            this.scene.start('EndingScene', { score: this.gameState.score, difficulty: this.gameState.difficulty });
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
                // ゲームBGMを停止
                const gameBgm = this.sound.get('gameBgm');
                if (gameBgm) {
                    gameBgm.stop();
                }
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
        // BGM音量を正常に戻す
        const gameBgm = this.sound.get('gameBgm');
        if (gameBgm) {
            gameBgm.setVolume(this.isMuted ? 0 : 0.08);
        }
        
        // 現在のスコアと難易度を保持してステージを再開
        const currentScore = this.gameState.score;
        const currentDifficulty = this.gameState.difficulty;
        this.scene.restart({ 
            preserveScore: currentScore,
            preserveDifficulty: currentDifficulty,
            difficulty: currentDifficulty // リトライ時も難易度を渡す
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
        this.currentDifficulty = data.difficulty || 'normal';
    }

    create() {
        // 背景色
        this.add.rectangle(960, 540, 1920, 1080, 0x1a1a2e);
        
        // エンディングカードを左側に配置（画面内に収める）
        this.add.image(420, 540, 'endingCard')
            .setOrigin(0.5)
            .setScale(0.4)
            .setRotation(-0.05); // 軽い傾き
        
        // スタンプを右側に配置（適度な大きさ）
        this.add.image(1380, 540, 'stamp')
            .setOrigin(0.5)
            .setScale(1.8)
            .setRotation(0.1); // 軽い傾き
        
        // タイトルロゴを左下に配置
        this.add.image(280, 920, 'titleLogo')
            .setOrigin(0.5)
            .setScale(0.4)
            .setRotation(-0.03); // 極軽い傾き

        this.showVictoryEnding();
    }

    showVictoryEnding() {
        // メインメッセージ（左上）- フェードイン + 拡大
        const mainMessage = this.add.text(450, 140, 'あそんでくれてありがとう！', {
            fontSize: '64px',
            fill: '#FFFFFF',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 8,
            shadow: {
                offsetX: 5,
                offsetY: 5,
                color: '#000000',
                blur: 10,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5).setAlpha(0).setScale(0.8);

        // メインメッセージのアニメーション
        this.tweens.add({
            targets: mainMessage,
            alpha: 1,
            scale: 1.0,
            duration: 800,
            ease: 'Back.easeOut'
        });

        // スタンプメッセージ（左上）- 遅れてフェードイン + バウンス
        const stampMessage = this.add.text(450, 240, 'スタンプをおしてね！', {
            fontSize: '40px',
            fill: '#FFD700',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 6,
            shadow: {
                offsetX: 4,
                offsetY: 4,
                color: '#000000',
                blur: 8,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5).setAlpha(0).setScale(0.5);

        // スタンプメッセージのアニメーション（遅延）
        this.tweens.add({
            targets: stampMessage,
            alpha: 1,
            scale: 1.0,
            duration: 600,
            delay: 400,
            ease: 'Back.easeOut'
        });

        // スタンプメッセージの点滅効果
        this.tweens.add({
            targets: stampMessage,
            scale: 1.1,
            duration: 1000,
            delay: 1200,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // ボタン配置（下の方）
        const challengeButton = this.add.image(760, 850, 'textlessButton')
            .setOrigin(0.5)
            .setScale(1.4)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                const gameBgm = this.sound.get('gameBgm');
                if (gameBgm) {
                    gameBgm.stop();
                }
                const nextDifficulty = this.getNextDifficulty();
                this.scene.start('GameScene', { difficulty: nextDifficulty });
            })
            .on('pointerover', () => {
                challengeButton.setScale(1.5);
            })
            .on('pointerout', () => {
                challengeButton.setScale(1.4);
            });

        this.add.text(760, 850, 'チャレンジ！', {
            fontSize: '36px',
            fill: '#FFFFFF',
            fontFamily: 'Arial Black',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        const titleButton = this.add.image(1160, 850, 'textlessButton')
            .setOrigin(0.5)
            .setScale(1.4)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                const gameBgm = this.sound.get('gameBgm');
                if (gameBgm) {
                    gameBgm.stop();
                }
                this.scene.start('MenuScene');
            })
            .on('pointerover', () => {
                titleButton.setScale(1.5);
            })
            .on('pointerout', () => {
                titleButton.setScale(1.4);
            });

        this.add.text(1160, 850, 'おわり', {
            fontSize: '36px',
            fill: '#FFFFFF',
            fontFamily: 'Arial Black',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // 祝福アニメーション
        this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                this.createCelebrationParticle();
            }
        });
    }


    getNextDifficulty() {
        if (this.currentDifficulty === 'normal') {
            return 'hard';
        } else if (this.currentDifficulty === 'hard') {
            return 'extreme';
        } else {
            return 'extreme'; // エクストリームはそのまま
        }
    }

    createCelebrationParticle() {
        const colors = [0xFFD700, 0xFF69B4, 0x00CED1, 0xFFA500, 0x32CD32];
        const x = Phaser.Math.Between(100, 1820);
        const particle = this.add.circle(x, -20, 8, Phaser.Math.RND.pick(colors));
        
        this.tweens.add({
            targets: particle,
            y: 1100,
            x: x + Phaser.Math.Between(-100, 100),
            duration: Phaser.Math.Between(3000, 5000),
            ease: 'Sine.easeIn',
            onComplete: () => {
                particle.destroy();
            }
        });

        this.tweens.add({
            targets: particle,
            scaleX: Phaser.Math.FloatBetween(0.5, 1.5),
            scaleY: Phaser.Math.FloatBetween(0.5, 1.5),
            duration: Phaser.Math.Between(500, 1500),
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
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
    width: 1920,
    height: 1080,
    backgroundColor: '#1a1a2e',
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: { width: 624, height: 351 },    // 65%サイズ
        max: { width: 1248, height: 702 }    // 65%サイズ
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
