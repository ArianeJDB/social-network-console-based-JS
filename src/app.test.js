const { App } = require("./app.js");
const { when } =  require("jest-when")

const readlineMock = {
    createInterface: jest.fn().mockReturnValue({
      question: jest.fn(),
      close: jest.fn()
    })
}

const consolelogMock = jest.fn();

const runner = App.create({readlineMock, consolelog: consolelogMock})


test('when input is "hola", console log prints same command (testing mocking console log and readline with jest-when', () => {
    when(readlineMock.createInterface().question).calledWith(">", expect.anything()).mockReturnValue("hola")
    
    runner.processCommand("hola")

    expect(consolelogMock).toHaveBeenCalledWith("hola")
})