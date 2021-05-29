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
        [JsonPropertyName("risc")]
        public string Risc { get; set; }
    }
}