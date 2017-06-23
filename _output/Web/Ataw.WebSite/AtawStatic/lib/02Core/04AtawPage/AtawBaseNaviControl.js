(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawBaseNavi = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawBaseNaviControl()).sysCreator();
    }

    function AtawBaseNaviControl() {
        this.$NaviControl = $("<div class='panel panel-default br3 acs-leftBasePannel'></div>");
        
        //<a><i class=' icon-caret-down icon-large'  />&nbsp</a>
        this.$Title = $("<div class='panel-heading'><h4 class='panel-title'><a>&nbsp</a></h4></div>");
        this.$Content = $("<div class='panel-body' style='display:none;overflow-x:auto;'><ul class='timeline'></ul></div>");
        this.NaviFrom = null;
        this.Data = null;
        this.ExtData = null;
        this.Callback = null;
        this.isRefresh = false;
        this.TableName = "";
        this.CurrentSelectedID = [];

        this.IsExpand = false;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.NaviFrom = this.Options.Form;
            this.Data = this.Options.Data;
            this.ExtData = this.Options.ExtData;
            this.Callback = this.Options.Callback;
            if (this.Options.Form) {
                this.isRefresh = this.Options.Form.IsRefrech;
                this.TableName = this.Options.Form.Options.DataValue.TableName;
                this.IsExpand = !this.Options.Form.IsExpand;
            }
            var naviParameter = this.getNaviParameter();
            this.CurrentSelectedID = naviParameter ? this.CurrentSelectedID.concat(naviParameter) : this.CurrentSelectedID;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createContent", function () {

        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            if (this.NaviFrom) {
                this.$Title.find("a").text(this.NaviFrom.DisplayName);
            }
            this.$NaviControl.append(this.$Title);
            this.createContent();
            this.$NaviControl.append(this.$Content);
            this.$JObj.append(this.$NaviControl);
            var _this = this;
            if (this.IsExpand) {
                _this.$Content.show();
                //_this.$Title.find("i").addClass("icon-caret-up icon-large");
                //_this.$Title.find("i").removeClass("icon-caret-down icon-large");
            }
            this.$Title.unbind("click").bind("click", function () {
                if (_this.IsExpand) {
                    _this.IsExpand = false;
                    _this.$Content.hide();
                    //_this.$Title.find("i").addClass("icon-caret-down icon-large");
                    //_this.$Title.find("i").removeClass("icon-caret-up icon-large");
                }
                else {
                    _this.IsExpand = true;
                    _this.$Content.show();
                    //_this.$Title.find("i").addClass("icon-caret-up icon-large");
                    //_this.$Title.find("i").removeClass("icon-caret-down icon-large");
                }
            });

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createPostDataSet", function () {
            var res = {};
            var name = this.NaviFrom.Name;
            res[name] = this.getCurrentSelectedItem();
            return res
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getCurrentSelectedItem", function () {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reload", function () {
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getNaviParameter", function () {
            if (this.ExtData && this.ExtData.PageState) {
                var pageState = $.parseJSON(Base64.decode(this.ExtData.PageState));
                if (pageState && pageState.navi && pageState.navi[this.NaviFrom.Name]) {
                    return pageState.navi[this.NaviFrom.Name].split(",");
                }
            }
            //            var param = $.AKjs.App.GetPageStateParam();
            //            if (param && param.navi && param.navi[this.NaviFrom.Name]) {
            //                return param.navi[this.NaviFrom.Name].split(",");
            //            }
        });
    }


})(jQuery);