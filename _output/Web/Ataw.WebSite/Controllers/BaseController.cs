using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using RightManage.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace RightManage.Controllers
{
    [Authorzation]
    public class BaseController : Controller
    {
        // GET: Base
        protected virtual string ReturnJson<T>(T res)
        {



            JsResponseResult<T> ree = new JsResponseResult<T>()
            {
                ActionType = JsActionType.Object,
                Obj = res
            };
            ree.EndTimer = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss.ffff");
            ree.BeginTime = Singleton.Current.BeginTime.ToString("yyyy/MM/dd HH:mm:ss.ffff");
           
            string str = ToJSON(ree);
           
            HttpContext.Response.HeaderEncoding = Encoding.UTF8;
            return str;
        }

        public string ToJSON(object oo)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            IsoDateTimeConverter converter = new IsoDateTimeConverter
            {
                DateTimeFormat = "yyyy-MM-dd HH:mm:ss"
            };
            List<JsonConverter> list = new List<JsonConverter> {
                 new StringEnumConverter(),
                 converter
            };
            settings.Converters = list;
            settings.Formatting = Formatting.Indented;
            settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            return JsonConvert.SerializeObject(oo, settings);
        }
    }
}