(function ($) {
	$.AKjs = $.AKjs ? $.AKjs : {};

	$.fn.AtawPassword = function (options) {
		$.AKjs.AtawCreateCall.call(this, "AtawPassword", options);
	}

	$.AKjs.AtawPassword = function (options) {
		return $.extend({}, $.AKjs.AtawBaseText(options), new AtawPasswordControl());
	}

	//密码框
	function AtawPasswordControl() {
	    //重写创建标签方法
	    this.PlaceHolder = "请输入密码...";
//		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "createItem", function () {
//		    return $("<input   placeholder='请输入密码..' class='form-control aks-input'  type='" + this.getTypeName() + "' />");
//		});

		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getTypeName", function () {
			return "password";
		});
	}
})(jQuery);
