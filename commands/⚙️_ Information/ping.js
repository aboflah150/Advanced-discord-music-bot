module.exports = {
    name: "ping",
    description: "Returns ping",
    run: async (client, message, args) => {
       message.channel.send(` ${client.ws.ping}ms`)
    }
}
