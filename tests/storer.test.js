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