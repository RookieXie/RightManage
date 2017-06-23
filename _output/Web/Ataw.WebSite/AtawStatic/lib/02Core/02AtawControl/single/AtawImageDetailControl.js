(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //对UI控件的扩展
    $.fn.AtawImageDetail = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawImageDetail", options);
    }

    $.AKjs.AtawImageDetail = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawImageDetailControl());
    }

    //普通文本框
    function AtawImageDetailControl() {
        this.IsWh = false;
        this.ResourceInfoObj = [];
        this.Href = "/Content/PlatformThemes/SapphireBlue/images/default-photo.jpg";
        this.AlbumWh = "90-90";
        this.AlbumHref = "/Content/PlatformThemes/SapphireBlue/images/default-photo.jpg";

        this.GridHref = "/Content/PlatformThemes/SapphireBlue/images/default-photo.jpg";
        this.GridWh = "38-38";
        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {

        //        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            var _val = this.DataValue.getValue();
            var _sourcehref = "";
            var _resourceArrange = $.parseJSON(_val, true);
            if (_resourceArrange && _resourceArrange.CoverIndex != undefined && _resourceArrange.ResourceInfoList && _resourceArrange.ResourceInfoList.length > 0) {
                if (_resourceArrange.CoverIndex >= _resourceArrange.ResourceInfoList.length)
                    _resourceArrange.CoverIndex = _resourceArrange.ResourceInfoList.length - 1;
                this.ResourceInfoObj = [_resourceArrange.ResourceInfoList[_resourceArrange.CoverIndex]];
                if (this.ResourceInfoObj && this.ResourceInfoObj.length && this.ResourceInfoObj.length > 0) {
                    if (this.ResourceInfoObj[0].HttpPath) {
                        this.Href = this.ResourceInfoObj[0].HttpPath;
                       // _sourcehref = 
                        if (this.ResourceInfoObj[0].ExtendList) {
                            //wh
                            if (this.ResourceInfoObj[0].ExtendList[this.GridWh]) {
                                this.GridHref = $.AKjs.AddUrlFileName(this.Href, this.GridWh)
                                // this.IsWh = true;
                            }
                            else {
                                this.GridHref = this.Href;
                            }

                            if (this.ResourceInfoObj[0].ExtendList[this.AlbumWh]) {
                                this.AlbumHref = $.AKjs.AddUrlFileName(this.Href, this.AlbumWh)
                                this.IsWh = true;
                            }
                            else {
                                this.AlbumHref = this.Href;
                            }

                        }

                    }

                }
            }
            else {
                this.GridHref = _val;
            }
            this.$JObj.append("<a  class='ACT-BOWSER' ><img class='IMG-LIST' width='38' height='38' style='width:38px;height:38px' src='" + this.GridHref + "?rnd=" + $.AKjs.GetRand() + "' /></a>");
            var _this = this;
          
              
            this.$JObj.find(".ACT-BOWSER").off("click").on("click", function () {

                if (!window._ACT_imgroate) {
                    window._ACT_imgroate = function (dom) {
                        var _$dom = $(dom);
                        var _$pic = _$dom.parent().parent().parent().find("#imgzoom_zoom");
                        if (_$pic.length > 0) {
                            _this.asynJs(["/AtawStatic/lib/03Extend/rotate/jquery.rotate.js"], function () {
                                var _ra = _$pic.data("raval");
                                if (!_ra) _ra = 0;
                                if (_$pic.attr("isleft") != "0") {
                                    _$pic.css('rotate', _ra + 90);
                                    _$pic.data("raval", _ra + 90);
                                }
                                else {
                                    _$pic.css('rotate', _ra - 90);
                                    _$pic.data("raval", _ra - 90);
                                }
                                return false;
                            });
                        }
                    }
                }
                if (!window._ACT_imgupload) {
                    window._ACT_imgupload = function (dom) {
                        var _$dom = $(dom);
                        var _$pic = _$dom.parent().parent().parent().find("#imgzoom_zoom");
                        if (_$pic.length > 0) {
                            window.open(_$pic.attr("src"));
                        }
                    }
                }
                // alert(123);
                if ($("#append_parent").length == 0) {
                    $("body").append($('<div id="append_parent"></div>'));
                }
                var _$this = $(this);
                var _imgId = $.AKjs.getUniqueID();
                var _imgUrl = _this.Href + "?a=" + _imgId;
                _$this.attr("zoomfile", _imgUrl);
                _$this.attr("file", _imgUrl);
               
                _$this.attr("aid", _imgId);
                _$this.attr("id", "aimg_" + _imgId);
                _$this.addClass("zoom");
                _this.asynJs(["/AtawStatic/lib/03Extend/imgdiscuz/js/common.js", "/AtawStatic/lib/03Extend/imgdiscuz/js/common_extra.js",
                    "/AtawStatic/lib/03Extend/imgdiscuz/js/forum_viewthread.js",
                    "/AtawStatic/lib/03Extend/imgdiscuz/img/style_1_forum_viewthread.css"], function () {
                        window.IMGDIR = 'AtawStatic/lib/03Extend/imgdiscuz/img/', window.VERHASH = 'zfhf', window.JSPATH = 'AtawStatic/lib/03Extend/imgdiscuz/js/';
                        window.aimgcount = new Array();
                        aimgcount[1000] = [_imgId];
                        attachimggroup(1000);
                        attachimgshow(1000);
                        var aimgfid = 0;

                        zoom(_$this[0], _this.Href, 0, 0, 0);

                    });



                return false;

            });


        });

        //        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "getHref", function (wh) {
        //            if (this.ResourceInfoObj && this.ResourceInfoObj.length && this.ResourceInfoObj.length > 0) {
        //                if (this.ResourceInfoObj[0].HttpPath) {
        //                    this.Href = this.ResourceInfoObj[0].HttpPath;
        //                    if (this.ResourceInfoObj[0].ExtendList && this.ResourceInfoObj[0].ExtendList[wh]) {
        //                        //wh
        //                        this.Href = $.AKjs.AddUrlFileName(this.Href, this.Wh)
        //                        this.IsWh = true;
        //                    }
        //                }

        //            }
        //         });

    }
})(jQuery);
