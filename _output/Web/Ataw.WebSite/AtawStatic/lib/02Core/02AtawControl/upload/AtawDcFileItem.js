(function ($) {
	$.AKjs = $.AKjs ? $.AKjs : {};

	// 未完成
	//类的构造函数
	$.AKjs.AtawDcFileItem = function (options) {
		var _base = $.extend({}, $.AKjs.AtawBaseDom(options), new AtawDcFileItem());
		return _base.sysCreator();
	};

	function AtawDcFileItem() {
		this.$File = $("<label></label>");
		this.$BtDel = $("<span  class='btn btn-default btn-xs'>删除</span>");
		this.FileObj = null;
		this.Key = "";
		this.FileSrc = "";
		this.Title = "";
		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
			//--------------
			this.setProByOptName("FileObj", "FileObj");
			this.setProByOptName("Key", "Key");
			if (this.FileObj != null) {
				//根据对象获得路径
				this.FileSrc = this.FileObj.ResourceInfoList[0].HttpPath;
				this.Title = this.FileObj.ResourceInfoList[0].FileNameTitle;
			}
		});

		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
			this.$JObj.append(this.$File);
			this.$File.html(this.Title);
			this.$File.attr("title", this.Title);
			this.$File.attr("src", this.FileSrc);
			this.$JObj.attr("key", this.Key);
			this.$JObj.append(this.$BtDel);
			var _this = this;
			this.$BtDel.off("click").on("click", function () {
				_this.$JObj.remove();
			});
		});

		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getValue", function () {
			//-----------
			return $.AKjs.GetFirstItemByResource(this.FileObj);

		});

	};


})(jQuery);