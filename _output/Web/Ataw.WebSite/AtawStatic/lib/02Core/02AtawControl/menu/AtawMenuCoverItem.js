(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawMenuCoverItem = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawMenuCoverItem()).sysCreator();
    }

    $.fn.AtawMenuCoverItem = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawMenuCoverItem", options);
    }

    function AtawMenuCoverItem() {
        this.Title = "";
        this.Key = "";
        this.IsFile = false;
        this.Arrange = "000";
        this.$Item = null;
        this.Index = 0;
        this.Icon = "";

        this.$A = $("<li class='quickMenu_con'>" + "<a class=\"ACT-A-HREF label\" " +
        "onmouseover=\"$.AKjs.Desk.OverFolder(this);\"" +
        "onmouseout=\"$.AKjs.Desk.OutFolder(this);\"></a></li>");

        //this.$A.wrap("<li class='CoverItemList'></li>");

        this.$Icon = $("<i class=\"ACT-FOLDER icon-5x \"></i>");

        this.$Title = $("<div class='quickMenuTitle'></div>");

        // }


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            this.AtawBaseJPlugIn_init();

            var _classNames = ["label-default", "label-success", "label-warning", "label-primary", "label-info", "label-danger"];
            this.$A.addClass(_classNames[(this.Index + 1) % 6]);
            //var param=
            //            var _href = "";
            //            if (this.IsFile) {
            //                var _pams = this.Key.split("$");
            //                if (_pams.length == 3) {
            //                    _href = this.Key + "$List$" + Base64.encode($.toJSON({ arrange: _this.Arrange }))
            //                } else if (_pams.length == 4) {
            //                    _href = this.Key + "$" + Base64.encode($.toJSON({ arrange: _this.Arrange }));
            //                } else if (_pams.length == 5) {
            //                    var param = _pams[4];
            //                    param = $.parseJSON(Base64.decode(param))
            //                    param.arrange = _this.Arrange;
            //                    _href = this.Key.substring(0, this.Key.lastIndexOf("$")) + Base64.encode($.toJSON(param));
            //                } else {
            //                    _href = this.Key;
            //                }
            //            }
            //            else {
            //                _href = "$menu$" + this.Key + "$" + _this.Arrange;
            //            }
            var _href = this.IsFile ? this.Key : "$menu$" + this.Key;
            this.$A.children("a").attr("href", _href);
            //            this.$A.click(function () {
            //                $.AKjs.App.openUrl(_href);
            //                var _obj = $.AKjs.App.$ActMap.AtawControl();
            //                if (_obj) {
            //                    if (_obj.length && _obj.length > 0) {
            //                        _obj[0].open(_this.Arrange);
            //                    } else
            //                        _obj.open(_this.Arrange);
            //                }
            //                _obj = $.AKjs.App.$ActLeftMenu.AtawControl();
            //                if (_obj) {
            //                    if (_obj.length && _obj.length > 0) {
            //                        _obj[0].open(_this.Arrange);
            //                    } else
            //                        _obj.open(_this.Arrange);
            //                }
            //                return false;
            //            })
            if (this.Icon != "") {
                this.$Icon.addClass(this.Icon)
            }
            else {
                this.$Icon.addClass(this.IsFile ? "icon-file-alt fa fa-file-text-o" : "icon-folder-close fa fa-folder");
            }

            this.$Title.append(this.Title);
            this.$A.children("a").append(this.$Icon);
            this.$A.children("a").append(this.$Title);
            this.$JObj.append(this.$A);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("Title", "Title");
            this.setProByOptName("Key", "Key");
            this.setProByOptName("Arrange", "Arrange");
            this.setProByOptName("IsFile", "IsFile");
            this.setProByOptName("Index", "Index");
            this.setProByOptName("Icon", "Icon");


        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "clickOpen", function () {
            //-----------------
        });

    }

})(jQuery);