const { FollowingRetriever } = require('../src/FollowingRetriever')

const following = {}
const printer = { print: jest.fn() }
const retriever = FollowingRetriever.create({
    printer,
    following
})

beforeEach(() => {
    Object.keys(following).forEach(key => delete following[key]);
    jest.clearAllMocks();
});

test("Returns followings by user", () => {
    const user = "user"
    const usersFollowing = ["anotherUser", "otherUser"]
    putFollowingByUser(user, usersFollowing)

    const result = retriever.get(user)

    expect(result).toMatchObject(usersFollowing)
})

function putFollowingByUser(user, usersFollowing) {
    if (!following[user]) {
        following[user] = [];
    }
    following[user].push(...usersFollowing)
}