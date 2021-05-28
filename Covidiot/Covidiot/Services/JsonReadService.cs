using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Covidiot.Models;

namespace Covidiot.Services
{
    public static class JsonReadService
    {
        private static readonly string Directory;
        static JsonReadService()
        {
            Directory = Path.Join(Environment.CurrentDirectory, "Data");
        }
        
        public static async Task<TimedNodeAction> ReadAction(string filename)
        {
            var location = Path.Join(Directory, $"{filename}.json");
            var reader = File.Open(location, FileMode.Open, FileAccess.Read);
            var model = await JsonSerializer.DeserializeAsync<TimedNodeAction>(reader);
            reader.Close();
            return model;
        }
    }
}