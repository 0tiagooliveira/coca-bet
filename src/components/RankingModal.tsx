import React, { useEffect, useState } from "react";
import { X, Trophy, Frown } from "lucide-react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { Match } from "./GameCard";
import { handleFirestoreError, OperationType } from "../utils/firestoreErrorHandler";
import { TEAM_LOGOS, getTeamLogoClass } from "../lib/teamLogos";

interface RankingModalProps {
  match: Match;
  onClose: () => void;
}

interface Guess {
  id: string;
  userName: string;
  guessHome: number;
  guessAway: number;
}

export function RankingModal({ match, onClose }: RankingModalProps) {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "palpites"),
      where("matchId", "==", String(match.id)),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedGuesses: Guess[] = [];
      querySnapshot.forEach((doc) => {
        fetchedGuesses.push({ id: doc.id, ...doc.data() } as Guess);
      });
      setGuesses(fetchedGuesses);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching guesses:", error);
      try {
        handleFirestoreError(error, OperationType.GET, "palpites");
      } catch (e) {
        // Logged by handleFirestoreError
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [match.id]);

  const isFinished = match.status === "FINISHED";
  const realHomeScore = match.score?.fullTime?.home;
  const realAwayScore = match.score?.fullTime?.away;

  const winners = guesses.filter(
    (g) => isFinished && g.guessHome === realHomeScore && g.guessAway === realAwayScore
  );
  const losers = guesses.filter(
    (g) => isFinished && (g.guessHome !== realHomeScore || g.guessAway !== realAwayScore)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-gradient-to-r from-blue-950 to-blue-900 text-white">
          <h2 className="text-lg font-bold">
            {isFinished ? "Resultado da Coca" : "Palpites Registrados"}
          </h2>
          <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm overflow-hidden">
              <img
                src={TEAM_LOGOS[match.homeTeam.name] || match.homeTeam.crestUrl || match.homeTeam.crest}
                alt={match.homeTeam.name}
                className={getTeamLogoClass(TEAM_LOGOS[match.homeTeam.name] || match.homeTeam.crestUrl || match.homeTeam.crest)}
                style={{ width: 32, height: 32 }}
              />
            </div>
            <span className="font-bold text-sm">{match.homeTeam.shortName}</span>
          </div>
          
          <div className="px-4 text-center">
            {isFinished ? (
              <div className="text-2xl font-black text-blue-950">
                {realHomeScore} <span className="text-slate-300 font-medium mx-1">-</span> {realAwayScore}
              </div>
            ) : (
              <div className="text-sm font-bold text-slate-400">VS</div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">{match.awayTeam.shortName}</span>
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm overflow-hidden">
              <img
                src={TEAM_LOGOS[match.awayTeam.name] || match.awayTeam.crestUrl || match.awayTeam.crest}
                alt={match.awayTeam.name}
                className={getTeamLogoClass(TEAM_LOGOS[match.awayTeam.name] || match.awayTeam.crestUrl || match.awayTeam.crest)}
                style={{ width: 32, height: 32 }}
              />
            </div>
          </div>
        </div>

        <div className="overflow-y-auto p-4 flex-1">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003366]"></div>
            </div>
          ) : guesses.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>Nenhum palpite registrado para este jogo ainda.</p>
              {!isFinished && <p className="text-sm mt-2">Seja o primeiro a apostar uma Coca!</p>}
            </div>
          ) : isFinished ? (
            <div className="space-y-6">
              <div>
                <h3 className="flex items-center gap-2 text-emerald-600 font-bold mb-3 border-b border-emerald-100 pb-2">
                  <Trophy size={18} /> Vencedores (Coca Grátis)
                </h3>
                {winners.length > 0 ? (
                  <ul className="space-y-2">
                    {winners.map((g) => (
                      <li key={g.id} className="bg-emerald-50 rounded-xl p-3 flex justify-between items-center border border-emerald-100">
                        <span className="font-bold text-emerald-800">{g.userName}</span>
                        <span className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">
                          {g.guessHome} x {g.guessAway}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 text-sm italic">Ninguém acertou o placar exato.</p>
                )}
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-slate-500 font-bold mb-3 border-b border-slate-200 pb-2 mt-6">
                  <Frown size={18} /> Perdedores (Pagam a Coca)
                </h3>
                {losers.length > 0 ? (
                  <ul className="space-y-2">
                    {losers.map((g) => (
                      <li key={g.id} className="bg-slate-100 rounded-xl p-3 flex justify-between items-center border border-slate-200">
                        <span className="font-medium text-slate-600">{g.userName}</span>
                        <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-sm font-bold">
                          {g.guessHome} x {g.guessAway}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 text-sm italic">Nenhum perdedor (milagre!).</p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-slate-700 mb-3">Palpites ({guesses.length})</h3>
              <ul className="space-y-2">
                {guesses.map((g) => (
                  <li key={g.id} className="bg-white rounded-lg p-3 flex justify-between items-center border border-slate-200 shadow-sm">
                    <span className="font-medium text-slate-800">{g.userName}</span>
                    <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-sm font-bold border border-slate-200">
                      {g.guessHome} x {g.guessAway}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
