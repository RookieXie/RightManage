using RightManage.Api;
using RightManage.BF;
using RightManage.Core;
using RightManage.Data;
using RightManage.DB;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Service
{
    public class CommonService
    {
        public PageData GetTable(string tableName, Pagination pager)
        {

            PageData pageData = new PageData();
            DataUtil util = new DataUtil();
            var obj = util.GetClassByName(tableName);
            var properties = obj.GetProperties();
            //Type t = obj.GetType();
            List<TableColunm> tableColunmList = new List<TableColunm>();
            foreach (PropertyInfo pi in properties)
            {
                TableColunm colunm = new TableColunm();
                string name = pi.Name;//获得属性的名字
                var pType = pi.PropertyType.ToString();//类型
                if (pType.IndexOf("System.String") != -1)
                {
                    pType = "string";
                }
                else if (pType.IndexOf("System.Boolean") != -1)
                {
                    pType = "bool";
                }
                else if (pType.IndexOf("System.Int32") != -1)
                {
                    pType = "int";
                }
                else if (pType.IndexOf("System.DateTime") != -1)
                {
                    pType = "dataTime";
                }
                var propertyAttribute = (ControlAttribute)pi.GetCustomAttribute(typeof(ControlAttribute), false);
                var controlType = "";
                var displayName = "";
                bool isHidden = false;
                bool isSearch = false;
                bool isSearchLike = false;
                if (propertyAttribute != null)
                {
                    controlType = propertyAttribute.Control;
                    displayName = propertyAttribute.Name;
                    isHidden = propertyAttribute.IsHidden;
                    isSearch = propertyAttribute.isSearch;
                    isSearchLike = propertyAttribute.isSearchLike;
                }
                colunm.isSearch = isSearch;
                colunm.isSearchLike = isSearchLike;
                colunm.name = name;
                colunm.displayName = displayName;
                colunm.controlType = controlType;
                colunm.isHidden = isHidden;
                colunm.pType = pType;
                tableColunmList.Add(colunm);

            }
            pageData.tableColunms = tableColunmList;


            BFTest bftest = new BFTest();
            bftest.CreateOrUpdateTable(tableName);

            if (pager == null)
            {
                pager = new Pagination();
                pager.IsASC = false;
                pager.PageIndex = 0;
                pager.PageSize = 15;
                pager.TotalCount = 0;
            }

            if (pager.PageSize == 0)
            {
                pager.PageSize = 15;
            }
            int total = 0;
            var dataset = bftest.GetDataByTableName(tableName, pager, out total);
            if (dataset != null && dataset.Tables.Count > 0)
            {
                var table = dataset.Tables[0];
                var rows = table.Rows;
                var colunms = table.Columns;
                List<TableRowData> tableRowsData = new List<TableRowData>();
                for (int i = 0; i < rows.Count; i++)
                {
                    TableRowData rowData = new TableRowData();
                    Dictionary<string, object> dic = new Dictionary<string, object>();
                    foreach (var colunm in colunms)
                    {
                        var name = colunm.ToString();
                        var value = rows[i][name].ToString();
                        dic[name] = value;
                    }
                    rowData.tableRowData = dic;
                    dic["rowNum"] = i;
                    tableRowsData.Add(rowData);

                }
                PagerListData<TableRowData> pageListData = new PagerListData<TableRowData>();
                pager.TableName = tableName;
                pager.TotalCount = total;
                pageListData.Pager = pager;
                pageListData.ListData = tableRowsData;
                pageData.tableData = pageListData;
            }


            return pageData;
        }

        public PagerListData<TableRowData> SearchTable(string tableName, List<SearchData> searchDataList, Pagination pager)
        {

            BFTest bftest = new BFTest();
            if (pager == null)
            {
                pager = new Pagination();
                pager.IsASC = false;
                pager.PageIndex = 0;
                pager.PageSize = 15;
                pager.TotalCount = 0;
            }

            if (pager.PageSize == 0)
            {
                pager.PageSize = 15;
            }
            int total = 0;
            var dataset = bftest.SearchTable(tableName, searchDataList, pager, out total);
            List<TableRowData> tableRowsData = new List<TableRowData>();
            if (dataset.Tables.Count > 0)
            {
                var table = dataset.Tables[0];
                var rows = table.Rows;
                var colunms = table.Columns;
                for (int i = 0; i < rows.Count; i++)
                {
                    TableRowData rowData = new TableRowData();
                    Dictionary<string, object> dic = new Dictionary<string, object>();
                    foreach (var colunm in colunms)
                    {
                        var name = colunm.ToString();
                        var value = rows[i][name].ToString();
                        dic[name] = value;
                    }
                    rowData.tableRowData = dic;
                    dic["rowNum"] = i;
                    tableRowsData.Add(rowData);

                }
            }
            PagerListData<TableRowData> pageListData = new PagerListData<TableRowData>();
            pager.TableName = tableName;
            pager.TotalCount = total;
            pageListData.Pager = pager;
            pageListData.ListData = tableRowsData;
            return pageListData;
        }


        public DataTable UpdateModel(string tableName)
        {
            DataUtil util = new DataUtil();
            var obj = util.GetClassByName(tableName);
            var table = DBUtil.UpdateModel("", tableName);
            return table;
        }

        public void CreateOrUpdateTable(string tableName)
        {
            BFTest bfTest = new BFTest();
            bfTest.CreateOrUpdateTable(tableName);
        }
        public void InsertTable(string tableName, Dictionary<string, object> data, List<TableColunm> columns)
        {
            var db = new RightManageDBContent();
            var colunms = "";
            var values = "";

            foreach (var item in data)
            {

                var column = columns.Where(a => a.name == item.Key).FirstOrDefault(); var pType = column == null ? "string" : column.pType;

                if (colunms == "")
                {
                    if (!string.IsNullOrWhiteSpace(item.Value.ToString()) || (item.Key=="FID" || item.Key == "CREATE_ID" || item.Key == "CREATE_TIME" || item.Key == "FControlUnitID" || item.Key == "TIMESSTAMP" || item.Key == "UPDATE_TIME" || item.Key == "UPDATE_ID"))
                        colunms = string.Format("{0}", item.Key);
                }
                else
                {
                    if (!string.IsNullOrWhiteSpace(item.Value.ToString()) || (item.Key == "FID" || item.Key == "CREATE_ID" || item.Key == "CREATE_TIME" || item.Key == "FControlUnitID" || item.Key == "TIMESSTAMP" || item.Key == "UPDATE_TIME" || item.Key == "UPDATE_ID"))
                        colunms = string.Format("{0},{1}", colunms, item.Key);
                }
                if (values == "")
                {
                    if (item.Key == "FID")
                    {
                        values = string.Format("'{0}'", RightManageUtil.UniqueID());
                    }
                    if (item.Key == "CREATE_ID")
                    {
                        values = string.Format("'{0}'", Singleton.Current.UserID);
                    }
                    if (item.Key == "CREATE_TIME")
                    {
                        values = string.Format("'{0}'", DateTime.Now);
                    }
                    if (item.Key == "FControlUnitID")
                    {
                        values = string.Format("'{0}'", Singleton.Current.FControlUnitID);
                    }
                    if (item.Key == "TIMESSTAMP")
                    {
                        values = string.Format("'{0}'", DateTime.Now.ToShortTimeString());
                    }
                    if (item.Key == "UPDATE_TIME")
                    {
                        values = string.Format("'{0}'", DateTime.Now);
                    }
                    if (item.Key == "UPDATE_ID")
                    {
                        values = string.Format("'{0}'", Singleton.Current.UserID);
                    }
                    else
                    {
                        if (pType == "string")
                        {
                            values = string.Format("'{0}'", item.Value);
                        }
                        if (pType == "bool")
                        {
                            if (!string.IsNullOrWhiteSpace(item.Value.ToString()))
                            {
                                values = string.Format("{0}", null);
                            }
                        }
                        if (pType == "int")
                        {
                            if (!string.IsNullOrWhiteSpace(item.Value.ToString()))
                            {
                                values = string.Format("{0}", Convert.ToInt32(item.Value));
                            }
                                
                        }
                        if (pType == "dataTime")
                        {
                            if (!string.IsNullOrWhiteSpace(item.Value.ToString()))
                            {
                                values = string.Format("'{0}'", Convert.ToDateTime(item.Value));
                            }
                        }
                    }
                }
                else
                {
                    if (item.Key == "FID")
                    {
                        values = string.Format("{0},'{1}'", values, RightManageUtil.UniqueID());
                    }
                    if (item.Key == "CREATE_ID")
                    {
                        values = string.Format("{0},'{1}'", values, Singleton.Current.UserID);
                    }
                    if (item.Key == "CREATE_TIME")
                    {
                        values = string.Format("{0},'{1}'", values, DateTime.Now);
                    }
                    if (item.Key == "FControlUnitID")
                    {
                        values = string.Format("{0},'{1}'", values, Singleton.Current.FControlUnitID);
                    }
                    if (item.Key == "TIMESSTAMP")
                    {
                        values = string.Format("{0},'{1}'", values, DateTime.Now.ToShortTimeString());
                    }
                    if (item.Key == "UPDATE_TIME")
                    {
                        values = string.Format("{0},'{1}'", values, DateTime.Now);
                    }
                    if (item.Key == "UPDATE_ID")
                    {
                        values = string.Format("{0},'{1}'", values, Singleton.Current.UserID);
                    }
                    else
                    {
                        if (pType == "string")
                        {
                            if (!string.IsNullOrWhiteSpace(item.Value.ToString()))
                            {
                                values = string.Format("{0},'{1}'", values, item.Value);
                            }                              
                        }
                        if (pType == "bool")
                        {
                            if (!string.IsNullOrWhiteSpace(item.Value.ToString()))
                            {
                                values = string.Format("{0},{1}", values, Convert.ToBoolean(item.Value));
                            }
                                
                        }
                        if (pType == "int")
                        {
                            if (!string.IsNullOrWhiteSpace(item.Value.ToString()))
                            {
                                values = string.Format("{0},{1}", values, Convert.ToInt32(item.Value));
                            }
                           
                        }
                        if (pType == "dataTime")
                        {
                            if (!string.IsNullOrWhiteSpace(item.Value.ToString()))
                            {
                                values = string.Format("{0},'{1}'", values, Convert.ToDateTime(item.Value));
                            }
                                
                        }

                    }

                }
            }

            var sql = string.Format("insert into {0} ({1}) values ({2})", tableName, colunms, values);
            Log4net.LogInfo(sql);
            var res = db.ExecuteSqlCommand(sql);
            Log4net.LogInfo(res.ToString());
        }

        ///测试
        ///
        public IEnumerable<string> Test()
        {
            var db = new RightManageDBContent();
            BFTest bf = new BFTest();
            var query = bf.GetQuery();
            var _query = query.Where(a => a.Age >= 500).Select(b => b.Content);
            //foreach (var item in _query)
            //{

            //}
            //foreach (var item in _query)
            //{

            //}
            //_query = _query.Where(a => a.Age >= 500);

            //_query = _query.Where(a => a.Age >= 600);
            //_query = _query.Where(a => a.Age >= 700);
            //foreach (var item in _query)
            //{

            //}
            //var list= _query.ToList();
            //bf.SetUnitOfData(db);
            //for (int i = 0; i < 10000; i++)
            //{
            //    Test test = new Test();
            //    test.FID = RightManageUtil.UniqueID();
            //    test.Content = "哈哈" + i;
            //    test.Age = i;
            //    bf.AddModel(test);
            //}
            // db.Submit();
            return _query;
        }
    }
}
