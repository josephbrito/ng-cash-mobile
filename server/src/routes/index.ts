import {Router} from 'express';
import {
  createUser,
  loginUser,
  myBalance,
  cashInOut,
  seeTransactions,
} from '../db';

const router = Router();

router.post('/balance', myBalance);
router.post('/transactions', seeTransactions);

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/transfer', cashInOut);

export default router;
