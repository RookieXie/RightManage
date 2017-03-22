using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Filters;

namespace RightManage.Core
{
    /// <summary>
    /// 登录验证，不需要验证的方法 添加特性 AllowAnonymousAttribute
    /// </summary>
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
    public class AuthorzationAttribute : FilterAttribute, IAuthorizationFilter
    {
        private string _AuthUrl = string.Empty;
        private string _SaveKey = string.Empty;
        private string _SaveType = string.Empty;
        //构造函数
        public AuthorzationAttribute()
        {

            string authUrl = ConfigurationManager.AppSettings["AhtuUrl"];
            string saveKey = ConfigurationManager.AppSettings["SaveKey"];
            string saveType = ConfigurationManager.AppSettings["SaveType"];

            if (string.IsNullOrEmpty(authUrl))
            {
                this._AuthUrl = "/Home/Index";
            }
            else
            {
                this._AuthUrl = authUrl;
            }
            if (string.IsNullOrEmpty(saveKey))
            {
                this._SaveKey = "LoginedUser";
            }
            else
            {
                this._SaveKey = saveKey;
            }
            if (string.IsNullOrEmpty(saveType))
            {
                this._SaveType = "Session";
            }
            else
            {
                this._SaveType = saveType;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="authUrl">验证不通过的登录地址</param>
        public AuthorzationAttribute(string authUrl) : this()
        {
            this._AuthUrl = authUrl;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="authUrl"></param>
        /// <param name="saveKey">验证登录信息的键</param>
        public AuthorzationAttribute(string authUrl, string saveKey) : this(authUrl)
        {
            this._SaveType = "Session"; //默认 session
            this._SaveKey = saveKey;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="authUrl"></param>
        /// <param name="saveKey"></param>
        /// <param name="saveType">登录信息保存方式（ 没配置默认 session， cookie）</param>
        public AuthorzationAttribute(string authUrl, string saveKey, string saveType) : this(authUrl, saveKey)
        {
            this._SaveType = saveType;
        }

        public string AuthUrl
        {
            get { return _AuthUrl.Trim(); }
            set
            {
                if (string.IsNullOrEmpty(value))
                {

                }
                else
                {
                    _AuthUrl = value.Trim();
                }
            }
        }

        public string SaveKey
        {
            get { return _SaveKey.Trim(); }
            set
            {
                if (string.IsNullOrEmpty(value))
                {

                }
                else
                {
                    _SaveKey = value.Trim();
                }
            }
        }
        public string SaveType
        {
            get { return _SaveType.Trim(); }
            set
            {
                if (string.IsNullOrEmpty(value))
                {

                }
                else
                {
                    _SaveType = value.Trim();
                }
            }
        }

        public void OnAuthorization(AuthorizationContext filterContext)
        {

            Singleton.CreateInstance().BeginTime = DateTime.Now;

            if (filterContext.HttpContext == null)
            {

            }
            else
            {
                switch (SaveType)
                {
                    case "Session":
                        if (filterContext.HttpContext.Session == null)
                        {

                        }
                        else if (!filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true) && !filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true))
                        {
                            if (filterContext.HttpContext.Session[_SaveKey] == null)
                            {
                                filterContext.Result = new RedirectResult(_AuthUrl);
                            }
                        }
                        break;
                    case "Cookie":
                        if (!filterContext.ActionDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true) && !filterContext.ActionDescriptor.ControllerDescriptor.IsDefined(typeof(AllowAnonymousAttribute), true))
                        {
                            if (filterContext.HttpContext.Request.Cookies[_SaveKey] == null)
                            {
                                filterContext.Result = new RedirectResult(_AuthUrl);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
}
