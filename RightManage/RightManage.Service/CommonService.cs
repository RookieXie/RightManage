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
        public PageData GetTable(string tableName)
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
            var dataset = bftest.GetDataByTableName(tableName);
            if (dataset!=null &&dataset.Tables.Count > 0)
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
                pageData.tableData = tableRowsData;
            }


            return pageData;
        }

        public List<TableRowData> SearchTable(string tableName, List<SearchData> searchDataList)
        {
            
            BFTest bftest = new BFTest();
            var dataset = bftest.SearchTable(tableName, searchDataList);
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
            return tableRowsData;
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
    }
}
