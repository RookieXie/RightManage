(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};


    $.AKjs.AtawParamGrid = function (options) {
        return $.extend({}, $.AKjs.AtawBaseJPlugIn(options), new AtawParamGrid()).sysCreator();
    }
    $.fn.AtawParamGrid = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawParamGrid", options);
    }

    //$.AKjs.AtawWindowIndex = 10000;
    //列的基类
    function AtawParamGrid() {
        this.Form = null;
        this.DataTable = null;

        this.PGColModel = null;
        this.PGObj = null;
        this.Data = null;
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.setProByOptName("Form", "Form");
            this.setProByOptName("Data", "Data");
        });

        /// <reference path="/AtawStatic/lib/03Extend/pqgrid/pqgrid.min.js" />
        /// <reference path="/AtawStatic/lib/03Extend/pqgrid/pqgrid.min.css" />
        /// <reference path="/AtawStatic/lib/01Base/02Jquery/jquery-ui.min.js" />
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initData", function () {

        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "initColModel", function () {
            var _data = [];
            var obj = { width: "100%", height: "100%", title: this.Form.Title, colModel: [], dataModel: { data: _data} };
            var _cols = this.Form.Columns;

            for (var _j = 0; _j < this.Data.length; _j++) {
                var _row = this.Data[_j];
                var _rowData = [];
                for (var _i = 0; _i < _cols.length; _i++) {
                    var _col = _cols[_i];

                    if (_row[_col.Name]) {
                        _rowData.push("123");
                    }
                }
                _data.push(_rowData);
            }


            for (var _i = 0; _i < _cols.length; _i++) {
                var _col = _cols[_i];
                obj.colModel.push({
                    title: _col.DisplayName,
                    align: "right"
                });
            }
            console.log(obj);
            return obj;
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {

            var _obj = this.initColModel();
            //_obj.
            var _this = this;
            this.asynJs(
            [
            "/AtawStatic/lib/01Base/02Jquery/jquery-ui.min.js",
            "/AtawStatic/lib/03Extend/pqgrid/pqgrid.min.js",
            "/AtawStatic/lib/03Extend/pqgrid/pqgrid.min.css"
            ],
            function () {
                var data = [[1, 'Exxon Mobil', '339,938.0', '36,130.0'],
            [2, 'Wal-Mart Stores', '315,654.0', '11,231.0'],
			[3, 'Royal Dutch Shell', '306,731.0', '25,311.0'],
			[4, 'BP', '267,600.0', '22,341.0'],
			[5, 'General Motors', '192,604.0', '-10,567.0'],
			[6, 'Chevron', '189,481.0', '14,099.0'],
			[7, 'DaimlerChrysler', '186,106.3', '3,536.3'],
			[8, 'Toyota Motor', '185,805.0', '12,119.6'],
			[9, 'Ford Motor', '177,210.0', '2,024.0'],
			[10, 'ConocoPhillips', '166,683.0', '13,529.0'],
			[11, 'General Electric', '157,153.0', '16,353.0'],
			[12, 'Total', '152,360.7', '15,250.0'],
			[13, 'ING Group', '138,235.3', '8,958.9'],
			[14, 'Citigroup', '131,045.0', '24,589.0'],
			[15, 'AXA', '129,839.2', '5,186.5'],
			[16, 'Allianz', '121,406.0', '5,442.4'],
			[17, 'Volkswagen', '118,376.6', '1,391.7'],
			[18, 'Fortis', '112,351.4', '4,896.3'],
			[19, 'Crédit Agricole', '110,764.6', '7,434.3'],
			[20, 'American Intl. Group', '108,905.0', '10,477.0']];


                var obj = { width: 700, height: 400, title: "Grid From Array" };
                obj.colModel = [{ title: "Rank", width: 100, dataType: "integer" },
        { title: "Company", width: 200, dataType: "string" },
        { title: "Revenues ($ millions)", width: 150, dataType: "float", align: "right" },
        { title: "Profits ($ millions)", width: 150, dataType: "float", align: "right"}];
                obj.dataModel = { data: data };
                _this.$JObj.pqGrid(data);
            }
            );
        });

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akPublic, "dispose", function () {
            if (this.$JObj.pqGrid) {
                this.$JObj.pqGrid("destroy");
            }
            this.AtawBaseJPlugIn_dispose();
        });

    }


})(jQuery);