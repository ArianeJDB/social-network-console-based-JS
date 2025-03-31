const { when } =  require("jest-when")
const { Printer } = require('../src/Printer')

const consolelogMock = jest.fn()
const getCurrentTimestampMock = jest.fn();

const printer = Printer.create({
  consolelog: consolelogMock,
  getCurrentTimestamp: getCurrentTimestampMock
})

test("Prints message and how long ago was it posted", () => {
    const messages = [{message: "message", timestamp: 123456789}]
    const currentTimestamp = 123456789 + (5 * 60 * 1000);
    when(getCurrentTimestampMock)
    .calledWith()
    .mockReturnValue(currentTimestamp);
    
    printer.print(messages)

    expect(consolelogMock).toHaveBeenCalledWith("message (5 minutes ago)")
})