import { ALL, Config, Controller, Get, Provide } from '@midwayjs/decorator';

@Provide()
@Controller('/')
export class HomeController {
  @Config(ALL)
  allConfig: any;

  @Get('/')
  async home() {
    // return 'Hello Midwayjs!';
    return this.allConfig;
  }
}
