using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication_TetraApp.Models
{
    public class SignIn
    {
        public SignIn()
        {
            Genders = new List<Microsoft.AspNetCore.Mvc.Rendering.SelectListItem>()
            {
                new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem{Text = "Male" , Value="True"},
                new Microsoft.AspNetCore.Mvc.Rendering.SelectListItem{Text = "FeMale" , Value="False"}
            };
        }
        [Required]
        public string FullName { get; set; }

        [Required]
        [UExist(ErrorMessage ="The UserName Is Already Exist")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string RepeatPassword { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EExist(ErrorMessage = "The Email Is Already Used")]
        public string EMail { get; set; }

        public bool Gender { get; set; }

        public List<Microsoft.AspNetCore.Mvc.Rendering.SelectListItem> Genders { get; set; }
    }

    public class UExist : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            User usr = new User();
            using(AppDB appdb = new AppDB())
            {
                usr = appdb.Users.Where(u => u.UserName == (string)value).FirstOrDefault();
            }
            if (usr == null)
                return true;
            return false;
        }
    }

    public class EExist : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            User usr = new User();
            using(AppDB appdb = new AppDB())
            {
                usr = appdb.Users.Where(u => u.EMail == (string)value).FirstOrDefault();
            }
            if (usr == null)
                return true;
            return false;
        }
    }
}
