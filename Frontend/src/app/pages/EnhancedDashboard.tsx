/**
 * Enhanced Dashboard Component
 * 
 * Angular Material Mapping:
 * - MatCard: <mat-card> for card containers
 * - MatGridList: <mat-grid-list> for grid layouts
 * - MatProgressBar: <mat-progress-bar> for progress indicators
 * - MatTable: <mat-table> for data tables
 * - MatIcon: <mat-icon> for icons
 * - Charts: Use ng2-charts or ngx-charts library
 */

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../lib/auth-context';
import { getTaskStats, getTasks } from '../lib/tasks';
import { 
  CheckCircle2, 
  Clock, 
  ListTodo, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Users,
  Target,
  AlertCircle,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { format } from 'date-fns';

export function EnhancedDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [recentTasks, setRecentTasks] = useState<any[]>([]);

  useEffect(() => {
    const taskStats = getTaskStats(user?.id, user?.role);
    setStats(taskStats);
    
    const tasks = getTasks(user?.id, user?.role);
    setRecentTasks(tasks.slice(0, 5));
  }, [user]);

  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
  const productivityScore = Math.min(100, Math.round(completionRate * 1.2 + 20));

  // Chart Data
  const statusDistribution = [
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
    { name: 'In Progress', value: stats.inProgress, color: '#3b82f6' },
    { name: 'Completed', value: stats.completed, color: '#10b981' },
  ];

  const weeklyTrend = [
    { day: 'Mon', completed: 12, created: 15, productivity: 80 },
    { day: 'Tue', completed: 19, created: 20, productivity: 95 },
    { day: 'Wed', completed: 15, created: 18, productivity: 83 },
    { day: 'Thu', completed: 25, created: 22, productivity: 113 },
    { day: 'Fri', completed: 22, created: 25, productivity: 88 },
    { day: 'Sat', completed: 8, created: 10, productivity: 80 },
    { day: 'Sun', completed: 5, created: 8, productivity: 62 },
  ];

  const performanceMetrics = [
    { metric: 'Completion Rate', value: completionRate, fullMark: 100 },
    { metric: 'Response Time', value: 85, fullMark: 100 },
    { metric: 'Quality', value: 92, fullMark: 100 },
    { metric: 'Efficiency', value: 78, fullMark: 100 },
    { metric: 'Collaboration', value: 88, fullMark: 100 },
  ];

  const monthlyProgress = [
    { month: 'Jan', tasks: 65 },
    { month: 'Feb', tasks: 78 },
    { month: 'Mar', tasks: 90 },
    { month: 'Apr', tasks: 81 },
    { month: 'May', tasks: 95 },
    { month: 'Jun', tasks: 105 },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'border-orange-200 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
      'in-progress': 'bg-blue-600 text-white dark:bg-blue-700',
      completed: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
    };
    return variants[status] || variants.pending;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white dark:from-indigo-600 dark:to-purple-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              Welcome back, {user?.name}! 👋
            </h2>
            <p className="mt-2 text-indigo-100">
              Here's your productivity overview for today
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.total}</div>
              <div className="text-sm text-indigo-100">Total Tasks</div>
            </div>
            <div className="h-12 w-px bg-indigo-400" />
            <div className="text-center">
              <div className="text-3xl font-bold">{productivityScore}%</div>
              <div className="text-sm text-indigo-100">Productivity</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-indigo-500 dark:bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tasks
            </CardTitle>
            <ListTodo className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{stats.total}</div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-600 dark:text-green-400">+12.5%</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 dark:bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
            <Clock className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-orange-600 dark:text-orange-400">{stats.pending}</div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <AlertCircle className="h-3 w-3 text-orange-500" />
              <span className="text-muted-foreground">Needs attention</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 dark:bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
            <Activity className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-blue-600 dark:text-blue-400">{stats.inProgress}</div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-blue-500" />
              <span className="text-muted-foreground">Active work</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 dark:bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600 dark:text-green-400">{stats.completed}</div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <Target className="h-3 w-3 text-green-500" />
              <span className="text-green-600 dark:text-green-400">{completionRate.toFixed(0)}%</span>
              <span className="text-muted-foreground">completion rate</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity Chart */}
        <Card className="dark:bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Tasks completed vs created</CardDescription>
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="stroke-border" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="currentColor" className="stroke-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="stroke-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--card-foreground))'
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill="#10b981" radius={[8, 8, 0, 0]} name="Completed" />
                <Bar dataKey="created" fill="#6366f1" radius={[8, 8, 0, 0]} name="Created" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Distribution */}
        <Card className="dark:bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Task Distribution</CardTitle>
                <CardDescription>Status breakdown</CardDescription>
              </div>
              <PieChartIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            {stats.total > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--card-foreground))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No tasks to display
              </div>
            )}
          </CardContent>
        </Card>

        {/* Productivity Trend */}
        <Card className="dark:bg-card">
          <CardHeader>
            <CardTitle>Productivity Trend</CardTitle>
            <CardDescription>Daily productivity percentage</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrend}>
                <defs>
                  <linearGradient id="colorProductivity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="stroke-border" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="currentColor" className="stroke-muted-foreground" />
                <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="stroke-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--card-foreground))'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="productivity" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorProductivity)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics Radar */}
        <Card className="dark:bg-card">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Multi-dimensional analysis</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={performanceMetrics}>
                <PolarGrid stroke="currentColor" className="stroke-border" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fontSize: 11, fill: 'currentColor' }}
                  className="fill-muted-foreground"
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Radar 
                  name="Performance" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  fill="#6366f1" 
                  fillOpacity={0.6} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--card-foreground))'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Progress & Recent Tasks */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Overall Progress */}
        <Card className="dark:bg-card">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Your performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  {completionRate.toFixed(1)}%
                </span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Productivity Score</span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {productivityScore}%
                </span>
              </div>
              <Progress value={productivityScore} className="h-2" />
            </div>

            <div className="grid gap-4 pt-4 border-t dark:border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm">Tasks Completed</span>
                </div>
                <span className="font-semibold">{stats.completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm">In Progress</span>
                </div>
                <span className="font-semibold">{stats.inProgress}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-sm">Pending</span>
                </div>
                <span className="font-semibold">{stats.pending}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card className="dark:bg-card">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your latest activities</CardDescription>
          </CardHeader>
          <CardContent>
            {recentTasks.length > 0 ? (
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 pb-4 border-b dark:border-border last:border-0 last:pb-0">
                    <div className="mt-1">
                      <div className={`h-2 w-2 rounded-full ${
                        task.status === 'completed' ? 'bg-green-500' :
                        task.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-orange-500'
                      }`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm">{task.title}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusBadge(task.status)}>
                          {task.status === 'in-progress' ? 'In Progress' : 
                           task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(task.createdAt), 'MMM d')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <ListTodo className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No recent tasks</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="dark:bg-card">
        <CardHeader>
          <CardTitle>6-Month Trend</CardTitle>
          <CardDescription>Task completion over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="stroke-border" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="currentColor" className="stroke-muted-foreground" />
              <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="stroke-muted-foreground" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--card-foreground))'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="tasks" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: '#6366f1', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
