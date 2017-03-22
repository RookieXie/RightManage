using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
   public  interface IObjectContextAdapter
    {
        ObjectContext ObjectContext { get; }
    }
}
