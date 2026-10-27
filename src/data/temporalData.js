// Dados consolidados oficiais de Análise Temporal extraídos da PRF
export const DIAS_SEMANA_BRASIL = [
  {
    "dia": "Segunda",
    "acidentes": 54006,
    "mortos": 4195,
    "feridos": 62123
  },
  {
    "dia": "Terça",
    "acidentes": 48343,
    "mortos": 3583,
    "feridos": 54869
  },
  {
    "dia": "Quarta",
    "acidentes": 49621,
    "mortos": 3752,
    "feridos": 55794
  },
  {
    "dia": "Quinta",
    "acidentes": 50977,
    "mortos": 3896,
    "feridos": 57232
  },
  {
    "dia": "Sexta",
    "acidentes": 60556,
    "mortos": 4813,
    "feridos": 68588
  },
  {
    "dia": "Sábado",
    "acidentes": 63786,
    "mortos": 5971,
    "feridos": 73287
  },
  {
    "dia": "Domingo",
    "acidentes": 64093,
    "mortos": 6582,
    "feridos": 75672
  }
];

export const SERIE_TEMPORAL_DATA = [
  {
    "ano": "2021",
    "acidentes": 64567,
    "mortos": 5397,
    "feridos": 71873
  },
  {
    "ano": "2022",
    "acidentes": 64606,
    "mortos": 5441,
    "feridos": 73065
  },
  {
    "ano": "2023",
    "acidentes": 67766,
    "mortos": 5627,
    "feridos": 78463
  },
  {
    "ano": "2024",
    "acidentes": 73202,
    "mortos": 6163,
    "feridos": 84595
  },
  {
    "ano": "2025",
    "acidentes": 72529,
    "mortos": 6043,
    "feridos": 83550
  },
  {
    "ano": "2026",
    "acidentes": 48712,
    "mortos": 4121,
    "feridos": 56019
  }
];

export const ESTADOS_DIAS_DATA = {
  "MG": {
    "sigla": "MG",
    "nome": "Minas Gerais",
    "total": 50819,
    "pico_dia": "Domingo",
    "pico_qtd": 8750,
    "pico_pct": 17.2,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 7107
      },
      {
        "dia": "Terça",
        "acidentes": 6153
      },
      {
        "dia": "Quarta",
        "acidentes": 6315
      },
      {
        "dia": "Quinta",
        "acidentes": 6510
      },
      {
        "dia": "Sexta",
        "acidentes": 7741
      },
      {
        "dia": "Sábado",
        "acidentes": 8243
      },
      {
        "dia": "Domingo",
        "acidentes": 8750
      }
    ]
  },
  "SC": {
    "sigla": "SC",
    "nome": "Santa Catarina",
    "total": 45452,
    "pico_dia": "Sábado",
    "pico_qtd": 7743,
    "pico_pct": 17.0,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 6079
      },
      {
        "dia": "Terça",
        "acidentes": 5589
      },
      {
        "dia": "Quarta",
        "acidentes": 5722
      },
      {
        "dia": "Quinta",
        "acidentes": 5907
      },
      {
        "dia": "Sexta",
        "acidentes": 7310
      },
      {
        "dia": "Sábado",
        "acidentes": 7743
      },
      {
        "dia": "Domingo",
        "acidentes": 7102
      }
    ]
  },
  "PR": {
    "sigla": "PR",
    "nome": "Paraná",
    "total": 42329,
    "pico_dia": "Domingo",
    "pico_qtd": 6961,
    "pico_pct": 16.4,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 5572
      },
      {
        "dia": "Terça",
        "acidentes": 5192
      },
      {
        "dia": "Quarta",
        "acidentes": 5422
      },
      {
        "dia": "Quinta",
        "acidentes": 5599
      },
      {
        "dia": "Sexta",
        "acidentes": 6635
      },
      {
        "dia": "Sábado",
        "acidentes": 6948
      },
      {
        "dia": "Domingo",
        "acidentes": 6961
      }
    ]
  },
  "RJ": {
    "sigla": "RJ",
    "nome": "Rio de Janeiro",
    "total": 32039,
    "pico_dia": "Domingo",
    "pico_qtd": 5062,
    "pico_pct": 15.8,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 4622
      },
      {
        "dia": "Terça",
        "acidentes": 4028
      },
      {
        "dia": "Quarta",
        "acidentes": 4237
      },
      {
        "dia": "Quinta",
        "acidentes": 4163
      },
      {
        "dia": "Sexta",
        "acidentes": 4905
      },
      {
        "dia": "Sábado",
        "acidentes": 5022
      },
      {
        "dia": "Domingo",
        "acidentes": 5062
      }
    ]
  },
  "RS": {
    "sigla": "RS",
    "nome": "Rio Grande do Sul",
    "total": 27555,
    "pico_dia": "Sábado",
    "pico_qtd": 4524,
    "pico_pct": 16.4,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 3812
      },
      {
        "dia": "Terça",
        "acidentes": 3340
      },
      {
        "dia": "Quarta",
        "acidentes": 3326
      },
      {
        "dia": "Quinta",
        "acidentes": 3693
      },
      {
        "dia": "Sexta",
        "acidentes": 4395
      },
      {
        "dia": "Sábado",
        "acidentes": 4524
      },
      {
        "dia": "Domingo",
        "acidentes": 4465
      }
    ]
  },
  "SP": {
    "sigla": "SP",
    "nome": "São Paulo",
    "total": 25991,
    "pico_dia": "Domingo",
    "pico_qtd": 4123,
    "pico_pct": 15.9,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 3566
      },
      {
        "dia": "Terça",
        "acidentes": 3309
      },
      {
        "dia": "Quarta",
        "acidentes": 3375
      },
      {
        "dia": "Quinta",
        "acidentes": 3470
      },
      {
        "dia": "Sexta",
        "acidentes": 4047
      },
      {
        "dia": "Sábado",
        "acidentes": 4101
      },
      {
        "dia": "Domingo",
        "acidentes": 4123
      }
    ]
  },
  "BA": {
    "sigla": "BA",
    "nome": "Bahia",
    "total": 21620,
    "pico_dia": "Domingo",
    "pico_qtd": 3620,
    "pico_pct": 16.7,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 3070
      },
      {
        "dia": "Terça",
        "acidentes": 2656
      },
      {
        "dia": "Quarta",
        "acidentes": 2742
      },
      {
        "dia": "Quinta",
        "acidentes": 2772
      },
      {
        "dia": "Sexta",
        "acidentes": 3296
      },
      {
        "dia": "Sábado",
        "acidentes": 3464
      },
      {
        "dia": "Domingo",
        "acidentes": 3620
      }
    ]
  },
  "GO": {
    "sigla": "GO",
    "nome": "Goiás",
    "total": 18248,
    "pico_dia": "Domingo",
    "pico_qtd": 3285,
    "pico_pct": 18.0,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 2454
      },
      {
        "dia": "Terça",
        "acidentes": 2175
      },
      {
        "dia": "Quarta",
        "acidentes": 2239
      },
      {
        "dia": "Quinta",
        "acidentes": 2332
      },
      {
        "dia": "Sexta",
        "acidentes": 2688
      },
      {
        "dia": "Sábado",
        "acidentes": 3075
      },
      {
        "dia": "Domingo",
        "acidentes": 3285
      }
    ]
  },
  "PE": {
    "sigla": "PE",
    "nome": "Pernambuco",
    "total": 16701,
    "pico_dia": "Domingo",
    "pico_qtd": 2638,
    "pico_pct": 15.8,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 2439
      },
      {
        "dia": "Terça",
        "acidentes": 2150
      },
      {
        "dia": "Quarta",
        "acidentes": 2159
      },
      {
        "dia": "Quinta",
        "acidentes": 2231
      },
      {
        "dia": "Sexta",
        "acidentes": 2525
      },
      {
        "dia": "Sábado",
        "acidentes": 2559
      },
      {
        "dia": "Domingo",
        "acidentes": 2638
      }
    ]
  },
  "ES": {
    "sigla": "ES",
    "nome": "Espírito Santo",
    "total": 13670,
    "pico_dia": "Sexta",
    "pico_qtd": 2252,
    "pico_pct": 16.5,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1891
      },
      {
        "dia": "Terça",
        "acidentes": 1713
      },
      {
        "dia": "Quarta",
        "acidentes": 1737
      },
      {
        "dia": "Quinta",
        "acidentes": 1800
      },
      {
        "dia": "Sexta",
        "acidentes": 2252
      },
      {
        "dia": "Sábado",
        "acidentes": 2185
      },
      {
        "dia": "Domingo",
        "acidentes": 2092
      }
    ]
  },
  "MT": {
    "sigla": "MT",
    "nome": "Mato Grosso",
    "total": 13550,
    "pico_dia": "Sábado",
    "pico_qtd": 2223,
    "pico_pct": 16.4,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1907
      },
      {
        "dia": "Terça",
        "acidentes": 1668
      },
      {
        "dia": "Quarta",
        "acidentes": 1766
      },
      {
        "dia": "Quinta",
        "acidentes": 1833
      },
      {
        "dia": "Sexta",
        "acidentes": 1970
      },
      {
        "dia": "Sábado",
        "acidentes": 2223
      },
      {
        "dia": "Domingo",
        "acidentes": 2183
      }
    ]
  },
  "MS": {
    "sigla": "MS",
    "nome": "Mato Grosso do Sul",
    "total": 9589,
    "pico_dia": "Domingo",
    "pico_qtd": 1682,
    "pico_pct": 17.5,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1255
      },
      {
        "dia": "Terça",
        "acidentes": 1160
      },
      {
        "dia": "Quarta",
        "acidentes": 1219
      },
      {
        "dia": "Quinta",
        "acidentes": 1248
      },
      {
        "dia": "Sexta",
        "acidentes": 1396
      },
      {
        "dia": "Sábado",
        "acidentes": 1629
      },
      {
        "dia": "Domingo",
        "acidentes": 1682
      }
    ]
  },
  "PB": {
    "sigla": "PB",
    "nome": "Paraíba",
    "total": 9575,
    "pico_dia": "Domingo",
    "pico_qtd": 1543,
    "pico_pct": 16.1,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1346
      },
      {
        "dia": "Terça",
        "acidentes": 1215
      },
      {
        "dia": "Quarta",
        "acidentes": 1250
      },
      {
        "dia": "Quinta",
        "acidentes": 1234
      },
      {
        "dia": "Sexta",
        "acidentes": 1523
      },
      {
        "dia": "Sábado",
        "acidentes": 1464
      },
      {
        "dia": "Domingo",
        "acidentes": 1543
      }
    ]
  },
  "RO": {
    "sigla": "RO",
    "nome": "Rondônia",
    "total": 8409,
    "pico_dia": "Sexta",
    "pico_qtd": 1371,
    "pico_pct": 16.3,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1172
      },
      {
        "dia": "Terça",
        "acidentes": 1102
      },
      {
        "dia": "Quarta",
        "acidentes": 1105
      },
      {
        "dia": "Quinta",
        "acidentes": 1089
      },
      {
        "dia": "Sexta",
        "acidentes": 1371
      },
      {
        "dia": "Sábado",
        "acidentes": 1303
      },
      {
        "dia": "Domingo",
        "acidentes": 1267
      }
    ]
  },
  "RN": {
    "sigla": "RN",
    "nome": "Rio Grande do Norte",
    "total": 8233,
    "pico_dia": "Sábado",
    "pico_qtd": 1271,
    "pico_pct": 15.4,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1234
      },
      {
        "dia": "Terça",
        "acidentes": 1072
      },
      {
        "dia": "Quarta",
        "acidentes": 1126
      },
      {
        "dia": "Quinta",
        "acidentes": 1069
      },
      {
        "dia": "Sexta",
        "acidentes": 1268
      },
      {
        "dia": "Sábado",
        "acidentes": 1271
      },
      {
        "dia": "Domingo",
        "acidentes": 1193
      }
    ]
  },
  "CE": {
    "sigla": "CE",
    "nome": "Ceará",
    "total": 7838,
    "pico_dia": "Sexta",
    "pico_qtd": 1262,
    "pico_pct": 16.1,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 1101
      },
      {
        "dia": "Terça",
        "acidentes": 991
      },
      {
        "dia": "Quarta",
        "acidentes": 1000
      },
      {
        "dia": "Quinta",
        "acidentes": 1012
      },
      {
        "dia": "Sexta",
        "acidentes": 1262
      },
      {
        "dia": "Sábado",
        "acidentes": 1252
      },
      {
        "dia": "Domingo",
        "acidentes": 1220
      }
    ]
  },
  "PI": {
    "sigla": "PI",
    "nome": "Piauí",
    "total": 7513,
    "pico_dia": "Sábado",
    "pico_qtd": 1351,
    "pico_pct": 18.0,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 957
      },
      {
        "dia": "Terça",
        "acidentes": 914
      },
      {
        "dia": "Quarta",
        "acidentes": 892
      },
      {
        "dia": "Quinta",
        "acidentes": 926
      },
      {
        "dia": "Sexta",
        "acidentes": 1132
      },
      {
        "dia": "Sábado",
        "acidentes": 1351
      },
      {
        "dia": "Domingo",
        "acidentes": 1341
      }
    ]
  },
  "MA": {
    "sigla": "MA",
    "nome": "Maranhão",
    "total": 6677,
    "pico_dia": "Sábado",
    "pico_qtd": 1195,
    "pico_pct": 17.9,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 891
      },
      {
        "dia": "Terça",
        "acidentes": 764
      },
      {
        "dia": "Quarta",
        "acidentes": 797
      },
      {
        "dia": "Quinta",
        "acidentes": 864
      },
      {
        "dia": "Sexta",
        "acidentes": 980
      },
      {
        "dia": "Sábado",
        "acidentes": 1195
      },
      {
        "dia": "Domingo",
        "acidentes": 1186
      }
    ]
  },
  "DF": {
    "sigla": "DF",
    "nome": "Distrito Federal",
    "total": 5663,
    "pico_dia": "Sexta",
    "pico_qtd": 889,
    "pico_pct": 15.7,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 831
      },
      {
        "dia": "Terça",
        "acidentes": 687
      },
      {
        "dia": "Quarta",
        "acidentes": 753
      },
      {
        "dia": "Quinta",
        "acidentes": 794
      },
      {
        "dia": "Sexta",
        "acidentes": 889
      },
      {
        "dia": "Sábado",
        "acidentes": 852
      },
      {
        "dia": "Domingo",
        "acidentes": 857
      }
    ]
  },
  "PA": {
    "sigla": "PA",
    "nome": "Pará",
    "total": 5435,
    "pico_dia": "Domingo",
    "pico_qtd": 1005,
    "pico_pct": 18.5,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 716
      },
      {
        "dia": "Terça",
        "acidentes": 679
      },
      {
        "dia": "Quarta",
        "acidentes": 647
      },
      {
        "dia": "Quinta",
        "acidentes": 626
      },
      {
        "dia": "Sexta",
        "acidentes": 838
      },
      {
        "dia": "Sábado",
        "acidentes": 924
      },
      {
        "dia": "Domingo",
        "acidentes": 1005
      }
    ]
  },
  "TO": {
    "sigla": "TO",
    "nome": "Tocantins",
    "total": 3628,
    "pico_dia": "Sábado",
    "pico_qtd": 666,
    "pico_pct": 18.4,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 452
      },
      {
        "dia": "Terça",
        "acidentes": 457
      },
      {
        "dia": "Quarta",
        "acidentes": 470
      },
      {
        "dia": "Quinta",
        "acidentes": 433
      },
      {
        "dia": "Sexta",
        "acidentes": 534
      },
      {
        "dia": "Sábado",
        "acidentes": 666
      },
      {
        "dia": "Domingo",
        "acidentes": 616
      }
    ]
  },
  "AL": {
    "sigla": "AL",
    "nome": "Alagoas",
    "total": 3556,
    "pico_dia": "Domingo",
    "pico_qtd": 619,
    "pico_pct": 17.4,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 509
      },
      {
        "dia": "Terça",
        "acidentes": 410
      },
      {
        "dia": "Quarta",
        "acidentes": 456
      },
      {
        "dia": "Quinta",
        "acidentes": 458
      },
      {
        "dia": "Sexta",
        "acidentes": 519
      },
      {
        "dia": "Sábado",
        "acidentes": 585
      },
      {
        "dia": "Domingo",
        "acidentes": 619
      }
    ]
  },
  "SE": {
    "sigla": "SE",
    "nome": "Sergipe",
    "total": 3145,
    "pico_dia": "Sábado",
    "pico_qtd": 522,
    "pico_pct": 16.6,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 443
      },
      {
        "dia": "Terça",
        "acidentes": 433
      },
      {
        "dia": "Quarta",
        "acidentes": 368
      },
      {
        "dia": "Quinta",
        "acidentes": 398
      },
      {
        "dia": "Sexta",
        "acidentes": 466
      },
      {
        "dia": "Sábado",
        "acidentes": 522
      },
      {
        "dia": "Domingo",
        "acidentes": 515
      }
    ]
  },
  "AC": {
    "sigla": "AC",
    "nome": "Acre",
    "total": 1483,
    "pico_dia": "Sábado",
    "pico_qtd": 238,
    "pico_pct": 16.0,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 234
      },
      {
        "dia": "Terça",
        "acidentes": 190
      },
      {
        "dia": "Quarta",
        "acidentes": 211
      },
      {
        "dia": "Quinta",
        "acidentes": 188
      },
      {
        "dia": "Sexta",
        "acidentes": 210
      },
      {
        "dia": "Sábado",
        "acidentes": 238
      },
      {
        "dia": "Domingo",
        "acidentes": 212
      }
    ]
  },
  "RR": {
    "sigla": "RR",
    "nome": "Roraima",
    "total": 994,
    "pico_dia": "Domingo",
    "pico_qtd": 213,
    "pico_pct": 21.4,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 126
      },
      {
        "dia": "Terça",
        "acidentes": 95
      },
      {
        "dia": "Quarta",
        "acidentes": 109
      },
      {
        "dia": "Quinta",
        "acidentes": 117
      },
      {
        "dia": "Sexta",
        "acidentes": 166
      },
      {
        "dia": "Sábado",
        "acidentes": 168
      },
      {
        "dia": "Domingo",
        "acidentes": 213
      }
    ]
  },
  "AP": {
    "sigla": "AP",
    "nome": "Amapá",
    "total": 930,
    "pico_dia": "Domingo",
    "pico_qtd": 188,
    "pico_pct": 20.2,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 127
      },
      {
        "dia": "Terça",
        "acidentes": 109
      },
      {
        "dia": "Quarta",
        "acidentes": 101
      },
      {
        "dia": "Quinta",
        "acidentes": 113
      },
      {
        "dia": "Sexta",
        "acidentes": 125
      },
      {
        "dia": "Sábado",
        "acidentes": 167
      },
      {
        "dia": "Domingo",
        "acidentes": 188
      }
    ]
  },
  "AM": {
    "sigla": "AM",
    "nome": "Amazonas",
    "total": 740,
    "pico_dia": "Domingo",
    "pico_qtd": 155,
    "pico_pct": 20.9,
    "distribuicao": [
      {
        "dia": "Segunda",
        "acidentes": 93
      },
      {
        "dia": "Terça",
        "acidentes": 92
      },
      {
        "dia": "Quarta",
        "acidentes": 77
      },
      {
        "dia": "Quinta",
        "acidentes": 98
      },
      {
        "dia": "Sexta",
        "acidentes": 113
      },
      {
        "dia": "Sábado",
        "acidentes": 112
      },
      {
        "dia": "Domingo",
        "acidentes": 155
      }
    ]
  }
};
