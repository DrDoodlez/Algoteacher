using System.Collections.Generic;
using System.Web.Http;
using Algoteacher.Models;
using Algoteacher.Models.Repositories;

namespace Algoteacher.Api
{
    public class TasksController : ApiController
    {
        //private TasksRepository _tasksRepository;
        private List<Task> _tasks;

        public TasksController()
        {
            //_tasksRepository = new TasksRepository();
            _tasks = new List<Task> {
                new Task { 
                    Name = "matrixmult", 
                    Label = "Перемножение матриц",
                    IntroText = "Доброго времени суток, дружище! Не желаешь ли научиться перемножать матрицы?"
                    },
                new Task { 
                    Name = "transport", 
                    Label = "Транспортная задача",
                    IntroText = "Доброго времени суток, дружище! Не желаешь ли научиться решать транспортную задачу?\n Если ты всё умеешь, то выбирай тестирование!"
                }
            };
        }

        public IEnumerable<Task> GetTasks()
        {
            return _tasks;
        }
    }
}
