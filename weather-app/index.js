#!/usr/bin/env node

  //const url = 'https://corporatebs-generator.sameerkumar.website/'


import chalk from 'chalk'
import mockWeatherData from './mockWeatherData.js'
import dotenv from 'dotenv/config'
import readline from 'node:readline'
import { URLSearchParams } from 'node:url';


const log = console.log;
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
    // log(data)

    let tempC = data.current.temp_c; 
    let tempF = data.current.temp_f;

    if(tempC < 15 || tempF < 59){
      log(`The current temperature in ${city} is: ${chalk.blue(tempC)}°C | ${chalk.blue(tempF)}°F.`)
    } else {
      log(`The current temperature in ${city} is: ${chalk.red(tempC)}°C | ${chalk.red(tempF)}°F.`)
    }
    
  } catch (error){
     log(error.message)

   }

  }


//Reques User input 
rl.question(`Enter your city...`, city => {
  console.log(`User city: ${city}!`);
  getWeather(city); 
  rl.close();
});
