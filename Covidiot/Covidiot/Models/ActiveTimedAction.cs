using System.Text.Json.Serialization;

namespace Covidiot.Models
{
    public class ActiveTimedAction
    {
        [JsonIgnore]
        public TimedNodeAction CurrentTimedAction { get; set; }
        [JsonPropertyName("time")]
        public short Time { get; set; }

        [JsonPropertyName("totalScore")] 
        public string TotalScore => $"{TotalScoreValue:N}";
        [JsonIgnore]
        public float TotalScoreValue { get; set; }

        [JsonPropertyName("risk")] 
        public string Risk => TotalScoreValue switch
        {
            < 0 => "Merkelgefolge",
            >= 0 and <= 30 => "Gering",
            > 30 and <= 50 => "Mittel",
            > 50 and <= 100 => "Hoch",
            > 100 => "Covidiot",
            _ => string.Empty
        };
    }
}