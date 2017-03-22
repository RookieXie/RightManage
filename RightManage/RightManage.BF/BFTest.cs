using RightManage.Api;
using RightManage.Core;
using RightManage.DA;
using RightManage.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
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
        public DataSet GetDataByTableName(string tableName)
        {
            var sql = string.Format("select top 10 * from {0} where FControlUnitID='{1}'", tableName, Singleton.Current.FControlUnitID);
            var dataset = UnitOfData.QueryDataSet(sql);
            return dataset;
        }

        public DataSet SearchTable(string tableName, List<SearchData> searchDataList)
        {
            if (searchDataList.Count != 0)
            {
                var sql = string.Format("select top 10 * from {0} where FControlUnitID='{1}' ", tableName, Singleton.Current.FControlUnitID);
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
                            }
                            else
                                sql = string.Format("{0} and {1}='{2}'", sql, item.name, item.value);
                            break;
                        case "int":
                            var intVal = Convert.ToInt32(item.value);
                            sql = string.Format("{0} and {1}={2}", sql, item.name, intVal);
                            break;
                        case "bool":
                            var boolVal = Convert.ToBoolean(item.value);
                            sql = string.Format("{0} and {1}={2}", sql, item.name, boolVal);
                            break;
                        case "dateTime":
                            var dateTimeVal = Convert.ToDateTime(item.value);
                            sql = string.Format("{0} and {1}={2}", sql, item.name, dateTimeVal);
                            break;
                    }
                }
                var dataset = UnitOfData.QueryDataSet(sql);
                return dataset;
            }
            else
            {
                return this.GetDataByTableName(tableName);
            }

        }
    }
}
