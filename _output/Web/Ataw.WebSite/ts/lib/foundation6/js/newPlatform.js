
    

(function ($) {
    var _h = $(window).height();
    //左边菜单
    $(".east-left-menu").css({"height":_h - 60 , "overflow":"auto"});

    $("#east-shrink-toggle").click(function () {
        var _$this = $(this);
        var _$leftMenu = _$this.parent();
        var _$main = $(".east-main");
        _$this.toggleClass("active");
        _$leftMenu.toggleClass("off");
        _$main.toggleClass("open");
    });
    
    

    //fa-angle-right 旋转
    $(".accordion-title").click(function () {
        var _this = $(this);
        _this.children("i").toggleClass("animate");
    });

    //fa-angle-up 旋转
    $(".fa-angle-up").click(function () {
        var _this = $(this);       
        _this.parent().parent().next().toggle(500);
        _this.toggleClass("animate");
    });


    //加载更多
    $("#eastMoreBtn").click(function () {
        $(".east-more-content").removeClass("hide").addClass("animate");
        $(this).hide();
    });

    //
    if ($(".east-main").children().hasClass("east-other-panel")) {
        $(".east-affair").addClass("east-panel");
    }

    //复选框选值
    $(".east-list li i").click(function () {
        var _this = $(this);
        if (_this.parent().hasClass("selected")) {
            _this.parent().removeClass("selected");
            _this.removeClass("east-icon-checkbox-blue").addClass("east-icon-checkbox");
        } else {
            _this.parent().addClass("selected");
            _this.removeClass("east-icon-checkbox").addClass("east-icon-checkbox-blue");
        }
    });

    //读取east-list li值
   // var _val = $(".east-list li").text();
    //$(".east-list li").hover(function () {
    //    var _this = $(this);
    //    _this.attr("title", _this.text());
    //}, function () {
    //    _this.removeAttr("title");
    //});

    $(".east-chatting").height(_h - 60);

    //点击聊天
    $("#Chatting").click(function () {
        $(".east-chatting").toggleClass("off");
        $(".east-main").addClass("fixed");
    });
    //点击头像
    $(".east-chatting-list .accordion-item .accordion-content li").click(function () {
        var _this = $(this);
        _this.parents(".east-chatting-list").addClass("hide");
        _this.parents(".east-chatting-list").next(".east-chatting-item").removeClass("hide");
        return false;
    })

    //聊天记录和消息记录切换
    $("#Message").click(function () {
        var _this = $(this);
        _this.prev().addClass("hide");
        _this.animate({ marginRight: "95px" });
        _this.children().addClass("hide");
        $(".bubbleMode,.east-chatting-send").addClass("hide");
        $(".txtMode").removeClass("hide");
    });

    //返回上一步
    $("#Return").click(function () {
        var _this = $(this);
        if ($(".bubbleMode").hasClass("hide")) {
            $(".txtMode").addClass("hide");
            $(".bubbleMode").removeClass("hide");
            $("#Message").css("margin-right", "0");
            $("#Message").prev().removeClass("hide");
            $("#Message").children().removeClass("hide");
        } else {
            $(".east-chatting-item").addClass("hide");
            $(".east-chatting-list").removeClass("hide");
        }
    });

    //表格
    $("table .toggle").click(function () {
        var _this = $(this);
        _this.toggleClass("animate");
        $(".table-menu.second,.table-menu.third").toggleClass("hide");
    });
    $("table .toggle2").click(function () {
        var _this = $(this);
        _this.toggleClass("animate");
        $(".table-menu.third").toggleClass("hide");
    });


})(jQuery);

