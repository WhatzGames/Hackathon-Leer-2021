using System.Runtime.Serialization;

namespace Covidiot.Models
{
    public enum Direction
    {
        [EnumMember(Value = "Nord")]
        North,
        [EnumMember(Value = "Ost")]
        East,
        [EnumMember(Value = "Süd")]
        South,
        [EnumMember(Value = "West")]
        West
    }
}