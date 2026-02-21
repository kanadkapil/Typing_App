import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface StatsGraphProps {
    data: Array<{
        time: number;
        wpm: number;
        rawWpm: number;
        accuracy: number;
    }>;
}

export const StatsGraph = ({ data }: StatsGraphProps) => {
    // Custom Tooltip component
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background border border-sub/30 p-3 rounded-lg font-mono text-sm shadow-xl">
                    <p className="text-sub mb-1">{`second: ${label}`}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }} className="flex justify-between gap-4">
                            <span>{entry.name}:</span>
                            <span className="font-bold">{Math.round(entry.value)}</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-64 mt-8">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#646669" vertical={false} opacity={0.1} />
                    <XAxis
                        dataKey="time"
                        stroke="#646669"
                        tick={{ fill: '#646669', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        label={{ value: 'time', position: 'insideBottomRight', offset: -5, fill: '#646669', fontSize: 12 }}
                    />
                    <YAxis
                        yAxisId="left"
                        stroke="#646669"
                        tick={{ fill: '#646669', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#646669"
                        tick={{ fill: '#646669', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#646669', strokeWidth: 1 }} />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="wpm"
                        name="wpm"
                        stroke="var(--main)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4, stroke: 'var(--main)', strokeWidth: 2, fill: 'var(--background)' }}
                    />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="rawWpm"
                        name="raw"
                        stroke="var(--sub)"
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="5 5"
                        activeDot={{ r: 4, stroke: 'var(--sub)', strokeWidth: 2, fill: 'var(--background)' }}
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="accuracy"
                        name="acc"
                        stroke="var(--text)"
                        strokeWidth={1}
                        dot={false}
                        opacity={0.5}
                        activeDot={{ r: 4, stroke: 'var(--text)', strokeWidth: 2, fill: 'var(--background)' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
