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
