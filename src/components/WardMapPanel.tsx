import React, { useEffect, useRef, useState } from 'react';
import { PortalConfig, MapType } from '../types';
import L from 'leaflet';

interface WardMapPanelProps {
  config: PortalConfig;
  onGoToWardVoterList: (wardNumber: number) => void;
}

export const WardMapPanel: React.FC<WardMapPanelProps> = ({ config, onGoToWardVoterList }) => {
  const [mapType, setMapType] = useState<MapType>('leaflet');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapType !== 'leaflet' || !mapContainerRef.current) return;

    if (!leafletMapRef.current && config.wardPoints.length > 0) {
      const avgLat = config.wardPoints.reduce((s, p) => s + p.lat, 0) / config.wardPoints.length;
      const avgLon = config.wardPoints.reduce((s, p) => s + p.lon, 0) / config.wardPoints.length;

      const map = L.map(mapContainerRef.current).setView([avgLat, avgLon], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      config.wardPoints.forEach((p) => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="background:#E8A33D;color:#101B33;border:2px solid #101B33;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:12px;box-shadow:0 2px 6px rgba(0,0,0,.4);">${p.ward}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const marker = L.marker([p.lat, p.lon], { icon }).addTo(map);

        const popupContent = document.createElement('div');
        popupContent.style.fontFamily = "'Noto Sans Devanagari', sans-serif";
        popupContent.style.textAlign = 'center';
        popupContent.style.padding = '4px';
        popupContent.innerHTML = `
          <b style="font-size:15px;">वार्ड नं. ${p.ward}</b><br>
          <div style="font-size:11px;color:#666;margin-bottom:6px;">लैट: ${p.lat.toFixed(4)}, लॉन्ग: ${p.lon.toFixed(4)}</div>
        `;

        const btn = document.createElement('button');
        btn.textContent = 'वोटर लिस्ट देखें';
        btn.style.cssText = 'background:#1F6F54;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px;';
        btn.onclick = () => {
          onGoToWardVoterList(p.ward);
        };
        popupContent.appendChild(btn);

        marker.bindPopup(popupContent);
      });

      leafletMapRef.current = map;
    }

    const timer = setTimeout(() => {
      if (leafletMapRef.current) {
        leafletMapRef.current.invalidateSize();
      }
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [mapType, config.wardPoints, onGoToWardVoterList]);

  // Clean up Leaflet map on unmount
  useEffect(() => {
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  return (
    <section className="space-y-4 sm:space-y-5 animate-fadeIn">
      {/* Bento Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-[var(--saffron)]/10 text-[var(--saffron-deep)] dark:text-[var(--saffron)] rounded-full text-[11px] font-bold tracking-wider uppercase border border-[var(--saffron)]/20">
              GIS नक्शा सेवा
            </span>
            <span className="text-xs text-[var(--soft-text)] font-medium">55 वार्ड लोकेशन</span>
          </div>
          <h2 className="font-rajdhani font-bold text-2xl sm:text-3xl text-[var(--page-text)]">वार्ड मैप नेविगेशन</h2>
        </div>

        {/* Map Switcher Bento Pills */}
        <div className="flex p-1 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full shadow-sm">
          <button
            type="button"
            onClick={() => setMapType('leaflet')}
            className={`px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all ${
              mapType === 'leaflet'
                ? 'bg-[var(--page-text)] text-[var(--page-bg)] shadow-sm'
                : 'text-[var(--soft-text)] hover:text-[var(--page-text)]'
            }`}
          >
            📍 इंटरएक्टिव 55 वार्ड
          </button>

          <button
            type="button"
            onClick={() => setMapType('google')}
            className={`px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all ${
              mapType === 'google'
                ? 'bg-[var(--page-text)] text-[var(--page-bg)] shadow-sm'
                : 'text-[var(--soft-text)] hover:text-[var(--page-text)]'
            }`}
          >
            🗺️ Google My Maps
          </button>
        </div>
      </div>

      {/* Main Bento Map Frame */}
      <div className="bento-card p-2 sm:p-3 overflow-hidden">
        {/* Leaflet Map Container */}
        <div className={mapType === 'leaflet' ? 'block' : 'hidden'}>
          <div
            ref={mapContainerRef}
            className="w-full h-[520px] sm:h-[580px] rounded-[1.25rem] overflow-hidden"
          />
        </div>

        {/* Google My Maps Embed Container */}
        {mapType === 'google' && (
          <div className="w-full h-[520px] sm:h-[580px] rounded-[1.25rem] overflow-hidden bg-[var(--panel-bg)]">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1bSkeDrpr8PsQWzM85P4w0agiGdTeDhQ&ehbc=2E312F"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              title="Google My Maps Ward Map"
            />
          </div>
        )}

        <div className="p-3 sm:px-4 flex items-center justify-between flex-wrap gap-2 text-xs text-[var(--soft-text)] border-t border-[var(--card-border)] mt-2">
          <span>💡 टिप: किसी भी वार्ड नंबर वाले पिन पर क्लिक करके सीधे उस वार्ड की वोटर लिस्ट खोली जा सकती है।</span>
          <span className="font-mono-code">55 Wards Geocoded</span>
        </div>
      </div>
    </section>
  );
};
