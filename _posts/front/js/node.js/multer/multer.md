https://github.com/expressjs/multer/blob/master/doc/README-ko.md

```js
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "files/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single("userfile");

router.post(
  "/",
  upload(req, res, err => {
    if (err) {
      return console.log(err);
    } else {
      return console.log("업로드 성공");
    }
  }),
  (req, res) => {
    const { username } = req.body;
    console.log(username);
  }
);
```
