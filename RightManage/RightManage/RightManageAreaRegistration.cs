using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RightManage
{
    public class RightManageAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "RightManage";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
               "RightManage_Defalut",
               "RightManage/{controller}/{action}/{id}",
              new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                 new[] { "RightManage.Controllers" }

           );

        }
    }
}