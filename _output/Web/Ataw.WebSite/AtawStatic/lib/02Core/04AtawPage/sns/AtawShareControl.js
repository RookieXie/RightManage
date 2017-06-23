(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //类的构造函数
    $.AKjs.AtawShareControl = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawShareControl()).sysCreator();
    }
    $.fn.AtawShareControl = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawShareControl", options);
    }
    function AtawShareControl() {
        this.$DivContain = null;
        this.DefaultValue = null; ;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.DefaultValue = [{ PRIVACY: "ToAllPeople"}];
            this.setProByOptName("defaultValue", "DefaultValue");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            this.$DivContain = $("<div class='acs-share'><span class='ACT-SELECTED-LIST'><span class='default'>请选择</span></span><span>" +
                                 "<span class='btn' onclick=\"$(this).find('i').SwitchClass('icon-sort-down fa fa-sort-down','icon-sort-up fa fa-sort-up',$(this).find('i').hasClass('icon-sort-up'))\"" +
                                 " data-target=\".tabContent\" data-toggle=\"collapse\"><i class=\"icon-sort-down fa fa-sort-down\"></i>" + "</span>" +
                                 "<div class='tabContent list-group ACT-CONTENT collapse'></div></span></div>");
            var $content = this.$DivContain.find(".ACT-CONTENT");
            var $singleCheckDv = $("<div class='acs-share-single'></div>");

            $singleCheckDv.append("<div><i class='icon-check fa fa-check-square-o ACT-SINGLE-CHECK' name='ToAllPeople'></i><span>所有人</span></div>");
            $singleCheckDv.append("<div><i class='icon-check-empty fa fa-square-o ACT-SINGLE-CHECK' name='ToMyself'></i><span>私密</span></div>");

            $content.append($singleCheckDv);
            var _this = this;
            $singleCheckDv.find(".ACT-SINGLE-CHECK").off("click").on("click", function () {
                var $selected = _this.$DivContain.find(".ACT-SELECTED-LIST");
                var $cb = $(this);
                if ($cb.hasClass("icon-check-empty fa fa-square-o")) {
                    $cb.removeClass("icon-check-empty fa fa-square-o");
                    $cb.addClass("icon-check fa fa-check-square-o");
                    $selected.find("span.default").css("display", 'none');
                    $selected.find("span.label").remove();
                    $selected.find("span.space").remove();

                    var name = $cb.attr("name");
                    if (name.toLowerCase() == 'toallpeople') {
                        $singleCheckDv.find("i[name='ToMyself']").removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                        $selected.append("<span class=\"label label-default single\" type='ToAllPeople'><i class=\"icon-share\"></i>所有人</span>");
                    }
                    else {
                        $singleCheckDv.find("i[name='ToAllPeople']").removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
                        $selected.append("<span class=\"label label-default single\" type='ToMyself'><i class=\"icon-lock\"></i>私密</span>");
                    }
                    $content.find(".ACT-TAB-CONTENT i.ACT-MULTI-CHECK").removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");

                    $content.removeClass("in").addClass("collapse");
                }
                else {
                    $cb.removeClass("icon-check fa fa-check-square-o");
                    $cb.addClass("icon-check-empty fa fa-square-o");
                    $selected.html("<span class='default'>请选择</span>");
                }
            });

            $content.append("<div><ul id=\"ACT-GROUPTAB\" class=\"nav nav-tabs nav-justified\"></ul><div class='tab-content ACT-TAB-CONTENT acs-share-multi'></div>");
            $content.find("#ACT-GROUPTAB").append("<li class=\"active\"><a data-toggle=\"tab\" href=\"#department\">部门</a></li>" +
                                          "<li class=\"\"><a data-toggle=\"tab\" href=\"#club\">圈</a></li>");

            $content.find(".ACT-TAB-CONTENT").append("<div id=\"department\" class=\"tab-pane active\"></div><div id=\"club\" class=\"tab-pane\"></div>");
            var _this = this;
            //seajs.use(['jquery', 'departmentusersmrc'], function ($, departmentusersmrc) {
            //    var _creator = new departmentusersmrc();
            //    _creator.setModel(_this.initTreeCheckBox("department"));
            //    _creator.init($content.find("#department"));
            //});

            //seajs.use(['jquery', 'myclubusersmrc'], function ($, myclubusersmrc) {
            //    var _creator = new myclubusersmrc();
            //    _creator.setModel(_this.initTreeCheckBox("club"));
            //    _creator.init($content.find("#club"));
            //});

            this.$JObj.append(this.$DivContain);
            if (this.DefaultValue && this.DefaultValue.length == 1 &&
                  this.DefaultValue[0].PRIVACY.toLowerCase() != "toallpeople" && this.DefaultValue[0].PRIVACY.toLowerCase() != "tomyselft") {
                this.dataValue(this.DefaultValue);
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initTreeCheckBox", function (treeType) {
            var _this = this;
            //添加checkbox
            return function ($items) {
                $.each($items, function (i, n) {
                    var _$li = $(n).parents("li:first");
                    var _id = _$li.AtawControl().Data.CODE_VALUE;
                    var _$userItem = $(n).find(".ACT-CHAT-USER-ITEM");
                    var _iconCheck = "&nbsp;<span class='acs-share-span'><i class='ACT-MULTI-CHECK icon-check-empty fa fa-square-o' id='" + _id + "'></i></span>";
                    if (_$userItem.length > 0) {
                        _$userItem.append(_iconCheck);
                    }
                    else {
                        $(n).append(_iconCheck);
                    }
                    $(n).find(".icon-check-empty").off('click').on("click", function () {
                        _this.treeItemCheckEvent($(this), treeType);
                    });
                });
                if (_this.DefaultValue) {
                    _this.dataValue(_this.DefaultValue);
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "treeItemCheckEvent", function ($cb, treeType) {
            var _this = this;
            var $selectedList = _this.$DivContain.find(".ACT-SELECTED-LIST");
            var $selectedItem = $selectedList.find("span[id='" + $cb.attr("id") + "']");
            if (!$cb.hasClass("icon-check fa fa-check-square-o")) {
                _this.$DivContain.find("i.ACT-SINGLE-CHECK").addClass("icon-check-empty fa fa-square-o").removeClass("icon-check fa fa-check-square-o");
                $cb.removeClass("icon-check-empty fa fa-square-o").addClass("icon-check fa fa-check-square-o");
                //清空已选区域
                $selectedList.find("span.default").css("display", "none");
                $selectedList.find("span.single").remove();
                var $item = null;
                if ($cb.parents("li").attr("menutype") == "module") {
                    //选中部门
                    if (treeType == "department") {
                        var text = $cb.parents(".ACT-ITEMSPAN").find(".departmentName").text();
                        $item = $("<span class='label label-default multi' type='ToDepartment' id='" + $cb.attr("id") + "'>" +
                                 "<i class='icon-group fa fa-group'></i>" + text + "&nbsp;<i class='icon-remove fa fa-times ACT-REMOVE' style='cursor:pointer'></i></span>");
                    }
                    //选中圈
                    else if (treeType == "club") {
                        $item = $("<span class='label label-danger multi' type='ToClub' id='" + $cb.attr("id") + "'></span>");
                        $item.append($cb.parents(".ACT-ITEMSPAN").find("img").clone()).append("&nbsp;");
                        $item.append($cb.parents(".ACT-ITEMSPAN").find(".clubName").html());
                        $item.append("&nbsp;<i class='icon-remove fa fa-times ACT-REMOVE' style='cursor:pointer'></i>");
                    }
                }
                else {
                    $item = $("<span class='label label-primary multi' type='ToUser' id='" + $cb.attr("id") + "'></span>");
                    $item.append($cb.parents(".ACT-ITEMSPAN").find("img").clone()).append("&nbsp;");
                    $item.append($cb.parents(".ACT-ITEMSPAN").find(".userName").html());
                    $item.append("&nbsp;<i class='icon-remove fa fa-times ACT-REMOVE' style='cursor:pointer'></i>");

                }

                $selectedList.append($item).append("<span class='space'>&nbsp;</span>");

                $item.find(".ACT-REMOVE").off("click").on("click", function () {
                    //                    var _$parent = $(this).parent();
                    //                    _$parent.next("span").remove();
                    //                    _$parent.remove();
                    //                    var _id = _$parent.attr("id");

                    //                    _this.$DivContain.find("i[id='" + _id + "']").removeClass("checked");

                    //                    if ($selectedList.find(".multi").length == 0) {
                    //                        $selectedList.find("span.default").css("display", "");
                    //                    }
                    _this.removeSelectedItem($(this));
                });
            }
            else {
                $cb.removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");

                if ($selectedItem.length > 0) {
                    $selectedItem.next("span").remove();
                    $selectedItem.remove();
                }
                if ($selectedList.find(".multi").length == 0) {
                    $selectedList.find("span.default").css("display", "");
                }
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "removeSelectedItem", function ($removeIcon) {
            var _$parent = $removeIcon.parent();
            _$parent.next("span").remove();
            _$parent.remove();
            var _id = _$parent.attr("id");

            this.$DivContain.find("i[id='" + _id + "']").removeClass("icon-check fa fa-check-square-o").addClass("icon-check-empty fa fa-square-o");
            var $selectedList = this.$DivContain.find(".ACT-SELECTED-LIST");
            if ($selectedList.find(".multi").length == 0) {
                $selectedList.find("span.default").css("display", "");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            var selectedItems = [];
            var $selectedList = this.$DivContain.find(".ACT-SELECTED-LIST span.label:visible");
            for (var i = 0; i < $selectedList.length; i++) {
                var _$item = $($selectedList[i]);
                var _item = { PRIVACY: _$item.attr("type"), OWNERID: _$item.attr("id") };
                selectedItems.push(_item);
            }
            return selectedItems;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (value) {
            var $selected = this.$DivContain.find(".ACT-SELECTED-LIST");
            $selected.find("span.multi").remove();
            $selected.find("span.single").remove();
            //this.$DivContain.find(".icon-check").removeClass("icon-check").addClass("icon-check-empty");
            if (value) {
                $selected.find("span.default").css("display", "none");
                var $item = null;
                for (var i = 0; i < value.length; i++) {
                    if (value[i].PRIVACY) {
                        var id = value[i].OWNERID;
                        //var $cb = this.$DivContain.find("i[id='" + id + "']");
                        switch (value[i].PRIVACY.toLowerCase()) {
                            case "toallpeople":
                                $selected.append("<span class=\"label label-default single\" type='ToAllPeople'><i class=\"icon-share\"></i>所有人</span>");
                                this.$DivContain.find("i[name='ToAllPeople']").addClass("icon-check fa fa-check-square-o").removeClass("icon-check-empty fa fa-square-o");
                                this.$DivContain.find(".ACT-CONTENT").removeClass("in").addClass("collapse");
                                return;
                            case "tomyself":
                                $selected.append("<span class=\"label label-default single\" type='ToMyself'><i class=\"icon-lock\"></i>私密</span>");
                                this.$DivContain.find("i[name='ToMyself']").addClass("icon-check fa fa-check-square-o").removeClass("icon-check-empty fa fa-square-o");
                                this.$DivContain.find(".ACT-CONTENT").removeClass("in").addClass("collapse");
                                return;
                            case "todepartment":
                                var $departmentcb = this.$DivContain.find("#department>i[id='" + id + "']");
                                if ($departmentcb.length > 0) {
                                    var text = $departmentcb.parents(".ACT-ITEMSPAN").find(".departmentName").text();
                                    $item = $("<span class='label label-default multi' type='ToDepartment' id='" + id + "'>" +
                                        "<i class='icon-group fa fa-group'></i>" + text + "&nbsp;<i class='icon-remove fa fa-times ACT-REMOVE' style='cursor:pointer'></i></span>");
                                    $selected.append($item).append("<span class='space'>&nbsp;</span>");
                                    $departmentcb.addClass("icon-check fa fa-check-square-o").removeClass("icon-check-empty fa fa-square-o");
                                }
                                break;
                            case "toclub":
                                var $clubcb = this.$DivContain.find("#club>i[id='" + id + "']");
                                if ($clubcb.length > 0) {
                                    $item = $("<span class='label label-primary multi' type='ToClub' id='" + id + "'></span>");
                                    $item.append($clubcb.parents(".ACT-ITEMSPAN").find("img").clone()).append("&nbsp;");
                                    $item.append($clubcb.parents(".ACT-ITEMSPAN").find(".clubName").html());
                                    $item.append("&nbsp;<i class='icon-remove fa fa-times ACT-REMOVE' style='cursor:pointer'></i>");
                                    $selected.append($item).append("<span class='space'>&nbsp;</span>");
                                    $clubcb.addClass("icon-check fa fa-check-square-o").removeClass("icon-check-empty fa fa-square-o");
                                }
                                break;
                            case "touser":
                                var $usercb = this.$DivContain.find("i[id='" + id + "']:first");
                                if ($usercb.length > 0) {
                                    $item = $("<span class='label label-primary multi' type='ToUser' id='" + id + "'></span>");
                                    $item.append($usercb.parents(".ACT-ITEMSPAN").find("img").clone()).append("&nbsp;");
                                    $item.append($usercb.parents(".ACT-ITEMSPAN").find(".userName").html());
                                    $item.append("&nbsp;<i class='icon-remove fa fa-times ACT-REMOVE' style='cursor:pointer'></i>");
                                    $selected.append($item).append("<span class='space'>&nbsp;</span>");
                                    $usercb.addClass("icon-check fa fa-check-square-o").removeClass("icon-check-empty fa fa-square-o");
                                }
                                break;
                        }
                    }
                }
                this.$DivContain.find(".ACT-CONTENT").removeClass("in").addClass("collapse");
                var _this = this;
                $selected.find(".ACT-REMOVE").off("click").on("click", function () {
                    _this.removeSelectedItem($(this));
                });
            }

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "refresh", function () {
            this.dataValue(this.DefaultValue);
        });

    }
})(jQuery);