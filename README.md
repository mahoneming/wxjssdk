# sharejssdk
QQ+微信jssdk配置，包含官方demo，导入QQsdk会包含微信sdk，已屏蔽微信相关配置。弱只在微信分享，可更换
## 配置文件是vue写的，可根据需求进行修改。下面总结下常用坑：
### 调用config 接口的时候传入参数 debug: true 可以开启debug模式，页面会alert出错误信息。以下为常见错误及解决方法：

#### 1.invalid url domain当前页面所在域名与使用的appid没有绑定，请确认正确填写绑定的域名，仅支持80（http）和443（https）两个端口，因此不需要填写端口号（一个appid可以绑定三个有效域名，见 目录1.1.1）。

#### 2.invalid signature签名错误。建议按如下顺序检查：
   >>1.确认签名算法正确，可用 http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign 页面工具进行校验。
   
   >>2.确认config中nonceStr（js中驼峰标准大写S）, timestamp与用以签名中的对应noncestr, timestamp一致。
 
   >>3.确认url是页面完整的url(请在当前页面alert(location.href.split('#')[0])确认)，包括'http(s)://'部分，以及'？'后面的GET参数部分,但不包括'#'hash后面的部分。
   
   >>4.确认 config 中的 appid 与用来获取 jsapi_ticket 的 appid 一致。
   
   >>5.确保一定缓存access_token和jsapi_ticket。
   
   >>6.确保你获取用来签名的url是动态获取的，动态页面可参见实例代码中php的实现方式。如果是html的静态页面在前端通过ajax将url传到后台签名，前端需要用js获取当前页面除去'#'hash部分的链接（可用location.href.split('#')[0]获取,而且需要encodeURIComponent），因为页面一旦分享，微信客户端会在你的链接末尾加入其它参数，如果不是动态获取当前链接，将导致分享后的页面签名失败。

#### 3.link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致   
