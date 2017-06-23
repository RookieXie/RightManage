(function ($) {
	$.AKjs = $.AKjs ? $.AKjs : {};

	$.fn.AtawTime = function (options) {
		$.AKjs.AtawCreateCall.call(this, "AtawTime", options);
	}

	$.AKjs.AtawTime = function (options) {
		return $.extend({}, $.AKjs.AtawText(options), new AtawTimeControl());
	}

	//时间文本框
function AtawTimeControl() {
    this.PlaceHolder = "请选择时间...";
		//重写基类初始化方法
		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "afterInit", function () {
			var _this = this;
			var myDate = new Date();
			var myHour = myDate.getHours();
			var myMinute = myDate.getMinutes();
			var mySelectTimeDiv = $("<div id=\"mySelectTimeDiv\" style=\"padding:6px; background-color:#FFFFFF; font-size: 12px; border: 1px solid #cccccc;  position:absolute; left:?px; top:?px; width:?px; height:?px; z-index:2147483647;\"></div>");
			var myHourDiv = $("<div id=\"myHourDiv\" style=\"float:left;\"><ul id=\"myHourUl\" style=\"list-style:none;\"><li><button id=\"myHourUp\" type=\"button\" class=\"btn btn-xs btn-primary icon-caret-up fa fa-caret-up icon-large\">&nbsp;&nbsp;</button></li><li><input type=\"text\" style=\"width:20px !important;\" id=\"myHourValue\" value=\"" + myHour + "\"/></li><li><button id=\"myHourDown\" type=\"button\" class=\"btn btn-xs btn-primary icon-caret-down fa fa-caret-down icon-large\">&nbsp;&nbsp;</button></li></ul></div>");
			var myMinuteDiv = $("<div id=\"myMinuteDiv\" style=\"float:left;\"><ul id=\"myMinuteUl\" style=\"list-style:none;\"><li><button id=\"myMinuteUp\" type=\"button\" class=\"btn btn-xs btn-primary icon-caret-up fa fa-caret-up icon-large\">&nbsp;&nbsp;</button></li><li><input type=\"text\" style=\"width:20px !important;\" id=\"myMinuteValue\" value=\"" + myMinute + "\"/></li><li><button id=\"myMinuteDown\" type=\"button\" class=\"btn btn-xs btn-primary icon-caret-down fa fa-caret-down icon-large\">&nbsp;&nbsp;</button></li></ul></div>");
			var myBtnDiv = $("<div></div>");
			var settingBtn = $("<button type=\"button\" id=\"settingBtn\" class=\"btn btn-xs btn-primary\">设定</button>");
			var cancelBtn = $("<button type=\"button\" id=\"cancelBtn\" class=\"btn btn-xs btn-primary\">取消</button>");
			myBtnDiv.append(settingBtn);
			myBtnDiv.append(cancelBtn);
			mySelectTimeDiv.append(myHourDiv);
			mySelectTimeDiv.append(myMinuteDiv);
			mySelectTimeDiv.append(myBtnDiv);
			_this.$JObj.append(mySelectTimeDiv);
			mySelectTimeDiv.hide();
			cancelBtn.click(function () {
				mySelectTimeDiv.hide();
			});
			this.$JObjText.click(function () {
				var time = _this.DataValue.getValue();
				if (time == null || time == "") {
					myHourDiv.find("input").val(new Date().getHours() >= 10 ? new Date().getHours() : ("0" + new Date().getHours()));
					myMinuteDiv.find("input").val(new Date().getMinutes() >= 10 ? new Date().getMinutes() : ("0" + new Date().getMinutes()));
				} else {
					myHourDiv.find("input").val(time.split(":")[0]);
					myMinuteDiv.find("input").val(time.split(":")[1]);
				}
				mySelectTimeDiv.show();
			});
			settingBtn.click(function () {
				var reg = new RegExp("^[0-9]*$");
				if (!reg.test(myHourDiv.find("input").val()) || !reg.test(myMinuteDiv.find("input").val()) || myHourDiv.find("input").val() < 0 || myHourDiv.find("input").val() > 23 || myMinuteDiv.find("input").val() < 0 || myMinuteDiv.find("input").val() > 59) {

				} else {
					_this.$JObjText.val(myHourDiv.find("input").val() + ":" + myMinuteDiv.find("input").val());
					_this.DataValue.setValue(myHourDiv.find("input").val() + ":" + myMinuteDiv.find("input").val());
					_this.triggerChangeEvent();
					mySelectTimeDiv.hide();
				}
			});
			myHourDiv.find("#myHourUp").click(function () {
				if (Number(myHourDiv.find("input").val()) >= 23) {
					myHourDiv.find("input").val("01");
				} else {
					myHourDiv.find("input").val((Number(myHourDiv.find("input").val()) + 1) >= 10 ? (Number(myHourDiv.find("input").val()) + 1) : ("0" + (Number(myHourDiv.find("input").val()) + 1)));
				}
			});
			myHourDiv.find("#myHourDown").click(function () {
				if (Number(myHourDiv.find("input").val()) <= 0) {
					myHourDiv.find("input").val("23");
				} else {
					myHourDiv.find("input").val((Number(myHourDiv.find("input").val()) - 1) >= 10 ? (Number(myHourDiv.find("input").val()) - 1) : ("0" + (Number(myHourDiv.find("input").val()) - 1)));
				}
			});
			myMinuteDiv.find("#myMinuteUp").click(function () {
				if (Number(myMinuteDiv.find("input").val()) >= 59) {
					myMinuteDiv.find("input").val("01");
				} else {
					myMinuteDiv.find("input").val((Number(myMinuteDiv.find("input").val()) + 1) >= 10 ? (Number(myMinuteDiv.find("input").val()) + 1) : ("0" + (Number(myMinuteDiv.find("input").val()) + 1)));
				}
			});
			myMinuteDiv.find("#myMinuteDown").click(function () {
				if (Number(myMinuteDiv.find("input").val()) <= 0) {
					myMinuteDiv.find("input").val("59");
				} else {
					myMinuteDiv.find("input").val((Number(myMinuteDiv.find("input").val()) - 1) >= 10 ? (Number(myMinuteDiv.find("input").val()) - 1) : ("0" + (Number(myMinuteDiv.find("input").val()) - 1)));
				}
			});


		});

		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initChange", function () {
			var _this = this;
			this.$JObjText.change(function () {
				_this.DataValue.setValue($(this).val());

				_this.triggerChangeEvent();
			});
		});
		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dateChange", function (val) {
			this.DataValue.setValue(val);
			this.triggerChangeEvent();

		});

	}

})(jQuery);
