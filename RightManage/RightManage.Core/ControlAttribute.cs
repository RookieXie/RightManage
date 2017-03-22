using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Core
{
    [AttributeUsage(AttributeTargets.Field)]
    public class ControlAttribute:Attribute
    {
        public string Name { get; set; }

    }
}
