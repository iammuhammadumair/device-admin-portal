import bcrypt from 'bcrypt';

const encrypt = async  function(password) {
    try {
        const hash = await  bcrypt.hash(password ,10);
        return hash;
    } catch (error) {
        return error
    }
};

const compare = async function(plainPass, hashword) {
    try {
        console.log('plain' , plainPass);
        console.log('hashword' , hashword);
        const match = await bcrypt.compare(plainPass, hashword);
        console.log('match =>' ,  match);
        return match;
    } catch (error) {
        return error;
    }
};

export {
    encrypt,
    compare
}