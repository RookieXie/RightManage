(function ($) {
	$.AKjs = $.AKjs ? $.AKjs : {};


	$.AKjs.AtawTreeColumnDom = function (options) {
		return $.extend({}, $.AKjs.AtawBaseColumnDom(options), new AtawTreeColumnDom()).sysCreator();
	}
	function AtawTreeColumnDom() {
		this.$Dl = $("<dl class='dataTable_line'><dd class='dl_name'></dd><dd class='NF_content'></dd></dl>");
		this.$Dt = this.$Dl.find("dd:eq(0)");
		this.$Dd = this.$Dl.find("dd:eq(1)");

		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
			this.$JObj.find(".data_row3").append(this.$Dl);
			if (this.Prompt == null || this.Prompt == "") {
				this.$Dt.append(this.DisplayName + "：");
			} else {
				this.$Dt.append(this.DisplayName + "：(" + this.Prompt + ")");
			}
			this.AtawControlObj.intoDom(this.$Dd);
			if (this.ColumnConfig.ControlType == "Hidden") {
				this.$Dl.hide();
			}
			var _showType = this.ColumnConfig.ShowType;
			var _controlType = this.Options.ColumnConfig.ControlType;
			switch (_showType) {
				case 1:
					break;
				case 2:
					this.$Dl.addClass("dl_column-2");
					break;
				default:
					this.$Dl.addClass("dl_column-all");
					break;
			}


			this.AtawBaseColumnDom_init();
		});

	}

})(jQuery);
