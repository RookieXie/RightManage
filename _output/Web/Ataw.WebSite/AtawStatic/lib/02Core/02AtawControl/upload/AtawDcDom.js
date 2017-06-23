(function ($) {
	$.AKjs = $.AKjs ? $.AKjs : {};


	//类的构造函数
	$.AKjs.AtawDcDom = function (options) {
		var _base = $.extend({}, $.AKjs.AtawBaseControl(options), new AtawDcDom());
		return _base.sysCreator();
	};

	function AtawDcDom() {
		this.$DocumentBody = $("<div>" +
        "<div class='row'><div id='ACT-WINDOW-LEFT-UPLOAD' class='col-md-3'></div><div class='col-md-8 ACT-DC'></div><div class='col-md-1 ACT-SELECTOR'></div>" +
        "</div>" +
        "<div class='row '><span class='btn btn-primary ACT-SURE '>确定</span></div>" +
        "<div>");
		//this.IsMulti = false;
		this.ResList = null;
		//this.DcItemList = null;
		this.IsSingle = false;
		this.BtnSureFun = null;
		this.Type = null;
		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
			//--------------
			this.setProByOptName("BtnSureFun", "BtnSureFun");
			this.setProByOptName("IsSingle", "IsSingle");
			this.setProByOptName("Type", "Type");
		});

		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
			var _this = this;
			this.$JObj.append(this.$DocumentBody);
			var _xml = _this.Type == null ? "SNS_dc" : "SNS_DC_" + this.Type;
			$.AKjs.getJSON("/module/module", { xml: "module/SNS/Documentcenter/" + _xml, pageStyle: "List" }, _fun);
			function _fun(res) {
				//----------------
				res.IsPart = true;
				res.IsInner = true;
				res.NoDbClick = true;
				res.OnSingleCheckBoxFun = function (a, cb) {
					// alert(1);
					var _$cb = $(cb);
//					var _isCheck = _$cb.prop("checked");
					var _isCheck = _$cb.attr("ichecked");
					// alert(_isCheck);
					if (_isCheck) {
						var _$row = _$cb.parent().parent().parent();
						var _$img = _$row.find(".ACT-IMG-FILE");
						if (_$img.length > 0) {
							// alert(_$img.length);
							var _id = _$img.attr("key");
							var _$con = _this.$DocumentBody.find(".ACT-SELECTOR");
							var _l = _$con.find(".ACT-ITEM[key='" + _id + "']").length;
							// alert(_l);
							if (_l == 0 && (_this.Type == null || _this.Type == "PICTURES")) {
								var _files = _$img.data("Ataw-File");

								var _op = { ImageObj: _files, Key: _id };
								var _obj = $.AKjs.AtawDcImageItem(_op);
								var _$dv = $("<div class='ACT-ITEM'/>");
								_$con.append(_$dv);
								_obj.intoDom(_$dv);
								if (_this.IsSingle) {
									if (_this.BtnSureFun != null) {
										_this.BtnSureFun(_this.dataValue());
									}
								}
							}
						}


						//							//文章
						//							//=========================================================================
						//							var _$file = _$row.find(".ACT-ARTICLE-FILE");

						//其他文件
						//=========================================================================
						var _$otherFile = _$row.find(".ACT-OTHER-FILE");
						if (_$otherFile.length > 0) {
							var _otherId = _$otherFile.attr("key");
							var _$otherCon = _this.$DocumentBody.find(".ACT-SELECTOR");
							var _l = _$otherCon.find(".ACT-ITEM[key='" + _otherId + "']").length;
							if (_l == 0 && (_this.Type == null || _this.Type == "FILES")) {
								var _otherFiles = _$otherFile.data("Ataw-File");
								var _otherOp = { FileObj: _otherFiles, Key: _otherId };
								var _otherObj = $.AKjs.AtawDcFileItem(_otherOp);
								var _$otherDv = $("<div class='ACT-ITEM'/>");
								_$otherCon.append(_$otherDv);
								_otherObj.intoDom(_$otherDv);
								if (_this.IsSingle) {
									if (_this.BtnSureFun != null) {
										_this.BtnSureFun(_this.dataValue());
									}
								}
							}
						}
					}
				};

				res.NaviContentSelector = _this.$DocumentBody.find("#ACT-WINDOW-LEFT-UPLOAD");
				_this.$DocumentBody.find(".ACT-DC").AtawListPage(res);


			};

			this.$DocumentBody.find(".ACT-SURE").off("click").on("click", function () {
				if (_this.BtnSureFun != null) {
					var _dv = _this.dataValue(_dv);
					_this.BtnSureFun(_dv);
					// alert($.toJSON(_dv));
				}

			});
		});

		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Set", function () {
			//---------- 无状态 不实现
		});
		$.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Get", function () {
			//----------
			var _list = [];
			var _$con = this.$DocumentBody.find(".ACT-SELECTOR").find(".ACT-ITEM");
			for (var i = 0; i < _$con.length; i++) {
				// alert($.toJSON(_$con.eq(i).AtawControl().getValue()));
				var _item = _$con.eq(i).AtawControl().getValue();
				_item.IsDocument = true;
				_list.push(_item);
			}
			return _list;

		});


	};


})(jQuery);