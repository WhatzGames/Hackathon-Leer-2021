namespace Covidiot.Models
{
    public class ScoreBoardModel
    {
        public Player[] Players { get; set; }
    }

    public class Player
    {
        public string Name { get; set; }
        public uint Score { get; set; }
    }
    
}