using System.Web.Mvc;

namespace Algoteacher.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View("Index");
        }

    }
}
