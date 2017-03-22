using RightManage.BF;
using RightManage.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Service
{
    public class TestService
    {
        public string GetTest()
        {
            BFTest bfTest = new BFTest();
            Test model =bfTest.GetTest();
            return model.Name;
        }
    }
}
