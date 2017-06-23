(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    //类的构造函数
    $.AKjs.AtawBaseShowItem = function (options) {
        var _base = $.extend({}, $.AKjs.AtawBaseDom(options), new AtawBaseShowItem());
        return _base.sysCreator();
    }

    function AtawBaseShowItem() {

        this.ResourceInfo = null;
        this.UploadObj = null;
        this.IsDetail = false;
        this.$Del = $("<a   class=\"ACT_DEL insearchBtn\"><span>删除</span></a>");
        this.$SetMainItem = $("<a  title='设置为封面' class=\"ACT_SET_MAIN_ITEM pull-right\"><i class='icon-save fa fa-save'></i></a>");
        this.Title = "";
        this.IsCover = false;
        this.IsSimple = false;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {

            this.setProByOptName("ResourceInfo", "ResourceInfo");
            this.setProByOptName("UploadObj", "UploadObj");
            this.setProByOptName("IsDetail", "IsDetail");
            //this.setProByOptName("IsCover", "IsCover");
            if (this.ResourceInfo && this.ResourceInfo.IsCover) {
                this.IsCover = this.ResourceInfo.IsCover;
            }
            if (this.UploadObj && this.UploadObj.IsSimple) {
                this.IsSimple = true;
            }
            this.Title = this.ResourceInfo.FileNameTitle + this.ResourceInfo.ExtName + "(" + this.ResourceInfo.FileSizeK + "K)";
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.initContent();
            var _this = this;
            if (!this.IsDetail) {
                var _$del = null;
                var imghref = this.$JObj.find(".ACT-IMAGE-HREF");
                if (imghref.length == 0) {
                    _$del = $("<a   class=\"ACT_DEL close\" title='删除'><i class='icon-remove fa fa-times'></i></a>");
                    this.$JObj.parent().addClass("upload");
                    this.$JObj.addClass("clear");
                }
                else {
                    _$del = $("<a  class=\"ACT_DEL cose\" title='删除'><i class='icon-trash fa fa-trash-o'></i></a>");

                }
                this.$JObj.append(_$del);
                _$del.unbind("click").click(function () {
                    _this.UploadObj.ResourceInfoList.Aremove(_this.ResourceInfo);
                    _this.$JObj.remove();
                    _this.UploadObj.triggerChangeEvent();
                });
            }
            this.initSetMainItem();
            if (this.IsCover && !_this.IsSimple) {
                this.$JObj.find(".icon-save").css("color", "#ff0000");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initContent", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "SetCover", function (isCover) {
            this.IsCover = isCover;
            this.ResourceInfo.IsCover = isCover;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initSetMainItem", function () {
            var _$dv = this.$JObj.parent();
            var _this = this;
            if (!_this.IsDetail && !_this.IsSimple && _this.sys_ataw_fun_name.toLowerCase().indexOf("file") == -1) {
                this.$SetMainItem.off("click").on("click", function () {
                    var _$dvs = _$dv.find(".ACT_FILE_ITEM");
                    _$dvs.each(function () {
                        var _$item = $(this);
                        _$dvs.find(".icon-save").removeAttr("style");
                        _$dvs.find(".thumbnail").removeClass("active");
                        _$item.AtawControl().SetCover(false);
                    })
                    _this.$JObj.find(".icon-save").css("color", "#ff0000");
                    _this.SetCover(true);
                    _this.$JObj.find(".thumbnail").addClass("active");
                    alert("设置成功,请点击提交按钮确认设置!");
                    _this.UploadObj.triggerChangeEvent();
                });
                var dsdsss = _this.$JObj.find(".thumbnail");
                _this.$JObj.find(".thumbnail").append(this.$SetMainItem);
            }
        });
    }

})(jQuery);