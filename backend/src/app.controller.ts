import { Controller, Get, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  currentValue = 'Hello word';


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('backendData')
  getBackendData(){
    console.log("returning ", this.currentValue);
    return this.currentValue;
  }

  // should be post, but for simplicity
  @Get('setBackendData/:data')
  setBackendData(@Param() data : string){
    console.log("setting value");
    this.currentValue = data;
  }


}
