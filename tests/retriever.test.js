const { Retriever } = require("../src/Retriever")

const messages = {}
const printer = { print: jest.fn() }
const retriever = Retriever.create({messages, printer})

beforeEach(() => {
    Object.keys(messages).forEach(key => delete messages[key]);
    jest.clearAllMocks();
});

test("Returns messages by user without printing when shouldPrint is false", () => {
    const user = "user"
    const message = "message"
    const timestamp = 1234567890
    putMessageByUser({user, message, timestamp})

    const result = retriever.get(user, false)

    expect(result).toMatchObject([{message, timestamp}])

})

test("Returns and prints one message by user when shouldPrint is true (default)", () => {
    const user = "user"
    const message = "message"
    const timestamp = 1234567890
    putMessageByUser({ user, message, timestamp })

    const result = retriever.get(user);

    expect(result).toMatchObject([{ message, timestamp }]);
    expect(printer.print).toHaveBeenCalledWith([{ message, timestamp }])
})

test("Returns and prints multiple messages by user when shouldPrint is true (default)", () => {
    const user = "user"
    const message = "message"
    const timestamp = 1234567890
    const anotherMessage = "anotherMessage"
    const anotherTimestamp = 1234567896
    putMessageByUser({user, message, timestamp})
    putMessageByUser({user, message: anotherMessage, timestamp: anotherTimestamp})


    const result = retriever.get(user)

    expect(result).toMatchObject([
        { message, timestamp },
        { message: anotherMessage, timestamp: anotherTimestamp }
    ]);
    expect(printer.print).toHaveBeenCalledWith(
        [
            {message, timestamp},
            {message: anotherMessage, timestamp: anotherTimestamp}
        ])

})

test("Does not print messages by user when user does not exist", () => {
    const user = "unkownUser"

    const result = retriever.get(user)

    expect(result).toMatchObject([]);
    expect(printer.print).not.toHaveBeenCalled()
})

function putMessageByUser({user, message, timestamp}) {
    if (!messages[user]) {
        messages[user] = [];
    }
    return messages[user].push({ message, timestamp })
}
