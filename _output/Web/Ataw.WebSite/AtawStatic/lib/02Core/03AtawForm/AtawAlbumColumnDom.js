(function ($) {
	$.AKjs = $.AKjs ? $.AKjs : {};

	//继承基类
	$.AKjs.AtawAlbumColumnDom = function (options) {
		return $.extend({}, $.AKjs.AtawBaseColumnDom(options), new AtawAlbumColumnDom()).sysCreator();
	}

	function AtawAlbumColumnDom() {
		this.$Lable = $('<label for="inputEmail3 class="control-label"></label>');
		this.$Div = $('<div class="clear"></div>');
		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
			this.AtawBaseColumnDom_creator();
		});


		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
		    //this.$JObj.append(this.$Lable);
		    this.$Div.append(this.$Lable);
			this.$JObj.append(this.$Div);
			//是标题
			if (this.AtawControlObj.sys_ataw_fun_name == "AtawDetailControl" && this.IsManColumn) {
				var _dataText = this.AtawControlObj.DataText;
				if (_dataText == null || _dataText.toString() == "") {
					_dataText = "_";
				}
				var _sourceText = _dataText;
				var _tt = $("<span>" + _dataText + "</span>").text();
				if (!_tt .AisEmpty()) {
					// _dataText 
					_dataText = _tt;
				}
				if (_dataText.length > 25) {
					var _txt = _dataText;
					_dataText = "<span title='" + _txt + "'>" + _dataText.substr(0, 25) + "..</span>";
				}
				else {
					_dataText = "<span>" + _sourceText + "</span>";
				}

				this.AtawControlObj.DataText = _dataText;
				this.$JObj.attr("class", "AlbumTitle");
			}
			if (this.ColumnConfig.ControlType != "ImageDetail") {
				if (this.DisplayName == null || this.DisplayName == "") {

				} else {
					if (this.Prompt == null || this.Prompt == "") {
						this.$Lable.append(this.DisplayName + ":");
					} else {
						this.$Lable.append(this.DisplayName + ":(" + this.Prompt + ")");
					}
				}
				//this.$Lable.replaceWith(this.DisplayName + ": ");
				//this.$Div.replaceWith("<span class='text ACT_CONTROL PAGE-CONTROL'>" + this.AtawControlObj.DataText + "</span>");
			}
			

			this.AtawControlObj.intoDom(this.$Div);
			
			if (this.ColumnConfig.ControlType == "Hidden") {
				this.$JObj.hide();
			}

			//图片
			if (this.ColumnConfig.ControlType == "ImageDetail") {
				this.$JObj.html("");
				//                this.$JObj.find("span").remove();
				//                this.$JObj.find("span").remove();
				//    this.$JObj.find("lable").remove();

				if (!$.AKjs.IsEmpty(this.AtawControlObj.Href)) {

					//var $img = $("<a target='_bank' href=\"" + this.AtawControlObj.AlbumHref + "\"  ><img src=\"" + this.AtawControlObj.AlbumHref + "\" class=\"AlbumImage\" ></a>");
					var $img = $('<img src="' + this.AtawControlObj.AlbumHref + '" class="img-responsive  center-block acs-thumbImage50"/>')
					this.$JObj.append($img);
				}
			}

			if (this.DisplayName == null || this.DisplayName == "") {
				this.$JObj.hide();
			}
			this.AtawBaseColumnDom_init();
		});
	}
})(jQuery);
