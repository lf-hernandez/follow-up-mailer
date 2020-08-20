import bunyan from 'bunyan';
import csv from 'csvtojson';
import nodemailer from 'nodemailer';
import fs from 'fs';

import smtpConfig from './config/smtp.config';

import { CsvRecord, NormalizedRecord } from './interfaces';
import chalk from 'chalk';

export async function main(csvFile: string, bodyFile: string, email: string, pass: string) {
    let logger = bunyan.createLogger({ name: 'nodemailer', }); logger.level('trace');

    const jsonArray: Array<CsvRecord> = await csv().fromFile(csvFile);

    const normalizedArray: Array<NormalizedRecord> = jsonArray
        .map((record: CsvRecord) => (
            {
                name: record['Buyer Fullname'],
                email: record['Buyer Email'],
                product: record['Item Title'],
                message: generateBody(bodyFile, record)
            }
        ));

    console.log('Array normalized');

    const transporter = nodemailer.createTransport(
        {
            host: smtpConfig.HOST,
            port: smtpConfig.PORT,
            secure: false,
            auth: {
                user: email,
                pass: pass,
            }
        });

    console.log('SMTP Configured');
    console.log(chalk.yellow('Sending Mail...'));

    normalizedArray.forEach(async (record) => {
        const message = generateMessage(record, email)

        try {
            const info = await transporter.sendMail(message);

            console.log(`${chalk.green('Message sent:')} ${info.messageId}`);
            console.log(`${chalk.green('Server responded with')} ${info.response}`);
        }
        catch (error) {
            console.log(chalk.red(error.message));
        }
    })
}

function generateMessage(record: NormalizedRecord, sender: string) {
    return {
        from: `"Follow-Up Mailer 👻" <${sender}>`,
        to: record.email,
        subject: 'Save money on a future purchase!',
        text: record.message,
        html: `<p>${record.message.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>`
    }
};

function generateBody(bodyFile: string, record: CsvRecord) {
    let bodyContent = fs.readFileSync(bodyFile).toString();
    bodyContent = bodyContent.replace('{name}', record["Buyer Fullname"]);
    bodyContent = bodyContent.replace('{item}', record["Item Title"]);

    return bodyContent;
}