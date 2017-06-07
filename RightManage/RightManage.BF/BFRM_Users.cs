using RightManage.Core;
using RightManage.DA;
using RightManage.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.BF
{
    public class BFRM_Users : RightManageBaseBF
    {
        public RM_Users UserLogin(string name, string password, string orgid, ref string res)
        {
            RM_Users _user = null;
            var _pass = RightManageUtil.EncryptString3Des(password, keyUtil.Secretkey);
            DARM_Users _da = new DARM_Users(UnitOfData);
            var userlist = _da.QueryDefault(a => a.UserName == name && a.Password == _pass && a.FControlUnitID == orgid).ToList();           
            if (userlist.Count > 0)
            {
                var isable = false;
                userlist.ForEach((a) =>
                {
                    if (a.ISDELETE != true)
                    {
                        _user = a;
                        isable = true;
                    }
                });
                if (isable)
                {
                    res = "ok";
                }
                else
                {
                    res = "该用户已经被禁用或被删除";
                }
            }
            else
            {
                res = "账号名或者密码错误";
            }
            return _user;
        }
    }
}
