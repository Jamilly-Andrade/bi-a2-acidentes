import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Search,
  Info,
  MapPin,
  CloudRain,
  Car,
  Calendar,
  Users
} from 'lucide-react';
import {
  DIAS_SEMANA_BRASIL,
  SERIE_TEMPORAL_DATA,
  ESTADOS_DIAS_DATA,
  ESTADOS_RANKING_LIST
} from './data/temporalData';
import {
  CAUSAS_VEICULOS_DATA,
  FAIXAS_VEICULOS_DATA
} from './data/causasVeiculosData';
import { BRAZIL_MAP_PATHS } from './data/brazilMapPaths';
import {
  TIPO_ACIDENTE_VEICULOS_DATA,
  CAUSA_PESSOAS_DATA,
  CLIMA_VITIMAS_DATA
} from './data/novasAnalisesData';
import Version1App from './Version1App';

// As 8 imagens exatas enviadas no documento Google Docs (sem títulos sobrepostos)
const HERO_PHOTOS = [
  'https://www.uninter.com/noticias/wp-content/uploads/2022/01/noticias_acidente_em_sao_paulo.jpg',
  'https://piracicaba.sp.gov.br/wp-content/uploads/2025/05/Simulado-de-acidente-de-transito-com-multiplas-vitimas-aconteceu-no-centro-da-cidade-9-scaled.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwA5FIotKaOQ2fu5bNmnfPbOuTspoS2DepLnOcGc02kkBB8VP7IUaJDZau&s=10',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr2t8fQzqYDsk1P1d2GNCEgO0N8eKqJTMXOcz7RpjL2xu_VTSA5chO5Y5_&s=10',
  'https://www.acidadeon.com/ribeiraopreto/wp-content/uploads/sites/3/2026/01/WhatsApp-Image-2026-01-08-at-09.26.06_2026-01-08_13-18-50.webp',
  'https://i.metroimg.com/rbWWhIqm7SHOTik2wtT1GTZzgfBHmggXSds8uX7BVBA/w:600/q:85/f:webp/plain/https://images.metroimg.com/2026/04/whatsapp-image-2026-04-28-at-204637-2.jpeg',
  'https://static.poder360.com.br/uploads/2025/07/Acidente-em-estrada-848x477.jpg',
  'https://s2-g1.glbimg.com/PJBzQV-H3oBrojdJIoPxQPP4mnY=/0x0:1200x900/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/z/S/7CqwNfRLexTKbN8BSXmg/whatsapp-image-2025-09-23-at-08.18.09-1-.jpeg'
];

// Dados consolidados oficiais de Fase do Dia
const FASE_DIA_DATA = [
  {
    fase_dia: 'Amanhecer',
    total_acidentes: 19001,
    total_mortos: 2440,
    total_feridos: 21123,
    taxa_mortalidade_pct: 12.84,
    taxa_feridos_pct: 111.17,
    razao_mortos_por_ferido: 0.1155,
    mortes_a_cada_100_feridos: 11.55,
    destaque: 'Pico absoluto de letalidade da pesquisa (12,84%). A cada 100 feridos, ocorrem 11,55 mortes.',
    icone: Sunrise
  },
  {
    fase_dia: 'Plena Noite',
    total_acidentes: 136482,
    total_mortos: 15728,
    total_feridos: 148478,
    taxa_mortalidade_pct: 11.52,
    taxa_feridos_pct: 108.79,
    razao_mortos_por_ferido: 0.1059,
    mortes_a_cada_100_feridos: 10.59,
    destaque: 'Segundo período mais letal (11,52%). A cada 100 feridos, ocorrem 10,59 mortes sob escuridão.',
    icone: Moon
  },
  {
    fase_dia: 'Anoitecer',
    total_acidentes: 21512,
    total_mortos: 1670,
    total_feridos: 25111,
    taxa_mortalidade_pct: 7.76,
    taxa_feridos_pct: 116.73,
    razao_mortos_por_ferido: 0.0665,
    mortes_a_cada_100_feridos: 6.65,
    destaque: 'Transição visual rápida: 116,73 feridos a cada 100 sinistros e 6,65 mortes a cada 100 feridos.',
    icone: Sunset
  },
  {
    fase_dia: 'Pleno dia',
    total_acidentes: 214387,
    total_mortos: 12954,
    total_feridos: 252853,
    taxa_mortalidade_pct: 6.04,
    taxa_feridos_pct: 117.94,
    razao_mortos_por_ferido: 0.0512,
    mortes_a_cada_100_feridos: 5.12,
    destaque: 'Maior volume de ocorrências e feridos (117,94 a cada 100 acidentes), mas com menor letalidade (5,12 mortes a cada 100 feridos).',
    icone: Sun
  }
];

// Opções do Seletor de Análise (Estados é a visualização inicial padrão antes de escolher outra)
const OPCOES_ANALISE = [
  {
    id: 'estados',
    numero: 'Visão Inicial',
    titulo: 'Estados e Rodovias (27 UFs)',
    descricao: 'Mapa interativo do Brasil, ranking estadual e distribuição por dia da semana em cada UF.',
    icone: MapPin
  },
  {
    id: 'clima',
    numero: 'Análise 01',
    titulo: '1. Clima e Vítimas',
    descricao: 'Gráficos de pizza com ilesos, feridos leves, feridos graves e mortos em cada condição meteorológica.',
    icone: CloudRain
  },
  {
    id: 'causas',
    numero: 'Análise 02',
    titulo: '2. Causas, Veículos e Pessoas',
    descricao: 'Tipo de acidente por total de veículos e dispersão de causas com símbolos de pessoas envolvidas.',
    icone: Car
  },
  {
    id: 'fase_dia',
    numero: 'Análise 03',
    titulo: '3. Fase do Dia e Luminosidade',
    descricao: 'Comparativo entre volume diurno e a severidade das colisões ao amanhecer e na plena noite.',
    icone: Sunrise
  },
  {
    id: 'temporal',
    numero: 'Análise 04',
    titulo: '4. Série Temporal e Dias da Semana',
    descricao: 'Evolução anual de 2021 a 2026 e concentração de ocorrências nos 7 dias da semana.',
    icone: Calendar
  }
];

// Escala harmônica para o Mapa do Brasil no tema claro editorial
function getUfMapColor(acidentes, isSelected, isHovered) {
  if (isSelected) return '#dc2626';
  if (isHovered) return '#800080';
  if (acidentes >= 40000) return '#581c87';
  if (acidentes >= 20000) return '#7e22ce';
  if (acidentes >= 10000) return '#a855f7';
  if (acidentes >= 5000) return '#d8b4fe';
  return '#e9d5ff';
}

// Ícone SVG de pessoa para o Scatter Plot e para o Pictograma de Pessoas
function PersonIconSvg({ x = 0, y = 0, size = 14, color = '#800080' }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx={size * 0.5} cy={size * 0.24} r={size * 0.2} fill={color} />
      <path
        d={`M${size * 0.18},${size * 0.92} C${size * 0.18},${size * 0.56} ${size * 0.82},${size * 0.56} ${size * 0.82},${size * 0.92} Z`}
        fill={color}
      />
    </g>
  );
}

// Renderizador customizado do Scatter Plot: desenha um grupo de símbolos de pessoas proporcional ao total_pessoas
function RenderScatterPeopleCluster(props) {
  const { cx, cy, payload } = props;
  if (cx === undefined || cy === undefined || !payload) return null;

  // Quantidade de bonequinhos no cluster do ponto (de 2 a 9 símbolos conforme o total de pessoas)
  const count = Math.min(9, Math.max(2, Math.round(payload.pessoas / 16000)));
  const iconSize = 14;
  const cols = count <= 4 ? 2 : 3;
  const rows = Math.ceil(count / cols);
  const startX = cx - (cols * iconSize) / 2;
  const startY = cy - (rows * iconSize) / 2;

  const isHighLethality = payload.mortos >= 3000;
  const mainColor = isHighLethality ? '#dc2626' : '#800080';

  const icons = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    icons.push(
      <PersonIconSvg
        key={i}
        x={startX + c * (iconSize + 1)}
        y={startY + r * (iconSize + 1)}
        size={iconSize}
        color={mainColor}
      />
    );
  }

  return (
    <g className="cursor-pointer">
      <circle
        cx={cx}
        cy={cy}
        r={Math.max(18, count * 3.6)}
        fill={mainColor}
        fillOpacity={0.12}
        stroke={mainColor}
        strokeOpacity={0.35}
        strokeWidth={1.2}
      />
      {icons}
    </g>
  );
}

// Tooltip editorial limpo
function EditorialTooltip({ active, payload, label, unitSuffix = '' }) {
  if (!active || !payload || !payload.length) return null;
  const rowData = payload[0]?.payload || {};

  return (
    <div className="bg-white border border-stone-300 p-3.5 rounded-xl shadow-lg max-w-xs space-y-1.5 text-left text-stone-800">
      <div className="border-b border-stone-200 pb-1 font-bold text-stone-900 text-xs sm:text-sm">
        {label || rowData.causa || rowData.tipo_acidente || rowData.condicao || rowData.name}
      </div>
      <div className="space-y-1">
        {payload.map((entry, idx) => {
          const val = entry.value;
          const formatted =
            typeof val === 'number'
              ? Number.isInteger(val)
                ? val.toLocaleString('pt-BR')
                : val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
              : val;
          return (
            <div key={idx} className="flex items-center justify-between gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-stone-600">
                <span
                  className="w-2.5 h-2.5 rounded-sm inline-block"
                  style={{ backgroundColor: entry.color || entry.fill || '#800080' }}
                />
                {entry.name}:
              </span>
              <span className="font-bold text-stone-900 font-mono">
                {formatted}{unitSuffix}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  // Permite alternar entre a Versão 2 (Editorial Harmônica) e a Versão 1 (Anterior salva intacta)
  const [versaoSite, setVersaoSite] = useState('v2');

  // Como primeira visualização antes do usuário selecionar outra, inicia em 'estados' (27 UFs)
  const [selectedAnalysis, setSelectedAnalysis] = useState('estados');

  // Estados da seção de 27 UFs
  const [selectedUf, setSelectedUf] = useState('MG');
  const [hoveredUf, setHoveredUf] = useState(null);
  const [ufSearch, setUfSearch] = useState('');
  const [regiaoFiltro, setRegiaoFiltro] = useState('Todas');
  const [metricaTopEstados, setMetricaTopEstados] = useState('acidentes');

  // Estado selecionado no destaque de Clima
  const [selectedClima, setSelectedClima] = useState('Céu Claro');

  // Ordenação na aba Causas
  const [causasSortBy, setCausasSortBy] = useState('media_veiculos');

  const sortedCausasData = useMemo(() => {
    const copy = [...CAUSAS_VEICULOS_DATA];
    if (causasSortBy === 'media_veiculos') {
      return copy.sort((a, b) => b.media_veiculos - a.media_veiculos);
    }
    if (causasSortBy === 'taxa_mortalidade') {
      return copy.sort((a, b) => b.taxa_mortalidade - a.taxa_mortalidade);
    }
    return copy.sort((a, b) => b.veiculos - a.veiculos);
  }, [causasSortBy]);

  const filteredUfs = useMemo(() => {
    return ESTADOS_RANKING_LIST.filter((item) => {
      const matchRegiao = regiaoFiltro === 'Todas' || item.regiao === regiaoFiltro;
      const termo = ufSearch.trim().toLowerCase();
      const matchBusca =
        !termo ||
        item.sigla.toLowerCase().includes(termo) ||
        item.nome.toLowerCase().includes(termo) ||
        item.rodovia_critica.toLowerCase().includes(termo);
      return matchRegiao && matchBusca;
    });
  }, [ufSearch, regiaoFiltro]);

  const top10EstadosChart = useMemo(() => {
    const copy = [...ESTADOS_RANKING_LIST];
    copy.sort((a, b) => b[metricaTopEstados] - a[metricaTopEstados]);
    return copy.slice(0, 10);
  }, [metricaTopEstados]);

  const climaAtivoObj = useMemo(() => {
    return CLIMA_VITIMAS_DATA.find((c) => c.condicao === selectedClima) || CLIMA_VITIMAS_DATA[0];
  }, [selectedClima]);

  if (versaoSite === 'v1') {
    return (
      <div className="relative">
        <div className="fixed bottom-4 right-4 z-[100]">
          <button
            onClick={() => setVersaoSite('v2')}
            className="px-4 py-2 rounded-full bg-white text-stone-900 font-semibold text-xs shadow-xl border border-stone-300 hover:bg-stone-100 transition"
          >
            Voltar para Versão 2 (Editorial Clara)
          </button>
        </div>
        <Version1App />
      </div>
    );
  }

  const ufAtual = ESTADOS_DIAS_DATA[selectedUf] || ESTADOS_DIAS_DATA['MG'];
  const ufMapaAtiva = ESTADOS_DIAS_DATA[hoveredUf || selectedUf] || ufAtual;

  return (
    <div className="bg-[#f5f3ef] text-stone-900 min-h-screen font-sans antialiased">
      {/* Cabeçalho Editorial Limpo (Sem barra de abas) */}
      <header className="border-b border-stone-300/80 bg-[#f5f3ef]/95 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base font-bold text-stone-900 tracking-tight">
              Observatório de Acidentes em Rodovias Federais
            </span>
            <span className="hidden sm:inline-block text-xs text-stone-500">
              Polícia Rodoviária Federal (2021 a 2026)
            </span>
          </div>

          <button
            onClick={() => setVersaoSite('v1')}
            className="text-xs text-stone-600 hover:text-stone-900 border border-stone-300 bg-white px-3 py-1 rounded-md transition"
          >
            Alternar para Versão 1 (Salva)
          </button>
        </div>
      </header>

      {/* Seção de Abertura + Galeria Interativa (Apenas Imagens, sem títulos sobrepostos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
        {/* Único título com fonte serifada */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.15] max-w-5xl mx-auto">
          O quanto você sabe sobre os acidentes em rodovias brasileiras?
        </h1>

        <p className="mt-5 text-base sm:text-lg text-stone-700 max-w-3xl mx-auto leading-relaxed text-justify">
          Ao longo do período analisado, a Polícia Rodoviária Federal registrou 391.382 ocorrências nas rodovias federais do país, envolvendo 746.587 veículos, 447.565 pessoas feridas e 32.792 vítimas fatais.
        </p>

        {/* Faixa Horizontal Interativa somente com as 8 imagens solicitadas */}
        <div className="mt-8 overflow-x-auto pb-3 pt-1">
          <div className="flex items-center justify-center gap-2.5 min-w-[720px] px-2">
            {HERO_PHOTOS.map((url, idx) => (
              <div
                key={idx}
                className="group relative h-60 sm:h-72 w-20 sm:w-24 hover:w-64 sm:hover:w-80 transition-all duration-500 ease-out rounded-xl overflow-hidden border border-stone-300 shadow-sm cursor-pointer flex-shrink-0 bg-stone-200"
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Resumo Geral Sutil */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 text-left bg-white border border-stone-200/90 rounded-xl p-5 shadow-sm">
          <div className="pr-4 border-r border-stone-200">
            <span className="text-xs text-stone-500 block">Total de Acidentes</span>
            <span className="text-2xl sm:text-3xl font-black text-[#800080] mt-0.5 block">391.382</span>
          </div>
          <div className=" sm:pr-4 sm:border-r border-stone-200">
            <span className="text-xs text-stone-500 block">Veículos Envolvidos</span>
            <span className="text-2xl sm:text-3xl font-black text-stone-800 mt-0.5 block">746.587</span>
          </div>
          <div className="pr-4 border-r border-stone-200">
            <span className="text-xs text-stone-500 block">Total de Feridos</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-600 mt-0.5 block">447.565</span>
          </div>
          <div>
            <span className="text-xs text-stone-500 block">Vítimas Fatais</span>
            <span className="text-2xl sm:text-3xl font-black text-red-600 mt-0.5 block">32.792</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SELETOR DE ANÁLISE (SUBSTITUI AS ABAS POR SELEÇÃO DIRETA) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-[#ebe7e0] border border-stone-300 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                Selecione o recorte de análise para visualizar
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Clique em uma das opções abaixo para carregar exclusivamente os painéis do tema escolhido.
              </p>
            </div>
            <span className="text-xs font-medium text-stone-600 bg-white/80 px-3 py-1.5 rounded-lg border border-stone-300 self-start sm:self-auto">
              Visualizando agora: <strong>{OPCOES_ANALISE.find((o) => o.id === selectedAnalysis)?.titulo}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {OPCOES_ANALISE.map((op) => {
              const Icon = op.icone;
              const ativo = selectedAnalysis === op.id;
              return (
                <button
                  key={op.id}
                  onClick={() => setSelectedAnalysis(op.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    ativo
                      ? 'bg-white border-[#800080] ring-2 ring-[#800080]/20 shadow-md'
                      : 'bg-white/70 border-stone-300 hover:bg-white hover:border-stone-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          ativo ? 'bg-[#800080] text-white' : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {op.numero}
                      </span>
                      <Icon className={`w-4 h-4 ${ativo ? 'text-[#800080]' : 'text-stone-500'}`} />
                    </div>
                    <h3 className="text-sm font-bold text-stone-900 leading-snug">{op.titulo}</h3>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{op.descricao}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ÁREA DE EXIBIÇÃO ÚNICA (MOSTRA APENAS A ANÁLISE BUSCADA)  */}
      {/* ========================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-4">
        {/* ------------------------------------------------------- */}
        {/* VISÃO INICIAL PADRÃO: ESTADOS (27 UFs)                  */}
        {/* ------------------------------------------------------- */}
        {selectedAnalysis === 'estados' && (
          <div className="space-y-10 animate-page-enter">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                Distribuição Geográfica pelas 27 Unidades da Federação
              </h2>
              <p className="text-base sm:text-lg text-stone-700 max-w-4xl leading-relaxed text-justify">
                Minas Gerais (50.819 acidentes e 4.166 mortes), Santa Catarina (45.452 acidentes) e Paraná (42.329 acidentes) lideram o volume nacional de ocorrências nas rodovias federais. Passe o mouse ou clique em qualquer estado no mapa do Brasil abaixo para inspecionar seus indicadores e o comportamento ao longo da semana.
              </p>
            </div>

            <section className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    Mapa Interativo do Brasil e Raio-X por Estado
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500">
                    Clique em qualquer parte do mapa ou use os filtros ao lado para selecionar uma UF.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={ufSearch}
                      onChange={(e) => setUfSearch(e.target.value)}
                      placeholder="Buscar UF, estado ou BR..."
                      className="bg-stone-50 border border-stone-300 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#800080]"
                    />
                  </div>

                  <select
                    value={regiaoFiltro}
                    onChange={(e) => setRegiaoFiltro(e.target.value)}
                    className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#800080]"
                  >
                    <option value="Todas">Todas as Regiões</option>
                    <option value="Sudeste">Sudeste</option>
                    <option value="Sul">Sul</option>
                    <option value="Nordeste">Nordeste</option>
                    <option value="Centro-Oeste">Centro-Oeste</option>
                    <option value="Norte">Norte</option>
                  </select>
                </div>
              </div>

              {/* Mapa do Brasil + Painel Lateral */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 bg-[#faf8f5] border border-stone-200 p-4 sm:p-6 rounded-xl flex flex-col items-center">
                  <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                    <span className="text-stone-500">
                      Passe o mouse ou clique em cada estado:
                    </span>
                    <span className="text-[#800080] bg-purple-50 border border-purple-200 px-2.5 py-1 rounded font-medium">
                      Em foco: <strong>{ufMapaAtiva.nome} ({ufMapaAtiva.sigla})</strong>
                    </span>
                  </div>

                  <svg viewBox="0 0 600 600" className="w-full max-w-[450px] h-auto select-none">
                    {BRAZIL_MAP_PATHS.map((st) => {
                      const dadosUf = ESTADOS_DIAS_DATA[st.sigla];
                      const isSelected = selectedUf === st.sigla;
                      const isHovered = hoveredUf === st.sigla;
                      const fill = getUfMapColor(dadosUf?.acidentes || 0, isSelected, isHovered);
                      const darkText = (dadosUf?.acidentes || 0) < 10000 && !isSelected && !isHovered;
                      return (
                        <g
                          key={st.sigla}
                          onClick={() => setSelectedUf(st.sigla)}
                          onMouseEnter={() => setHoveredUf(st.sigla)}
                          onMouseLeave={() => setHoveredUf(null)}
                          className="cursor-pointer transition-all duration-150"
                        >
                          <path
                            d={st.d}
                            fill={fill}
                            stroke={isSelected || isHovered ? '#1c1917' : '#ffffff'}
                            strokeWidth={isSelected || isHovered ? 2 : 1.2}
                          />
                          <text
                            x={st.cx}
                            y={st.cy}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill={darkText ? '#3b0764' : '#ffffff'}
                            fontSize={isSelected || isHovered ? 11 : 9}
                            fontWeight="bold"
                            className="pointer-events-none"
                          >
                            {st.sigla}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  <div className="w-full pt-3 mt-2 border-t border-stone-200 flex flex-wrap items-center justify-center gap-3 text-[11px] text-stone-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm inline-block bg-[#dc2626]" />
                      UF Selecionada
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm inline-block bg-[#581c87]" />
                      +40k acidentes
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm inline-block bg-[#7e22ce]" />
                      20k a 40k
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm inline-block bg-[#a855f7]" />
                      10k a 20k
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm inline-block bg-[#e9d5ff] border border-stone-300" />
                      Até 10k
                    </span>
                  </div>
                </div>

                {/* Card de Informações da UF (Com selo de letalidade bem espaçado) */}
                <div className="lg:col-span-5 bg-[#faf8f5] border border-stone-200 p-6 rounded-xl flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-purple-100 text-[#800080] border border-purple-200">
                        {ufMapaAtiva.regiao} • #{ufMapaAtiva.rank}º no Ranking Nacional
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded bg-red-100 text-red-700 border border-red-200">
                        {ufMapaAtiva.taxa_mortalidade}% de letalidade
                      </span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-black text-stone-900 pt-1">
                      {ufMapaAtiva.nome} ({ufMapaAtiva.sigla})
                    </h4>
                    <p className="text-sm text-stone-700 leading-relaxed text-justify">
                      {ufMapaAtiva.perfil_critico}.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                      <span className="text-[11px] text-stone-500 block">Total de Acidentes</span>
                      <span className="text-xl font-black text-[#800080]">{ufMapaAtiva.acidentes.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                      <span className="text-[11px] text-stone-500 block">Total de Feridos</span>
                      <span className="text-xl font-black text-amber-600">{ufMapaAtiva.feridos.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                      <span className="text-[11px] text-stone-500 block">Vítimas Fatais</span>
                      <span className="text-xl font-black text-red-600">{ufMapaAtiva.mortos.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-lg border border-stone-200">
                      <span className="text-[11px] text-stone-500 block">Dia Mais Crítico</span>
                      <span className="text-lg font-black text-stone-900">{ufMapaAtiva.pico_dia}</span>
                      <span className="text-[10px] text-stone-500 block">{ufMapaAtiva.pico_qtd.toLocaleString('pt-BR')} ocorrências</span>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-stone-200 text-xs text-stone-700 flex items-center justify-between gap-2">
                    <span>Rodovia Federal Mais Crítica:</span>
                    <strong className="text-stone-900 font-mono">{ufMapaAtiva.rodovia_critica}</strong>
                  </div>
                </div>
              </div>

              {/* Atalho por botões de UF */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <span className="text-xs text-stone-500 block">
                  Selecionar estado diretamente pela sigla ({filteredUfs.length} exibidos):
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                  {filteredUfs.map((item) => {
                    const ativo = selectedUf === item.sigla;
                    return (
                      <button
                        key={item.sigla}
                        onClick={() => setSelectedUf(item.sigla)}
                        className={`p-2 rounded-lg border text-left transition flex flex-col justify-between ${
                          ativo
                            ? 'bg-[#800080] border-[#800080] text-white shadow-sm'
                            : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold text-xs">{item.sigla}</span>
                          <span className={`text-[10px] ${ativo ? 'text-purple-200' : 'text-stone-400'}`}>#{item.rank}</span>
                        </div>
                        <span className={`text-[10px] truncate mt-0.5 ${ativo ? 'text-purple-100' : 'text-stone-500'}`}>
                          {(item.acidentes / 1000).toFixed(1)}k acid.
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gráfico Semanal da UF Selecionada */}
              <div className="bg-[#faf8f5] border border-stone-200 p-6 rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-stone-900">
                    Acidentes, Feridos e Mortos por Dia da Semana em {ufMapaAtiva.nome} ({ufMapaAtiva.sigla})
                  </h4>
                  <span className="text-xs text-stone-600 bg-white border border-stone-200 px-3 py-1 rounded-lg">
                    Concentração no fim de semana (Sex-Dom): <strong>{ufMapaAtiva.fds_pct}%</strong>
                  </span>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ufMapaAtiva.distribuicao} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
                      <XAxis dataKey="dia" stroke="#57534e" fontSize={12} />
                      <YAxis stroke="#57534e" fontSize={12} />
                      <Tooltip content={<EditorialTooltip />} />
                      <Legend />
                      <Bar dataKey="acidentes" name="Total de Acidentes" fill="#800080" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="feridos" name="Total de Feridos" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="mortos" name="Vítimas Fatais" fill="#dc2626" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Ranking Top 10 Estados */}
            <section className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                  Comparativo entre os 10 Estados Mais Críticos
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMetricaTopEstados('acidentes')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      metricaTopEstados === 'acidentes'
                        ? 'bg-[#800080] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Ordenar por Acidentes
                  </button>
                  <button
                    onClick={() => setMetricaTopEstados('mortos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      metricaTopEstados === 'mortos'
                        ? 'bg-red-600 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Ordenar por Mortos
                  </button>
                </div>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={top10EstadosChart} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
                    <XAxis dataKey="sigla" stroke="#57534e" fontSize={12} />
                    <YAxis stroke="#57534e" fontSize={12} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                    <Tooltip content={<EditorialTooltip />} />
                    <Legend />
                    <Bar dataKey="acidentes" name="Total de Acidentes" fill="#800080" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="feridos" name="Total de Feridos" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="mortos" name="Vítimas Fatais" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* ANÁLISE 01: CLIMA E VÍTIMAS (GRÁFICOS DE PIZZA)         */}
        {/* ------------------------------------------------------- */}
        {selectedAnalysis === 'clima' && (
          <div className="space-y-10 animate-page-enter">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                Condições Meteorológicas e Gravidade das Vítimas
              </h2>
              <p className="text-base sm:text-lg text-stone-700 max-w-4xl leading-relaxed text-justify">
                A distribuição das vítimas por condição meteorológica mostra como o estado do tempo altera o perfil de severidade nas rodovias federais: enquanto o Céu Claro concentra o maior volume absoluto de acidentes e vítimas pela maior velocidade média praticada, condições adversas como Nevoeiro/Neblina elevam a proporção de vítimas fatais e feridos graves.
              </p>
            </div>

            {/* Painel Principal: Seletor de Clima + Pizza Ampliada e Tabela da Condição */}
            <section className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    Inspeção Detalhada por Condição Meteorológica
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500">
                    Selecione uma condição climática para ampliar as proporções de Ilesos, Feridos Leves, Feridos Graves e Mortos.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {CLIMA_VITIMAS_DATA.map((c) => (
                    <button
                      key={c.condicao}
                      onClick={() => setSelectedClima(c.condicao)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        selectedClima === c.condicao
                          ? 'bg-[#800080] text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {c.condicao}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-6 h-80 w-full flex flex-col items-center justify-center bg-[#faf8f5] rounded-xl border border-stone-200 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={climaAtivoObj.fatias}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={105}
                        paddingAngle={2}
                      >
                        {climaAtivoObj.fatias.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<EditorialTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <span className="text-xs text-stone-500 block">Condição Selecionada</span>
                      <h4 className="text-2xl font-black text-stone-900">{climaAtivoObj.condicao}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-500 block">Total de Acidentes</span>
                      <span className="text-xl font-black text-stone-900">
                        {climaAtivoObj.acidentes.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-[#faf8f5] border border-stone-200">
                      <span className="text-xs font-semibold text-[#800080] block">Ilesos ({climaAtivoObj.pct_ilesos}%)</span>
                      <span className="text-2xl font-black text-stone-900 mt-1 block">
                        {climaAtivoObj.ilesos.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#faf8f5] border border-stone-200">
                      <span className="text-xs font-semibold text-amber-600 block">Feridos Leves ({climaAtivoObj.pct_feridos_leves}%)</span>
                      <span className="text-2xl font-black text-stone-900 mt-1 block">
                        {climaAtivoObj.feridos_leves.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#faf8f5] border border-stone-200">
                      <span className="text-xs font-semibold text-orange-600 block">Feridos Graves ({climaAtivoObj.pct_feridos_graves}%)</span>
                      <span className="text-2xl font-black text-stone-900 mt-1 block">
                        {climaAtivoObj.feridos_graves.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
                      <span className="text-xs font-semibold text-red-700 block">Mortos ({climaAtivoObj.pct_mortos}%)</span>
                      <span className="text-2xl font-black text-red-600 mt-1 block">
                        {climaAtivoObj.mortos.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Grade Completa com os Gráficos de Pizza para TODAS as Condições Meteorológicas */}
            <section className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                  Comparativo de Gráficos de Pizza para Todas as Condições Meteorológicas
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Visualização lado a lado de todas as 10 condições meteorológicas registradas pela PRF.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {CLIMA_VITIMAS_DATA.map((item) => (
                  <div
                    key={item.condicao}
                    onClick={() => setSelectedClima(item.condicao)}
                    className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      selectedClima === item.condicao
                        ? 'bg-[#faf8f5] border-[#800080] shadow-sm'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-sm text-stone-900">{item.condicao}</h4>
                        <span className="text-[10px] text-stone-500 font-mono">
                          {item.acidentes.toLocaleString('pt-BR')} acid.
                        </span>
                      </div>

                      <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={item.fatias}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={25}
                              outerRadius={55}
                            >
                              {item.fatias.map((f, i) => (
                                <Cell key={i} fill={f.color} />
                              ))}
                            </Pie>
                            <Tooltip content={<EditorialTooltip />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-stone-200 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-[#800080] font-medium">Ilesos:</span>
                        <span className="font-mono text-stone-800">{item.ilesos.toLocaleString('pt-BR')} ({item.pct_ilesos}%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-600 font-medium">Feridos Leves:</span>
                        <span className="font-mono text-stone-800">{item.feridos_leves.toLocaleString('pt-BR')} ({item.pct_feridos_leves}%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-600 font-medium">Feridos Graves:</span>
                        <span className="font-mono text-stone-800">{item.feridos_graves.toLocaleString('pt-BR')} ({item.pct_feridos_graves}%)</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-red-600">Mortos:</span>
                        <span className="font-mono text-red-600">{item.mortos.toLocaleString('pt-BR')} ({item.pct_mortos}%)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* ANÁLISE 02: CAUSAS, VEÍCULOS E PESSOAS ENVOLVIDAS       */}
        {/* ------------------------------------------------------- */}
        {selectedAnalysis === 'causas' && (
          <div className="space-y-10 animate-page-enter">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                Tipo de Acidente, Causas, Veículos e Pessoas Envolvidas
              </h2>
              <p className="text-base sm:text-lg text-stone-700 max-w-4xl leading-relaxed text-justify">
                Abaixo estão representadas a relação entre o tipo de acidente e o total de veículos atingidos, bem como o cruzamento entre a causa do acidente e o total de pessoas envolvidas utilizando dispersão e pictogramas proporcionais de pessoas.
              </p>
            </div>

            {/* 1. RELAÇÃO ENTRE TIPO DE ACIDENTE E TOTAL DE VEÍCULOS */}
            <section className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    1. Relação entre Tipo de Acidente e Total de Veículos Envolvidos
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Comparativo entre o total absoluto de veículos, total de acidentes e vítimas fatais por modalidade de colisão.
                  </p>
                </div>
                <span className="text-xs font-medium text-[#800080] bg-purple-50 border border-purple-200 px-3 py-1 rounded-lg">
                  Maior média: Engavetamento (4,10 veículos por acidente)
                </span>
              </div>

              <div className="h-[440px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TIPO_ACIDENTE_VEICULOS_DATA} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
                    <XAxis type="number" stroke="#57534e" fontSize={11} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                    <YAxis dataKey="tipo_acidente" type="category" stroke="#1c1917" fontSize={11} width={210} />
                    <Tooltip content={<EditorialTooltip />} />
                    <Legend />
                    <Bar dataKey="veiculos" name="Total de Veículos" fill="#800080" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="acidentes" name="Total de Acidentes" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="mortos" name="Vítimas Fatais" fill="#dc2626" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* 2. RELAÇÃO ENTRE CAUSA DO ACIDENTE E TOTAL DE PESSOAS (SCATTER PLOT DE PESSOAS + PICTOGRAMA) */}
            <section className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    2. Relação entre Causa do Acidente e Total de Pessoas Envolvidas
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Gráfico de dispersão (Scatter Plot) onde cada ponto desenha um agrupamento de símbolos de pessoas proporcional ao volume de vítimas, acompanhado da escala pictográfica abaixo.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-600 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
                  <Users className="w-4 h-4 text-[#800080]" />
                  <span>Mais símbolos = Maior quantidade de pessoas envolvidas</span>
                </div>
              </div>

              {/* Scatter Plot com Símbolos de Pessoas */}
              <div className="h-96 w-full bg-[#faf8f5] border border-stone-200 rounded-xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 25, right: 30, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
                    <XAxis
                      type="number"
                      dataKey="acidentes"
                      name="Total de Acidentes"
                      stroke="#57534e"
                      fontSize={12}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k acid.`}
                    />
                    <YAxis
                      type="number"
                      dataKey="pessoas"
                      name="Total de Pessoas Envolvidas"
                      stroke="#57534e"
                      fontSize={12}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k pess.`}
                    />
                    <ZAxis type="number" dataKey="pessoas" range={[100, 900]} />
                    <Tooltip content={<EditorialTooltip />} />
                    <Scatter
                      name="Causas por Total de Pessoas"
                      data={CAUSA_PESSOAS_DATA}
                      shape={<RenderScatterPeopleCluster />}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {/* Matriz Pictográfica de Símbolos de Pessoas (1 símbolo = 5.000 pessoas envolvidas) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span className="font-bold text-stone-800 uppercase tracking-wider">
                    Representação por Símbolos de Pessoas (Cada símbolo representa 5.000 pessoas envolvidas)
                  </span>
                  <span>Passe o mouse ou observe a quantidade de símbolos em cada causa</span>
                </div>

                <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl bg-[#faf8f5] overflow-hidden">
                  {CAUSA_PESSOAS_DATA.map((item, idx) => {
                    const corSimbolo = item.mortos >= 3000 ? '#dc2626' : '#800080';
                    return (
                      <div key={idx} className="p-3.5 sm:px-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-white transition">
                        <div className="md:w-5/12">
                          <span className="text-sm font-bold text-stone-900 block">{item.causa}</span>
                          <span className="text-xs text-stone-500">
                            {item.pessoas.toLocaleString('pt-BR')} pessoas envolvidas em {item.acidentes.toLocaleString('pt-BR')} acidentes (média de {item.media_pessoas} pess./acidente)
                          </span>
                        </div>

                        <div className="md:w-7/12 flex flex-wrap items-center gap-1">
                          {Array.from({ length: item.simbolos_pessoas }).map((_, sIdx) => (
                            <svg key={sIdx} width="16" height="18" viewBox="0 0 16 18" className="flex-shrink-0">
                              <PersonIconSvg x={0} y={1} size={15} color={corSimbolo} />
                            </svg>
                          ))}
                          <span className="ml-2 text-xs font-mono font-bold text-stone-700">
                            {item.pessoas.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 3. MÉDIA DE VEÍCULOS POR CAUSA E ESCALADA POR FAIXA DE VEÍCULOS */}
            <section className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    3. Média de Veículos Envolvidos por Causa do Acidente
                  </h3>
                  <p className="text-xs text-stone-500">
                    Linha tracejada indica a média nacional de 1,91 veículos por acidente.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCausasSortBy('media_veiculos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      causasSortBy === 'media_veiculos'
                        ? 'bg-[#800080] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Por Média de Veículos
                  </button>
                  <button
                    onClick={() => setCausasSortBy('taxa_mortalidade')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      causasSortBy === 'taxa_mortalidade'
                        ? 'bg-red-600 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Por Letalidade (%)
                  </button>
                </div>
              </div>

              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sortedCausasData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
                    <XAxis type="number" domain={[1.2, 2.8]} stroke="#57534e" fontSize={11} unit=" veíc" />
                    <YAxis dataKey="causa" type="category" stroke="#1c1917" fontSize={11} width={230} />
                    <Tooltip content={<EditorialTooltip unitSuffix=" veíc/acidente" />} />
                    <ReferenceLine x={1.91} stroke="#d97706" strokeDasharray="4 4" />
                    <Bar dataKey="media_veiculos" name="Média de Veículos por Acidente" fill="#800080" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* ANÁLISE 03: FASE DO DIA E LUMINOSIDADE                  */}
        {/* ------------------------------------------------------- */}
        {selectedAnalysis === 'fase_dia' && (
          <div className="space-y-10 animate-page-enter">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                Luminosidade: O Contraste entre Volume Diurno e Letalidade no Amanhecer
              </h2>
              <p className="text-base sm:text-lg text-stone-700 max-w-4xl leading-relaxed text-justify">
                O cruzamento dos dados revela dois fatos opostos: o Pleno dia lidera o volume absoluto de ocorrências (214.387) e a quantidade de feridos (252.853), impulsionado pelo fluxo intenso de veículos. Em contrapartida, o Amanhecer registra o menor número de acidentes (19.001), mas detém a maior taxa de mortalidade (12,84%) e a maior proporção de mortes por ferido (11,55 a cada 100 feridos).
              </p>
            </div>

            {/* Cards de destaque com efeito hover */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border-l-4 border-l-amber-500 border border-stone-200 p-6 rounded-xl shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sun className="w-4 h-4" /> O Volume Diurno
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  Pleno Dia: 214.387 acidentes e 252.853 feridos
                </h3>
                <p className="text-base text-stone-700 leading-relaxed text-justify">
                  A taxa de feridos atinge <strong>117,94%</strong>, indicando que em média um único acidente causa mais de uma vítima ferida (aproximadamente 118 feridos a cada 100 acidentes). Porém, a letalidade é a menor de todas: 6,04%.
                </p>
              </div>

              <div className="bg-white border-l-4 border-l-red-600 border border-stone-200 p-6 rounded-xl shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sunrise className="w-4 h-4" /> A Gravidade do Amanhecer
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  Amanhecer: 19.001 acidentes e pico de 12,84% de mortalidade
                </h3>
                <p className="text-base text-stone-700 leading-relaxed text-justify">
                  Mesmo sendo o período com menor número de colisões, o amanhecer apresenta a maior proporção de mortes: <strong>11,55 mortes a cada 100 feridos</strong>. A fadiga biológica e o microsono tornam os impactos desproporcionalmente fatais.
                </p>
              </div>
            </section>

            {/* Gráfico 1: Valores Absolutos */}
            <section className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                1. Comparativo de Valores Absolutos por Fase do Dia
              </h3>
              <div className="h-80 sm:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={FASE_DIA_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
                    <XAxis dataKey="fase_dia" stroke="#57534e" fontSize={12} />
                    <YAxis stroke="#57534e" fontSize={12} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                    <Tooltip content={<EditorialTooltip />} />
                    <Legend />
                    <Bar dataKey="total_acidentes" name="Total de Acidentes" fill="#800080" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="total_feridos" name="Total de Feridos" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="total_mortos" name="Total de Mortos" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Gráfico 2: Taxas Proporcionais + 4 Blocos */}
            <section className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                2. Taxas Proporcionais: Mortalidade vs. Feridos (%)
              </h3>
              <div className="h-80 sm:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={FASE_DIA_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
                    <XAxis dataKey="fase_dia" stroke="#57534e" fontSize={12} />
                    <YAxis stroke="#57534e" fontSize={12} unit="%" />
                    <Tooltip content={<EditorialTooltip unitSuffix="%" />} />
                    <Legend />
                    <Bar dataKey="taxa_mortalidade_pct" name="Taxa de Mortalidade (%)" fill="#dc2626" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="taxa_feridos_pct" name="Taxa de Feridos (%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-[#faf8f5] border border-stone-200 p-6 rounded-xl space-y-4">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700">
                  Mortes registradas a cada 100 pessoas feridas
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  {FASE_DIA_DATA.map((item) => (
                    <div
                      key={item.fase_dia}
                      className="bg-white p-4 rounded-xl border border-stone-200 hover:border-[#800080] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md cursor-pointer"
                    >
                      <span className="text-xs text-stone-500 block font-medium">{item.fase_dia}</span>
                      <span className="text-2xl font-black text-stone-900 block mt-1">
                        {item.mortes_a_cada_100_feridos.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-[11px] text-stone-500 block mt-0.5">mortes p/ 100 feridos</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Gráfico 3: Razão Mortos por Ferido */}
            <section className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                3. Razão Direta: Mortos por Ferido (razao_mortos_por_ferido)
              </h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={FASE_DIA_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
                    <XAxis dataKey="fase_dia" stroke="#57534e" fontSize={12} />
                    <YAxis stroke="#57534e" fontSize={12} domain={[0, 0.14]} />
                    <Tooltip content={<EditorialTooltip />} />
                    <Bar dataKey="razao_mortos_por_ferido" name="Razão Mortos / Ferido" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-[#faf8f5] border border-purple-200 p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
                <p className="text-base sm:text-lg text-stone-800 leading-relaxed text-justify">
                  No <strong>Amanhecer</strong>, aproximadamente <strong>1 a cada 11 pessoas que sofriam lesão morria</strong>, enquanto em <strong>Pleno Dia</strong> essa proporção diminui para apenas <strong>1 morte a cada 20 pessoas lesionadas</strong>.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* ------------------------------------------------------- */}
        {/* ANÁLISE 04: SÉRIE TEMPORAL E DIAS DA SEMANA             */}
        {/* ------------------------------------------------------- */}
        {selectedAnalysis === 'temporal' && (
          <div className="space-y-10 animate-page-enter">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                Série Histórica (2021 a 2026) e Distribuição pelos Dias da Semana
              </h2>
              <p className="text-base sm:text-lg text-stone-700 max-w-4xl leading-relaxed text-justify">
                A distribuição das ocorrências ao longo do calendário mostra que, enquanto terças e quartas registram os menores volumes, os fins de semana concentram quase metade de todas as vítimas fatais (48,3% entre sexta, sábado e domingo), com pico aos domingos (6.582 mortes).
              </p>
            </div>

            <section className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                  1. Série Temporal Anual de Ocorrências, Feridos e Mortos (2021 a 2026*)
                </h3>
                <span className="text-xs text-stone-500">
                  *2026 contempla dados parciais do ano em curso
                </span>
              </div>

              <div className="h-80 sm:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SERIE_TEMPORAL_DATA} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
                    <XAxis dataKey="ano" stroke="#57534e" fontSize={12} />
                    <YAxis stroke="#57534e" fontSize={12} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                    <Tooltip content={<EditorialTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="acidentes" name="Ocorrências" stroke="#800080" strokeWidth={3} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="feridos" name="Feridos" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="mortos" name="Vítimas Fatais" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                  2. A Dinâmica dos 7 Dias da Semana no Brasil
                </h3>
                <span className="text-xs text-stone-600 bg-stone-100 px-3 py-1 rounded-lg">
                  Linha tracejada: Média Diária (55.911 acidentes)
                </span>
              </div>

              <div className="h-80 sm:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DIAS_SEMANA_BRASIL} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
                    <XAxis dataKey="dia" stroke="#57534e" fontSize={12} />
                    <YAxis stroke="#57534e" fontSize={12} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                    <Tooltip content={<EditorialTooltip />} />
                    <Legend />
                    <ReferenceLine y={55911} stroke="#800080" strokeDasharray="4 4" />
                    <Bar dataKey="acidentes" name="Total de Acidentes" fill="#800080" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="mortos" name="Vítimas Fatais" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* RODAPÉ SUTIL COM NÚMERO E INSTITUIÇÃO LADO A LADO         */}
      {/* ========================================================= */}
      <footer className="border-t border-stone-300 bg-[#ebe7e0] py-6 px-4 sm:px-6 lg:px-8 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="text-stone-500 font-medium">Emergência nas rodovias:</span>
            <a href="tel:191" className="hover:text-stone-900 transition">
              <strong className="text-stone-900 font-bold">191</strong> Polícia Rodoviária Federal
            </a>
            <span className="text-stone-300">|</span>
            <a href="tel:192" className="hover:text-stone-900 transition">
              <strong className="text-stone-900 font-bold">192</strong> SAMU
            </a>
            <span className="text-stone-300">|</span>
            <a href="tel:193" className="hover:text-stone-900 transition">
              <strong className="text-stone-900 font-bold">193</strong> Corpo de Bombeiros
            </a>
            <span className="text-stone-300">|</span>
            <a href="tel:166" className="hover:text-stone-900 transition">
              <strong className="text-stone-900 font-bold">166</strong> ANTT
            </a>
          </div>

          <div className="text-stone-500 text-center md:text-right">
            Dados Oficiais: Polícia Rodoviária Federal (PRF)
          </div>
        </div>
      </footer>
    </div>
  );
}
