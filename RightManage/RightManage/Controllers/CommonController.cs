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
        public string GetTable(string tableName, string pager)
        {
            var _paper = pager.SafeJsonObject<Pagination>();
            CommonService service = new CommonService();
            var obj = service.GetTable(tableName, _paper);

            return ReturnJson(obj);
        }

        public string SearchTable(string tableName, string search, string pager)
        {
            var _paper = pager.SafeJsonObject<Pagination>();
            var data = search.SafeJsonObject<List<SearchData>>();
            CommonService service = new CommonService();
            var res = service.SearchTable(tableName, data, _paper);
            //var res = "";
            return ReturnJson(res);
        }
        public string UpdateModel(string tableName)
        {
            CommonService service = new CommonService();
            var res = service.UpdateModel(tableName);
            return ReturnJson(res);
        }
    }
}