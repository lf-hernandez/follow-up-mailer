import chalk from 'chalk';
import inquirer from 'inquirer';
import { main } from './mailer';
import fs from 'fs';
import validator from 'validator';

export async function run() {
    console.log(`Follow-up Mailer ${ process.env.npm_package_version}`);
    console.log(chalk.yellowBright('Note: If cwd doesn\'t contain .env with smtp host and port, transporter will be set to gmail smtp settings.'));

    const args = await generateArgs();

    main(args.file, args.body, args.email, args.pass).catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
}

async function generateArgs() {
    const files = fs.readdirSync(process.cwd());

    const args = await inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'Enter email: ',
            validate: validateEmail
        },
        {
            type: 'input',
            name: 'pass',
            message: 'Enter email password or app password if MFA is enabled:',

        },
        {
            type: 'list',
            name: 'file',
            message: `Select file to scrape data from ${ chalk.yellow('<Must be a csv>')}:`,
            choices: [...files.filter((file) => file.endsWith('csv'))]

        }, 
        {
            type: 'list',
            name: 'body', 
            message: `Choose message body content file ${ chalk.yellow('<Must be a txt>')}`,
            choices: [...files.filter((file) => file.endsWith('txt'))]
        }
    ]);

    return args;
}

const validateEmail = async(input: string) => {
    if(!validator.isEmail(input)) {
        return chalk.red('Invalid email. Please try again.');
    }

    return true;
};
