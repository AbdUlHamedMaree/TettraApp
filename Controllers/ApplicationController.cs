using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication_TetraApp.Models;

namespace WebApplication_TetraApp.Controllers
{
    public class ApplicationController : Controller
    {
        public IActionResult Index()
        {
            return RedirectToAction("LogIn");
        }

        public IActionResult WebApp()
        {
            if (HttpContext.Session.GetString("UserName") == null || HttpContext.Session.GetString("Password") == null)
                return RedirectToAction("LogIn");
            int userId = -1;
            using (AppDB appdb = new AppDB())
            {
                userId = appdb.Users.Where(u => u.UserName == HttpContext.Session.GetString("UserName")).FirstOrDefault().UserID;
            }
            ViewBag.ID = userId;
            return View();
        }

        public ActionResult LogIn()
        {
            return View(new LogIn());
        }

        [HttpPost]
        public ActionResult LogIn(LogIn mem)
        {
            if (ModelState.IsValid)
            {
                User usr = new User();
                using (AppDB appdb = new AppDB())
                {
                    usr = appdb.Users.Where(u => u.UserName == mem.UserName && u.Password == mem.PassWord).FirstOrDefault();
                }
                if (usr != null)
                {
                    HttpContext.Session.SetString("UserName", usr.UserName);
                    HttpContext.Session.SetString("Password", usr.Password);
                    return RedirectToAction("WebApp");
                }
            }
            return View(mem);
        }

        // GET: Account/SignIn
        public ActionResult SignIn()
        {
            return View(new SignIn());
        }

        [HttpPost]
        public ActionResult SignIn(SignIn mem)
        {
            if (ModelState.IsValid)
            {
                User usr = new User()
                {
                    FullName = mem.FullName,
                    UserName = mem.UserName,
                    EMail = mem.EMail,
                    Password = mem.Password,
                    Activate = true,
                    Bio = "Here`s My Tetra Messanger Account",
                    Male = mem.Gender,
                    MediaID = null
                };
                using (AppDB appdb = new AppDB())
                {
                    appdb.Users.Add(usr);
                    appdb.SaveChanges();
                }
                return RedirectToAction("LogIn");
            }
            return View(mem);
        }
    }
}
