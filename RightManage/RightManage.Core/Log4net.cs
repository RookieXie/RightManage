using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
   public static class Log4net
    {
        private static Type _type=System.Reflection.MethodBase.GetCurrentMethod().DeclaringType;
        private static ILog log = log4net.LogManager.GetLogger(_type);
        //Error
        public static void LogError(string sign,string msg)
        {
            log.Error(sign,new Exception(msg));
        }
        public static void LogFatal(string sign, string msg)
        {
            log.Fatal(sign, new Exception(msg));
        }
        public static void LogInfo(string msg)
        {
            log.Info(msg);
        }
        public static void LogDebug(string msg)
        {
            log.Debug(msg);
        }
        public static void LogWarn(string msg)
        {
            log.Warn(msg);
        }
        
    }
}
