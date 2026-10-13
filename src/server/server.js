/**
 * @author Hanna Mårtensson <hm223dq@lnu.student.se>
 * @version 1.0.0
 */

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'client')))

app.get('/', (req, res) => {
  res.send('Hello from the Express server')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
