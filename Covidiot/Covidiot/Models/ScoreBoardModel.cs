using System.Collections.Generic;

namespace Covidiot.Models
{
    public class ScoreBoardModel
    {
        public List<Player> Players { get; set; }
    }

    public class Player
    {
        public string Name { get; set; }
        public uint Score { get; set; }
    }
    
}