(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawJsPager = function (option) {
        return new AtawJsPager(option);
    }

    function AtawJsPager(option) {
        this.PageSize = option.PageSize;
        this.PageIndex = option.PageIndex;
        this.IsASC = option.IsASC;
        this.SortName = option.SortName;
        this.DataTime = option.DataTime;
    }

//    $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "toDataSet", function (dataset, tableName) {
//        dataset[tableName] = this;
//    });

})(jQuery);