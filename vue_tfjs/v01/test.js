const app = require('express')
app().use('/', app.static('//dist'))
// app().get("/", (req, res) => {});
app().listen(3000, () => console.log('연결'))

// 왜 안 될까??
