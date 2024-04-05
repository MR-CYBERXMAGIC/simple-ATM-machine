#! /usr/bin/env node
import inquirer from "inquirer"; //inquirer: Used to create interactive prompts in the command line.
import chalk, { chalkStderr } from "chalk"; //chalk: Used to add color and formatting to text displayed in the console.
import chalkAnimation from "chalk-animation"; //chalk-animation: Used to create fancy text animations.
import { log } from "console";

const sleep = (time: number) =>
  //a sleep function that uses promises to create a 2-second delay.
  {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };
async function welcome() {
  //The welcome function is an async function, meaning it can handle asynchronous operations (like waiting).
  let title = chalkAnimation.karaoke("\nInitializing\n"); //It uses chalkAnimation to display animated message
  await sleep(1999); //delay created by sleep,
  title.stop(); //stop animation
  title = chalkAnimation.rainbow(`
         
   $$$$$$$$  $$$$$$$$$$$$$  $$$$$      $$$$$
  $$      $$      $$         $$ $$    $$ $$
  $$      $$      $$         $$  $$ $$   $$ 
  $$$$$$$$$$      $$         $$   $$$    $$
  $$      $$      $$         $$    $     $$
  $$      $$      $$         $$          $$

    `);
  await sleep(1111);
  title.stop();
  title = chalkAnimation.karaoke("Your ATM Machine is ready\n");
  await sleep(2800);
  title.stop();
}
await welcome();

const pinConstant: number = 1234;
let accountBalance: number = 10000;

async function pinCheck() {
  const pin = await inquirer.prompt({
    type: "number",
    name: "pinName",
    message: chalk.cyan.italic.bold(" Please enter a 4 digits pin"),
  });
  if (pinConstant === pin.pinName) {
    console.log(chalk.greenBright(`\n𝒫𝒾𝓃 𝒱ℯ𝓇𝒾𝒻𝒾ℯ𝒹\n`));
    await mainMenu();
  } else {
    console.log(
      chalk.redBright("\nYou have entered wrong pin. Please enter again.\n")
    );
    await pinCheck();
  }
}
async function mainMenu() {
  const answer = await inquirer.prompt({
    name: "menu",
    type: "list",
    message: chalk.cyan.bold.italic("please select what you want to perform"),
    choices: [
      chalk.yellow("Withdraw"),
      chalk.yellow("Deposite"),
      chalk.yellow("Check Balance"),
      chalk.yellow("Exit"),
    ],
  });
  if (answer.menu === chalk.yellow("Withdraw")) {
    await Withdraw();
  } else if (answer.menu === chalk.yellow("Deposite")) {
    await Deposite();
  } else if (answer.menu === chalk.yellow("Check Balance")) {
    console.log(`Your current balance is ${accountBalance}`);
    await mainMenu();
  } else if (answer.menu === chalk.yellow("Exit")) {
    process.stdout.write("\x1b[2J\x1b[0f");
    let title = chalkAnimation.rainbow("Thank you for using ATM");
    await sleep(2000);
    title.stop();
  } else {
    console.log(chalk.redBright("\nInvalid Selection\nSelect again\n"));
    await mainMenu();
  }
}
async function Withdraw() {
  const amount = await inquirer.prompt({
    name: "selection",
    type: "list",
    message: chalk.cyan.bold.italic(
      "Please select the amount you want to withdraw"
    ),
    choices: [
      chalk.yellow(500),
      chalk.yellow(1000),
      chalk.yellow(2000),
      chalk.yellow(5000),
      chalk.yellow(10000),
      chalk.yellow("others"),
    ],
  });
  if (amount.selection === chalk.yellow(500)) {
    await amountChecker(500);
  } else if (amount.selection === chalk.yellow(1000)) {
    await amountChecker(1000);
  } else if (amount.selection === chalk.yellow(2000)) {
    await amountChecker(2000);
  } else if (amount.selection === chalk.yellow(5000)) {
    await amountChecker(5000);
  } else if (amount.selection === chalk.yellow(10000)) {
    await amountChecker(10000);
  } else if (amount.selection === chalk.yellow("others")) {
    let n: number = await others();
    await amountChecker(n);
  }
}
async function Deposite() {
  const amount = await inquirer.prompt({
    name: "menu",
    type: "list",
    message: chalk.cyan.bold.italic(
      "Please select the amount you want to withdraw"
    ),
    choices: [
      chalk.yellow(500),
      chalk.yellow(1000),
      chalk.yellow(2000),
      chalk.yellow(5000),
      chalk.yellow(10000),
      chalk.yellow("others"),
    ],
  });
  if (amount.menu === chalk.yellow(500)) {
    await amountAdder(500);
  } else if (amount.menu === chalk.yellow(1000)) {
    await amountAdder(1000);
  } else if (amount.menu === chalk.yellow(2000)) {
    await amountAdder(2000);
  } else if (amount.menu === chalk.yellow(5000)) {
    await amountAdder(5000);
  } else if (amount.menu === chalk.yellow(10000)) {
    await amountAdder(10000);
  } else if (amount.menu === chalk.yellow("others")) {
    let n: number = await others();
    await amountAdder(n);
  }
}
async function amountChecker(balanceEntered: number) {
  if (balanceEntered <= accountBalance) {
    accountBalance -= balanceEntered;
    console.log(chalk.greenBright("\n𝓦𝓲𝓽𝓱𝓭𝓻𝓪𝔀 𝓢𝓾𝓬𝓬𝓮𝓼𝓼𝓯𝓾𝓵"));
    console.log(
      chalk.black.bgGray.italic(`\n Balance left : ${accountBalance}`)
    );
  } else {
    console.log(chalk.red("\nInsufficient Balance"));
  }
  await mainMenu();
}
async function amountAdder(amountEntered: number) {
  accountBalance += amountEntered;
  console.log(chalk.greenBright("\n𝓓𝓮𝓹𝓸𝓼𝓲𝓽 𝓢𝓾𝓬𝓬𝓮𝓼𝓼𝓯𝓾𝓵"));
  console.log(
    chalk.black.bgGray.italic(`\n New Balance : ${accountBalance}\n`)
  );
  await mainMenu();
}
async function others() {
  const amount = await inquirer.prompt({
    name: "money",
    type: "number",
    message: chalk.cyan.bold.italic("Please enter the amount:"),
  });
  return amount.money;
}
await pinCheck();
