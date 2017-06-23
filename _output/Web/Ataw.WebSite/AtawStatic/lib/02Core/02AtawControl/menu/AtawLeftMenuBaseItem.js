(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};


    //----------构造控件基类
    $.AKjs.AtawLeftMenuBaseItem = function (options) {
        return $.extend({}, $.AKjs.AtawBaseDom(options), new AtawLeftMenuBaseItem());
    }



    function AtawLeftMenuBaseItem() {
        this.IsLeaf = false;
        this.Data = null;
        this.LayerLevel = "";
        this.$Li = null;
        //this.$Ul = $("<ul  class='nav nav-pills nav-stacked'  style='display:none;padding-left:1em;'></ul>");
        this.$Ul = $("<ul style='display:none'></ul>");
        this.ItemChildrens = [];
        this.IsExpand = false;
        this.Arrange = "";
        this.$Item = null;
        this.$ItemSpan = $('<span class="ACT-ITEMSPAN"></span>');
        this.$Icon = $("<i class='icon-plus fa fa-plus icon-large'>&nbsp;</i>");
        // this.$Img = $("<img class='SubAopen' src='/images/ico/default.png' alt='' />");
        this.IcoSrc = "";
        this.OpenItems = [];
        this.TreeObj = null;
        this.ss = [];
        this.ItemType = "";
        this.MenuType = "";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("Data", "Data");
            this.setProByOptName("OpenItems", "OpenItems");
            this.setProByOptName("TreeObj", "TreeObj");
            if (this.Data.ExtData) {
                this.MenuType = this.Data.ExtData.KeyType;
                if (this.Data.ExtData.Icon) {
                    this.IcoSrc = this.Data.ExtData.Icon;
                }

            }
            this.LayerLevel = this.Data.LayerLevel;
            this.Arrange = this.Data.Arrange;
            var _children = this.Data.Children;

            //---------
            //this.indexOf
            if (this.OpenItems.indexOf(this.Arrange) > 0) {
                this.IsExpand = true;
            }

            if (_children.length > 0) {
                for (var i = 0; i < _children.length; i++) {
                    var isChildBusiness = _children[i].ExtData && (_children[i].ExtData.RightType == "ChildBusiness" || _children[i].ExtData.RightType == 4);
                    if (!isChildBusiness) {
                        var _option = {
                            Data: _children[i],
                            OpenItems: this.OpenItems,
                            TreeObj: this.TreeObj
                        };
                        if (_children[i].ParentId == "0") {
                            this.ItemChildrens.push($.AKjs.AtawLeftMenuRootItem(_option));
                        }
                        else {
                            if (this.hasChildren(_children[i])) {
                                this.ItemChildrens.push($.AKjs.AtawLeftMenuItem(_option));
                            }
                            else
                                this.ItemChildrens.push($.AKjs.AtawLeftMenuLeafItem(_option));
                        }
                    }
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "hasChildren", function (nodeObj) {
            var _child = nodeObj.Children;
            if (_child && _child.length > 0) {
                var isCb = true;
                for (var i = 0; i < _child.length; i++) {
                    var _item = _child[i];
                    if (_item.ExtData && (_item.ExtData.RightType == "ChildBusiness" || _item.ExtData.RightType == 4)) {
                        isCb = false;
                    }
                }
                return isCb;
            }
            else {
                return false;
            }

        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "formatUrl", function (url) {
            return url.AreplaceAll("/", "_").AreplaceAll("#", "_").replace(/\?/g, "_").replace(/\&/g, "_").replace(/\=/g, "_").replace(/\./g, "_").replace(".xml", "");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "toggleIcon", function () {
            if (this.IcoSrc != "") {
                this.$Icon.toggleClass("icon-plus fa fa-plus", false);
                this.$Icon.toggleClass("icon-minus fa fa-minus", false);
                this.$Icon.addClass(this.IcoSrc);
            }
            else {
                if (this.IsExpand) {
                    this.$Icon.toggleClass("icon-plus fa fa-plus", false);
                    this.$Icon.toggleClass("icon-minus fa fa-minus", true);
                    //debugger
                    //console.log(this.$JObj)
                    this.$Icon.parent().addClass("current");
                }
                else {
                    this.$Icon.toggleClass("icon-plus fa fa-plus", true);
                    this.$Icon.toggleClass("icon-minus fa fa-minus", false);
                }
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRootArrange", function () {
            var _arr = this.Arrange;
            if (_arr != "") {
                var _arry = _arr.split("_");
                return _arry[0];
            }
            return "";

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$Li = this.$JObj;

            this.$Li.attr("menutype", this.MenuType);
            this.$Li.append(this.$Item);
            this.$Item.append(this.$Icon);
            var _this = this;
            this.initTitle();
            this.$Li.attr("arrange" , this.Arrange);
            this.$Li.addClass("T" + this.Arrange);
            this.$Li.addClass("M" + this.Data.CODE_VALUE);
            if (this.Data.ExtData) {
                var _url = this.Data.ExtData.RightValue;
                if (_url && !_url .AisEmpty()) {
                    this.$Li.addClass(this.formatUrl(_url));
                }
            }
            
            this.$Li.append(this.$Ul);

            this.showStatus();
            var _this = this;
            var _children = this.ItemChildrens;
            if (_children.length > 0) {
                var _$ul = this.$Li.find("ul");
                for (var i = 0; i < _children.length; i++) {
                    var _$li = $("<li class=''/>");
                    _$ul.append(_$li);
                    _children[i].intoDom(_$li);
                }
            }
            else {
                //如果没有子节点，这去掉ul标签
                this.$Li.find("ul").remove();
            }

        });


        //折叠
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reduce", function () {
            this.IsExpand = false;
            var _$ul = this.$Ul;
            _$ul.slideUp(50);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "expand", function () {
            this.IsExpand = true;
            var _$ul = this.$Ul;
            _$ul.slideDown(50);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "itemSelectClass", function () {
            this.$Li.addClass("active");
            //this.$Li.parent().parent().addClass("current");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "itemCancleSelectClass", function () {
            this.$Li.removeClass("active");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "showStatus", function () {
            var _$ul = this.$Ul;
            if (this.IsExpand) {
                _$ul.show();

            }
            else {
                _$ul.hide();

            }
            this.toggleIcon();
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getItemUrl", function () {
            var _val = "";
            if (this.Data.ExtData) {
                _val = this.Data.ExtData.RightValue;
            }
            if (_val == "" || _val == "#") {
                if (this.ItemChildrens.length > 0) {
                    _val = this.ItemChildrens[0].getItemUrl();
                }
            }

            return _val;
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "bootMenuShowStatus", function () {
            var _$ul = this.$Ul;
            if (this.IsExpand) {
                _$ul.show();
                var _$liList = this.$Li.siblings();
                for (var i = 0; i < _$liList.length; i++) {
                    var _item = $(_$liList[i]).AtawControl();
                    _item.IsExpand = false;
                    _item.showStatus();
                }
            }
            else {
                _$ul.hide();
                this.toggleIcon();
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initTitle", function () {
            //this.$ItemSpan
            var _this = this;
            this.$Item.append(this.$ItemSpan);
            if (this.Data.CODE_TEXT != "_")
                this.$ItemSpan.append(this.Data.CODE_TEXT);
            this.$ItemSpan.attr("title", this.Data.CODE_TEXT);
            this.$Item.unbind("click").click(
            function () {
                var _beginExpand = _this.IsExpand;
                var isNext = true;
                if (!_beginExpand) {
                    _this.TreeObj.pageMainFun(_this.Arrange, _this);
                }
                if (isNext == true) {
                    if (_beginExpand == _this.IsExpand) {
                        _this.IsExpand = !_this.IsExpand;
                        _this.showStatus();
                    }
                    _this.TreeObj.itemSpanClickEven(_this.Arrange, _this);
                    
                }
                return false;
            }
            );
        });
    }


})(jQuery);