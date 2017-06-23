(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    //自动完成控件
    $.fn.AtawTree = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTree", options);
    }

    //继承基类
    $.AKjs.AtawTree = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawTree());
    }


    function AtawTree() {
        this.TreeId = "ztree" + $.AKjs.getUniqueID();
        this.ClassName = "dark";
        this.$AddButton = $("<a href=\"javascript:void(0);\" class=\"functionBtn\"><span>新增父节点</span></a>");
        this.$TreeMenu = $("<div  class=\"ATAW-TREE-MENU\" style=\"height:auto;overflow:auto;background: none repeat scroll 0 0 #F0F6E4;\"><ul  class=\"ztree\" id=\"" + this.TreeId + "\" style=\"margin-top:0; width:140px;\"></ul>\</div>");
        this.$AtawWindow = $("<div></div>");
        this.AtawWindow = null;
        this.TreeObj = null;

        //初始化
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$JObj.append(this.$AddButton);
            this.$JObj.append(this.$TreeMenu);
            this.$JObj.append(this.$AtawWindow);
            var _this = this;
            var _options = this.Options;
            var _setting = {
                postDataFun: function (a) {
                    return { ztree: a };
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
                    url: "/VM/DataSource/LoadGroupTree",
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

            //编辑节点事件
            function beforeEditName(treeId, treeNode) {
                _this.ClassName = (_this.ClassName === "dark" ? "" : "dark");
                _this.TreeObj.selectNode(treeNode);
                _this.loadForm("Update", treeNode.id);
                return false;
            }

            //删除节点事件
            function beforeRemove(treeId, treeNode) {
                _this.ClassName = (_this.ClassName === "dark" ? "" : "dark");
                _this.TreeObj.selectNode(treeNode);

                if (treeNode.isParent) {
                    Ataw.msgbox.show("该节点下有子节点,请先删除子节点！", 5, 1000);
                    return false;
                } else {
                    return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
                }
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
                var btn = $("#addBtn_" + treeNode.id);
                if (btn) btn.bind("click", function () {
                    _this.loadForm("Insert", treeNode.id);
                    return false;
                });
            };
            function removeHoverDom(treeId, treeNode) {
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
                _this.loadForm("Insert", "0");
            });
        })

        //根据条件加载表单
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadForm", function (pageStyle, key) {
            var _this = this;
            _this.$AtawWindow.html("");

            $.AKjs.getJSON("/module/module", { xml: "module/VM/VM_Group.xml", pageStyle: pageStyle, keyValue: key }, function (res) {
                switch (pageStyle) {
                    case "Detail":
                        _this.$AtawWindow.AtawDetailPage(res);
                        break;
                    case "Insert":
                        _this.$AtawWindow.AtawInsertPage(res);
                        break;
                    case "Update":
                        _this.$AtawWindow.AtawUpdatePage(res);
                        break;
                    default:
                        break;
                }
                _this.AtawWindow.open();
            });
        });
    }
})(jQuery);
