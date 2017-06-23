(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.fn.AtawDetail = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawDetail", options);
    }

    //类的构造函数
    $.AKjs.AtawDetail = function (options) {

        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawDetailControl()).sysCreator();
    }

    function AtawDetailControl() {
        this.DataText = null;
        this.RegName = null;
        this.IsDetailLink = false;
        this.LinkFormat = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("RegName", "RegName");
            this.DataText = $.AKjs.RegNameDataGet(this.RegName, this.DataValue.Ds, this.DataValue, "", this.DataValue.Index);
            if (this.ParentColumnObj && this.ParentColumnObj.ColumnConfig) {
                this.IsDetailLink = this.ParentColumnObj.ColumnConfig.IsDetailLink;
                this.LinkFormat = this.ParentColumnObj.ColumnConfig.LinkFormat;
            }
            //alert(this.DataText);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            this.$JObj.addClass("acs-detail");
            // throw {message:"23"};
            this.DataText = this.valueFormat(this.DataText);
            var _options = this.Options;
            if (_options.url) {
                this.$JObj.append("<a/>");
            }
            if (this.DataText === "" || this.DataText === null || (this.DataText.trim && this.DataText.trim() === "")) {
                this.DataText = "(空)";
            }
            if (this.IsDetailLink) {
                var $detailLink = $("<a href='javascript:void(0)'>" + this.DataText + "</a>")
                $detailLink.click(function () {
                    var listPageObj = _this.ParentFormObj.ParentPageObj;

                    var fid = _this.ParentColumnObj.ParentRowObj.DataRow[_this.ParentColumnObj.ParentRowObj.Options.PrimaryKey];
                    $.AKjs.AppGet().openUrl("$windefault$" + listPageObj.RegName.substring(0, listPageObj.RegName.indexOf('.xml')) + "$Detail$" + Base64.encode($.toJSON({ keys: fid })));
                })
                this.$JObj.append($detailLink);
            } else {
                if (this.LinkFormat) {
                    var _link = this.LinkFormat;
                    if (this.DataText === "" || this.DataText === null || (this.DataText.trim && this.DataText.trim() === "")) {
                        this.DataText = "(空)";
                    }
                    var $detailLink = $("<a  class='ACT-A-HREF' href='javascript:void(0)'>" + this.DataText + "</a>")
                   // $detailLink.attr("title",);
                    var listPageObj = _this.ParentFormObj.ParentPageObj;

                    var _row = _this.ParentColumnObj.ParentRowObj.DataRow;
                    var _href = $.AKjs.Template(_link, _row);
                    $detailLink.attr("href", _href);
                    this.$JObj.append($detailLink);
                    $.AKjs.AppGet().bindPageEvent(this.$JObj);

                }
                else {
                    if (this.DataText === "" || this.DataText === null || (this.DataText.trim && this.DataText.trim() === "")) {
                        this.$JObj.text("(空)");
                    }
                    else {
                        this.$JObj.append(this.DataText);
                    }
                }
            }
            
            //if (this.$JObj.text() == "") {
            //    this.$JObj.text("(空)");
            //}
            
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            return this.$JObj.html();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            this.$JObj.html(opt_str);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "addWriteBr", function (opt_str) {
            var _str = $.AKjs.CreateBuffer(this.dataValue()).ad("<br/>").ad(opt_str).toString();
            this.dataValue(_str);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "valueFormat", function (val) {
            if (this.DetialFormatFun) {
                var _val = $("<span>" + val + "</span>").text();
                val = this.DetialFormatFun(_val, this.ParentFormObj, val, this);
            }
            //alert(val);
            return val;
        });

    }
})(jQuery);