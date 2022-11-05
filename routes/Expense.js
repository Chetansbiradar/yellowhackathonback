const router = require("express").Router();
const Splitwise = require("splitwise");
const User = require("../models/User");

const sw = Splitwise({
  consumerKey: process.env.ConsumerKey,
  consumerSecret: process.env.ConsumerSecret,
});

//filters the expenses that CurrentUser(LoggedIn i,e ME) have to pay
const filterrepayments = (repayments, userid) => {
  return repayments.filter(
    (repayment) => repayment.to !== userid && repayment.from === userid
  );
};

router.get("/", async (req, res) => {
  try {
    const user = await sw.getCurrentUser();
    const expenses = await sw.getExpenses();

    expenses.map((expense) => {
      expense.repayments = filterrepayments(expense.repayments, user.id);
    });

    // make another function for this
    expenses.map((expense) => {
      if (expense.repayments.length > 0) {
        expense.repayments.map(async (repayment) => {
            const user = await User.findOne({userId:repayment.to});
            if(user){
                repayment.upi = user.upi;
            }
            else{
                repayment.upi = null;
            }
            console.log(repayment);
        });
      }
    });

    res.send({ user, expenses });
  } catch (error) {
    res.status(500).send(error);
  }
});

//if upi present in db then add
router.get("/upi/:id/:upi", async (req, res) => {
  try {
    const expense = await sw.getExpense(req.params.id);
    //send userid and expenses to frontend
    if (expense) {
      const user = await User.findOne({ userId: expense.user_id });
      if (user && user.upi) {
        res.status(200).send({ upi: user.upi });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
