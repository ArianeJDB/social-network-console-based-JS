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


test("returns both own and following messages", () => {
    const user = "user"
    const userFollowing = "userFollowing"
    const messagesFromUserFollowing = [
        {message: "message", timestamp: 123456789},
        {message: "another message", timestamp: 123456790}
    ]
    const ownMessages = [
        {message: "other message", timestamp: 123456789}
    ]
    when(followingRetriever.get)
        .calledWith(user)
        .mockReturnValue([userFollowing])
    when(retriever.get)
        .calledWith(user)
        .mockReturnValue(ownMessages)
    when(retriever.get)
        .calledWith(userFollowing)
        .mockReturnValue(messagesFromUserFollowing)

    const result = wall.process(user)

    const expectedMessages = [
        {message: "other message", timestamp: 123456789},
        {message: "message", timestamp: 123456789},
        {message: "another message", timestamp: 123456790}
    ]
    expect(result).toMatchObject(expectedMessages)

})