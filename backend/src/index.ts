import app from './app'

const port = process.env.PORT ? Number(process.env.PORT) : 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
