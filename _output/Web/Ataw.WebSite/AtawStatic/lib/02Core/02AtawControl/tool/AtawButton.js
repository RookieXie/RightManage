(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawButton = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawButton()).sysCreator();
    }
    $.fn.AtawButton = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawButton", options);
    }

    $.AKjs.AtawButtonKind = {
        FunBtn: "functionBtn",
        SearchBtn: "insearchBtn"
    };
    //$.AKjs.AtawWindowIndex = 10000;
    //列的基类
    function AtawButton() {
        this.Text = null;
        this.ButtonKind = $.AKjs.AtawButtonKind.FunBtn;
        this.ClickFun = null; // AtawButton: bool 返回值决定事件冒泡
        this.HrefUrl = null;
        this.Name = null;
        this.BtnCss = "";
        this.Icon = "";
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("Name", "Name");
            this.setProByOptName("Text", "Text");
            this.setProByOptName("ButtonKind", "ButtonKind");
            this.setProByOptName("ClickFun", "ClickFun");
            this.setProByOptName("HrefUrl", "HrefUrl");

            this.setProByOptName("Icon", "Icon");
            this.setProByOptName("BtnCss", "BtnCss");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _$sp = $("<span/>");
            this.$JObj.append(_$sp);
            this.$JObj.addClass("ACT-ROW-BTN   ACT-BT-" + this.Name);
            switch (this.Name) {
                case "Insert":
                    if (this.Text != "新增") {
                        _$sp.html("<i class='icon-plus fa fa-plus icon-white' >" + this.Text + "</i>");
                        this.$JObj.addClass('Hs-btn-insert');
                        break;
                    }
                    _$sp.html("<i class='icon-plus fa fa-plus icon-white'></i> 新增");
                    this.$JObj.addClass('Hs-btn-insert');
                    break;
                case "Delete":
                    if (this.Text != "删除") {
                        _$sp.html("<i class='icon-trash fa fa-trash' >" + this.Text + "</i>");
                        this.$JObj.addClass('btn-primary');
                        break;
                    }
                    _$sp.html("<i class='icon-trash fa fa-trash icon-white' > </i>删除");
                    this.$JObj.addClass('btn-primary');
                    break;
                case "Update":
                    if (this.Text != "编辑") {
                        _$sp.html("<i class='icon-edit fa fa-edit icon-white' > " + this.Text + "</i>");
                        this.$JObj.addClass('btn-primary');
                        break;
                    }



                    _$sp.html("<i class='icon-edit fa fa-edit icon-white' ></i> 编辑");
                    this.$JObj.addClass('btn-primary');
                    break;
                case "Detail":
                    if (this.Text != "详细") {
                        _$sp.html("<i class='icon-table fa fa-table' > " + this.Text+"</i>");
                        this.$JObj.addClass('btn-primary');
                        break;
                    }
                    _$sp.html("<i class='icon-table fa fa-table' > </i>详细");
                    this.$JObj.addClass('btn-primary');
                    break;
                //icon-mobile-phone                       
                case "btMobilePage":
                    _$sp.html("<i class='icon-mobile-phone fa fa-mobile-phone icon-white' > 手机版" + "</i>");
                    // this.$JObj.addClass('btn-info');
                    break;
                // icon-globe                        
                case "btQing":
                    _$sp.html("<i class='icon-globe fa fa-globe' > 轻办公" + "</i>");
                    // this.$JObj.addClass('btn-info');
                    break;
                // icon-file-alt                       
                case "btReportPage":
                    _$sp.html("<i class='icon-file-alt  fa fa-file-text-o ' > 报表" + "</i>");
                    // this.$JObj.addClass('btn-info');
                    break;
                case "DesktopShortcut":
                    _$sp.html("<i class='icon-star-empty fa fa-star-o' > 桌面快捷方式" + "</i>");
                    break;
                default:
                    if (this.Icon && this.Icon != "") {
                        _$sp.html("<i class='" + this.Icon + " ' ></i>" + this.Text);
                    } else {
                        _$sp.text(this.Text);
                    }
                    if (this.BtnCss && this.BtnCss != "") {
                        this.$JObj.addClass(this.BtnCss);
                    }
                    break;
            }


            this.$JObj.addClass(this.ButtonKind);
            this.$JObj.addClass("btn-xs");
            var _this = this;
            this.$JObj.click(function () { return _this.clickMethod(); });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "clickMethod", function () {
            if (!this.$JObj.hasClass("ACT-btn-disabled")) {
                var _isFunRes = true;
                if (this.ClickFun) {
                    _isFunRes = this.ClickFun(this);
                }
                if (_isFunRes && this.HrefUrl) {
                    window.location.href = this.HrefUrl;
                }
            }
            else {
                alert("按钮不可用！！");
                return false;
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            this.$JObj.unbind();
            this.AtawBaseDom_dispose();
        });
    }


})(jQuery);