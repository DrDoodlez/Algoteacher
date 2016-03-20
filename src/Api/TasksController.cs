using System.Collections.Generic;
using System.Web.Http;
using Algoteacher.Models;
using Algoteacher.Models.Repositories;

namespace Algoteacher.Api
{
    public class TasksController : ApiController
    {
        private TasksRepository _tasksRepository;

        public TasksController()
        {
            _tasksRepository = new TasksRepository();
        }

        public IEnumerable<Task> GetTasks()
        {
            return _tasksRepository.All;
        }
    }
}
