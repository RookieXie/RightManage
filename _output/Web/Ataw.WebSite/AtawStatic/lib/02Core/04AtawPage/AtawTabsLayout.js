(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.fn.AtawTabsLayout = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawTabsLayout", options);
    }
    $.AKjs.AtawTabsLayout = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawTabsLayout()).sysCreator();
    }
    function AtawTabsLayout() {
        this.Layout = null;
        //this.$JObj = null;
        this.IsVertical = true;
        this.FormObjs = null;
        this.$FormNaviContain = null;
        this.Ulid = 0;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.Layout = this.Options.Layout;
            //this.$JObj = this.Options.$JObj;
            this.FormObjs = this.Options.FormObjs;
            //this.IsVertical = this.Options.IsVertical ? true : false;
            //this.IsVertical = true;
            this.IsVertical = this.Options.IsVertical;
            this.$FormNaviContain = this.Options.$FormNaviContain;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            if (this.IsVertical) {
                this.initVerticalTab();
            } else {
                this.initHorTab();
                //  this.initVerticalTab();
            }
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initHorTab", function () {
            _dv = $("<form class='tabbable fn-bottom'  style='background:#fff;'><div class='fieldset'><div class='legend clearfix'></div></div></form>");
            
            this.Ulid = $.AKjs.getUniqueID();
            this.$JObj.append(_dv);
            var ul = $('<ul class="nav nav-tabs"></ul>');
            _dv.find(".legend").append(ul);
            var div = $('<div class="tab-content panel collapse in clearfix" id="tabContent"' + this.Ulid + '>');
            _dv.find(".fieldset").append(div);
            this.initTab(div, ul);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initVerticalTab", function () {
            _dv = $('<div class="tabbable tabs-left"></div>');
            this.$JObj.append(_dv);
            var ul = $('<ul class="nav nav-tabs nav-justified "></ul>');
            _dv.append(ul);
            var div = $('<div class="tab-content panel panel-info">');
            _dv.append(div);
            this.initTab(div, ul);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPrivate, "initTab", function (div, ul) {
            var _this = this;
            var li, dl, idiv, guid;
            $.each(this.Layout.Panels, function (j, m) {
                if (_this.FormObjs[m.FormName] && (!_this.FormObjs[m.FormName].HasInitByInnerForm)) {
                    guid = $.AKjs.getUniqueID();
                    if (j == 0) {
                        li = $('<li class="active"><a href="#tab' + guid + '" data-toggle="tab">' + _this.FormObjs[m.FormName].Title + '</a></li>');
                        dl = $('<div class="tab-pane active" id="tab' + guid + '"></div>');
                        div.parent().attr("id", m.FormName + guid);
                    }
                    else {
                        li = $('<li><a href="#tab' + guid + '" data-toggle="tab">' + _this.FormObjs[m.FormName].Title + '</a></li>');
                        dl = $('<div class="tab-pane" id="tab' + guid + '"></div>');
                    }
                    ul.append(li);
                    div.append(dl);
                    idiv = $("<div></div>")
                    dl.append(idiv);
                    _this.FormObjs[m.FormName].IsInner = true;
                    _this.FormObjs[m.FormName].intoDom(idiv);
                    var $naviLi = $("<li><a href='#" + m.FormName + guid + "'>" + _this.FormObjs[m.FormName].Title + "</a></li>");
                    var showTabFun = (function ($currentLi, id) {
                        return function () {
                            _this.$FormNaviContain.find("li").each(function () {
                                $(this).removeClass("active");
                            });
                            var top = $currentLi.getElementTop();

                            window.scrollTo(0, top);

                            $(this).addClass("active");
                            $currentLi.find("a").tab("show");
                            //将Tab当成一个元素,方便滚动监听
                            div.parent().attr("id", id);
                            $("body").scrollspy('refresh');
                            return false;
                        }
                    })(li, m.FormName + guid);
                    $naviLi.click(showTabFun);
                    _this.$FormNaviContain.append($naviLi);
                    var activeNavFun = (function ($naviLi, id) {
                        return function () {
                            _this.$FormNaviContain.find("li").each(function () {
                                $(this).removeClass("active");
                            });
                            $naviLi.addClass("active");
                            //将Tab当成一个元素,方便滚动监听
                            div.parent().attr("id", id);
                            $("body").scrollspy('refresh');
                        }
                    })($naviLi, m.FormName + guid);
                    li.click(function (e) {
                        e.preventDefault()
                        activeNavFun();
                    })
                    idiv.find(".UI_DeskTop_Module_more").parent().remove();
                }
 
            });
            var _$tool = $('<li class="pull-right"><span class="ACT-COLL  btn  btn-xs  collapsed" data-toggle="collapse" data-target="#tabContent"' + this.Ulid + '"><i class="icon-caret-down fa fa-caret-down"></i></span></li>');
            ul.append(_$tool);
            _$tool.find(".ACT-COLL").click(function () {
                var _$ = $(this).find("i");
                if (_$.hasClass("icon-caret-down fa fa-caret-down")) {
                    _$.SwitchClass("icon-caret-down fa fa-caret-down", "icon-caret-up fa fa-caret-up");
                }
                else {
                    _$.SwitchClass("icon-caret-up fa fa-caret-up", "icon-caret-down fa fa-caret-down");
                }
               
            });
        });


    };
})(jQuery);
