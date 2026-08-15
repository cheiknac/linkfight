import sequelize from '../database/sequelize/client.js';

import Users from './users.js';
import Sportprofil from './Sportprofil.js';
import Palmares from './palmares.js';
import Media from './media.js';
import Sponsor from './Sponsor.js';
import Images from './images.js';


  Users.hasOne(Sportprofil, { foreignKey: 'id', onDelete: 'CASCADE' });
  Sportprofil.belongsTo(Users, { foreignKey: 'id' });

  Users.hasOne(Sponsor, { foreignKey: 'id', onDelete: 'CASCADE' });
  Sponsor.belongsTo(Users, { foreignKey: 'id' });

  Users.hasOne(Media, { foreignKey: 'id', onDelete: 'CASCADE' });
  Media.belongsTo(Users, { foreignKey: 'id' });

  Sportprofil.hasMany(Palmares, { foreignKey: 'id_sportprofil', onDelete: 'CASCADE' });
  Palmares.belongsTo(Sportprofil, { foreignKey: 'id_sportprofil' });

  Sportprofil.hasMany(Images, { foreignKey: 'id_sportprofil', onDelete: 'CASCADE' });
  Images.belongsTo(Sportprofil, { foreignKey: 'id_sportprofil' });
