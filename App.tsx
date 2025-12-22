
import React, { useState, useCallback } from 'react';
import { IndividualForm } from './components/features/IndividualForm';
import { BatchProcessor } from './components/features/BatchProcessor';
import { BatchPJProcessor } from './components/features/BatchPJProcessor';
import { OSGenerator } from './components/features/OSGenerator';
import { PJForm } from './components/features/PJForm';
import { AddressChangeForm } from './components/features/AddressChangeForm';
import { BatchAddressChangeProcessor } from './components/features/BatchAddressChangeProcessor';
import { TermoAdesao } from './components/documents/TermoAdesao';
import { TermoLocacao } from './components/documents/TermoLocacao';
import { TermoAdesaoPJ } from './components/documents/TermoAdesaoPJ';
import { TermoLocacaoPJ } from './components/documents/TermoLocacaoPJ';
import { MudancaEnderecoDoc } from './components/documents/MudancaEnderecoDoc';
import { Button } from './components/ui/Button';
import { Toast } from './components/ui/Toast';
import { ClientData, PJData, AddressChangeData } from './types';
import { FileText, Layers, Wrench, ZoomIn, ZoomOut, Printer, Building2, ListPlus, MapPin, CopyPlus } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'batch' | 'os' | 'pj' | 'batch-pj' | 'address-change' | 'batch-address-change'>('individual');
  const [printData, setPrintData] = useState<ClientData[] | null>(null);
  const [pjPrintData, setPjPrintData] = useState<PJData[] | null>(null);
  const [addressChangePrintData, setAddressChangePrintData] = useState<AddressChangeData[] | null>(null);
  const [previewScale, setPreviewScale] = useState(0.75);
  
  // State to handle form resets and notifications
  const [formVersion, setFormVersion] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const resetForm = useCallback(() => {
    setFormVersion(v => v + 1);
  }, []);

  const triggerSuccess = useCallback((message: string) => {
    setToastMessage(message);
    setShowToast(true);
    resetForm();
  }, [resetForm]);

  const handleGenerate = (data: ClientData | ClientData[]) => {
    const dataArray = Array.isArray(data) ? data : [data];
    setPrintData(dataArray);
    setPjPrintData(null);
    setAddressChangePrintData(null);
    
    setTimeout(() => {
      window.print();
      triggerSuccess("Documentos PF gerados com sucesso!");
    }, 100);
  };

  const handleGeneratePJ = (data: PJData | PJData[]) => {
    const dataArray = Array.isArray(data) ? data : [data];
    setPjPrintData(dataArray);
    setPrintData(null);
    setAddressChangePrintData(null);
    
    setTimeout(() => {
      window.print();
      triggerSuccess("Documentos PJ gerados com sucesso!");
    }, 100);
  };

  const handleGenerateAddressChange = (data: AddressChangeData | AddressChangeData[]) => {
    const dataArray = Array.isArray(data) ? data : [data];
    setAddressChangePrintData(dataArray);
    setPrintData(null);
    setPjPrintData(null);

    setTimeout(() => {
        window.print();
        triggerSuccess("Mudança de endereço gerada com sucesso!");
    }, 100);
  };

  return (
    <>
      <Toast 
        isVisible={showToast} 
        message={toastMessage} 
        onClose={() => setShowToast(false)} 
      />

      {/* Screen UI */}
      <div className="min-h-screen p-4 md:p-8 no-print bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 border-b border-[#5A189A] pb-6">
            <h1 className="text-3xl font-bold text-black">DocuFlow Automation</h1>
            <p className="text-black opacity-80 mt-1">
              {activeTab.includes('pj') ? 'Módulo: Pessoa Jurídica (PJ)' : activeTab.includes('address') ? 'Módulo: Mudança de Endereço' : 'Módulo: Pessoa Física (PF)'}
            </p>
          </header>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 bg-[#F3E6FF] p-1 rounded-xl mb-6 w-fit border border-[#9D4EDD]">
             <button 
                onClick={() => setActiveTab('individual')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'individual' ? 'bg-[#5A189A] text-white shadow' : 'text-black hover:bg-[#E0C3FC]'}`}
             >
               <FileText className={`w-4 h-4 ${activeTab === 'individual' ? 'text-[#FF9000]' : 'text-black'}`} /> PF Individual
             </button>
             <button 
                onClick={() => setActiveTab('batch')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'batch' ? 'bg-[#5A189A] text-white shadow' : 'text-black hover:bg-[#E0C3FC]'}`}
             >
               <Layers className={`w-4 h-4 ${activeTab === 'batch' ? 'text-[#FF9000]' : 'text-black'}`} /> Lote PF
             </button>
             <div className="w-px bg-[#9D4EDD] mx-1 h-6 self-center opacity-50"></div>
             <button 
                onClick={() => setActiveTab('pj')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'pj' ? 'bg-[#5A189A] text-white shadow' : 'text-black hover:bg-[#E0C3FC]'}`}
             >
               <Building2 className={`w-4 h-4 ${activeTab === 'pj' ? 'text-[#FF9000]' : 'text-black'}`} /> PJ Individual
             </button>
             <button 
                onClick={() => setActiveTab('batch-pj')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'batch-pj' ? 'bg-[#5A189A] text-white shadow' : 'text-black hover:bg-[#E0C3FC]'}`}
             >
               <ListPlus className={`w-4 h-4 ${activeTab === 'batch-pj' ? 'text-[#FF9000]' : 'text-black'}`} /> Lote PJ
             </button>
             <div className="w-px bg-[#9D4EDD] mx-1 h-6 self-center opacity-50"></div>
             <button 
                onClick={() => setActiveTab('address-change')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'address-change' ? 'bg-[#5A189A] text-white shadow' : 'text-black hover:bg-[#E0C3FC]'}`}
             >
               <MapPin className={`w-4 h-4 ${activeTab === 'address-change' ? 'text-[#FF9000]' : 'text-black'}`} /> Mudança End.
             </button>
             <button 
                onClick={() => setActiveTab('batch-address-change')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'batch-address-change' ? 'bg-[#5A189A] text-white shadow' : 'text-black hover:bg-[#E0C3FC]'}`}
             >
               <CopyPlus className={`w-4 h-4 ${activeTab === 'batch-address-change' ? 'text-[#FF9000]' : 'text-black'}`} /> Lote Mudança
             </button>
             <button 
                onClick={() => setActiveTab('os')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'os' ? 'bg-[#5A189A] text-white shadow' : 'text-black hover:bg-[#E0C3FC]'}`}
             >
               <Wrench className={`w-4 h-4 ${activeTab === 'os' ? 'text-[#FF9000]' : 'text-black'}`} /> Gerador O.S.
             </button>
          </div>

          {/* Content Area - Using key={formVersion} to force component reset after generation */}
          <main key={formVersion}>
            {activeTab === 'individual' && <IndividualForm onGenerate={handleGenerate} />}
            {activeTab === 'batch' && <BatchProcessor onGenerateBatch={handleGenerate} />}
            {activeTab === 'pj' && <PJForm onGenerate={handleGeneratePJ} />}
            {activeTab === 'batch-pj' && <BatchPJProcessor onGenerateBatch={handleGeneratePJ} />}
            {activeTab === 'address-change' && <AddressChangeForm onGenerate={handleGenerateAddressChange} />}
            {activeTab === 'batch-address-change' && <BatchAddressChangeProcessor onGenerateBatch={handleGenerateAddressChange} />}
            {activeTab === 'os' && <OSGenerator />}
          </main>
        </div>

        {/* Helper for previewing print output on screen */}
        {(printData || pjPrintData || addressChangePrintData) && (
           <div className="mt-12 pt-8 border-t border-dashed border-gray-300">
              <div className="flex justify-center items-center gap-3 mb-4">
                 <h3 className="text-center text-gray-400 uppercase text-sm font-bold">Prévia de Impressão (Abaixo)</h3>
                 <Button 
                    onClick={() => window.print()} 
                    className="!py-1.5 !px-4 !text-xs !h-auto"
                 >
                    <Printer className="w-4 h-4" /> Imprimir Novamente
                 </Button>
                 <button 
                    onClick={() => setPreviewScale(prev => prev === 0.75 ? 1 : 0.75)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-gray-300 text-gray-600 text-xs font-medium hover:bg-gray-50 transition-colors shadow-sm h-[34px]"
                 >
                    {previewScale === 0.75 ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
                    {previewScale === 0.75 ? "Zoom 100%" : "Zoom 75%"}
                 </button>
              </div>
              <div className="bg-gray-200 p-8 overflow-auto">
                <div 
                  className="mx-auto w-fit origin-top transition-transform duration-200"
                  style={{ transform: `scale(${previewScale})` }}
                >
                  {printData && printData.map((client, idx) => (
                    <div key={`pf-${idx}`}>
                       <TermoAdesao data={client} />
                       <TermoLocacao data={client} />
                    </div>
                  ))}
                  {pjPrintData && pjPrintData.map((client, idx) => (
                    <div key={`pj-${idx}`}>
                      <TermoAdesaoPJ data={client} />
                      <TermoLocacaoPJ data={client} />
                    </div>
                  ))}
                  {addressChangePrintData && addressChangePrintData.map((change, idx) => (
                    <MudancaEnderecoDoc key={`address-${idx}`} data={change} />
                  ))}
                </div>
              </div>
           </div>
        )}
      </div>

      {/* Print Container (Visible only during Print via CSS) */}
      <div id="print-container" style={{ display: 'none' }}>
        {printData && printData.map((client, idx) => (
          <React.Fragment key={`pf-${idx}`}>
            <TermoAdesao data={client} />
            <TermoLocacao data={client} />
          </React.Fragment>
        ))}
        {pjPrintData && pjPrintData.map((client, idx) => (
          <React.Fragment key={`pj-${idx}`}>
             <TermoAdesaoPJ data={client} />
             <TermoLocacaoPJ data={client} />
          </React.Fragment>
        ))}
        {addressChangePrintData && addressChangePrintData.map((change, idx) => (
             <MudancaEnderecoDoc key={`address-${idx}`} data={change} />
        ))}
      </div>
    </>
  );
};

export default App;
