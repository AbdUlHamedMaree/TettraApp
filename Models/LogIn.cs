using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication_TetraApp.Models
{
    public class LogIn
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string PassWord { get; set; }
    }
}
