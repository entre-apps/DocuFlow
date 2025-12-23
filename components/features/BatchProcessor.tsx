
import React, { useState, useMemo } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ClientData, PlayhubApp } from '../../types';
import { PLAN_DETAILS, TV_PLANS, PLAYHUB_APPS } from '../../constants';
import { parseCRMText } from '../../utils/parser';
import { Plus, Trash2, Printer, User, FileText, Wifi, Tv, PlayCircle, Check, Search } from 'lucide-react';

interface Props {
  queue: ClientData[];
  setQueue: React.Dispatch<React.SetStateAction<ClientData[]>>;
  onGenerateBatch: (queue: ClientData[]) => void;
}

export const BatchProcessor: React.FC<Props> = ({ queue, setQueue, onGenerateBatch }) => {
  // Temporary state for input
  const [batchInput, setBatchInput] = useState("");
  const [contrato, setContrato] = useState("");
  const [dataInstalacao, setDataInstalacao] = useState("");
  const [planoTV, setPlanoTV] = useState("Nenhum");
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [appSearch, setAppSearch] = useState("");

  // Helper for categorization with filter
  const appsByCategory = useMemo(() => {
    const groups: Record<string, PlayhubApp[]> = {};
    PLAYHUB_APPS
      .filter(app => app.name.toLowerCase().includes(appSearch.toLowerCase()))
      .forEach(app => {
        if (!groups[app.category]) groups[app.category] = [];
        groups[app.category].push(app);
      });
    return groups;
  }, [appSearch]);

  const toggleApp = (appId: string) => {
    setSelectedApps(prev => 
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  const handleAddQueue = () => {
    if (!contrato || !batchInput) {
      alert("Preencha Contrato e o texto do CRM.");
      return;
    }
    
    const parsed = parseCRMText(batchInput);
    
    // Validation
    if (!parsed.nome) {
      alert("Nome não encontrado no texto.");
      return;
    }
    if (!parsed.planoInternet || !PLAN_DETAILS[parsed.planoInternet]) {
      alert(`Plano de internet "${parsed.planoInternet}" inválido ou não cadastrado.`);
      return;
    }

    const newClient: ClientData = {
      ...parsed as ClientData,
      contrato,
      dataInstalacao,
      planoTV,
      adicionais: [],
      apps: [...selectedApps],
      isBatch: true
    };

    setQueue(prev => [...prev, newClient]);
    
    // Reset Inputs
    setContrato("");
    setBatchInput("");
    setPlanoTV("Nenhum");
    setSelectedApps([]);
    setAppSearch("");
  };

  const clearQueue = () => setQueue([]);

  const CardHeader = ({ title }: { title: string }) => (
    <div className="bg-[#9D4EDD] p-4 rounded-t-lg">
       <h3 className="text-lg font-bold text-white">{title}</h3>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
          <CardHeader title="1. Configuração do Cliente" />
          <div className="p-5 space-y-3">
            <Input label="Nº Contrato" value={contrato} onChange={e => setContrato(e.target.value)} placeholder="Ex: 45530000" />
            <div>
              <label className="block text-sm font-medium text-black mb-1">Dados do CRM</label>
              <textarea 
                rows={8} 
                className="w-full p-2 border border-gray-300 rounded-md font-mono text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5A189A]"
                placeholder="NOME COMPLETO: ...&#10;RG: ...&#10;CPF: ..."
                value={batchInput}
                onChange={e => setBatchInput(e.target.value)}
              />
            </div>
            <Input label="Data Instalação" type="date" value={dataInstalacao} onChange={e => setDataInstalacao(e.target.value)} />
          </div>
        </div>

        <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
           <CardHeader title="2. Serviços Adicionais" />
           <div className="p-5 space-y-4">
             <Select 
                label="Plano TV" 
                options={Object.values(TV_PLANS).map(p => ({ value: p.id, label: p.label }))}
                value={planoTV}
                onChange={e => setPlanoTV(e.target.value)}
                id="batch-tv"
             />
             
             <div>
               <label className="block text-sm font-medium text-black mb-2">Apps Playhub</label>
               
               <div className="relative mb-2">
                  <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Buscar app..."
                    className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#5A189A]"
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                  />
               </div>

               <div className="border border-gray-300 rounded-lg p-3 max-h-64 overflow-y-auto bg-white">
                 {Object.entries(appsByCategory).length === 0 && (
                    <div className="text-center py-4 text-gray-500 text-xs">
                       Nenhum app encontrado.
                    </div>
                 )}
                 {Object.entries(appsByCategory).map(([category, apps]) => (
                   <div key={category} className="mb-3">
                      <div className="text-xs font-bold text-black uppercase border-b border-gray-200 mb-2 sticky top-0 bg-white py-1">{category}</div>
                      <div className="space-y-1">
                         {(apps as PlayhubApp[]).map(app => {
                           const isSelected = selectedApps.includes(app.id);
                           return (
                             <div 
                               key={app.id}
                               onClick={() => toggleApp(app.id)}
                               className={`cursor-pointer flex items-center justify-between p-2 rounded text-xs transition-colors ${isSelected ? 'bg-[#5A189A] text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                             >
                                <span>{app.name} <span className="opacity-75 text-[10px] ml-1">({app.tier})</span></span>
                                {isSelected && <Check className="w-3 h-3" />}
                             </div>
                           );
                         })}
                      </div>
                   </div>
                 ))}
               </div>
               <p className="text-xs text-gray-500 mt-1">Selecione os apps que serão incluídos para este cliente.</p>
             </div>
           </div>
        </div>

        <Button onClick={handleAddQueue} className="w-full">
           <Plus className="w-4 h-4 text-[#FF9000]" /> Adicionar à Fila
        </Button>
      </div>

      <div className="flex flex-col h-full">
        <div className="bg-white border border-gray-200 rounded-lg flex-grow p-4 mb-4 overflow-y-auto max-h-[800px] shadow-inner bg-gray-50">
           <div className="flex justify-between items-center mb-4 border-b pb-2 sticky top-0 bg-gray-50 z-10">
              <h3 className="font-bold text-black flex items-center gap-2">
                <Printer className="w-5 h-5" />
                Fila de Impressão <span className="bg-[#9D4EDD] text-white text-xs px-2 py-0.5 rounded-full">{queue.length}</span>
              </h3>
              {queue.length > 0 && (
                <button onClick={clearQueue} className="text-red-500 text-xs hover:underline font-medium">Limpar Tudo</button>
              )}
           </div>
           
           {queue.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400">
               <Printer className="w-12 h-12 mb-2 opacity-20" />
               <p>A fila está vazia.</p>
               <p className="text-xs">Adicione clientes para gerar documentos.</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 gap-3">
               {queue.map((item, idx) => (
                 <div key={idx} className="bg-white border border-l-4 border-[#9D4EDD] rounded shadow-sm p-3 hover:shadow-md transition-all relative group">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-start gap-2">
                          <div className="bg-[#F3E6FF] p-1.5 rounded text-black">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                             <div className="font-bold text-sm text-gray-900 leading-tight">{item.nome}</div>
                             <div className="text-[10px] text-gray-500 font-mono mt-0.5">{item.cpf}</div>
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

                    <div className="grid grid-cols-2 gap-2 mt-3 bg-gray-50 p-2 rounded border border-gray-100">
                       <div className="flex flex-col">
                          <span className="text-[10px] text-gray-500 font-semibold flex items-center gap-1">
                            <FileText className="w-3 h-3" /> CONTRATO
                          </span>
                          <span className="text-xs font-bold text-gray-800">{item.contrato}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[10px] text-gray-500 font-semibold flex items-center gap-1">
                             <Wifi className="w-3 h-3" /> INTERNET
                          </span>
                          <span className="text-xs font-bold text-black truncate" title={item.planoInternet}>{item.planoInternet}</span>
                       </div>
                       {(item.planoTV !== 'Nenhum' || item.apps.length > 0) && (
                         <div className="flex flex-col col-span-2 border-t border-gray-200 pt-2 mt-1 gap-1">
                            {item.planoTV !== 'Nenhum' && (
                              <div className="flex items-center gap-2">
                                <Tv className="w-3 h-3 text-gray-500" />
                                <span className="text-xs font-medium text-gray-700">{item.planoTV}</span>
                              </div>
                            )}
                            {item.apps.length > 0 && (
                              <div className="flex items-center gap-2">
                                <PlayCircle className="w-3 h-3 text-gray-500" />
                                <span className="text-xs font-medium text-gray-700">{item.apps.length} Apps selecionados</span>
                              </div>
                            )}
                         </div>
                       )}
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
              <Printer className="w-4 h-4 text-[#FF9000]" /> Gerar Fila
           </Button>
        </div>
      </div>
    </div>
  );
};
