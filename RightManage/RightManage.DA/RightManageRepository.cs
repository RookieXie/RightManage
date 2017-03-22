using RightManage.Core;
using RightManage.DB;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static RightManage.Core.DataAccess;

namespace RightManage.DA
{
    public class RightManageRepository<T>: Repository<T,RightManageDBContent>, IRepository<T>  where T : class
    {
        public RightManageRepository(IUnitOfData dbContext)
            : base(dbContext as BaseDBContext)
        {
        }
    }
}
