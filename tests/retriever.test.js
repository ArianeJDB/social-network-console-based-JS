const { Retriever } = require("../src/Retriever")

const messages = {}
const printer = { print: jest.fn() }
const retriever = Retriever.create({messages, printer})

beforeEach(() => {
    Object.keys(messages).forEach(key => delete messages[key]);
    jest.clearAllMocks();
});

test("Returns messages by user", () => {
    const user = "user"
    const message = "message"
    const timestamp = 1234567890
    putMessageByUser({user, message, timestamp})

    const result = retriever.get(user)

    expect(result).toMatchObject([{message, timestamp}])

})

test("Prints one message by user", () => {
    const user = "user"
    const message = "message"
    const timestamp = 1234567890
    putMessageByUser({user, message, timestamp})

    retriever.get(user)

    expect(printer.print).toHaveBeenCalledWith([{message, timestamp}])

})

test("Does not print messages by user when user does not exist", () => {
    const user = "unkownUser"

    retriever.get(user)

    expect(printer.print).not.toHaveBeenCalled()

})

function putMessageByUser({user, message, timestamp}) {
    return messages[user] = [{message, timestamp}]
}