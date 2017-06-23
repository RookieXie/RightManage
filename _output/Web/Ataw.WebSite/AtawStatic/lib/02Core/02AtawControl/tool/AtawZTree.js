(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    var defaults = {
        LoadUrl: "/core/Selector/LoadTree",
        SubLoadUrl: "/core/Selector/LoadSubTree",
        IsMultiSelect: false,
        RegName: ""
    };
    $.fn.AtawZTree = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawZTree", options);
    }
    $.AKjs.AtawZTree = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawZTree()).sysCreator();
    }
    function AtawZTree() {
        this.ZtreeSetting = {
            postDataFun: function (a) { return a; },
            data: {
                key: {
                    checked: "IsSelect",
                    name: "CODE_TEXT",
                    title: "CODE_TEXT",
                    children: "Children",
                    keyId: "CODE_VALUE",
                    url: ""
                }
            },
            edit: {
                enable: true,
                editNameSelectAll: true,
                drag: {
                    isCopy: false,
                    isMove: true
                },
                showRemoveBtn: false,
                showRenameBtn: false 
            },
            view: {
                selectedMulti: false,
                nameIsHTML: true,
                showTitle: true,
                showIcon: true,
                txtSelectedEnable: true,
                expandSpeed: "fast"
            },
            async: {
                enable: true,
                autoParam: ["CODE_VALUE"],
                url: ""
            },
            check: {
		autoCheckTrigger:true,
                enable: true,
                chkStyle: "checkbox",
                chkboxType: { "Y": "s", "N": "s" },
                radioType: "all"
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    var _treeObj = $.fn.zTree.getZTreeObj(treeId);
                    //console.log(treeNode);
                    _treeObj.checkNode(treeNode, undefined, true, true);
                },
                onCheck: null,
	        beforeCheck:function(treeId, treeNode){
                    var _treeObj = $.fn.zTree.getZTreeObj(treeId);
		    if(!treeNode.zAsync)
			{
		      _treeObj.reAsyncChildNodes(treeNode, "refresh",true,function(){
			_treeObj.checkNode(treeNode,!treeNode.Checked,true,true);
			});
			return false;
			}
		    return true;
                },
                onAsyncSuccess: function (event, treeId, treeNode, msg) {
                    if (typeof (msg) == "string") {
                        msg = $.parseJSON(msg);
                        if (msg.ActionType) {
                            ActionResponse_Commond_Fun(msg,
                        function () {
                            //执行自定义的方法方法
                        }
                         );
                        }
                    }
                    Ataw.msgbox.hide(500); //隐藏加载提示
                    //alert(msg);
                },
                beforeAsync: function (treeId, treeNode) {
                    Ataw.msgbox.show(" 正在加载，请稍后...", 6);
                    return true;
                },
                beforeEditName: null,
                beforeRemove: null,
                beforeRename: null,
                onRemove: null
            }
        };
        this.Opts = null;
        this.Ztree = null;
        this.$Ul = $('<ul class="ztree" id="' + $.AKjs.getUniqueID() + '"></ul>');
        this.IsFirst = false;
        this.Key = "";
        this.KeyIds = [];

        this.ClassName = "dark";

        this.OnCheckFun = null; //参数 _this, event, treeId, treeNode
        this.OnPostDataSetFun = null; //参数  ds  ， 构建的dataset // 返回值也是 ds
        this.BeforeEditNameFun = null; //参数 AtawZtree,treeId, treeNode :bool

        this.EnableEdit = false;
        this.OnNodeCreatedFun = null;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.Opts = $.extend({}, defaults, this.Options);
            this.setProByOptName("Key", "Key");
            this.setProByOptName("KeyIds", "KeyIds");
            this.setProByOptName("OnCheckFun", "OnCheckFun");
            this.setProByOptName("EnableEdit", "EnableEdit");
            this.setProByOptName("OnPostDataSetFun", "OnPostDataSetFun");
            this.setProByOptName("OnNodeCreatedFun", "OnNodeCreatedFun"); //(this,event, treeId, treeNode)

            if (this.Opts.LoadUrl) {
                this.ZtreeSetting.data.key.url = this.getUrl();
            }
            if (this.Opts.SubLoadUrl) {
                this.ZtreeSetting.async.url = this.getUrl();
            }
            this.ZtreeSetting.check.chkStyle = this.Opts.IsMultiSelect ? "checkbox" : "radio";
            this.ZtreeSetting.check.chkboxType = this.Opts.IsMultiSelect ? { "Y": "s", "N": "s" } : { "Y": "", "N": "" };
            this.ZtreeSetting.async.url = this.getUrl();
            this.ZtreeSetting.postDataFun = this.setPostDataFun();
            this.ZtreeSetting.edit.enable = this.EnableEdit;

            this.setProByOptName("BeforeEditNameFun", "BeforeEditNameFun");
            this.ZtreeSetting.callback.beforeEditName = this.beforeEditNameFun();

            if (this.OnCheckFun) {
                this.ZtreeSetting.callback.onCheck = this.setOnCheckFun();
            }
            if (this.OnNodeCreatedFun) {
                this.ZtreeSetting.callback.onNodeCreated = this.setOnNodeCreatedFun();
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getUrl", function () {
            var _this = this;
            var _url = "";
            return function () {
                if (_this.IsFirst) {
                    //_this.IsFirst = false;
                    _url = _this.Opts.LoadUrl + "?RegName=" + _this.Opts.RegName + "&CODE_VALUE=" + _this.Key;
                    // return _url;
                }
                else {
                    _url = _this.Opts.SubLoadUrl + "?RegName=" + _this.Opts.RegName;
                }
                // alert(_url);
                return _url;
                //return _this.Opts.SubLoadUrl + "?RegName=" + _this.Opts.RegName;
            };

        });

        //beforeEditName
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "beforeEditNameFun", function () {
            var _this = this;
            return function (treeId, treeNode) {
                _this.ClassName = (_this.ClassName === "dark" ? "" : "dark");
                _this.Ztree.selectNode(treeNode);
                if (_this.BeforeEditNameFun) {
                    return _this.BeforeEditNameFun(_this, treeId, treeNode);
                }

                //  _this.loadForm("Update", treeNode[_this.ZtreeSetting.data.key.keyId]);
                return false;
            };

        });



        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            this.$JObj.append(this.$Ul);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setOnNodeCreatedFun", function () {
            var _this = this;
            return function (event, treeId, treeNode) {
                //_this.ZtreeSetting.callback.onCheck(event, treeId, treeNode);
                _this.OnNodeCreatedFun(_this, event, treeId, treeNode);
            };
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setOnCheckFun", function () {
            var _this = this;
            return function (event, treeId, treeNode) {
                //_this.ZtreeSetting.callback.onCheck(event, treeId, treeNode);
                _this.OnCheckFun(_this, event, treeId, treeNode);
            };
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setPostDataFun", function () {
            var _this = this;
            return function (tmpParam) {
                var ds = {};
                // if (_this.IsFirst) {
                var _rows = [];
                ds = { _OPERATION: _rows };
                for (var i = 0; i < _this.KeyIds.length; i++) {
                    _rows.push({ KeyValue: _this.KeyIds[i] });
                }

                //  }
                if (_this.OnPostDataSetFun) {
                    ds = _this.OnPostDataSetFun(ds);
                }
                return { ztree: tmpParam, ds: $.toJSON(ds) };

            };

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadData", function (keyids, callBack) {
            if (keyids) {
                this.KeyIds = keyids;
            }
            if (this.$Ul.data("ZtreeData")) {
                this.$Ul.data("ZtreeData").destroy();
                this.$Ul.data("ZtreeData", null);
            }
            this.IsFirst = true;
            var _this = this;
            /// <reference path="../../../03Extend/zTree3.5.0.1/zTreeStyle/zTreeStyle.css" />

            this.asynJs(["/AtawStatic/lib/03Extend/zTree3.5.0.1/jquery.ztree.all-3.5.js",
            "/AtawStatic/lib/03Extend/zTree3.5.0.1/zTreeStyle/ataw_zTreeStyle.css"], function () {
                _this.Ztree = $.fn.zTree.init(_this.$Ul, _this.ZtreeSetting);
                _this.$Ul.data("ZtreeData", _this.Ztree);
                _this.IsFirst = false;
                if (callBack)
                    callBack(_this);
            });


        });
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
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setNodesChecked", function (jsonvalue) {
            var _this = this;
            if (this.Ztree != null) {
                jsonvalue = eval("(" + jsonvalue + ")");
                $.each(jsonvalue, function (i, item) {
                    var node = _this.Ztree.getNodeByParam("id", item.id, null);
                    _this.Ztree.checkNode(node, true);
                    if (!_this.Opts.IsMultiSelect) {//如果单选，则只能单选json数据中的第一个
                        return false;
                    }
                })
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "checkedAll", function (arg) {
            if (this.Ztree != null) {
                this.Ztree.checkAllNodes(true);
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "unCheckedAll", function (arg) {
            if (this.Ztree != null) {
                this.Ztree.checkAllNodes(false);
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            if (this.Ztree)
                this.Ztree.destroy();
            this.AtawBaseDom_dispose();
        });
    }
})(jQuery);