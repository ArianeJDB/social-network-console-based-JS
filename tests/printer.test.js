const { Printer } = require('../src/Printer')

const consolelogMock = jest.fn()

const printer = Printer.create({
  consolelog: consolelogMock,
})

test("Prints message and timestamp", () => {
    const messages = [{message: "message", timestamp: 123456789}]
    
    printer.print(messages)

    expect(consolelogMock).toHaveBeenCalledWith("message - 123456789")
})