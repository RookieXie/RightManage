(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //自动完成控件
    $.fn.AtawTreePage = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTreePage", options);
    }

    //继承基类
    $.AKjs.AtawTreePage = function (options) {
        return $.extend({}, $.AKjs.AtawBasePage(options), new AtawTreePage());
    }


    function AtawTreePage() {
        this.TreeId = "ztree" + $.AKjs.getUniqueID();
        this.ClassName = "dark";
        this.$Container = $("<div class=\"grid_view\"></div>");
        this.$ToolContainer = $("<div class=\"rightTop\"></div>");
        this.$AddButton = $("<div class=\"ACT-BUTTONBAR newbutton\"><a href=\"javascript:void(0);\" class=\"functionBtn\"><span>新增父节点</span></a></div>");
        this.$TreeMenu = $("<div  class=\"ATAW-TREE-MENU\" style=\"height:auto;overflow:auto;background: none repeat scroll 0 0 #F0F6E4;\"><ul  class=\"ztree\" id=\"" + this.TreeId + "\" style=\"margin-top:0; width:140px;\"></ul>\</div>");
        this.$AtawWindow = $("<div></div>");
        this.$SureButton = $("<a href=\"javascript:void(0);\" class=\"functionBtn\"><span>确定</span></a>");
        this.$CancelButton = $("<a href=\"javascript:void(0);\" class=\"functionBtn\"><span>取消</span></a>");
        this.AtawWindow = null;
        this.TreeObj = null;
        this.SeletedNode = null;
        this.AtawOpenFun = null; //AtawTreePage,string : void
        this.$SearchForm = $("<div class=\"ACT-TOOLBAR search_Module\" ></div>"); //搜索区
        this.IsChange = false;


        this.ReloadDataFun = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getSearchDataSet", function () {
            var _ds = this.$SearchForm.find(".ACT_POST").CreateDataSet();
            return $.toJSON(_ds);
        });


        //初始化
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            var header = this.Options.res.Header;
            if (header == null || (header != null && header.IsValid)) {
                this.setProByOptName("AtawOpenFun", "AtawOpenFun");
                this.setProByOptName("ReloadDataFun", "ReloadDataFun");
                this.$JObj.append(this.$ToolContainer);
                this.$ToolContainer.append(this.$AddButton);
                this.$ToolContainer.append(this.$SearchForm);
                this.$JObj.append(this.$Container);
                this.$Container.append(this.$TreeMenu);
                this.$JObj.append(this.$AtawWindow);
                $.AKjs.getJSON("/module/module", { xml: _this.Options.xml, pageStyle: "List" }, function (res) {
                    if (res.Forms[res.ListFormName].HasSearch) {
                        var _op = {
                            Title: res.Forms[res.SearchFormName].Title,
                            Form: res.Forms[res.SearchFormName]
                        };
                        _this.$SearchForm.AtawSearchForm(_op);
                    }
                });
            }
            else {
                if (header != null && !header.IsValid) {
                    alert(header.Message);
                }
            }

            _this.$SearchForm.find(".ACT-SEARCH-FORM-BUTTON").click(function () {
                searchTree();
            });

            var _options = this.Options;
            function searchTree() {
                var _setting = {
                    postDataFun: function (a) {
                        return { ztree: a, ds: _this.getSearchDataSet() };
                    },
                    view: {
                        addHoverDom: addHoverDom,
                        removeHoverDom: removeHoverDom,
                        selectedMulti: false
                    },
                    edit: {
                        enable: true,
                        editNameSelectAll: true
                    },
                    async: {
                        enable: true,
                        url: _options.Url,
                        autoParam: ["id"]
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        beforeEditName: beforeEditName,
                        beforeRemove: beforeRemove,
                        beforeRename: beforeRename
                    }
                };
                $.fn.zTree.init(_this.$TreeMenu.find(".ztree"), _setting);

                _this.TreeObj = $.fn.zTree.getZTreeObj(_this.TreeId);
                if (_this.TreeObj.getNodes().length == "0") {
                    _this.$Container.append("<p>无数据</p>");
                    _this.$TreeMenu.hide();
                }
            }
            searchTree();

            //编辑节点事件
            function beforeEditName(treeId, treeNode) {
                _this.ClassName = (_this.ClassName === "dark" ? "" : "dark");
                _this.TreeObj.selectNode(treeNode);
                _this.loadForm("Update", treeNode.id)
                ;
                return false;
            }

            //删除节点事件
            function beforeRemove(treeId, treeNode) {
                _this.ClassName = (_this.ClassName === "dark" ? "" : "dark");
                _this.TreeObj.selectNode(treeNode);
                if (treeNode.isParent) {
                    Ataw.msgbox.show("该节点下有子节点,请先删除子节点！", 5, 1000);
                } else {
                    if (confirm("确认删除 节点 -- " + treeNode.name + " 吗？")) {
                        $.getJSON(_this.Options.RemoveUrl, { id: treeNode.id }, function (res) {
                            switch (res) {
                                case 0:
                                    Ataw.msgbox.show("该部门下有车辆或部门，不能删除！", 5, 1000);
                                    break;
                                case 1:
                                    Ataw.msgbox.show("操作成功！", 4, 2000);
                                    break;
                                case 2:
                                    Ataw.msgbox.show("程序异常，请核查！", 5, 1000);
                                    break;
                                default:
                                    break;
                            }
                        });
                        return true;
                    }
                }
                return false;
            }


            //修改前的事件
            function beforeRename(treeId, treeNode, newName) {
                _this.ClassName = (_this.ClassName === "dark" ? "" : "dark");
                if (newName.length == 0) {
                    alert("节点名称不能为空.");
                    setTimeout(function () { _this.TreeObj.editName(treeNode) }, 10);
                    return false;
                }
                return true;
            }

            function addHoverDom(treeId, treeNode) {
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#addBtn_" + treeNode.id).length > 0) return;
                var addStr = "<span class='button add' id='addBtn_" + treeNode.id
				+ "' title='add node' onfocus='this.blur();'></span>";
                sObj.after(addStr);
                _this.SeletedNode = treeNode;
                var btn = $("#addBtn_" + treeNode.id);
                if (btn) btn.bind("click", function () {
                    _this.loadForm("Insert", treeNode.id);
                    return false;
                });
            };
            function removeHoverDom(treeId, treeNode) {
                this.SeletedNode = null;
                $("#addBtn_" + treeNode.id).unbind().remove();
            };

            this.AtawWindow = this.$AtawWindow.AtawControl();
            if (this.AtawWindow === undefined) {
                this.$AtawWindow.AtawWindow({
                    Left: "1%",
                    Top: "10%"
                });
                this.AtawWindow = this.$AtawWindow.AtawControl();
            }

            _this.$AddButton.click(function () {
                this.SeletedNode = null;
                _this.loadForm("Insert", "0");
            });

        })


        //隐藏提示信息
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "hideTip", function () {

        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "afterPostData", function () {
            this.AtawWindow.close();
            this.reloadTree();
            //            if (this.ReloadDataFun) {
            //                this.IsChange = this.ReloadDataFun();
            //            }
            //            if (this.IsChange) {
            //                this.reloadTree();
            //            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "reloadTree", function () {
            var node = null;
            if (this.SeletedNode != null) {
                node = this.SeletedNode.getParentNode();
            }
            this.TreeObj.reAsyncChildNodes(node, "refresh");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initTitle", function () {
        });

        //根据条件加载表单
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadForm", function (pageStyle, key) {
            var _this = this;
            _this.$AtawWindow.html("");
            $.AKjs.getJSON("/module/module", { xml: _this.Options.xml, pageStyle: pageStyle, keyValue: key }, function (res) {
                switch (pageStyle) {
                    case "Detail":
                        _this.$AtawWindow.AtawDetailPage(res);
                        break;
                    case "Insert":
                        res["FunReload"] = function () {
                            return _this.afterPostData();
                        }
                        res["FunCancel"] = function () {
                            return _this.AtawWindow.close();
                        }
                        _this.$AtawWindow.AtawInsertPage(res);
                        if (_this.AtawOpenFun) {
                            _this.AtawOpenFun(_this.$AtawWindow, key, 0, _this.SeletedNode);
                        }
                        var _pageObj = _this.$AtawWindow.AtawControl();
                        _this.AtawWindow.WindowCloseFun = function (a) { _pageObj.hideTip(); };
                        _this.Status = 1;
                        break;
                    case "Update":
                        res["FunReload"] = function () {
                            return _this.afterPostData();
                        }
                        res["FunCancel"] = function () {
                            return _this.AtawWindow.close();
                        }
                        _this.$AtawWindow.AtawUpdatePage(res);
                        if (_this.AtawOpenFun) {
                            _this.AtawOpenFun(_this.$AtawWindow, _this.SeletedNode.pid, 1, _this.SeletedNode);
                        }
                        var _pageObj = _this.$AtawWindow.AtawControl();
                        _this.AtawWindow.WindowCloseFun = function (a) { _pageObj.hideTip(); };
                        break;
                    default:
                        break;
                }
                _this.AtawWindow.open();
            });
        });
    }
})(jQuery);
