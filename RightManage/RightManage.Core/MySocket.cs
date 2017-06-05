using Quobject.SocketIoClientDotNet.Client;
using System;
using System.Collections.Generic;
using System.Linq;

using System.Text;
using System.Threading.Tasks;
using Quobject.SocketIoClientDotNet.Client;
namespace RightManage.Core
{
    public class MySocket
    {

        ///Client socket;

        public void MsgSend()
        {
            var socket = IO.Socket("http://localhost");
            socket.On(Socket.EVENT_CONNECT, () =>
            {
                socket.Emit("hi");

            });

        }

    }
}
