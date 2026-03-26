import React, { useState } from "react";
import { X } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { Match } from "./GameCard";
import { handleFirestoreError, OperationType } from "../utils/firestoreErrorHandler";
import { TEAM_LOGOS, getTeamLogoClass } from "../lib/teamLogos";

interface GuessModalProps {
  match: Match;
  onClose: () => void;
  onSuccess: () => void;
}

export function GuessModal({ match, onClose, onSuccess }: GuessModalProps) {
  const [userName, setUserName] = useState("");
  const [guessHome, setGuessHome] = useState<number | "">("");
  const [guessAway, setGuessAway] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      setError("Por favor, insira seu nome ou apelido.");
      return;
    }
    
    if (guessHome === "" || guessAway === "") {
      setError("Por favor, preencha o placar completo.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await addDoc(collection(db, "palpites"), {
        matchId: String(match.id),
        userName: userName.trim(),
        guessHome: Number(guessHome),
        guessAway: Number(guessAway),
        timestamp: serverTimestamp(),
      });
      
      onSuccess();
    } catch (err) {
      console.error("Erro ao salvar palpite:", err);
      if (err instanceof Error && err.message.includes("Missing or insufficient permissions")) {
        setError("Erro de permissão. Atualize as regras do Firestore no console do Firebase para permitir a criação de palpites.");
      } else {
        setError("Erro ao salvar o palpite. Tente novamente.");
      }
      try {
        handleFirestoreError(err, OperationType.CREATE, "palpites");
      } catch (e) {
        // Logged by handleFirestoreError
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-gradient-to-r from-blue-950 to-blue-900 text-white">
          <h2 className="text-lg font-bold">Novo Palpite</h2>
          <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 bg-slate-50/50">
          <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex flex-col items-center w-1/3">
              <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full shadow-sm border border-slate-100 mb-2 overflow-hidden">
                <img
                  src={TEAM_LOGOS[match.homeTeam.name] || match.homeTeam.crestUrl || match.homeTeam.crest}
                  alt={match.homeTeam.name}
                  className={getTeamLogoClass(TEAM_LOGOS[match.homeTeam.name] || match.homeTeam.crestUrl || match.homeTeam.crest)}
                  style={{ width: 40, height: 40 }}
                />
              </div>
              <span className="text-xs font-bold text-center text-slate-700">{match.homeTeam.shortName}</span>
            </div>
            <div className="text-sm font-black text-slate-300 tracking-widest">VS</div>
            <div className="flex flex-col items-center w-1/3">
              <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full shadow-sm border border-slate-100 mb-2 overflow-hidden">
                <img
                  src={TEAM_LOGOS[match.awayTeam.name] || match.awayTeam.crestUrl || match.awayTeam.crest}
                  alt={match.awayTeam.name}
                  className={getTeamLogoClass(TEAM_LOGOS[match.awayTeam.name] || match.awayTeam.crestUrl || match.awayTeam.crest)}
                  style={{ width: 40, height: 40 }}
                />
              </div>
              <span className="text-xs font-bold text-center text-slate-700">{match.awayTeam.shortName}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Seu Nome / Apelido
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Ex: Joãozinho"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-950/10 focus:border-blue-950 outline-none transition-all text-slate-800 font-medium"
                maxLength={30}
              />
            </div>

            <div className="flex items-center justify-center gap-6 py-2">
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={guessHome}
                  onChange={(e) => setGuessHome(e.target.value ? Number(e.target.value) : "")}
                  className="w-20 h-20 text-center text-3xl font-black text-blue-950 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-950/10 focus:border-blue-950 outline-none transition-all shadow-sm"
                />
              </div>
              <span className="text-2xl font-black text-slate-300">-</span>
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={guessAway}
                  onChange={(e) => setGuessAway(e.target.value ? Number(e.target.value) : "")}
                  className="w-20 h-20 text-center text-3xl font-black text-blue-950 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-950/10 focus:border-blue-950 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {error && <p className="text-amber-600 text-sm text-center font-bold bg-amber-50 p-3 rounded-xl border border-amber-100">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-3.5 px-4 rounded-xl transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
            >
              {isSubmitting ? "Enviando..." : "Confirmar Palpite"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
