const User = require("../../models/User")

const user = async()=>{

    const userCreate = {
        firstName: "Cristobal",
        lastName: "Quilimaco",
        email: "quilimacox1@gmail.com",
        password: "1234",
        phone: "+123456789"
    }

    await User.create(userCreate)

}
module.exports = user