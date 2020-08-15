import yargs from 'yargs';
import { main } from './mailer';

const args = yargs.options({
    file: {
        description: 'csv file',
        type: 'string',
        demandOption: true,
        alias: 'f'
    },
    body: {
        description: 'file containing message body',
        type: 'string',
        demandOption: true,
        alias: 'b'
    },
    email: {
        description: 'email',
        type: 'string',
        demandOption: true,
        alias: 'e'
    },
    pass: {
        description: 'password',
        type: 'string',
        demandOption: true,
        alias: 'p'
    }
}).check((data) => {
    return data.file.endsWith('.csv');
}).argv;

export function run() {
    main(args.file, args.body, args.email, args.pass).catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
}