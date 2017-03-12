using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
namespace Algoteacher.Models
{
    public class ApplicationContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationContext() : base("IdentityDb") { }

        static ApplicationContext()
        {
            Database.SetInitializer<ApplicationContext>(new IdentityDbInit());
        }

        public static ApplicationContext Create()
        {
            return new ApplicationContext();
        }

        public class IdentityDbInit : DropCreateDatabaseIfModelChanges<ApplicationContext>
        {
            protected override void Seed(ApplicationContext context)
            {
                PerformInitialSetup(context);
                base.Seed(context);
            }
            public void PerformInitialSetup(ApplicationContext context)
            {
                // настройки конфигурации контекста будут указываться здесь
            }
        }
    }
}