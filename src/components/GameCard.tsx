import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TEAM_LOGOS, getTeamLogoClass } from "../lib/teamLogos";

interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest?: string;
  crestUrl?: string;
}

export interface Match {
  id: number;
  competition: {
    name: string;
    emblem: string;
  };
  utcDate: string;
  status: string;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
}

interface GameCardProps {
  match: Match;
  guessCount?: number;
  onGuessClick: (match: Match) => void;
  onViewRankingClick: (match: Match) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ match, guessCount = 0, onGuessClick, onViewRankingClick }) => {
  const isFinished = match.status === "FINISHED";
  const matchDate = new Date(match.utcDate);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-200 overflow-hidden flex flex-col transition-all duration-300">
      <div className="bg-slate-50 px-4 py-3 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-2">
          {match.competition.emblem && (
            <img src={match.competition.emblem} alt={match.competition.name} className="w-5 h-5 object-contain" />
          )}
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            {match.competition.name}
          </span>
        </div>
        <span className="text-xs font-medium text-slate-500">
          {format(matchDate, "dd/MM/yyyy HH:mm", { locale: ptBR })}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-center bg-gradient-to-b from-white to-slate-50/50 relative">
        {guessCount > 0 && (
          <div className="absolute top-3 right-3 bg-amber-400 text-blue-950 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md border border-amber-300 transform rotate-2 z-10">
            <span className="w-2 h-2 rounded-full bg-blue-950 animate-pulse"></span>
            {guessCount} {guessCount === 1 ? 'PALPITE' : 'PALPITES'}
          </div>
        )}
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col items-center flex-1">
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-100 mb-3 overflow-hidden">
              <img
                src={TEAM_LOGOS[match.homeTeam.name] || match.homeTeam.crestUrl || match.homeTeam.crest}
                alt={match.homeTeam.name}
                className={getTeamLogoClass(TEAM_LOGOS[match.homeTeam.name] || match.homeTeam.crestUrl || match.homeTeam.crest)}
                style={{ width: 48, height: 48 }}
              />
            </div>
            <span className="text-sm font-bold text-slate-800 text-center leading-tight">
              {match.homeTeam.shortName || match.homeTeam.name}
            </span>
          </div>

          <div className="flex flex-col items-center px-2">
            {isFinished ? (
              <div className="flex items-center gap-3 text-3xl font-black text-blue-950">
                <span>{match.score.fullTime.home}</span>
                <span className="text-slate-300 text-xl font-medium">-</span>
                <span>{match.score.fullTime.away}</span>
              </div>
            ) : (
              <div className="text-slate-300 font-black text-2xl tracking-widest">VS</div>
            )}
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full mt-3 uppercase tracking-wider ${isFinished ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
              {isFinished ? "FINALIZADO" : "AGENDADO"}
            </span>
          </div>

          <div className="flex flex-col items-center flex-1">
            <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-100 mb-3 overflow-hidden">
              <img
                src={TEAM_LOGOS[match.awayTeam.name] || match.awayTeam.crestUrl || match.awayTeam.crest}
                alt={match.awayTeam.name}
                className={getTeamLogoClass(TEAM_LOGOS[match.awayTeam.name] || match.awayTeam.crestUrl || match.awayTeam.crest)}
                style={{ width: 48, height: 48 }}
              />
            </div>
            <span className="text-sm font-bold text-slate-800 text-center leading-tight">
              {match.awayTeam.shortName || match.awayTeam.name}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex gap-3">
        {!isFinished && (
          <button
            onClick={() => onGuessClick(match)}
            className="flex-1 bg-blue-950 hover:bg-blue-900 text-white font-bold py-2.5 px-4 rounded-xl transition-all text-sm shadow-sm hover:shadow active:scale-95"
          >
            Fazer Palpite
          </button>
        )}
        <button
          onClick={() => onViewRankingClick(match)}
          className={`flex-1 bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-950 hover:text-blue-950 font-bold py-2.5 px-4 rounded-xl transition-all text-sm shadow-sm active:scale-95 ${isFinished ? 'w-full bg-blue-950 text-white border-none hover:bg-blue-900 hover:text-white' : ''}`}
        >
          {isFinished ? "Ver Resultados (Coca)" : "Ver Palpites"}
        </button>
      </div>
    </div>
  );
}
