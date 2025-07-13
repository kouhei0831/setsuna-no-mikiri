/**
 * 静的アセット生成スクリプト
 * Node.jsで実行してPNG画像ファイルを生成
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Modulesで__dirnameを取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// シンプルなSVG画像を生成してPNGに変換する代替案
class StaticAssetGenerator {
    
    static COLORS = {
        DXC_PURPLE: '#6B46C1',
        DXC_LIGHT_PURPLE: '#8B5CF6',
        WHITE: '#FFFFFF',
        SUCCESS_GREEN: '#10B981',
        ERROR_RED: '#EF4444',
        WARNING_YELLOW: '#F59E0B'
    };

    /**
     * SVG形式でボタンを生成
     */
    static generateSignalButtonSVG(size = 100, state = 'normal') {
        let fillColor, strokeColor;
        
        switch(state) {
            case 'active':
                fillColor = this.COLORS.WARNING_YELLOW;
                strokeColor = this.COLORS.DXC_PURPLE;
                break;
            case 'success':
                fillColor = this.COLORS.SUCCESS_GREEN;
                strokeColor = this.COLORS.WHITE;
                break;
            case 'error':
                fillColor = this.COLORS.ERROR_RED;
                strokeColor = this.COLORS.WHITE;
                break;
            default:
                fillColor = this.COLORS.DXC_PURPLE;
                strokeColor = this.COLORS.WHITE;
        }

        const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 4}" 
            fill="${fillColor}" 
            stroke="${strokeColor}" 
            stroke-width="3"/>
    ${state === 'active' ? `<circle cx="${size/2 - size/8}" cy="${size/2 - size/8}" r="${size/4}" fill="rgba(255,255,255,0.3)"/>` : ''}
</svg>`;
        
        return svg.trim();
    }

    /**
     * プレイヤーキャラクタースプライトのSVG生成
     */
    static generatePlayerCharacterSVG(width = 64, height = 64) {
        const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- メインボディ -->
    <circle cx="${width/2}" cy="${height/2}" r="${width/3}" fill="${this.COLORS.DXC_LIGHT_PURPLE}"/>
    
    <!-- 目 -->
    <circle cx="${width/2 - 8}" cy="${height/2 - 4}" r="4" fill="${this.COLORS.WHITE}"/>
    <circle cx="${width/2 + 8}" cy="${height/2 - 4}" r="4" fill="${this.COLORS.WHITE}"/>
    
    <!-- 瞳 -->
    <circle cx="${width/2 - 8}" cy="${height/2 - 4}" r="2" fill="#000000"/>
    <circle cx="${width/2 + 8}" cy="${height/2 - 4}" r="2" fill="#000000"/>
    
    <!-- 口 -->
    <path d="M ${width/2 - 6} ${height/2 + 6} Q ${width/2} ${height/2 + 12} ${width/2 + 6} ${height/2 + 6}" 
          stroke="#000000" stroke-width="2" fill="none"/>
</svg>`;
        
        return svg.trim();
    }

    /**
     * 敵キャラクター1: パソコン
     */
    static generateEnemyPcSVG(width = 64, height = 64) {
        const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- モニター -->
    <rect x="${width/6}" y="${height/6}" width="${width*2/3}" height="${height/2}" 
          fill="#2D3748" stroke="#4A5568" stroke-width="2" rx="3"/>
    
    <!-- 画面 -->
    <rect x="${width/6 + 4}" y="${height/6 + 4}" width="${width*2/3 - 8}" height="${height/2 - 8}" 
          fill="#1A202C"/>
    
    <!-- 目（画面内） -->
    <circle cx="${width/2 - 8}" cy="${height/3}" r="3" fill="${this.COLORS.WARNING_YELLOW}"/>
    <circle cx="${width/2 + 8}" cy="${height/3}" r="3" fill="${this.COLORS.WARNING_YELLOW}"/>
    
    <!-- スタンド -->
    <rect x="${width/2 - 3}" y="${height*2/3}" width="6" height="${height/6}" fill="#4A5568"/>
    
    <!-- ベース -->
    <rect x="${width/3}" y="${height*5/6}" width="${width/3}" height="${height/12}" 
          fill="#4A5568" rx="2"/>
    
    <!-- DXCアクセント -->
    <rect x="${width/6 + 2}" y="${height/6 + 2}" width="4" height="4" fill="${this.COLORS.DXC_PURPLE}"/>
</svg>`;
        
        return svg.trim();
    }

    /**
     * 敵キャラクター2: サーバー
     */
    static generateEnemyServerSVG(width = 64, height = 64) {
        const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- サーバー本体 -->
    <rect x="${width/6}" y="${height/8}" width="${width*2/3}" height="${height*3/4}" 
          fill="#1A202C" stroke="#4A5568" stroke-width="2" rx="3"/>
    
    <!-- サーバー区切り線 -->
    <line x1="${width/6}" y1="${height/3}" x2="${width*5/6}" y2="${height/3}" 
          stroke="#4A5568" stroke-width="1"/>
    <line x1="${width/6}" y1="${height*2/3}" x2="${width*5/6}" y2="${height*2/3}" 
          stroke="#4A5568" stroke-width="1"/>
    
    <!-- LEDライト（目として機能） -->
    <circle cx="${width/2 - 8}" cy="${height/4}" r="3" fill="${this.COLORS.SUCCESS_GREEN}"/>
    <circle cx="${width/2 + 8}" cy="${height/4}" r="3" fill="${this.COLORS.SUCCESS_GREEN}"/>
    
    <!-- 追加のLEDライト -->
    <circle cx="${width/2 - 4}" cy="${height/2}" r="2" fill="#3182CE"/>
    <circle cx="${width/2 + 4}" cy="${height/2}" r="2" fill="#3182CE"/>
    
    <!-- 電源ランプ -->
    <circle cx="${width*5/6 - 6}" cy="${height/4}" r="2" fill="${this.COLORS.WARNING_YELLOW}"/>
</svg>`;
        
        return svg.trim();
    }

    /**
     * 敵キャラクター3: ノートPC
     */
    static generateEnemyLaptopSVG(width = 64, height = 64) {
        const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- ノートPC下部（キーボード部分） -->
    <ellipse cx="${width/2}" cy="${height*3/4}" rx="${width/3}" ry="${height/8}" 
             fill="#4A5568" stroke="#2D3748" stroke-width="2"/>
    
    <!-- ノートPC上部（画面部分） -->
    <rect x="${width/5}" y="${height/5}" width="${width*3/5}" height="${height/2}" 
          fill="#2D3748" stroke="#4A5568" stroke-width="2" rx="3"/>
    
    <!-- 画面 -->
    <rect x="${width/5 + 3}" y="${height/5 + 3}" width="${width*3/5 - 6}" height="${height/2 - 6}" 
          fill="#1A202C"/>
    
    <!-- 目（画面内） -->
    <circle cx="${width/2 - 6}" cy="${height*2/5}" r="3" fill="${this.COLORS.DXC_PURPLE}"/>
    <circle cx="${width/2 + 6}" cy="${height*2/5}" r="3" fill="${this.COLORS.DXC_PURPLE}"/>
    
    <!-- キーボード表現 -->
    <rect x="${width/2 - 8}" y="${height*3/4 - 3}" width="4" height="2" fill="#2D3748"/>
    <rect x="${width/2}" y="${height*3/4 - 3}" width="4" height="2" fill="#2D3748"/>
    <rect x="${width/2 + 8}" y="${height*3/4 - 3}" width="4" height="2" fill="#2D3748"/>
    
    <!-- DXCロゴ風装飾 -->
    <rect x="${width*4/5 - 8}" y="${height/5 + 6}" width="6" height="3" fill="${this.COLORS.DXC_PURPLE}"/>
</svg>`;
        
        return svg.trim();
    }

    /**
     * 敵キャラクター4: クラウド（ボスキャラ）
     */
    static generateEnemyCloudSVG(width = 64, height = 64) {
        const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- 雲の形（複数の円で構成） -->
    <circle cx="${width/3}" cy="${height/2}" r="${width/6}" fill="${this.COLORS.WHITE}" opacity="0.9"/>
    <circle cx="${width/2}" cy="${height/2 - 4}" r="${width/5}" fill="${this.COLORS.WHITE}" opacity="0.9"/>
    <circle cx="${width*2/3}" cy="${height/2}" r="${width/6}" fill="${this.COLORS.WHITE}" opacity="0.9"/>
    <circle cx="${width/2}" cy="${height*2/3}" r="${width/8}" fill="${this.COLORS.WHITE}" opacity="0.9"/>
    
    <!-- 目 -->
    <circle cx="${width/2 - 8}" cy="${height/2 - 2}" r="3" fill="#3182CE"/>
    <circle cx="${width/2 + 8}" cy="${height/2 - 2}" r="3" fill="#3182CE"/>
    
    <!-- データ粒子（浮遊している感じ） -->
    <circle cx="${width/4}" cy="${height/3}" r="1.5" fill="${this.COLORS.DXC_PURPLE}"/>
    <circle cx="${width*3/4}" cy="${height/3}" r="1.5" fill="${this.COLORS.DXC_PURPLE}"/>
    <circle cx="${width/5}" cy="${height*2/3}" r="1" fill="${this.COLORS.SUCCESS_GREEN}"/>
    <circle cx="${width*4/5}" cy="${height*2/3}" r="1" fill="${this.COLORS.SUCCESS_GREEN}"/>
    
    <!-- キラキラエフェクト -->
    <path d="M ${width/4} ${height/4} L ${width/4 + 2} ${height/4 + 4} L ${width/4 - 2} ${height/4 + 4} Z" 
          fill="${this.COLORS.WARNING_YELLOW}"/>
    <path d="M ${width*3/4} ${height*3/4} L ${width*3/4 + 2} ${height*3/4 + 4} L ${width*3/4 - 2} ${height*3/4 + 4} Z" 
          fill="${this.COLORS.WARNING_YELLOW}"/>
</svg>`;
        
        return svg.trim();
    }

    /**
     * 星のパーティクルSVG生成
     */
    static generateStarParticleSVG(size = 16) {
        const centerX = size / 2;
        const centerY = size / 2;
        const outerRadius = size / 2 - 2;
        const innerRadius = outerRadius * 0.4;
        
        let pathData = '';
        for (let i = 0; i < 10; i++) {
            const angle = (i * Math.PI) / 5;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            if (i === 0) {
                pathData += `M ${x} ${y}`;
            } else {
                pathData += ` L ${x} ${y}`;
            }
        }
        pathData += ' Z';

        const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <path d="${pathData}" 
          fill="${this.COLORS.WARNING_YELLOW}" 
          stroke="${this.COLORS.WHITE}" 
          stroke-width="1"/>
</svg>`;
        
        return svg.trim();
    }

    /**
     * すべてのアセットを生成
     */
    static generateAllAssets() {
        const assetsDir = path.join(__dirname, '..', '..', 'assets', 'images');
        
        // ディレクトリ作成
        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
        }

        // シグナルボタン各状態
        const buttonStates = ['normal', 'active', 'success', 'error'];
        buttonStates.forEach(state => {
            const svg = this.generateSignalButtonSVG(120, state);
            fs.writeFileSync(path.join(assetsDir, `signal_button_${state}.svg`), svg);
        });

        // プレイヤーキャラクター
        const playerSvg = this.generatePlayerCharacterSVG(64, 64);
        fs.writeFileSync(path.join(assetsDir, 'player_character.svg'), playerSvg);

        // 敵キャラクター各種
        const enemySvg1 = this.generateEnemyPcSVG(64, 64);
        fs.writeFileSync(path.join(assetsDir, 'enemy_pc.svg'), enemySvg1);

        const enemySvg2 = this.generateEnemyServerSVG(64, 64);
        fs.writeFileSync(path.join(assetsDir, 'enemy_server.svg'), enemySvg2);

        const enemySvg3 = this.generateEnemyLaptopSVG(64, 64);
        fs.writeFileSync(path.join(assetsDir, 'enemy_laptop.svg'), enemySvg3);

        const enemySvg4 = this.generateEnemyCloudSVG(64, 64);
        fs.writeFileSync(path.join(assetsDir, 'enemy_cloud.svg'), enemySvg4);

        // 星パーティクル各サイズ
        const starSizes = [16, 24, 32];
        starSizes.forEach((size, index) => {
            const svg = this.generateStarParticleSVG(size);
            const sizeNames = ['small', 'medium', 'large'];
            fs.writeFileSync(path.join(assetsDir, `star_particle_${sizeNames[index]}.svg`), svg);
        });

        console.log('アセット生成完了: assets/images/');
    }
}

// ES Modulesでmain判定
if (import.meta.url === `file://${process.argv[1]}`) {
    StaticAssetGenerator.generateAllAssets();
}

export default StaticAssetGenerator;
