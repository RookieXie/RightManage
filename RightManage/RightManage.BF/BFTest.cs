using RightManage.Api;
using RightManage.Core;
using RightManage.DA;
using RightManage.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.BF
{
    public class BFTest : RightManageBaseBF
    {
        public Test GetTest()
        {
            DATest _da = new DATest(UnitOfData);
            var model = _da.QueryDefault(a => 1 == 1).FirstOrDefault();
            var newMode = new Test();
            newMode.FID = "1111";
            newMode.Name = "chen";
            newMode.Content = "qusi";
            _da.Add(newMode);
            Submit();
            return model;
        }
        public DataSet GetDataByTableName(string tableName, Pagination pager, out int total)
        {
            //var exsitSql = string.Format("SELECT COUNT(*) FROM sys.objects WHERE object_id =OBJECT_ID(N'[dbo].[{0}]')", tableName);
            //var count = Convert.ToInt32(UnitOfData.QueryObject(exsitSql));
            //var dataset = new DataSet();
            //if (count > 0)
            //{
            
            var start = pager.PageSize * pager.PageIndex;
            var end = pager.PageSize * (pager.PageIndex + 1);
            var sql = string.Format("select top {0} * from  (select row_number()over(order by FID) rownumber,* from {1} where FControlUnitID='{2}') a where rownumber > {3} and rownumber<={4} ", pager.PageSize, tableName, Singleton.Current.FControlUnitID, start, end);
            var countSql = string.Format("select COUNT(*) from {0}  where  FControlUnitID='{1}'", tableName, Singleton.Current.FControlUnitID);
            Log4net.LogInfo(sql);
            total = Convert.ToInt32(UnitOfData.QueryObject(countSql));
            //}
            return UnitOfData.QueryDataSet(sql);
        }

        public DataSet SearchTable(string tableName, List<SearchData> searchDataList, Pagination pager, out int total)
        {
            if (searchDataList.Count != 0)
            {
                var start = pager.PageSize * pager.PageIndex;
                var end = pager.PageSize * (pager.PageIndex + 1);
                var sql = string.Format("select top {0} * from  (select row_number()over(order by FID)rownumber,* from {1} where FControlUnitID='{2}') a where rownumber > {3} and rownumber<={4} ", pager.PageSize, tableName, Singleton.Current.FControlUnitID, start, end);
                var countSql = string.Format("select COUNT(*) from {0}  where  FControlUnitID='{1}'", tableName, Singleton.Current.FControlUnitID);
                foreach (var item in searchDataList)
                {
                    var islike = false;
                    if (item.name.IndexOf("_Like") != -1)
                    {
                        islike = true;
                    }
                    switch (item.pType)
                    {
                        case "string":
                            if (islike)
                            {
                                var name = item.name.Substring(0, item.name.IndexOf("_Like"));
                                var strVal = "%" + item.value + "%";
                                sql = string.Format("{0} and {1} like '{2}'", sql, name, strVal);
                                countSql = string.Format("{0} and {1} like '{2}'", countSql, name, strVal);

                            }
                            else
                            {
                                sql = string.Format("{0} and {1}='{2}'", sql, item.name, item.value);
                                countSql = string.Format("{0} and {1}='{2}'", countSql, item.name, item.value);
                            }
                            break;
                        case "int":
                            var intVal = Convert.ToInt32(item.value);
                            sql = string.Format("{0} and {1}={2}", sql, item.name, intVal);
                            countSql = string.Format("{0} and {1}={2}", countSql, item.name, intVal);
                            break;
                        case "bool":
                            var boolVal = Convert.ToBoolean(item.value);
                            sql = string.Format("{0} and {1}={2}", sql, item.name, boolVal);
                            countSql = string.Format("{0} and {1}={2}", countSql, item.name, boolVal);
                            break;
                        case "dateTime":
                            var dateTimeVal = Convert.ToDateTime(item.value);
                            sql = string.Format("{0} and {1}={2}", sql, item.name, dateTimeVal);
                            countSql = string.Format("{0} and {1}={2}", countSql, item.name, dateTimeVal);
                            break;
                    }
                }
                var dataset = UnitOfData.QueryDataSet(sql);
                total = Convert.ToInt32(UnitOfData.QueryObject(countSql));
                return dataset;
            }
            else
            {
                return this.GetDataByTableName(tableName, pager, out total);
            }

        }

        public void CreateOrUpdateTable(string tableName)
        {
            var exsitSql = string.Format("SELECT COUNT(*) FROM sys.objects WHERE object_id =OBJECT_ID(N'[dbo].[{0}]')", tableName);
            var count = Convert.ToInt32(UnitOfData.QueryObject(exsitSql));
            if (count > 0)
            {
                DataUtil util = new DataUtil();
                var obj = util.GetClassByName(tableName);
                var properties = obj.GetProperties();
                foreach (PropertyInfo pi in properties)
                {
                    TableColunm colunm = new TableColunm();
                    string name = pi.Name;
                    var getColumnSql = string.Format("select COUNT(*) from (select  name from syscolumns Where ID=OBJECT_ID(N'[dbo].[{0}]'))t  where t.name='{1}'", tableName, name);
                    var colNameCount = Convert.ToInt32(UnitOfData.QueryObject(getColumnSql));
                    if (colNameCount == 0)
                    {
                        var pType = pi.PropertyType.ToString();
                        if (pType.IndexOf("System.String") != -1)
                        {
                            pType = "nvarchar(50)";
                        }
                        else if (pType.IndexOf("System.Boolean") != -1)
                        {
                            pType = "bit";
                        }
                        else if (pType.IndexOf("System.Int32") != -1)
                        {
                            pType = "int";
                        }
                        else if (pType.IndexOf("System.DateTime") != -1)
                        {
                            pType = "datetime";
                        }
                        else
                        {
                            pType = "nvarchar(50)";
                        }
                        var alterSql = string.Format("alter table {0} add  {1} {2} ;", tableName, name, pType);
                        UnitOfData.ExecuteSqlCommand(alterSql);
                    }
                }

            }
            else
            {
                DataUtil util = new DataUtil();
                var obj = util.GetClassByName(tableName);
                var properties = obj.GetProperties();
                var createSql = string.Format("create table {0}( ", tableName);
                foreach (PropertyInfo pi in properties)
                {
                    TableColunm colunm = new TableColunm();
                    string name = pi.Name;
                    var pType = pi.PropertyType.ToString();
                    if (pType.IndexOf("System.String") != -1)
                    {
                        pType = "nvarchar(50)";
                    }
                    else if (pType.IndexOf("System.Boolean") != -1)
                    {
                        pType = "bit";
                    }
                    else if (pType.IndexOf("System.Int32") != -1)
                    {
                        pType = "int";
                    }
                    else if (pType.IndexOf("System.DateTime") != -1)
                    {
                        pType = "datetime";
                    }
                    else
                    {
                        pType = "nvarchar(50)";
                    }
                    createSql = string.Format("{0} {1} {2} , ", createSql, name, pType);
                }
                createSql = string.Format("{0} )", createSql);
                UnitOfData.ExecuteSqlCommand(createSql);
            }
        }
    }
}
