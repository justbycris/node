#!/usr/bin/env node

import dotenv from 'dotenv/config'
import chalk from 'chalk'
import readline from 'node:readline'
import { URLSearchParams } from 'node:url';


const log = console.log;

  log(chalk.blue`
██╗    ██╗███████╗ █████╗ ████████╗██╗  ██╗███████╗██████╗ 
██║    ██║██╔════╝██╔══██╗╚══██╔══╝██║  ██║██╔════╝██╔══██╗
██║ █╗ ██║█████╗  ███████║   ██║   ███████║█████╗  ██████╔╝
██║███╗██║██╔══╝  ██╔══██║   ██║   ██╔══██║██╔══╝  ██╔══██╗
╚███╔███╔╝███████╗██║  ██║   ██║   ██║  ██║███████╗██║  ██║
 ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`                                                           
)

//CLI request user input instance
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getWeather(city) {
  //URL Parameters
  const params = new URLSearchParams({
    key: process.env.API_KEY, 
    q: city
  })

  // Like the browser fetch API, the default method is GET
  const API_URL = `http://api.weatherapi.com/v1/current.json?${params}`
  try {
    const response = await fetch(API_URL, {
      method: "GET", 
    });
    if(!response.ok){
      throw new Error(`Response status: ${response.status}`)
    }

    const data = await response.json()
    //test data response
    //log(data)

    let tempC = data.current.temp_c; 
    let tempF = data.current.temp_f;
    let condition = data.current.condition.text;
    let time = data.location.localtime;

    log(`\n${chalk.bold.yellow(time)}`)
    log(chalk.bold.green(`Weather in ${city} »`))
    console.group();
    log(`\n${chalk.bold.cyan(condition)}`)
    if(tempC < 18 || tempF < 64.4){
      log(`${chalk.bold.blue(tempC)}${chalk.bold.blue('°C')} | ${chalk.bold.blue(tempF)}${chalk.bold.blue('°F')}\n`)
    } else {
      log(`${chalk.bold.red(tempC)}${chalk.bold.red('°C')} | ${chalk.bold.red(tempF)}${chalk.bold.red('°F')}\n`)
    }
    console.groupEnd();
  } catch (error){
     log(error.message)
   }

  }


//Reques User input 
rl.question(chalk.bgMagenta(`Enter your city:`), city => {
  getWeather(city); 
  rl.close();
});
