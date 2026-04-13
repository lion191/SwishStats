import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import{ResponsiveContainer } from 'recharts';
import './App.css';

// #region Sample data


// #endregion
const SimpleBarChart = ({ data }) => {
  return (
    <div className="chartContainer" style={{ width: '100%', height: '400px' }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis width="auto" />
          <Tooltip />
          <Legend content={() => <div>Height</div>} />
          <Bar dataKey="count" fill="#82ca9d" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;