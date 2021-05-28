using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Covidiot.Models;
using Covidiot.Services;

namespace Covidiot.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ActiveTimedAction _currentState;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            _currentState = new ActiveTimedAction
            {
                CurrentAction = JsonReadService.ReadAction(new MapNodeCoordinate{XCoordinate = 4, YCoordinate = 'D'}).GetAwaiter().GetResult()
            };
        }

        public async Task<IActionResult> Index()
        {
            _currentState.CurrentAction = await JsonReadService.ReadAction(_currentState.CurrentAction.Here);
           
            return View(_currentState);
        }
        
        public IActionResult Effect()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
        }
    }
}