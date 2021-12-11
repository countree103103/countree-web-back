import { Config, Provide } from "@midwayjs/decorator";
import * as crypto from 'crypto'
import * as xml from 'fast-xml-parser'


@Provide()
export default class WxService{

  @Config('wxToken')
  Token: string;

  wxValidate(query: any) : boolean{
    const timestamp = query.timestamp;
    const nonce = query.nonce;
    const signature = query.signature;
    const arr = [this.Token, timestamp, nonce];
    const arrstr = arr.sort().join('');
    const sha1arr = crypto.createHash('sha1').update(arrstr).digest('hex');

    if (sha1arr === signature) return true;
    else return false;
  }

  x2j(body: any){
    let reqBody = xml.parse(body).xml;
    return reqBody;
  }

  j2x(jsonData: any) : string{
    const parser = new xml.j2xParser({});
    jsonData = {
      xml: jsonData
    }
    const resultXml = parser.parse(jsonData);
    return resultXml;
  }

  respone(body: any, responeData: string) : string{
    
    let resultJson : object;
    let resultXml : any;

    const reqBody : any = this.x2j(body);
    resultJson = {
        ToUserName: reqBody.FromUserName,
        FromUserName: reqBody.ToUserName,
        CreateTime: Date.now(),
        MsgType: 'text',
        Content: responeData
    }
    resultXml = this.j2x(resultJson);
    console.log(resultXml);
    return resultXml;
  }

  getContent(body : any) : string{
    return this.x2j(body).Content;
  }
}