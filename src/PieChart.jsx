import { Pie, PieChart, ResponsiveContainer, Cell, Legend,Tooltip } from 'recharts';


function PieChartComp({positionData}){
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#775DD0', '#FEB019'];
    return(
        <div className="chartContainer" style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
            <PieChart>
                <Pie
                data={positionData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                >
                {positionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
                <Legend  content={() => <div>Position</div>}/>
            </PieChart>
        </ResponsiveContainer>
        </div>
    );
}

export default PieChartComp;
