using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Covidiot.Models;

namespace Covidiot.Services
{
    public class ScoreboardService
    {
        private static readonly string ScorePath = Path.Join(AppDomain.CurrentDomain.BaseDirectory, "/Data/Scoreboard.json");

        private static async Task<ScoreBoardModel> Read() 
            => JsonSerializer.Deserialize<ScoreBoardModel>(await File.ReadAllTextAsync(ScorePath));
        
        public async Task<Player[]> GetTop10()
            => (await Read()).Players.OrderByDescending(x => x.Score).Take(10).ToArray();

        public async Task Add(Player model)
        {
            var currentObject = await Read();
            var players = currentObject.Players;
            
            players.Add(model);
            currentObject.Players = players;
            
            await using var filestream = File.Open(ScorePath, FileMode.Open);
            
            filestream.SetLength(0);
            filestream.Close();
            await File.AppendAllTextAsync(ScorePath, JsonSerializer.Serialize(currentObject));
            filestream.Close();
        }

    }
}