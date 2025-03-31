const { Retriever } = require("../src/Retriever")

const messages = {}
const printer = { print: jest.fn() }
const retriever = Retriever.create({messages, printer})

test("Returns messages by user", () => {
    const user = "user"
    const message = "message"
    const timestamp = 1234567890
    putMessageByUser({user, message, timestamp})

    const result = retriever.get(user)

    expect(result).toMatchObject([{message, timestamp}])

})

test("Prints messages by user", () => {
    const user = "user"
    const message = "message"
    const timestamp = 1234567890
    putMessageByUser({user, message, timestamp})

    retriever.get(user)

    expect(printer.print).toHaveBeenCalledWith([{message, timestamp}])

})

function putMessageByUser({user, message, timestamp}) {
    return messages[user] = [{message, timestamp}]
}