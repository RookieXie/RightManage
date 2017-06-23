(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    //类的构造函数
    $.AKjs.AtawFileShowItem = function (options) {
        var _base = $.extend({}, $.AKjs.AtawBaseShowItem(options), new AtawFileShowItem());
        return _base.sysCreator();
    }

    function AtawFileShowItem() {

        this.$Link = $("<a target='_bank'   class='ACT-HREF' />");
        this.$DcViewBtn = $("<a class='btn  btn-xs'><i class='icon-zoom-in fa fa-search-plus'></i></a>");

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initContent", function () {

            this.$Link.attr("href", this.ResourceInfo.HttpPath);
            this.$Link.text(this.Title);
            //var va= 
            // 
            var _$view = $("<div/>");
            this.$JObj.append(_$view);
            if (this.ResourceInfo.CanDocumentView) {

                _$view.append(this.$DcViewBtn);

                var _this = this;
                this.$DcViewBtn.click(function () {
                    var x = window.screen.width * 0.9;
                    var y = window.screen.height * 0.9;
                    // alert(x+ "  "+y);
                    // window.open("/DocumentViewer/Viewer/Doc?doc=" + _this.ResourceInfo.FileId + _this.ResourceInfo.ExtName);
                    window.showModalDialog("/DocumentViewer/Viewer/Doc?doc=" + _this.ResourceInfo.DocumentViewId, "", "dialogWidth=" + x + "px;dialogHeight =" + y + "px");
                });
            }
            _$view.append(this.$Link);

        });

    }

})(jQuery);