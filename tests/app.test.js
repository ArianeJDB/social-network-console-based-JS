const { App } = require("../src/app.js");
const { when } =  require("jest-when")

const readlineMock = {
    createInterface: jest.fn().mockReturnValue({
      question: jest.fn(),
      close: jest.fn()
    })
}
 
const consolelogMock = jest.fn()
const storer = { store: jest.fn() }
const getCurrentTimestampMock = jest.fn();

const runner = App.create({
  readlineMock,
  consolelog: consolelogMock,
  storer,
  getCurrentTimestamp: getCurrentTimestampMock
})

beforeEach(() => {
  jest.clearAllMocks()
})

test('Stores message posted with timestamp when command is in correct format', () => {
  const command = "user -> message"
  const timestamp = 1234567890
    when(readlineMock.createInterface().question)
    .calledWith(">", expect.anything())
    .mockReturnValue(command)
    when(getCurrentTimestampMock)
    .calledWith()
    .mockReturnValue(timestamp);

    runner.processCommand(command)

    expect(storer.store).toHaveBeenCalledWith(command, timestamp)

})

test.each([
  ["without arrow", "user message"],
  ["without user before the arrow", "-> message"],
  ["without message after the arrow", "user ->"]
])('Does not store message when command is %s', (_, command) => {
    when(readlineMock.createInterface().question)
    .calledWith(">", expect.anything())
    .mockReturnValue(command)
    
    runner.processCommand(command)

    expect(storer.store).not.toHaveBeenCalled()

})