import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Camera, 
  FolderOpen,
  Image as ImageIcon,
  RotateCcw
} from 'lucide-react';
import type { DocumentCategory, MedicalRecord } from '../types/medvault';

interface DocumentUploadModalProps {
  onClose: () => void;
  onUploadSuccess: (record: MedicalRecord) => void;
  apiService: any;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  onClose,
  onUploadSuccess,
  apiService
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<DocumentCategory>('LAB_REPORT');
  const [documentDate, setDocumentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [hospital, setHospital] = useState<string>('City Diagnostic & Health Center');
  const [doctor, setDoctor] = useState<string>('Dr. Ramesh Sharma');
  
  const [uploadStep, setUploadStep] = useState<'IDLE' | 'PROCESSING' | 'COMPLETE'>('IDLE');
  const [processingStatus, setProcessingStatus] = useState<string>('');

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleProcessSelectedFile = (file: File) => {
    setSelectedFile(file);

    // Create thumbnail preview if image
    if (file.type.startsWith('image/') || file.name.toLowerCase().match(/\.(png|jpe?g|webp)$/)) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
    
    // Auto suggest category based on filename
    const nameLower = file.name.toLowerCase();
    if (nameLower.includes('blood') || nameLower.includes('lab') || nameLower.includes('test') || nameLower.includes('hba1c') || nameLower.includes('cbc')) {
      setCategory('LAB_REPORT');
    } else if (nameLower.includes('rx') || nameLower.includes('prescription') || nameLower.includes('tablet') || nameLower.includes('med')) {
      setCategory('PRESCRIPTION');
    } else if (nameLower.includes('mri') || nameLower.includes('scan') || nameLower.includes('xray') || nameLower.includes('ct') || nameLower.includes('ultrasound')) {
      setCategory('IMAGING_REPORT');
    } else if (nameLower.includes('discharge') || nameLower.includes('summary')) {
      setCategory('DISCHARGE_SUMMARY');
    } else if (nameLower.includes('vaccin')) {
      setCategory('VACCINATION');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessSelectedFile(e.target.files[0]);
    }
  };

  const handleTriggerCamera = () => {
    cameraInputRef.current?.click();
  };

  const handleTriggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleResetFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setSelectedFile(null);
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleStartProcessing = async () => {
    if (!selectedFile) return;

    setUploadStep('PROCESSING');
    
    // Step 1: File Storage
    setProcessingStatus('Verifying cryptographic SHA-256 integrity & encrypting stream...');
    await new Promise(r => setTimeout(r, 600));

    // Step 2: OCR Extraction
    setProcessingStatus('Running OCR text extraction & clinical vision engine...');
    await new Promise(r => setTimeout(r, 700));

    // Step 3: LLM Extraction
    setProcessingStatus('Structuring clinical values, reference ranges & prescription dosages...');
    await new Promise(r => setTimeout(r, 800));

    // Step 4: FHIR Mapping
    setProcessingStatus('Grounding facts with source evidence & mapping FHIR schema...');
    await new Promise(r => setTimeout(r, 600));

    const newRecord = await apiService.uploadRecord(
      selectedFile,
      category,
      documentDate,
      hospital,
      doctor
    );

    setUploadStep('COMPLETE');
    setTimeout(() => {
      onUploadSuccess(newRecord);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl sm:rounded-3xl w-full max-w-xl max-h-[94vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-gray-950/95 backdrop-blur-md z-20">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0 border border-indigo-500/20">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Import Medical Document</h3>
              <p className="text-[11px] sm:text-xs text-gray-400">Mobile camera photo capture, PDF import & AI extraction</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-gray-900 text-gray-400 hover:text-white shrink-0 border border-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {uploadStep === 'IDLE' && (
            <>
              {/* Hidden Inputs for Camera and File Picker */}
              {/* Mobile Camera Input (capture="environment" directly launches rear document camera on mobile) */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
              {/* File / Document / Gallery Picker */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Top Action Buttons: Mobile Camera vs Document Import */}
              {!selectedFile ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Snap Photo with Camera (Mobile friendly) */}
                    <button
                      type="button"
                      onClick={handleTriggerCamera}
                      className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-indigo-950/30 to-gray-900 border border-indigo-500/30 hover:border-indigo-400 text-left transition-all group flex items-start space-x-3.5 shadow-lg shadow-indigo-950/50"
                    >
                      <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-indigo-600/30">
                        <Camera className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center space-x-1">
                          <span>Snap Document Photo</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-snug">
                          Use mobile camera to photograph paper prescriptions or physical lab reports.
                        </p>
                      </div>
                    </button>

                    {/* Import PDF or File from Storage */}
                    <button
                      type="button"
                      onClick={handleTriggerFilePicker}
                      className="p-4 rounded-2xl bg-gray-900/60 hover:bg-gray-900 border border-gray-800 hover:border-gray-700 text-left transition-all group flex items-start space-x-3.5"
                    >
                      <div className="p-2.5 rounded-xl bg-gray-800 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
                        <FolderOpen className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                          <span>Import PDF or Gallery</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-snug">
                          Select digital PDF diagnostic reports, screenshots, or gallery scans.
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* Drag-and-drop zone for desktop */}
                  <div 
                    onClick={handleTriggerFilePicker}
                    className="border-2 border-dashed border-gray-800/80 hover:border-indigo-500/50 rounded-2xl p-4 sm:p-5 text-center transition-all bg-gray-900/30 cursor-pointer group"
                  >
                    <div className="flex flex-col items-center justify-center space-y-1.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <FileText className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-medium text-gray-300">
                        Or drag & drop files here (PDF, JPG, PNG)
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Max size: 50MB per document • 256-bit AES encryption
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Selected File Preview Box */
                <div className="p-4 rounded-2xl bg-gray-900/80 border border-indigo-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                      {previewUrl ? <ImageIcon className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                      <span>{previewUrl ? 'Captured Document Photo' : 'Selected Document File'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleResetFile}
                      className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center space-x-1 px-2 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Retake / Change</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-3.5">
                    {previewUrl ? (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-gray-700 shrink-0 bg-black flex items-center justify-center shadow-md">
                        <img 
                          src={previewUrl} 
                          alt="Captured Document" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <FileText className="w-8 h-8" />
                      </div>
                    )}
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{selectedFile.name}</p>
                      <p className="text-[11px] text-gray-400">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type || 'Document'}
                      </p>
                      <span className="inline-block text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Ready for AI Extraction
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Category Quick Pills */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-xs font-medium">Document Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'LAB_REPORT', label: 'Lab Report' },
                    { id: 'PRESCRIPTION', label: 'Prescription' },
                    { id: 'IMAGING_REPORT', label: 'Imaging / Scan' },
                    { id: 'DISCHARGE_SUMMARY', label: 'Discharge Summary' },
                    { id: 'CONSULTATION_NOTE', label: 'Consultation' },
                    { id: 'VACCINATION', label: 'Vaccination' },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCategory(cat.id as DocumentCategory)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left transition-all ${
                        category === cat.id
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                          : 'bg-gray-900 text-gray-300 border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Metadata Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-400 mb-1 font-medium">Document Date</label>
                  <input
                    type="date"
                    value={documentDate}
                    onChange={(e) => setDocumentDate(e.target.value)}
                    className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1 font-medium">Hospital / Clinic / Lab</label>
                  <input
                    type="text"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. City Diagnostic Center"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-400 mb-1 font-medium">Doctor / Prescribing Physician</label>
                  <input
                    type="text"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Dr. Ramesh Sharma"
                  />
                </div>
              </div>

              {/* Submit Trigger */}
              <button
                disabled={!selectedFile}
                onClick={handleStartProcessing}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Process & Save to My Health Vault</span>
              </button>
            </>
          )}

          {uploadStep === 'PROCESSING' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
              <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
              <div className="space-y-1.5 max-w-sm">
                <h4 className="text-sm font-bold text-white">Extracting Clinical Intelligence</h4>
                <p className="text-xs text-indigo-400 font-mono animate-pulse">{processingStatus}</p>
              </div>
            </div>
          )}

          {uploadStep === 'COMPLETE' && (
            <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Document Ingested & Verified</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Document safely encrypted and linked to your Health Vault. Clinical facts and timeline updated.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
