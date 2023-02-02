using ToDoListBusinessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoListBusinessLayer.Interfaces
{
    public interface ITaskService
    {
        List<Tasks> GetTasks();
        void AddTask(Tasks task);
        void EditTask(Tasks task);
    }
}

