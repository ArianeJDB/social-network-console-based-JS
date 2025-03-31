const { Storer } = require('../src/Storer')
const { when } =  require("jest-when")

const messages = {}
const getCurrentTimestampMock = jest.fn();

const storer = Storer.create({ 
    messages,
    getCurrentTimestamp: getCurrentTimestampMock
 })

test('Stores message', () => {
    const user = "user"
    const message = "message"
    const timestamp = 1234567890

    when(getCurrentTimestampMock)
    .calledWith()
    .mockReturnValue(timestamp);

    storer.store({user, message, timestamp})

    const expectedMessageStored = messages["user"]
    expect(expectedMessageStored).toMatchObject([{message: "message", timestamp}])

})



test('Stores a new message', () => {
    const user = "user"
    const messageAlreadyStored = "message"
    const timestampAlreadyStored = 1234567890
    const newMessage = "another message"
    const newTimestamp = 1234567896
    messages[user] = [
        { message: messageAlreadyStored,
            timestamp: timestampAlreadyStored
        }];
    when(getCurrentTimestampMock)
    .calledWith()
    .mockReturnValue(newTimestamp);

    storer.store({user, message: newMessage, timestamp: newTimestamp})

    const expectedMessageStored = messages["user"]
    expect(expectedMessageStored).toMatchObject([
        {message: messageAlreadyStored, timestamp: timestampAlreadyStored},
        {message: newMessage, timestamp: newTimestamp}
    ])
})
