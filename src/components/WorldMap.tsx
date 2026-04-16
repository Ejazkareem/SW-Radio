import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

interface WorldMapProps {
  highlightedCountry?: string;
}

export const WorldMap: React.FC<WorldMapProps> = ({ highlightedCountry }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        setDimensions({
          width: svgRef.current.parentElement.clientWidth,
          height: svgRef.current.parentElement.clientHeight || 400,
        });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const projection = d3.geoMercator()
      .scale(dimensions.width / 6.5)
      .translate([dimensions.width / 2, dimensions.height / 1.5]);

    const path = d3.geoPath().projection(projection);

    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then((data: any) => {
      const countries = topojson.feature(data, data.objects.countries) as any;

      svg.append('g')
        .selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', (d: any) => {
          if (d.properties.name === 'Pakistan') return '#4ade80'; // Accent
          if (d.properties.name === highlightedCountry) return '#3b82f6'; // Blue 500
          return '#161a1d'; // Panel
        })
        .attr('stroke', '#2d3748') // Border
        .attr('stroke-width', 0.5)
        .on('mouseover', function() {
          d3.select(this).attr('stroke', '#4ade80');
        })
        .on('mouseout', function(d: any) {
          d3.select(this).attr('stroke', '#2d3748');
        });

      // Add a special glow for Pakistan
      const pakistan = countries.features.find((d: any) => d.properties.name === 'Pakistan');
      if (pakistan) {
        svg.append('path')
          .datum(pakistan)
          .attr('d', path)
          .attr('fill', 'none')
          .attr('stroke', '#4ade80')
          .attr('stroke-width', 2)
          .attr('class', 'animate-pulse');
      }
    });
  }, [dimensions, highlightedCountry]);

  return (
    <div className="relative w-full h-full min-h-[300px] bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden shadow-inner">
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Global Coverage</span>
        </div>
      </div>
      <svg ref={svgRef} className="w-full h-full" />
      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-zinc-600">
        SW RADIO DX NETWORK
      </div>
    </div>
  );
};
