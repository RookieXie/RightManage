(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawPageMap = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawPageMap()).sysCreator();
    }

    $.fn.AtawPageMap = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawPageMap", options);
    }

    function AtawPageMap() {
        this.RootText = "我的平台";
        this.MapItemList = []; //AtawPageMapItem
        this.Data = null;

        this.SelectArrangeItem = "";
        this.OpenItems = [];
        this.TreeMenuObj = null; //AtawLeftMenuTree
        this.ClickFun = null;
        this.$Ul = null;
        // this.SelectPageItemObj = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {

            this.setProByOptName("Data", "Data");
            this.setProByOptName("SelectArrangeItem", "SelectArrangeItem");
            this.setProByOptName("TreeMenuObj", "TreeMenuObj");
            this.setProByOptName("ClickFun", "ClickFun");
            this.createData();

        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "createData", function () {

            this.setArrangeList();
            for (var _i = 0; _i < this.OpenItems.length; _i++) {
                var _item = this.OpenItems[_i];
                var _nextArrange = "";
                var _isLast = false;
                var _isPre = false;
                // alert(this.OpenItems.length);
                //---------

                if (_i != this.OpenItems.length - 1) {
                    _nextArrange = this.OpenItems[_i + 1];
                }
                else {
                    if (this.OpenItems.length > 3 && !$.AKjs.IsMenu) {
                        _isLast = true;
                    }
                }

                if (_i == this.OpenItems.length - 2) {
                    if (this.OpenItems.length > 3 && !$.AKjs.IsMenu) {
                        _isPre = true;
                    }
                }


                var _$treeItem = this.TreeMenuObj.$JObj.find(".T" + _item);
                if (_$treeItem.length > 0) {
                    var _menuItemObj = _$treeItem.AtawControl();
                    if (_menuItemObj) {
                        var _obj = $.AKjs.AtawPageMapItem({
                            Arrange: _item,
                            TreeMenuObj: this.TreeMenuObj,
                            MenuItemObj: _menuItemObj,
                            NextArrange: _nextArrange,
                            ClickFun: this.clickItemFun(),
                            IsLast: _isLast,
                            IsPre: _isPre
                        });
                        //                        if (_item == this.SelectArrangeItem) {
                        //                            this.SelectPageItemObj = _obj;
                        //                        }
                        this.MapItemList.push(_obj);
                    }
                }
            }

        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            //  this.$JObj.append("<span class='ACT-MENU-LEFT menuIndex useSome'><h2>功能菜单 <i class='icon-chevron-down'></i></h2></span>");
            var _$box = $("<span class='ACT-BOX hidden-xs' ></span>");
            //this.$JObj.append("当前位置：");
            this.$JObj.append(_$box);
            this.initData();
            //            this.$JObj.find(".ACT-MENU-LEFT h2").eq(0).mouseover(function () {
            //                var _$dv = $(".mainLeft");
            //                _$dv.data("show",true);
            //                $(".mainLeft").show("fast");
            //            });
            //                    .mouseout(function () {
            //                        $(".mainLeft").hide();
            //                    }); 


        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initData", function () {

            var _$box = this.$JObj.find(".ACT-BOX");
            _$box.html("<div class='submapitem'>当前位置：</div>");
            // if (this.$Ul == null) {
            this.$Ul = $("<ol  class='breadcrumb' style='cursor:pointer;' />");
            // }
            _$box.append(this.$Ul);
            for (var i = 0; i < this.MapItemList.length; i++) {
                var _obj = this.MapItemList[i];
                var _$li = $("<li/>");
                this.$Ul.append(_$li);
                _obj.intoDom(_$li);
                if (_obj.MenuItemObj.ItemChildrens.length > 0) {
                    //如果子节点数量大于0，则加个下拉框
                    var myLi = $("<li class='breadcrumbDropdownList'></li>");
                    this.$Ul.append(myLi);

                    var _$a = $("<a  data-toggle=\"dropdown\"  class=' icon-caret-down fa fa-caret-down ACT-DROPDOWN'></a>");
                    var _$subNavi = $("#ACT-SUB-NAVI");
                    _$subNavi.html("");
                    if ( 1) {
                        myLi.append(_$a);
                        myLi.append(this.MapItemList[i].$JObj[0].children[1]);
                    }
                    else {
                        _$subNavi.append(this.MapItemList[i].$JObj[0].children[1]);
                        _$subNavi.find(".dropdown-menu").removeClass("dropdown-menu").addClass("aks-sub-navi-ul");
                    }
                    //_$a.unbind("click").click(
                    // function () {
                    //     _$a.parent().addClass("open");
                    // });
                }
            }

        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "clickItemFun", function () {
            var _this = this;
            return function (arrange, menuObj) {
                _this.TreeMenuObj.pageMainFun(arrange, menuObj);
                //                _this.TreeMenuObj.open(arrange);
                //                _this.open(arrange);

                //                var _val = menuObj.Data.ExtData.RightValue;
                //                if (_val === "" || _val === "#") {
                //                    _val = "$menu$" + menuObj.Data.CODE_VALUE
                //                }
                //                $.AKjs.App.pushHistory(menuObj.Arrange, _val);

                if (_this.ClickFun) {
                    _this.ClickFun(arrange, menuObj);
                }


            };
        })


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setArrangeList", function () {

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

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "open", function (arrange) {
            //this.$JObj.html("");
            this.$Ul.html("");
            for (var i = 0; i < this.MapItemList.length; i++) {
                this.MapItemList[i].dispose();
            }
            this.MapItemList = [];
            this.OpenItems = [];

            this.SelectArrangeItem = arrange;
            this.createData();
            //-----------------------
            this.initData();
            this.mouseEffect();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "mouseEffect", function () {
            //            var _$setMap_list = this.$JObj.find(".setMap_list");
            //            var _$setMap_listLast = this.$JObj.find(".setMap_list:last");
            //            _$setMap_list.each(function () {
            //                $(this).unbind();
            //                $(this).find(".setMap_SubCon").hide();
            //            })
            //            _$setMap_list.mousemove(function () {
            //                $(this).children(".setMap_SubCon").show();
            //                $(this).addClass("setMap_listHover");
            //                $(this).find(".setMap_Triangle").addClass("setMap_TriangleHover");
            //            })
            //            _$setMap_list.mouseleave(function () {
            //                $(this).children(".setMap_SubCon").hide();
            //                $(this).removeClass("setMap_listHover");
            //                $(this).find(".setMap_Triangle").removeClass("setMap_TriangleHover");
            //            })
            //            _$setMap_listLast.css("border", "0");
            //_$setMap_listLast.unbind();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterInit", function () {
            this.mouseEffect();
        });

    }

})(jQuery);