const { Retriever } = require("../src/Retriever")

const messages = {}
const retriever = Retriever.create({ messages })

test("Returns messages by user", () => {
    const user = "user"
    const message = "message"
    const timestamp = 1234567890
    messages[user] = [{message, timestamp}]

    const result = retriever.get(user)

    expect(result).toMatchObject([{message, timestamp}])

})