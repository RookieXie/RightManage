(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //上传多文件
    $.AKjs.AtawMultiFileUpload = function (options) {
        return $.extend({}, $.AKjs.AtawSingleFileUpload(options), new AtawMultiFileUploadControl()).sysCreator();
    };
    $.fn.AtawMultiFileUpload = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawMultiFileUpload", options);
    };

    //上传图片裁剪控件
    function AtawMultiFileUploadControl() {
        this.Multi = true;
        //重写获取值方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "fileDisplayView", function (resourceInfo, isInit) {
            // this.$JObj_Result.html("");
            var _$fileShow = $("<div class='ACT_FILE_ITEM'  />");
            this.$JObj_Result.append(_$fileShow);

            //this.ResourceInfoList = [];
            if (!isInit) {
                this.ResourceInfoList.push(resourceInfo);
            }
            var _op = {
                ResourceInfo: resourceInfo,
                UploadObj: this
            };
            var _obj = $.AKjs.AtawFileShowItem(_op);
            // this.ResourceInfoDict["Res" + _obj.Guid] = _obj;
            _obj.intoDom(_$fileShow);
        });

    }
})(jQuery);