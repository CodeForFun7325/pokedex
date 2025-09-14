"use client";

// Components
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    TooltipProps
} from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

// Entities
import Stats from "../../entities/stats";

// CSS Styling
import "./statgraph.css";

export default function StatsGraph({ stats }: { stats: Stats[] | [] }) {
    /** Stage: Render a radar graph when given an array of stats */

    const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
        const isVisible = active && payload && payload.length;
        return (
            <div className="custom-tooltip" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
                {isVisible && (
                    <p className="label">{`${label} : ${payload[0].value}`}</p>
                )}
            </div>
        );
    };

    return (
        <div className="stats-container">
            <ResponsiveContainer width="100%" height="100%" >
                <BarChart data={stats} margin={{ top: 30, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="statDecode"
                        angle={-90}         // rotate labels
                        textAnchor="end"    // align text
                        interval={0}        // show all labels
                        dy={10}             // vertical offset
                        color="white"
                    />
                    <YAxis />
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey="base_stat" fill="#eef509" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

}