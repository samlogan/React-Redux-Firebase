import { trackingID } from '../../../config/app';
import assets from '../../../public/assets/manifest.json';

const createAppScript = () => `<script async type="text/javascript" charset="utf-8" src="${assets['app.js']}"></script>`;

const createTrackingScript = () => trackingID ? createAnalyticsSnippet(trackingID) : '';

const createAnalyticsSnippet = id =>
  `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
`;

const createStylesheets = () => `<link rel="stylesheet" href="${assets['app.css']}" />`;

export { createAppScript, createTrackingScript, createStylesheets };
