import { Controller, Get, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';
const puppeteer = require('puppeteer');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  currentValue = 'Hello word';
  currentBase64 = '';

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
