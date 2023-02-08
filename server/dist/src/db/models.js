"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = exports.Transaction = exports.Account = exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("postgres://rrbvpies:GnDuIx-b0H47RAKLmItEFIV-r5nTrLzI@babar.db.elephantsql.com/rrbvpies");
exports.User = sequelize.define("user", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    accountId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    timestamps: false,
});
exports.Account = sequelize.define("account", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    balance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
    },
}, {
    timestamps: false,
});
exports.Transaction = sequelize.define("transaction", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    debitedAccountId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    creditedAccountId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    value: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    updatedAt: false,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.Account.sync();
    yield exports.User.sync();
    yield exports.Transaction.sync();
}))();
exports.Account.hasOne(exports.User, {
    foreignKey: "accountId",
});
exports.User.belongsTo(exports.Account);
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log("Database connected!");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
exports.connectDb = connectDb;
