using RightManage.Api;
using RightManage.BF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RightManage.Service
{
    public class RMUserService
    {
        public ResponseData<CurrentUserData> UserLogin(string name,string password,string orgid)
        {
            ResponseData<CurrentUserData> data = new ResponseData<CurrentUserData>();
            BFRM_Users bfUser = new BFRM_Users();
            string res = "";
            CurrentUserData user = new CurrentUserData();
            var _user= bfUser.UserLogin(name, password, orgid,ref res);
            if (res == "ok")
            {
                user.FID = _user.FID;
                user.NickName = _user.NickName;
                user.LoginName = _user.UserName;
                user.FControlUnitID = _user.FControlUnitID;               
            }
            data.Data = user;
            data.Content = res;
            return data;
        }
    }
}
