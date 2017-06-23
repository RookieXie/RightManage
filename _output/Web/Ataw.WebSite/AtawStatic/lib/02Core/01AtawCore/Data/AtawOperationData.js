(function ($) {

    $.AKjs = $.AKjs ? $.AKjs : {};

    $.AKjs.AtawOperationData = function (option) {
        return new AtawActionData(option);
    }

    $.AKjs.OperationType = {
        Delete : "Delete",
        Key: "Key",
        ForeignKey: "ForeignKey"
    };

    function AtawOperationData(option) {
        this.KeyValue = option.KeyValue;
        this.OperationName = option.OperationName;
        this.Data = option.Data;
    }

    //    $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "toDataSet", function (dataset, tableName) {
    //        dataset[tableName] = this;
    //    });

})(jQuery);