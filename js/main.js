var VUE = new Vue({
	el: "#app",
	data: {
		isAudio: 0,
		mainbody: "苹果",
		event: "不能和玻璃渣一起吃",
		otherone: "苹果和玻璃渣一起吃会伤害到喉咙",
		maintext: "　　苹果不能和玻璃渣一起吃是怎么回事呢？苹果相信大家都很熟悉，但是苹果不能和玻璃渣一起吃是怎么回事呢，下面就让小编带大家一起了解吧。\n" +
			"　　苹果不能和玻璃渣一起吃，其实就是苹果和玻璃渣一起吃会伤害到喉咙，大家可能会很惊讶苹果怎么会不能和玻璃渣一起吃呢？但事实就是这样，小编也感到非常惊讶。\n" +
			"　　这就是关于苹果不能和玻璃渣一起吃的事情了，大家有什么想法呢，欢迎在评论区告诉小编一起讨论哦！"
	},
	methods: {
		makemaintext: function() {
			A = this.mainbody;
			B = this.event;
			C = this.otherone;
			console.log(A);
			this.maintext = "　　" + A + B + "是怎么回事呢？" + A + "相信大家都很熟悉，但是" + A + B + "是怎么回事呢，下面就让小编带大家一起了解吧。\n" +
				"　　" + A + B + "，其实就是" + C + "，大家可能会很惊讶" + A + "怎么会" + B + "呢？但事实就是这样，小编也感到非常惊讶。\n" +
				"　　这就是关于" + A + B + "的事情了，大家有什么想法呢，欢迎在评论区告诉小编一起讨论哦！";
		},
	},

});

var audio =null;

function playAudio(){
	let text = document.getElementById("maintext").value;
	if(audio!=null){
		audio.pause();
		audio =null;
		document.body.removeChild(document.getElementById("baiduTTS"));
		document.getElementById("palyButton").innerHTML="播放";
		return 0;
	}
	audio = btts({
	        tex: text,
	        tok: '25.6ccfdd8a3fd0198db89ed8d39c0e04f6.315360000.1903626111.282335-19665290',
	        spd: 6,
	        pit: 5,
	        vol: 15,
	        per: 1,
	    }, {
	        volume: 0.3,
	        autoDestory: true,
	        timeout: 10000,
	        hidden: false,
	        onInit: function (htmlAudioElement) {
	
	        },
	        onSuccess: function(htmlAudioElement) {
	            audio = htmlAudioElement;
				audio.play();
				console.log(audio);
	        },
	        onError: function(text) {
	            alert(text)
	        },
	        onTimeout: function () {
	            alert('timeout')
	        }
	    });
	document.getElementById("palyButton").innerHTML="暂停";
}
function seeGithub(){
	window.open("https://github.com/Twelveeee/baidu-tts-test1")
}

