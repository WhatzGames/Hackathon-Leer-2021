using System.Text.Json.Serialization;

namespace Covidiot.Models
{
    public class MapNodeModel
    {
        private TimedNodeAction[] Actions { get; set; }
    }

    public class TimedNodeAction
    {
        [JsonPropertyName("description")]
        public string Description { get; set; }
        
        [JsonPropertyName("timeOfDayStart")]
        public int TimeOfDayStart { get; set; }
        
        [JsonPropertyName("timeOfDayEnd")]
        public int TimeOfDayEnd { get; set; }
        

        [JsonPropertyName("action1")]
        public Action Action1  { get; set; }
        
        [JsonPropertyName("action2")]
        public Action Action2  { get; set; }
        
        [JsonPropertyName("action3")]
        public Action Action3  { get; set; }
        
        
        [JsonPropertyName("here")]
        public MapNodeCoordinate Here { get; set; }
        
        [JsonPropertyName("north")]
        public MapNodeCoordinate North { get; set; }

        [JsonPropertyName("east")]
        public MapNodeCoordinate East { get; set; }
        
        [JsonPropertyName("south")]
        public MapNodeCoordinate South { get; set; }
        
        [JsonPropertyName("west")]
        public MapNodeCoordinate West { get; set; }
    }

    public class Action
    {
        [JsonPropertyName("text")]
        public string Text { get; set; }
        
        [JsonPropertyName("probability")]
        public decimal Probability { get; set; }
        
        [JsonPropertyName("score")]
        public int Score { get; set; }
        
        [JsonPropertyName("response")]
        public string Response { get; set; }
        
        [JsonPropertyName("newStart")]
        public MapNodeCoordinate NewStart { get; set; }
    }

    public class MapNodeCoordinate
    {
        [JsonPropertyName("xCoordinate")]
        public int XCoordinate { get; set; }
        
        [JsonPropertyName("yCoordinate")]
        public char YCoordinate { get; set; }
    }
}