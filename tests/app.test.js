const { App } = require("../src/App.js")
const { when } =  require("jest-when")

const readlineMock = {
    createInterface: jest.fn().mockReturnValue({
      question: jest.fn(),
      close: jest.fn()
    })
}
 
const storer = {
  store: jest.fn()
}

const retriever = {
  get: jest.fn()
}

const consolelogMock = jest.fn()
const getCurrentTimestampMock = jest.fn();

const runner = App.create({
  readlineMock,
  consolelog: consolelogMock,
  storer,
  retriever,
  getCurrentTimestamp: getCurrentTimestampMock
})

beforeEach(() => {
  jest.clearAllMocks()
})

test('Stores user, message and timestamp when command is in correct format', () => {
  const command = "user -> message"
  const timestamp = 1234567890
  when(readlineMock.createInterface().question)
    .calledWith(">", expect.anything())
    .mockReturnValue(command)
  when(getCurrentTimestampMock)
    .calledWith()
    .mockReturnValue(timestamp);

    runner.processCommand(command)

    expectedPost = {
      user: "user",
      message: "message",
      timestamp
    }
    expect(storer.store).toHaveBeenCalledWith(expectedPost)

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

test("Retrieves messages by user when command is only one word (user)", () => {
  const user = "user"
  when(readlineMock.createInterface().question)
    .calledWith(">", expect.anything())
    .mockReturnValue(user)

    runner.processCommand(user)

    expect(storer.store).not.toHaveBeenCalled()
    expect(retriever.get).toHaveBeenCalledWith(user)
})