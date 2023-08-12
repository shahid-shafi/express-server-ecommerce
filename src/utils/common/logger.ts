import chalk from 'chalk';

const logger = {
    info: (log: any) => console.log(chalk.white(log)),
    success: (log: any) => console.log(chalk.green(log)),
    error: (log: any) => console.log(chalk.red(log)),
    warn: (log: any) => console.log(chalk.yellow(log)),
};

export default logger;