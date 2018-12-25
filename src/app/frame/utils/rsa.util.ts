/**
 * rsa加密解密
 */
declare var JSEncrypt: any;

export class RsaUtil {

    // 公钥
    private static publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlSfUJ3rvG6YpGOyQIfQe/FA+asDeHjhiMPohdvcDUNomMRuUuK5Jrl7FYoJZFN0QmiTs2' +
        'ZLQoQW8+YG5xLkFUJyBFuA6FctL9F8Soy1FgcoHXPAHok4npUco4uyt3f29OURTb14urjF6wdJT8YmKSZcDMWul/jrUWh5zS96MZowIDAQAB';

    // 私钥
    private static privateKey: string = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAOVJ9Qneu8bpikY7JAh9B78UD5qwN4eOGIw' +
        '+iF29wNQ2iYxG5S4rkmuXsViglkU3RCaJOzZktChBbz5gbnEuQVQnIEW4DoVy0v0XxKjLUWBygdc8AeiTielRyji7K3d/b05RFNvXi6uMXrB0lPxiYpJlwMxa6X' +
        '+OtRaHnNL3oxmjAgMBAAECgYBjdIf4Rwe2SRi0S/TeRbV1eXMnSuZbQxR8yKcH2kXpBtr04M+KDlZNmxfO9KEZ1tYVzRLFDjti9rcVHGjraP' +
        '/meX4B3j3YvOj8sk6bEmI3GDhIRp5Na13nvCwJRDQJZYGgybEtM6VKCQ15KR4rV6h1m+LNdlH8w+yHo9nRmYy2YQJBAPRa+MkI4koIgEyeX4ueknLl' +
        '/mVfJShB0bwqvm4JQ04XTSMJt1rI59DRX6/1QijbC6jLe5KrdRjwabyo4/JhPnMCQQDwNy5d36JcK4Hsjqy7oT' +
        '+k7cQLqgMwrgQGFgN0COSY2BHKy0IgSaSmx9vFoSxV05f0HQba0RLBQkdnudNziTwRAkAH8v2s7JEP/37M/0n0bNAu1LSV76ZxzNJZ4LoZMkvyOmfT//jrByYjcOw' +
        '/+SaR1a5na1c1ykYg7ZFDBeuEcw1pAkEA5FYPpPvnAWX54jrcxp3IOaYpLE03Kxa+jGpwbePmJ8N7ZiE/giF+eWqQ5ZMG6a5wSoMs' +
        '+OKzyTCPX3GsJa7VgQJAf0wvVrLNCJyzCgIRr1nWbBSa7qezg8M4Z0+RgBGKKlz5YRlHx/JwPxjUgPVNVN0fD9d+PGRCrbWrkfjke+L4NA==';

    /**
     * 公钥加密
     *
     * @param text 公钥
     * @param publicKey
     */
    public static encrpt(text: string, publicKey?: string): string {
        const jsEncrypt = new JSEncrypt();
        jsEncrypt.setPublicKey(publicKey || this.publicKey);
        return jsEncrypt.encrypt(text);
    }

    /**
     * 私钥解密
     *
     * @param text  私钥
     * @param privateKey
     */
    public static decrypt(text: string, privateKey?: string): string {
        const jsEncrypt = new JSEncrypt();
        jsEncrypt.setPrivateKey(privateKey || this.privateKey);
        return jsEncrypt.decrypt(text);
    }
}
