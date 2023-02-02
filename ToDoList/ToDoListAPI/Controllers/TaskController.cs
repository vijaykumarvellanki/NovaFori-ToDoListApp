
using ToDoListBusinessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using ToDoListBusinessLayer.Interfaces;

namespace ToDoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [Route("GetTasks")]
        [HttpGet]
        public IActionResult GetTasks()
        {
            var tasks = _taskService.GetTasks();

            return Ok(tasks);
        }

        [Route("AddTask")]
        [HttpPost]
        public IActionResult PostTask(Tasks task) 
        {
            _taskService.AddTask(task);
            return Ok();
        }

        [Route("EditTask")]
        [HttpPost]
        public IActionResult EditTask(Tasks task)
        {
            
            _taskService.EditTask(task);
            return Ok();
        }
    }
    
}
