export type Tier = "capital" | "polo";

export type City = {
  name: string;
  state: string;
  lng: number;
  lat: number;
  tier: Tier;
};

export const CITIES: City[] = [
  // 27 capitais — coastal cities nudged ~5-10km inland so pins read clearly on land at low zoom
  { name: "São Paulo",       state: "SP", lng: -46.633, lat: -23.55, tier: "capital" },
  { name: "Rio de Janeiro",  state: "RJ", lng: -43.230, lat: -22.92, tier: "capital" },
  { name: "Brasília",        state: "DF", lng: -47.929, lat: -15.78, tier: "capital" },
  { name: "Salvador",        state: "BA", lng: -38.580, lat: -13.00, tier: "capital" },
  { name: "Fortaleza",       state: "CE", lng: -38.620, lat: -3.78,  tier: "capital" },
  { name: "Belo Horizonte",  state: "MG", lng: -43.940, lat: -19.92, tier: "capital" },
  { name: "Manaus",          state: "AM", lng: -60.025, lat: -3.10,  tier: "capital" },
  { name: "Curitiba",        state: "PR", lng: -49.273, lat: -25.43, tier: "capital" },
  { name: "Recife",          state: "PE", lng: -34.960, lat: -8.08,  tier: "capital" },
  { name: "Goiânia",         state: "GO", lng: -49.253, lat: -16.68, tier: "capital" },
  { name: "Belém",           state: "PA", lng: -48.560, lat: -1.50,  tier: "capital" },
  { name: "Porto Alegre",    state: "RS", lng: -51.230, lat: -30.03, tier: "capital" },
  { name: "São Luís",        state: "MA", lng: -44.380, lat: -2.58,  tier: "capital" },
  { name: "Maceió",          state: "AL", lng: -35.810, lat: -9.68,  tier: "capital" },
  { name: "Campo Grande",    state: "MS", lng: -54.620, lat: -20.45, tier: "capital" },
  { name: "Natal",           state: "RN", lng: -35.290, lat: -5.83,  tier: "capital" },
  { name: "Teresina",        state: "PI", lng: -42.800, lat: -5.09,  tier: "capital" },
  { name: "João Pessoa",     state: "PB", lng: -34.940, lat: -7.15,  tier: "capital" },
  { name: "Cuiabá",          state: "MT", lng: -56.097, lat: -15.60, tier: "capital" },
  { name: "Aracaju",         state: "SE", lng: -37.140, lat: -10.94, tier: "capital" },
  { name: "Florianópolis",   state: "SC", lng: -48.620, lat: -27.62, tier: "capital" },
  { name: "Vitória",         state: "ES", lng: -40.380, lat: -20.30, tier: "capital" },
  { name: "Macapá",          state: "AP", lng: -51.130, lat: 0.04,   tier: "capital" },
  { name: "Porto Velho",     state: "RO", lng: -63.903, lat: -8.76,  tier: "capital" },
  { name: "Rio Branco",      state: "AC", lng: -67.810, lat: -9.97,  tier: "capital" },
  { name: "Boa Vista",       state: "RR", lng: -60.672, lat: 2.82,   tier: "capital" },
  { name: "Palmas",          state: "TO", lng: -48.360, lat: -10.18, tier: "capital" },

  // ~30 polos regionais (não-capitais)
  { name: "Campinas",            state: "SP", lng: -47.060, lat: -22.91, tier: "polo" },
  { name: "Santos",              state: "SP", lng: -46.420, lat: -23.95, tier: "polo" },
  { name: "São José dos Campos", state: "SP", lng: -45.887, lat: -23.18, tier: "polo" },
  { name: "Sorocaba",            state: "SP", lng: -47.458, lat: -23.50, tier: "polo" },
  { name: "Ribeirão Preto",      state: "SP", lng: -47.810, lat: -21.18, tier: "polo" },
  { name: "São José do Rio Preto", state: "SP", lng: -49.380, lat: -20.82, tier: "polo" },
  { name: "Bauru",               state: "SP", lng: -49.061, lat: -22.32, tier: "polo" },
  { name: "Piracicaba",          state: "SP", lng: -47.649, lat: -22.73, tier: "polo" },
  { name: "Uberlândia",          state: "MG", lng: -48.277, lat: -18.92, tier: "polo" },
  { name: "Juiz de Fora",        state: "MG", lng: -43.350, lat: -21.76, tier: "polo" },
  { name: "Uberaba",             state: "MG", lng: -47.939, lat: -19.75, tier: "polo" },
  { name: "Montes Claros",       state: "MG", lng: -43.862, lat: -16.74, tier: "polo" },
  { name: "Niterói",             state: "RJ", lng: -43.103, lat: -22.88, tier: "polo" },
  { name: "Petrópolis",          state: "RJ", lng: -43.179, lat: -22.51, tier: "polo" },
  { name: "Volta Redonda",       state: "RJ", lng: -44.103, lat: -22.52, tier: "polo" },
  { name: "Vila Velha",          state: "ES", lng: -40.296, lat: -20.33, tier: "polo" },
  { name: "Serra",               state: "ES", lng: -40.308, lat: -20.13, tier: "polo" },
  { name: "Caxias do Sul",       state: "RS", lng: -51.180, lat: -29.17, tier: "polo" },
  { name: "Pelotas",             state: "RS", lng: -52.341, lat: -31.77, tier: "polo" },
  { name: "Santa Maria",         state: "RS", lng: -53.807, lat: -29.69, tier: "polo" },
  { name: "Joinville",           state: "SC", lng: -48.846, lat: -26.30, tier: "polo" },
  { name: "Blumenau",            state: "SC", lng: -49.066, lat: -26.92, tier: "polo" },
  { name: "Londrina",            state: "PR", lng: -51.165, lat: -23.31, tier: "polo" },
  { name: "Maringá",             state: "PR", lng: -51.938, lat: -23.42, tier: "polo" },
  { name: "Foz do Iguaçu",       state: "PR", lng: -54.585, lat: -25.55, tier: "polo" },
  { name: "Feira de Santana",    state: "BA", lng: -38.967, lat: -12.27, tier: "polo" },
  { name: "Vitória da Conquista", state: "BA", lng: -40.839, lat: -14.86, tier: "polo" },
  { name: "Caruaru",             state: "PE", lng: -35.976, lat: -8.28,  tier: "polo" },
  { name: "Imperatriz",          state: "MA", lng: -47.498, lat: -5.53,  tier: "polo" },
  { name: "Anápolis",            state: "GO", lng: -48.950, lat: -16.33, tier: "polo" },
];
