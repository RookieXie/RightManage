/// <reference path="package.js" />
/// <reference path="sub.html" />
/// <reference path="sub.html" />
/// <reference path="sub.html" />
(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    //类的构造函数
    $.AKjs.AtawImageShowItem = function (options) {
        var _base = $.extend({}, $.AKjs.AtawBaseShowItem(options), new AtawImageShowItem());
        return _base.sysCreator();
    }

    function AtawImageShowItem() {
        // this.IsSimple = false;
        this.$ImageInfo = $("<div><div/>");
       // this.$ImageInfo.append("<a class='ACT-IMAGE-HREF' target='_bank'  rel=\"sexylightbox\"  title='查看原图' ><i class='icon-picture' /></a>");
        this.$ImageInfo.append("<a class='ACT-IMAGE-HREF ACT-BOWSER hide'  target='_bank'   title='浏览' ><i class=' icon-eye-open fa fa-eye icon-large' /></a>");
        this.btn_group = $("<div class=\"btn-group\"></div>");
        this.sizebtn = $("<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\"><span class=\"caret\"></span></button>");
        this.sizeUl = $("<ul class=\"dropdown-menu\" role=\"menu\"></ul>");
        
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initContent", function () {
            if (!this.IsSimple) {
                this.$JObj.append(this.$ImageInfo);
            }
            else {
                this.$JObj.css("display", "inline-block");
            }
            this.$ImageInfo.find(".ACT-IMAGE-HREF").attr("href", this.ResourceInfo.HttpPath);
            this.btn_group.html("");
            var _this = this;
            if (this.IsSimple) {
                var _item = this.ResourceInfo;
                var size = "_90-90";
                var fileid = _item.FileId.toString();
                var httppath = _item.HttpPath.replace(fileid, fileid + size);
                var _$dv = $("<a   style='display:inline-block;'  target='_blank' href='" + _item.HttpPath + "'><img src='" + httppath + "'  /><a/>");
                _this.$JObj.append(_$dv);
            }
            else {
                $.each(this.ResourceInfo.ExtendList, function (i, n) {
                    var _f = _this.setSizeUrl(n);
                    //将缩略图装入.thumbnail中再置入缩略图列表( by yrk )
                    if (n == "0-0") {
                        $thumbnailImg = "<a    class='ACT_IMG_PIC'  rel=\"sexylightbox\"  target='_blank' ><img class='ACT_IMG_ITEM_" + n + "' src='" + _f + "'/></a>";
                        n = "实际截图大小";
                    } else {
                        $thumbnailImg = "<a   class='ACT_IMG_PIC' rel=\"sexylightbox\"  target='_blank' style=\"display:block;\" ><img class='ACT_IMG_ITEM_" + n + "' src='" + _f + "'  style=\"width:" + n.split("-")[0] + "px;height:" + n.split("-")[1] + "px;\" /></a>";

                    }
                    var $lablesize = "<label title='" + _this.Title + "' class='ACT-IMAGE-TITLE userName'>" + $.AKjs.InterceptStringDisplay(_this.Title, 5) + "</label>";
                    if (_this.sizebtn.html() == "<span class=\"caret\"></span>") {
                        $aThumbnail = "<div class='thumbnail' imgsize='" + n.AreplaceAll("-", "*") + "' style=\"float: left;\" >" + $thumbnailImg + $lablesize + "</div>";
                        _this.sizeUl.append("<li> <a class=\"img_size btn-primary\">" + n.AreplaceAll("-", "*") + "</a></li>");
                        _this.sizebtn.html(n.AreplaceAll("-", "*") + _this.sizebtn.html());
                    }
                    else {
                        $aThumbnail = "<div class='thumbnail' imgsize='" + n.AreplaceAll("-", "*") + "' style=\"float: left; display:none;\" >" + $thumbnailImg + $lablesize + "</div>";
                        _this.sizeUl.append("<li> <a  class=\"img_size\">" + n.AreplaceAll("-", "*") + "</a></li>");
                    }
                    _this.$JObj.append($aThumbnail);
                    //         _this.asynJs(
                    //[
                    //"/AtawStatic/lib/03Extend/sexyLightBox/js/jquery.easing.1.3.js",
                    // "/AtawStatic/lib/03Extend/sexyLightBox/js/sexylightbox.v2.3.jquery.min.js",
                    //  "/AtawStatic/lib/03Extend/sexyLightBox/sexylightbox.css"
                    //], function () {
                    //    SexyLightbox.initialize({ color: 'black', dir: 'sexyimages' });
                    // });


                });
                _this.$JObj.append('<div class="clearfix"/>');
                _this.btn_group.append(this.sizebtn);
                _this.btn_group.append(this.sizeUl);
                if (this.sizeUl.find("li").length == 1) {
                    _this.btn_group.hide();
                }
                _this.$ImageInfo.append(_this.btn_group);
                _this.btn_group.find(".img_size").bind("click", function () {
                    _this.btn_group.find(".img_size").removeClass("btn-primary");
                    _this.sizebtn.html($(this).html() + "<span class=\"caret\"></span>");
                    var _btn = this;
                    _this.$JObj.find(".thumbnail").each(
				function () {
				    var __this = $(this);
				    if (__this.attr("imgsize") == $(_btn).html().trim()) {
				        __this.show();
				        $(_btn).addClass("btn-primary");
				    } else {
				        __this.hide();
				    }
				}
			);
                });
                //v<div id="append_parent"></div>
                //$aThumbnail.find("a").click(function () {
                //    this.$ImageInfo.find(".ACT-BOWSER").click();
                //});
                this.$JObj.find(".ACT_IMG_PIC").off("click").on("click", function () {
                    if (!window._ACT_imgupload) {
                        window._ACT_imgupload = function (dom) {
                            var _$dom = $(dom);
                            var _$pic = _$dom.parent().parent().parent().find("#imgzoom_zoom");
                            if (_$pic.length > 0) {
                                window.open(_$pic.attr("src"));
                            }
                        }
                    }
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

              // alert(123);
              if ($("#append_parent").length == 0) {
                  $("body").append($('<div id="append_parent"></div>'));
              }
              var _$this = $(this);
             
              var _imgUrl = _this.$JObj.find(".ACT-BOWSER").attr("href");
              _$this.attr("zoomfile", _imgUrl);
              _$this.attr("file", _imgUrl);
              var _imgId = $.AKjs.getUniqueID();
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

                  zoom(_$this[0], _$this.attr("src"), 0, 0, 0);

              });
                        return false;
                  
                });
            }

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setSizeUrl", function (wh) {
            //var _url = this.ResourceInfo.HttpPath;
            //            var _index = this.ResourceInfo.HttpPath.lastIndexOf(".");
            //            var _path = this.ResourceInfo.HttpPath.substring(0, _index);
            //            var _ext = this.ResourceInfo.HttpPath.substring(_index, this.ResourceInfo.HttpPath.length);
            //            var _f = _path + "_" + wh + _ext;
            //            return _f;

            return $.AKjs.AddUrlFileName(this.ResourceInfo.HttpPath, wh);
            // alert(_ext);
            //var _fName = _url.attr("file");
            //alert(_fName);
        });

    }

})(jQuery);