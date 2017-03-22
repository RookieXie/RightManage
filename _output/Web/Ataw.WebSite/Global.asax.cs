using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace RightManage
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public bool preHandel()
        {
            return true;
        }
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
        protected void Applicatio_End()
        {
            
        }
        protected void Application_Error()
        {

        }
    }
}
