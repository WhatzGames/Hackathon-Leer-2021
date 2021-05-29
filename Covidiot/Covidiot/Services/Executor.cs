using System;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using Covidiot.Models;

namespace Covidiot.Services
{
    public class Executor
    {
        public ActiveTimedAction TimedAction { get; }

        public TimedNodeAction NodeAction
        {
            get => TimedAction.CurrentTimedAction;
            private set => TimedAction.CurrentTimedAction = value;
        }

        public Executor([NotNull]ActiveTimedAction timedAction)
        {
            TimedAction = timedAction;
        }

        public async Task Walk(Direction direction) => NodeAction = await JsonReadService.ReadAction(direction switch
            {
                Direction.North => NodeAction.North,
                Direction.East => NodeAction.East,
                Direction.South => NodeAction.South,
                Direction.West => NodeAction.West,
                _ => throw new ArgumentOutOfRangeException(nameof(direction), direction, null)
            });

        public MapNodeCoordinate Do(int index)
        {
            if (index >= NodeAction.Actions.Length)
                return null;
            var action = NodeAction.Actions[index];
            TimedAction.Time -= action.Duration;
            TimedAction.TotalScore += action.Score;
            return action.NewStart;
        }
        
        
        public async Task Jump(string newStart) => 
            NodeAction = await JsonReadService.ReadAction(newStart);
    }
}