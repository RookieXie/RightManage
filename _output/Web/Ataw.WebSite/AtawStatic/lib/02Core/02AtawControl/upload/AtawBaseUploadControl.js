(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    //类的构造函数
    $.AKjs.AtawBaseUpload = function (options) {
        var _base = $.extend({}, $.AKjs.AtawBaseControl(options), new AtawBaseUploadControl());
        return _base.sysCreator();
    };

    function AtawBaseUploadControl() {
        this.$JObj_File = $("<div id=\"" + $.AKjs.getUniqueID() + "\" class=\"ACT_FILE  hidden \"></div>"); //装载上传控件的类成员
        this.$JObjNoSupportFlash_File = $('<input id="' + $.AKjs.getUniqueID() + '" type="file"/>'); //装载上传控件的类成员
        this.$JObj_Result = $("<div class=\"ACT-UPLOAD-RESULT upload-result my-set clear\"></div>"); //上传后的结果显示类成员
        this.$JObj_Show = null;
        //this.$Dc = null;

        // this.$DocumentBody = $("<div><div class='row'><div id='ACT-WINDOW-LEFT-UPLOAD' class='col-md-3'></div><div class='col-md-8 ACT-DC'></div><div class='col-md-1 ACT-SELECTOR'></div></div><div>");
        // this.$Href = this.$JObj_Result.find(".ACT-HREF");
        //this.$Del = this.$JObj_Result.find(".ACT_DEL");

        this.Multi = true;

        this.AfterUpLoadFun = null; //AtawTreePage,string : void
        this.AfterDeleteFun = null;

        this.ResourceInfoList = [];
        this.CoverIndex = 0;

        this.FileExtension = null;
        this.FileSize = null;
        this.StorageName = null;
        this.UploadName = null;
        this.Uploader = null;
        this.IsSimple = false;
        this.HasDocumentCenter = false;
        this.IsDivInit = false;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            //----------------
            this.setProByOptName("IsSimple", "IsSimple");
            this.setProByOptName("FileExtension", "FileExtension");
            this.setProByOptName("FileSize", "FileSize");
            this.setProByOptName("StorageName", "StorageName");
            this.setProByOptName("UploadName", "UploadName");
            this.setProByOptName("HasDocumentCenter", "HasDocumentCenter");
            if (this.Options.$JObj_Result) {
                this.IsDivInit = true;
                this.$JObj_Result = this.Options.$JObj_Result;
            }
            //$ResuleDom
            // this.setProByOptName("$JObj_Result", "$JObj_Result");
            this.Uploader = '/core/Uploader/UploadFile?fileStorageName=' + this.StorageName;
            if (this.FileSize == 0) {
                this.FileSize = "104857600";
            }

        });


        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "setResult", function () {
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initLegal", function () {
            // this.LegalObj = $.AKjs.AtawLegalBase(this);
        });
        //上传控件初始化方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "init", function () {
            this.AtawBaseControl_init();
            var _valStr = this.DataValue.getValue();
            if ($.AKjs.IsString(_valStr)) {
                var _valObj = $.parseJSON(_valStr, true);
                if (!_valObj) {
                    // this.ResourceInfoList = { CoverTitle:0,ResourceInfoList:[$.AKjs.AtawResourceInfo()]};
                    this.ResourceInfoList = [];
                    //this.ResourceInfoList[0].setUrlString(_valStr);

                }
                else {
                    if (_valObj.ResourceInfoList) {
                        this.ResourceInfoList = _valObj.ResourceInfoList;
                        this.CoverIndex = _valObj.CoverIndex;
                    }
                }

            }
            else {
                if (_valStr && _valStr.ResourceInfoList) {
                    this.ResourceInfoList = _valStr.ResourceInfoList;
                    this.CoverIndex = _valStr.CoverIndex;
                }
            }

            this.$JObj.addClass("SINGLE_FILE_UPLOAD");
            this.setProByOptName("AfterUpLoadFun", "AfterUpLoadFun");
            this.setProByOptName("AfterDeleteFun", "AfterDeleteFun");
            this.LegalObj = $.AKjs.AtawBaseUploadLegal(this);
            this.$JObj.append("<div class='acs-uploadBox'><ul><li class='ACT-LEFT'></li><li class='ACT-RIGHT'></li></ul></div>");
            // this.$JObj.append(this.$JObj_Result);
            //this.$JObj.append.find(".ACT-UPLOAD-RESULT").append(this.$JObj_Result);
            if (this.IsDivInit != true) {
                this.$JObj.append(this.$JObj_Result);
            }
            if ($.browser.isApple) {
                //  if (1) {
                this.initNoSupportFlash();
            } else {
                this.initSupportFlash();
            }

            //            if (this.Upload) {
            //                this.uploadExtend = this.Upload.FileExtension;
            //                this.FileSize = this.Upload.FileLength;
            //            }

            var _legalObj = this.LegalObj;
            if (this.ResourceInfoList && this.ResourceInfoList.length > 0) {
                for (var i = 0; i < this.ResourceInfoList.length; i++) {
                    this.initUploadFile(this.ResourceInfoList[i]);
                }
            }
            var _this = this;

        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initSupportFlash", function () {
            this.$JObj.find(".ACT-LEFT").append(this.$JObj_File);
            //上传控件
            var _this = this;

            this.asynJs(
            [
            "/AtawStatic/lib/03Extend/flashupload/jquery.uploadify.js",
             "/AtawStatic/lib/03Extend/flashupload/swfobject.js",
              "/AtawStatic/lib/03Extend/flashupload/css/uploadify.css"
            ], function () {
                var _uploadOptions = {
                    buttonText: '本地上传',
                    // buttonImage: '/Scripts/Core/flashupload/css/browse-btn2-80px.png',
                    // buttonClass: 'browser',
                    // height: 20,
                    // width: 82,
                    swf: '/AtawStatic/lib/03Extend/flashupload/uploadify.swf',
                    //uploader: '/core/Uploader/SingleImage?fileStorageName=' + this.StorageName,
                    uploader: _this.Uploader,
                    cancelImg: '/AtawStatic/lib/03Extend/flashupload/css/cancel.png',
                    fileTypeExts: _this.FileExtension, //_legalObj.Ext, //配置上传的图片格式
                    fileTypeDesc: '请选择' + _this.FileExtension + '格式的文件', //_legalObj.Ext
                    fileSizeLimit: _this.FileSize, //_legalObj.Size,  //4M大小
                    multi: _this.Multi,
                    queueSizeLimit: 10,
                    auto: true,
                    onUploadSuccess: _this.successFun(_this.Options)//上传成功后的事件
                };
                _this.$JObj_File.uploadify(_uploadOptions);
            }
            );
            //this.$JObj_File.hide();
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initNoSupportFlash", function () {
            var _this = this;
            this.$JObj.find(".ACT-LEFT").append(this.$JObj_File);
            if (this.Multi) {
                this.$JObjNoSupportFlash_File.attr("multiple", "multiple");
            } else {
                this.$JObjNoSupportFlash_File.removeAttr("multiple");
            }
            this.$JObj.append(this.$JObjNoSupportFlash_File);
            this.$JObjNoSupportFlash_File.html5_upload({
                url: this.Uploader,
                onStartOne: function (event, file, number, total) {
                    var fileTypeExt = file.name || file.fileName;
                    var fileSize = file.size || file.fileSize;
                    var isExtValid = false;
                    if (fileTypeExt) {
                        fileTypeExt = fileTypeExt.substring(fileTypeExt.lastIndexOf('.')).toLowerCase();
                        var fileTypeExts = _this.FileExtension.split(';');
                        if (fileTypeExts.length === 0) isExtValid = true;
                        else {
                            for (var i = 0; i < fileTypeExts.length; i++) {
                                if (fileTypeExts[i].substring(fileTypeExts[i].lastIndexOf('.')).toLowerCase() === fileTypeExt) {
                                    isExtValid = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (!isExtValid) {
                        alert('请选择' + _this.FileExtension + '格式的文件');
                        //$(this).triggerHandler("html5_upload.cancelAll");
                        return false
                    }
                    if (_this.FileSize < fileSize) {
                        alert('请选择小于' + _this.FileSize + '大小的文件');
                        return false;
                    }
                    return true;
                },
                sendBoundary: window.FormData,
                onFinishOne: _this.successFun(_this.Options)
            });
            //            var id = this.$JObjNoSupportFlash_File.find("input").attr("id");
            //            this.$JObj.append(this.$JObjNoSupportFlash_File);
            //            this.$JObjNoSupportFlash_File.find("button").click(function () {
            //                var _uploadOptions = {
            //                    url: _this.Uploader, //处理图片脚本
            //                    secureuri: false,
            //                    fileElementId: id, //file控件id
            //                    dataType: 'string',
            //                    success: _this.successFun(_this.Options),
            //                    error: function (data, status, e) {
            //                        alert(e);
            //                    }
            //                };
            //                $.ajaxFileUpload(_uploadOptions);
            //            });
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "initUploadFile", function (resObj) {

        });

        //重写赋值方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Set", function (val) {
            if (val == null || val == "") {
                this.$JObj_Result.hide();
            }
            else {
                this.$JObj_Result.show();
            }
            this.$JObj_Result.find(".ACT-HREF").attr("href", val);
        });

        //重写获取值方法
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dataValue_Get", function () {
            //alert(this.CoverIndex);
            var _$dvList = this.$JObj_Result.find(".ACT_FILE_ITEM");
            _coverIndex = this.CoverIndex ? this.CoverIndex : 0;
            this.ResourceInfoList = [];
            for (var i = 0; i < _$dvList.length; i++) {
                var _Obj = _$dvList.eq(i).AtawControl();
                this.ResourceInfoList.push(_Obj.ResourceInfo);
                if (_Obj.IsCover) {
                    _coverIndex = i;
                    //break;
                }
            }
            var _res = $.toJSON({
                CoverIndex: _coverIndex,
                ResourceInfoList: this.ResourceInfoList
            });
            //alert(_res);
            return _res;
        });

        //上传成功事件
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "successFun", function () {
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "toReadStatus", function (isReadOnly) {
            if (isReadOnly) {
                this.$JObj.find(".acs-uploadBox").hide();
                this.$JObj.find(".ACT_DEL").hide();
                //ACT_DEL
            }
            else {
                this.$JObj.find(".acs-uploadBox").show();
                this.$JObj.find(".ACT_DEL").show();

            }
            this.IsReadOnly = isReadOnly
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            if (this.$JObj_File) {
                var id = "uploadify_" + this.$JObj_File.attr("id");
                this.$JObj_File.uploadify("destroy");
                //通过$(this).data("uploadify", xxx)和window["uploadify_"+id]缓存起来的SWFUPLOAD对象需要清除掉
                this.$JObj_File.data("uploadify", null);
                window[id] = null;
                delete window[id];
            }

            this.AtawBaseDom_dispose();
        });
    }

})(jQuery);