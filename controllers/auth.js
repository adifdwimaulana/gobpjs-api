const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Organization, Role } = require('../models');

async function register(req, res) {
  const { email, password, name, ttl, nik, no_bpjs } = req.body;

  try {
    const hashPassword = bcrypt.hashSync(password, 8);

    const user = await User.create({
      email,
      password: hashPassword,
      name,
      ttl,
      nik,
      no_bpjs,
    });

    return res.status(200).json({
      status: 200,
      result: user,
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
      include: [
        {
          model: Organization,
          as: 'organization',
          attributes: ['id', 'name'],
        },
        {
          model: Role,
          as: 'role',
          attributes: ['id', 'name'],
        },
      ],
      raw: true,
    });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: 'User Not Found!',
      });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ user }, 'yourSecretKey', {});
      const result = { ...user.dataValues, token };
      return res.status(200).json({
        status: 200,
        result,
      });
    }

    return res.status(401).json({
      status: 401,
      message: 'Authentication Failed',
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
}

async function logout(req, res) {
  const { userToken } = req;

  try {
    const user = await User.findByPk(userToken.id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Failed',
      });
    }

    return res.status(200).json({
      status: 200,
      result: user,
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
}

async function authenticateJWT(req, res, next) {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).json({
        status: 401,
        message: 'Authentication Failed',
      });
    }

    const token = await authorization;
    jwt.verify(token, 'yourSecretKey', (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          message: err.message,
        });
      }
      req.userToken = decoded.user;
      next();
      return token;
    });

    return token;
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
}

async function checkDuplicateEmail(req, res, next) {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(400).json({
        status: 400,
        message: 'Email is already taken!',
      });
    }
    next();
    return user;
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
}

async function isDoctor(req, res, next) {
  const { userToken } = req;

  try {
    const user = await User.findByPk(userToken.id);
    if (user.role_id === 1) {
      next();
      return user;
    }
    return res.status(403).json({
      status: 403,
      message: 'Forbidden',
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
}

async function isNurse(req, res, next) {
  const { userToken } = req;

  try {
    const user = await User.findByPk(userToken.id);
    if (user.role_id === 2) {
      next();
      return user;
    }
    return res.status(403).json({
      status: 403,
      message: 'Forbidden',
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
}

async function isPharmacist(req, res, next) {
  const { userToken } = req;

  try {
    const user = await User.findByPk(userToken.id);
    if (user.role_id === 3) {
      next();
      return user;
    }
    return res.status(403).json({
      status: 403,
      message: 'Forbidden',
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
}

module.exports = {
  register,
  login,
  logout,
  authenticateJWT,
  checkDuplicateEmail,
  isDoctor,
  isNurse,
  isPharmacist,
};
