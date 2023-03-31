import { Injectable } from '@nestjs/common';
import { loginObject, registerUserObject } from '../../common/api.dto';
import { User, UserDocument } from '../user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createNewSession } from 'supertokens-node/lib/build/recipe/session';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async register(req, res, data: registerUserObject) {
    const resp = await this.userModel.findOne({ username: data.username });
    if (resp) {
      res.statusCode = 400;
      return { message: 'Email already exists' };
    } else {
      const password = await bcrypt.hash(data.password, 10);
      data = { ...data, password: password };
      const details = await this.userModel.create(data);
      await createNewSession(req, res, details.id);
      res.statusCode = 200;
      return { message: 'user created successfully' };
    }
  }

  async login(req, res, body: loginObject): Promise<any> {
    const user = await this.userModel.findOne({ username: body.username });
    if (!user) {
      res.statusCode = 400;
      return { message: 'User does not exist' };
    }
    const pass = body.password === user.password;
    if (pass) {
      user.password = '';
      const session = await createNewSession(req, res, user.id);
      res.statusCode = 200;
      return { id: user._id, name: user.name };
    }
    res.statusCode = 400;
    return { message: 'Invalid password' };
  }
}
