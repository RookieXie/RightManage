(function ($) {
    $.AKjs = $.AKjs ? $.AKjs : {};

    //创建jq插件
    $.fn.AtawStarScore = function (options) {
        $.AKjs.AtawCreateCall.call(this, "AtawStarScore", options);
    }
    $.AKjs.AtawStarScore = function (options) {
        return $.extend({}, $.AKjs.AtawBaseControl(options), new AtawStarScoreControl()).sysCreator();
    }
    function AtawStarScoreControl() {
        this.$bigStarsPath = null;
        this.$phpPath = null;
        this.$Ul = null;
        this.$length = null;
        //初始化控件
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "creator", function () {
            this.$bigStarsPath = this.Options.bigStarsPath;
            this.$phpPath = this.Options.phpPath;
            this.$length = this.Options.length;
            this.$rateMax = this.Options.rateMax;
            this.$step = this.Options.step;
            this.$Ul = $('<div class="basic" data-average="' + this.Options.average + '" data-id="' + this.Options.data_id + '" scoreValue=""></div>');
        });
        //页面显示初始化
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "init", function () {
            this.$JObj.append(this.$hiddenField);
            this.$JObj.append(this.$Ul);
            var _this = this

            this.asynJs(
            ["/AtawStatic/lib/03Extend/jRating/jRating.jquery.js",
             "/AtawStatic/lib/03Extend/jRating/jRating.jquery.css"]
             , function () {
                if (_this.$bigStarsPath == null || _this.$phpPath == null) {
                    _this.$Ul.jRating({
                        bigStarsPath: '/AtawStatic/lib/03Extend/jRating/icons/stars.png',
                        phpPath: '',
                        length: this.$length,
                        rateMax: this.$rateMax,
                        step: this.$step,
                        canRateAgain: true,
                        nbRates: 5000,
                        onClick: _this.choice()

                    });
                }
                else {
                    _this.$Ul.jRating({
                        bigStarsPath: this.$bigStarsPath,
                        phpPath: '',
                        length: this.$length,
                        rateMax: $rateMax,
                        step: this.$step,
                        canRateAgain: true,
                        nbRates: 5000,
                        onClick: _this.choice()
                    });
                }
            });


        })

        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Get", function () {
            return this.$Ul.attr("scoreValue");
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "dataValue_Set", function (opt_str) {
            this.$Ul.attr("scoreValue", opt_str);
        });
        $.AKjs.RegisterMethodCall.call(this, $.AKjs.ACCESS.akProtect, "choice", function () {
            var _this = this;
            return function (elm,rate) {
                _this.$Ul.attr("scoreValue", rate);
                _this.triggerChangeEvent();
            }
        });
    }

})(jQuery);