(function ($) {
	$.AKjs = $.AKjs ? $.AKjs : {};

	$.fn.AtawDetail = function (options) {
		$.AKjs.AtawCreateCall.call(this, "AtawEditorDetail", options);
	}

	//类的构造函数
	$.AKjs.AtawEditorDetail = function (options) {

		return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawEditorDetailControl()).sysCreator();
	}

	function AtawEditorDetailControl() {
		this.DataText = null;
		this.RegName = null;

		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
			this.setProByOptName("RegName", "RegName");
			this.DataText = $.AKjs.RegNameDataGet(this.RegName, this.DataValue.Ds, this.DataValue, "", this.DataValue.Index);
			this.IsReadOnlyControl = true;

		});

		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
			var re = /^[0-9,]+$/;
			this.$JObj.addClass("acs-detail");

			if (re.test(this.DataText)) {
				this.$JObj.html("<p>" + this.DataText.hexToString() + "</p>");
			} else {
				//                this.$JObj.html("<pre>" + this.DataText.htmlDecode().htmlDecode() + "</pre>"); 、
				this.$JObj.html("<p>" + this.DataText + "</p>");
			}
			if (this.ParentFormObj != null && this.ParentFormObj.Action == "List") {
				if (Number(this.$JObj.height()) > 300) {
					this.$JObj.height(300);
					this.$JObj.css("overflow", "hidden");
					this.$JObj.css("display", "inline-block");
					var moreLink = $("<div style='float:right;' class='icon-resize-full fa fa-expand'></div>");
					this.$JObj.after(moreLink);
					moreLink.click(function () {
						if (moreLink.prevAll(".ACT_CONTROL").height() > 300) {
						    moreLink.find("div").addClass('icon-resize-full fa fa-expand').removeClass('icon-resize-small fa fa-compress');
							moreLink.prevAll(".ACT_CONTROL").height("300");
							moreLink.prevAll(".ACT_CONTROL").css("overflow", "hidden");
							moreLink.prevAll(".ACT_CONTROL").css("display", "inline-block");
						} else {
						    moreLink.find("div").addClass('icon-resize-small fa fa-compress').removeClass('icon-resize-full fa fa-expand');
							moreLink.prevAll(".ACT_CONTROL").height("auto");
							moreLink.prevAll(".ACT_CONTROL").css("overflow", "auto");
						}
					});
				}
			}
			if (this.$JObj.html() == "<p></p>") {
			    this.$JObj.text("(空)");
			}
			// this.$JObj.attr("title", this.DataText);
			// this.$JObj.show();
			//this.$JObj.text(this.DataValue.getValue());
		});
		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
			return this.$JObj.html();
		});
		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
			this.$JObj.html(opt_str);
		});

		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "addWriteBr", function (opt_str) {
			var _str = $.AKjs.CreateBuffer(this.dataValue()).ad("<br/>").ad(opt_str).toString();
			this.dataValue(_str);
		});

		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "valueFormat", function (val) {
			if (this.DetialFormatFun) {
				val = this.DetialFormatFun(val);
			}
			return val;
		});

	}
})(jQuery);