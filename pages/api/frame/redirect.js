export default async function handler(req, res) {
    const { t, p, c } = req.query;
    
    // Verify the token
    if (!t || !p || !c) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }
  
    try {
      // Decode token and verify timestamp
      const [timestamp] = atob(t).split(':');
      if (Date.now() - parseInt(timestamp) > 5 * 60 * 1000) { // 5 minutes expiry
        return res.status(400).json({ error: 'Token expired' });
      }
  
      // Construct the actual URL based on platform
      const baseUrl = p === 'muses' 
        ? 'https://muses.apollobyzeus.app'
        : 'https://app.zeusguardian.io';
      
      const finalUrl = `${baseUrl}?inputCurrency=ZEUS&creator=${c}`;
  
      // Add security headers
      res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
      res.setHeader('X-Frame-Options', 'DENY');
      
      // Redirect to the final URL
      res.redirect(302, finalUrl);
    } catch (error) {
      console.error('Redirect error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }