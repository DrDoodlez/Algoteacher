using System;
using System.Collections.Generic;
using System.Linq;

namespace Algoteacher.Models.Repositories
{
    public class SchemaRepository
    {
        private static List<Schema> _container;

        static SchemaRepository()
        {
            _container = new List<Schema>
                             {
                                 new Schema
                                     {
                                         Data = "Тут будет схема для перемножения матриц",
                                         Name = "matrix mult",
                                         Id = "matrixmult",
                                         Title = "Перемножение матриц"
                                     },
                                 new Schema
                                     {
                                         Data = "Тут будет схема для транспортной задачи",
                                         Name = "transport",
                                         Id = "transport",
                                         Title = "Транспортная задача"
                                     }
                             };
        }

        public IEnumerable<Schema> All
        {
            get { return _container; }
        }

        public Schema GetById (string id)
        {
            return _container.FirstOrDefault(c => c.Id.Equals(id));
        }
    }
}