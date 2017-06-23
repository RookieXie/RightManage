using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace RightManage
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {


            ////首页路由
            //routes.MapRoute(
            //name: "Default",
            //url: "{controller}/{action}/{id}",
            //defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
            //namespaces: new string[] { "RightManage.Controllers" }
            //).DataTokens.Add("Area", "RightManage");

            routes.MapRoute(
            name: "default_login",
            url: "{controller}/{action}/{id}",
            defaults: new { controller = "home", action = "index", id = UrlParameter.Optional },
             namespaces: new [] { "RightManage.Controllers" }
            ).DataTokens.Add("area", "RightManage");
            // routes.MapRoute(
            //  name: "Default",
            //  url: "{controller}/{action}/{id}"
            //);


        }
    }
}
