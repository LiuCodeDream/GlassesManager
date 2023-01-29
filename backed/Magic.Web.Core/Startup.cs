using Furion;
using Furion.Schedule;
using Magic.Core;
using Magic.Core.Job;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Net;
using System.Net.Http;
using Yitter.IdGenerator;

namespace Magic.Web.Core;

[AppStartup(9)]
public class Startup : AppStartup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddBStyle(m => m.UseDefault());
        services.AddConfigurableOptions<ConnectionStringsOptions>();
        services.AddConfigurableOptions<JWTSettingsOptions>();
        services.AddConfigurableOptions<CacheOptions>();
        services.AddConfigurableOptions<SnowIdOptions>();
        services.AddConfigurableOptions<SystemSettingsOptions>();
        services.AddConfigurableOptions<UploadFileOptions>();
        services.AddConfigurableOptions<OAuthOptions>();

        #region 上传文件大小限制
        long maxRequestBodySize = Convert.ToInt64(App.Configuration["MaxRequestBodySize"]);
        services.Configure<KestrelServerOptions>(options =>
        {
            options.Limits.MaxRequestBodySize = maxRequestBodySize;
        });
        services.Configure<IISServerOptions>(options =>
        {
            options.MaxRequestBodySize = maxRequestBodySize;
        });

        services.Configure<FormOptions>(o =>
        {
            o.MultipartBodyLengthLimit = maxRequestBodySize;
        });
        #endregion

        services.AddResponseCompression();

        services.SqlSugarScopeConfigure();

        services.AddJwt<JwtHandler>(enableGlobalAuthorize: true);

        services.AddCorsAccessor();

        // 配置远程请求
        services.AddRemoteRequest(option =>
        {
            // 配置天气预报GZIP
            option.AddHttpClient("wthrcdn", c =>
            {
                c.BaseAddress = new Uri("http://wthrcdn.etouch.cn/");
            }).ConfigurePrimaryHttpMessageHandler(_ =>
                new HttpClientHandler { AutomaticDecompression = DecompressionMethods.GZip });
        });
        services.AddControllersWithViews()
                .AddMvcFilter<RequestActionFilter>()
                .AddInjectWithUnifyResult<RestfulResultProvider>()
                .AddNewtonsoftJson(options =>
                {
                    // 首字母小写(驼峰样式)
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    // 时间格式化
                    options.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm:ss";
                    // 忽略循环引用
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    // 忽略空值
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                });

        services.AddViewEngine();
        services.AddSignalR();

        // 设置雪花id的workerId，确保每个实例workerId都应不同
        var workerId = ushort.Parse(App.GetConfig<SnowIdOptions>("SnowId").WorkerId);
        YitIdHelper.SetIdGenerator(new IdGeneratorOptions { WorkerId = workerId });

        // 定时任务
        services.AddSchedule(options => {
            options.AddJob(App.EffectiveTypes.ScanToBuilders());
        });

        // 注册EventBus服务
        services.AddEventBus(builder =>
        {
            // 注册 Log 日志订阅者
            builder.AddSubscriber<LogEventSubscriber>();
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        // 添加状态码拦截中间件
        app.UseUnifyResultStatusCodes();

        app.UseHttpsRedirection(); // 强制https
        app.UseStaticFiles();

        app.UseScheduleUI();

        app.UseRouting();

        app.UseCorsAccessor();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseResponseCompression();

        app.UseInject(string.Empty);

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapHub<ChatHub>("/hubs/chathub");
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        });

    }


}
