(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawPublishBrand = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawPublishBrand()).sysCreator();
    }
    $.fn.AtawPublishBrand = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawPublishBrand", options);
    }
    function AtawPublishBrand() {
        this.PublisherList = [];

        this.$Header = $('<div class="ACT-PUBLISH-BRAND-HEADER">' +
                          ' <a class=" btn ACT-PUBLISHER-BTN " regname="MicrText" ><i class=" icon-pencil fa fa-pencil"> 文字</i> </a>' +
                          ' <a class=" btn   ACT-PUBLISHER-BTN " regname="FilePic"><i class=" icon-cloud-upload fa fa-cloud-upload"> 文件/图片</i> </a>' +
                         '<div class="btn-group">' +
                                         '<a  class="btn  dropdown-toggle" data-toggle="dropdown"><i class="  icon-coffee fa fa-coffee"> 日常事务</i> <span class="caret"></span></a>' +
                                            '<ul class="dropdown-menu" role="menu">' +
                                               ' <li><a href="#" class="ACT-PUBLISHER-BTN"> 请假</a></li>' +
                                             '<li><a href="#" class="ACT-PUBLISHER-BTN"> 加班</a></li>' +
                                             '<li><a  class="ACT-A-HREF" href="$workflowguide$Weekly-WF-DEFINE"> 周报</a></li>' +
                                             '<li><a href="#" class="ACT-PUBLISHER-BTN"> 办公用品领用</a></li>' +
                                              '<li><a href="#" class="ACT-PUBLISHER-BTN"> 出差申请</a></li>' +
                                            '<li><a href="#" class="ACT-PUBLISHER-BTN"> 报销申请</a></li>' +
                                         ' </ul>' +
                                       '</div>' +
                          '<a class=" btn  ACT-PUBLISHER-BTN "><i class=" icon-tasks fa fa-tasks"> 综合事务</i> </a>' +
                          '<a class=" btn  ACT-PUBLISHER-BTN " regname="All"><i class=" icon-sort-down fa fa-sort-down"></i> 全部</a>' +
                          '</div>');


        this.$Body = $('<div class="popoverNolimitW bottom atawPublisher">' +
                              '<div class="arrow"></div>' +
                              '<div class="popoverNolimitW-content ACT-BODY">' +
                              '<img  style="width:38px;height:39px;" class="IMG-LIST ACT-SELF  ACT_HIDDEN acs-thumbImage38" src="http://192.168.66.11:99/Core/User/logo/atawsmysecret_60-60.jpg"/>' +
                              '<textarea class="input_weibo form-control" innertext="我正在做什么呢？" placeholder="我正在做什么呢？"></textarea>' +
                              '</div>' +
                         '</div>');

        this.$Brand = $('<div class="atawPublisherBottom"></div>');
        this.$PublishLimit = null;
        //this.$Body = null;
        this.IsFocus = false;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "reset", function () {
            var _this = this;
            var _$text = this.$Body.find("textarea");
            //_$text.css("height", "34px");
            //_this.$Body.css("width", "80%");
            //position: absolute;
            //_this.$Body.css("position", "absolute");
            _this.$Body.before(_this.$Header);
            //_this.$Header.show(500);
            _this.$Body.find(".arrow").show(500);
            //_this.$Body.css("top", "45px");
            _this.$Body.find(".ACT-SELF").hide(500);
            this.$Header.find(".ACT-PUBLISHER-BTN").unbind("click").bind("click", function () {
                var _regName = $(this).attr("regname");
                if (_regName) {
                    _this.clickPublisher(_regName);
                }
            });
        }); 

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "clickPublisher", function (regName) {
            var _per = $.AKjs["Ataw" + regName + "Publisher"];
            if (_per) {
                var _publisher = _per({ BrandObj: this });
                _publisher.setBody();

            }
            else {
                this.IsFocus = false;
                $.AKjs.App.notifyMesg("名称为： " + regName + " 的 发布模块未定义 ");
            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$JObj.css("z-index", 1);
            this.$JObj.append(this.$Header);
            this.$JObj.append(this.$Body);
            this.$JObj.append(this.$Brand);
            var _$text = this.$Body.find("textarea");
            var _this = this;
            // this.$Header
            $.AKjs.App.bindPageEvent(this.$Header);
            _$text.unbind("focus").bind("focus", function () {
                if (!_this.IsFocus) {
                    _this.IsFocus = true;
                    //-----------
                    _this.clickPublisher("MicrText");
                }

            });
            this.$Header.find(".ACT-PUBLISHER-BTN").unbind("click").bind("click", function () {
                var _regName = $(this).attr("regname");
                if (_regName) {
                    _this.clickPublisher(_regName);
                }
            });

        });

    }


})(jQuery);

