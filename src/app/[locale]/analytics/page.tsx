"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { fetchUserRepos } from "@/lib/github";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";

type MetricType = 'stars' | 'forks' | 'openIssues';

export default function AnalyticsPage() {
  const t = useTranslations('Analytics');
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('stars');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRepos([]);
    try {
      const data = await fetchUserRepos(username);
      setRepos(data);
    } catch (err: any) {
      setError(err.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  const getMetricValue = (repo: any, metric: MetricType) => {
    switch (metric) {
      case 'stars':
        return repo.stargazers_count;
      case 'forks':
        return repo.forks_count;
      case 'openIssues':
        return repo.open_issues_count;
      default:
        return 0;
    }
  };

  const chartData = repos
    .filter(repo => getMetricValue(repo, selectedMetric) > 0) // Filter out repos with 0 values
    .sort((a, b) => getMetricValue(b, selectedMetric) - getMetricValue(a, selectedMetric))
    .slice(0, 10) // Show top 10 repositories
    .map(repo => ({
      name: repo.name.length > 15 ? repo.name.substring(0, 15) + '...' : repo.name,
      fullName: repo.name,
      value: getMetricValue(repo, selectedMetric),
    }));

  const chartConfig: ChartConfig = {
    value: {
      label: t(`metrics.${selectedMetric}`),
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('description')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-3 mb-6">
              <Input
                placeholder={t('searchPlaceholder')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={loading} className="px-8">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t('loading')}
                  </>
                ) : (
                  t('searchButton')
                )}
              </Button>
            </form>

            {error && (
              <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-md border border-red-200">
                <strong>Error:</strong> {error}
              </div>
            )}

            {repos.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{t('selectMetric')}:</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        {t(`metrics.${selectedMetric}`)}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedMetric('stars')}>
                        {t('metrics.stars')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedMetric('forks')}>
                        {t('metrics.forks')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedMetric('openIssues')}>
                        {t('metrics.openIssues')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>{t(`chartTitle.${selectedMetric}`)}</CardTitle>
                    <CardDescription>
                      Top 10 repositories by {t(`metrics.${selectedMetric}`).toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {chartData.length > 0 ? (
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height={400}>
                          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                            <XAxis 
                              dataKey="name" 
                              tick={{ fontSize: 12 }}
                              angle={-45}
                              textAnchor="end"
                              height={80}
                              interval={0}
                            />
                            <YAxis />
                            <ChartTooltip 
                              content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col">
                                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                                            Repository
                                          </span>
                                          <span className="font-bold text-muted-foreground">
                                            {data.fullName}
                                          </span>
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                                            {t(`metrics.${selectedMetric}`)}
                                          </span>
                                          <span className="font-bold" style={{ color: chartConfig.value.color }}>
                                            {data.value}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Bar 
                              dataKey="value" 
                              fill="var(--color-value)"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        {t('noData')}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
