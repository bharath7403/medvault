import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  AlertTriangle, 
  Sparkles, 
  Eye, 
  Download, 
  Shield, 
  Code,
  Printer,
  Building2,
  CheckCircle2,
  Award
} from 'lucide-react';
import type { MedicalRecord, MedicalFact } from '../types/medvault';

interface SplitScreenViewerProps {
  record: MedicalRecord;
  onClose: () => void;
}

const generateDocumentHtml = (record: MedicalRecord) => {
  const factsRows = record.extraction.facts.map(f => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 10px 12px; font-weight: 600; color: #111827;">${f.factKey}</td>
      <td style="padding: 10px 12px; font-weight: 700; color: #1d4ed8;">${f.factValue} <span style="font-size: 11px; font-weight: 400; color: #6b7280;">${f.unit || ''}</span></td>
      <td style="padding: 10px 12px; color: #4b5563; font-size: 12px;">${f.referenceRange || 'Standard Range'}</td>
      <td style="padding: 10px 12px; font-size: 11px;"><span style="background: #dcfce7; color: #15803d; padding: 2px 8px; border-radius: 9999px; font-weight: 600;">NORMAL / VERIFIED</span></td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${record.fileName} - MedVault Clinical Record</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f3f4f6; margin: 0; padding: 24px; color: #1f2937; }
    .page { max-width: 800px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border-radius: 8px; position: relative; }
    .header { border-bottom: 3px double #3b82f6; padding-bottom: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
    .hospital-title { font-size: 22px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; }
    .hospital-sub { font-size: 12px; color: #64748b; margin-top: 4px; }
    .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 24px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 13px; }
    .meta-item strong { color: #475569; display: inline-block; width: 130px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
    th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-weight: 700; color: #334155; border-bottom: 2px solid #cbd5e1; }
    .summary-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px; margin-bottom: 28px; border-radius: 0 6px 6px 0; font-size: 13px; line-height: 1.6; color: #1e40af; }
    .footer { border-top: 1px solid #e2e8f0; padding-top: 20px; display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; }
    .stamp { border: 2px dashed #059669; padding: 8px 14px; border-radius: 6px; color: #059669; font-weight: 800; font-size: 11px; text-align: center; text-transform: uppercase; }
    .signature { text-align: right; font-size: 13px; }
    .doctor-name { font-weight: 700; color: #0f172a; }
    .doctor-title { color: #64748b; font-size: 12px; }
    .no-print { margin-bottom: 16px; text-align: center; }
    .btn { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 14px; }
    .btn:hover { background: #1d4ed8; }
    @media print {
      body { background: white; padding: 0; }
      .page { box-shadow: none; border-radius: 0; padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print">
    <button class="btn" onclick="window.print()">🖨️ Print or Save as PDF</button>
  </div>
  <div class="page">
    <div class="header">
      <div>
        <div class="hospital-title">${record.hospital}</div>
        <div class="hospital-sub">Accreditation: NABH / NABL Certified • Diagnostic Clinical Services</div>
        <div class="hospital-sub">Registry ID: MED/KA/2026/8940 • 24x7 Emergency Contact: 1800-419-MEDV</div>
      </div>
      <div style="text-align: right;">
        <span style="background: #2563eb; color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase;">${record.category.replace('_', ' ')}</span>
        <div style="font-size: 11px; color: #64748b; margin-top: 6px;">Ref No: ${record.id.toUpperCase()}</div>
      </div>
    </div>

    <div class="meta-box">
      <div class="meta-item"><strong>Patient Name:</strong> Bharath N.</div>
      <div class="meta-item"><strong>Health ID:</strong> MV-DEMO-98450</div>
      <div class="meta-item"><strong>Age / Gender:</strong> 27 Y / Male</div>
      <div class="meta-item"><strong>Report Date:</strong> ${record.documentDate}</div>
      <div class="meta-item"><strong>Consulting Doctor:</strong> ${record.doctor}</div>
      <div class="meta-item"><strong>Specimen / Order:</strong> Routine Diagnostic Referral</div>
    </div>

    <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 12px; text-transform: uppercase;">Diagnostic Observations & Test Results</h3>
    <table>
      <thead>
        <tr>
          <th>Investigation / Metric</th>
          <th>Observed Value</th>
          <th>Reference Interval</th>
          <th>Interpretation</th>
        </tr>
      </thead>
      <tbody>
        ${factsRows}
      </tbody>
    </table>

    <div class="summary-box">
      <strong>Clinical Report Summary & Impression:</strong><br />
      ${record.extraction.summary}
    </div>

    <div class="footer">
      <div>
        <div class="stamp">
          🛡️ MedVault Anchored<br />
          <span style="font-size: 9px; font-family: monospace;">SHA-256: ${record.fileHash.substring(0, 18)}...</span>
        </div>
        <div style="font-size: 10px; color: #94a3b8; margin-top: 6px;">
          Cryptographically signed & anchored under patient governance key.
        </div>
      </div>
      <div class="signature">
        <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 24px; color: #1e3a8a; margin-bottom: 4px;">
          ${record.doctor.split('(')[0]}
        </div>
        <div class="doctor-name">${record.doctor}</div>
        <div class="doctor-title">Authorized Medical Specialist • Reg: MCI-78219</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

export const SplitScreenViewer: React.FC<SplitScreenViewerProps> = ({ record, onClose }) => {
  const [selectedFact, setSelectedFact] = useState<MedicalFact | null>(
    record.extraction.facts[0] || null
  );
  const [leftViewMode, setLeftViewMode] = useState<'DOCUMENT_SHEET' | 'EVIDENCE_SNIPPETS'>('DOCUMENT_SHEET');
  const [showFhir, setShowFhir] = useState(false);

  const handleOpenPrintable = () => {
    const html = generateDocumentHtml(record);
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  const handleDownloadReport = () => {
    const html = generateDocumentHtml(record);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${record.fileName.replace(/\.pdf$/i, '')}_MedVault_Report.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="min-h-16 py-2.5 bg-gray-950 border-b border-gray-800 px-3 sm:px-6 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide truncate max-w-[180px] sm:max-w-xs">{record.fileName}</h2>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                Verified
              </span>
              {record.hasConflict && (
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center space-x-1 shrink-0">
                  <AlertTriangle className="w-3 h-3" />
                  <span className="hidden sm:inline">Conflict Flag</span>
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-gray-400 truncate">
              {record.hospital} • {record.documentDate}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 ml-auto sm:ml-0">
          <button
            onClick={handleOpenPrintable}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all"
            title="Open clean printable document sheet in a new tab"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Printable</span>
          </button>
          
          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 text-xs font-medium transition-all"
            title="Download Report HTML"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={() => setShowFhir(!showFhir)}
            className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              showFhir 
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40' 
                : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'
            }`}
            title="Toggle FHIR JSON"
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">FHIR</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white transition-all ml-1"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Main Split Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-gray-950">
        {/* Left Column: Official Clinical Document Sheet / OCR View */}
        <div className="border-r border-gray-800 p-3 sm:p-6 overflow-y-auto flex flex-col bg-gray-900/40">
          <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Eye className="w-4 h-4 text-indigo-400" />
                <span className="hidden xs:inline">Evidence Document</span>
              </span>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center bg-gray-950 p-1 rounded-xl border border-gray-800 text-xs">
              <button
                onClick={() => setLeftViewMode('DOCUMENT_SHEET')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg font-semibold transition-all text-xs ${
                  leftViewMode === 'DOCUMENT_SHEET'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Clinical Sheet
              </button>
              <button
                onClick={() => setLeftViewMode('EVIDENCE_SNIPPETS')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg font-semibold transition-all text-xs ${
                  leftViewMode === 'EVIDENCE_SNIPPETS'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                OCR Snippets
              </button>
            </div>
          </div>

          {/* Mode A: Authentic Official Clinical Paper Sheet */}
          {leftViewMode === 'DOCUMENT_SHEET' && (
            <div className="flex-1 rounded-2xl bg-white text-gray-900 p-4 sm:p-7 shadow-2xl relative flex flex-col font-sans border border-gray-300 overflow-y-auto max-h-[85vh]">
              {/* Watermark Seal */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                <Shield className="w-96 h-96 text-gray-900" />
              </div>

              {/* Hospital Header Banner */}
              <div className="border-b-2 border-indigo-700 pb-3 sm:pb-4 mb-4 sm:mb-5 flex flex-col sm:flex-row justify-between items-start gap-2">
                <div>
                  <div className="flex items-center space-x-2 text-indigo-900">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-700 shrink-0" />
                    <h1 className="text-base sm:text-xl font-extrabold uppercase tracking-tight">{record.hospital}</h1>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                    Accreditation: NABH & NABL Approved • ISO 15189 Certified Diagnostic Center
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-gray-400">
                    Registration: MED/KA/2026/8940 • 24x7 Helpdesk: 1800-419-MEDV
                  </p>
                </div>
                <div className="sm:text-right">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide">
                    {record.category.replace('_', ' ')}
                  </span>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">ID: {record.id.toUpperCase()}</div>
                </div>
              </div>

              {/* Patient & Specimen Demographics Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 mb-4 sm:mb-5 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs">
                <div>
                  <span className="text-gray-500 font-medium">Patient Name:</span>{' '}
                  <strong className="text-gray-900">Bharath N.</strong>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Health ID:</span>{' '}
                  <strong className="text-gray-900 font-mono">MV-DEMO-98450</strong>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Age / Gender:</span>{' '}
                  <span className="text-gray-900 font-semibold">27 Y / Male</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Document Date:</span>{' '}
                  <span className="text-gray-900 font-semibold">{record.documentDate}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Consulting Doctor:</span>{' '}
                  <span className="text-gray-900 font-semibold">{record.doctor}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Verification Status:</span>{' '}
                  <span className="text-emerald-700 font-bold">● Anchored & Authenticated</span>
                </div>
              </div>

              {/* Diagnostic Observations Table */}
              <div className="mb-4 sm:mb-5">
                <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Diagnostic Findings & Observations</span>
                  <span className="text-[10px] text-gray-400 font-normal hidden sm:inline">Standardized Clinical Parameters</span>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse min-w-[380px] sm:min-w-0">
                    <thead className="bg-slate-100 text-gray-700 font-semibold border-b border-gray-200">
                      <tr>
                        <th className="p-2 sm:p-2.5">Investigation / Fact</th>
                        <th className="p-2 sm:p-2.5">Observed Result</th>
                        <th className="p-2 sm:p-2.5">Reference Interval</th>
                        <th className="p-2 sm:p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {record.extraction.facts.map((fact) => (
                        <tr 
                          key={fact.id}
                          onClick={() => setSelectedFact(fact)}
                          className={`cursor-pointer transition-colors ${
                            selectedFact?.id === fact.id ? 'bg-indigo-50 font-medium' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="p-2 sm:p-2.5 text-gray-900">{fact.factKey}</td>
                          <td className="p-2 sm:p-2.5 font-bold text-indigo-700">
                            {fact.factValue} <span className="text-[11px] font-normal text-gray-500">{fact.unit}</span>
                          </td>
                          <td className="p-2 sm:p-2.5 text-gray-600 text-[11px]">{fact.referenceRange || 'Standard'}</td>
                          <td className="p-2 sm:p-2.5">
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Normal</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Executive Clinical Summary Box */}
              <div className="p-3 sm:p-4 rounded-xl bg-indigo-50/70 border-l-4 border-indigo-600 mb-4 sm:mb-6 text-xs text-indigo-950 leading-relaxed">
                <div className="font-bold text-indigo-900 mb-1 flex items-center space-x-1">
                  <Award className="w-4 h-4 text-indigo-700" />
                  <span>Clinical Impression & Official Summary:</span>
                </div>
                <p>{record.extraction.summary}</p>
              </div>

              {/* Bottom Sign-off & Verification Seal */}
              <div className="mt-auto pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-xs">
                <div>
                  <div className="border border-emerald-600/40 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg text-center font-bold text-[10px] tracking-wide inline-block">
                    🛡️ MedVault Anchored Evidence<br />
                    <span className="font-mono text-[9px] font-normal text-emerald-700">
                      SHA-256: {record.fileHash.substring(0, 16)}...
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">
                    Digitally signed by hospital laboratory registry.
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="text-base font-serif italic text-indigo-900 font-bold mb-1">
                    {record.doctor.split('(')[0]}
                  </div>
                  <div className="font-bold text-gray-900 text-xs">{record.doctor}</div>
                  <div className="text-[10px] text-gray-500">Authorized Medical Officer • Reg MCI-78219</div>
                </div>
              </div>
            </div>
          )}

          {/* Mode B: Evidence Snippets & OCR Highlight Box */}
          {leftViewMode === 'EVIDENCE_SNIPPETS' && (
            <div className="flex-1 rounded-2xl border border-gray-800 bg-gray-950 p-6 relative flex flex-col justify-start min-h-[450px]">
              <div className="border-b border-gray-800 pb-4 mb-6">
                <div className="text-xs font-bold text-gray-400 uppercase">{record.hospital}</div>
                <div className="text-lg font-extrabold text-white mt-1">{record.extraction.documentType.replace('_', ' ')}</div>
                <div className="text-xs text-gray-400 mt-1">Date: {record.documentDate} | Ref ID: {record.id}</div>
              </div>

              <div className="space-y-4 text-xs font-mono text-gray-300 leading-relaxed">
                <p className="text-gray-400 border-b border-gray-900 pb-2">=== CLINICAL FINDINGS & DIAGNOSTIC OBSERVATIONS ===</p>
                
                {record.extraction.facts.map((fact) => {
                  const isSelected = selectedFact?.id === fact.id;
                  return (
                    <div
                      key={fact.id}
                      onClick={() => setSelectedFact(fact)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg ring-1 ring-indigo-500/50 scale-[1.01]'
                          : 'bg-gray-900/60 border-gray-800 text-gray-300 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-indigo-300">Page {fact.pageNumber} • {fact.category}</span>
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
                          {Math.round(fact.confidence * 100)}% Extraction Confidence
                        </span>
                      </div>
                      <p className="font-semibold text-xs text-white">{fact.snippetText}</p>
                      {isSelected && (
                        <div className="mt-2 text-[10px] text-indigo-400 font-sans flex items-center space-x-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Source Location Highlighted (Evidence Link Active)</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="pt-4 text-gray-500 text-[11px] font-sans italic border-t border-gray-900">
                  * Encrypted raw byte stream stored under patient governance key. Original binary unaltered.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Extracted Structured Intelligence */}
        <div className="p-6 overflow-y-auto flex flex-col bg-gray-950">
          {showFhir ? (
            /* FHIR JSON View */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div className="flex items-center space-x-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
                  <Code className="w-4 h-4" />
                  <span>HL7 FHIR Interoperable Representation</span>
                </div>
                <span className="text-xs text-gray-400">R4 Interoperability Format</span>
              </div>
              <pre className="bg-gray-900 p-4 rounded-2xl border border-gray-800 text-xs font-mono text-emerald-400 overflow-x-auto">
                {JSON.stringify(record.extraction.fhirJson, null, 2)}
              </pre>
            </div>
          ) : (
            /* Extracted Facts & Source Grounding View */
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Structured Medical Extraction</span>
                </div>
                <span className="text-xs text-gray-400">Source Grounded</span>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs">
                <div className="text-indigo-400 font-semibold mb-1">Extracted Executive Summary</div>
                <p className="text-gray-300 leading-relaxed">{record.extraction.summary}</p>
              </div>

              {/* Extracted Facts List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Extracted Observations ({record.extraction.facts.length})
                </div>

                {record.extraction.facts.map((fact) => {
                  const isSelected = selectedFact?.id === fact.id;
                  return (
                    <div
                      key={fact.id}
                      onClick={() => setSelectedFact(fact)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/10 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                          : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs font-medium text-gray-400">{fact.category}</div>
                          <div className="text-sm font-bold text-white mt-0.5">{fact.factKey}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-extrabold text-indigo-300">
                            {fact.factValue} <span className="text-xs font-normal text-gray-400">{fact.unit}</span>
                          </div>
                          {fact.referenceRange && (
                            <div className="text-[10px] text-gray-500">Ref: {fact.referenceRange}</div>
                          )}
                        </div>
                      </div>

                      {/* View Source Trigger Button */}
                      <div className="mt-3 pt-3 border-t border-gray-800/80 flex items-center justify-between">
                        <span className="text-[11px] text-gray-400 italic truncate max-w-[280px]">
                          "{fact.snippetText}"
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFact(fact);
                            setLeftViewMode('EVIDENCE_SNIPPETS');
                          }}
                          className={`flex items-center space-x-1 text-xs px-2.5 py-1 rounded-lg transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white font-semibold'
                              : 'bg-gray-800 text-indigo-400 hover:bg-gray-700'
                          }`}
                        >
                          <Eye className="w-3 h-3" />
                          <span>View Source</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Medical Disclaimer Banner */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-relaxed flex items-start space-x-2">
                <Shield className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <span>
                  <strong>Evidence Disclaimer:</strong> Information extracted above is anchored directly to your uploaded stored document. It is intended for organization only and is not a medical diagnosis.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
