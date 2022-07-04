const siteUrl = "https://shutosuganuma.dev";

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [`${siteUrl}/server-sitemap.xml`]
    }
}