import React from 'react';
import { ClientData } from '../../types';
import { PLAN_DETAILS, TV_PLANS, TV_ADDONS, PLAYHUB_APPS } from '../../constants';
import { formatDate } from '../../utils/parser';
import { PrintHeader } from './PrintHeader';

interface Props {
  data: ClientData;
}

export const TermoAdesao: React.FC<Props> = ({ data }) => {
  const internetPlan = PLAN_DETAILS[data.planoInternet];
  const tvPlan = TV_PLANS[data.planoTV];
  
  // Check for high tier plans for combo pricing
  const isCombo = data.planoInternet.includes("800") || data.planoInternet.includes("920");

  let totalMensal = 0;
  
  // Build rows for the service table
  const rows: React.ReactNode[] = [];
  
  if (internetPlan) {
    totalMensal += internetPlan.total;
    internetPlan.services.forEach((s, idx) => {
      rows.push(
        <tr key={`net-${idx}`} className="text-black">
          <td className="border border-gray-400 p-1 text-center">{s.un}</td>
          <td className="border border-gray-400 p-1">{s.desc}</td>
          <td className="border border-gray-400 p-1">{s.emp}</td>
          <td className="border border-gray-400 p-1 text-right">{s.val.toFixed(2).replace('.', ',')}</td>
        </tr>
      );
    });
  }

  if (tvPlan && tvPlan.price > 0) {
    totalMensal += tvPlan.price;
    rows.push(
      <tr key="tv-main" className="text-black">
        <td className="border border-gray-400 p-1 text-center">1</td>
        <td className="border border-gray-400 p-1">PLANO DE TV {tvPlan.name}</td>
        <td className="border border-gray-400 p-1">I-CONECTA REDES DE TELECOM.</td>
        <td className="border border-gray-400 p-1 text-right">{tvPlan.price.toFixed(2).replace('.', ',')}</td>
      </tr>
    );
  }

  // Legacy TV Addons (kept for compatibility if needed, though UI removed them)
  if (data.adicionais) {
    data.adicionais.forEach((addonKey) => {
      const addon = TV_ADDONS[addonKey];
      if (addon && addon.price > 0) {
        totalMensal += addon.price;
        rows.push(
          <tr key={`addon-${addonKey}`} className="text-black">
            <td className="border border-gray-400 p-1 text-center">1</td>
            <td className="border border-gray-400 p-1">ADICIONAL TV {addon.name}</td>
            <td className="border border-gray-400 p-1">I-CONECTA REDES DE TELECOM.</td>
            <td className="border border-gray-400 p-1 text-right">{addon.price.toFixed(2).replace('.', ',')}</td>
          </tr>
        );
      }
    });
  }

  // Process Playhub Apps
  if (data.apps && data.apps.length > 0) {
    // Group by Tier
    const appsByTier: Record<string, { count: number, total: number }> = {};
    
    data.apps.forEach(appId => {
      const app = PLAYHUB_APPS.find(a => a.id === appId);
      if (app) {
        if (!appsByTier[app.tier]) {
          appsByTier[app.tier] = { count: 0, total: 0 };
        }
        appsByTier[app.tier].count++;
        // Apply combo price if eligible
        const price = isCombo ? app.comboPrice : app.price;
        appsByTier[app.tier].total += price;
      }
    });

    // Add rows per Tier
    Object.entries(appsByTier).forEach(([tier, info]) => {
      totalMensal += info.total;
      const description = info.count > 1 
        ? `${info.count} APPS TIER ${tier.toUpperCase()}`
        : `APP TIER ${tier.toUpperCase()}`;

      rows.push(
        <tr key={`app-tier-${tier}`} className="text-black">
          <td className="border border-gray-400 p-1 text-center">{info.count}</td>
          <td className="border border-gray-400 p-1">{description}</td>
          <td className="border border-gray-400 p-1">I-CONECTA REDES DE TELECOM.</td>
          <td className="border border-gray-400 p-1 text-right">{info.total.toFixed(2).replace('.', ',')}</td>
        </tr>
      );
    });
  }

  const Field = ({ label, value, className = "" }: { label: string, value: string, className?: string }) => (
    <div className={`flex justify-between border-b border-gray-300 py-0.5 ${className}`}>
      <span className="font-bold min-w-[80px]">{label}</span>
      <span className="flex-grow text-left pl-2 break-all">{value}</span>
    </div>
  );

  // Calculate Promo Total (Internet Promo + TV + Apps)
  let promoTotal = 0;
  if (internetPlan && internetPlan.promoPrice) {
    promoTotal = internetPlan.promoPrice; // Base Internet Promo
    if (tvPlan) promoTotal += tvPlan.price; // + TV
    // + Apps (Already calculated in totalMensal loop, need to re-add specific totals)
    if (data.apps && data.apps.length > 0) {
       data.apps.forEach(appId => {
          const app = PLAYHUB_APPS.find(a => a.id === appId);
          if (app) {
             promoTotal += isCombo ? app.comboPrice : app.price;
          }
       });
    }
    // + Legacy addons
    if (data.adicionais) {
       data.adicionais.forEach(k => {
          const a = TV_ADDONS[k];
          if(a) promoTotal += a.price;
       });
    }
  }

  return (
    <div className="document-page relative">
      <PrintHeader contrato={data.contrato} title="TERMO DE ADESÃO" />

      <div className="font-bold text-sm mt-2 mb-1 bg-gray-100 p-1 text-black">CLIENTE</div>
      
      <Field label="NOME:" value={data.nome} />
      <div className="flex gap-4">
        <Field label="RG:" value={data.rg} className="w-1/2" />
        <Field label="CPF:" value={data.cpf} className="w-1/2" />
      </div>
      <Field label="ENDEREÇO:" value={data.endereco} />
      
      {!data.isBatch && (
        <div className="flex gap-4">
          <Field label="BAIRRO:" value={data.bairro} className="w-1/2" />
          <Field label="CIDADE:" value={data.cidade} className="w-1/2" />
        </div>
      )}
      
      <div className="flex gap-4">
        <Field label="TEL:" value={data.tel1} className="w-1/2" />
        <Field label="EMAIL:" value={data.email} className="w-1/2" />
      </div>

      <div className="font-bold text-sm mt-4 mb-1 bg-gray-100 p-1 text-black">DESCRIÇÃO DOS SERVIÇOS</div>

      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100 text-black font-bold">
            <th className="border border-gray-400 p-1 text-center w-[8%]">UN.</th>
            <th className="border border-gray-400 p-1 text-left w-[42%]">SERVIÇOS</th>
            <th className="border border-gray-400 p-1 text-left w-[35%]">EMPRESA</th>
            <th className="border border-gray-400 p-1 text-right w-[15%]">MENSALIDADE</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>

      <div className="flex justify-end mt-2">
        <div className="w-2/5">
          <div className="flex justify-between border-b border-gray-300 py-1">
            <span className="font-bold">TOTAL MENSAL:</span>
            <span className="font-bold text-right">R$ {totalMensal.toFixed(2).replace('.', ',')}</span>
          </div>
          {internetPlan && internetPlan.promoPrice && (
             <div className="flex justify-between border border-purple-300 bg-purple-50 text-purple-800 py-1 px-1 mt-1 rounded">
                <span className="font-bold text-xs">{internetPlan.promoText || 'Valor Promocional'}:</span>
                <span className="font-bold text-right">R$ {promoTotal.toFixed(2).replace('.', ',')}</span>
             </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4 text-xs">
         <Field label="INSTALAÇÃO:" value={data.valorInstalacao} />
         <Field label="PAGAMENTO:" value={data.formaPagamento} />
      </div>

      <div className="mt-6 text-[10px] text-justify">
        <p className="font-bold mb-1">Declaro que li e concordo com todas as disposições dos seguintes documentos contratuais:</p>
        <ul className="list-decimal list-inside pl-2 space-y-0.5">
            <li>CONTRATO DE ADESÃO AO SERVIÇO DE CONEXÃO ÓPTICA MULTISERVIÇO ENTRE RESIDENCIAL DA BIGDOT TELECOMUNICAÇÕES LTDA EPP</li>
            <li>CONTRATO DE ADESÃO AO SERVIÇO DE ACESSO À INTERNET DA I-CONECTA REDES DE TELECOMUNICAÇÃO EIRELI</li>
            <li>REGULAMENTO DA PROMOÇÃO</li>
            <li>FIDELIDADE DE 12 MESES (CONTRATO DE PERMANÊNCIA MÍNIMA)</li>
            <li>REGULAMENTO DE ADESÃO AOS SERVIÇOS WATCH</li>
            <li>REGULAMENTO DE ADESÃO PLAYHUB</li>
        </ul>
      </div>

      <div className="mt-12 flex flex-col items-center justify-center">
        <div className="border-t border-black w-64 mb-1"></div>
        <div className="text-xs font-bold">{data.nome}</div>
        <div className="text-[10px]">CLIENTE</div>
      </div>

      <div className="text-center mt-4 text-[10px] text-gray-500">
         Data da Instalação: {formatDate(data.dataInstalacao)}
      </div>
    </div>
  );
};