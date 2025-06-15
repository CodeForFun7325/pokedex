"use client"; 
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

import Stats from "./../../entities/stats";

export default function StatsGraph({ stats } :{stats : Stats[] | []}) { 

  return (
    <RadarChart cx="50%" cy="50%" outerRadius={80} width={320} height={320} data={stats}>
      <PolarGrid />
      <PolarAngleAxis dataKey="statDecode" tick={{fontSize: '.9rem', fill: '#FFFFFF'}}/>
      <PolarRadiusAxis angle={30} domain={[0, 120]} tick={{fontSize: '.9rem', fill: '#FFFFFF'}} />
      <Radar name="Stats" dataKey="base_stat" stroke="#eef509" fill="#eef509" fillOpacity={0.7} />
      <Legend />
    </RadarChart>
  );

}