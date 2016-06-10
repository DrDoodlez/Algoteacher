﻿using System.Web.Mvc;
using System.Web.Routing;

namespace Algoteacher.App_Start
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{*path}",
                defaults: new { controller = "Home", action = "Index" }
            );
        }
    }
}