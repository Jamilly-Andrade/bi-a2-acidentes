import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from './lib/supabase';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  Skull,
  AlertTriangle,
  Users,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Sun,
  Moon,
  Sunset,
  Sunrise,
  Activity,
  MapPin,
  Calendar,
  Eye,
  RotateCcw
} from 'lucide-react';

// Fotos conceituais de rodovias, asfalto, neblina e luzes noturnas
const HERO_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    title: 'O Asfalto Molhado',
    caption: 'Falta de aderência e velocidade incompatível'
  },
  {
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    title: 'A Neblina da Madrugada',
    caption: 'Amanhecer com visibilidade crítica'
  },
  {
    url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
    title: 'A Velocidade Noturna',
    caption: 'O silêncio mortal das rodovias vazias'
  },
  {
    url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    title: 'Faróis na Escuridão',
    caption: 'Ofuscamento visual e pista simples'
  },
  {
    url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=800&q=80',
    title: 'O Crepúsculo Cego',
    caption: 'Anoitecer: a transição mais perigosa'
  },
  {
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    title: 'A Extensão Federal',
    caption: 'Milhares de quilômetros sob vigília da PRF'
  },
  {
    url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    title: 'Lanternas Vermelhas',
    caption: 'O rastro das frenagens de emergência'
  },
  {
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
    title: 'A Reta Interminável',
    caption: 'Monotonia que induz ao sono ao volante'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedFase, setSelectedFase] = useState('Plena Noite');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca inicial de dados agregados no Supabase
  useEffect(() => {
    async function loadData() {
      try {
        const { data: rows, error } = await supabase
          .from('ocorrencias_agrupadas')
          .select('*')
          .limit(3000);

        if (!error && rows) {
          setData(rows);
        }
      } catch (err) {
        console.error('Erro de conexão Supabase:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Dados consolidados do Gráfico 1 (Fase do Dia)
  const faseDiaStats = useMemo(() => {
    return [
      {
        fase: 'Pleno dia',
        acidentes: 214500,
        mortos: 13100,
        taxaMortalidade: '6,10%',
        descricao: 'Maior volume de tráfego e colisões traseiras, com letalidade proporcionalmente menor.',
        icone: Sun,
        tema: 'bg-neutral-900 border-neutral-700 text-neutral-200'
      },
      {
        fase: 'Plena Noite',
        acidentes: 126200,
        mortos: 11450,
        taxaMortalidade: '9,07%',
        descricao: 'Tráfego reduzido com velocidade excessiva, álcool e colisões frontais gravíssimas.',
        icone: Moon,
        tema: 'bg-black border-red-700 text-red-100 shadow-[0_0_30px_rgba(220,38,38,0.25)]'
      },
      {
        fase: 'Anoitecer',
        acidentes: 31800,
        mortos: 2980,
        taxaMortalidade: '9,37%',
        descricao: 'O paradoxo visual: motoristas demoram a acender faróis e a visão sofre com a transição da luz.',
        icone: Sunset,
        tema: 'bg-amber-950/40 border-amber-700 text-amber-100'
      },
      {
        fase: 'Amanhecer',
        acidentes: 18379,
        mortos: 1618,
        taxaMortalidade: '8,80%',
        descricao: 'Pico de sonolência e neblina densa, provocando saídas de pista sem frenagem prévia.',
        icone: Sunrise,
        tema: 'bg-slate-900 border-cyan-800 text-cyan-100'
      }
    ];
  }, []);

  const currentFaseInfo = useMemo(() => {
    return faseDiaStats.find(f => f.fase === selectedFase) || faseDiaStats[1];
  }, [selectedFase, faseDiaStats]);

  // Dados consolidados do Gráfico 2 (Causas)
  const causasStats = [
    { causa: 'Falta de atenção / Reação tardia', total: 190700, mortos: 11200 },
    { causa: 'Velocidade incompatível', total: 58900, mortos: 6800 },
    { causa: 'Ingestão de álcool pelo condutor', total: 41200, mortos: 4300 },
    { causa: 'Desobediência à sinalização', total: 36500, mortos: 3100 },
    { causa: 'Defeito mecânico no veículo', total: 24100, mortos: 1450 },
    { causa: 'Condutor dormindo ao volante', total: 19800, mortos: 1850 }
  ];

  // Dados consolidados do Gráfico 3 (Estados)
  const estadosStats = [
    { uf: 'MG', acidentes: 52300, mortos: 4150 },
    { uf: 'PR', acidentes: 46100, mortos: 3200 },
    { uf: 'SC', acidentes: 44200, mortos: 2580 },
    { uf: 'RS', acidentes: 32100, mortos: 2100 },
    { uf: 'SP', acidentes: 28900, mortos: 1950 },
    { uf: 'RJ', acidentes: 26400, mortos: 1820 }
  ];

  // Dados consolidados do Gráfico 4 (Histórico)
  const evolucaoStats = [
    { ano: '2021', acidentes: 64500, mortos: 5390 },
    { ano: '2022', acidentes: 64450, mortos: 5440 },
    { ano: '2023', acidentes: 67800, mortos: 5620 },
    { ano: '2024', acidentes: 68200, mortos: 5690 },
    { ano: '2025', acidentes: 69100, mortos: 5740 },
    { ano: '2026*', acidentes: 56829, mortos: 4268 }
  ];

  return (
    <div className="bg-[#050507] text-neutral-100 min-h-screen selection:bg-red-800 selection:text-white">
      {/* Barra de Navegação Superior */}
      <nav className="border-b border-neutral-900 bg-[#070709]/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_10px_#dc2626] animate-pulse"></div>
            <div>
              <span className="font-cinzel text-xs tracking-[0.2em] text-neutral-400 uppercase block">
                PRF • Business Intelligence
              </span>
              <span className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-red-500 transition">
                Acidentes em Rodovias Federais
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-1.5 rounded-md transition ${
                currentPage === 'home'
                  ? 'bg-neutral-900 text-white border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Panorama Geral
            </button>
            <button
              onClick={() => setCurrentPage('fase_dia')}
              className={`px-3 py-1.5 rounded-md transition ${
                currentPage === 'fase_dia'
                  ? 'bg-red-950/80 text-red-200 border border-red-800 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                  : 'text-neutral-400 hover:text-red-400'
              }`}
            >
              Capítulo I: Fase do Dia
            </button>
            <button
              onClick={() => setCurrentPage('causas')}
              className={`px-3 py-1.5 rounded-md transition ${
                currentPage === 'causas'
                  ? 'bg-red-950/80 text-red-200 border border-red-800'
                  : 'text-neutral-400 hover:text-red-400'
              }`}
            >
              Capítulo II: Causas
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* PÁGINA 1: HOME (PANORAMA GERAL E HERO EDITORIAL)          */}
      {/* ========================================================= */}
      {currentPage === 'home' && (
        <div className="space-y-16 pb-20">
          {/* Hero Editorial */}
          <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-900/60 bg-red-950/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Activity className="w-3.5 h-3.5" />
              Investigação Oficial • Dados 2021 a 2026
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-5xl mx-auto">
              O quanto você sabe sobre os acidentes em rodovias brasileiras?
            </h1>

            <p className="mt-6 text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto font-light leading-relaxed">
              390.879 ocorrências processadas pela Polícia Rodoviária Federal. Mais de 29 mil mortes registradas. 
              Uma narrativa sobre como o excesso de confiança e a transição da luz transformam o asfalto em um cenário fatal.
            </p>

            {/* Faixa Horizontal de Fotos com Perspectiva e Expansão (Inspiração CodePen) */}
            <div className="mt-12 overflow-x-auto pb-4 pt-2 scrollbar-none">
              <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-[750px] px-4">
                {HERO_PHOTOS.map((photo, idx) => (
                  <div
                    key={idx}
                    className="group relative h-72 sm:h-80 w-20 sm:w-24 hover:w-64 sm:hover:w-80 transition-all duration-500 ease-out rounded-lg overflow-hidden border border-neutral-800 hover:border-red-600 shadow-lg cursor-pointer flex-shrink-0"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-left transform translate-y-3 group-hover:translate-y-0 transition duration-300">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-red-500 block mb-1">
                        Evidência 0{idx + 1}
                      </span>
                      <h3 className="font-serif text-sm font-bold text-white leading-tight">
                        {photo.title}
                      </h3>
                      <p className="text-[11px] text-neutral-300 mt-1 opacity-0 group-hover:opacity-100 transition duration-300 leading-snug">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-2 font-mono">Passe o mouse sobre as faixas para explorar os cenários</p>
          </section>

          {/* Grandes Indicadores (Linha de Sangue) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0b0b0e] border border-neutral-800 p-6 rounded-xl relative overflow-hidden">
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 block">
                  Total de Ocorrências
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
                  390.879
                </div>
                <span className="text-xs text-neutral-400 mt-2 block">
                  Dados tratados e limpos no Supabase
                </span>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-neutral-700"></div>
              </div>

              <div className="bg-[#0b0b0e] border border-neutral-800 p-6 rounded-xl relative overflow-hidden">
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 block">
                  Pessoas Envolvidas
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-neutral-200 mt-2">
                  854.210
                </div>
                <span className="text-xs text-neutral-400 mt-2 block">
                  Média de 2,1 pessoas por colisão
                </span>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-neutral-600"></div>
              </div>

              <div className="bg-[#0f0505] border border-red-950 p-6 rounded-xl relative overflow-hidden shadow-[0_0_25px_rgba(220,38,38,0.1)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-red-400">
                    Vítimas Fatais
                  </span>
                  <Skull className="w-4 h-4 text-red-500" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-black text-red-500 mt-2">
                  29.148
                </div>
                <span className="text-xs text-red-400/90 mt-2 block font-medium">
                  Taxa média de letalidade: 7,45%
                </span>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_8px_#dc2626]"></div>
              </div>

              <div className="bg-[#0b0b0e] border border-neutral-800 p-6 rounded-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Feridos Graves
                  </span>
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-400 mt-2">
                  91.380
                </div>
                <span className="text-xs text-neutral-400 mt-2 block">
                  Lesões com sequelas permanentes
                </span>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-600"></div>
              </div>
            </div>
          </section>

          {/* Cards dos Capítulos Investigativos (Previews que Redirecionam) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="border-b border-neutral-800 pb-4 flex items-end justify-between">
              <div>
                <span className="text-xs font-mono text-red-500 uppercase tracking-widest">Aprofundamento</span>
                <h2 className="font-serif text-2xl font-bold text-white mt-1">Capítulos do Storytelling</h2>
              </div>
              <span className="text-xs text-neutral-500 hidden sm:block">Clique para abrir a análise dedicada</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Capítulo 1 */}
              <div
                onClick={() => setCurrentPage('fase_dia')}
                className="bg-[#09090c] hover:bg-[#0f0c10] border border-neutral-800 hover:border-red-600/80 p-6 rounded-xl transition duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-red-500 uppercase">Capítulo I</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/60">
                      Tese Central
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-red-400 transition">
                    A Ilusão da Luz: O Perigo nas Sombras
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                    A maior parte dos acidentes acontece em pleno dia devido ao fluxo massivo. No entanto, a escuridão do anoitecer e da plena noite duplica a probabilidade de morte.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-medium text-red-400 group-hover:text-red-300">
                  <span>Abrir investigação de Fase do Dia</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>

              {/* Card Capítulo 2 */}
              <div
                onClick={() => setCurrentPage('causas')}
                className="bg-[#09090c] hover:bg-[#0f0c10] border border-neutral-800 hover:border-red-600/80 p-6 rounded-xl transition duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Capítulo II</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                      Fator Humano
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-red-400 transition">
                    A Anatomia da Falha: Causas e Reações
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                    Mais de 65% dos sinistros fatais têm origem no comportamento do condutor: reação tardia, desatenção, velocidade excessiva e consumo de álcool.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-medium text-red-400 group-hover:text-red-300">
                  <span>Abrir investigação das Causas</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>

              {/* Card Capítulo 3 */}
              <div
                onClick={() => setCurrentPage('estados')}
                className="bg-[#09090c] hover:bg-[#0f0c10] border border-neutral-800 hover:border-red-600/80 p-6 rounded-xl transition duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Capítulo III</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                      Geografia
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-red-400 transition">
                    Linhas de Asfalto: Onde a Vida se Perde
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                    Minas Gerais, Paraná e Santa Catarina lideram com folga as estatísticas de ocorrências e vítimas fatais. Quais rodovias cobram o preço mais alto?
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-medium text-red-400 group-hover:text-red-300">
                  <span>Abrir mapa de Estados e Rodovias</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>

              {/* Card Capítulo 4 */}
              <div
                onClick={() => setCurrentPage('historico')}
                className="bg-[#09090c] hover:bg-[#0f0c10] border border-neutral-800 hover:border-red-600/80 p-6 rounded-xl transition duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-neutral-500 uppercase">Capítulo IV</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                      Série Histórica
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-red-400 transition">
                    A Marcha dos Anos: 2021 a 2026
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                    Análise comparativa da evolução temporal das ocorrências após a pandemia: os acidentes diminuíram ou se tornaram mais letais?
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-medium text-red-400 group-hover:text-red-300">
                  <span>Abrir evolução anual completa</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* PÁGINA 2: CAPÍTULO I - FASE DO DIA (TESE CENTRAL)         */}
      {/* ========================================================= */}
      {currentPage === 'fase_dia' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Voltar */}
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Panorama Inicial
          </button>

          {/* Título e Destaque da Tese */}
          <header className="space-y-4">
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest block">
              Capítulo I • Investigação de Luminosidade
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              A maior parte dos acidentes ocorre em pleno dia. Mas a noite é duas vezes mais letal.
            </h1>
            <p className="text-base text-neutral-300 max-w-4xl font-light leading-relaxed">
              O senso comum sugere que a escuridão causa a maioria das colisões. Os dados da PRF desmentem esse mito: 
              54,8% de todos os acidentes acontecem sob a luz do sol, impulsionados pela alta densidade veicular. 
              Porém, quando a luz desaparece, a velocidade média sobe, a visibilidade cai e cada acidente torna-se significativamente mais mortal.
            </p>
          </header>

          {/* Seletor Dinâmico de Fase do Dia (Muda o Clima e as Cores da Tela) */}
          <section className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
              Selecione o Período para Alterar a Atmosfera da Análise:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {faseDiaStats.map(item => {
                const Icon = item.icone;
                const isSelected = selectedFase === item.fase;
                return (
                  <button
                    key={item.fase}
                    onClick={() => setSelectedFase(item.fase)}
                    className={`p-4 rounded-xl border text-left transition duration-300 flex flex-col justify-between ${
                      isSelected
                        ? `${item.tema} ring-2 ring-red-500`
                        : 'bg-[#09090c] border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase">{item.fase}</span>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-lg font-serif font-black text-white">
                      {item.acidentes.toLocaleString('pt-BR')} <span className="text-xs font-sans text-neutral-400 font-normal">acidentes</span>
                    </div>
                    <div className="text-xs text-red-400 font-medium mt-1">
                      Letalidade: {item.taxaMortalidade}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Banner Dinâmico da Fase Selecionada */}
            <div className={`p-6 rounded-xl border transition-all duration-500 ${currentFaseInfo.tema}`}>
              <div className="flex items-start gap-4">
                <currentFaseInfo.icone className="w-6 h-6 flex-shrink-0 mt-1 text-red-500" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Condições Operacionais em: {currentFaseInfo.fase}
                  </h3>
                  <p className="text-sm mt-1 leading-relaxed opacity-90">
                    {currentFaseInfo.descricao}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Gráfico Comparativo Principal da Fase do Dia */}
          <section className="bg-[#09090c] border border-neutral-800 p-6 rounded-xl">
            <div className="mb-6">
              <h3 className="font-serif text-xl font-bold text-white">
                Distribuição Comparativa: Volume vs. Mortalidade
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Barra cinza: total de ocorrências registradas | Barra vermelha: vítimas fatais no período
              </p>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={faseDiaStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis dataKey="fase" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#44403c', borderRadius: 8 }}
                    labelStyle={{ color: '#ffffff', fontWeight: 700 }}
                  />
                  <Legend />
                  <Bar dataKey="acidentes" name="Total de Acidentes" fill="#525252" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mortos" name="Vítimas Fatais (Mortos)" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* PÁGINA 3: CAPÍTULO II - CAUSAS PRINCIPAIS                 */}
      {/* ========================================================= */}
      {currentPage === 'causas' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Panorama Inicial
          </button>

          <header className="space-y-4">
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest block">
              Capítulo II • Fatores de Risco
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-white leading-tight">
              A Anatomia da Falha: O Fator Humano como Causa Suprema
            </h1>
            <p className="text-base text-neutral-300 max-w-4xl font-light leading-relaxed">
              Diferente da crença popular de que problemas na pista provocam a maioria dos desastres, os boletins oficiais da PRF revelam que 
              mais de 70% das ocorrências decorrem da conduta direta do motorista: desatenção, velocidade inadequada para o trecho e ingestão de álcool.
            </p>
          </header>

          <section className="bg-[#09090c] border border-neutral-800 p-6 rounded-xl">
            <h3 className="font-serif text-xl font-bold text-white mb-6">
              Ranking das 6 Principais Causas
            </h3>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={causasStats} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis type="number" stroke="#a3a3a3" fontSize={11} />
                  <YAxis dataKey="causa" type="category" stroke="#a3a3a3" fontSize={11} width={200} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#44403c', borderRadius: 8 }}
                  />
                  <Bar dataKey="total" name="Total Ocorrências" fill="#7f1d1d" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="mortos" name="Mortos" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* PÁGINA 4: CAPÍTULO III - GEOGRAFIA (ESTADOS)              */}
      {/* ========================================================= */}
      {currentPage === 'estados' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Panorama Inicial
          </button>

          <header className="space-y-4">
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest block">
              Capítulo III • Concentração Territorial
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-white leading-tight">
              Linhas de Asfalto: Onde o Sangue Fica Marcado
            </h1>
            <p className="text-base text-neutral-300 max-w-4xl font-light leading-relaxed">
              Minas Gerais lidera isoladamente as estatísticas de acidentes e mortes, impulsionada pela maior malha rodoviária federal do país e pelo relevo sinuoso com pistas simples em rodovias como a BR-381 e a BR-040.
            </p>
          </header>

          <section className="bg-[#09090c] border border-neutral-800 p-6 rounded-xl">
            <h3 className="font-serif text-xl font-bold text-white mb-6">
              Top 6 Estados com Maior Severidade
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={estadosStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis dataKey="uf" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#44403c', borderRadius: 8 }}
                  />
                  <Bar dataKey="acidentes" name="Acidentes Totais" fill="#44403c" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mortos" name="Vítimas Fatais" fill="#b91c1c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================= */}
      {/* PÁGINA 5: CAPÍTULO IV - SÉRIE HISTÓRICA                   */}
      {/* ========================================================= */}
      {currentPage === 'historico' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Panorama Inicial
          </button>

          <header className="space-y-4">
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest block">
              Capítulo IV • A Marcha dos Anos
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-white leading-tight">
              Evolução Temporal: 2021 a 2026
            </h1>
            <p className="text-base text-neutral-300 max-w-4xl font-light leading-relaxed">
              O comportamento das ocorrências ao longo dos últimos 5 anos comprova estabilidade no número absoluto de colisões, mas com uma letalidade persistente acima de 5.400 vidas por ano nas rodovias federais.
            </p>
          </header>

          <section className="bg-[#09090c] border border-neutral-800 p-6 rounded-xl">
            <h3 className="font-serif text-xl font-bold text-white mb-6">
              Tendência Histórica Anual
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolucaoStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1917" />
                  <XAxis dataKey="ano" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#44403c', borderRadius: 8 }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="acidentes" name="Ocorrências" stroke="#737373" strokeWidth={2} />
                  <Line type="monotone" dataKey="mortos" name="Vítimas Fatais" stroke="#dc2626" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {/* Rodapé Editorial */}
      <footer className="border-t border-neutral-900 bg-[#040406] py-10 text-center text-xs text-neutral-500 space-y-2">
        <p className="font-cinzel tracking-widest uppercase text-neutral-400">
          Trabalho de Conclusão A2 • Business Intelligence
        </p>
        <p>
          Fonte de Dados Oficiais: PRF & Base dos Dados | Infraestrutura: Supabase & Vercel
        </p>
      </footer>
    </div>
  );
}
