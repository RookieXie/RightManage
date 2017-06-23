(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawNormalRowGroupDom = function (options) {
        return $.extend({}, $.AKjs.AtawNormalRowDom(options), new AtawNormalRowGroupDom()).sysCreator();
    }



    function AtawNormalRowGroupDom() {
        this.ColumnGroupList = [];


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.AtawBaseRowDom_creator();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "groupColumns", function () {
            this.setColumnGroupList();
            this.initColumnGroups();

        });

        //构造列分组对象列表
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setColumnGroupList", function (options) {
            var columnGroupConfigs = this.ParentFormObj.Form.ColumnGroups;
            if (columnGroupConfigs) {
                for (var i = 0; i < columnGroupConfigs.length; i++) {
                    var groupColumnList = [];
                    for (var j = 0; j < columnGroupConfigs[i].Columns.length; j++) {
                        var columnObj = this.getColumnObjByName(columnGroupConfigs[i].Columns[j].Name);
                        if (columnObj) {
                            groupColumnList.push(columnObj);
                        }
                    }
                    var columnGroup = { ColumnList: groupColumnList, ColumnGroupConfig: columnGroupConfigs[i] };
                    this.ColumnGroupList.push(columnGroup);
                }
            }
        });

        //初始化行布局信息
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initColumnGroups", function () {
            var sumShowType = 0;
            var column;
            var $row = $('<div class="zu3 atawNormalRow"><div class="row columnGroup panel-default acs-colgroup"></div></div>');
            var groups = [];
            this.$JObj.append($row);
            for (var i = 0; i < this.ColumnGroupList.length; i++) {
                columnGroup = this.ColumnGroupList[i];
                sumShowType += columnGroup.ColumnGroupConfig.ShowType;
                $.AKjs.ColShowType = 4;
                if (sumShowType > $.AKjs.ColShowType) {
                    this.columnGroupCss(groups, $row);
                    groups = [];
                    groups.push(columnGroup);
                    sumShowType = columnGroup.ColumnGroupConfig.ShowType;
                    $row = $('<div class="zu4 atawNormalRow"><div class="row columnGroup panel-default acs-colgroup"></div></div>');
                    this.$JObj.append($row);
                } else {
                    groups.push(columnGroup);
                }
            }
            $.AKjs.ColShowType = 4;
            this.columnGroupCss(groups, $row);
        });

        //根据ShowType渲染每一行的列分组
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "columnGroupCss", function (groups, $row) {
            var columnGroupCount = 0;
            var _colCount = 12 / $.AKjs.ColShowType;
            var groupsLength = groups.length;
            for (var i = 0; i < groupsLength; i++) {
                var _groupConfig = groups[i].ColumnGroupConfig;
                var _displayName = _groupConfig.DisplayName ? "&nbsp;"+_groupConfig.DisplayName : "&nbsp;其他";
                var _i = _groupConfig.ShowType * _colCount;
                var _ids = "ACT-GROUP-TILE" + $.AKjs.getUniqueID();
               // var _$groupPanel = $("<div class='panel panel-primary acs-colgroup'><div class='panel-heading'>" + _displayName +
               // "<span class='ACT-GROUP-HEAD pull-right'  data-toggle='collapse'    data-target='#" + _ids + "' ><i class='icon-caret-up'>&nbsp;</i></span></div><div  id='" + _ids + "'  class=' collapse in  panel-body ACT-PANEL-BODY'></div></div>");
                var _$groupPanel = $("<form class=\"col-lg-12\"><fieldset><legend>" + _displayName + "<span class='ACT-GROUP-HEAD pull-right collapsed'  data-toggle='collapse'    data-target='#" + _ids + "'><i class=\"icon-caret-up fa fa-caret-up\" style=\"margin-left: 10px;\"></i></span></legend>" +
                "<div  id='" + _ids + "'  class=' collapse in  panel-body ACT-PANEL-BODY'></div></fieldset></form>");

                _$groupPanel.find(".ACT-GROUP-HEAD").click(function () {
                    var _$ = $(this).find("i");
                    if(_$.hasClass("icon-caret-up fa fa-caret-up"))
                    {
                        _$.SwitchClass("icon-caret-up fa fa-caret-up", "icon-caret-down fa fa-caret-down");
                    }
                    else{
                        _$.SwitchClass("icon-caret-down fa fa-caret-down", "icon-caret-up fa fa-caret-up");
                    }
                   
                });
                if (_groupConfig.IsHidden) {
                    _$groupPanel.css("display", "none");
                }
                _$groupPanel.addClass("col-lg-" + _i);
                $row.find(".columnGroup").append(_$groupPanel);
                $.AKjs.ColShowType = _groupConfig.ShowType;
                this.initGroupColumns(_$groupPanel.find(".ACT-PANEL-BODY"), groups[i].ColumnList);
            }
        });

        //渲染分组内的所有列
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initGroupColumns", function ($panelBody, columnList) {
            var sumShowType = 0;
            var column;
            var $group = $('<div class="atawNormalRow"><div class="row showGrid panel-default acs-colgroup"></div></div>');
            var group = [];
            $panelBody.append($group);
            for (var i = 0; i < columnList.length; i++) {
                column = columnList[i];
                sumShowType += column.ColumnConfig.ShowType;
                if (sumShowType > $.AKjs.ColShowType) {
                    this.columnCss(group, $group);
                    group = [];
                    group.push(column);
                    sumShowType = column.ColumnConfig.ShowType;
                    $group = $('<div class="atawNormalRow"><div class="row showGrid panel-default acs-colgroup"></div></div>');
                    $panelBody.append($group);
                } else {
                    group.push(column);
                }
            }
            this.columnCss(group, $group);
        });

        //根据列名获取列对象
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getColumnObjByName", function (name) {
            var columnList = this.ColumnList;
            for (var i = 0; i < columnList.length; i++) {
                if (columnList[i].ColumnConfig.Name == name) {
                    return columnList[i];
                }
            }
        });

    }

})(jQuery);
