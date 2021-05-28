using System;
using System.Text.Json.Serialization;

namespace Covidiot.Models
{

    public class MapNodeModel
    {
        private TimedNodeAction[] Actions { get; set; }
    }


    public class TimedNodeAction
    {
        [JsonPropertyName("image")]
        public string Image { get; set; } = "";

        [JsonPropertyName("description")]
        public string Description { get; set; } = "";
        
        [JsonPropertyName("timeOfDayStart")]
        public int TimeOfDayStart { get; set; } = 0;

        [JsonPropertyName("timeOfDayEnd")]
        public int TimeOfDayEnd { get; set; } = 24;


        [JsonPropertyName("actions")]
        public Action[] Actions { get; set; } = new Action[] { };


        [JsonPropertyName("here")]
        public MapNodeCoordinate Here { get; set; } = new MapNodeCoordinate();
        
        [JsonPropertyName("north")]
        public MapNodeCoordinate North { get; set; } = new MapNodeCoordinate();

        [JsonPropertyName("east")]
        public MapNodeCoordinate East { get; set; } = new MapNodeCoordinate();

        [JsonPropertyName("south")]
        public MapNodeCoordinate South { get; set; } = new MapNodeCoordinate();

        [JsonPropertyName("west")]
        public MapNodeCoordinate West { get; set; } = new MapNodeCoordinate();
    }

    public class Action
    {
        [JsonPropertyName("text")]
        public string Text { get; set; } = "";

        [JsonPropertyName("probability")]
        public decimal Probability { get; set; } = 1m;

        [JsonPropertyName("score")]
        public int Score { get; set; } = 0;

        [JsonPropertyName("duration")]
        public int Duration { get; set; } = 1;

        [JsonPropertyName("response")]
        public string Response { get; set; } = "";

        [JsonPropertyName("newStart")]
        public MapNodeCoordinate NewStart { get; set; } = null;
    }
    
    [Serializable]
    public class MapNodeCoordinate
    {
        [JsonPropertyName("xCoordinate")]
        public int XCoordinate { get; set; } = 1;

        [JsonPropertyName("yCoordinate")]
        public char YCoordinate { get; set; } = 'A';
    }
}