
import React, { useState } from 'react';
import logo from '../../assets/logo.png';

interface PrintHeaderProps {
  contrato: string;
  title: string;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({ contrato, title }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <>
      <div className="text-center mb-2 flex justify-center items-center" style={{ minHeight: '64px' }}>
        {hasError ? (
          <div className="font-bold text-xl uppercase tracking-widest px-4 py-2 border-2 border-black rounded">
            ENTRE - Internet Premium
          </div>
        ) : (
          <img 
            src={logo} 
            alt="Logo Empresa" 
            className="h-16 w-auto object-contain block"
            style={{ minWidth: '120px' }}
            onError={() => setHasError(true)}
          />
        )}
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
