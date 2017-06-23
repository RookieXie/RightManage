//必须指定在data-main中
(function () {
    var loader = {
    };
    var packages;
    var getPathToScriptTagSrc = function (scriptTagSrc) {
        scriptTagSrc = "/" + scriptTagSrc.toLowerCase();
        var scriptTags = document.getElementsByTagName("SCRIPT");
        for (var i = 0; i < scriptTags.length; i++) {
            var src = scriptTags[i].src;
            var index = src.toLowerCase().indexOf(scriptTagSrc);
            if ((index >= 0) && index == (src.length - scriptTagSrc.length)) {
                var temp = src.split('/');
                temp.pop();
                require.config({
                    baseUrl: temp.length ? temp.join('/') + '/' : './'  //设置requirejs的baseUrl为kittyLoader所在目录
                });
                packages = scriptTags[i].getAttribute('data-main').split(',');
                return src.substring(0, index + 1);
            }
        }
        throw "Cannot find script tag referencing " + scriptTagSrc;
    };

    var loaderPath = getPathToScriptTagSrc("kittyLoader.js");

    var doLoadPackage = function (basePath, paths, isScript, isDynamic, callback) {
        if (typeof (paths) != "undefined" && paths !== null) {
            if (Object.prototype.toString.apply(paths) !== '[object Array]')
                paths = [paths];
            for (var i = 0; i < paths.length; i++) {
                {
                    var temp = paths[i];
                    var myDynamic = isDynamic;
                    if (typeof(temp) != "string") {
                        if (temp["type"] == "dynamic")
                            myDynamic = true;
                        temp = temp["src"];
                    }
                    if (!isDynamic && myDynamic) {
                        //在静态模块中包含动态模块时,帮你把该模块加载下还是忽略掉呢？
//                        require([(basePath + temp).replace(".js", "")], function () {
//                        });
                    }
                    else if (!isDynamic && (temp.match(/package.js/g) || temp.match(/main.js/g))) {
                        document.write("<script src='" + loaderPath + basePath + temp + "' type='text/javascript'></script>");
                    } else {
                        callback(isScript, basePath + temp);
                    }
                }
            }
        }
    };

    //包的加载
    loader.loadPackage = function (options) {
        var callback, deps=[];
        var isDynamic = options["type"] == "dynamic";
        var basePath = options["basePath"] || "";
        if (isDynamic) {
            callback = function (isScript, result) {
                if (isScript) {
                    deps.push(result.replace(".js", ""));
                }
                else {
                    deps.push("css!" + result);
                }
            };
        } else {
            callback = function (isScript, result) {
                if (isScript) {
                    document.write("<script src='" + loaderPath + result + "' type='text/javascript'></script>");
                } else {
                    document.write("<link  rel='stylesheet' type='text/css'  href='" + loaderPath + result + "'></link>");
                }
            };
        }
        doLoadPackage(basePath, options["css"], false, isDynamic, callback);
        doLoadPackage(basePath, options["script"], true, isDynamic, callback);

        if (isDynamic) {
            define(deps, function () {
            });
        }
    };
    
    window.loadModule = loader.loadPackage;
    window.loadPackage = loader.loadPackage;
    for (var index in packages) {
        document.write("<script src='" + packages[index] + "' type='text/javascript'></script>");
    }
})();