

var workflow = {
    init: function (xmlobject) {
        this.xmlobject = xmlobject;
        this.xmlobject.nodelist = this.nodelist;
        this.xmlobject.linelist = this.linelist;
        this.resize();
        var thisobj = this;
        $(window).resize(function () { thisobj.resize(); });
        this.config.browser = $.browser;
        this.config.demonode = $("#demonode");

    },
    resize: function () {
        var ww = $(window).width();
        var wh = $(window).height();
        var woffset = 4;
        var hoffset = 4;
        //leftmenu  dragdiv  paintarea
        //        $("#leftmenu").css("left", woffset + "px");
        //        woffset = woffset + $("#leftmenu").width();
        //        $("#dragdiv").css("left", woffset + "px");
        //        woffset = woffset + 5;
        //        $("#paintarea").css("left", woffset + "px");
        //        $("#paintarea").width(ww - woffset - 5);

        //        $(".setheight").height(wh - $("#attribute").height() - 40);
        //        hoffset = $("#paintarea").height() + 35;
        //        $("#dragy").css("top", hoffset + "px");
        //        hoffset = hoffset + 5;
        //        $("#attribute").css("top", hoffset + "px");
        //        $("#attribute").width(ww - 8);
        //        //$("#attribute").height(wh-hoffset-4);
        //        $("#attributecontentright").width($("#attribute").width() - 170);

        //        this.config.paintpos = $("#paintarea").offset(); //设置画布位置
    },
    //节点列表
    nodelist: {
        list: new Array(),
        add: function (node) { this.list[this.list.length] = node; },
        remove: function (id) { for (var i = 0; i < this.list.length; i++) { var node = this.list[i]; if (node.id == id) { this.list.splice(i, 1) } } },
        size: function () { return this.list.length },
        get: function (id) { for (var i = 0; i < this.list.length; i++) { var node = this.list[i]; if (node.id == id) { return node; } } return null },
        getByElement: function (eleobj) { eleobj = workflow.tool.tojQuery(eleobj); var id = eleobj.attr("id"); return this.get(id); },
        getByIndex: function (index) { if (this.list.length > index && index >= 0) { return this.list[index] } return null }
    },
    //连接线列表
    linelist: {
        list: new Array(),
        add: function (node) { this.list[this.list.length] = node; },
        remove: function (id) { for (var i = 0; i < this.list.length; i++) { var node = this.list[i]; if (node.id == id) { this.list.splice(i, 1) } } },
        size: function () { return this.list.length },
        get: function (id) { for (var i = 0; i < this.list.length; i++) { var node = this.list[i]; if (node.id == id) { return node; } } return null },
        getByElement: function (eleobj) { eleobj = workflow.tool.tojQuery(eleobj); var id = eleobj.attr("id"); return this.get(id); },
        getByIndex: function (index) { if (this.list.length > index && index >= 0) { return this.list[index] } return null }
    },
    //节点对象
    nodeobject: {
        basenode: function () {
            this.id = "";
            this.icon = "";
            this.nodetype = 1;
            this.text = "新建节点";
            this.nodetext = "";
            this.x = 0;
            this.y = 0;
            this.width = 130;
            this.height = 51;
            this.inputlist = new Array();
            this.outputlist = new Array();
            this.inputtype = 0; /*输入节点数量 0：无输入 1：1输入 2：多输入*/
            this.outputtype = 1;
            this.zindex = 100;
            /*删除输入节点*/
            this.removeInput = function (id) { for (var i = 0; i < this.inputlist.length; i++) { if (this.inputlist[i] == id) { this.inputlist.splice(i, 1); return; } } },
            /*删除输出节点*/
			this.removeOutput = function (id) { for (var i = 0; i < this.outputlist.length; i++) { if (this.outputlist[i] == id) { this.outputlist.splice(i, 1); return; } } },
            /*删除所有线*/
			this.removeAllLine = function () { for (var i = 0; i < this.inputlist.length; i++) { var lineid = this.inputlist[i] + "_" + this.id; $("#" + lineid).remove(); var parobj = workflow.nodelist.get(this.inputlist[i]); parobj.removeOutput(this.id); workflow.linelist.remove(lineid); } for (var i = 0; i < this.outputlist.length; i++) { var lineid = this.id + "_" + this.outputlist[i]; $("#" + lineid).remove(); var subobj = workflow.nodelist.get(this.outputlist[i]); subobj.removeInput(this.id); workflow.linelist.remove(lineid); } }
        },
        1: function () {
            this.icon = "nodeicon1";
            this.nodetype = 1;
            this.nodetext = "开始";
            this.inputtype = 0; /*输入节点数量 0：无输入 1：1输入 2：多输入*/
            this.outputtype = 1;
        },
        2: function () {
            this.icon = "nodeicon2";
            this.nodetype = 2;
            this.nodetext = "结束";
            this.inputtype = 2; /*输入节点数量 0：无输入 1：1输入 2：多输入*/
            this.outputtype = 0;
        },
        3: function () {
            this.icon = "nodeicon3";
            this.nodetype = 3;
            this.nodetext = "分支";
            this.inputtype = 1; /*输入节点数量 0：无输入 1：1输入 2：多输入*/
            this.outputtype = 2;
        },
        4: function () {
            this.icon = "nodeicon4";
            this.nodetype = 4;
            this.nodetext = "合并";
            this.inputtype = 2; /*输入节点数量 0：无输入 1：1输入 2：多输入*/
            this.outputtype = 1;
        },
        5: function () {
            this.icon = "nodeicon5";
            this.nodetype = 5;
            this.nodetext = "任务";
            this.inputtype = 1; /*输入节点数量 0：无输入 1：1输入 2：多输入*/
            this.outputtype = 1;
        },
        20: function () {
            this.icon = "nodeicon5";
            this.nodetype = 20;
            this.nodetext = "人工";
            this.inputtype = 2; /*输入节点数量 0：无输入 1：1输入 2：多输入*/
            this.outputtype = 1;
            this.actorregname = "";
            this.controllactions = null;
            this.process = null;
            this.manualpagexml = "";
            this.manualpagexmlhis = "";
            this.contentchoice = 0;
            this.notifyactions = "";
            this.havesave = "0";
            this.haveback = "0";
        },
        21: function () {
            this.icon = "nodeicon3";
            this.nodetype = 21;
            this.nodetext = "路由";
            this.inputtype = 2; /*输入节点数量 0：无输入 1：1输入 2：多输入*/
            this.outputtype = 2;
        },
        22: function () {
            this.icon = "nodeicon-auto";
            this.nodetype = 22;
            this.nodetext = "自动";
            this.inputtype = 2; /*输入节点数量 0：无输入 1：1输入 2：多输入*/
            this.outputtype = 1;
            this.plugregname = ""
        },
        100: function () {
            this.id = "";
            this.nodetype = 100;
            this.text = "";
            this.zindex = 100;
        },
        getNode: function (key) {
            var node = new this.basenode();
            var snode = new this[key]();
            for (var k in snode) {
                node[k] = snode[k];
            }
            return node;
        }
    },
    config: {//变量
        paintpos: { left: 0, top: 0 }, //画布位置
        browser: {}, //浏览器信息
        tooltype: 0, //工具类型 0：选择
        demonode: null, //元素样例
        zindex: 100, //z-index
        moveobj: { obj: null, ismove: false, pos: { x: 0, y: 0 }, offsetpos: { x: 0, y: 0 }, tag: 0 }, //当前移动对象
        drawline: { start: null, end: null, drawtag: false, from: { x: 0, y: 0} },
        nowselect: null,
        a: 0
    },
    tool: {//工具
        //获得event对象
        getevent: function (e) { return e || window.event; },
        //鼠标位置
        mousePosition: function (ev) { ev = this.getevent(ev); if (ev.pageX || ev.pageY) { return { x: ev.pageX, y: ev.pageY }; } return { x: ev.clientX + document.body.scrollLeft - document.body.clientLeft, y: ev.clientY + document.body.scrollTop - document.body.clientTop} },
        //获取事件源
        getResource: function (event) { event = this.getevent(event); var obj = event.srcElement ? event.srcElement : event.target; return obj; },
        //获取鼠标在画布上的位置
        mouseOnPanelPosition: function (e) { var sl = $("#paintarea").scrollLeft(); var st = $("#paintarea").scrollTop(); var mousepos = workflow.tool.mousePosition(e); var panelpos = workflow.config.paintpos; mousepos.x = mousepos.x - panelpos.left + sl; mousepos.y = mousepos.y - panelpos.top + st; return mousepos; },
        //获取新随机id
        newname: function () { var myDate = new Date(); var tm = myDate.getYear() + "-" + myDate.getMonth() + "-" + myDate.getDate() + "-" + myDate.getDay() + myDate.getTime() + "-" + myDate.getHours() + "-" + myDate.getMinutes() + "-" + myDate.getSeconds() + "-" + myDate.getMilliseconds() + "-" + Math.random(); return $.md5(tm); },
        //转化成jquery对象
        tojQuery: function (obj) { if (!(obj instanceof jQuery)) { obj = $(obj) } return obj; },
        //获得offset位置
        offset: function (obj) { obj = this.tojQuery(obj); var objpos = obj.offset(); var parentobj = obj.offsetParent(); var oleft = objpos.left + parentobj.scrollLeft(); var otop = objpos.top + parentobj.scrollTop(); return { left: oleft, top: otop }; },
        getobjpos: function (obj) { obj = this.tojQuery(obj); if (obj.length <= 0) { return { left: 0, top: 0} } var left = obj.css("left"); left = left.replace("px", ""); left = parseInt(left); var top = obj.css("top"); top = top.replace("px", ""); top = parseInt(top); return { left: left, top: top} },
        a: function () { }
    },
    //非ie设置线的位置
    setNoIElinePos: function setpos(obj, startpos, endpos) {
        obj = this.tool.tojQuery(obj);
        var x1 = startpos.x;
        var y1 = startpos.y;
        var x2 = endpos.x;
        var y2 = endpos.y;
        var minx = Math.min(x1, x2);
        var miny = Math.min(y1, y2);

        var xoff = x2 - x1;
        var yoff = y2 - y1;
        var ay = Math.abs(parseInt(yoff / 2)) - 3 + miny;
        obj.css("top", ay + "px");
        var width = Math.pow((xoff * xoff + yoff * yoff), 0.5); //线长度
        var cos = xoff / width;
        var rad = Math.acos(cos);
        var deg = 180 / (Math.PI / rad);
        if (yoff < 0) deg = -deg;
        var ax = xoff / 2;
        ax = x1 - width / 2 + ax;
        var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
        if (isChrome) {
            degree = -1 * deg;
            var cosa = Math.cos(degree * Math.PI / 180), sina = Math.sin(degree * Math.PI / 180);
            if (degree == 90 || degree == -90)
                cosa = 0;
            if (degree == 180)
                sina = 0;
            var newMatrix = { M11: cosa, M12: (-1 * sina), M21: sina, M22: cosa };
            obj.css("-webkit-transform", "matrix(" + newMatrix.M11 + "," + newMatrix.M12 + ","
                + newMatrix.M21 + "," + newMatrix.M22 + ",0,0)");
        }
        else {
            obj.css("-webkit-transform", "rotate(" + deg + "deg)");
        }

        obj.css("-moz-transform", "rotate(" + deg + "deg)");
        obj.width(width);
        obj.css("left", ax + "px");
    },
    /**
    * 画连接线
    * start：开始节点
    * end：结束节点
    * isimport：是否导入，导入时须将此参数设置非空
    */
    drawline: function (start, end, isimport) {
        start = this.tool.tojQuery(start);
        end = this.tool.tojQuery(end);
        var lineid = start.attr("id") + "_" + end.attr("id");

        if (this.config.browser.msie && start.attr("id") != end.attr("id")) {

            var line = document.createElement("v:line");
            var jiantou = document.createElement("v:stroke");
            jiantou.setAttribute("EndArrow", "Classic");
            line.appendChild(jiantou);
            line.setAttribute("id", lineid);
            line.className = "newline";
            var startid = start.attr("id");
            var endid = end.attr("id");
            var fromobj = this.nodelist.get(startid);
            var toobj = this.nodelist.get(endid);

            if (!isimport) {
                var lineobj = new this.nodeobject[100];
                lineobj.id = lineid;
                fromobj.outputlist[fromobj.outputlist.length] = endid;
                toobj.inputlist[toobj.inputlist.length] = startid;
                this.linelist.add(lineobj);
            }
            else {
                var nowline = this.linelist.get(lineid);
                if (nowline) {
                    if ($(">div", line).length == 0) { $(line).append("<div style='position:absolute;left:50%;top:50%;overflow:visible;cursor:default;'></div>") }
                    $(">div", line).html(nowline.text);
                }
            }
            document.getElementById("paintarea").appendChild(line);
            this.setlineposition(start.attr("id"), end.attr("id"));
        }
        else if (start.attr("id") != end.attr("id")) {
            var line = document.createElement("div");
            var jiantou = document.createElement("a");
            line.appendChild(jiantou);
            line.setAttribute("id", lineid);
            line.className = "ffline";

            var startid = start.attr("id");
            var endid = end.attr("id");
            var fromobj = this.nodelist.get(startid);
            var toobj = this.nodelist.get(endid);

            if (!isimport) {
                var lineobj = new this.nodeobject[100];
                lineobj.id = lineid;
                fromobj.outputlist[fromobj.outputlist.length] = endid;
                toobj.inputlist[toobj.inputlist.length] = startid;
                this.linelist.add(lineobj);
            }
            else {
                var nowline = this.linelist.get(lineid);
                if (nowline) {
                    if ($(">div", line).length == 0) { $(line).append("<div></div>") }
                    $(">div", line).html(nowline.text);
                }
            }

            if (document.getElementById("paintarea")) {
                document.getElementById("paintarea").appendChild(line);
                this.setlineposition(start.attr("id"), end.attr("id"));
            }
        }
        this.resetdeawline();
    },
    resetdeawline: function () {
        this.config.drawline.start = null;
        this.config.drawline.end = null;
        this.config.drawline.drawtag = false;
        this.config.drawline.from = { x: 0, y: 0 };
    },
    /*设置线条位置*/
    setlineposition: function (startid, endid) {
        var lineid = startid + "_" + endid;
        var start = $("#" + startid);
        var end = $("#" + endid);
        var line = $("#" + lineid);
        if (start.length <= 0 || end.length <= 0 || line.length <= 0) { return }
        var startpos = this.tool.getobjpos(start);
        var endpos = this.tool.getobjpos(end);
        var startwidth = start.width();
        var startheight = start.height();
        var endwidth = end.width();
        var endheight = end.height();

        var x1 = 0; var y1 = 0; var x2 = 0; var y2 = 0;
        if (startpos.left + startwidth < endpos.left || startpos.left > endpos.left + endwidth) {
            x1 = startpos.left + startwidth < endpos.left ? startpos.left + startwidth : startpos.left;
            x2 = startpos.left + startwidth < endpos.left ? endpos.left : endpos.left + endwidth;
        }
        else {
            var leftoffset = startpos.left > endpos.left ? startpos.left : endpos.left;
            x1 = Math.abs(startpos.left - endpos.left - endwidth) > (endwidth + startwidth) / 2 ? endpos.left - startpos.left - startwidth : startpos.left - (endpos.left + endwidth);
            x1 = Math.abs(x1) / 2 + leftoffset;
            x2 = x1;
        }
        if (startpos.top + startheight < endpos.top || startpos.top > endpos.top + endheight) {
            y1 = startpos.top + startheight < endpos.top ? startpos.top + startheight : startpos.top;
            y2 = startpos.top + startheight < endpos.top ? endpos.top : endpos.top + endheight;
        }
        else {
            var topoffset = startpos.top > endpos.top ? startpos.top : endpos.top;
            y1 = Math.abs(startpos.top - endpos.top - endheight) > (endheight + startheight) / 2 ? endpos.top - startpos.top - startheight : startpos.top - (endpos.top + endheight);
            y1 = Math.abs(y1) / 2 + topoffset;
            y2 = y1;
        }
        if (this.config.browser.msie) {
            line.attr("from", x1 + "," + y1);
            line.attr("to", x2 + "," + y2);
        }
        else {
            line.attr("x1", x1);
            line.attr("y1", y1);
            line.attr("x2", x2);
            line.attr("y2", y2);
            this.setNoIElinePos(line, { x: x1, y: y1 }, { x: x2, y: y2 });
        }
    },

    //XML生成、解析
    xmlobject: null,
    //导入xml
    parseXml: function (xml) {
        if (this.xmlobject != null && this.xmlobject.parseXml != null) {
            var listobj = this.xmlobject.parseXml(xml);
            if (listobj != null && listobj.nodelist != null && listobj.linelist != null) {
                var nodelist = listobj.nodelist;
                var linelist = listobj.linelist;
                this.nodelist.list = nodelist;
                this.linelist.list = linelist;
                //绘制节点
                for (var i = 0; i < this.nodelist.list.length; i++) {
                    var nodeobj = this.nodelist.list[i];
                    var node = this.config.demonode.clone();
                    node.css("left", nodeobj.x);
                    node.css("top", nodeobj.y);
                    node.css("z-index", nodeobj.zindex);
                    node.attr("id", nodeobj.id);
                    node.height(nodeobj.height);
                    node.width(nodeobj.width);
                    $(">.c>.icon>.t", node).html("&lt;&lt;" + nodeobj.nodetext + "&gt;&gt;&nbsp;");
                    $(">.c>.icon>.tt", node).html(nodeobj.text);
                    $(">.c>.icon", node).width(nodeobj.width - 50);
                    $(">.c>.icon", node).addClass(nodeobj.icon);
                    $(">.c>.icon", node).addClass("nodeicon");


                    $("#paintarea").append(node);
                }

                for (var i = 0; i < this.nodelist.list.length; i++) {
                    var start = this.nodelist.list[i];
                    for (var j = 0; j < start.outputlist.length; j++) {
                        var endid = start.outputlist[j];
                        var end = $("#" + endid);
                        this.drawline(start, end, 1);
                    }
                }
            }
        }
    }
};
var xmlobject = {
    nodelist: null, //节点列表
    linelist: null, //连线列表
    parseXml: function (xmlobj) {
        var nodelist = new Array();
        var linelist = new Array();
        var roots = xmlobj.getElementsByTagName("root");
        if (roots.length > 0) {
            var root = roots[0];
            var nodes = root.getElementsByTagName("node");
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                var nodetype = node.getElementsByTagName("nodetype");
                if (nodetype.length == 1) {
                    nodetype = nodetype[0];
                    nodetype = nodetype.text || nodetype.textContent;
                    var nodeobj = workflow.nodeobject.getNode(nodetype);
                    var nodeattrs = node.childNodes;
                    for (var j = 0; j < nodeattrs.length; j++) {
                        var attr = nodeattrs[j];
                        var value = attr.text || attr.textContent;
                        var type = attr.getAttribute("type");
                        var name = attr.tagName;
                        if (type) {
                            if (type == "number" && !isNaN(value)) { value = parseInt(value) }
                            nodeobj[name] = value;
                        }
                    }

                    var parentlist = node.getElementsByTagName("parentlist");
                    if (parentlist.length > 0) {
                        parentlist = parentlist[0];
                        var parentids = parentlist.childNodes;
                        for (var j = 0; j < parentids.length; j++) {
                            var parentid = parentids[j];
                            parentid = parentid.text || parentid.textContent;
                            nodeobj.inputlist[nodeobj.inputlist.length] = parentid;
                        }
                    }

                    var childlist = node.getElementsByTagName("childlist");
                    if (childlist.length > 0) {//childid
                        childlist = childlist[0];
                        var childids = childlist.childNodes;
                        for (var j = 0; j < childids.length; j++) {
                            var childid = childids[j];
                            childid = childid.text || childid.textContent;
                            nodeobj.outputlist[nodeobj.outputlist.length] = childid;
                        }
                    }
                    nodelist[nodelist.length] = nodeobj;
                }
            }

            var linelists = root.getElementsByTagName("linelist");
            if (linelists.length > 0) {
                linelists = linelists[0];
                var lines = linelists.getElementsByTagName("line");
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    var lineobj = new workflow.nodeobject[100];
                    lineobj.id = line.getAttribute("id");
                    lineobj.text = line.text || line.textContent;
                    linelist[linelist.length] = lineobj;
                }
            }
        }
        return { linelist: linelist, nodelist: nodelist };
    }
};
function createXml(str) {
    if (document.all) {
        var xmlDom = new ActiveXObject("Microsoft.XMLDOM")
        xmlDom.loadXML(str)
        return xmlDom
    }
    else
        return new DOMParser().parseFromString(str, "text/xml")
};
