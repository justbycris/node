

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
      switch (condition) {
        case "Sunny":
          log(`
            ${chalk.bold.yellow(condition)} ☀️`)
          break;
        case "Cloudy":
        case "Partly Cloudy":
          log(`
            ${chalk.bold.cyan(condition)} ⛅`)
          break;
        case "Light rain":
        case "Moderate rain": 
        case "Heavy rain":
          log(`
            ${chalk.bold.blue(condition)} 🌧️`)
          break;
        case "Light snow":
        case "Patchy moderate snow":
        case "Moderate snow": 
        case "Heavy snow":
          log(`
            ${chalk.bold.cyan(condition)} ❄️`)
        default:
          console.log(`
            ${chalk.bold.red('Weather condition not available...')}`);
      }

      console.groupEnd();

    if(tempC < 18 || tempF < 64.4){
      log(`
        ${chalk.bold.blue(tempC)}${chalk.bold.blue('°C')} | ${chalk.bold.blue(tempF)}${chalk.bold.blue('°F')}\n`)
    } else {
      log(`
        ${chalk.bold.red(tempC)}${chalk.bold.red('°C')} | ${chalk.bold.red(tempF)}${chalk.bold.red('°F')}\n`)
    }
    console.groupEnd();
  } catch (error){
    if(error.code = 400 ){
      log(`${chalk.bold.red(`Invalid city: ${city}. Please enter a valid location.`)}`)
    } else {
      log(`Error: ${error.message}`)
    }
   }

  }


//Reques User input 
rl.question(chalk.bgMagenta(`Enter your city:`), city => {
  getWeather(city); 
  rl.close();
});
