using RightManage.Core;
using RightManage.Data;
using RightManage.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.DA
{
    public class DATest: RightManageRepository<Test>
    {
        public DATest(IUnitOfData dbContext)
            : base(dbContext)
        {
        }
    }
}
