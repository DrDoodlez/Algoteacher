using System.Web.Mvc;

namespace EasyMath.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            System.Diagnostics.Debug.WriteLine("HOME controller");
            return View("Index");
        }
    }
}
