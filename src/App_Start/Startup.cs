using Microsoft.Owin;
using Owin;
using Algoteacher.Models;
using Microsoft.Owin.Security.Cookies;
using Microsoft.AspNet.Identity;
 
[assembly: OwinStartup(typeof(Algoteacher.Startup))]
 
namespace Algoteacher
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // настраиваем контекст и менеджер
            app.CreatePerOwinContext<ApplicationContext>(ApplicationContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login"),
            });
        }
    }
}