const { Wall } = require('../src/Wall')
const { when } =  require("jest-when")

const retriever = {
    get: jest.fn()
}

const wall = Wall.create({
    retriever
})

test("returns own messages", () => {
    const user = "user"
    const messages = [{message: "message", timestamp: "timestamp"}]
    when(retriever.get)
    .calledWith(user)
    .mockReturnValue(messages)

    const result = wall.process(user)

    expect(result).toMatchObject(messages)

})