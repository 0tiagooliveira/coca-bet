export const TEAM_LOGOS: Record<string, string> = {
  "Athletico-PR": "https://logodetimes.com/wp-content/uploads/athletico-paranaense-325x170.png",
  "Atlético-MG": "https://logodetimes.com/wp-content/uploads/atletico-mineiro-325x170.png",
  "Bahia": "https://logodetimes.com/wp-content/uploads/bahia-325x170.png",
  "Botafogo": "https://logodetimes.com/wp-content/uploads/botafogo-325x170.png",
  "Corinthians": "https://logodetimes.com/wp-content/uploads/corinthians-250x170.png",
  "Coritiba": "https://logodetimes.com/wp-content/uploads/coritiba-250x170.png",
  "Cruzeiro": "https://logodetimes.com/wp-content/uploads/cruzeiro-325x170.png",
  "Cuiabá": "https://logodetimes.com/wp-content/uploads/cuiaba-325x170.png",
  "Flamengo": "https://logodetimes.com/wp-content/uploads/flamengo-325x170.png",
  "Fluminense": "https://logodetimes.com/wp-content/uploads/fluminense-325x170.png",
  "Fortaleza": "https://logodetimes.com/wp-content/uploads/fortaleza-325x170.png",
  "Goiás": "https://logodetimes.com/wp-content/uploads/goias-esporte-clube-325x170.png",
  "Grêmio": "https://logodetimes.com/wp-content/uploads/gremio-325x170.png",
  "Internacional": "https://logodetimes.com/wp-content/uploads/internacional-325x170.png",
  "Mirassol": "https://logodetimes.com/wp-content/uploads/mirassol-250x170.png",
  "Palmeiras": "https://logodetimes.com/wp-content/uploads/palmeiras-250x170.png",
  "Bragantino": "https://logodetimes.com/wp-content/uploads/red-bull-bragantino-325x170.png",
  "Santos": "https://logodetimes.com/wp-content/uploads/santos-250x170.png",
  "São Paulo": "https://logodetimes.com/wp-content/uploads/sao-paulo-250x170.png",
  "Vasco": "https://logodetimes.com/wp-content/uploads/vasco-da-gama-325x170.png",
  "Remo": "https://images.seeklogo.com/logo-png/32/1/clube-do-remo-logo-png_seeklogo-321466.png",
  "Chapecoense": "https://logodetimes.com/wp-content/uploads/chapecoense-250x170.png"
};

export const getTeamLogoClass = (url?: string) => {
  if (url && url.includes("logodetimes.com")) {
    return "w-full h-full object-cover scale-[1.35]";
  }
  return "w-full h-full object-contain";
};
