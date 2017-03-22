using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
    public static class DBUtil
    {
        // Methods
        public static StringBuilder CommandToString(this ICollection<CommandItem> items, StringBuilder sb)
        {
            foreach (CommandItem item in items)
            {
                sb.Append(Environment.NewLine);
                sb.Append("操作类型：");
                sb.Append(item.CommandType.ToString());
                sb.Append(Environment.NewLine);
                sb.Append(item.CommandText);
                sb.Append(Environment.NewLine);
                if (item.Parameters.Count > 0)
                {
                    foreach (SqlParameter parameter in item.Parameters)
                    {
                        sb.AppendFormat("名称:{0} 类型：{1} 长度：{2} 值：{3}", new object[] { parameter.ParameterName, parameter.SqlDbType.ToString(), parameter.Size, parameter.Value.ToString() });
                        sb.Append(Environment.NewLine);
                    }
                }
            }
            return sb;

        }
        public static StringBuilder DbCommandToString(IEnumerable<DbParameter> items, StringBuilder sb)
        {
            foreach (DbParameter parameter in items)
            {
                foreach (DbParameter parameter2 in items)
                {
                    sb.AppendFormat("名称:{0} 类型：{1} 长度：{2} 值：{3}", new object[] { parameter2.ParameterName, parameter2.DbType.ToString(), parameter2.Size, parameter2.Value.ToString() });
                    sb.Append(Environment.NewLine);
                }
            }
            return sb;


        }
        public static StringBuilder DbCommandToString(SqlCommand cmd, StringBuilder sb)
        {
            int num2;
            int count = cmd.Parameters.Count;
            if (count > 0)
            {
                for (num2 = 0; num2 < count; num2++)
                {
                    sb.AppendFormat("DECLARE {0} {1} ", new object[] { cmd.Parameters[num2], cmd.Parameters[num2].DbType.ToString(), cmd.Parameters[num2].Size, cmd.Parameters[num2].Value.ToString() });
                    sb.Append(Environment.NewLine);
                    sb.AppendFormat("set {0} =  {1} ", cmd.Parameters[num2], cmd.Parameters[num2].Value.ToString());
                }
            }
            sb.Append("--查询文本：");
            sb.AppendLine();
            sb.AppendLine(cmd.CommandText);
            sb.AppendLine();
            if (count > 0)
            {
                for (num2 = 0; num2 < count; num2++)
                {
                    sb.AppendFormat("--名称:{0} 类型：{1} 长度：{2} 值：{3}", new object[] { cmd.Parameters[num2], cmd.Parameters[num2].DbType.ToString(), cmd.Parameters[num2].Size, cmd.Parameters[num2].Value.ToString() });
                    sb.Append(Environment.NewLine);
                }
            }
            return sb;

        }
        //public static StringBuilder SqlTransToString(this ICollection<SqlTrans> items, StringBuilder sb)
        //{
        //    foreach (SqlTrans trans in items)
        //    {
        //        sb.Append(Environment.NewLine);
        //        sb.Append("操作类型：");
        //        sb.Append(trans.CommandType.ToString());
        //        sb.Append(Environment.NewLine);
        //        sb.Append(trans.sql);
        //        sb.Append(Environment.NewLine);
        //        int num = (trans.param == null) ? 0 : trans.param.Count<SqlParameter>();
        //        if (num > 0)
        //        {
        //            foreach (SqlParameter parameter in trans.param)
        //            {
        //                if (((parameter != null) && (parameter.ParameterName != null)) && (parameter.Value != null))
        //                {
        //                    sb.AppendFormat("名称:{0} 类型：{1} 长度：{2} 值：{3}", new object[] { parameter.ParameterName, parameter.SqlDbType.ToString(), parameter.Size, parameter.Value.ToString() });
        //                }
        //                sb.Append(Environment.NewLine);
        //            }
        //        }
        //    }
        //    return sb;

        //}
    }



}
