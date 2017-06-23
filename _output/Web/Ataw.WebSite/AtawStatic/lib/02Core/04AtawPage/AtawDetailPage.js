(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawDetailPage = function (options) {
        return $.extend({}, $.AKjs.AtawViewPage(options), new AtawDetailPage()).sysCreator();
    }


    $.fn.AtawDetailPage = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawDetailPage", options);
    }

    function AtawDetailPage() {
        this.$Grid = $("<div class=\"ACT-DETAIL-PAGE\"></div>");
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.PageStyle = "Detail";
            this.AtawViewPage_creator();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterInit", function () {
            this.$Submit.hide();
            this.$Submit2.hide();
            //-------
            if ($.PObj) {
                this.initLastNextBtn();
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initLastNextBtn", function () {
            var _$dv = this.$JObj.find(".ACT-PAGE-TITLE");
            var _$spanNext = $("<a  />");
            var _$spanLast = $("<a  />");
            //  alert(this.KeyValue);
            if ($.PObj && $.PObj.getFid) {
                var _id = $.PObj.getFid(this.KeyValue, false);
                // alert("上一个" + _id);
                var _id2 = $.PObj.getFid(this.KeyValue, true);
                // alert("下一个" + _id2);
                if (_id) {
                    _$dv.append(_$spanLast);
                    _$spanLast.AtawButton({
                        Text: "上一记录",
                        Icon: " icon-circle-arrow-left fa fa-arrow-circle-left",
                        // btnCss: "icon-large",
                        ClickFun: function () {
                            $.PObj.openWinDetail(_id);
                        }
                    });
                }
                else {

                }

                _$dv.append("&nbsp;&nbsp;");
                if (_id2) {
                    _$dv.append(_$spanNext);
                    _$spanNext.AtawButton({
                        Text: "下一记录",
                        Icon: " icon-circle-arrow-right fa fa-arrow-circle-right",
                        btnCss: "pull-right",
                        ClickFun: function () {
                            $.PObj.openWinDetail(_id2);
                        }
                    });
                }
            }

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initForms", function () {
            //this.initDesktopShortcut();
            this.AtawViewPage_initForms();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initTitle", function () {
            this.$Title = $("<div>" + this.Title + "</div>");
        });
        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initHeader", function () {
        //            var $btnGroup = $('div class="btn-group pull-right"></div>');
        //            $btnGroup.append(this.getShortcutBtnJObj());
        //            this.$PanelHeader.append(this.Title).append($btnGroup);
        //        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "afterPostData", function () {
            this.openListPage();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "getPageState", function () {
            this.PageState = {};
            if (this.KeyValue) {
                this.PageState.keys = this.KeyValue;
            }
            return this.AtawViewPage_getPageState();
        });
    }
})(jQuery);
