using ToDoListBusinessLayer.Models;
using Microsoft.Extensions.Caching.Memory;
using ToDoListBusinessLayer.Interfaces;

namespace ToDoListBusinessLayer
{
    public class TaskService : ITaskService
    {
        private readonly IMemoryCache _memoryCache;
        public TaskService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }
        public void AddTask(Tasks task)
        {
           // var tasks = new List<Tasks>();
           var tasks =  _memoryCache.Get<List<Tasks>>("todoList");

            if(tasks == null)
               tasks = new List<Tasks>();
             tasks.Add(task);
                _memoryCache.Set<List<Tasks>>("todoList", tasks);
            
        }

        public void EditTask(Tasks task)
        {
            var tasks = _memoryCache.Get<List<Tasks>>("todoList");
            var findTask = tasks.FirstOrDefault(x => x.Id == task.Id);
            findTask.Name = task.Name;
            findTask.Status = task.Status;
            _memoryCache.Set<List<Tasks>>("todoList", tasks);
        }

        public List<Tasks> GetTasks()
        {
           var tasks = _memoryCache.Get<List<Tasks>>("todoList");
           return tasks;
        }

       
    }
}