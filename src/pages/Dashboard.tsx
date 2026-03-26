import React, { useEffect, useState } from "react";
import { GameCard, Match } from "../components/GameCard";
import { GuessModal } from "../components/GuessModal";
import { RankingModal } from "../components/RankingModal";
import { fetchMatches } from "../services/api";
import { Trophy, Calendar, Loader2, Users } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "motion/react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { handleFirestoreError, OperationType } from "../utils/firestoreErrorHandler";
import { getTeamLogoClass } from "../lib/teamLogos";

export function Dashboard() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [guesses, setGuesses] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMatchForGuess, setSelectedMatchForGuess] = useState<Match | null>(null);
  const [selectedMatchForRanking, setSelectedMatchForRanking] = useState<Match | null>(null);
  const [toast, setToast] = useState<string>("");
  
  // Date range for matches (yesterday to tomorrow)
  const today = new Date();
  const dateFrom = format(subDays(today, 1), "yyyy-MM-dd");
  const dateTo = format(addDays(today, 3), "yyyy-MM-dd");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "palpites"), (snapshot) => {
      const counts: Record<string, number> = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.matchId) {
          counts[data.matchId] = (counts[data.matchId] || 0) + 1;
        }
      });
      setGuesses(counts);
    }, (err) => {
      console.error("Error fetching guesses:", err);
      if (err instanceof Error && err.message.includes("Missing or insufficient permissions")) {
        setError("Erro de permissão no banco de dados. Por favor, atualize as regras do Firestore no console do Firebase para permitir leitura e escrita na coleção 'palpites'.");
      }
      try {
        handleFirestoreError(err, OperationType.LIST, "palpites");
      } catch (e) {
        // Error is thrown by handleFirestoreError, we caught it here to not crash the app completely
        // but it will be logged.
      }
    });
    return () => unsubscribe();
  }, []);

  const loadMatches = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchMatches("BSA,CL,CLI,EC,WC", dateFrom, dateTo);
      // Sort: Scheduled first, then finished
      const sortedMatches = (data.matches || []).sort((a: any, b: any) => {
        if (a.status === "FINISHED" && b.status !== "FINISHED") return 1;
        if (a.status !== "FINISHED" && b.status === "FINISHED") return -1;
        return new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();
      });
      setMatches(sortedMatches);
    } catch (err) {
      console.error("Error loading matches:", err);
      setError("Não foi possível carregar os jogos. Verifique sua conexão ou a chave da API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  // Group matches by date
  const matchesByDate = matches.reduce((acc, match) => {
    const date = format(new Date(match.utcDate), "yyyy-MM-dd");
    if (!acc[date]) acc[date] = [];
    acc[date].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  const sortedDates = Object.keys(matchesByDate).sort();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white py-6 px-4 shadow-lg sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-amber-400 p-2.5 rounded-xl shadow-inner transform -rotate-6">
              <Trophy size={24} className="text-blue-950" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight leading-none">Coca Bet</h1>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-1 opacity-90">
                Quem errar paga a coca
              </p>
            </div>
          </div>
          <button 
            onClick={loadMatches}
            className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
            title="Atualizar jogos"
          >
            <Calendar size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-[#003366] flex items-center gap-2">
              Jogos da Rodada
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Selecione um jogo para palpitar ou ver quem está devendo uma Coca.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="text-[#003366] animate-spin mb-4" />
            <p className="text-slate-500 font-medium animate-pulse">Buscando os jogos...</p>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 text-amber-800 p-8 rounded-2xl text-center shadow-sm"
          >
            <p className="font-bold mb-2 text-lg">Ops! Ocorreu um erro.</p>
            <p className="text-sm opacity-80">{error}</p>
            <button 
              onClick={loadMatches}
              className="mt-6 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-md active:scale-95"
            >
              Tentar Novamente
            </button>
          </motion.div>
        ) : matches.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-b from-white to-slate-50 border border-slate-200 p-12 rounded-3xl text-center shadow-sm flex flex-col items-center justify-center min-h-[40vh]"
          >
            <div className="bg-slate-100 p-6 rounded-full mb-6">
              <Trophy size={56} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-700 mb-2">Nenhum jogo importante nos próximos dias.</h3>
            <p className="text-slate-500 text-lg">Aproveite para beber a Coca que você ganhou ontem!</p>
          </motion.div>
        ) : (
          <div className="space-y-10">
            {/* Horizontal Calendar Strip */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
              {sortedDates.map((date) => {
                const dateObj = new Date(date + "T12:00:00");
                const dayMatches = matchesByDate[date];
                return (
                  <div 
                    key={date} 
                    className="flex-shrink-0 w-32 bg-white border border-slate-200 rounded-2xl p-3 flex flex-col items-center shadow-sm snap-start hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => {
                      document.getElementById(`day-${date}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {format(dateObj, "EEEE", { locale: ptBR }).split('-')[0]}
                    </span>
                    <span className="text-2xl font-black text-blue-950 mb-3">
                      {format(dateObj, "dd/MM")}
                    </span>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {dayMatches.slice(0, 4).map(m => (
                        <div key={m.id} className="relative w-6 h-6">
                          <img src={m.homeTeam.crestUrl || m.homeTeam.crest} alt={m.homeTeam.tla} className={`absolute top-0 left-0 w-4 h-4 rounded-full bg-white border border-slate-200 z-10 ${getTeamLogoClass(m.homeTeam.crestUrl || m.homeTeam.crest)}`} title={m.homeTeam.name} />
                          <img src={m.awayTeam.crestUrl || m.awayTeam.crest} alt={m.awayTeam.tla} className={`absolute bottom-0 right-0 w-4 h-4 rounded-full bg-white border border-slate-200 z-0 ${getTeamLogoClass(m.awayTeam.crestUrl || m.awayTeam.crest)}`} title={m.awayTeam.name} />
                        </div>
                      ))}
                      {dayMatches.length > 4 && (
                        <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500">
                          +{dayMatches.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {sortedDates.map((date, dayIndex) => {
              const matchesForDay = matchesByDate[date];
              const dateObj = new Date(date + "T12:00:00");
              return (
                <div key={date} id={`day-${date}`} className="space-y-4 scroll-mt-24">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-950 text-white px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
                      <Calendar size={18} className="text-blue-300" />
                      <h3 className="font-bold capitalize">
                        {format(dateObj, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                      </h3>
                    </div>
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matchesForDay.map((match, index) => (
                      <motion.div
                        key={match.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (dayIndex * 0.1) + (index * 0.05) }}
                      >
                        <GameCard
                          match={match}
                          guessCount={guesses[match.id] || 0}
                          onGuessClick={setSelectedMatchForGuess}
                          onViewRankingClick={setSelectedMatchForRanking}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {selectedMatchForGuess && (
        <GuessModal
          match={selectedMatchForGuess}
          onClose={() => setSelectedMatchForGuess(null)}
          onSuccess={() => {
            setSelectedMatchForGuess(null);
            setToast("Palpite registrado com sucesso! Boa sorte!");
            setTimeout(() => setToast(""), 3500);
          }}
        />
      )}

      {selectedMatchForRanking && (
        <RankingModal
          match={selectedMatchForRanking}
          onClose={() => setSelectedMatchForRanking(null)}
        />
      )}
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[9999] animate-in fade-in slide-in-from-top-6 duration-300">
          <div className="bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border-2 border-emerald-800/30 min-w-[220px]">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#34d399"/><path d="M8 12.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="font-bold">{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
