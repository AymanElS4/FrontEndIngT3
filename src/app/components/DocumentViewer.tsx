import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { X, FileText, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';

interface DocumentSection {
  id: string;
  title: string;
  level: number;
}

interface DocumentViewerProps {
  documentName: string;
  documentCode?: string;
  documentType: 'case' | 'code';
  onClose: () => void;
  onDownload?: () => void; 
}

export function DocumentViewer({ documentName, documentCode, documentType, onClose, onDownload }: DocumentViewerProps) {
  const [activeSection, setActiveSection] = useState<string>('section-1');

  // Mock document sections based on type
  const sections: DocumentSection[] = documentType === 'code' 
    ? [
        { id: 'section-1', title: 'Capítulo I - Disposiciones Generales', level: 1 },
        { id: 'section-1-1', title: 'Artículo 1 - Objeto de la Ley', level: 2 },
        { id: 'section-1-2', title: 'Artículo 2 - Ámbito de Aplicación', level: 2 },
        { id: 'section-1-3', title: 'Artículo 3 - Definiciones', level: 2 },
        { id: 'section-2', title: 'Capítulo II - De los Derechos', level: 1 },
        { id: 'section-2-1', title: 'Artículo 4 - Derechos Fundamentales', level: 2 },
        { id: 'section-2-2', title: 'Artículo 5 - Derechos de las Partes', level: 2 },
        { id: 'section-2-3', title: 'Artículo 6 - Garantías Procesales', level: 2 },
        { id: 'section-3', title: 'Capítulo III - De las Obligaciones', level: 1 },
        { id: 'section-3-1', title: 'Artículo 7 - Obligaciones Generales', level: 2 },
        { id: 'section-3-2', title: 'Artículo 8 - Obligaciones Específicas', level: 2 },
        { id: 'section-4', title: 'Capítulo IV - Del Procedimiento', level: 1 },
        { id: 'section-4-1', title: 'Artículo 9 - Inicio del Procedimiento', level: 2 },
        { id: 'section-4-2', title: 'Artículo 10 - Desarrollo del Procedimiento', level: 2 },
        { id: 'section-4-3', title: 'Artículo 11 - Resolución', level: 2 },
        { id: 'section-5', title: 'Capítulo V - De los Recursos', level: 1 },
        { id: 'section-5-1', title: 'Artículo 12 - Recursos Ordinarios', level: 2 },
        { id: 'section-5-2', title: 'Artículo 13 - Recursos Extraordinarios', level: 2 },
        { id: 'section-6', title: 'Disposiciones Transitorias', level: 1 },
      ]
    : [
        { id: 'section-1', title: 'I. Resumen Ejecutivo', level: 1 },
        { id: 'section-2', title: 'II. Información del Caso', level: 1 },
        { id: 'section-2-1', title: 'Partes Involucradas', level: 2 },
        { id: 'section-2-2', title: 'Antecedentes', level: 2 },
        { id: 'section-2-3', title: 'Cronología de Eventos', level: 2 },
        { id: 'section-3', title: 'III. Fundamentos Legales', level: 1 },
        { id: 'section-3-1', title: 'Marco Normativo', level: 2 },
        { id: 'section-3-2', title: 'Jurisprudencia Aplicable', level: 2 },
        { id: 'section-4', title: 'IV. Argumentación', level: 1 },
        { id: 'section-4-1', title: 'Pretensiones', level: 2 },
        { id: 'section-4-2', title: 'Fundamentos de Derecho', level: 2 },
        { id: 'section-4-3', title: 'Pruebas', level: 2 },
        { id: 'section-5', title: 'V. Conclusiones', level: 1 },
        { id: 'section-6', title: 'VI. Anexos', level: 1 },
      ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Scroll to section in real implementation
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Mock content generator
  const generateSectionContent = (section: DocumentSection) => {
    const paragraphs = section.level === 1 ? 3 : 2;
    return Array.from({ length: paragraphs }, (_, i) => 
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl text-gray-900">{documentName}</h2>
              {documentCode && (
                <p className="text-sm text-gray-600 mt-1">Código: {documentCode}</p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Side Index */}
          <div className="w-80 border-r bg-gray-50">
            <ScrollArea className="h-full">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <h3 className="text-sm text-gray-900">Índice de Contenido</h3>
                </div>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-900'
                          : 'text-gray-700 hover:bg-gray-100'
                      } ${section.level === 2 ? 'pl-6' : ''}`}
                    >
                      <div className="flex items-start gap-2">
                        {section.level === 1 && (
                          <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            activeSection === section.id ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                        )}
                        <span className={section.level === 1 ? '' : ''}>
                          {section.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </ScrollArea>
          </div>

          {/* Document Content */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-8 max-w-4xl mx-auto">
                {/* Document Info */}
                <div className="mb-8 pb-6 border-b">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      {documentType === 'code' ? 'Código Legal' : 'Caso Legal'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Versión 1.0
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Última actualización: 15/11/2024
                    </Badge>
                  </div>
                  <h1 className="text-3xl text-gray-900 mb-2">{documentName}</h1>
                  {documentCode && (
                    <p className="text-gray-600">Referencia: {documentCode}</p>
                  )}
                </div>

                {/* Sections Content */}
                <div className="space-y-8">
                  {sections.map((section) => (
                    <div key={section.id} id={section.id} className="scroll-mt-8">
                      {section.level === 1 ? (
                        <h2 className="text-2xl text-gray-900 mb-4 pb-2 border-b">
                          {section.title}
                        </h2>
                      ) : (
                        <h3 className="text-xl text-gray-900 mb-3">
                          {section.title}
                        </h3>
                      )}
                      <div className="space-y-4 text-gray-700">
                        {generateSectionContent(section).map((paragraph, idx) => (
                          <p key={idx} className="leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* End of document */}
                <div className="mt-12 pt-8 border-t text-center text-gray-500">
                  <p>Fin del documento</p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Footer with actions */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span>{sections.length} secciones</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onDownload}>
              Descargar PDF
            </Button>
            <Button variant="outline" size="sm">
              Imprimir
            </Button>
            <Button size="sm" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
