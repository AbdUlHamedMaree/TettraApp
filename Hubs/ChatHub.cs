using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using WebApplication_TetraApp.Models;

namespace WebApplication_TetraApp.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(Message mes)
        {
            using (AppDB appdb = new AppDB())
            {
                try
                {
                    appdb.Messages.Add(mes);
                    appdb.SaveChanges();
                }
                catch { }
            }
            await Clients.All.SendAsync("ReceiveMessage", mes);
        }

        public void CreateGroup(Group grp)
        {
            using (AppDB appdb = new AppDB())
            {
                try
                {
                    appdb.Groups.Add(grp);
                    appdb.SaveChanges();
                }
                catch { }
            }
        }
        public void AddMemberToGroup(int grp, int usr, Permission permission)
        {
            using (AppDB appdb = new AppDB())
            {
                appdb.Permissions.Add(permission);
                appdb.Participants.Add(new Participant() { UserID = usr, GroupID = grp, PermissionID = permission.PermissionID });
            }
        }
    }
}
