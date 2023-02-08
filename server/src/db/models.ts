import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  "postgres://rrbvpies:GnDuIx-b0H47RAKLmItEFIV-r5nTrLzI@babar.db.elephantsql.com/rrbvpies"
);

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    accountId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

export const Account = sequelize.define(
  "account",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
  },
  {
    timestamps: false,
  }
);

export const Transaction = sequelize.define(
  "transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    debitedAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    creditedAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  }
);

(async () => {
  await Account.sync();
  await User.sync();
  await Transaction.sync();
})();

Account.hasOne(User, {
  foreignKey: "accountId",
});
User.belongsTo(Account);

export async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
