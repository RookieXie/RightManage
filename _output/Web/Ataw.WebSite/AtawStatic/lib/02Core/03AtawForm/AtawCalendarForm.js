(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawCalendarForm = function (options) {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawCalendarForm()).sysCreator();
    }

    function _extend() {
        return $.extend({}, $.AKjs.AtawBaseForm(options), new AtawCalendarForm());
    }

    $.fn.AtawCalendarForm = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawCalendarForm", options);
    }

    $.AKjs.InitCalendarFormContent = function (formObj) {
        var defaultView = "";
        var displayViews = "";
        var titleField = "";
        var startDateField = "";
        var endDateField = "";
        var calendar = formObj.Form.Calendar;
        if (calendar) {
            if (calendar.DefaultView != "none") {
                defaultView = calendar.DefaultView;
            }
            if (calendar.DisplayViews) {
                displayViews = calendar.DisplayViews;
            }
            if (calendar.TitleField) {
                titleField = calendar.TitleField;
            }
            if (calendar.StartDateField) {
                startDateField = calendar.StartDateField;
            }
            if (calendar.EndDateField) {
                endDateField = calendar.EndDateField;
            }
        }
        formObj.$FormContent.html("");
        var _$div = $("<div class='panel panel-default'></div>")
        formObj.$FormContent.append(_$div);
        if (displayViews == "") {
            displayViews = "month,agendaWeek,agendaDay";
        }
        if (defaultView == "") {
            defaultView = displayViews.split(",")[0];
        }
        var myEvents = [];
        var _dt = formObj.Data[formObj.TableName];
        var _date0 = null;
        if (_dt != null && _dt.length > 0) {
            for (var i = 0; i < _dt.length; i++) {
                var _id = _dt[i]["FID"];
                var _start = startDateField != "" && _dt[i][startDateField] != null ? new Date(_dt[i][startDateField].replace(/-/g, "/")) : "";
                var _end = endDateField != "" && _dt[i][endDateField] != null ? new Date(_dt[i][endDateField].replace(/-/g, "/")) : "";
                var _title = titleField != "" ? _dt[i][titleField] : "";
                if (i == 0) {
                    _date0 = _dt[i][startDateField];
                }
                var event = {
                    id: _id,
                    title: $.AKjs.formatTitle(formObj, _dt[i], i, titleField),
                    start: _start,
                    end: _end,
                    allDay: false,
                    editable: false,
                    buttonRight: _dt[i]["BUTTON_RIGHT"]
                };
                myEvents.push(event);
            }
        }
        var _defaults = {
            editable: true,
            firstDay: 1,
            defaultView: defaultView,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: displayViews
            },
            allDayText: '全天',
            axisFormat: 'H:mm',
            slotEventOverlap: false,
            events: myEvents
        };
        _$div.fullCalendar($.extend({}, _defaults, { eventRender: $.AKjs.eventRenderFun(formObj) }));
        if (_date0 && _date0 != "") {
            var selectdate = $.fullCalendar.parseDate(_date0, "yyyy-mm-dd");
            var year = selectdate.getFullYear();
            var month = selectdate.getMonth();
            var date = selectdate.getDate();
            if (defaultView == "month") {
                _$div.fullCalendar('gotoDate', year, month - 1);
            }
            else if (defaultView == "agendaWeek") {
                _$div.fullCalendar('gotoDate', year, month - 1);
            }
            else {
                _$div.fullCalendar('gotoDate', year, month - 1, date);
            }

        }
    }

    $.AKjs.formatTitle = function (formObj, row, rowIndex, titleField) {
        var form = formObj.Form;
        var title = titleField != "" ? row[titleField] : "";
        var titleColumn = null;
        for (var i = 0; i < form.Columns.length; i++) {
            if (form.Columns[i].Name == titleField) {
                titleColumn = form.Columns[i];
                break;
            }
        }
        if (titleColumn != null) {
            var regName = titleColumn.Options.RegName;
            var dataValue = $.AKjs.AtawJsDataValue(titleColumn.Options.DataValue, formObj.Data, title);
            title = $.AKjs.RegNameDataGet(regName, formObj.Data, dataValue, "", rowIndex);
        }
        var titleFormatFun = form.Calendar.TitleFormatFun;
        if (titleFormatFun) {
            var fun = $.AKjs.DetailFormat[titleFormatFun];
            if (fun) {
                var _title = $("<span>" + title + "</span>").text();
                title = fun(_title, formObj, title);
            }
        }
        return title;
    };

    $.AKjs.eventRenderFun = function (formObj) {
        return function (event, element) {
            var start = $.fullCalendar.formatDate(event.start, "HH:mm");
            var end = $.fullCalendar.formatDate(event.end, "HH:mm");
            if (event.end != null) {
                element.html("<div><p>" + start + "-" + end + "</p><p>" + event.title +
                    "<a class='btn btn-mini chk-btn-drop dropdown-toggle' data-toggle='dropdown'><span class='caret'></span></a></p></div>");
            }
            else {
                element.html("<div><p>" + start + "</p><p>" + event.title +
                    "<a class='btn btn-mini chk-btn-drop dropdown-toggle' data-toggle='dropdown'><span class='ACT-BTN-SWITCH' style='color:black;'><i class='icon-sort-down fa fa-sort-down'></i></span></a></p></div>");
            }
            element.find(".ACT-BTN-SWITCH").off("click").on("click", function () {
                var $i = $(this).find("i");
                if ($i.hasClass("icon-sort-down fa fa-sort-down")) {
                    $.AKjs.initDataButtons(formObj, event.buttonRight);
                    $i.SwitchClass("icon-sort-down fa fa-sort-down", "icon-sort-up fa fa-sort-up");
                }
                else {
                    formObj.ParentPageObj.clearButton();
                    $i.SwitchClass("icon-sort-up  fa fa-sort-up", "icon-sort-down  fa fa-sort-down");

                }
            });

        }
    };

    $.AKjs.initDataButtons = function (formObj, buttonRight) {
        var page = formObj.ParentPageObj;
        page.clearButton();
        var buttonRights;
        if (buttonRight) {
            buttonRights = buttonRight.split('|');
        }
        var dataButtons = page.DataButtons;
        for (var dataButton in dataButtons) {
            for (var i = 0; i < buttonRights.length; i++) {
                if (dataButtons[dataButton].Name == buttonRights[i]) {
                    dataButtons[dataButton].IsData = true;
                    page.objToButton(dataButtons[dataButton]);
                }
            }

        }
    };

    $.AKjs.InitCalendarRowContent = function (formContent) {
    }

    $.AKjs.CreateCalendarRowObj = function (op) {
    }

    function AtawCalendarForm() {

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "createRowObj", function (op) {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initFormContent", function () {
            $.AKjs.InitCalendarFormContent(this);
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reloadData", function () {
            //清空数据
            this.$FormContent.empty();

            this.AtawBaseForm_reloadData();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "CreateRowListData", function () {
            if (this.FormType == "Calendar")
                return;
            this.AtawBaseForm_CreateRowListData();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowList", function () {
            if (this.FormType == "Calendar")
                return;
            this.AtawBaseForm_initRowList();

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akInternal, "initRowContent", function () {
            return $.AKjs.InitCalendarRowContent(this.$FormContent);

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getRowByCheckBox", function () {
            return this.$FormContent.find(".ACT-CHECK-SINGLE:checked").parents(".common_module");
            //.remove();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _dvId = "CalendarForm" + $.AKjs.getUniqueID();
            this.$JObj.attr("id", _dvId);
            this.AtawBaseForm_init();
        });

    }


})(jQuery);
