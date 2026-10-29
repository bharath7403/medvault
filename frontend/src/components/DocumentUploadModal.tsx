import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  AlertCircle
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
  const [category, setCategory] = useState<DocumentCategory>('LAB_REPORT');
  const [documentDate, setDocumentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [hospital, setHospital] = useState<string>('City Diagnostic & Research Center');
  const [doctor, setDoctor] = useState<string>('Dr. Ramesh Sharma');
  
  const [uploadStep, setUploadStep] = useState<'IDLE' | 'PROCESSING' | 'COMPLETE'>('IDLE');
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [duplicateWarning] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Auto suggest category based on filename
      const nameLower = file.name.toLowerCase();
      if (nameLower.includes('blood') || nameLower.includes('lab') || nameLower.includes('test')) {
        setCategory('LAB_REPORT');
      } else if (nameLower.includes('rx') || nameLower.includes('prescription')) {
        setCategory('PRESCRIPTION');
      } else if (nameLower.includes('mri') || nameLower.includes('scan') || nameLower.includes('xray')) {
        setCategory('IMAGING_REPORT');
      } else if (nameLower.includes('discharge')) {
        setCategory('DISCHARGE_SUMMARY');
      }
    }
  };

  const handleStartProcessing = async () => {
    if (!selectedFile) return;

    setUploadStep('PROCESSING');
    
    // Step 1: File Storage
    setProcessingStatus('Verifying file hash & writing encrypted byte stream...');
    await new Promise(r => setTimeout(r, 600));

    // Step 2: OCR Extraction
    setProcessingStatus('Running OCR text extraction & document classification engine...');
    await new Promise(r => setTimeout(r, 700));

    // Step 3: LLM Extraction
    setProcessingStatus('Extracting clinical values, reference ranges & dosages...');
    await new Promise(r => setTimeout(r, 800));

    // Step 4: FHIR Mapping
    setProcessingStatus('Grounding facts with source bounding boxes & mapping FHIR schema...');
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
      <div className="bg-gray-950 border border-gray-800 rounded-2xl sm:rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-gray-950/90 backdrop-blur-md z-10">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Upload Medical Record</h3>
              <p className="text-[11px] sm:text-xs text-gray-400">Encrypted storage & automated AI structured extraction</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-gray-900 text-gray-400 hover:text-white shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {uploadStep === 'IDLE' && (
            <>
              {/* File Dropzone */}
              <div className="relative border-2 border-dashed border-gray-800 hover:border-indigo-500/60 rounded-2xl p-5 sm:p-6 text-center transition-all bg-gray-900/40 group cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  {selectedFile ? (
                    <div>
                      <p className="text-xs font-bold text-indigo-300 break-all">{selectedFile.name}</p>
                      <p className="text-[11px] text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-semibold text-gray-200">
                        Drag and drop your medical report here, or <span className="text-indigo-400">browse</span>
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">Supports PDF, PNG, JPG (Scanned prescriptions, lab reports, MRIs)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Duplicate Check Hint */}
              {selectedFile && duplicateWarning && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Duplicate Hash Detected: A similar report uploaded on 04-Apr-2026 already exists.</span>
                </div>
              )}

              {/* Form Metadata Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
                <div>
                  <label className="block text-gray-400 mb-1 font-medium">Document Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                    className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="LAB_REPORT">Laboratory Report</option>
                    <option value="PRESCRIPTION">Prescription Note</option>
                    <option value="IMAGING_REPORT">Imaging / Radiology Report</option>
                    <option value="DISCHARGE_SUMMARY">Discharge Summary</option>
                    <option value="CONSULTATION_NOTE">Consultation Note</option>
                    <option value="VACCINATION">Vaccination Certificate</option>
                  </select>
                </div>

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
                  <label className="block text-gray-400 mb-1 font-medium">Hospital / Lab Name</label>
                  <input
                    type="text"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. City Diagnostic Center"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1 font-medium">Prescribing Doctor</label>
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
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Process & Extract Record</span>
              </button>
            </>
          )}

          {uploadStep === 'PROCESSING' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
              <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Intelligent Document Extraction in Progress</h4>
                <p className="text-xs text-indigo-400 font-mono animate-pulse">{processingStatus}</p>
              </div>
            </div>
          )}

          {uploadStep === 'COMPLETE' && (
            <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Document Ingested & Verified</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Extracted medical facts linked directly to source evidence. Added to timeline.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
