using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
    public sealed class Singleton
    {
        private volatile static Singleton _instance = null;
        private static readonly object _lockrobject = new object();
        private Singleton() { }
        public static Singleton CreateInstance()
        {
            if (_instance == null)
            {
                lock (_lockrobject)
                {
                    if (_instance == null)
                        _instance = new Singleton();
                }
            }
            return _instance;
        }

        public string UserID { get; set; }
        public string FControlUnitID { get; set; }
        public string UserName { get; set; }
        public string NickName { get; set; }

        public DateTime BeginTime { get; set; }
        public static Singleton Current => _instance;



    }
}
