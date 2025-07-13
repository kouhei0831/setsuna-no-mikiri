/**
 * 刹那の見切り - 音声アセット生成ユーティリティ
 * Web Audio APIを使用してゲーム用効果音を動的生成
 */

class AudioAssetGenerator {
    constructor() {
        this.audioContext = null;
        this.init();
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    /**
     * 成功音を生成 - 明るく達成感のある「キュイン！」音
     */
    createSuccessSound() {
        if (!this.audioContext) return null;

        const duration = 0.5; // 0.5秒
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
        const data = buffer.getChannelData(0);

        // メロディックな成功音（周波数が上昇）
        for (let i = 0; i < buffer.length; i++) {
            const time = i / sampleRate;
            const frequency1 = 523 + (time * 400); // C5から上昇
            const frequency2 = 659 + (time * 200); // E5から上昇
            
            // エンベロープ（音量変化）
            const envelope = Math.max(0, 1 - (time / duration)) * Math.exp(-time * 3);
            
            // 2つの周波数を重ねる
            data[i] = envelope * (
                Math.sin(2 * Math.PI * frequency1 * time) * 0.3 +
                Math.sin(2 * Math.PI * frequency2 * time) * 0.2 +
                Math.sin(2 * Math.PI * (frequency1 * 2) * time) * 0.1 // ハーモニクス
            );
        }

        return buffer;
    }

    /**
     * 失敗音を生成 - 低音で残念感のある「ブー」音
     */
    createFailSound() {
        if (!this.audioContext) return null;

        const duration = 0.8; // 0.8秒
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
        const data = buffer.getChannelData(0);

        // 下降する失敗音
        for (let i = 0; i < buffer.length; i++) {
            const time = i / sampleRate;
            const frequency = 220 - (time * 80); // A3から下降
            
            // エンベロープ
            const envelope = Math.max(0, 1 - (time / duration)) * Math.exp(-time * 1.5);
            
            // 矩形波っぽい音でブザー感を演出
            data[i] = envelope * (
                Math.sign(Math.sin(2 * Math.PI * frequency * time)) * 0.3 +
                Math.sin(2 * Math.PI * frequency * time) * 0.2
            );
        }

        return buffer;
    }

    /**
     * ボタンクリック音を生成 - 軽やかなクリック音
     */
    createButtonClickSound() {
        if (!this.audioContext) return null;

        const duration = 0.1; // 0.1秒
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
        const data = buffer.getChannelData(0);

        // 短いクリック音
        for (let i = 0; i < buffer.length; i++) {
            const time = i / sampleRate;
            const frequency = 800; // 800Hz
            
            // 急速に減衰するエンベロープ
            const envelope = Math.exp(-time * 50);
            
            data[i] = envelope * Math.sin(2 * Math.PI * frequency * time) * 0.3;
        }

        return buffer;
    }

    /**
     * 音声バッファを再生
     */
    playSound(buffer) {
        if (!this.audioContext || !buffer) return;

        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        
        source.buffer = buffer;
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // ボリューム調整
        gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
        
        source.start();
    }

    /**
     * 音声ファイルとして保存するためのWAVエンコーダー
     */
    encodeWAV(buffer) {
        const length = buffer.length;
        const arrayBuffer = new ArrayBuffer(44 + length * 2);
        const view = new DataView(arrayBuffer);
        const data = buffer.getChannelData(0);

        // WAVヘッダー
        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };

        writeString(0, 'RIFF');
        view.setUint32(4, 36 + length * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, buffer.sampleRate, true);
        view.setUint32(28, buffer.sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, length * 2, true);

        // PCMデータ
        let offset = 44;
        for (let i = 0; i < length; i++) {
            const sample = Math.max(-1, Math.min(1, data[i]));
            view.setInt16(offset, sample * 0x7FFF, true);
            offset += 2;
        }

        return arrayBuffer;
    }

    /**
     * 音声ファイルをダウンロード
     */
    downloadSound(buffer, filename) {
        const wav = this.encodeWAV(buffer);
        const blob = new Blob([wav], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    /**
     * 全ての必須音声アセットを生成してダウンロード
     */
    generateAllSounds() {
        const sounds = [
            { name: 'success_sound.wav', generator: () => this.createSuccessSound() },
            { name: 'fail_sound.wav', generator: () => this.createFailSound() },
            { name: 'button_click.wav', generator: () => this.createButtonClickSound() }
        ];

        sounds.forEach(sound => {
            const buffer = sound.generator();
            if (buffer) {
                this.downloadSound(buffer, sound.name);
            }
        });
    }
}

// 使用例
// const audioGen = new AudioAssetGenerator();
// audioGen.generateAllSounds(); // 全ての音声ファイルをダウンロード

export default AudioAssetGenerator;
