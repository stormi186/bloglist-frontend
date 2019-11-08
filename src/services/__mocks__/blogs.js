let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const blogs = [
  {
    id: '5dc15807bba044adf4ac94ba',
    title: 'Programming is fun',
    author: 'Me',
    url: 'fullstackopen.com',
    likes: 100,
    date: '2019-06-11T16:38:57.694Z',
    user: {
      _id: '5d97906e9d596370390f5562',
      username: 'username1',
      name: 'Jasna Misimovic'
    }
  },
  {
    id: '5dc15807bba044adf4ac93ba',
    title: 'But it takes time to learn',
    author: 'Him',
    url: 'fullstackopen.com',
    likes: 10,
    date: '2019-06-11T16:38:57.694Z',
    user: {
      _id: '5d989d648450c5b7ea2e7333',
      username: 'username2',
      name: 'Amel Misimovic'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { setToken, getAll }