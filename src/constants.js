export const colors = {
    whiteBg: '#f5f5f5',
    blackText: '#393e46',
    grayBorder: '#cacaca',
    primary: '#1fb4ff',
    confirm: '#4CAC4A',
    calibrate: '#FFAA5C',
    red: '#bf4f74',
}

export const API_URL = import.meta.env.VITE_API_URL
export const MODEL_URL_Polichinelo = import.meta.env.VITE_MODEL_POLICHINELO_URL
export const MODEL_URL_Abdominal = import.meta.env.VITE_MODEL_ABDOMINAL_URL
export const MODEL_URL_Agachamento = import.meta.env.VITE_MODEL_AGACHAMENTO_URL
export const MODEL_URL_Burpees = import.meta.env.VITE_MODEL_BURPEE_URL
export const MODEL_URL_Afundo = import.meta.env.VITE_MODEL_AFUNDO_URL
export const MODEL_URL_PranchaDin = import.meta.env.VITE_MODEL_PRANCHA_URL
export const MODEL_URL_Superman = import.meta.env.VITE_MODEL_SUPERMAN_URL
export const MODEL_URL_Flexao = import.meta.env.VITE_MODEL_FLEXAO_URL

export const MODEL_URL_ABDOMINAL_REMADOR = import.meta.env.VITE_MODEL_ABDOMINAL_REMADOR_URL
export const MODEL_URL_OMBROS_LATERAIS = import.meta.env.VITE_MODEL_OMBROS_LATERAIS_URL
export const MODEL_URL_REMADA_ALTA = import.meta.env.VITE_MODEL_REMADA_ALTA_URL
export const MODEL_URL_CRUCIFIXO_INVERSO = import.meta.env.VITE_MODEL_CRUCIFIXO_INVERSO_URL
export const MODEL_URL_REMADA = import.meta.env.VITE_MODEL_REMADA_URL

export const MODEL_URL_LABORAL_ELEVACAO = import.meta.env.VITE_MODEL_LABORAL_ELEVACAO_URL
export const MODEL_URL_LABORAL_ROTACAO = import.meta.env.VITE_LABORAL_ROTACAO_URL
export const MODEL_URL_LABORAL_BALAO = import.meta.env.VITE_LABORAL_BALAO_URL

export const exerciseDict = {
    1: {
        model: MODEL_URL_Polichinelo,
        title: 'Polichinelos',
        URL: MODEL_URL_Polichinelo,
    },
    2: {
        model: MODEL_URL_Flexao,
        title: 'Flexão',
        URL: MODEL_URL_Flexao
    },
    3: {
        model: MODEL_URL_Burpees,
        title: 'Burpee',
        URL: MODEL_URL_Burpees,
    },
    4: {
        model: MODEL_URL_Agachamento,
        title: 'Agachamento',
        URL: MODEL_URL_Agachamento,
    },
    5: {
        model: MODEL_URL_Abdominal,
        title: 'Abdominal',
        URL: MODEL_URL_Abdominal,
    },
    6: {
        model: MODEL_URL_Flexao,
        title: 'Flexão diamante',
        URL: MODEL_URL_Flexao
    },
    7: {
        model: MODEL_URL_Afundo,
        title: 'Afundo',
        URL: MODEL_URL_Afundo
    },
    8: {
        model: MODEL_URL_Flexao,
        title: 'Flexão diamante com apoio',
        URL: MODEL_URL_Flexao
    },
    9: {
        model: MODEL_URL_Flexao,
        title: 'Flexão de braço com apoio',
        URL: MODEL_URL_Flexao
    },
    10: {
        model: MODEL_URL_ABDOMINAL_REMADOR,
        title: 'Abdominal remador',
        URL: MODEL_URL_ABDOMINAL_REMADOR
    },
    11: {
        model: MODEL_URL_CRUCIFIXO_INVERSO,
        title: 'Crucifixo inverso',
        URL: MODEL_URL_CRUCIFIXO_INVERSO
    },
    12: {
        model: MODEL_URL_REMADA,
        title: 'Remada',
        URL: MODEL_URL_REMADA
    },
    13: {
        model: MODEL_URL_OMBROS_LATERAIS,
        title: 'Ombros laterais',
        URL: MODEL_URL_OMBROS_LATERAIS
    },
    14: {
        model: MODEL_URL_REMADA_ALTA,
        title: 'Remada alta',
        URL: MODEL_URL_REMADA_ALTA
    },
    16: {
        model: MODEL_URL_LABORAL_ELEVACAO,
        title: 'Laboral - Elevação de Ombros',
        URL: MODEL_URL_LABORAL_ELEVACAO
    },
    17: {
        model: MODEL_URL_LABORAL_ROTACAO,
        title: 'Laboral - Rotação de Quadril',
        URL: MODEL_URL_LABORAL_ROTACAO
    },
    18: {
        model: MODEL_URL_LABORAL_BALAO,
        title: 'Laboral - Balão entre Pernas',
        URL: MODEL_URL_LABORAL_BALAO
    },
}

export const routine1 = {
    1: {
        id: 1,
        qtd: 10,
        next: 2,
    },
    2: {
        id: 3,
        qtd: 10,
        next: 3,
    },
    3: {
        id: 4,
        qtd: 10,
        next: 4,
    },
    4: {
        id: 5,
        qtd: 10,
        next: 5,
    },
    5: {
        id: 2,
        qtd: 5,
        next: false,
    }
}

export const routine2 = {
    1: {
        id: 1,
        qtd: 30,
        next: 2,
    },
    2: {
        id: 1,
        qtd: 30,
        next: 3,
    },
    3: {
        id: 1,
        qtd: 30,
        next: 4,
    },
    4: {
        id: 4,
        qtd: 10,
        next: 5,
    },
    5: {
        id: 4,
        qtd: 10,
        next: 6,
    },
    6: {
        id: 4,
        qtd: 10,
        next: 7,
    },
    7: {
        id: 5,
        qtd: 20,
        next: 8,
    },
    8: {
        id: 5,
        qtd: 20,
        next: 9,
    },
    9: {    
        id: 5,
        qtd: 20,
        next: false,
    },
}

export const peitoOmbroTriceps = {
    1: {
        id: 2,
        qtd: 15,
        next: 2,
    },
    2: {
        id: 2,
        qtd: 15,
        next: 3,
    },
    3: {
        id: 2,
        qtd: 15,
        next: 4,
    },
    4: {
        id: 6,
        qtd: 15,
        next: 5,
    },
    5: {
        id: 6,
        qtd: 15,
        next: 6,
    },
    6: {
        id: 6,
        qtd: 15,
        next: 7,
    },
    7: {
        id: 13,
        qtd: 15,
        next: 8,
    },
    8: {
        id: 13,
        qtd: 15,
        next: 9,
    },
    9: {    
        id: 13,
        qtd: 15,
        next: 10,
    },
    10: {    
        id: 14,
        qtd: 15,
        next: 11,
    },
    11: {    
        id: 14,
        qtd: 15,
        next: 12,
    },
    12: {    
        id: 14,
        qtd: 15,
        next: 13,
    },
    13: {    
        id: 3,
        qtd: 10,
        next: 14,
    },
    14: {    
        id: 3,
        qtd: 10,
        next: 15,
    },
    15: {    
        id: 3,
        qtd: 10,
        next: 16,
    },
    16: {    
        id: 11,
        qtd: 15,
        next: 17,
    },
    17: {    
        id: 11,
        qtd: 15,
        next: 18,
    },
    18: {    
        id: 11,
        qtd: 15,
        next: false,
    },
}

export const pernasAbdomenCostas = {
    1: {
        id: 7,
        qtd: 15,
        next: 2,
    },
    2: {
        id: 7,
        qtd: 15,
        next: 3,
    },
    3: {
        id: 7,
        qtd: 15,
        next: 4,
    },
    4: {
        id: 7,
        qtd: 15,
        next: 5,
    },
    5: {
        id: 12,
        qtd: 12,
        next: 6,
    },
    6: {
        id: 12,
        qtd: 12,
        next: 7,
    },
    7: {
        id: 12,
        qtd: 12,
        next: 8,
    },
    8: {
        id: 4,
        qtd: 15,
        next: 9,
    },
    9: {    
        id: 4,
        qtd: 15,
        next: 10,
    },
    10: {    
        id: 4,
        qtd: 15,
        next: 11,
    },
    11: {    
        id: 9,
        qtd: 15,
        next: 12,
    },
    12: {    
        id: 9,
        qtd: 15,
        next: 13,
    },
    13: {    
        id: 9,
        qtd: 10,
        next: 14,
    },
    14: {    
        id: 1,
        qtd: 25,
        next: 15,
    },
    15: {    
        id: 1,
        qtd: 25,
        next: 16,
    },
    16: {    
        id: 1,
        qtd: 25,
        next: 17,
    },
    17: {    
        id: 10,
        qtd: 20,
        next: 18,
    },
    18: {    
        id: 10,
        qtd: 20,
        next: 19,
    },
    18: {    
        id: 10,
        qtd: 20,
        next: false,
    },
}

