using RightManage.Core;
using RightManage.DB;
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
        private bool isCreateTable = true;
        [AllowAnonymous]
        // GET: Home
        public ActionResult Index(string id = "1")
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
            ViewBag.NickName = Singleton.Current.NickName;
            return View();
        }
        [AllowAnonymous]
        public string Login(string name, string password, string orgId)
        {
            // FormsAuthentication.SetAuthCookie("LoginedUser", true);
            RMUserService service = new RMUserService();
            var res = service.UserLogin(name, password, orgId);
            var _user = res.Data;
            System.Web.HttpCookie authCookie = new System.Web.HttpCookie("LoginedUser", _user.FID);
            System.Web.HttpContext.Current.Response.Cookies.Add(authCookie);
            Singleton instance = Singleton.CreateInstance();
            instance.UserID = _user.FID;
            instance.NickName = _user.NickName;
            instance.FControlUnitID = _user.FControlUnitID;
            instance.UserName = _user.LoginName;
            Log4net.LogInfo(instance.UserName+"登录成功，时间："+DateTime.Now.ToShortTimeString());
            return ReturnJson(res);
        }
        public string Test()
        {
            CommonService service = new CommonService();
            //service.CreateOrUpdateTable("Test");
            var _data = new
            {
                Content = "ok",
                Data = ""
            };

            return ReturnJson(_data);
        }
    }
}