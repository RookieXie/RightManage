(function ($) {

	$.AKjs = $.AKjs ? $.AKjs : {};
	$.fn.AtawCircle = function (options) {
		$.AKjs.AtawCreateCall.call(this, "AtawCircle", options);
	}
	$.AKjs.AtawCircle = function (options) {
		return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawCircle());
	}
	function AtawCircle(options) {
		this.Options = options;
		this.ClircleListPanelTitle = "所有圈子";
		this.UserId = null;
		this.ClircleIds = "";
		this.$JObj = null; //容器

		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
			var _this = this;
			_this.AtawBaseDom_init();
			_this.UserId = _this.Options.UserId;
			if (_this.Options.ClircleListPanelTitle == null && _this.UserId != null && _this.UserId != "" && _this.UserId == $.AKjs.LoginId) {
				this.ClircleListPanelTitle = "我的圈子";
			} else if (_this.Options.ClircleListPanelTitle == null && _this.UserId != null && _this.UserId != "" && _this.UserId != $.AKjs.LoginId) {
				this.ClircleListPanelTitle = "他的圈子";
			} else if (_this.Options.ClircleListPanelTitle != null) {
				_this.ClircleListPanelTitle = _this.Options.ClircleListPanelTitle;
			} else { }

			var btn = "";
			if (_this.ClircleListPanelTitle == "所有圈子") {
				btn = "<a class=\"btn btn-primary\" style=\"float:right\" href=\"$$module/SNS/Personal/Club/SNS_CLUBS$Insert$\">新建圈子</a>";
			} else {

			}

			var ClircleListPanel = "<div class=\"panel panel-default\">"
									+ "<div class=\"panel-body\"><b>"
									+ _this.ClircleListPanelTitle + btn
									+ "</b></div>"
									+ "<div class=\"panel-footer\">";

			if (_this.UserId == null || _this.UserId == "") {
				$.AKjs.getJSON("/sns/home/GetAllClubs", {}, res1);
			} else {
				$.AKjs.getJSON("/sns/home/GetUserClubs", { userID: _this.UserId }, res1);
			}

			function res1(res) {
				var publicDiv = "<div class=\"row\">";
				var notPublicDiv = "<div class=\"row\">";
				var myManagementCircleDiv = "<div class=\"row\">";
				var iTakePartInTheCircleDiv = "<div class=\"row\">";
				for (var i = 0; i < res.length; i++) {
					var _href = "$snsclubhome$" + res[i].FID;
					var _ClircleListItem = "<div class=\"col-sm-1 col-md-1\">"
											+ "<a class=\"thumbnail ACT-CLIRCLEID\"  clubid=\"" + res[i].FID + "\">"
											  + res[i].ClubImage.replace("/>", "  data-src=\"holder.js/100%x100%\"/>")
											+ "</a>"
											+ " <div class=\"caption\" style=\"text-align:center;white-space:nowrap;font-size:9pt;overflow:hidden;\" title=\"" + $(res[i].ClubName).html() + "\" >" + res[i].ClubName + "</div>"
										  + "</div>";
					if (res[i].ClubType == "public") {
						publicDiv += _ClircleListItem;
					} else if (res[i].ClubType == "notPublic") {
						notPublicDiv += _ClircleListItem;
					} else { }

					if (res[i].CurrentUserRole == 0) {
						myManagementCircleDiv += _ClircleListItem;
					} else if (res[i].CurrentUserRole == 1) {
						iTakePartInTheCircleDiv += _ClircleListItem;
					} else {

					}

				}
				publicDiv += "</div>";
				notPublicDiv += "</div>";
				myManagementCircleDiv += "</div>";
				iTakePartInTheCircleDiv += "</div>";

				if (_this.ClircleListPanelTitle == "所有圈子") {
					ClircleListPanel += "<div><h6>我的圈子</h6><div>";
					ClircleListPanel += notPublicDiv;
					ClircleListPanel += "<div><h6>其他圈子</h6><div>";
					ClircleListPanel += publicDiv;
				} else if (_this.ClircleListPanelTitle == "我的圈子") {
					ClircleListPanel += "<div><h6>我管理的圈子</h6><div>";
					ClircleListPanel += myManagementCircleDiv;
					ClircleListPanel += "<div><h6>我参与的圈子</h6><div>";
					ClircleListPanel += iTakePartInTheCircleDiv;
				} else {
					ClircleListPanel += myManagementCircleDiv;
					ClircleListPanel += iTakePartInTheCircleDiv;
				}

				ClircleListPanel += "</div></div>";
				_this.$JObj.append(ClircleListPanel);
				_this.$JObj.find(".ACT-CLIRCLEID").click(function () {
					if (_this.ClircleIds.indexOf(this.attributes["clubid"].value) != -1) {
						_this.ClircleIds = _this.ClircleIds.replace(this.attributes["clubid"].value + ",", "");
						$(this).css("border-color", "#dddddd");
					} else {
						_this.ClircleIds += this.attributes["clubid"].value + ",";
						$(this).css("border-color", "blue");
					}
				});
			}

});

       $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getCircleIds", function () {
            return this.ClircleIds.substring(0, ClircleListPanel.lastIndexOf(','))
            });
	}

	

})(jQuery);