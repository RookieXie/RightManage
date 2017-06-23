(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawGuidePage = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawGuidePage()).sysCreator();
    }
    $.fn.AtawGuidePage = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawGuidePage", options);
    }
    function AtawGuidePage() {
        this.IsPart = false;
        this.WorkflowDefName = "";
        this.GuideXml = "";
        this.CurrentStep = 0;
        this.DisplayName = "";
        this.$InsertGuid = $('<li><span class="step">1</span><span class="title">填写表单</span></li>');
        this.$LaunchWorkflowGuid = $('<li><span class="step">2</span><span class="title">启动任务</span></a></li>');
        this.$WorkflowDetailGuid = $('<li><span class="step">3</span><span class="title">任务进行中</span></a></li>');
        this.NaviDom = null;

        this.$progressBar = $('<div role="progressbar" class="progress progress-striped" id="bar"><div class="progress-bar progress-bar-success" style="width: 25%;"></div></div>');
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.WorkflowDefName = this.Options.WorkflowDefName;
            this.GuideXml = this.Options.GuideXml;
            this.DisplayName = this.Options.DisplayName;
            this.setProByOptName("IsPart", "IsPart");
            this.setProByOptName("NaviDom", "NaviDom");


        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            $.AKjs.getJSON("/module/module", { xml: this.GuideXml, pageStyle: "Insert" }, function (res) {
                _this.appendStep();
                res["AtawSubmitSetting"] = {
                    afterInsertFun: function (page, key) {
                        _this.IntoTheSecondStep(key);
                    }
                }
                _this.addtionDesktopShortcut(res);
                res["IsPart"] = _this.IsPart;
                if (_this.NaviDom) {
                    res.NaviContentSelector = _this.NaviDom;
                }
                _this.$JObj["AtawInsertPage"](res);

            });
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "IntoTheSecondStep", function (key) {
            if (!key) return;
            var _this = this;
            this.CurrentStep = 1;
            var ds = {};
            ds["_KEY"] = [{ "KeyValue": key}];
            $.AKjs.getJSON("/module/module", { xml: this.GuideXml, pageStyle: "Detail", ds: $.toJSON(ds) }, function (res) {
                _this.appendStep();
                _this.addtionDesktopShortcut(res);
                res["IsPart"] = _this.IsPart;
                _this.$JObj["AtawDetailPage"](res);
                var $btnGroup = _this.$JObj.find('.acs-grid-normal');
                if ($btnGroup.length > 0) {
                    $btnGroup.find('a').remove();
                    var $updateA = $('<a href="javascript:void(0)" class="btn btn-warning"><span><i class="icon-edit fa fa-edit icon-white" />编辑</span></a>');
                    $updateA.click(function () {
                        _this.IntoUpdatePage(key);
                    });
                    var $launchA = $('<a href="javascript:void(0)" class="btn">启动流程</a> ');
                    $launchA.click(function () {
                        $.AKjs.getJSON("/WorkFlow/Workflow/CreatorByJsonGuide", {
                            workflowDefine: _this.WorkflowDefName,
                            key: key
                        }, function (res) {
                            _this.IntoTheThirdStep(res);
                        })
                    });
                    $btnGroup.append($updateA);
                    $btnGroup.append($launchA);
                }
            });
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "IntoUpdatePage", function (key) {
            if (!key) return;
            var _this = this;
            var ds = {};
            ds["_KEY"] = [{ "KeyValue": key}];
            $.AKjs.getJSON("/module/module", { xml: this.GuideXml, pageStyle: "Update", ds: $.toJSON(ds) }, function (res) {
                _this.appendStep();
                res["IsPart"] = _this.IsPart;
                res["AtawSubmitSetting"] = {
                    afterUpdateFun: function (page, key) {
                        _this.IntoTheSecondStep(key);
                    }
                }
                _this.addtionDesktopShortcut(res);
                _this.$JObj["AtawUpdatePage"](res);
                _this.$JObj.find('.btn-group').remove();
            });
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "IntoTheThirdStep", function (key) {
            if (!key) return;
            var _this = this;
            this.CurrentStep = 2;
            $.AKjs.getJSON("/workflow/WorkFlowInst/InstForm", { id: key }, function (res) {
                _this.appendStep();
                var currentPageStr = res.ExtData.FormType === "1" ? "流程处理页" : "流程详情页";
                var $warn = $('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>'
                                + '你当前处于' + currentPageStr + '.'
                                + '若查看自己的工作流程,点击:<a class="ACT-A-HREF" href="$$module/workflow/myWork" >我的工作</a>.'
                                + '若查看自己参与的流程,点击:<a class="ACT-A-HREF" href="$$module/workflow/myParticipation">我参与的流程</a>'
                                + '</div>');
                var _app = $.AKjs.AppGet();
                _this.$JObj.append($warn);
                if (res.ExtData.FormType === "1") {
                    res["AtawSubmitSetting"] = {
                        befortPostDataFun: function (data, page) {
                            page.AtawSubmitSetting.Url = "/Workflow/MyWork/ProcessAsk?id=" + key + "&ds=" + $.toJSON(data)
                            return true;
                        }
                    };
                    res["MvcFormUrlSetFun"] = function (mvcForm) {
                        return mvcForm.Url + "?id=" + key;
                    };
                    res["NoChangeCheckFun"] = function () {
                        return true;
                    }

                    //                    _this.$JObj.append("<p>" + res.Title + "</p>");
                    _this.addtionDesktopShortcut(res);
                    _this.$JObj.AtawViewPage(res);
                    if (res.ExtData.HaveSave === "1") {
                        var a = $('<a class="functionBtn" href="javascript:void(0)"><span>保存</span></a>');
                        a.click(function () {
                            _this.$JObj.AtawControl().submit("/Workflow/MyWork/ProcessSave?id=" + key);
                        })
                        _this.$JObj.append(a);
                    }
                } else {
                    res["AtawSubmitSetting"] = { befortPostDataFun: function (data, page) { alert(page.RegName); return true; } };
                    res["MvcFormUrlSetFun"] = function (mvcForm) {
                        return mvcForm.Url + "?id=" + key;
                    }
                    // _app.clearMain();
                    _this.$JObj.clear();
                    _this.addtionDesktopShortcut(res);
                    _this.$JObj.AtawViewPage(res);
                    var viewPageObj = _this.$JObj.AtawControl();
                    viewPageObj.$Submit.css("display", "none");
                }
            });
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "appendStep", function () {
            var _app = $.AKjs.AppGet();
            //_app.clearMain();
            this.$JObj.clear();
            this.$InsertGuid.removeClass('active');
            this.$LaunchWorkflowGuid.removeClass('active');
            this.$WorkflowDetailGuid.removeClass('active');
            if (this.CurrentStep === 1) {
                this.$LaunchWorkflowGuid.addClass('active');
                this.$progressBar.find(".progress-bar-success").css("width", "66%");
            }
            else if (this.CurrentStep === 2) {
                this.$WorkflowDetailGuid.addClass('active');
                this.$progressBar.find(".progress-bar-success").css("width", "100%");
            } else {
                this.$InsertGuid.addClass('active');
                this.$progressBar.find(".progress-bar-success").css("width", "33%");
            }
            var $dv = $('<div class="acs-formSteps form-wizard"><div class="form-body"><ul class="wizard-steps" /> </div></div>');
            var _$ul = $dv.find("ul");
            _$ul.append(this.$InsertGuid);
            _$ul.append(this.$LaunchWorkflowGuid);
            _$ul.append(this.$WorkflowDetailGuid);
            this.$JObj.prepend("<div class='acs-stepTitles'><h3 class='pull-left'>" + this.DisplayName + "</h3>" + "<div class='pull-right'><span><a class='ACT-A-HREF btn' href='$$module/workflow/workflowDef$Detail$" + Base64.encode($.toJSON({ "keys": this.WorkflowDefName })) + "'>模式详情页</a></span> <span><a class='btn' target='_blank' href='/WorkFlow/Designer/Index?shortName=" + this.WorkflowDefName + "'>流程图</a></span></div></div>");
            //this.$JObj.append("<div class='acs-stepTitles'><h3 class='pull-left'>"  + "</h3>" + "<div class='pull-right'><span><a class='ACT-A-HREF btn' href='$$module/workflow/workflowDef$Detail$" + Base64.encode($.toJSON({ "keys": this.WorkflowDefName })) + "'>模式详情页</a></span> <span><a class='btn' target='_blank' href='/WorkFlow/Designer/Index?shortName=" + this.WorkflowDefName + "'>流程图</a></span></div></div>");
            this.$JObj.find(".ACT-PANEL-BODY").append($dv);
            //$dv.find(".form-body").append(this.$progressBar);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "addtionDesktopShortcut", function (res) {
            if (res.ExtData) {
                res.ExtData["DeskShortcutName"] = this.DisplayName + "向导";
                res.ExtData["DeskShortcutHref"] = "$workflowguide$" + this.WorkflowDefName;
            } else {
                res.ExtData = { "DeskShortcutName": this.DisplayName + "向导", "DeskShortcutHref": "$workflowguide$" + this.WorkflowDefName };
            }
        });
    }
})(jQuery);