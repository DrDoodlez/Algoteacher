﻿using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Algoteacher.Models;
using Algoteacher.Models.Repositories;

namespace Algoteacher.Api
{
    public class InboxController : ApiController
    {
        private readonly SchemaRepository _schemaRepository;

        public InboxController()
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
