(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs = $.AKjs ? $.AKjs : {};
    var defaults = {

    };
    $.fn.AtawCalendarPage = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawCalendarPage", options);
    }
    $.AKjs.AtawCalendarPage = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawCalendarPage()).sysCreator();
    }
    function AtawCalendarPage() {
        this.WinObj = null;
        this.OnlyDayView = false;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("OnlyDayView", "OnlyDayView");
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            var _this = this;
            var _defaults = {
                editable: true,
                firstDay: 1,
                defaultView: "agendaWeek",
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                allDayText: '全天',
                axisFormat: 'H:mm',
                slotEventOverlap: false

            };
            if (this.OnlyDayView) {
                _defaults = {
                    editable: false,
                    firstDay: 1,
                    defaultView: "agendaDay",
                    header: {
                        left: '',
                        center: '',
                        right: ''
                    },
                    allDayText: '全天',
                    axisFormat: 'H:mm',
                    slotEventOverlap: false
                }
            }


            this.asynJs([
  "/AtawStatic/lib/03Extend/fullcalendar/fullcalendar.js",
  "/AtawStatic/lib/03Extend/fullcalendar/fullcalendar.css"
  ], function () {

      _this.$JObj.fullCalendar($.extend({}, _defaults,
            {
                events: _this.getEvents(),
                dayClick: _this.dayClickFun(),
                eventClick: _this.eventClickFun(),
                eventDrop: _this.eventDropFun(),
                eventMouseover: _this.eventMouseoverFun,
                eventRender: _this.eventRenderFun()
            }));
  
   });




          


            //删除事项
            // _this.bindRemoveEvent();
            //}
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "getEvents", function () {
            var _this = this;
            return function (start, end, callback) {
                var startTime = $.fullCalendar.formatDate(start, "yyyy-MM-dd HH:mm:ss");
                var endTime = $.fullCalendar.formatDate(end.dateAdd('d', 1), "yyyy-MM-dd HH:mm:ss");
                var myEvents = [];
                $.AKjs.getJSON("/core/Calendar/GetCalendarMessage", { startTime: startTime, endTime: endTime }, callBack);
                function callBack(res) {
                    for (var i = 0; i < res.length; i++) {
                        var start = new Date(res[i].start.replace(/-/g, "/"));
                        var end = res[i].end == null || res[i].end .AisEmpty() ? "" : new Date(res[i].end.replace(/-/g, "/"));
                        var color = "";
                        var allDay = res[i].allDay;
                        var editable = true;
                        //var dateDiff = new Date().dateDiff('d', start);
                        var startDate = $.fullCalendar.formatDate(start, "yyyy/MM/dd");
                        var today = $.fullCalendar.formatDate(new Date(), "yyyy/MM/dd");
                        if (res[i].type == "ToDoItems") {
                            color = "orange";
                            //待办事项大于当前时间或者今日的全天待办事项，可编辑
                            if (start > new Date() || (startDate == today && allDay)) {
                                color = "green";
                            }
                            else {
                                editable = false;
                            }
                        }
                        else {
                            allDay = false;
                            editable = false;
                        }
                        var event = {
                            id: res[i].id,
                            title: res[i].title,
                            start: start,
                            end: end,
                            allDay: allDay == false ? allDay : true,
                            color: color,
                            type: res[i].type,
                            editable: editable
                        };
                        if (_this.OnlyDayView && res[i].type != "ToDoItems") {
                            continue;
                        }
                        myEvents.push(event);
                    }
                    callback(myEvents);
                };
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "eventMouseoverFun", function (event, jsEvent, view) {
            $(this).attr('title', event.title);
            $(this).css("z-index", '-1');
            $(this).tooltip({
                effect: 'toggle',
                cancelDefault: true
                // placement: 'right'
            });
        });

        //绑定删除事件
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "bindRemoveEvent", function () {
            var _this = this;
            _this.$JObj.find(".ACT-EVENT-REMOVE").off("click").on("click", function () {
                var id = $(this).attr("id");
                if (confirm("你确定要删除吗?")) {
                    $.AKjs.getJSON("/core/Calendar/DeleteToDoItem", { key: id }, function (res) {
                        if (res == "1") {
                            _this.$JObj.fullCalendar('removeEvents', id);
                            _this.bindRemoveEvent();
                        }
                    });
                }
                return false;
            });
        });

        //编辑已有事项
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "eventClickFun", function () {
            var _this = this;
            return function (event) {
                if (event.type == "ToDoItems") {
                    var start = $.fullCalendar.formatDate(event.start, "yyyy/MM/dd HH:mm:ss");
                    var now = $.fullCalendar.formatDate(new Date(), "yyyy/MM/dd HH:mm:ss");
                    //var dateDiff = new Date().dateDiff('d', event.start);
                    var startDate = $.fullCalendar.formatDate(event.start, "yyyy/MM/dd");
                    var today = $.fullCalendar.formatDate(new Date(), "yyyy/MM/dd");
                    //待办事项开始时间大于当前时间的可以再编辑
                    if (start > now || (event.allDay && startDate == today)) {
                        var $div = $("<div></div>");
                        $div.AtawWindow({
                            Title: "编辑待办事项",
                            Width: "38%"
                        });
                        seajs.use(['todoitemsmrc'], function (todoitemsmrc) {
                            var _creator = new todoitemsmrc();
                            _creator.setModel("Update", start, _this.afterSubmitFun(), event.id);
                            _creator.init($div);
                        });
                        _this.WinObj = $div.AtawControl();
                        _this.WinObj.open();
                    }
                }
            }
        });

        //渲染title
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "eventRenderFun", function () {
            var _this = this;
            return function (event, element) {
                if (event.type == "ToDoItems") {
                    var start = $.fullCalendar.formatDate(event.start, "HH:mm");
                    var end = $.fullCalendar.formatDate(event.end, "HH:mm");
                    if (!event.allDay) {
                        if (event.end != null) {
                            element.html("<div><p>" + start + "-" + end + "</p><p>" + event.title + "  <a class='ACT-EVENT-REMOVE' id='" + event.id + "'><i class='icon-remove fa fa-times'></i></a></p></div>");
                        }
                        else {
                            element.html("<div><p>" + start + "</p><p>" + event.title + "  <a class='ACT-EVENT-REMOVE' id='" + event.id + "'><i class='icon-remove fa fa-times'></i></a></p></div>");
                        }
                    }
                    else {
                        element.html("<div><p>" + event.title + "  <a class='ACT-EVENT-REMOVE' id='" + event.id + "'><i class='icon-remove fa fa-times'></i></a></p></div>");
                    }
                    element.find(".ACT-EVENT-REMOVE").off("click").on("click", function () {
                        if (confirm("你确定要删除吗?")) {
                            $.AKjs.getJSON("/core/Calendar/DeleteToDoItem", { key: event.id }, function (res) {
                                if (res == "1") {
                                    _this.$JObj.fullCalendar('removeEvents', id);
                                    //_this.bindRemoveEvent();
                                }
                            });
                        }
                        return false;
                    });
                }
            }
        });

        //新增事项
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dayClickFun", function () {
            var _this = this;
            return function (date, allDay, jsEvent, view) {
                var strtoday = new Date().Aformat("yyyy-mm-dd");
                var strDate = date.Aformat("yyyy-mm-dd");
                if (strDate >= strtoday) {
                    //自当前日期起可以新建待办事项
                    var $div = $("<div></div>");
                    $div.AtawWindow({
                        Title: "新建待办事项",
                        Width: "68%"
                    });

                    seajs.use(['todoitemsmrc'], function (todoitemsmrc) {
                        var _creator = new todoitemsmrc();
                        var beginDate = date.Aformat("yyyy-mm-dd hh:nn:ss");
                        //                        if (date.dateDiff("d", new Date()) > 0 && date.dateDiff("d", new Date()) < 1) {
                        //                            beginDate = new Date().Aformat("yyyy-mm-dd hh:nn:ss");
                        //                        }
                        _creator.setModel("Insert", beginDate, _this.afterSubmitFun());
                        _creator.init($div);
                    });
                    _this.WinObj = $div.AtawControl();
                    _this.WinObj.open();
                }
            }
        });

        //事项拖动
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "eventDropFun", function () {
            var _this = this;
            return function (event, dayDelta, minuteDelta, allDay, revertFunc) {
                var dateDiff = new Date().dateDiff("d", event.start);
                //不可拖动到以前日期的全天事件，亦不可拖动到当前时间以前的时间
                if ((allDay && dateDiff < -1) || (!allDay && dateDiff < 0)) {
                    Ataw.msgbox.show("不可移动到该日期", 5, 1000);
                    revertFunc();
                    return;
                }
                if (confirm("是否移动到此日期")) {
                    $.AKjs.getJSON("/core/Calendar/UpdateToDoItem", { fid: event.id, dayDiff: dayDelta, minDiff: minuteDelta, allDay: allDay }, function (res) {
                        if (res != "1") {
                            revertFunc();
                            return;
                        }
                        _this.bindRemoveEvent();
                    }, { nomsg: true });
                }
                else {
                    revertFunc();
                }
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "afterSubmitFun", function () {
            var _this = this;
            return function () {
                _this.WinObj.close();
                _this.reload();
            };
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reload", function () {
            this.dispose();
            if (this.OnlyDayView) {
                this.$JObj.AtawCalendarPage({ OnlyDayView: true });
            }
            else {
                this.$JObj.AtawCalendarPage();
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dispose", function () {
            this.$JObj.clear();
            this.$JObj.fullCalendar('destroy');
        });
    }


})(jQuery);