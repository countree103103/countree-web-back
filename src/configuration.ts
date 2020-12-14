import { Configuration } from '@midwayjs/decorator';
import * as orm from '@midwayjs/orm';

@Configuration({
  imports: [
    orm, // 加载 orm 组件
  ],
})
export class ContainerConfiguratin {}
