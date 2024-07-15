import bcrypt from 'bcrypt';

const saltRounds = 10;
const plainPassword = 'bakihanma';

// Hash the password
bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed password:', hash);

        // Compare the hashed password with the plaintext password
        bcrypt.compare(plainPassword, hash, (err, result) => {
            if (err) {
                console.error('Error comparing password:', err);
            } else {
                console.log('Password match:', result);
            }
        });
    }
});
