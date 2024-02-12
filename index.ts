import fastify from 'fastify'
import axios, {isCancel, AxiosError} from 'axios';
const server = fastify({ logger: false })

server.get('/ping', function (request, reply) {
    reply.send({ error: false, ready: request.server !== null })
})

server.post('/api/webhooks/:webhook/:token', async (request, reply) => {
    const { webhook, token } = (request.params as any);
    const data = request.body
    const res = await axios.post('https://canary.discord.com/api/webhooks/' + webhook + '/' + token, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    reply.send(res.data + res.status)
})

server.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
    console.log("Ready!")
    if (err) {
      server.log.error(err)
    }
  })