using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
    public class SqlTrans
    {
        // Methods
        public SqlTrans() { }

        // Properties
        public CommandType CommandType { get; [CompilerGenerated] set; }
        public SqlParameter[] param { get; [CompilerGenerated] set; }
        public string sql { get; [CompilerGenerated] set; }
    }


}
