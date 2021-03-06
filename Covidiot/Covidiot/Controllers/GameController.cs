using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Covidiot.Models;
using Covidiot.Services;
using Microsoft.AspNetCore.Mvc;

namespace Covidiot.Controllers
{
    [Route("api/[controller]")]
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
                Time = 24,
                CurrentTimedAction = JsonReadService.ReadAction(new MapNodeCoordinate{XCoordinate = 4, YCoordinate = 'E'}).GetAwaiter().GetResult(),
            };
            return Sessions[guid] = new Executor(activeTimedAction);
        }

        [HttpGet("globalData")]
        public ActiveTimedAction GetActiveTimedAction(string guid) => GetExecutor(guid).TimedAction;

        [HttpGet("timedAction")]
        public TimedNodeAction GetTimedAction(string guid) => GetExecutor(guid).NodeAction;

        [HttpGet("walk")]
        public Task Walk(string guid, string direction) => GetExecutor(guid).Walk(direction switch
            {
                "Nord" => Direction.North,
                "Ost" => Direction.East,
                "Süd" => Direction.South,
                "West" => Direction.West,
                _ => throw new ArgumentOutOfRangeException(nameof(direction), direction, null)
            });

        [HttpGet("do")]
        public MapNodeCoordinate Do(string guid, int index) => GetExecutor(guid).Do(index);
        
        [HttpGet("jump")]
        public Task Jump(string guid, string newStart) => GetExecutor(guid).Jump(newStart);

        [HttpGet("Add")]
        public async Task Add(string name, float score) => await _scoreboardService.Add(new Player()
        {
            Name = name, Score = score * 0.01f
        });

    }
}