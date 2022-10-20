import { Card } from 'antd'
import { useValues } from 'kea'
import { humanFriendlyDuration } from 'lib/utils'
import { AppMetricsGraph } from './AppMetricsGraph'
import { AppMetricsTab } from './appMetricsSceneLogic'
import { historicalExportLogic, HistoricalExportLogicProps } from './historicalExportLogic'
import { ErrorsOverview, MetricsOverview } from './MetricsTab'

export function HistoricalExport(props: HistoricalExportLogicProps): JSX.Element {
    const { data, dataLoading } = useValues(historicalExportLogic(props))

    return (
        <div className="mt-4 mb-4 mr-8">
            <Card title="Overview">
                {data && data.summary.duration ? (
                    <div>
                        <div className="card-secondary">Export duration</div>
                        <div>{humanFriendlyDuration(data.summary.duration)}</div>
                    </div>
                ) : null}
                <MetricsOverview
                    tab={AppMetricsTab.HistoricalExports}
                    metrics={data?.metrics ?? null}
                    metricsLoading={dataLoading}
                />
                {data && data.summary.failure_reason ? (
                    <div>
                        <div className="card-secondary">Failure reason</div>
                        <div>{data.summary.failure_reason}</div>
                    </div>
                ) : null}
            </Card>

            <Card title="Delivery trends" className="mt-4">
                <AppMetricsGraph
                    tab={AppMetricsTab.HistoricalExports}
                    metrics={data?.metrics ?? null}
                    metricsLoading={dataLoading}
                />
            </Card>

            <Card title="Errors" className="mt-4">
                <ErrorsOverview
                    errors={data?.errors || []}
                    loading={dataLoading}
                    category="exportEvents"
                    jobId={data?.summary?.job_id}
                />
            </Card>
        </div>
    )
}