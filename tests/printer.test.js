const { when } =  require("jest-when")
const { Printer } = require('../src/Printer')

const consolelogMock = jest.fn()
const getCurrentTimestampMock = jest.fn();

const printer = Printer.create({
  consolelog: consolelogMock,
  getCurrentTimestamp: getCurrentTimestampMock
})

test.each([
  ["when it is more than 1 minute", 5, " minutes ago"],
  ["when it is 1 minute", 1, " minute ago"],
  ["when it is less than minute", '', "less than a minute ago"]
])("Prints message and how long ago was it posted when it is %s", (_, minutes, text) => {
    const messages = [{message: "message", timestamp: 123456789}]
    const currentTimestamp = 123456789 + (minutes * 60 * 1000);
    when(getCurrentTimestampMock)
    .calledWith()
    .mockReturnValue(currentTimestamp);
    
    printer.print(messages)

    expect(consolelogMock).toHaveBeenCalledWith(`message (${minutes}${text})`)
})

