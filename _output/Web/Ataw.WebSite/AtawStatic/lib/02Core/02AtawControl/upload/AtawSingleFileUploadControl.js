(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //上传单文件
    $.AKjs.AtawSingleFileUpload = function (options) {
        return $.extend({}, $.AKjs.AtawBaseUpload(options), new AtawSingleFileUploadControl()).sysCreator();
    }
    $.fn.AtawSingleFileUpload = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawSingleFileUpload", options);
    }

    //上传文件控件
    function AtawSingleFileUploadControl() {
        this.IsSingle = true;
        this.$DocumentCenter = $("<a  class='btn btn-default aks-dc-btn act-bind'>资料中心 </a>");

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

            this.AtawBaseUploadControl_init();
            if (this.HasDocumentCenter) {
                this.$JObj.find(".ACT-RIGHT").append(this.$DocumentCenter);

                var _this = this;
                this.$DocumentCenter.off("click").on("click", function () {
                    var _$dc = $("<div/>");
                    _$dc.AtawWindow({
                        Title: "资料中心",
                        Width: "98%"
                    });
                    var win = _$dc.AtawControl();

                    var _op = {
                        IsSingle: _this.IsSingle,
                        BtnSureFun: function (a) {
                            //alert($.toJSON(a));
                            win.close();
                            win.dispose();
                            _$dc.clear(true);
                            _this.triggerChangeEvent();
                            for (var _i = 0; _i < a.length; _i++) {
                                _this.fileDisplayView(a[_i], false);
                            }
                        },
                        Type: "FILES"
                    };
                    var _Obj = $.AKjs.AtawDcDom(_op);
                    _Obj.intoDom(_$dc);
                    win.open();
                });
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "fileDisplayView", function (resourceInfo) {
            this.$JObj_Result.html("");
            var _$fileShow = $("<div  class='ACT_FILE_ITEM' />");
            this.$JObj_Result.append(_$fileShow);

            this.ResourceInfoList = [];
            this.ResourceInfoList.push(resourceInfo);
            var _op = {
                ResourceInfo: resourceInfo,
                UploadObj: this
            };
            var _obj = $.AKjs.AtawFileShowItem(_op);
            // this.ResourceInfoDict["Res" + _obj.Guid] = _obj;
            _obj.intoDom(_$fileShow);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initUploadFile", function (resObj) {
            this.fileDisplayView(resObj, true);
        });

        //重写基类上传成功方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "successFun", function (options) {
            this.AtawBaseUploadControl_successFun();
            var _this = this;
            return function(fileObj, data, response) {

                var _res = $.parseJSON(data); //转换成json格式
                $.AKjs.ActionResponse_Commond_Fun(_res, _fun);

                function _fun(_ree) {
                    _this.triggerChangeEvent();
                    _this.fileDisplayView(_ree);

                    if (_this.AfterUpLoadFun) {
                        _this.AfterUpLoadFun(_ree);
                    }
                }
            };
        });

    }

})(jQuery);