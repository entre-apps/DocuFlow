
import { ClientData, PJData, AddressChangeData } from '../types';

export const formatDate = (dateString: string): string => {
  if (!dateString) {
      return new Date().toLocaleDateString('pt-BR');
  }
  try {
      // Handle standard YYYY-MM-DD
      if (dateString.includes('-')) {
        const [year, month, day] = dateString.split('-');
        if (day && month && year) {
            return `${day}/${month}/${year}`;
        }
      }
      // Handle CRM style DD/MM/YYYY simply by returning if already formatted, 
      // or basic validation could go here.
      return dateString;
  } catch (e) {
      console.error("Error formatting date:", e);
  }
  return new Date().toLocaleDateString('pt-BR');
};

export const parseCRMText = (text: string): Partial<ClientData> => {
  const simpleData: Record<string, string> = {};
  const lines = text.split('\n');
  
  // Mapping CRM Keys to our Internal Keys
  const simpleFieldMapping: Record<string, keyof ClientData> = {
      "NOME COMPLETO": "nome",
      "RG": "rg",
      "CPF": "cpf",
      "TEL": "tel1",
      "E-MAIL": "email",
      "ENDEREÇO COMPLETO": "endereco",
      "PLANO ESCOLHIDO": "planoInternet",
      "VALOR DE INSTALAÇÃO": "valorInstalacao",
      "FORMA DE PAGAMENTO": "formaPagamento",
      "REFERÊNCIA": "referencia",
      "LOCALIZAÇÃO": "localizacao"
  };

  lines.forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
          const key = parts[0].trim().toUpperCase();
          const value = parts.slice(1).join(':').trim();
          
          if (simpleFieldMapping[key]) {
              let finalValue = value;

              // Lógica de Detecção Automática de Plano
              if (simpleFieldMapping[key] === "planoInternet") {
                  if (value.includes("920")) {
                      finalValue = "ER-ENTRE 920";
                  } else if (value.includes("800")) {
                      finalValue = "ER-ENTRE 800";
                  } else if (value.includes("600")) {
                      finalValue = "ER-ENTRE 600";
                  } else if (value.includes("500")) {
                      finalValue = "ER-ENTRE 500";
                  }
              }

              // @ts-ignore
              simpleData[simpleFieldMapping[key]] = finalValue;
          }
      }
  });
  
  return {
      ...simpleData,
      bairro: simpleData.bairro || "",
      cidade: simpleData.cidade || ""
  } as Partial<ClientData>;
};

export const parsePJCRMText = (text: string): Partial<PJData> => {
  const data: Record<string, string> = {};
  const lines = text.split('\n');

  // Mapeamento atualizado conforme solicitação (apenas campos marcados com +)
  const mapping: Record<string, keyof PJData> = {
    "RAZÃO SOCIAL": "razaoSocial",
    "CNPJ": "cnpj",
    "INSCRIÇÃO ESTADUAL": "inscricaoEstadual",
    "ENDEREÇO": "endereco",
    "CEP": "cep",
    "TEL": "tel",
    "PLANO ESCOLHIDO": "planoEscolha",
    "VALOR": "valorMensal", 
    "VALOR DE INSTALAÇÃO": "valorInstalacao",
    "FORMA DE PAGAMENTO": "formaPagamento",
    "FIDELIDADE": "fidelidade"
  };

  lines.forEach(line => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex > -1) {
      const key = line.substring(0, separatorIndex).trim().toUpperCase();
      const value = line.substring(separatorIndex + 1).trim();

      if (mapping[key]) {
        // @ts-ignore
        data[mapping[key]] = value;
      }
      
      // Fallback para capturar valor se estiver na mesma linha ou próximo
      if (key === "VALOR" && !data.valorMensal) {
         data.valorMensal = value;
      }
    }
  });

  return data as Partial<PJData>;
};

export const parseAddressChangeText = (text: string): Partial<AddressChangeData> => {
    const data: Partial<AddressChangeData> = {};
    const lines = text.split('\n');

    lines.forEach(line => {
        if (line.toLowerCase().includes('endereço antigo:')) {
            const parts = line.split(':');
            if (parts.length > 1) {
                data.enderecoAntigo = parts.slice(1).join(':').trim();
            }
        }
        if (line.toLowerCase().includes('endereço novo:')) {
            const parts = line.split(':');
            if (parts.length > 1) {
                data.enderecoNovo = parts.slice(1).join(':').trim();
            }
        }
    });

    return data;
}