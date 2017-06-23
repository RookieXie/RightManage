(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawAllImageShow = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawAllImageShow()).sysCreator();
    }
    $.fn.AtawAllImageShow = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawAllImageShow", options);
    }

    function AtawAllImageShow() {

        this.ResourceInfoList = [];
        this.ShowImageItemList = [];

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "creator", function () {

            //this.setProByOptName("ResourceInfoList", "ResourceInfoList");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            //var _
            var uldiv = $('<div class="ACT-UPLOAD-RESULT upload-result"></div>');
            var _val = this.DataValue.getValue();
            this.ResourceInfoList = $.parseJSON(_val, true);

            var _resourceArrange = $.parseJSON(_val, true);
            if (_resourceArrange && _resourceArrange.CoverIndex != undefined && _resourceArrange.ResourceInfoList) {
                this.ResourceInfoList = _resourceArrange.ResourceInfoList;
                if (this.ResourceInfoList && $.isArray(this.ResourceInfoList)) {
                    for (var i = 0; i < this.ResourceInfoList.length; i++) {
                        var _res = this.ResourceInfoList[i];
                        var _op = {
                            ResourceInfo: _res,
                            IsDetail: true,
                            IsCover: i == _resourceArrange.CoverIndex
                        };
                        var _dv = $("<div class='fileItem' style='margin-bottom:10px' />");
                        uldiv.append(_dv);
                        $.AKjs.AtawImageShowItem(_op).intoDom(_dv);
                    }
                }
            }
            this.$JObj.append(uldiv);
            this.$JObj.append("<span>&nbsp;</span>");

        });

    }

})(jQuery);