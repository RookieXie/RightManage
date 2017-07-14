using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
   public static class ObjectExtension
    {
        public static T SafeJsonObject<T>(this string str)
        {
            try
            {
                return JsonConvert.DeserializeObject<T>(str);
            }
            catch (Exception )
            {
                return default(T);
            }
        }


    }
}
