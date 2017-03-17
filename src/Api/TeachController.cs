using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EasyMath.Models;
using EasyMath.Models.Repositories;

namespace EasyMath.Api
{
    public class TeachController : ApiController
    {
        private readonly SchemaRepository _schemaRepository;

        public TeachController()
        {
            _schemaRepository = new SchemaRepository();
        }

        public IEnumerable<Schema> GetSchemas()
        {
            return _schemaRepository.All;
        }

        public Schema GetSchema(string id)
        {
            return _schemaRepository.GetById(id);
        }
    }
}
