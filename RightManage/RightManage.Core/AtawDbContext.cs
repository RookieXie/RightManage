using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;
using System.Data.Entity.ModelConfiguration.Configuration;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace RightManage.Core
{
    public class AtawDbContext : DbContext, IUnitOfData, IDisposable, IRegName
    {
        public List<IUnitOfData> AtawDbContextList;
        private bool fIsSubmit;
        private DateTime fNow;
        private string fUnitSign;
        private bool IsSaveAtawChanges;
        public List<SqlTrans> SqlTransList;

        // Methods
        public AtawDbContext(string nameOrConnectionString) : base(nameOrConnectionString)
        {
            this.SqlTransList = new List<SqlTrans>();
            this.AtawDbContextList = new List<IUnitOfData>();
            this.IsSaveAtawChanges = false;
            this.NameOrConnectionString = nameOrConnectionString;
            this.fUnitSign = nameOrConnectionString;
            this.ApplyFun = new List<Func<SqlTransaction, int>>();

        }
        public string AddError(string module, string mesg, string strack)
        {
            string str = "";
            SqlParameter parameter = new SqlParameter("MODULE", SqlDbType.NVarChar, 50)
            {
                Value = module
            };
            SqlParameter parameter2 = new SqlParameter("MESG", SqlDbType.NVarChar)
            {
                Value = mesg
            };
            SqlParameter parameter3 = new SqlParameter("STRACK", SqlDbType.NText)
            {
                Value = strack
            };
            SqlParameter parameter4 = new SqlParameter("FID", SqlDbType.NVarChar, 50)
            {
                Direction = ParameterDirection.Output,
                Value = str
            };
            this.ExecuteSqlCommand(" EXECUTE ATAW_SP_ADD_ERROR @MODULE,@MESG,@STRACK,@FID  OUTPUT", new SqlParameter[] { parameter, parameter2, parameter3, parameter4 });
            return parameter4.Value.ToString();

        }
        public void addUnitOfData(IUnitOfData unitOfData)
        {
            this.AtawDbContextList.Add(unitOfData);
        }
        public int ADOSubmit()
        {
            bool flag = this.LogSaveAtawChanges();
            SqlConnection connection = base.Database.Connection as SqlConnection;
            int num = 0;
            //if ((((base.CommandItems == null) || (base.CommandItems.Count <= 0)) && !this.SqlTransList.IsNotEmpty<List<SqlTrans>>()) && !this.AtawDbContextList.IsNotEmpty<List<IUnitOfData>>())
            //{
            //    return num;
            //}
            StringBuilder sb = new StringBuilder();
            if (flag)
            {
                sb.Append(connection.ConnectionString);
                sb.AppendLine();
                this.LogCommand(sb);
                foreach (IUnitOfData data in this.AtawDbContextList)
                {
                    data.IsChildUnit = true;
                    data.LogCommand(sb);
                }
                //if (AtawAppContext.Current.Logger != null)
                //{
                //    AtawAppContext.Current.Logger.Debug(sb.ToString(), new object[0]);
                //}
                //AtawTrace.WriteFile(LogType.SubmitSql, sb.ToString());
            }
            using (connection)
            {
                if (connection.State == ConnectionState.Closed)
                {
                    connection.Open();
                }
                SqlTransaction transaction = connection.BeginTransaction();
                using (transaction)
                {
                    try
                    {
                        try
                        {
                            if (this.SqlTransList.Count > 0)
                            {
                                foreach (SqlTrans trans in this.SqlTransList)
                                {
                                   // num += SqlHelper.ExecuteNonQuery(transaction, trans.CommandType, trans.sql, trans.param);
                                }
                            }
                            //foreach (CommandItem item in base.CommandItems)
                            //{
                            //   // num += SqlHelper.ExecuteNonQuery(transaction, item.CommandType, item.CommandText, item.Parameters.ToArray());
                            //}
                            foreach (IUnitOfData data2 in this.AtawDbContextList)
                            {
                                num += data2.Submit();
                            }
                            if ((this.ApplyFun != null) && (this.ApplyFun.Count > 0))
                            {
                                foreach (Func<SqlTransaction, int> func in this.ApplyFun)
                                {
                                    num += func(null);
                                }
                            }
                            transaction.Commit();
                        }
                        catch (DbEntityValidationException exception)
                        {
                            string content = string.Join("|", (IEnumerable<string>)(from a in exception.EntityValidationErrors select string.Join("-", (IEnumerable<string>)(from b in a.ValidationErrors select b.ErrorMessage))));
                            //AtawTrace.WriteFile(LogType.EfErrot, content);
                            transaction.Rollback();
                            throw exception;
                        }
                        catch (Exception exception2)
                        {
                         // AtawTrace.WriteFile(LogType.SqlSubmitError, sb.ToString());
                            transaction.Rollback();
                            throw exception2;
                        }
                    }
                    finally
                    {
                    }
                    return num;
                }
            }

        }
        public static object Build(Type innerType)
        {
            Type type = typeof(EntityTypeConfiguration<>);
            type = type.MakeGenericType(new Type[] { innerType });
            object obj2 = Activator.CreateInstance(type);
            ParameterExpression expression = Expression.Parameter(innerType, "foo");
            LambdaExpression expression2 = Expression.Lambda(Expression.Property(expression, "FID"), new ParameterExpression[] { expression });
            return type.GetMethod("HasKey").MakeGenericMethod(new Type[] { innerType.GetProperty("FID").PropertyType }).Invoke(obj2, new object[] { expression2 });
        }

        private void CheckSubmit()
        {
            if (this.fIsSubmit)
            {
                throw new Exception("注意 DbContext 只能被提交一次");
            }
            this.fIsSubmit = true;

        }
        public SqlParameter CreateParameter(string pamName, DbType dbType, object value) =>
     new SqlParameter("@" + pamName, dbType) { Value = value };

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                //ObjectUtil.DisposeListObject<IUnitOfData>(this.AtawDbContextList);

                if (this.AtawDbContextList != null)
                {
                    foreach (IUnitOfData local in this.AtawDbContextList)
                    {
                        local.Dispose();
                    }
                    this.AtawDbContextList.Clear();
                }

                this.ApplyFun = null;
            }
            base.Dispose(disposing);

        }
        public int EfSubmit()
        {
            int num3;
            try
            {
                if ((this.SqlTransList.Count > 0) || (this.AtawDbContextList.Count > 0))
                {
                    TransactionOptions transactionOptions = new TransactionOptions
                    {
                        IsolationLevel = System.Transactions.IsolationLevel.ReadCommitted
                    };
                    using (TransactionScope scope = new TransactionScope(TransactionScopeOption.RequiresNew, transactionOptions))
                    {
                        int num = 0;
                        foreach (SqlTrans trans in this.SqlTransList)
                        {
                            num += this.ExecuteSqlCommand(trans.sql, trans.param);
                        }
                        foreach (IUnitOfData data in this.AtawDbContextList)
                        {
                            num += data.Submit();
                        }
                        num += this.SaveChanges();
                        scope.Complete();
                        return num;
                    }
                }
                num3 = this.SaveChanges();
            }
            catch (DbEntityValidationException exception)
            {
                throw new Exception(string.Join("|", (IEnumerable<string>)(from a in exception.EntityValidationErrors select string.Join("-", (IEnumerable<string>)(from b in a.ValidationErrors select b.ErrorMessage)))));
            }
            catch (Exception exception2)
            {
                throw new Exception("EF 提交异常", exception2);
            }
            return num3;

        }
        public int EFSubmit() =>
           this.SaveChanges();
        public virtual int ExecuteSqlCommand(string sql, params SqlParameter[] param) =>
    base.Database.ExecuteSqlCommand(sql, param);



        public virtual int ExecuteStored(string storedName, params SqlParameter[] param) =>
    this.ExecuteSqlCommand(" EXECUTE " + storedName, param);


        public string ExecuteStoredRtn(string storedName, params SqlParameter[] param) =>
    "";



        public string GetSqlParamName(string param) =>
    ("@" + param);

        public string GetUniId() =>
            this.GetUniId("");


        public string GetUniId(string tableName)
        {
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
        public StringBuilder LogCommand(StringBuilder sb)
        {
            sb.AppendLine("_一个子工作单元");
            if (this.LogSaveAtawChanges() || !this.IsChildUnit)
            {
                //if ((base.CommandItems != null) && (base.CommandItems.Count > 0))
                //{
                //    base.CommandItems.CommandToString(sb);
                //}
                //if ((this.SqlTransList != null) && (this.SqlTransList.Count > 0))
                //{
                //    this.SqlTransList.SqlTransToString(sb);
                //}
            }
            return sb;
        }


        private string logDbEx(DbEntityValidationException dbEx)
        {
            StringBuilder builder = new StringBuilder();
            builder.AppendLine("以下是EF提交的异常信息：");
            builder.AppendLine("<ValidationErrors>");
            IEnumerable<DbEntityValidationResult> entityValidationErrors = dbEx.EntityValidationErrors;
            foreach (DbEntityValidationResult result in entityValidationErrors)
            {
                builder.AppendLine("<ValidationError>");
                //builder.AppendLine("<Entry>{0}</Entry>".Format(new object[] { result.Entry.Entity.ToJson<object>() }));
                //builder.AppendLine("<State>{0}</State>".Format(new object[] { result.Entry.State.ToString() }));
                builder.AppendLine("<Errors>");
                foreach (DbValidationError error in result.ValidationErrors)
                {
                    builder.AppendLine("<Error>");
                    //builder.AppendLine("<Name>{0}<Name>".Format(new object[] { error.PropertyName }));
                    //builder.AppendLine("<Mesg>{0}<Mesg>".Format(new object[] { error.ErrorMessage }));
                    builder.AppendLine("<Error>");
                }
                builder.AppendLine("</Errors>");
                builder.AppendLine("<ValidationError>");
            }
            builder.AppendLine("</ValidationErrors>");
            return builder.ToString();

        }
        private bool LogSaveAtawChanges()
        {
            try
            {
                if (!this.IsSaveAtawChanges)
                {
                    this.IsSaveAtawChanges = true;
                    this.SaveChanges();
                }
                else
                {
                    return false;
                }
            }
            catch (DbEntityValidationException exception)
            {
                //string content = this.logDbEx(exception);
                // AtawTrace.WriteFile(LogType.EfErrot, content);
                throw exception;
            }
            return true;

        }
        protected void ModelAdd<TEntityType>(DbModelBuilder modelBuilder) where TEntityType : class
        {
            modelBuilder.Configurations.Add<TEntityType>(new EntityTypeConfiguration<TEntityType>());

        }
        protected void ModelKeyAdd<TEntityType, TKey>(DbModelBuilder modelBuilder, Expression<Func<TEntityType, TKey>> keyExpression) where TEntityType : class
        {
            modelBuilder.Configurations.Add<TEntityType>(new EntityTypeConfiguration<TEntityType>().HasKey<TKey>(keyExpression));
        }
        protected void ModelKeyAddType(DbModelBuilder modelBuilder, Type eType)
        {
            object obj2 = Build(eType);
            ConfigurationRegistrar configurations = modelBuilder.Configurations;
            Func<EntityTypeConfiguration<object>, ConfigurationRegistrar> func = new Func<EntityTypeConfiguration<object>, ConfigurationRegistrar>(configurations.Add<object>);
            func.Method.GetGenericMethodDefinition().MakeGenericMethod(new Type[] { eType }).Invoke(modelBuilder.Configurations, new object[] { obj2 });
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
               // AtawTrace.WriteFile(LogType.SqlQueryError, sb.ToString());
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
        public int RegisterSqlCommand(string sql, params SqlParameter[] param)
        {
            SqlTrans item = new SqlTrans
            {
                sql = sql,
                param = param,
                CommandType = CommandType.Text
            };
            this.SqlTransList.Add(item);
            return ((param == null) ? 0 : param.Count<SqlParameter>());

        }
        public int RegisterStored(string storedName, params SqlParameter[] param)
        {
            SqlTrans item = new SqlTrans
            {
                sql = storedName,
                param = param,
                CommandType = CommandType.StoredProcedure
            };
            this.SqlTransList.Add(item);
            return param.Count<SqlParameter>();

        }
        public SqlParameter setOutputParameter(string paramName, string value, int size)
        {
            SqlParameter parameter = new SqlParameter
            {
                Direction = ParameterDirection.Output,
                ParameterName = paramName,
                SqlDbType = SqlDbType.VarChar
            };
            if (size > 0)
            {
                parameter.Size = size;
            }
            if (!string.IsNullOrEmpty(value))
            {
                parameter.Value = value;
            }
            return parameter;

        }
        public SqlParameter SetParameter(string paramName, bool val) =>
    new SqlParameter
    {
        Direction = ParameterDirection.Input,
        ParameterName = paramName,
        SqlDbType = SqlDbType.TinyInt,
        Value = val ? 1 : 0
    };
        public SqlParameter SetParameter(string paramName, DateTime _val) =>
    new SqlParameter
    {
        Direction = ParameterDirection.Input,
        ParameterName = paramName,
        SqlDbType = SqlDbType.DateTime,
        Value = _val
    };



        public SqlParameter SetParameter(string paramName, decimal val) =>
    new SqlParameter
    {
        Direction = ParameterDirection.Input,
        ParameterName = paramName,
        SqlDbType = SqlDbType.Decimal,
        Precision = 0x12,
        Scale = 4,
        Value = val
    };







        public SqlParameter SetParameter(string paramName, int val) =>
          new SqlParameter
          {
              Direction = ParameterDirection.Input,
              ParameterName = paramName,
              SqlDbType = SqlDbType.Int,
              Value = val
          };



        public SqlParameter SetParameter(string paramName, string val, int size) =>
    new SqlParameter
    {
        Direction = ParameterDirection.Input,
        ParameterName = paramName,
        SqlDbType = SqlDbType.VarChar,
        Size = size,
        Value = val
    };



        public int Submit()
        {
            this.CheckSubmit();
            return this.ADOSubmit();

        }
        private void TransSubmit(SqlConnection conn, SqlTransaction sqlTran) { }

        // Properties
        public List<Func<SqlTransaction, int>> ApplyFun { get; [CompilerGenerated] set; }
        public bool IsChildUnit { get; [CompilerGenerated] set; }
        public string NameOrConnectionString { get; [CompilerGenerated] set; }
        public DateTime Now { get; }
        public string RegName { get; [CompilerGenerated] set; }
        public List<IUnitOfData> UnitOfDataList { get; set; }
        public string UnitSign { get; }

    }
}
