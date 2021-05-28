using System;
using System.Diagnostics;
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
            _currentState = new ActiveTimedAction();
        }

        public async Task<IActionResult> Index()
        {
            _currentState.CurrentAction = await JsonReadService.ReadAction("3A");
           
            return View(_currentState);
        }

        public IActionResult ScoreBoard()
        {
            return View();
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