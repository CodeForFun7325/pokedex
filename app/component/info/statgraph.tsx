"use client"; 
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";

import Stats from "./../../entities/stats";
import "./statgraph.css";

export default function StatsGraph({ stats } :{stats : Stats[] | []}) { 

  return (
    <div className="stats-container">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="60%" data={stats}>
          <PolarGrid />
          <PolarAngleAxis dataKey="statDecode" tick={{fontSize: '1rem', fill: '#FFFFFF'}}/>
          <PolarRadiusAxis angle={30} domain={[0, 140]} tick={{fontSize: '.9rem', fill: '#FFFFFF'}} />
          <Radar name="Stats" dataKey="base_stat" stroke="#eef509" fill="#eef509" fillOpacity={0.7} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );

}