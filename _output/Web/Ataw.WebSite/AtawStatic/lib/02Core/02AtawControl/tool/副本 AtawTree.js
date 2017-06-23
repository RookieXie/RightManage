//(function ($) {
//    $.AKjs = $.AKjs ? $.AKjs : {};
//    var defaults = {
//        LoadUrl: "/core/Selector/LoadTree",
//        SubLoadUrl: "/core/Selector/LoadSubTree",
//        DeleteUrl: "/core/Selector/DeleteNode",
//        DropUrl: "/core/Selector/DropNodes",
//        RegName: ""
//    };
//    $.fn.AtawTree = function (options) {
//        $.AKjs.AtawCreateCall.call(this, "AtawTree", options);
//    }
//    $.AKjs.AtawTree = function (options) {
//        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawTree()).sysCreator();
//    }
//    function AtawTree() {
//        this.ZtreeSetting = {
//            postDataFun: function (a) { return a; },
//            data: {
//                key: {
//                    checked: "IsSelect",
//                    name: "CODE_TEXT",
//                    title: "CODE_TEXT",
//                    children: "Children",
//                    keyId: "CODE_VALUE",
//                    url: ""
//                }
//            },
//            edit: {
//                enable: true,
//                editNameSelectAll: true,
//                removeTitle: "删除",
//                renameTitle: "修改",
//                showRemoveBtn: true,
//                showRenameBtn: true
//            },
//            async: {
//                enable: true,
//                autoParam: ["CODE_VALUE"],
//                url: ""
//            },
//            view: {
//                addHoverDom: null,
//                removeHoverDom: null,
//                selectedMulti: false,
//                nameIsHTML: true
//            },
//            drap: {
//                isCopy: false,
//                isMove: true
//            },
//            callback: {
//                onClick: null,
//                onAsyncSuccess: null,
//                beforeAsync: function (treeId, treeNode) {
//                    Ataw.msgbox.show(" 正在加载，请稍后...", 6, 2000);
//                    return true;
//                },
//                beforeEditName: null,
//                beforeRemove: null,
//                beforeRename: null,
//                beforeRemove: null,
//                onDrop: null
//            }
//        };
//        this.Opts = null;
//        this.Ztree = null;
//        this.$Ul = $('<ul class="ztree" id="' + $.AKjs.getUniqueID() + '"></ul>');
//        this.IsFirst = false;
//        this.NodeClick = null;
//        this.FirstSuccess = null;
//        this.AddHoverDom = null;
//        this.RemoveHoverDom = null;
//        this.BeforeEdit = null;
//        this.BeforeRemove = null;
//        this.onDrop = null;
//        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
//            this.Opts = $.extend({}, defaults, this.Options);
//            this.setProByOptName("OnPostDataSetFun", "OnPostDataSetFun");
//            this.setProByOptName("NodeClick", "NodeClick");
//            this.setProByOptName("FirstSuccess", "FirstSuccess");
//            this.setProByOptName("AddHoverDom", "AddHoverDom");
//            this.setProByOptName("RemoveHoverDom", "RemoveHoverDom");
//            this.setProByOptName("BeforeEdit", "BeforeEdit");

//            this.ZtreeSetting.callback.onClick = this.NodeClick;
//            this.ZtreeSetting.callback.onAsyncSuccess = this.FirstSuccess;
//            this.ZtreeSetting.callback.beforeEditName = this.BeforeEdit;
//            this.ZtreeSetting.view.addHoverDom = this.AddHoverDom;
//            this.ZtreeSetting.view.removeHoverDom = this.RemoveHoverDom;
//            this.ZtreeSetting.callback.beforeRemove = this.deleteNode();
//            this.ZtreeSetting.callback.onDrop = this.DropNodes();
//            this.ZtreeSetting.postDataFun = this.setPostDataFun();
//            if (this.Opts.LoadUrl) {
//                this.ZtreeSetting.data.key.url = this.getUrl();
//            }
//            if (this.Opts.SubLoadUrl) {
//                this.ZtreeSetting.async.url = this.getUrl();
//            }
//            this.ZtreeSetting.async.url = this.getUrl();

//        });
//        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
//            this.$JObj.append(this.$Ul);

//        });

//        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getUrl", function () {
//            var _this = this;
//            var _url = "";
//            return function () {
//                if (_this.IsFirst) {
//                    _url = _this.Opts.LoadUrl + "?RegName=" + _this.Opts.RegName;
//                }
//                else {
//                    _url = _this.Opts.SubLoadUrl + "?RegName=" + _this.Opts.RegName;
//                }
//                return _url;
//            };

//        });
//        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "deleteNode", function () {
//            var _this = this;
//            return function (treeId, treeNode) {

//                $.AKjs.getJSON(defaults.DeleteUrl, { regName: _this.Opts.RegName, key: treeNode.CODE_VALUE }, function (res) {
//                    if (res.type == 1) {
//                        if (_this.Ztree) {
//                            _this.Ztree.removeNode(treeNode);
//                        }
//                    } else {
//                        alert(res.message);
//                    }
//                });
//                return false;
//            }
//        });
//        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "DropNodes", function () {
//            var _this = this;
//            return function (event, treeId, treeNodes, targetNode, moveType) {
//                var treeNodeIds = [];
//                for (var i = 0; i < treeNodes.length; i++) {
//                    treeNodeIds.push(treeNodes[i].CODE_VALUE);
//                }
//                $.AKjs.getJSON(defaults.DropUrl, { regName: _this.Opts.RegName, keys: treeNodeIds.toString(), targetNodeId: targetNode.CODE_VALUE }, function (res) {
//                })
//            }
//        });
//        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setPostDataFun", function () {
//            var _this = this;
//            return function (tmpParam) {
//                var ds = {};
//                var _rows = [];
//                ds = { _OPERATION: _rows };
//                //                for (var i = 0; i < _this.KeyIds.length; i++) {
//                //                    _rows.push({ KeyValue: _this.KeyIds[i] });
//                //                }
//                if (_this.OnPostDataSetFun) {
//                    ds = _this.OnPostDataSetFun(ds);
//                }
//                return { ztree: tmpParam, ds: $.toJSON(ds) };

//            };

//        });
//        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadData", function (keyids) {
//            if (keyids) {
//                this.KeyIds = keyids;
//            }
//            if (this.$Ul.data("ZtreeData")) {
//                this.$Ul.data("ZtreeData").destroy();
//                this.$Ul.data("ZtreeData", null);
//            }
//            this.IsFirst = true;
//            this.Ztree = $.fn.zTree.init(this.$Ul, this.ZtreeSetting);
//            this.$Ul.data("ZtreeData", this.Ztree);
//            this.IsFirst = false;
//        });
//        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getSelectedNodesID", function () {
//            if (this.Ztree != null) {
//                var nodes = this.Ztree.getCheckedNodes(true);
//                var idlist = [];
//                for (var i = 0; i < nodes.length; i++) {
//                    idlist.push(nodes[i][this.ZtreeSetting.data.key.keyId]);
//                }
//                return idlist.toString();
//            }
//            return "";
//        });
//        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getSelectedNodes", function () {
//            if (this.Ztree != null) {
//                return this.Ztree.getCheckedNodes(true);
//            }
//            return null;
//        });
//        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "reAsyncChildNodes", function (treeNode) {
//            if (this.Ztree) {
//                var node = null;
//                //                if (treeNode) {
//                //                    node = treeNode;
//                //                }
//                this.Ztree.reAsyncChildNodes(node, "refresh");
//            }
//        });
//    }
//})(jQuery);