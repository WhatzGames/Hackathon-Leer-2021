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
        public int TotalScore { get; set; }

        public string Risc { get; set; }
    }
}