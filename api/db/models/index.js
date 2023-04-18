const { User, UserSchema } = require('./user.model');
const { Pacient, PacientSchema } = require('./pacient.model');
const { Doctor, DoctorSchema } = require('./doctor.model');
const { UserFile, UserFileSchema } = require('./userFile.model');
const {
  PacientPermission,
  PacientPermissionSchema,
} = require('./pacientPermission.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Pacient.init(PacientSchema, Pacient.config(sequelize));
  Doctor.init(DoctorSchema, Doctor.config(sequelize));
  UserFile.init(UserFileSchema, UserFile.config(sequelize));
  PacientPermission.init(
    PacientPermissionSchema,
    PacientPermission.config(sequelize)
  );

  User.associate(sequelize.models);
  Pacient.associate(sequelize.models);
  Doctor.associate(sequelize.models);
  UserFile.associate(sequelize.models);
  PacientPermission.associate(sequelize.models);
}

module.exports = setupModels;
