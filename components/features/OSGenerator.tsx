
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { OSData } from '../../types';
import { parseCRMText } from '../../utils/parser';
import { Copy, Plus, Trash2 } from 'lucide-react';

interface Props {
  queue: OSData[];
  setQueue: React.Dispatch<React.SetStateAction<OSData[]>>;
  output: string;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
}

export const OSGenerator: React.FC<Props> = ({ queue, setQueue, output, setOutput }) => {
  const [contrato, setContrato] = useState("");
  const [login, setLogin] = useState("");
  const [oco, setOco] = useState("");
  const [periodo, setPeriodo] = useState("Manhã");
  const [inputText, setInputText] = useState("");

  const handleAdd = () => {
    const parsed = parseCRMText(inputText);
    
    if (!contrato || !login || !oco || !parsed.nome) {
      alert("Preencha todos os campos obrigatórios (Contrato, Login, OCO, CRM Text).");
      return;
    }

    const newData: OSData = {
      contrato,
      login,
      oco,
      periodo,
      nome: parsed.nome || "N/A",
      referencia: parsed.referencia || "N/A",
      localizacao: parsed.localizacao || "N/A",
      formaPagamento: parsed.formaPagamento || "N/A"
    };

    setQueue(prev => [...prev, newData]);
    setContrato("");
    setLogin("");
    setOco("");
    setInputText("");
  };

  const handleGenerate = () => {
    const text = queue.map(data => `INSTALAÇÃO FTTH -
OCO: ${data.oco}
CONTRATO ${data.contrato}
LOGIN ${data.login}
REFERÊNCIA: ${data.referencia}
LOCALIZAÇÃO: ${data.localizacao}
INSTALAÇÃO: ${data.formaPagamento}
HORÁRIO: ${data.periodo}`).join('\n\n========================================\n\n');
    
    setOutput(text);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert("Copiado!");
  };

  const CardHeader = ({ title }: { title: string }) => (
    <div className="bg-[#9D4EDD] p-4 rounded-t-lg">
       <h3 className="text-lg font-bold text-white">{title}</h3>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
      <div className="space-y-4">
         <div className="bg-[#F3E6FF] rounded-lg shadow-md border border-[#9D4EDD]">
            <CardHeader title="Adicionar O.S." />
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input label="Contrato" value={contrato} onChange={e => setContrato(e.target.value)} />
                <Input label="Login" value={login} onChange={e => setLogin(e.target.value)} />
                <Input label="OCO" value={oco} onChange={e => setOco(e.target.value)} className="col-span-2" />
                <Select 
                    label="Período" 
                    options={[{value: "Manhã", label: "Manhã"}, {value: "Tarde", label: "Tarde"}, {value: "Comercial", label: "Comercial"}]}
                    value={periodo}
                    onChange={e => setPeriodo(e.target.value)}
                    className="col-span-2"
                    id="os-periodo"
                />
              </div>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded font-mono text-xs text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-[#5A189A]"
                rows={6}
                placeholder="Cole os dados do CRM aqui..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
              />
              <Button onClick={handleAdd} className="w-full">
                <Plus className="w-4 h-4 text-[#FF9000]"/> Adicionar
              </Button>
            </div>
         </div>
         
         <div className="bg-white p-4 rounded-lg border h-48 overflow-y-auto shadow-sm">
            <div className="flex justify-between mb-2 border-b pb-2">
               <h4 className="font-bold text-sm text-black">Fila ({queue.length})</h4>
               {queue.length > 0 && <button onClick={() => setQueue([])} className="text-red-500 text-xs">Limpar</button>}
            </div>
            <ul className="space-y-2">
               {queue.map((item, idx) => (
                  <li key={idx} className="bg-[#F3E6FF] p-2 rounded text-xs flex justify-between border border-[#9D4EDD]">
                     <span className="text-black font-medium">{item.nome} (OCO: {item.oco})</span>
                     <button onClick={() => setQueue(q => q.filter((_, i) => i !== idx))}><Trash2 className="w-3 h-3 text-gray-400 hover:text-red-500"/></button>
                  </li>
               ))}
            </ul>
         </div>
      </div>

      <div className="flex flex-col h-full">
         <Button onClick={handleGenerate} disabled={queue.length === 0} className="mb-4">Gerar Texto</Button>
         <textarea 
            readOnly
            className="w-full flex-grow p-4 bg-[#F3E6FF] font-mono text-sm rounded border border-[#9D4EDD] resize-none focus:outline-none text-black"
            value={output}
            placeholder="O resultado aparecerá aqui..."
         />
         <Button variant="secondary" onClick={copyToClipboard} disabled={!output} className="mt-4">
            <Copy className="w-4 h-4 text-[#FF9000]" /> Copiar Texto
         </Button>
      </div>
    </div>
  );
};
