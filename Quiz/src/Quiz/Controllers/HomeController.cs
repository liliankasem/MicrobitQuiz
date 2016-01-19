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

        public IActionResult SnowflakeQuiz()
        {
            ViewData["Title"] = "Microbit Snowflake Badge";
            ViewData["QuizName"] = "snowflake";
            ViewData["APIKey"] = "5f532a3fc4f1ea403f37070f59a7a53a";

            return View();

        }

        public IActionResult LoveMeterQuiz()
        {
            ViewData["Title"] = "Microbit Love Meter Badge";
            ViewData["QuizName"] = "lovemeter";
            ViewData["APIKey"] = "5f532a3fc4f1ea403f37070f59a7a53a";

            return View();

        }

        public IActionResult SortingHatQuiz()
        {
            ViewData["Title"] = "Microbit Sorting Hat Badge";
            ViewData["QuizName"] = "sortinghat";
            ViewData["APIKey"] = "5f532a3fc4f1ea403f37070f59a7a53a";

            return View();

        }

        public IActionResult Error()
        {
            return View("~/Views/Shared/Error.cshtml");
        }
    }
}
