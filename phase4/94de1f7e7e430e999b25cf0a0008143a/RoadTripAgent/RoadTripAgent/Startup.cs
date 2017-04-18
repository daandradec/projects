using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(RoadTripAgent.Startup))]
namespace RoadTripAgent
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
