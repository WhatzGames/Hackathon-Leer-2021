namespace Covidiot.Models
{
    public class MapNodeModel
    {
        private TimedNodeAction[] Actions { get; set; }
    }

    public class TimedNodeAction
    {
        public string Description { get; set; }
        public int TimeOfDayStart { get; set; }
        public int TimeOfDayEnd { get; set; }
        
        public Action Action1  { get; set; }
        public Action Action2  { get; set; }
        public Action Action3  { get; set; }

        public MapNodeCoordinate Here { get; set; }
        public MapNodeCoordinate North { get; set; }
        public MapNodeCoordinate East { get; set; }
        public MapNodeCoordinate South { get; set; }
        public MapNodeCoordinate West { get; set; }
    }

    public class Action
    {
        public string Text { get; set; }
        public decimal Probability { get; set; }
        public int Score { get; set; }
        public string Response { get; set; }
        public MapNodeCoordinate NewStart { get; set; }
    }

    public class MapNodeCoordinate
    {
        public int XCoordinate { get; set; }
        public char YCoordinate { get; set; }
    }
}