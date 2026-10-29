import React, { useState } from 'react';
import { 
  GitCommit, 
  Calendar, 
  ExternalLink
} from 'lucide-react';
import type { TimelineEvent, MedicalRecord } from '../types/medvault';

interface HealthTimelineProps {
  timelineEvents: TimelineEvent[];
  records: MedicalRecord[];
  onSelectRecord: (record: MedicalRecord) => void;
}

export const HealthTimeline: React.FC<HealthTimelineProps> = ({
  timelineEvents,
  records,
  onSelectRecord
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredEvents = timelineEvents.filter(event => {
    if (selectedCategory !== 'ALL' && event.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-900/60 border border-gray-800">
        <div>
          <div className="flex items-center space-x-2">
            <GitCommit className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">Longitudinal Health Timeline</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Chronological aggregation of lifelong consultations, lab panels, radiology, and prescriptions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
          {['ALL', 'LAB_REPORT', 'PRESCRIPTION', 'IMAGING_REPORT', 'DISCHARGE_SUMMARY'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-gray-950 text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? 'All Events' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Timeline Stream */}
      {filteredEvents.length === 0 ? (
        <div className="p-8 sm:p-12 rounded-2xl sm:rounded-3xl bg-gray-900/40 border border-dashed border-gray-800 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <GitCommit className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h3 className="text-sm font-bold text-white">No Timeline Events Recorded</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Upload your medical records or take a photo with your mobile camera to automatically generate a chronological health journey.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-500/30 space-y-6 sm:space-y-8 my-4">
          {filteredEvents.map((event) => {
            const matchingRecord = records.find(r => r.id === event.recordId);

            return (
              <div key={event.id} className="relative group">
                {/* Timeline Node Point */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-gray-950 border-2 border-indigo-500 group-hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/30" />

                {/* Event Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-indigo-500/50 hover:bg-gray-900 transition-all space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="font-semibold">{event.date}</span>
                        <span>•</span>
                        <span className="font-medium text-gray-300">{event.hospital}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">
                        {event.title}
                      </h3>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gray-800 text-indigo-300 border border-gray-700 self-start">
                      {event.category.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 bg-gray-950/60 p-3 rounded-xl border border-gray-800/80 leading-relaxed">
                    {event.summary}
                  </p>

                  {/* Key Extracted Facts Chips */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                    {event.keyFacts.map((fact, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      >
                        {fact}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action */}
                  {matchingRecord && (
                    <div className="pt-3 border-t border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-[11px] text-gray-500">Doctor: {event.doctor}</span>
                      <button
                        onClick={() => onSelectRecord(matchingRecord)}
                        className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold bg-gray-950 px-3 py-1.5 rounded-xl border border-gray-800 hover:border-indigo-500/40 transition-all self-start sm:self-auto"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Document Evidence</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
