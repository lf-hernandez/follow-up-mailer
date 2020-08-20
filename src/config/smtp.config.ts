export interface SmtpConfig {
    HOST: string;
    PORT: number;
}

const config: SmtpConfig = {
    HOST: String(process.env.SMTP_HOST),
    PORT: Number(process.env.SMTP_PORT) 
}

export default config;