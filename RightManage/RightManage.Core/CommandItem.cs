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
    public class CommandItem
    {
        // Methods
        public CommandItem()
        {

        }

        // Properties
        public string CommandText { get; [CompilerGenerated] set; }
        public CommandType CommandType { get; [CompilerGenerated] set; }
        public List<SqlParameter> Parameters { get; [CompilerGenerated] set; }
    }



}
