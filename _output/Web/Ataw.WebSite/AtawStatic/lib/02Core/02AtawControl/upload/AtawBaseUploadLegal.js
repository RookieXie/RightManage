(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawBaseUploadLegal = function (control) {
        var _base = $.extend({}, $.AKjs.AtawBaseLegal(control), new AtawBaseUploadLegal());
        return _base.sysCreator();
    };

    function AtawBaseUploadLegal() {
        this.Size = "1024";
        this.Ext = "*.*";

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            //            if (this.AtawControlObj.Options.Legal) {
            //                if (this.AtawControlObj.Options.Legal.Size)
            //                    this.Size = this.AtawControlObj.Options.Legal.Size;
            //                if (this.AtawControlObj.Options.Legal.Ext)
            //                    this.Ext = this.AtawControlObj.Options.Legal.Ext;
            //            }
//            debugger;
//            if (this.AtawControlObj.Upload) {
//                if (this.AtawControlObj.Upload.FileLength)
//                    this.Size = this.AtawControlObj.Upload.FileLength;
//                if (this.AtawControlObj.Upload.FileExtension)
//                    this.Ext = this.AtawControlObj.Upload.FileExtension;
//            }
        });

    }


})(jQuery);