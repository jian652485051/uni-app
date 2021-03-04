const URLHASH = {
    mock: 'rap2api.taobao.org/app/mock/163112', //mock接口
    dev: 'esb.sooc.com',                        //开发接口
    test: 'ttexam.sooc.com',                     //测试接口
    prev: 'ttracemp.nfonline.com.cn',                  //预上线接口
    master: 'racemp.nfonline.com.cn'                //线上接口
};

export const api = 'http://'+URLHASH.dev;