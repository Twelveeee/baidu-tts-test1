# 震惊，营销号还能这么写！

某天在写营销号生成器的时候，突然觉得如果加入了语音，那就太有那味了。

之后了解到百度语音合成能够免费使用。

![](https://github.com/Twelveeee/baidu-tts-test1/blob/master/img/image-20200501221551590.png)

就开始了我的营销号生成之旅!

## 一、注册登陆

![](https://github.com/Twelveeee/baidu-tts-test1/blob/master/img/image-20200501222044618.png)

用你的百度账户登陆百度智能云

https://console.bce.baidu.com/ai/?_=1588342430760&fromai=1#/ai/speech/overview/index

选择语音技术，创建一个应用。

![](https://github.com/Twelveeee/baidu-tts-test1/blob/master/img/image-20200501222159300.png)

点击管理应用，查看你的API Key 和Secret Key。

![](https://github.com/Twelveeee/baidu-tts-test1/blob/master/img/image-20200501222349237.png)

## 二、获取token参数

打开浏览器输入

`https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=你的APIKey&client_secret=你的Secret Key `

获取如下结果

```json
{
"refresh_token":"25.6c****35-19665290",
"expires_in":2592000,
"session_key":"9mzdC****rKywnwHwQ==",
"access_token":"24.1****665290",
"scope":"audio_voice_assistant_get****",
"session_secret":"0d6d3****3149e73"
}
```

把token记下来。

## 三、调用

开始编写JS。

```javascript
var audio =null;
let text = document.getElementById("maintext").value;
function playAudio(){
	if(audio!=null){
		audio =null;
		return 0;
	}
	var url = 'http://tsn.baidu.com/text2audio';
	var tok ='25.6ccfdd8a3fd0198db89ed8d39c0e04f6.315360000.1903626111.282335-19665290';
	var audio = document.createElement('audio');
	audio.setAttribute('autoplay', 'autoplay');//自动播放
	audio.volume = 0.15;
    
var xhr = new XMLHttpRequest();
xhr.open('POST',url);

var data= {};
data.tex = text//文本
data.tok = tok;//token
data.spd=6;//语速
data.pit =5;//音调
data.vol=15;//音量
data.per =5;//音库
data.cuid =tok;//用户表示
data.ctp = 1; //客户端WEB 为1
data.lan ='zh';//固定值zn
data.aue =3;//MP3格式

var fd =[];
for (var k in data){
    fd.push(k + '=' + encodeURIComponent(data[k]));		
}
var frd = new FileReader();
xhr.responseType = 'blob';
xhr.send(fd.join('&'));

// 默认超时时间60秒
var DEFAULT_TIMEOUT = 60000;
var timeout = DEFAULT_TIMEOUT;

// 用timeout可以更兼容的处理兼容超时
var timer = setTimeout(function(){
    xhr.abort();
   
}, timeout);

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
		console.log(xhr.response)
        clearTimeout(timer);
        if (xhr.status == 200) {
            if (xhr.response.type === 'audio/mp3') {

                // 在body元素下apppend音频控件
                document.body.appendChild(audio);

                audio.setAttribute('src', URL.createObjectURL(xhr.response));

                // 设置则播放完后移除audio的dom对象
                audio.onended = function() {
                    document.body.removeChild(audio);
                }

            }

            // 用来处理错误
            if (xhr.response.type === 'application/json') {
                frd.onload = function(){
                    var text = frd.result;
                };
                frd.readAsText(xhr.response);
            }
        }
    }
}
```
试看看效果怎么样；

![](https://github.com/Twelveeee/baidu-tts-test1/blob/master/img/image-20200512115746658.png)

芜湖！完美！

[查看源码][https://github.com/Twelveeee/baidu-tts-test1]
[查看样例][https://twelveeee.github.io/baidu-tts-test1/]
