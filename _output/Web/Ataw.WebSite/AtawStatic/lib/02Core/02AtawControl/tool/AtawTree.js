(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.fn.AtawTree = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTree", options);
    }
    $.AKjs.AtawTree = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawTree()).sysCreator();
    }
    function AtawTree() {
        this.ZtreeSetting = {
            postDataFun: function (a) { return a; },
            data: {
                key: {
                    name: "",
                    title: ""
                },
                simpleData: {
                    enable: true,
                    idKey: "",
                    pIdKey: "",
                    rootPid: "0"
                }
            },
            edit: {
                enable: true,
                editNameSelectAll: true,
                removeTitle: "删除",
                renameTitle: "修改",
                showRemoveBtn: false,
                showRenameBtn: false
            },
            view: {
                addHoverDom: null,
                removeHoverDom: null,
                selectedMulti: false,
                nameIsHTML: true,
                txtSelectedEnable: true
            },
            drap: {
                isCopy: false,
                isMove: true
            },
            callback: {
                onClick: null,
                beforeEditName: null,
                beforeRemove: null,
                beforeRename: null,
                onDrop: null
            }
        };
        this.TextFieldName = "";
        this.IdFieldName = "";
        this.ParentFieldName = "";
        this.Opts = null;
        this.Ztree = null;
        this.$Ul = $('<ul class="ztree" id="' + $.AKjs.getUniqueID() + '"></ul>');
        this.NodeClick = null;
        this.FirstSuccess = null;
        this.AddHoverDom = null;
        this.RemoveHoverDom = null;
        this.BeforeEdit = null;
        this.BeforeRemove = null;
        this.OnDrop = null;
        this.Data = null;
        this.SelectedNodeID = "";
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.Opts = $.extend({}, this.Options);
            this.setProByOptName("OnPostDataSetFun", "OnPostDataSetFun");
            this.setProByOptName("NodeClick", "NodeClick");
            this.setProByOptName("FirstSuccess", "FirstSuccess");
            this.setProByOptName("AddHoverDom", "AddHoverDom");
            this.setProByOptName("RemoveHoverDom", "RemoveHoverDom");
            this.setProByOptName("BeforeEdit", "BeforeEdit");
            this.setProByOptName("BeforeRemove", "BeforeRemove");
            this.setProByOptName("OnDrop", "OnDrop");
            this.setProByOptName("TextFieldName", "TextFieldName");
            this.setProByOptName("IdFieldName", "IdFieldName");
            this.setProByOptName("ParentFieldName", "ParentFieldName");
            this.setProByOptName("Data", "Data");
            this.setProByOptName("OnNodeCreated", "OnNodeCreated");


            this.formatterData(this.Data);
            this.ZtreeSetting.data.simpleData.idKey = this.IdFieldName;
            this.ZtreeSetting.data.simpleData.pIdKey = this.ParentFieldName;
            this.ZtreeSetting.data.key.name = this.TextFieldName;
            this.ZtreeSetting.data.key.title = this.TextFieldName;
            this.ZtreeSetting.callback.onClick = this.NodeClick;
            this.ZtreeSetting.callback.beforeEditName = this.BeforeEdit;
            this.ZtreeSetting.view.addHoverDom = this.AddHoverDom;
            this.ZtreeSetting.view.removeHoverDom = this.RemoveHoverDom;
            this.ZtreeSetting.callback.beforeRemove = this.BeforeRemove;
            this.ZtreeSetting.callback.onDrop = this.OnDrop;
            this.ZtreeSetting.postDataFun = this.setPostDataFun();
            this.ZtreeSetting.view.nameIsHTML = true;

            this.ZtreeSetting.onNodeCreated = this.OnNodeCreated; //zTreeOnNodeCreated(event, treeId, treeNode)


        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$JObj.append(this.$Ul);

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setPostDataFun", function () {
            var _this = this;
            return function (tmpParam) {
                var ds = {};
                var _rows = [];
                ds = { _OPERATION: _rows };
                //                for (var i = 0; i < _this.KeyIds.length; i++) {
                //                    _rows.push({ KeyValue: _this.KeyIds[i] });
                //                }
                if (_this.OnPostDataSetFun) {
                    ds = _this.OnPostDataSetFun(ds);
                }
                return { ztree: tmpParam, ds: $.toJSON(ds) };

            };

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadData", function (keyids) {
            if (keyids) {
                this.KeyIds = keyids;
            }
            if (this.$Ul.data("ZtreeData")) {
                this.$Ul.data("ZtreeData").destroy();
                this.$Ul.data("ZtreeData", null);
            }
            this.Ztree = $.fn.zTree.init(this.$Ul, this.ZtreeSetting, this.Data);
            this.$Ul.data("ZtreeData", this.Ztree);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "formatterData", function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i][this.TextFieldName] = data[i][this.TextFieldName].htmlDecode().htmlDecode();

            }
        })
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getSelectedNodesID", function () {
            if (this.Ztree != null) {
                var nodes = this.Ztree.getCheckedNodes(true);
                var idlist = [];
                for (var i = 0; i < nodes.length; i++) {
                    idlist.push(nodes[i][this.ZtreeSetting.data.key.keyId]);
                }
                return idlist.toString();
            }
            return "";
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getSelectedNodes", function () {
            if (this.Ztree != null) {
                return this.Ztree.getCheckedNodes(true);
            }
            return null;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "reAsyncChildNodes", function (treeNode) {
            if (this.Ztree) {
                var node = null;
                //                if (treeNode) {
                //                    node = treeNode;
                //                }
                this.Ztree.reAsyncChildNodes(node, "refresh");
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "selectDefaultNode", function () {
            if (this.Ztree) {
                var nodes = this.Ztree.getNodes();
                if (nodes.length > 0) {
                    this.Ztree.selectNode(nodes[0]);
                    return nodes[0];
                }
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function() {
            this.Ztree.destroy();
            this.AtawBaseDom_dispose();
        });
    }
})(jQuery);