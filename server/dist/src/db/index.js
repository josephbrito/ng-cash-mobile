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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHeader = exports.loginUser = exports.seeTransactions = exports.cashInOut = exports.myBalance = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = require("./secret");
const models_1 = require("./models");
// ------------------ Register user ------------------
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const alreadyExist = yield models_1.User.findOne({
            where: { username: req.body.username },
        });
        if (alreadyExist) {
            res.status(401).send('User already exist, please type another username');
            return;
        }
        if (req.body.username.length < 3) {
            res.status(401).send('Please, type an username with 3 or more characters');
            return;
        }
        const pass = req.body.password;
        if (pass.length < 8) {
            res.status(401).send('Your password needs a minium of 8 characters!');
            return;
        }
        else if (pass.search(/[A-Z]/) < 0) {
            res.status(401).send('Your password needs a upper case letter');
            return;
        }
        else if (pass.search(/[0-9]/) < 0) {
            res.status(401).send('Your password needs a number');
            return;
        }
        try {
            const savedAccount = yield models_1.Account.create();
            const savedUser = yield models_1.User.create({
                username: req.body.username,
                password: bcryptjs_1.default.hashSync(pass),
                accountId: savedAccount.dataValues.id,
            });
            console.log(`User saved!`);
            res.status(201).send(savedUser);
        }
        catch (error) {
            console.log(`Error on create user: ${error}`);
            res.status(400).send(`Error on create user ${error}`);
        }
    });
}
exports.createUser = createUser;
// -------------------- End Register user ------------------
// ---------------------- See balance ----------------------
function myBalance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_balance = req.body.id;
            if (!user_balance) {
                res.status(401).send('unauthorized');
                return;
            }
            const your_balance = yield models_1.Account.findOne({
                where: { id: user_balance },
            });
            res.status(200).send(your_balance);
        }
        catch (error) {
            console.log(`Error on myBalance ${error}`);
            res.status(400).send('Error on myBalance');
            return;
        }
    });
}
exports.myBalance = myBalance;
// ---------------------- End See balance ----------------------
// ----------------- cash-in & cash-out -----------------
function cashInOut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cashout = req.body;
            if (!cashout.username) {
                res.status(401).send('unauthorized');
                return;
            }
            const userCashOut = yield models_1.User.findOne({ where: { id: cashout.id } });
            const accountUserCashOut = yield models_1.Account.findOne({
                where: { id: userCashOut === null || userCashOut === void 0 ? void 0 : userCashOut.dataValues.id },
            });
            if ((accountUserCashOut === null || accountUserCashOut === void 0 ? void 0 : accountUserCashOut.dataValues.balance) < req.body.cash_in) {
                res.status(401).send(`You don't have that value`);
                return;
            }
            const userCashIn = yield models_1.User.findOne({
                where: { username: req.body.username },
            });
            const accountUserCashIn = yield models_1.Account.findOne({
                where: { id: userCashIn === null || userCashIn === void 0 ? void 0 : userCashIn.dataValues.id },
            });
            if ((accountUserCashOut === null || accountUserCashOut === void 0 ? void 0 : accountUserCashOut.dataValues.id) === (accountUserCashIn === null || accountUserCashIn === void 0 ? void 0 : accountUserCashIn.dataValues.id)) {
                res.status(401).send(`You can't send cash for yourself!`);
                return;
            }
            yield (accountUserCashOut === null || accountUserCashOut === void 0 ? void 0 : accountUserCashOut.update({
                balance: accountUserCashOut.dataValues.balance - req.body.cash_in,
            }));
            yield (accountUserCashIn === null || accountUserCashIn === void 0 ? void 0 : accountUserCashIn.update({
                balance: accountUserCashIn.dataValues.balance + req.body.cash_in,
            }));
            yield models_1.Transaction.create({
                debitedAccountId: accountUserCashOut === null || accountUserCashOut === void 0 ? void 0 : accountUserCashOut.dataValues.id,
                creditedAccountId: accountUserCashIn === null || accountUserCashIn === void 0 ? void 0 : accountUserCashIn.dataValues.id,
                value: req.body.cash_in,
            });
            const newToken = {
                id: userCashOut === null || userCashOut === void 0 ? void 0 : userCashOut.dataValues.id,
                username: userCashOut === null || userCashOut === void 0 ? void 0 : userCashOut.dataValues.username,
                accountId: userCashOut === null || userCashOut === void 0 ? void 0 : userCashOut.dataValues.accountId,
                balance: accountUserCashOut === null || accountUserCashOut === void 0 ? void 0 : accountUserCashOut.dataValues.balance,
            };
            res.send(accountUserCashOut);
        }
        catch (error) {
            console.log(`Error on transition cash-in/out ${error}`);
            res.status(400).send(`Error on transition cash-in/out`);
            return;
        }
    });
}
exports.cashInOut = cashInOut;
// ----------------- end cash-in & cash-out -----------------
// ------------------ Transactions ------------------
function seeTransactions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.body;
        if (!token.id) {
            res.status(401).send('unauthorized');
            return;
        }
        try {
            const transactionsOut = yield models_1.Transaction.findAll({
                where: { debitedAccountId: token.id },
            });
            if (!transactionsOut) {
                res.send(401).send('unauthorized');
                return;
            }
            res.status(200).send(transactionsOut);
            return;
        }
        catch (error) {
            console.log(`Error on seeTransaction: ${error}`);
            res.status(400).send('Error on seeTransactions');
            return;
        }
    });
}
exports.seeTransactions = seeTransactions;
// ------------------ End Transactions ------------------
// -------------------- Login ----------------
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOne({ where: { username: req.body.username } });
            if (!user) {
                res.status(404).send('User not found');
                return;
            }
            const userFound = bcryptjs_1.default.compareSync(req.body.password, user.dataValues.password);
            if (!userFound) {
                res.status(401).send('Incorret password!');
                return;
            }
            const balanceUserJwt = yield models_1.Account.findOne({
                where: { id: user.dataValues.id },
            });
            const token = {
                id: user.dataValues.id,
                username: user.dataValues.username,
                accountId: user.dataValues.accountId,
                balance: balanceUserJwt === null || balanceUserJwt === void 0 ? void 0 : balanceUserJwt.dataValues.balance,
            };
            res.send(token);
        }
        catch (error) {
            res.status(404).send(`Error on login`);
        }
    });
}
exports.loginUser = loginUser;
// -------------------- End login -------------
// ------------Middleware validation ---------------
function verifyHeader(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const isToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.nkoe;
        if (!isToken) {
            res.status(404).send('You are not logged!');
            return;
        }
        try {
            yield jsonwebtoken_1.default.verify(isToken, secret_1.SECRET_TOKEN);
            next();
        }
        catch (error) {
            res.status(401).send('unauthorized');
            return;
        }
    });
}
exports.verifyHeader = verifyHeader;
// -----------End Middleware validation -------------
