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
  AlertTriangle,
  Users,
  Skull,
  ShieldAlert,
  Filter,
  Database,
  RefreshCw,
  SunMedium,
  Calendar,
  MapPin,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [selectedYear, setSelectedYear] = useState('todos');
  const [selectedUF, setSelectedUF] = useState('todas');
  const [selectedFase, setSelectedFase] = useState('todas');
  const [selectedClima, setSelectedClima] = useState('todos');

  // Paginação da tabela
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Busca de dados no Supabase
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('ocorrencias_agrupadas')
        .select('*')
        .order('id', { ascending: false })
        .limit(3000);

      if (selectedYear !== 'todos') {
        query = query.eq('ano', Number(selectedYear));
      }
      if (selectedUF !== 'todas') {
        query = query.eq('sigla_uf', selectedUF);
      }
      if (selectedFase !== 'todas') {
        query = query.eq('fase_dia', selectedFase);
      }
      if (selectedClima !== 'todos') {
        query = query.eq('condicao_metereologica', selectedClima);
      }

      const { data: result, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setData(result || []);
      setCurrentPage(1);
    } catch (err) {
      console.error('Erro ao buscar dados do Supabase:', err);
      setError('Falha na comunicação com o Supabase. Verifique a conexão.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedYear, selectedUF, selectedFase, selectedClima]);

  // Cálculos de KPIs
  const kpis = useMemo(() => {
    const totalOcorrencias = data.reduce((acc, row) => acc + (Number(row.total_acidentes) || 1), 0);
    const totalPessoas = data.reduce((acc, row) => acc + (Number(row.total_pessoas) || 0), 0);
    const totalMortos = data.reduce((acc, row) => acc + (Number(row.total_mortos) || 0), 0);
    const totalFeridosGraves = data.reduce((acc, row) => acc + (Number(row.total_feridos_graves) || 0), 0);
    const letalidade = totalOcorrencias > 0 ? ((totalMortos / totalOcorrencias) * 100).toFixed(2) : '0.00';

    return {
      totalOcorrencias,
      totalPessoas,
      totalMortos,
      totalFeridosGraves,
      letalidade
    };
  }, [data]);

  // Gráfico 1: Fase do Dia (Tese central do Storytelling)
  const faseDiaData = useMemo(() => {
    const map = {};
    data.forEach(row => {
      const fase = row.fase_dia || 'Não Informado';
      if (!map[fase]) {
        map[fase] = { fase, acidentes: 0, mortos: 0 };
      }
      map[fase].acidentes += Number(row.total_acidentes) || 1;
      map[fase].mortos += Number(row.total_mortos) || 0;
    });
    return Object.values(map).sort((a, b) => b.acidentes - a.acidentes);
  }, [data]);

  // Gráfico 2: Top Causas
  const causasData = useMemo(() => {
    const map = {};
    data.forEach(row => {
      const causa = row.causa_acidente || 'Outras';
      if (!map[causa]) {
        map[causa] = { causa, total: 0 };
      }
      map[causa].total += Number(row.total_acidentes) || 1;
    });
    return Object.values(map)
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);
  }, [data]);

  // Gráfico 3: Evolução Anual
  const evolucaoData = useMemo(() => {
    const map = {};
    data.forEach(row => {
      const ano = row.ano;
      if (!ano) return;
      if (!map[ano]) {
        map[ano] = { ano: String(ano), acidentes: 0, mortos: 0 };
      }
      map[ano].acidentes += Number(row.total_acidentes) || 1;
      map[ano].mortos += Number(row.total_mortos) || 0;
    });
    return Object.values(map).sort((a, b) => Number(a.ano) - Number(b.ano));
  }, [data]);

  // Gráfico 4: Top Estados
  const estadosData = useMemo(() => {
    const map = {};
    data.forEach(row => {
      const uf = row.sigla_uf || 'Ignorado';
      if (!map[uf]) {
        map[uf] = { uf, total: 0, mortos: 0 };
      }
      map[uf].total += Number(row.total_acidentes) || 1;
      map[uf].mortos += Number(row.total_mortos) || 0;
    });
    return Object.values(map)
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);
  }, [data]);

  // Paginação da tabela
  const totalPages = Math.ceil(data.length / rowsPerPage) || 1;
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage]);

  const resetFilters = () => {
    setSelectedYear('todos');
    setSelectedUF('todas');
    setSelectedFase('todas');
    setSelectedClima('todos');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Topo Institucional */}
      <header className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
                Business Intelligence A2
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Acidentes em Rodovias Federais (PRF)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Análise de circunstâncias, luminosidade e severidade (2021 a 2026)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 text-xs rounded-md bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              Base: 390.879 linhas
            </span>
            <span className="px-3 py-1.5 text-xs rounded-md bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Supabase Ao Vivo
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Storytelling Intro */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 rounded-xl border border-slate-800 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Narrativa e Storytelling dos Dados
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                O estudo investiga como as condições de visibilidade e o período do dia afetam a gravidade dos sinistros nas rodovias brasileiras. 
                Os registros comprovam que, embora o maior número absoluto de colisões aconteça durante o 
                <span className="text-emerald-400 font-medium"> Pleno dia</span> devido ao tráfego denso, os acidentes ao 
                <span className="text-amber-400 font-medium"> Anoitecer</span> e na 
                <span className="text-indigo-400 font-medium"> Plena Noite</span> têm uma probabilidade muito maior de resultar em 
                <span className="text-rose-400 font-medium"> vítimas fatais</span>.
              </p>
            </div>
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center gap-2 transition"
              title="Atualizar dados do Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
              Atualizar
            </button>
          </div>
        </section>

        {/* Barra de Filtros Dinâmicos */}
        <section className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-indigo-400" />
              Filtros Dinâmicos (Supabase)
            </h3>
            {(selectedYear !== 'todos' || selectedUF !== 'todas' || selectedFase !== 'todas' || selectedClima !== 'todos') && (
              <button
                onClick={resetFilters}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline"
              >
                Limpar filtros
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Ano
              </label>
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="todos">Todos os anos (2021 a 2026)</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Estado (UF)
              </label>
              <select
                value={selectedUF}
                onChange={e => setSelectedUF(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="todas">Todas as UFs</option>
                <option value="MG">MG - Minas Gerais</option>
                <option value="PR">PR - Paraná</option>
                <option value="SC">SC - Santa Catarina</option>
                <option value="RS">RS - Rio Grande do Sul</option>
                <option value="SP">SP - São Paulo</option>
                <option value="RJ">RJ - Rio de Janeiro</option>
                <option value="BA">BA - Bahia</option>
                <option value="GO">GO - Goiás</option>
                <option value="PE">PE - Pernambuco</option>
                <option value="RO">RO - Rondônia</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                <SunMedium className="w-3.5 h-3.5" /> Fase do Dia
              </label>
              <select
                value={selectedFase}
                onChange={e => setSelectedFase(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="todas">Todas as fases</option>
                <option value="Pleno dia">Pleno dia</option>
                <option value="Plena Noite">Plena Noite</option>
                <option value="Anoitecer">Anoitecer</option>
                <option value="Amanhecer">Amanhecer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1.5">
                Condição Climática
              </label>
              <select
                value={selectedClima}
                onChange={e => setSelectedClima(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="todos">Todas as condições</option>
                <option value="Céu Claro">Céu Claro</option>
                <option value="Chuva">Chuva</option>
                <option value="Nublado">Nublado</option>
                <option value="Nevoeiro/Neblina">Nevoeiro/Neblina</option>
              </select>
            </div>
          </div>
        </section>

        {/* Indicadores Principais (KPIs) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total de Ocorrências</span>
              <AlertTriangle className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {loading ? '...' : kpis.totalOcorrencias.toLocaleString('pt-BR')}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">Amostra do filtro</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Pessoas Envolvidas</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-indigo-400">
              {loading ? '...' : kpis.totalPessoas.toLocaleString('pt-BR')}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">Condutores e passageiros</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Vítimas Fatais (Mortos)</span>
              <Skull className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-bold text-rose-500">
              {loading ? '...' : kpis.totalMortos.toLocaleString('pt-BR')}
            </div>
            <span className="text-xs text-rose-400/80 mt-1 block">Taxa: {kpis.letalidade}%</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Feridos Graves</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400">
              {loading ? '...' : kpis.totalFeridosGraves.toLocaleString('pt-BR')}
            </div>
            <span className="text-xs text-slate-500 mt-1 block">Lesões de alta gravidade</span>
          </div>
        </section>

        {/* Gráficos Linha 1 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico 1: Fase do Dia */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-white">Acidentes vs. Mortes por Fase do Dia</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  Tese Central
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Volume de sinistros comparado à quantidade de vítimas fatais por iluminação.
              </p>
            </div>
            <div className="h-72 w-full">
              {faseDiaData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={faseDiaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="fase" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8 }}
                      labelStyle={{ color: '#f8fafc', fontWeight: 600 }}
                    />
                    <Legend />
                    <Bar dataKey="acidentes" name="Acidentes" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="mortos" name="Vítimas Fatais" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-500">Sem dados</div>
              )}
            </div>
          </div>

          {/* Gráfico 2: Causas Mais Frequentes */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-white mb-2">Principais Causas Registradas</h3>
              <p className="text-xs text-slate-400 mb-4">
                Fatores causais mais reincidentes nas rodovias federais.
              </p>
            </div>
            <div className="h-72 w-full">
              {causasData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={causasData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                    <YAxis dataKey="causa" type="category" stroke="#94a3b8" fontSize={10} width={130} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8 }}
                    />
                    <Bar dataKey="total" name="Ocorrências" fill="#38bdf8" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-500">Sem dados</div>
              )}
            </div>
          </div>
        </section>

        {/* Gráficos Linha 2 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico 3: Evolução Temporal */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-white mb-2">Evolução Histórica das Ocorrências</h3>
              <p className="text-xs text-slate-400 mb-4">
                Série temporal no período de 2021 a 2026.
              </p>
            </div>
            <div className="h-72 w-full">
              {evolucaoData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evolucaoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="ano" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8 }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="acidentes" name="Acidentes" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="mortos" name="Mortos" stroke="#f43f5e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-500">Sem dados</div>
              )}
            </div>
          </div>

          {/* Gráfico 4: Estados */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-white mb-2">Estados (UFs) com Maior Volume</h3>
              <p className="text-xs text-slate-400 mb-4">
                Concentração territorial das ocorrências na base.
              </p>
            </div>
            <div className="h-72 w-full">
              {estadosData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={estadosData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="uf" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8 }}
                    />
                    <Bar dataKey="total" name="Acidentes" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-500">Sem dados</div>
              )}
            </div>
          </div>
        </section>

        {/* Tabela de Amostra */}
        <section className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">Dados em Tempo Real (Supabase)</h3>
              <p className="text-xs text-slate-400">Visualização detalhada dos registros retornados.</p>
            </div>
            <span className="text-xs text-slate-400">
              Página {currentPage} de {totalPages} ({data.length} registros no filtro)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Data</th>
                  <th className="py-3 px-4">UF</th>
                  <th className="py-3 px-4">BR</th>
                  <th className="py-3 px-4">Fase do Dia</th>
                  <th className="py-3 px-4">Causa</th>
                  <th className="py-3 px-4 text-center">Acidentes</th>
                  <th className="py-3 px-4 text-center">Mortos</th>
                  <th className="py-3 px-4 text-center">Feridos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {paginatedRows.length > 0 ? (
                  paginatedRows.map(row => (
                    <tr key={row.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 text-white font-medium">{row.data}</td>
                      <td className="py-3 px-4">{row.sigla_uf}</td>
                      <td className="py-3 px-4">BR-{row.br}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                          {row.fase_dia}
                        </span>
                      </td>
                      <td className="py-3 px-4 truncate max-w-xs">{row.causa_acidente}</td>
                      <td className="py-3 px-4 text-center font-semibold text-white">{row.total_acidentes}</td>
                      <td className="py-3 px-4 text-center text-rose-400 font-medium">{row.total_mortos}</td>
                      <td className="py-3 px-4 text-center text-amber-400">{row.total_feridos}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-slate-500">
                      {loading ? 'Carregando dados...' : 'Nenhum registro encontrado para este filtro.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300"
              >
                Anterior
              </button>
              <span className="text-xs text-slate-400">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300"
              >
                Próxima
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        Projeto Acadêmico de Business Intelligence (A2) | Dados Oficiais: PRF & Base dos Dados | Conectado ao Supabase
      </footer>
    </div>
  );
}
