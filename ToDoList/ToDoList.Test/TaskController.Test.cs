using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using NUnit.Framework;
using ToDoListAPI.Controllers;
using ToDoListBusinessLayer.Interfaces;
using ToDoListBusinessLayer.Models;

namespace ToDoList.Test
{
    [TestFixture]
    public class Tests
    {
        TaskController taskController;
        [SetUp]
        public void Setup()
        {
            taskController = new TaskController(Substitute.For<ITaskService>());
        }

        [Test]
        public void Tasks_GetAllTasks()
        {  
            var tasks = taskController.GetTasks();
            Assert.IsNotNull(tasks);
            Assert.That(((OkObjectResult)tasks).StatusCode, Is.EqualTo(200));
        }

        [Test]
        public void Tasks_AddTask()
        {  
            var task = new Tasks
                {   Id="" ,
                    Name="task1",
                    Status="Pending"
                };
           
            var tasks = taskController.PostTask(task);
            Assert.IsNotNull(tasks);
            Assert.That(((OkResult)tasks).StatusCode, Is.EqualTo(200));
        }

        [Test]
        public void Tasks_EditTask()
        {
            var task = new Tasks
            {
                Id = "",
                Name = "task2",
                Status = "Completed"
            };

            var tasks = taskController.EditTask(task);
            Assert.IsNotNull(tasks);
            Assert.That(((OkResult)tasks).StatusCode, Is.EqualTo(200));
        }
    }
}