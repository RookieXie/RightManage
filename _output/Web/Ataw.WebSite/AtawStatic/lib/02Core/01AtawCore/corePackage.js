
if (!window["loadModule"]) {
    window["loadPackage"] = window["loadModule"] = function (config) {
        for (var i = 0 ; i < config.script.length ; i++) {
            var path = config.script[i];
            var _basePath = config.basePath;
            _basePath = _basePath.replace("../../", "/AtawStatic/lib/");

            document.write("<script src='" + _basePath + path + "'></script>");
        }
    }
   
}

loadModule({
    basePath: "/AtawStatic/lib/02Core/01AtawCore/",
    module:"core",
    script: ["Core/package.js", "Data/package.js"]
    }
);

//11 var AtawPageBasePath = "/AtawStatic/lib/02Core/01AtawCore";
//document.write("<script src='" + AtawPageBasePath + "/Core/package.js'></script>");
//document.write("<script src='" + AtawPageBasePath + "/Data/package.js'></script>");

