﻿using RightManage.Api;
using RightManage.BF;
using RightManage.Data;
using RightManage.DB;
using System;
using System.Collections.Generic;
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
                string name = pi.Name;//获得属性的名字,后面就可以根据名字判断来进行些自己想要的操作   
                                      //var attr=pi.GetCustomAttribute; 
                                      //var attr= pi.Attributes;
                                      //var info = typeof(pi)
                                      //获取特性 Attribute
                var pType = pi.PropertyType.ToString();
                if (pType.IndexOf("System.String") !=-1)
                {
                    pType = "string";
                }else if(pType.IndexOf("System.Boolean") != -1)
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
                    isSearch=propertyAttribute.isSearch;
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
            var dataset = bftest.GetDataByTableName(tableName);
            if (dataset.Tables.Count > 0)
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
                        //foreach (var item in tableColunmList)
                        //{
                        //    if (item.name == name && !item.isHidden)
                        //    {
                        //        dic[name] = value;
                        //    }
                        //}
                        dic[name] = value;
                        //var pType = rows[i][name].GetType();
                    }
                    rowData.tableRowData = dic;
                    dic["rowNum"] = i;
                    tableRowsData.Add(rowData);

                }
                pageData.tableData = tableRowsData;
            }


            return pageData;
        }

        public List<TableRowData> SearchTable(string tableName,List<SearchData> searchDataList)
        {
           // List<TableRowData> tableRowsData = new List<TableRowData>();
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
                        //foreach (var item in tableColunmList)
                        //{
                        //    if (item.name == name && !item.isHidden)
                        //    {
                        //        dic[name] = value;
                        //    }
                        //}
                        dic[name] = value;
                        //var pType = rows[i][name].GetType();
                    }
                    rowData.tableRowData = dic;
                    dic["rowNum"] = i;
                    tableRowsData.Add(rowData);

                }
            }
            return tableRowsData;
        }
    }
}
