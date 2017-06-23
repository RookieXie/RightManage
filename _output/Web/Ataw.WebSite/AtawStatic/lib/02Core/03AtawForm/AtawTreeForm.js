(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawTreeForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawTreeForm()).sysCreator();
    }
    function AtawTreeForm() {
        this.TreeRegName = "";
        this.$FormDiv = $("<div></div>");
        this.$LeftDiv = $("<div></div>");
        this.$RightDiv = $('<div class=\"dataTable\">' +
        //                '<h2><input class=\"ACT-CHECK-SINGLE DT_ckb_input\" type=\"checkbox\"></h2>' +
                '<div class="data_row3"></div><div style="clear:both"></div>'
                + '</div>');
        this.$AddRootButton = $("<div class=\"ACT-BUTTONBAR newbutton\"><a href=\"javascript:void(0);\" class=\"functionBtn\"><span>新增根节点</span></a></div>");
        this.$RightContent = this.$RightDiv.find('.data_row3');
        this.ZtreeObj = null;
        this.Data = null;
        this.TableName = "";
        this.Form = null;
        this.FormName = "";
        this.FirstLoadTree = true; //是否首次加载树
        this.Xml = "";
        this.CurrentNode = null;
        this.TextFieldName = "";
        this.IdFieldName = "";
        this.ParentFieldName = "";
        this.DeleteFun = null;
        this.DropFun = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            var _this = this;
            this.TreeRegName = this.Options.TreeRegName;
            this.FormName = this.Options.Form.Name;
            this.Data = this.Options.Data;
            this.TableName = this.Options.Form.TableName;
            this.Form = this.Options.Form;
            this.Xml = this.Options.Xml;
            this.TextFieldName = this.Form.TextFieldName;
            this.IdFieldName = this.Form.PrimaryKey;
            this.ParentFieldName = this.Form.ParentFieldName;
            this.DeleteFun = this.Options.DeleteFun;
            this.DropFun = this.Options.DropFun;
            this.$AddRootButton.click(function () {
                _this.CurrentNode = null;
                _this.loadInsertRight();
            })
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            this.$JObj.append(this.$FormDiv);
            this.$FormDiv.append(this.$AddRootButton);
            this.loadLeft();

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initLeft", function () {
            var _this = this;
            this.ZtreeObj = $.AKjs.AtawTree({
                RegName: this.TreeRegName,
                Data: this.Data[this.TableName],
                TextFieldName: this.TextFieldName,
                IdFieldName: this.IdFieldName,
                ParentFieldName: this.ParentFieldName,
                NodeClick: function (event, treeId, treeNode) {
                    _this.CurrentNode = treeNode;
                    _this.loadDetailRight();
                },
                FirstSuccess: function (event, treeId, treeNode, msg) {
                    if (_this.FirstLoadTree) {
                        var _treeObj = this.getZTreeObj(treeId);
                        if (_treeObj) {
                            var _treeNodes = _treeObj.getNodes();
                            if (_treeNodes && _treeNodes.length > 0) {
                                _this.CurrentNode = _treeNodes[0];
                                _this.loadDetailRight();
                            }
                            _this.FirstLoadTree = false;
                        }
                    }
                },
                AddHoverDom: function (treeId, treeNode) {
                    var sObj = $("#" + treeNode.tId + "_span");
                    if (treeNode.editNameFlag || $("#addBtn_" + treeNode[_this.IdFieldName]).length > 0) return;
                    var addStr = "<span class='button add' id='addBtn_" + treeNode[_this.IdFieldName]
				+ "' title='新增' onfocus='this.blur();'></span>";
                    sObj.after(addStr);
                    var btn = $("#addBtn_" + treeNode[_this.IdFieldName]);
                    if (btn) {
                        btn.bind("click", function () {
                            _this.CurrentNode = treeNode;
                            _this.loadInsertRight();
                            return false;
                        });
                    }
                },
                RemoveHoverDom: function (treeId, treeNode) {
                    $("#addBtn_" + treeNode[_this.IdFieldName]).unbind().remove();
                },
                BeforeEdit: function (treeId, treeNode) {
                    _this.CurrentNode = treeNode;
                    _this.loadUpdateRight();
                    return false;
                },
                BeforeRemove: function (treeId, treeNode) {
                    var deleteOption = {};
                    deleteOption[_this.TableName + "_OPERATION"] = [{ "OperationName": "Delete", "KeyValue": treeNode[_this.IdFieldName], "Data": null}];
                    _this.DeleteFun(deleteOption);
                },
                OnDrop: function (event, treeId, treeNodes, targetNode, moveType) {
                    var dropOption = {};
                    var keyValue = treeNodes[0][_this.IdFieldName];
                    dropOption["PAGE_SYS"] = [{ "KeyValue": keyValue, "PageStyle": "Update"}];
                    var nodeData = {};
                    nodeData[_this.IdFieldName] = keyValue;
                    nodeData[_this.ParentFieldName] = targetNode[_this.IdFieldName];
                    dropOption[_this.TableName] = [nodeData];
                    _this.DropFun(dropOption);
                }
            });
            this.ZtreeObj.loadData();
            this.ZtreeObj.intoDom(this.$LeftDiv);
            _this.CurrentNode = this.ZtreeObj.selectDefaultNode();
            _this.loadDetailRight();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initRight", function () {
            var _isInsert = false;
            var _this = this;
            var _leftData = null;
            var index = 0;
            var _op = null;
            if (this.Form.Action === "Insert") {
                _isInsert = true;
            }
            else {
                var id = this.CurrentNode ? this.CurrentNode[_this.IdFieldName] : "0"; //当为新增根节点时,该id为0
                $.each(this.Data[this.TableName], function (i, formData) {
                    if (formData[_this.Form.PrimaryKey] === id) {
                        _leftData = formData;
                        index = i;
                        return false;
                    }
                })
                _leftData = _leftData ? _leftData : this.Data[this.TableName][0];
            }
            _op = {
                DataSet: this.Data,
                DataRow: _isInsert ? null : _leftData,
                Form: this,
                ColumnConfigs: this.Form.Columns,
                RowIndex: index,
                PrimaryKey: this.Form.PrimaryKey,
                IsInsertRow: _isInsert
            };
            var _row = $.AKjs.AtawTreeRowDom(_op);
            _row.intoDom(this.$RightDiv);
            if (this.Form.Action === "Insert") {
                this.setParentValue();
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadLeft", function (id) {
            this.$LeftDiv.html("");
            this.$FormDiv.append(this.$LeftDiv);
            this.initLeft();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadRight", function (pageStyle) {
            var _this = this;
            this.$RightContent.html("");
            this.$FormDiv.append(this.$RightDiv);
            var _ds = {};
            var id = this.CurrentNode ? this.CurrentNode[_this.IdFieldName] : "0"; //当为新增根节点时,该id为0
            _ds["_KEY"] = [{ "KeyValue": id}];
            _ds = $.toJSON(_ds)
            $.AKjs.getJSON("/module/module", { xml: _this.Xml, pageStyle: pageStyle, keyValue: id, ds: _ds }, function (res) {
                _this.Data = res.Data;
                $.each(res.Forms, function (i, n) {
                    if (!i.AendWith("_INSERT", true) && !i.AendWith("_SEARCH", true)) {
                        _this.Form = this;
                        _this.TableName = this.TableName;
                    }
                })
                _this.Xml = res.RegName;
                _this.initRight(id);
            });
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadDetailRight", function () {
            this.loadRight("List");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadInsertRight", function () {
            this.loadRight("Insert");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "loadUpdateRight", function () {
            this.loadRight("Update");
        });
        //给父节点赋值
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setParentValue", function () {
            //var id = this.CurrentNode ? this.CurrentNode[_this.IdFieldName] : "0"; //当为新增根节点时,该id为0
            var str = this.TableName + "." + this.Form.ParentKey + "." + "0";
            var parentControl = this.$RightContent.find("dd[act_ds='" + str + "']");
            if (parentControl.length > 0) {
                if (this.CurrentNode) {
                    parentControl.find(".ACT-TEXT").val(this.CurrentNode[this.TextFieldName]);
                } else {
                    parentControl.find(".ACT-TEXT").val("根节点");
                }
                parentControl = parentControl.AtawControl();
                if (parentControl) {
                    parentControl.dataValue(this.CurrentNode ? this.CurrentNode[this.IdFieldName] : "0");
                }
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reAsyncChildNodes", function (id) {
            if (this.ZtreeObj) {
                //                var destinationParentID = "";
                //                var str = this.TableName + "." + this.Form.ParentKey + "." + "0";
                //                var parentControl = this.$RightContent.find("dd[act_ds='" + str + "']");
                //                if (parentControl.length > 0) {
                //                    destinationParentID = parentControl.dataValue();
                //                }
                this.ZtreeObj.reAsyncChildNodes(this.CurrentNode);
            }
        });
    }
})(jQuery);