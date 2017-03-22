using RightManage.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.DA.Extensions
{
    public static class CommonConditions
    {
        

        /// <summary>
        /// 过滤掉已删除掉数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static IQueryable<T> FilterByValidation<T>(this IQueryable<T> input)
            where T : BaseTableData
        {
            return input.Where(entity => entity.ISDELETE == null || entity.ISDELETE == false);
        }

        /// <summary>
        /// 默认排序
        /// </summary>
        public static IQueryable<T> DefaultOrderBy<T>(this IQueryable<T> input)
            where T : BaseTableData
        {
            return input.OrderByDescending(r => r.UPDATE_TIME).ThenByDescending(r => r.CREATE_TIME);
        }
        
    }
}
