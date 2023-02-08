import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {SECRET_TOKEN} from './secret';

import {User, Account, Transaction} from './models';

// ------------------ Register user ------------------
export async function createUser(req: Request, res: Response) {
  const alreadyExist = await User.findOne({
    where: {username: req.body.username},
  });

  if (alreadyExist) {
    res.status(401).send('User already exist, please type another username');
    return;
  }

  if (req.body.username.length < 3) {
    res.status(401).send('Please, type an username with 3 or more characters');
    return;
  }

  const pass: string = req.body.password;

  if (pass.length < 8) {
    res.status(401).send('Your password needs a minium of 8 characters!');
    return;
  } else if (pass.search(/[A-Z]/) < 0) {
    res.status(401).send('Your password needs a upper case letter');
    return;
  } else if (pass.search(/[0-9]/) < 0) {
    res.status(401).send('Your password needs a number');
    return;
  }

  try {
    const savedAccount = await Account.create();

    const savedUser = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(pass),
      accountId: savedAccount.dataValues.id,
    });

    console.log(`User saved!`);
    res.status(201).send(savedUser);
  } catch (error) {
    console.log(`Error on create user: ${error}`);
    res.status(400).send(`Error on create user ${error}`);
  }
}
// -------------------- End Register user ------------------

// ---------------------- See balance ----------------------
export async function myBalance(req: Request, res: Response) {
  try {
    const user_balance = req.body.id;

    if (!user_balance) {
      res.status(401).send('unauthorized');
      return;
    }

    const your_balance = await Account.findOne({
      where: {id: user_balance},
    });
    res.status(200).send(your_balance);
  } catch (error) {
    console.log(`Error on myBalance ${error}`);
    res.status(400).send('Error on myBalance');
    return;
  }
}

// ---------------------- End See balance ----------------------

// ----------------- cash-in & cash-out -----------------

export async function cashInOut(req: Request, res: Response) {
  try {
    const cashout = req.body;

    if (!cashout.username) {
      res.status(401).send('unauthorized');
      return;
    }

    const userCashOut = await User.findOne({where: {id: cashout.id}});
    const accountUserCashOut = await Account.findOne({
      where: {id: userCashOut?.dataValues.id},
    });

    if (accountUserCashOut?.dataValues.balance < req.body.cash_in) {
      res.status(401).send(`You don't have that value`);
      return;
    }

    const userCashIn = await User.findOne({
      where: {username: req.body.username},
    });

    const accountUserCashIn = await Account.findOne({
      where: {id: userCashIn?.dataValues.id},
    });

    if (
      accountUserCashOut?.dataValues.id === accountUserCashIn?.dataValues.id
    ) {
      res.status(401).send(`You can't send cash for yourself!`);
      return;
    }

    await accountUserCashOut?.update({
      balance: accountUserCashOut.dataValues.balance - req.body.cash_in,
    });
    await accountUserCashIn?.update({
      balance: accountUserCashIn.dataValues.balance + req.body.cash_in,
    });

    await Transaction.create({
      debitedAccountId: accountUserCashOut?.dataValues.id,
      creditedAccountId: accountUserCashIn?.dataValues.id,
      value: req.body.cash_in,
    });

    const newToken = {
      id: userCashOut?.dataValues.id,
      username: userCashOut?.dataValues.username,
      accountId: userCashOut?.dataValues.accountId,
      balance: accountUserCashOut?.dataValues.balance,
    };

    res.send(accountUserCashOut);
  } catch (error) {
    console.log(`Error on transition cash-in/out ${error}`);
    res.status(400).send(`Error on transition cash-in/out`);
    return;
  }
}

// ----------------- end cash-in & cash-out -----------------

// ------------------ Transactions ------------------
export async function seeTransactions(req: Request, res: Response) {
  const token = req.body;
  if (!token.id) {
    res.status(401).send('unauthorized');
    return;
  }

  try {
    const transactionsOut = await Transaction.findAll({
      where: {debitedAccountId: token.id},
    });

    if (!transactionsOut) {
      res.send(401).send('unauthorized');
      return;
    }
    res.status(200).send(transactionsOut);
    return;
  } catch (error) {
    console.log(`Error on seeTransaction: ${error}`);
    res.status(400).send('Error on seeTransactions');
    return;
  }
}
// ------------------ End Transactions ------------------

// -------------------- Login ----------------

export async function loginUser(req: Request, res: Response) {
  try {
    const user = await User.findOne({where: {username: req.body.username}});
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const userFound = bcrypt.compareSync(
      req.body.password,
      user.dataValues.password,
    );

    if (!userFound) {
      res.status(401).send('Incorret password!');
      return;
    }

    const balanceUserJwt = await Account.findOne({
      where: {id: user.dataValues.id},
    });

    const token = {
      id: user.dataValues.id,
      username: user.dataValues.username,
      accountId: user.dataValues.accountId,
      balance: balanceUserJwt?.dataValues.balance,
    };

    res.send(token);
  } catch (error) {
    res.status(404).send(`Error on login`);
  }
}
// -------------------- End login -------------

// ------------Middleware validation ---------------

export async function verifyHeader(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const isToken = req.cookies?.nkoe;

  if (!isToken) {
    res.status(404).send('You are not logged!');
    return;
  }
  try {
    await jwt.verify(isToken, SECRET_TOKEN);

    next();
  } catch (error) {
    res.status(401).send('unauthorized');
    return;
  }
}

// -----------End Middleware validation -------------
