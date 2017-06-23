(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //alert();
    //上传多图片
    $.AKjs.AtawMultiImageUpload = function (options) {
        return $.extend({}, $.AKjs.AtawSingleImageUpload(options), new AtawMultiImageUploadControl()).sysCreator();
    };
    $.fn.AtawMultiImageUpload = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawMultiImageUpload", options);
    };

    //上传图片裁剪控件
    function AtawMultiImageUploadControl() {
        this.Multi = true;
        this.IsCut = false;
        this.IsSingle = false;
        this.MinUploadCount = 0;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("MinUploadCount", "MinUploadCount");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "imagePreview", function (resourceInfo, isInit) {
           // this.$JObj_Result.html("");
            var _$imageShow = $("<div  class='ACT_FILE_ITEM fileItem pull-left'/>");
            this.$JObj_Result.append(_$imageShow);
            this.$JObj_Result.parent().show();

           // this.ResourceInfoList = [];
            if (!isInit) {
                this.ResourceInfoList.push(resourceInfo);
            }

            var _op = {
                ResourceInfo: resourceInfo,
                UploadObj: this
            };
            var _obj = $.AKjs.AtawImageShowItem(_op);
            //this.ResourceInfoDict["Res" + _obj.Guid] = _obj;
            _obj.intoDom(_$imageShow);
        });

    }
})(jQuery);