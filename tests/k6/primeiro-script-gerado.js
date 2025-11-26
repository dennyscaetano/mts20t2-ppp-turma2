import http from 'k6/http'
import { check, sleep } from 'k6'
import { expect } from 'https://jslib.k6.io/k6-testing/0.5.0/index.js'

export const options = {
  vus: 10,
  duration: '10s', // Não é recomendado usar duration e iterations juntos
  // iterations: 50 // Não é recomendado usar duration e iterations juntos
}

export default function () {
  // Script de teste
  let res = http.get('https://quickpizza.grafana.com')
  check(res, {
    'status is 200': (r) => r.status === 200,
    'status text is 200 OK': (r) => r.status_text === '200 OK',
  })

  expect.soft(res.status).toBe(200)
  expect.soft(res.status_text).toBe('200 OK')
  sleep(1) // Espera por 1 segundo antes da próxima iteração
}
