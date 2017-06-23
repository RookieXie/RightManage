(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};
    $.AKjs.AkNode = $.AKjs.AkNode ? $.AKjs.AkNode : {};
    var _this = $.AKjs.AkNode.Refresh = $.AKjs.AkNode.Refresh ? $.AKjs.AkNode.Refresh : {};
    _this.UserRefresh = function (data) {
        var lkid = data.Data;
        var timestamp = Date.parse(new Date());
        var $aimgs = $("img[lkid = " + lkid + "].ACT-USER-AVATAR");
        for (var i = 0; i < $aimgs.length; i++) {
            var _$img = $aimgs.eq(i);
            var src = _$img.attr("src");
            var end = src.length;
            if (src.indexOf("?d=") != -1) {
                end = src.indexOf("?d=");
            }
            if (src.indexOf("?=") != -1) {
                end = src.indexOf("?=");
            }
            src = src.substring(0, end);
            src = src + "?d=" + timestamp;
            _$img.attr("src", src);
        }
        var $aimgs = $("a[lkid = " + lkid + "] > img");
        //alert($aimgs.length);
        for (var i = 0; i < $aimgs.length; i++) {
            var _$img = $aimgs.eq(i);
            var src = _$img.attr("src");
            var end = src.length;
            if (src.indexOf("?d=") != -1) {
                end = src.indexOf("?d=");
            }
            if (src.indexOf("?=") != -1) {
                end = src.indexOf("?=");
            }
            src = src.substring(0, end);
            src = src + "?d=" + timestamp;
            _$img.attr("src", src);
            //alert(src);
        }
    }
    _this.ClubRefresh = function (data) {
        $.AKjs.getJSON("/SNS/Refresh/Show", {
            id: data.Data, type: "ClubRefresh"
        }, function (res) {
            //va_thisr clubid = res[0].FID;
            var clubname = res[0].ClubName;
            var src = res[0].ClubImage;
            $("div[clubid = " + clubid + "] > div > img").attr("src", src);
            $("div[clubid = " + clubid + "] > label").attr("title", clubname);
        });
    }
    _this.SystemNoticeRefresh = function (data) {
        $.AKjs.getJSON("/SNS/Refresh/Show", {
            id: data.Data, type: "SystemNoticeRefresh"
        }, function (res) {
            $(".ACT-SYSTEM-NOTICE").html(res);
        });
    }

    _this.DeskPanleRefresh = function (data, type) {
        $.AKjs.getJSON("/SNS/Refresh/Show", {
            id: data.Data, type: type
        }, function (name) {
            var _$this = $("[paneltitle='"+ name +"']");
            var $body = _$this.parents().next("#panel-body-data");
            $body.empty();
            var href = _$this.attr("url");
            if (href != null) {
                _this.C.refreshpanelbody($body, href);
            } else {
                var mrcname = _$this.attr("mrc");
                require.async(mrcname, function (_per) {
                    _per = new _per();
                    _per.init($body);
                });
            }
        });
    }

})(jQuery);