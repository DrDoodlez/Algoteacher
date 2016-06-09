using System.Web.Mvc;

namespace Algoteacher.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string path)
        {
            return View("Index");
        }
    }
}
