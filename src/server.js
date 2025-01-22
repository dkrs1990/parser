const mercury = require('@postlight/mercury-parser');
const express = require('express');
const app = express();

app.get('/parser', async (req, res) => {
  const { url } = req.query; // Získá URL z query stringu
  if (!url) {
    return res.status(400).send('URL is required'); // Vrátí chybu, pokud URL chybí
  }

  try {
    const result = await mercury.parse(url); // Zpracuje URL pomocí Mercury Parseru
    res.json(result); // Vrátí JSON obsah článku
  } catch (err) {
    res.status(500).send(err.message); // Vrátí chybu, pokud něco selže
  }
});

// Spuštění serveru (toto se použije jen při lokálním testování)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
