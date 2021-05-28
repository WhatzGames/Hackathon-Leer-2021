namespace Covidiot.Models
{
    public class ActiveTimedAction
    {
        public TimedNodeAction CurrentTimedAction { get; set; }
        public short Time { get; set; }
        public int TotalScore { get; set; }
    }
}