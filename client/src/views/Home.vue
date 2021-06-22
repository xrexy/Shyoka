<template>
  <div id="home" class="container pt-6">
    <div class="center intro pb-4">
      <h1 id="title">Shyoka</h1>
      <p>A project by 17330</p>
    </div>

    <div class="pt-6">
      <h1 class="center">"Documentation"</h1>
      <br /><br />

      <div class="features">
        <h2>Features</h2>
        <div class="pl-6 pt-1">
          <ul class="directory-list">
            <li>
              <span>User Management</span>
              <ul>
                <li>Login, Register and Logout buttons</li>
                <li>
                  Two types of users
                  <ul>
                    <li>Student</li>
                    <li>Warden</li>
                  </ul>
                </li>
                <li>
                  Per user profiles
                  <ul>
                    <li>All their comments</li>
                    <li>First and most recent login</li>
                    <li>Some public user information</li>
                  </ul>
                </li>
                <li>Settings</li>
              </ul>
            </li>
            <li>
              <span>School Management</span>
              <ul>
                <li>* Only wardens can create schools</li>
                <li>
                  Per school pages
                  <ul>
                    <li>* Information either loaded by query or parameters</li>
                    <li>A school can only be deleted by the warden that created it</li>
                    <li>All public comments</li>
                    <li>School rating</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <span>Miscellaneous</span>
              <ul>
                <li>
                  Comments
                  <ul>
                    <li>Can be deleted by the user that posted them</li>
                    <li>Can be deleted by the warden that created the school</li>
                  </ul>
                </li>
              </ul>
              <ul>
                <li>
                  School rating
                  <ul>
                    <li>Average rating: total / times rated</li>
                    <li>Students can rate from 0-10 with a star rating component</li>
                    <li>Students can rate only once</li>
                    <li>Wardens cannot rate schools</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="start pt-6">
        <h2>How to start</h2>
        <div class="pl-6">
          <ol>
            <li>
              Clone project from
              <a href="https://github.com/xrexy/Shyoka/" target="_blank">GitHub</a>
            </li>
            <li>Navigate to client directory</li>
            <li>Execute 'npm run serve' to run the server at port :8080</li>
            <li>
              To browse go to https://localhost:8080 .. or
              <a href="https://localhost:8080" target="_blank">click here</a>
            </li>
            <li>Create an account from the register page</li>
          </ol>
        </div>
      </div>
    </div>

    <div class="info pt-6">
      <h2>Some information</h2>
      <div class="pl-6 pb-6">
        <ul style="font-size: 115%; list-style: initial;">
          <li><span>Started at: </span>Monday, June 14th 2021</li>
          <li><span>Total hours on project: </span>34 hrs 9 mins</li>
          <li><span>Daily average: </span>4 hrs 32 mins</li>
          <br>
          <li>23 files, 1996 codes, 11 comments, 241 blanks, 2248 lines total</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#home {
  height: 100vh;
  min-height: 100%;
}

#title {
  font-size: 280%;
}

.center {
  text-align: center;
}

h1 {
  font-weight: bold;
  font-size: 230%;
  text-transform: uppercase;
}

h2 {
  font-weight: bold;
  font-size: 200%;
  text-transform: uppercase;
}

.intro p {
  text-transform: uppercase;
  font-size: 150%;
  letter-spacing: 7px;
}

ul span {
  font-weight: bold;
}

ol {
  font-size: 115%;
}

.directory-list {
  font-size: 115%;
}

.directory-list ul {
  padding-left: 20px;
  border-left: 1px dashed #ddd;
}

.directory-list li {
  list-style: none;
  font-style: italic;
  font-weight: normal;
  padding: 1px 0;
}
</style>
