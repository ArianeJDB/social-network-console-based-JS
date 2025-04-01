const { Wall } = require('../src/Wall')
const { when } =  require("jest-when")

const retriever = {
    get: jest.fn()
}

const followingRetriever = {
    get: jest.fn()
}

const printer = {
    print: jest.fn()
}

const wall = Wall.create({
    retriever,
    followingRetriever,
    printer
})


test("Prints and return both own and following messages in descending order by timestamp", () => {
    const user = "user"
    const userFollowing = "userFollowing"
    const anotherUserFollowing = "anotherUserFollowing"
    const lastTimestamp = 1743485204
    const thirdTimestamp = 1743398804
    const secondTimestamp = 1743312404
    const firstTimestamp = 1743229604
    const messagesFromUserFollowing = [
        {message: "message", timestamp: secondTimestamp},
        {message: "another message", timestamp: lastTimestamp}
    ]
    const ownMessages = [
        {message: "other message", timestamp: firstTimestamp}
    ]
    const messagesFromAnotherUserFollowing = [
        {message: "yet other message", timestamp: thirdTimestamp}
    ]
    when(followingRetriever.get)
        .calledWith(user)
        .mockReturnValue([userFollowing, anotherUserFollowing])
    when(retriever.get)
        .calledWith(user, false)
        .mockReturnValue(ownMessages)
    when(retriever.get)
        .calledWith(userFollowing, false)
        .mockReturnValue(messagesFromUserFollowing)
    when(retriever.get)
        .calledWith(anotherUserFollowing, false)
        .mockReturnValue(messagesFromAnotherUserFollowing)

    const result = wall.process(user)

    const expectedMessages = [
        { message: "another message", timestamp: lastTimestamp },
        { message: "yet other message", timestamp: thirdTimestamp },
        { message: "message", timestamp: secondTimestamp },
        { message: "other message", timestamp: firstTimestamp }
    ]
    expect(result).toMatchObject(expectedMessages)
    expect(printer.print).toHaveBeenCalledWith(expectedMessages)

})