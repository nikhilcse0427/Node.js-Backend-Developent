import argon2 from 'argon2';

const hash = '$argon2id$v=19$m=65536,t=3,p=4$p6rxv+vPsOVAUZnY0e7bjw$PP61ZUZZjQ1l41QmBUBcx6RJ+U+7SCdIj2fBa7TcrAk';
const password = 'John@1234';

const result = await argon2.verify(hash, password);
console.log("Result:", result);