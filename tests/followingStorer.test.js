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

