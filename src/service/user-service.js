import { UserRepository } from '../repository/index.js'

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log(error)
        }
    }

    async findByEmail(email) {
        try {
            const user = await this.userRepository.findBy({ email });
            return user;
        } catch (error) {
            console.log(error)
        }
    }

    async signin(data) {
        try {
            const user = await this.findByEmail(data.email);
            if(!user) {
                throw {
                    message: 'User not found'
                };
            }
            const isPasswordValid = user.comparePassword(data.password);
            if(!isPasswordValid) {
                throw {
                    message: 'Invalid password'
                };
            }

            const token = user.genJWT();
            return token;
        }
        catch (error) {
            throw error;
        }
    }
}

export default UserService;