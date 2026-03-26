import { TEAM_LOGOS } from '../lib/teamLogos';

export const fetchMatches = async (competitions = "BSA,CL,CLI,EC,WC", dateFrom?: string, dateTo?: string) => {
  // Retornando os dados mockados conforme solicitado pelo usuário
  const data = {
    matches: [
      {
        id: 1001,
        competition: { name: "Amistosos 2026", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/512px-Soccerball.svg.png" },
        utcDate: "2026-03-26T20:00:00Z", // hoje 17:00 BRT
        status: "SCHEDULED",
        homeTeam: { id: 1, name: "Brasil", shortName: "Brasil", tla: "BRA", crest: "https://flagcdn.com/w80/br.png" },
        awayTeam: { id: 2, name: "França", shortName: "França", tla: "FRA", crest: "https://flagcdn.com/w80/fr.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1002,
        competition: { name: "Amistosos de Seleções", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/512px-Soccerball.svg.png" },
        utcDate: "2026-03-28T17:00:00Z", // 28/03 14:00 BRT
        status: "SCHEDULED",
        homeTeam: { id: 3, name: "Escócia", shortName: "Escócia", tla: "SCO", crest: "https://flagcdn.com/w80/gb-sct.png" },
        awayTeam: { id: 4, name: "Japão", shortName: "Japão", tla: "JPN", crest: "https://flagcdn.com/w80/jp.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1003,
        competition: { name: "Amistosos de Seleções", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/512px-Soccerball.svg.png" },
        utcDate: "2026-03-29T00:00:00Z", // 28/03 21:00 BRT
        status: "SCHEDULED",
        homeTeam: { id: 5, name: "Haiti", shortName: "Haiti", tla: "HAI", crest: "https://flagcdn.com/w80/ht.png" },
        awayTeam: { id: 6, name: "Tunísia", shortName: "Tunísia", tla: "TUN", crest: "https://flagcdn.com/w80/tn.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1004,
        competition: { name: "Amistosos de Seleções", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/512px-Soccerball.svg.png" },
        utcDate: "2026-03-29T01:00:00Z", // 28/03 22:00 BRT
        status: "SCHEDULED",
        homeTeam: { id: 7, name: "México", shortName: "México", tla: "MEX", crest: "https://flagcdn.com/w80/mx.png" },
        awayTeam: { id: 8, name: "Portugal", shortName: "Portugal", tla: "POR", crest: "https://flagcdn.com/w80/pt.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1005,
        competition: { name: "Campeonato Brasileiro", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg/512px-Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg.png" },
        utcDate: "2026-03-29T22:30:00Z", // 29/03 19:30 BRT
        status: "SCHEDULED",
        homeTeam: { id: 9, name: "Athletico-PR", shortName: "Athletico-PR", tla: "CAP", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/CA_Paranaense.svg/512px-CA_Paranaense.svg.png" },
        awayTeam: { id: 10, name: "Botafogo", shortName: "Botafogo", tla: "BOT", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Escudo_Botafogo.svg/512px-Escudo_Botafogo.svg.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1006,
        competition: { name: "Amistosos de Seleções", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/512px-Soccerball.svg.png" },
        utcDate: "2026-03-29T20:00:00Z", // 29/03 17:00 BRT
        status: "SCHEDULED",
        homeTeam: { id: 11, name: "Colômbia", shortName: "Colômbia", tla: "COL", crest: "https://flagcdn.com/w80/co.png" },
        awayTeam: { id: 2, name: "França", shortName: "França", tla: "FRA", crest: "https://flagcdn.com/w80/fr.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1007,
        competition: { name: "Amistosos 2026", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/512px-Soccerball.svg.png" },
        utcDate: "2026-04-01T00:00:00Z", // 31/03 21:00 BRT
        status: "SCHEDULED",
        homeTeam: { id: 1, name: "Brasil", shortName: "Brasil", tla: "BRA", crest: "https://flagcdn.com/w80/br.png" },
        awayTeam: { id: 12, name: "Croácia", shortName: "Croácia", tla: "CRO", crest: "https://flagcdn.com/w80/hr.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1008,
        competition: { name: "Campeonato Brasileiro", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg/512px-Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg.png" },
        utcDate: "2026-04-01T22:30:00Z", // 01/04 19:30 BRT
        status: "SCHEDULED",
        homeTeam: { id: 13, name: "Internacional", shortName: "Internacional", tla: "INT", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/512px-Escudo_do_Sport_Club_Internacional.svg.png" },
        awayTeam: { id: 14, name: "São Paulo", shortName: "São Paulo", tla: "SAO", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/S%C3%A3o_Paulo_Futebol_Clube.svg/512px-S%C3%A3o_Paulo_Futebol_Clube.svg.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1009,
        competition: { name: "Campeonato Brasileiro", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg/512px-Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg.png" },
        utcDate: "2026-04-01T22:30:00Z", // 01/04 19:30 BRT
        status: "SCHEDULED",
        homeTeam: { id: 10, name: "Botafogo", shortName: "Botafogo", tla: "BOT", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Escudo_Botafogo.svg/512px-Escudo_Botafogo.svg.png" },
        awayTeam: { id: 15, name: "Mirassol", shortName: "Mirassol", tla: "MIR", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Mirassol_fc.svg/512px-Mirassol_fc.svg.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1010,
        competition: { name: "Campeonato Brasileiro", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg/512px-Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg.png" },
        utcDate: "2026-04-01T23:00:00Z", // 01/04 20:00 BRT
        status: "SCHEDULED",
        homeTeam: { id: 16, name: "Bahia", shortName: "Bahia", tla: "BAH", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Esporte_Clube_Bahia_logo.svg/512px-Esporte_Clube_Bahia_logo.svg.png" },
        awayTeam: { id: 9, name: "Athletico-PR", shortName: "Athletico-PR", tla: "CAP", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/CA_Paranaense.svg/512px-CA_Paranaense.svg.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1011,
        competition: { name: "Campeonato Brasileiro", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg/512px-Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg.png" },
        utcDate: "2026-04-02T22:00:00Z", // 02/04 19:00 BRT
        status: "SCHEDULED",
        homeTeam: { id: 17, name: "Santos", shortName: "Santos", tla: "SAN", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Santos_Logo.png/512px-Santos_Logo.png" },
        awayTeam: { id: 18, name: "Remo", shortName: "Remo", tla: "REM", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Clube_do_Remo.svg/512px-Clube_do_Remo.svg.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1012,
        competition: { name: "Campeonato Brasileiro", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg/512px-Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg.png" },
        utcDate: "2026-04-02T22:00:00Z", // 02/04 19:00 BRT
        status: "SCHEDULED",
        homeTeam: { id: 19, name: "Chapecoense", shortName: "Chapecoense", tla: "CHA", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Associa%C3%A7%C3%A3o_Chapecoense_de_Futebol_-_Escudo.svg/512px-Associa%C3%A7%C3%A3o_Chapecoense_de_Futebol_-_Escudo.svg.png" },
        awayTeam: { id: 20, name: "Atlético-MG", shortName: "Atlético-MG", tla: "CAM", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Atletico_mineiro_galo.png/512px-Atletico_mineiro_galo.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1013,
        competition: { name: "Campeonato Brasileiro", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg/512px-Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg.png" },
        utcDate: "2026-04-03T00:30:00Z", // 02/04 21:30 BRT
        status: "SCHEDULED",
        homeTeam: { id: 21, name: "Palmeiras", shortName: "Palmeiras", tla: "PAL", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/512px-Palmeiras_logo.svg.png" },
        awayTeam: { id: 22, name: "Grêmio", shortName: "Grêmio", tla: "GRE", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Escudo_do_Gremio.svg/512px-Escudo_do_Gremio.svg.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1014,
        competition: { name: "Campeonato Brasileiro", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg/512px-Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg.png" },
        utcDate: "2026-04-04T21:30:00Z", // 04/04 18:30 BRT
        status: "SCHEDULED",
        homeTeam: { id: 14, name: "São Paulo", shortName: "São Paulo", tla: "SAO", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/S%C3%A3o_Paulo_Futebol_Clube.svg/512px-S%C3%A3o_Paulo_Futebol_Clube.svg.png" },
        awayTeam: { id: 23, name: "Cruzeiro", shortName: "Cruzeiro", tla: "CRU", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg/512px-Cruzeiro_Esporte_Clube_%28logo%29.svg.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1015,
        competition: { name: "Campeonato Brasileiro", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg/512px-Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg.png" },
        utcDate: "2026-04-04T23:30:00Z", // 04/04 20:30 BRT
        status: "SCHEDULED",
        homeTeam: { id: 24, name: "Coritiba", shortName: "Coritiba", tla: "CFC", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coritiba_FBC.svg/512px-Coritiba_FBC.svg.png" },
        awayTeam: { id: 25, name: "Fluminense", shortName: "Fluminense", tla: "FLU", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Escudo_Fluminense.svg/512px-Escudo_Fluminense.svg.png" },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 1016,
        competition: { name: "Campeonato Brasileiro", emblem: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg/512px-Campeonato_Brasileiro_S%C3%A9rie_A_logo.svg.png" },
        utcDate: "2026-04-05T00:00:00Z", // 04/04 21:00 BRT
        status: "SCHEDULED",
        homeTeam: { id: 26, name: "Vasco", shortName: "Vasco", tla: "VAS", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/CRVascodaGama.png/512px-CRVascodaGama.png" },
        awayTeam: { id: 10, name: "Botafogo", shortName: "Botafogo", tla: "BOT", crest: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Escudo_Botafogo.svg/512px-Escudo_Botafogo.svg.png" },
        score: { fullTime: { home: null, away: null } }
      }
    ]
  };

  (data.matches as any[]).forEach(match => {
    // Update competition emblems
    if (match.competition.name.includes("Amistosos")) {
      match.competition.emblem = "https://cdn-icons-png.flaticon.com/256/53/53283.png";
    } else if (match.competition.name === "Campeonato Brasileiro") {
      match.competition.emblem = "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fleaguelogos%2Fsoccer%2F500%2F85.png";
    }

    if (TEAM_LOGOS[match.homeTeam.name]) {
      match.homeTeam.crest = TEAM_LOGOS[match.homeTeam.name];
      match.homeTeam.crestUrl = TEAM_LOGOS[match.homeTeam.name];
    }
    if (TEAM_LOGOS[match.awayTeam.name]) {
      match.awayTeam.crest = TEAM_LOGOS[match.awayTeam.name];
      match.awayTeam.crestUrl = TEAM_LOGOS[match.awayTeam.name];
    }
  });

  return data;
};
