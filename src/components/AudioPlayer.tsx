import React, { useState, useEffect } from 'react';
import { nogoriAudio, SOUND_TRACKS } from '../utils/audioEngine';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  Sparkles,
  Radio,
  Flame
} from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onTogglePlay,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState('caklempong-kenduri');
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);

  const currentTrack = SOUND_TRACKS.find((t) => t.id === currentTrackId) || SOUND_TRACKS[0];

  useEffect(() => {
    nogoriAudio.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  const handleSelectTrack = (trackId: string) => {
    setCurrentTrackId(trackId);
    if (isPlaying) {
      nogoriAudio.play(trackId);
    }
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      nogoriAudio.pause();
    } else {
      nogoriAudio.play(currentTrackId);
    }
    onTogglePlay();
  };

  const handleMaxVolume = () => {
    setVolume(1.0);
    setIsMuted(false);
    nogoriAudio.setVolume(1.0);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm w-full sm:w-84">
      <div className="bg-[#1E1915]/95 text-[#FAF7F2] rounded-2xl border border-[#DECFA9]/40 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300">
        
        {/* Main Mini Controller Bar */}
        <div className="p-3.5 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Animated Equalizer */}
            <div className="w-10 h-10 rounded-xl bg-[#2E251B] border border-[#DECFA9]/30 flex items-center justify-center shrink-0 text-[#E6C687] shadow-inner">
              {isPlaying ? (
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-1 bg-[#E6C687] rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-3.5" />
                  <span className="w-1 bg-[#E6C687] rounded-full animate-[pulse_0.3s_ease-in-out_infinite] h-4" />
                  <span className="w-1 bg-[#E6C687] rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-2.5" />
                  <span className="w-1 bg-[#E6C687] rounded-full animate-[pulse_0.35s_ease-in-out_infinite] h-4" />
                </div>
              ) : (
                <Radio className="w-4 h-4 text-[#A89882]" />
              )}
            </div>

            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#E6C687] flex items-center gap-1.5">
                <span>Alunan Meriah Nogori</span>
                <span className="inline-flex items-center text-[9px] font-semibold text-amber-300 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-500/30">
                  <Flame className="w-2.5 h-2.5 mr-0.5 text-amber-400" /> Kuat
                </span>
                {isPlaying && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
              </div>
              <div className="text-xs font-bold text-[#FAF7F2] truncate mt-0.5">
                {currentTrack.name}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayToggle}
              className="p-2.5 bg-[#B33927] hover:bg-[#962F20] text-white rounded-xl transition-transform active:scale-95 cursor-pointer shadow-md"
              title={isPlaying ? 'Jeda alunan' : 'Mainkan alunan meriah'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            {/* Expand / Collapse Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-[#C7BBA8] hover:text-white rounded-lg transition-colors cursor-pointer"
              title={isExpanded ? 'Tutup pilihan alunan' : 'Pilih alunan & laras bunyi'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Expanded Drawer: Track List & Volume */}
        {isExpanded && (
          <div className="p-4 pt-2 border-t border-[#382E22] space-y-3 bg-[#171310]/95">
            
            <div className="text-[11px] font-serif italic text-[#E6C687] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>"{currentTrack.dialectTag}"</span>
            </div>

            {/* Track Selector List */}
            <div className="space-y-1.5">
              {SOUND_TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleSelectTrack(track.id)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    currentTrackId === track.id
                      ? 'bg-[#2E251B] text-[#E6C687] font-semibold border border-[#DECFA9]/30 shadow-2xs'
                      : 'text-[#C7BBA8] hover:bg-[#251E17] hover:text-white'
                  }`}
                >
                  <div className="truncate">
                    <div className="truncate font-medium">{track.name}</div>
                    <div className="text-[10px] text-[#A89882] truncate mt-0.5">{track.description}</div>
                  </div>
                  <span className="text-[10px] text-[#E6C687] shrink-0 ml-2 font-mono">{track.category}</span>
                </button>
              ))}
            </div>

            {/* Volume Slider with Boost */}
            <div className="pt-2 border-t border-[#2E251B] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#C7BBA8]">
                <span>Kelantangan Bunyi ({Math.round(volume * 100)}%)</span>
                <button
                  onClick={handleMaxVolume}
                  className="text-[10px] font-semibold text-[#E6C687] hover:text-white underline cursor-pointer"
                >
                  Maksimum 100%
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-[#C7BBA8] hover:text-white transition-colors"
                  title={isMuted ? 'Buka suara' : 'Bisukan'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#E6C687]" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-full accent-[#B33927] h-2 bg-[#2E251B] rounded-lg cursor-pointer"
                />
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
