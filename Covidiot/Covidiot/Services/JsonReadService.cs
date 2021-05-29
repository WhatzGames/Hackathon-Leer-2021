using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Covidiot.Models;

namespace Covidiot.Services
{
    public static class JsonReadService
    {
        public static Task<TimedNodeAction> ReadAction(MapNodeCoordinate coordinate) =>
            ReadAction($"{coordinate.XCoordinate}{coordinate.YCoordinate}");
        internal static async Task<TimedNodeAction> ReadAction(string tileCoordinate)
        {
            var location = Path.Join(Startup.DataDirectory, $"{tileCoordinate}.json");
            var reader = File.Open(location, FileMode.Open, FileAccess.Read);
            var model = await JsonSerializer.DeserializeAsync<TimedNodeAction>(reader);
            reader.Close();
            return model;
        }
    }
}