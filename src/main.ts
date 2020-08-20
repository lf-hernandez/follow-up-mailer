import { run } from './cli';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    await run();
}

main();