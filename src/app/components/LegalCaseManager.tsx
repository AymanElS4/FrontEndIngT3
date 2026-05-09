import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Upload, Download, Eye, Trash2, FolderOpen, Search, Filter, Lock, Folder, File, ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { DocumentViewer } from './DocumentViewer';

interface FolderItem {
  id: string;
  name: string;
  type: 'folder';
  parentId: string | null;
}

interface FileItem {
  id: string;
  name: string;
  type: 'file';
  parentId: string;
  caseNumber: string;
  uploadDate: string;
  size: string;
  status: 'Activo' | 'Cerrado' | 'Pendiente' | 'Histórico' | 'Archivado';
}

type Item = FolderItem | FileItem;

type UserTier = 'Básico' | 'Profesional' | 'Empresa' | 'Administrador';

interface LegalCaseManagerProps {
  userTier: UserTier;
}

export function LegalCaseManager({ userTier }: LegalCaseManagerProps) {
  // Sample hierarchical data structure
  const [items, setItems] = useState<Item[]>([
    // Root folders
    { id: 'f1', name: 'Casos Civiles', type: 'folder', parentId: null },
    { id: 'f2', name: 'Casos Penales', type: 'folder', parentId: null },
    { id: 'f3', name: 'Casos Laborales', type: 'folder', parentId: null },
    
    // Subfolders in Casos Civiles
    { id: 'f1-1', name: 'Demandas', type: 'folder', parentId: 'f1' },
    { id: 'f1-2', name: 'Contratos', type: 'folder', parentId: 'f1' },
    
    // Subfolders in Casos Penales
    { id: 'f2-1', name: 'Delitos Graves', type: 'folder', parentId: 'f2' },
    { id: 'f2-2', name: 'Delitos Menores', type: 'folder', parentId: 'f2' },
    
    // Files in Demandas subfolder
    {
      id: 'file1',
      name: 'Smith vs Johnson Corp',
      type: 'file',
      parentId: 'f1-1',
      caseNumber: 'CV-2024-001',
      uploadDate: '2024-10-15',
      size: '2.4 MB',
      status: 'Activo'
    },
    {
      id: 'file2',
      name: 'García vs Inmobiliaria',
      type: 'file',
      parentId: 'f1-1',
      caseNumber: 'CV-2024-002',
      uploadDate: '2024-10-18',
      size: '1.9 MB',
      status: 'Pendiente'
    },
    
    // Files in Delitos Graves subfolder
    {
      id: 'file3',
      name: 'Estado vs Anderson',
      type: 'file',
      parentId: 'f2-1',
      caseNumber: 'CR-2024-045',
      uploadDate: '2024-10-20',
      size: '1.8 MB',
      status: 'Pendiente'
    },
    
    // Files in Casos Laborales (direct files in folder)
    {
      id: 'file4',
      name: 'Despido Improcedente - Martínez',
      type: 'file',
      parentId: 'f3',
      caseNumber: 'LAB-2024-012',
      uploadDate: '2024-09-30',
      size: '3.2 MB',
      status: 'Cerrado'
    }
  ]);

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newCaseName, setNewCaseName] = useState('');
  const [newCaseNumber, setNewCaseNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'Todos' | 'Civil' | 'Penal' | 'Laboral' | 'Corporativo'>('Todos');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Activo' | 'Cerrado' | 'Pendiente' | 'Histórico' | 'Archivado'>('Todos');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [viewingDocument, setViewingDocument] = useState<FileItem | null>(null);

  const isPremiumUser = userTier === 'Profesional' || userTier === 'Empresa' || userTier === 'Administrador';

  // Get current folder path (breadcrumb)
  const getBreadcrumbPath = () => {
    const path: FolderItem[] = [];
    let currentId = currentFolderId;
    
    while (currentId) {
      const folder = items.find(item => item.id === currentId && item.type === 'folder') as FolderItem;
      if (folder) {
        path.unshift(folder);
        currentId = folder.parentId;
      } else {
        break;
      }
    }
    
    return path;
  };

  // Get current items (folders and files in current directory)
  const currentItems = useMemo(() => {
    return items.filter(item => item.parentId === currentFolderId);
  }, [items, currentFolderId]);

  // Filter items
  const filteredItems = useMemo(() => {
    return currentItems.filter((item) => {
      if (item.type === 'folder') {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      
      const fileItem = item as FileItem;
      const matchesSearch =
        fileItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fileItem.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'Todos' || fileItem.status === statusFilter;
      
      const caseDate = new Date(fileItem.uploadDate);
      const matchesStartDate = !startDate || caseDate >= new Date(startDate);
      const matchesEndDate = !endDate || caseDate <= new Date(endDate);
      
      return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
    });
  }, [currentItems, searchQuery, statusFilter, startDate, endDate]);

  // Sort items: folders first, then files
  const sortedItems = useMemo(() => {
    const folders = filteredItems.filter(item => item.type === 'folder');
    const files = filteredItems.filter(item => item.type === 'file');
    return [...folders, ...files];
  }, [filteredItems]);

  // Pagination
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedItems.slice(startIndex, endIndex);
  }, [sortedItems, currentPage]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, startDate, endDate, currentFolderId]);

  const handleUpload = () => {
    if (!isPremiumUser) {
      alert('Necesita un plan Premium o superior para subir casos legales. Por favor, actualice su plan.');
      return;
    }
    if (newCaseName && newCaseNumber) {
      const newFile: FileItem = {
        id: `file-${Date.now()}`,
        name: newCaseName,
        type: 'file',
        parentId: currentFolderId || 'root',
        caseNumber: newCaseNumber,
        uploadDate: new Date().toISOString().split('T')[0],
        size: '1.5 MB',
        status: 'Activo'
      };
      setItems([...items, newFile]);
      setNewCaseName('');
      setNewCaseNumber('');
      setIsUploadOpen(false);
    }
  };

  const handleDownload = (file: FileItem) => {
    if (!isPremiumUser) {
      alert('Necesita un plan Premium o superior para descargar casos legales. Por favor, actualice su plan.');
      return;
    }
    console.log('Descargando caso:', file.name);
    alert(`Descargando: ${file.name}`);
  };

  const handleView = (file: FileItem) => {
    setViewingDocument(file);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleOpenFolder = (folderId: string) => {
    setCurrentFolderId(folderId);
    setCurrentPage(1);
  };

  const handleGoBack = () => {
    const currentFolder = items.find(item => item.id === currentFolderId && item.type === 'folder') as FolderItem;
    if (currentFolder) {
      setCurrentFolderId(currentFolder.parentId);
      setCurrentPage(1);
    }
  };

  const handleGoToRoot = () => {
    setCurrentFolderId(null);
    setCurrentPage(1);
  };

  const handleBreadcrumbClick = (folderId: string | null) => {
    setCurrentFolderId(folderId);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setCategoryFilter('Todos');
    setStatusFilter('Todos');
    setStartDate('');
    setEndDate('');
    setFilterOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Cerrado':
        return 'bg-gray-100 text-gray-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Histórico':
        return 'bg-blue-100 text-blue-800';
      case 'Archivado':
        return 'bg-gray-200 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const hasActiveFilters = categoryFilter !== 'Todos' || statusFilter !== 'Todos' || startDate || endDate;
  const breadcrumbPath = getBreadcrumbPath();
  const folders = sortedItems.filter(item => item.type === 'folder');
  const files = sortedItems.filter(item => item.type === 'file');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Directorio de Casos Legales</h2>
          <p className="text-gray-600 mt-1">Administre y acceda a todos sus archivos de casos legales</p>
        </div>
        
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <DialogTrigger asChild>
                    <Button className="gap-2" disabled={!isPremiumUser}>
                      {!isPremiumUser && <Lock className="w-4 h-4" />}
                      {isPremiumUser && <Upload className="w-4 h-4" />}
                      Subir Caso
                    </Button>
                  </DialogTrigger>
                </div>
              </TooltipTrigger>
              {!isPremiumUser && (
                <TooltipContent>
                  <p>Se requiere plan Premium o superior</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Subir Nuevo Caso Legal</DialogTitle>
              <DialogDescription>
                Agregue un nuevo caso legal a su directorio
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="case-name">Nombre del Caso</Label>
                <Input
                  id="case-name"
                  placeholder="Ingrese el nombre del caso"
                  value={newCaseName}
                  onChange={(e) => setNewCaseName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="case-number">Número de Caso</Label>
                <Input
                  id="case-number"
                  placeholder="Ingrese el número de caso"
                  value={newCaseNumber}
                  onChange={(e) => setNewCaseNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file-upload">Documentos del Caso</Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUpload}>Subir</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {!isPremiumUser && (
        <Alert className="bg-amber-50 border-amber-200">
          <Lock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Usted no tiene permiso para descargar y subir casos legales.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="space-y-3">
            {/* Breadcrumb navigation */}
            <div className="flex items-center gap-2 text-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGoToRoot}
                className="gap-1 h-8 px-2"
              >
                <Home className="w-4 h-4" />
                Inicio
              </Button>
              {breadcrumbPath.map((folder, index) => (
                <div key={folder.id} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBreadcrumbClick(folder.id)}
                    className="h-8 px-2"
                  >
                    {folder.name}
                  </Button>
                </div>
              ))}
            </div>

            {/* Back button */}
            {currentFolderId && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleGoBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </Button>
            )}

            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              <CardTitle>
                {currentFolderId 
                  ? breadcrumbPath[breadcrumbPath.length - 1]?.name || 'Carpeta'
                  : 'Todos los Casos'}
              </CardTitle>
            </div>
            <CardDescription>
              {folders.length} carpeta{folders.length !== 1 ? 's' : ''} • {files.length} archivo{files.length !== 1 ? 's' : ''}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter Section */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar carpetas y casos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filtrar
                  {hasActiveFilters && <Badge variant="secondary" className="ml-1 px-1.5 py-0 h-5">•</Badge>}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Filtros de Búsqueda</DialogTitle>
                  <DialogDescription>
                    Aplique filtros para refinar su búsqueda de casos legales
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  {hasActiveFilters && (
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-auto p-1 text-xs"
                      >
                        Limpiar todo
                      </Button>
                    </div>
                  )}

                  <Separator />

                  {/* Category and Status Filters Side by Side */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Category Filter */}
                    <div className="space-y-2">
                      <Label className="text-sm">Categoría</Label>
                      <div className="space-y-1">
                        {(['Todos', 'Civil', 'Penal', 'Laboral', 'Corporativo'] as const).map((category) => (
                          <div
                            key={category}
                            onClick={() => setCategoryFilter(category)}
                            className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
                              categoryFilter === category
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-accent'
                            }`}
                          >
                            <span className="text-sm">{category}</span>
                            {categoryFilter === category && (
                              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div className="space-y-2">
                      <Label className="text-sm">Estado</Label>
                      <div className="space-y-1">
                        {(['Todos', 'Activo', 'Cerrado', 'Pendiente', 'Histórico', 'Archivado'] as const).map((status) => (
                          <div
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
                              statusFilter === status
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-accent'
                            }`}
                          >
                            <span className="text-sm">{status}</span>
                            {statusFilter === status && (
                              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Date Filter */}
                  <div className="space-y-3">
                    <Label className="text-sm">Rango de Fechas</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="start-date" className="text-xs text-gray-600">Fecha de inicio</Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="end-date" className="text-xs text-gray-600">Fecha de fin</Label>
                        <Input
                          id="end-date"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setFilterOpen(false)}>
                      Cerrar
                    </Button>
                    <Button onClick={() => setFilterOpen(false)}>
                      Aplicar Filtros
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Combined Table for Folders and Files */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Número de Caso</TableHead>
                <TableHead>Fecha de Subida</TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    <FolderOpen className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Esta carpeta está vacía</p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedItems.map((item) => {
                  if (item.type === 'folder') {
                    return (
                      <TableRow 
                        key={item.id} 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleOpenFolder(item.id)}
                      >
                        <TableCell className="flex items-center gap-2">
                          <Folder className="w-5 h-5 text-blue-600" />
                          <span>{item.name}</span>
                        </TableCell>
                        <TableCell className="text-gray-400">—</TableCell>
                        <TableCell className="text-gray-400">—</TableCell>
                        <TableCell className="text-gray-400">—</TableCell>
                        <TableCell>
                          <Badge variant="outline">Carpeta</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenFolder(item.id);
                            }}
                            title="Abrir"
                          >
                            <FolderOpen className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  } else {
                    const file = item as FileItem;
                    return (
                      <TableRow key={file.id}>
                        <TableCell className="flex items-center gap-2">
                          <File className="w-4 h-4 text-gray-500" />
                          {file.name}
                        </TableCell>
                        <TableCell>{file.caseNumber}</TableCell>
                        <TableCell>{file.uploadDate}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(file.status)}>
                            {file.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleView(file)}
                              title="Ver"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDownload(file)}
                                    title="Descargar"
                                    disabled={!isPremiumUser}
                                  >
                                    {!isPremiumUser ? <Lock className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                                  </Button>
                                </TooltipTrigger>
                                {!isPremiumUser && (
                                  <TooltipContent>
                                    <p>Se requiere plan Premium o superior</p>
                                  </TooltipContent>
                                )}
                              </Tooltip>
                            </TooltipProvider>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(file.id)}
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <PaginationEllipsis key={page} />;
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Viewer */}
      {viewingDocument && (
        <DocumentViewer
          documentName={viewingDocument.name}
          documentCode={viewingDocument.caseNumber}
          documentType="case"
          onClose={() => setViewingDocument(null)}
        />
      )}
    </div>
  );
}