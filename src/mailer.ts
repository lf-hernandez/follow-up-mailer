import bunyan from 'bunyan';
import csv from 'csvtojson';
import nodemailer from 'nodemailer';
import fs from 'fs';

import { CsvRecord, NormalizedRecord } from './interfaces';

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
            host: '[smtp host]',
            port: 587,
            secure: false,
            auth: {
                user: email,
                pass: pass,
            },
            logger,
            debug: true
        });

    console.log('SMTP Configured');
    console.log('Sending Mail...');

    normalizedArray.forEach(async (record) => {
        const message = generateMessage(record, email)
        const info = await transporter.sendMail(message);

        console.log(`Message sent: ${info.messageId}`);
        console.log(`Server responded with ${info.response}`);
    })
}

function generateMessage(record: NormalizedRecord, sender: string) {
    return {
        from: sender,
        to: record.email,
        subject: 'Follow-up on your recent purchase',
        text: record.message,
        html: `<p>${record.message}</p>`
    }
};

function generateBody(bodyFile: string, record: CsvRecord) {
    let bodyContent = fs.readFileSync(bodyFile).toString();
    bodyContent = bodyContent.replace('{name}', record["Buyer Fullname"]);
    bodyContent = bodyContent.replace('{item}', record["Item Title"]);

    return bodyContent;
}