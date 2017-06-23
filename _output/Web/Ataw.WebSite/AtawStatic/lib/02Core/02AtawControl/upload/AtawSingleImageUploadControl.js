(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //上传单图片
    $.AKjs.AtawSingleImageUpload = function (options) {
        return $.extend({}, $.AKjs.AtawBaseUpload(options), new AtawSingleImageUploadControl()).sysCreator();
    };
    $.fn.AtawSingleImageUpload = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawSingleImageUpload", options);
    };

    //上传图片裁剪控件
    function AtawSingleImageUploadControl() {
        this.Width = 100;
        this.Height = 100;
        this.IsCut = false;
        this.ImageSizeWidth = 100;
        this.ImageSizeHeight = 100;
        this.Multi = false;
        this.$DocumentCenter = $("<a  class='btn btn-default aks-dc-btn'>资料中心 </a>");
        this.IsSingle = true;

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("ImageSizeWidth", "ImageSizeWidth");
            this.setProByOptName("ImageSizeHeight", "ImageSizeHeight");
            this.setProByOptName("IsCut", "IsCut");
            //if (FileExtension)
            this.Uploader = '/core/Uploader/UploadImage?fileStorageName=' + this.StorageName + '&uploadName=' + this.UploadName +
                            '&width=' + this.ImageSizeWidth + '&height=' + this.ImageSizeHeight + '&isCut=' + this.IsCut;
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

            this.AtawBaseUploadControl_init();
            if ($.AKjs.IsEmpty(this.FileExtension)) {
                //----------
                this.FileExtension = "*.jpeg;*.jpg;*.bmp;*.gif;*.png";
            }

            if (!this.IsCut) {
                if (this.HasDocumentCenter) {
                    this.$JObj.find(".ACT-RIGHT").append(this.$DocumentCenter);
                }
            }
            var _this = this;
            this.$DocumentCenter.off("click").on("click", function () {
                var _$dc = $("<div/>");
                _$dc.AtawWindow({
                    Title: "资料中心",
                    Width: "98%"
                });
                var win = _$dc.AtawControl();

                var _op = {
                    IsSingle: _this.IsSingle,
                    BtnSureFun: function (a) {
                        //alert($.toJSON(a));
                        win.close();
                        win.dispose();
                        _$dc.clear(true);
                        _this.triggerChangeEvent();
                        for (var _i = 0; _i < a.length; _i++) {
                            _this.imagePreview(a[_i], false);
                        }
                    },
                    Type: "PICTURES"
                };
                var _Obj = $.AKjs.AtawDcDom(_op);
                _Obj.intoDom(_$dc);
                win.open();


            });
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setResult", function () {
            var _ff = this.$Href.attr("href");
            if (_ff != null && _ff != "")
                this.$Href.imgPreview();
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initUploadFile", function (resObj) {
            this.imagePreview(resObj, true);
        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "selectCuteFun", function (options) {
            var _jObj = this.$JObj;
            var _jObj_Result = this.$JObj_Result;

            var _this = this;
            return function (fileObj, data, response) {
                var ress = $.parseJSON(data); //转换成json格式
                $.AKjs.ActionResponse_Commond_Fun(ress, _fun);

                function _fun(_res) {
                    {
                        var _imgPreview = this.$JObj_Show = $("<div style='width:100%;height:50%;overflow:auto;'><div class=\"ACT-CUT-IMAGE cut-image\"><a class=\"ACT-SURE-CUT sure-cut btn btn-sm btn-primary\" href=\"javascript:\"><span>确定</span></a><span class='imgSize'></span><div>"
                       + "<table><tr><td style='width:450px'><div style='width:450px' class=\"ACT-LEFT-IMAGE left-image\"><img class=\"ACT-ORIGINAL-IMAGE original-image\" style='width:450px'   /></div></td>"
                       + "<td><div class=\"ACT-RIGHT-IMAGE right-image\"><img style='width:450px'  class=\"ACT-PREVIEW-IMAGE preview-image\" /></div></td></tr></table>"
                       + "</div></div></div>"); //装载预览图片的类成员
                        _this.ResourceInfoList = [];
                        _this.ResourceInfoList.push(_res);
                        var _imgUrl = _res.HttpPath; //文件路径
                        var _fileName = _res.FileNameTitle;
                        var _fileSize = _res.FileSizeK;
                        _imgPreview.find(".ACT-ORIGINAL-IMAGE").attr("src", _imgUrl);


                        _imgPreview.find(".ACT-PREVIEW-IMAGE").attr("src", _imgUrl);
                        _imgPreview.find(".ACT-RIGHT-IMAGE").css({ width: _this.Width, height: _this.Height }); //给右侧的图片设置属性
                        var win = _imgPreview.data("kendoWindow");
                        // win = undefined;
                        if (win === undefined) {
                            _imgPreview.AtawWindow({
                                Title: "请截取要上传的图片",
                                Width: 800

                            });
                            win = _imgPreview.AtawControl();
                        }
                        // win.center();
                        win.open();

                        var _hidePreviewFun = function () {
                            _imgPreview.find(".ACT-PREVIEW-IMAGE").stop().fadeOut('fast');
                        };
                        var _location = { h: _this.Height, w: _this.Width, x: 0, y: 0 };
                        //裁剪预览图片
                        var _showPreviewFun = function (coords) {

                            _location = coords;
                            if (parseInt(coords.w) > 0) {
                                var __rx = _this.Width / coords.w;
                                var __ry = _this.Height / coords.h;
                                _imgPreview.find(".imgSize").html(_location.h + 'px,' + _location.w + 'px');
                                _imgPreview.find(".ACT-PREVIEW-IMAGE").css({
                                    width: Math.round(__rx * _imgPreview.find(".ACT-ORIGINAL-IMAGE").width()) + 'px',
                                    height: Math.round(__ry * _imgPreview.find(".ACT-ORIGINAL-IMAGE").height()) + 'px',
                                    marginLeft: '-' + Math.round(__rx * coords.x) + 'px',
                                    marginTop: '-' + Math.round(__ry * coords.y) + 'px'
                                }).show();

                            }

                        };
                        var _jcrop;

                        /// <reference path="../../../03Extend/jcrop/js/jquery.Jcrop.js" />
                        /// <reference path="../../../03Extend/jcrop/css/jquery.Jcrop.css" />

                        _this.asynJs(["/AtawStatic/lib/03Extend/jcrop/js/jquery.Jcrop.js",
                        "/AtawStatic/lib/03Extend/jcrop/css/jquery.Jcrop.css"], function () {
                            _imgPreview.find(".ACT-ORIGINAL-IMAGE").Jcrop({
                                onChange: _showPreviewFun,
                                onSelect: _showPreviewFun,
                                onRelease: _hidePreviewFun,
                                aspectRatio: _this.Width / _this.Height,
                                setSelect: [0, 0, _this.Width, _this.Height]
                            }, function () {
                                _jcrop = this;
                            });

                            alert("上传成功，请截图");
                        });
                        
                        //确认按钮事件
                        _imgPreview.find(".ACT-SURE-CUT").unbind("click").click(function () {
                            if (_location.h == 0 && _location.w == 0) {
                                alert("请截取要上传的图片");
                            } else {
                                var imgUrl = _imgPreview.find(".ACT-PREVIEW-IMAGE").attr("src");
                                var picWidth = _imgPreview.find(".ACT-ORIGINAL-IMAGE").width();
                                var picHeight = _imgPreview.find(".ACT-ORIGINAL-IMAGE").height();
                                var _json = $.toJSON(_this.ResourceInfoList);
                                var _data = {
                                    imgUrl: imgUrl,
                                    h: (_location.h > picHeight && _location.h != 0) ? picHeight : _location.h,
                                    w: (_location.w > picWidth && _location.w != 0) ? picWidth : _location.w,
                                    x: _location.x,
                                    y: _location.y,
                                    picWidth: picWidth,
                                    picHeight: picHeight,
                                    newWidth: _this.Width,
                                    newHeight: _this.Height,
                                    fileStorageName: _this.StorageName,
                                    ResourceInfoList: _json,
                                    UploaderName: _this.UploadName
                                };

                                $.AtawAjax({
                                    //url: "/uisdk/SimpleCutImage/CutImageJcrop",
                                    url: "/core/SimpleCutImage/CutImageJcrop",
                                    data: _data,
                                    Obj_Fun: function (a) { //剪切成功后的事件
                                        win.close();
                                        win.$JObj.html();
                                        _jcrop.destroy();
                                        // _jObj.data("ACT.dataValue", a);
                                        //_jObj.validationEngine("validate");
                                        _jObj_Result.show();
                                        _this.$JObj_Result.html("");
                                        _this.ResourceInfoList = [];
                                        _this.ResourceInfoList.push(a);

                                        _this.imagePreview(a);
                                        _this.triggerChangeEvent();
                                        //_jObj_Result.html("<div class=\"ACT-UPLOAD-RESULT\"><img class=\"ACT-HREF preview\" src=\"" + a + "\" href=\"" + a + "\" width=\"60\" height=\"60\" alt=\"预览图\" /><a    class='insearchBtn'  href=\"javascript:\" old=\"" + imgUrl + "\" del=\"" + a + "\"><span>删除</span></a></div>");
                                        //_jObj_Result.html("<div class=\"ACT-UPLOAD-RESULT\"><a  target='_bank' class=\"ACT-HREF preview\" href=\"" + a + "\">裁剪成功，鼠标移上去预览</a><a    class='insearchBtn'  href=\"javascript:\" old=\"" + imgUrl + "\" del=\"" + a + "\"><span>删除</span></a></div>");
                                        //_jObj_Result.find(".ACT-HREF").imgPreview();

                                        //绑定删除事件
                                    }
                                });
                            }
                        });
                    }
                }
            };
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "simplyCutFun", function (options) {
            var _this = this;

        });

        //重写基类上传成功方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "successFun", function (options) {
            //this.AtawUploadBaseControl_successFun();
            var _this = this;
            //            if (this.Upload) {
            //                _this.Width = this.Upload.ImageSizeWidth;
            //                _this.Height = this.Upload.ImageSizeHeight;
            //            }
            _this.Width = this.ImageSizeWidth;
            _this.Height = this.ImageSizeHeight;

            if (_this.IsCut) {
                return _this.selectCuteFun(options);
            }
            else {
                return function (fileObj, data, response) {
                    var _res = $.parseJSON(data);
                    $.AKjs.ActionResponse_Commond_Fun(_res, _fun);
                    function _fun(_ree) {
                        // _this.ResourceInfoList = [];
                        _this.ResourceInfoList.push(_ree);

                        _this.imagePreview(_ree);
                        _this.triggerChangeEvent();
                    };
                }

            }
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "imagePreview", function (resourceInfo) {

            this.$JObj_Result.html("");
            var _$imageShow = $("<div class='ACT_FILE_ITEM'  />");
            this.$JObj_Result.append(_$imageShow);

            this.ResourceInfoList = [];
            this.ResourceInfoList.push(resourceInfo);

            var _op = {
                ResourceInfo: resourceInfo,
                UploadObj: this
            };
            var _obj = $.AKjs.AtawImageShowItem(_op);
            //this.ResourceInfoDict["Res" + _obj.Guid] = _obj;
            _obj.intoDom(_$imageShow);
            //this.triggerChangeEvent()
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            this.$DocumentCenter.unbind('click');
            this.AtawBaseUploadControl_dispose();
        });
    }
})(jQuery);