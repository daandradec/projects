using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RoadTripAgent.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Road Trip Agent";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Contact information";

            return View();
        }

        public ActionResult Start()
        {
            ViewBag.Message = "Start planning";

            return View();
        }

        public ActionResult Radar()
        {
            ViewBag.Message = "Radar information";

            return View();
        }
    }
}