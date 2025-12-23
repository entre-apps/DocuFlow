
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { PJData } from '../../types';
import { parsePJCRMText } from '../../utils/parser';
import { Plus, Trash2, Printer, Building2, ClipboardPaste } from 'lucide-react';

interface Props {
  queue: PJData[];
  setQueue: React.Dispatch<React.SetStateAction<PJData[]>>;
  onGenerateBatch: (queue: PJData[]) => void;
}

export const BatchPJProcessor: React.FC<Props> = ({ queue, setQueue, onGenerateBatch }) => {
  const [crmText, setCrmText] = useState("");
  
  const handleAddQueue = () => {
    if (!crmText.trim()) {
      alert("Cole o texto do CRM.");
      return;
    }
    
    const parsed = parsePJCRMText(crmText);
    
    // Validation simple
    if (!parsed.razaoSocial && !parsed.cnpj) {
      alert("Não foi possível identificar Razão Social ou CNPJ no texto.");
      return;
    }

    // Fill missing defaults
    const newClient: PJData = {
      origemContato: '',
      razaoSocial: '',
      nomeFantasia: '',
      cnpj: '',
      inscricaoEstadual: '',
      endereco: '',
      cep: '',
      referencia: '',
      localizacao: '',
      caixaPorta: '',
      socioTitular: '',
      dataNascimento: '',
      rg: '',
      cpf: '',
      tel: '',
      email: '',
      vencimento: '',
      planoEscolha: '',
      valorMensal: '',
      valorInstalacao: '',
      formaPagamento: '',
      fidelidade: '',
      multaRescisoria: '',
      dataGeracao: new Date().toISOString().split('T')[0],
      ...parsed
    } as PJData;

    setQueue(prev => [...prev, newClient]);
    setCrmText("");
  };

  const clearQueue = () => setQueue([]);

  const CardHeader = ({ title, icon: Icon }: { title: string, icon?: React.ElementType }) => (
    <div className="bg-[#9D4EDD] p-4 rounded-t-lg flex items-center gap-2">
       {Icon && <Icon className="w-5 h-5 text-[#FF9000]" />}
       <h3 className="text-lg font-bold text-white">{title}</h3>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
          <CardHeader title="Adicionar Empresa (PJ)" icon={ClipboardPaste} />
          <div className="p-5 space-y-3">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Dados do CRM</label>
              <textarea 
                rows={12} 
                className="w-full p-3 border border-gray-300 rounded-md font-mono text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5A189A]"
                placeholder="Cole aqui o bloco de texto do CRM:&#10;Razão social: ...&#10;CNPJ: ...&#10;Plano escolhido: ..."
                value={crmText}
                onChange={e => setCrmText(e.target.value)}
              />
            </div>
            <Button onClick={handleAddQueue} className="w-full">
               <Plus className="w-4 h-4 text-[#FF9000]" /> Adicionar à Fila
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full">
        <div className="bg-white border border-gray-200 rounded-lg flex-grow p-4 mb-4 overflow-y-auto max-h-[600px] shadow-inner bg-gray-50">
           <div className="flex justify-between items-center mb-4 border-b pb-2 sticky top-0 bg-gray-50 z-10">
              <h3 className="font-bold text-black flex items-center gap-2">
                <Printer className="w-5 h-5" />
                Fila de Impressão PJ <span className="bg-[#9D4EDD] text-white text-xs px-2 py-0.5 rounded-full">{queue.length}</span>
              </h3>
              {queue.length > 0 && (
                <button onClick={clearQueue} className="text-red-500 text-xs hover:underline font-medium">Limpar Tudo</button>
              )}
           </div>
           
           {queue.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400">
               <Building2 className="w-12 h-12 mb-2 opacity-20" />
               <p>A fila está vazia.</p>
               <p className="text-xs">Adicione dados do CRM para gerar contratos.</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 gap-3">
               {queue.map((item, idx) => (
                 <div key={idx} className="bg-white border border-l-4 border-[#9D4EDD] rounded shadow-sm p-3 hover:shadow-md transition-all relative group">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-start gap-2">
                          <div className="bg-[#F3E6FF] p-1.5 rounded text-black">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                             <div className="font-bold text-sm text-gray-900 leading-tight">{item.razaoSocial || 'Sem Razão Social'}</div>
                             <div className="text-[10px] text-gray-500 font-mono mt-0.5">{item.cnpj || 'Sem CNPJ'}</div>
                          </div>
                       </div>
                       <button 
                         onClick={() => setQueue(prev => prev.filter((_, i) => i !== idx))}
                         className="text-gray-300 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors"
                         title="Remover"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100 text-xs grid grid-cols-2 gap-2 text-gray-600">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Plano:</span> {item.planoEscolha}
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">Fidelidade:</span> {item.fidelidade}
                        </div>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
           <Button variant="secondary" onClick={clearQueue} disabled={queue.length === 0}>
              Limpar
           </Button>
           <Button onClick={() => onGenerateBatch(queue)} disabled={queue.length === 0}>
              <Printer className="w-4 h-4 text-[#FF9000]" /> Gerar Lote PJ
           </Button>
        </div>
      </div>
    </div>
  );
};
