
import React from 'react';

interface PrintHeaderProps {
  contrato: string;
  title: string;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({ contrato, title }) => {
  return (
    <>
      <div className="text-center mb-2">
        <img 
          src="logo.png" 
          alt="Logo Empresa" 
          className="h-16 w-auto mx-auto object-contain block"
          style={{ minWidth: '120px' }}
          onError={(e) => {
            // Fallback caso a imagem não exista ou falhe o carregamento
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('placehold.co')) {
              target.src = "https://placehold.co/240x80/ffffff/333333?text=LOGO+FALTANDO";
            }
          }}
        />
      </div>
      <div className="text-center font-bold text-sm mb-2">
        CONTRATO: {contrato}
      </div>
      <div className="text-center font-bold text-base mb-4 uppercase">
        {title}
      </div>
    </>
  );
};
