const { Wall } = require('../src/Wall')
const { when } =  require("jest-when")

const retriever = {
    get: jest.fn()
}

const followingRetriever = {
    get: jest.fn()
}

const wall = Wall.create({
    retriever,
    followingRetriever
})

xtest("returns own messages", () => {
    const user = "user"
    const messages = [
        {message: "message", timestamp: 123456789},
        {message: "another message", timestamp: 123456790}
    ]
    when(retriever.get)
    .calledWith(user)
    .mockReturnValue(messages)

    const result = wall.process(user)

    expect(result).toMatchObject(messages)

})

test("returns following messages", () => {
    const user = "user"
    const userFollowing = "userFollowing"
    const messagesFromUserFollowing = [
        {message: "message", timestamp: 123456789},
        {message: "another message", timestamp: 123456790}
    ]
    when(followingRetriever.get)
        .calledWith(user)
        .mockReturnValue([userFollowing])
    when(retriever.get)
        .calledWith(userFollowing)
        .mockReturnValue(messagesFromUserFollowing)

    const result = wall.process(user)

    expect(result).toMatchObject(messagesFromUserFollowing)

})