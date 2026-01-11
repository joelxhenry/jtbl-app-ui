import { TrendingUp, TrendingDown, Package } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function MarketIntelPage() {
  const exportData = [
    { month: "Jul", value: 45000 },
    { month: "Aug", value: 52000 },
    { month: "Sep", value: 48000 },
    { month: "Oct", value: 61000 },
    { month: "Nov", value: 58000 },
    { month: "Dec", value: 67000 },
  ];

  const categoryData = [
    { category: "Agriculture", exports: 35000, imports: 15000 },
    { category: "Manufacturing", exports: 28000, imports: 22000 },
    { category: "Minerals", exports: 42000, imports: 8000 },
    { category: "Services", exports: 18000, imports: 12000 },
  ];

  const stats = [
    {
      title: "Total Exports",
      value: "$67.2M",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Active Permits",
      value: "1,247",
      change: "+8.3%",
      trend: "up",
    },
    {
      title: "Trade Balance",
      value: "$23.4M",
      change: "-3.2%",
      trend: "down",
    },
    {
      title: "Top Commodity",
      value: "Bauxite",
      change: "+18.7%",
      trend: "up",
    },
  ];

  return (
    <div className="min-h-full bg-background">
      {/* Stats */}
      <div className="grid grid-cols-2 divide-x divide-y divide-border border-b border-border">
        {stats.map((stat) => (
          <div key={stat.title} className="px-4 py-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted-foreground">{stat.title}</p>
              <span
                className={`text-xs ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-lg font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Export Trend Chart */}
      <div className="px-4 py-6 border-b border-border">
        <p className="text-sm font-medium mb-4">Export Trend</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={exportData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
            <XAxis dataKey="month" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#030213"
              strokeWidth={2}
              dot={{ fill: "#030213", r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Comparison */}
      <div className="px-4 py-6 border-b border-border">
        <p className="text-sm font-medium mb-4">Trade by Category</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
            <XAxis dataKey="category" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Bar dataKey="exports" fill="#030213" name="Exports" />
            <Bar dataKey="imports" fill="#a1a1aa" name="Imports" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="px-4 py-6">
        <p className="text-sm font-medium mb-4">Insights</p>
        <div className="space-y-4">
          <div className="flex gap-3">
            <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Strong Export Growth</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Mining sector exports increased by 18.7% this month, driven by bauxite demand.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Package className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Processing Efficiency</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Average permit processing time reduced to 3.2 days from 4.5 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
