import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'sosaeng-oriental-clinic-secret-key-32chars'; // 32 characters
const IV_LENGTH = 16; // For AES, this is always 16

/**
 * 데이터를 암호화합니다.
 * @param text 암호화할 텍스트
 * @returns 암호화된 데이터 (iv:encryptedData 형식)
 */
export function encrypt(text: string): string {
    if (!text) return text;

    try {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    } catch (error) {
        console.error('Encryption error:', error);
        return text; // 실패 시 원본 반환 (주의: 운영 환경에서는 에러 처리가 필요함)
    }
}

/**
 * 데이터를 복호화합니다.
 * @param text 복호화할 텍스트 (iv:encryptedData 형식)
 * @returns 복호화된 텍스트
 */
export function decrypt(text: string): string {
    if (!text || !text.includes(':')) return text;

    try {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift()!, 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        console.error('Decryption error:', error);
        return text; // 실패 시 암호화된 텍스트 그대로 반환
    }
}
