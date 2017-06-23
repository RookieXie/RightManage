(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawLeftMenuTree = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawLeftMenuTree()).sysCreator();
    }

    $.fn.AtawLeftMenuTree = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawLeftMenuTree", options);
    }

    function AtawLeftMenuTree() {
        this.Data = null;
        this.MenuItems = null; //菜单项的树
        this.RootSign = "0";
        this.RootItems = [];
//        this.$Ul = $("<ul  style='padding-left:1em;font-size: 12px;max-height:35em;overflow-y: auto;'  class=\"nav nav-pills nav-stacked\"></ul>");
        this.$Ul = $("<ul class=\"ask-sider-left\" style=\"overflow-y: auto;\"></ul>");
       
        this.SelectArrangeItem = "";
        this.OpenItems = [];
        this.SelectItemObj = null;

        this.ClickFun = null; //function(arrange,item)

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            // var b1 = new Date();
            this.setProByOptName("Data", "Data");
            //SelectArrangeItem
            this.setProByOptName("SelectArrangeItem", "SelectArrangeItem");
            this.setProByOptName("ClickFun", "ClickFun");
            this.SetArrangeList();
            var _obj = $.AKjs.AtawLeftMenuRootItem({
                Data: this.Data,
                OpenItems: this.OpenItems,
                TreeObj: this
            });
            this.RootItems = _obj.ItemChildrens;
            //this.MenuSpanClickFun = function (a) { alert(a); };
            //            var b2 = new Date();
            //            alert(b2 - b1);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            // var b1 = new Date();

            this.$Ul.addClass("T000");
            this.$Ul.data("ATAW_CONTROL", this);
            //this.$Ul.hide();
            for (var i = 0; i < this.RootItems.length; i++) {
                //var _$li = $("<li class='li-menHu-item'  />");
                var _$li = $("<li />");
                this.$Ul.append(_$li);
                this.RootItems[i].intoDom(_$li);
            }
            this.$JObj.append(this.$Ul);

            //            var _$mainleft = $(".mainLeft");
            //            if (_$mainleft.length > 0) {
            //                _$mainleft.mouseover(function () {
            //                    var _$dv = $(this);
            //                    _$dv.show();
            //                })
            //                .mouseleave(function (e) {
            //                    //alert();
            //                    var _$dv = $(this);
            //                    var x = e.pageX;
            //                    var _w = _$dv.width();
            //                    // alert(x);
            //                    if (x > _w) {
            //                        var _$dv = $(this);
            //                        _$dv.hide("fast");
            //                        _$dv.data("fast", false);
            //                    }

            //                    // }
            //                });
            //            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "hideModule", function () {
            var _$j = this.$JObj.find(".MATE_APP_CENTER");
            if (_$j.length > 0) {
                var _obj = _$j.AtawControl();
                if (_obj) {
                    var _list = _obj.ItemChildrens;
                    for (var _i = 0; _i < _list.length; _i++) {
                        _list[_i].$JObj.hide();
                    }
                    _$j.children().eq(0).hide();
                }

            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "showModule", function () {
            var _$j = this.$JObj.find(".MATE_APP_CENTER");
            if (_$j.length > 0) {
                var _obj = _$j.AtawControl();
                if (_obj) {

                    _$j.children().eq(0).show();
                    var _list = _obj.ItemChildrens;
                    for (var _i = 0; _i < _list.length; _i++) {
                        _list[_i].$JObj.show();
                    }
                }

            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRootArrange", function (arrange) {
            var _arr = arrange;
            if (_arr != "") {
                var _arry = _arr.split("_");
                // if (_arry[0] ==)
                if (_arry.length > 1) {
                    return  _arry[0]+"_"+ _arry[1];
                }
            }
            return "";

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "open", function (arrange) {
            // alert(arrange)
            var _root = this.getRootArrange(arrange);
            if (_root != "") {
               // alert(_root);
                var _app = $.AKjs.AppGet();
                _app.avtiveHeader(_root);
            }
            if (arrange == "000") {
                // alert(arrange)
                //alert($(".submapitem").length);
                //$(".submapitem").remove();
                for (var _i = 0; _i < this.RootItems.length; _i++) {
                    this.RootItems[_i].reduce();
                    this.RootItems[_i].$JObj.show();
                }
                if (this.SelectItemObj) {
                    this.SelectItemObj.itemCancleSelectClass();
                }
                this.SelectItemObj = null;
                return;
            }
            //alert();
            //$(".submapitem").show();
            //  alert(arrange);
            this.SelectArrangeItem = arrange;
            this.SetArrangeList();
            //alert(this.OpenItems.join("-"));
            var _isRoot = false;
            if (this.OpenItems.length > 0) {
                var _current = this.OpenItems[this.OpenItems.length - 1];
                var _$item = this.$JObj.find("." + "T" + _current);
                if (_$item.length > 0) {
                    var _obj = _$item.AtawControl();
                    if (_obj) {
                        //alert(_obj.ItemType);
                        _isRoot = _obj.ItemType == "Root";
                    }
                }
            }

            if (!_isRoot) {
                for (var _i = 0; _i < this.RootItems.length; _i++) {
                    this.RootItems[_i].$JObj.hide();
                }
                this.hideModule();
            }
            else {
                //alert();
                this.showModule();
                for (var _i = 0; _i < this.RootItems.length; _i++) {
                    this.RootItems[_i].$JObj.show();
                }
            }
            for (var _i = 0; _i < this.OpenItems.length; _i++) {
                if (this.OpenItems[_i] != "000") {
                    var _$item = this.$JObj.find("." + "T" + this.OpenItems[_i]);
                    if (_$item.length > 0) {
                        _$item.show();
                        var _obj = _$item.AtawControl();
                        if (_obj) {
                            _obj.IsExpand = true;
                            if (_obj.IsLeaf == false) {
                                _obj.bootMenuShowStatus();
                                _obj.showStatus();
                            }
                           
                            if (this.OpenItems[_i] == arrange) {
                                _obj.itemSelectClass();
                                if (this.SelectItemObj) {
                                    this.SelectItemObj.itemCancleSelectClass();
                                }
                                this.SelectItemObj = _obj;
                            }
                        }
                    }
                } else {
                    if (this.SelectItemObj) {
                        this.SelectItemObj.itemCancleSelectClass();
                    }
                    this.SelectItemObj = null;
                }
            }

        })


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "SetArrangeList", function () {

            if (!this.SelectArrangeItem .AisEmpty()) {
                this.OpenItems = [];
                var _list = this.SelectArrangeItem.split('_');
                for (var _i = 0; _i < _list.length; _i++) {
                    if (_i > 0) {
                        this.OpenItems.push(this.OpenItems[_i - 1] + "_" + _list[_i]);
                    }
                    else
                        this.OpenItems.push(_list[_i]);
                }
            }


        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "itemSpanClickEven", function (arrange, item) {
            // this.pageMainFun(arrange, item);
            this.Arrange = arrange;
            //            if (this.SelectItemObj) {
            //                this.SelectItemObj.itemCancleSelectClass();
            //            }
            //            this.SelectItemObj = item;
            //            item.itemSelectClass();
            if (this.ClickFun) {
                this.ClickFun(arrange, item);
            }

        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "pageMainFun", function (arrange, item) {
            var _key = item.Data.CODE_VALUE;
            var _val = "";
            if (item.Data.ExtData)
                _val = item.Data.ExtData.RightValue;
            if (_val != null) {
                if (_val != "" && _val != "#") {

                    $.AKjs.App.openUrl(_val);
                }
                else {
//                    var _url = item.getItemUrl();
//                    if (_url != "") {
//                        $.AKjs.App.openUrl(_url);
//                    }
                   
                     $.AKjs.App.openUrl("$menu$" + _key);
                }
            }
            return true;
        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            //alert();
        });

    }


})(jQuery);