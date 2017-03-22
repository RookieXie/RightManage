using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
    public sealed class SqlHelper
    {
        private SqlHelper() { }
        private static void AssignParameterValues(SqlParameter[] commandParameters, DataRow dataRow)
        {
            if ((commandParameters != null) && (dataRow != null))
            {
                int num = 0;
                foreach (SqlParameter parameter in commandParameters)
                {
                    if ((parameter.ParameterName == null) || (parameter.ParameterName.Length <= 1))
                    {
                        throw new Exception($"请提供参数{num}一个有效的名称{parameter.ParameterName}.");
                    }
                    if (dataRow.Table.Columns.IndexOf(parameter.ParameterName.Substring(1)) != -1)
                    {
                        parameter.Value = dataRow[parameter.ParameterName.Substring(1)];
                    }
                    num++;
                }
            }

        }
        private static void AssignParameterValues(SqlParameter[] commandParameters, object[] parameterValues)
        {
            if ((commandParameters != null) && (parameterValues != null))
            {
                if (commandParameters.Length != parameterValues.Length)
                {
                    throw new ArgumentException("参数值个数与参数不匹配.");
                }
                int index = 0;
                int length = commandParameters.Length;
                while (index < length)
                {
                    if (parameterValues[index] is IDbDataParameter)
                    {
                        IDbDataParameter parameter = (IDbDataParameter)parameterValues[index];
                        if (parameter.Value == null)
                        {
                            commandParameters[index].Value = DBNull.Value;
                        }
                        else
                        {
                            commandParameters[index].Value = parameter.Value;
                        }
                    }
                    else if (parameterValues[index] == null)
                    {
                        commandParameters[index].Value = DBNull.Value;
                    }
                    else
                    {
                        commandParameters[index].Value = parameterValues[index];
                    }
                    index++;
                }
            }

        }
        private static void AttachParameters(SqlCommand command, SqlParameter[] commandParameters)
        {
            if (command == null)
            {
                throw new ArgumentNullException("command");
            }
            if (commandParameters != null)
            {
                foreach (SqlParameter parameter in commandParameters)
                {
                    if (parameter != null)
                    {
                        if (((parameter.Direction == ParameterDirection.InputOutput) || (parameter.Direction == ParameterDirection.Input)) && (parameter.Value == null))
                        {
                            parameter.Value = DBNull.Value;
                        }
                        command.Parameters.Add(parameter);
                    }
                }
            }

        }
        public static SqlCommand CreateCommand(SqlConnection connection, string spName, params string[] sourceColumns)
        {
            if (connection == null)
            {
                throw new ArgumentNullException("connection");
            }
            if ((spName == null) || (spName.Length == 0))
            {
                throw new ArgumentNullException("spName");
            }
            SqlCommand command = new SqlCommand(spName, connection)
            {
                CommandType = CommandType.StoredProcedure
            };
            if ((sourceColumns != null) && (sourceColumns.Length > 0))
            {
                SqlParameter[] spParameterSet = SqlHelperParameterCache.GetSpParameterSet(connection, spName);
                for (int i = 0; i < sourceColumns.Length; i++)
                {
                    spParameterSet[i].SourceColumn = sourceColumns[i];
                }
                AttachParameters(command, spParameterSet);
            }
            return command;

        }
        public static DataSet ExecuteDataset(SqlConnection connection, CommandType commandType, string commandText) =>
    ExecuteDataset(connection, commandType, commandText, null);
        public static DataSet ExecuteDataset(SqlConnection connection, string spName, params object[] parameterValues);
        public static DataSet ExecuteDataset(SqlTransaction transaction, CommandType commandType, string commandText);
        public static DataSet ExecuteDataset(SqlTransaction transaction, string spName, params object[] parameterValues);
        public static DataSet ExecuteDataset(string connectionString, CommandType commandType, string commandText);
        public static DataSet ExecuteDataset(string connectionString, string spName, params object[] parameterValues);
        public static DataSet ExecuteDataset(SqlConnection connection, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static DataSet ExecuteDataset(SqlTransaction transaction, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static DataSet ExecuteDataset(string connectionString, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static DataSet ExecuteDatasetTypedParams(SqlConnection connection, string spName, DataRow dataRow);
        public static DataSet ExecuteDatasetTypedParams(SqlTransaction transaction, string spName, DataRow dataRow);
        public static DataSet ExecuteDatasetTypedParams(string connectionString, string spName, DataRow dataRow);
        public static int ExecuteNonQuery(SqlConnection connection, CommandType commandType, string commandText);
        public static int ExecuteNonQuery(SqlConnection connection, string spName, params object[] parameterValues);
        public static int ExecuteNonQuery(SqlTransaction transaction, CommandType commandType, string commandText);
        public static int ExecuteNonQuery(SqlTransaction transaction, string spName, params object[] parameterValues);
        public static int ExecuteNonQuery(string connectionString, CommandType commandType, string commandText);
        public static int ExecuteNonQuery(string connectionString, string spName, params object[] parameterValues);
        public static int ExecuteNonQuery(SqlConnection connection, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static int ExecuteNonQuery(SqlTransaction transaction, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static int ExecuteNonQuery(string connectionString, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static int ExecuteNonQueryTypedParams(SqlConnection connection, string spName, DataRow dataRow);
        public static int ExecuteNonQueryTypedParams(SqlTransaction transaction, string spName, DataRow dataRow);
        public static int ExecuteNonQueryTypedParams(string connectionString, string spName, DataRow dataRow);
        public static SqlDataReader ExecuteReader(SqlConnection connection, CommandType commandType, string commandText);
        public static SqlDataReader ExecuteReader(SqlConnection connection, string spName, params object[] parameterValues);
        public static SqlDataReader ExecuteReader(SqlTransaction transaction, CommandType commandType, string commandText);
        public static SqlDataReader ExecuteReader(SqlTransaction transaction, string spName, params object[] parameterValues);
        public static SqlDataReader ExecuteReader(string connectionString, CommandType commandType, string commandText);
        public static SqlDataReader ExecuteReader(string connectionString, string spName, params object[] parameterValues);
        public static SqlDataReader ExecuteReader(SqlConnection connection, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static SqlDataReader ExecuteReader(SqlTransaction transaction, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static SqlDataReader ExecuteReader(string connectionString, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        private static SqlDataReader ExecuteReader(SqlConnection connection, SqlTransaction transaction, CommandType commandType, string commandText, SqlParameter[] commandParameters, SqlConnectionOwnership connectionOwnership);
        public static SqlDataReader ExecuteReaderTypedParams(SqlConnection connection, string spName, DataRow dataRow);
        public static SqlDataReader ExecuteReaderTypedParams(SqlTransaction transaction, string spName, DataRow dataRow);
        public static SqlDataReader ExecuteReaderTypedParams(string connectionString, string spName, DataRow dataRow);
        public static object ExecuteScalar(SqlConnection connection, CommandType commandType, string commandText);
        public static object ExecuteScalar(SqlConnection connection, string spName, params object[] parameterValues);
        public static object ExecuteScalar(SqlTransaction transaction, CommandType commandType, string commandText);
        public static object ExecuteScalar(SqlTransaction transaction, string spName, params object[] parameterValues);
        public static object ExecuteScalar(string connectionString, CommandType commandType, string commandText);
        public static object ExecuteScalar(string connectionString, string spName, params object[] parameterValues);
        public static object ExecuteScalar(SqlConnection connection, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static object ExecuteScalar(SqlTransaction transaction, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static object ExecuteScalar(string connectionString, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static object ExecuteScalarTypedParams(SqlConnection connection, string spName, DataRow dataRow);
        public static object ExecuteScalarTypedParams(SqlTransaction transaction, string spName, DataRow dataRow);
        public static object ExecuteScalarTypedParams(string connectionString, string spName, DataRow dataRow);
        public static XmlReader ExecuteXmlReader(SqlConnection connection, CommandType commandType, string commandText);
        public static XmlReader ExecuteXmlReader(SqlConnection connection, string spName, params object[] parameterValues);
        public static XmlReader ExecuteXmlReader(SqlTransaction transaction, CommandType commandType, string commandText);
        public static XmlReader ExecuteXmlReader(SqlTransaction transaction, string spName, params object[] parameterValues);
        public static XmlReader ExecuteXmlReader(SqlConnection connection, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static XmlReader ExecuteXmlReader(SqlTransaction transaction, CommandType commandType, string commandText, params SqlParameter[] commandParameters);
        public static XmlReader ExecuteXmlReaderTypedParams(SqlConnection connection, string spName, DataRow dataRow);
        public static XmlReader ExecuteXmlReaderTypedParams(SqlTransaction transaction, string spName, DataRow dataRow);
        public static void FillDataset(SqlConnection connection, CommandType commandType, string commandText, DataSet dataSet, string[] tableNames);
        public static void FillDataset(SqlConnection connection, string spName, DataSet dataSet, string[] tableNames, params object[] parameterValues);
        public static void FillDataset(SqlTransaction transaction, CommandType commandType, string commandText, DataSet dataSet, string[] tableNames);
        public static void FillDataset(SqlTransaction transaction, string spName, DataSet dataSet, string[] tableNames, params object[] parameterValues);
        public static void FillDataset(string connectionString, CommandType commandType, string commandText, DataSet dataSet, string[] tableNames);
        public static void FillDataset(string connectionString, string spName, DataSet dataSet, string[] tableNames, params object[] parameterValues);
        public static void FillDataset(SqlConnection connection, CommandType commandType, string commandText, DataSet dataSet, string[] tableNames, params SqlParameter[] commandParameters);
        public static void FillDataset(SqlTransaction transaction, CommandType commandType, string commandText, DataSet dataSet, string[] tableNames, params SqlParameter[] commandParameters);
        public static void FillDataset(string connectionString, CommandType commandType, string commandText, DataSet dataSet, string[] tableNames, params SqlParameter[] commandParameters);
        private static void FillDataset(SqlConnection connection, SqlTransaction transaction, CommandType commandType, string commandText, DataSet dataSet, string[] tableNames, params SqlParameter[] commandParameters);
        private static void PrepareCommand(SqlCommand command, SqlConnection connection, SqlTransaction transaction, CommandType commandType, string commandText, SqlParameter[] commandParameters, out bool mustCloseConnection);
        public static void UpdateDataset(SqlCommand insertCommand, SqlCommand deleteCommand, SqlCommand updateCommand, DataSet dataSet, string tableName);

        // Nested Types
        private enum SqlConnectionOwnership
        {
            Internal,
            External
        }



    }
}
