using System.Collections.Generic;
using System.Web.Http;
using Algoteacher.Models;
using Algoteacher.Models.Repositories;

namespace Algoteacher.Api
{
    public class ContactsController : ApiController
    {
        private readonly ContactsRepository _contactsRepository;

        public ContactsController()
        {
            _contactsRepository = new ContactsRepository();
        }
        public IEnumerable<Contact> GetContacts()
        {
            return _contactsRepository.All;
        }
    }
}
