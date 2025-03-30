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

const runner = App.create({
  readlineMock,
  consolelog: consolelogMock,
  storer
})


test('Stores message posted', () => {
  const command = "user -> message"
    when(readlineMock.createInterface().question)
    .calledWith(">", expect.anything())
    .mockReturnValue(command)
    
    runner.processCommand(command)

    expect(storer.store).toHaveBeenCalledWith(command)

})