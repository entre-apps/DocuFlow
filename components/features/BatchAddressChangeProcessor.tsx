
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AddressChangeData } from '../../types';
import { parseAddressChangeText } from '../../utils/parser';
import { Plus, Trash2, Printer, User, MapPin, ClipboardPaste, ArrowRightLeft } from 'lucide-react';

interface Props {
  onGenerateBatch: (queue: AddressChangeData[]) => void;
}

export const BatchAddressChangeProcessor: React.FC<Props> = ({ onGenerateBatch }) => {
  const [queue, setQueue] = useState<AddressChangeData[]>([]);
  const [inputText, setInputText] = useState("");
  
  const [formData, setFormData] = useState<Omit<AddressChangeData, 'enderecoAntigo' | 'enderecoNovo'>>({
    nome: '',
    cpf: '',
    login: '',
    ocorrencia: '',
    codigo: '',
    dataSolicitacao: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleAddQueue = () => {
    const parsed = parseAddressChangeText(inputText);
    
    if (!formData.nome || !parsed.enderecoAntigo || !parsed.enderecoNovo) {
      alert("Certifique-se de preencher o Nome e que os endereços foram extraídos do texto.");
      return;
    }

    const newItem: AddressChangeData = {
      ...formData,
      enderecoAntigo: parsed.enderecoAntigo || "",
      enderecoNovo: parsed.enderecoNovo || ""
    };

    setQueue(prev => [...prev, newItem]);
    
    // Limpar campos específicos para o próximo
    setInputText("");
    setFormData(prev => ({
        ...prev,
        nome: '',
        cpf: '',
        login: '',
        ocorrencia: '',
        codigo: ''
    }));
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
          <CardHeader title="1. Extração de Endereços" icon={ClipboardPaste} />
          <div className="p-5 space-y-3">
            <textarea 
              rows={6} 
              className="w-full p-3 border border-gray-300 rounded-md font-mono text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5A189A]"
              placeholder="Cole o texto contendo:&#10;Endereço antigo: ...&#10;Endereço novo: ..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <p className="text-[10px] text-gray-500 italic">O sistema extrairá automaticamente as linhas que contêm "Endereço antigo" e "Endereço novo".</p>
          </div>
        </div>

        <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
           <CardHeader title="2. Identificação do Cliente" icon={User} />
           <div className="p-5 grid grid-cols-2 gap-3">
             <Input id="nome" label="Nome Completo" value={formData.nome} onChange={handleInputChange} className="col-span-2" />
             <Input id="cpf" label="CPF" value={formData.cpf} onChange={handleInputChange} />
             <Input id="login" label="Login" value={formData.login} onChange={handleInputChange} />
             <Input id="ocorrencia" label="Ocorrência" value={formData.ocorrencia} onChange={handleInputChange} />
             <Input id="codigo" label="Código Cliente" value={formData.codigo} onChange={handleInputChange} />
             <Input id="dataSolicitacao" label="Data Documento" type="date" value={formData.dataSolicitacao} onChange={handleInputChange} className="col-span-2" />
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
                Fila de Mudança <span className="bg-[#9D4EDD] text-white text-xs px-2 py-0.5 rounded-full">{queue.length}</span>
              </h3>
              {queue.length > 0 && (
                <button onClick={clearQueue} className="text-red-500 text-xs hover:underline font-medium">Limpar Tudo</button>
              )}
           </div>
           
           {queue.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400">
               <ArrowRightLeft className="w-12 h-12 mb-2 opacity-20" />
               <p>Nenhuma mudança na fila.</p>
             </div>
           ) : (
             <div className="space-y-3">
               {queue.map((item, idx) => (
                 <div key={idx} className="bg-white border border-l-4 border-[#9D4EDD] rounded shadow-sm p-3 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                          <div className="font-bold text-sm text-gray-900 leading-tight">{item.nome}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5">Login: {item.login || 'N/A'}</div>
                       </div>
                       <button 
                         onClick={() => setQueue(prev => prev.filter((_, i) => i !== idx))}
                         className="text-gray-300 hover:text-red-500 p-1"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                    <div className="mt-2 space-y-1 bg-gray-50 p-2 rounded text-[10px] text-gray-600">
                        <div className="flex gap-1"><span className="font-bold min-w-[35px]">DE:</span> <span className="truncate">{item.enderecoAntigo}</span></div>
                        <div className="flex gap-1 text-[#5A189A] font-medium"><span className="font-bold min-w-[35px]">PARA:</span> <span className="truncate">{item.enderecoNovo}</span></div>
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
              <Printer className="w-4 h-4 text-[#FF9000]" /> Gerar Lote
           </Button>
        </div>
      </div>
    </div>
  );
};
