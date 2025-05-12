"use client"; 
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, BarChart, XAxis, YAxis, Tooltip, Bar, CartesianGrid } from "recharts";
import Stats from "./../../entities/stats";

export default function StatsGraph({ stats } :{stats : Stats[] | []}) { 
  if (stats.length == 0)
    return (
      <></>
    );

  return (
    <RadarChart outerRadius={90} width={500} height={300} data={stats}>
      <PolarGrid />
      <PolarAngleAxis dataKey="stat" />
      <PolarRadiusAxis angle={30} domain={[0, 150]} />
      <Radar name="Stats" dataKey="base_stat" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Legend />
    </RadarChart>
  );

}