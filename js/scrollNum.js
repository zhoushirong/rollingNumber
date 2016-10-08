(function() {
	/*
	 * 滚动的数字
	 * author zsr
	 * version 0.0.1
	 */
	function ScrollNum() {
		/**
		 * 滚动组件的参数
		 */
		this.options = {
			fBoxId: null, // 组件的父元素的Id
			tagH: null, // num的高度
			numLen: null, //滚动数字的位数
			num: 123456789 // 初始数字
		};

		//父标签
		this.fBoxEle = null;
	}

	/**
	 * 初始化滚动组件的参数 
	 */
	ScrollNum.prototype.initOptions = function(obj) {
		for (var i in this.options) {
			if (!obj.fBoxId) {
				throw "fBoxId is nessesarry!";
			}
			if (typeof obj[i] !== "undefined") {
				this.options[i] = obj[i];
			}
		}
	}

	/**
	 * 初始化
	 * param obj {}组件所需要的参数对象
	 */
	ScrollNum.prototype.init = function(obj) {
		if (!obj) {
			throw "ScrollNum param is nessesarry!";
		}
		//初始化滚动组件的参数
		this.initOptions(obj);


		//渲染dom
		this.fBoxEle = document.getElementById(this.options.fBoxId);
		this.fBoxEle.innerHTML = this.createNum();

		//定位数字
		this.setNumListPos();
	}

	/**
	 * 创建num
	 */
	ScrollNum.prototype.createNum = function() {
		var strArr = [];
		var numArrLen = this.options.numLen;
		for (var i = 0; i < numArrLen; i++) {
			strArr.push("<ul class='num num_animate'>");
			strArr.push(createNumList());
			strArr.push("</ul>")
		}
		return strArr.join("");
	}

	/**
	 * 将numlist定位到指定位置
	 */
	ScrollNum.prototype.setNumListPos = function() {
		//预处理数字
		var numArr = this.preprocessNum();
		var tagEles = this.fBoxEle.getElementsByTagName("ul");
		for (var i = 0; i < tagEles.length; i++) {
			//将number 定位到指定位置
			if (parseInt(numArr[i]) === "NaN") {
				throw "param must number!"
			}
			tagEles[i].style.marginTop = -1 * numArr[i] * this.options.tagH + "px";
		}
	}

	/**
	 * 预处理数字
	 */
	ScrollNum.prototype.preprocessNum = function() {
		var numArr = (this.options.num+"").split("");
		var numLen = this.options.numLen;
		var preLen = numLen - numArr.length;
		if (numArr.length < numLen) {
			for (var i = 0; i < preLen; i++) {
				numArr.unshift("0");
			}
		} else if (numArr.length > numLen) {
			numArr.length = numLen;
		}
		return numArr;
	}

	/**
	 * 改变数字
	 * param num 需要改变的新数字
	 */
	ScrollNum.prototype.changeNum = function(num) {
		if (!num) {
			num = 0;
		}
		this.options.num = num;
		//定位数字
		this.setNumListPos();
	}

	/**
	 * 创建0-9 的number list
	 */
	function createNumList() {
		var arr = [];
		for (var i = 0; i < 10; i++) {
			arr.push("<li>" + i + "</li>");
		}
		return arr.join("");
	}

	//暴露changeNum接口
	window.ScrollNum = ScrollNum;
})();