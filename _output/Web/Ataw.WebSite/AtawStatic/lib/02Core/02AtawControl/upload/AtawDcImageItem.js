(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    // 未完成
    //类的构造函数
    $.AKjs.AtawDcImageItem = function (options) {
        var _base = $.extend({}, $.AKjs.AtawBaseDom(options), new AtawDcImageItem());
        return _base.sysCreator();
    };

    function AtawDcImageItem() {
        this.$Img = $("<img  />");
        this.$BtDel = $("<span  class='btn btn-default'>删除</span>");
        this.ImageObj = null;
        this.Key = "";
        this.ImgSrc = "";
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            //--------------
            this.setProByOptName("ImageObj", "ImageObj");
            this.setProByOptName("Key", "Key");
            if (this.ImageObj != null) {
                this.ImgSrc = $.AKjs.GetImgByResource(this.ImageObj);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            this.$JObj.append(this.$Img);
            this.$Img.attr("src", this.ImgSrc);
            this.$JObj.attr("key", this.Key);
            this.$JObj.append(this.$BtDel);
            var _this = this;
            this.$BtDel.off("click").on("click", function () {
                _this.$JObj.remove();
            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getValue", function () {
            //-----------
            return $.AKjs.GetFirstItemByResource(this.ImageObj);

        });

    };


})(jQuery);