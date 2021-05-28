using System.Threading.Tasks;
using Covidiot.Models;
using Covidiot.Services;
using Microsoft.AspNetCore.Mvc;

namespace Covidiot.Controllers
{
    public class GameController : ControllerBase
    {
        private readonly ScoreboardService _scoreboardService;
        private readonly Executor _executor;
        public GameController(ScoreboardService scoreboardService)
        {
            _scoreboardService = scoreboardService;
            var activeTimedAction = new ActiveTimedAction
            {
                CurrentTimedAction = JsonReadService.ReadAction(new MapNodeCoordinate{XCoordinate = 3, YCoordinate = 'A'}).GetAwaiter().GetResult(),
            };
            _executor = new Executor(activeTimedAction);
        }

        public TimedNodeAction GetTimedAction()
        {
            return _executor.NodeAction;
        }

        public Task Walk(Direction direction) => _executor.Walk(direction);

        public void Do(ushort action) => _executor.Do(action);
    }
}