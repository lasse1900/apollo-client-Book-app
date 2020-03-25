import ApolloBoost, { gql } from 'apollo-boost'

// Questions:
// 1.	How to define an operation in JavaScript?
// 2.	How to send it off to the server to fetch response?
// 3.	How do we access the response?

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
})

// const client = new ApolloBoost({
//   uri: 'https://secret-ravine-62965.herokuapp.com/'
// })


const getUsers = gql`
  query {
      users {
          id
          name
      }
  }
`;

const getPosts = gql`
  query {
    posts {
      title
      author {
        name
      }
    }
  }
`;

client.query({
  query: getUsers
}).then((response) => {
  let html = ''

  response.data.users.forEach((user) => {
    html += `
      <div>
        <h3>${user.name}</h3>
      </div>
    `
  })
  document.getElementById('users').innerHTML = html
})

client.query({
  query: getPosts
}).then((response) => {
  let html = ''

  response.data.posts.forEach((post) => {
    html += `
    <div>
      <h3>${post.title} <i>written by:</i> ${post.author.name}</h3>
    </div>
    `
  })
  document.getElementById('posts').innerHTML = html
})