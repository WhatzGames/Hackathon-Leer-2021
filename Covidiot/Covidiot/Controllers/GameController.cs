using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Covidiot.Models;
using Covidiot.Services;
using Microsoft.AspNetCore.Mvc;

namespace Covidiot.Controllers
{
    [Route("[controller]")]
    public class GameController : ControllerBase
    {

        private static readonly IDictionary<string, Executor> Sessions;

        static GameController()
        {
            Sessions = new Dictionary<string, Executor>();
        }
        
        private readonly ScoreboardService _scoreboardService;
        public GameController(ScoreboardService scoreboardService)
        {
            _scoreboardService = scoreboardService;
        }

        private static Executor GetExecutor(string guid)
        {
            if (Sessions.ContainsKey(guid))
                return Sessions[guid];
            var activeTimedAction = new ActiveTimedAction
            {
                CurrentTimedAction = JsonReadService.ReadAction(new MapNodeCoordinate{XCoordinate = 3, YCoordinate = 'A'}).GetAwaiter().GetResult(),
            };
            return Sessions[guid] = new Executor(activeTimedAction);
        }

        [HttpGet("timedaction")]
        public TimedNodeAction GetTimedAction(string guid) => GetExecutor(guid).NodeAction;

        [HttpGet("walk/{guid}")]
        public Task Walk(string guid, Direction direction) => GetExecutor(guid).Walk(direction);
        
        [HttpGet("do/{guid}")]
        public void Do(string guid, ushort action) => GetExecutor(guid).Do(action);
    }
}