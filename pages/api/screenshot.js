// export default function handler(req, res) {
//     res.status(200).json({ name: 'Upload' })
// }

import screenshotmachine from 'screenshotmachine';

export default async (req, res) => {
  const { url } = req.query; // Get the URL from the query parameters


  var customerKey = '46a455';
  var secretPhrase = '';
  var options = {
    url,
    // dimension : '1366xfull',
    dimension : '1024x768',
    device : 'desktop',
    format: 'png',
    cacheLimit: '0',
    delay: '200',
    zoom: '100'
  }

  var apiUrl = screenshotmachine.generateScreenshotApiUrl(customerKey, secretPhrase, options);

  try {
    const screenshot = await screenshotmachine.readScreenshot(apiUrl);
    res.setHeader('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
