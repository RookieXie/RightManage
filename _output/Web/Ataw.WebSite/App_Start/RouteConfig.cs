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
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
            name: "RightManage_Default_home",
             url: "ts/html/x", // URL with parameters
            defaults: new { controller = "Home", action = "Home" }
            );

            ////首页路由
            //routes.MapRoute(
            //name: "Default",
            //url: "{controller}/{action}/{id}",
            //defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
            //namespaces: new string[] { "RightManage.Controllers" }
            //).DataTokens.Add("Area", "RightManage");

            routes.MapRoute(
            name: "Default",
            url: "{controller}/{action}/{id}",
            defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );


        }
    }
}
