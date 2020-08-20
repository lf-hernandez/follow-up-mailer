export interface SmtpConfig {
    HOST: string;
    PORT: number;
}

const config: SmtpConfig = {
    HOST: String(process.env.SMTP_HOST) ?? 'smtp.gmail.com',
    PORT: Number(process.env.SMTP_PORT) ?? 587
};

export default config;