using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Routing;

namespace Quiz.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Quiz()
        {
            ViewData["Message"] = "Welcome to the Snowflake Microbit Badge!";
            ViewData["Token"] = "89UA9DAS0DUA0DU00JIJGY";

            return View();

        }

        public IActionResult Error()
        {
            return View("~/Views/Shared/Error.cshtml");
        }
    }
}
