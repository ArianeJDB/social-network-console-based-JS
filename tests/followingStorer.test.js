const {FollowingStorer} = require('../src/FollowingStorer');
const { when } =  require("jest-when")

const following = {}

const storer = FollowingStorer.create({ 
    following,
 })

test('Stores followed user', () => {
    const user = "user"
    const followedUser  = "followedUser"

    storer.store(user, followedUser)

    const expectedFollowingStored = following[user]
    expect(expectedFollowingStored).toMatchObject(["followedUser"])

})


test('Stores a new user to follow', () => {
    const userAlreadyStored = "user"
    const followedUserAlreadyStore  = "followedUser"
    const newFollowedUserToStore = "anotherFollowedUser"
    following[userAlreadyStored] = [followedUserAlreadyStore];

    storer.store(userAlreadyStored, newFollowedUserToStore)

    const expectedFollowingStored = following[userAlreadyStored]
    expect(expectedFollowingStored).toMatchObject([followedUserAlreadyStore, newFollowedUserToStore])
})