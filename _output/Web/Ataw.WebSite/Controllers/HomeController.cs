using RightManage.Core;
using RightManage.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace RightManage.Controllers
{
    
    public class HomeController : BaseController
    {
       [AllowAnonymous]
        // GET: Home
        public ActionResult Index(string id)
        {
            var bc = Request.Browser;
            string _bowser = bc.Browser;
            int _version = bc.MajorVersion;
            ViewBag.Bowser = _bowser;
            ViewBag.Version = _version;
            ViewBag.orgcode = id;
            if (_bowser == "IE")
            {
                if (_version <= 9)
                {
                    ViewBag.IsDown = true;
                }
            }
            else
            {
                ViewBag.IsDown = false;
            }
            return View();
        }
        public ActionResult Home()
        {
            return View();
        }
        [AllowAnonymous]
        public JsonResult Login(string name,string password,string orgId)
        {
            // FormsAuthentication.SetAuthCookie("LoginedUser", true);
            
            System.Web.HttpCookie authCookie = new System.Web.HttpCookie("LoginedUser", "1111xie");
            System.Web.HttpContext.Current.Response.Cookies.Add(authCookie);
            Singleton instance = Singleton.CreateInstance();
            instance.UserID = "1111xie";
            instance.NickName = "谢谢";
            var _data = new
            {
                Content = "ok",
                Data = ""
            };

            return Json(_data);
        }
        public string Test()
        {

            ViewBag.NickName = Singleton.Current.NickName;
            TestService service = new TestService();
            var data=service.GetTest();
            var _data = new
            {
                Content = "ok",
                Data = Singleton.Current.UserID
            };

            return ReturnJson(_data);
        }
    }
}