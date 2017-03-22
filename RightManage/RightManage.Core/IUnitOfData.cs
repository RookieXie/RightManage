using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
    public interface IUnitOfData:IDisposable
    {
        int ExecuteSqlCommand(string sql, params SqlParameter[] param);
        int ExecuteStored(string storedName, params SqlParameter[] param);
      
        string GetUniId();
        
        DataSet QueryDataSet(string sqlString, params SqlParameter[] cmdParms);
        object QueryObject(string sqlString, params SqlParameter[] cmdParms);
        int Submit();

        

    }
}
