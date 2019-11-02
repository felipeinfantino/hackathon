import { Controller, Get, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { isIntersectionTypeAnnotation } from '@babel/types';
const puppeteer = require('puppeteer');

@Controller()
export class AppController {

  browser;
  page;
  constructor(private readonly appService: AppService) {}
  currentValue = 'Hello word';
  currentBase64 = '';
  currentLinks = [];

  

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('initialize')
  async init() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    this.page = await this.browser.newPage();
    return 'initialized';
  }

  @Get('openGoogle')
  async openGoogle(){
    await this.page.goto('https://www.google.de/');
    const buffer = await this.page.screenshot({fullPage: true});
    const base64 = buffer.toString('base64');
    this.currentBase64 = base64;
    return 'success';
  }

  @Get('inputOnGoolge/:userInput')
  async setGoogleInput(@Param() userInputAsJson: string){
    const userInput = userInputAsJson['userInput'];
    await this.page.evaluate((userInput) => {
      const inputField = document.getElementsByClassName('gLFyf gsfi')[0] as HTMLInputElement;
      inputField.value = userInput;
    }, userInput);
    const buffer = await this.page.screenshot({fullPage: true});
    const base64 = buffer.toString('base64');
    this.currentBase64 = base64;
    return 'input success';
  }

  @Get('clickGoogle')
  async clickGoogle(){
    await this.page.evaluate(() => {
      const submitButton = document.getElementsByClassName('gNO89b')[0] as HTMLInputElement;
      submitButton.click();
    });
    await this.page.waitForNavigation();
    const buffer = await this.page.screenshot({fullPage: true});
    const base64 = buffer.toString('base64');
    const allLinksInString =await this.page.evaluate(() => {
      const allDivs = document.getElementsByClassName('r');
      let allLinks = '';
      for(const div of allDivs){
        allLinks += ((div.childNodes[0] as HTMLAnchorElement).href + ';');
      }
      return allLinks;
    });
    for(const link of allLinksInString.split(';')){
      if(link) {
        this.currentLinks.push(link);
      }
    }
    this.currentBase64 = base64;
    return 'click google';
  }


  @Get('goToLink/:number')
  async goToLink(@Param('number') number: string){
    let numberAsANumber = Number(number);
    numberAsANumber -= 1;
    console.log(this.currentLinks);
    console.log(numberAsANumber);
    console.log(this.currentLinks[numberAsANumber]);
    await this.page.goto(this.currentLinks[numberAsANumber]);
    const buffer = await this.page.screenshot({fullPage: true});
    const base64 = buffer.toString('base64');
    this.currentBase64 = base64;
    return 'go to link succes';
  }

  @Get('currentBase64')
  getCurrentBase64(){
    return this.currentBase64;
  }

  @Get('backendData')
  getBackendData(){
    console.log("returning ", this.currentValue);
    return this.currentValue;
  }

  @Get('test')
  async test(){
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://www.google.de/');
    // step 1: (screenshot)
    await page.evaluate(() => {
      // step 2 : input field (screenshot)
      const inputField = document.getElementsByClassName('gLFyf gsfi')[0] as HTMLInputElement;
      inputField.value = 'test'; 
      // step 3 : click the button
      const submitButton = document.getElementsByClassName('gNO89b')[0] as HTMLInputElement;
      submitButton.click();
    });
    // step 3.1 wait for click to response
    await page.waitForNavigation();
    const p =await page.evaluate(() => {
      const allDivs = document.getElementsByClassName('r');
      let t = '';
      for(const div of allDivs){
        t += ((div.childNodes[0] as HTMLAnchorElement).href + ';');
      }
      return t;
    });
    console.log(p);
    const buffer = await page.screenshot({fullPage: true});
    const base64 = buffer.toString('base64');
    this.currentBase64 = base64;
    await browser.close();
    return base64;
  }

  @Get('test2')
  async test2(){
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://www.google.de/');
    await page.evaluate(() => {
      const inputField = document.getElementsByClassName('gLFyf gsfi')[0] as HTMLInputElement;
      inputField.value = 'test';
      const submitButton = document.getElementsByClassName('gNO89b')[0] as HTMLInputElement;
      submitButton.click();
    });
    await page.waitForNavigation();
    const buffer = await page.screenshot({fullPage: true});
    const base64 = buffer.toString('base64');
    this.currentBase64 = base64;
    await browser.close();
    return base64;
  }

  // should be post, but for simplicity
  @Get('setBackendData/:data')
  setBackendData(@Param() data : string){
    console.log("setting value");
    this.currentValue = data;
  }


}
