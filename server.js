import e from "express";

const app = e();
const port = 3000;

app.get('/api/fun-fact', async (req, res) => {
  // res.send('hello')
  const url = 'https://uselessfacts.jsph.pl/api/v2/facts/random';

  try {
    const apiResponse = await fetch(url);
    if (apiResponse.status === 404) {
      return res.status(404).json({ message: 'fun fact was not found' });
    }

    if (!apiResponse.ok) {
      throw new Error(`External API returned status ${apiResponse.status}`)
    }

    const funFact = await apiResponse.json();

    res.json({ fact: funFact.text });
  } catch (error) {
    console.error('Error fetching fun facts:', error);
    res.status(500).json({ message: 'Failed to fetch data from the external API.' });
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})