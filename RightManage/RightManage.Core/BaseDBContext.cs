using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
    public class BaseDBContext : DbContext, IUnitOfData,IDisposable
    {
       // private bool IsSaveAtawChanges;
        public BaseDBContext(string nameOrConnectionString) : base(nameOrConnectionString)
        {
            
        }
        
        public virtual int ExecuteSqlCommand(string sql, params SqlParameter[] param) =>
base.Database.ExecuteSqlCommand(sql, param);

        public virtual int ExecuteStored(string storedName, params SqlParameter[] param) =>
    this.ExecuteSqlCommand(" EXECUTE " + storedName, param);
        public string GetUniId()
        {
            string tableName = "";
            string str = "";
            SqlParameter parameter = new SqlParameter("tabName", SqlDbType.VarChar, 50)
            {
                Value = tableName
            };
            SqlParameter parameter2 = new SqlParameter("MaxID", SqlDbType.VarChar, 50)
            {
                Direction = ParameterDirection.Output,
                Value = str
            };
            this.ExecuteSqlCommand(" EXECUTE GetMaxFID @tabName,  @MaxID  OUTPUT", new SqlParameter[] { parameter, parameter2 });
            return parameter2.Value.ToString();
        }
        public DataSet QueryDataSet(string sqlString, params SqlParameter[] cmdParms)
        {
            SqlCommand cmd = new SqlCommand();
            SqlConnection connection = base.Database.Connection as SqlConnection;
            if (connection.State != ConnectionState.Open)
            {
                connection.Open();
            }
            cmd.Connection = connection;
            cmd.CommandText = sqlString;
            cmd.CommandType = CommandType.Text;
            if (cmdParms != null)
            {
                foreach (SqlParameter parameter in cmdParms)
                {
                    cmd.Parameters.Add(parameter);
                }
            }
            StringBuilder sb = new StringBuilder();
            DBUtil.DbCommandToString(cmd, sb);
            //AtawTrace.WriteFile(LogType.PageQuerySql, sb.ToString());
            DataSet dataSet = new DataSet();
            try
            {
                using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                {
                    adapter.Fill(dataSet);
                    cmd.Parameters.Clear();
                }
                return dataSet;
            }
            catch (Exception exception)
            {
                //AtawTrace.WriteFile(LogType.SqlQueryError, sb.ToString());
                throw exception;
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
            return dataSet;
        }

        public object QueryObject(string sqlString, params SqlParameter[] cmdParms)
        {
            SqlCommand cmd = new SqlCommand();
            SqlConnection connection = base.Database.Connection as SqlConnection;
            if (connection.State != ConnectionState.Open)
            {
                connection.Open();
            }
            cmd.Connection = connection;
            cmd.CommandText = sqlString;
            cmd.CommandType = CommandType.Text;
            if (cmdParms != null)
            {
                foreach (SqlParameter parameter in cmdParms)
                {
                    cmd.Parameters.Add(parameter);
                }
            }
            StringBuilder sb = new StringBuilder();
            DBUtil.DbCommandToString(cmd, sb);
            //AtawTrace.WriteFile(LogType.QueryObject, sb.ToString());
            object obj2 = cmd.ExecuteScalar();
            if (connection != null)
            {
                connection.Close();
            }
            return obj2;
        }
        public int Submit()
        {
            return base.SaveChanges();
        }
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }


    }
}
