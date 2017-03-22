using RightManage.Api;
using RightManage.Core;
using RightManage.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RightManage.Controllers
{
    public class CommonController : BaseController
    {
        // GET: Common
        public ActionResult Index()
        {
            return View();
        }
        public string GetTable(string tableName, int pageSize = 10, int pageNumber = 0)
        {
            CommonService service = new CommonService();
            var obj = service.GetTable(tableName);

            return ReturnJson(obj);
        }

        public string SearchTable(string tableName, string search, string page)
        {
            var data = search.SafeJsonObject<List<SearchData>>();
            CommonService service = new CommonService();
            var res = service.SearchTable(tableName, data);
            //var res = "";
            return ReturnJson(res);
        }
    }
}