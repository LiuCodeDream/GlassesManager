using Furion;
using Furion.DependencyInjection;
using Furion.Schedule;
using Magic.Core.Entity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Magic.Core.Job;

[JobDetail("DeleteExLogJob",true,Description = "删除异常日志",GroupName ="分组一")]
[PeriodSeconds(3, TriggerId = "trigger1")]
public class DeleteExLogJob : IJob
{
    public Task ExecuteAsync(JobExecutingContext context, CancellationToken stoppingToken)
    {
        Console.WriteLine($"{DateTime.Now} 执行删除异常日志");

        Scoped.Create((_, scope) =>
        {
            var services = scope.ServiceProvider;
            var logRep = App.GetService<SqlSugarRepository<SysLogEx>>(services);
            logRep.DeleteAsync(m => m.ExceptionTime < DateTime.Now.AddDays(-7));
        });

        return Task.CompletedTask;
    }
}

[JobDetail("DeleteVisLogJob", true, Description = "删除访问日志", GroupName = "分组一")]
[PeriodSeconds(5, TriggerId = "trigger2")]
public class DeleteVisLogJob : IJob
{
    public Task ExecuteAsync(JobExecutingContext context, CancellationToken stoppingToken)
    {
        Console.WriteLine($"{DateTime.Now} 执行删除访问日志");

        Scoped.Create((_, scope) =>
        {
            var services = scope.ServiceProvider;
            var logRep = App.GetService<SqlSugarRepository<SysLogVis>>(services);
            logRep.DeleteAsync(m => m.VisTime < DateTime.Now.AddDays(-7));
        });

        return Task.CompletedTask;
    }
}

[JobDetail("DeleteOpLogJob", true, Description = "删除操作日志", GroupName = "分组一")]
[PeriodSeconds(10, TriggerId = "trigger3")]
public class DeleteOpLogJob : IJob
{
    public Task ExecuteAsync(JobExecutingContext context, CancellationToken stoppingToken)
    {
        Console.WriteLine($"{DateTime.Now} 执行删除操作日志");

        Scoped.Create((_, scope) =>
        {
            var services = scope.ServiceProvider;
            var logRep = App.GetService<SqlSugarRepository<SysLogOp>>(services);
            logRep.DeleteAsync(m => m.OpTime < DateTime.Now.AddDays(-7));
        });

        return Task.CompletedTask;
    }
}
